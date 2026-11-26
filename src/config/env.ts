import dotenv from 'dotenv';
import path from 'node:path';
import credentials from "../test-data/web/login.json";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  baseUrl: process.env.BASE_URL ?? process.env.base_url ?? 'https://www.saucedemo.com',
  environment: process.env.ENVIRONMENT ?? process.env.environment ?? 'qa',
  adminPhone: credentials.ADMIN_PHONE,
  adminPassword: credentials.ADMIN_PASSWORD,
  isCI: !!process.env.CI,
} as const;
