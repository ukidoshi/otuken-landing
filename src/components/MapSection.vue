<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="map" ref="mapSection">
    <div class="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(74,111,97,0.1),transparent_75%)] pointer-events-none"></div>
    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-12">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Навигация по территории
        </div>
        <h2 class="section-title mt-5 mb-5">
          Выберите подходящий район
        </h2>
        <p class="section-lead">
          Комплекс разделен на уникальные кварталы, каждый с собственным характером и инфраструктурой.
          Карта плавно приближает жилую часть, чтобы пользователь быстрее увидел доступные зоны.
        </p>
      </div>

      <div class="theme-card p-4 md:p-6 lg:p-8 mb-8">
        <div class="grid gap-4 lg:grid-cols-[1.3fr_0.7fr] mb-5">
          <div class="rounded-[1.6rem] border border-[rgba(184,138,66,0.16)] bg-white/60 px-5 py-4 text-sm text-[var(--ink-soft)] leading-7">
            На карте выделены активные кварталы, строящиеся зоны и уже распределенные участки. При выборе доступного квартала открывается карточка с краткой информацией.
          </div>
          <div class="rounded-[1.6rem] border border-[rgba(74,111,97,0.16)] bg-[rgba(74,111,97,0.08)] px-5 py-4 text-sm text-[var(--ink)] leading-7">
            <div class="font-semibold text-[var(--title)] mb-1">Подсказка</div>
            На мобильном можно увеличить карту и сбросить вид с помощью кнопок справа.
          </div>
        </div>

        <div
          ref="mapContainer"
          class="relative overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,250,243,0.8),rgba(243,236,223,0.86))] border border-[rgba(184,138,66,0.14)] map-scroll shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
        >
          <!-- Контролы для мобильных -->
          <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 md:hidden">
            <button
              @click="zoomIn"
              class="w-10 h-10 bg-[rgba(255,252,245,0.88)] backdrop-blur-sm rounded-2xl border border-[rgba(184,138,66,0.16)] shadow-[0_12px_24px_rgba(56,42,19,0.12)] flex items-center justify-center"
              aria-label="Увеличить"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              @click="zoomOut"
              class="w-10 h-10 bg-[rgba(255,252,245,0.88)] backdrop-blur-sm rounded-2xl border border-[rgba(184,138,66,0.16)] shadow-[0_12px_24px_rgba(56,42,19,0.12)] flex items-center justify-center"
              aria-label="Уменьшить"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <button
              @click="resetZoom"
              class="w-10 h-10 bg-[rgba(255,252,245,0.88)] backdrop-blur-sm rounded-2xl border border-[rgba(184,138,66,0.16)] shadow-[0_12px_24px_rgba(56,42,19,0.12)] text-xs"
              aria-label="Сброс"
            >
              ↺
            </button>
          </div>

          <!-- Инлайн SVG карта + кварталы -->
          <svg
            ref="svgMap"
            :viewBox="currentViewBox"
            class="w-full h-auto min-h-[400px] md:min-h-[600px] transition-all duration-700 ease-out"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Фон: участки карты -->
            <g
              class="map-background"
              v-html="mapSvg"
              :opacity="isZoomed ? 0.35 : 1"
            />

            <!-- Кварталы поверх карты -->
            <g class="districts-layer">
              <polygon
                v-for="(district, id) in districts"
                :key="id"
                :points="district.polygon"
                :fill="getDistrictFill(district)"
                :stroke="district.color"
                :stroke-width="isZoomed ? 3 : 2"
                :opacity="getDistrictOpacity(district, id)"
                :class="[
                  'district-polygon',
                  district.status === 'active' ? 'cursor-pointer hover:opacity-90' : 'cursor-not-allowed',
                  district.status === 'sold' && 'sold-district',
                  district.status === 'building' && 'building-district'
                ]"
                @click="handleDistrictClick(id, district)"
                @mouseenter="hoveredDistrict = id"
                @mouseleave="hoveredDistrict = null"
              >
                <title>{{ district.title }} ({{ getStatusText(district.status) }})</title>
              </polygon>

              <!-- Подписи кварталов — РУЧНОЕ РАСПОЛОЖЕНИЕ ИЗ districts -->
              <text
                v-for="(district, id) in districts"
                :key="`label-${id}`"
                :x="district.labelX"
                :y="district.labelY"
                :fill="district.status === 'sold' ? '#666' : '#fff'"
                :font-size="district.labelFontSize || '12'"
                font-weight="bold"
                text-anchor="middle"
                dominant-baseline="middle"
                class="pointer-events-none"
                :transform="getLabelTransform(district)"
              >
                {{ district.title.replace('Квартал \"', '').replace('\"', '') }}
              </text>
            </g>
          </svg>
        </div>

        <!-- Легенда -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div
            v-for="(district, id) in districts"
            :key="id"
            class="theme-card flex items-center gap-3 p-4"
            :class="district.status === 'active' ? 'theme-card-hover cursor-pointer' : 'opacity-70'"
            @click="handleDistrictClick(id, district)"
          >
            <div
              class="w-5 h-5 rounded-md flex-shrink-0 shadow-[0_10px_18px_rgba(0,0,0,0.08)]"
              :style="{ backgroundColor: district.color, opacity: getDistrictOpacity(district) }"
            ></div>
            <div class="flex-1">
              <span class="text-sm font-semibold text-[var(--ink)]">
                {{ district.title.replace('Квартал \"', '').replace('\"', '') }}
              </span>
              <span class="text-xs text-[var(--ink-soft)] block mt-1">
                {{ getStatusText(district.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { districts } from '../composables/useDistricts.js'
import mapSvgRaw from '../assets/map.svg?raw'

const emit = defineEmits(['open-modal'])

const mapSection = ref(null)
const svgMap = ref(null)

const isZoomed = ref(false)
const hoveredDistrict = ref(null)

const mapSvg = mapSvgRaw
const fullViewBox = '0 0 847.03997 705.35996'
const lotsBBox = {
  x: 30,
  y: 100,
  width: 800,
  height: 670
}
const currentViewBox = ref(fullViewBox)

let observer = null

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const setupIntersectionObserver = () => {
  if (!mapSection.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          zoomToLots()
        } else if (!entry.isIntersecting) {
          resetZoom()
        }
      })
    },
    {
      threshold: [0, 0.3, 0.5, 0.7, 1],
      rootMargin: '-100px'
    }
  )

  observer.observe(mapSection.value)
}

const zoomToLots = () => {
  if (isZoomed.value) return

  const padding = 0.05
  const padX = lotsBBox.width * padding
  const padY = lotsBBox.height * padding

  const x = lotsBBox.x - padX
  const y = lotsBBox.y - padY
  const w = lotsBBox.width + padX * 2
  const h = lotsBBox.height + padY * 2

  currentViewBox.value = `${x} ${y} ${w} ${h}`
  isZoomed.value = true
}

const parseViewBox = (vb) => vb.split(' ').map(Number)

const adjustViewBox = (factor) => {
  const [x, y, width, height] = parseViewBox(currentViewBox.value)
  const newWidth = width * factor
  const newHeight = height * factor

  const [, , lotsW, lotsH] = [lotsBBox.x, lotsBBox.y, lotsBBox.width, lotsBBox.height]
  const currentScale = width / lotsW
  const nextScale = currentScale * factor

  if (nextScale < 0.3 || nextScale > 3.0) return

  const newX = x + (width - newWidth) / 2
  const newY = y + (height - newHeight) / 2

  currentViewBox.value = `${newX} ${newY} ${newWidth} ${newHeight}`
}

const zoomIn = () => {
  adjustViewBox(0.8)
}

const zoomOut = () => {
  adjustViewBox(1.25)
}

const resetZoom = () => {
  currentViewBox.value = fullViewBox
  isZoomed.value = false
}

const getDistrictFill = (district) => {
  if (district.status === 'sold') return '#9ca3af'
  if (district.status === 'building') return district.color + '80'
  return district.color
}

const getDistrictOpacity = (district, districtId) => {
  if (district.status === 'sold') return 0.5
  if (district.status === 'building') return 0.7
  return hoveredDistrict.value === districtId ? 0.9 : 0.6
}

const getStatusText = (status) => {
  const statusMap = {
    active: 'Доступен',
    sold: 'Распродан',
    building: 'Строится',
    otuken: 'Өтүкен',
  }
  return statusMap[status] || 'Неизвестно'
}

const handleDistrictClick = (id, district) => {
  if (district.status === 'active') {
    emit('open-modal', id)
  }
}

// ✅ РУЧНОЙ ПОВОРОТ ТЕКСТА ИЗ districts
const getLabelTransform = (district) => {
  const angle = district.labelAngle || 0
  const x = district.labelX || 0
  const y = district.labelY || 0
  
  if (!angle || !x || !y) return null
  return `rotate(${angle} ${x} ${y})`
}
</script>

<style scoped>
.district-polygon {
  transition: opacity 0.2s, filter 0.2s;
}

.district-polygon:hover {
  filter: brightness(1.1);
}

.sold-district {
  stroke-dasharray: 5, 5;
}

.building-district {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .map-background {
    opacity: 0.5 !important;
  }
  .districts-layer {
    opacity: 1;
  }
}

.map-scroll {
  touch-action: pan-x pan-y;
  -webkit-overflow-scrolling: touch;
}
</style>
