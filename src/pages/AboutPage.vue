<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        :badge="aboutPageContent.badge"
        :title="aboutPageContent.h1"
        :intro="aboutPageContent.intro"
        :lead="aboutPageContent.lead"
        :highlights="aboutPageContent.highlights"
        :image="heroImage"
        :image-mobile="heroImageMobile"
        image-alt="Вид на территорию этнокультурного комплекса Өтүкен"
      />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-[1.02fr_0.98fr] gap-6">
          <article class="theme-card p-7 md:p-9">
            <div class="text-sm uppercase tracking-[0.24em] text-[var(--clay)]/80">
              {{ aboutPageContent.approach?.kicker }}
            </div>
            <h2 class="display-font text-[2.35rem] md:text-[3.1rem] leading-none text-[var(--title)] mt-4">
              {{ aboutPageContent.approach?.title }}
            </h2>
            <p
              v-for="(paragraph, index) in aboutPageContent.approach?.paragraphs || []"
              :key="index"
              class="mt-5 text-[var(--ink-soft)] leading-8"
              :class="{ 'mt-4': index > 0 }"
            >
              {{ paragraph }}
            </p>
          </article>

          <article class="theme-card-dark p-7 md:p-9">
            <div class="text-sm uppercase tracking-[0.24em] text-white/72">
              {{ aboutPageContent.principles?.kicker }}
            </div>
            <div class="mt-5 grid sm:grid-cols-2 gap-4">
              <div
                v-for="card in aboutPageContent.principles?.cards || []"
                :key="card.title"
                class="rounded-[1.35rem] border border-white/12 bg-white/8 p-4"
              >
                <div class="text-[var(--bg-sand)] font-semibold">{{ card.title }}</div>
                <p class="mt-2 text-sm text-white/82 leading-7">
                  {{ card.text }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <ContentSections :sections="aboutPageContent.sections" />

      <section class="py-8 md:py-10 px-4 md:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-10">
            <div class="section-badge mx-auto">
              <span class="section-dot"></span>
              {{ aboutPageContent.team?.badge }}
            </div>
            <h2 class="section-title mt-5 mb-5">
              {{ aboutPageContent.team?.title }}
            </h2>
            <p class="section-lead">
              {{ aboutPageContent.team?.lead }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <article
              v-for="person in aboutPageContent.people"
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
        :items="aboutPageContent.faq"
        :lead="aboutPageContent.faqLead"
      />

      <PageCta :cta="aboutPageContent.cta" />
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
import { aboutPageContent } from '../content/sitePages'
import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'
import { makeBreadcrumbSchema, makeFaqSchema } from '../seo/schema'

const heroImage = overview
const heroImageMobile = overviewMobile

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'О нас' }
]

useSeoPage(
  {
    title: aboutPageContent.title,
    description: aboutPageContent.description,
    path: '/o-nas',
    image: heroImage
  },
  [
    makeBreadcrumbSchema(breadcrumbs),
    makeFaqSchema(aboutPageContent.faq)
  ]
)
</script>
