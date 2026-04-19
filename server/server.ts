import "dotenv/config";

import { createApp } from "./app.js";
import { closeMongoConnection, connectToMongo } from "./database/mongo.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

const startServer = async () => {
  const collections = await connectToMongo();
  const app = createApp(collections);

  const server = app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await closeMongoConnection();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

startServer().catch((error) => {
  console.error("Failed to start API server.", error);
  process.exit(1);
});
