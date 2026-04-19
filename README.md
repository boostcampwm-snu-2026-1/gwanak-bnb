# Gwanak BnB Search API

Express 기반 검색 API 서버를 `Layered Architecture`로 추가한 예제입니다.

## MongoDB Setup

환경 변수는 `.env` 로 관리합니다.

- `MONGODB_URI`: 필수
- `MONGODB_DB_NAME`: 선택
- `PORT`: 선택, 기본값 `3000`

`MONGODB_URI` 에 DB 이름이 들어 있으면 `MONGODB_DB_NAME` 은 생략해도 됩니다.

```bash
npm run dev:server
npm run dev
```

## Architecture

- `routes`: HTTP endpoint 정의
- `controllers`: request parsing, response shaping
- `services`: 검색 정책과 비즈니스 로직
- `repositories`: 데이터 조회
- `data`: 임시 seed 데이터

요청 흐름은 `route -> controller -> service -> repository` 입니다.

## API

`GET /api/locations/search?q=부산&limit=5`

- `q`: 검색어. 비워두면 추천 여행지 반환
- `limit`: 최대 반환 개수. 기본값 `7`

## Run

```bash
npm run dev:server
npm run dev
```

프론트엔드 개발 서버는 `/api` 요청을 `http://localhost:3000` 으로 프록시합니다.
