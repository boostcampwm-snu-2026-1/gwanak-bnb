# gwanak-bnb

Airbnb 메인 화면 검색 바를 클론한 React 프로젝트입니다.

---

## 사용 기술 명세

### 핵심 프레임워크 / 런타임

| 패키지 | 버전 | 용도 |
|---|---|---|
| `react` | ^19 | UI 컴포넌트 라이브러리 |
| `react-dom` | ^19 | React를 브라우저 DOM에 렌더링 |
| `vite` | ^8 | 개발 서버 및 번들러 |

### 스타일링

| 패키지 | 버전 | 용도 |
|---|---|---|
| `tailwindcss` | ^4 | 유틸리티 클래스 기반 CSS 프레임워크 |
| `@tailwindcss/vite` | ^4 | Vite와 Tailwind CSS 연동 플러그인 |
| `tw-animate-css` | ^1 | Tailwind용 CSS 애니메이션 유틸리티 |
| `@fontsource-variable/geist` | ^5 | Geist 가변 폰트 (shadcn/ui 기본 폰트) |

### UI 컴포넌트

| 패키지 | 버전 | 용도 |
|---|---|---|
| `shadcn` | ^4 | 코드 소유권 기반 컴포넌트 라이브러리 CLI |
| `@base-ui/react` | ^1 | shadcn/ui가 내부적으로 사용하는 headless UI 기본 요소 |
| `lucide-react` | ^1 | SVG 아이콘 라이브러리 |

### 유틸리티

| 패키지 | 버전 | 용도 |
|---|---|---|
| `clsx` | ^2 | 조건부 className 문자열 조합 |
| `tailwind-merge` | ^3 | 충돌하는 Tailwind 클래스 병합 |
| `class-variance-authority` | ^0.7 | 컴포넌트 variant 시스템 구성 |

### 개발 도구

| 패키지 | 용도 |
|---|---|
| `@vitejs/plugin-react` | Vite에서 React JSX 변환 |
| `eslint` + plugins | 코드 품질 검사 |
| `@types/node` | path alias 설정용 Node.js 타입 |

---

## 시스템 구조

```
gwanak-bnb/
├── public/                           # 정적 파일
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.jsx                      # 앱 진입점 — React 루트 마운트
│   ├── App.jsx                       # 루트 컴포넌트
│   ├── index.css                     # 전역 스타일 (Tailwind 임포트 포함)
│   ├── lib/
│   │   └── utils.js                  # cn() 유틸 함수 (clsx + tailwind-merge)
│   └── components/
│       ├── ui/
│       │   └── button.jsx            # shadcn/ui 기본 Button 컴포넌트
│       └── SearchBar/                # 검색 바 관련 컴포넌트 모음
│           ├── SearchBar.jsx         # 검색 바 전체 레이아웃 및 상태 관리
│           ├── DestinationField.jsx  # 여행지 탭 (UI 전시용)
│           ├── DateField.jsx         # 날짜 탭 (UI 전시용)
│           └── GuestField/
│               ├── GuestField.jsx    # 여행자 탭 — 인원 상태 관리, 모달 연동
│               ├── GuestModal.jsx    # 인원 선택 드롭다운 모달
│               └── GuestCounter.jsx  # 개별 인원 카운터 (−/+)
├── jsconfig.json                     # @ path alias 설정
├── vite.config.js                    # Vite 설정 (Tailwind 플러그인, path alias)
├── components.json                   # shadcn/ui 설정
└── package.json
```

### 컴포넌트 트리

```
App
└── SearchBar                      ← 호버/열림 상태, 구분선 표시 여부 관리
    ├── DestinationField           ← 여행지 (정적 UI)
    ├── DateField                  ← 날짜 (정적 UI)
    ├── GuestField                 ← 여행자 인원 상태(useState) 보유
    │   ├── GuestModal             ← 모달 드롭다운
    │   │   └── GuestCounter × 4  ← 성인 / 어린이 / 유아 / 반려동물
    │   └── (X 초기화 버튼)
    └── SearchButton               ← 검색 버튼 (열림 여부에 따라 확장 애니메이션)
```

### 주요 상태 흐름

```
SearchBar
  ├── guestOpen (boolean)    — 여행자 모달 열림 여부
  └── hovered (string|null)  — 현재 호버된 탭 이름 ('destination' | 'date' | 'guest')

GuestField
  └── guests (object)        — { adults, children, infants, pets }
```

---

## 개발 서버 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```
