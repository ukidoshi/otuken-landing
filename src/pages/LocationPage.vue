<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        :badge="content.badge"
        :title="content.h1"
        :intro="content.intro"
        :lead="content.lead"
        :highlights="content.highlights"
        :image="heroImage"
        :image-mobile="heroImageMobile"
        image-alt="Территория проекта Отукен рядом с Кызылом и Каа-Хемом"
      />
      <ContentSections :sections="content.sections" />
      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <article class="theme-card p-7 md:p-9">
            <h2 class="display-font text-[2.35rem] md:text-[3.1rem] leading-none text-[var(--title)]">
              Локальная привязка проекта
            </h2>
            <p class="mt-5 text-[var(--ink-soft)] leading-8">
              Проект уже чётко связан с Республикой Тыва, Кызылом и пгт Каа-Хем. Точный адрес пока не опубликован,
              поэтому на странице сохранена аккуратная географическая рамка без лишних допущений и неточных деталей.
            </p>
            <div class="mt-6 grid gap-4">
              <div class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/70 p-5">
                <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80">Республика</div>
                <div class="mt-2 text-lg font-semibold text-[var(--title)]">Республика Тыва</div>
              </div>
              <div class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/70 p-5">
                <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80">Ближайшие ориентиры</div>
                <div class="mt-2 text-lg font-semibold text-[var(--title)]">Кызыл и пгт Каа-Хем</div>
              </div>
            </div>
          </article>

          <article class="theme-card p-7 md:p-9">
            <h2 class="display-font text-[2.35rem] md:text-[3.1rem] leading-none text-[var(--title)]">
              Как добраться
            </h2>
            <p class="mt-5 text-[var(--ink-soft)] leading-8">
              Как только будет утверждён точный адрес, сюда можно будет добавить координаты, ссылку на навигаторы,
              схему подъезда и ориентиры по времени в пути без изменения общей логики страницы.
            </p>
            <ul class="mt-6 grid gap-3">
              <li class="flex gap-3 text-[var(--ink)] leading-7">
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>Из Кызыла: основной городской маршрут к территории проекта после публикации точной точки входа.</span>
              </li>
              <li class="flex gap-3 text-[var(--ink)] leading-7">
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>Из Каа-Хема: локальное направление с уточнением подъезда после финального адреса.</span>
              </li>
              <li class="flex gap-3 text-[var(--ink)] leading-7">
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>Для туристов: будущий блок с дорогой от аэропорта, центра Кызыла и автовокзала.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>
      <RelatedLinks :links="relatedLinks" lead="Страницы, которые помогают понять, что находится рядом с локацией и как устроен комплекс." />
      <FaqSection :items="content.faq" />
      <PageCta :cta="content.cta" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import ContentSections from '../components/ContentSections.vue'
import RelatedLinks from '../components/RelatedLinks.vue'
import FaqSection from '../components/FaqSection.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import { locationPageContent } from '../content/sitePages'
import hero from '../assets/optimized/hero/4.webp'
import heroMobile from '../assets/optimized/hero/4-mobile.webp'
import { makeBreadcrumbSchema, makeFaqSchema, makePlaceSchema } from '../seo/schema'

const content = locationPageContent

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Локация' }
]

const relatedLinks = [
  { title: 'О комплексе', description: 'Главные смыслы и роль проекта для Республики Тыва.', to: '/o-komplekse' },
  { title: 'Объекты комплекса', description: 'Какие пространства и объекты запланированы в составе «Отукена».', to: '/obekty' },
  { title: 'Контакты', description: 'Телефон, e-mail и структура для локальной коммуникации.', to: '/kontakty' },
  { title: 'События', description: 'Фестиваль и событийная программа как причина приезжать на территорию.', to: '/sobytiya' }
]

const heroImage = hero
const heroImageMobile = heroMobile

useSeoPage(
  {
    title: 'Где находится «Отукен» — локация рядом с Кызылом и Каа-Хемом',
    description:
      'Локация проекта «Отукен» / «Өтүкен» в Республике Тыва: географическая привязка к Кызылу и Каа-Хему, локальный контекст и будущая структура страницы «Как добраться».',
    path: '/lokaciya',
    image: heroImage
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makePlaceSchema({
      name: content.h1,
      description: content.intro,
      path: '/lokaciya',
      image: heroImage
    }),
    makeFaqSchema(content.faq)
  ]
)
</script>
