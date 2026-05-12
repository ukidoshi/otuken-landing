<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 px-3 md:px-6 py-3 transition-all duration-500',
      isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    ]"
  >
    <nav class="header-shell max-w-7xl mx-auto flex justify-between items-center gap-4" aria-label="Основная навигация">
      <RouterLink
        to="/"
        class="header-brand"
        @click="handleBrandClick"
      >
        ӨТҮКЕН
      </RouterLink>

      <div class="hidden md:flex items-center gap-2 lg:gap-3">
        <ul class="header-menu list-none items-center">
          <li v-for="item in menuItems" :key="item.label">
            <button
              type="button"
              class="header-link"
              @click="navigateTo(item)"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>

        <div
          class="header-locale flex items-center gap-1 rounded-full border border-[rgba(184,138,66,0.16)] bg-[rgba(255,255,255,0.55)] p-1"
          role="group"
          aria-label="Язык сайта"
        >
          <button
            v-for="lang in siteLanguages"
            :key="lang.code"
            type="button"
            class="locale-chip"
            :class="{ 'locale-chip--active': locale === lang.code }"
            @click="setLocale(lang.code)"
          >
            {{ lang.label }}
          </button>
        </div>

        <button
          type="button"
          class="header-cta"
          @click="goToContact"
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
        <svg v-if="!isMenuOpen" aria-hidden="true" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else aria-hidden="true" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </nav>

    <transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="md:hidden max-w-7xl mx-auto mt-3 rounded-[1.75rem] border border-[rgba(184,138,66,0.2)] bg-[rgba(252,248,241,0.98)] overflow-hidden shadow-[0_20px_44px_rgba(80,58,24,0.1)]"
      >
        <div class="px-3 py-3 space-y-1">
          <button
            v-for="item in menuItems"
            :key="`mobile-${item.label}`"
            type="button"
            class="block w-full text-left px-4 py-3 rounded-xl text-[var(--ink)] font-medium hover:bg-[rgba(74,111,97,0.08)] transition"
            @click="navigateTo(item)"
          >
            {{ item.label }}
          </button>

          <div
            class="mt-3 pt-3 border-t border-[rgba(184,138,66,0.14)]"
            role="group"
            aria-label="Язык сайта"
          >
            <div class="px-4 pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--clay)]">
              Язык
            </div>
            <div class="flex flex-col gap-1 px-2 pb-2">
              <button
                v-for="lang in siteLanguages"
                :key="`lang-${lang.code}`"
                type="button"
                class="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition"
                :class="
                  locale === lang.code
                    ? 'bg-[rgba(184,138,66,0.16)] text-[var(--title)]'
                    : 'text-[var(--ink)] hover:bg-[rgba(74,111,97,0.08)]'
                "
                @click="setLocale(lang.code)"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>

          <button
            type="button"
            class="block w-full mt-2 text-left px-4 py-3 rounded-xl bg-[var(--gold)] text-black font-semibold hover:bg-[var(--gold-deep)] transition shadow-[0_18px_30px_rgba(184,138,66,0.18)]"
            @click="goToContact"
          >
            Связаться
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { headerNavigation } from '../seo/site'
import { useSiteLocale } from '../composables/useSiteLocale'

const router = useRouter()
const route = useRoute()
const { locale, languages: siteLanguages, setLocale: persistLocale } = useSiteLocale()

const setLocale = (code) => {
  persistLocale(code)
  closeMenu()
}
const isMenuOpen = ref(false)
const isHeaderVisible = ref(route.path !== '/')
const isHomeRoute = computed(() => route.path === '/')

const getHeaderOffset = () => {
  if (typeof window === 'undefined') return 104
  return window.innerWidth < 768 ? 88 : 104
}
const menuItems = headerNavigation

const toggleMenu = () => {
  if (!isHeaderVisible.value) return
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToHash = (hash) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const target = document.querySelector(hash)
  if (!target) return

  const headerOffset = getHeaderOffset()
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth'
  })
}

const navigateTo = async (item) => {
  closeMenu()

  if (item.hash) {
    if (route.path !== '/') {
      await router.push({ path: '/', hash: item.hash })
      return
    }

    if (route.hash !== item.hash) {
      await router.replace({ hash: item.hash })
    }

    await nextTick()
    scrollToHash(item.hash)
    return
  }

  if (item.to) {
    await router.push(item.to)
  }
}

const goToContact = () => navigateTo({ hash: '#contact' })

const handleBrandClick = async (event) => {
  closeMenu()

  if (route.path !== '/') return

  event.preventDefault()

  if (route.hash) {
    await router.replace({ hash: '' })
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

let frameId = 0

const updateHeaderVisibility = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    isHeaderVisible.value = !isHomeRoute.value
    return
  }

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

const onScroll = () => {
  if (frameId) return

  frameId = window.requestAnimationFrame(() => {
    updateHeaderVisibility()
    frameId = 0
  })
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
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', handleResize)
  if (frameId) window.cancelAnimationFrame(frameId)
})
</script>

<style scoped>
.header-shell {
  padding: 0.9rem 1rem;
  border-radius: 1.6rem;
  border: 1px solid rgba(184, 138, 66, 0.2);
  background:
    linear-gradient(180deg, rgba(252, 249, 243, 0.98), rgba(247, 241, 231, 0.94)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.14), transparent 38%),
    radial-gradient(circle at top right, rgba(74, 111, 97, 0.1), transparent 32%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18), transparent 28%, transparent 72%, rgba(255, 255, 255, 0.12));
  box-shadow: 0 16px 34px rgba(81, 59, 24, 0.1);
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
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(28, 42, 35, 0.92);
  cursor: pointer;
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
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #d6b56b, #c59a52);
  color: #17130c;
  cursor: pointer;
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

.locale-chip {
  border: 0;
  border-radius: 999px;
  padding: 0.45rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.1;
  color: rgba(28, 42, 35, 0.82);
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

@media (min-width: 1024px) {
  .locale-chip {
    font-size: 0.8rem;
    padding: 0.5rem 0.85rem;
  }
}

.locale-chip:hover {
  color: #204538;
  background: rgba(74, 111, 97, 0.1);
}

.locale-chip--active {
  color: #204538;
  background: rgba(184, 138, 66, 0.22);
  box-shadow: inset 0 0 0 1px rgba(184, 138, 66, 0.28);
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
