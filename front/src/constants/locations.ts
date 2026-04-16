import { Location } from "@/types/location";

export const RECOMMENDED_LOCATIONS: Location[] = [
  { id: "nearby", name: "근처 체험 찾기", region: "가까운 곳에서 수 있는 체험을 찾아보세요", type: "area" },
  { id: "gwanak", name: "관악산국립공원", region: "대한민국 · 서울 · 관악", type: "attraction" },
  { id: "osaka", name: "오사카시, 일본", region: "일본 · 오사카", type: "city" },
  { id: "busan", name: "부산, 부산", region: "해운대와 다이아몬드타워로 유명한 곳", type: "city" },
  { id: "jeju", name: "제주", region: "자연을 만끽하기 좋은 곳", type: "city" },
  { id: "sokcho", name: "속초시, 강원도", region: "동주로 인기 있는 곳", type: "city" },
  { id: "gangneung", name: "강릉시, 강원도", region: "해변이 아름다운 동해안 도시", type: "city" },
];

export const ALL_LOCATIONS: Location[] = [
  ...RECOMMENDED_LOCATIONS,
  { id: "yeosu", name: "여수시", region: "대한민국 · 전라남도 · 도시", type: "city" },
  { id: "yeosu-admiral", name: "이순신광장", region: "대한민국 · 전라남도 · 여수시 · 공원", type: "attraction" },
  { id: "yeosu-yacht", name: "여수 해돋이요트투어 앤 스위트", region: "대한민국 · 전라남도 · 여수시 · 숙박시설", type: "attraction" },
  { id: "yeosu-market", name: "여수시장", region: "대한민국 · 전라남도 · 여수시", type: "attraction" },
  { id: "odongdo", name: "오동도", region: "대한민국 · 전라남도 · 여수시 · 지역", type: "area" },
  { id: "seoul", name: "서울", region: "대한민국 · 수도", type: "city" },
  { id: "tokyo", name: "도쿄", region: "일본 · 수도", type: "city" },
  { id: "bangkok", name: "방콕", region: "태국 · 수도", type: "city" },
  { id: "seogwipo", name: "서귀포시", region: "대한민국 · 제주특별자치도", type: "city" },
  { id: "jeju-city", name: "제주시", region: "대한민국 · 제주특별자치도", type: "city" },
  { id: "aewol", name: "애월읍", region: "대한민국 · 제주시", type: "area" },
  { id: "jocheon", name: "조천읍", region: "대한민국 · 제주시", type: "area" },
];