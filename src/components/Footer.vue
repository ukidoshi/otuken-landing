<template>
  <footer class="bg-black text-white py-12 md:py-16 px-4 md:px-8" id="contact">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-[#C9A961] font-bold mb-4">О комплексе</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#about" @click.prevent="scrollToSection('about')" class="hover:text-[#C9A961] transition">О проекте</a></li>
            <li><a href="#map" @click.prevent="scrollToSection('map')" class="hover:text-[#C9A961] transition">Районы</a></li>
            <li><a href="#gallery" @click.prevent="scrollToSection('gallery')" class="hover:text-[#C9A961] transition">Галерея</a></li>
            <li><a href="#festival" @click.prevent="scrollToSection('festival')" class="hover:text-[#C9A961] transition">Фестивали</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-[#C9A961] font-bold mb-4">Для покупателей</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-[#C9A961] transition">Купить участок</a></li>
            <li><a href="#" class="hover:text-[#C9A961] transition">Цены и условия</a></li>
            <li><a href="#" class="hover:text-[#C9A961] transition">Документы</a></li>
            <li><a href="#" class="hover:text-[#C9A961] transition">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-[#C9A961] font-bold mb-4">Контакты</h3>
          <ul class="space-y-2 text-sm">
            <li>📞 +7 (983) 366-50-00</li>
            <li>📧 info@otuken.ru</li>
            <li>📍 Кызыл, Республика Тыва</li>
            <li>⏰ Пн-Пт: 09:00-18:00</li>
          </ul>
        </div>
        <div>
          <h3 class="text-[#C9A961] font-bold mb-4">Следите за нами</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-[#C9A961] transition">Instagram</a></li>
            <li><a href="#" class="hover:text-[#C9A961] transition">VK</a></li>
            <li><a href="#" class="hover:text-[#C9A961] transition">YouTube</a></li>
            <li><a href="#" class="hover:text-[#C9A961] transition">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/20 pt-8 text-center text-sm opacity-70">
        <p>&copy; 2025 Комплекс «Отукен». Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
