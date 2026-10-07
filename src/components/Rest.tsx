import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, CheckCircle2, Loader2, Mail, Plus } from 'lucide-react'
import { FAQ } from '../data'
import { Eyebrow, H2, Lead, Logo, Section, cx } from './ui'
import { Reveal } from './motion'
import { WavingCow } from './Cow'

const STEPS = [
  ['Зареєструйтеся як власник', 'Вкажіть email і пароль, позначте, що ви власник або відповідальна особа ферми.'],
  ['Опишіть господарство', 'Назва, ЄДРПОУ, ферми, корпуси й секції — основа, до якої прив\'язується поголів\'я.'],
  ['Запросіть команду', 'Ветлікар і зоотехнік отримають лист із посиланням і приєднаються зі своєю роллю.'],
  ['Внесіть поголів\'я', 'Додайте тварин і групи молодняку, а ветлікар запланує перші заходи в календарі.'],
] as const

export function Steps() {
  return (
    <Section id="start" tone="field">
      <Eyebrow light>Підключення</Eyebrow>
      <H2 className="text-white">Як почати</H2>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(([title, text], i) => (
          <Reveal as="li" delay={i * 0.18} key={title} className="relative pt-16">
            <motion.span
              initial={{ scale: 0, rotate: -25 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.2 + i * 0.18 }}
              className="absolute left-0 top-0 grid h-[52px] w-11 place-items-center rounded-[22px_22px_10px_10px] bg-tag font-display text-xl font-bold text-ink">
              {i + 1}
            </motion.span>
            {i < STEPS.length - 1 && (
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.18 }}
                className="absolute left-14 right-[-20px] top-[26px] hidden origin-left border-t-[1.5px] border-dashed border-white/35 lg:block"
              />
            )}
            <h3 className="font-display text-lg font-bold leading-snug">{title}</h3>
            <p className="mt-2.5 text-white/80">{text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Питання</Eyebrow>
          <H2>Що зазвичай питають ферми</H2>
          <Reveal delay={0.2} className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-card">
            <p className="font-semibold">Не знайшли відповіді?</p>
            <p className="mt-1.5 text-[15px] text-slate">Напишіть нам — відповімо й покажемо систему на прикладі вашого господарства.</p>
            <a href="mailto:hello@example.com" className="group mt-4 inline-flex items-center gap-2 font-semibold text-field-2 no-underline">
              <Mail className="size-4" aria-hidden="true" />
              hello@example.com
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
        <div className="grid gap-3">
          {FAQ.map((f, i) => {
            const on = open === i
            return (
              <Reveal delay={i * 0.06} key={f.q} className={cx('rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300', on ? 'border-line bg-white shadow-card' : 'border-transparent bg-tint/60 hover:bg-tint')}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(on ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left text-[17px] font-semibold md:px-6 md:text-lg"
                >
                  {f.q}
                  <span className={cx('grid size-8 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-300', on ? 'rotate-45 bg-tag' : 'bg-white')}>
                    <Plus className="size-4" aria-hidden="true" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] px-5 pb-6 pr-14 text-slate md:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

type Errors = Partial<Record<'name' | 'farm' | 'contact' | 'heads', string>>

function validate(d: Record<string, string>): Errors {
  const e: Errors = {}
  if (d.name.trim().length < 2) e.name = 'Вкажіть ім\'я'
  if (d.farm.trim().length < 2) e.farm = 'Вкажіть назву господарства'
  const c = d.contact.trim()
  if (!c) e.contact = 'Вкажіть телефон або email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) && !/^\+?[\d\s()-]{9,}$/.test(c))
    e.contact = 'Перевірте формат: +380 67 123 45 67 або name@farm.ua'
  if (d.heads && !(Number.isInteger(Number(d.heads)) && Number(d.heads) > 0)) e.heads = 'Ціле число більше нуля'
  return e
}

function Field({ id, label, error, hint, ...rest }: { id: string; label: string; error?: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid content-start gap-1.5">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label}
        {hint && <span className="ml-1.5 font-normal text-slate">{hint}</span>}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cx(
          'rounded-xl border-[1.5px] bg-paper/60 px-3.5 py-3 text-base outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate/60 hover:border-slate/40 focus:border-field-2 focus:bg-white focus:ring-4 focus:ring-field-2/15',
          error ? 'border-[#c62828]' : 'border-line',
        )}
        {...rest}
      />
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[13.5px] text-[#c62828]">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const NEXT = [
  ['Дзвінок', 'Уточнимо розмір стада, ролі й те, як ви ведете облік зараз.'],
  ['Демо', 'Покажемо EasyVet на прикладі ферми, схожої на вашу.'],
  ['Підключення', 'Створимо господарство, ви запросите команду і внесете поголів\'я.'],
] as const

export function PilotForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sentFarm, setSentFarm] = useState<string | null>(null)

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = ev.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const e = validate(data)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      ;(form.elements.namedItem(first) as HTMLInputElement)?.focus()
      return
    }
    // Макет: заявка нікуди не відправляється, затримка лише імітує запит
    setSending(true)
    setSentFarm(null)
    window.setTimeout(() => {
      setSending(false)
      setSentFarm(data.farm.trim())
      form.reset()
    }, 700)
  }

  return (
    <Section id="pilot" tone="tint" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 size-[480px] rounded-full bg-tag/20 blur-[120px]" />
      <div className="relative grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Пілот</Eyebrow>
          <H2>Станьте пілотним господарством</H2>
          <Lead>Ми підключаємо перші ферми, щоб перевірити EasyVet на реальній роботі. Залиште контакти — зв'яжемося і покажемо демо.</Lead>

          <ol className="mt-8 grid gap-4">
            {NEXT.map(([title, text], i) => (
              <Reveal as="li" from="left" delay={0.1 + i * 0.1} key={title} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-field-2 font-display text-sm font-bold text-field-2">{i + 1}</span>
                <span>
                  <b className="block font-semibold">{title}</b>
                  <span className="text-[15px] text-slate">{text}</span>
                </span>
              </Reveal>
            ))}
          </ol>

          <motion.div
            className="mt-10 w-[150px] md:w-[190px]"
            initial={{ opacity: 0, y: 50, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.2 }}
          >
            <WavingCow message="Чекаю на вашу ферму!" />
          </motion.div>
        </div>
        <Reveal from="right" delay={0.15} className="lg:sticky lg:top-28">
          <form noValidate onSubmit={onSubmit} className="grid gap-[18px] rounded-3xl border border-line bg-white p-6 shadow-lift md:p-8">
            <div>
              <p className="font-display text-xl font-bold">Заявка на пілот</p>
              <p className="mt-1 text-[15px] text-slate">Чотири поля — і ми зв'яжемося з вами.</p>
            </div>
            <Field id="name" label="Ваше ім'я" autoComplete="name" placeholder="Олена Коваль" error={errors.name} />
            <Field id="farm" label="Назва господарства" autoComplete="organization" placeholder="ТОВ «Зелений луг»" error={errors.farm} />
            <div className="grid items-start gap-4 sm:grid-cols-2">
              <Field id="contact" label="Телефон або email" placeholder="+380 67 123 45 67" error={errors.contact} />
              <Field id="heads" label="Кількість голів" type="number" min={1} inputMode="numeric" placeholder="необов'язково" error={errors.heads} />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-field px-6 py-4 font-semibold text-white shadow-[0_10px_22px_-12px_rgba(30,77,51,.75)] transition-[background-color,transform] hover:bg-field-2 active:scale-[.98] disabled:cursor-wait disabled:opacity-80"
            >
              {sending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Надсилаємо…
                </>
              ) : (
                <>
                  Подати заявку
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </>
              )}
            </button>
            <p className="text-center text-[13px] text-slate">
              Надсилаючи заявку, ви погоджуєтеся з <a href="#" className="underline underline-offset-2 hover:text-ink">політикою конфіденційності</a>.
            </p>
            <AnimatePresence>
              {sentFarm && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 rounded-xl bg-[#dcf3e2] px-3.5 py-3 font-semibold text-[#1a7f37]"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  Заявку від «{sentFarm}» прийнято. Ми зв'яжемося з вами, щоб домовитися про демо.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

const FOOT_NAV = [
  ['#features', 'Можливості'],
  ['#calendar', 'Календар'],
  ['#herd', 'Стадо'],
  ['#start', 'Як почати'],
  ['#faq', 'Питання'],
  ['#pilot', 'Пілот'],
] as const

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-14 text-sm text-white/65 lg:pb-10">
      <div className="mx-auto max-w-[1180px] px-5 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-white" />
            <p className="mt-4 max-w-[36ch] text-[15px]">Ветеринарний облік для господарств великої рогатої худоби: поголів'я, календар заходів, ветжурнал і документи.</p>
          </div>
          <nav aria-label="Розділи сторінки">
            <p className="font-semibold text-white">Розділи</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {FOOT_NAV.map(([href, label]) => (
                <li key={href}><a href={href} className="no-underline transition-colors hover:text-tag">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-semibold text-white">Контакти</p>
            <a href="mailto:hello@example.com" className="mt-3 inline-block no-underline transition-colors hover:text-tag">hello@example.com</a>
            <p className="mt-2"><a href="#" className="no-underline transition-colors hover:text-tag">Увійти в систему</a></p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px]">
          <p>© {new Date().getFullYear()} EasyVet</p>
          <a href="#" className="no-underline transition-colors hover:text-tag">Політика конфіденційності</a>
        </div>
      </div>
    </footer>
  )
}
