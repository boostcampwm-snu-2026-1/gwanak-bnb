import { getDatabase } from '../config/database.js';
import { runMigrations } from './runMigrations.js';
import { seedListings } from '../data/seedListings.js';

function seedDatabase() {
  runMigrations();

  const db = getDatabase();
  const insertListing = db.prepare(`
    INSERT INTO listings (
      slug, title, summary, district, neighborhood, category,
      max_guests, bedrooms, beds, baths, price_per_night, cleaning_fee,
      rating, review_count, latitude, longitude, image_url, host_language,
      amenities, instant_book, self_check_in, free_cancellation, available_from, available_to
    ) VALUES (
      @slug, @title, @summary, @district, @neighborhood, @category,
      @maxGuests, @bedrooms, @beds, @baths, @pricePerNight, @cleaningFee,
      @rating, @reviewCount, @latitude, @longitude, @imageUrl, @hostLanguage,
      @amenities, @instantBook, @selfCheckIn, @freeCancellation, @availableFrom, @availableTo
    )
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      summary = excluded.summary,
      district = excluded.district,
      neighborhood = excluded.neighborhood,
      category = excluded.category,
      max_guests = excluded.max_guests,
      bedrooms = excluded.bedrooms,
      beds = excluded.beds,
      baths = excluded.baths,
      price_per_night = excluded.price_per_night,
      cleaning_fee = excluded.cleaning_fee,
      rating = excluded.rating,
      review_count = excluded.review_count,
      latitude = excluded.latitude,
      longitude = excluded.longitude,
      image_url = excluded.image_url,
      host_language = excluded.host_language,
      amenities = excluded.amenities,
      instant_book = excluded.instant_book,
      self_check_in = excluded.self_check_in,
      free_cancellation = excluded.free_cancellation,
      available_from = excluded.available_from,
      available_to = excluded.available_to,
      updated_at = CURRENT_TIMESTAMP
  `);

  const seedTransaction = db.transaction(() => {
    for (const listing of seedListings) {
        insertListing.run({
          ...listing,
          amenities: JSON.stringify(listing.amenities),
          instantBook: listing.instantBook ? 1 : 0,
          selfCheckIn: listing.selfCheckIn ? 1 : 0,
          freeCancellation: listing.freeCancellation ? 1 : 0,
        });
    }
  });

  seedTransaction();
}

seedDatabase();
