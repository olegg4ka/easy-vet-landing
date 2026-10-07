import type { ComponentProps, MouseEvent, ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
}

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
export { cx }

type BtnProps = ComponentProps<'a'> & { variant?: 'primary' | 'ghost' | 'tag'; size?: 'md' | 'lg'; arrow?: boolean }

export function ButtonLink({ variant = 'primary', size = 'md', arrow, className, children, ...rest }: BtnProps) {
  return (
    <a
      {...rest}
      className={cx(
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline transition-[background-color,border-color,box-shadow,transform] duration-200 active:scale-[.97]',
        size === 'lg' ? 'px-6 py-3.5 text-base' : 'px-4 py-2.5 text-[15px]',
        variant === 'primary' && 'bg-field text-white shadow-[0_10px_22px_-12px_rgba(30,77,51,.75)] hover:bg-field-2 hover:shadow-[0_14px_28px_-12px_rgba(30,77,51,.8)]',
        variant === 'ghost' && 'border-[1.5px] border-line bg-white/60 text-ink hover:border-field hover:bg-white',
        variant === 'tag' && 'bg-tag text-ink hover:bg-[#ffd43b]',
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />}
    </a>
  )
}

export function Section({ id, tone = 'paper', children, className }: { id?: string; tone?: 'paper' | 'tint' | 'field'; children: ReactNode; className?: string }) {
  return (
    <section
      id={id}
      className={cx(
        'relative py-16 md:py-28',
        tone === 'tint' && 'bg-tint',
        tone === 'field' && 'bg-field text-white',
        className,
      )}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-6">{children}</div>
    </section>
  )
}

/** Маленький ярлик над заголовком секції — з мініатюрною биркою замість крапки */
export function Eyebrow({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <motion.p
      {...rise}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        'mb-4 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em]',
        light ? 'text-tag' : 'text-field-2',
        className,
      )}
    >
      <span className="h-3 w-2.5 -rotate-12 rounded-[5px_5px_2px_2px] bg-tag" aria-hidden="true" />
      {children}
    </motion.p>
  )
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.h2 {...rise} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={cx('font-display text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.12] tracking-[-0.025em] max-w-[22ch]', className)}>{children}</motion.h2>
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.p {...rise} transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className={cx('mt-4 max-w-[56ch] text-lg text-slate', className)}>{children}</motion.p>
}

/** Картка з мʼяким «прожектором», що йде за курсором, і легким підйомом при наведенні */
export function Spotlight({ className, children }: { className?: string; children: ReactNode }) {
  function move(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      onMouseMove={move}
      className={cx(
        'group/spot relative h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: 'radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-tag) 18%, transparent), transparent 65%)' }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

export function IconBox({ children }: { children: ReactNode }) {
  return <span className="grid size-11 place-items-center rounded-xl bg-tint text-field-2 [&>svg]:size-[22px]">{children}</span>
}

export function Pill({ tone, children }: { tone: 'ok' | 'warn' | 'bad'; children: ReactNode }) {
  const t = { ok: 'bg-[#dcf3e2] text-[#1a7f37]', warn: 'bg-[#fdf0c8] text-[#9a6700]', bad: 'bg-[#fde1e1] text-[#c62828]' }[tone]
  return <span className={cx('inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[13px] font-semibold', t)}>{children}</span>
}

export function Dot({ color }: { color: string }) {
  return <span className="inline-block size-2.5 shrink-0 rounded-full" style={{ background: color }} />
}

export function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        'inline-flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[.96]',
        pressed ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-field',
      )}
    >
      {children}
    </button>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cx('group inline-flex items-center gap-2.5 font-display text-[19px] font-bold tracking-[-0.01em] no-underline', className)}>
      <svg viewBox="0 0 32 32" className="size-7 -rotate-12 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true">
        <path d="M16 3c5 0 9 3.6 9 8.4V20a9 9 0 0 1-18 0v-8.6C7 6.6 11 3 16 3z" fill="var(--color-tag)" />
        <circle cx="16" cy="9" r="2.4" fill="var(--color-ink)" />
      </svg>
      EasyVet
    </a>
  )
}
