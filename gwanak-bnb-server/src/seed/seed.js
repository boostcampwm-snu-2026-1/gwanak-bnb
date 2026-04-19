require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Accommodation = require('../models/accommodation.model');
const dummyData = require('./dummy.json');

const seed = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await Accommodation.deleteMany({});
    await Accommodation.insertMany(dummyData);
    console.log(`${dummyData.length}개의 숙소 데이터가 저장되었습니다.`);
    await mongoose.disconnect();
};

seed().catch(console.error);
