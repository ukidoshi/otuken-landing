<template>
  <Teleport to="body">
    <Transition name="locale-overlay">
      <div
        v-if="isLocalePickerOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[rgba(23,29,24,0.55)] backdrop-blur-[2px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="locale-picker-title"
      >
        <div
          class="theme-card max-w-lg w-full p-8 md:p-10 shadow-[0_28px_60px_rgba(45,39,23,0.18)]"
          @click.stop
        >
          <div class="section-badge mb-5">
            <span class="section-dot"></span>
            Язык сайта
          </div>
          <h2 id="locale-picker-title" class="display-font text-[2rem] md:text-[2.45rem] leading-none text-[var(--title)]">
            Какой язык выбрать?
          </h2>
          <p class="mt-4 text-[var(--ink-soft)] leading-8">
            Выберите язык материалов. Мы запомним выбор в этом браузере и применим его к разделу новостей.
          </p>

          <div class="mt-8 grid gap-3">
            <button
              v-for="item in languages"
              :key="item.code"
              type="button"
              class="w-full text-left rounded-[1.25rem] border border-[rgba(184,138,66,0.22)] bg-white/80 px-5 py-4 font-semibold text-[var(--ink)] transition-all duration-200 hover:border-[var(--gold)] hover:bg-[rgba(184,138,66,0.08)] hover:text-[var(--title)] hover:shadow-[0_14px_32px_rgba(80,58,24,0.1)]"
              @click="choose(item.code)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useSiteLocale } from '../composables/useSiteLocale'

const { isLocalePickerOpen, languages, setLocale } = useSiteLocale()

const choose = (code) => {
  setLocale(code)
}
</script>

<style scoped>
.locale-overlay-enter-active,
.locale-overlay-leave-active {
  transition: opacity 220ms ease;
}

.locale-overlay-enter-from,
.locale-overlay-leave-to {
  opacity: 0;
}
</style>
