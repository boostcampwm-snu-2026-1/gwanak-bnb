import ListingCard from './ListingCard';
import styles from './Listings.module.css';

const SAMPLE_LISTINGS = [
  { id: 1, title: '서울 관악구의 아늑한 한옥', distance: '3km 거리', date: '4월 10일~15일', price: 85000, rating: 4.92, image: 'https://picsum.photos/seed/gwanak1/400/380' },
  { id: 2, title: '관악산 뷰 모던 스튜디오', distance: '1km 거리', date: '4월 12일~17일', price: 120000, rating: 4.87, image: 'https://picsum.photos/seed/gwanak2/400/380' },
  { id: 3, title: '신림역 근처 디자인 룸', distance: '2km 거리', date: '4월 8일~13일', price: 65000, rating: 4.95, image: 'https://picsum.photos/seed/gwanak3/400/380' },
  { id: 4, title: '서울대입구 감성 숙소', distance: '500m 거리', date: '4월 15일~20일', price: 95000, rating: 4.88, image: 'https://picsum.photos/seed/gwanak4/400/380' },
  { id: 5, title: '봉천동 루프탑 하우스', distance: '4km 거리', date: '4월 20일~25일', price: 150000, rating: 4.91, image: 'https://picsum.photos/seed/gwanak5/400/380' },
  { id: 6, title: '낙성대 조용한 원룸', distance: '2.5km 거리', date: '4월 11일~16일', price: 55000, rating: 4.83, image: 'https://picsum.photos/seed/gwanak6/400/380' },
  { id: 7, title: '관악구 프리미엄 복층', distance: '3.5km 거리', date: '4월 14일~19일', price: 180000, rating: 4.96, image: 'https://picsum.photos/seed/gwanak7/400/380' },
  { id: 8, title: '도림천 옆 자연친화 숙소', distance: '5km 거리', date: '4월 9일~14일', price: 75000, rating: 4.85, image: 'https://picsum.photos/seed/gwanak8/400/380' },
];

export default function Listings() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {SAMPLE_LISTINGS.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
