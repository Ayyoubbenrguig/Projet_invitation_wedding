/**
 * Envelope intro media — drop replacement files in `public/media/envelope/`.
 */
export const envelopeMedia = {
  /** Still frame shown before tap (cream sealed envelope). */
  poster: '/media/envelope/poster.png',
  /** Opening clip — plays on tap, then fades into the letter. */
  openVideo: '/media/envelope/open.mp4',
  /** Ornate empty arch frame shown after the envelope. */
  letterFrame: '/media/envelope/letter-frame.png',
} as const

/** Recommended export settings when creating a new open video. */
export const envelopeMediaSpecs = {
  aspect: '9:16 portrait',
  resolution: '720×1280 (or 1080×1920)',
  format: 'MP4 (H.264 + AAC)',
  durationHint: '3–6 seconds',
  poster: 'PNG/JPG matching the first frame of the video',
} as const
