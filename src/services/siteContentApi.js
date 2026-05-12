/**
 * Клиент для эндпоинта `GET /api/v1/site-content?locale=...`.
 *
 * Возвращает локализованный контент лендинга, который накладывается поверх
 * дефолтов из `src/content/*`:
 *   - `site_pages.home` → тексты главной страницы (`applySitePagesOverrides`);
 *   - `objects[]` → тексты и загруженные фотографии объектов комплекса
 *     (`applyObjectCatalogOverrides`).
 *
 * Если API недоступен или вернул некорректный ответ — функция возвращает `null`,
 * и фронт спокойно работает на bundled-дефолтах.
 */

import { getApiBaseUrl } from './newsApi'

const SUPPORTED_LOCALES = ['ru', 'tuv', 'en']
const DEFAULT_LOCALE = 'ru'

const normalizeLocale = (locale) =>
  SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE

/**
 * Запрос за локализованным контентом лендинга.
 * @param {string} locale 'ru' | 'tuv' | 'en'
 * @returns {Promise<{site_pages?: { home?: object }, objects?: Array<object>} | null>}
 */
export const getSiteContent = async (locale) => {
  const base = getApiBaseUrl ? getApiBaseUrl() : ''
  const url = `${base}/api/v1/site-content?locale=${encodeURIComponent(normalizeLocale(locale))}`

  let response
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin'
    })
  } catch (networkError) {
    if (import.meta.env.DEV) {
      console.warn('[siteContentApi] сетевая ошибка, использую дефолты:', networkError)
    }
    return null
  }

  if (!response.ok) {
    if (import.meta.env.DEV) {
      console.warn(`[siteContentApi] ${response.status} — использую дефолты`)
    }
    return null
  }

  let payload
  try {
    payload = await response.json()
  } catch (parseError) {
    if (import.meta.env.DEV) {
      console.warn('[siteContentApi] ответ не JSON:', parseError)
    }
    return null
  }

  const data = payload && typeof payload === 'object' && 'data' in payload ? payload.data : payload
  return data && typeof data === 'object' ? data : null
}
