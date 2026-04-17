import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDatabase } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runMigrations() {
  const db = getDatabase();
  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schemaSql);

  const columns = db.prepare('PRAGMA table_info(listings)').all();
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has('instant_book')) {
    db.exec('ALTER TABLE listings ADD COLUMN instant_book INTEGER NOT NULL DEFAULT 0');
  }

  if (!columnNames.has('self_check_in')) {
    db.exec('ALTER TABLE listings ADD COLUMN self_check_in INTEGER NOT NULL DEFAULT 0');
  }

  if (!columnNames.has('free_cancellation')) {
    db.exec('ALTER TABLE listings ADD COLUMN free_cancellation INTEGER NOT NULL DEFAULT 0');
  }
}

runMigrations();
