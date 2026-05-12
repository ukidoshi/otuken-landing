<template>
  <section class="py-8 md:py-10 px-4 md:px-8">
    <div class="max-w-5xl mx-auto theme-card p-7 md:p-9">
      <div v-if="!normalizedBlocks.length" class="text-[var(--ink-soft)] leading-8">
        Подробный текст новости скоро появится.
      </div>

      <div v-else class="grid gap-5">
        <template v-for="(block, index) in normalizedBlocks" :key="`${block.type}-${index}`">
          <component
            :is="block.headingTag || 'h2'"
            v-if="block.type === 'heading'"
            :class="headingClass(block.level)"
          >
            {{ block.text }}
          </component>

          <p
            v-else-if="block.type === 'paragraph'"
            class="text-[var(--ink-soft)] leading-8 [&_a]:text-[var(--jade)] [&_a]:underline"
            v-html="block.html"
          />

          <blockquote
            v-else-if="block.type === 'quote'"
            class="border-l-4 border-[var(--gold)] pl-4 text-[var(--ink)] leading-8 italic"
          >
            {{ block.text }}
            <footer v-if="block.caption" class="mt-2 text-sm not-italic text-[var(--ink-soft)]">
              {{ block.caption }}
            </footer>
          </blockquote>

          <ol
            v-else-if="block.type === 'list' && block.ordered"
            class="list-decimal pl-6 space-y-3 text-[var(--ink)] leading-7 marker:text-[var(--gold)] marker:font-semibold"
          >
            <li v-for="(item, itemIndex) in block.items" :key="`${index}-${itemIndex}`">
              {{ item }}
            </li>
          </ol>

          <ul
            v-else-if="block.type === 'list'"
            class="grid gap-3"
          >
            <li
              v-for="(item, itemIndex) in block.items"
              :key="`${index}-${itemIndex}`"
              class="flex gap-3 text-[var(--ink)] leading-7"
            >
              <span class="mt-[0.72rem] w-2.5 h-2.5 rounded-full bg-[var(--gold)] shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <ul
            v-else-if="block.type === 'checklist'"
            class="grid gap-2"
          >
            <li
              v-for="(row, rowIndex) in block.items"
              :key="`${index}-${rowIndex}`"
              class="flex gap-3 text-[var(--ink)] leading-7"
            >
              <span
                class="mt-1 w-5 h-5 shrink-0 rounded border border-[rgba(184,138,66,0.35)] flex items-center justify-center text-xs font-bold"
                :class="row.checked ? 'bg-[var(--gold)]/25 text-[var(--title)]' : 'bg-white/60 text-transparent'"
              >
                ✓
              </span>
              <span :class="row.checked ? 'opacity-90' : ''">{{ row.text }}</span>
            </li>
          </ul>

          <div
            v-else-if="block.type === 'delimiter'"
            class="theme-divider my-2"
            role="separator"
          />

          <figure
            v-else-if="block.type === 'image'"
            class="news-content-image overflow-hidden rounded-[1.4rem] border border-[rgba(184,138,66,0.16)]"
          >
            <div
              class="news-content-image-stage"
              :class="{ 'is-portrait': isPortrait(block) }"
              :style="aspectRatioStyle(block)"
            >
              <img
                :src="block.url"
                :alt="block.alt"
                class="news-content-image-el"
                :width="block.width || null"
                :height="block.height || null"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption v-if="block.caption" class="px-4 py-3 text-sm text-[var(--ink-soft)]">
              {{ block.caption }}
            </figcaption>
          </figure>

          <figure
            v-else-if="block.type === 'video'"
            :class="videoFigureClass(block)"
          >
            <div
              class="news-content-video-stage"
              :class="{ 'is-portrait': isPortrait(block) }"
              :style="aspectRatioStyle(block)"
            >
              <video
                :src="block.src"
                class="news-content-video-el"
                :poster="block.posterUrl || null"
                :width="block.width || null"
                :height="block.height || null"
                controls
                playsinline
                preload="metadata"
              />
            </div>
            <figcaption v-if="block.caption" class="px-4 py-3 text-sm text-[var(--ink-soft)]">
              {{ block.caption }}
            </figcaption>
          </figure>

          <div
            v-else-if="block.type === 'embed'"
            class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] overflow-hidden bg-black/5"
          >
            <div v-if="block.embedUrl" class="relative aspect-video w-full">
              <iframe
                :src="block.embedUrl"
                class="absolute inset-0 h-full w-full"
                title="Встраиваемое медиа"
                loading="lazy"
                allowfullscreen
              />
            </div>
            <div v-else class="p-5 text-[var(--ink-soft)]">
              <p class="font-semibold text-[var(--title)]">{{ block.service || 'Медиа' }}</p>
              <a
                v-if="block.source"
                :href="block.source"
                class="mt-2 inline-flex text-[var(--jade)] font-semibold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть материал
              </a>
            </div>
            <p v-if="block.caption" class="px-4 py-3 text-sm text-[var(--ink-soft)] border-t border-[rgba(184,138,66,0.12)]">
              {{ block.caption }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { resolveApiAssetUrl } from '../services/newsApi'

const props = defineProps({
  blocks: {
    type: Array,
    default: () => []
  }
})

const videoFigureClass = (b) => {
  const classes = ['news-content-video', 'w-full', 'overflow-hidden', 'rounded-[1.4rem]']
  if (b.withBorder) classes.push('border border-[rgba(184,138,66,0.16)]')
  if (b.withBackground) classes.push('bg-[rgba(184,138,66,0.08)]', 'p-2', 'md:p-3')
  if (b.stretched) classes.push('max-w-none')
  return classes.join(' ')
}

const aspectRatioStyle = (b) =>
  b?.width && b?.height ? { aspectRatio: `${b.width} / ${b.height}` } : null

const isPortrait = (b) => Boolean(b?.width && b?.height && b.height > b.width)

const headingClass = (level) => {
  const base = 'display-font leading-none text-[var(--title)] font-semibold'
  const sizes = {
    1: 'text-[2.35rem] md:text-[3rem]',
    2: 'text-[2rem] md:text-[2.5rem]',
    3: 'text-[1.75rem] md:text-[2.1rem]',
    4: 'text-[1.5rem] md:text-[1.85rem]',
    5: 'text-[1.35rem] md:text-[1.55rem]',
    6: 'text-[1.2rem] md:text-[1.35rem]'
  }
  return `${base} ${sizes[level] || sizes[3]}`
}

const stripHtml = (value) => {
  if (!value || typeof value !== 'string') return ''
  return value.replace(/<[^>]*>/g, '').trim()
}

const normalizeParagraphHtml = (html) => {
  if (!html || typeof html !== 'string') return ''
  return html
}

const extractIframeSrc = (embedHtml) => {
  if (!embedHtml || typeof embedHtml !== 'string') return ''
  const match = embedHtml.match(/src=["']([^"']+)["']/i)
  return match ? match[1] : ''
}

const buildEmbedUrl = (service, source, embedHtml) => {
  const fromIframe = extractIframeSrc(embedHtml)
  if (fromIframe && /^https?:\/\//i.test(fromIframe)) return fromIframe
  if (!source || typeof source !== 'string') return ''
  try {
    const url = new URL(source)
    const host = url.hostname.replace(/^www\./, '')
    if (host.includes('youtube.com') || host === 'youtu.be') {
      let id = ''
      if (host === 'youtu.be') id = url.pathname.replace('/', '')
      else id = url.searchParams.get('v') || ''
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`
    }
    if (host.includes('vimeo.com')) {
      const id = url.pathname.split('/').filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}`
    }
  } catch {
    return ''
  }
  return ''
}

const normalizeEditorJsBlock = (block) => {
  const type = block?.type
  const data = block?.data || {}

  if (type === 'header' || type === 'heading') {
    const level = Math.min(6, Math.max(1, Number(data.level) || 2))
    const raw = data.text ?? data.content
    const text = stripHtml(typeof raw === 'string' ? raw : raw != null ? String(raw) : '') || ''
    const headingTag = `h${level}`
    return { type: 'heading', level, text, headingTag }
  }

  if (type === 'paragraph') {
    const raw = data.text ?? data.content
    const html = normalizeParagraphHtml(typeof raw === 'string' ? raw : raw != null ? String(raw) : '')
    if (!stripHtml(html)) return null
    return { type: 'paragraph', html }
  }

  if (type === 'quote') {
    const raw = data.text ?? data.content
    const rawHtml = typeof raw === 'string' ? raw : raw != null ? String(raw) : ''
    const text = stripHtml(rawHtml) || rawHtml.trim()
    if (!text) return null
    return { type: 'quote', text, caption: data.caption || '' }
  }

  if (type === 'list') {
    const items = (data.items || []).map((item) => (typeof item === 'string' ? item : item?.content || '')).filter(Boolean)
    if (!items.length) return null
    return { type: 'list', items, ordered: data.style === 'ordered' }
  }

  if (type === 'checklist') {
    const items = (data.items || [])
      .map((row) => ({
        text: row?.text || '',
        checked: Boolean(row?.checked)
      }))
      .filter((row) => row.text)
    if (!items.length) return null
    return { type: 'checklist', items }
  }

  if (type === 'delimiter') {
    return { type: 'delimiter' }
  }

  if (type === 'image') {
    const fileObj = (data.file && typeof data.file === 'object' && data.file) || {}
    const rawUrl = fileObj.url || data.url || ''
    const url = resolveApiAssetUrl(rawUrl)
    if (!url) return null
    const width = Number(fileObj.width) || 0
    const height = Number(fileObj.height) || 0
    return {
      type: 'image',
      url,
      alt: data.caption || stripHtml(data.alt) || 'Изображение в тексте новости',
      caption: data.caption || '',
      width: width > 0 ? width : null,
      height: height > 0 ? height : null
    }
  }

  if (type === 'video') {
    const file = data.file
    const fileObj = (typeof file === 'object' && file) || {}
    const rawUrl =
      (typeof fileObj.url === 'string' && fileObj.url) ||
      (typeof file === 'string' ? file : '') ||
      (typeof data.url === 'string' ? data.url : '') ||
      ''
    const src = resolveApiAssetUrl(rawUrl)
    if (!src) return null
    const cap = data.caption
    const width = Number(fileObj.width) || 0
    const height = Number(fileObj.height) || 0
    const rawPoster = typeof fileObj.poster_url === 'string' ? fileObj.poster_url : ''
    const posterUrl = rawPoster ? resolveApiAssetUrl(rawPoster) : ''
    return {
      type: 'video',
      src,
      caption: typeof cap === 'string' ? cap.trim() : '',
      withBorder: Boolean(data.withBorder),
      withBackground: Boolean(data.withBackground),
      stretched: Boolean(data.stretched),
      width: width > 0 ? width : null,
      height: height > 0 ? height : null,
      posterUrl
    }
  }

  if (type === 'embed') {
    const service = data.service || ''
    const source = data.source || ''
    const embedUrl = buildEmbedUrl(service, source, data.embed)
    if (!embedUrl && !source) return null
    return {
      type: 'embed',
      service,
      source,
      embedUrl,
      caption: data.caption || ''
    }
  }

  return null
}

const normalizedBlocks = computed(() =>
  (props.blocks || [])
    .map((block) => normalizeEditorJsBlock(block))
    .filter(Boolean)
)
</script>

<style scoped>
/* Общая "сцена" для медиа в контенте новости.
   Картинка/видео любого размера и пропорций вписывается, не растягиваясь
   и не превышая разумной высоты на экране. */
.news-content-video,
.news-content-image {
  max-width: 100%;
}

.news-content-video-stage,
.news-content-image-stage {
  background: #0b0c0a;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Страховка для старых записей без width/height: ограничиваем по высоте.
     Для новых записей aspect-ratio из inline-style зарезервирует пропорцию заранее. */
  max-height: min(70svh, 720px);
}

.news-content-image-stage {
  /* Картинке достаточно мягкого фона, без жёсткого чёрного */
  background: rgba(11, 12, 10, 0.04);
}

.news-content-video-stage {
  border-radius: 1rem;
}

/* Портретные медиа (height > width) — делаем их визуально компактнее по ширине,
   чтобы не растягивать карточку 5xl на полный размер вертикального видео/фото. */
.news-content-video-stage.is-portrait,
.news-content-image-stage.is-portrait {
  max-width: 28rem;
  margin-inline: auto;
}

.news-content-video-el,
.news-content-image-el {
  display: block;
  width: 100%;
  height: 100%;
  max-height: inherit;
  /* contain — любые пропорции вписываются полностью */
  object-fit: contain;
}

.news-content-video-el {
  background: #0b0c0a;
}

@media (max-width: 767px) {
  .news-content-video-stage,
  .news-content-image-stage {
    max-height: min(60svh, 520px);
  }
  .news-content-video-stage {
    border-radius: 0.85rem;
  }
  .news-content-video-stage.is-portrait,
  .news-content-image-stage.is-portrait {
    max-width: 22rem;
  }
}
</style>
