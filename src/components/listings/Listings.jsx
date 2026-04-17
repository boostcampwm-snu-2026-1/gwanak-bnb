import { useMemo, useRef, useState } from 'react';
import ListingCard from './ListingCard';
import styles from './Listings.module.css';

const AMENITY_FILTERS = ['와이파이', '주차', '주방', '세탁기', '업무공간', '넷플릭스'];
const OPTION_FILTERS = [
  { key: 'instantBook', label: '즉시 예약' },
  { key: 'selfCheckIn', label: '셀프 체크인' },
  { key: 'freeCancellation', label: '무료 취소' },
];

const SAMPLE_LISTINGS = [
  { id: 1, title: '서울 관악구의 아늑한 한옥', location: '봉천동', distance: '3km 거리', date: '4월 18일~30일 예약 가능', availableFrom: '2026-04-18', availableTo: '2026-04-30', maxGuests: 2, price: 85000, rating: 4.92, image: 'https://picsum.photos/seed/gwanak1/400/380', amenities: ['와이파이', '주방', '셀프 체크인', '세탁기'], instantBook: true, selfCheckIn: true, freeCancellation: true },
  { id: 2, title: '관악산 뷰 모던 스튜디오', location: '신림동', distance: '1km 거리', date: '4월 20일~5월 6일 예약 가능', availableFrom: '2026-04-20', availableTo: '2026-05-06', maxGuests: 3, price: 120000, rating: 4.87, image: 'https://picsum.photos/seed/gwanak2/400/380', amenities: ['와이파이', '에어컨', '주차', '넷플릭스'], instantBook: true, selfCheckIn: false, freeCancellation: true },
  { id: 3, title: '신림역 근처 디자인 룸', location: '신림동', distance: '2km 거리', date: '4월 17일~4월 24일 예약 가능', availableFrom: '2026-04-17', availableTo: '2026-04-24', maxGuests: 2, price: 65000, rating: 4.95, image: 'https://picsum.photos/seed/gwanak3/400/380', amenities: ['와이파이', '업무공간', '전자레인지', '암막커튼'], instantBook: false, selfCheckIn: true, freeCancellation: false },
  { id: 4, title: '서울대입구 감성 숙소', location: '대학동', distance: '500m 거리', date: '4월 24일~5월 10일 예약 가능', availableFrom: '2026-04-24', availableTo: '2026-05-10', maxGuests: 2, price: 95000, rating: 4.88, image: 'https://picsum.photos/seed/gwanak4/400/380', amenities: ['와이파이', '주방', '업무공간', '넷플릭스'], instantBook: false, selfCheckIn: true, freeCancellation: true },
  { id: 5, title: '봉천동 루프탑 하우스', location: '봉천동', distance: '4km 거리', date: '5월 1일~5월 18일 예약 가능', availableFrom: '2026-05-01', availableTo: '2026-05-18', maxGuests: 6, price: 150000, rating: 4.91, image: 'https://picsum.photos/seed/gwanak5/400/380', amenities: ['와이파이', '주차', '주방', '바비큐'], instantBook: false, selfCheckIn: true, freeCancellation: false },
  { id: 6, title: '낙성대 조용한 원룸', location: '낙성대동', distance: '2.5km 거리', date: '4월 19일~4월 28일 예약 가능', availableFrom: '2026-04-19', availableTo: '2026-04-28', maxGuests: 2, price: 55000, rating: 4.83, image: 'https://picsum.photos/seed/gwanak6/400/380', amenities: ['와이파이', '세탁기', '주방', '장기숙박 할인'], instantBook: false, selfCheckIn: true, freeCancellation: true },
  { id: 7, title: '관악구 프리미엄 복층', location: '신림동', distance: '3.5km 거리', date: '4월 26일~5월 14일 예약 가능', availableFrom: '2026-04-26', availableTo: '2026-05-14', maxGuests: 4, price: 180000, rating: 4.96, image: 'https://picsum.photos/seed/gwanak7/400/380', amenities: ['와이파이', '에어컨', '주방', '건조기'], instantBook: true, selfCheckIn: true, freeCancellation: false },
  { id: 8, title: '도림천 옆 자연친화 숙소', location: '신원동', distance: '5km 거리', date: '4월 18일~4월 29일 예약 가능', availableFrom: '2026-04-18', availableTo: '2026-04-29', maxGuests: 3, price: 75000, rating: 4.85, image: 'https://picsum.photos/seed/gwanak8/400/380', amenities: ['와이파이', '주차', '반려동물 가능', '주방'], instantBook: false, selfCheckIn: false, freeCancellation: true },
];

function matchesLocation(listing, location) {
  if (!location) return true;
  const normalizedLocation = location.toLowerCase();
  return listing.title.toLowerCase().includes(normalizedLocation) || listing.location.toLowerCase().includes(normalizedLocation);
}

function matchesGuests(listing, guests) {
  return !guests || listing.maxGuests >= guests;
}

function matchesDates(listing, checkIn, checkOut) {
  if (!checkIn && !checkOut) return true;
  if (checkIn && listing.availableFrom > checkIn) return false;
  if (checkOut && listing.availableTo < checkOut) return false;
  return true;
}

function formatPrice(price) {
  return `₩${price.toLocaleString()}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildPriceBars(listings, minPrice, maxPrice, bucketCount = 8) {
  if (listings.length === 0) return [];

  if (minPrice === maxPrice) {
    return Array.from({ length: bucketCount }, (_, index) => ({
      id: index,
      count: index === Math.floor(bucketCount / 2) ? listings.length : 0,
    }));
  }

  const bucketSize = Math.max(1, Math.ceil((maxPrice - minPrice + 1) / bucketCount));
  const counts = Array(bucketCount).fill(0);

  listings.forEach((listing) => {
    const rawIndex = Math.floor((listing.price - minPrice) / bucketSize);
    const bucketIndex = Math.min(bucketCount - 1, Math.max(0, rawIndex));
    counts[bucketIndex] += 1;
  });

  return counts.map((count, index) => ({ id: index, count }));
}

function toggleValue(values, nextValue) {
  return values.includes(nextValue)
    ? values.filter((value) => value !== nextValue)
    : [...values, nextValue];
}

export default function Listings({ searchFilters }) {
  const resultsRef = useRef(null);
  const [priceRange, setPriceRange] = useState({ min: 55000, max: 180000 });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    instantBook: false,
    selfCheckIn: false,
    freeCancellation: false,
  });

  const firstPassListings = useMemo(() => SAMPLE_LISTINGS.filter((listing) => (
    matchesLocation(listing, searchFilters.location) &&
    matchesGuests(listing, searchFilters.guests) &&
    matchesDates(listing, searchFilters.checkIn, searchFilters.checkOut)
  )), [searchFilters]);

  const overallPriceBounds = useMemo(() => {
    const source = firstPassListings.length > 0 ? firstPassListings : SAMPLE_LISTINGS;
    const prices = source.map((listing) => listing.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [firstPassListings]);

  const activePriceRange = useMemo(() => {
    const min = clamp(priceRange.min, overallPriceBounds.min, overallPriceBounds.max);
    const max = clamp(priceRange.max, overallPriceBounds.min, overallPriceBounds.max);
    return { min: Math.min(min, max), max: Math.max(min, max) };
  }, [overallPriceBounds, priceRange]);

  const filteredListings = useMemo(() => firstPassListings.filter((listing) => {
    const matchesPrice = listing.price >= activePriceRange.min && listing.price <= activePriceRange.max;
    const matchesAmenities = selectedAmenities.every((amenity) => listing.amenities.includes(amenity));
    const matchesOptions = Object.entries(selectedOptions).every(([key, enabled]) => !enabled || listing[key]);
    return matchesPrice && matchesAmenities && matchesOptions;
  }), [activePriceRange, firstPassListings, selectedAmenities, selectedOptions]);

  const priceBars = useMemo(
    () => buildPriceBars(firstPassListings, overallPriceBounds.min, overallPriceBounds.max),
    [firstPassListings, overallPriceBounds],
  );
  const maxBarCount = Math.max(...priceBars.map((bar) => bar.count), 1);

  const handleShowResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.filterPanel}>
        <div className={styles.filterHeader}>
          <div>
            <p className={styles.filterEyebrow}>2차 필터</p>
            <h2>가격, 편의시설, 예약 옵션으로 더 좁히기</h2>
            <p className={styles.filterDescription}>
              필터를 선택하는 순간 현재 1차 검색 결과 안에서 조건에 맞는 숙소 수가 바로 반영됩니다.
            </p>
          </div>
          <button className={styles.resultsButton} onClick={handleShowResults}>
            숙소 {filteredListings.length}개 보기
          </button>
        </div>

        <div className={styles.priceSummary}>
          <div className={styles.priceValue}>
            <span>최소</span>
            <strong>{formatPrice(activePriceRange.min)}</strong>
          </div>
          <div className={styles.priceValue}>
            <span>최대</span>
            <strong>{formatPrice(activePriceRange.max)}</strong>
          </div>
        </div>

        <div className={styles.chart}>
          {priceBars.map((bar) => {
            const step = Math.max(1, (overallPriceBounds.max - overallPriceBounds.min) / Math.max(priceBars.length, 1));
            const barPrice = overallPriceBounds.min + (bar.id + 0.5) * step;
            const isInRange = barPrice >= activePriceRange.min && barPrice <= activePriceRange.max;

            return (
              <div
                key={bar.id}
                className={`${styles.bar} ${isInRange ? styles.barActive : ''}`}
                style={{ height: `${Math.max(18, (bar.count / maxBarCount) * 110)}px` }}
                title={`${bar.count}개 숙소`}
              />
            );
          })}
        </div>

        <div className={styles.sliderGroup}>
          <label className={styles.sliderLabel}>
            최소 가격
            <input
              type="range"
              min={overallPriceBounds.min}
              max={overallPriceBounds.max}
              step="5000"
              value={activePriceRange.min}
              onChange={(event) => {
                const nextMin = Number(event.target.value);
                setPriceRange({ min: Math.min(nextMin, activePriceRange.max), max: activePriceRange.max });
              }}
            />
          </label>
          <label className={styles.sliderLabel}>
            최대 가격
            <input
              type="range"
              min={overallPriceBounds.min}
              max={overallPriceBounds.max}
              step="5000"
              value={activePriceRange.max}
              onChange={(event) => {
                const nextMax = Number(event.target.value);
                setPriceRange({ min: activePriceRange.min, max: Math.max(nextMax, activePriceRange.min) });
              }}
            />
          </label>
        </div>

        <div className={styles.filterGrid}>
          <section className={styles.secondaryGroup}>
            <h3>편의시설</h3>
            <div className={styles.chipList}>
              {AMENITY_FILTERS.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                    onClick={() => setSelectedAmenities((current) => toggleValue(current, amenity))}
                  >
                    {amenity}
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.secondaryGroup}>
            <h3>예약 옵션</h3>
            <div className={styles.optionList}>
              {OPTION_FILTERS.map((option) => (
                <label key={option.key} className={styles.optionRow}>
                  <input
                    type="checkbox"
                    checked={selectedOptions[option.key]}
                    onChange={() => setSelectedOptions((current) => ({
                      ...current,
                      [option.key]: !current[option.key],
                    }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>
      </section>

      <div ref={resultsRef} className={styles.summary}>
        1차 검색 결과 {firstPassListings.length}개 중 {filteredListings.length}개가 현재 2차 필터와 일치합니다.
      </div>
      {filteredListings.length > 0 ? (
        <div className={styles.grid}>
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>선택한 2차 필터에 맞는 숙소가 없어요</h2>
          <p>가격 범위를 넓히거나 편의시설, 예약 옵션을 일부 해제해보세요.</p>
        </div>
      )}
    </div>
  );
}
