import type { ReactElement } from 'react'
import type { DestinationIconKey } from '../../data/destinations'

const S = {
  common: {
    width: 32,
    height: 32,
    viewBox: '0 0 32 32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
  },
}

function IconNearby() {
  return (
    <svg {...S.common}>
      <path
        d="M6 22 L26 10 L15 15 L10 26 Z"
        fill="currentColor"
        opacity={0.95}
      />
      <path
        d="M15 15 L22 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  )
}

function IconHanok() {
  return (
    <svg {...S.common}>
      <path
        d="M6 18 Q16 8 26 18 L26 20 L6 20 Z"
        fill="currentColor"
        opacity={0.9}
      />
      <rect x="9" y="20" width="14" height="9" rx="1" fill="currentColor" />
      <path d="M13 24h6" stroke="#ffffff" strokeWidth={1.2} opacity={0.9} />
    </svg>
  )
}

function IconLighthouse() {
  return (
    <svg {...S.common}>
      <path d="M14 6 L18 6 L17 10 L15 10 Z" fill="currentColor" />
      <circle cx="16" cy="5" r="2.5" fill="currentColor" />
      <path
        d="M12 10 L20 10 L18 28 L14 28 Z"
        fill="currentColor"
        opacity={0.85}
      />
      <path
        d="M12 16h8 M12 21h8"
        stroke="#ffffff"
        strokeWidth={1}
        opacity={0.55}
      />
    </svg>
  )
}

function IconSeaside() {
  return (
    <svg {...S.common}>
      <rect x="10" y="12" width="12" height="8" rx="1" fill="currentColor" />
      <path
        d="M6 22 Q10 19 14 22 T22 22 T28 22"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22" cy="9" r="3" fill="currentColor" opacity={0.35} />
    </svg>
  )
}

function IconCityNight() {
  return (
    <svg {...S.common}>
      <rect x="6" y="14" width="6" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="10" width="7" height="18" rx="1" fill="currentColor" />
      <rect x="23" y="16" width="5" height="12" rx="1" fill="currentColor" />
      <circle cx="9" cy="18" r="1" fill="#ffffff" opacity={0.85} />
      <circle cx="17" cy="14" r="1" fill="#ffffff" opacity={0.85} />
      <circle cx="17" cy="20" r="1" fill="#ffffff" opacity={0.85} />
    </svg>
  )
}

function IconNature() {
  return (
    <svg {...S.common}>
      <path
        d="M4 26 L12 12 L16 18 L20 10 L28 26 Z"
        fill="currentColor"
        opacity={0.85}
      />
      <path
        d="M20 10 L22 6 L24 10"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function IconLake() {
  return (
    <svg {...S.common}>
      <path
        d="M4 18 Q10 14 16 18 T28 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 23 Q12 19 20 23 T30 23"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
        opacity={0.65}
      />
      <path
        d="M6 27 Q14 24 22 27"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.45}
      />
    </svg>
  )
}

function IconMetro() {
  return (
    <svg {...S.common}>
      <rect x="7" y="12" width="6" height="14" rx="1" fill="currentColor" />
      <rect x="15" y="8" width="10" height="18" rx="1" fill="currentColor" />
      <rect x="8" y="16" width="2" height="2" rx="0.5" fill="#ffffff" opacity={0.9} />
      <rect x="18" y="12" width="2" height="2" rx="0.5" fill="#ffffff" opacity={0.9} />
    </svg>
  )
}

function IconHeritage() {
  return (
    <svg {...S.common}>
      <path
        d="M8 22 L16 10 L24 22 Z"
        fill="currentColor"
        opacity={0.9}
      />
      <rect x="11" y="22" width="10" height="6" rx="1" fill="currentColor" />
      <path d="M14 22v6 M18 22v6" stroke="#ffffff" strokeWidth={1} opacity={0.85} />
    </svg>
  )
}

function IconIsland() {
  return (
    <svg {...S.common}>
      <circle cx="22" cy="9" r="4" fill="currentColor" opacity={0.4} />
      <path
        d="M6 24 Q14 18 22 22 Q26 24 28 22"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M12 20 L13 16 L15 19" stroke="currentColor" strokeWidth={1.5} fill="none" />
    </svg>
  )
}

function IconDefault() {
  return (
    <svg {...S.common}>
      <path
        d="M16 6 C12 6 9 9 9 13 C9 18 16 26 16 26 C16 26 23 18 23 13 C23 9 20 6 16 6 Z"
        fill="currentColor"
      />
      <circle cx="16" cy="13" r="2.5" fill="#ffffff" />
    </svg>
  )
}

const ICON_RENDERERS: Record<DestinationIconKey, () => ReactElement> = {
  nearby: IconNearby,
  hanok: IconHanok,
  lighthouse: IconLighthouse,
  seaside: IconSeaside,
  seasideWarm: IconSeaside,
  cityNight: IconCityNight,
  nature: IconNature,
  lake: IconLake,
  metro: IconMetro,
  heritage: IconHeritage,
  island: IconIsland,
  default: IconDefault,
}

export function DestinationSuggestIcon({ iconKey }: { iconKey: DestinationIconKey }) {
  const Render = ICON_RENDERERS[iconKey] ?? ICON_RENDERERS.default
  return <Render />
}
