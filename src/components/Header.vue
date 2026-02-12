<template>
  <nav class="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 px-4 md:px-8 py-4 border-b border-[#C9A961]/20">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <RouterLink
          to="/"
          class="text-2xl md:text-3xl font-bold text-[#C9A961] tracking-widest"
      >
        ОТУКЕН
      </RouterLink>

      <ul class="hidden md:flex gap-8 list-none items-center">
        <!-- На главной: якоря. На /about: кнопки ведут на главную -->
        <li>
          <button
              @click="goToMainOrScroll('about')"
              class="text-white text-sm hover:text-[#C9A961] transition cursor-pointer"
          >
            О комплексе
          </button>
        </li>
        <li>
          <button
              @click="goToMainOrScroll('map')"
              class="text-white text-sm hover:text-[#C9A961] transition cursor-pointer"
          >
            Участки
          </button>
        </li>

        <li>
          <RouterLink
              to="/about"
              class="text-white text-sm hover:text-[#C9A961] transition"
          >
            О нас
          </RouterLink>
        </li>

        <li>
          <button
              @click="goToMainOrScroll('contact')"
              class="text-white text-sm hover:text-[#C9A961] transition cursor-pointer"
          >
            Контакты
          </button>
        </li>

        <li>
          <button
              @click="goToMainOrScroll('map')"
              class="bg-[#C9A961] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B89A50] transition"
          >
            Связаться
          </button>
        </li>
      </ul>

      <button class="md:hidden text-white text-2xl">☰</button>
    </div>
  </nav>
</template>

<script setup>
import { nextTick } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const route = useRoute()
const router = useRouter()

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

const goToMainOrScroll = async (sectionId) => {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
    // небольшой тайминг не обязателен — nextTick обычно хватает
    scrollToSection(sectionId)
    return
  }
  scrollToSection(sectionId)
}
</script>