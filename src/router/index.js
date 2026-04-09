import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition

  if (to.hash) {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const headerOffset = window.innerWidth < 768 ? 88 : 104
        resolve({
          el: to.hash,
          top: headerOffset,
          behavior: 'smooth'
        })
      }, 80)
    })
  }

  return { top: 0 }
}

export const createSiteRouter = () =>
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior
  })

export { routes }

export default createSiteRouter
