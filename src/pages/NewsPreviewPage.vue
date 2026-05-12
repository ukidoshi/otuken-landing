<template>
  <div class="theme-page">
    <Header />
    <main>
      <PageHero
        :breadcrumbs="breadcrumbs"
        badge="Предпросмотр новости"
        :title="news?.title || 'Предпросмотр'"
        :intro="news?.excerpt || 'Проверка токена предпросмотра...'"
        :lead="news?.status ? `Статус: ${news.status}` : ''"
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
import { getNewsPreviewByToken } from '../services/newsApi'
import { useNewsSeo } from '../composables/useNewsSeo'
import { useSiteLocale } from '../composables/useSiteLocale'

const route = useRoute()
const { locale, localeToShortBadge } = useSiteLocale()
const news = ref(null)
const error = ref('')

const token = computed(() => route.query.token || '')

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Новости', to: '/novosti' },
  { label: 'Предпросмотр' }
])

const highlights = computed(() => {
  const items = ['Preview']
  if (news.value?.status) items.push(news.value.status)
  items.push(localeToShortBadge(locale.value))
  return items
})

const coverImageSrc = computed(() => {
  const u = news.value?.cover_url
  if (u == null) return ''
  const s = String(u).trim()
  return s || ''
})

const loadPreview = async () => {
  error.value = ''
  news.value = null

  if (!token.value) {
    error.value = 'Отсутствует token для предпросмотра.'
    return
  }

  try {
    news.value = await getNewsPreviewByToken(route.params.id, token.value)
  } catch (loadError) {
    if (loadError?.status === 403) {
      error.value = 'Токен предпросмотра недействителен или истек.'
    } else {
      error.value = 'Не удалось загрузить предпросмотр.'
    }
    console.error(loadError)
  }
}

watch(() => route.params.id, loadPreview)
watch(token, loadPreview)
onMounted(loadPreview)

useNewsSeo(news, {
  pathInput: computed(() => `${import.meta.env.VITE_NEWS_PREVIEW_PATH || '/news-preview'}/${route.params.id}`)
})
</script>
