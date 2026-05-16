import { reactive } from 'vue'
import overview from '../assets/optimized/hero/overview.webp'
import overviewMobile from '../assets/optimized/hero/overview-mobile.webp'
import hero1 from '../assets/optimized/hero/1.webp'
import hero1Mobile from '../assets/optimized/hero/1-mobile.webp'
import hero4 from '../assets/optimized/hero/4.webp'
import hero4Mobile from '../assets/optimized/hero/4-mobile.webp'
import hero5 from '../assets/optimized/hero/5.webp'
import hero5Mobile from '../assets/optimized/hero/5-mobile.webp'
import hero13 from '../assets/optimized/hero/13.webp'
import hero13Mobile from '../assets/optimized/hero/13-mobile.webp'
import alley1 from '../assets/optimized/objects/alley/1.webp'
import alley1Mobile from '../assets/optimized/objects/alley/1-mobile.webp'
import alley2 from '../assets/optimized/objects/alley/2.webp'
import alley2Mobile from '../assets/optimized/objects/alley/2-mobile.webp'
import alley5 from '../assets/optimized/objects/alley/5.webp'
import alley5Mobile from '../assets/optimized/objects/alley/5-mobile.webp'
import hotel1 from '../assets/optimized/objects/hotel/1.webp'
import hotel1Mobile from '../assets/optimized/objects/hotel/1-mobile.webp'
import hotel2 from '../assets/optimized/objects/hotel/2.webp'
import hotel2Mobile from '../assets/optimized/objects/hotel/2-mobile.webp'
import hotel3 from '../assets/optimized/objects/hotel/3.webp'
import hotel3Mobile from '../assets/optimized/objects/hotel/3-mobile.webp'

/**
 * Reactive-контент главной страницы лендинга «Өтүкен».
 *
 * Управляется из админки через `GET /api/v1/site-content?locale=...`.
 * Поля по API накладываются поверх дефолтов (`apply...Overrides`); если поле
 * не пришло — остаётся значение из кода. Если API не отвечает — лендинг
 * работает на этих дефолтах.
 */

const DEFAULT_ABOUT = {
  badge: 'Этнокультурный комплекс • живая среда традиций',
  title: 'Что такое «Өтүкен»?',
  lead:
    '«Өтүкен» — этнокультурный комплекс в Туве: место, где традиции живут не "в витрине", а в событиях, инфраструктуре и туристических маршрутах. Это культурное ядро и понятная инвестиционная логика вокруг него.',
  cards: [
    {
      icon: '🏛️',
      title: 'Культурное ядро',
      text:
        'Пространство, которое сохраняет и показывает традиции тувинского народа через современные форматы.'
    },
    {
      icon: '🎭',
      title: 'События и туризм',
      text:
        'Фестивали, программы и мероприятия формируют поток гостей и делают комплекс живым круглый год.'
    },
    {
      icon: '📈',
      title: 'Инвест-логика',
      text:
        'Рост привлекательности территории и инфраструктуры усиливает ценность проектов и участков вокруг комплекса.'
    }
  ],
  feature: {
    kicker: 'Смысл и территория',
    title: 'Больше, чем просто недвижимость',
    paragraphs: [
      '«Өтүкен» задуман как точка притяжения: культурные объекты, площадки для событий, сервисы для гостей и среда для отдыха. Проект развивается по очередям — от событийного запуска к расширению инфраструктуры.',
      'Для посетителя это — место впечатлений и погружения в культуру. Для партнёров и инвесторов — понятная модель, где трафик рождается событиями, а удерживается комфортом и качественной инфраструктурой.'
    ],
    bullets: [
      {
        icon: '🌿',
        title: 'Локация и атмосфера:',
        text: 'природа, этно-среда и уникальный культурный контекст региона.'
      },
      {
        icon: '🏘️',
        title: 'Инфраструктура:',
        text: 'площадки для мероприятий, гостевые форматы, сервисы для отдыха и спорта.'
      },
      {
        icon: '🤝',
        title: 'Партнёрства:',
        text: 'проект открыт к сотрудничеству — от событий до сервисов и совместных инициатив.'
      }
    ],
    phases: {
      kicker: 'Как развивается проект',
      items: [
        { title: 'Концепция', text: 'смыслы, формат, модель' },
        { title: 'События', text: 'программы, фестивали' },
        { title: 'Инфраструктура', text: 'строительство и сервисы' }
      ]
    }
  },
  summary: {
    kicker: 'Коротко и по делу',
    title: '«Өтүкен» — культура, инфраструктура и события',
    text:
      'Мы создаём место, куда хочется приехать. И среду, которая может развиваться и масштабироваться вместе с интересом к региону.',
    stats: [
      { title: 'Фокус', value: 'туризм и события' },
      { title: 'Формат', value: 'по очередям' }
    ],
    primaryLabel: 'Посмотреть объекты',
    primaryTarget: 'objects',
    secondaryLabel: 'Посмотреть карту',
    secondaryTarget: 'map'
  }
}

const DEFAULT_FESTIVAL = {
  badge: 'Первый этап реализации',
  title: 'Фестиваль «Мой род – моя гордость»',
  dateText: '21–28 июня',
  lead:
    'Первый событийный шаг проекта. Республиканский фестиваль посвящён сплочению представителей родовых групп Тувы и возрождению историко-культурного наследия через современные формы участия и встречи.',
  panelTitle: 'Что создаёт фестиваль',
  features: [
    {
      title: 'Аллея форм',
      text:
        'Закладка малых архитектурных форм, отражающих историю и традиции родовых групп.'
    },
    {
      title: 'Традиционные ремёсла',
      text:
        'Показ ремесленных практик и культурных элементов как живой части пространства.'
    },
    {
      title: 'Конные соревнования',
      text:
        'Спортивная программа, укоренённая в традициях и природном характере региона.'
    },
    {
      title: 'Культурная программа',
      text:
        'Событийный формат, который формирует первый устойчивый поток внимания к комплексу.'
    }
  ],
  summary:
    'Фестиваль не только рассказывает о проекте, но и буквально запускает его территорию: знакомит с культурным смыслом, формирует привычку приезжать и показывает потенциал будущей среды в действии.',
  detailButtonLabel: 'Подробнее о фестивале',
  detail: {
    intro:
      'Фестиваль «Мой род – моя гордость» — это не просто событие, а живой запуск территории «Өтүкен». Он знакомит гостей с культурным смыслом проекта, объединяет родовые группы Тувы и закладывает первые традиции для будущей этнокультурной площадки.',
    sections: [
      {
        title: 'Зачем фестиваль нужен проекту',
        paragraphs: [
          'Событийная программа важна для «Өтүкена» не меньше, чем сами объекты. Именно фестиваль переводит проект из стадии концепции в живой культурный опыт, к которому можно приехать, который можно увидеть и через который можно почувствовать будущий характер территории.'
        ]
      },
      {
        title: 'Что включает программа',
        paragraphs: [
          'Восемь дней программы соединяют церемониальные форматы, традиционные ремёсла, спортивные сценарии и общественные форматы присутствия на территории.'
        ],
        list: [
          'культурные и церемониальные сценарии родовых групп Тувы',
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
    highlights: [
      'Сплочение представителей родовых групп Тувы',
      'Возрождение историко-культурного наследия через современные форматы',
      'Запуск событийной программы будущего комплекса «Өтүкен»'
    ],
    faq: [
      {
        question: 'Когда проходит фестиваль?',
        answer:
          'Ориентировочно 21–28 июня. Если даты будут уточняться, информация будет обновлена.'
      },
      {
        question: 'Можно ли посетить фестиваль?',
        answer:
          'Да — фестиваль открыт для гостей. Программа ориентирована и на участников родовых групп, и на туристов.'
      }
    ]
  },
  images: []
}

const DEFAULT_SCENARIOS = [
  {
    slug: 'masterplan',
    title: 'Общий образ территории',
    eyebrow: 'Масштаб',
    description:
      'Как жилые кварталы, общественные зоны и маршруты складываются в единую среду.',
    full:
      'Этот сценарий помогает увидеть не отдельные здания, а целостную среду. С высоты считывается структура кварталов, общественных зон и прогулочных направлений, благодаря чему посетитель быстрее понимает масштаб и логику будущего комплекса.',
    note:
      'Лучший ракурс, чтобы сначала почувствовать общий масштаб и устройство территории.',
    highlights: [
      'Показывает, как жилая среда связана с общественными пространствами',
      'Помогает быстро понять масштаб проекта без перегруза деталями',
      'Даёт цельное первое представление о будущем ритме территории'
    ],
    image: overview,
    imageMobile: overviewMobile,
    gallery: [overview, hero1],
    galleryMobile: [overviewMobile, hero1Mobile],
    layout: 'lg:col-span-7 lg:row-span-2',
    compact: false
  },
  {
    slug: 'cultural-axis',
    title: 'Аллея родовых групп Тувы',
    eyebrow: 'Культура',
    description:
      'Смысловое ядро комплекса с этнокультурной символикой и пространством для церемоний.',
    full:
      'Здесь территория раскрывается как культурное пространство, а не просто как застройка. Аллея родовых групп Тувы задаёт символический центр комплекса, объединяет маршруты и формирует место, где традиция становится видимой и современной.',
    note:
      'Это сердце комплекса, в котором культурный смысл ощущается сильнее всего.',
    highlights: [
      'Формирует главную точку идентичности всего комплекса',
      'Создаёт пространство для церемоний, встреч и культурных событий',
      'Помогает посетителю почувствовать связь места с традицией Тувы'
    ],
    image: alley1,
    imageMobile: alley1Mobile,
    gallery: [alley1, alley2, alley5],
    galleryMobile: [alley1Mobile, alley2Mobile, alley5Mobile],
    layout: 'lg:col-span-5',
    compact: true
  },
  {
    slug: 'guest-contour',
    title: 'Гостевой контур',
    eyebrow: 'Гостеприимство',
    description:
      'Архитектура размещения для туристов и участников событийной программы.',
    full:
      'Этот сценарий показывает, как комплекс принимает гостей не только через события, но и через комфорт пребывания. Архитектура размещения делает территорию пригодной для более долгого визита и превращает поездку в полноценный опыт, а не в короткий приезд.',
    note:
      'Здесь видно, как территория готова принимать гостей и работать круглый год.',
    highlights: [
      'Создаёт комфортный сценарий размещения для туристов и участников событий',
      'Поддерживает более длительное пребывание на территории',
      'Добавляет комплексу ощущение продуманного гостевого сервиса'
    ],
    image: hotel1,
    imageMobile: hotel1Mobile,
    gallery: [hotel1, hotel2, hotel3],
    galleryMobile: [hotel1Mobile, hotel2Mobile, hotel3Mobile],
    layout: 'lg:col-span-5',
    compact: true
  },
  {
    slug: 'walking-routes',
    title: 'Пешеходная среда',
    eyebrow: 'Маршруты',
    description:
      'Спокойные пространства для прогулок, встреч и постепенного знакомства с территорией.',
    full:
      'Пешеходная среда важна тем, что делает территорию не только красивой на рендере, но и удобной в живом опыте. Именно через маршруты, посадки, освещение и открытые перспективы комплекс начинает восприниматься как место, где хочется идти дальше и проводить время.',
    note:
      'Эта часть показывает, насколько территория будет удобной в обычном человеческом ритме.',
    highlights: [
      'Создаёт понятный и интуитивный способ знакомиться с территорией',
      'Делает прогулку самостоятельным ценным сценарием пребывания',
      'Поддерживает ощущение спокойствия, порядка и открытости пространства'
    ],
    image: hero4,
    imageMobile: hero4Mobile,
    gallery: [hero4, hero13],
    galleryMobile: [hero4Mobile, hero13Mobile],
    layout: 'lg:col-span-4',
    compact: true
  },
  {
    slug: 'public-leisure',
    title: 'Общественные зоны',
    eyebrow: 'Отдых',
    description:
      'Открытые сценарии для семейного отдыха, спорта и спокойного пребывания гостей.',
    full:
      'Общественные зоны показывают, что комплекс рассчитан не только на события или проживание. Здесь появляется повседневная жизнь пространства: семейный отдых, прогулки, неформальные встречи и время, проведённое на территории без спешки.',
    note:
      'Сценарий, который делает территорию живой и комфортной для разных возрастов.',
    highlights: [
      'Подходит для семейного досуга и спокойного отдыха',
      'Усиливает чувство живой среды, а не только проектного макета',
      'Добавляет территории регулярный повседневный ритм'
    ],
    image: hero5,
    imageMobile: hero5Mobile,
    gallery: [hero5, hero1],
    galleryMobile: [hero5Mobile, hero1Mobile],
    layout: 'lg:col-span-4',
    compact: true
  },
  {
    slug: 'first-impression',
    title: 'Первое впечатление',
    eyebrow: 'Входная группа',
    description:
      'Ракурс, который сразу задаёт характер пространства и ощущение организованной среды.',
    full:
      'Первое впечатление работает мгновенно: ещё до знакомства с деталями человек считывает аккуратность, статус и характер комплекса. Этот сценарий помогает понять, как территория встречает гостя и каким будет её общее эмоциональное звучание.',
    note:
      'Именно здесь формируется эмоциональное ожидание от всей территории.',
    highlights: [
      'Создаёт убедительное и запоминающееся первое впечатление',
      'Помогает территории выглядеть цельной и продуманной с первых секунд',
      'Поддерживает ощущение культурного, а не случайного пространства'
    ],
    image: hero13,
    imageMobile: hero13Mobile,
    gallery: [hero13, hero4],
    galleryMobile: [hero13Mobile, hero4Mobile],
    layout: 'lg:col-span-4',
    compact: true
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

const replaceContents = (target, defaults) => {
  for (const key of Object.keys(target)) delete target[key]
  Object.assign(target, clone(defaults))
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

const DEFAULT_SCENARIOS_SECTION = {
  badge: 'Сценарии пространства',
  title: 'Как раскрывается территория',
  lead:
    'Этот блок не повторяет список объектов, а показывает, как территория ощущается для гостя: от первого впечатления и прогулочного маршрута до культурного центра и мест отдыха.',
  guideText:
    'Нажмите на карточку, чтобы открыть серию ракурсов и короткое объяснение, чем именно этот сценарий важен для будущего опыта посетителя.',
  guideChips: ['Фото и ракурсы', 'Краткий смысл', 'Понятный контекст']
}

const DEFAULT_OBJECTS_SECTION = {
  badge: 'Объекты комплекса',
  title: 'Ключевые объекты «Өтүкен»',
  lead:
    'Это не один объект, а целая среда: культурные пространства, сервисы для гостей и площадки для событий. Нажмите на карточку — откроется описание.'
}

export const aboutSection = reactive(clone(DEFAULT_ABOUT))
export const festivalSection = reactive(clone(DEFAULT_FESTIVAL))
export const scenariosList = reactive(clone(DEFAULT_SCENARIOS))
export const scenariosSection = reactive(clone(DEFAULT_SCENARIOS_SECTION))
export const objectsSection = reactive(clone(DEFAULT_OBJECTS_SECTION))

export const resetHomeContentToDefaults = () => {
  replaceContents(aboutSection, DEFAULT_ABOUT)
  replaceContents(festivalSection, DEFAULT_FESTIVAL)
  replaceContents(scenariosSection, DEFAULT_SCENARIOS_SECTION)
  replaceContents(objectsSection, DEFAULT_OBJECTS_SECTION)
  scenariosList.splice(0, scenariosList.length, ...clone(DEFAULT_SCENARIOS))
}

export const applyScenariosSectionOverrides = (data) => {
  if (!data || typeof data !== 'object') return
  overlayInto(scenariosSection, data)
}

export const applyObjectsSectionOverrides = (data) => {
  if (!data || typeof data !== 'object') return
  overlayInto(objectsSection, data)
}

export const applyAboutSectionOverrides = (data) => {
  if (!data || typeof data !== 'object') return
  overlayInto(aboutSection, data)
}

/**
 * Накладывает тексты фестиваля + (если пришло) галерею фото.
 * `images` — массив `string | { url, alt? }`. Пустой массив/отсутствие
 * → используются дефолты (для фестиваля сейчас пусто — модалка без фото).
 */
export const applyFestivalSectionOverrides = (data) => {
  if (!data || typeof data !== 'object') return
  const { images, ...rest } = data
  overlayInto(festivalSection, rest)
  if (Array.isArray(images)) {
    const normalized = images.map(normalizeImageEntry).filter(Boolean)
    festivalSection.images = normalized
  }
}

/**
 * Накладывает тексты сценариев по slug + (опционально) фото.
 *
 * `rows[i].images` — массив `string | { url, alt? }`. Если непустой,
 * он целиком заменяет `image`, `imageMobile`, `gallery`, `galleryMobile`
 * (первое фото — обложка, все вместе — галерея). Иначе остаются bundled.
 *
 * Записи без совпадения по slug пропускаются (slug фиксирован в коде).
 */
export const applyScenariosOverrides = (rows) => {
  if (!Array.isArray(rows)) return
  const bySlug = new Map(scenariosList.map((item, idx) => [item.slug, idx]))
  for (const row of rows) {
    if (!row || typeof row !== 'object' || typeof row.slug !== 'string') continue
    const idx = bySlug.get(row.slug)
    if (idx == null) continue

    const { images, ...textFields } = row
    overlayInto(scenariosList[idx], textFields)

    if (Array.isArray(images)) {
      const normalized = images.map(normalizeImageEntry).filter(Boolean)
      if (normalized.length) {
        const urls = normalized.map((entry) => entry.url)
        scenariosList[idx].image = urls[0]
        scenariosList[idx].imageMobile = urls[0]
        scenariosList[idx].gallery = urls.slice()
        scenariosList[idx].galleryMobile = urls.slice()
        scenariosList[idx].images = normalized
      }
    }
  }
}
