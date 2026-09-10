import type { CSSProperties, ReactNode } from 'react'
import { CREAM } from '../theme'
import { ScrollReveal } from './ScrollReveal'

type PictureStageProps = {
  /** Full-bleed backdrop for this stage. */
  src: string
  children: ReactNode
  /** Content box inside the artwork — defaults to the ornate arch interior. */
  inset?: string
  /** Extra classes for the content column. */
  contentClassName?: string
  style?: CSSProperties
}

/**
 * One full-viewport picture in the invitation reel.
 * Scroll entrance via ScrollReveal — no muddy cream wash overlays.
 */
export function PictureStage({
  src,
  children,
  inset = 'inset-x-[9%] top-[13%] bottom-[9%]',
  contentClassName = '',
  style,
}: PictureStageProps) {
  return (
    <ScrollReveal
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ background: CREAM, ...style }}
      variant="fadeIn"
      amount={0.12}
      duration={1}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      <div
        className={`absolute z-10 flex flex-col items-center ${inset} ${contentClassName}`}
      >
        {children}
      </div>
    </ScrollReveal>
  )
}
