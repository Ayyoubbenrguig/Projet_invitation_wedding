import { motion } from 'framer-motion'
import { heroMedia } from '../data/heroMedia'

const floatTransition = {
  duration: 7.5,
  ease: 'easeInOut' as const,
  repeat: Infinity,
}

type FloatingFlowersProps = {
  /** Extra class for the root layer (e.g. sizing tweaks). */
  className?: string
  /**
   * `seam` — straddle a horizontal join (top of this layer = seam line).
   * `bottom` — pin to bottom-left / bottom-right of the parent.
   */
  mode?: 'seam' | 'bottom'
}

/**
 * Corner florals — high z-index, soft sway.
 * Seam mode: most of each bouquet sits on the cream band below the torn edge
 * (Sacred Garden), with the tops peeking into the video.
 */
export function FloatingFlowers({
  className = '',
  mode = 'bottom',
}: FloatingFlowersProps) {
  const isSeam = mode === 'seam'

  return (
    <div
      className={`pointer-events-none absolute z-30 ${
        isSeam
          ? 'left-0 right-0 top-0 h-0 overflow-visible'
          : 'inset-0 overflow-hidden'
      } ${className}`}
      aria-hidden="true"
    >
      {/* Left — static position shell */}
      <div
        className={`absolute left-[-6%] w-[68%] max-w-[320px] origin-bottom-left md:left-[-4%] md:w-[60%] ${
          isSeam ? 'top-0 -translate-y-[28%]' : 'bottom-0'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, ease: [0.32, 0.72, 0, 1] }}
        >
          <motion.img
            src={heroMedia.flowerLeft}
            alt=""
            className="w-full max-w-none select-none drop-shadow-[0_14px_28px_rgba(60,40,20,0.22)]"
            draggable={false}
            animate={{
              y: [0, -9, 0, 7, 0],
              x: [0, 3, 0, -2, 0],
              rotate: [0, -2.2, 0, 1.5, 0],
            }}
            transition={floatTransition}
          />
        </motion.div>
      </div>

      {/* Right — static position shell */}
      <div
        className={`absolute right-[-6%] w-[68%] max-w-[320px] origin-bottom-right md:right-[-4%] md:w-[60%] ${
          isSeam ? 'top-0 -translate-y-[28%]' : 'bottom-0'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.12, ease: [0.32, 0.72, 0, 1] }}
        >
          <motion.img
            src={heroMedia.flowerRight}
            alt=""
            className="w-full max-w-none scale-x-[-1] select-none drop-shadow-[0_14px_28px_rgba(60,40,20,0.22)]"
            draggable={false}
            animate={{
              y: [0, 8, 0, -6, 0],
              x: [0, -4, 0, 2, 0],
              rotate: [0, 2, 0, -1.4, 0],
            }}
            transition={{ ...floatTransition, duration: 8.2, delay: 0.35 }}
          />
        </motion.div>
      </div>
    </div>
  )
}
