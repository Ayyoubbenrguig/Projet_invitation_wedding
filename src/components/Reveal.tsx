import type { ReactNode } from 'react'
import {
  ScrollReveal,
  type ScrollRevealVariant,
} from './ScrollReveal'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: ScrollRevealVariant
}

/**
 * Back-compat alias for ScrollReveal — existing sections keep importing Reveal.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'fadeUp',
}: RevealProps) {
  return (
    <ScrollReveal className={className} delay={delay} variant={variant}>
      {children}
    </ScrollReveal>
  )
}
