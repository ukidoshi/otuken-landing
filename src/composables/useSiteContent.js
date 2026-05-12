import { watch } from 'vue'
import { useSiteLocale } from './useSiteLocale'
import { getSiteContent } from '../services/siteContentApi'
import {
  applySitePagesOverrides,
  resetSitePagesToDefaults
} from '../content/sitePages'
import {
  applyObjectCatalogOverrides,
  resetObjectCatalogToDefaults
} from '../content/objectCatalog'

let initialized = false

const applyAll = (payload) => {
  resetSitePagesToDefaults()
  resetObjectCatalogToDefaults()

  if (!payload || typeof payload !== 'object') return

  if (payload.site_pages) applySitePagesOverrides(payload.site_pages)
  if (Array.isArray(payload.objects)) applyObjectCatalogOverrides(payload.objects)
}

/**
 * Подключаемся один раз из App.vue (на клиенте, после монтирования).
 *
 * Из админки управляемы:
 *   - Тексты главной страницы лендинга (`site_pages.home`).
 *   - Объекты комплекса (тексты + загруженные фотографии).
 *
 * Тихо «деградирует» к статичным дефолтам, если API недоступен.
 */
export function useSiteContent() {
  const { locale } = useSiteLocale()

  const reload = async () => {
    const data = await getSiteContent(locale.value)
    applyAll(data)
  }

  const initOnce = () => {
    if (initialized) return
    if (typeof window === 'undefined') return
    initialized = true
    reload()
    watch(locale, reload)
  }

  return { initOnce, reload }
}
