import app from './app.js';
import { connectToDatabase } from './config/db.js';
import { env } from './config/env.js';

async function startServer() {
  await connectToDatabase();

  app.listen(env.port, () => {
    console.log(`Gwanak BnB API listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server.');
  console.error(error);
  process.exit(1);
});
