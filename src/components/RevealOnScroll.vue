<template>
  <div
    ref="root"
    class="reveal-on-scroll"
    :class="{ 'reveal-on-scroll--visible': isVisible }"
    :style="rootStyle"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  /** Нижний отступ зоны срабатывания: чуть раньше, чем блок полностью вошёл в экран */
  rootMargin: {
    type: String,
    default: '0px 0px -10% 0px'
  },
  threshold: {
    type: Number,
    default: 0.08
  },
  /** Задержка transition (мс) — для каскада между секциями */
  delayMs: {
    type: Number,
    default: 0
  },
  once: {
    type: Boolean,
    default: true
  }
})

const root = ref(null)
const isVisible = ref(false)

const rootStyle = computed(() => ({
  '--reveal-delay': `${props.delayMs}ms`
}))

let observer = null

onMounted(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  const el = root.value
  if (!el) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (props.once && observer) {
            observer.disconnect()
            observer = null
          }
        } else if (!props.once) {
          isVisible.value = false
        }
      }
    },
    { rootMargin: props.rootMargin, threshold: props.threshold }
  )

  observer.observe(el)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>
