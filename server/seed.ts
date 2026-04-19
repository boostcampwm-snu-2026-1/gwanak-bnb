import 'dotenv/config'
import { connectDb, disconnectDb } from './src/db/connect.js'
import type { ListingFields } from './src/models/listing.model.js'
import {
  deleteAllListings,
  insertManyListings,
} from './src/repositories/listings.repository.js'

const rows: ListingFields[] = [
  {
    destinationId: 'gwanak',
    title: '관악산 뷰 아늑한 원룸',
    slug: 'gwanak-cozy-studio-1',
    maxGuests: 2,
    pricePerNight: 89000,
    thumbnailUrl: 'https://picsum.photos/seed/gwanak1/640/480',
    rating: 4.7,
    reviewCount: 128,
    description: '캠퍼스와 산책로가 가까운 조용한 숙소입니다.',
  },
  {
    destinationId: 'gwanak',
    title: '서울대 인근 패밀리 스테이',
    slug: 'gwanak-family-2',
    maxGuests: 4,
    pricePerNight: 142000,
    thumbnailUrl: 'https://picsum.photos/seed/gwanak2/640/480',
    rating: 4.5,
    reviewCount: 64,
    description: '가족 단위 여행에 적합한 넓은 거실과 주방.',
  },
  {
    destinationId: 'seoul',
    title: '명동 도보 10분, 모던 스튜디오',
    slug: 'seoul-myeongdong-studio-1',
    maxGuests: 2,
    pricePerNight: 115000,
    thumbnailUrl: 'https://picsum.photos/seed/seoul1/640/480',
    rating: 4.6,
    reviewCount: 210,
    description: '지하철 2·3호선 접근성이 좋은 도심 숙소.',
  },
  {
    destinationId: 'seoul',
    title: '한강 야경 테라스 펜트하우스',
    slug: 'seoul-river-penthouse-2',
    maxGuests: 6,
    pricePerNight: 289000,
    thumbnailUrl: 'https://picsum.photos/seed/seoul2/640/480',
    rating: 4.9,
    reviewCount: 92,
    description: '넓은 테라스에서 한강 야경을 즐길 수 있습니다.',
  },
  {
    destinationId: 'jeju',
    title: '제주 오름 인근 독채 풀빌라',
    slug: 'jeju-pool-villa-1',
    maxGuests: 5,
    pricePerNight: 256000,
    thumbnailUrl: 'https://picsum.photos/seed/jeju1/640/480',
    rating: 4.8,
    reviewCount: 301,
    description: '프라이빗 수영장과 바비큐 시설을 갖춘 독채형 숙소.',
  },
  {
    destinationId: 'jeju',
    title: '협재 해변 도보 5분 오션뷰',
    slug: 'jeju-hyeopjae-ocean-2',
    maxGuests: 4,
    pricePerNight: 198000,
    thumbnailUrl: 'https://picsum.photos/seed/jeju2/640/480',
    rating: 4.7,
    reviewCount: 177,
    description: '창문 너머로 에메랄드빛 바다가 펼쳐집니다.',
  },
  {
    destinationId: 'busan',
    title: '해운대 해변 앞 오션 스위트',
    slug: 'busan-haeundae-suite-1',
    maxGuests: 4,
    pricePerNight: 175000,
    thumbnailUrl: 'https://picsum.photos/seed/busan1/640/480',
    rating: 4.6,
    reviewCount: 412,
    description: '해변 산책과 해산물 맛집이 가까운 위치입니다.',
  },
  {
    destinationId: 'busan',
    title: '광안리 야경이 보이는 코너룸',
    slug: 'busan-gwangalli-corner-2',
    maxGuests: 3,
    pricePerNight: 132000,
    thumbnailUrl: 'https://picsum.photos/seed/busan2/640/480',
    rating: 4.5,
    reviewCount: 88,
    description: '광안대교 야경을 감상하기 좋은 고층 객실.',
  },
  {
    destinationId: 'gangnam',
    title: '강남역 3분, 비즈니스 트래블러 스위트',
    slug: 'gangnam-business-suite-1',
    maxGuests: 2,
    pricePerNight: 165000,
    thumbnailUrl: 'https://picsum.photos/seed/gangnam1/640/480',
    rating: 4.5,
    reviewCount: 256,
    description: '업무 출장에 적합한 책상·고속 와이파이 구비.',
  },
  {
    destinationId: 'gangnam',
    title: '신논현 카페거리 인근 로프트',
    slug: 'gangnam-loft-2',
    maxGuests: 3,
    pricePerNight: 148000,
    thumbnailUrl: 'https://picsum.photos/seed/gangnam2/640/480',
    rating: 4.4,
    reviewCount: 143,
    description: '높은 층고와 채광이 좋은 감성 로프트.',
  },
  {
    destinationId: 'jongno',
    title: '경복궁 인근 한옥 스테이',
    slug: 'jongno-hanok-1',
    maxGuests: 4,
    pricePerNight: 220000,
    thumbnailUrl: 'https://picsum.photos/seed/jongno1/640/480',
    rating: 4.8,
    reviewCount: 95,
    description: '전통 한옥의 정취와 현대 편의를 함께.',
  },
  {
    destinationId: 'mapo',
    title: '연남동 골목 감성 하우스',
    slug: 'mapo-yeonnam-house-1',
    maxGuests: 3,
    pricePerNight: 125000,
    thumbnailUrl: 'https://picsum.photos/seed/mapo1/640/480',
    rating: 4.6,
    reviewCount: 167,
    description: '카페와 소품샵이 밀집한 연남동 한복판.',
  },
]

async function main(): Promise<void> {
  await connectDb()
  await deleteAllListings()
  await insertManyListings(rows)
  console.log(`Seeded ${rows.length} listings.`)
  await disconnectDb()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
