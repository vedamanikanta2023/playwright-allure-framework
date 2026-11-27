import path from 'node:path';
import fs from 'node:fs';

const TEST_DATA_DIR = path.resolve(__dirname, '../test-data');

/** getTestFile('web/images/trip-cover.jpg') -> absolute path */
export function getTestFile(relativePath: string): string {
  const filePath = path.join(TEST_DATA_DIR, relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Test file not found: ${filePath}`);
  }
  return filePath;
}