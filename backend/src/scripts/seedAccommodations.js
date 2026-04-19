import { connectToDatabase, disconnectFromDatabase } from '../config/db.js';
import { accommodations } from '../data/accommodations.js';
import { Accommodation } from '../models/Accommodation.js';

async function seedAccommodations() {
  try {
    await connectToDatabase();

    const operations = accommodations.map((accommodation) => ({
      updateOne: {
        filter: { seedKey: accommodation.seedKey },
        update: { $set: accommodation },
        upsert: true,
      },
    }));

    const result = await Accommodation.bulkWrite(operations);

    console.log(
      `Seed complete: ${result.upsertedCount} inserted, ${result.modifiedCount} updated`
    );
  } finally {
    await disconnectFromDatabase();
  }
}

seedAccommodations().catch((error) => {
  console.error('Accommodation seeding failed.');
  console.error(error);
  process.exitCode = 1;
});
