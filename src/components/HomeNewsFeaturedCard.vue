<template>
  <article
    v-if="item?.slug"
    :class="[
      'theme-card overflow-hidden',
      item.cover_url?.trim() ? 'grid lg:grid-cols-[0.82fr_1.18fr]' : '',
      variant === 'actuality' ? 'ring-2 ring-[var(--gold)]/35 shadow-[0_12px_40px_rgba(184,138,66,0.12)]' : ''
    ]"
  >
    <div v-if="item.cover_url?.trim()" class="relative min-h-[16rem] lg:min-h-[20rem]">
      <img
        :src="item.cover_url"
        :alt="item.cover_alt || item.title"
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-[rgba(9,13,10,0.76)] via-[rgba(9,13,10,0.18)] to-transparent"
      ></div>
      <div class="absolute top-4 left-4">
        <div class="section-badge bg-black/24 text-white border-white/14">
          <span class="section-dot"></span>
          {{ item.date_text || 'Новость' }}
        </div>
      </div>
    </div>

    <div class="p-7 md:p-9 flex flex-col justify-center">
      <div v-if="!item.cover_url?.trim()" class="mb-3">
        <div class="section-badge inline-flex">
          <span class="section-dot"></span>
          {{ item.date_text || 'Новость' }}
        </div>
      </div>
      <div class="text-sm uppercase tracking-[0.24em] text-[var(--clay)]/80">
        {{ variant === 'actuality' ? 'Актуальная новость' : 'Последняя публикация' }}
      </div>
      <h3 class="display-font text-[2rem] md:text-[2.85rem] leading-none text-[var(--title)] mt-3">
        {{ item.title }}
      </h3>
      <p class="mt-5 text-[var(--ink-soft)] leading-8">
        {{ item.excerpt }}
      </p>
      <div class="mt-6">
        <RouterLink
          :to="`/novosti/${item.slug}`"
          class="theme-button-primary !min-h-0 !py-3 !px-6 text-[0.95rem]"
        >
          Подробнее
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  item: {
    type: Object,
    default: null
  },
  variant: {
    type: String,
    required: true,
    validator: (v) => v === 'actuality' || v === 'latest'
  }
})
</script>
