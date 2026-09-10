import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import clsx from 'clsx'

const EASE = [0.32, 0.72, 0, 1] as const

export type ScrollRevealVariant =
  | 'fadeUp'
  | 'fadeIn'
  | 'fadeScale'
  | 'slideLeft'
  | 'slideRight'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Entrance motion preset. */
  variant?: ScrollRevealVariant
  /** Seconds before the animation starts once in view. */
  delay?: number
  /** Animation duration in seconds. */
  duration?: number
  /** How much of the element must be visible to trigger (0–1). */
  amount?: number
  /** Replay every time it enters the viewport. Default: once. */
  once?: boolean
  /** Render as a semantic section instead of a div. */
  as?: 'div' | 'section'
  /** Stagger child ScrollRevealItem entrances. */
  staggerChildren?: number
  id?: string
  style?: HTMLMotionProps<'div'>['style']
}

function hiddenFor(variant: ScrollRevealVariant) {
  switch (variant) {
    case 'fadeIn':
      return { opacity: 0 }
    case 'fadeScale':
      return { opacity: 0, scale: 0.97 }
    case 'slideLeft':
      return { opacity: 0, x: 28 }
    case 'slideRight':
      return { opacity: 0, x: -28 }
    case 'fadeUp':
    default:
      return { opacity: 0, y: 28 }
  }
}

function showFor(variant: ScrollRevealVariant) {
  switch (variant) {
    case 'fadeIn':
      return { opacity: 1 }
    case 'fadeScale':
      return { opacity: 1, scale: 1 }
    case 'slideLeft':
    case 'slideRight':
      return { opacity: 1, x: 0 }
    case 'fadeUp':
    default:
      return { opacity: 1, y: 0 }
  }
}

/**
 * Modular scroll-triggered entrance wrapper.
 *
 * ```tsx
 * <ScrollReveal variant="fadeUp">
 *   <img src="…" alt="" />
 * </ScrollReveal>
 * ```
 *
 * Animates only opacity + transform (GPU-safe).
 */
export function ScrollReveal({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.85,
  amount = 0.2,
  once = true,
  as = 'div',
  staggerChildren,
  id,
  style,
}: ScrollRevealProps) {
  const variants = {
    hidden: hiddenFor(variant),
    show: {
      ...showFor(variant),
      transition: {
        duration,
        delay,
        ease: EASE,
        ...(staggerChildren != null
          ? { staggerChildren, delayChildren: delay }
          : {}),
      },
    },
  }

  const shared = {
    id,
    className: clsx(className),
    style,
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once, amount, margin: '-40px 0px' as const },
    variants,
  }

  if (as === 'section') {
    return <motion.section {...shared}>{children}</motion.section>
  }

  return <motion.div {...shared}>{children}</motion.div>
}

/** Child item for use inside a staggering ScrollReveal parent. */
export function ScrollRevealItem({
  children,
  className,
  variant = 'fadeUp',
}: {
  children: ReactNode
  className?: string
  variant?: ScrollRevealVariant
}) {
  return (
    <motion.div
      className={clsx(className)}
      variants={{
        hidden: hiddenFor(variant),
        show: {
          ...showFor(variant),
          transition: { duration: 0.75, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
