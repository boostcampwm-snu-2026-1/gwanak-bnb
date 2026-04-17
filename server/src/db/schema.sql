CREATE TABLE IF NOT EXISTS listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  district TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  category TEXT NOT NULL,
  max_guests INTEGER NOT NULL CHECK (max_guests > 0),
  bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
  beds INTEGER NOT NULL CHECK (beds > 0),
  baths REAL NOT NULL CHECK (baths > 0),
  price_per_night INTEGER NOT NULL CHECK (price_per_night > 0),
  cleaning_fee INTEGER NOT NULL DEFAULT 0,
  rating REAL NOT NULL CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER NOT NULL DEFAULT 0,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  image_url TEXT NOT NULL,
  host_language TEXT NOT NULL DEFAULT 'ko',
  amenities TEXT NOT NULL,
  instant_book INTEGER NOT NULL DEFAULT 0,
  self_check_in INTEGER NOT NULL DEFAULT 0,
  free_cancellation INTEGER NOT NULL DEFAULT 0,
  available_from TEXT NOT NULL,
  available_to TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_listings_location ON listings (district, neighborhood);
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings (category);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings (price_per_night);
CREATE INDEX IF NOT EXISTS idx_listings_guests ON listings (max_guests);
