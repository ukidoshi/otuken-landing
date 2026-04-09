<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="gallery">
    <div class="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(184,138,66,0.12),transparent_72%)] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-10 md:mb-12">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Сценарии пространства
        </div>

        <h2 class="section-title mt-5 mb-5">
          Как раскрывается территория
        </h2>

        <p class="section-lead">
          Этот блок не повторяет список объектов, а показывает, как территория ощущается для гостя:
          от первого впечатления и прогулочного маршрута до культурного центра и мест отдыха.
        </p>
      </div>

      <div class="theme-card gallery-guide mx-auto max-w-5xl p-5 md:p-6 mb-8 md:mb-10">
        <div class="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div class="text-sm md:text-base text-[var(--ink-soft)] leading-7">
            Нажмите на карточку, чтобы открыть серию ракурсов и короткое объяснение,
            чем именно этот сценарий важен для будущего опыта посетителя.
          </div>

          <div class="flex flex-wrap gap-2 md:justify-end">
            <span class="gallery-guide-chip">Фото и ракурсы</span>
            <span class="gallery-guide-chip">Краткий смысл</span>
            <span class="gallery-guide-chip">Понятный контекст</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[260px] xl:auto-rows-[272px] gap-4">
        <button
          v-for="item in scenarios"
          :key="item.id"
          type="button"
          class="group relative overflow-hidden rounded-[1.9rem] border border-[rgba(184,138,66,0.16)] shadow-[0_20px_42px_rgba(56,42,19,0.12)] text-left focus:outline-none focus:ring-2 focus:ring-[rgba(184,138,66,0.36)]"
          :class="item.layout"
          @click="openScenario(item)"
        >
          <picture>
            <source v-if="item.imageMobile" :srcset="item.imageMobile" media="(max-width: 767px)" />
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition duration-500 group-hover:scale-[1.025]"
              loading="lazy"
              decoding="async"
            />
          </picture>

          <div class="absolute inset-0 bg-gradient-to-t from-[rgba(7,10,8,0.92)] via-[rgba(7,10,8,0.4)] to-[rgba(7,10,8,0.08)]"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,138,66,0.22),transparent_34%),linear-gradient(135deg,rgba(184,138,66,0.14),transparent_34%)]"></div>

          <div class="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
            <div class="gallery-card-tag">
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"></span>
              {{ item.eyebrow }}
            </div>

            <div class="gallery-card-hint">
              <span>{{ currentGalleryLength(item) }} фото</span>
              <span class="gallery-card-hint-separator"></span>
              <span>Открыть</span>
            </div>
          </div>

          <div class="absolute left-5 right-5 bottom-5">
            <div :class="['gallery-copy', item.compact ? 'gallery-copy--compact' : 'gallery-copy--feature']">
              <div
                :class="[
                  'gallery-copy-title display-font text-white leading-none',
                  item.compact ? 'text-[2.15rem] md:text-[2.55rem]' : 'text-3xl md:text-[3.2rem]'
                ]"
              >
                {{ item.title }}
              </div>

              <p
                :class="[
                  'gallery-copy-text mt-2 leading-6',
                  item.compact ? 'text-sm md:text-[0.98rem] max-w-none line-clamp-3' : 'text-sm md:text-base max-w-md line-clamp-3 md:line-clamp-none'
                ]"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <transition name="gallery-modal">
      <div
        v-if="isOpen && selected"
        class="fixed inset-0 z-[70] flex items-center justify-center px-4 py-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="absolute inset-0 bg-[rgba(18,24,20,0.72)]" @click="closeScenario"></div>

        <div
          ref="panelRef"
          class="theme-card relative w-full max-w-5xl overflow-hidden"
          :style="{ maxHeight: 'calc(100dvh - 24px)' }"
        >
          <div class="gallery-modal-scroll">
            <div class="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div class="relative min-h-[18rem] sm:min-h-[22rem] lg:min-h-[38rem] bg-[var(--surface-dark)]">
                <img
                  :src="currentImage"
                  :alt="selected.title"
                  class="w-full h-full object-cover select-none"
                  draggable="false"
                  @touchstart="onTouchStart"
                  @touchend="onTouchEnd"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-[rgba(7,10,8,0.72)] via-[rgba(7,10,8,0.08)] to-[rgba(7,10,8,0.04)]"></div>

                <div v-if="hasGalleryControls" class="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    class="gallery-icon-button"
                    @click.stop="prevImage"
                    aria-label="Предыдущее фото"
                  >
                    <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>

                  <div class="gallery-counter">
                    {{ galleryIndex + 1 }} / {{ currentGallery.length }}
                  </div>

                  <button
                    type="button"
                    class="gallery-icon-button"
                    @click.stop="nextImage"
                    aria-label="Следующее фото"
                  >
                    <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>

                <div class="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4">
                  <div class="gallery-media-caption">
                    <div class="gallery-card-tag">
                      <span class="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"></span>
                      {{ selected.eyebrow }}
                    </div>
                    <div class="text-sm text-white/82 mt-3 leading-6">
                      {{ selected.note }}
                    </div>
                  </div>

                  <div v-if="hasGalleryControls" class="hidden sm:flex items-center gap-2">
                    <button
                      v-for="(image, index) in currentGallery"
                      :key="`${selected.id}-${index}`"
                      type="button"
                      class="gallery-thumb"
                      :class="index === galleryIndex ? 'gallery-thumb--active' : ''"
                      @click="setImage(index)"
                      aria-label="Открыть фото"
                    >
                      <img :src="image" :alt="selected.title" class="w-full h-full object-cover" loading="lazy" />
                    </button>
                  </div>
                </div>
              </div>

              <div class="relative p-6 md:p-8 lg:p-10">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
                      Сценарий пространства
                    </div>
                    <h3 class="display-font text-[2.25rem] md:text-[3.1rem] leading-none text-[var(--title)] mt-3">
                      {{ selected.title }}
                    </h3>
                  </div>

                  <button
                    type="button"
                    class="gallery-close-button"
                    @click="closeScenario"
                    aria-label="Закрыть"
                  >
                    <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>

                <p class="mt-5 text-[var(--ink-soft)] leading-8 text-sm md:text-base">
                  {{ selected.full }}
                </p>

                <div class="theme-card mt-6 p-5">
                  <div class="text-sm font-semibold text-[var(--title)]">
                    Что здесь важно для посетителя
                  </div>
                  <ul class="mt-4 space-y-3">
                    <li
                      v-for="point in selected.highlights"
                      :key="point"
                      class="flex gap-3 text-sm md:text-[0.98rem] text-[var(--ink)] leading-7"
                    >
                      <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>

                <div v-if="hasGalleryControls" class="sm:hidden mt-6">
                  <div class="text-xs uppercase tracking-[0.22em] text-[var(--ink-soft)] mb-3">
                    Ракурсы
                  </div>
                  <div class="flex gap-2 overflow-x-auto pb-2">
                    <button
                      v-for="(image, index) in currentGallery"
                      :key="`${selected.id}-mobile-${index}`"
                      type="button"
                      class="gallery-thumb"
                      :class="index === galleryIndex ? 'gallery-thumb--active' : ''"
                      @click="setImage(index)"
                      aria-label="Открыть фото"
                    >
                      <img :src="image" :alt="selected.title" class="w-full h-full object-cover" loading="lazy" />
                    </button>
                  </div>
                </div>

                <div class="gallery-modal-signoff mt-6">
                  <div class="gallery-modal-divider"></div>
                  <div class="gallery-modal-meta">
                    <span class="gallery-meta-chip">Визуальный сценарий</span>
                    <span v-if="hasGalleryControls" class="gallery-meta-chip">
                      {{ currentGallery.length }} фото
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '../composables/useBodyScrollLock.js'

import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'
import hero1 from '../assets/optimized/hero/1.webp'
import hero1Mobile from '../assets/optimized/hero/1-mobile.webp'
import hero4 from '../assets/optimized/hero/4.webp'
import hero4Mobile from '../assets/optimized/hero/4-mobile.webp'
import hero5 from '../assets/optimized/hero/5.webp'
import hero5Mobile from '../assets/optimized/hero/5-mobile.webp'
import hero13 from '../assets/optimized/hero/13.webp'
import hero13Mobile from '../assets/optimized/hero/13-mobile.webp'

import alley1 from '../assets/optimized/objects/alley/1.webp'
import alley1Mobile from '../assets/optimized/objects/alley/1-mobile.webp'
import alley2 from '../assets/optimized/objects/alley/2.webp'
import alley2Mobile from '../assets/optimized/objects/alley/2-mobile.webp'
import alley5 from '../assets/optimized/objects/alley/5.webp'
import alley5Mobile from '../assets/optimized/objects/alley/5-mobile.webp'

import hotel1 from '../assets/optimized/objects/hotel/1.webp'
import hotel1Mobile from '../assets/optimized/objects/hotel/1-mobile.webp'
import hotel2 from '../assets/optimized/objects/hotel/2.webp'
import hotel2Mobile from '../assets/optimized/objects/hotel/2-mobile.webp'
import hotel3 from '../assets/optimized/objects/hotel/3.webp'
import hotel3Mobile from '../assets/optimized/objects/hotel/3-mobile.webp'

const scenarios = [
  {
    id: 'masterplan',
    title: 'Общий образ территории',
    eyebrow: 'Масштаб',
    description: 'Как жилые кварталы, общественные зоны и маршруты складываются в единую среду.',
    full:
      'Этот сценарий помогает увидеть не отдельные здания, а целостную среду. С высоты считывается структура кварталов, общественных зон и прогулочных направлений, благодаря чему посетитель быстрее понимает масштаб и логику будущего комплекса.',
    note: 'Лучший ракурс, чтобы сначала почувствовать общий масштаб и устройство территории.',
    highlights: [
      'Показывает, как жилая среда связана с общественными пространствами',
      'Помогает быстро понять масштаб проекта без перегруза деталями',
      'Даёт цельное первое представление о будущем ритме территории'
    ],
    image: overview,
    imageMobile: overviewMobile,
    gallery: [overview, hero1],
    galleryMobile: [overviewMobile, hero1Mobile],
    layout: 'lg:col-span-7 lg:row-span-2',
    compact: false
  },
  {
    id: 'cultural-axis',
    title: 'Аллея родовых групп Тувы',
    eyebrow: 'Культура',
    description: 'Смысловое ядро комплекса с этнокультурной символикой и пространством для церемоний.',
    full:
      'Здесь территория раскрывается как культурное пространство, а не просто как застройка. Аллея родовых групп Тувы задаёт символический центр комплекса, объединяет маршруты и формирует место, где традиция становится видимой и современной.',
    note: 'Это сердце комплекса, в котором культурный смысл ощущается сильнее всего.',
    highlights: [
      'Формирует главную точку идентичности всего комплекса',
      'Создаёт пространство для церемоний, встреч и культурных событий',
      'Помогает посетителю почувствовать связь места с традицией Тувы'
    ],
    image: alley1,
    imageMobile: alley1Mobile,
    gallery: [alley1, alley2, alley5],
    galleryMobile: [alley1Mobile, alley2Mobile, alley5Mobile],
    layout: 'lg:col-span-5',
    compact: true
  },
  {
    id: 'guest-contour',
    title: 'Гостевой контур',
    eyebrow: 'Гостеприимство',
    description: 'Архитектура размещения для туристов и участников событийной программы.',
    full:
      'Этот сценарий показывает, как комплекс принимает гостей не только через события, но и через комфорт пребывания. Архитектура размещения делает территорию пригодной для более долгого визита и превращает поездку в полноценный опыт, а не в короткий приезд.',
    note: 'Здесь видно, как территория готова принимать гостей и работать круглый год.',
    highlights: [
      'Создаёт комфортный сценарий размещения для туристов и участников событий',
      'Поддерживает более длительное пребывание на территории',
      'Добавляет комплексу ощущение продуманного гостевого сервиса'
    ],
    image: hotel1,
    imageMobile: hotel1Mobile,
    gallery: [hotel1, hotel2, hotel3],
    galleryMobile: [hotel1Mobile, hotel2Mobile, hotel3Mobile],
    layout: 'lg:col-span-5',
    compact: true
  },
  {
    id: 'walking-routes',
    title: 'Пешеходная среда',
    eyebrow: 'Маршруты',
    description: 'Спокойные пространства для прогулок, встреч и постепенного знакомства с территорией.',
    full:
      'Пешеходная среда важна тем, что делает территорию не только красивой на рендере, но и удобной в живом опыте. Именно через маршруты, посадки, освещение и открытые перспективы комплекс начинает восприниматься как место, где хочется идти дальше и проводить время.',
    note: 'Эта часть показывает, насколько территория будет удобной в обычном человеческом ритме.',
    highlights: [
      'Создаёт понятный и интуитивный способ знакомиться с территорией',
      'Делает прогулку самостоятельным ценным сценарием пребывания',
      'Поддерживает ощущение спокойствия, порядка и открытости пространства'
    ],
    image: hero4,
    imageMobile: hero4Mobile,
    gallery: [hero4, hero13],
    galleryMobile: [hero4Mobile, hero13Mobile],
    layout: 'lg:col-span-4',
    compact: true
  },
  {
    id: 'public-leisure',
    title: 'Общественные зоны',
    eyebrow: 'Отдых',
    description: 'Открытые сценарии для семейного отдыха, спорта и спокойного пребывания гостей.',
    full:
      'Общественные зоны показывают, что комплекс рассчитан не только на события или проживание. Здесь появляется повседневная жизнь пространства: семейный отдых, прогулки, неформальные встречи и время, проведённое на территории без спешки.',
    note: 'Сценарий, который делает территорию живой и комфортной для разных возрастов.',
    highlights: [
      'Подходит для семейного досуга и спокойного отдыха',
      'Усиливает чувство живой среды, а не только проектного макета',
      'Добавляет территории регулярный повседневный ритм'
    ],
    image: hero5,
    imageMobile: hero5Mobile,
    gallery: [hero5, hero1],
    galleryMobile: [hero5Mobile, hero1Mobile],
    layout: 'lg:col-span-4',
    compact: true
  },
  {
    id: 'first-impression',
    title: 'Первое впечатление',
    eyebrow: 'Входная группа',
    description: 'Ракурс, который сразу задаёт характер пространства и ощущение организованной среды.',
    full:
      'Первое впечатление работает мгновенно: ещё до знакомства с деталями человек считывает аккуратность, статус и характер комплекса. Этот сценарий помогает понять, как территория встречает гостя и каким будет её общее эмоциональное звучание.',
    note: 'Именно здесь формируется эмоциональное ожидание от всей территории.',
    highlights: [
      'Создаёт убедительное и запоминающееся первое впечатление',
      'Помогает территории выглядеть цельной и продуманной с первых секунд',
      'Поддерживает ощущение культурного, а не случайного пространства'
    ],
    image: hero13,
    imageMobile: hero13Mobile,
    gallery: [hero13, hero4],
    galleryMobile: [hero13Mobile, hero4Mobile],
    layout: 'lg:col-span-4',
    compact: true
  }
]

const isOpen = ref(false)
const isMobileViewport = ref(false)
const selected = ref(null)
const galleryIndex = ref(0)
const panelRef = ref(null)
const touch = ref({ x: 0, y: 0 })

const currentGallery = computed(() => {
  if (!selected.value) return []
  if (isMobileViewport.value && selected.value.galleryMobile?.length) return selected.value.galleryMobile
  return selected.value.gallery || []
})

const hasGalleryControls = computed(() => currentGallery.value.length > 1)
const currentImage = computed(() => {
  const gallery = currentGallery.value
  if (!gallery.length) return selected.value?.image || null
  return gallery[Math.min(galleryIndex.value, gallery.length - 1)]
})

const currentGalleryLength = (item) => {
  if (isMobileViewport.value && item.galleryMobile?.length) return item.galleryMobile.length
  return item.gallery?.length || 0
}

const updateViewport = () => {
  isMobileViewport.value = window.matchMedia('(max-width: 767px)').matches
}

const openScenario = async (item) => {
  selected.value = item
  galleryIndex.value = 0
  isOpen.value = true
  lockBodyScroll()

  await nextTick()

  const scrollArea = panelRef.value?.querySelector('.gallery-modal-scroll')
  if (scrollArea) scrollArea.scrollTop = 0
}

const closeScenario = () => {
  isOpen.value = false
  selected.value = null
  galleryIndex.value = 0
  unlockBodyScroll()
}

const prevImage = () => {
  const length = currentGallery.value.length
  if (length <= 1) return
  galleryIndex.value = (galleryIndex.value - 1 + length) % length
}

const nextImage = () => {
  const length = currentGallery.value.length
  if (length <= 1) return
  galleryIndex.value = (galleryIndex.value + 1) % length
}

const setImage = (index) => {
  const length = currentGallery.value.length
  if (!length) return
  galleryIndex.value = Math.max(0, Math.min(index, length - 1))
}

const onTouchStart = (event) => {
  if (!hasGalleryControls.value) return
  const point = event.changedTouches?.[0]
  if (!point) return
  touch.value = { x: point.clientX, y: point.clientY }
}

const onTouchEnd = (event) => {
  if (!hasGalleryControls.value) return
  const point = event.changedTouches?.[0]
  if (!point) return

  const dx = point.clientX - touch.value.x
  const dy = point.clientY - touch.value.y

  if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return

  if (dx > 0) prevImage()
  else nextImage()
}

const handleKeydown = (event) => {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    closeScenario()
    return
  }

  if (!hasGalleryControls.value) return

  if (event.key === 'ArrowLeft') prevImage()
  if (event.key === 'ArrowRight') nextImage()
}

watch(isOpen, (open) => {
  if (open) window.addEventListener('keydown', handleKeydown)
  else window.removeEventListener('keydown', handleKeydown)
})

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
  window.removeEventListener('keydown', handleKeydown)
  try {
    unlockBodyScroll()
  } catch {
    // no-op
  }
})
</script>

<style scoped>
.gallery-guide {
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.9), rgba(255, 250, 241, 0.78)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.1), transparent 42%);
}

.gallery-guide-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(184, 138, 66, 0.18);
  background: rgba(255, 255, 255, 0.64);
  color: var(--title);
  font-size: 0.82rem;
  font-weight: 700;
}

.gallery-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(180deg, rgba(15, 18, 15, 0.72), rgba(15, 18, 15, 0.56)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.14), transparent 42%);
  color: rgba(255, 248, 237, 0.96);
  font-size: 0.84rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  box-shadow: 0 10px 20px rgba(10, 15, 12, 0.14);
}

.gallery-card-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(14, 18, 15, 0.54);
  color: rgba(255, 247, 232, 0.92);
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(10, 15, 12, 0.14);
}

.gallery-card-hint-separator {
  width: 0.28rem;
  height: 0.28rem;
  border-radius: 999px;
  background: rgba(255, 247, 232, 0.55);
}

.gallery-copy {
  max-width: min(100%, 32rem);
  padding: 1.15rem 1.2rem 1.2rem;
  border-radius: 1.55rem;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background:
    linear-gradient(180deg, rgba(10, 13, 10, 0.7), rgba(10, 13, 10, 0.44)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.16), transparent 46%);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
}

.gallery-copy--compact {
  max-width: min(100%, 27rem);
}

.gallery-copy-title,
.gallery-copy-text {
  color: rgba(255, 249, 241, 0.97);
  text-shadow: 0 10px 24px rgba(0, 0, 0, 0.34);
}

.gallery-modal-scroll {
  max-height: calc(100dvh - 24px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.gallery-icon-button,
.gallery-close-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(17, 22, 18, 0.4);
  color: white;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.gallery-icon-button:hover,
.gallery-close-button:hover {
  background: rgba(17, 22, 18, 0.56);
  border-color: rgba(255, 255, 255, 0.24);
  transform: translateY(-1px);
}

.gallery-close-button {
  background: rgba(255, 252, 245, 0.82);
  border-color: rgba(184, 138, 66, 0.18);
  color: var(--title);
}

.gallery-close-button:hover {
  background: rgba(255, 252, 245, 0.96);
  border-color: rgba(184, 138, 66, 0.28);
}

.gallery-counter {
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(17, 22, 18, 0.42);
  color: rgba(255, 248, 236, 0.94);
  font-size: 0.85rem;
  font-weight: 700;
}

.gallery-media-caption {
  max-width: 20rem;
  padding: 1rem 1rem 1.05rem;
  border-radius: 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(10, 13, 10, 0.7), rgba(10, 13, 10, 0.48)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.14), transparent 46%);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
}

.gallery-thumb {
  width: 4.9rem;
  height: 3.5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  opacity: 0.72;
  transition: opacity 180ms ease, transform 180ms ease, border-color 180ms ease;
}

.gallery-thumb:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

.gallery-thumb--active {
  opacity: 1;
  border-color: rgba(184, 138, 66, 0.8);
  box-shadow: 0 0 0 2px rgba(184, 138, 66, 0.22);
}

.gallery-modal-signoff {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-modal-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184, 138, 66, 0.34), transparent);
}

.gallery-modal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.gallery-meta-chip {
  display: inline-flex;
  align-items: center;
  min-height: 2.3rem;
  padding: 0 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(184, 138, 66, 0.18);
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.82), rgba(255, 249, 240, 0.72)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.08), transparent 42%);
  color: var(--title);
  font-size: 0.82rem;
  font-weight: 700;
}

.gallery-modal-enter-active,
.gallery-modal-leave-active {
  transition: opacity 220ms ease;
}

.gallery-modal-enter-from,
.gallery-modal-leave-to {
  opacity: 0;
}

@media (max-width: 1023px) {
  .gallery-copy {
    max-width: min(100%, 29rem);
  }
}

@media (max-width: 767px) {
  .gallery-card-tag,
  .gallery-card-hint {
    padding: 0.55rem 0.8rem;
    font-size: 0.72rem;
  }

  .gallery-copy {
    max-width: 100%;
    padding: 1rem 1rem 1.05rem;
    border-radius: 1.3rem;
  }

  .gallery-copy-title {
    font-size: 2rem !important;
  }

  .gallery-media-caption {
    max-width: 15rem;
  }

  .gallery-thumb {
    width: 4.35rem;
    height: 3.1rem;
  }

  .gallery-meta-chip {
    min-height: 2.15rem;
    padding: 0 0.85rem;
    font-size: 0.76rem;
  }
}
</style>
