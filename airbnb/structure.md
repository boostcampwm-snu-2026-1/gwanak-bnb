# 관악BnB 프로젝트 설계 문서

## 컴포넌트 구조

```
app/
├── page.tsx              # 메인 페이지 (상태 관리 중앙화)
├── components/
│   ├── LocationSearch.tsx  # 여행지 검색 컴포넌트
│   └── GuestSelector.tsx   # 여행자 선택 컴포넌트
```

## 컴포넌트 계층도

```
Home (page.tsx)
├── LocationSearch
│   └── LocationItem (내부 렌더링)
└── GuestSelector
    └── Counter (내부 컴포넌트)
```

## 상태 관리

### page.tsx (부모)
| 상태 | 타입 | 설명 |
|------|------|------|
| location | string | 선택된 여행지 |
| isLocationOpen | boolean | 여행지 드롭다운 열림 상태 |
| adults | number | 성인 수 |
| children | number | 어린이 수 |
| infants | number | 유아 수 |
| isGuestOpen | boolean | 여행자 드롭다운 열림 상태 |

### LocationSearch.tsx
| 상태 | 타입 | 설명 |
|------|------|------|
| highlightedIndex | number | 키보드로 선택된 항목 인덱스 |

## React Hooks 사용

### useState
- 모든 UI 상태 관리의 기본
- 부모에서 상태 선언, 자식에게 props로 전달

### useRef
- `inputRef`: 입력 필드 포커스 제어
- `listRef`: 키보드 네비게이션 시 스크롤 제어

### useEffect
- 하이라이트된 항목이 보이도록 스크롤 조정
- 검색어 변경 시 하이라이트 인덱스 초기화

## 주요 기능

### 여행지 검색
1. 클릭 시 추천 여행지 목록 노출
2. 검색어 입력 시 실시간 필터링

### 여행자 선택
1. 성인/어린이/유아 개별 카운터
2. 최소/최대값 제한
3. 총 게스트 수 표시

## 데이터 흐름

```
사용자 입력 → useState 업데이트 → 컴포넌트 리렌더링 → UI 반영
```

Props drilling 패턴으로 부모→자식 단방향 데이터 흐름 유지
