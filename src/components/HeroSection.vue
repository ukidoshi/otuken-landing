<template>
  <section id="hero" class="relative min-h-[92vh] md:min-h-screen overflow-hidden text-white">
    <div class="absolute inset-0">
      <div
        v-for="(slide, index) in slides"
        :key="slide.src"
        class="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
        :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
      >
        <picture>
          <source v-if="slide.mobileSrc" :srcset="slide.mobileSrc" media="(max-width: 767px)" />
          <img
            :src="slide.src"
            :alt="slide.alt"
            class="w-full h-full object-cover hero-image"
            :style="{ objectPosition: slide.focus || 'center center' }"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
          />
        </picture>
      </div>

      <div class="absolute inset-0 bg-gradient-to-b from-black/78 via-black/56 to-black/82"></div>
      <div class="absolute inset-0 hero-overlay"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto min-h-[92vh] md:min-h-screen flex flex-col justify-center px-4 md:px-8 py-16 md:py-24">
      <div class="max-w-4xl lg:mx-auto lg:text-center">
        <div class="hero-panel hero-panel--enter">
          <div class="hero-logo-wrap mb-6 lg:mx-auto">
            <img
              :src="heroLogoSrc"
              alt="Логотип этнокультурного комплекса «Өтүкен»"
              width="160"
              height="160"
              class="hero-logo"
              decoding="async"
              fetchpriority="high"
            />
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A961]/30 bg-black/36 text-xs md:text-sm mb-6 lg:mx-auto">
            <span class="w-2 h-2 rounded-full bg-[#C9A961]"></span>
            Республика Тыва • проект в стадии строительства
          </div>

          <h1 class="hero-title display-font text-5xl md:text-7xl lg:text-[5.8rem] leading-[0.92] mb-6">
            Этнокультурный комплекс <span class="text-[#C9A961]">«Өтүкен»</span>
          </h1>

          <p class="hero-copy text-base md:text-xl text-white/92 leading-relaxed mb-9 max-w-3xl lg:mx-auto">
            Пространство культуры, туризма и событий в Республике Тыва.
            «Өтүкен» объединяет этнокультурную среду, инфраструктуру для отдыха и площадки для крупных мероприятий.
          </p>

          <div
            v-if="featuredEvent"
            :class="[
              'hero-event-toast max-w-2xl lg:mx-auto',
              latestNews?.slug ? 'mb-6' : 'mb-8'
            ]"
          >
            <div class="hero-event-mark" aria-hidden="true"></div>

            <div class="hero-event-copy">
              <div class="hero-event-label">
                Предстоящее событие
              </div>
              <div class="hero-event-title">
                {{ featuredEvent.title }}
              </div>
              <div class="hero-event-meta">
                {{ featuredEvent.dateText }} • Республика Тыва
              </div>
            </div>

            <button
              type="button"
              class="hero-event-button"
              @click="scrollTo('festival')"
            >
              Подробнее
            </button>
          </div>

          <div
            v-if="latestNews?.slug"
            class="hero-event-toast mb-8 max-w-2xl lg:mx-auto"
          >
            <div class="hero-event-mark" aria-hidden="true"></div>

            <div class="hero-event-copy">
              <div class="hero-event-label">
                Актуальная новость
              </div>
              <div class="hero-event-title">
                {{ latestNews.title }}
              </div>
              <p v-if="latestNews.excerpt" class="hero-news-preview">
                {{ latestNews.excerpt }}
              </p>
            </div>

            <button
              type="button"
              class="hero-event-button"
              @click="scrollTo('home-news')"
            >
              Подробнее
            </button>
          </div>

          <div class="flex justify-center">
            <button @click="scrollTo('about')" class="theme-button-primary">
              О проекте
            </button>
          </div>
        </div>
      </div>

      <div class="mt-14 flex justify-center">
        <button
          @click="scrollTo('about')"
          class="group inline-flex flex-col items-center gap-2 text-white/72 hover:text-white transition"
          aria-label="Скролл вниз"
        >
          <span class="text-xs tracking-widest uppercase">Узнать больше</span>
          <span class="w-6 h-10 rounded-full border border-white/26 flex items-center justify-center">
            <span class="w-2 h-2 rounded-full bg-[#C9A961]"></span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { eventCatalog } from '../content/events'
import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'
import heroLogoSrc from '../assets/brand/bayken-hero-logo.png'

defineProps({
  latestNews: {
    type: Object,
    default: null
  }
})

const featuredEvent = eventCatalog[0] ?? null

const slides = ref([
  {
    src: overview,
    mobileSrc: overviewMobile,
    focus: 'center 32%',
    alt: 'Общий план этнокультурного комплекса Өтүкен'
  }
])

const deferredSlideLoaders = [
  {
    loader: () => import('../assets/optimized/hero/15.webp'),
    mobileLoader: () => import('../assets/optimized/hero/15-mobile.webp'),
    focus: 'center center',
    alt: 'Гостевой вид этнокультурного комплекса'
  },
  {
    loader: () => import('../assets/optimized/hero/17.webp'),
    mobileLoader: () => import('../assets/optimized/hero/17-mobile.webp'),
    focus: 'center center',
    alt: 'Ракурс территории комплекса'
  }
]

const activeIndex = ref(0)
const isMobile = ref(false)
const lowPerformanceMode = ref(false)
const reduceMotion = ref(false)

let timer = 0
let deferredSlidesTimer = 0

const getSlideDuration = (index) => {
  if (index === 0) return 14000
  return 10000
}

const stopAuto = () => {
  if (!timer) return
  window.clearTimeout(timer)
  timer = 0
}

const scheduleNext = () => {
  stopAuto()

  if (reduceMotion.value || lowPerformanceMode.value || isMobile.value || slides.value.length < 2 || document.hidden) {
    return
  }

  timer = window.setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.value.length
    scheduleNext()
  }, getSlideDuration(activeIndex.value))
}

const clearDeferredSlidesLoad = () => {
  if (!deferredSlidesTimer) return

  if (typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(deferredSlidesTimer)
  } else {
    window.clearTimeout(deferredSlidesTimer)
  }

  deferredSlidesTimer = 0
}

const loadDeferredSlides = async () => {
  if (slides.value.length > 1 || lowPerformanceMode.value || reduceMotion.value || isMobile.value) {
    scheduleNext()
    return
  }

  const loadedSlides = await Promise.all(
    deferredSlideLoaders.map(async ({ loader, mobileLoader, focus, alt }) => {
      const [module, mobileModule] = await Promise.all([loader(), mobileLoader()])
      return { src: module.default, mobileSrc: mobileModule.default, focus, alt }
    })
  )

  slides.value = [slides.value[0], ...loadedSlides]
  scheduleNext()
}

const scheduleDeferredSlidesLoad = () => {
  clearDeferredSlidesLoad()

  if (reduceMotion.value || lowPerformanceMode.value || isMobile.value) return

  if (typeof window.requestIdleCallback === 'function') {
    deferredSlidesTimer = window.requestIdleCallback(() => {
      deferredSlidesTimer = 0
      loadDeferredSlides()
    }, { timeout: 2400 })
    return
  }

  deferredSlidesTimer = window.setTimeout(() => {
    deferredSlidesTimer = 0
    loadDeferredSlides()
  }, 2200)
}

const detectDevice = () => {
  isMobile.value = window.matchMedia('(max-width: 1024px)').matches
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  lowPerformanceMode.value = Boolean(
    navigator.connection?.saveData ||
    (navigator.deviceMemory && navigator.deviceMemory <= 6)
  )

  activeIndex.value = 0
  scheduleNext()
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAuto()
    return
  }

  scheduleNext()
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return

  const headerOffset = window.innerWidth < 768 ? 88 : 104
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth'
  })
}

onMounted(() => {
  detectDevice()
  scheduleDeferredSlidesLoad()

  window.addEventListener('resize', detectDevice, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDevice)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  clearDeferredSlidesLoad()
  stopAuto()
})
</script>

<style scoped>
.hero-image {
  transform: scale(1.015);
}

.hero-overlay {
  background:
    radial-gradient(circle at 50% 42%, rgba(0, 0, 0, 0.3), transparent 34%),
    radial-gradient(circle at 24% 22%, rgba(201, 169, 97, 0.1), transparent 38%),
    radial-gradient(circle at 80% 30%, rgba(27, 91, 127, 0.12), transparent 42%);
}

@keyframes hero-child-in {
  from {
    opacity: 0;
    transform: translate3d(0, 1rem, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.hero-panel {
  padding: 2rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(10, 13, 9, 0.48), rgba(13, 17, 13, 0.62)),
    radial-gradient(circle at top, rgba(201, 169, 97, 0.12), transparent 46%);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.22);
}

.hero-panel.hero-panel--enter > * {
  opacity: 0;
  animation: hero-child-in 0.92s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-panel.hero-panel--enter > *:nth-child(1) {
  animation-delay: 0.06s;
}
.hero-panel.hero-panel--enter > *:nth-child(2) {
  animation-delay: 0.14s;
}
.hero-panel.hero-panel--enter > *:nth-child(3) {
  animation-delay: 0.22s;
}
.hero-panel.hero-panel--enter > *:nth-child(4) {
  animation-delay: 0.3s;
}
.hero-panel.hero-panel--enter > *:nth-child(5) {
  animation-delay: 0.38s;
}
.hero-panel.hero-panel--enter > *:nth-child(6) {
  animation-delay: 0.46s;
}
.hero-panel.hero-panel--enter > *:nth-child(7) {
  animation-delay: 0.54s;
}
.hero-panel.hero-panel--enter > *:nth-child(8) {
  animation-delay: 0.62s;
}

@media (prefers-reduced-motion: reduce) {
  .hero-panel.hero-panel--enter > * {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

.hero-logo-wrap {
  display: flex;
  justify-content: center;
}

.hero-logo {
  width: 7.5rem;
  height: 7.5rem;
  max-width: 100%;
  object-fit: contain;
  mix-blend-mode: screen;
  filter: drop-shadow(0 10px 28px rgba(201, 169, 97, 0.35));
}

@media (min-width: 768px) {
  .hero-logo {
    width: 10rem;
    height: 10rem;
  }
}

.hero-title {
  text-shadow: 0 14px 42px rgba(0, 0, 0, 0.5);
}

.hero-copy {
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.44);
}

.hero-event-toast {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.05rem 1rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(135deg, rgba(12, 16, 13, 0.62), rgba(18, 23, 18, 0.38)),
    radial-gradient(circle at top left, rgba(201, 169, 97, 0.18), transparent 38%);
  box-shadow:
    0 24px 44px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.hero-event-mark {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(201, 169, 97, 1) 0%, rgba(201, 169, 97, 0.52) 58%, rgba(201, 169, 97, 0) 100%);
  box-shadow: 0 0 24px rgba(201, 169, 97, 0.42);
}

.hero-event-copy {
  min-width: 0;
}

.hero-event-label {
  font-size: 0.72rem;
  line-height: 1;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 0.42rem;
}

.hero-event-title {
  font-size: 1rem;
  line-height: 1.35;
  font-weight: 600;
  color: rgba(255, 249, 237, 0.96);
}

.hero-event-meta {
  margin-top: 0.35rem;
  font-size: 0.88rem;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.72);
}

.hero-news-preview {
  margin-top: 0.45rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.78);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-event-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.9rem;
  padding: 0 1rem;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 97, 0.3);
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.24), rgba(201, 169, 97, 0.12));
  color: #fff6e3;
  font-size: 0.92rem;
  font-weight: 600;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease;
}

.hero-event-button:hover {
  transform: translateY(-1px);
  border-color: rgba(201, 169, 97, 0.46);
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.34), rgba(201, 169, 97, 0.16));
}

.hero-event-button:focus-visible {
  outline: 2px solid rgba(201, 169, 97, 0.58);
  outline-offset: 3px;
}

@media (min-width: 768px) {
  .hero-panel {
    padding: 2.5rem 2.75rem;
  }
}

@media (max-width: 640px) {
  .hero-panel {
    padding: 1.5rem 1rem;
    border-radius: 1.5rem;
  }

  .hero-event-toast {
    grid-template-columns: 1fr;
    justify-items: start;
    gap: 0.75rem;
    padding: 0.95rem;
  }

  .hero-event-mark {
    display: none;
  }

  .hero-event-title {
    font-size: 0.96rem;
  }

  .hero-event-button {
    width: 100%;
  }
}
</style>
