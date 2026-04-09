<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="Инфраструктура и объекты"
        title="Объекты комплекса «Отукен»"
        intro="На этой странице собраны ключевые объекты будущего этнокультурного комплекса: культурные, гостевые, спортивные и семейные пространства, которые формируют территорию проекта."
        lead="Здесь можно спокойно посмотреть, из каких пространств будет складываться комплекс: от Аллеи родовых групп Тувы и юрточного городка до ипподрома, гостиницы и аквапарка."
        :highlights="['Аллея родовых групп Тувы', 'Юрточный городок', 'Ипподром и спортивные зоны', 'Гостевой и семейный контур']"
        :image="heroImage"
        :image-mobile="heroImageMobile"
        image-alt="Общий план территории этнокультурного комплекса Отукен"
      />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          <RouterLink
            v-for="item in objectCatalog"
            :key="item.slug"
            :to="`/obekty/${item.slug}`"
            class="theme-card theme-card-hover overflow-hidden block"
          >
            <div class="relative h-56">
              <picture v-if="item.image">
                <source v-if="item.imageMobile" :srcset="item.imageMobile" media="(max-width: 767px)" />
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div v-else class="w-full h-full bg-[linear-gradient(135deg,#335345,#64897a)]"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-[rgba(11,15,12,0.84)] via-[rgba(11,15,12,0.28)] to-transparent"></div>
              <div class="absolute left-4 right-4 bottom-4">
                <div class="text-xs uppercase tracking-[0.24em] text-white/72">{{ item.eyebrow }}</div>
                <div class="display-font text-[2.2rem] leading-none text-white mt-2">{{ item.title }}</div>
              </div>
            </div>
            <div class="p-6">
              <p class="text-[var(--ink-soft)] leading-7">
                {{ item.short }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="text-xs px-2.5 py-1 rounded-full border border-[rgba(184,138,66,0.18)] bg-white/72 text-[var(--title)] font-semibold"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="mt-5 text-sm font-semibold text-[var(--gold-deep)]">
                Подробнее об объекте →
              </div>
            </div>
          </RouterLink>
        </div>
      </section>

      <ContentSections :sections="content.sections" />
      <RelatedLinks :links="relatedLinks" lead="Полезные переходы для тех, кто изучает проект глубже: локацию, событие и контактную страницу." />
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
import { objectCatalog } from '../content/objectCatalog'
import { objectsPageContent as content } from '../content/sitePages'
import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'
import { makeBreadcrumbSchema, makeCollectionPageSchema, makeFaqSchema } from '../seo/schema'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Объекты' }
]

const relatedLinks = [
  { title: 'О комплексе', description: 'Что такое «Отукен» и почему проект важен для Тувы.', to: '/o-komplekse' },
  { title: 'Локация', description: 'Географическая привязка к Кызылу и Каа-Хему.', to: '/lokaciya' },
  { title: 'События', description: 'Фестиваль и событийная программа проекта.', to: '/sobytiya' },
  { title: 'Контакты', description: 'Связь с командой проекта, туристические и партнёрские контакты.', to: '/kontakty' }
]

const heroImage = overview
const heroImageMobile = overviewMobile

useSeoPage(
  {
    title: 'Объекты комплекса «Отукен» — инфраструктура и ключевые пространства',
    description:
      'Каталог объектов комплекса «Отукен»: Аллея родовых групп Тувы, юрточный городок, ипподром, ресторан, место силы, музей культуры КМНС, гостиничный комплекс, аквапарк и стадион стрельбы из лука.',
    path: '/obekty',
    image: heroImage
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makeCollectionPageSchema({
      name: 'Объекты комплекса «Отукен»',
      description: 'Каталог ключевых объектов этнокультурного комплекса «Отукен» в Республике Тыва.',
      path: '/obekty',
      itemUrls: objectCatalog.map((item) => `/obekty/${item.slug}`)
    }),
    makeFaqSchema(content.faq)
  ]
)
</script>
