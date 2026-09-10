import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { useLanguage } from '../../context/LanguageContext'
import { useMediaUnlock } from '../../context/MediaUnlockContext'
import { wedding } from '../../data/wedding'
import { heroMedia } from '../../data/heroMedia'
import { envelopeMedia } from '../../data/envelopeMedia'
import { OrnamentDivider, DiamondRule, OrnamentFlourish } from '../Ornaments'
import { CREAM, CREAM_RGBA } from '../../theme'

const GOLD = '#a67d2b'
const GOLD_SOFT = 'rgba(166, 125, 43, 0.95)'
const INK = '#8b734b'
const TEXT_SHADOW =
  '0 1px 18px rgba(245, 232, 205, 0.55), 0 0 2px rgba(245, 232, 205, 0.8)'

const WORD_DELAY = 0.14
const WORD_DURATION = 0.45

type ArabicWritingProps = {
  text: string
  className?: string
  /** Seconds before the first word begins writing. */
  startDelay?: number
  /** Ink color — defaults to warm gold-brown. */
  color?: string
}

/**
 * Word-by-word Arabic “ink” reveal — each word stays fully joined.
 * Never splits into individual glyphs (that breaks Arabic ligatures).
 */
function ArabicWriting({
  text,
  className = '',
  startDelay = 0,
  color = INK,
}: ArabicWritingProps) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

  return (
    <p
      className={`m-0 text-center leading-relaxed ${className}`}
      dir="rtl"
      lang="ar"
      style={{ color }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${i}-${word}`}
          className="inline"
          initial={{ opacity: 0, y: 5, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            delay: startDelay + i * WORD_DELAY,
            duration: WORD_DURATION,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </p>
  )
}

/**
 * Full-bleed ornate frame — Quran + ceremony text stacked on the same picture.
 */
function QuranFrame() {
  const bismillah = wedding.bismillah
  const line1 = wedding.verse.line1
  const line2 = wedding.verse.line2
  const citation = wedding.verse.refDisplay
  const names = `${wedding.groom.ar} و ${wedding.bride.ar}`

  const tBismillah = 0.35
  const tDivider =
    tBismillah + bismillah.split(/\s+/).filter(Boolean).length * WORD_DELAY + 0.3
  const tLine1 = tDivider + 0.4
  const tLine2 =
    tLine1 + line1.split(/\s+/).filter(Boolean).length * WORD_DELAY + 0.28
  const tCite =
    tLine2 + line2.split(/\s+/).filter(Boolean).length * WORD_DELAY + 0.28
  const tDivider2 = tCite + 0.45

  return (
    <motion.div
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ background: 'transparent' }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
    >
      <img
        src={envelopeMedia.letterFrame}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
        style={{
          // Long transparent bottom dissolve — no hard cut into countdown
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 5%, #000 12%, #000 55%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.35) 85%, rgba(0,0,0,0.1) 93%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 5%, #000 12%, #000 55%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.35) 85%, rgba(0,0,0,0.1) 93%, transparent 100%)',
        }}
      />

      {/* Light cream kiss at the very top only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[12%]"
        aria-hidden="true"
        style={{
          background: `linear-gradient(
            to bottom,
            ${CREAM} 0%,
            rgba(${CREAM_RGBA}, 0.35) 45%,
            transparent 100%
          )`,
        }}
      />

      {/* Copy — lower on mobile so it sits inside the arch comfortably */}
      <div className="absolute inset-x-[5%] top-[20%] bottom-[12%] z-10 flex flex-col items-center px-1 sm:inset-x-[8%] sm:top-[18%] sm:bottom-[14%]">
        {/* —— Quran block —— */}
        <ArabicWriting
          text={bismillah}
          startDelay={tBismillah}
          className="w-full text-center font-display text-[clamp(1rem,4.2vw,1.45rem)] leading-[1.75]"
        />

        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: tDivider,
            duration: 0.9,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="mt-2 w-[min(68%,190px)] shrink-0 text-gold-muted"
        >
          <OrnamentDivider className="mx-auto h-4 w-full" />
        </motion.div>

        <div className="mt-2.5 flex w-full flex-col gap-1.5 sm:mt-3 sm:gap-2">
          <ArabicWriting
            text={line1}
            startDelay={tLine1}
            color="#5c4330"
            className="w-full text-balance text-center font-arabic text-[clamp(0.62rem,2.8vw,0.9rem)] leading-[1.8]"
          />
          <ArabicWriting
            text={line2}
            startDelay={tLine2}
            color="#5c4330"
            className="w-full text-balance text-center font-arabic text-[clamp(0.62rem,2.8vw,0.9rem)] leading-[1.8]"
          />
        </div>

        <ArabicWriting
          text={citation}
          startDelay={tCite}
          color="#5c4330"
          className="mt-2.5 w-full text-center font-arabic text-[clamp(0.65rem,2.5vw,0.85rem)] leading-[1.5] tracking-wide"
        />

        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: tDivider2,
            duration: 0.9,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="mt-2 w-[min(68%,190px)] shrink-0 text-gold-muted"
        >
          <OrnamentDivider className="mx-auto h-4 w-full" />
        </motion.div>

        {/* —— Ceremony block (same picture stack) —— */}
        <motion.div
          className="mt-5 flex w-full flex-col items-center text-center sm:mt-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.32, 0.72, 0, 1] }}
          dir="rtl"
          lang="ar"
        >
          <h2
            className="mt-3 font-display text-[clamp(1.75rem,8vw,2.4rem)] leading-[1.15]"
            style={{ color: GOLD }}
          >
            {names}
          </h2>

          <div className="mt-2.5 w-14 text-gold-muted">
            <DiamondRule className="mx-auto h-3.5 w-full" />
          </div>

          <div
            className="mt-3.5 flex flex-col gap-0.5 font-arabic text-[clamp(0.82rem,3.2vw,1.05rem)] leading-[1.75]"
            style={{ color: '#5c4330' }}
          >
            {wedding.invitation.lines.map((line) => (
              <p key={line} className="m-0">
                {line}
              </p>
            ))}
          </div>

          <div className="mt-4 w-[min(88%,220px)] text-gold-muted">
            <OrnamentFlourish className="mx-auto h-8 w-full" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * Hero: garden melts into cream mist → letter gold arch rises from the haze.
 * Matches the soft high-key dissolve of the invitation collage.
 */
export function Hero() {
  const { lang, t } = useLanguage()
  const { unlocked, gardenVideoRef, playGarden } = useMediaUnlock()

  useEffect(() => {
    const video = gardenVideoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    video.preload = 'auto'
    // Warm-load while envelope is still up
    video.load()
  }, [gardenVideoRef])

  useEffect(() => {
    if (!unlocked) return
    playGarden()
    const id = window.setInterval(playGarden, 400)
    const stop = window.setTimeout(() => window.clearInterval(id), 2500)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(stop)
    }
  }, [unlocked, playGarden])

  return (
    <section className="relative w-full" style={{ background: CREAM }}>
      <div className="relative mx-auto w-full max-w-[560px]">
        {/* —— Garden video —— */}
        <div className="relative h-[100dvh] overflow-hidden">
          <video
            ref={gardenVideoRef}
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
            src={heroMedia.gardenVideo}
            poster={heroMedia.gardenPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Soft melt into cream — ends before the letter so there’s no hard box edge */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[28%]"
            aria-hidden="true"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent 0%,
                rgba(${CREAM_RGBA}, 0.35) 45%,
                ${CREAM} 100%
              )`,
            }}
          />

          <div className="relative z-10 flex h-full flex-col items-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-8">
            <motion.div
              className="mt-[12vh] flex flex-col items-center text-center sm:mt-[14vh]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
            >
              <p
                className="font-display text-[clamp(1.35rem,5vw,1.85rem)] italic leading-none"
                style={{ color: GOLD, textShadow: TEXT_SHADOW }}
              >
                {lang === 'ar' ? 'يوم الزفاف' : 'Jour du mariage'}
              </p>
              <p
                className="mt-2.5 font-display text-[clamp(0.95rem,3.4vw,1.1rem)] tracking-[0.1em]"
                style={{ color: GOLD_SOFT, textShadow: TEXT_SHADOW }}
              >
                {t(wedding.dateDisplay)}
              </p>
            </motion.div>

            <motion.h1
              className="mt-[4vh] text-center font-display leading-[1.05]"
              style={{ color: GOLD, textShadow: TEXT_SHADOW }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 1.15,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <span className="block text-[clamp(2.4rem,11vw,3.6rem)]">
                {wedding.groom[lang]}
              </span>
              <span className="my-1.5 block text-[clamp(1.45rem,6vw,2.1rem)] opacity-90">
                &
              </span>
              <span className="block text-[clamp(2.4rem,11vw,3.6rem)]">
                {wedding.bride[lang]}
              </span>
            </motion.h1>

            <div className="flex-1" />

            <motion.a
              href="#quran-intro"
              className="mb-[max(2.5rem,10vh)] flex flex-col items-center gap-1"
              style={{ color: GOLD_SOFT, textShadow: TEXT_SHADOW }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.9 }}
            >
              <span className="font-display text-[clamp(1rem,3.6vw,1.15rem)] italic">
                {lang === 'ar' ? 'تابع للأسفل' : 'Défiler vers le bas'}
              </span>
              <CaretDown
                size={16}
                weight="light"
                className="animate-bounce opacity-80"
              />
            </motion.a>
          </div>
        </div>

        {/* Letter — transparent bottom dissolve stacks under countdown */}
        <div
          id="quran-intro"
          className="relative"
          style={{ background: 'transparent' }}
        >
          <QuranFrame />
        </div>
      </div>
    </section>
  )
}
