<template>
  <section class="py-16 md:py-24 px-4 md:px-8" id="gallery">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-[#1B5B7F] mb-4">Территория комплекса</h2>
      <p class="text-center max-w-2xl mx-auto text-lg text-[#8B6F47] mb-12 leading-relaxed">
        Виды и впечатления от уникального места
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="icon in galleryItems" 
          :key="icon"
          class="bg-gradient-to-br from-[#1B5B7F] to-[#8B6F47] rounded-lg h-56 flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition shadow-lg"
        >
          {{ icon }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const galleryItems = ['🏔️', '🏛️', '🐎', '🌄', '🎭', '✨']
</script>
