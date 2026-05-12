<template>
  <section
    id="home-news"
    class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-16 md:py-24 px-4 md:px-8"
    aria-labelledby="home-news-heading"
  >
    <div
      class="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(184,138,66,0.14),transparent_72%)] pointer-events-none"
    ></div>
    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-10 md:mb-12">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Новости проекта
        </div>
        <h2 id="home-news-heading" class="section-title mt-5 mb-5">
          Актуальные материалы о «Өтүкен»
        </h2>
        <p class="section-lead">
          Сообщения о ходе работ, событиях и важных этапах развития этнокультурного комплекса.
        </p>
      </div>

      <div v-if="actualityNews?.slug || latestFeedNews?.slug" class="grid gap-8 md:gap-10">
        <HomeNewsFeaturedCard v-if="actualityNews?.slug" :item="actualityNews" variant="actuality" />
        <HomeNewsFeaturedCard v-if="latestFeedNews?.slug" :item="latestFeedNews" variant="latest" />
      </div>

      <div v-else class="theme-card p-8 md:p-10 text-center max-w-2xl mx-auto">
        <p class="text-[var(--ink-soft)] leading-8">
          Пока нет опубликованных новостей. Загляните в раздел позже — здесь появятся обновления проекта.
        </p>
      </div>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink
          to="/novosti"
          class="theme-button-light !min-h-0 !py-3 !px-7 text-[0.95rem] font-semibold text-center w-full sm:w-auto"
        >
          Все новости по «Өтүкен»
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import HomeNewsFeaturedCard from './HomeNewsFeaturedCard.vue'

defineProps({
  /** Из GET /news/actuality; верхний блок. */
  actualityNews: {
    type: Object,
    default: null
  },
  /** Первая новость из ленты, отличная от актуальной (по slug); нижний блок. */
  latestFeedNews: {
    type: Object,
    default: null
  }
})
</script>
