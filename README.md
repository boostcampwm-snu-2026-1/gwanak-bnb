# Gwanak-BnB

An Airbnb-style guest selector UI built with Next.js, focused on practicing React component design, state management, and full-stack integration.

## 🚀 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) 16.2.2 (App Router)
- React 19.2.4 with React Compiler
- TypeScript
- Tailwind CSS v4

### Backend
- Express.js (Layered Architecture: Router → Controller → Service → Repository)
- MongoDB Atlas (Database) & Render (Deployment)

***

## 🏗 Project Architecture & Design

### 1. Backend Architecture
The backend is structured using a **Layered Architecture** for better maintainability and scalability:
- **Router**: Defines API endpoints (e.g., `GET /api/accommodations`).
- **Controller**: Handles HTTP requests, validations, and responses.
- **Service**: Contains business logic (e.g., filtering accommodations by location and guests).
- **Repository**: Manages direct database interactions (MongoDB/Mongoose).

### 2. Database Schema (Accommodations Collection)
Designed as a MongoDB document to support dynamic search results:
- `_id` (ObjectId, Auto-generated)
- `name` (String): Accommodation title
- `location` (String): City/Region (e.g., 서귀포시)
- `max_guests` (Number): Maximum capacity
- `price_per_night` (Number): Price calculation
- `rating` (Number): Average user rating
- `review_count` (Number): Number of reviews
- `image_url` (String): Thumbnail image

### 3. Component Structure
Added search result components while maintaining existing directory patterns:
```text
src/
└── app/
    ├── components/
    │   ├── GuestSelector.tsx      # Existing: Reusable guest counter component
    │   ├── LocationSearch.tsx     # Existing: Location search dropdown
    │   ├── SearchResult.tsx       # New: Container for fetched accommodations
    │   └── AccommodationCard.tsx  # New: Individual accommodation UI
    ├── globals.css
    ├── layout.tsx
    └── page.tsx                   # Main page orchestrating Search & Results
```

***

## ✨ Features

- **Airbnb-style search bar** (destination, date, guests).
- **Guest selector dropdown** with independent counters for adults, children, and infants.
- Min/max constraints per guest category (infants capped at 5, others at 16).
- **Real-time Search**: Fetches accommodations from the Express backend based on Location and Guest count.
- **Seamless UI**: Results are rendered instantly at the bottom of the page without reloading.

***

## 🛠 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm
- MongoDB (Atlas Cluster URI or Local MongoDB)

### Installation

```bash
git clone https://github.com/jay20012024/gwanak-bnb.git
cd gwanak-bnb
npm install
```

### Development

To start both the Next.js frontend and Express backend:

```bash
# Start Frontend
npm run dev

# Start Backend (Navigate to server directory if separated)
npm run server
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

***

## 📜 Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

***