<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="about">
    <div class="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(184,138,66,0.14),transparent_72%)] pointer-events-none"></div>
    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-14">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          {{ aboutSection.badge }}
        </div>

        <h2 class="section-title mt-5 mb-5">
          {{ aboutSection.title }}
        </h2>

        <p class="section-lead">
          {{ aboutSection.lead }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div
          v-for="(card, index) in aboutSection.cards"
          :key="`about-card-${index}`"
          class="theme-card theme-card-hover p-6"
        >
          <div
            class="w-12 h-12 rounded-2xl text-2xl flex items-center justify-center mb-4"
            :class="cardAccent(index)"
          >
            {{ card.icon }}
          </div>
          <div class="text-xl font-semibold text-[var(--title)] mb-3">{{ card.title }}</div>
          <p class="text-[var(--ink-soft)] leading-7">
            {{ card.text }}
          </p>
        </div>
      </div>

      <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        <div class="theme-card p-7 md:p-9">
          <div class="text-sm uppercase tracking-[0.28em] text-[var(--clay)]/80 mb-3">
            {{ aboutSection.feature.kicker }}
          </div>
          <h3 class="display-font text-4xl md:text-5xl text-[var(--title)] leading-none mb-5">
            {{ aboutSection.feature.title }}
          </h3>

          <p
            v-for="(paragraph, index) in aboutSection.feature.paragraphs"
            :key="`feature-p-${index}`"
            class="mb-4 leading-8 text-[var(--ink-soft)]"
            :class="{ 'mb-7': index === aboutSection.feature.paragraphs.length - 1 }"
          >
            {{ paragraph }}
          </p>

          <div class="space-y-4">
            <div
              v-for="(bullet, index) in aboutSection.feature.bullets"
              :key="`feature-b-${index}`"
              class="flex gap-4"
            >
              <div
                class="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                :class="bulletAccent(index)"
              >
                {{ bullet.icon }}
              </div>
              <p class="leading-7 text-[var(--ink)]">
                <strong>{{ bullet.title }}</strong> {{ bullet.text }}
              </p>
            </div>
          </div>

          <div class="theme-divider my-8"></div>

          <div class="theme-card p-5 md:p-6 bg-white/55">
            <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80 mb-4">
              {{ aboutSection.feature.phases.kicker }}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                v-for="(phase, index) in aboutSection.feature.phases.items"
                :key="`phase-${index}`"
              >
                <div class="w-2.5 h-2.5 rounded-full bg-[var(--gold)] mb-3"></div>
                <div class="font-semibold text-[var(--ink)]">{{ phase.title }}</div>
                <div class="text-sm text-[var(--ink-soft)] mt-1">{{ phase.text }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="theme-card-dark p-8 md:p-10 relative overflow-hidden">
          <div class="absolute inset-0 opacity-40 pointer-events-none">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,138,66,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(130,171,151,0.14),transparent_30%)]"></div>
          </div>

          <div class="relative z-10">
            <div class="text-sm uppercase tracking-[0.28em] text-white/70">
              {{ aboutSection.summary.kicker }}
            </div>
            <div class="display-font text-4xl md:text-5xl leading-none mt-3">
              {{ aboutSection.summary.title }}
            </div>

            <p class="mt-5 text-white/84 leading-8">
              {{ aboutSection.summary.text }}
            </p>

            <div class="mt-7 grid grid-cols-2 gap-3">
              <div
                v-for="(stat, index) in aboutSection.summary.stats"
                :key="`summary-stat-${index}`"
                class="rounded-2xl border border-white/12 bg-white/8 p-4"
              >
                <div class="text-[var(--bg-sand)] font-semibold text-sm">{{ stat.title }}</div>
                <div class="text-sm mt-2 text-white/90">{{ stat.value }}</div>
              </div>
            </div>

            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                v-if="aboutSection.summary.primaryLabel"
                @click="scrollTo(aboutSection.summary.primaryTarget || 'objects')"
                class="theme-button-primary w-full sm:w-auto"
              >
                {{ aboutSection.summary.primaryLabel }}
              </button>

              <button
                v-if="aboutSection.summary.secondaryLabel"
                @click="scrollTo(aboutSection.summary.secondaryTarget || 'map')"
                class="theme-button-secondary w-full sm:w-auto"
              >
                {{ aboutSection.summary.secondaryLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { aboutSection } from '../content/homeContent'

const CARD_ACCENT = [
  'bg-[rgba(184,138,66,0.12)]',
  'bg-[rgba(74,111,97,0.12)]',
  'bg-[rgba(153,107,76,0.12)]'
]

const cardAccent = (index) => CARD_ACCENT[index % CARD_ACCENT.length]
const bulletAccent = (index) => CARD_ACCENT[index % CARD_ACCENT.length]

const scrollTo = (id) => {
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return

  const headerOffset = window.innerWidth < 768 ? 88 : 104
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth'
  })
}
</script>
