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
        <div class="hero-panel">
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

import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'

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

.hero-panel {
  padding: 2rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(10, 13, 9, 0.48), rgba(13, 17, 13, 0.62)),
    radial-gradient(circle at top, rgba(201, 169, 97, 0.12), transparent 46%);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.22);
}

.hero-title {
  text-shadow: 0 14px 42px rgba(0, 0, 0, 0.5);
}

.hero-copy {
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.44);
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
}
</style>
