# gwanakbnb

Airbnb 메인 화면 클론 프로젝트. React + Vite + Express + MongoDB 기반으로 개발했습니다.

## 기술 스택

### Frontend
- React 19
- Vite
- CSS Modules
- Pretendard 폰트

### Backend
- Express 5
- MongoDB (Mongoose)
- Layered Architecture (routes / controllers / services / models)

## 실행 방법

터미널 두 개를 열고 각각 실행합니다.

```bash
npm install

# React 앱
npm run dev

# Express 서버
npm run server
```

`.env` 파일에 MongoDB 연결 정보와 포트를 설정해야 합니다.

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/gwanak-bnb
PORT=3001
```

더미 데이터를 DB에 주입하려면:

```bash
node server/seed.js
```

## 구현 기능

### 1주차 - 검색바 & 여행자 선택

- 여행지 / 날짜 / 여행자 필드로 구성된 검색바 레이아웃
- 여행자 필드 클릭 시 모달 열기/닫기
- 성인 (13세 이상), 어린이 (2~12세), 유아 (2세 미만), 반려동물 인원 조정
- +/- 버튼으로 인원 수 조정, 0명 이하로 내려가지 않도록 제한
- 선택된 인원 수 검색바에 표시 (게스트 N명 · 유아 N명 · 반려동물 N마리)

### 2주차 - 여행지 검색

- 여행지 클릭 시 추천 여행지 목록 표시 (json-server에서 fetch)
- 검색어 입력 시 실시간 필터링
- 키보드 위/아래 방향키로 목록 순환 이동, 선택 항목 입력창에 반영
- 항목 클릭 시 선택 확정 및 드롭다운 닫기

### 3주차 - 백엔드 연동 & 검색 결과

- Express + MongoDB 기반 API 서버 구축 (Layered Architecture)
- 숙소 데이터 스키마 설계 및 더미 데이터 시딩
- 여행지 + 인원수를 조건으로 한 숙소 검색 API (`GET /api/accommodations/search`)
- 숙소 데이터로부터 추천 여행지 목록 자동 생성 API (`GET /api/accommodations/locations`)
- 검색 결과를 동일 화면 하단에 새로고침 없이 즉시 렌더링
- Airbnb 스타일 UI 적용
  - 상단 헤더 (로고 + 네비게이션 탭, sticky)
  - 로고 클릭 시 홈 상태로 초기화
  - 정사각형 이미지 카드 + 하트(찜) 아이콘

## 컴포넌트 구조

```
App
├── Header
├── SearchBar
│   ├── LocationInput
│   │   └── LocationDropdown
│   │       └── LocationItem
│   └── GuestSelector
│       └── GuestModal
│           └── GuestCounter (성인 / 어린이 / 유아 / 반려동물)
└── SearchResults

assets/
└── icons/
    ├── LocationPinIcon
    ├── SearchIcon
    ├── LogoIcon
    └── HeartIcon
```

## 백엔드 구조

```
server/
├── app.js                 # Express 진입점
├── seed.js                # 더미 데이터 시딩 스크립트
├── config/
│   └── db.js              # MongoDB 연결
├── routes/
│   └── accommodationRouter.js
├── controllers/
│   └── accommodationController.js
├── services/
│   └── accommodationService.js
└── models/
    └── Accommodation.js   # Mongoose 스키마
```

## 데이터 스키마 (Accommodation)

| 필드 | 타입 | 설명 |
|------|------|------|
| title | String | 숙소 이름 |
| description | String | 숙소 설명 |
| price | Number | 1박 가격 |
| location | Object | 주소 정보 (province, city, district, address) |
| capacity | Object | 수용 인원 (maxGuests, maxInfants, petsAllowed, bedrooms, beds, bathrooms) |
| roomType | String | 숙소 유형 (entire / private / shared) |
| amenities | [String] | 편의시설 목록 |
| images | [String] | 이미지 URL 배열 |
| rating | Number | 평균 평점 |
| reviewCount | Number | 리뷰 수 |

## 사용한 React Hooks

- `useState` - 모달 열기/닫기, 인원 수, 검색어, 키보드 선택 인덱스, 검색 결과 상태 관리
- `useEffect` - fetch로 데이터 불러오기, 바깥 클릭 감지 이벤트 등록/해제
- `useRef` - 바깥 클릭 감지를 위한 DOM 요소 참조
