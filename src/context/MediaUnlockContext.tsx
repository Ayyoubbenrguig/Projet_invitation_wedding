import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'

type MediaUnlockContextValue = {
  /** True after the user taps the envelope (iOS gesture unlock). */
  unlocked: boolean
  /** Call synchronously inside the envelope tap handler. */
  unlock: () => void
  /** Shared garden video ref so envelope tap can start playback immediately. */
  gardenVideoRef: RefObject<HTMLVideoElement | null>
  /** Start the garden loop — safe to call repeatedly (iOS muted + playsInline). */
  playGarden: () => void
}

const MediaUnlockContext = createContext<MediaUnlockContextValue | null>(null)

/**
 * Bridges the envelope tap (user gesture) to the garden hero video so iPhone
 * Safari allows autoplay after the letter opens.
 */
export function MediaUnlockProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const gardenVideoRef = useRef<HTMLVideoElement | null>(null)

  const playGarden = useCallback(() => {
    const video = gardenVideoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    const play = () => {
      const p = video.play()
      if (p !== undefined) p.catch(() => {})
    }
    play()
    if (video.readyState < 2) {
      video.addEventListener('loadeddata', play, { once: true })
      video.load()
    }
  }, [])

  const unlock = useCallback(() => {
    setUnlocked(true)
    playGarden()
  }, [playGarden])

  const value = useMemo(
    () => ({ unlocked, unlock, gardenVideoRef, playGarden }),
    [unlocked, unlock, playGarden],
  )

  return (
    <MediaUnlockContext.Provider value={value}>
      {children}
    </MediaUnlockContext.Provider>
  )
}

export function useMediaUnlock() {
  const ctx = useContext(MediaUnlockContext)
  if (!ctx) {
    throw new Error('useMediaUnlock must be used within MediaUnlockProvider')
  }
  return ctx
}
