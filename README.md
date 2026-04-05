# gwanakbnb

Airbnb 메인 화면 클론 프로젝트. React + Vite 기반으로 개발했습니다.

## 기술 스택

- React 19
- Vite
- CSS Modules

## 실행 방법

```bash
npm install
npm run dev
```

## 구현 기능 (1주차)

### 검색바
- 여행지 / 날짜 / 여행자 필드로 구성된 검색바 레이아웃

### 여행자 선택 모달
- 여행자 필드 클릭 시 모달 열기/닫기
- 성인 (13세 이상), 어린이 (2~12세), 유아 (2세 미만), 반려동물 인원 조정
- +/- 버튼으로 인원 수 조정, 0명 이하로 내려가지 않도록 제한

## 컴포넌트 구조

```
App
└── SearchBar
    └── GuestSelector
        ├── GuestModal
        │   └── GuestCounter (성인 / 어린이 / 유아 / 반려동물)
```

## 사용한 React Hooks

- `useState` - 모달 열기/닫기 상태, 인원 수 상태 관리
