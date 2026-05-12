// В dev без VITE_API_URL запросы идут на тот же origin (например :5173), а Vite проксирует
// /api, /sanctum, /storage → Laravel (см. vite.config.js). Так обходится CORS.
// В prod задайте VITE_API_URL на публичный URL API или оставьте пустым при API на том же домене.
const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? '' : '')
).replace(/\/$/, '')

if (import.meta.env.DEV && !import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_BASE_URL) {
  console.info('[newsApi] VITE_API_URL не задан — используются относительные пути /api (прокси Vite → Laravel).')
}

const API_PREFIX = '/api/v1'
export const DEFAULT_NEWS_LOCALE = 'ru'
export const SUPPORTED_NEWS_LOCALES = ['ru', 'tuv', 'en']

const normalizeLocale = (locale) =>
  SUPPORTED_NEWS_LOCALES.includes(locale) ? locale : DEFAULT_NEWS_LOCALE

export const getApiBaseUrl = () => API_BASE_URL

export const resolveApiAssetUrl = (url) => {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  if (!API_BASE_URL) return url
  return new URL(url, `${API_BASE_URL}/`).toString()
}

const isPaginatedPayload = (obj) =>
  obj && typeof obj === 'object' && Array.isArray(obj.data) && obj.meta && typeof obj.meta === 'object'

const requestJson = async (path, { withCredentials = false, method = 'GET', body, headers: extraHeaders } = {}) => {
  const headers = {
    Accept: 'application/json',
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...extraHeaders
  }

  const response = await fetch(`${API_BASE_URL}${API_PREFIX}${path}`, {
    method,
    credentials: withCredentials ? 'include' : 'same-origin',
    headers,
    ...(body ? { body: JSON.stringify(body) } : {})
  })

  const url = `${API_BASE_URL}${API_PREFIX}${path}`
  const text = await response.text()
  if (!response.ok) {
    const err = new Error(`News API error ${response.status}: ${text || response.statusText}`)
    err.status = response.status
    err.body = text
    err.url = url
    throw err
  }

  if (!text) return {}

  try {
    return JSON.parse(text)
  } catch (parseError) {
    const err = new Error(
      `News API: ответ не JSON (${url}). Начало ответа: ${text.slice(0, 160).replace(/\s+/g, ' ')}`
    )
    err.status = response.status
    err.cause = parseError
    throw err
  }
}

const pickString = (value, locale = DEFAULT_NEWS_LOCALE) => {
  if (value == null || value === '') return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (typeof value === 'object') {
    const localized = value[locale] ?? value.ru ?? value.tuv ?? value.en
    if (typeof localized === 'string') return localized
    const first = Object.values(value).find((entry) => typeof entry === 'string' && entry.trim())
    return first || ''
  }
  return ''
}

const normalizeContentBlocks = (raw) => {
  if (!raw) return []
  if (typeof raw === 'string') {
    try {
      return normalizeContentBlocks(JSON.parse(raw))
    } catch {
      return []
    }
  }
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'object' && Array.isArray(raw.blocks)) return raw.blocks
  return []
}

const unwrapNewsRow = (payload) => {
  let row = payload?.data ?? payload
  if (!row || typeof row !== 'object') return {}
  let depth = 0
  while (
    depth < 5 &&
    row &&
    typeof row === 'object' &&
    'data' in row &&
    typeof row.data === 'object' &&
    !('slug' in row) &&
    !('title' in row)
  ) {
    row = row.data
    depth += 1
  }
  if (row && typeof row === 'object' && row.success && row.data && typeof row.data === 'object') {
    row = row.data
  }
  return row && typeof row === 'object' ? row : {}
}

const mapNews = (item = {}, localeHint = DEFAULT_NEWS_LOCALE) => {
  const loc = normalizeLocale(typeof item.locale === 'string' ? item.locale : localeHint)
  return {
    id: item.id,
    title: pickString(item.title, loc),
    slug: item.slug != null ? String(item.slug) : '',
    excerpt: pickString(item.excerpt, loc),
    cover_url: resolveApiAssetUrl(item.cover_url),
    cover_alt: pickString(item.cover_alt, loc) || pickString(item.title, loc) || 'Обложка новости',
    published_at: item.published_at || '',
    date_text: item.date_text || '',
    seo_title: pickString(item.seo_title, loc),
    seo_description: pickString(item.seo_description, loc),
    seo_image_alt: pickString(item.seo_image_alt, loc),
    seo_image_url: resolveApiAssetUrl(item.seo_image_url),
    canonical: typeof item.canonical === 'string' ? item.canonical : '',
    locale: loc,
    content_blocks: normalizeContentBlocks(item.content_blocks),
    status: item.status || '',
    preview_url: item.preview_url || '',
    actuality_highlight: Boolean(item.actuality_highlight)
  }
}

const extractPaginated = (payload) => {
  if (isPaginatedPayload(payload)) {
    return {
      items: payload.data.map((row) => mapNews(row)),
      meta: payload.meta,
      links: payload.links || {}
    }
  }
  const inner = payload?.data
  if (isPaginatedPayload(inner)) {
    return {
      items: inner.data.map((row) => mapNews(row)),
      meta: inner.meta,
      links: inner.links || {}
    }
  }
  const flat = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : []
  return {
    items: flat.map((row) => mapNews(row)),
    meta: { current_page: 1, last_page: 1, total: flat.length },
    links: {}
  }
}

/** Одна новость для hero главной: источник истины — только этот эндпоинт (не список). */
export const getNewsActuality = async (locale = DEFAULT_NEWS_LOCALE) => {
  const payload = await requestJson(`/news/actuality?locale=${normalizeLocale(locale)}`)
  if (!payload || typeof payload !== 'object' || !('data' in payload)) return null
  const raw = payload.data
  if (raw == null || typeof raw !== 'object') return null
  const mapped = mapNews(raw, locale)
  return mapped.slug ? mapped : null
}

export const getNewsListPage = async (locale = DEFAULT_NEWS_LOCALE, page = 1) => {
  const payload = await requestJson(`/news?locale=${normalizeLocale(locale)}&page=${page}`)
  return extractPaginated(payload)
}

export const getNewsList = async (locale = DEFAULT_NEWS_LOCALE, page = 1) => {
  const { items } = await getNewsListPage(locale, page)
  return items
}

export const getNewsBySlug = async (slug, locale = DEFAULT_NEWS_LOCALE) => {
  const payload = await requestJson(`/news/${encodeURIComponent(slug)}?locale=${normalizeLocale(locale)}`)
  const row = unwrapNewsRow(payload)
  return mapNews(row, locale)
}

export const getNewsPreviewByToken = async (id, token) => {
  const payload = await requestJson(`/preview/news/${id}?token=${encodeURIComponent(token)}`)
  const row = unwrapNewsRow(payload)
  return mapNews(row)
}

export const getNewsPreviewByAuth = async (id, { bearerToken } = {}) => {
  const headers = {}
  if (bearerToken) headers.Authorization = `Bearer ${bearerToken}`
  const payload = await requestJson(`/preview/news/${id}`, {
    withCredentials: !bearerToken,
    headers
  })
  const row = unwrapNewsRow(payload)
  return mapNews(row)
}

export const generatePreviewToken = async (id, minutes = 60, { bearerToken } = {}) => {
  if (API_BASE_URL && !bearerToken) {
    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' })
  }

  const headers = {}
  if (bearerToken) headers.Authorization = `Bearer ${bearerToken}`

  return requestJson(`/preview/news/${id}/token`, {
    method: 'POST',
    withCredentials: !bearerToken,
    body: { minutes },
    headers
  })
}
