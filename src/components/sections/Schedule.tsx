import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { wedding } from '../../data/wedding'
import { CREAM, CREAM_SOFT } from '../../theme'
import { OrnamentDivider } from '../Ornaments'
import { Reveal } from '../Reveal'

/**
 * Vertical timeline of celebration events — continues the shared cream river.
 */
export function Schedule() {
  const { lang, t } = useLanguage()

  return (
    <section
      className="relative -mt-6 px-6 pt-8 pb-24 sm:-mt-8 sm:pt-10 md:pb-32"
      style={{
        background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM_SOFT} 48%, ${CREAM} 100%)`,
      }}
    >
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="font-ui text-[11px] tracking-[0.28em] text-gold/60 uppercase">
          {lang === 'ar' ? 'برنامج الحفل' : 'Programme'}
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
          {lang === 'ar' ? 'جدول المناسبات' : 'Le déroulement de la soirée'}
        </h2>
        <OrnamentDivider className="mx-auto mt-5 h-6 w-36 text-gold/50" />

        <ol className="relative mt-14 space-y-0">
          {/* Vertical gold spine */}
          <div
            className="absolute start-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
            aria-hidden="true"
          />

          {wedding.schedule.map((item, i) => (
            <motion.li
              key={item.title.fr}
              className="relative flex flex-col items-center py-6"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <span className="relative z-10 mb-3 flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 rounded-full bg-gold/80" />
                <span className="absolute h-5 w-5 rounded-full border border-gold/30" />
              </span>
              <p className="font-display text-2xl text-gold-bright">{item.time}</p>
              <p className="mt-1 font-ui text-base text-ink/65">
                {t(item.title)}
              </p>
            </motion.li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
