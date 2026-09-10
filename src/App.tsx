import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { EnvelopeScene } from './components/EnvelopeScene'
import { Invitation } from './components/Invitation'
import { LanguageProvider } from './context/LanguageContext'
import { MediaUnlockProvider } from './context/MediaUnlockContext'

type Gate = 'envelope' | 'invite'

/**
 * Envelope-first entry. Invitation stays mounted underneath so the garden
 * video can preload and start on the same iPhone tap that opens the letter.
 * Layout is full-bleed mobile web (not a faux phone frame).
 */
export default function App() {
  const [gate, setGate] = useState<Gate>('envelope')

  const handleEnvelopeDone = useCallback(() => {
    setGate('invite')
  }, [])

  const inviteLive = gate === 'invite'

  return (
    <LanguageProvider>
      <MediaUnlockProvider>
        <div className="relative min-h-[100dvh] overflow-x-clip bg-[#f5efe6]">
          <div className="grain" aria-hidden="true" />

          {/* Full-width invitation stage — real mobile web, not a 430px phone chrome */}
          <div
            className={`relative mx-auto w-full max-w-none ${
              inviteLive ? '' : 'pointer-events-none'
            }`}
            aria-hidden={!inviteLive}
          >
            <Invitation />
          </div>

          <AnimatePresence>
            {gate === 'envelope' && (
              <EnvelopeScene key="envelope" onOpen={handleEnvelopeDone} />
            )}
          </AnimatePresence>
        </div>
      </MediaUnlockProvider>
    </LanguageProvider>
  )
}
