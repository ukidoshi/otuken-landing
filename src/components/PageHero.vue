<template>
  <section class="pt-28 md:pt-32 pb-10 md:pb-14 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      <Breadcrumbs v-if="breadcrumbs?.length" :items="breadcrumbs" />

      <div class="theme-card overflow-hidden p-7 md:p-9 lg:p-10">
        <div :class="image ? 'grid lg:grid-cols-[1.02fr_0.98fr] gap-8 items-center' : ''">
          <div>
            <div v-if="badge" class="section-badge">
              <span class="section-dot"></span>
              {{ badge }}
            </div>

            <h1 class="section-title mt-5 mb-5">
              {{ title }}
            </h1>

            <p class="text-lg md:text-xl text-[var(--ink)] leading-8 max-w-3xl">
              {{ intro }}
            </p>

            <p v-if="lead" class="mt-5 text-[var(--ink-soft)] leading-8 max-w-3xl">
              {{ lead }}
            </p>

            <div v-if="highlights?.length" class="mt-7 flex flex-wrap gap-2.5">
              <span
                v-for="item in highlights"
                :key="item"
                class="px-3.5 py-2 rounded-full border border-[rgba(184,138,66,0.18)] bg-white/72 text-sm font-semibold text-[var(--title)]"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div v-if="image" class="page-hero-media">
            <picture>
              <source v-if="imageMobile" :srcset="imageMobile" media="(max-width: 767px)" />
              <img
                :src="image"
                :alt="imageAlt || title"
                class="page-hero-media-img"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Breadcrumbs from './Breadcrumbs.vue'

defineProps({
  badge: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  lead: {
    type: String,
    default: ''
  },
  highlights: {
    type: Array,
    default: () => []
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  },
  image: {
    type: String,
    default: ''
  },
  imageMobile: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.page-hero-media {
  align-self: start;
  overflow: hidden;
  border-radius: 1.8rem;
  border: 1px solid rgba(184, 138, 66, 0.18);
  box-shadow: 0 18px 36px rgba(55, 40, 18, 0.1);
}

.page-hero-media picture {
  display: block;
  line-height: 0;
}

.page-hero-media-img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 1023px) {
  .page-hero-media {
    margin-top: 1rem;
  }
}
</style>
