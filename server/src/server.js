import app from './app.js';
import { env } from './config/env.js';
import { runMigrations } from './db/runMigrations.js';

runMigrations();

app.listen(env.port, env.host, () => {
  console.log(`gwanak-bnb api listening on ${env.host}:${env.port}`);
});
