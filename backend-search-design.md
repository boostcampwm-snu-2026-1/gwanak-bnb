# 7주차 백엔드 연동 설계 문서

이번 주 미션은 원격 DB에 저장된 숙소 데이터를 검색해서 프론트엔드에 즉시 렌더링하는 것이다. 기존 하드코딩되어 있던 숙소 목록을 걷어내고, Express 기반 API 서버를 새로 만들어서 MongoDB Atlas에 연결하고, React에서 fetch로 그 API를 호출하는 구조로 바꿨다.

저장소 구조는 기존 React 프로젝트를 루트에 그대로 두고 `server/` 서브디렉토리에 백엔드를 추가하는 방식을 골랐다. 이렇게 하면 하나의 레포로 양쪽을 함께 관리할 수 있고, Render에서 rootDir만 `server`로 지정하면 백엔드만 빌드해서 배포할 수 있다.

백엔드 내부 구조는 Layered Architecture를 따랐다. `routes`에서 URL을 controller에 연결하고, `controllers`는 요청 파라미터 검증과 응답 포맷만 담당하고, 실제 검색 로직은 `services`에 두고, DB 접근은 `models`의 Mongoose 스키마에만 한정했다. 각 계층이 자기보다 아래 계층만 알고 있어서 검색 조건이 늘어나거나 정렬 로직이 바뀌어도 service 파일만 수정하면 되는 구조다.

숙소 스키마는 검색에 필요한 최소한의 필드로 설계했다. `title`, `description`, `location`(city/region/country/fullAddress가 내부 서브도큐먼트), `pricePerNight`, `maxGuests`, `rating`, `reviewCount`, `images`, `amenities`, `isSuperhost`를 두었고, 검색 성능을 위해 `location.city`, `location.region`, `maxGuests`에 인덱스를 걸었다.

검색 API는 `GET /api/accommodations/search?location=<str>&guests=<n>` 하나다. 필수 조건은 요구사항대로 여행지와 여행인원 두 가지이고, 날짜는 선택 기능이라 일단 쿼리는 받아두되 필터에는 반영하지 않았다. 여행지 키워드는 city, region, fullAddress, title에 대해 대소문자 무시 정규식으로 부분 매칭하고, 정규식 특수문자는 escape 처리해서 사용자가 점이나 괄호를 넣어도 안전하도록 했다. 인원은 `maxGuests >= guests` 조건으로 필터링한다. 결과는 rating, reviewCount 내림차순으로 정렬해서 돌려준다.

Seed 스크립트는 `server/scripts/seed.js`에 두고 `npm run seed`로 실행할 수 있게 했다. 18개의 다양한 지역(서울, 부산, 제주, 강릉, 경주, 여수, 속초, 전주, 양평, 인천)의 숙소를 넣어 여행지 검색이 의미있게 동작하도록 했다.

배포는 Render를 쓰기로 했고 `render.yaml`에 Blueprint 형태로 설정을 넣었다. `MONGO_URI`와 `CLIENT_ORIGIN`은 대시보드에서 직접 주입하도록 `sync: false`로 두었다. CORS는 `CLIENT_ORIGIN` 환경변수를 콤마로 쪼개 여러 허용 오리진을 지원하게 구현했는데, 로컬 개발과 배포 환경을 동시에 돌리는 상황을 대비한 것이다.

프론트엔드 쪽에서는 API 호출을 담당하는 `src/api/accommodations.js`를 분리해서 두었다. `VITE_API_URL` 환경변수로 백엔드 주소를 주입받고, 에러가 나면 서버가 내려준 message를 그대로 띄운다. SearchBar에는 별도 검색 버튼을 분리해서 만들고, 버튼을 누르면 여행지와 여행인원이 비어있는지 검증한 뒤 API를 호출하고 결과를 상위 App으로 올린다. 기존에 여행자 필드 안에 붙어있던 돋보기 아이콘은 클릭 동작이 모호해서 guest 모달 토글과 검색을 혼동시키므로, 독립된 search-button으로 분리했다.

App 컴포넌트는 `searchState`라는 단일 상태만 들고 있다. null이면 아직 검색 전이라는 뜻이고 기존 더미 데이터 그리드를 그대로 보여주고, 값이 있으면 SearchResults 컴포넌트를 그 자리에 렌더링한다. 새로고침 없이 동일 화면 하단에 즉시 결과가 뜬다는 요구사항을 이 방식으로 맞췄다. SearchResults는 결과 개수가 0이거나 에러가 발생한 경우를 별도로 처리해서 사용자에게 안내 메시지를 보여주고, 결과가 있으면 기존 AccommodationCard를 재사용하되 서버 응답 구조(`{ _id, location: {city, region}, pricePerNight, images: [] }`)를 카드가 기대하는 형태로 normalize하는 얇은 변환 함수를 끼워 넣었다. 이렇게 해서 기존 카드 컴포넌트는 그대로 두고 새로운 데이터 소스를 붙일 수 있었다.

컴포넌트 트리는 `App → Header / SearchBar / (SearchResults 또는 AccommodationCard 목록) / Footer` 형태이고, SearchBar 내부에는 LocationSearch와 GuestSelector가 조건부로 렌더링된다. 새로 추가된 컴포넌트는 `SearchResults` 하나이고, 디렉토리와 파일 네이밍은 기존 방식(`컴포넌트명/컴포넌트명.jsx + 컴포넌트명.css`)을 그대로 유지했다.

정리하면 이번 주 흐름은 사용자가 여행지를 고르고 인원을 설정한 뒤 검색 버튼을 누르면, SearchBar가 조건을 검증하고 fetch로 API를 호출하고, 서버는 Layered Architecture의 각 계층을 거쳐 MongoDB에서 데이터를 꺼내 응답하고, App은 받은 결과를 searchState에 넣어 SearchResults를 렌더링한다. 다음 주에 날짜 필터링이나 가격 범위 같은 2차 필터를 추가하더라도 service 계층에 조건 하나씩만 얹으면 되도록 확장 지점을 열어두었다.
