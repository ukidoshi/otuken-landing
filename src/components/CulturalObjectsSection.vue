<template>
  <section class="py-16 md:py-24 px-4 md:px-8 bg-[rgba(201,169,97,0.05)]">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-[#1B5B7F] mb-4">Объекты комплекса</h2>
      <p class="text-center max-w-2xl mx-auto text-lg text-[#8B6F47] mb-12 leading-relaxed">
        Разнообразные пространства для культуры, спорта, развлечений и жизни
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="object in objects" 
          :key="object.id"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition border-l-4 border-[#C9A961]"
        >
          <div class="bg-gradient-to-br from-[#1B5B7F] to-[#8B6F47] text-white text-5xl p-6 text-center">
            {{ object.icon }}
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-[#1B5B7F] mb-2">{{ object.title }}</h3>
            <p class="text-sm opacity-80">{{ object.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const objects = [
  {
    id: 1,
    icon: '🏛️',
    title: 'Аллея тувинских родов',
    description: 'Выставочное пространство культуры и традиций каждого рода Тувы'
  },
  {
    id: 2,
    icon: '🐎',
    title: 'Ипподром',
    description: 'Площадка для конных скачек и соревнований традиционного спорта'
  },
  {
    id: 3,
    icon: '🎪',
    title: 'Юрточный городок',
    description: 'Подлинная жилая зона традиционного быта кочевников'
  },
  {
    id: 4,
    icon: '🏹',
    title: 'Стадион стрельбы из лука',
    description: 'Демонстрация национального вида спорта и мастер-классы'
  },
  {
    id: 5,
    icon: '🌊',
    title: 'Аквапарк',
    description: 'Современное развлекательное учреждение для семей'
  },
  {
    id: 6,
    icon: '✨',
    title: 'Место силы',
    description: 'Священное пространство для духовных практик и медитации'
  },
  {
    id: 7,
    icon: '🍽️',
    title: 'Ресторан',
    description: 'Кулинарное знакомство с культурой и тувинской кухней'
  },
  {
    id: 8,
    icon: '🛏️',
    title: 'Гостиничный комплекс',
    description: 'Премиум размещение туристов с высоким уровнем обслуживания'
  },
  {
    id: 9,
    icon: '🎨',
    title: 'Музей культуры КМНС',
    description: 'Центр сохранения наследия малочисленных народов Тувы'
  }
]
</script>
