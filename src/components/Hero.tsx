import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { WavingCow } from './Cow'
import { ANIMALS, EVENT_TYPES } from '../data'
import { ButtonLink, Chip, Dot, Pill } from './ui'

function EarTag({ number }: { number: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className="relative flex h-[204px] w-[170px] flex-col items-center rounded-[85px_85px_28px_28px] bg-tag pt-[18px] shadow-[inset_0_-8px_0_var(--color-tag-dark)] drop-shadow-[0_18px_24px_rgba(22,33,26,.18)] md:h-[340px] md:w-[280px] md:rounded-[140px_140px_44px_44px] md:pt-8"
      style={{ transformOrigin: '50% 10%' }}
      initial={reduce ? false : { rotate: -28, y: -80, opacity: 0 }}
      animate={{ rotate: 9, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 6, mass: 1.2 }}
    >
      <span className="size-6 rounded-full bg-paper shadow-[inset_0_3px_0_rgba(0,0,0,.15)] md:size-10" />
      <span className="mt-3 font-display text-[22px] font-bold md:mt-7 md:text-[34px]">UA</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={number}
          className="mt-1.5 w-[9ch] text-center font-display text-base font-bold leading-[1.15] tracking-[0.02em] md:mt-2.5 md:text-[25px]"
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {number}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

function Fields() {
  // Пагорби з рядами посівів — аграрне тло під першим екраном
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 110 C 240 60 420 70 640 95 S 1100 140 1440 80 V180 H0Z" fill="#dfe9d4" />
      <path d="M0 140 C 300 100 560 110 820 130 S 1240 150 1440 120 V180 H0Z" fill="#c8dbb6" />
      <g stroke="#a9c592" strokeWidth="2" fill="none" opacity=".9">
        <path d="M0 160 C 300 128 560 138 820 152 S 1240 168 1440 146" />
        <path d="M0 172 C 300 146 560 152 820 164 S 1240 176 1440 160" />
      </g>
    </svg>
  )
}

/** Число, що «докручується» при першій появі на екрані */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, reduce, to])
  return <span ref={ref} className="tabular-nums">{v.toLocaleString('uk-UA')}</span>
}

const STATS = [
  { pre: 'до', n: 10000, label: 'голів у господарстві' },
  { pre: 'до', n: 50, label: 'користувачів' },
  { pre: '', n: 3, label: 'ролі в команді' },
]

const intro = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const } }),
}

export function Hero() {
  const [i, setI] = useState(0)
  const a = ANIMALS[i]
  const ref = useRef<HTMLElement>(null)
  // Паралакс: пагорби з корівкою відстають, бирка «спливає» вгору
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const hillsY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const tagY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section ref={ref} id="top" className="relative -mt-[72px] overflow-hidden pb-[150px] pt-[112px] md:pb-[250px] md:pt-[136px]">
      {/* тло: сітка крапок, що згасає до країв, і теплий відблиск бирки */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_75%_60%_at_25%_35%,#000_20%,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 right-[-8%] size-[560px] rounded-full bg-tag/20 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-12%] top-[30%] size-[420px] rounded-full bg-meadow/15 blur-[110px]" />
      <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 h-[140px] md:h-[180px]" style={{ y: hillsY }}>
        <Fields />
        <motion.div
          className="pointer-events-auto absolute bottom-[58px] right-4 w-[118px] md:bottom-[56px] md:left-[34%] md:right-auto md:w-[180px]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.9 }}
        >
          <WavingCow bubbleSide="left" />
        </motion.div>
      </motion.div>
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <motion.div style={{ y: textY }}>
          <motion.p variants={intro} initial="hidden" animate="show" custom={0} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/75 py-1.5 pl-2.5 pr-4 text-sm font-medium backdrop-blur">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-dew opacity-60 motion-safe:animate-ping" />
              <span className="relative size-2.5 rounded-full bg-dew" />
            </span>
            Відкрито набір пілотних господарств
          </motion.p>
          <motion.h1 variants={intro} initial="hidden" animate="show" custom={0.5} className="max-w-[15ch] font-display text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.07] tracking-[-0.03em] [text-wrap:wrap]">
            Кожна корова —{' '}
            <span className="relative inline-block whitespace-nowrap">
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-[-0.08em] bottom-[0.06em] h-[0.34em] origin-left rounded-[3px] bg-tag/80"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative">з біркою,</span>
            </span>{' '}
            історією і планом щеплень
          </motion.h1>
          <motion.p variants={intro} initial="hidden" animate="show" custom={1.5} className="mt-6 max-w-[52ch] text-[19px] text-slate">
            EasyVet замінює паперові журнали ферми. Тварини, бірка, огляди, лікування і каренція зберігаються в картці
            тварини, а заплановані ветеринарні заходи — у календарі з нагадуваннями.
          </motion.p>
          <motion.div variants={intro} initial="hidden" animate="show" custom={2.5} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink size="lg" href="#pilot" arrow>Подати заявку на пілот</ButtonLink>
            <ButtonLink size="lg" variant="ghost" href="#calendar">Подивитися, як це працює</ButtonLink>
          </motion.div>
          <motion.p variants={intro} initial="hidden" animate="show" custom={3.5} className="mt-5 max-w-[52ch] text-sm text-slate">
            Для господарств ВРХ: молочних, м'ясних, племінних. Працює в браузері на комп'ютері й телефоні.
          </motion.p>
          <motion.dl variants={intro} initial="hidden" animate="show" custom={4.5} className="mt-9 grid max-w-[540px] grid-cols-3 gap-4 border-t border-line pt-6">
            {STATS.map((x) => (
              <div key={x.label}>
                <dt className="sr-only">{x.label}</dt>
                <dd className="font-display text-[clamp(20px,2.2vw,28px)] font-bold leading-none tracking-[-0.02em]">
                  {x.pre && <span className="mr-1 text-[0.6em] font-medium text-slate">{x.pre}</span>}
                  <CountUp to={x.n} />
                </dd>
                <dd aria-hidden="true" className="mt-2 text-[13px] leading-snug text-slate">{x.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="relative mt-6 grid lg:mt-0 lg:block lg:min-h-[640px]">
          <motion.div style={{ y: tagY }} className="z-0 -mb-[52px] mr-2 justify-self-end lg:absolute lg:right-0 lg:top-0 lg:mb-0 lg:mr-0">
            <EarTag number={a.tag} />
          </motion.div>
          <motion.article
            initial={{ opacity: 0, y: 48, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Приклад картки тварини"
            className="relative z-10 w-full rounded-2xl border border-line bg-white/95 px-[22px] pb-[18px] pt-[22px] shadow-[0_30px_60px_-28px_rgba(22,33,26,.45)] backdrop-blur lg:absolute lg:bottom-0 lg:left-0 lg:w-[390px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                aria-live="polite"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate">{a.type}</p>
                    <h2 className="mt-0.5 font-display text-2xl font-bold leading-tight">{a.name}</h2>
                  </div>
                  <Pill tone={a.health.tone}>{a.health.label}</Pill>
                </div>
                <dl className="my-[18px] grid grid-cols-3 gap-3 border-y border-line py-3.5">
                  {[['Порода', a.breed], ['Вік', a.age], ['Локація', a.location]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[12.5px] text-slate">{k}</dt>
                      <dd className="mt-0.5 text-[14.5px] font-semibold leading-snug">{v}</dd>
                    </div>
                  ))}
                </dl>
                <ol className="grid gap-2.5">
                  {a.events.map((e) => (
                    <li key={e.title} className="grid grid-cols-[12px_1fr_auto] items-baseline gap-x-2.5 text-[14.5px]">
                      <Dot color={EVENT_TYPES[e.type].color} />
                      <b className="font-medium">{e.title}</b>
                      <time className="font-semibold tabular-nums">{e.date}</time>
                      <em className="col-[2/4] text-[13px] not-italic text-slate">{e.note}</em>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </AnimatePresence>
            <div className="mt-[18px] flex flex-wrap gap-2" role="group" aria-label="Обрати тварину">
              {ANIMALS.map((x, idx) => (
                <Chip key={x.name} pressed={idx === i} onClick={() => setI(idx)}>
                  {x.name}
                </Chip>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
