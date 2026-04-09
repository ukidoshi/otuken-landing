<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="События и фестивали"
        title="События комплекса «Отукен»"
        intro="Событийная программа помогает проекту становиться живым ещё до полной реализации всех объектов. Именно события связывают территорию, культуру Тувы, фестивальный опыт и туристический интерес."
        lead="Здесь собраны фестивальные и культурные направления, через которые территория начинает жить и привлекать гостей Республики Тыва."
        :highlights="['Фестиваль «Мой род – моя гордость»', 'Культурные события', 'Этнокультурный туризм']"
        :image="heroImage"
        :image-mobile="heroImageMobile"
        image-alt="Сценарии пространства этнокультурного комплекса Отукен"
      />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid gap-5">
          <RouterLink
            v-for="eventItem in eventCatalog"
            :key="eventItem.slug"
            :to="`/sobytiya/${eventItem.slug}`"
            class="theme-card theme-card-hover grid lg:grid-cols-[0.78fr_1.22fr] overflow-hidden"
          >
            <div class="relative min-h-[18rem]">
              <img
                :src="eventItem.image"
                :alt="eventItem.title"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[rgba(9,13,10,0.76)] via-[rgba(9,13,10,0.18)] to-transparent"></div>
              <div class="absolute top-4 left-4">
                <div class="section-badge bg-black/24 text-white border-white/14">
                  <span class="section-dot"></span>
                  {{ eventItem.dateText }}
                </div>
              </div>
            </div>

            <div class="p-7 md:p-8">
              <div class="text-sm uppercase tracking-[0.24em] text-[var(--clay)]/80">
                Событие проекта
              </div>
              <h2 class="display-font text-[2.3rem] md:text-[3rem] leading-none text-[var(--title)] mt-3">
                {{ eventItem.title }}
              </h2>
              <p class="mt-5 text-[var(--ink-soft)] leading-8">
                {{ eventItem.short }}
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                <span class="px-3.5 py-2 rounded-full border border-[rgba(184,138,66,0.18)] bg-white/72 text-sm font-semibold text-[var(--title)]">
                  Республика Тыва
                </span>
                <span class="px-3.5 py-2 rounded-full border border-[rgba(184,138,66,0.18)] bg-white/72 text-sm font-semibold text-[var(--title)]">
                  Культура и события
                </span>
              </div>
              <div class="mt-5 text-sm font-semibold text-[var(--gold-deep)]">
                Подробнее о событии →
              </div>
            </div>
          </RouterLink>
        </div>
      </section>

      <ContentSections :sections="content.sections" />
      <RelatedLinks :links="relatedLinks" lead="Направления, которые помогают увидеть, как события связаны с объектами, локацией и общей идеей проекта." />
      <FaqSection :items="content.faq" />
      <PageCta :cta="content.cta" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import ContentSections from '../components/ContentSections.vue'
import RelatedLinks from '../components/RelatedLinks.vue'
import FaqSection from '../components/FaqSection.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import { eventCatalog } from '../content/events'
import { eventsPageContent as content } from '../content/sitePages'
import hero from '../assets/optimized/hero/13.webp'
import heroMobile from '../assets/optimized/hero/13-mobile.webp'
import { makeBreadcrumbSchema, makeCollectionPageSchema, makeFaqSchema } from '../seo/schema'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'События' }
]

const relatedLinks = [
  { title: 'О комплексе', description: 'Как события встроены в общую логику проекта «Отукен».', to: '/o-komplekse' },
  { title: 'Локация', description: 'Почему расположение рядом с Кызылом и Каа-Хемом важно для событийного потока.', to: '/lokaciya' },
  { title: 'Объекты', description: 'Какие пространства комплекса поддерживают фестивали и культурные программы.', to: '/obekty' },
  { title: 'Контакты', description: 'Связаться по вопросам участия, партнёрства и коммуникации.', to: '/kontakty' }
]

const heroImage = hero
const heroImageMobile = heroMobile

useSeoPage(
  {
    title: 'События комплекса «Отукен» — фестивали и культурная программа',
    description:
      'События и фестивали этнокультурного комплекса «Отукен» в Республике Тыва. Страница о фестивале «Мой род – моя гордость» и событийной роли проекта рядом с Кызылом и Каа-Хемом.',
    path: '/sobytiya',
    image: heroImage
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makeCollectionPageSchema({
      name: 'События комплекса «Отукен»',
      description: 'Каталог событий и фестивальных материалов проекта «Отукен».',
      path: '/sobytiya',
      itemUrls: eventCatalog.map((item) => `/sobytiya/${item.slug}`)
    }),
    makeFaqSchema(content.faq)
  ]
)
</script>
