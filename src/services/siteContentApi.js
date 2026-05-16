/**
 * Клиент для эндпоинта `GET /api/v1/site-content?locale=...`.
 *
 * Возвращает локализованный контент всего лендинга «Өтүкен», который
 * накладывается поверх дефолтов из `src/content/*`:
 *
 *   - `site_pages` — тексты страниц проекта:
 *       `home`, `complex`, `location`, `contacts`, `objects_page`, `events_page`;
 *   - `home` — секции главной страницы:
 *       `about`, `festival` (+ фотографии), `objects_section`, `scenarios_section`;
 *   - `objects[]` — каталог объектов комплекса (тексты + фотографии);
 *   - `scenarios[]` — карточки сценариев территории на главной (тексты + фотографии);
 *   - `events[]` — события проекта (тексты + фотографии).
 *
 * Если API недоступен или ответ некорректный — функция возвращает `null`,
 * и лендинг работает на bundled-дефолтах.
 */

import { getApiBaseUrl } from './newsApi'

const SUPPORTED_LOCALES = ['ru', 'tuv', 'en']
const DEFAULT_LOCALE = 'ru'

const normalizeLocale = (locale) =>
  SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE

/**
 * Запрос за локализованным контентом лендинга.
 * @param {string} locale 'ru' | 'tuv' | 'en'
 * @returns {Promise<{
 *   site_pages?: {
 *     home?: object,
 *     complex?: object,
 *     location?: object,
 *     contacts?: object,
 *     objects_page?: object,
 *     events_page?: object
 *   },
 *   home?: {
 *     about?: object,
 *     festival?: object,
 *     objects_section?: object,
 *     scenarios_section?: object
 *   },
 *   objects?: Array<object>,
 *   scenarios?: Array<object>,
 *   events?: Array<object>
 * } | null>}
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
