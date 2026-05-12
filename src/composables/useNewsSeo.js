import { computed, unref } from 'vue'
import { useSeoPage } from './useSeoPage'

export const useNewsSeo = (newsInput, { pathInput = '/novosti' } = {}) => {
  const newsState = computed(() => unref(newsInput) || null)

  useSeoPage(() => {
    const news = newsState.value
    if (!news) return {}

    const pathValue = unref(pathInput)
    const path = typeof pathValue === 'string' && pathValue.startsWith('/') ? pathValue : '/novosti'

    return {
      title: news.seo_title || news.title,
      description: news.seo_description || news.excerpt,
      path,
      canonical: news.canonical || '',
      image: news.seo_image_url || news.cover_url || '',
      imageAlt: news.seo_image_alt || news.cover_alt || news.title || '',
      type: 'article'
    }
  })
}
