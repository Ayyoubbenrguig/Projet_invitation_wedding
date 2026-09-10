# زهير و ايمان — دعوة زفاف كلاسيكية

Arabic classical wedding invitation with a sealed-envelope opening animation.

Inspired by [The Sacred Garden](https://webgencyinvitations.com/thesacredgarden), rebuilt in React with full RTL Arabic support.

## Stack

- **React 19 + Vite 8 + TypeScript**
- **Tailwind CSS v4** — design tokens for ink / gold / parchment
- **Framer Motion** — page transitions & scroll reveals
- **GSAP** — envelope flap + wax-seal choreography
- **@fontsource/amiri · scheherazade-new · cairo** — classical Arabic typography
- **@phosphor-icons/react** — light-line icons

## Run

```bash
npm install
npm run dev
```

Open the local URL, tap the wax seal to open the invitation.

## Customize

Edit `src/data/wedding.ts` for names, date, venue, schedule, dress code, and RSVP copy.

## Features

- **Video envelope gate** (Sacred Garden pattern): sealed poster → tap → open video → opacity fade → invitation
- Bilingual AR / EN toggle (document `dir` sync)
- Countdown with Eastern Arabic numerals in AR mode
- Schedule timeline, venue map link, dress/gift notes
- RSVP form (stores submissions in `localStorage` until a backend is wired)

## Envelope media

Drop replacements here (keep filenames):

```
public/media/envelope/
  poster.png   ← sealed still
  open.mp4     ← open animation (tap)
```

**Upload specs for `open.mp4`:** 9:16 portrait, 720×1280 or 1080×1920, MP4 H.264, ~3–6s. First frame should match the poster.

Paths are in `src/data/envelopeMedia.ts`.
