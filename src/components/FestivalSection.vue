<template>
  <section class="scroll-mt-24 md:scroll-mt-28 relative overflow-hidden py-20 md:py-28 px-4 md:px-8" id="festival">
    <div class="max-w-7xl mx-auto relative">
      <div class="theme-card-dark p-8 md:p-12 overflow-hidden">
        <div class="theme-grid-overlay opacity-40"></div>
        <div class="absolute -top-16 right-10 w-72 h-72 rounded-full bg-[rgba(184,138,66,0.18)] blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-16 left-0 w-72 h-72 rounded-full bg-[rgba(122,168,145,0.14)] blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
          <div>
            <div class="festival-badge">
              <span class="section-dot"></span>
              Первый этап реализации
            </div>

            <h2 class="display-font text-[2.9rem] md:text-[4.4rem] leading-none mt-5">
              Фестиваль «Мой род – моя гордость»
            </h2>

            <div class="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/12 text-[var(--bg-sand)] font-semibold text-lg">
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--gold)]"></span>
              21–28 июня
            </div>

            <p class="mt-6 text-white/84 leading-8 text-base md:text-lg">
              Первый событийный шаг проекта. Республиканский фестиваль посвящён сплочению представителей родовых групп Тувы
              и возрождению историко-культурного наследия через современные формы участия и встречи.
            </p>
          </div>

          <div class="grid gap-4">
            <div class="festival-panel p-6">
              <div class="festival-panel-title text-sm uppercase tracking-[0.24em] mb-3">Что создаёт фестиваль</div>
              <div class="grid sm:grid-cols-2 gap-3">
                <div class="festival-feature">
                  <div class="festival-feature-title">Аллея форм</div>
                  <div class="festival-feature-copy">Закладка малых архитектурных форм, отражающих историю и традиции родовых групп.</div>
                </div>
                <div class="festival-feature">
                  <div class="festival-feature-title">Традиционные ремёсла</div>
                  <div class="festival-feature-copy">Показ ремесленных практик и культурных элементов как живой части пространства.</div>
                </div>
                <div class="festival-feature">
                  <div class="festival-feature-title">Конные соревнования</div>
                  <div class="festival-feature-copy">Спортивная программа, укоренённая в традициях и природном характере региона.</div>
                </div>
                <div class="festival-feature">
                  <div class="festival-feature-title">Культурная программа</div>
                  <div class="festival-feature-copy">Событийный формат, который формирует первый устойчивый поток внимания к комплексу.</div>
                </div>
              </div>
            </div>

            <div class="festival-summary rounded-[1.75rem] px-6 py-5 leading-7">
              Фестиваль не только рассказывает о проекте, но и буквально запускает его территорию:
              знакомит с культурным смыслом, формирует привычку приезжать и показывает потенциал будущей среды в действии.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.festival-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.15rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(180deg, rgba(22, 31, 26, 0.72), rgba(22, 31, 26, 0.54)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.16), transparent 46%);
  color: rgba(255, 247, 234, 0.96);
  font-size: 0.88rem;
  font-weight: 700;
  box-shadow: 0 14px 28px rgba(10, 15, 12, 0.16);
  backdrop-filter: blur(12px);
  text-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
}

.festival-panel {
  border-radius: 1.85rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(27, 36, 31, 0.74), rgba(27, 36, 31, 0.58)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.16), transparent 42%);
  box-shadow: 0 18px 34px rgba(10, 15, 12, 0.16);
  backdrop-filter: blur(14px);
}

.festival-panel-title {
  color: rgba(255, 247, 234, 0.76);
}

.festival-feature {
  border-radius: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03)),
    radial-gradient(circle at top left, rgba(184, 138, 66, 0.08), transparent 42%);
  padding: 1rem;
}

.festival-feature-title {
  color: rgba(241, 222, 181, 0.98);
  font-weight: 700;
}

.festival-feature-copy {
  margin-top: 0.55rem;
  color: rgba(255, 247, 234, 0.9);
  font-size: 0.95rem;
  line-height: 1.7;
}

.festival-summary {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(180deg, rgba(22, 31, 26, 0.44), rgba(22, 31, 26, 0.28)),
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.05), transparent 42%);
  color: rgba(255, 250, 242, 0.92);
  box-shadow: 0 14px 26px rgba(10, 15, 12, 0.12);
  backdrop-filter: blur(10px);
}
</style>
