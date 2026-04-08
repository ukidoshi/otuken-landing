<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="objects">
    <div class="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_bottom,rgba(74,111,97,0.08),transparent_70%)] pointer-events-none"></div>
    <div class="max-w-7xl mx-auto relative">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Объекты комплекса
        </div>

        <h2 class="section-title mt-5 mb-5">
          О комплексе «Өтүкен»
        </h2>

        <p class="section-lead">
          Это не один объект, а целая среда: культурные пространства, сервисы для гостей и площадки для событий.
          Нажмите на карточку — откроется описание.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
            v-for="obj in objects"
            :key="obj.id"
            type="button"
            @click="openModal(obj)"
            class="theme-card theme-card-hover group text-left overflow-hidden focus:outline-none focus:ring-2 focus:ring-[rgba(184,138,66,0.35)]"
        >
          <!-- media -->
          <div class="relative h-52 overflow-hidden">
            <img
                v-if="coverImage(obj)"
                :src="coverImage(obj)"
                :alt="obj.title"
                class="w-full h-full object-cover transform group-hover:scale-[1.08] transition duration-700"
                loading="lazy"
            />
            <div
                v-else
                class="w-full h-full flex items-center justify-center placeholder-bg"
            >
              <div class="text-center">
                <div class="w-12 h-12 rounded-2xl bg-white/15 border border-white/15 mx-auto flex items-center justify-center text-white font-bold">
                  {{ obj.badge }}
                </div>
                <div class="mt-2 text-white/90 text-sm font-semibold">
                  Фото появится здесь
                </div>
              </div>
            </div>

            <div class="absolute inset-0 bg-gradient-to-t from-[rgba(7,10,8,0.92)] via-[rgba(7,10,8,0.3)] to-transparent"></div>
            <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,138,66,0.16),transparent_40%)]"></div>

            <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
              <div class="object-card-copy text-white">
                <div class="object-card-kicker text-sm opacity-90">Объект</div>
                <div class="object-card-title text-lg font-bold leading-tight">{{ obj.title }}</div>
              </div>

              <div class="shrink-0 w-10 h-10 rounded-2xl bg-black/30 border border-white/18 flex items-center justify-center text-white/90 shadow-[0_12px_24px_rgba(0,0,0,0.16)] group-hover:bg-black/42 transition">
                ↗
              </div>
            </div>

            <div
                v-if="(obj.gallery?.length || 0) > 1"
                class="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full bg-black/56 border border-white/15 text-white shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
            >
              {{ obj.gallery.length }} фото
            </div>
          </div>

          <!-- content -->
          <div class="p-6">
            <p class="text-sm text-[var(--ink-soft)] leading-7 line-clamp-3">
              {{ obj.short }}
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                  v-for="tag in obj.tags"
                  :key="tag"
                  class="text-xs px-2.5 py-1 rounded-full border border-[rgba(184,138,66,0.22)] bg-white/70 text-[var(--title)] font-semibold"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-5 text-sm font-semibold text-[var(--title)] group-hover:text-[var(--gold-deep)] transition">
              Подробнее →
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- MODAL -->
    <transition name="modal">
      <div
          v-if="isOpen"
          class="fixed inset-0 z-[70] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          @keydown.esc="closeModal"
      >
        <!-- overlay -->
        <div class="absolute inset-0 bg-[rgba(17,22,18,0.68)] backdrop-blur-md" @click="closeModal"></div>

        <!-- panel: scrollable on mobile -->
        <div
            ref="panelRef"
            class="theme-card relative w-full max-w-4xl overflow-hidden"
            :style="panelStyle"
        >
          <!-- SCROLL AREA -->
          <div class="modal-scroll">
            <!-- top: gallery / hero media -->
            <div class="relative">
              <div class="relative h-56 md:h-72">
                <!-- main image -->
                <img
                    v-if="currentImage"
                    :src="currentImage"
                    :alt="selected?.title"
                    class="w-full h-full object-cover select-none"
                    draggable="false"
                    @touchstart="onTouchStart"
                    @touchend="onTouchEnd"
                />
                <div
                    v-else
                    class="w-full h-full placeholder-bg flex items-center justify-center"
                >
                  <div class="text-center">
                    <div class="w-14 h-14 rounded-2xl bg-white/15 border border-white/15 mx-auto flex items-center justify-center text-white font-bold text-lg">
                      {{ selected?.badge }}
                    </div>
                    <div class="mt-2 text-white/90 text-sm font-semibold">
                      Изображение объекта (плейсхолдер)
                    </div>
                  </div>
                </div>

                <!-- gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/0"></div>

                <!-- title + close -->
                <div class="absolute bottom-4 left-5 right-5 flex items-start justify-between gap-4">
                  <div class="text-white">
                    <div class="text-xs uppercase tracking-[0.24em] text-white/70">Объект комплекса</div>
                    <div class="display-font text-3xl md:text-4xl leading-none mt-2">
                      {{ selected?.title }}
                    </div>
                  </div>

                  <button
                      type="button"
                      @click="closeModal"
                      class="shrink-0 w-10 h-10 rounded-2xl bg-white/12 border border-white/15 text-white hover:bg-white/18 transition"
                      aria-label="Закрыть"
                  >
                    ✕
                  </button>
                </div>

                <!-- gallery controls (only if >1) -->
                <div
                    v-if="hasGalleryControls"
                    class="absolute top-4 left-4 right-4 flex items-center justify-between gap-3"
                >
                  <button
                      type="button"
                      @click.stop="prevImg"
                    class="w-10 h-10 rounded-2xl bg-black/30 border border-white/15 text-white hover:bg-black/40 transition"
                      aria-label="Предыдущее фото"
                  >
                    ‹
                  </button>

                  <div class="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/15 text-white/90">
                    {{ galleryIndex + 1 }} / {{ selected?.gallery?.length || 1 }}
                  </div>

                  <button
                      type="button"
                      @click.stop="nextImg"
                    class="w-10 h-10 rounded-2xl bg-black/30 border border-white/15 text-white hover:bg-black/40 transition"
                      aria-label="Следующее фото"
                  >
                    ›
                  </button>
                </div>
              </div>

              <!-- thumbnails -->
              <div v-if="hasGalleryControls" class="px-5 pt-4">
                <div class="flex gap-2 overflow-x-auto pb-2 modal-thumbs">
                  <button
                      v-for="(img, idx) in selected.gallery"
                      :key="img + idx"
                      type="button"
                      @click="setImg(idx)"
                      class="shrink-0 w-20 h-14 rounded-xl overflow-hidden border transition"
                      :class="idx === galleryIndex ? 'border-[var(--gold)] ring-2 ring-[rgba(184,138,66,0.3)]' : 'border-[rgba(184,138,66,0.16)] hover:border-[rgba(184,138,66,0.42)]'"
                      aria-label="Открыть фото"
                  >
                    <img :src="img" class="w-full h-full object-cover" :alt="selected.title" loading="lazy" />
                  </button>
                </div>
              </div>
            </div>

            <!-- body -->
            <div class="p-6 md:p-8">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div class="md:col-span-8">
                  <div class="text-sm font-semibold text-[var(--title)] mb-2">Описание</div>
                  <p class="text-sm md:text-base text-[var(--ink-soft)] leading-8">
                    {{ selected?.full }}
                  </p>

                  <div v-if="selected?.points?.length" class="mt-5 space-y-2">
                    <div class="text-sm font-semibold text-[var(--title)]">Ключевые функции</div>
                    <ul class="space-y-2">
                      <li v-for="p in selected.points" :key="p" class="flex gap-3 text-sm text-[var(--ink)]">
                        <span class="mt-1 w-2.5 h-2.5 rounded-full bg-[var(--gold)]"></span>
                        <span>{{ p }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="md:col-span-4">
                  <div class="theme-card p-5">
                    <div class="text-sm font-semibold text-[var(--title)]">Теги</div>
                    <div class="mt-3 flex flex-wrap gap-2">
                      <span
                          v-for="tag in selected?.tags || []"
                          :key="tag"
                          class="text-xs px-2.5 py-1 rounded-full border border-[rgba(184,138,66,0.22)] bg-white/70 text-[var(--title)] font-semibold"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <div class="mt-5 text-xs text-[var(--ink-soft)] leading-relaxed">
                      Часть объектов находится в стадии проектирования/строительства — информация будет дополняться по мере реализации.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- bottom line -->
            <div class="px-6 md:px-8 py-4 border-t border-[rgba(184,138,66,0.16)] flex items-center justify-between gap-4">
              <button
                  type="button"
                  class="text-sm font-semibold text-[var(--title)] hover:text-[var(--gold-deep)] transition"
                  @click="closeModal"
              >
                Закрыть
              </button>
            </div>
          </div>
          <!-- /SCROLL AREA -->
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

/**
 * Картинки:
 * - Можно использовать одну image или массив gallery.
 * - cover в карточке берём: gallery[0] или image
 *
 * Добавить фото можно так:
 * import alley1 from '../assets/objects/alley/1.jpg'
 * import alley2 from '../assets/objects/alley/2.jpg'
 * gallery: [alley1, alley2]
 */

import alley1 from '../assets/objects/alley/1.jpeg'
import alley2 from '../assets/objects/alley/2.jpeg'
import alley3 from '../assets/objects/alley/3.jpeg'
import alley4 from '../assets/objects/alley/4.jpeg'
import alley5 from '../assets/objects/alley/5.jpeg'
import alley6 from '../assets/objects/alley/6.jpeg'
import alley7 from '../assets/objects/alley/7.jpeg'
import alley8 from '../assets/objects/alley/8.jpeg'
import alley9 from '../assets/objects/alley/9.jpeg'

import hotel1 from '../assets/objects/hotel/1.jpeg'
import hotel2 from '../assets/objects/hotel/2.jpeg'
import hotel3 from '../assets/objects/hotel/3.jpeg'

const objects = [
  {
    id: 'alley',
    title: 'Аллея родовых групп Тувы',
    badge: 'АР',
    image: null,
    gallery: [alley1, alley2, alley3, alley4, alley5, alley6, alley7, alley8, alley9],
    short:
        'Центральное культурное пространство, объединяющее родовые группы и формирующее символику комплекса.',
    full:
        'Аллея родовых групп Тувы — смысловой центр «Өтүкена». Здесь соединяются традиции, идентичность и современная подача: место для церемоний, встреч, фестивальных активностей и культурных инициатив.',
    tags: ['Культура', 'Идентичность', 'События'],
    points: [
      'Культурные и торжественные мероприятия',
      'Пространство для экспозиций и символики родов',
      'Точка притяжения для гостей комплекса'
    ]
  },
  {
    id: 'yurt-town',
    title: 'Юрточный городок',
    badge: 'ЮГ',
    image: null,
    gallery: [],
    short:
        'Этно-проживание и погружение в традиционный быт: гостевые юрты, программы и атмосферные зоны отдыха.',
    full:
        'Юрточный городок формирует уникальный опыт пребывания: комфортное этно-проживание, тематические программы, мастер-классы и возможность “жить внутри культуры”.',
    tags: ['Проживание', 'Туризм', 'Опыт'],
    points: [
      'Гостевые форматы проживания',
      'Этно-программы и мастер-классы',
      'Семейный отдых и турпоток'
    ]
  },
  {
    id: 'hippodrome',
    title: 'Ипподром',
    badge: 'ИП',
    image: null,
    gallery: [],
    short:
        'Площадка для конных соревнований и праздников: традиционные виды спорта и зрелищные события.',
    full:
        'Ипподром — ключевая спортивно-событийная точка: соревнования, показательные выступления, праздники и активности, которые усиливают привлекательность комплекса для туристов и гостей региона.',
    tags: ['Спорт', 'События', 'Традиции'],
    points: [
      'Конные соревнования и праздники',
      'Показательные выступления',
      'Зрелищная программа для гостей'
    ]
  },
  {
    id: 'restaurant',
    title: 'Ресторан',
    badge: 'РС',
    image: null,
    gallery: [],
    short:
        'Гастрономический центр: кухня региона, сервис для мероприятий и комфортный формат для гостей комплекса.',
    full:
        'Ресторан — важная часть гостевого сервиса. Он поддерживает событийную программу, формирует гастрономическую точку притяжения и повышает среднюю продолжительность пребывания гостей.',
    tags: ['Сервис', 'Гастро', 'Мероприятия'],
    points: [
      'Кухня региона и гостевой сервис',
      'Питание для участников мероприятий',
      'Повышение комфорта и времени пребывания'
    ]
  },
  {
    id: 'power-place',
    title: 'Место силы',
    badge: 'МС',
    image: null,
    gallery: [],
    short:
        'Тихая зона смысла и атмосферы: пространство для созерцания, традиций и внутреннего “переключения”.',
    full:
        'Место силы — часть культурного ландшафта комплекса. Это пространство тишины, созерцания и уважения к традиции, которое усиливает эмоциональную ценность посещения.',
    tags: ['Смысл', 'Природа', 'Атмосфера'],
    points: [
      'Спокойная зона для прогулок и созерцания',
      'Усиление атмосферы и “памяти места”',
      'Точка для фото и личного опыта'
    ]
  },
  {
    id: 'hotel',
    title: 'Гостиничный комплекс',
    badge: 'ГК',
    image: null,
    gallery: [hotel1, hotel2, hotel3],
    short:
        'Комфортное размещение туристов и участников событий. Основа круглогодичного функционирования комплекса.',
    full:
        'Гостиничный комплекс повышает устойчивость проекта: размещение для гостей и участников мероприятий, удобные форматы проживания и возможность продлить пребывание на территории «Өтүкена».',
    tags: ['Проживание', 'Круглый год', 'Туризм'],
    points: [
      'Размещение гостей и участников событий',
      'Стабильная загрузка при событийной программе',
      'Круглогодичная модель работы'
    ]
  },
  {
    id: 'museum',
    title: 'Музей культуры КМНС',
    badge: 'МК',
    image: null,
    gallery: [],
    short:
        'Экспозиционное пространство: культура и наследие коренных малочисленных народов Сибири в современном формате.',
    full:
        'Музей культуры КМНС — образовательное и культурное ядро: экспозиции, выставки, лекции и программы, которые делают комплекс содержательным и интересным для разных аудиторий.',
    tags: ['Музей', 'Образование', 'Наследие'],
    points: [
      'Экспозиции и временные выставки',
      'Образовательные программы',
      'Культурная коммуникация для гостей'
    ]
  },
  {
    id: 'aquapark',
    title: 'Аквапарк',
    badge: 'АК',
    image: null,
    gallery: [],
    short:
        'Семейный досуг и развлечения. Объект, усиливающий круглогодичную привлекательность комплекса.',
    full:
        'Аквапарк — элемент семейного отдыха и долгого пребывания. Он помогает удерживать поток гостей вне сезонности и дополняет культурную часть комплекса сервисом и развлечениями.',
    tags: ['Семья', 'Досуг', 'Круглый год'],
    points: [
      'Развлекательный формат для семей',
      'Снижение сезонности',
      'Рост времени пребывания гостей'
    ]
  },
  {
    id: 'archery',
    title: 'Стадион стрельбы из лука',
    badge: 'ЛУ',
    image: null,
    gallery: [],
    short:
        'Площадка для тренировок и соревнований. Современный объект под традиционный вид спорта.',
    full:
        'Стадион стрельбы из лука поддерживает спортивное направление комплекса: соревнования, турниры, тренировки и демонстрационные программы для гостей.',
    tags: ['Спорт', 'Соревнования', 'Традиции'],
    points: [
      'Соревнования и турниры',
      'Тренировочная база',
      'Зрелищные активности для гостей'
    ]
  }
]

const isOpen = ref(false)
const selected = ref(null)

// --- gallery state ---
const galleryIndex = ref(0)
const touch = ref({ x: 0, y: 0 })

const hasGalleryControls = computed(() => (selected.value?.gallery?.length || 0) > 1)
const currentImage = computed(() => {
  const g = selected.value?.gallery || []
  if (g.length) return g[Math.min(galleryIndex.value, g.length - 1)]
  return selected.value?.image || null
})

const coverImage = (obj) => (obj.gallery?.length ? obj.gallery[0] : obj.image)

// --- modal sizing (scroll inside) ---
const panelRef = ref(null)
const panelStyle = computed(() => ({
  maxHeight: 'calc(100dvh - 24px)' // важно для мобильных браузеров
}))

const lockBodyScroll = () => {
  // фикс для iOS: сохраняем позицию и фиксируем body
  const y = window.scrollY || 0
  document.body.dataset.scrollY = String(y)
  document.body.style.position = 'fixed'
  document.body.style.top = `-${y}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
}

const unlockBodyScroll = () => {
  const y = parseInt(document.body.dataset.scrollY || '0', 10)
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  delete document.body.dataset.scrollY
  window.scrollTo(0, y)
}

const openModal = async (obj) => {
  selected.value = obj
  galleryIndex.value = 0
  isOpen.value = true
  lockBodyScroll()
  await nextTick()
  // прокручиваем модалку в начало (если до этого была прокрутка)
  const el = panelRef.value?.querySelector('.modal-scroll')
  if (el) el.scrollTop = 0
}

const closeModal = () => {
  isOpen.value = false
  selected.value = null
  galleryIndex.value = 0
  unlockBodyScroll()
}

const prevImg = () => {
  const len = selected.value?.gallery?.length || 0
  if (len <= 1) return
  galleryIndex.value = (galleryIndex.value - 1 + len) % len
}
const nextImg = () => {
  const len = selected.value?.gallery?.length || 0
  if (len <= 1) return
  galleryIndex.value = (galleryIndex.value + 1) % len
}
const setImg = (idx) => {
  const len = selected.value?.gallery?.length || 0
  if (!len) return
  galleryIndex.value = Math.max(0, Math.min(idx, len - 1))
}

// swipe (мобилка): листаем картинки
const onTouchStart = (e) => {
  if (!hasGalleryControls.value) return
  const t = e.changedTouches?.[0]
  if (!t) return
  touch.value = { x: t.clientX, y: t.clientY }
}
const onTouchEnd = (e) => {
  if (!hasGalleryControls.value) return
  const t = e.changedTouches?.[0]
  if (!t) return
  const dx = t.clientX - touch.value.x
  const dy = t.clientY - touch.value.y
  if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
  if (dx > 0) prevImg()
  else nextImg()
}

onBeforeUnmount(() => {
  // на всякий случай
  try { unlockBodyScroll() } catch {}
})
</script>

<style scoped>
.placeholder-bg {
  background: radial-gradient(circle at 25% 25%, rgba(201,169,97,0.35), transparent 55%),
  radial-gradient(circle at 80% 30%, rgba(27,91,127,0.35), transparent 55%),
  linear-gradient(135deg, #0F3A4F, #1B5B7F);
}

.object-card-copy {
  max-width: min(100%, 15rem);
  padding: 0.7rem 0.85rem 0.8rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(10, 13, 10, 0.62), rgba(10, 13, 10, 0.34)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.16), transparent 46%);
  backdrop-filter: blur(14px);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.16);
}

.object-card-kicker,
.object-card-title {
  color: rgba(255, 249, 241, 0.96);
  text-shadow: 0 8px 22px rgba(0, 0, 0, 0.36);
}

/* modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 220ms ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

/* IMPORTANT: scroll inside modal, works on mobile */
.modal-scroll {
  max-height: calc(100dvh - 24px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* nicer thumbs scroller */
.modal-thumbs::-webkit-scrollbar {
  height: 8px;
}
.modal-thumbs::-webkit-scrollbar-thumb {
  background: rgba(201, 169, 97, 0.35);
  border-radius: 999px;
}
</style>
