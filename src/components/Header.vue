<template>
  <nav
      :class="[
        'fixed top-0 left-0 right-0 z-50 px-3 md:px-6 py-3 transition-all duration-500',
        isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      ]"
  >
    <div class="header-shell max-w-7xl mx-auto flex justify-between items-center gap-4">
      <RouterLink
          to="/"
          class="header-brand"
          @click="closeMenu"
      >
        ӨТҮКЕН
      </RouterLink>

      <div class="hidden md:flex items-center gap-3">
        <ul class="header-menu list-none items-center">
        <li v-for="item in menuItems" :key="item.label">
          <button
              v-if="item.type === 'section'"
              @click="goToMainOrScroll(item.target)"
              class="header-link"
          >
            {{ item.label }}
          </button>

          <RouterLink
              v-else
              :to="item.target"
              class="header-link"
          >
            {{ item.label }}
          </RouterLink>
        </li>
        </ul>

        <button
            @click="goToMainOrScroll('contact')"
            class="header-cta"
        >
          Связаться
        </button>
      </div>

      <button
          type="button"
          class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[rgba(184,138,66,0.2)] bg-[rgba(252,248,241,0.88)] text-[var(--title)] text-2xl shadow-[0_12px_28px_rgba(80,58,24,0.12)]"
          aria-label="Открыть меню"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
      >
        <span v-if="!isMenuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <transition name="mobile-menu">
      <div
          v-if="isMenuOpen"
          class="md:hidden max-w-7xl mx-auto mt-3 rounded-[1.75rem] border border-[rgba(184,138,66,0.2)] bg-[rgba(252,248,241,0.97)] backdrop-blur-2xl overflow-hidden shadow-[0_24px_60px_rgba(80,58,24,0.1)]"
      >
        <div class="px-3 py-3 space-y-1">
          <button
              v-for="item in menuItems"
              :key="`mobile-${item.label}`"
              type="button"
              class="w-full text-left px-4 py-3 rounded-xl text-[var(--ink)] font-medium hover:bg-[rgba(74,111,97,0.08)] transition"
              @click="handleMobileAction(item)"
          >
            {{ item.label }}
          </button>

          <button
              type="button"
              class="w-full mt-2 text-left px-4 py-3 rounded-xl bg-[var(--gold)] text-black font-semibold hover:bg-[var(--gold-deep)] transition shadow-[0_18px_30px_rgba(184,138,66,0.18)]"
              @click="goToMainOrScroll('contact')"
          >
            Связаться
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isHeaderVisible = ref(route.path !== '/')
const isHomeRoute = computed(() => route.path === '/')

const menuItems = [
  { label: 'О комплексе', type: 'section', target: 'about' },
  { label: 'Участки', type: 'section', target: 'map' },
  { label: 'О нас', type: 'route', target: '/about' },
  { label: 'Контакты', type: 'section', target: 'contact' }
]

const getHeaderOffset = () => (window.innerWidth < 768 ? 88 : 104)

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth'
  })
}

const goToMainOrScroll = async (sectionId) => {
  closeMenu()

  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
    requestAnimationFrame(() => scrollToSection(sectionId))
    return
  }
  scrollToSection(sectionId)
}

const handleMobileAction = async (item) => {
  closeMenu()

  if (item.type === 'route') {
    await router.push(item.target)
    return
  }

  await goToMainOrScroll(item.target)
}

const toggleMenu = () => {
  if (!isHeaderVisible.value) return
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const updateHeaderVisibility = () => {
  if (!isHomeRoute.value) {
    isHeaderVisible.value = true
    return
  }

  const hero = document.getElementById('hero')
  if (!hero) {
    isHeaderVisible.value = false
    return
  }

  const revealPoint = Math.max(hero.offsetHeight - getHeaderOffset() - 40, hero.offsetHeight * 0.72)
  isHeaderVisible.value = window.scrollY >= revealPoint

  if (!isHeaderVisible.value) {
    closeMenu()
  }
}

const handleResize = () => {
  if (window.innerWidth >= 768) {
    closeMenu()
  }
  updateHeaderVisibility()
}

watch(
    () => route.fullPath,
    async () => {
      closeMenu()
      await nextTick()
      updateHeaderVisibility()
    },
    { immediate: true }
)

onMounted(() => {
  updateHeaderVisibility()
  window.addEventListener('scroll', updateHeaderVisibility, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderVisibility)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.header-shell {
  padding: 0.9rem 1rem;
  border-radius: 1.6rem;
  border: 1px solid rgba(184, 138, 66, 0.2);
  background:
    linear-gradient(180deg, rgba(252, 249, 243, 0.94), rgba(247, 241, 231, 0.88)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.14), transparent 38%),
    radial-gradient(circle at top right, rgba(74, 111, 97, 0.1), transparent 32%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18), transparent 28%, transparent 72%, rgba(255, 255, 255, 0.12));
  backdrop-filter: blur(24px);
  box-shadow: 0 20px 48px rgba(81, 59, 24, 0.12);
}

.header-brand {
  display: inline-flex;
  align-items: center;
  min-height: 2.9rem;
  padding: 0 0.8rem;
  border-radius: 999px;
  color: #3f6658;
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-shadow: 0 6px 18px rgba(255, 255, 255, 0.48);
}

.header-menu {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.48);
  border: 1px solid rgba(184, 138, 66, 0.14);
}

.header-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.7rem;
  padding: 0 1rem;
  border-radius: 999px;
  color: rgba(28, 42, 35, 0.92);
  font-size: 0.95rem;
  font-weight: 600;
  text-shadow: none;
  transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.header-link:hover {
  color: #204538;
  background: rgba(74, 111, 97, 0.1);
  transform: translateY(-1px);
}

.header-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0 1.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #d6b56b, #c59a52);
  color: #17130c;
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 16px 28px rgba(184, 138, 66, 0.18);
  transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.header-cta:hover {
  background: linear-gradient(135deg, #d1ac58, #bb8b42);
  transform: translateY(-1px);
  box-shadow: 0 20px 34px rgba(184, 138, 66, 0.22);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 767px) {
  .header-shell {
    padding: 0.85rem 0.9rem;
    border-radius: 1.35rem;
  }

  .header-brand {
    font-size: 1.32rem;
    letter-spacing: 0.12em;
    padding: 0;
    min-height: auto;
  }
}
</style>
