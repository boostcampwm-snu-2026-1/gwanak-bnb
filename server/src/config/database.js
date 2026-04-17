import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { env } from './env.js';

let database;

function ensureDatabaseDirectory() {
  const directory = path.dirname(env.dbPath);
  fs.mkdirSync(directory, { recursive: true });
}

export function getDatabase() {
  if (!database) {
    ensureDatabaseDirectory();
    database = new Database(env.dbPath);
    database.pragma('journal_mode = WAL');
    database.pragma('foreign_keys = ON');
  }

  return database;
}
