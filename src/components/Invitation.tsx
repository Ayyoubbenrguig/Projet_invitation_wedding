import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Hero } from './sections/Hero'
import { Countdown } from './sections/Countdown'
import { Venue } from './sections/Venue'
import { GuestMessage } from './sections/GuestMessage'

/**
 * Full invitation experience revealed after the envelope opens.
 */
export function Invitation() {
  const { lang, toggle } = useLanguage()

  return (
    <motion.main
      className="relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
    >
      <button
        type="button"
        onClick={toggle}
        className="fixed top-[max(1.25rem,env(safe-area-inset-top))] end-[max(1.25rem,env(safe-area-inset-right))] z-30 rounded-full border border-gold/30 bg-cream/80 px-3.5 py-2 font-ui text-[11px] text-ink/70 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-gold/55 active:scale-[0.98]"
      >
        {lang === 'ar' ? 'Français' : 'العربية'}
      </button>

      <Hero />
      <Countdown />
      <Venue />
      <GuestMessage />
    </motion.main>
  )
}
