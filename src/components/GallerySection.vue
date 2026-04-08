<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="gallery">
    <div class="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(184,138,66,0.12),transparent_72%)] pointer-events-none"></div>
    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-12">
        <div class="section-badge mx-auto">
          <span class="section-dot"></span>
          Атмосфера пространства
        </div>
        <h2 class="section-title mt-5 mb-5">Территория комплекса</h2>
        <p class="section-lead">
          Рендеры и виды, которые помогают почувствовать архитектуру, масштаб и характер будущего этнокультурного комплекса.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[240px] xl:auto-rows-[250px] gap-4">
        <article
            v-for="item in galleryItems"
            :key="item.title"
            class="group relative overflow-hidden rounded-[1.9rem] border border-[rgba(184,138,66,0.16)] shadow-[0_20px_42px_rgba(56,42,19,0.12)]"
            :class="item.layout"
        >
          <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition duration-700 group-hover:scale-[1.06]"
              loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[rgba(7,10,8,0.9)] via-[rgba(7,10,8,0.34)] to-[rgba(7,10,8,0.06)]"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,138,66,0.22),transparent_34%),linear-gradient(135deg,rgba(184,138,66,0.14),transparent_34%)]"></div>

          <div class="absolute left-5 right-5 bottom-5">
            <div :class="['gallery-copy', item.compact ? 'gallery-copy--compact' : 'gallery-copy--feature']">
              <div class="gallery-eyebrow">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"></span>
                {{ item.eyebrow }}
              </div>
              <div
                  :class="[
                    'gallery-copy-title display-font text-white leading-none mt-3',
                    item.compact ? 'text-[2.3rem] md:text-[2.65rem]' : 'text-3xl md:text-4xl'
                  ]"
              >
                {{ item.title }}
              </div>
              <p
                  :class="[
                    'gallery-copy-text mt-2 leading-6',
                    item.compact ? 'text-sm md:text-[0.98rem] max-w-none line-clamp-3' : 'text-sm md:text-base max-w-md line-clamp-3 md:line-clamp-none'
                  ]"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import overview from '../assets/hero/overview.jpeg'
import alley1 from '../assets/objects/alley/1.jpeg'
import alley5 from '../assets/objects/alley/5.jpeg'
import hotel1 from '../assets/objects/hotel/1.jpeg'
import s4 from '../assets/hero/4.jpeg'
import s13 from '../assets/hero/13.jpeg'

const galleryItems = [
  {
    title: 'Общий план',
    eyebrow: 'Масштаб',
    description: 'Вид сверху на структуру кварталов, общественные зоны и общую организацию территории.',
    image: overview,
    layout: 'lg:col-span-7 lg:row-span-2',
    compact: false
  },
  {
    title: 'Аллея родовых групп Тувы',
    eyebrow: 'Культура',
    description: 'Смысловое ядро комплекса с этнокультурной символикой и пространством для церемоний.',
    image: alley1,
    layout: 'lg:col-span-5',
    compact: true
  },
  {
    title: 'Гостевой контур',
    eyebrow: 'Гостеприимство',
    description: 'Архитектура размещения для туристов и участников событийной программы.',
    image: hotel1,
    layout: 'lg:col-span-5',
    compact: true
  },
  {
    title: 'Пешеходная среда',
    eyebrow: 'Маршруты',
    description: 'Спокойные пространства для прогулок, встреч и визуального знакомства с территорией.',
    image: alley5,
    layout: 'lg:col-span-4',
    compact: true
  },
  {
    title: 'Общественные зоны',
    eyebrow: 'Отдых',
    description: 'Открытые сценарии для семейного отдыха, занятий спортом и пребывания гостей.',
    image: s4,
    layout: 'lg:col-span-4',
    compact: true
  },
  {
    title: 'Входная группа',
    eyebrow: 'Первое впечатление',
    description: 'Архитектурный акцент, который сразу задаёт идентичность и статус пространства.',
    image: s13,
    layout: 'lg:col-span-4',
    compact: true
  }
]
</script>

<style scoped>
.gallery-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background:
    linear-gradient(180deg, rgba(11, 14, 11, 0.82), rgba(11, 14, 11, 0.68)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.18), transparent 42%);
  color: rgba(255, 247, 234, 0.96);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(12px);
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.24);
}

.gallery-copy {
  padding: 1rem 1rem 0.9rem;
  border-radius: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(10, 13, 10, 0.62), rgba(10, 13, 10, 0.38)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.16), transparent 42%);
  backdrop-filter: blur(14px);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.16);
}

.gallery-copy--feature {
  max-width: min(100%, 26rem);
}

.gallery-copy--compact {
  width: min(100%, 100%);
  max-width: none;
  padding: 0.95rem 1rem 0.95rem;
}

.gallery-copy-title {
  color: rgba(255, 251, 244, 0.98);
  text-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);
}

.gallery-copy-text {
  color: rgba(255, 247, 236, 0.92);
  font-weight: 500;
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.38);
}

@media (max-width: 640px) {
  .gallery-copy {
    padding: 0.9rem 0.9rem 0.8rem;
    border-radius: 1.2rem;
  }

  .gallery-copy--compact,
  .gallery-copy--feature {
    max-width: 100%;
  }
}
</style>
