import connectDatabase from "../config/database.js";
import stays from "../seeds/stays.js";
import { replaceAllStays } from "../repositories/stayRepository.js";

async function seedStays() {
  await connectDatabase();
  await replaceAllStays(stays);
}

seedStays()
  .then(async () => {
    console.log("숙소 더미 데이터 시딩이 완료되었습니다.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("숙소 더미 데이터 시딩에 실패했습니다.");
    console.error(error);
    process.exit(1);
  });
