import { MongoClient, type Collection } from "mongodb";

import type { StayRecord } from "../types/stay.js";

const mongoUri = process.env.MONGODB_URI?.trim();
const databaseNameFromEnv = process.env.MONGODB_DB_NAME?.trim();

if (!mongoUri) {
  throw new Error("MONGODB_URI is required.");
}

const getDatabaseNameFromUri = (uri: string) => {
  const trimmedUri = uri.trim();
  const pathStartIndex = trimmedUri.lastIndexOf("/");

  if (pathStartIndex === -1) {
    return undefined;
  }

  const pathWithQuery = trimmedUri.slice(pathStartIndex + 1);
  const [databaseName] = pathWithQuery.split("?");

  return databaseName || undefined;
};

const databaseName = databaseNameFromEnv ?? getDatabaseNameFromUri(mongoUri);

if (!databaseName) {
  throw new Error("Set MONGODB_URI with a database name or provide MONGODB_DB_NAME.");
}

const client = new MongoClient(mongoUri);

export interface DatabaseCollections {
  stays: Collection<StayRecord>;
}

export const connectToMongo = async (): Promise<DatabaseCollections> => {
  await client.connect();

  const database = client.db(databaseName);
  const collections = await database.listCollections().toArray();
  const staysCollection = database.collection<StayRecord>("stays");
  const staysCount = await staysCollection.countDocuments();

  console.log("[mongo] connecting", {
    databaseName,
  });

  console.log("[mongo] collections", collections);
  console.log("[mongo] stays count", staysCount);

  return {
    stays: staysCollection,
  };
};

export const closeMongoConnection = async () => {
  await client.close();
};
