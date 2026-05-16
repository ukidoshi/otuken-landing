import { reactive } from 'vue'
import alley1 from '../assets/optimized/objects/alley/1.webp'

const DEFAULT_EVENT_CATALOG = [
  {
    slug: 'moy-rod-moya-gordost',
    title: 'Фестиваль «Мой род – моя гордость»',
    short:
      'Первый событийный шаг проекта «Отукен»: фестиваль о родовых группах Тувы, культурной памяти и современной форме встречи.',
    seoTitle: 'Фестиваль «Мой род – моя гордость» — события комплекса «Отукен»',
    metaDescription:
      'Фестиваль «Мой род – моя гордость» — событийный проект этнокультурного комплекса «Отукен» в Республике Тыва. Узнайте о программе, смысле события и роли фестиваля в развитии комплекса.',
    image: alley1,
    imageMobile: alley1,
    gallery: [alley1],
    galleryMobile: [alley1],
    dateText: '21–28 июня',
    startDate: '2026-06-21',
    endDate: '2026-06-28',
    intro:
      'Фестиваль «Мой род – моя гордость» — первый событийный шаг проекта «Отукен». Он помогает показать культурный смысл комплекса в действии ещё до полной реализации инфраструктуры.',
    location:
      'Республика Тыва, территория проекта «Отукен» рядом с Кызылом и пгт Каа-Хем.',
    sections: [
      {
        title: 'Зачем фестиваль нужен проекту',
        paragraphs: [
          'Событийная программа важна для «Отукена» не меньше, чем сами объекты. Именно фестиваль переводит проект из стадии концепции в живой культурный опыт, к которому можно приехать, который можно увидеть и через который можно почувствовать будущий характер территории.',
          'Фестиваль помогает связать название комплекса с живым культурным опытом и показывает, как территория будет звучать через родовые группы Тувы, встречи и этнокультурные события.'
        ]
      },
      {
        title: 'Что включает программа',
        list: [
          'культурные и церемониальные сценарии, связанные с родовыми группами Тувы',
          'традиционные ремёсла и практики как часть живого пространства',
          'конные элементы и спортивную программу',
          'общественные и семейные форматы присутствия на территории'
        ]
      },
      {
        title: 'Почему это важно для посетителей',
        paragraphs: [
          'Фестиваль делает проект понятным уже на раннем этапе. Посетитель видит не абстрактный генплан, а реальное пространство, в котором происходят встречи, выступления, культурные программы и взаимодействие с наследием Тувы.'
        ]
      }
    ],
    faq: [
      {
        question: 'Что такое фестиваль «Мой род – моя гордость»?',
        answer:
          'Это событийная программа этнокультурного комплекса «Отукен», посвящённая родовым группам Тувы, культурной памяти и современной форме общественной встречи.'
      },
      {
        question: 'Когда проходит фестиваль?',
        answer:
          'Сейчас ориентиром указан период 21–28 июня. Если даты будут уточняться, информация о фестивале будет оперативно обновлена.'
      },
      {
        question: 'Можно ли рассматривать фестиваль как часть туристической программы Тувы?',
        answer:
          'Да. Фестиваль усиливает туристическую привлекательность комплекса и связывает «Отукен» с этнокультурным туризмом в Республике Тыва.'
      }
    ]
  }
]

const clone = (value) =>
  typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value))

const overlayInto = (target, source) => {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return
  for (const key of Object.keys(source)) {
    const next = source[key]
    if (next === undefined) continue
    if (Array.isArray(next)) {
      target[key] = clone(next)
      continue
    }
    if (next && typeof next === 'object') {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {}
      }
      overlayInto(target[key], next)
      continue
    }
    target[key] = next
  }
}

const normalizeImageEntry = (entry) => {
  if (typeof entry === 'string') {
    const url = entry.trim()
    return url ? { url, alt: '' } : null
  }
  if (entry && typeof entry === 'object') {
    const url = typeof entry.url === 'string' ? entry.url.trim() : ''
    if (!url) return null
    const alt = typeof entry.alt === 'string' ? entry.alt : ''
    return { url, alt }
  }
  return null
}

const applyImagesToEvent = (target, images) => {
  if (!Array.isArray(images)) return
  const normalized = images.map(normalizeImageEntry).filter(Boolean)
  if (!normalized.length) return

  const urls = normalized.map((entry) => entry.url)
  target.image = urls[0]
  target.imageMobile = urls[0]
  target.gallery = urls.slice()
  target.galleryMobile = urls.slice()
  target.images = normalized
}

/**
 * Каталог событий. Reactive: тексты + фотографии могут меняться через
 * `applyEventCatalogOverrides` под текущую локаль.
 *
 * Slug фиксирован в коде; из админки меняются:
 *   - тексты: title, short, intro, location, dateText, startDate, endDate,
 *     seoTitle, metaDescription, sections, faq;
 *   - фотографии: поле `images` — массив `{ url, alt? }`. Непустой массив
 *     полностью заменяет `image`/`imageMobile`/`gallery`/`galleryMobile`.
 */
export const eventCatalog = reactive(clone(DEFAULT_EVENT_CATALOG))

export const eventMap = reactive({})

const rebuildEventMap = () => {
  for (const key of Object.keys(eventMap)) delete eventMap[key]
  for (const item of eventCatalog) {
    if (item?.slug) eventMap[item.slug] = item
  }
}

rebuildEventMap()

export const resetEventCatalogToDefaults = () => {
  eventCatalog.splice(0, eventCatalog.length, ...clone(DEFAULT_EVENT_CATALOG))
  rebuildEventMap()
}

/**
 * Накладывает тексты + фотографии событий по slug.
 *
 * `rows[i]` — объект вида:
 *   {
 *     slug,
 *     title?, short?, intro?, location?, dateText?, startDate?, endDate?,
 *     sections?, faq?, seoTitle?, metaDescription?,
 *     images?: Array<string | { url, alt? }>
 *   }
 *
 * Записи без совпадения по slug пропускаются (slug фиксирован в коде).
 * Если `images` непустой — заменяет hero/галерею; иначе остаются bundled-фото.
 */
export const applyEventCatalogOverrides = (rows) => {
  if (!Array.isArray(rows)) return
  const bySlug = new Map(eventCatalog.map((item, idx) => [item.slug, idx]))
  for (const row of rows) {
    if (!row || typeof row !== 'object' || typeof row.slug !== 'string') continue
    const idx = bySlug.get(row.slug)
    if (idx == null) continue

    const { images, ...textFields } = row
    overlayInto(eventCatalog[idx], textFields)
    applyImagesToEvent(eventCatalog[idx], images)
  }
  rebuildEventMap()
}
