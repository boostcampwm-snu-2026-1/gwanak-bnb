import Stay from "../models/Stay.js";

async function searchStays(query) {
  return Stay.find(query).sort({ rating: -1, reviewCount: -1 }).lean();
}

async function replaceAllStays(stays) {
  await Stay.createCollection();
  await Stay.syncIndexes();
  await Stay.deleteMany({});
  return Stay.insertMany(stays);
}

export { replaceAllStays, searchStays };
