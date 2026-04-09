let lockCount = 0
let savedHtmlOverflow = ''
let savedBodyOverflow = ''
let savedBodyPaddingRight = ''

const canUseDom = () => typeof window !== 'undefined' && typeof document !== 'undefined'

export const lockBodyScroll = () => {
  if (!canUseDom()) return

  lockCount += 1
  if (lockCount > 1) return

  const html = document.documentElement
  const body = document.body
  const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth)

  savedHtmlOverflow = html.style.overflow
  savedBodyOverflow = body.style.overflow
  savedBodyPaddingRight = body.style.paddingRight

  html.style.overflow = 'hidden'
  body.style.overflow = 'hidden'

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`
  }
}

export const unlockBodyScroll = () => {
  if (!canUseDom() || lockCount === 0) return

  lockCount -= 1
  if (lockCount > 0) return

  const html = document.documentElement
  const body = document.body

  html.style.overflow = savedHtmlOverflow
  body.style.overflow = savedBodyOverflow
  body.style.paddingRight = savedBodyPaddingRight
}
