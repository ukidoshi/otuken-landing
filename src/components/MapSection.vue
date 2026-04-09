<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="map">
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
          На карте показаны районы комплекса с разным характером и окружением.
          Выберите интересующий район, чтобы сразу посмотреть его описание и инфраструктуру рядом.
        </p>
      </div>

      <div class="theme-card p-4 md:p-6 lg:p-8 mb-8">
        <div class="map-user-guide mb-5">
          <div class="map-user-guide-copy">
            <div class="map-user-guide-title">Как пользоваться картой</div>
            <p class="map-user-guide-text">
              Выберите цветной район на карте или в списке ниже, чтобы открыть его карточку и понять,
              какой формат проживания и окружения вам подходит.
            </p>
          </div>

          <div class="map-user-steps">
            <div class="map-user-step">
              <span class="map-user-step-index">1</span>
              Нажмите на цветной район
            </div>
            <div class="map-user-step">
              <span class="map-user-step-index">2</span>
              Откройте карточку с описанием
            </div>
            <div class="map-user-step">
              <span class="map-user-step-index">3</span>
              На телефоне двигайте карту пальцем и используйте + / −
            </div>
          </div>

          <div class="map-guide-chips">
            <span class="map-status-chip map-status-chip--active">Доступен для просмотра</span>
            <span class="map-status-chip map-status-chip--building">Район строится</span>
            <span class="map-status-chip map-status-chip--sold">Район распределён</span>
          </div>
        </div>

        <div
          class="relative overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,250,243,0.8),rgba(243,236,223,0.86))] border border-[rgba(184,138,66,0.14)] map-scroll shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
        >
          <transition name="map-hint">
            <div
              v-if="showMapHint"
              class="map-floating-hint"
            >
              <div class="map-floating-title">Выберите район</div>
              <div class="map-floating-copy">
                Цветные районы открывают карточку с кратким описанием.
              </div>
            </div>
          </transition>

          <!-- Контролы для мобильных -->
          <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 md:hidden">
            <button
              @click="zoomIn"
              class="w-10 h-10 bg-[rgba(255,252,245,0.96)] rounded-2xl border border-[rgba(184,138,66,0.16)] shadow-[0_10px_20px_rgba(56,42,19,0.1)] flex items-center justify-center"
              aria-label="Увеличить"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              @click="zoomOut"
              class="w-10 h-10 bg-[rgba(255,252,245,0.96)] rounded-2xl border border-[rgba(184,138,66,0.16)] shadow-[0_10px_20px_rgba(56,42,19,0.1)] flex items-center justify-center"
              aria-label="Уменьшить"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <button
              @click="resetZoom"
              class="w-10 h-10 bg-[rgba(255,252,245,0.96)] rounded-2xl border border-[rgba(184,138,66,0.16)] shadow-[0_10px_20px_rgba(56,42,19,0.1)] flex items-center justify-center"
              aria-label="Сброс"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-13.66-5.66L4 10m16 4-2.34 5.66A8 8 0 0 1 4 14" />
              </svg>
            </button>
          </div>

          <!-- Инлайн SVG карта + кварталы -->
          <svg
            ref="svgMap"
            :viewBox="currentViewBox"
            class="w-full h-auto min-h-[400px] md:min-h-[600px]"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            @touchstart="onMapTouchStart"
            @touchmove="onMapTouchMove"
            @touchend="onMapTouchEnd"
            @touchcancel="onMapTouchEnd"
          >
            <!-- Фон: участки карты -->
            <image
              class="map-background"
              :href="mapAsset"
              x="0"
              y="0"
              width="847.03997"
              height="705.35996"
              preserveAspectRatio="none"
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
                  district.status === 'active' ? 'cursor-pointer hover:opacity-90 active-district' : 'cursor-not-allowed',
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
                {{ getCardHintText(district.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { districts } from '../composables/useDistricts.js'
import mapDesktop from '../assets/optimized/map/map.webp'
import mapMobile from '../assets/optimized/map/map-mobile.webp'

const emit = defineEmits(['open-modal'])

const svgMap = ref(null)
const isZoomed = ref(true)
const isMobileViewport = ref(false)
const hoveredDistrict = ref(null)

const fullViewBox = '0 0 847.03997 705.35996'
const fullViewBoxParts = fullViewBox.split(' ').map(Number)
const lotsBBox = {
  x: 30,
  y: 100,
  width: 800,
  height: 670
}
const getFocusedViewBox = () => {
  const padding = 0.05
  const padX = lotsBBox.width * padding
  const padY = lotsBBox.height * padding
  const x = lotsBBox.x - padX
  const y = lotsBBox.y - padY
  const width = lotsBBox.width + padX * 2
  const height = lotsBBox.height + padY * 2

  return `${x} ${y} ${width} ${height}`
}

const currentViewBox = ref(getFocusedViewBox())
const suppressNextClick = ref(false)
const showMapHint = ref(true)
const mapAsset = computed(() => (isMobileViewport.value ? mapMobile : mapDesktop))

const dragState = {
  active: false,
  moved: false,
  startClientX: 0,
  startClientY: 0,
  startViewBox: null
}

const updateViewport = () => {
  isMobileViewport.value = window.matchMedia('(max-width: 767px)').matches
}

const parseViewBox = (vb) => vb.split(' ').map(Number)
const formatViewBox = (x, y, width, height) => `${x} ${y} ${width} ${height}`

const clampToBounds = (x, y, width, height) => {
  const [fullX, fullY, fullWidth, fullHeight] = fullViewBoxParts

  const clampedX = width >= fullWidth
    ? fullX - (width - fullWidth) / 2
    : Math.min(Math.max(x, fullX), fullX + fullWidth - width)

  const clampedY = height >= fullHeight
    ? fullY - (height - fullHeight) / 2
    : Math.min(Math.max(y, fullY), fullY + fullHeight - height)

  return [clampedX, clampedY]
}

const setViewBox = (x, y, width, height) => {
  const [clampedX, clampedY] = clampToBounds(x, y, width, height)
  currentViewBox.value = formatViewBox(clampedX, clampedY, width, height)
}

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

  setViewBox(newX, newY, newWidth, newHeight)
  isZoomed.value = true
}

const zoomIn = () => {
  showMapHint.value = false
  adjustViewBox(0.8)
}

const zoomOut = () => {
  showMapHint.value = false
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
  if (district.status === 'sold') return 0.32
  if (district.status === 'building') return hoveredDistrict.value === districtId ? 0.82 : 0.58
  if (district.status === 'active') return hoveredDistrict.value === districtId ? 0.95 : 0.8
  return hoveredDistrict.value === districtId ? 0.88 : 0.4
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

const getCardHintText = (status) => {
  const hintMap = {
    active: 'Нажмите, чтобы открыть',
    sold: 'Распродан',
    building: 'Строится',
    otuken: 'Этнокомплекс'
  }

  return hintMap[status] || 'Неизвестно'
}

const handleDistrictClick = (id, district) => {
  if (suppressNextClick.value) {
    suppressNextClick.value = false
    return
  }

  showMapHint.value = false

  if (district.status === 'active') {
    emit('open-modal', id)
  }
}

const getTouchPoint = (event) => {
  const touch = event.touches?.[0] || event.changedTouches?.[0]
  if (!touch) return null

  return {
    x: touch.clientX,
    y: touch.clientY
  }
}

const onMapTouchStart = (event) => {
  if (!isZoomed.value || event.touches.length !== 1) return

  showMapHint.value = false

  const point = getTouchPoint(event)
  if (!point) return

  const [x, y, width, height] = parseViewBox(currentViewBox.value)

  dragState.active = true
  dragState.moved = false
  dragState.startClientX = point.x
  dragState.startClientY = point.y
  dragState.startViewBox = { x, y, width, height }
}

const onMapTouchMove = (event) => {
  if (!dragState.active || !dragState.startViewBox || !svgMap.value) return

  const point = getTouchPoint(event)
  if (!point) return

  const dx = point.x - dragState.startClientX
  const dy = point.y - dragState.startClientY

  if (!dragState.moved && Math.hypot(dx, dy) < 6) return

  dragState.moved = true
  event.preventDefault()

  const rect = svgMap.value.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  const unitsPerPxX = dragState.startViewBox.width / rect.width
  const unitsPerPxY = dragState.startViewBox.height / rect.height

  const nextX = dragState.startViewBox.x - dx * unitsPerPxX
  const nextY = dragState.startViewBox.y - dy * unitsPerPxY

  setViewBox(nextX, nextY, dragState.startViewBox.width, dragState.startViewBox.height)
}

const onMapTouchEnd = () => {
  if (!dragState.active) return

  suppressNextClick.value = dragState.moved

  dragState.active = false
  dragState.startViewBox = null

  if (suppressNextClick.value) {
    window.setTimeout(() => {
      suppressNextClick.value = false
    }, 220)
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

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
})
</script>

<style scoped>
.map-user-guide {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem 1.1rem;
  padding: 1.2rem 1.2rem 1.1rem;
  border-radius: 1.65rem;
  border: 1px solid rgba(184, 138, 66, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.92), rgba(248, 241, 230, 0.8)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.12), transparent 38%);
  box-shadow: 0 16px 30px rgba(64, 49, 26, 0.08);
}

.map-background {
  pointer-events: none;
}

.map-user-guide-copy {
  flex: 1 1 22rem;
  min-width: 16rem;
}

.map-user-guide-title {
  color: var(--title);
  font-size: 1.05rem;
  font-weight: 800;
}

.map-user-guide-text {
  margin-top: 0.45rem;
  color: var(--ink-soft);
  font-size: 0.97rem;
  line-height: 1.7;
}

.map-user-steps {
  display: flex;
  flex: 1 1 22rem;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.map-user-step {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  min-height: 3rem;
  padding: 0.8rem 1rem;
  border-radius: 1.15rem;
  border: 1px solid rgba(74, 111, 97, 0.12);
  background: rgba(255, 255, 255, 0.55);
  color: var(--ink);
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.5;
  box-shadow: 0 10px 22px rgba(64, 49, 26, 0.05);
}

.map-user-step-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  background: rgba(201, 169, 97, 0.16);
  color: var(--gold-deep);
  font-size: 0.82rem;
  font-weight: 800;
  flex-shrink: 0;
}

.map-guide-chips {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.map-status-chip {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 0.85rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border: 1px solid transparent;
}

.map-status-chip--active {
  background: rgba(201, 169, 97, 0.18);
  border-color: rgba(201, 169, 97, 0.3);
  color: #7b5a1f;
}

.map-status-chip--building {
  background: rgba(139, 69, 19, 0.12);
  border-color: rgba(139, 69, 19, 0.22);
  color: #71411d;
}

.map-status-chip--sold {
  background: rgba(148, 163, 184, 0.16);
  border-color: rgba(148, 163, 184, 0.24);
  color: #596677;
}

.map-floating-hint {
  position: absolute;
  left: 1rem;
  right: 4.5rem;
  top: 1rem;
  z-index: 20;
  max-width: 18rem;
  padding: 0.95rem 1rem;
  border-radius: 1.35rem;
  border: 1px solid rgba(184, 138, 66, 0.18);
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.94), rgba(249, 243, 233, 0.86)),
    radial-gradient(circle at top left, rgba(201, 169, 97, 0.12), transparent 42%);
  box-shadow: 0 12px 24px rgba(64, 49, 26, 0.1);
}

.map-floating-title {
  color: var(--title);
  font-size: 0.9rem;
  font-weight: 800;
}

.map-floating-copy {
  margin-top: 0.35rem;
  color: var(--ink-soft);
  font-size: 0.78rem;
  line-height: 1.55;
}

.map-hint-enter-active,
.map-hint-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}

.map-hint-enter-from,
.map-hint-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.map-hint-enter-to,
.map-hint-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.district-polygon {
  transition: opacity 0.15s ease, stroke-width 0.15s ease;
}

.district-polygon:hover {
  opacity: 0.92;
}

.sold-district {
  stroke-dasharray: 5, 5;
}

.building-district {
  opacity: 0.66;
}

@media (max-width: 768px) {
  .map-user-guide {
    padding: 1rem;
    border-radius: 1.4rem;
  }

  .map-user-guide-copy,
  .map-user-steps {
    min-width: 0;
  }

  .map-user-guide-title {
    font-size: 1rem;
  }

  .map-user-guide-text {
    font-size: 0.92rem;
  }

  .map-user-step {
    width: 100%;
    font-size: 0.88rem;
  }

  .map-floating-hint {
    right: 4rem;
    max-width: 14.5rem;
  }

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
