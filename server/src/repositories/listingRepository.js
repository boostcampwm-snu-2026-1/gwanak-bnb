import { getDatabase } from '../config/database.js';

function escapeLike(value) {
  return value.replaceAll('\\', '\\\\').replaceAll('%', '\\%').replaceAll('_', '\\_');
}

function buildWhereClause(filters) {
  const conditions = [];
  const params = {};

  if (filters.location) {
    conditions.push('(district LIKE @location OR neighborhood LIKE @location OR title LIKE @location)');
    params.location = `%${filters.location}%`;
  }

  if (filters.category) {
    conditions.push('category = @category');
    params.category = filters.category;
  }

  if (filters.guests) {
    conditions.push('max_guests >= @guests');
    params.guests = filters.guests;
  }

  if (filters.minPrice) {
    conditions.push('price_per_night >= @minPrice');
    params.minPrice = filters.minPrice;
  }

  if (filters.maxPrice) {
    conditions.push('price_per_night <= @maxPrice');
    params.maxPrice = filters.maxPrice;
  }

  if (filters.checkIn) {
    conditions.push('available_from <= @checkIn');
    params.checkIn = filters.checkIn;
  }

  if (filters.checkOut) {
    conditions.push('available_to >= @checkOut');
    params.checkOut = filters.checkOut;
  }

  if (filters.instantBook) {
    conditions.push('instant_book = 1');
  }

  if (filters.selfCheckIn) {
    conditions.push('self_check_in = 1');
  }

  if (filters.freeCancellation) {
    conditions.push('free_cancellation = 1');
  }

  if (filters.amenities?.length) {
    filters.amenities.forEach((amenity, index) => {
      const key = `amenity${index}`;
      conditions.push(`amenities LIKE @${key} ESCAPE '\\'`);
      params[key] = `%"${escapeLike(amenity)}"%`;
    });
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  return { whereClause, params };
}

export function findListings(filters) {
  const db = getDatabase();
  const { whereClause, params } = buildWhereClause(filters);
  const sortBy = filters.sort === 'price_asc'
    ? 'price_per_night ASC'
    : filters.sort === 'price_desc'
      ? 'price_per_night DESC'
      : 'rating DESC, review_count DESC';

  const query = `
    SELECT
      id, slug, title, summary, district, neighborhood, category,
      max_guests AS maxGuests,
      bedrooms, beds, baths,
      price_per_night AS pricePerNight,
      cleaning_fee AS cleaningFee,
      rating, review_count AS reviewCount,
      latitude, longitude,
      image_url AS imageUrl,
      host_language AS hostLanguage,
      amenities,
      instant_book AS instantBook,
      self_check_in AS selfCheckIn,
      free_cancellation AS freeCancellation,
      available_from AS availableFrom,
      available_to AS availableTo
    FROM listings
    ${whereClause}
    ORDER BY ${sortBy}
  `;

  const rows = db.prepare(query).all(params);
  return rows.map((row) => ({
    ...row,
    amenities: JSON.parse(row.amenities),
    instantBook: Boolean(row.instantBook),
    selfCheckIn: Boolean(row.selfCheckIn),
    freeCancellation: Boolean(row.freeCancellation),
  }));
}
