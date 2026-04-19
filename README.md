# gwanak-bnb

## Backend setup

This repo now includes an Express + Mongoose backend scaffold under `backend/`.

### Environment

Create a `.env` file at the repo root or inside `backend/` and set:

- `MONGODB_URI` or `URI`
- `PORT` (optional, defaults to `3000`)
- `CORS_ORIGIN` (optional, defaults to the current origin)
- `VITE_API_BASE_URL` for browser requests when the frontend should call Render directly

### Commands
- `npm run seed:accommodations` adds accommodation data to mongoDB
- `npm run server` starts the backend
  - `curl http://localhost:3000/api/health` to check server status (mongoDB)
- `npm run dev:server` starts the backend with Node watch mode

### Frontend API target

- Local backend: leave `VITE_API_BASE_URL` empty and Vite will proxy `/api` to `http://localhost:3000`
- Render backend: set `VITE_API_BASE_URL=https://<render-name>:.com` in your frontend `.env`