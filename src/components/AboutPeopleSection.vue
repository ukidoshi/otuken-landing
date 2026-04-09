<template>
  <section id="team" class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8">
    <div class="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(184,138,66,0.14),transparent_72%)] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-14">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          О нас
        </div>

        <h2 class="section-title mt-5 mb-5">
          Люди и идея проекта
        </h2>

        <p class="section-lead">
          «Өтүкен» создаётся как долгосрочный этнокультурный проект в Республике Тыва.
          Для нас важно, чтобы территория оставалась цельной по смыслу, уважительной к традициям и современной по качеству среды.
        </p>
      </div>

      <div class="grid lg:grid-cols-[1.02fr_0.98fr] gap-6">
        <article class="theme-card p-7 md:p-9">
          <div class="text-sm uppercase tracking-[0.24em] text-[var(--clay)]/80">Наш подход</div>
          <h3 class="display-font text-[2.35rem] md:text-[3.1rem] leading-none text-[var(--title)] mt-4">
            Проект, который растёт из смысла
          </h3>

          <p class="mt-5 text-[var(--ink-soft)] leading-8">
            Мы смотрим на «Өтүкен» как на живую среду, где культурная память, события, гостеприимство и отдых
            работают вместе. Поэтому для нас важны не только объекты сами по себе, но и общее впечатление от территории,
            её ритм, атмосфера и путь человека внутри пространства.
          </p>

          <div class="mt-7 grid sm:grid-cols-3 gap-4">
            <div
              v-for="principle in principles"
              :key="principle.title"
              class="rounded-[1.4rem] border border-[rgba(184,138,66,0.16)] bg-white/72 p-4"
            >
              <div class="text-base font-semibold text-[var(--title)]">
                {{ principle.title }}
              </div>
              <p class="mt-2 text-sm text-[var(--ink-soft)] leading-7">
                {{ principle.text }}
              </p>
            </div>
          </div>
        </article>

        <article class="theme-card-dark p-7 md:p-9">
          <div class="text-sm uppercase tracking-[0.24em] text-white/72">Команда проекта</div>
          <div class="mt-6 grid gap-4">
            <div
              v-for="person in people"
              :key="person.name"
              class="rounded-[1.45rem] border border-white/12 bg-white/8 p-5"
            >
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-[1rem] bg-[linear-gradient(135deg,#d7b76a,#bb9454)] text-[#17130c] font-bold flex items-center justify-center shrink-0">
                  {{ person.initials }}
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white">
                    {{ person.name }}
                  </h3>
                  <div class="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                    {{ person.role }}
                  </div>
                </div>
              </div>
              <p class="mt-4 text-sm text-white/82 leading-7">
                {{ person.text }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const principles = [
  {
    title: 'Уважение к традиции',
    text: 'Пространство должно ощущаться тувинским по характеру, а не только по декоративным деталям.'
  },
  {
    title: 'Современный комфорт',
    text: 'Гостю должно быть удобно отдыхать, перемещаться по территории и возвращаться сюда снова.'
  },
  {
    title: 'Долгий горизонт',
    text: 'Проект развивается поэтапно, но всегда с пониманием будущего масштаба и устойчивости.'
  }
]

const people = [
  {
    initials: 'AS',
    name: 'Салчак Алимдорж Санданович',
    role: 'Организатор проекта',
    text: 'Отвечает за организационное развитие проекта, партнёрские связи и выстраивание устойчивой модели роста комплекса.'
  },
  {
    initials: 'RS',
    name: 'Салчак Розаля Дадар-ооловна',
    role: 'Организатор проекта',
    text: 'Курирует развитие концепции этнокомплекса, культурную линию проекта и событийные сценарии будущей территории.'
  }
]
</script>
