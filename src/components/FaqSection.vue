<template>
  <section v-if="items.length" class="relative overflow-hidden py-16 md:py-20 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-10">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Вопросы и ответы
        </div>

        <h2 class="section-title mt-5 mb-5">
          {{ title }}
        </h2>

        <p v-if="lead" class="section-lead">
          {{ lead }}
        </p>
      </div>

      <div class="grid gap-4">
        <details
          v-for="item in items"
          :key="item.question"
          class="theme-card p-6 md:p-7"
        >
          <summary class="faq-summary">
            <span>{{ item.question }}</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </summary>
          <p class="faq-answer">
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Частые вопросы о проекте'
  },
  lead: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.faq-summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  list-style: none;
  color: var(--title);
  font-size: 1.12rem;
  line-height: 1.55;
  font-weight: 700;
}

.faq-summary::-webkit-details-marker {
  display: none;
}

.faq-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid rgba(184, 138, 66, 0.22);
  color: var(--gold-deep);
  font-size: 1.2rem;
  line-height: 1;
  flex-shrink: 0;
}

details[open] .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  margin-top: 1rem;
  color: var(--ink-soft);
  line-height: 1.9;
}
</style>
