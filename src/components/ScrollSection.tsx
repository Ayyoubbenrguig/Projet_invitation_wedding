import type { ReactNode } from 'react'
import clsx from 'clsx'
import { CREAM } from '../theme'
import { ScrollReveal, type ScrollRevealVariant } from './ScrollReveal'

export type ScrollSectionTone = 'cream' | 'transparent'
export type ScrollSectionLayout = 'picture' | 'text' | 'flush'

type ScrollSectionProps = {
  children: ReactNode
  /** Optional id for deep links / scroll targets. */
  id?: string
  className?: string
  /**
   * `picture` — visual stage shell.
   * `text` — padded editorial text band.
   * `flush` — no vertical padding (child owns spacing).
   */
  layout?: ScrollSectionLayout
  /** Background tone for the cream river. */
  tone?: ScrollSectionTone
  /** Entrance preset passed to ScrollReveal. */
  variant?: ScrollRevealVariant
  delay?: number
  /** Stagger nested ScrollRevealItem children. */
  staggerChildren?: number
}

const layoutClass: Record<ScrollSectionLayout, string> = {
  picture: 'relative w-full overflow-hidden',
  text: 'relative w-full px-6 py-16 text-center sm:px-8 sm:py-20 md:py-24',
  flush: 'relative w-full',
}

/**
 * Section shell for an alternating picture → text → picture invite reel.
 *
 * ```tsx
 * <ScrollSection layout="picture">
 *   <ScrollPicture src="/media/…" />
 * </ScrollSection>
 *
 * <ScrollSection layout="text">
 *   <ScrollTextBlock title="…" eyebrow="…">…</ScrollTextBlock>
 * </ScrollSection>
 * ```
 */
export function ScrollSection({
  children,
  id,
  className,
  layout = 'flush',
  tone = 'cream',
  variant = 'fadeUp',
  delay = 0,
  staggerChildren,
}: ScrollSectionProps) {
  return (
    <ScrollReveal
      as="section"
      id={id}
      variant={variant}
      delay={delay}
      staggerChildren={staggerChildren}
      className={clsx(layoutClass[layout], className)}
      style={{
        background: tone === 'cream' ? CREAM : undefined,
      }}
    >
      {children}
    </ScrollReveal>
  )
}

/**
 * Editorial text block tuned for Arabic / bilingual invite copy.
 */
export function ScrollTextBlock({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: ReactNode
  title?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'mx-auto flex w-full max-w-xl flex-col items-center',
        className,
      )}
    >
      {eyebrow != null && (
        <p className="font-ui text-[11px] tracking-[0.28em] text-gold/60 uppercase">
          {eyebrow}
        </p>
      )}
      {title != null && (
        <h2 className="mt-3 font-display text-3xl leading-snug text-gold-muted md:text-4xl">
          {title}
        </h2>
      )}
      {children != null && (
        <div className="mt-5 max-w-[40ch] font-arabic text-base leading-relaxed text-[#5c4330]/85 md:text-lg">
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * Full-bleed picture frame for the alternating reel — no cream wash overlays.
 */
export function ScrollPicture({
  src,
  alt = '',
  className,
  children,
}: {
  src: string
  alt?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={clsx(
        'relative mx-auto w-full max-w-[430px] overflow-hidden',
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full object-cover object-center"
        draggable={false}
      />
      {children != null && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          {children}
        </div>
      )}
    </div>
  )
}
