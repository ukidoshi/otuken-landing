<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="О нас"
        title="Люди и идея проекта «Өтүкен»"
        intro="«Өтүкен» создаётся как долгосрочный этнокультурный проект в Республике Тыва. За ним стоит команда, которая соединяет уважение к традициям, современный подход к территории и внимательную работу с будущей средой."
        lead="Для нас важно, чтобы комплекс был не набором отдельных объектов, а цельным пространством культуры, отдыха, событий и гостеприимства, понятным и жителям республики, и гостям Тувы."
        :highlights="[
          'Проект в Республике Тыва',
          'Культура, туризм и инфраструктура',
          'Долгосрочное развитие территории'
        ]"
        :image="heroImage"
        :image-mobile="heroImageMobile"
        image-alt="Вид на территорию этнокультурного комплекса Өтүкен"
      />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-[1.02fr_0.98fr] gap-6">
          <article class="theme-card p-7 md:p-9">
            <div class="text-sm uppercase tracking-[0.24em] text-[var(--clay)]/80">Наш подход</div>
            <h2 class="display-font text-[2.35rem] md:text-[3.1rem] leading-none text-[var(--title)] mt-4">
              Проект, который растёт из смысла, а не только из квадратных метров
            </h2>
            <p class="mt-5 text-[var(--ink-soft)] leading-8">
              Мы смотрим на «Өтүкен» как на живую среду, где культурная память, архитектура, события и отдых
              работают вместе. Поэтому для нас важны не только объекты сами по себе, но и то, какое впечатление
              они создают, как связаны между собой и каким будет путь человека по территории.
            </p>
            <p class="mt-4 text-[var(--ink-soft)] leading-8">
              Такой подход помогает строить комплекс последовательно: от сильной идеи и первых событий
              к инфраструктуре, которая будет работать круглый год и поддерживать долгую жизнь проекта.
            </p>
          </article>

          <article class="theme-card-dark p-7 md:p-9">
            <div class="text-sm uppercase tracking-[0.24em] text-white/72">Что для нас принципиально</div>
            <div class="mt-5 grid sm:grid-cols-2 gap-4">
              <div class="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                <div class="text-[var(--bg-sand)] font-semibold">Уважение к традиции</div>
                <p class="mt-2 text-sm text-white/82 leading-7">
                  Пространство должно чувствоваться тувинским по характеру, а не только по декоративным деталям.
                </p>
              </div>
              <div class="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                <div class="text-[var(--bg-sand)] font-semibold">Современный комфорт</div>
                <p class="mt-2 text-sm text-white/82 leading-7">
                  Гостю должно быть удобно отдыхать, перемещаться, участвовать в событиях и возвращаться снова.
                </p>
              </div>
              <div class="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                <div class="text-[var(--bg-sand)] font-semibold">Долгий горизонт</div>
                <p class="mt-2 text-sm text-white/82 leading-7">
                  Проект развивается поэтапно, но всегда с пониманием будущего масштаба и устойчивости.
                </p>
              </div>
              <div class="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                <div class="text-[var(--bg-sand)] font-semibold">Открытость к партнёрству</div>
                <p class="mt-2 text-sm text-white/82 leading-7">
                  Мы видим комплекс как площадку для совместных инициатив, событий и инфраструктурных решений.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <ContentSections :sections="sections" />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-10">
            <div class="section-badge mx-auto">
              <span class="section-dot"></span>
              Команда проекта
            </div>
            <h2 class="section-title mt-5 mb-5">
              Люди, которые ведут «Өтүкен»
            </h2>
            <p class="section-lead">
              Проект развивается как совместная работа над территорией, её культурным смыслом,
              инфраструктурой и будущим ритмом жизни.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <article
              v-for="person in people"
              :key="person.name"
              class="theme-card p-6 md:p-7"
            >
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-[1.2rem] bg-[linear-gradient(135deg,#d7b76a,#bb9454)] text-[#17130c] font-bold flex items-center justify-center shrink-0">
                  {{ person.initials }}
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-[var(--title)]">
                    {{ person.name }}
                  </h3>
                  <div class="mt-1 text-sm uppercase tracking-[0.18em] text-[var(--clay)]/80">
                    {{ person.role }}
                  </div>
                </div>
              </div>
              <p class="mt-5 text-[var(--ink-soft)] leading-8">
                {{ person.text }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <FaqSection
        :items="faq"
        lead="Короткие ответы о команде, логике проекта и том, как следить за развитием комплекса."
      />

      <PageCta :cta="cta" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import ContentSections from '../components/ContentSections.vue'
import FaqSection from '../components/FaqSection.vue'
import PageCta from '../components/PageCta.vue'
import { useSeoPage } from '../composables/useSeoPage'
import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'
import { makeBreadcrumbSchema, makeFaqSchema } from '../seo/schema'

const heroImage = overview
const heroImageMobile = overviewMobile

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'О нас' }
]

const sections = [
  {
    title: 'Зачем создаётся «Өтүкен»',
    paragraphs: [
      'Проект задуман как пространство, где культура Тувы раскрывается не через отдельный музейный жест, а через всю среду: маршруты, события, гостевые форматы, места отдыха и общественные точки притяжения.',
      'Нам важно, чтобы комплекс был интересен и жителям региона, и туристам, и партнёрам, которые смотрят на Туву как на территорию с сильным культурным характером и большим потенциалом развития.'
    ]
  },
  {
    title: 'Как мы видим развитие территории',
    paragraphs: [
      'Мы рассматриваем проект как поэтапное, но цельное развитие. Сначала пространство должно начать жить через атмосферу, культурные сценарии и первые события. Затем вокруг этого ядра усиливаются инфраструктура, сервисы и новые точки притяжения.',
      'Такой путь помогает не потерять характер проекта и сделать каждое следующее решение осмысленным: от архитектурных акцентов до гостевого контура и событийной программы.'
    ],
    cards: [
      {
        title: 'Смысловое ядро',
        text: 'Культура, родовая память, уважение к традиции и сильная идентичность территории.'
      },
      {
        title: 'Живая программа',
        text: 'Фестивали, встречи и сценарии, которые наполняют пространство реальной жизнью.'
      },
      {
        title: 'Устойчивая среда',
        text: 'Инфраструктура, гостеприимство и сервисы, которые делают проект долгосрочным.'
      }
    ]
  },
  {
    title: 'С кем мы говорим через этот проект',
    paragraphs: [
      'Для туристов «Өтүкен» — это возможность ближе познакомиться с культурой Тувы через пространство и личный опыт. Для семей — новая локация отдыха и досуга. Для партнёров — площадка для событий, сервисов и совместных инициатив. Для инвесторов — территория, в которой культурный смысл подкреплён логикой развития.'
    ],
    list: [
      'С жителями Тувы, которым важно узнаваемое и уважительное пространство',
      'С туристами, ищущими неформальный и содержательный опыт',
      'С организаторами событий и культурных программ',
      'С партнёрами, которым близка идея долгосрочного развития территории'
    ]
  }
]

const people = [
  {
    initials: 'AS',
    name: 'Салчак Алимдорж Санданович',
    role: 'Организатор проекта',
    text: 'Отвечает за организационное развитие проекта, партнёрские связи и выстраивание устойчивой модели роста комплекса.'
  },
  {
    initials: 'RS',
    name: 'Салчак Розаля Дадар-ооловна',
    role: 'Организатор проекта',
    text: 'Курирует развитие концепции этнокомплекса, культурную линию проекта и событийные сценарии будущей территории.'
  }
]

const faq = [
  {
    question: 'О чём этот раздел?',
    answer: 'Он рассказывает о людях, подходе и принципах, с которыми развивается проект «Өтүкен».'
  },
  {
    question: 'Что здесь можно понять о проекте?',
    answer: 'Здесь раскрывается внутренняя логика «Өтүкен»: кто ведёт проект, на каких принципах он строится и каким мы видим характер будущей территории.'
  },
  {
    question: 'Можно ли связаться с командой проекта напрямую?',
    answer: 'Да. Внизу сайта указаны актуальные контакты команды: телефон, почта и режим связи.'
  }
]

const cta = {
  title: 'Следить за развитием проекта',
  text:
    'Если хотите быть в курсе новых материалов и важных обновлений по «Өтүкен», откройте страницу новостей или свяжитесь с командой напрямую.',
  primary: { label: 'Открыть новости', to: '/novosti' },
  secondary: { label: 'Связаться с нами', to: { path: '/', hash: '#contact' } }
}

useSeoPage(
  {
    title: 'О нас — команда и идея проекта «Отукен»',
    description:
      'Страница «О нас» проекта «Отукен» / «Өтүкен»: команда, принципы развития этнокультурного комплекса и подход к формированию современной среды в Республике Тыва.',
    path: '/o-nas',
    image: heroImage
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makeFaqSchema(faq)
  ]
)
</script>
