# gwanak-bnb server

숙소 검색 API 서버.

## 로컬 실행

```bash
cp .env.example .env
# .env 파일의 MONGO_URI를 사용할 MongoDB 주소로 수정

npm install
npm run seed   # 더미 데이터 삽입
npm run dev
```

## 엔드포인트

- `GET /health` — 헬스 체크
- `GET /api/accommodations/search?location=<str>&guests=<n>` — 숙소 검색

`location`과 `guests`는 필수 쿼리 파라미터다.

## 아키텍처

Layered Architecture를 따른다.

```
routes → controllers → services → models
```

- `routes`: HTTP 경로 매핑
- `controllers`: 요청/응답 처리와 입력 검증
- `services`: 검색 로직 등 비즈니스 규칙
- `models`: Mongoose 스키마와 DB 질의

## Render 배포

루트에 `render.yaml`이 포함되어 있어 Render 대시보드에서 Blueprint로 연결하면 자동 배포된다. 배포 시 다음 환경 변수를 설정한다.

- `MONGO_URI`: MongoDB Atlas 연결 문자열
- `CLIENT_ORIGIN`: 프론트엔드 도메인 (콤마로 여러 개 지정 가능)
