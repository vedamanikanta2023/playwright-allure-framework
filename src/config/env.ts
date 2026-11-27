import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  baseUrl: process.env.BASE_URL ?? process.env.base_url ?? 'https://www.saucedemo.com',
  environment: process.env.ENVIRONMENT ?? process.env.environment ?? 'qa',
  adminPhone: process.env.ADMIN_PHONE ?? process.env.adminPhone,
  adminPassword: process.env.ADMIN_PASSWORD ?? process.env.adminPassword,
  isCI: !!process.env.CI,
} as const;
