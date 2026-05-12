export const siteConfig = {
  name: 'Этнокультурный комплекс «Отукен»',
  legalName: 'Этнокультурный комплекс «Отукен»',
  shortName: 'Отукен',
  altNames: ['Өтүкен', 'Otuken'],
  region: 'Республика Тыва',
  nearby: 'Кызыл',
  defaultTitle: 'Отукен (Өтүкен) — этнокультурный комплекс в Республике Тыва',
  defaultDescription:
    '«Отукен» / «Өтүкен» — этнокультурный комплекс в Республике Тыва, Кызыл. Проект объединяет культуру Тувы, туристическую инфраструктуру, юрточный городок, события и семейный отдых.',
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://отукен.рф').replace(/\/$/, ''),
  defaultOgImage: '/og/otuken-og.jpg',
  locale: 'ru_RU',
  phone: '+7 (913) 343-70-76',
  phoneDisplay: '+7 (913) 343-70-76',
  email: 'otugen17@yandex.ru',
  organizationEmail: 'otugen17@yandex.ru',
  addressRegion: 'Республика Тыва',
  addressLocality: 'Кызыл',
  addressCountry: 'RU',
  addressNote: 'Точный адрес комплекса будет опубликован после финального утверждения локации.',
  hours: 'Пн–Пт 09:00–18:00',
  defaultRobots: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
}

export const analyticsConfig = {
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  yandexMetrikaId: import.meta.env.VITE_YANDEX_METRIKA_ID || '',
  googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '',
  yandexVerification: import.meta.env.VITE_YANDEX_VERIFICATION || ''
}

export const getAbsoluteUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, `${siteConfig.siteUrl}/`).toString()
}

export const getAbsoluteImageUrl = (path = siteConfig.defaultOgImage) => {
  if (/^https?:\/\//.test(path)) return path
  return getAbsoluteUrl(path)
}

export const pageNavigation = [
  { label: 'О нас', to: '/o-nas' },
  { label: 'Новости', to: '/novosti' }
]

export const headerNavigation = pageNavigation
