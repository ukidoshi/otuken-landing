export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/o-nas',
    name: 'about',
    component: () => import('../pages/AboutPage.vue')
  },
  {
    path: '/novosti',
    name: 'news',
    component: () => import('../pages/NewsPage.vue')
  },
  {
    path: '/novosti/:slug',
    name: 'news-detail',
    component: () => import('../pages/NewsDetailPage.vue')
  },
  {
    path: '/news-preview/:id',
    name: 'news-preview',
    component: () => import('../pages/NewsPreviewPage.vue')
  },
  {
    path: '/o-komplekse',
    redirect: '/'
  },
  {
    path: '/lokaciya',
    redirect: '/'
  },
  {
    path: '/obekty',
    redirect: '/'
  },
  {
    path: '/obekty/:slug',
    redirect: '/'
  },
  {
    path: '/kontakty',
    redirect: '/'
  },
  {
    path: '/sobytiya',
    redirect: '/'
  },
  {
    path: '/sobytiya/:slug',
    redirect: '/'
  },
  {
    path: '/about',
    redirect: '/o-nas'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue')
  }
]
