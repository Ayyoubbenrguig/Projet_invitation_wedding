import { motion } from 'framer-motion'
import { MapPin, Car } from '@phosphor-icons/react'
import { useLanguage } from '../../context/LanguageContext'
import { wedding } from '../../data/wedding'
import {
  DiamondRule,
  HeartFlourish,
  OrnamentDivider,
  SideLeafFlourish,
  TopDotOrnament,
} from '../Ornaments'

const EASE = [0.32, 0.72, 0, 1] as const
const BACK_SRC = '/media/venue/back.png'
const PALAIS_SRC = '/media/venue/palais.png'

/** Soft transparent top only — bottom stays solid so the next picture connects cleanly. */
const STACK_MASK =
  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.7) 16%, #000 24%)'

const lineVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(5px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.1 + i * 0.1, duration: 0.7, ease: EASE },
  }),
}

/**
 * Venue card — stacked over countdown with soft transparent fades.
 */
export function Venue() {
  const { lang, t } = useLanguage()
  const addressLines = wedding.location.addressLines[lang]
  const mapEmbed = `https://maps.google.com/maps?q=${wedding.location.mapEmbedQuery}&z=15&output=embed`

  return (
    <section
      id="venue"
      className="relative z-30 -mt-16 mx-auto w-full max-w-[560px] overflow-visible sm:-mt-20"
      style={{ background: 'transparent' }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: EASE }}
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

        <div className="relative z-10 flex flex-col items-center px-6 pb-8 pt-10 text-center sm:px-8 sm:pb-10 sm:pt-12">
          <motion.div
            className="flex w-full flex-col items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div custom={0} variants={lineVariants}>
              <TopDotOrnament className="h-5 w-28 text-gold-muted sm:h-6 sm:w-32" />
            </motion.div>

            <motion.div
              className="mt-4 flex items-center justify-center gap-2 sm:gap-3"
              custom={1}
              variants={lineVariants}
            >
              <SideLeafFlourish className="h-4 w-5 shrink-0 text-gold-muted sm:h-5 sm:w-7" />
              <p className="font-display text-[clamp(1rem,4vw,1.2rem)] text-gold-muted">
                {t(wedding.location.label)}
              </p>
              <SideLeafFlourish
                className="h-4 w-5 shrink-0 text-gold-muted sm:h-5 sm:w-7"
                flip
              />
            </motion.div>

            <motion.h2
              className="mt-3 font-display text-[clamp(1.85rem,7.5vw,2.55rem)] leading-snug text-gold-muted"
              custom={2}
              variants={lineVariants}
            >
              {t(wedding.location.name)}
            </motion.h2>

            <motion.div
              className="mt-2 space-y-0.5 font-arabic text-[clamp(0.85rem,3.2vw,1rem)] leading-relaxed text-[#5c4330]/80"
              custom={3}
              variants={lineVariants}
            >
              {addressLines.map((line) => (
                <p key={line} className="m-0">
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.div custom={4} variants={lineVariants}>
              <DiamondRule className="mx-auto mt-4 h-4 w-16 text-gold-muted/80" />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-5 w-full max-w-[22rem] sm:mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.25, duration: 0.85, ease: EASE }}
          >
            <img
              src={PALAIS_SRC}
              alt={t(wedding.location.name)}
              className="mx-auto h-auto w-full object-contain"
              draggable={false}
            />
          </motion.div>

          <OrnamentDivider className="mx-auto mt-5 h-5 w-36 text-gold-muted/70 sm:mt-6 sm:h-6 sm:w-44" />

          <motion.div
            className="mt-5 w-full overflow-hidden rounded-2xl border border-gold/35 bg-cream/40 shadow-[0_8px_28px_rgba(80,60,40,0.08)] sm:mt-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
          >
            <div className="relative aspect-[16/11] w-full">
              <iframe
                title={t(wedding.location.name)}
                src={mapEmbed}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div
            className="mt-4 grid w-full grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
          >
            <a
              href={wedding.location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-[rgba(250,246,239,0.92)] px-2.5 py-3 font-ui text-[clamp(0.68rem,2.8vw,0.82rem)] text-[#5c4330] transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-gold/65 active:scale-[0.98]"
            >
              <Car size={15} weight="light" className="shrink-0 text-gold-muted" />
              <span className="leading-tight">
                {lang === 'ar' ? 'الاتجاهات' : 'Itinéraire'}
              </span>
            </a>
            <a
              href={wedding.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-[rgba(250,246,239,0.92)] px-2.5 py-3 font-ui text-[clamp(0.68rem,2.8vw,0.82rem)] text-[#5c4330] transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-gold/65 active:scale-[0.98]"
            >
              <MapPin size={15} weight="light" className="shrink-0 text-gold-muted" />
              <span className="leading-tight">
                {lang === 'ar' ? 'فتح في خرائط جوجل' : 'Ouvrir dans Google Maps'}
              </span>
            </a>
          </motion.div>

          <motion.div
            className="mt-7 sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          >
            <HeartFlourish className="mx-auto h-9 w-40 text-gold-muted sm:h-11 sm:w-52" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
