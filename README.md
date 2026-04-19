# gwanak-bnb

관악구 테마의 Airbnb 스타일 프로젝트입니다. 현재 프론트엔드는 Vite + React, 백엔드는 Express + SQLite로 구성되어 있습니다.

## Backend

백엔드는 Layered Architecture로 구성했습니다.

- `server/src/routes`
- `server/src/controllers`
- `server/src/services`
- `server/src/repositories`
- `server/src/db`

검색 API:

- `GET /api/health`
- `GET /api/listings`

예시:

```bash
curl "http://localhost:4000/api/listings?location=신림동&guests=2&sort=price_asc"
```

## Local Run

프론트:

```bash
npm install
npm run dev
```

백엔드:

```bash
cd server
npm install
npm run db:seed
npm run dev
```

## Render Deploy

이 저장소에는 Render 배포용 [`render.yaml`](./render.yaml) 이 포함되어 있습니다.

배포 순서:

1. 이 저장소를 GitHub에 push
2. Render Dashboard에서 `New +` -> `Blueprint` 또는 `Web Service` 선택
3. GitHub 저장소 `rlafurud/gwanak-bnb` 연결
4. 환경변수 설정
   - `HOST=0.0.0.0`
   - `NODE_ENV=production`
   - `CLIENT_ORIGIN=<프론트 배포 주소>`
   - `DISK_MOUNT_PATH=/var/data`
5. Persistent Disk를 `/var/data`로 연결
6. 배포 완료 후 `https://<service-name>.onrender.com/api/health` 확인

상세 설명은 [server/BACKEND.md](./server/BACKEND.md) 참고.
