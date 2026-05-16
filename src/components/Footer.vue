<template>
  <footer class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden px-4 md:px-8 pb-12 pt-6 md:pb-16" id="contact">
    <div class="max-w-7xl mx-auto">
      <div class="theme-card-dark p-8 md:p-10 overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,138,66,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(74,111,97,0.18),transparent_30%)] pointer-events-none"></div>

        <div class="relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12">
          <div>
            <div class="flex gap-4 md:gap-5 items-start">
              <div class="footer-logo-wrap shrink-0">
                <img
                  :src="footerLogoSrc"
                  alt=""
                  width="80"
                  height="80"
                  class="footer-logo"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-[var(--bg-sand)] font-extrabold tracking-[0.18em] text-3xl md:text-4xl">ӨТҮКЕН</div>
                <p class="mt-5 max-w-xl text-white/78 leading-8 text-base md:text-lg">
                  Этнокультурный комплекс в Республике Тыва, где традиции становятся частью современной туристической,
                  событийной и общественной среды.
                </p>
              </div>
            </div>

            <div class="mt-8 grid sm:grid-cols-2 gap-4">
              <div class="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                <div class="text-[var(--bg-sand)] font-semibold">Контакты</div>
                <div class="mt-3 space-y-2 text-sm text-white/78 break-words">
                  <a :href="`tel:${phoneHref}`" class="footer-contact-link hover:text-white transition">
                    {{ siteConfig.phoneDisplay }}
                  </a>
                  <a :href="`mailto:${siteConfig.email}`" class="footer-contact-link hover:text-white transition">
                    {{ siteConfig.email }}
                  </a>
                  <div>{{ siteConfig.addressRegion }}, {{ siteConfig.addressLocality }}</div>
                </div>
              </div>
              <div class="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                <div class="text-[var(--bg-sand)] font-semibold">Режим связи</div>
                <div class="mt-3 space-y-2 text-sm text-white/78">
                  <div>Пн–Пт: 09:00–18:00</div>
                  <div>Консультации по проекту и участкам</div>
                  <div>Ответим на вопросы по партнёрству</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div class="text-[var(--bg-sand)] font-semibold mb-4">Страницы проекта</div>
              <ul class="space-y-3 text-sm text-white/74">
                <li v-for="item in pageNavigation" :key="item.to">
                  <RouterLink :to="item.to" class="hover:text-white transition">
                    {{ item.label }}
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div class="mt-6 grid sm:grid-cols-2 gap-4">
              <a
                :href="`tel:${phoneHref}`"
                class="theme-button-primary w-full"
              >
                Позвонить
              </a>
              <a
                :href="`mailto:${siteConfig.email}`"
                class="theme-button-secondary footer-mail-button w-full"
              >
                Написать
              </a>
            </div>
          </div>
        </div>

        <div class="relative z-10 mt-10 pt-6 border-t border-white/10 text-sm text-white/56 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p>&copy; {{ currentYear }} Комплекс «Өтүкен». Все права защищены.</p>
          <p>Культурная идентичность, туризм и среда для жизни.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { pageNavigation, siteConfig } from '../seo/site'
import footerLogoSrc from '../assets/brand/bayken-hero-logo.png'

const currentYear = new Date().getFullYear()
const phoneHref = siteConfig.phone.replace(/[^\d+]/g, '')
</script>

<style scoped>
.footer-contact-link {
  display: block;
  width: 100%;
}

.footer-logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  mix-blend-mode: screen;
  filter: drop-shadow(0 6px 18px rgba(201, 169, 97, 0.3));
}

@media (min-width: 768px) {
  .footer-logo {
    width: 5rem;
    height: 5rem;
  }
}

.footer-mail-button {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
}
</style>
