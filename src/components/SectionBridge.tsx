import { motion } from 'framer-motion'
import {
  HeartFlourish,
  OrnamentDivider,
  SideLeafFlourish,
} from './Ornaments'

const EASE = [0.32, 0.72, 0, 1] as const

/**
 * Ornate gold bridge between parchment content blocks —
 * turns hard section cuts into a single invitation rhythm.
 */
export function SectionBridge() {
  return (
    <motion.div
      className="relative flex flex-col items-center px-8 py-10 sm:py-14"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.85, ease: EASE }}
      aria-hidden="true"
    >
      {/* Soft hairline that fades into the flourish */}
      <div className="flex w-full max-w-[14rem] items-center gap-3 sm:max-w-[16rem]">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/35" />
        <SideLeafFlourish className="h-3.5 w-5 shrink-0 text-gold-muted/70" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/35" />
      </div>

      <HeartFlourish className="mt-4 h-9 w-40 text-gold-muted sm:mt-5 sm:h-11 sm:w-48" />

      <OrnamentDivider className="mt-3 h-5 w-36 text-gold-muted/65 sm:mt-4 sm:h-6 sm:w-40" />

      <div className="mt-4 flex w-full max-w-[10rem] items-center gap-2 sm:mt-5">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
        <span className="h-1 w-1 rotate-45 bg-gold-muted/50" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
      </div>
    </motion.div>
  )
}
