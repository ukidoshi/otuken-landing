<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="objects">
    <div class="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_bottom,rgba(74,111,97,0.08),transparent_70%)] pointer-events-none"></div>
    <div class="max-w-7xl mx-auto relative">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          {{ objectsSection.badge }}
        </div>

        <h2 class="section-title mt-5 mb-5">
          {{ objectsSection.title }}
        </h2>

        <p class="section-lead">
          {{ objectsSection.lead }}
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
            <picture v-if="coverImage(obj)">
              <source
                  v-if="coverImageMobile(obj)"
                  :srcset="coverImageMobile(obj)"
                  media="(max-width: 767px)"
              />
              <img
                  :src="coverImage(obj)"
                  :alt="obj.title"
                  class="w-full h-full object-cover transform group-hover:scale-[1.03] transition duration-500"
                  loading="lazy"
                  decoding="async"
              />
            </picture>
            <div
                v-if="!coverImage(obj)"
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
                <svg
                    aria-hidden="true"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M7 17L17 7M9 7H17V15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                </svg>
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

    <!-- MODAL: в body, чтобы position:fixed не ломался из-за transform у предков -->
    <Teleport to="body">
    <transition name="modal">
      <div
          v-if="isOpen"
          class="fixed inset-0 z-[70] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          @keydown.esc="closeModal"
      >
        <!-- overlay -->
        <div class="absolute inset-0 bg-[rgba(17,22,18,0.74)]" @click="closeModal"></div>

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
                      Изображение объекта появится здесь
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
            <div class="px-6 md:px-8 py-4 border-t border-[rgba(184,138,66,0.16)] flex items-center justify-end gap-4">
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
    </Teleport>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '../composables/useBodyScrollLock.js'
import { objectCatalog } from '../content/objectCatalog'
import { objectsSection } from '../content/homeContent'

const objects = objectCatalog

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
const coverImageMobile = (obj) => obj.imageMobile || null

// --- modal sizing (scroll inside) ---
const panelRef = ref(null)
const panelStyle = computed(() => ({
  maxHeight: 'calc(100dvh - 24px)' // важно для мобильных браузеров
}))

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
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.14);
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
