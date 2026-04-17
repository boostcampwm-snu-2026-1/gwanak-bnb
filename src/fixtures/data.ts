import {
  Building2,
  Landmark,
  Navigation,
  TreePalm,
  Waves,
} from "lucide-react";
import heroImage from "@/assets/hero.png";

export const DEFAULT_RECOMMENDATIONS = [
  {
    icon: Navigation,
    title: "근처 체험 찾기",
    subtitle: "현재 위치를 기준으로 가까운 체험을 둘러보세요.",
  },
  {
    icon: Waves,
    title: "광안리해수욕장",
    subtitle: "바다 앞 산책과 야경을 즐기기 좋은 해변 명소예요.",
  },
  {
    icon: Building2,
    title: "부산, 한국",
    subtitle: "바다와 도심 분위기를 함께 즐길 수 있는 인기 여행지예요.",
  },
  {
    icon: Building2,
    title: "오사카시, 일본",
    subtitle: "먹거리와 쇼핑, 활기찬 도심 여행을 즐기기 좋아요.",
  },
  {
    icon: Landmark,
    title: "서울",
    subtitle: "트렌디한 동네와 궁궐, 야경을 함께 즐길 수 있어요.",
  },
  {
    icon: TreePalm,
    title: "제주",
    subtitle: "바다, 오름, 한적한 휴식을 찾을 때 잘 어울리는 곳이에요.",
  },
  {
    icon: Building2,
    title: "도쿄, 일본",
    subtitle: "도시 감성과 미식, 다양한 동네 탐방을 즐기기 좋아요.",
  },
] as const;

export const DUMMY_AUTOCOMPLETE_RECOMMENDATIONS = [
  {
    icon: Landmark,
    title: "성수동, 서울",
    subtitle: "카페와 편집숍, 감각적인 골목을 함께 즐기기 좋아요.",
  },
  {
    icon: Building2,
    title: "서면, 부산",
    subtitle: "맛집과 쇼핑, 늦은 시간까지 활기찬 분위기가 이어져요.",
  },
  {
    icon: Waves,
    title: "해운대, 부산",
    subtitle: "해변 산책과 오션뷰 숙소를 함께 찾기 좋은 지역이에요.",
  },
  {
    icon: TreePalm,
    title: "애월, 제주",
    subtitle: "노을과 바다, 여유로운 드라이브 코스로 잘 알려져 있어요.",
  },
  {
    icon: Building2,
    title: "신주쿠, 도쿄",
    subtitle: "교통이 편리하고 다양한 식당과 쇼핑 스팟이 모여 있어요.",
  },
  {
    icon: Building2,
    title: "난바, 오사카",
    subtitle: "도톤보리와 가까워 먹거리 중심 여행에 잘 어울려요.",
  },
] as const;

export const STAY_SEARCH_RESULTS = [
  {
    id: "stay-1",
    image: heroImage,
    location: "해운대, 부산",
    price: 185000,
    rating: 4.91,
    maximumGuest: {
      adult: 4,
      children: 2,
    },
    isPetAvailable: true,
  },
  {
    id: "stay-2",
    image: heroImage,
    location: "성수동, 서울",
    price: 143000,
    rating: 4.82,
    maximumGuest: {
      adult: 2,
      children: 1,
    },
    isPetAvailable: false,
  },
  {
    id: "stay-3",
    image: heroImage,
    location: "애월, 제주",
    price: 212000,
    rating: 4.97,
    maximumGuest: {
      adult: 6,
      children: 3,
    },
    isPetAvailable: true,
  },
  {
    id: "stay-4",
    image: heroImage,
    location: "난바, 오사카",
    price: 168000,
    rating: 4.76,
    maximumGuest: {
      adult: 3,
      children: 2,
    },
    isPetAvailable: false,
  },
] as const;
