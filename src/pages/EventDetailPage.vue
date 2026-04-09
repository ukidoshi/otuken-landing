<template>
  <div class="theme-page">
    <Header />
    <main v-if="eventItem">
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="Событие проекта"
        :title="eventItem.title"
        :intro="eventItem.intro"
        :lead="eventItem.location"
        :highlights="[eventItem.dateText, 'Культура Тувы', 'Событийный запуск проекта']"
        :image="eventItem.image"
        image-alt="Фестиваль Мой род – моя гордость в комплексе Отукен"
      />
      <ContentSections :sections="eventItem.sections" />
      <RelatedLinks :links="relatedLinks" lead="Материалы, которые помогают связать событие с территорией, объектами и контактами проекта." />
      <FaqSection :items="eventItem.faq" />
      <PageCta :cta="cta" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import ContentSections from '../components/ContentSections.vue'
import RelatedLinks from '../components/RelatedLinks.vue'
import FaqSection from '../components/FaqSection.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import { eventMap } from '../content/events'
import { makeBreadcrumbSchema, makeEventSchema, makeFaqSchema } from '../seo/schema'

const route = useRoute()
const eventItem = computed(() => eventMap[route.params.slug] || null)

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'События', to: '/sobytiya' },
  { label: eventItem.value?.title || 'Событие' }
])

const relatedLinks = computed(() => [
  { title: 'О комплексе', description: 'Как события вписаны в общую концепцию «Отукена».', to: '/o-komplekse' },
  { title: 'Объекты комплекса', description: 'Какие пространства комплекса поддерживают фестивальные сценарии.', to: '/obekty' },
  { title: 'Локация', description: 'География проекта рядом с Кызылом и Каа-Хемом.', to: '/lokaciya' },
  { title: 'Контакты', description: 'Связаться с представителями проекта.', to: '/kontakty' }
])

const cta = computed(() => ({
  title: 'Узнать больше о территории проекта',
  text:
    'После знакомства с событием переходите к странице комплекса и каталогу объектов, чтобы увидеть, как культурная программа связана с пространством «Отукена».',
  primary: { label: 'О комплексе', to: '/o-komplekse' },
  secondary: { label: 'Объекты комплекса', to: '/obekty' }
}))

useSeoPage(
  () => ({
    title: eventItem.value?.seoTitle,
    description: eventItem.value?.metaDescription,
    path: eventItem.value ? `/sobytiya/${eventItem.value.slug}` : '/sobytiya',
    image: eventItem.value?.image,
    type: 'article'
  }),
  () => {
    if (!eventItem.value) return []
    return [
      makeBreadcrumbSchema(breadcrumbs.value),
      makeEventSchema({
        name: eventItem.value.title,
        description: eventItem.value.short,
        path: `/sobytiya/${eventItem.value.slug}`,
        startDate: eventItem.value.startDate,
        endDate: eventItem.value.endDate,
        image: eventItem.value.image
      }),
      makeFaqSchema(eventItem.value.faq)
    ]
  }
)
</script>
