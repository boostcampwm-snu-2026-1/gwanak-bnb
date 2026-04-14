export const DESTINATION_ICON_KEYS = [
  'nearby',
  'hanok',
  'lighthouse',
  'seaside',
  'seasideWarm',
  'cityNight',
  'nature',
  'lake',
  'metro',
  'heritage',
  'island',
  'default',
] as const

export type DestinationIconKey = (typeof DESTINATION_ICON_KEYS)[number]

export type Destination = {
  id: string
  label: string
  subtitle?: string
  tagline?: string
  iconKey: DestinationIconKey
}

export const DESTINATION_CATALOG: Destination[] = [
  {
    id: 'nearby-experiences',
    label: '근처 체험 찾기',
    tagline: '가까운 곳에서 즐길 수 있는 체험을 찾아보세요.',
    iconKey: 'nearby',
  },
  {
    id: 'gwanak',
    label: '관악구',
    subtitle: '서울',
    tagline: '캠퍼스와 산이 어우러진 동네',
    iconKey: 'nature',
  },
  {
    id: 'seoul',
    label: '서울',
    subtitle: '대한민국',
    tagline: '도시 여행의 중심',
    iconKey: 'metro',
  },
  {
    id: 'gangnam',
    label: '강남구',
    subtitle: '서울',
    tagline: '쇼핑과 야경이 어우러진 곳',
    iconKey: 'cityNight',
  },
  {
    id: 'mapo',
    label: '마포구',
    subtitle: '서울',
    tagline: '홍대·연남의 감성 스폿',
    iconKey: 'metro',
  },
  {
    id: 'jongno',
    label: '종로구',
    subtitle: '서울',
    tagline: '궁궐과 한옥이 있는 역사 거리',
    iconKey: 'heritage',
  },
  {
    id: 'yeongdeungpo',
    label: '영등포구',
    subtitle: '서울',
    tagline: '한강과 더현대가 있는 비즈니스 허브',
    iconKey: 'seaside',
  },
  {
    id: 'busan',
    label: '부산',
    subtitle: '대한민국',
    tagline: '해변과 해산물로 유명한 항구 도시',
    iconKey: 'hanok',
  },
  {
    id: 'jeju',
    label: '제주도',
    subtitle: '대한민국',
    tagline: '자연과 오름이 있는 휴양지',
    iconKey: 'lighthouse',
  },
  {
    id: 'gyeongju',
    label: '경주',
    subtitle: '경상북도',
    tagline: '신라 유적과 야경이 있는 곳',
    iconKey: 'heritage',
  },
  {
    id: 'gangwon',
    label: '강릉',
    subtitle: '강원도',
    tagline: '바다와 커피거리가 있는 동해안',
    iconKey: 'nature',
  },
  {
    id: 'jeonju',
    label: '전주 한옥마을',
    subtitle: '전북',
    tagline: '한옥과 맛집이 모인 골목',
    iconKey: 'hanok',
  },
  {
    id: 'busan-haeundae',
    label: '해운대',
    subtitle: '부산',
    tagline: '해변 산책에 인기 있는 곳',
    iconKey: 'seasideWarm',
  },
  {
    id: 'incheon',
    label: '인천',
    subtitle: '대한민국',
    tagline: '공항·차이나타운·바다가 가까운 도시',
    iconKey: 'seaside',
  },
  {
    id: 'daejeon',
    label: '대전',
    subtitle: '대한민국',
    tagline: '과학단지와 유성온천',
    iconKey: 'metro',
  },
  {
    id: 'daegu',
    label: '대구',
    subtitle: '대한민국',
    tagline: '섬유·야시장이 있는 내륙 도시',
    iconKey: 'cityNight',
  },
]

export const DEFAULT_SUGGESTION_ORDER: string[] = [
  'nearby-experiences',
  'gwanak',
  'seoul',
  'jeju',
  'gangnam',
  'busan',
  'gyeongju',
]

export function getDefaultSuggestions(
  catalog: Destination[] = DESTINATION_CATALOG,
  order: string[] = DEFAULT_SUGGESTION_ORDER,
): Destination[] {
  const byId = new Map(catalog.map((d) => [d.id, d]))
  return order
    .map((id) => byId.get(id))
    .filter((d): d is Destination => d !== undefined)
}

export function filterDestinations(
  query: string,
  catalog: Destination[] = DESTINATION_CATALOG,
): Destination[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return catalog.filter((d) => {
    const label = d.label.toLowerCase()
    const sub = d.subtitle?.toLowerCase() ?? ''
    const tag = d.tagline?.toLowerCase() ?? ''
    return label.includes(q) || sub.includes(q) || tag.includes(q)
  })
}
