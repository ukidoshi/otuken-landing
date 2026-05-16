<template>
  <router-view v-slot="{ Component }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <LanguagePickerModal />
</template>

<script setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { analyticsConfig } from './seo/site'
import LanguagePickerModal from './components/LanguagePickerModal.vue'
import { htmlLangForLocale, initSiteLocaleFromClient, siteLocale } from './composables/useSiteLocale'
import { useSiteContent } from './composables/useSiteContent'

const siteContent = useSiteContent()

onMounted(() => {
  initSiteLocaleFromClient()
  siteContent.initOnce()
})

const gaId = analyticsConfig.gaMeasurementId
const ymId = analyticsConfig.yandexMetrikaId

useHead(() => ({
  htmlAttrs: {
    lang: htmlLangForLocale(siteLocale.value)
  }
}))

useHead({
  meta: [
    { name: 'theme-color', content: '#f7f0e3' },
    { name: 'format-detection', content: 'telephone=no' },
    analyticsConfig.googleSiteVerification
      ? { name: 'google-site-verification', content: analyticsConfig.googleSiteVerification }
      : null,
    analyticsConfig.yandexVerification
      ? { name: 'yandex-verification', content: analyticsConfig.yandexVerification }
      : null
  ].filter(Boolean),
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap'
    }
  ],
  script: [
    gaId
      ? {
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          async: true
        }
      : null,
    gaId
      ? {
          textContent: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`
        }
      : null,
    ymId
      ? {
          textContent:
            `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};` +
            `m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}` +
            `k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})` +
            `(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');` +
            `ym(${ymId}, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`
        }
      : null
  ].filter(Boolean),
  noscript: ymId
    ? [
        {
          innerHTML: `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute;left:-9999px" alt="" /></div>`
        }
      ]
    : []
})
</script>
