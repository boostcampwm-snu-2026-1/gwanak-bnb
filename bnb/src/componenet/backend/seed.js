import mongoose from "mongoose";
import 'dotenv/config';
import { Room } from './model/room.js';

const URI = process.env.URI;

const dummyData = [
    // 강서구 (locationId: 4)
    {
        title: "김포공항 인근 모던 아파트",
        description: "공항 이용이 편리한 위치에 있는 깔끔하고 넓은 아파트입니다.",
        locationId: 4,
        price: 85000,
        roomType: "아파트",
        capacity: { maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 1 },
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"]
    },
    {
        title: "마곡지구 비즈니스 숙소",
        description: "업무와 휴식을 동시에 즐길 수 있는 마곡의 세련된 아파트입니다.",
        locationId: 4,
        price: 70000,
        roomType: "아파트",
        capacity: { maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"]
    },
    // 관악구 (locationId: 5)
    {
        title: "관악산 뷰 아늑한 주택",
        description: "창밖으로 관악산이 펼쳐지는 조용하고 쾌적한 주택입니다.",
        locationId: 5,
        price: 65000,
        roomType: "주택",
        capacity: { maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"]
    },
    {
        title: "샤로수길 근처 감성 숙소",
        description: "맛집과 카페가 가득한 샤로수길 인근의 아기자기한 주택입니다.",
        locationId: 5,
        price: 45000,
        roomType: "주택",
        capacity: { maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"]
    },
    // 해운대구 (locationId: 6)
    {
        title: "해운대 오션뷰 호텔",
        description: "바다가 한눈에 들어오는 해운대 최고의 전망을 자랑하는 호텔입니다.",
        locationId: 6,
        price: 220000,
        roomType: "호텔",
        capacity: { maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2 },
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"]
    },
    {
        title: "달맞이길 아트 하우스",
        description: "해운대 달맞이길 근처에 위치한 예술적인 인테리어의 주택입니다.",
        locationId: 6,
        price: 150000,
        roomType: "주택",
        capacity: { maxGuests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
        images: ["https://images.unsplash.com/photo-1501183638710-841dd1904471"]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(URI);
        await Room.deleteMany({});
        await Room.insertMany(dummyData);
        console.log("데이터 추가 성공");
        mongoose.connection.close();
    } catch (err) {
        console.error("에러 발생:", err);
    }
};

seedDB();