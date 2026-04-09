<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="Контакты и коммуникация"
        title="Контакты комплекса «Отукен»"
        intro="Страница контактов объединяет каналы связи для туристов, партнёров, инвесторов и представителей медиа. Здесь же собрана локальная привязка проекта к Республике Тыва, Кызылу и Каа-Хему."
        lead="Если точный адрес комплекса пока не опубликован, мы честно показываем текущую региональную привязку проекта и оставляем место для последующего уточнения маршрута и адресных данных."
        :highlights="['Телефон и e-mail проекта', 'Республика Тыва', 'Кызыл и Каа-Хем']"
      />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-[0.96fr_1.04fr] gap-6">
          <article class="theme-card p-7 md:p-8">
            <h2 class="display-font text-[2.35rem] md:text-[3rem] leading-none text-[var(--title)]">
              Контактная информация
            </h2>
            <div class="mt-6 grid gap-4">
              <div class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/72 p-5">
                <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80">Название</div>
                <div class="mt-2 text-lg font-semibold text-[var(--title)]">Этнокультурный комплекс «Отукен» / «Өтүкен»</div>
              </div>
              <div class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/72 p-5">
                <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80">Телефон</div>
                <a class="mt-2 inline-block text-lg font-semibold text-[var(--title)]" :href="`tel:${phoneHref}`">
                  {{ siteConfig.phoneDisplay }}
                </a>
              </div>
              <div class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/72 p-5">
                <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80">E-mail</div>
                <a class="mt-2 inline-block text-lg font-semibold text-[var(--title)]" :href="`mailto:${siteConfig.email}`">
                  {{ siteConfig.email }}
                </a>
              </div>
              <div class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/72 p-5">
                <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80">Локация</div>
                <div class="mt-2 text-lg font-semibold text-[var(--title)]">
                  Республика Тыва, рядом с Кызылом и пгт Каа-Хем
                </div>
              </div>
            </div>
          </article>

          <article class="theme-card p-7 md:p-8">
            <h2 class="display-font text-[2.35rem] md:text-[3rem] leading-none text-[var(--title)]">
              Как связаться и что важно уточнить
            </h2>
            <p class="mt-5 text-[var(--ink-soft)] leading-8">
              Здесь собраны рабочие контакты проекта и базовая информация о локации. Если точный адрес ещё не опубликован,
              это не мешает пользователю понять, как связаться с командой и в каком регионе развивается комплекс.
            </p>
            <ul class="mt-6 grid gap-3">
              <li class="flex gap-3 text-[var(--ink)] leading-7">
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>По телефону и e-mail можно уточнять детали проекта, форматы сотрудничества и интерес к объектам комплекса.</span>
              </li>
              <li class="flex gap-3 text-[var(--ink)] leading-7">
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>После окончательного подтверждения локации здесь появятся точный адрес, координаты и маршрут к территории.</span>
              </li>
              <li class="flex gap-3 text-[var(--ink)] leading-7">
                <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0"></span>
                <span>Структура подходит и для туристических вопросов, и для партнёрских обращений, и для инвесткоммуникации.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <ContentSections :sections="content.sections" />
      <RelatedLinks :links="relatedLinks" lead="Страницы, которые чаще всего нужны пользователю рядом с контактами." />
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
import { contactsPageContent as content } from '../content/sitePages'
import { siteConfig } from '../seo/site'
import { makeBreadcrumbSchema, makeFaqSchema, makePlaceSchema } from '../seo/schema'

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Контакты' }
]

const relatedLinks = [
  { title: 'О комплексе', description: 'Концепция, смысл и роль проекта для Республики Тыва.', to: '/o-komplekse' },
  { title: 'Локация', description: 'Локальная привязка проекта к Кызылу и Каа-Хему.', to: '/lokaciya' },
  { title: 'Объекты', description: 'Каталог объектов комплекса и подробные описания по каждому направлению.', to: '/obekty' },
  { title: 'События', description: 'Фестиваль и событийная программа проекта.', to: '/sobytiya' }
]

const phoneHref = siteConfig.phone.replace(/[^\d+]/g, '')

useSeoPage(
  {
    title: content.title,
    description: content.description,
    path: '/kontakty'
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makePlaceSchema({
      name: 'Контакты комплекса «Отукен»',
      description: content.description,
      path: '/kontakty'
    }),
    makeFaqSchema(content.faq)
  ]
)
</script>
