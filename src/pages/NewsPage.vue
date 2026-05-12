<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="Новости проекта"
        title="Новости и обновления «Өтүкен»"
        intro="Здесь собраны важные сообщения о развитии этнокультурного комплекса: события, новые этапы работы, публичные материалы и всё, что помогает следить за жизнью проекта."
        lead="Сейчас в центре внимания — фестиваль «Мой род – моя гордость» и первые публичные шаги, через которые территория начинает звучать как живое пространство культуры, встреч и будущих событий."
        :highlights="['Новости проекта', 'События и анонсы', 'Развитие территории']"
        :image="heroImage"
        image-alt="Новости этнокультурного комплекса Өтүкен"
      />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid gap-5">
          <article
            v-for="eventItem in newsItems"
            :key="eventItem.slug"
            :class="[
              'theme-card overflow-hidden',
              eventItem.cover_url?.trim() ? 'grid lg:grid-cols-[0.82fr_1.18fr]' : '',
              eventItem.actuality_highlight
                ? 'ring-2 ring-[var(--gold)]/40 shadow-[0_14px_44px_rgba(184,138,66,0.14)]'
                : ''
            ]"
          >
            <div v-if="eventItem.cover_url?.trim()" class="relative min-h-[18rem]">
              <img
                :src="eventItem.cover_url"
                :alt="eventItem.cover_alt || eventItem.title"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[rgba(9,13,10,0.76)] via-[rgba(9,13,10,0.18)] to-transparent"></div>
              <div class="absolute top-4 left-4">
                <div class="section-badge bg-black/24 text-white border-white/14">
                  <span class="section-dot"></span>
                  {{ eventItem.date_text || 'Скоро' }}
                </div>
              </div>
            </div>

            <div class="p-7 md:p-8">
              <div v-if="!eventItem.cover_url?.trim()" class="mb-3">
                <div class="section-badge inline-flex">
                  <span class="section-dot"></span>
                  {{ eventItem.date_text || 'Скоро' }}
                </div>
              </div>
              <div class="text-sm uppercase tracking-[0.24em] text-[var(--clay)]/80">
                {{ eventItem.actuality_highlight ? 'В центре внимания' : 'Новость проекта' }}
              </div>
              <h2 class="display-font text-[2.3rem] md:text-[3rem] leading-none text-[var(--title)] mt-3">
                {{ eventItem.title }}
              </h2>
              <p class="mt-5 text-[var(--ink-soft)] leading-8">
                {{ eventItem.excerpt }}
              </p>
              <RouterLink
                :to="`/novosti/${eventItem.slug}`"
                class="theme-button-primary mt-7 inline-flex w-full sm:w-auto sm:self-start items-center justify-center gap-2.5 !min-h-0 !py-3.5 !px-7 text-[0.95rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--title)]"
              >
                <span>Читать новость</span>
                <span class="text-[1.2em] leading-none font-extrabold" aria-hidden="true">→</span>
              </RouterLink>
              <div class="mt-6 flex flex-wrap gap-2">
                <span class="px-3.5 py-2 rounded-full border border-[rgba(184,138,66,0.18)] bg-white/72 text-sm font-semibold text-[var(--title)]">
                  {{ localeBadge }}
                </span>
                <span class="px-3.5 py-2 rounded-full border border-[rgba(184,138,66,0.18)] bg-white/72 text-sm font-semibold text-[var(--title)]">
                  Культура и события
                </span>
              </div>
            </div>
          </article>
        </div>

        <div
          v-if="paginationMeta.last_page > 1"
          class="max-w-7xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <RouterLink
            v-if="paginationMeta.current_page > 1"
            :to="paginationLink(paginationMeta.current_page - 1)"
            class="theme-button-light !min-h-0 !py-2.5 !px-5 text-sm"
          >
            Назад
          </RouterLink>
          <span class="text-sm text-[var(--ink-soft)]">
            Страница {{ paginationMeta.current_page }} из {{ paginationMeta.last_page }}
          </span>
          <RouterLink
            v-if="paginationMeta.current_page < paginationMeta.last_page"
            :to="paginationLink(paginationMeta.current_page + 1)"
            class="theme-button-light !min-h-0 !py-2.5 !px-5 text-sm"
          >
            Вперёд
          </RouterLink>
        </div>
      </section>

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-[1.02fr_0.98fr] gap-6">
          <article class="theme-card p-7 md:p-9">
            <h2 class="display-font text-[2.35rem] md:text-[3.1rem] leading-none text-[var(--title)]">
              Что появляется в этом разделе
            </h2>
            <p class="mt-5 text-[var(--ink-soft)] leading-8">
              Раздел новостей нужен, чтобы собирать в одном месте все важные обновления о проекте: события,
              этапы развития территории, новые визуализации и публичные сообщения о ключевых объектах комплекса.
            </p>

            <div class="mt-7 grid sm:grid-cols-3 gap-4">
              <div
                v-for="item in newsDirections"
                :key="item.title"
                class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/72 p-4"
              >
                <div class="text-base font-semibold text-[var(--title)]">
                  {{ item.title }}
                </div>
                <p class="mt-2 text-sm text-[var(--ink-soft)] leading-7">
                  {{ item.text }}
                </p>
              </div>
            </div>
          </article>

          <article class="theme-card-dark p-7 md:p-9">
            <div class="text-sm uppercase tracking-[0.24em] text-white/72">Сейчас в фокусе</div>
            <h2 class="display-font text-[2.35rem] md:text-[3rem] leading-none text-white mt-4">
              Территория, события и культурный контур
            </h2>
            <p class="mt-5 text-white/82 leading-8">
              На старте особенно важно показывать не только отдельные объекты, но и общий характер комплекса:
              как развивается территория, какие события её наполняют и как культура Тувы становится частью живой среды.
            </p>

            <ul class="mt-6 grid gap-3">
              <li
                v-for="point in focusPoints"
                :key="point"
                class="flex gap-3 text-white/86 leading-7"
              >
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <PageCta :cta="cta" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import hero from '../assets/optimized/hero/13.webp'
import { makeBreadcrumbSchema, makeCollectionPageSchema } from '../seo/schema'
import { getNewsListPage } from '../services/newsApi'
import { useSiteLocale } from '../composables/useSiteLocale'

const route = useRoute()
const { locale, localeToShortBadge } = useSiteLocale()
const localeBadge = computed(() => localeToShortBadge(locale.value))
const heroImage = hero
const newsItems = ref([])
const paginationMeta = ref({
  current_page: 1,
  last_page: 1,
  total: 0
})

const page = computed(() => {
  const raw = route.query.page
  const value = Number(Array.isArray(raw) ? raw[0] : raw)
  return Number.isFinite(value) && value > 0 ? value : 1
})

const paginationLink = (targetPage) => ({
  path: '/novosti',
  query: targetPage > 1 ? { page: targetPage } : {}
})

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Новости' }
]

const newsDirections = [
  {
    title: 'События и анонсы',
    text: 'Фестивали, культурные встречи и объявления, которые формируют ритм территории.'
  },
  {
    title: 'Развитие пространства',
    text: 'Обновления по локации, новым визуализациям и этапам формирования среды.'
  },
  {
    title: 'Ключевые объекты',
    text: 'Публичные сообщения о важных направлениях комплекса: от культурного ядра до гостевого контура.'
  }
]

const focusPoints = [
  'новости о фестивалях и культурной программе',
  'обновления по локации и устройству территории',
  'появление новых визуальных материалов по объектам комплекса'
]

const cta = {
  title: 'Следить за развитием проекта',
  text:
    'Если хотите уточнить детали, предложить сотрудничество или узнать больше о ближайших новостях комплекса, команда проекта на связи.',
  primary: { label: 'Связаться с нами', to: { path: '/', hash: '#contact' } },
  secondary: { label: 'О нашей команде', to: '/o-nas' }
}

const loadNews = async () => {
  try {
    const { items, meta } = await getNewsListPage(locale.value, page.value)
    newsItems.value = items
    paginationMeta.value = {
      current_page: meta.current_page || 1,
      last_page: meta.last_page || 1,
      total: meta.total || items.length
    }
  } catch (error) {
    console.error('Failed to load news from API:', error)
  }
}

watch([locale, page], loadNews)
onMounted(loadNews)

useSeoPage(
  {
    title: 'Новости комплекса «Отукен» — обновления и анонсы проекта',
    description:
      'Новости этнокультурного комплекса «Отукен» / «Өтүкен»: обновления по развитию территории, событиям, анонсам и ключевым этапам проекта в Республике Тыва.',
    path: '/novosti',
    image: heroImage
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makeCollectionPageSchema({
      name: 'Новости комплекса «Отукен»',
      description: 'Обновления, анонсы и новости этнокультурного комплекса «Отукен».',
      path: '/novosti',
      itemUrls: []
    })
  ]
)
</script>
