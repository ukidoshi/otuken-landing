import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { indexableRoutePaths } from './seo/routeManifest'
import './assets/styles.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior
  }
)

export const includedRoutes = () => indexableRoutePaths
