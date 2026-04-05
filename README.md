# gwanak-bnb

Airbnb 메인 화면을 참고해 React + Vite로 구현한 5주차 과제입니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 1주차 구현 범위

- 메인 레이아웃 스켈레톤 구성
  - 헤더
  - 검색 바(여행지 / 날짜 / 여행자)
  - 숙소 카드 섹션
- 여행자 인원 조정 모달 구현
  - 성인 / 어린이 / 유아 / 반려동물 카운터
  - `+ / -` 증감, 0 미만 방지
  - 요약 텍스트 업데이트
- 모달 인터랙션
  - 열기 / 닫기
  - 외부 클릭 닫기
  - `ESC` 닫기
  - 모달 열림 시 body scroll lock

## 상태 관리 포인트

- `useState`
  - `guestCounts` 상태로 인원 수를 관리합니다.
  - `isGuestModalOpen` 상태로 모달 표시 여부를 관리합니다.
- `useEffect`
  - 모달이 열린 동안 문서 이벤트(`mousedown`, `keydown`)를 등록하고,
  - 모달이 닫히거나 컴포넌트가 정리될 때 이벤트를 해제합니다.

`dependencies`에 `isGuestModalOpen`을 넣어, 모달 상태가 바뀔 때마다 필요한 부수효과를 정확히 다시 적용/정리하도록 했습니다.

## 기술 스택

- React
- Vite
- CSS Modules
