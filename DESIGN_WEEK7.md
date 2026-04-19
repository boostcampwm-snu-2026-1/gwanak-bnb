# 관악 BnB Week 7 - 설계 문서

## 컴포넌트 구조 (Component Hierarchy)

```
App
├── Header
│   └── SearchBar
│       ├── SearchInput (여행지 검색 + 자동완성)
│       ├── SearchDropdown (자동완성 드롭다운)
│       └── Button (검색 버튼)
└── SearchResults
    └── AccommodationCard (x N)
```

## 새로운 컴포넌트

| 컴포넌트 | Props | 역할 |
|---------|-------|------|
| AccommodationCard | name, destination, region, price, rating, reviewCount, maxGuests, imageUrl, amenities | 숙소 카드 UI |
| SearchResults | results, isLoading, error | 검색 결과 목록 |

## 새로운 훅

| 훅 | 반환값 | 역할 |
|---|--------|------|
| useAccommodationSearch | { results, isLoading, error, search } | 백엔드 API 검색 |

## 데이터 흐름

1. 사용자가 여행지 입력 → SearchInput 자동완성
2. 사용자가 여행지 선택 → selectedDestination 상태 업데이트
3. 사용자가 "검색" 버튼 클릭 → onSearch(destination, guests) 호출
4. App.jsx에서 search() 호출 → useAccommodationSearch 훅
5. fetch('http://localhost:3001/api/accommodations/search?destination=...&guests=...')
6. 응답 데이터 → results 상태 업데이트
7. SearchResults 컴포넌트 리렌더링 (새로고침 없음)

## API 계약

**Endpoint:** GET /api/accommodations/search

**Query Parameters:**
- `destination` (필수): 여행지 문자열 (예: "서울")
- `guests` (필수): 여행인원 숫자 (예: 2)
- `checkin` (선택): 체크인 날짜 (예: "2025-01-01")
- `checkout` (선택): 체크아웃 날짜 (예: "2025-01-03")

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 5
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "destination and guests are required"
}
```

## 디렉토리 구조

```
src/
├── config/
│   └── api.js           # API 베이스 URL 설정
├── components/
│   └── Search/
│       ├── SearchBar.jsx        (수정)
│       ├── AccommodationCard.jsx (신규)
│       ├── SearchResults.jsx    (신규)
│       └── index.js             (수정)
├── hooks/
│   ├── useAccommodationSearch.js (신규)
│   └── index.js
└── App.jsx              (수정)
```
