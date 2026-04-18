# gwanak-bnb

React + Vite 프론트엔드와 Express + MongoDB 백엔드를 연결한 숙소 검색 학습 프로젝트입니다.

## 실행 방법

1. 의존성을 설치합니다.

```bash
npm install
```

2. 환경변수를 준비합니다.

```bash
cp .env.example .env
```

3. `.env`에 MongoDB Atlas 또는 원격 MongoDB `MONGO_URI`를 입력합니다.

4. 더미 데이터를 시딩합니다.

```bash
npm run seed
```

5. 프론트와 백엔드를 함께 실행합니다.

```bash
npm run dev
```

## 주요 기능

- `여행지`, `여행 인원` 필수 검색
- `체크인`, `체크아웃` 선택 검색
- `fetch` 기반 검색 요청
- 검색 결과를 같은 화면 하단에 즉시 렌더링
- MongoDB 숙소 데이터 시딩
- Render 배포용 `render.yaml` 제공

## API

- `GET /api/health`
- `GET /api/stays/search?destination=서울&guests=2`
- `GET /api/stays/search?destination=강릉&guests=4&checkIn=2026-05-10&checkOut=2026-05-12`

## 아키텍처

```text
server
├─ config
├─ controllers
├─ middleware
├─ models
├─ repositories
├─ routes
├─ scripts
├─ seeds
└─ services
```

`routes -> controllers -> services -> repositories -> models` 순서의 Layered Architecture를 사용했습니다.

## 배포

Render에서 같은 저장소를 웹 서비스로 연결한 뒤 아래 환경변수를 설정하면 됩니다.

- `MONGO_URI`
- `CLIENT_ORIGIN`
- `NODE_ENV=production`

루트에 있는 [render.yaml](/Users/donghyun/Documents/gwanak-bnb/render.yaml)로 기본 설정을 바로 가져갈 수 있습니다.

## 설계 문서

- [destination-search-design.md](/Users/donghyun/Documents/gwanak-bnb/docs/destination-search-design.md)
