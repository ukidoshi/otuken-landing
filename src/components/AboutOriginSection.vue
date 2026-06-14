<template>
  <section
    id="istoriya-idei"
    class="py-8 md:py-12 px-4 md:px-8"
    aria-labelledby="about-origin-title"
  >
    <div class="max-w-7xl mx-auto">
      <article class="theme-card p-7 md:p-9 lg:p-10">
        <header class="max-w-3xl">
          <div v-if="origin.badge" class="section-badge">
            <span class="section-dot"></span>
            {{ origin.badge }}
          </div>

          <h2
            id="about-origin-title"
            class="display-font text-[2.2rem] md:text-[3rem] leading-tight text-[var(--title)] mt-5"
          >
            {{ origin.title }}
          </h2>

          <p v-if="origin.lead" class="mt-5 text-lg md:text-xl text-[var(--ink)] leading-8">
            {{ origin.lead }}
          </p>
        </header>

        <div class="mt-7 grid lg:grid-cols-[1.05fr_0.95fr] gap-7 lg:gap-10 items-start">
          <div class="space-y-4">
            <p
              v-for="(paragraph, index) in origin.paragraphs || []"
              :key="index"
              class="text-[var(--ink-soft)] leading-8"
            >
              {{ paragraph }}
            </p>

            <blockquote
              v-if="origin.quote"
              class="mt-7 rounded-[1.5rem] border-l-4 border-[var(--gold)] bg-white/70 p-5 md:p-6 text-[var(--title)] leading-8 italic"
            >
              {{ origin.quote }}
            </blockquote>
          </div>

          <figure
            v-if="leadPhoto"
            class="lg:sticky lg:top-28 m-0"
          >
            <button
              type="button"
              class="group block w-full overflow-hidden rounded-[1.5rem] border border-[rgba(184,138,66,0.18)] cursor-zoom-in"
              :aria-label="`Открыть фото: ${leadPhoto.caption || origin.title}`"
              @click="openLightbox(0)"
            >
              <picture>
                <source v-if="leadPhoto.mobile" :srcset="leadPhoto.mobile" media="(max-width: 767px)" />
                <img
                  :src="leadPhoto.src"
                  :alt="leadPhoto.caption || origin.title"
                  class="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </button>
            <figcaption v-if="leadPhoto.caption" class="mt-3 text-sm text-[var(--ink-soft)] leading-6">
              {{ leadPhoto.caption }}
            </figcaption>
          </figure>
        </div>

        <div v-if="restPhotos.length" class="mt-9">
          <h3 v-if="origin.galleryTitle" class="text-sm uppercase tracking-[0.24em] text-[var(--clay)]/80 mb-5">
            {{ origin.galleryTitle }}
          </h3>

          <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <figure v-for="(photo, index) in restPhotos" :key="index" class="m-0">
              <button
                type="button"
                class="group relative block w-full overflow-hidden rounded-[1.35rem] border border-[rgba(184,138,66,0.16)] aspect-[4/3] cursor-zoom-in"
                :aria-label="`Открыть фото: ${photo.caption || origin.title}`"
                @click="openLightbox(index + 1)"
              >
                <picture>
                  <source v-if="photo.mobile" :srcset="photo.mobile" media="(max-width: 767px)" />
                  <img
                    :src="photo.src"
                    :alt="photo.caption || origin.title"
                    class="w-full h-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span
                  class="absolute inset-0 bg-[rgba(7,10,8,0.0)] group-hover:bg-[rgba(7,10,8,0.18)] transition flex items-center justify-center"
                >
                  <span
                    class="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition w-11 h-11 rounded-2xl bg-black/45 border border-white/20 text-white flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM11 8v6M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                </span>
              </button>
              <figcaption v-if="photo.caption" class="mt-2.5 text-sm text-[var(--ink-soft)] leading-6">
                {{ photo.caption }}
              </figcaption>
            </figure>
          </div>
        </div>
      </article>
    </div>

    <Teleport to="body">
      <transition name="origin-lightbox">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[80] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
          @keydown.esc="closeLightbox"
          @keydown.left="prev"
          @keydown.right="next"
          tabindex="-1"
          ref="dialogRef"
        >
          <div class="absolute inset-0 bg-[rgba(7,10,8,0.92)]" @click="closeLightbox"></div>

          <div class="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 text-white">
            <div class="text-sm tracking-[0.16em] uppercase text-white/70">
              {{ activeIndex + 1 }} / {{ photos.length }}
            </div>
            <button
              type="button"
              class="w-11 h-11 rounded-2xl bg-white/12 border border-white/15 text-white hover:bg-white/20 transition"
              aria-label="Закрыть"
              @click="closeLightbox"
            >
              ✕
            </button>
          </div>

          <div class="relative z-10 flex-1 flex items-center justify-center px-4 md:px-12 min-h-0">
            <button
              v-if="photos.length > 1"
              type="button"
              class="hidden sm:flex absolute left-3 md:left-6 w-12 h-12 rounded-2xl bg-white/12 border border-white/15 text-white items-center justify-center hover:bg-white/20 transition text-2xl"
              aria-label="Предыдущее фото"
              @click.stop="prev"
            >
              ‹
            </button>

            <figure
              class="m-0 max-h-full flex flex-col items-center"
              @touchstart.passive="onTouchStart"
              @touchend.passive="onTouchEnd"
            >
              <img
                v-if="activePhoto"
                :src="activePhoto.src"
                :alt="activePhoto.caption || origin.title"
                class="max-h-[76vh] max-w-full w-auto object-contain rounded-[1rem] select-none"
                draggable="false"
              />
              <figcaption
                v-if="activePhoto?.caption"
                class="mt-4 max-w-2xl text-center text-sm md:text-base text-white/85 leading-7 px-2"
              >
                {{ activePhoto.caption }}
              </figcaption>
            </figure>

            <button
              v-if="photos.length > 1"
              type="button"
              class="hidden sm:flex absolute right-3 md:right-6 w-12 h-12 rounded-2xl bg-white/12 border border-white/15 text-white items-center justify-center hover:bg-white/20 transition text-2xl"
              aria-label="Следующее фото"
              @click.stop="next"
            >
              ›
            </button>
          </div>

          <div
            v-if="photos.length > 1"
            class="relative z-10 px-4 md:px-6 py-4 flex gap-2 overflow-x-auto justify-start sm:justify-center origin-lightbox-thumbs"
          >
            <button
              v-for="(photo, idx) in photos"
              :key="idx"
              type="button"
              class="shrink-0 w-16 h-12 rounded-lg overflow-hidden border transition"
              :class="idx === activeIndex
                ? 'border-[var(--gold)] ring-2 ring-[rgba(184,138,66,0.4)]'
                : 'border-white/20 opacity-60 hover:opacity-100'"
              :aria-label="`Фото ${idx + 1}`"
              @click.stop="setActive(idx)"
            >
              <img :src="photo.mobile || photo.src" :alt="photo.caption || ''" class="w-full h-full object-cover" loading="lazy" />
            </button>
          </div>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '../composables/useBodyScrollLock.js'

const props = defineProps({
  origin: {
    type: Object,
    default: () => ({})
  },
  /** Дефолтные bundled-фото [{ src, mobile }] в фиксированном порядке. */
  fallbackPhotos: {
    type: Array,
    default: () => []
  }
})

/**
 * Источник фото: если из админки (API) пришёл массив `origin.photos`
 * (объекты { url, alt }), используем его; иначе — bundled-набор из кода.
 * Подписи всегда берём из `origin.captions` по индексу (локализуются в админке),
 * а если их нет — из alt пришедшего фото.
 */
const photos = computed(() => {
  const captions = Array.isArray(props.origin?.captions) ? props.origin.captions : []
  const apiPhotos = Array.isArray(props.origin?.photos) ? props.origin.photos : []

  if (apiPhotos.length) {
    return apiPhotos.map((photo, index) => ({
      src: typeof photo === 'string' ? photo : photo?.url,
      mobile: null,
      caption: captions[index] || (typeof photo === 'object' ? photo?.alt : '') || ''
    })).filter((p) => p.src)
  }

  return props.fallbackPhotos.map((photo, index) => ({
    src: photo.src,
    mobile: photo.mobile || null,
    caption: captions[index] || ''
  }))
})

const leadPhoto = computed(() => photos.value[0] || null)
const restPhotos = computed(() => photos.value.slice(1))

const isOpen = ref(false)
const activeIndex = ref(0)
const dialogRef = ref(null)

const activePhoto = computed(() => photos.value[activeIndex.value] || null)

const openLightbox = async (index) => {
  if (!photos.value.length) return
  activeIndex.value = Math.min(Math.max(index, 0), photos.value.length - 1)
  isOpen.value = true
  lockBodyScroll()
  await nextTick()
  dialogRef.value?.focus()
}

const closeLightbox = () => {
  if (!isOpen.value) return
  isOpen.value = false
  unlockBodyScroll()
}

const setActive = (index) => {
  activeIndex.value = (index + photos.value.length) % photos.value.length
}

const next = () => setActive(activeIndex.value + 1)
const prev = () => setActive(activeIndex.value - 1)

let touchStartX = 0
const onTouchStart = (event) => {
  touchStartX = event.changedTouches[0]?.clientX ?? 0
}
const onTouchEnd = (event) => {
  const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX
  if (Math.abs(delta) < 40 || photos.value.length < 2) return
  if (delta < 0) next()
  else prev()
}

onBeforeUnmount(() => {
  if (isOpen.value) unlockBodyScroll()
})
</script>

<style scoped>
.origin-lightbox-enter-active,
.origin-lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.origin-lightbox-enter-from,
.origin-lightbox-leave-to {
  opacity: 0;
}

.origin-lightbox-thumbs::-webkit-scrollbar {
  height: 6px;
}
.origin-lightbox-thumbs::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 999px;
}
</style>
