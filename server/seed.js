const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

const Accommodation = require('./models/Accommodation');

dns.setServers(['8.8.8.8']);

const seoulImages = [
  "photo-1512917774080-9991f1c4c750", "photo-1598928506311-c55ded91a20c",
  "photo-1502672260266-1c1ef2d93688", "photo-1536376074432-8d2a3d7f9f0d",
  "photo-1554990772-184503529a17", "photo-1494438639946-1ebd1d20bf85",
  "photo-1484154218962-a197022b5858", "photo-1515263487990-61b008296ec6",
  "photo-1591088398332-8a77d399a80d", "photo-1560185007-c5ca9d2c014d"
].map(id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`);

const busanImages = [
  "photo-1519046904884-53103b34b206", "photo-1507525428034-b723cf961d3e",
  "photo-1533090161767-e7358a0bb388", "photo-1471922694467-0ef1a0b3c293",
  "photo-1464454709132-9d59d6467191", "photo-1520250497592-140f4f4f7d20",
  "photo-1439066615861-d1af74d74000", "photo-1476673163937-23c17725b527",
  "photo-1514432324607-448446973917", "photo-1511632765486-a01980e01a18"
].map(id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`);
const jejuImages = [
  "photo-1500382017462-2ca512d06bfb", "photo-1470004914236-af89d6d42a9b",
  "photo-1505142468610-359e7d316be0", "photo-1441974231531-c6227db76b6e",
  "photo-1469225401659-c83d86e922ba", "photo-1461685160012-1678d91028a2",
  "photo-1465145782133-f23057482921", "photo-1469022563149-aa64dbd37dae",
  "photo-1473496169865-658ba7c44d8a", "photo-1510419095250-fe8bbf6f6505"
].map(id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`);

const dummyData = [
  ...Array.from({ length: 10 }).map((_, i) => ({
    title: `서울 감성 스테이 ${i + 1}호`,
    description: "도시의 세련됨과 아늑함이 공존하는 공간입니다. 남산타워가 보이는 루프탑을 즐겨보세요.",
    region: "서울",
    price: 150000 + (i * 12000),
    capacity: { maxGuests: (i % 4) + 2 },
    images: [seoulImages[i]],
    amenities: ["무선 인터넷", "주방", "에어컨", "OTT 서비스"]
  })),
  
  ...Array.from({ length: 10 }).map((_, i) => ({
    title: `부산 오션뷰 테라스 ${i + 1}호`,
    description: "눈앞에 펼쳐진 푸른 바다와 함께 특별한 추억을 만드세요. 광안대교 야경 명소입니다.",
    region: "부산",
    price: 120000 + (i * 9000),
    capacity: { maxGuests: (i % 6) + 2 },
    images: [busanImages[i]],
    amenities: ["무선 인터넷", "무료 주차", "바다 뷰", "테라스"]
  })),
  
  ...Array.from({ length: 10 }).map((_, i) => ({
    title: `제주 숨은 돌담집 ${i + 1}호`,
    description: "바람과 돌담, 그리고 귤나무가 있는 조용한 독채 숙소입니다. 진정한 쉼을 경험하세요.",
    region: "제주도",
    price: 200000 + (i * 18000),
    capacity: { maxGuests: (i % 8) + 2 },
    images: [jejuImages[i]],
    amenities: ["무선 인터넷", "마당", "바비큐 그릴", "커피 머신"]
  }))
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ 데이터 시딩을 위해 DB 연결 성공");
    
    await Accommodation.deleteMany({}); 
    console.log("기존 데이터 삭제 완료");

    await Accommodation.insertMany(dummyData);
    console.log("🚀 30개의 서로 다른 고퀄리티 사진이 성공적으로 입력되었습니다!");
    
    process.exit();
  } catch (err) {
    console.error("❌ 시딩 실패:", err);
    process.exit(1);
  }
};

seedDB();