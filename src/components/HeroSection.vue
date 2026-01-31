<template>
  <section class="mt-16 md:mt-20 h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0F3A4F] to-[#1B5B7F]">
    <div class="absolute inset-0 opacity-30 wave-animation" :style="waveStyle"></div>
    
    <div class="relative z-10 max-w-4xl px-4 md:px-8 text-center text-white">
      <h1 class="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Отукен</h1>
      <div class="text-2xl md:text-3xl text-[#C9A961] font-semibold mb-6 tracking-wide">Традиция встречает будущее</div>
      <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-95 leading-relaxed">
        Этнокультурный комплекс в сердце Тувы, где история живет, развивается 
        и создает инвестиционный потенциал. Купите участок и будьте частью проекта, 
        который сохраняет наследие и строит будущее.
      </p>
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <button 
          @click="scrollToSection('map')" 
          class="bg-[#C9A961] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#B89A50] transition transform hover:-translate-y-1"
        >
          Выбрать участок
        </button>
        <button 
          @click="scrollToSection('about')" 
          class="border-2 border-[#C9A961] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C9A961] hover:text-black transition"
        >
          Узнать больше
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const waveStyle = computed(() => {
  const svg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path d="M0,300 Q300,200 600,250 T1200,300 L1200,600 L0,600 Z" fill="rgba(201,169,97,0.1)" opacity="0.3"/></svg>')
  return {
    backgroundImage: `url('data:image/svg+xml,${svg}')`,
    backgroundRepeat: 'repeat-x'
  }
})

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
