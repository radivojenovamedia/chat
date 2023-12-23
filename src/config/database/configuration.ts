import { registerAs } from '@nestjs/config';
import * as process from 'process';
export default registerAs('database', () => ({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  db: process.env.DATABASE_DB,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
}));
