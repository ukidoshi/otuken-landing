<template>
  <nav class="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 px-4 md:px-8 py-4 border-b border-[#C9A961]/20">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <a href="#" class="text-2xl md:text-3xl font-bold text-[#C9A961] tracking-widest">ОТУКЕН</a>
      <ul class="hidden md:flex gap-8 list-none">
        <li>
          <a 
            @click.prevent="scrollToSection('about')" 
            class="text-white text-sm hover:text-[#C9A961] transition cursor-pointer"
          >
            О комплексе
          </a>
        </li>
        <li>
          <a 
            @click.prevent="scrollToSection('map')" 
            class="text-white text-sm hover:text-[#C9A961] transition cursor-pointer"
          >
            Участки
          </a>
        </li>
        <li>
          <a 
            @click.prevent="scrollToSection('contact')" 
            class="text-white text-sm hover:text-[#C9A961] transition cursor-pointer"
          >
            Контакты
          </a>
        </li>
        <li>
          <a 
            href="#" 
            class="bg-[#C9A961] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B89A50] transition"
          >
            Связаться
          </a>
        </li>
      </ul>
      <button class="md:hidden text-white text-2xl">☰</button>
    </div>
  </nav>
</template>

<script setup>
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
