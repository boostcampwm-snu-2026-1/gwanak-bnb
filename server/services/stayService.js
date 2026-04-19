import AppError from "../utils/AppError.js";
import { searchStays as searchStaysFromRepository } from "../repositories/stayRepository.js";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parsePositiveInteger(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatMonthDay(dateValue) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(dateValue);
}

function formatPrice(pricePerNight) {
  return `${new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(pricePerNight)} /박`;
}

function buildQuery({ destination, guests, pets, checkIn, checkOut }) {
  const destinationRegex = new RegExp(escapeRegex(destination.trim()), "i");
  const query = {
    $and: [
      {
        $or: [
          { title: destinationRegex },
          { location: destinationRegex },
          { city: destinationRegex },
          { district: destinationRegex },
          { category: destinationRegex },
          { keywords: destinationRegex },
        ],
      },
      {
        maxGuests: {
          $gte: guests,
        },
      },
    ],
  };

  if (pets > 0) {
    query.$and.push({
      petFriendly: true,
    });
  }

  if (checkIn && checkOut) {
    query.$and.push({
      "availability.startDate": {
        $lte: checkIn,
      },
    });
    query.$and.push({
      "availability.endDate": {
        $gte: checkOut,
      },
    });
  }

  return query;
}

function mapStay(stay, checkIn, checkOut) {
  const requestedDateLabel =
    checkIn && checkOut
      ? `${formatMonthDay(checkIn)} - ${formatMonthDay(checkOut)}`
      : `예약 가능 ${formatMonthDay(stay.availability.startDate)} - ${formatMonthDay(
          stay.availability.endDate,
        )}`;

  return {
    id: stay._id.toString(),
    badge: stay.badge,
    category: stay.category,
    distance: stay.distance,
    gradient: stay.gradient,
    location: stay.location,
    maxGuests: stay.maxGuests,
    petFriendly: stay.petFriendly,
    price: formatPrice(stay.pricePerNight),
    pricePerNight: stay.pricePerNight,
    rating: stay.rating,
    reviewCount: stay.reviewCount,
    stayInfo: `최대 ${stay.maxGuests}명 · 침실 ${stay.bedrooms}개 · 침대 ${stay.beds}개 · 욕실 ${stay.baths}개`,
    summary: stay.summary,
    title: stay.title,
    dates: requestedDateLabel,
  };
}

async function searchStays(filters) {
  const destination = filters.destination?.trim();
  const guests = parsePositiveInteger(filters.guests);
  const pets = Number.parseInt(filters.pets || "0", 10);
  const checkIn = parseDate(filters.checkIn);
  const checkOut = parseDate(filters.checkOut);
  const hasDateFilter = Boolean(filters.checkIn || filters.checkOut);

  if (!destination) {
    throw new AppError("여행지는 필수 입력값입니다.", 400);
  }

  if (!guests) {
    throw new AppError("여행 인원은 1명 이상이어야 합니다.", 400);
  }

  if (hasDateFilter && (!checkIn || !checkOut)) {
    throw new AppError("날짜 검색은 체크인과 체크아웃을 함께 보내야 합니다.", 400);
  }

  if (checkIn && checkOut && checkIn >= checkOut) {
    throw new AppError("체크아웃 날짜는 체크인 이후여야 합니다.", 400);
  }

  const query = buildQuery({
    destination,
    guests,
    pets: Number.isNaN(pets) ? 0 : pets,
    checkIn,
    checkOut,
  });

  const stays = await searchStaysFromRepository(query);

  return {
    meta: {
      checkIn: filters.checkIn || null,
      checkOut: filters.checkOut || null,
      destination,
      guests,
      pets: Number.isNaN(pets) ? 0 : pets,
      total: stays.length,
    },
    stays: stays.map((stay) => mapStay(stay, checkIn, checkOut)),
  };
}

export { searchStays };
