<template>
  <div ref="root">
    <div
      v-if="!isVisible && placeholderId"
      :id="placeholderId"
      class="lazy-section-anchor"
      aria-hidden="true"
    ></div>

    <slot v-if="isVisible" />
    <div
      v-else
      class="lazy-section-placeholder"
      :style="placeholderStyle"
      aria-hidden="true"
    ></div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  minHeight: {
    type: String,
    default: '0px'
  },
  rootMargin: {
    type: String,
    default: '320px 0px'
  },
  placeholderId: {
    type: String,
    default: ''
  }
})

const root = ref(null)
const isVisible = ref(false)

let observer = null

const placeholderStyle = computed(() => ({
  minHeight: props.minHeight
}))

const reveal = () => {
  isVisible.value = true
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

onMounted(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    reveal()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal()
      }
    },
    {
      rootMargin: props.rootMargin,
      threshold: 0.01
    }
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.lazy-section-placeholder {
  width: 100%;
}

.lazy-section-anchor {
  width: 100%;
}
</style>
