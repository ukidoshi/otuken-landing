<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-[rgba(16,21,17,0.62)] backdrop-blur-md z-50 flex items-center justify-center p-4" 
    @click.self="closeModal"
  >
    <div class="theme-card rounded-[1.75rem] p-6 md:p-8 max-w-md w-full animate-in">
      <div class="flex justify-between items-center mb-4 pb-4 border-b border-[rgba(184,138,66,0.16)]">
        <h2 class="display-font text-3xl text-[var(--title)] leading-none">{{ currentDistrict?.title }}</h2>
        <button 
          @click="closeModal" 
          class="w-10 h-10 rounded-2xl bg-white/70 border border-[rgba(184,138,66,0.16)] text-xl text-[var(--ink-soft)] hover:text-[var(--gold)] transition"
        >
          &times;
        </button>
      </div>
      <div class="mb-6 text-sm leading-7 text-[var(--ink-soft)]">
        <p class="mb-3"><strong class="text-[var(--ink)]">Тип района:</strong> {{ currentDistrict?.type }}</p>
        <p class="mb-3"><strong class="text-[var(--ink)]">Участков доступно:</strong> ~{{ currentDistrict?.lots }}</p>
        <div class="bg-[rgba(184,138,66,0.1)] p-4 rounded-2xl mb-4 border-l-4 border-[var(--gold)] text-[var(--ink)]">
          <p>{{ currentDistrict?.description }}</p>
        </div>
        <p class="font-semibold text-[var(--title)] mb-2">Инфраструктура рядом:</p>
        <p v-for="feature in currentDistrict?.features" :key="feature" class="mb-2">✓ {{ feature }}</p>
      </div>
      <div class="flex flex-col gap-3">
        <button 
          @click="contactDistrict" 
          class="theme-button-primary w-full"
        >
          Интересует этот район
        </button>
        <button 
          @click="closeModal" 
          class="theme-button-light w-full"
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
