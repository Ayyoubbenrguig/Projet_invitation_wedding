/**
 * Decorative SVG ornaments for the classical Arabic invitation aesthetic.
 */

/** Horizontal flourish with central diamond — used between sections. */
export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 12H78M122 12H190"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.7"
      />
      <path
        d="M100 4L106 12L100 20L94 12L100 4Z"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <circle cx="100" cy="12" r="2" fill="currentColor" />
      <circle cx="86" cy="12" r="1.25" fill="currentColor" opacity="0.6" />
      <circle cx="114" cy="12" r="1.25" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

/** Short diamond rule — spacer under titles / names. */
export function DiamondRule({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 8H32M48 8H72"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.65"
      />
      <path
        d="M40 3L44 8L40 13L36 8L40 3Z"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
    </svg>
  )
}

/** Symmetrical vine flourish for the bottom of the ceremony card. */
export function OrnamentFlourish({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M120 8C118 18 112 24 120 36C128 24 122 18 120 8Z"
        stroke="currentColor"
        strokeWidth="0.85"
        fill="none"
      />
      <path
        d="M120 20C100 18 78 22 58 30C48 34 40 36 28 38"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M120 20C140 18 162 22 182 30C192 34 200 36 212 38"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M72 28C64 22 58 24 56 30C62 32 68 32 72 28Z"
        stroke="currentColor"
        strokeWidth="0.65"
        fill="none"
      />
      <path
        d="M168 28C176 22 182 24 184 30C178 32 172 32 168 28Z"
        stroke="currentColor"
        strokeWidth="0.65"
        fill="none"
      />
      <path
        d="M48 34C42 30 36 32 34 36C40 38 44 38 48 34Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M192 34C198 30 204 32 206 36C200 38 196 38 192 34Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.8"
      />
      <circle cx="120" cy="18" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Eight-pointed Islamic star (khatam) motif. */
export function IslamicStar({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 4L36.5 20.5L52 16L42 28L58 32L42 36L52 48L36.5 43.5L32 60L27.5 43.5L12 48L22 36L6 32L22 28L12 16L27.5 20.5L32 4Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

/** Corner arabesque bracket for invitation frames. */
export function CornerOrnament({
  className = '',
  flipX,
  flipY,
}: {
  className?: string
  flipX?: boolean
  flipY?: boolean
}) {
  const transform = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transform }}
    >
      <path
        d="M4 4C4 20 12 28 28 28M4 4H20M4 4V20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="2" fill="currentColor" />
      <path
        d="M12 12C16 16 20 18 28 20"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  )
}

/**
 * Blind-embossed floral vine for cream envelope flaps.
 * White-on-cream look via soft stroke + light fill.
 */
export function EmbossedFloral({
  className = '',
  flip,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* Main stem */}
      <path
        d="M40 12C38 48 28 70 40 110C52 150 34 178 40 210"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M40 12C38 48 28 70 40 110C52 150 34 178 40 210"
        stroke="rgba(180,160,130,0.28)"
        strokeWidth="0.6"
        strokeLinecap="round"
        transform="translate(0.6 0.8)"
      />

      {/* Leaves */}
      {[
        'M40 40C28 36 22 42 24 50C32 48 38 46 40 40Z',
        'M40 40C52 36 58 42 56 50C48 48 42 46 40 40Z',
        'M38 78C26 72 20 80 24 88C32 84 36 82 38 78Z',
        'M42 78C54 72 60 80 56 88C48 84 44 82 42 78Z',
        'M40 130C28 124 22 132 26 140C34 136 38 134 40 130Z',
        'M40 130C52 124 58 132 54 140C46 136 42 134 40 130Z',
        'M38 170C26 166 22 174 26 180C32 176 36 174 38 170Z',
        'M42 170C54 166 58 174 54 180C48 176 44 174 42 170Z',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="rgba(255,255,255,0.35)"
          stroke="rgba(200,180,150,0.35)"
          strokeWidth="0.4"
        />
      ))}

      {/* Five-petal flowers */}
      {[
        [40, 58],
        [36, 100],
        [44, 148],
        [38, 188],
      ].map(([cx, cy], i) => (
        <g key={`f-${i}`} transform={`translate(${cx} ${cy})`}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx={0}
              cy={-6}
              rx={3.2}
              ry={5}
              fill="rgba(255,255,255,0.4)"
              stroke="rgba(190,170,140,0.4)"
              strokeWidth="0.35"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle
            cx={0}
            cy={0}
            r={2.2}
            fill="rgba(255,255,255,0.55)"
            stroke="rgba(180,160,130,0.35)"
            strokeWidth="0.3"
          />
        </g>
      ))}
    </svg>
  )
}

/**
 * Burgundy melted wax seal with gold I&Z monogram (Imane & Zouhair).
 */
export function WaxSeal({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative h-[88px] w-[88px] md:h-[100px] md:w-[100px] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full drop-shadow-[0_10px_24px_rgba(60,10,20,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="waxBody" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#8B3A45" />
            <stop offset="45%" stopColor="#6B1F2A" />
            <stop offset="100%" stopColor="#3D1018" />
          </radialGradient>
          <radialGradient id="waxHighlight" cx="32%" cy="28%" r="45%">
            <stop offset="0%" stopColor="rgba(255,220,200,0.45)" />
            <stop offset="55%" stopColor="rgba(255,200,180,0.08)" />
            <stop offset="100%" stopColor="rgba(255,200,180,0)" />
          </radialGradient>
          <linearGradient id="goldMono" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0D78C" />
            <stop offset="45%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8A6E2E" />
          </linearGradient>
          <filter id="waxEmboss" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="0.8"
              floodColor="#1a0508"
              floodOpacity="0.5"
            />
          </filter>
        </defs>

        {/* Irregular melted wax edge */}
        <path
          d="M52.5 4.5C61 5 68.5 8.5 74 14.5C80.5 12.5 87 16 90.5 22.5C95.5 28 98 36 96.5 44C99 51 97.5 59 93.5 65.5C96 72.5 93 80 86.5 84.5C83 91.5 75.5 95.5 67.5 96.5C61 99.5 53.5 98.5 47.5 95.5C40 98.5 31.5 96.5 26 91C19.5 92.5 13 88.5 10 82C5.5 76.5 3.5 68.5 5 61C2 54 3.5 46 7.5 39.5C5 32.5 7.5 24.5 13.5 19.5C17 12.5 25 7.5 33.5 6.5C39.5 3.5 46.5 3.5 52.5 4.5Z"
          fill="url(#waxBody)"
        />
        <path
          d="M52.5 4.5C61 5 68.5 8.5 74 14.5C80.5 12.5 87 16 90.5 22.5C95.5 28 98 36 96.5 44C99 51 97.5 59 93.5 65.5C96 72.5 93 80 86.5 84.5C83 91.5 75.5 95.5 67.5 96.5C61 99.5 53.5 98.5 47.5 95.5C40 98.5 31.5 96.5 26 91C19.5 92.5 13 88.5 10 82C5.5 76.5 3.5 68.5 5 61C2 54 3.5 46 7.5 39.5C5 32.5 7.5 24.5 13.5 19.5C17 12.5 25 7.5 33.5 6.5C39.5 3.5 46.5 3.5 52.5 4.5Z"
          fill="url(#waxHighlight)"
        />

        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="32"
          fill="none"
          stroke="rgba(201,168,76,0.35)"
          strokeWidth="1.2"
        />
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="rgba(60,16,24,0.35)"
          strokeWidth="0.8"
        />

        {/* Gold I&Z monogram */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="url(#goldMono)"
          filter="url(#waxEmboss)"
          style={{
            fontFamily: "Amiri, 'Scheherazade New', Georgia, serif",
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          I&amp;Z
        </text>
      </svg>
    </div>
  )
}

/** Olive-green leaf fill used on countdown corner sprigs. */
const SPRIG_LEAF = '#6b7a4a'

/**
 * Corner berry-and-leaf sprig for the countdown invitation card.
 * Drawn for the top-start corner; mirror with flipX / flipY.
 */
export function BerryCornerSprig({
  className = '',
  flipX,
  flipY,
}: {
  className?: string
  flipX?: boolean
  flipY?: boolean
}) {
  const transform = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={transform ? { transform } : undefined}
    >
      {/* Main stem curving inward from the corner */}
      <path
        d="M8 8C18 22 28 38 42 52C56 66 72 78 98 92"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M8 8C14 28 22 48 38 64"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M18 14C34 18 52 28 64 42"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Olive leaves */}
      <path
        d="M28 36C22 30 16 32 14 38C20 42 26 42 28 36Z"
        fill={SPRIG_LEAF}
        opacity="0.85"
      />
      <path
        d="M48 54C42 46 34 48 32 56C40 60 46 60 48 54Z"
        fill={SPRIG_LEAF}
        opacity="0.8"
      />
      <path
        d="M36 28C44 24 50 28 48 36C42 36 38 34 36 28Z"
        fill={SPRIG_LEAF}
        opacity="0.75"
      />
      <path
        d="M58 68C66 62 74 66 72 74C64 74 60 72 58 68Z"
        fill={SPRIG_LEAF}
        opacity="0.7"
      />

      {/* Gold berries with soft highlight */}
      {[
        [10, 10],
        [22, 20],
        [16, 32],
        [34, 44],
        [46, 58],
        [62, 72],
        [78, 82],
        [94, 90],
        [54, 48],
        [70, 64],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={i < 3 ? 3.2 : 2.6} fill="currentColor" />
          <circle
            cx={cx - 0.8}
            cy={cy - 0.9}
            r={i < 3 ? 1.1 : 0.85}
            fill="rgba(255,255,255,0.35)"
          />
        </g>
      ))}
    </svg>
  )
}

/** Small leaf flourish flanking Arabic header lines. */
export function SideLeafFlourish({
  className = '',
  flip,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M4 14C10 10 16 8 28 12"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <path
        d="M18 12C14 6 8 6 6 12C10 14 14 14 18 12Z"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M24 14C22 8 18 8 16 14C18 16 22 16 24 14Z"
        stroke="currentColor"
        strokeWidth="0.65"
        fill="none"
      />
      <path
        d="M14 16C12 20 8 22 6 18C8 16 12 15 14 16Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.8"
      />
      <circle cx="28" cy="12" r="1.4" fill="currentColor" />
    </svg>
  )
}

/** Floral sunburst ornament above the mashallah line (matches countdown card). */
export function TopDotOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 14H42M78 14H112"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.65"
      />
      {/* Six-petal center bloom */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="60"
          cy="14"
          rx="3.2"
          ry="6.5"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${deg} 60 14)`}
        />
      ))}
      <circle cx="60" cy="14" r="2.4" fill="currentColor" />
      <circle cx="60" cy="14" r="1.1" fill="rgba(255,255,255,0.35)" />
    </svg>
  )
}

/**
 * Double-line ornate frame with inward-notched corners and a bottom diamond.
 * Percentage coords keep strokes clean when the cell aspect ratio changes.
 */
export function CountdownFrame({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <rect
        x="3.5"
        y="3.5"
        width="93"
        height="93"
        stroke="currentColor"
        strokeWidth="1.05"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.85"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d="M8 18C8 12 12 8 18 8"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M82 8C88 8 92 12 92 18"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M8 82C8 88 12 92 18 92"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M82 92C88 92 92 88 92 82"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />

      {/* Bottom-center diamond on the inner border */}
      <path
        d="M50 88L53.2 92L50 96L46.8 92Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** Round corner dots for countdown frames (separate so they never stretch). */
export function CountdownFrameDots({ className = '' }: { className?: string }) {
  const dot =
    'absolute h-[3px] w-[3px] rounded-full bg-current sm:h-[3.5px] sm:w-[3.5px]'
  return (
    <div className={className} aria-hidden="true">
      <span className={`${dot} top-[11%] left-[11%]`} />
      <span className={`${dot} top-[11%] right-[11%]`} />
      <span className={`${dot} bottom-[11%] left-[11%]`} />
      <span className={`${dot} right-[11%] bottom-[11%]`} />
    </div>
  )
}

/** Outlined heart with mirrored leafy stems — bottom centerpiece. */
export function HeartFlourish({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center heart outline */}
      <path
        d="M140 38C140 38 128 28 128 20C128 14 132 12 136 14C138 15 140 18 140 18C140 18 142 15 144 14C148 12 152 14 152 20C152 28 140 38 140 38Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />

      {/* Left stems */}
      <path
        d="M132 24C110 18 78 22 48 34C32 40 18 44 8 46"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <path
        d="M128 28C108 30 86 38 68 46"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M126 20C108 12 88 10 70 14"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Right stems (mirrored) */}
      <path
        d="M148 24C170 18 202 22 232 34C248 40 262 44 272 46"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <path
        d="M152 28C172 30 194 38 212 46"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M154 20C172 12 192 10 210 14"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Leaves left */}
      <path
        d="M88 28C80 20 70 22 68 30C76 34 84 34 88 28Z"
        stroke="currentColor"
        strokeWidth="0.65"
        fill="none"
      />
      <path
        d="M64 40C56 34 48 36 46 42C54 46 60 46 64 40Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M100 16C94 10 86 12 86 18C92 20 98 20 100 16Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />

      {/* Leaves right */}
      <path
        d="M192 28C200 20 210 22 212 30C204 34 196 34 192 28Z"
        stroke="currentColor"
        strokeWidth="0.65"
        fill="none"
      />
      <path
        d="M216 40C224 34 232 36 234 42C226 46 220 46 216 40Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M180 16C186 10 194 12 194 18C188 20 182 20 180 16Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
    </svg>
  )
}
