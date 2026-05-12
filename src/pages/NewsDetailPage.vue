<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        :badge="news?.actuality_highlight ? 'В центре внимания' : 'Новость проекта'"
        :title="news?.title || 'Новость'"
        :intro="heroIntro"
        :lead="news?.date_text || ''"
        :highlights="highlights"
        :image="coverImageSrc"
        :image-alt="news?.cover_alt || news?.title || ''"
      />

      <NewsContentBlocks :blocks="news?.content_blocks || []" />

      <section v-if="error" class="py-8 px-4 md:px-8">
        <div class="max-w-5xl mx-auto theme-card p-7 md:p-9 text-[var(--ink-soft)]">
          {{ error }}
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PageHero from '../components/PageHero.vue'
import NewsContentBlocks from '../components/NewsContentBlocks.vue'
import { getNewsBySlug } from '../services/newsApi'
import { useNewsSeo } from '../composables/useNewsSeo'
import { useSiteLocale } from '../composables/useSiteLocale'

const route = useRoute()
const { locale, localeToShortBadge } = useSiteLocale()
const news = ref(null)
const error = ref('')
const loading = ref(true)

const firstPlainFromEditorBlocks = (blocks) => {
  for (const block of blocks || []) {
    if (block?.type !== 'paragraph') continue
    const raw = block?.data?.text ?? block?.data?.content
    if (typeof raw !== 'string' || !raw.trim()) continue
    return raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  }
  return ''
}

const heroIntro = computed(() => {
  if (loading.value) return 'Загрузка новости...'
  if (!news.value) return ''
  if (news.value.excerpt?.trim()) return news.value.excerpt
  const teaser = firstPlainFromEditorBlocks(news.value.content_blocks)
  if (teaser) return teaser.length > 360 ? `${teaser.slice(0, 360)}…` : teaser
  return 'Ознакомьтесь с материалом ниже.'
})

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Новости', to: '/novosti' },
  { label: news.value?.title || 'Новость' }
])

const highlights = computed(() => {
  const items = ['Новости проекта']
  items.push(localeToShortBadge(locale.value))
  if (news.value?.date_text) items.push(news.value.date_text)
  return items
})

const coverImageSrc = computed(() => {
  const u = news.value?.cover_url
  if (u == null) return ''
  const s = String(u).trim()
  return s || ''
})

const loadNews = async () => {
  error.value = ''
  news.value = null
  loading.value = true
  try {
    news.value = await getNewsBySlug(route.params.slug, locale.value)
  } catch (loadError) {
    if (loadError?.status === 404) {
      error.value = 'Новость не найдена или недоступна для публикации.'
    } else if (import.meta.env.DEV && loadError?.message) {
      error.value = `Не удалось загрузить новость: ${loadError.message}`
    } else {
      error.value = 'Не удалось загрузить новость. Проверьте доступность API.'
    }
    console.error(loadError)
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, loadNews)
watch(locale, loadNews)
onMounted(loadNews)

useNewsSeo(news, {
  pathInput: computed(() => `/novosti/${route.params.slug}`)
})
</script>
