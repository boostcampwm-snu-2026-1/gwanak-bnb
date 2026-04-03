# gwanak-bnb

Airbnb 메인 검색 화면을 참고해서 만든 React + Vite 학습 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 구현 범위

- 메인 검색 바 레이아웃
- `여행자` 선택 모달
- `useState` 기반 인원 수 증감
- `useEffect` + `fetch` 기반 숙소 목록 로딩
- 반응형 카드 레이아웃

## 컴포넌트 구조

```text
App
 ├─ SearchBar
 │   └─ GuestSelector
 └─ StayGrid
```

## 학습 포인트

- `useState`는 여행자 수처럼 화면에 바로 반영될 상태를 저장하는 데 사용했습니다.
- `useEffect`는 처음 렌더링된 뒤 숙소 데이터를 가져오는 비동기 작업에 사용했습니다.
- `SearchBar`에서는 `useEffect` 의존성 배열로 모달이 열렸을 때만 이벤트 리스너를 등록하고, 닫히면 정리하도록 구성했습니다.
