import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import { CREAM } from '../theme'

type StackSectionProps = {
  children: ReactNode
  /** Paint order — later sections must stack above earlier ones. */
  index: number
  /** The opening section: full-bleed, no lifted card edge. */
  isFirst?: boolean
  /** Nothing covers the last section, so it never recedes. */
  isLast?: boolean
}

/**
 * One card in the scroll stack.
 *
 * Each section pins once you have scrolled through it, so the following
 * section slides up and stacks *over* it instead of pushing it away. While it
 * is being covered the pinned card recedes — fading, easing back in scale, and
 * softening — which reads as depth rather than a hard cut.
 *
 * The pin uses `top: min(0, viewportHeight - cardHeight)`. For a card exactly
 * one viewport tall that is plain `top: 0`. For taller cards (the two-screen
 * Hero, the map-heavy Venue) the negative offset means the card only pins once
 * its *bottom* reaches the viewport bottom — so its lower content stays
 * reachable instead of being stranded off-screen. `bottom: 0` cannot be used
 * here: sticky clamps in both directions, so it would drag every card up into
 * view at once and the last one would cover the whole page from the start.
 */
export function StackSection({
  children,
  index,
  isFirst,
  isLast,
}: StackSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // Cards are at least one viewport tall, so this is 0 or negative.
  const [stickyTop, setStickyTop] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () =>
      setStickyTop(Math.min(0, window.innerHeight - el.offsetHeight))

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Late-loading media (video, map iframe, images) can change card height.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onLoad = () =>
      setStickyTop(Math.min(0, window.innerHeight - el.offsetHeight))
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  // 0 = just pinned (bottom edge at viewport bottom); 1 = fully covered.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.68, 0.28])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ['blur(0px)', 'blur(3px)'],
  )

  // The last card is never occluded, and reduced-motion users get a plain stack.
  const recede = !isLast && !reduceMotion

  return (
    <div ref={ref} className="sticky" style={{ top: stickyTop, zIndex: index }}>
      <motion.div
        className={clsx(
          'relative flex min-h-[100dvh] flex-col justify-center overflow-hidden',
          !isFirst &&
            'rounded-t-[1.75rem] shadow-[0_-22px_60px_-18px_rgba(120,80,40,0.28)]',
        )}
        style={{
          background: CREAM,
          transformOrigin: 'top center',
          ...(recede ? { opacity, scale, filter } : null),
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
