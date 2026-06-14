<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-[rgba(16,21,17,0.74)] z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <div class="theme-card district-modal-shell rounded-[1.75rem] p-6 md:p-8 max-w-md w-full animate-in">
      <div class="flex justify-between items-center mb-4 pb-4 border-b border-[rgba(184,138,66,0.16)]">
        <h2 class="display-font text-3xl text-[var(--title)] leading-none">{{ currentDistrict?.title }}</h2>
        <button
          @click="closeModal"
          class="w-10 h-10 rounded-2xl bg-white/70 border border-[rgba(184,138,66,0.16)] text-[var(--ink-soft)] hover:text-[var(--gold)] flex items-center justify-center transition"
          aria-label="Закрыть"
        >
          <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <div class="mb-6 text-sm leading-7 text-[var(--ink-soft)]">
        <p class="mb-3"><strong class="text-[var(--ink)]">Тип района:</strong> {{ currentDistrict?.type }}</p>
        <div class="bg-[rgba(184,138,66,0.1)] p-4 rounded-2xl mb-4 border-l-4 border-[var(--gold)] text-[var(--ink)]">
          <p>{{ currentDistrict?.description }}</p>
        </div>
        <p class="font-semibold text-[var(--title)] mb-2">Инфраструктура рядом:</p>
        <p v-for="feature in currentDistrict?.features" :key="feature" class="mb-2">✓ {{ feature }}</p>
      </div>

      <transition name="district-form" mode="out-in">
        <form
          v-if="isFormVisible && submitState !== 'success'"
          key="form"
          class="district-form-panel mb-5"
          @submit.prevent="submitLead"
        >
          <div class="district-form-badge">
            <span class="district-form-dot"></span>
            Интерес к району
          </div>

          <h3 class="district-form-title">
            Оставьте имя и телефон
          </h3>

          <p class="district-form-copy">
            Мы зафиксируем ваш интерес к району
            <strong class="text-[var(--title)]">{{ currentDistrict?.title }}</strong>
            и свяжемся с вами, чтобы обсудить детали.
          </p>

          <label class="district-field">
            <span class="district-field-label">Имя</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Как к вам обращаться"
              class="district-input"
              :disabled="isSubmitting"
            />
          </label>

          <label class="district-field">
            <span class="district-field-label">Телефон</span>
            <input
              :value="form.phone"
              type="tel"
              name="tel"
              inputmode="tel"
              autocomplete="tel"
              placeholder="+7 (___) ___-__-__"
              class="district-input"
              :disabled="isSubmitting"
              @input="handlePhoneInput"
            />
          </label>

          <p v-if="submitState === 'error' && submitMessage" class="district-form-error">
            {{ submitMessage }}
          </p>

          <p class="district-form-note">
            Отправляя заявку, вы оставляете контакт для обратной связи по проекту «Өтүкен».
          </p>

          <div class="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              class="theme-button-primary w-full"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Отправляем...' : 'Отправить заявку' }}
            </button>

            <button
              type="button"
              class="theme-button-light w-full"
              :disabled="isSubmitting"
              @click="cancelInterestForm"
            >
              Назад
            </button>
          </div>
        </form>

        <div
          v-else-if="submitState === 'success'"
          key="success"
          class="district-success-panel mb-5"
        >
          <div class="district-success-icon" aria-hidden="true">✓</div>
          <h3 class="district-form-title mb-2">
            Заявка отправлена
          </h3>
          <p class="district-form-copy mb-0">
            Спасибо. Мы получили ваш интерес к району
            <strong class="text-[var(--title)]">{{ currentDistrict?.title }}</strong>
            и свяжемся с вами в ближайшее время.
          </p>
        </div>
      </transition>

      <div class="flex flex-col gap-3">
        <button
          v-if="!isFormVisible && submitState !== 'success'"
          @click="openInterestForm"
          class="theme-button-primary w-full"
        >
          Интересует этот район
        </button>

        <button
          v-else-if="submitState === 'success'"
          @click="closeModal"
          class="theme-button-primary w-full"
        >
          Закрыть
        </button>

        <button
          v-else
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
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { districts } from '../composables/useDistricts.js'
import { lockBodyScroll, unlockBodyScroll } from '../composables/useBodyScrollLock.js'
import { getApiBaseUrl } from '../services/newsApi'

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

const districtInterestEndpoint = computed(() => {
  const path = import.meta.env.VITE_DISTRICT_INTEREST_ENDPOINT || '/api/leads/district-interest'
  return `${getApiBaseUrl()}${path}`
})

const currentDistrict = computed(() => {
  return props.districtId ? districts[props.districtId] : null
})

const isFormVisible = ref(false)
const isSubmitting = ref(false)
const submitState = ref('idle')
const submitMessage = ref('')

const form = reactive({
  name: '',
  phone: ''
})

const getPhoneDigits = (value) => {
  let digits = String(value || '').replace(/\D/g, '')

  if (!digits) return ''
  if (digits[0] === '8') digits = `7${digits.slice(1)}`
  if (digits[0] !== '7') digits = `7${digits}`

  return digits.slice(0, 11)
}

const formatPhone = (value) => {
  const digits = getPhoneDigits(value)
  if (!digits) return ''

  const country = digits[0]
  const code = digits.slice(1, 4)
  const first = digits.slice(4, 7)
  const second = digits.slice(7, 9)
  const third = digits.slice(9, 11)

  let output = `+${country}`
  if (code) output += ` (${code}`
  if (code.length === 3) output += ')'
  if (first) output += ` ${first}`
  if (second) output += `-${second}`
  if (third) output += `-${third}`

  return output
}

const resetForm = () => {
  isFormVisible.value = false
  isSubmitting.value = false
  submitState.value = 'idle'
  submitMessage.value = ''
  form.name = ''
  form.phone = ''
}

const closeModal = () => {
  resetForm()
  emit('close')
}

const openInterestForm = () => {
  isFormVisible.value = true
  submitState.value = 'idle'
  submitMessage.value = ''
}

const cancelInterestForm = () => {
  resetForm()
}

const handlePhoneInput = (event) => {
  form.phone = formatPhone(event.target.value)
}

const submitLead = async () => {
  const district = currentDistrict.value

  if (!district || !props.districtId) {
    submitState.value = 'error'
    submitMessage.value = 'Не удалось определить район. Попробуйте открыть карточку ещё раз.'
    return
  }

  const normalizedName = form.name.trim()
  const phoneDigits = getPhoneDigits(form.phone)

  if (normalizedName.length < 2) {
    submitState.value = 'error'
    submitMessage.value = 'Пожалуйста, укажите имя.'
    return
  }

  if (phoneDigits.length !== 11) {
    submitState.value = 'error'
    submitMessage.value = 'Пожалуйста, укажите корректный номер телефона.'
    return
  }

  isSubmitting.value = true
  submitState.value = 'idle'
  submitMessage.value = ''

  try {
    const response = await fetch(districtInterestEndpoint.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: normalizedName,
        phone: form.phone,
        districtId: props.districtId,
        districtTitle: district.title,
        districtType: district.type,
        source: 'district-modal',
        page: typeof window !== 'undefined' ? window.location.href : ''
      })
    })

    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(payload.error || 'Не удалось отправить заявку. Попробуйте ещё раз.')
    }

    submitState.value = 'success'
    submitMessage.value = payload.message || ''
    isFormVisible.value = false
  } catch (error) {
    submitState.value = 'error'
    submitMessage.value =
      error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте ещё раз.'
  } finally {
    isSubmitting.value = false
  }
}

watch(
  () => props.districtId,
  () => {
    resetForm()
  }
)

onMounted(() => {
  if (props.isOpen) {
    lockBodyScroll()
  }
})

onBeforeUnmount(() => {
  unlockBodyScroll()
})
</script>

<style scoped>
.district-modal-shell {
  max-height: min(92vh, 48rem);
  overflow-y: auto;
}

.district-form-panel,
.district-success-panel {
  padding: 1.15rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(184, 138, 66, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.94), rgba(255, 248, 237, 0.84)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.08), transparent 42%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.42);
}

.district-form-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.48rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(184, 138, 66, 0.18);
  background: rgba(255, 255, 255, 0.7);
  color: var(--title);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.district-form-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--gold);
  box-shadow: 0 0 16px rgba(184, 138, 66, 0.4);
}

.district-form-title {
  margin-top: 1rem;
  color: var(--title);
  font-size: 1.35rem;
  line-height: 1.2;
  font-weight: 700;
}

.district-form-copy {
  margin-top: 0.7rem;
  color: var(--ink-soft);
  font-size: 0.95rem;
  line-height: 1.7;
}

.district-field {
  display: block;
  margin-top: 1rem;
}

.district-field-label {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--ink);
  font-size: 0.84rem;
  font-weight: 600;
}

.district-input {
  width: 100%;
  min-height: 3.2rem;
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(184, 138, 66, 0.18);
  background: rgba(255, 255, 255, 0.86);
  color: var(--ink);
  font-size: 0.98rem;
  outline: none;
  transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.district-input::placeholder {
  color: rgba(72, 79, 72, 0.5);
}

.district-input:focus {
  border-color: rgba(184, 138, 66, 0.42);
  box-shadow: 0 0 0 4px rgba(184, 138, 66, 0.12);
  background: #fffdf9;
}

.district-input:disabled {
  cursor: not-allowed;
  opacity: 0.72;
}

.district-form-note {
  margin-top: 0.9rem;
  color: rgba(72, 79, 72, 0.72);
  font-size: 0.82rem;
  line-height: 1.6;
}

.district-form-error {
  margin-top: 0.85rem;
  padding: 0.8rem 0.9rem;
  border-radius: 1rem;
  background: rgba(150, 35, 35, 0.08);
  border: 1px solid rgba(150, 35, 35, 0.14);
  color: #8f2d2d;
  font-size: 0.9rem;
  line-height: 1.5;
}

.district-success-panel {
  text-align: left;
}

.district-success-icon {
  width: 2.7rem;
  height: 2.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(74, 111, 97, 0.12);
  border: 1px solid rgba(74, 111, 97, 0.14);
  color: #3f6658;
  font-size: 1rem;
  font-weight: 800;
}

.district-form-enter-active,
.district-form-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.district-form-enter-from,
.district-form-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
