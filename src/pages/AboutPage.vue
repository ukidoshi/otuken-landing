<template>
  <div class="bg-[#FAFAF8] text-[#2C2C2C]">
    <Header />

    <!-- HERO -->
    <section class="mt-16 md:mt-20 relative overflow-hidden bg-gradient-to-br from-[#0F3A4F] to-[#1B5B7F]">
      <div class="absolute inset-0 opacity-30 wave-animation" :style="waveStyle"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-black/20 border border-[#C9A961]/30 text-white px-3 py-1 rounded-full text-xs md:text-sm mb-4">
            <span class="w-2 h-2 rounded-full bg-[#C9A961]"></span>
            Проект в стадии строительства
          </div>

          <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            О нас
          </h1>

          <p class="text-lg md:text-xl text-white/95 leading-relaxed mb-8">
            «Отукен» — этнокультурный комплекс в Республике Тыва, создаваемый как точка притяжения для туризма,
            культурных событий и инвестиций в устойчивое развитие региона.
          </p>

          <div class="flex flex-col sm:flex-row gap-3">
            <button
                @click="goHomeToHero"
                class="bg-[#C9A961] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#B89A50] transition transform hover:-translate-y-1"
            >
              На главную
            </button>
            <button
                @click="scrollToId('investment')"
                class="border-2 border-[#C9A961] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C9A961] hover:text-black transition"
            >
              Инвестиционная логика
            </button>
          </div>
        </div>

        <!-- quick cards -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white/10 border border-white/15 rounded-2xl p-5 text-white">
            <div class="text-[#C9A961] font-semibold mb-2">Культурный капитал</div>
            <div class="text-sm text-white/90 leading-relaxed">
              Сохранение и актуализация традиций через современную инфраструктуру и события.
            </div>
          </div>
          <div class="bg-white/10 border border-white/15 rounded-2xl p-5 text-white">
            <div class="text-[#C9A961] font-semibold mb-2">Туристический поток</div>
            <div class="text-sm text-white/90 leading-relaxed">
              Комплекс проектируется как объект туристической инфраструктуры и круглогодичных активностей.
            </div>
          </div>
          <div class="bg-white/10 border border-white/15 rounded-2xl p-5 text-white">
            <div class="text-[#C9A961] font-semibold mb-2">Партнёрства</div>
            <div class="text-sm text-white/90 leading-relaxed">
              Открыты к сотрудничеству с бизнесом и институциями в формате инвестиций и совместных проектов.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INVESTMENT THESIS -->
    <section id="investment" class="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Инвестиционная логика «Отукена»</h2>
          <p class="text-base md:text-lg opacity-90 leading-relaxed mb-6">
            Мы строим комплекс как понятную систему: культурное ядро + событийная программа + комфортная инфраструктура.
            Это создаёт устойчивую экономику проекта: регулярные мероприятия, сервисы для гостей, рабочие места и рост
            туристической привлекательности территории.
          </p>

          <div class="space-y-3">
            <div class="flex gap-3">
              <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9A961]"></div>
              <div>
                <div class="font-semibold">Устойчивый спрос</div>
                <div class="text-sm opacity-85">События республиканского и международного масштаба + семейный отдых.</div>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9A961]"></div>
              <div>
                <div class="font-semibold">Инфраструктура как актив</div>
                <div class="text-sm opacity-85">Юрточный городок, гостиница, площадки, гастро- и торговые зоны.</div>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9A961]"></div>
              <div>
                <div class="font-semibold">Культурная идентичность</div>
                <div class="text-sm opacity-85">Проект усиливает бренд региона и ценность локальных ремёсел и традиций.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- placeholder visual -->
        <div class="bg-white rounded-2xl shadow-lg border border-[#C9A961]/15 overflow-hidden">
<!--          <div class="p-6 border-b border-[#C9A961]/10">-->
<!--            <div class="text-sm font-semibold text-[#1B5B7F]">Схема развития (плейсхолдер)</div>-->
<!--            <div class="text-xs opacity-70 mt-1">Позже можно заменить на реальную инфографику/рендер.</div>-->
<!--          </div>-->

          <div class="p-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl bg-gradient-to-br from-[#0F3A4F] to-[#1B5B7F] p-4 text-white">
                <div class="text-[#C9A961] font-semibold text-sm">Ядро</div>
                <div class="text-sm mt-1 opacity-90">Культура, традиции, смысл</div>
              </div>
              <div class="rounded-xl bg-[#FAFAF8] border border-[#C9A961]/15 p-4">
                <div class="text-[#1B5B7F] font-semibold text-sm">Сервис</div>
                <div class="text-sm mt-1 opacity-85">Отдых, питание, торговля</div>
              </div>
              <div class="rounded-xl bg-[#FAFAF8] border border-[#C9A961]/15 p-4">
                <div class="text-[#1B5B7F] font-semibold text-sm">События</div>
                <div class="text-sm mt-1 opacity-85">Фестивали и программы</div>
              </div>
              <div class="rounded-xl bg-gradient-to-br from-[#C9A961] to-[#B89A50] p-4 text-black">
                <div class="font-semibold text-sm">Экономика</div>
                <div class="text-sm mt-1 opacity-90">Поток, рабочие места, партнёрства</div>
              </div>
            </div>

            <div class="mt-5 text-sm opacity-85 leading-relaxed">
              Модель позволяет масштабировать проект по очередям: сначала — события и культурное пространство,
              затем — расширение инфраструктуры и сервисов.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STORY / TIMELINE -->
    <section class="bg-white border-y border-[#C9A961]/10">
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Как создаётся «Отукен»</h2>
        <p class="text-base md:text-lg opacity-90 leading-relaxed mb-10 max-w-3xl">
          Проект развивается по понятной дорожной карте: от концепции и первых событий — к полноценной инфраструктуре,
          которая будет работать круглый год.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="rounded-2xl border border-[#C9A961]/15 shadow-sm bg-[#FAFAF8] p-5">
            <div class="text-xs inline-flex items-center gap-2 bg-[#1B5B7F]/10 text-[#1B5B7F] px-3 py-1 rounded-full font-semibold">
              Этап 1
            </div>
            <div class="mt-3 font-bold text-lg">Концепция</div>
            <div class="text-sm opacity-85 mt-2 leading-relaxed">
              Формирование идеи комплекса: культурное ядро, туристическая функция, интеграция традиций и современности.
            </div>
          </div>

          <div class="rounded-2xl border border-[#C9A961]/15 shadow-sm bg-[#FAFAF8] p-5">
            <div class="text-xs inline-flex items-center gap-2 bg-[#1B5B7F]/10 text-[#1B5B7F] px-3 py-1 rounded-full font-semibold">
              Этап 2
            </div>
            <div class="mt-3 font-bold text-lg">Событийный запуск</div>
            <div class="text-sm opacity-85 mt-2 leading-relaxed">
              Старт с мероприятий, которые “включают” интерес и формируют традицию ежегодных программ.
            </div>
          </div>

          <div class="rounded-2xl border border-[#C9A961]/15 shadow-sm bg-[#FAFAF8] p-5">
            <div class="text-xs inline-flex items-center gap-2 bg-[#1B5B7F]/10 text-[#1B5B7F] px-3 py-1 rounded-full font-semibold">
              Этап 3
            </div>
            <div class="mt-3 font-bold text-lg">Инфраструктура</div>
            <div class="text-sm opacity-85 mt-2 leading-relaxed">
              Развитие объектов: площадки, зоны отдыха, этно-проживание, торговля и гастрономия.
            </div>
          </div>

          <div class="rounded-2xl border border-[#C9A961]/15 shadow-sm bg-[#FAFAF8] p-5">
            <div class="text-xs inline-flex items-center gap-2 bg-[#1B5B7F]/10 text-[#1B5B7F] px-3 py-1 rounded-full font-semibold">
              Этап 4
            </div>
            <div class="mt-3 font-bold text-lg">Масштабирование</div>
            <div class="text-sm opacity-85 mt-2 leading-relaxed">
              Партнёрства, новые форматы событий и расширение сервисов для постоянного туристического потока.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT INSIDE -->
    <section class="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Что будет в комплексе</h2>
          <p class="text-base md:text-lg opacity-90 leading-relaxed mb-6">
            «Отукен» проектируется как среда, в которой одинаково комфортно:
            провести фестиваль, приехать на выходные семьёй, остановиться туристом, заниматься спортом и знакомиться с культурой.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="item in infra" :key="item.title" class="rounded-xl bg-white border border-[#C9A961]/15 shadow-sm p-4">
              <div class="font-semibold text-[#1B5B7F]">{{ item.title }}</div>
              <div class="text-sm opacity-85 mt-1 leading-relaxed">{{ item.desc }}</div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-[#0F3A4F] to-[#1B5B7F] p-7 text-white shadow-lg border border-white/10">
          <div class="text-[#C9A961] font-semibold mb-2">Фокус на доходности и смысле</div>
          <div class="text-sm md:text-base opacity-95 leading-relaxed">
            Мы сознательно соединяем культурную миссию с рыночной логикой: события формируют трафик,
            инфраструктура удерживает гостей, а локальные ремёсла и сервисы получают стабильный спрос.
          </div>

          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="rounded-xl bg-white/10 border border-white/15 p-4">
              <div class="text-sm font-semibold text-[#C9A961]">Поток</div>
              <div class="text-sm mt-1 opacity-90">мероприятия + туризм</div>
            </div>
            <div class="rounded-xl bg-white/10 border border-white/15 p-4">
              <div class="text-sm font-semibold text-[#C9A961]">Сервисы</div>
              <div class="text-sm mt-1 opacity-90">питание, проживание, торговля</div>
            </div>
            <div class="rounded-xl bg-white/10 border border-white/15 p-4">
              <div class="text-sm font-semibold text-[#C9A961]">Культура</div>
              <div class="text-sm mt-1 opacity-90">сохранение и популяризация</div>
            </div>
            <div class="rounded-xl bg-white/10 border border-white/15 p-4">
              <div class="text-sm font-semibold text-[#C9A961]">Партнёрства</div>
              <div class="text-sm mt-1 opacity-90">инвесторы и проекты</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOUNDERS -->
    <section class="bg-white border-y border-[#C9A961]/10">
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Организаторы проекта</h2>
        <p class="text-base md:text-lg opacity-90 leading-relaxed mb-10 max-w-3xl">
          «Отукен» создаётся как долгосрочный проект. Организаторы отвечают за концепцию, развитие инфраструктуры,
          событийную программу и партнёрства.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="rounded-2xl border border-[#C9A961]/15 shadow-sm bg-[#FAFAF8] p-6 flex gap-5 items-start">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F3A4F] to-[#1B5B7F] flex items-center justify-center text-white font-bold">
              AS
            </div>
            <div>
              <div class="text-lg font-bold">Салчак Алимдорж Санданович</div>
              <div class="text-sm text-[#1B5B7F] font-semibold mt-1">Организатор проекта</div>
              <div class="text-sm opacity-85 mt-2 leading-relaxed">
                Отвечает за организационное развитие проекта, партнёрскую модель и инвестиционную коммуникацию.
              </div>
            </div>
          </div>
          <div class="rounded-2xl border border-[#C9A961]/15 shadow-sm bg-[#FAFAF8] p-6 flex gap-5 items-start">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A961] to-[#B89A50] flex items-center justify-center text-black font-bold">
              RS
            </div>
            <div>
              <div class="text-lg font-bold">Салчак Розаля Дадар-ооловна</div>
              <div class="text-sm text-[#1B5B7F] font-semibold mt-1">Организатор проекта</div>
              <div class="text-sm opacity-85 mt-2 leading-relaxed">
                Курирует развитие концепции этнокомплекса и культурно-событийное направление.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
      <div class="rounded-2xl bg-gradient-to-br from-[#0F3A4F] to-[#1B5B7F] p-8 md:p-10 text-white border border-white/10 shadow-lg">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="max-w-2xl">
            <h3 class="text-2xl md:text-3xl font-bold mb-2">Вернуться на главную страницу</h3>
            <p class="text-sm md:text-base opacity-90 leading-relaxed">
              На главной вы можете посмотреть участки, карту и другие разделы об комплексе.
            </p>
          </div>
          <div class="flex gap-3 flex-col sm:flex-row">
            <button
                @click="goHomeToHero"
                class="bg-[#C9A961] text-black px-7 py-3 rounded-lg font-semibold hover:bg-[#B89A50] transition transform hover:-translate-y-1"
            >
              На главную
            </button>
            <button
                @click="scrollToTop"
                class="border-2 border-[#C9A961] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#C9A961] hover:text-black transition"
            >
              В начало страницы
            </button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()

const waveStyle = computed(() => {
  const svg = encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path d="M0,300 Q300,200 600,250 T1200,300 L1200,600 L0,600 Z" fill="rgba(201,169,97,0.12)" opacity="0.35"/></svg>'
  )
  return {
    backgroundImage: `url('data:image/svg+xml,${svg}')`,
    backgroundRepeat: 'repeat-x'
  }
})

const infra = [
  { title: 'Аллея родовых групп', desc: 'Культурное пространство и символ единства традиций.' },
  { title: 'Сцена и фестивали', desc: 'Площадка для событий республиканского и международного уровня.' },
  { title: 'Юрточный городок', desc: 'Этно-проживание и погружение в традиционный быт.' },
  { title: 'Гостиница', desc: 'Комфортное размещение для туристов и участников мероприятий.' },
  { title: 'Ипподром', desc: 'Традиционные конные соревнования и праздники.' },
  { title: 'Спорт и активность', desc: 'Площадки и зоны для спорта и семейного отдыха.' },
  { title: 'Торговля и сувениры', desc: 'Поддержка локальных ремёсел и предпринимательства.' },
  { title: 'Гастро и торжества', desc: 'Ресторан/площадки для мероприятий и знакомства с кухней региона.' }
]

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const goHomeToHero = async () => {
  await router.push('/')
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>