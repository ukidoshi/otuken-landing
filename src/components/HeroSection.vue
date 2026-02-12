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
            v-for="(src, idx) in slides"
            :key="src"
            v-show="idx === activeIndex"
            class="absolute inset-0"
        >
          <div
              class="absolute inset-0 bg-center bg-cover will-change-transform"
              :style="bgStyle(src)"
          />
        </div>
      </transition-group>

      <!-- overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,169,97,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(27,91,127,0.25),transparent_55%)]"></div>

      <!-- subtle noise -->
      <div class="absolute inset-0 opacity-[0.09] mix-blend-overlay pointer-events-none noise"></div>

      <!-- floating particles -->
      <div class="absolute inset-0 pointer-events-none">
        <span
            v-for="n in particleCount"
            :key="n"
            class="particle"
            :style="particleStyle(n)"
        ></span>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16">
      <div class="lg:text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A961]/35 bg-black/25 text-xs md:text-sm mb-6 reveal mx-auto">
          <span class="w-2 h-2 rounded-full bg-[#C9A961] animate-pulse"></span>
          Проект в стадии строительства • инвестиционный потенциал
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 reveal">
          Этнокультурный комплекс <span class="text-[#C9A961]">«Отукен»</span>
        </h1>

        <p class="text-base md:text-xl text-white/90 leading-relaxed mb-9 reveal max-w-3xl lg:mx-auto">
          Пространство культуры, событий и туризма в Республике Тыва.
          Мы создаём точку притяжения с инфраструктурой для фестивалей, отдыха и партнёрских проектов.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 reveal lg:justify-center">
          <button
              @click="scrollTo('map')"
              class="bg-[#C9A961] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#B89A50] transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            Посмотреть участки
          </button>

          <button
              @click="scrollTo('about')"
              class="border-2 border-[#C9A961] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C9A961] hover:text-black transition"
          >
            О комплексе
          </button>

          <button
              @click="openAboutPage"
              class="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/15 transition"
          >
            О нас
          </button>
        </div>

        <!-- Mini trust cards -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:max-w-5xl lg:mx-auto">
          <div class="glass-card reveal">
            <div class="text-[#C9A961] font-bold text-lg">Культура</div>
            <div class="text-white/85 text-sm mt-1">традиции + современные форматы</div>
          </div>
          <div class="glass-card reveal">
            <div class="text-[#C9A961] font-bold text-lg">События</div>
            <div class="text-white/85 text-sm mt-1">фестивали, программы, туризм</div>
          </div>
          <div class="glass-card reveal">
            <div class="text-[#C9A961] font-bold text-lg">Инвестиции</div>
            <div class="text-white/85 text-sm mt-1">партнёрства и инфраструктура</div>
          </div>
        </div>
      </div>

      <!-- scroll indicator -->
      <div class="mt-14 flex justify-center">
        <button
            @click="scrollTo('statistics')"
            class="group inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition reveal"
            aria-label="Скролл вниз"
        >
          <span class="text-xs tracking-widest uppercase">Листайте вниз</span>
          <span class="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-1">
            <span class="w-2 h-2 rounded-full bg-[#C9A961] scroll-dot"></span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 23 ФОТО:
 * src/assets/hero/1.jpeg ... 23.jpeg
 */
import s1 from '../assets/hero/1.jpeg'
import s2 from '../assets/hero/2.jpeg'
import s3 from '../assets/hero/3.jpeg'
import s4 from '../assets/hero/4.jpeg'
import s5 from '../assets/hero/5.jpeg'
import s6 from '../assets/hero/6.jpeg'
import s7 from '../assets/hero/7.jpeg'
import s8 from '../assets/hero/8.jpeg'
import s9 from '../assets/hero/9.jpeg'
import s10 from '../assets/hero/10.jpeg'
import s11 from '../assets/hero/11.jpeg'
import s12 from '../assets/hero/12.jpeg'
import s13 from '../assets/hero/13.jpeg'
import s14 from '../assets/hero/14.jpeg'
import s15 from '../assets/hero/15.jpeg'
import s16 from '../assets/hero/16.jpeg'
import s17 from '../assets/hero/17.jpeg'
import s18 from '../assets/hero/18.jpeg'
import s19 from '../assets/hero/19.jpeg'
import s20 from '../assets/hero/20.jpeg'
import s21 from '../assets/hero/21.jpeg'
import s22 from '../assets/hero/22.jpeg'
import s23 from '../assets/hero/23.jpeg'

const slides = [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23]

// --- Mobile / Motion prefs ---
const isMobile = ref(false)
const reduceMotion = ref(false)

const particleCount = computed(() => {
  if (reduceMotion.value) return 0
  return isMobile.value ? 6 : 14
})

// --- slideshow ---
const activeIndex = ref(0)
let timer = null

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

const startAuto = () => {
  stopAuto()
  if (reduceMotion.value) return
  // мобильный: реже, чтобы легче
  const interval = isMobile.value ? 9000 : 6500
  timer = window.setInterval(next, interval)
}
const stopAuto = () => {
  if (timer) window.clearInterval(timer)
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

const bgStyle = (src) => {
  const baseScale = isMobile.value ? 1.03 : 1.08

  if (reduceMotion.value) {
    return {
      backgroundImage: `url('${src}')`,
      transform: `translate3d(0px, 0px, 0) scale(${baseScale})`
    }
  }

  if (isMobile.value) {
    // мобильный: только лёгкий scroll-parallax
    const y = scrollY.value * 0.06
    return {
      backgroundImage: `url('${src}')`,
      transform: `translate3d(0px, ${y}px, 0) scale(${baseScale})`
    }
  }

  // desktop: scroll + mouse
  const y = (scrollY.value * 0.12) + (mouse.value.y * 18)
  const x = mouse.value.x * 10
  return {
    backgroundImage: `url('${src}')`,
    transform: `translate3d(${x}px, ${y}px, 0) scale(${baseScale})`
  }
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const openAboutPage = () => router.push('/about')

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
    const io = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
        { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    onBeforeUnmount(() => io.disconnect())
  }

  startAuto()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDevice)
  window.removeEventListener('scroll', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
  stopAuto()
})

// particles layout (детерминированно)
const particleStyle = (n) => {
  const left = (n * 7) % 100
  const top = (n * 13) % 70
  const size = 6 + (n % 6) * 2
  const delay = (n % 10) * 0.6
  const dur = 10 + (n % 7) * 2
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${dur}s`
  }
}
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

.glass-card {
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  padding: 1rem;
  box-shadow: 0 18px 50px rgba(0,0,0,0.25);
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

/* noise overlay */
.noise {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E");
}

/* floating particles */
.particle {
  position: absolute;
  border-radius: 999px;
  background: rgba(201,169,97,0.18);
  box-shadow: 0 0 24px rgba(201,169,97,0.25);
  animation-name: floaty;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
@keyframes floaty {
  0% { transform: translate3d(0, 0, 0); opacity: 0.55; }
  50% { transform: translate3d(12px, -18px, 0); opacity: 0.9; }
  100% { transform: translate3d(0, 0, 0); opacity: 0.55; }
}

/* Mobile optimization */
@media (max-width: 1024px) {
  .noise { opacity: 0.05; }
  .particle { opacity: 0.35; box-shadow: 0 0 12px rgba(201,169,97,0.18); }
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .particle { display: none; }
  .scroll-dot { animation: none; }
  .fade-enter-active, .fade-leave-active { transition: none; }
  .reveal { transition: none; transform: none; opacity: 1; }
}
</style>