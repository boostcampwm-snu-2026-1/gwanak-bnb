# 관악BnB 프로젝트 설계 문서

## 1. 프론트엔드 구조 (Next.js)

### 컴포넌트 구조
기존 디렉토리와 네이밍 구조를 일관되게 유지하면서 검색 결과를 보여주는 컴포넌트를 추가했습니다.

\`\`\`
front/src/app/
├── page.tsx                  # 메인 페이지 (검색 상태 및 데이터 페칭 관리)
├── components/
│   ├── LocationSearch.tsx    # 여행지 검색 (드롭다운, 자동완성)
│   ├── GuestSelector.tsx     # 인원수 선택 (카운터 제한)
│   ├── SearchResult.tsx      # (추가) 검색 결과 컨테이너 (그리드 레이아웃)
│   └── AccommodationCard.tsx # (추가) 개별 숙소 UI (이미지, 평점, 가격)
\`\`\`

### 컴포넌트 계층도
\`\`\`
Home (page.tsx)
├── LocationSearch
│   └── LocationItem
├── GuestSelector
│   └── Counter
└── SearchResult
    └── AccommodationCard (다중 렌더링)
\`\`\`

### 상태 관리 (page.tsx 중앙화)
| 상태 | 타입 | 설명 |
|------|------|------|
| location | string | 선택된 여행지 (검색 필수 조건) |
| isLocationOpen | boolean | 여행지 드롭다운 열림 상태 |
| adults, children, infants | number | 개별 인원 수 (총합이 검색 필수 조건) |
| isGuestOpen | boolean | 여행자 드롭다운 열림 상태 |
| accommodations | IAccommodation[] | 서버에서 응답받은 숙소 데이터 배열 |
| hasSearched | boolean | 검색 버튼 클릭 여부 판별 |
| isLoading | boolean | API 호출 중 로딩 상태 |

---

## 2. 백엔드 아키텍처 (Express.js)

유지보수와 확장을 고려하여 **계층형 아키텍처(Layered Architecture)**를 적용했습니다.

### 폴더 구조 및 계층
\`\`\`
back/src/
├── routes/          # 엔드포인트 정의 (GET /api/accommodations)
├── controllers/     # 요청 검증 및 응답 처리 (여행지, 인원수 필수 확인)
├── services/        # 비즈니스 로직 처리
├── repositories/    # DB 직접 접근 쿼리 실행
└── models/          # Mongoose 스키마 정의
\`\`\`

### 데이터 흐름
\`\`\`
Client Request → Router → Controller → Service → Repository → MongoDB Atlas
\`\`\`

---

## 3. 데이터베이스 설계 (MongoDB Atlas)

### 더미 데이터 시딩 (Seeding)
검색 기능을 테스트하기 위해 `seed` 디렉토리의 Mongoose 스크립트를 활용하여 20개의 더미 데이터를 클라우드 DB에 삽입했습니다.

### 숙소 스키마 (Accommodation Collection)
| 필드명 | 타입 | 설명 | 검색 조건 활용 |
|--------|------|------|----------------|
| name | String | 숙소명 | - |
| location | String | 지역 (서귀포시, 제주시 등) | **필수 조건 (1차 검색)** |
| max_guests | Number | 최대 수용 인원 | **필수 조건 ($gte 연산자)** |
| price_per_night | Number | 1박당 가격 | - |
| rating | Number | 평점 | - |
| review_count | Number | 리뷰 수 | - |
| image_url | String | 썸네일 이미지 링크 | - |

---

## 4. 핵심 기능 흐름 (Data Flow)

**새로고침 없는 즉시 렌더링 구현**

1. **사용자 입력**: 여행지와 게스트 인원수 선택 (`useState` 업데이트)
2. **검색 클릭**: `page.tsx`의 `handleSearch` 함수 트리거
3. **API 호출**: Vercel의 프론트엔드가 Render에 배포된 Express 서버로 HTTP GET 요청
   - `GET /api/accommodations?location={location}&guests={totalGuests}`
4. **DB 필터링**: Mongoose를 통해 `location` 일치 및 `max_guests`가 요청 인원보다 크거나 같은 데이터 추출
5. **UI 렌더링**: 받아온 데이터를 `accommodations` 상태에 저장 후 `SearchResult` 컴포넌트 하단에 즉시 노출