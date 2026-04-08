<template>
  <section
      id="hero"
      class="relative min-h-[92vh] md:min-h-screen overflow-hidden text-white"
      @mousemove="!isMobile && onMouseMove($event)"
  >
    <!-- BACKGROUND SLIDES -->
    <div class="absolute inset-0">
      <transition-group name="fade" tag="div" class="absolute inset-0">
        <div
            v-for="(slide, idx) in slides"
            :key="slide.src"
            v-show="idx === activeIndex"
            class="absolute inset-0"
        >
          <div
              class="absolute inset-0 bg-center bg-cover will-change-transform"
              :style="bgStyle(slide)"
          />
        </div>
      </transition-group>

      <!-- overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/82 via-black/58 to-black/86"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0.42),transparent_34%),radial-gradient(circle_at_24%_22%,rgba(201,169,97,0.16),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(27,91,127,0.18),transparent_48%)]"></div>
    </div>

    <!-- CONTENT -->
    <div class="relative z-10 max-w-7xl mx-auto min-h-[92vh] md:min-h-screen flex flex-col justify-center px-4 md:px-8 py-16 md:py-24">
      <div class="max-w-4xl lg:mx-auto lg:text-center">
        <div class="hero-panel reveal">
          <div class="absolute inset-0 pointer-events-none hero-panel-glow"></div>

          <div class="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A961]/35 bg-black/30 text-xs md:text-sm mb-6 lg:mx-auto">
          <span class="w-2 h-2 rounded-full bg-[#C9A961] animate-pulse"></span>
          Республика Тыва • проект в стадии строительства
          </div>

          <h1 class="hero-title display-font relative z-10 text-5xl md:text-7xl lg:text-[5.8rem] leading-[0.92] mb-6">
            Этнокультурный комплекс <span class="text-[#C9A961]">«Өтүкен»</span>
          </h1>

          <p class="hero-copy relative z-10 text-base md:text-xl text-white/92 leading-relaxed mb-9 max-w-3xl lg:mx-auto">
            Пространство культуры, туризма и событий в Республике Тыва.
            «Өтүкен» объединяет этнокультурную среду, инфраструктуру для отдыха и площадки для крупных мероприятий.
          </p>

          <div class="relative z-10 flex justify-center">
            <button
                @click="scrollTo('about')"
                class="theme-button-primary"
            >
              О проекте
            </button>
          </div>
        </div>
      </div>

      <!-- scroll indicator -->
      <div class="mt-14 flex justify-center">
        <button
            @click="scrollTo('about')"
            class="group inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition reveal"
            aria-label="Скролл вниз"
        >
          <span class="text-xs tracking-widest uppercase">Узнать больше</span>
          <span class="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-1">
            <span class="w-2 h-2 rounded-full bg-[#C9A961] scroll-dot"></span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import s4 from '../assets/hero/4.jpeg'
import s13 from '../assets/hero/13.jpeg'
import s15 from '../assets/hero/15.jpeg'
import s17 from '../assets/hero/17.jpeg'
import overview from '../assets/hero/overview.jpeg'

const slides = [
  { src: overview, focus: 'center 32%' },
  { src: s17, focus: 'center center' },
  { src: s15, focus: 'center center' },
  { src: s13, focus: 'center center' },
  { src: s4, focus: 'center center' }
]

// --- Mobile / Motion prefs ---
const isMobile = ref(false)
const reduceMotion = ref(false)

// --- slideshow ---
const activeIndex = ref(0)
let timer = null
let revealObserver = null

const getSlideDuration = (index) => {
  if (index === 0) return isMobile.value ? 14000 : 11500
  return isMobile.value ? 8500 : 6500
}

const scheduleNext = () => {
  stopAuto()
  if (reduceMotion.value || slides.length < 2) return

  timer = window.setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length
    scheduleNext()
  }, getSlideDuration(activeIndex.value))
}

const startAuto = () => scheduleNext()

const stopAuto = () => {
  if (timer) window.clearTimeout(timer)
  timer = null
}

// --- Parallax state ---
const mouse = ref({ x: 0, y: 0 })
const scrollY = ref(0)

let rafId = 0
const onScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    scrollY.value = window.scrollY || 0
    rafId = 0
  })
}

const onMouseMove = (e) => {
  if (isMobile.value || reduceMotion.value) return
  const { innerWidth, innerHeight } = window
  mouse.value.x = (e.clientX / innerWidth - 0.5) * 2
  mouse.value.y = (e.clientY / innerHeight - 0.5) * 2
}

const bgStyle = (slide) => {
  const baseScale = isMobile.value ? 1.01 : 1.04

  if (reduceMotion.value) {
    return {
      backgroundImage: `url('${slide.src}')`,
      backgroundPosition: slide.focus || 'center center',
      transform: `translate3d(0px, 0px, 0) scale(${baseScale})`
    }
  }

  if (isMobile.value) {
    const y = scrollY.value * 0.03
    return {
      backgroundImage: `url('${slide.src}')`,
      backgroundPosition: slide.focus || 'center center',
      transform: `translate3d(0px, ${y}px, 0) scale(${baseScale})`
    }
  }

  const y = (scrollY.value * 0.08) + (mouse.value.y * 10)
  const x = mouse.value.x * 6
  return {
    backgroundImage: `url('${slide.src}')`,
    backgroundPosition: slide.focus || 'center center',
    transform: `translate3d(${x}px, ${y}px, 0) scale(${baseScale})`
  }
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

const detectDevice = () => {
  isMobile.value = window.matchMedia('(max-width: 1024px)').matches
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startAuto()
}

onMounted(() => {
  detectDevice()

  window.addEventListener('resize', detectDevice, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })

  // reveal animations: reduce motion => show instantly
  const els = document.querySelectorAll('.reveal')
  if (reduceMotion.value) {
    els.forEach((el) => el.classList.add('is-visible'))
  } else {
    revealObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
        { threshold: 0.12 }
    )
    els.forEach((el) => revealObserver.observe(el))
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDevice)
  window.removeEventListener('scroll', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
  if (revealObserver) revealObserver.disconnect()
  stopAuto()
})
</script>

<style scoped>
/* fade between slides */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 900ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* reveal */
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 900ms ease, transform 900ms ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-panel {
  position: relative;
  padding: 2rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(10, 13, 9, 0.32), rgba(13, 17, 13, 0.52)),
    radial-gradient(circle at top, rgba(201, 169, 97, 0.15), transparent 46%),
    radial-gradient(circle at bottom right, rgba(87, 126, 109, 0.12), transparent 34%);
  backdrop-filter: blur(10px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
}

.hero-panel-glow {
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.1), transparent 28%, transparent 74%, rgba(255, 255, 255, 0.05));
}

.hero-title {
  text-shadow: 0 14px 42px rgba(0, 0, 0, 0.5);
}

.hero-copy {
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.44);
}

/* scroll dot */
.scroll-dot {
  animation: scrollDot 1.4s ease-in-out infinite;
}
@keyframes scrollDot {
  0% { transform: translateY(0); opacity: 0.8; }
  60% { transform: translateY(18px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.7; }
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

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .scroll-dot { animation: none; }
  .fade-enter-active, .fade-leave-active { transition: none; }
  .reveal { transition: none; transform: none; opacity: 1; }
}
</style>
