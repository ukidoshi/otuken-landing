<template>
  <div class="theme-page">
    <Header />
    <HeroSection />
    <AboutSection />
    <CulturalObjectsSection />
    <MapSection @open-modal="handleOpenModal" />
    <FestivalSection />
    <GallerySection />
    <Footer />

    <DistrictModal
        :is-open="isModalOpen"
        :district-id="selectedDistrictId"
        @close="handleCloseModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import CulturalObjectsSection from '../components/CulturalObjectsSection.vue'
import MapSection from '../components/MapSection.vue'
import FestivalSection from '../components/FestivalSection.vue'
import GallerySection from '../components/GallerySection.vue'
import DistrictModal from '../components/DistrictModal.vue'

const isModalOpen = ref(false)
const selectedDistrictId = ref(null)

const handleOpenModal = (districtId) => {
  selectedDistrictId.value = districtId
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  selectedDistrictId.value = null
}
</script>
