# Airbnb

An Airbnb-style guest selector UI built with Next.js, focused on practicing React component design and state management.

## Tech Stack

- [Next.js](https://nextjs.org/) 16.2.2 (App Router)
- React 19.2.4 with React Compiler
- TypeScript
- Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm

### Installation

```bash
git clone https://github.com/jay20012024/gwanak-bnb.git
cd gwanak-bnb
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
└── app/
    ├── components/
    │   └── GuestSelector.tsx   # Reusable guest counter component
    ├── globals.css             # Global styles and Tailwind theme tokens
    ├── layout.tsx              # Root layout with metadata and font config
    └── page.tsx                # Main page with search bar and dropdown logic
```

## Features

- Airbnb-style search bar (destination, date, guests)
- Guest selector dropdown with independent counters for adults, children, and infants
- Min/max constraints per guest category (infants capped at 5, others at 16)
- Dynamic guest summary text derived from state
- Toggle open/close behavior for the dropdown panel

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Notes

This project is a learning exercise exploring the following React and Next.js concepts:

- Component composition and props interface design
- Lifting state up to a shared parent
- Conditional rendering with boolean state
- `"use client"` directive and client/server component boundaries
- Tailwind CSS v4 `@theme inline` for custom design tokens