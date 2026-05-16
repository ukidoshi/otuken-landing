<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="festival">
    <div class="max-w-7xl mx-auto relative">
      <div class="theme-card-dark p-8 md:p-12 overflow-hidden">
        <div class="theme-grid-overlay opacity-40"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,138,66,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(122,168,145,0.12),transparent_28%)] pointer-events-none"></div>

        <div class="relative z-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
          <div>
            <div class="festival-badge">
              <span class="section-dot"></span>
              {{ festivalSection.badge }}
            </div>

            <h2 class="display-font text-[2.9rem] md:text-[4.4rem] leading-none mt-5">
              {{ festivalSection.title }}
            </h2>

            <div
              v-if="festivalSection.dateText"
              class="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/12 text-[var(--bg-sand)] font-semibold text-lg"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--gold)]"></span>
              {{ festivalSection.dateText }}
            </div>

            <p class="mt-6 text-white/84 leading-8 text-base md:text-lg">
              {{ festivalSection.lead }}
            </p>

            <button
              type="button"
              class="theme-button-primary mt-7 inline-flex items-center justify-center gap-2.5 !min-h-0 !py-3.5 !px-7 text-[0.95rem]"
              @click="openModal"
            >
              <span>{{ festivalSection.detailButtonLabel || 'Подробнее о фестивале' }}</span>
              <span class="text-[1.2em] leading-none font-extrabold" aria-hidden="true">→</span>
            </button>
          </div>

          <div class="grid gap-4">
            <div class="festival-panel p-6">
              <div class="festival-panel-title text-sm uppercase tracking-[0.24em] mb-3">
                {{ festivalSection.panelTitle }}
              </div>
              <div class="grid sm:grid-cols-2 gap-3">
                <div
                  v-for="(feature, index) in festivalSection.features"
                  :key="`festival-feature-${index}`"
                  class="festival-feature"
                >
                  <div class="festival-feature-title">{{ feature.title }}</div>
                  <div class="festival-feature-copy">{{ feature.text }}</div>
                </div>
              </div>
            </div>

            <div
              v-if="festivalSection.summary"
              class="festival-summary rounded-[1.75rem] px-6 py-5 leading-7"
            >
              {{ festivalSection.summary }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
    <transition name="festival-modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[70] flex items-center justify-center px-4 py-4"
        role="dialog"
        aria-modal="true"
        @keydown.esc="closeModal"
      >
        <div class="absolute inset-0 bg-[rgba(17,22,18,0.74)]" @click="closeModal"></div>

        <div
          ref="panelRef"
          class="theme-card relative w-full max-w-4xl overflow-hidden"
          :style="{ maxHeight: 'calc(100dvh - 24px)' }"
        >
          <div class="festival-modal-scroll">
            <div v-if="gallery.length" class="relative">
              <div class="relative h-56 md:h-72 bg-[var(--surface-dark)]">
                <img
                  :src="currentImage"
                  :alt="festivalSection.title"
                  class="w-full h-full object-cover select-none"
                  draggable="false"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/0"></div>

                <div class="absolute bottom-4 left-5 right-5 flex items-start justify-between gap-4">
                  <div class="text-white">
                    <div class="text-xs uppercase tracking-[0.24em] text-white/70">Фестиваль</div>
                    <div class="display-font text-3xl md:text-4xl leading-none mt-2">
                      {{ festivalSection.title }}
                    </div>
                    <div
                      v-if="festivalSection.dateText"
                      class="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/12 border border-white/15 text-[var(--bg-sand)] font-semibold text-sm"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"></span>
                      {{ festivalSection.dateText }}
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

                <div
                  v-if="hasGalleryControls"
                  class="absolute top-4 left-4 right-4 flex items-center justify-between gap-3"
                >
                  <button
                    type="button"
                    @click.stop="prevImage"
                    class="w-10 h-10 rounded-2xl bg-black/30 border border-white/15 text-white hover:bg-black/40 transition"
                    aria-label="Предыдущее фото"
                  >
                    ‹
                  </button>

                  <div class="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/15 text-white/90">
                    {{ galleryIndex + 1 }} / {{ gallery.length }}
                  </div>

                  <button
                    type="button"
                    @click.stop="nextImage"
                    class="w-10 h-10 rounded-2xl bg-black/30 border border-white/15 text-white hover:bg-black/40 transition"
                    aria-label="Следующее фото"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div v-if="hasGalleryControls" class="px-5 pt-4">
                <div class="flex gap-2 overflow-x-auto pb-2 festival-modal-thumbs">
                  <button
                    v-for="(img, idx) in gallery"
                    :key="`festival-thumb-${idx}`"
                    type="button"
                    @click="setImage(idx)"
                    class="shrink-0 w-20 h-14 rounded-xl overflow-hidden border transition"
                    :class="
                      idx === galleryIndex
                        ? 'border-[var(--gold)] ring-2 ring-[rgba(184,138,66,0.3)]'
                        : 'border-[rgba(184,138,66,0.16)] hover:border-[rgba(184,138,66,0.42)]'
                    "
                    aria-label="Открыть фото"
                  >
                    <img :src="img.url" :alt="img.alt || festivalSection.title" class="w-full h-full object-cover" loading="lazy" />
                  </button>
                </div>
              </div>
            </div>

            <div
              v-else
              class="relative bg-[var(--surface-dark)] px-6 md:px-8 pt-8 pb-6"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="text-white">
                  <div class="text-xs uppercase tracking-[0.24em] text-white/70">Фестиваль</div>
                  <div class="display-font text-3xl md:text-4xl leading-none mt-2">
                    {{ festivalSection.title }}
                  </div>
                  <div
                    v-if="festivalSection.dateText"
                    class="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/12 border border-white/15 text-[var(--bg-sand)] font-semibold text-sm"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"></span>
                    {{ festivalSection.dateText }}
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
            </div>

            <div class="p-6 md:p-8">
              <p
                v-if="festivalSection.detail?.intro"
                class="text-base text-[var(--ink-soft)] leading-8"
              >
                {{ festivalSection.detail.intro }}
              </p>

              <div
                v-for="(section, index) in festivalSection.detail?.sections || []"
                :key="`festival-section-${index}`"
                class="mt-6"
              >
                <h3 class="display-font text-2xl md:text-3xl text-[var(--title)] leading-none mb-3">
                  {{ section.title }}
                </h3>

                <p
                  v-for="(paragraph, pIndex) in section.paragraphs || []"
                  :key="`festival-section-${index}-p-${pIndex}`"
                  class="mb-3 text-[var(--ink-soft)] leading-8"
                >
                  {{ paragraph }}
                </p>

                <ul v-if="section.list?.length" class="mt-2 space-y-2">
                  <li
                    v-for="(item, lIndex) in section.list"
                    :key="`festival-section-${index}-l-${lIndex}`"
                    class="flex gap-3 text-sm md:text-base text-[var(--ink)]"
                  >
                    <span class="mt-1 w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div
                v-if="festivalSection.detail?.highlights?.length"
                class="theme-card mt-7 p-5"
              >
                <div class="text-sm font-semibold text-[var(--title)] mb-3">
                  Ключевые акценты
                </div>
                <ul class="space-y-2">
                  <li
                    v-for="(item, index) in festivalSection.detail.highlights"
                    :key="`festival-highlight-${index}`"
                    class="flex gap-3 text-sm md:text-base text-[var(--ink)]"
                  >
                    <span class="mt-1 w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div
                v-if="festivalSection.detail?.faq?.length"
                class="mt-8 space-y-4"
              >
                <h3 class="display-font text-2xl md:text-3xl text-[var(--title)] leading-none">
                  Часто задаваемые вопросы
                </h3>
                <div
                  v-for="(item, index) in festivalSection.detail.faq"
                  :key="`festival-faq-${index}`"
                  class="theme-card p-5"
                >
                  <div class="text-base font-semibold text-[var(--title)]">
                    {{ item.question }}
                  </div>
                  <p class="mt-2 text-[var(--ink-soft)] leading-7 text-sm md:text-base">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </div>

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
        </div>
      </div>
    </transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { festivalSection } from '../content/homeContent'
import { lockBodyScroll, unlockBodyScroll } from '../composables/useBodyScrollLock.js'

const isOpen = ref(false)
const galleryIndex = ref(0)
const panelRef = ref(null)

const gallery = computed(() => festivalSection.images || [])
const hasGalleryControls = computed(() => gallery.value.length > 1)
const currentImage = computed(() => {
  const list = gallery.value
  if (!list.length) return null
  return list[Math.min(galleryIndex.value, list.length - 1)]?.url || null
})

const openModal = async () => {
  isOpen.value = true
  galleryIndex.value = 0
  lockBodyScroll()
  await nextTick()
  const el = panelRef.value?.querySelector('.festival-modal-scroll')
  if (el) el.scrollTop = 0
}

const closeModal = () => {
  isOpen.value = false
  galleryIndex.value = 0
  unlockBodyScroll()
}

const prevImage = () => {
  const len = gallery.value.length
  if (len <= 1) return
  galleryIndex.value = (galleryIndex.value - 1 + len) % len
}
const nextImage = () => {
  const len = gallery.value.length
  if (len <= 1) return
  galleryIndex.value = (galleryIndex.value + 1) % len
}
const setImage = (idx) => {
  const len = gallery.value.length
  if (!len) return
  galleryIndex.value = Math.max(0, Math.min(idx, len - 1))
}

onBeforeUnmount(() => {
  try { unlockBodyScroll() } catch {}
})
</script>

<style scoped>
.festival-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.15rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(180deg, rgba(22, 31, 26, 0.72), rgba(22, 31, 26, 0.54)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.16), transparent 46%);
  color: rgba(255, 247, 234, 0.96);
  font-size: 0.88rem;
  font-weight: 700;
  box-shadow: 0 10px 22px rgba(10, 15, 12, 0.14);
  text-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
}

.festival-panel {
  border-radius: 1.85rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(27, 36, 31, 0.74), rgba(27, 36, 31, 0.58)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.16), transparent 42%);
  box-shadow: 0 14px 30px rgba(10, 15, 12, 0.14);
}

.festival-panel-title {
  color: rgba(255, 247, 234, 0.76);
}

.festival-feature {
  border-radius: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.08), transparent 42%);
  padding: 1rem;
}

.festival-feature-title {
  color: rgba(241, 222, 181, 0.98);
  font-weight: 700;
}

.festival-feature-copy {
  margin-top: 0.55rem;
  color: rgba(255, 247, 234, 0.9);
  font-size: 0.95rem;
  line-height: 1.7;
}

.festival-summary {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(180deg, rgba(22, 31, 26, 0.44), rgba(22, 31, 26, 0.28)),
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.05), transparent 42%);
  color: rgba(255, 250, 242, 0.92);
  box-shadow: 0 10px 22px rgba(10, 15, 12, 0.1);
}

.festival-modal-enter-active,
.festival-modal-leave-active {
  transition: opacity 220ms ease;
}
.festival-modal-enter-from,
.festival-modal-leave-to {
  opacity: 0;
}
.festival-modal-enter-to,
.festival-modal-leave-from {
  opacity: 1;
}

.festival-modal-scroll {
  max-height: calc(100dvh - 24px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.festival-modal-thumbs::-webkit-scrollbar {
  height: 8px;
}
.festival-modal-thumbs::-webkit-scrollbar-thumb {
  background: rgba(201, 169, 97, 0.35);
  border-radius: 999px;
}
</style>
