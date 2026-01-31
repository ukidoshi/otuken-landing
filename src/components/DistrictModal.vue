<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" 
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg p-6 md:p-8 max-w-md w-full animate-in">
      <div class="flex justify-between items-center mb-4 pb-4 border-b-2 border-gray-200">
        <h2 class="text-2xl font-bold text-[#1B5B7F]">{{ currentDistrict?.title }}</h2>
        <button 
          @click="closeModal" 
          class="text-2xl text-gray-600 hover:text-[#C9A961] transition"
        >
          &times;
        </button>
      </div>
      <div class="mb-6 text-sm leading-relaxed">
        <p class="mb-3"><strong>Тип района:</strong> {{ currentDistrict?.type }}</p>
        <p class="mb-3"><strong>Участков доступно:</strong> ~{{ currentDistrict?.lots }}</p>
        <div class="bg-[rgba(201,169,97,0.15)] p-3 rounded mb-3 border-l-4 border-[#C9A961]">
          <p>{{ currentDistrict?.description }}</p>
        </div>
        <p class="font-semibold mb-2">Инфраструктура рядом:</p>
        <p v-for="feature in currentDistrict?.features" :key="feature" class="mb-2">✓ {{ feature }}</p>
      </div>
      <div class="flex flex-col gap-3">
        <button 
          @click="contactDistrict" 
          class="bg-[#C9A961] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#B89A50] transition w-full"
        >
          Интересует этот район
        </button>
        <button 
          @click="closeModal" 
          class="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition w-full"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { districts } from '../composables/useDistricts.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  districtId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close'])

const currentDistrict = computed(() => {
  return props.districtId ? districts[props.districtId] : null
})

const closeModal = () => {
  emit('close')
}

const contactDistrict = () => {
  const district = currentDistrict.value
  alert(`Спасибо за интерес к кварталу "${district.title}"!\n\nМенеджер свяжется с вами в течение 24 часов.\n\nТелефон: +7 (983) 366-50-00\nEmail: info@otuken.ru`)
  closeModal()
}
</script>
