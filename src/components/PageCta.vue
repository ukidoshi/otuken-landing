<template>
  <section v-if="cta" class="py-16 md:py-20 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="theme-card-dark p-8 md:p-10 lg:p-12">
        <div class="max-w-3xl">
          <div class="section-badge bg-white/10 text-white/78 border-white/12">
            <span class="section-dot"></span>
            Следующий шаг
          </div>

          <h2 class="display-font text-4xl md:text-5xl leading-none mt-5 text-white">
            {{ cta.title }}
          </h2>

          <p class="mt-5 text-white/82 leading-8 text-base md:text-lg">
            {{ cta.text }}
          </p>

          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <RouterLink
              v-if="cta.primary"
              :to="cta.primary.to"
              class="theme-button-primary"
            >
              {{ cta.primary.label }}
            </RouterLink>

            <RouterLink
              v-if="cta.secondary"
              :to="cta.secondary.to"
              class="theme-button-secondary"
            >
              {{ cta.secondary.label }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  cta: {
    type: Object,
    default: null
  }
})
</script>
