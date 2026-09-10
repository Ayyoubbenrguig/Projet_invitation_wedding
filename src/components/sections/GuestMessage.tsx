import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { wedding } from '../../data/wedding'
import {
  HeartFlourish,
  OrnamentDivider,
  TopDotOrnament,
} from '../Ornaments'

const EASE = [0.32, 0.72, 0, 1] as const
const BACK_SRC = '/media/venue/back.png'

/** Soft transparent edge — same collage language as countdown ↔ venue. */
const STACK_MASK =
  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.7) 16%, #000 24%, #000 80%, rgba(0,0,0,0.55) 90%, transparent 100%)'

/**
 * Guest courtesy note — stacked over venue with soft transparent fades.
 */
export function GuestMessage() {
  const { lang, t } = useLanguage()
  const lines = wedding.guestMessage.lines[lang]

  return (
    <section
      id="guest-message"
      className="relative z-40 -mt-16 mx-auto w-full max-w-[560px] overflow-visible sm:-mt-20"
      style={{ background: 'transparent' }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, ease: EASE }}
        style={{
          WebkitMaskImage: STACK_MASK,
          maskImage: STACK_MASK,
        }}
      >
        <img
          src={BACK_SRC}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />

        <div className="relative z-10 flex flex-col items-center px-8 py-10 text-center sm:px-10 sm:py-12">
          <TopDotOrnament className="h-5 w-28 text-gold-muted sm:h-6 sm:w-32" />

          <h2 className="mt-6 font-display text-[clamp(1.45rem,5.8vw,2rem)] leading-snug text-gold-muted">
            {t(wedding.guestMessage.title)}
          </h2>

          <OrnamentDivider className="mx-auto mt-5 h-5 w-36 text-gold-muted/70 sm:h-6 sm:w-44" />

          <div className="mt-6 max-w-[20rem] space-y-1 font-arabic text-[clamp(0.92rem,3.6vw,1.1rem)] leading-[1.85] text-[#5c4330]/90 sm:max-w-[22rem]">
            {lines.map((line) => (
              <p key={line} className="m-0">
                {line}
              </p>
            ))}
          </div>

          <HeartFlourish className="mx-auto mt-8 h-9 w-40 text-gold-muted sm:mt-10 sm:h-11 sm:w-52" />
        </div>
      </motion.div>
    </section>
  )
}
