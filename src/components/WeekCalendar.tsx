import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { EVENT_TYPES, STATUS_LABEL, WEEK_EVENTS, type EventType } from '../data'
import { Chip, Dot, Eyebrow, H2, Lead, Section, cx } from './ui'
import { Reveal } from './motion'

const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд']

function plural(n: number) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'захід'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'заходи'
  return 'заходів'
}

export function WeekCalendar() {
  const [type, setType] = useState<EventType | 'all'>('all')
  const { monday, todayIdx } = useMemo(() => {
    const t = new Date()
    const idx = (t.getDay() + 6) % 7
    const m = new Date(t)
    m.setDate(t.getDate() - idx)
    return { monday: m, todayIdx: idx }
  }, [])

  const shown = WEEK_EVENTS.filter((e) => type === 'all' || e.type === type)
  const overdue = shown.filter((e) => e.status === 'overdue').length

  return (
    <Section id="calendar" tone="tint">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-12">
        <div>
          <Eyebrow>Календар</Eyebrow>
          <H2>Тиждень ферми на одному екрані</H2>
          <Lead>Колір показує тип заходу, рамка — прострочене. Оберіть тип, щоб побачити лише його.</Lead>
        </div>
        <Reveal from="right" delay={0.2}><div role="group" aria-label="Фільтр за типом заходу" className="flex max-w-[460px] flex-wrap gap-2 lg:justify-end">
          <Chip pressed={type === 'all'} onClick={() => setType('all')}>Усі</Chip>
          {(Object.keys(EVENT_TYPES) as EventType[]).map((t) => (
            <Chip key={t} pressed={type === t} onClick={() => setType(t)}>
              <Dot color={EVENT_TYPES[t].color} />
              {EVENT_TYPES[t].label}
            </Chip>
          ))}
        </div></Reveal>
      </div>
      <p aria-live="polite" className="mt-5 text-[15px] text-slate">
        На тижні {shown.length} {plural(shown.length)}
        {overdue ? `, з них прострочено: ${overdue}.` : '.'}
      </p>

      <LayoutGroup>
        <Reveal from="scale" className="mt-6 grid overflow-hidden rounded-2xl border border-line bg-white shadow-card md:grid-cols-7">
          {DAYS.map((d, i) => {
            const date = new Date(monday)
            date.setDate(monday.getDate() + i)
            const evs = shown.filter((e) => e.day === i)
            return (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.07 }}
                className={cx('flex flex-wrap items-start gap-1.5 border-line p-2.5 [&+&]:border-t md:min-h-[280px] md:flex-col md:flex-nowrap md:[&+&]:border-l md:[&+&]:border-t-0', i === todayIdx && 'bg-tag/[.07]')}>
                <div className="w-16 shrink-0 pb-1.5 text-[13px] text-slate md:w-auto">
                  {d}
                  <b className={cx('block font-display text-lg leading-tight', i === todayIdx ? 'text-field-2' : 'text-ink')}>{date.getDate()}</b>
                  {i === todayIdx && <span className="mt-1 inline-block rounded-full bg-tag px-2 py-px text-[11px] font-semibold text-ink">сьогодні</span>}
                </div>
                <AnimatePresence mode="popLayout">
                  {evs.map((e) => (
                    <motion.div
                      layout
                      key={e.title + e.day}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: e.status === 'done' ? 0.7 : 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className={cx('flex-[1_1_180px] rounded-md border-l-[3px] px-2 py-1.5 text-[13.5px] leading-snug transition-transform hover:-translate-y-px md:w-full md:flex-none', e.status === 'overdue' && 'ring-[1.5px] ring-quar ring-inset')}
                      style={{ borderColor: EVENT_TYPES[e.type].color, background: `color-mix(in srgb, ${EVENT_TYPES[e.type].color} 10%, white)` }}
                    >
                      {e.title}
                      <small className="mt-0.5 block text-xs text-slate">
                        {e.target} · {STATUS_LABEL[e.status]}
                      </small>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </Reveal>
      </LayoutGroup>
    </Section>
  )
}
