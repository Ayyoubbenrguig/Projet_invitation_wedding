import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { wedding } from '../../data/wedding'
import {
  CountdownFrame,
  CountdownFrameDots,
  HeartFlourish,
  OrnamentDivider,
  SideLeafFlourish,
  TopDotOrnament,
} from '../Ornaments'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

/** Western / French digits (0–9), zero-padded. */
function toFrenchDigits(n: number, pad = 2): string {
  return String(n).padStart(pad, '0')
}

const EASE = [0.32, 0.72, 0, 1] as const
const FRAME_SRC = '/media/countdown/back.png'

const copy = {
  mashallah: {
    ar: 'وذلك بمشيئة الله تعالى',
    fr: 'Par la volonté d’Allah',
  },
  remaining: {
    ar: 'والوقت المتبقي لحفل الزفاف',
    fr: 'Temps restant jusqu’au mariage',
  },
} as const

const lineVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.12 + i * 0.12, duration: 0.75, ease: EASE },
  }),
}

const boxVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.55 + i * 0.1,
      duration: 0.7,
      ease: EASE,
    },
  }),
}

/**
 * Animated digit that soft-flips whenever the value changes.
 */
function TickDigit({
  value,
  pad,
  className,
}: {
  value: number
  pad: number
  className?: string
}) {
  const display = toFrenchDigits(value, pad)
  return (
    <span className={`relative inline-grid overflow-hidden ${className ?? ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          className="col-start-1 row-start-1 tabular-nums"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/**
 * Botanical parchment countdown — stacked over the letter with a soft top fade.
 */
export function Countdown() {
  const { lang } = useLanguage()
  const [time, setTime] = useState<TimeLeft>(() =>
    getTimeLeft(new Date(wedding.dateISO)),
  )

  useEffect(() => {
    const target = new Date(wedding.dateISO)
    const id = window.setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => window.clearInterval(id)
  }, [])

  const units = [
    {
      value: time.days,
      label: { ar: 'يوم', fr: 'Jours' },
      pad: Math.max(2, String(time.days).length),
    },
    { value: time.hours, label: { ar: 'ساعة', fr: 'Heures' }, pad: 2 },
    { value: time.minutes, label: { ar: 'دقيقة', fr: 'Minutes' }, pad: 2 },
    { value: time.seconds, label: { ar: 'ثانية', fr: 'Secondes' }, pad: 2 },
  ]

  const dateLine =
    lang === 'ar'
      ? `${wedding.weekday.ar} ${wedding.dateDisplay.ar}`
      : `${wedding.weekday.fr} · ${wedding.dateDisplay.fr}`

  return (
    <section
      id="countdown"
      className="relative z-20 -mt-28 mx-auto w-full max-w-[560px] overflow-visible sm:-mt-32"
      style={{ background: 'transparent' }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="relative aspect-[9/16] w-full overflow-hidden"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: EASE }}
        style={{
          // Transparent dissolve top + bottom — stacks with letter and venue
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.55) 22%, #000 34%, #000 78%, rgba(0,0,0,0.5) 88%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.55) 22%, #000 34%, #000 78%, rgba(0,0,0,0.5) 88%, transparent 100%)',
        }}
      >
        <img
          src={FRAME_SRC}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />

        <div
          className="relative z-10 flex h-full flex-col items-center justify-center px-7 py-10 text-center sm:px-10 sm:py-12"
          style={{
            paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
            paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
          }}
        >
            <motion.div
              className="flex w-full flex-col items-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div custom={0} variants={lineVariants}>
                <TopDotOrnament className="h-5 w-28 text-gold-muted sm:h-6 sm:w-32" />
              </motion.div>

              <motion.div
                className="mt-5 flex w-full items-center justify-center gap-1.5 sm:mt-6 sm:gap-3"
                custom={1}
                variants={lineVariants}
              >
                <SideLeafFlourish className="h-4 w-5 shrink-0 text-gold-muted sm:h-5 sm:w-7" />
                <p
                  className="min-w-0 font-display text-[clamp(0.92rem,3.8vw,1.2rem)] leading-relaxed text-gold-muted"
                  lang={lang === 'ar' ? 'ar' : 'fr'}
                >
                  {copy.mashallah[lang]}
                </p>
                <SideLeafFlourish
                  className="h-4 w-5 shrink-0 text-gold-muted sm:h-5 sm:w-7"
                  flip
                />
              </motion.div>

              <motion.h2
                className="mt-4 font-display text-[clamp(1.35rem,6vw,2.15rem)] leading-snug text-gold-muted sm:mt-5"
                custom={2}
                variants={lineVariants}
              >
                {dateLine}
              </motion.h2>

              <motion.div custom={3} variants={lineVariants}>
                <OrnamentDivider className="mx-auto mt-4 h-5 w-36 text-gold-muted/75 sm:mt-5 sm:h-6 sm:w-44" />
              </motion.div>

              <motion.div
                className="mt-4 flex w-full items-center justify-center gap-1.5 sm:mt-5 sm:gap-3"
                custom={4}
                variants={lineVariants}
              >
                <SideLeafFlourish className="h-4 w-5 shrink-0 text-gold-muted max-[360px]:hidden sm:h-5 sm:w-7" />
                <p
                  className="min-w-0 font-display text-[clamp(0.82rem,3.4vw,1.1rem)] leading-relaxed text-gold-muted"
                  lang={lang === 'ar' ? 'ar' : 'fr'}
                >
                  {copy.remaining[lang]}
                </p>
                <SideLeafFlourish
                  className="h-4 w-5 shrink-0 text-gold-muted max-[360px]:hidden sm:h-5 sm:w-7"
                  flip
                />
              </motion.div>
            </motion.div>

            <div className="mt-7 grid w-full max-w-[19.5rem] grid-cols-4 gap-1.5 sm:mt-9 sm:max-w-[22rem] sm:gap-2.5">
              {units.map((unit, i) => (
                <motion.div
                  key={unit.label.fr}
                  className="relative flex min-h-[4.6rem] flex-col items-center justify-center px-0.5 pb-3 pt-2.5 sm:min-h-[5.75rem] sm:pb-4 sm:pt-3"
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={boxVariants}
                >
                  <CountdownFrame className="pointer-events-none absolute inset-0 h-full w-full text-gold-muted" />
                  <CountdownFrameDots className="pointer-events-none absolute inset-0 text-gold-muted" />
                  <TickDigit
                    value={unit.value}
                    pad={unit.pad}
                    className="relative z-10 font-display text-[clamp(1.15rem,5vw,1.85rem)] leading-none text-gold-muted"
                  />
                  <span className="relative z-10 mt-1 font-display text-[clamp(0.62rem,2.6vw,0.88rem)] leading-tight text-gold-muted/90">
                    {unit.label[lang]}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 sm:mt-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.95, duration: 0.7, ease: EASE }}
            >
              <OrnamentDivider className="mx-auto h-5 w-36 text-gold-muted/70 sm:h-6 sm:w-44" />
              <HeartFlourish className="mx-auto mt-3 h-9 w-40 text-gold-muted sm:mt-4 sm:h-11 sm:w-52" />
            </motion.div>
          </div>
        </motion.div>
    </section>
  )
}
