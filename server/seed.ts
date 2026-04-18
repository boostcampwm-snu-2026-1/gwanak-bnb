import "dotenv/config";

import { connectToMongo, closeMongoConnection } from "./database/mongo.js";
import { staySeedData } from "./data/stay.data.js";

const seed = async () => {
  const collections = await connectToMongo();

  await collections.stays.deleteMany({});

  if (staySeedData.length > 0) {
    await collections.stays.insertMany([...staySeedData]);
  }

  console.log("MongoDB seed completed.");
};

seed()
  .catch((error) => {
    console.error("MongoDB seed failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeMongoConnection();
  });
