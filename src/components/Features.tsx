import { CalendarCheck, FileText, ListChecks, Stethoscope } from 'lucide-react'
import { motion } from 'motion/react'
import { EVENT_TYPES, WEEK_EVENTS } from '../data'
import { Eyebrow, H2, IconBox, Lead, Pill, Section, Spotlight, cx } from './ui'
import { Reveal } from './motion'

const ROWS = [
  ['UA 1234 5678 90', 'Корова-первістка', 'ok', 'здорова'],
  ['UA 1234 5678 91', 'Нетель', 'warn', 'на обстеженні'],
  ['UA 1234 5678 92', 'Повновікова корова', 'bad', 'на карантині'],
] as const

const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд']
const ease = [0.22, 1, 0.36, 1] as const

function TileHead({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <IconBox>{icon}</IconBox>
      <h3 className="mt-5 font-display text-xl font-bold leading-tight">{title}</h3>
      <p className="mt-3 text-slate">{children}</p>
    </div>
  )
}

/** Мініатюра тижня: кольорові смужки заходів по днях */
function MiniWeek() {
  return (
    <div className="mt-6 grid grid-cols-7 gap-1.5" aria-hidden="true">
      {DAYS.map((d, i) => (
        <div key={d} className="grid gap-1">
          <span className="text-center text-[11px] text-slate">{d}</span>
          <div className="flex h-[68px] flex-col gap-1 rounded-md bg-paper p-1">
            {WEEK_EVENTS.filter((e) => e.day === i).map((e, k) => (
              <motion.span
                key={e.title + k}
                className={cx('h-2.5 origin-left rounded-sm', e.status === 'overdue' && 'ring-[1.5px] ring-quar ring-offset-1')}
                style={{ background: EVENT_TYPES[e.type].color, opacity: e.status === 'done' ? 0.55 : 1 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.06 + k * 0.08, ease }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Мініатюра каренції: скільки ще не можна здавати молоко */
function Withdrawal() {
  return (
    <div className="mt-6 rounded-xl bg-paper p-4" aria-hidden="true">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-semibold">Каренція молока</span>
        <span className="font-semibold tabular-nums">до 18.10</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full origin-left rounded-full bg-treat"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
        />
      </div>
      <p className="mt-2 text-[13px] text-slate">UA 1234 5678 90 · лікування маститу · ще 3 дні</p>
    </div>
  )
}

const DOCS = [
  ['Паспорт ВРХ', 'UA 1234 5678 90'],
  ['Ветеринарна картка', 'UA 1234 5678 90'],
] as const

export function Features() {
  return (
    <Section id="features">
      <Eyebrow>Можливості</Eyebrow>
      <H2>Що робить EasyVet</H2>
      <Lead>Чотири роботи, які сьогодні розкидані по зошитах, таблицях і пам'яті ветлікаря.</Lead>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <Reveal className="md:col-span-2">
          <Spotlight className="p-6 md:p-8">
            <div className="grid items-center gap-7 md:grid-cols-[1fr_1fr] md:gap-8">
              <TileHead icon={<ListChecks />} title="Облік поголів'я">
                Реєструйте тварин і групи молодняку, переміщуйте між секціями, фіксуйте вибуття. Тип тварини — від телички до
                корови — видно в списку, а фільтри працюють за сектором, станом здоров'я і віком.
              </TileHead>
              <ul aria-label="Приклад списку поголів'я" className="rounded-xl border border-line bg-white">
                {ROWS.map(([tag, type, tone, label], idx) => (
                  <motion.li
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.12, ease }}
                    key={tag}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-3 border-line px-[18px] py-3 text-[15px] [&+&]:border-t"
                  >
                    <span className="whitespace-nowrap font-semibold tabular-nums">{tag}</span>
                    <span className="col-start-1 row-start-2 text-sm text-slate">{type}</span>
                    <span className="col-start-2 row-span-2 row-start-1">
                      <Pill tone={tone}>{label}</Pill>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Spotlight>
        </Reveal>

        <Reveal delay={0.1}>
          <Spotlight className="p-6 md:p-7">
            <TileHead icon={<CalendarCheck />} title="Календар ветзаходів">
              Вакцинації, обробки й огляди на день, тиждень або місяць. Прострочене видно одразу, а виконання фіксується з
              датою, серією препарату і кількістю тварин.
            </TileHead>
            <MiniWeek />
          </Spotlight>
        </Reveal>

        <Reveal delay={0.05}>
          <Spotlight className="p-6 md:p-7">
            <TileHead icon={<Stethoscope />} title="Ветжурнал і каренція">
              Огляди, діагнози й призначення в історії кожної тварини. Система сама рахує, до якої дати діє каренція молока і
              м'яса.
            </TileHead>
            <Withdrawal />
          </Spotlight>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2">
          <Spotlight className="p-6 md:p-8">
            <div className="grid items-center gap-7 md:grid-cols-[1fr_auto] md:gap-10">
              <TileHead icon={<FileText />} title="Документи">
                Паспорт ВРХ і ветеринарна картка формуються з даних картки тварини і готові до друку чи надсилання при продажу
                або перевезенні.
              </TileHead>
              <div className="flex flex-wrap gap-3 md:flex-col" aria-hidden="true">
                {DOCS.map(([name, tag], i) => (
                  <motion.div
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-line bg-paper py-3 pl-3 pr-5"
                    initial={{ opacity: 0, y: 16, rotate: i ? 3 : -3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: i ? 1.5 : -1.5 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.25 + i * 0.12 }}
                  >
                    <span className="grid h-11 w-9 place-items-center rounded-md bg-white text-[10px] font-bold tracking-wide text-quar shadow-[inset_0_0_0_1.5px_var(--color-line)]">PDF</span>
                    <span>
                      <b className="block text-[15px] font-semibold leading-tight">{name}</b>
                      <small className="text-[13px] tabular-nums text-slate">{tag}</small>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </Section>
  )
}
