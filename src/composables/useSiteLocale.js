import { ref } from 'vue'

const STORAGE_KEY = 'otuken_site_locale'

/** Порядок: Русский → Тувинский → Английский */
export const SITE_LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'tuv', label: 'Тувинский' },
  { code: 'en', label: 'Английский' }
]

const locale = ref('ru')
const isLocalePickerOpen = ref(false)
let clientHydrated = false

export const siteLocale = locale
export const isSiteLocalePickerOpen = isLocalePickerOpen

export const htmlLangForLocale = (code) => {
  if (code === 'tuv') return 'tyv'
  if (code === 'en') return 'en'
  return 'ru'
}

/** Короткая метка для бейджа: соответствует выбранному языку в шапке, а не полю locale из API */
export const localeToShortBadge = (code) => {
  if (code === 'ru') return 'RU'
  if (code === 'tuv') return 'TYV'
  if (code === 'en') return 'EN'
  return String(code || 'ru').toUpperCase().slice(0, 3)
}

/**
 * Вызвать один раз на клиенте (например из App.vue onMounted).
 * Если язык ещё не сохраняли — показываем модалку выбора.
 */
export function initSiteLocaleFromClient() {
  if (typeof window === 'undefined' || clientHydrated) return
  clientHydrated = true

  const saved = window.localStorage.getItem(STORAGE_KEY)
  const valid = SITE_LANGUAGES.some((l) => l.code === saved)

  if (valid) {
    locale.value = saved
    isLocalePickerOpen.value = false
  } else {
    isLocalePickerOpen.value = true
  }
}

export function setSiteLocale(code) {
  const ok = SITE_LANGUAGES.some((l) => l.code === code)
  if (!ok) return

  locale.value = code
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, code)
  }
  isLocalePickerOpen.value = false
}

/** Открыть выбор языка снова (например из шапки «язык») */
export function openSiteLocalePicker() {
  isLocalePickerOpen.value = true
}

export function useSiteLocale() {
  return {
    locale,
    isLocalePickerOpen,
    languages: SITE_LANGUAGES,
    setLocale: setSiteLocale,
    openPicker: openSiteLocalePicker,
    initClient: initSiteLocaleFromClient,
    htmlLangForLocale,
    localeToShortBadge
  }
}
