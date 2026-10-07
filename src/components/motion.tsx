import type { ReactNode } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

type Tag = 'div' | 'li' | 'article' | 'p' | 'section'

/**
 * Поява блоку під час скролу: зʼявляється знизу (або збоку), коли ~20% елемента у видимій зоні.
 * Спрацьовує один раз. Для prefers-reduced-motion лишається тільки зміна прозорості (див. MotionConfig в App).
 */
export function Reveal({
  as = 'div',
  delay = 0,
  from = 'bottom',
  className,
  children,
}: {
  as?: Tag
  delay?: number
  from?: 'bottom' | 'left' | 'right' | 'scale'
  className?: string
  children: ReactNode
}) {
  const M = motion[as]
  const offset =
    from === 'left' ? { x: -40 } : from === 'right' ? { x: 40 } : from === 'scale' ? { scale: 0.92 } : { y: 32 }
  return (
    <M
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/** Жовта смужка прогресу прокрутки зверху сторінки */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-tag"
      style={{ scaleX }}
    />
  )
}
