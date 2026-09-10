import { useLanguage } from '../../context/LanguageContext'
import { wedding } from '../../data/wedding'
import { CREAM } from '../../theme'
import { IslamicStar, OrnamentDivider } from '../Ornaments'
import { ScrollReveal, ScrollRevealItem } from '../ScrollReveal'

/**
 * Closing blessing — quiet farewell with staggered scroll entrance.
 */
export function Closing() {
  const { lang } = useLanguage()

  return (
    <section
      className="relative px-6 py-28 text-center md:py-36"
      style={{ background: CREAM }}
    >
      <ScrollReveal
        className="mx-auto max-w-xl"
        variant="fadeUp"
        staggerChildren={0.1}
      >
        <ScrollRevealItem>
          <p className="font-display text-xl leading-relaxed text-gold-muted md:text-2xl">
            {wedding.verse.ar}
          </p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="mt-3 font-ui text-xs tracking-widest text-ink/35">
            {wedding.verse.ref}
          </p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <OrnamentDivider className="mx-auto mt-10 h-6 w-40 text-gold/40" />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <IslamicStar className="mx-auto mt-10 h-8 w-8 text-gold/50" />
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="mt-8 font-ui text-sm text-ink/50">
            {lang === 'ar' ? 'نأمل رؤيتكم هناك' : 'Au plaisir de vous y voir'}
          </p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <p className="mt-3 font-display text-3xl text-ink md:text-4xl">
            {wedding.groom[lang]} & {wedding.bride[lang]}
          </p>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  )
}
