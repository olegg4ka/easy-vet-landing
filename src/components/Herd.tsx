import { useState } from 'react'
import { ClipboardList, Stethoscope, UserRound } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { LIFECYCLE } from '../data'
import { Eyebrow, H2, IconBox, Lead, Section, Spotlight, cx } from './ui'
import { Reveal } from './motion'

const ROLE_ICONS = [UserRound, Stethoscope, ClipboardList]

const ROLES = [
  ['Власник і керівник', 'Налаштовує господарство і його структуру, запрошує працівників поштою, бачить стан стада і виконання заходів, експортує документи.'],
  ['Ветеринарний лікар', 'Планує й виконує заходи, веде огляди, діагнози і лікування, стежить за каренцією.'],
  ['Зоотехнік', 'Реєструє тварин і бірка, переміщує між секціями, фіксує вибуття, переводить тварину в наступний тип після отелення.'],
] as const

export function Herd() {
  const [active, setActive] = useState(2)
  return (
    <Section id="herd">
      <Eyebrow>Стадо</Eyebrow>
      <H2>Від телички до корови — в одній картці</H2>
      <Lead>
        Тип тварини змінюється разом із нею: з телички в телицю система переводить сама у 180 днів, решту переходів
        фіксує зоотехнік. Оберіть етап.
      </Lead>

      <ol className="mt-10 grid gap-3 md:grid-cols-5 md:gap-0">
        {LIFECYCLE.map((s, idx) => {
          const on = idx === active
          const passed = idx < active
          return (
            <Reveal as="li" delay={idx * 0.1} key={s.id} className="relative">
              <button
                type="button"
                onClick={() => setActive(idx)}
                aria-current={on ? 'step' : undefined}
                className={cx(
                  'relative flex w-full cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 text-left transition-colors md:flex-col md:items-start md:rounded-none md:border-0 md:border-t-4 md:px-0 md:pr-4 md:pt-4',
                  on ? 'border-field bg-white md:bg-transparent' : 'border-line md:border-line',
                  passed && 'md:border-field-2',
                )}
              >
                {on && <motion.span layoutId="herd-bar" className="absolute inset-x-0 -top-1 hidden h-1 bg-tag md:block" />}
                <span className={cx('grid size-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold', on ? 'bg-tag text-ink' : passed ? 'bg-field-2 text-white' : 'bg-tint text-slate')}>
                  {s.id}
                </span>
                <span>
                  <span className="block font-display text-base font-bold leading-tight">{s.name}</span>
                  <span className="mt-1 block text-sm text-slate">{s.note}</span>
                </span>
              </button>
            </Reveal>
          )
        })}
      </ol>
      <Reveal delay={0.3} className="mt-6 min-h-[120px] rounded-2xl bg-tint p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            aria-live="polite"
          >
            <p className="font-display text-lg font-bold">{LIFECYCLE[active].name}</p>
            <p className="mt-2 max-w-[70ch] text-slate">{LIFECYCLE[active].text}</p>
          </motion.div>
        </AnimatePresence>
      </Reveal>

      <h3 className="mt-20 font-display text-xl font-bold">Кожен бачить свою частину роботи</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3 lg:gap-5">
        {ROLES.map(([title, text], idx) => {
          const Icon = ROLE_ICONS[idx]
          return (
            <Reveal as="article" delay={idx * 0.12} key={title}>
              <Spotlight className="p-6 md:p-7">
                <IconBox><Icon /></IconBox>
                <h4 className="mt-5 font-display text-lg font-bold leading-tight">{title}</h4>
                <p className="mt-3 text-slate">{text}</p>
              </Spotlight>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
