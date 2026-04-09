<template>
  <section v-if="links.length" class="py-16 md:py-20 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-10">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Смотрите также
        </div>

        <h2 class="section-title mt-5 mb-5">
          {{ title }}
        </h2>

        <p v-if="lead" class="section-lead">
          {{ lead }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="theme-card theme-card-hover p-6 block"
        >
          <div class="text-xl font-semibold text-[var(--title)]">
            {{ link.title }}
          </div>
          <p class="mt-3 text-[var(--ink-soft)] leading-7">
            {{ link.description }}
          </p>
          <div class="mt-5 text-sm font-semibold text-[var(--gold-deep)]">
            Перейти →
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: 'Материалы по проекту'
  },
  lead: {
    type: String,
    default: ''
  },
  links: {
    type: Array,
    default: () => []
  }
})
</script>
