// 추천 여행지: 버튼 클릭 직후 보여줄 리스트
export const RECOMMENDED = [
  {
    id: "nearby",
    name: "근처 체험 찾기",
    description: "가까운 곳에서 즐길 수 있는 체험을 찾아보세요.",
  },
  {
    id: "gwangalli",
    name: "광안리해수욕장",
    description: "해변으로 인기 있는 곳",
  },
  { id: "osaka", name: "오사카시, 일본", description: "관광 명소: 오사카성" },
  {
    id: "busan",
    name: "부산, 부산",
    description: "화려한 나이트라이프로 유명한 곳",
  },
  { id: "jeju", name: "제주", description: "자연을 만끽하기 좋은 곳" },
  { id: "sokcho", name: "속초시, 강원도", description: "호수로 인기 있는 곳" },
  {
    id: "gangneung",
    name: "강릉시, 강원도",
    description: "해변의 매력을 느낄 수 있는 곳",
  },
];

// 검색 후보 (추천 + 추가 도시). 실제 앱이라면 API 호출로 대체될 부분.
export const ALL_DESTINATIONS = [
  ...RECOMMENDED,
  {
    id: "yeosu-city",
    name: "여수시",
    description: "대한민국 · 전라남도 · 도시",
  },
  {
    id: "yeosu-isunsin",
    name: "이순신광장",
    description: "대한민국 · 전라남도 · 여수시 · 공원",
  },
  {
    id: "yeosu-venezia",
    name: "여수 베네치아호텔 앤 스위트",
    description: "대한민국 · 전라남도 · 여수시 · 숙박시설",
  },
  {
    id: "yeosu-sicheong",
    name: "여수시청",
    description: "대한민국 · 전라남도 · 여수시",
  },
  { id: "uncheon", name: "운천동", description: "대한민국 · 전라남도 · 지역" },
  { id: "seoul", name: "서울", description: "대한민국 · 수도" },
  { id: "incheon", name: "인천", description: "대한민국 · 광역시" },
];
