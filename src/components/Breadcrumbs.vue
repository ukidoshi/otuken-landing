<template>
  <nav aria-label="Хлебные крошки" class="breadcrumbs">
    <ol class="breadcrumbs-list">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="breadcrumbs-item">
        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="breadcrumbs-link"
        >
          {{ item.label }}
        </RouterLink>
        <span v-else class="breadcrumbs-current" aria-current="page">
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="breadcrumbs-separator" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1.25rem;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  color: var(--ink-soft);
  font-size: 0.92rem;
}

.breadcrumbs-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.breadcrumbs-link {
  color: var(--ink-soft);
  transition: color 180ms ease;
}

.breadcrumbs-link:hover {
  color: var(--title);
}

.breadcrumbs-current {
  color: var(--title);
  font-weight: 600;
}

.breadcrumbs-separator {
  color: rgba(84, 101, 92, 0.54);
}
</style>
