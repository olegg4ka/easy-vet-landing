import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ButtonLink, Logo, cx } from './ui'

const NAV = [
  ['#features', 'Можливості'],
  ['#calendar', 'Календар'],
  ['#herd', 'Стадо'],
  ['#start', 'Як почати'],
  ['#faq', 'Питання'],
] as const

/** Який розділ зараз посередині екрана — для підсвітки пункту меню */
function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = ['top', ...NAV.map(([h]) => h.slice(1)), 'pilot']
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const id = e.target.id
          setActive(id === 'top' || id === 'pilot' ? '' : `#${id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const solid = scrolled || open

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-5">
      <div
        className={cx(
          'relative mx-auto flex h-[60px] max-w-[1180px] items-center gap-6 rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-300',
          solid ? 'border-line/80 bg-white/80 shadow-[0_12px_32px_-20px_rgba(22,33,26,.4)] backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <Logo />
        <nav aria-label="Розділи сторінки" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map(([href, label]) => {
            const on = active === href
            return (
              <a
                key={href}
                href={href}
                aria-current={on ? 'location' : undefined}
                className={cx('relative rounded-full px-3.5 py-2 text-[15px] font-medium no-underline transition-colors', on ? 'text-ink' : 'text-slate hover:text-ink')}
              >
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-tint"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            )
          })}
        </nav>
        <div className="ml-auto hidden gap-2 lg:flex">
          <ButtonLink variant="ghost" href="http://localhost:8000/login">Увійти</ButtonLink>
          <ButtonLink href="#pilot" arrow>Подати заявку</ButtonLink>
        </div>
        <button
          type="button"
          className="ml-auto flex size-11 cursor-pointer flex-col justify-center gap-2 rounded-full px-3 transition-colors hover:bg-tint lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 rounded bg-ink transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
          <span className={`block h-0.5 rounded bg-ink transition-transform ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Розділи сторінки"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-[calc(100%+8px)] origin-top rounded-2xl border border-line bg-white p-3 shadow-lift lg:hidden"
            >
              <div className="grid gap-0.5">
                {NAV.map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cx('rounded-xl px-3 py-3 font-medium no-underline', active === href ? 'bg-tint' : 'hover:bg-paper')}
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <ButtonLink variant="ghost" href="#" onClick={() => setOpen(false)}>Увійти</ButtonLink>
                  <ButtonLink href="#pilot" onClick={() => setOpen(false)}>Подати заявку</ButtonLink>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

/** Кнопка заявки внизу екрана на телефоні: зʼявляється після першого екрана, ховається біля форми */
export function MobileCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const pilot = document.getElementById('pilot')
      const pastHero = window.scrollY > window.innerHeight * 0.85
      const nearForm = pilot ? pilot.getBoundingClientRect().top < window.innerHeight * 0.9 : false
      setShow(pastHero && !nearForm)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
        >
          <ButtonLink href="#pilot" size="lg" arrow className="w-full shadow-[0_16px_36px_-12px_rgba(22,33,26,.55)]">
            Подати заявку на пілот
          </ButtonLink>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
