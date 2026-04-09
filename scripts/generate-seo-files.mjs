import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { indexableRoutePaths } from '../src/seo/routeManifest.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const publicDir = path.join(rootDir, 'public')
const ogDir = path.join(publicDir, 'og')

const env = loadEnv('production', rootDir, '')
const siteUrl = (env.VITE_SITE_URL || 'https://otuken.ru').replace(/\/$/, '')
const host = new URL(siteUrl).host
const now = new Date()
const lastmod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

const getPriority = (routePath) => {
  if (routePath === '/') return '1.0'
  if (['/o-nas', '/novosti'].includes(routePath)) return '0.9'
  return '0.6'
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutePaths
  .map((routePath) => {
    const url = new URL(routePath, `${siteUrl}/`).toString()
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${getPriority(routePath)}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /
Disallow: /404

Host: ${host}
Sitemap: ${siteUrl}/sitemap.xml
`

await mkdir(publicDir, { recursive: true })
await mkdir(ogDir, { recursive: true })

await writeFile(path.join(publicDir, 'robots.txt'), robots, 'utf8')
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8')

const sourceOgImage = path.join(rootDir, 'src/assets/hero/overview.jpeg')
const targetOgImage = path.join(ogDir, 'otuken-og.jpg')
await copyFile(sourceOgImage, targetOgImage)
