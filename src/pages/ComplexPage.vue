<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        :badge="content.badge"
        :title="content.h1"
        :intro="content.intro"
        :lead="content.lead"
        :highlights="content.highlights"
        :image="heroImage"
        :image-mobile="heroImageMobile"
        image-alt="Общий вид этнокультурного комплекса Отукен в Республике Тыва"
      />
      <ContentSections :sections="content.sections" />
      <RelatedLinks :links="relatedLinks" lead="Переходы к направлениям, которые помогают глубже почувствовать локацию, объекты и события комплекса." />
      <FaqSection :items="content.faq" lead="Короткие ответы на основные вопросы о проекте и его структуре." />
      <PageCta :cta="content.cta" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import ContentSections from '../components/ContentSections.vue'
import RelatedLinks from '../components/RelatedLinks.vue'
import FaqSection from '../components/FaqSection.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import { complexPageContent } from '../content/sitePages'
import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'
import { makeBreadcrumbSchema, makeFaqSchema, makeTouristAttractionSchema } from '../seo/schema'

const content = complexPageContent

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'О комплексе' }
]

const relatedLinks = [
  { title: 'Локация проекта', description: 'Где находится «Отукен» и как он связан с Кызылом и Каа-Хемом.', to: '/lokaciya' },
  { title: 'Объекты комплекса', description: 'Полный каталог ключевых объектов и инфраструктуры проекта.', to: '/obekty' },
  { title: 'События', description: 'Фестиваль и будущая событийная программа «Отукена».', to: '/sobytiya' },
  { title: 'Контакты', description: 'Как связаться с представителями проекта.', to: '/kontakty' }
]

const heroImage = overview
const heroImageMobile = overviewMobile

useSeoPage(
  {
    title: 'Этнокультурный комплекс «Отукен» — о проекте',
    description:
      'Страница о комплексе «Отукен» / «Өтүкен»: концепция, объекты, значение проекта для Республики Тыва, туризма, событий и инфраструктурного развития рядом с Кызылом и Каа-Хемом.',
    path: '/o-komplekse',
    image: heroImage
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makeTouristAttractionSchema({
      name: content.h1,
      description: content.intro,
      path: '/o-komplekse',
      image: heroImage,
      category: 'Этнокультурный комплекс'
    }),
    makeFaqSchema(content.faq)
  ]
)
</script>
