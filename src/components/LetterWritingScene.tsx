import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { envelopeMedia } from '../data/envelopeMedia'
import { wedding } from '../data/wedding'
import { OrnamentDivider } from './Ornaments'
import { FloatingFlowers } from './FloatingFlowers'

type LetterWritingSceneProps = {
  /** Called after the Quran writing finishes and a short hold. */
  onComplete: () => void
}

const INK = '#8b734b'
const CHAR_MS = 52
const LINE_GAP_MS = 420
const HOLD_AFTER_MS = 2200
const FRAME_LEAD_MS = 900

function charsOf(text: string): string[] {
  return Array.from(text)
}

type WritingLineProps = {
  text: string
  className?: string
  startDelay: number
  charDelay?: number
}

/**
 * Real Arabic text — glyph-by-glyph ink reveal with soft blur (RTL).
 */
function WritingLine({
  text,
  className = '',
  startDelay,
  charDelay = CHAR_MS / 1000,
}: WritingLineProps) {
  const glyphs = useMemo(() => charsOf(text), [text])

  return (
    <p
      className={`m-0 text-center leading-relaxed ${className}`}
      dir="rtl"
      lang="ar"
      style={{ color: INK }}
    >
      {glyphs.map((ch, i) => (
        <motion.span
          key={`${i}-${ch}`}
          className="inline-block"
          initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: startDelay + i * charDelay,
            duration: 0.22,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </p>
  )
}

function writingDurationSec(text: string, startDelay: number): number {
  return startDelay + charsOf(text).length * (CHAR_MS / 1000) + 0.25
}

/**
 * Ornate frame → Quran writes inside the arch → floating flowers sit on top.
 */
export function LetterWritingScene({ onComplete }: LetterWritingSceneProps) {
  const bismillah = wedding.bismillah
  const line1 = wedding.verse.line1
  const line2 = wedding.verse.line2
  const citation = wedding.verse.refDisplay

  const lead = FRAME_LEAD_MS / 1000
  const tBismillah = lead + 0.3
  const tDivider =
    writingDurationSec(bismillah, tBismillah) + LINE_GAP_MS / 1000
  const tLine1 = tDivider + 0.65
  const tLine2 = writingDurationSec(line1, tLine1) + LINE_GAP_MS / 1000
  const tCite = writingDurationSec(line2, tLine2) + LINE_GAP_MS / 1000
  const totalWriteSec = writingDurationSec(citation, tCite)

  useEffect(() => {
    const doneAt = totalWriteSec * 1000 + HOLD_AFTER_MS
    const id = window.setTimeout(() => onComplete(), doneAt)
    return () => window.clearTimeout(id)
  }, [onComplete, totalWriteSec])

  return (
    <motion.div
      className="fixed inset-0 z-40 flex min-h-[100dvh] items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1.15, ease: [0.32, 0.72, 0, 1] },
      }}
      transition={{ duration: 1.05, ease: [0.32, 0.72, 0, 1] }}
      style={{ background: '#fcebd4' }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: 'min(100vw, calc(100dvh * 3 / 4))',
          height: 'min(100dvh, calc(100vw * 4 / 3))',
        }}
      >
        {/* Layer 1 — ornate frame */}
        <motion.img
          src={envelopeMedia.letterFrame}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-contain object-center"
          draggable={false}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, ease: [0.32, 0.72, 0, 1] }}
        />

        {/* Layer 2 — Quran writing inside the arch */}
        <motion.div
          className="absolute inset-[15%_16%_22%] z-10 flex flex-col items-center justify-center gap-3 px-1 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <WritingLine
            text={bismillah}
            startDelay={tBismillah}
            charDelay={0.065}
            className="font-display text-[clamp(1.05rem,4.2vw,1.7rem)] leading-[1.9]"
          />

          <motion.div
            initial={{ opacity: 0, scaleX: 0.35 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: tDivider,
              duration: 0.95,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="w-[min(70%,200px)] text-gold-muted"
          >
            <OrnamentDivider className="mx-auto h-5 w-full" />
          </motion.div>

          <div className="flex w-full flex-col gap-2.5 sm:gap-3">
            <WritingLine
              text={line1}
              startDelay={tLine1}
              charDelay={0.045}
              className="font-arabic text-[clamp(0.7rem,2.85vw,0.98rem)] leading-[2]"
            />
            <WritingLine
              text={line2}
              startDelay={tLine2}
              charDelay={0.045}
              className="font-arabic text-[clamp(0.7rem,2.85vw,0.98rem)] leading-[2]"
            />
          </div>

          <WritingLine
            text={citation}
            startDelay={tCite}
            charDelay={0.055}
            className="mt-1 font-arabic text-[clamp(0.62rem,2.35vw,0.85rem)] tracking-wide"
          />
        </motion.div>

        {/* Layer 3 — flowers on top (bottom left & right) */}
        <FloatingFlowers />
      </div>
    </motion.div>
  )
}
