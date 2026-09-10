import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useMediaUnlock } from '../context/MediaUnlockContext'
import { envelopeMedia } from '../data/envelopeMedia'
import { CREAM } from '../theme'

type EnvelopeSceneProps = {
  /** Called once the open video has faded out and the invitation should take over. */
  onOpen: () => void
}

type Phase = 'sealed' | 'playing' | 'fading'

/** Start the invitation fade this many seconds before the video ends. */
const FADE_BEFORE_END_S = 2

/**
 * Soft warm paper shadows — desktop only; phone is full-bleed native.
 */
const CARD_SHADOW = [
  '0 1px 2px rgba(80, 55, 30, 0.06)',
  '0 8px 24px rgba(80, 55, 30, 0.1)',
  '0 28px 56px rgba(80, 55, 30, 0.14)',
  '0 48px 80px rgba(60, 40, 20, 0.08)',
].join(', ')

/**
 * Envelope gate — full-bleed on phone, elevated card on larger screens.
 * Unlocking media on tap so the garden hero can play on iPhone Safari.
 */
export function EnvelopeScene({ onOpen }: EnvelopeSceneProps) {
  const { lang, toggle } = useLanguage()
  const { unlock, playGarden } = useMediaUnlock()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('sealed')
  const fadingRef = useRef(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const beginFade = useCallback(() => {
    if (fadingRef.current) return
    fadingRef.current = true
    const video = videoRef.current
    if (video) {
      video.pause()
    }
    playGarden()
    setPhase('fading')
    window.setTimeout(onOpen, 1000)
  }, [onOpen, playGarden])

  const startOpen = useCallback(() => {
    if (phase !== 'sealed') return
    // Same user gesture — unlock + start garden for iOS Safari
    unlock()
    setPhase('playing')
    fadingRef.current = false

    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    video.currentTime = 0
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        beginFade()
      })
    }
  }, [phase, beginFade, unlock])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration || fadingRef.current) return

    if (video.currentTime >= video.duration - FADE_BEFORE_END_S) {
      beginFade()
    }
  }, [beginFade])

  const handleEnded = useCallback(() => {
    beginFade()
  }, [beginFade])

  const showPoster = phase === 'sealed'
  const showVideo = phase === 'playing' || phase === 'fading'
  const isFading = phase === 'fading'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-[100dvh] w-full items-center justify-center overflow-hidden"
      style={{ background: CREAM }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{
        duration: isFading ? 1.05 : 0.55,
        ease: [0.32, 0.72, 0, 1],
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden="true"
        style={{
          background: `radial-gradient(
            ellipse 70% 55% at 50% 48%,
            rgba(255, 250, 240, 0.55) 0%,
            transparent 70%
          )`,
        }}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          toggle()
        }}
        className="absolute top-[max(1.25rem,env(safe-area-inset-top))] end-[max(1.25rem,env(safe-area-inset-right))] z-50 rounded-full border border-black/10 bg-white/60 px-3.5 py-2 font-ui text-xs tracking-wide text-ink/70 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ink/25 active:scale-[0.98]"
      >
        {lang === 'ar' ? 'Français' : 'العربية'}
      </button>

      <motion.button
        type="button"
        onClick={startOpen}
        disabled={phase !== 'sealed'}
        aria-label={lang === 'ar' ? 'افتح الدعوة' : 'Open invitation'}
        className="relative z-10 h-full w-full cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ink/20 disabled:cursor-default md:mx-auto md:h-auto md:w-[min(100%,430px)] md:px-3"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="relative mx-auto flex h-full w-full justify-center md:h-auto">
          <div
            className="pointer-events-none absolute inset-x-[12%] -bottom-[5%] z-0 hidden h-[12%] rounded-[50%] md:block"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(80,55,30,0.22) 0%, transparent 72%)',
              filter: 'blur(12px)',
            }}
          />

          <div
            className="relative z-[1] h-full w-full overflow-hidden bg-[#f7efe4] md:aspect-[9/16] md:h-auto md:max-h-[88dvh] md:max-w-[min(100%,430px,calc(88dvh*9/16))] md:rounded-[10px]"
          >
            {/* Desktop paper depth via class — avoid inline shadow on mobile full-bleed */}
            <div
              className="pointer-events-none absolute inset-0 z-0 hidden md:block"
              aria-hidden="true"
              style={{ boxShadow: CARD_SHADOW }}
            />

            <video
              ref={videoRef}
              className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
              src={envelopeMedia.openVideo}
              playsInline
              muted
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              style={{
                opacity: showVideo ? 1 : 0,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
              }}
              aria-hidden={!showVideo}
            />

            <AnimatePresence>
              {showPoster && (
                <motion.img
                  key="poster"
                  src={envelopeMedia.poster}
                  alt=""
                  className="absolute inset-0 z-[2] h-full w-full select-none object-cover object-center"
                  draggable={false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                />
              )}
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 z-[3] hidden md:block md:rounded-[10px]"
              aria-hidden="true"
              style={{
                boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.35), inset 0 0 0 1px rgba(80,55,30,0.06)',
              }}
            />

            <AnimatePresence>
              {showPoster && (
                <motion.div
                  key="cta"
                  className="pointer-events-none absolute inset-x-0 bottom-[max(1.75rem,env(safe-area-inset-bottom))] z-10 flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                >
                  <span
                    className="chevron-nudge font-display text-xl leading-none text-[#c4b49a]"
                    aria-hidden="true"
                  >
                    ˄
                  </span>
                  <span className="font-ui text-[11px] tracking-[0.35em] text-[#c4b49a] uppercase">
                    {lang === 'ar' ? 'اضغط للفتح' : 'Tap to Open'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}
