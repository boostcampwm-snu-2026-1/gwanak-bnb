# gwanak-bnb Backend Guide

## Chosen architecture

This backend uses a layered architecture:

- `routes`: HTTP path definitions
- `controllers`: request/response handling
- `services`: business logic
- `repositories`: SQL access
- `db`: schema creation and seeding

Flow:

`Express Route -> Controller -> Service -> Repository -> SQLite`

## Data schema for search results

The `listings` table was designed around search-result cards and filters:

- identity: `id`, `slug`
- card content: `title`, `summary`, `image_url`
- location: `district`, `neighborhood`, `latitude`, `longitude`
- filtering: `category`, `max_guests`, `price_per_night`
- details: `bedrooms`, `beds`, `baths`, `amenities`
- trust signals: `rating`, `review_count`
- availability: `available_from`, `available_to`

## Local setup

```bash
cd server
npm install
npm run db:init
npm run db:seed
npm run dev
```

API examples:

```bash
curl "http://localhost:4000/api/health"
curl "http://localhost:4000/api/listings"
curl "http://localhost:4000/api/listings?location=신림동&guests=2&maxPrice=130000"
curl "http://localhost:4000/api/listings?category=디자인&sort=price_asc"
```

## Render deployment

Render web services require your Node app to listen on `0.0.0.0` and use the `PORT` environment variable. Render also uses an ephemeral filesystem by default, so SQLite data disappears after redeploy unless you attach a persistent disk. Render recommends using managed Postgres when it fits, but SQLite can work when you mount a persistent disk for the database file.

Recommended setup for this project:

1. Push this repo to GitHub.
2. In Render, create a new `Web Service`.
3. Point the service at the repo and set `Root Directory` to `server`.
4. Set build command to `npm install`.
5. Set start command to `npm run db:seed && npm start`.
6. Add environment variables:
   - `HOST=0.0.0.0`
   - `NODE_ENV=production`
   - `CLIENT_ORIGIN=<your frontend origin>`
   - `DISK_MOUNT_PATH=/var/data`
7. Add a persistent disk mounted at `/var/data`.
8. Set health check path to `/api/health`.

After deploy, your backend base URL will look like:

`https://<service-name>.onrender.com`

Example production endpoint:

`https://<service-name>.onrender.com/api/listings?location=관악구&guests=2`
