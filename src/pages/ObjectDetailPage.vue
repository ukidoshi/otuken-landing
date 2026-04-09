<template>
  <div class="theme-page">
    <Header />
    <main v-if="objectItem">
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="Объект комплекса"
        :title="objectItem.title"
        :intro="objectItem.intro"
        :lead="objectItem.full"
        :highlights="objectItem.tags"
        :image="objectItem.image"
        :image-mobile="objectItem.imageMobile"
        :image-alt="objectItem.title"
      />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-[0.98fr_1.02fr] gap-6">
          <article class="theme-card p-7 md:p-8">
            <h2 class="display-font text-[2.35rem] md:text-[3rem] leading-none text-[var(--title)]">
              Чем объект ценен для проекта
            </h2>
            <p class="mt-5 text-[var(--ink-soft)] leading-8">
              {{ objectItem.full }}
            </p>
            <ul class="mt-6 grid gap-3">
              <li
                v-for="point in objectItem.points"
                :key="point"
                class="flex gap-3 text-[var(--ink)] leading-7"
              >
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </article>

          <article class="theme-card p-7 md:p-8">
            <h2 class="display-font text-[2.35rem] md:text-[3rem] leading-none text-[var(--title)]">
              Фотографии и ракурсы
            </h2>
            <div v-if="gallery.length" class="mt-6 grid sm:grid-cols-2 gap-4">
              <div
                v-for="(image, index) in gallery"
                :key="`${objectItem.slug}-${index}`"
                class="overflow-hidden rounded-[1.35rem] border border-[rgba(184,138,66,0.16)]"
              >
                <img
                  :src="image"
                  :alt="`${objectItem.title} — ракурс ${index + 1}`"
                  class="w-full h-52 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <p v-else class="mt-5 text-[var(--ink-soft)] leading-8">
              Галерея объекта будет дополняться по мере появления новых ракурсов и визуализаций.
            </p>
          </article>
        </div>
      </section>

      <ContentSections :sections="objectItem.sections" />
      <RelatedLinks :links="relatedLinks" lead="Соседние направления, которые помогают увидеть объект в структуре всего комплекса." />
      <FaqSection :items="objectItem.faq" />
      <PageCta :cta="cta" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import ContentSections from '../components/ContentSections.vue'
import RelatedLinks from '../components/RelatedLinks.vue'
import FaqSection from '../components/FaqSection.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import { getObjectBySlug, getObjectLinkItems } from '../content/objectCatalog'
import { makeBreadcrumbSchema, makeFaqSchema, makeTouristAttractionSchema } from '../seo/schema'

const route = useRoute()

const objectItem = computed(() => getObjectBySlug(route.params.slug))
const gallery = computed(() => objectItem.value?.gallery || [])

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Объекты', to: '/obekty' },
  { label: objectItem.value?.title || 'Объект' }
])

const relatedLinks = computed(() => {
  const dynamicLinks = objectItem.value ? getObjectLinkItems(objectItem.value.slug) : []
  return [
    { title: 'Все объекты комплекса', description: 'Каталог всех ключевых объектов проекта «Отукен».', to: '/obekty' },
    ...dynamicLinks
  ].slice(0, 4)
})

const cta = computed(() => ({
  title: 'Продолжить знакомство с комплексом',
  text:
    'После знакомства с объектом можно посмотреть общую идею комплекса, локацию проекта или связаться с представителями «Отукена».',
  primary: { label: 'О комплексе', to: '/o-komplekse' },
  secondary: { label: 'Контакты', to: '/kontakty' }
}))

useSeoPage(
  () => ({
    title: objectItem.value?.seoTitle,
    description: objectItem.value?.metaDescription,
    path: objectItem.value ? `/obekty/${objectItem.value.slug}` : '/obekty',
    image: objectItem.value?.image,
    type: 'article'
  }),
  () => {
    if (!objectItem.value) return []
    return [
      makeBreadcrumbSchema(breadcrumbs.value),
      makeTouristAttractionSchema({
        name: objectItem.value.title,
        description: objectItem.value.short,
        path: `/obekty/${objectItem.value.slug}`,
        image: objectItem.value.image,
        additionalType: objectItem.value.schemaType,
        category: objectItem.value.eyebrow
      }),
      makeFaqSchema(objectItem.value.faq)
    ]
  }
)
</script>
