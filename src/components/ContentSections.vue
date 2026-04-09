<template>
  <section class="py-8 md:py-10 px-4 md:px-8">
    <div class="max-w-7xl mx-auto grid gap-6">
      <article
        v-for="section in sections"
        :key="section.title"
        class="theme-card p-7 md:p-9"
      >
        <h2 class="display-font text-[2.35rem] md:text-[3.1rem] leading-none text-[var(--title)]">
          {{ section.title }}
        </h2>

        <div class="mt-5 space-y-4">
          <p
            v-for="paragraph in section.paragraphs || []"
            :key="paragraph"
            class="text-[var(--ink-soft)] leading-8"
          >
            {{ paragraph }}
          </p>
        </div>

        <div
          v-if="section.cards?.length"
          class="mt-7 grid md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <div
            v-for="card in section.cards"
            :key="card.title"
            class="rounded-[1.5rem] border border-[rgba(184,138,66,0.16)] bg-white/70 p-5"
          >
            <h3 class="text-lg font-semibold text-[var(--title)]">
              {{ card.title }}
            </h3>
            <p class="mt-2 text-[var(--ink-soft)] leading-7">
              {{ card.text }}
            </p>
          </div>
        </div>

        <ul
          v-if="section.list?.length"
          class="mt-6 grid gap-3"
        >
          <li
            v-for="item in section.list"
            :key="item"
            class="flex gap-3 text-[var(--ink)] leading-7"
          >
            <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    default: () => []
  }
})
</script>
