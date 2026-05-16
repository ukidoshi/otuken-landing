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
import {
  applyEventCatalogOverrides,
  resetEventCatalogToDefaults
} from '../content/events'
import {
  applyAboutSectionOverrides,
  applyFestivalSectionOverrides,
  applyObjectsSectionOverrides,
  applyScenariosOverrides,
  applyScenariosSectionOverrides,
  resetHomeContentToDefaults
} from '../content/homeContent'

let initialized = false

const applyAll = (payload) => {
  resetSitePagesToDefaults()
  resetObjectCatalogToDefaults()
  resetEventCatalogToDefaults()
  resetHomeContentToDefaults()

  if (!payload || typeof payload !== 'object') return

  // Тексты страниц лендинга (home + complex/location/contacts/objects_page/events_page).
  if (payload.site_pages) applySitePagesOverrides(payload.site_pages)

  // Тексты + фотографии секций главной страницы.
  if (payload.home) {
    const { about, festival, scenarios_section, objects_section } = payload.home
    if (about) applyAboutSectionOverrides(about)
    if (festival) applyFestivalSectionOverrides(festival)
    if (scenarios_section) applyScenariosSectionOverrides(scenarios_section)
    if (objects_section) applyObjectsSectionOverrides(objects_section)
  }

  // Карточки объектов комплекса + детальная страница /obekty/:slug.
  if (Array.isArray(payload.objects)) applyObjectCatalogOverrides(payload.objects)

  // Карточки сценариев на главной («Как раскрывается территория»).
  if (Array.isArray(payload.scenarios)) applyScenariosOverrides(payload.scenarios)

  // События проекта + детальная страница /sobytiya/:slug.
  if (Array.isArray(payload.events)) applyEventCatalogOverrides(payload.events)
}

/**
 * Один раз подключается из App.vue (на клиенте, после монтирования).
 *
 * Управляемый из админки контент:
 *   - Тексты всех страниц лендинга (`site_pages.home|complex|location|
 *     contacts|objects_page|events_page`).
 *   - Главная страница: блоки «Что такое Өтүкен» (`home.about`),
 *     «Фестиваль» с модалкой «Подробнее» и галереей (`home.festival`),
 *     заголовки секций «Ключевые объекты» (`home.objects_section`) и
 *     «Как раскрывается территория» (`home.scenarios_section`).
 *   - Каталог объектов комплекса с фотогалереями (`objects[]`).
 *   - Сценарии территории с фотогалереями (`scenarios[]`).
 *   - События проекта с фотогалереями (`events[]`).
 *
 * Карта `MapSection` редактируется в коде (по дизайну этой итерации).
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
