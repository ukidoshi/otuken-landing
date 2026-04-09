<template>
  <div class="theme-page">
    <Header />
    <main class="pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="theme-card p-8 md:p-10 text-center">
          <div class="section-badge mx-auto">
            <span class="section-dot"></span>
            404
          </div>
          <h1 class="section-title mt-5 mb-5">
            Страница не найдена
          </h1>
          <p class="section-lead">
            Такой страницы сейчас нет. Перейдите на главную, откройте страницу «О нас» или посмотрите новости проекта.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <RouterLink to="/" class="theme-button-primary">На главную</RouterLink>
            <RouterLink to="/o-nas" class="theme-button-light">О нас</RouterLink>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useSeoPage } from '../composables/useSeoPage'

useSeoPage({
  title: 'Страница не найдена — «Отукен»',
  description: 'Страница не найдена. Перейдите на главную страницу проекта «Отукен», страницу «О нас» или в новости проекта.',
  path: '/404',
  robots: 'noindex,follow'
})
</script>
