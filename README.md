# gwanakbnb

Airbnb 메인 화면 클론 프로젝트. React + Vite 기반으로 개발했습니다.

## 기술 스택

- React 19
- Vite
- CSS Modules
- json-server (mock API)

## 실행 방법

터미널 두 개를 열고 각각 실행합니다.

```bash
npm install

# React 앱
npm run dev

# mock API 서버
npm run server
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

## 컴포넌트 구조

```
App
└── SearchBar
    ├── LocationInput
    │   └── LocationDropdown
    │       └── LocationItem
    ├── GuestSelector
    │   ├── GuestModal
    │   │   └── GuestCounter (성인 / 어린이 / 유아 / 반려동물)
assets/
└── icons/
    ├── LocationPinIcon
    └── SearchIcon
```

## 사용한 React Hooks

- `useState` - 모달 열기/닫기, 인원 수, 검색어, 키보드 선택 인덱스 상태 관리
- `useEffect` - fetch로 데이터 불러오기, 바깥 클릭 감지 이벤트 등록/해제
- `useRef` - 바깥 클릭 감지를 위한 DOM 요소 참조
