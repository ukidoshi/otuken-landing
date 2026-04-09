import { computed, unref } from 'vue'
import { useHead } from '@unhead/vue'
import { getAbsoluteImageUrl, getAbsoluteUrl, siteConfig } from '../seo/site'
import { makeOrganizationSchema, makeWebsiteSchema } from '../seo/schema'

export const useSeoPage = (seoInput, schemaInput = []) => {
  const seoState = computed(() => (typeof seoInput === 'function' ? seoInput() : unref(seoInput)) || {})
  const schemaState = computed(() => (typeof schemaInput === 'function' ? schemaInput() : unref(schemaInput)) || [])

  useHead(() => {
    const seo = seoState.value
    const title = seo.title || siteConfig.defaultTitle
    const description = seo.description || siteConfig.defaultDescription
    const path = seo.path || '/'
    const canonical = seo.canonical || getAbsoluteUrl(path)
    const image = getAbsoluteImageUrl(seo.image || siteConfig.defaultOgImage)
    const robots = seo.robots || siteConfig.defaultRobots
    const type = seo.type || 'website'
    const schemas = [makeOrganizationSchema(), makeWebsiteSchema(), ...schemaState.value].filter(Boolean)

    return {
      title,
      link: [
        { rel: 'canonical', href: canonical }
      ],
      meta: [
        { name: 'description', content: description },
        { name: 'robots', content: robots },
        { property: 'og:locale', content: siteConfig.locale },
        { property: 'og:site_name', content: siteConfig.name },
        { property: 'og:title', content: seo.ogTitle || title },
        { property: 'og:description', content: seo.ogDescription || description },
        { property: 'og:type', content: type },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: image },
        { property: 'og:image:alt', content: seo.imageAlt || title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: seo.twitterTitle || title },
        { name: 'twitter:description', content: seo.twitterDescription || description },
        { name: 'twitter:image', content: image }
      ],
      script: schemas.map((schema, index) => ({
        key: `ld-json-${canonical}-${index}`,
        type: 'application/ld+json',
        textContent: JSON.stringify(schema)
      }))
    }
  })
}
