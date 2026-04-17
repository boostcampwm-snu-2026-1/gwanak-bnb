import ListingCard from './ListingCard';
import styles from './Listings.module.css';

const SAMPLE_LISTINGS = [
  { id: 1, title: '서울 관악구의 아늑한 한옥', location: '봉천동', distance: '3km 거리', date: '4월 18일~30일 예약 가능', availableFrom: '2026-04-18', availableTo: '2026-04-30', maxGuests: 2, price: 85000, rating: 4.92, image: 'https://picsum.photos/seed/gwanak1/400/380' },
  { id: 2, title: '관악산 뷰 모던 스튜디오', location: '신림동', distance: '1km 거리', date: '4월 20일~5월 6일 예약 가능', availableFrom: '2026-04-20', availableTo: '2026-05-06', maxGuests: 3, price: 120000, rating: 4.87, image: 'https://picsum.photos/seed/gwanak2/400/380' },
  { id: 3, title: '신림역 근처 디자인 룸', location: '신림동', distance: '2km 거리', date: '4월 17일~4월 24일 예약 가능', availableFrom: '2026-04-17', availableTo: '2026-04-24', maxGuests: 2, price: 65000, rating: 4.95, image: 'https://picsum.photos/seed/gwanak3/400/380' },
  { id: 4, title: '서울대입구 감성 숙소', location: '대학동', distance: '500m 거리', date: '4월 24일~5월 10일 예약 가능', availableFrom: '2026-04-24', availableTo: '2026-05-10', maxGuests: 2, price: 95000, rating: 4.88, image: 'https://picsum.photos/seed/gwanak4/400/380' },
  { id: 5, title: '봉천동 루프탑 하우스', location: '봉천동', distance: '4km 거리', date: '5월 1일~5월 18일 예약 가능', availableFrom: '2026-05-01', availableTo: '2026-05-18', maxGuests: 6, price: 150000, rating: 4.91, image: 'https://picsum.photos/seed/gwanak5/400/380' },
  { id: 6, title: '낙성대 조용한 원룸', location: '낙성대동', distance: '2.5km 거리', date: '4월 19일~4월 28일 예약 가능', availableFrom: '2026-04-19', availableTo: '2026-04-28', maxGuests: 2, price: 55000, rating: 4.83, image: 'https://picsum.photos/seed/gwanak6/400/380' },
  { id: 7, title: '관악구 프리미엄 복층', location: '신림동', distance: '3.5km 거리', date: '4월 26일~5월 14일 예약 가능', availableFrom: '2026-04-26', availableTo: '2026-05-14', maxGuests: 4, price: 180000, rating: 4.96, image: 'https://picsum.photos/seed/gwanak7/400/380' },
  { id: 8, title: '도림천 옆 자연친화 숙소', location: '신원동', distance: '5km 거리', date: '4월 18일~4월 29일 예약 가능', availableFrom: '2026-04-18', availableTo: '2026-04-29', maxGuests: 3, price: 75000, rating: 4.85, image: 'https://picsum.photos/seed/gwanak8/400/380' },
];

function matchesLocation(listing, location) {
  if (!location) {
    return true;
  }

  const normalizedLocation = location.toLowerCase();
  return (
    listing.title.toLowerCase().includes(normalizedLocation) ||
    listing.location.toLowerCase().includes(normalizedLocation)
  );
}

function matchesGuests(listing, guests) {
  if (!guests) {
    return true;
  }

  return listing.maxGuests >= guests;
}

function matchesDates(listing, checkIn, checkOut) {
  if (!checkIn && !checkOut) {
    return true;
  }

  if (checkIn && listing.availableFrom > checkIn) {
    return false;
  }

  if (checkOut && listing.availableTo < checkOut) {
    return false;
  }

  return true;
}

export default function Listings({ searchFilters }) {
  const filteredListings = SAMPLE_LISTINGS.filter((listing) => (
    matchesLocation(listing, searchFilters.location) &&
    matchesGuests(listing, searchFilters.guests) &&
    matchesDates(listing, searchFilters.checkIn, searchFilters.checkOut)
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.summary}>
        {filteredListings.length}개의 숙소가 검색 조건과 일치합니다.
      </div>
      {filteredListings.length > 0 ? (
        <div className={styles.grid}>
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>예약 가능한 숙소가 없어요</h2>
          <p>날짜를 조금 바꾸거나 게스트 수를 줄여서 다시 검색해보세요.</p>
        </div>
      )}
    </div>
  );
}
