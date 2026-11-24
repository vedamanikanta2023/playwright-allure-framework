import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  environment: process.env.ENVIRONMENT ?? 'qa',
  isCI: !!process.env.CI,
} as const;
