<template>
  <div class="theme-page">
    <Header />
    <main>
      <HeroSection :latest-news="heroNews" />
      <RevealOnScroll>
        <AboutSection />
      </RevealOnScroll>
      <RevealOnScroll :delay-ms="70">
        <HomeNewsSection :actuality-news="actualityNews" :latest-feed-news="latestFeedNews" />
      </RevealOnScroll>
      <RevealOnScroll :delay-ms="140">
        <CulturalObjectsSection />
      </RevealOnScroll>
      <RevealOnScroll :delay-ms="210">
        <MapSection @open-modal="handleOpenModal" />
      </RevealOnScroll>
      <RevealOnScroll :delay-ms="280">
        <FestivalSection />
      </RevealOnScroll>
      <RevealOnScroll :delay-ms="350">
        <GallerySection />
      </RevealOnScroll>

      <RevealOnScroll :delay-ms="420">
        <PageCta :cta="homeCta" />
      </RevealOnScroll>
    </main>
    <Footer />

    <DistrictModal
        v-if="isModalOpen || selectedDistrictId"
        :is-open="isModalOpen"
        :district-id="selectedDistrictId"
        @close="handleCloseModal"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import HomeNewsSection from '../components/HomeNewsSection.vue'
import CulturalObjectsSection from '../components/CulturalObjectsSection.vue'
import MapSection from '../components/MapSection.vue'
import FestivalSection from '../components/FestivalSection.vue'
import GallerySection from '../components/GallerySection.vue'
import Footer from '../components/Footer.vue'
import DistrictModal from '../components/DistrictModal.vue'
import PageCta from '../components/PageCta.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
import { useSeoPage } from '../composables/useSeoPage'
import { homeSeoContent } from '../content/sitePages'
import overview from '../assets/optimized/hero/overview.webp'
import { makeFaqSchema, makePlaceSchema } from '../seo/schema'
import { getNewsActuality, getNewsListPage } from '../services/newsApi'
import { useSiteLocale } from '../composables/useSiteLocale'

const { locale } = useSiteLocale()
/** Hero: актуальная с API или первая из ленты. */
const heroNews = ref(null)
/** Блок «Актуальная новость» на главной — только из GET /news/actuality. */
const actualityNews = ref(null)
/** Блок «Последняя публикация» — первая в ленте с другим slug, чем актуальная. */
const latestFeedNews = ref(null)

const loadLatestNews = async () => {
  heroNews.value = null
  actualityNews.value = null
  latestFeedNews.value = null

  let actuality = null
  let items = []
  try {
    const [a, page] = await Promise.all([
      getNewsActuality(locale.value).catch(() => null),
      getNewsListPage(locale.value, 1).catch(() => ({ items: [] }))
    ])
    actuality = a
    items = page.items || []
  } catch {
    items = []
  }

  if (actuality?.slug) {
    actualityNews.value = actuality
  }

  heroNews.value = actuality?.slug ? actuality : items[0] ?? null

  const excludeSlug = actuality?.slug
  latestFeedNews.value =
    items.find((n) => n?.slug && n.slug !== excludeSlug) ?? null
}

const isModalOpen = ref(false)
const selectedDistrictId = ref(null)

const homeCta = {
  title: 'Обсудить проект и дальнейшие шаги',
  text:
    'Если хотите обсудить проект, сотрудничество или будущие шаги, команда проекта на связи.',
  primary: { label: 'Связаться с нами', to: { path: '/', hash: '#contact' } }
}

const handleOpenModal = (districtId) => {
  selectedDistrictId.value = districtId
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  selectedDistrictId.value = null
}

useSeoPage(
  {
    title: homeSeoContent.title,
    description: homeSeoContent.description,
    path: '/',
    image: overview
  },
  [
    makePlaceSchema({
      name: 'Этнокультурный комплекс «Отукен»',
      description: homeSeoContent.description,
      path: '/',
      image: overview
    }),
    makeFaqSchema(homeSeoContent.faq)
  ]
)

onMounted(loadLatestNews)
watch(locale, loadLatestNews)
</script>
