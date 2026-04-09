<template>
  <div class="theme-page">
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <CulturalObjectsSection />
      <MapSection @open-modal="handleOpenModal" />
      <FestivalSection />
      <GallerySection />

      <PageCta :cta="homeCta" />
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
import { ref } from 'vue'
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import CulturalObjectsSection from '../components/CulturalObjectsSection.vue'
import MapSection from '../components/MapSection.vue'
import FestivalSection from '../components/FestivalSection.vue'
import GallerySection from '../components/GallerySection.vue'
import Footer from '../components/Footer.vue'
import DistrictModal from '../components/DistrictModal.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import { homeSeoContent } from '../content/sitePages'
import overview from '../assets/optimized/hero/overview.webp'
import { makeFaqSchema, makePlaceSchema } from '../seo/schema'

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
</script>
