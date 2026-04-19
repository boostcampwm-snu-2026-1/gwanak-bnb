const dummyData = [
  { name: '한강뷰 모던 아파트', location: '서울', maxGuests: 4, pricePerNight: 120000, description: '한강이 보이는 세련된 아파트', imageUrl: 'https://picsum.photos/400/300?random=1' },
  { name: '경복궁 근처 한옥', location: '서울', maxGuests: 3, pricePerNight: 200000, description: '전통 한옥 체험', imageUrl: 'https://picsum.photos/400/300?random=2' },
  { name: '홍대 감성 스튜디오', location: '서울', maxGuests: 2, pricePerNight: 85000, description: '홍대 중심부 감성 공간', imageUrl: 'https://picsum.photos/400/300?random=3' },
  { name: '이태원 루프탑 하우스', location: '서울', maxGuests: 6, pricePerNight: 250000, description: '루프탑에서 즐기는 서울 야경', imageUrl: 'https://picsum.photos/400/300?random=4' },
  { name: '성수동 카페 감성 숙소', location: '서울', maxGuests: 2, pricePerNight: 95000, description: '힙한 성수동 한복판', imageUrl: 'https://picsum.photos/400/300?random=5' },
  { name: '북촌 한옥마을 게스트하우스', location: '서울', maxGuests: 5, pricePerNight: 130000, description: '한옥마을 한가운데 위치', imageUrl: 'https://picsum.photos/400/300?random=6' },

  { name: '제주 협재 풀빌라', location: '제주', maxGuests: 8, pricePerNight: 350000, description: '프라이빗 풀이 있는 럭셔리 빌라', imageUrl: 'https://picsum.photos/400/300?random=7' },
  { name: '제주 감귤 게스트하우스', location: '제주', maxGuests: 4, pricePerNight: 80000, description: '제주 자연 속 힐링 공간', imageUrl: 'https://picsum.photos/400/300?random=8' },
  { name: '제주 성산 오션뷰 펜션', location: '제주', maxGuests: 6, pricePerNight: 180000, description: '성산일출봉이 보이는 펜션', imageUrl: 'https://picsum.photos/400/300?random=9' },
  { name: '제주 애월 통유리 카페하우스', location: '제주', maxGuests: 2, pricePerNight: 160000, description: '바다가 보이는 통유리 숙소', imageUrl: 'https://picsum.photos/400/300?random=10' },
  { name: '제주 한림 독채 펜션', location: '제주', maxGuests: 5, pricePerNight: 220000, description: '프라이빗 독채 숙소', imageUrl: 'https://picsum.photos/400/300?random=11' },
  { name: '제주 중문 리조트형 숙소', location: '제주', maxGuests: 10, pricePerNight: 400000, description: '대가족 여행에 최적화', imageUrl: 'https://picsum.photos/400/300?random=12' },

  { name: '해운대 오션뷰 아파트', location: '부산', maxGuests: 4, pricePerNight: 150000, description: '해운대 바다가 한눈에', imageUrl: 'https://picsum.photos/400/300?random=13' },
  { name: '광안리 루프탑 펜션', location: '부산', maxGuests: 3, pricePerNight: 130000, description: '광안대교 야경 명당', imageUrl: 'https://picsum.photos/400/300?random=14' },
  { name: '감천문화마을 게스트하우스', location: '부산', maxGuests: 2, pricePerNight: 70000, description: '알록달록 감천마을 한가운데', imageUrl: 'https://picsum.photos/400/300?random=15' },
  { name: '남포동 비즈니스 호텔형 숙소', location: '부산', maxGuests: 2, pricePerNight: 90000, description: '부산 중심가 접근성 최고', imageUrl: 'https://picsum.photos/400/300?random=16' },
  { name: '기장 바다 앞 독채', location: '부산', maxGuests: 6, pricePerNight: 200000, description: '파도 소리 들으며 힐링', imageUrl: 'https://picsum.photos/400/300?random=17' },

  { name: '강릉 경포대 오션뷰', location: '강릉', maxGuests: 4, pricePerNight: 140000, description: '경포대 바로 앞 숙소', imageUrl: 'https://picsum.photos/400/300?random=18' },
  { name: '강릉 안목 카페거리 하우스', location: '강릉', maxGuests: 3, pricePerNight: 110000, description: '커피 향 가득한 안목 근처', imageUrl: 'https://picsum.photos/400/300?random=19' },
  { name: '강릉 주문진 바다 펜션', location: '강릉', maxGuests: 6, pricePerNight: 170000, description: '오징어 축제의 고장 주문진', imageUrl: 'https://picsum.photos/400/300?random=20' },

  { name: '경주 황리단길 한옥스테이', location: '경주', maxGuests: 2, pricePerNight: 150000, description: '황리단길 도보 5분', imageUrl: 'https://picsum.photos/400/300?random=21' },
  { name: '경주 보문호수 뷰 펜션', location: '경주', maxGuests: 4, pricePerNight: 120000, description: '호수 뷰가 아름다운 펜션', imageUrl: 'https://picsum.photos/400/300?random=22' },
  { name: '경주 불국사 근처 한옥', location: '경주', maxGuests: 5, pricePerNight: 180000, description: '천년 고도의 분위기', imageUrl: 'https://picsum.photos/400/300?random=23' },

  { name: '여수 돌산도 오션뷰 펜션', location: '여수', maxGuests: 4, pricePerNight: 160000, description: '여수 밤바다가 한눈에', imageUrl: 'https://picsum.photos/400/300?random=24' },
  { name: '여수 게마을 독채', location: '여수', maxGuests: 6, pricePerNight: 190000, description: '신선한 해산물과 함께', imageUrl: 'https://picsum.photos/400/300?random=25' },
  { name: '여수 엑스포 근처 숙소', location: '여수', maxGuests: 3, pricePerNight: 100000, description: '여수 엑스포 도보 거리', imageUrl: 'https://picsum.photos/400/300?random=26' },

  { name: '전주 한옥마을 스테이', location: '전주', maxGuests: 2, pricePerNight: 130000, description: '전통 한옥에서의 하룻밤', imageUrl: 'https://picsum.photos/400/300?random=27' },
  { name: '전주 객사 근처 게스트하우스', location: '전주', maxGuests: 4, pricePerNight: 75000, description: '전주 중심부 위치', imageUrl: 'https://picsum.photos/400/300?random=28' },

  { name: '춘천 남이섬 근처 펜션', location: '춘천', maxGuests: 5, pricePerNight: 120000, description: '남이섬 배 타고 5분', imageUrl: 'https://picsum.photos/400/300?random=29' },
  { name: '춘천 소양강 뷰 독채', location: '춘천', maxGuests: 3, pricePerNight: 95000, description: '닭갈비 먹고 강뷰 즐기기', imageUrl: 'https://picsum.photos/400/300?random=30' },
];