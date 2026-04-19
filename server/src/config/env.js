import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const cwd = process.cwd();
const diskMountPath = process.env.DISK_MOUNT_PATH;
const configuredDbPath = process.env.DB_PATH || './data/gwanak-bnb.sqlite';

const resolvedDbPath = diskMountPath
  ? path.join(diskMountPath, 'gwanak-bnb.sqlite')
  : path.resolve(cwd, configuredDbPath);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT || 4000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  dbPath: resolvedDbPath,
};
