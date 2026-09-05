"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import WorkMedia from "./WorkMedia";
import WorkTimeline from "./WorkTimeline";

const formatTimecode = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `00:${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export default function Home() {
  const [activeWork, setActiveWork] = useState(0);
  const [isCutting, setIsCutting] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  const aboutRef = useRef<HTMLElement | null>(null);

  const handleTimelineProgress = useCallback(
    (progress: number, activeIndex: number) => {
      setTimelineProgress(progress);
      setActiveWork(activeIndex);
    },
    []
  );

  useEffect(() => {
    if (activeWork === 0) return;

    setIsCutting(true);

    const timer = window.setTimeout(() => {
      setIsCutting(false);
    }, 420);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeWork]);

  useEffect(() => {
    const element = aboutRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const currentTimecode = formatTimecode(timelineProgress * 68);

  return (
    <main className="amir-page min-h-screen bg-[#0b0b0b] text-[#f4f1ea]">
      {/* =========================================================
          HERO
          ========================================================= */}

      <section className="amir-hero relative flex min-h-screen flex-col overflow-hidden px-6 py-6 md:px-10 md:py-8">
        <header className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-[0.2em]">
            AMIR
          </div>

          <div className="text-xs uppercase tracking-[0.25em] text-white/50">
            Video · Photo · Edit
          </div>
        </header>

        <div className="flex flex-1 items-center">
          <div className="w-full">
            <p className="amir-kicker mb-6 text-xs uppercase tracking-[0.3em] text-[#d2e04a]">
              Video editor · Kazan
            </p>

            <div className="relative">
              <div className="amir-flash" />

              <h1 className="amir-title relative z-10 max-w-6xl text-[16vw] font-semibold leading-[0.8] tracking-[-0.07em] md:text-[12vw]">
                AMIR
              </h1>

              <div className="amir-image absolute right-[8%] top-1/2 z-20 h-[42vw] max-h-[520px] w-[30vw] max-w-[380px] -translate-y-1/2 overflow-hidden rounded-[2rem]">
                <div className="amir-photo-frame absolute inset-0">
                  <img
                    src="/images/hero.jpg"
                    alt="Amir"
                    className="amir-photo h-full w-full object-cover"
                  />
                </div>

                <div className="amir-overlay absolute inset-0">
                  <div className="amir-play-button">▶</div>

                  <p className="mt-5 text-xs tracking-[0.35em] text-white/80">
                    WATCH REEL
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6 md:ml-[18vw] md:flex-row md:items-end">
              <p className="amir-copy max-w-md text-lg leading-relaxed text-white/55 md:text-xl">
                Создаю визуальные истории
                <br />
                через видео, кадр и монтаж.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/30">
            <span>00:00:00</span>
            <span>AMIR_REEL_01</span>
            <span>00:00:24</span>
          </div>

          <div className="amir-timeline relative h-px bg-white/15">
            <div className="amir-playhead absolute left-[18%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#d2e04a] shadow-[0_0_20px_rgba(168,50,70,0.8)]" />

            <div className="amir-playhead-line absolute left-[18%] top-1/2 h-8 w-px -translate-y-1/2 bg-[#d2e04a]" />
          </div>

          <div className="mt-3 flex justify-between font-mono text-[9px] text-white/20">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
            <span>05</span>
            <span>06</span>
            <span>07</span>
            <span>08</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          SELECTED WORKS
          ========================================================= */}

      <section className="amir-works relative px-6 py-32 md:px-10 md:py-44">
        <div className="mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d2e04a]">
              01 / Избранные работы
            </p>

            <h2 className="max-w-4xl text-6xl font-medium leading-[0.9] tracking-[-0.06em] md:text-8xl">
              Кадры
              <br />
              в движении.
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-white/35">
            Несколько визуальных историй,
            <br />
            собранных через кадр, ритм
            <br />и монтаж.
          </p>
        </div>

        <div
          className={`amir-work-timeline ${
            isCutting ? "is-cutting" : ""
          }`}
        >
          <WorkTimeline onProgressChange={handleTimelineProgress} />

          <div className="amir-work-line" />

          {/* WORK 01 */}

          <article
            className={`amir-work-item amir-work-01 group relative grid gap-8 py-20 md:grid-cols-[120px_1fr_180px] md:items-center ${
              activeWork === 0 ? "is-active" : ""
            }`}
          >
            <div className="relative z-20">
              <span className="font-mono text-xs text-[#d2e04a]">01</span>

              <div className="mt-3 font-mono text-[9px] text-white/25">
                {activeWork === 0 ? currentTimecode : "00:00:13"}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] md:w-[84%]">
              <div className="amir-work-image aspect-[16/9]">
                <WorkMedia
                  poster="/images/hero.jpg"
                  video="/videos/work-01.mp4"
                  alt="Commercial project"
                  isActive={activeWork === 0}
                />

                <div className="amir-work-frame-ui">
                  <span className="amir-frame-corner amir-frame-tl" />
                  <span className="amir-frame-corner amir-frame-tr" />
                  <span className="amir-frame-corner amir-frame-bl" />
                  <span className="amir-frame-corner amir-frame-br" />

                  <span className="amir-scan-line" />

                  <span className="amir-frame-timecode">
                    00:00:13:08
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 z-30">
                <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                  CUT / 01
                </div>

                <div className="absolute left-5 top-5 font-mono text-[9px] tracking-widest text-white/50">
                  REC · 001
                </div>

                {activeWork === 0 && (
                  <div className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#d2e04a]">
                    <span className="amir-playing-dot" />
                    PLAYING
                  </div>
                )}
              </div>
            </div>

            <div className="amir-work-copy relative z-20">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                Commercial
              </p>

              <h3 className="mt-3 text-2xl tracking-tight">
                Motion / Product
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/35">
                Ритмичный монтаж
                <br />
                с акцентом на движение.
              </p>
            </div>
          </article>

          {/* WORK 02 */}

          <article
            className={`amir-work-item amir-work-02 group relative grid gap-8 py-20 md:grid-cols-[120px_1fr_180px] md:items-center ${
              activeWork === 1 ? "is-active" : ""
            }`}
          >
            <div className="relative z-20">
              <span className="font-mono text-xs text-[#d2e04a]">02</span>

              <div className="mt-3 font-mono text-[9px] text-white/25">
                {activeWork === 1 ? currentTimecode : "00:00:21"}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] md:ml-[10%] md:w-[min(30vw,460px)]">
              <div className="amir-work-image aspect-[9/16]">
                <WorkMedia
                  poster="/images/hero.jpg"
                  video="/videos/work-02.mp4"
                  alt="Social media project"
                  isActive={activeWork === 1}
                />

                <div className="amir-work-frame-ui">
                  <span className="amir-frame-corner amir-frame-tl" />
                  <span className="amir-frame-corner amir-frame-tr" />
                  <span className="amir-frame-corner amir-frame-bl" />
                  <span className="amir-frame-corner amir-frame-br" />

                  <span className="amir-scan-line" />

                  <span className="amir-frame-timecode">
                    00:00:21:16
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 z-30">
                <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                  CUT / 02
                </div>

                <div className="absolute left-5 top-5 font-mono text-[9px] tracking-widest text-white/50">
                  REC · 002
                </div>

                {activeWork === 1 && (
                  <div className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#d2e04a]">
                    <span className="amir-playing-dot" />
                    PLAYING
                  </div>
                )}
              </div>
            </div>

            <div className="amir-work-copy relative z-20">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                Social
              </p>

              <h3 className="mt-3 text-2xl tracking-tight">
                Vertical / Reels
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/35">
                Быстрый формат
                <br />
                для социальных сетей.
              </p>
            </div>
          </article>

          {/* WORK 03 */}

          <article
            className={`amir-work-item amir-work-03 group relative grid gap-8 py-20 md:grid-cols-[120px_1fr_180px] md:items-center ${
              activeWork === 2 ? "is-active" : ""
            }`}
          >
            <div className="relative z-20">
              <span className="font-mono text-xs text-[#d2e04a]">03</span>

              <div className="mt-3 font-mono text-[9px] text-white/25">
                {activeWork === 2 ? currentTimecode : "00:00:34"}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] md:ml-auto md:w-[84%]">
              <div className="amir-work-image aspect-[16/9]">
                <WorkMedia
                  poster="/images/hero.jpg"
                  video="/videos/work-03.mp4"
                  alt="Editorial project"
                  isActive={activeWork === 2}
                />

                <div className="amir-work-frame-ui">
                  <span className="amir-frame-corner amir-frame-tl" />
                  <span className="amir-frame-corner amir-frame-tr" />
                  <span className="amir-frame-corner amir-frame-bl" />
                  <span className="amir-frame-corner amir-frame-br" />

                  <span className="amir-scan-line" />

                  <span className="amir-frame-timecode">
                    00:00:34:04
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 z-30">
                <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                  CUT / 03
                </div>

                <div className="absolute left-5 top-5 font-mono text-[9px] tracking-widest text-white/50">
                  REC · 003
                </div>

                {activeWork === 2 && (
                  <div className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#d2e04a]">
                    <span className="amir-playing-dot" />
                    PLAYING
                  </div>
                )}
              </div>
            </div>

            <div className="amir-work-copy relative z-20">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                Editorial
              </p>

              <h3 className="mt-3 text-2xl tracking-tight">
                Atmosphere / Cut
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/35">
                Медленный ритм,
                <br />
                свет и атмосфера.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-16 border-t border-white/10 pt-5">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/20">
            <span>00:00:00</span>
            <span>EDIT_SEQUENCE_01</span>
            <span>00:01:08</span>
          </div>

          <div className="relative mt-4 h-8 border-y border-white/10">
            <div className="absolute inset-y-0 left-[17%] w-px bg-[#d2e04a]" />
            <div className="absolute inset-y-0 left-[46%] w-px bg-white/10" />
            <div className="absolute inset-y-0 left-[73%] w-px bg-white/10" />

            <div className="absolute left-[17%] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d2e04a]" />
          </div>
        </div>
      </section>

      {/* =========================================================
          BEHIND THE CUT
          ========================================================= */}

      <section
        ref={aboutRef}
        className={`amir-about relative overflow-hidden px-6 py-32 md:px-10 md:py-52 ${
          isAboutVisible ? "is-visible" : ""
        }`}
      >
        <div className="amir-about-grid">
          <div className="amir-about-heading">
            <p className="amir-about-kicker font-mono text-[10px] uppercase tracking-[0.3em] text-[#d2e04a]">
              02 / За монтажом
            </p>

            <h2 className="amir-about-title mt-8 text-[18vw] font-medium leading-[0.78] tracking-[-0.075em] md:text-[11vw]">
              <span>BEHIND</span>
              <span>THE CUT.</span>
            </h2>
          </div>

          <div className="amir-about-content">
            <div className="amir-about-intro">
              <p className="text-xl leading-relaxed text-white/65 md:text-2xl">
                Хороший монтаж не просто соединяет кадры.
                Он задаёт ритм, удерживает внимание и помогает
                истории звучать точнее.
              </p>

              <div className="mt-8 h-px w-16 bg-[#d2e04a]" />
            </div>

            <div className="amir-about-track mt-20">
              <div className="amir-about-track-line" />

              {/* FRAME */}

              <div className="amir-about-step amir-about-step--frame">
                <span className="amir-about-step-number">01</span>

                <div>
                  <p className="amir-about-step-title">FRAME</p>

                  <p className="amir-about-step-copy">
                    Найти кадр, который работает сам по себе.
                  </p>
                </div>
              </div>

              {/* CUT */}

              <div className="amir-about-step amir-about-step--cut">
                <span className="amir-about-step-number">02</span>

                <div>
                  <p className="amir-about-step-title" aria-label="CUT">
                    <span className="amir-cut-word">
                      <span className="amir-cut-top">CUT</span>
                      <span className="amir-cut-bottom">CUT</span>
                    </span>
                  </p>

                  <p className="amir-about-step-copy">
                    Убрать всё лишнее и оставить движение.
                  </p>
                </div>
              </div>

              {/* COLOR */}

              <div className="amir-about-step amir-about-step--color">
                <span className="amir-about-step-number">03</span>

                <div>
                  <p className="amir-about-step-title" data-text="COLOR">
                    COLOR
                  </p>

                  <p className="amir-about-step-copy">
                    Собрать настроение через свет и цвет.
                  </p>
                </div>
              </div>

              {/* STORY */}

              <div className="amir-about-step amir-about-step--story">
                <span className="amir-about-step-number">04</span>

                <div>
                  <p
                    className="amir-about-step-title amir-story-word"
                    aria-label="STORY"
                  >
                    <span>S</span>
                    <span>T</span>
                    <span>O</span>
                    <span>R</span>
                    <span>Y</span>
                  </p>

                  <p className="amir-about-step-copy">
                    Оставить после просмотра главное.
                  </p>
                </div>
              </div>
            </div>

            <div className="amir-about-words">
              <span>FRAME</span>
              <span>RHYTHM</span>
              <span>MOTION</span>
              <span>STORY</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT AMIR
          ========================================================= */}

      <section className="amir-profile relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
        <div className="amir-profile-grid">
          <div className="amir-profile-media">
            <div className="amir-profile-image-wrap">
              <img
                src="/images/hero.jpg"
                alt="Amir — placeholder portrait"
                className="amir-profile-image"
              />
              <div className="amir-profile-image-ui">
                <span>PORTRAIT_001</span>
                <span>01:24:08:12</span>
              </div>
              <div className="amir-profile-scan" />
            </div>
            <p className="amir-profile-caption">ФОТО / ВРЕМЕННЫЙ КАДР — ЗАМЕНИТЬ НА ФОТО АМИРА</p>
          </div>

          <div className="amir-profile-copy">
            <p className="amir-section-kicker">03 / Об Амире</p>
            <h2 className="amir-profile-title">
              <span>СНИМАЮ.</span>
              <span>МОНТИРУЮ.</span>
              <span>ИЩУ</span>
              <span>ТОТ САМЫЙ КАДР.</span>
            </h2>
            <div className="amir-profile-story">
              <p>
                Всё началось с фотографии. Амир привык сначала искать один точный кадр —
                свет, выражение, движение, деталь. Со временем одного кадра стало мало.
              </p>
              <p>
                В видео он нашёл продолжение этой идеи: собрать отдельные моменты в ритм,
                который ощущается ещё до того, как его начинаешь замечать.
              </p>
              <p>
                Сейчас он работает на стыке съёмки и монтажа — от коротких вертикальных
                роликов до визуальных историй, где важны атмосфера, музыка и темп.
              </p>
            </div>
            <div className="amir-profile-meta">
              <span>KAZAN, RUSSIA</span>
              <span>VIDEO / PHOTO / EDIT</span>
              <span>AVAILABLE FOR PROJECTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE JOURNEY
          ========================================================= */}

      <section className="amir-journey relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
        <div className="amir-journey-head">
          <div>
            <p className="amir-section-kicker">04 / Как я пришёл к монтажу</p>
            <h2 className="amir-journey-title">ОТ КАДРА<br />К ДВИЖЕНИЮ.</h2>
          </div>
          <p className="amir-journey-lead">
            Не линейная карьера, а несколько шагов, которые постепенно привели к одному:
            рассказывать историю через движение.
          </p>
        </div>

        <div className="amir-journey-line">
          <div className="amir-journey-progress" />
          <div className="amir-journey-year amir-journey-year-1"><span>2019</span><b /></div>
          <div className="amir-journey-year amir-journey-year-2"><span>2022</span><b /></div>
          <div className="amir-journey-year amir-journey-year-3"><span>2024</span><b /></div>
          <div className="amir-journey-year amir-journey-year-4"><span>2026</span><b /></div>
        </div>

        <div className="amir-journey-grid">
          <article>
            <span>01 / PHOTO</span>
            <h3>Учился видеть кадр.</h3>
            <p>Свет, композиция, люди и привычка замечать детали, которые обычно проходят мимо.</p>
          </article>
          <article>
            <span>02 / VIDEO</span>
            <h3>Кадр получил движение.</h3>
            <p>Фотография постепенно превратилась в желание рассказывать историю не одним моментом, а последовательностью.</p>
          </article>
          <article>
            <span>03 / EDIT</span>
            <h3>Появился ритм.</h3>
            <p>Монтаж стал главным инструментом: убрать лишнее, почувствовать музыку и оставить только работающее.</p>
          </article>
          <article>
            <span>04 / NOW</span>
            <h3>Собираю чужие идеи.</h3>
            <p>Работаю с материалом так, чтобы готовый ролик выглядел цельно — от первого кадра до последней секунды.</p>
          </article>
        </div>
      </section>

      {/* =========================================================
          SERVICES
          ========================================================= */}

      <section className="amir-services relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
        <div className="amir-services-head">
          <div>
            <p className="amir-section-kicker">05 / Чем занимаюсь</p>
            <h2 className="amir-services-title">ЧТО<br />Я ДЕЛАЮ.</h2>
          </div>
          <p className="amir-services-lead">Можно начать с пары сообщений и исходников. Дальше разберёмся с задачей, найдём ритм и соберём ролик, который не хочется пролистать.</p>
        </div>

        <div className="amir-services-list">
          <div className="amir-service-item">
            <span className="amir-service-index">01</span>
            <div><h3>КОРОТКИЕ ВИДЕО</h3><p>Reels · Shorts · вертикальный формат</p></div>
            <span className="amir-service-arrow">↗</span>
          </div>
          <div className="amir-service-item">
            <span className="amir-service-index">02</span>
            <div><h3>МОНТАЖ</h3><p>Ритм · склейки · звук · цвет</p></div>
            <span className="amir-service-arrow">↗</span>
          </div>
          <div className="amir-service-item">
            <span className="amir-service-index">03</span>
            <div><h3>ВИЗУАЛ</h3><p>Движение · атмосфера · подача</p></div>
            <span className="amir-service-arrow">↗</span>
          </div>
          <div className="amir-service-item">
            <span className="amir-service-index">04</span>
            <div><h3>ФОТО</h3><p>Портреты · лайфстайл · контент</p></div>
            <span className="amir-service-arrow">↗</span>
          </div>
        </div>
      </section>

      {/* =========================================================
    CONTACT / НАЧАТЬ ПРОЕКТ
    ========================================================= */}

<section className="amir-contact relative overflow-hidden px-6 py-32 md:px-10 md:py-44">
  <div className="amir-contact-grid">
    <div className="amir-contact-heading">
      <p className="amir-contact-kicker font-mono text-[10px] uppercase tracking-[0.3em] text-[#d2e04a]">
        06 / Начнём проект
      </p>

      <h2 className="amir-contact-title mt-8">
        <span>ЕСТЬ ИДЕЯ?</span>
        <span>ДАВАЙТЕ</span>
        <span>СОБЕРЁМ ЕЁ.</span>
      </h2>
    </div>

    <div className="amir-contact-side">
      <p className="amir-contact-copy">
        Есть идея, проект или просто материал,
        которому нужен правильный ритм?
      </p>

      <a
        href="mailto:nkoshkinweb@gmail.com"
        className="amir-project-button"
      >
        <span className="amir-project-button-line" />

        <span className="amir-project-button-index">
          03
        </span>

        <span className="amir-project-button-text">
          НАЧАТЬ ПРОЕКТ
        </span>

        <span className="amir-project-button-arrow">
          ↗
        </span>
      </a>

      <div className="amir-contact-details">
        <a href="mailto:nkoshkinweb@gmail.com">
          nkoshkinweb@gmail.com
        </a>

        <span>Kazan · Russia</span>
      </div>
    </div>
  </div>

  <div className="amir-contact-timeline">
    <div className="amir-contact-time">
      <span>00:00:00</span>
      <span>FINAL_SEQUENCE</span>
      <span>00:00:24</span>
    </div>

    <div className="amir-contact-track">
      <div className="amir-contact-track-line" />

      <div className="amir-contact-marker amir-contact-marker-1">
        <span />
        <small>FRAME</small>
      </div>

      <div className="amir-contact-marker amir-contact-marker-2">
        <span />
        <small>CUT</small>
      </div>

      <div className="amir-contact-marker amir-contact-marker-3">
        <span />
        <small>COLOR</small>
      </div>

      <div className="amir-contact-marker amir-contact-marker-4">
        <span />
        <small>YOUR STORY</small>
      </div>

      <div className="amir-contact-playhead">
        <span />
      </div>
    </div>
  </div>
</section>

{/* =========================================================
    FOOTER
    ========================================================= */}

<footer className="amir-footer px-6 py-8 md:px-10">
  <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-lg font-semibold tracking-[0.2em]">
        AMIR
      </p>

      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
        Video · Photo · Edit
      </p>
    </div>

    <div className="flex flex-col gap-2 text-sm text-white/35 md:items-end">
      <a
        href="mailto:nkoshkinweb@gmail.com"
        className="transition-colors duration-300 hover:text-[#d2e04a]"
      >
        nkoshkinweb@gmail.com
      </a>

      <span>© 2026 AMIR</span>
    </div>
  </div>
</footer>

      {/* =========================================================
          STEP ANIMATIONS
          ========================================================= */}

      <style jsx global>{`
        /* =====================================================
           BASE
           ===================================================== */

        .amir-about-step-title {
          position: relative !important;
          display: inline-block !important;
          margin: 0 !important;
        }

        /* =====================================================
           FRAME
           Рамка вплотную вокруг слова.
           ===================================================== */

        .amir-about-step--frame .amir-about-step-title {
          padding: 0 !important;
        }

        .amir-about-step--frame .amir-about-step-title::before {
          content: "" !important;
          position: absolute !important;

          top: -5px !important;
          right: -8px !important;
          bottom: -5px !important;
          left: -8px !important;

          border: 1px solid #d2e04a !important;

          opacity: 0 !important;
          transform: scale(0.82) !important;

          transition:
            opacity 180ms ease,
            transform 360ms cubic-bezier(0.16, 1, 0.3, 1) !important;

          pointer-events: none !important;
        }

        .amir-about-step--frame:hover .amir-about-step-title::before {
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        /* =====================================================
           CUT
           Реально разрезаем слово на верхнюю и нижнюю часть.
           ===================================================== */

        .amir-about-step--cut .amir-about-step-title {
          width: 1.8em !important;
          height: 1em !important;
          overflow: visible !important;
        }

        .amir-cut-word {
          position: relative !important;
          display: block !important;

          width: 100% !important;
          height: 1em !important;

          color: transparent !important;
        }

        .amir-cut-top,
        .amir-cut-bottom {
          position: absolute !important;

          left: 0 !important;
          top: 0 !important;

          width: 100% !important;

          display: block !important;

          color: #d2e04a !important;

          font: inherit !important;
          line-height: 1 !important;
          letter-spacing: inherit !important;

          pointer-events: none !important;

          will-change: transform !important;

          transition:
            transform 360ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .amir-cut-top {
          clip-path: inset(0 0 50% 0) !important;
        }

        .amir-cut-bottom {
          clip-path: inset(50% 0 0 0) !important;
        }

        /* Разрез */

        .amir-about-step--cut .amir-about-step-title::after {
          content: "" !important;

          position: absolute !important;

          left: -12px !important;
          right: -12px !important;
          top: 50% !important;

          height: 1px !important;

          background: #d2e04a !important;

          transform: scaleX(0) !important;
          transform-origin: center !important;

          transition:
            transform 220ms cubic-bezier(0.16, 1, 0.3, 1) !important;

          pointer-events: none !important;
        }

        .amir-about-step--cut:hover .amir-cut-top {
          transform: translateY(-8px) !important;
        }

        .amir-about-step--cut:hover .amir-cut-bottom {
          transform: translateY(8px) !important;
        }

        .amir-about-step--cut:hover .amir-about-step-title::after {
          transform: scaleX(1) !important;
        }

        /* =====================================================
           COLOR
           RGB / chromatic aberration.
           ===================================================== */

        .amir-about-step--color .amir-about-step-title {
          position: relative !important;
          isolation: isolate !important;
        }

        .amir-about-step--color .amir-about-step-title::before,
        .amir-about-step--color .amir-about-step-title::after {
          content: attr(data-text) !important;

          position: absolute !important;
          inset: 0 !important;

          display: block !important;

          font: inherit !important;
          line-height: inherit !important;
          letter-spacing: inherit !important;

          pointer-events: none !important;

          opacity: 0 !important;
        }

        .amir-about-step--color .amir-about-step-title::before {
          color: #ff304f !important;
        }

        .amir-about-step--color .amir-about-step-title::after {
          color: #3d9cff !important;
        }

        .amir-about-step--color:hover .amir-about-step-title {
          animation: amirColorMain 420ms steps(3) both !important;
        }

        .amir-about-step--color:hover .amir-about-step-title::before {
          opacity: 0.75 !important;
          animation: amirColorRed 420ms steps(3) both !important;
        }

        .amir-about-step--color:hover .amir-about-step-title::after {
          opacity: 0.75 !important;
          animation: amirColorBlue 420ms steps(3) both !important;
        }

        @keyframes amirColorMain {
          0% {
            transform: translateX(0);
          }

          30% {
            transform: translateX(-2px);
          }

          60% {
            transform: translateX(2px);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes amirColorRed {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0;
          }

          30% {
            transform: translateX(-5px);
            opacity: 0.8;
          }

          60% {
            transform: translateX(-2px);
            opacity: 0.45;
          }
        }

        @keyframes amirColorBlue {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0;
          }

          30% {
            transform: translateX(5px);
            opacity: 0.8;
          }

          60% {
            transform: translateX(2px);
            opacity: 0.45;
          }
        }

        /* =====================================================
           STORY
           Каждая буква имеет собственную траекторию.
           ===================================================== */

        .amir-about-step--story .amir-story-word {
          display: inline-flex !important;
          width: fit-content !important;
          height: 1em !important;
          overflow: visible !important;
        }

        .amir-about-step--story .amir-story-word > span {
          display: inline-block !important;

          position: relative !important;

          font: inherit !important;
          line-height: 1 !important;

          will-change: transform, opacity !important;

          transform-origin: center center !important;
        }

        .amir-about-step--story:hover .amir-story-word > span:nth-child(1) {
          animation: amirStoryS 800ms cubic-bezier(0.16, 1, 0.3, 1) both !important;
        }

        .amir-about-step--story:hover .amir-story-word > span:nth-child(2) {
          animation: amirStoryT 800ms 35ms cubic-bezier(0.16, 1, 0.3, 1) both !important;
        }

        .amir-about-step--story:hover .amir-story-word > span:nth-child(3) {
          animation: amirStoryO 800ms 70ms cubic-bezier(0.16, 1, 0.3, 1) both !important;
        }

        .amir-about-step--story:hover .amir-story-word > span:nth-child(4) {
          animation: amirStoryR 800ms 105ms cubic-bezier(0.16, 1, 0.3, 1) both !important;
        }

        .amir-about-step--story:hover .amir-story-word > span:nth-child(5) {
          animation: amirStoryY 800ms 140ms cubic-bezier(0.16, 1, 0.3, 1) both !important;
        }

        @keyframes amirStoryS {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }

          25% {
            transform: translate(-18px, -13px) rotate(-16deg);
            opacity: 0.55;
          }

          55% {
            transform: translate(-24px, 7px) rotate(-22deg);
            opacity: 0.8;
          }

          78% {
            transform: translate(5px, -3px) rotate(4deg);
            opacity: 1;
          }

          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes amirStoryT {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }

          25% {
            transform: translate(-2px, -21px) rotate(9deg);
            opacity: 0.55;
          }

          55% {
            transform: translate(5px, -28px) rotate(14deg);
            opacity: 0.8;
          }

          78% {
            transform: translate(-2px, 4px) rotate(-3deg);
            opacity: 1;
          }

          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes amirStoryO {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }

          25% {
            transform: translate(2px, 18px) scale(0.88) rotate(-9deg);
            opacity: 0.5;
          }

          55% {
            transform: translate(6px, 28px) scale(0.78) rotate(-17deg);
            opacity: 0.8;
          }

          78% {
            transform: translate(-2px, -4px) scale(1.04) rotate(3deg);
            opacity: 1;
          }

          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes amirStoryR {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }

          25% {
            transform: translate(18px, -14px) rotate(15deg);
            opacity: 0.55;
          }

          55% {
            transform: translate(27px, -3px) rotate(22deg);
            opacity: 0.8;
          }

          78% {
            transform: translate(-4px, 3px) rotate(-4deg);
            opacity: 1;
          }

          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes amirStoryY {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }

          25% {
            transform: translate(21px, 16px) rotate(17deg);
            opacity: 0.5;
          }

          55% {
            transform: translate(31px, 24px) rotate(25deg);
            opacity: 0.8;
          }

          78% {
            transform: translate(-4px, -3px) rotate(-4deg);
            opacity: 1;
          }

          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
        }

        /* =====================================================
           REDUCED MOTION
           ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .amir-about-step--frame .amir-about-step-title::before,
          .amir-about-step--cut .amir-cut-top,
          .amir-about-step--cut .amir-cut-bottom,
          .amir-about-step--cut .amir-about-step-title::after,
          .amir-about-step--color .amir-about-step-title,
          .amir-about-step--color .amir-about-step-title::before,
          .amir-about-step--color .amir-about-step-title::after,
          .amir-about-step--story .amir-story-word > span {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}