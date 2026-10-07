import { motion, useReducedMotion } from 'motion/react'
import { cx } from './ui'

const INK = 'var(--color-ink)'
const PINK = '#f6b9b1'
const loop = (duration: number, extra = {}) => ({ duration, repeat: Infinity, ease: 'easeInOut' as const, ...extra })

/**
 * Корівка, що махає копитцем. Своя ілюстрація SVG: на правому вусі — жовта бирка EasyVet.
 * Анімації: махання ногою, помахи хвостом, кивання головою, кліпання очима, мовна хмаринка.
 */
export function WavingCow({ message = 'Му-у! Привіт!', className, bubbleSide = 'right' }: { message?: string; className?: string; bubbleSide?: 'left' | 'right' }) {
  const reduce = useReducedMotion()
  const still = reduce ? { duration: 0 } : undefined
  const box = { transformBox: 'fill-box' as const }

  return (
    <div className={cx('relative select-none', className)}>
      <motion.div
        className={cx(
          'absolute -top-3 z-10 whitespace-nowrap rounded-2xl border-2 border-ink bg-white px-3 py-1.5 font-display text-[13px] font-bold text-ink shadow-[3px_3px_0_var(--color-ink)] md:text-sm',
          bubbleSide === 'right' ? 'left-[62%]' : 'right-[62%]',
        )}
        initial={{ opacity: 0, scale: 0.4, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.5 }}
        style={{ transformOrigin: bubbleSide === 'right' ? '0% 100%' : '100% 100%' }}
      >
        {message}
      </motion.div>

      <svg viewBox="0 0 250 200" className="w-full overflow-visible" role="img" aria-label="Корівка махає копитцем">
        {/* тінь */}
        <ellipse cx="112" cy="192" rx="92" ry="7" fill="#16211a" opacity=".12" />

        {/* хвіст */}
        <motion.g
          style={{ ...box, originX: 1, originY: 0 }}
          animate={reduce ? undefined : { rotate: [0, 18, -6, 0] }}
          transition={still ?? loop(1.8, { repeatDelay: 0.4 })}
        >
          <path d="M44 112 C 26 120 22 140 26 160" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M26 156 c -8 4 -8 14 0 18 c 8 -2 10 -12 0 -18z" fill={INK} />
        </motion.g>

        {/* задні ноги і передня опорна */}
        {[56, 84, 140].map((x) => (
          <g key={x}>
            <rect x={x} y="132" width="18" height="54" rx="7" fill="#fff" stroke={INK} strokeWidth="3" />
            <rect x={x} y="176" width="18" height="12" rx="4" fill={INK} />
          </g>
        ))}

        {/* тулуб */}
        <ellipse cx="104" cy="118" rx="70" ry="42" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M62 92 c 14 -8 30 -2 28 12 c -2 14 -22 16 -30 8 c -6 -6 -6 -14 2 -20z" fill={INK} />
        <path d="M112 128 c 12 -10 32 -4 30 10 c -2 12 -20 18 -30 12 c -8 -6 -8 -14 0 -22z" fill={INK} />
        <path d="M124 82 c 8 -4 22 0 22 8 c -2 8 -14 10 -22 6 c -6 -4 -6 -10 0 -14z" fill={INK} />
        {/* вимʼя */}
        <path d="M86 156 q 14 14 28 0" fill={PINK} stroke={INK} strokeWidth="3" />

        {/* нога, що махає: обертається навколо плеча */}
        <motion.g
          style={{ ...box, originX: 0.5, originY: 1 }}
          initial={{ rotate: 60 }}
          animate={reduce ? { rotate: 60 } : { rotate: [60, 92, 60, 92, 60] }}
          transition={still ?? loop(1.4, { repeatDelay: 0.8 })}
        >
          <rect x="160" y="70" width="18" height="60" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
          <rect x="160" y="70" width="18" height="13" rx="5" fill={INK} />
        </motion.g>

        {/* голова: легко киває */}
        <motion.g
          style={{ ...box, originX: 0.5, originY: 1 }}
          animate={reduce ? undefined : { rotate: [0, -5, 0, 4, 0] }}
          transition={still ?? loop(2.8)}
        >
          {/* роги */}
          <path d="M146 40 q -8 -14 2 -22 q 0 12 10 16z" fill="#f4ecd6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M196 40 q 8 -14 -2 -22 q 0 12 -10 16z" fill="#f4ecd6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          {/* вуха */}
          <ellipse cx="134" cy="56" rx="16" ry="8" transform="rotate(-22 134 56)" fill="#fff" stroke={INK} strokeWidth="3" />
          <ellipse cx="208" cy="56" rx="16" ry="8" transform="rotate(22 208 56)" fill="#fff" stroke={INK} strokeWidth="3" />
          {/* бирка на вусі — та сама, що на сайті */}
          <motion.g
            style={{ ...box, originX: 0.5, originY: 0 }}
            animate={reduce ? undefined : { rotate: [0, 14, -8, 0] }}
            transition={still ?? loop(2.2)}
          >
            <rect x="212" y="60" width="14" height="17" rx="5" fill="var(--color-tag)" stroke={INK} strokeWidth="2" />
            <circle cx="219" cy="64" r="1.6" fill={INK} />
          </motion.g>
          {/* голова */}
          <path d="M146 44 C 146 28 196 28 196 44 L 200 84 C 200 98 142 98 142 84 Z" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M160 34 c 6 -6 16 -6 22 0 c -4 6 -18 6 -22 0z" fill={INK} />
          {/* очі з кліпанням */}
          <motion.g
            style={{ ...box, originY: 0.5 }}
            animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }}
            transition={still ?? { duration: 3.2, times: [0, 0.9, 0.95, 1], repeat: Infinity }}
          >
            <circle cx="160" cy="60" r="5" fill={INK} />
            <circle cx="182" cy="60" r="5" fill={INK} />
            <circle cx="161.6" cy="58.4" r="1.6" fill="#fff" />
            <circle cx="183.6" cy="58.4" r="1.6" fill="#fff" />
          </motion.g>
          <circle cx="150" cy="72" r="5" fill={PINK} opacity=".8" />
          <circle cx="192" cy="72" r="5" fill={PINK} opacity=".8" />
          {/* морда */}
          <ellipse cx="171" cy="88" rx="30" ry="17" fill={PINK} stroke={INK} strokeWidth="3" />
          <ellipse cx="161" cy="86" rx="3.5" ry="5" fill={INK} />
          <ellipse cx="181" cy="86" rx="3.5" ry="5" fill={INK} />
          <path d="M162 96 q 9 6 18 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>
      </svg>
    </div>
  )
}
