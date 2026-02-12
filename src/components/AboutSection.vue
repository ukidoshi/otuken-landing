<template>
  <section class="py-16 md:py-24 px-4 md:px-8" id="about">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A961]/30 bg-[#1B5B7F]/5 text-xs md:text-sm mb-4">
          <span class="w-2 h-2 rounded-full bg-[#C9A961]"></span>
          Этнокультурный комплекс • проект в стадии строительства
        </div>

        <h2 class="text-4xl md:text-5xl font-bold text-[#1B5B7F] mb-4">
          Что такое «Отукен»?
        </h2>

        <p class="text-center max-w-3xl mx-auto text-lg text-[#8B6F47] mb-10 leading-relaxed">
          «Отукен» — этнокультурный комплекс в Туве: место, где традиции живут не “в витрине”, а в событиях,
          инфраструктуре и туристических маршрутах. Это культурное ядро и понятная инвестиционная логика вокруг него.
        </p>
      </div>

      <!-- Key тезисы (быстрое понимание) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div class="rounded-2xl bg-white border border-[#C9A961]/15 shadow-sm p-6">
          <div class="text-2xl mb-3">🏛️</div>
          <div class="text-lg font-bold text-[#1B5B7F] mb-2">Культурное ядро</div>
          <p class="text-sm leading-relaxed opacity-85">
            Пространство, которое сохраняет и показывает традиции тувинского народа через современные форматы.
          </p>
        </div>

        <div class="rounded-2xl bg-white border border-[#C9A961]/15 shadow-sm p-6">
          <div class="text-2xl mb-3">🎭</div>
          <div class="text-lg font-bold text-[#1B5B7F] mb-2">События и туризм</div>
          <p class="text-sm leading-relaxed opacity-85">
            Фестивали, программы и мероприятия формируют поток гостей и делают комплекс “живым” круглый год.
          </p>
        </div>

        <div class="rounded-2xl bg-white border border-[#C9A961]/15 shadow-sm p-6">
          <div class="text-2xl mb-3">📈</div>
          <div class="text-lg font-bold text-[#1B5B7F] mb-2">Инвест-логика</div>
          <p class="text-sm leading-relaxed opacity-85">
            Рост привлекательности территории и инфраструктуры усиливает ценность проектов и участков вокруг комплекса.
          </p>
        </div>
      </div>

      <!-- Main block -->
      <div class="grid lg:grid-cols-2 gap-10 items-start">
        <!-- Left text -->
        <div>
          <h3 class="text-3xl font-bold text-[#1B5B7F] mb-4">
            Больше, чем просто недвижимость
          </h3>

          <p class="mb-4 leading-relaxed opacity-90">
            «Отукен» задуман как точка притяжения: культурные объекты, площадки для событий, сервисы для гостей и
            среда для отдыха. Проект развивается по очередям — от событийного “запуска” к расширению инфраструктуры.
          </p>

          <p class="mb-6 leading-relaxed opacity-90">
            Для посетителя это — место впечатлений и погружения в культуру. Для партнёров и инвесторов — понятная модель,
            где трафик рождается событиями, а удерживается комфортом и качественной инфраструктурой.
          </p>

          <!-- Compact bullet benefits -->
          <div class="space-y-4">
            <div class="flex gap-3">
              <div class="text-2xl flex-shrink-0">🌿</div>
              <div>
                <p class="leading-relaxed">
                  <strong>Локация и атмосфера:</strong> природа, этно-среда и уникальный культурный контекст региона.
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="text-2xl flex-shrink-0">🏘️</div>
              <div>
                <p class="leading-relaxed">
                  <strong>Инфраструктура:</strong> площадки для мероприятий, гостевые форматы, сервисы для отдыха и спорта.
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="text-2xl flex-shrink-0">🤝</div>
              <div>
                <p class="leading-relaxed">
                  <strong>Партнёрства:</strong> проект открыт к сотрудничеству — от событий до сервисов и совместных инициатив.
                </p>
              </div>
            </div>
          </div>

          <!-- Mini timeline (не перегружает) -->
          <div class="mt-8 rounded-2xl bg-[#FAFAF8] border border-[#C9A961]/15 p-6">
            <div class="text-sm font-semibold text-[#1B5B7F] mb-4">Как развивается проект</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="flex gap-3">
                <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9A961]"></div>
                <div>
                  <div class="font-semibold">Концепция</div>
                  <div class="text-sm opacity-80">смыслы, формат, модель</div>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9A961]"></div>
                <div>
                  <div class="font-semibold">События</div>
                  <div class="text-sm opacity-80">программы, фестивали</div>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9A961]"></div>
                <div>
                  <div class="font-semibold">Инфраструктура</div>
                  <div class="text-sm opacity-80">строительство и сервисы</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right “visual” card -->
        <div class="rounded-2xl bg-gradient-to-br from-[#1B5B7F] to-[#8B6F47] p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
          <div class="absolute inset-0 opacity-25 pointer-events-none">
            <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#C9A961] blur-3xl"></div>
            <div class="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          </div>

          <div class="relative z-10">
            <div class="text-sm uppercase tracking-widest text-white/80">Коротко и по делу</div>
            <div class="text-2xl md:text-3xl font-bold mt-2">
              «Отукен» — культура + инфраструктура + события
            </div>

            <p class="mt-4 text-white/90 leading-relaxed">
              Мы создаём место, куда хочется приехать. И среду, которая может развиваться и масштабироваться
              вместе с интересом к региону.
            </p>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <div class="rounded-xl bg-white/10 border border-white/15 p-4">
                <div class="text-[#C9A961] font-semibold text-sm">Фокус</div>
                <div class="text-sm mt-1 text-white/90">туризм и события</div>
              </div>
              <div class="rounded-xl bg-white/10 border border-white/15 p-4">
                <div class="text-[#C9A961] font-semibold text-sm">Формат</div>
                <div class="text-sm mt-1 text-white/90">по очередям</div>
              </div>
            </div>

            <div class="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                  @click="scrollTo('objects')"
                  class="bg-[#C9A961] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#B89A50] transition transform hover:-translate-y-1"
              >
                Посмотреть объекты
              </button>

              <button
                  @click="goAboutPage"
                  class="border-2 border-[#C9A961] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C9A961] hover:text-black transition"
              >
                Подробнее о проекте
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goAboutPage = () => router.push('/about')

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>