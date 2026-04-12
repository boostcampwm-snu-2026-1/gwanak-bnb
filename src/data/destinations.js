// 여행지 정적 데이터 (디버깅용 더미 데이터)
// RECOMMENDED_DESTINATIONS: 검색어 없을 때 노출할 추천 목적지
// ALL_DESTINATIONS: 검색 필터링에 사용할 전체 목적지 목록

export const RECOMMENDED_DESTINATIONS = [
  { id: 'r1', name: '서울', subtitle: '대한민국 수도', color: 'from-purple-400 to-blue-400', icon: 'building' },
  { id: 'r2', name: '부산', subtitle: '해변 도시', color: 'from-blue-400 to-cyan-300', icon: 'building' },
  { id: 'r3', name: '제주', subtitle: '섬 도시', color: 'from-green-400 to-emerald-400', icon: 'building' },
  { id: 'r4', name: '경주', subtitle: '역사 도시', color: 'from-orange-300 to-amber-400', icon: 'building' },
  { id: 'r5', name: '인천', subtitle: '항구 도시', color: 'from-sky-400 to-blue-300', icon: 'building' },
  { id: 'r6', name: '강릉', subtitle: '해안 도시', color: 'from-teal-400 to-cyan-400', icon: 'building' },
  { id: 'r7', name: '여수', subtitle: '남해 도시', color: 'from-pink-400 to-rose-400', icon: 'building' },
  { id: 'r8', name: '전주', subtitle: '한옥 도시', color: 'from-yellow-400 to-orange-300', icon: 'building' },
  { id: 'r9', name: '속초', subtitle: '설악 도시', color: 'from-indigo-400 to-purple-400', icon: 'building' },
  { id: 'r10', name: '대구', subtitle: '내륙 도시', color: 'from-red-400 to-pink-400', icon: 'building' },
]

const CITIES = ['서울', '부산', '제주', '경주', '인천', '강릉', '여수', '전주', '속초', '대구']
const LETTERS = ['A', 'B', 'C', 'D', 'E']

export const ALL_DESTINATIONS = CITIES.flatMap(city =>
  LETTERS.map(letter => ({
    id: `${city}-${letter}`,
    name: `${city} ${letter}`,
    subtitle: `${city} · ${letter}`,
  }))
)
