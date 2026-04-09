<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="about">
    <div class="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(184,138,66,0.14),transparent_72%)] pointer-events-none"></div>
    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-14">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Этнокультурный комплекс • живая среда традиций
        </div>

        <h2 class="section-title mt-5 mb-5">
          Что такое «Өтүкен»?
        </h2>

        <p class="section-lead">
          «Өтүкен» — этнокультурный комплекс в Туве: место, где традиции живут не “в витрине”, а в событиях,
          инфраструктуре и туристических маршрутах. Это культурное ядро и понятная инвестиционная логика вокруг него.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div class="theme-card theme-card-hover p-6">
          <div class="w-12 h-12 rounded-2xl bg-[rgba(184,138,66,0.12)] text-2xl flex items-center justify-center mb-4">🏛️</div>
          <div class="text-xl font-semibold text-[var(--title)] mb-3">Культурное ядро</div>
          <p class="text-[var(--ink-soft)] leading-7">
            Пространство, которое сохраняет и показывает традиции тувинского народа через современные форматы.
          </p>
        </div>

        <div class="theme-card theme-card-hover p-6">
          <div class="w-12 h-12 rounded-2xl bg-[rgba(74,111,97,0.12)] text-2xl flex items-center justify-center mb-4">🎭</div>
          <div class="text-xl font-semibold text-[var(--title)] mb-3">События и туризм</div>
          <p class="text-[var(--ink-soft)] leading-7">
            Фестивали, программы и мероприятия формируют поток гостей и делают комплекс живым круглый год.
          </p>
        </div>

        <div class="theme-card theme-card-hover p-6">
          <div class="w-12 h-12 rounded-2xl bg-[rgba(153,107,76,0.12)] text-2xl flex items-center justify-center mb-4">📈</div>
          <div class="text-xl font-semibold text-[var(--title)] mb-3">Инвест-логика</div>
          <p class="text-[var(--ink-soft)] leading-7">
            Рост привлекательности территории и инфраструктуры усиливает ценность проектов и участков вокруг комплекса.
          </p>
        </div>
      </div>

      <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        <div class="theme-card p-7 md:p-9">
          <div class="text-sm uppercase tracking-[0.28em] text-[var(--clay)]/80 mb-3">Смысл и территория</div>
          <h3 class="display-font text-4xl md:text-5xl text-[var(--title)] leading-none mb-5">
            Больше, чем просто недвижимость
          </h3>

          <p class="mb-4 leading-8 text-[var(--ink-soft)]">
            «Өтүкен» задуман как точка притяжения: культурные объекты, площадки для событий, сервисы для гостей и
            среда для отдыха. Проект развивается по очередям — от событийного запуска к расширению инфраструктуры.
          </p>

          <p class="mb-7 leading-8 text-[var(--ink-soft)]">
            Для посетителя это — место впечатлений и погружения в культуру. Для партнёров и инвесторов — понятная модель,
            где трафик рождается событиями, а удерживается комфортом и качественной инфраструктурой.
          </p>

          <div class="space-y-4">
            <div class="flex gap-4">
              <div class="w-11 h-11 rounded-2xl bg-[rgba(184,138,66,0.12)] flex items-center justify-center text-xl flex-shrink-0">🌿</div>
              <p class="leading-7 text-[var(--ink)]">
                <strong>Локация и атмосфера:</strong> природа, этно-среда и уникальный культурный контекст региона.
              </p>
            </div>

            <div class="flex gap-4">
              <div class="w-11 h-11 rounded-2xl bg-[rgba(74,111,97,0.12)] flex items-center justify-center text-xl flex-shrink-0">🏘️</div>
              <p class="leading-7 text-[var(--ink)]">
                <strong>Инфраструктура:</strong> площадки для мероприятий, гостевые форматы, сервисы для отдыха и спорта.
              </p>
            </div>

            <div class="flex gap-4">
              <div class="w-11 h-11 rounded-2xl bg-[rgba(153,107,76,0.12)] flex items-center justify-center text-xl flex-shrink-0">🤝</div>
              <p class="leading-7 text-[var(--ink)]">
                <strong>Партнёрства:</strong> проект открыт к сотрудничеству — от событий до сервисов и совместных инициатив.
              </p>
            </div>
          </div>

          <div class="theme-divider my-8"></div>

          <div class="theme-card p-5 md:p-6 bg-white/55">
            <div class="text-sm uppercase tracking-[0.22em] text-[var(--clay)]/80 mb-4">Как развивается проект</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div class="w-2.5 h-2.5 rounded-full bg-[var(--gold)] mb-3"></div>
                <div class="font-semibold text-[var(--ink)]">Концепция</div>
                <div class="text-sm text-[var(--ink-soft)] mt-1">смыслы, формат, модель</div>
              </div>
              <div>
                <div class="w-2.5 h-2.5 rounded-full bg-[var(--gold)] mb-3"></div>
                <div class="font-semibold text-[var(--ink)]">События</div>
                <div class="text-sm text-[var(--ink-soft)] mt-1">программы, фестивали</div>
              </div>
              <div>
                <div class="w-2.5 h-2.5 rounded-full bg-[var(--gold)] mb-3"></div>
                <div class="font-semibold text-[var(--ink)]">Инфраструктура</div>
                <div class="text-sm text-[var(--ink-soft)] mt-1">строительство и сервисы</div>
              </div>
            </div>
          </div>
        </div>

        <div class="theme-card-dark p-8 md:p-10 relative overflow-hidden">
          <div class="absolute inset-0 opacity-40 pointer-events-none">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,138,66,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(130,171,151,0.14),transparent_30%)]"></div>
          </div>

          <div class="relative z-10">
            <div class="text-sm uppercase tracking-[0.28em] text-white/70">Коротко и по делу</div>
            <div class="display-font text-4xl md:text-5xl leading-none mt-3">
              «Өтүкен» — культура, инфраструктура и события
            </div>

            <p class="mt-5 text-white/84 leading-8">
              Мы создаём место, куда хочется приехать. И среду, которая может развиваться и масштабироваться
              вместе с интересом к региону.
            </p>

            <div class="mt-7 grid grid-cols-2 gap-3">
              <div class="rounded-2xl border border-white/12 bg-white/8 p-4">
                <div class="text-[var(--bg-sand)] font-semibold text-sm">Фокус</div>
                <div class="text-sm mt-2 text-white/90">туризм и события</div>
              </div>
              <div class="rounded-2xl border border-white/12 bg-white/8 p-4">
                <div class="text-[var(--bg-sand)] font-semibold text-sm">Формат</div>
                <div class="text-sm mt-2 text-white/90">по очередям</div>
              </div>
            </div>

            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                @click="scrollTo('objects')"
                class="theme-button-primary w-full sm:w-auto"
              >
                Посмотреть объекты
              </button>

              <button
                @click="scrollTo('map')"
                class="theme-button-secondary w-full sm:w-auto"
              >
                Посмотреть карту
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return

  const headerOffset = window.innerWidth < 768 ? 88 : 104
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth'
  })
}
</script>
