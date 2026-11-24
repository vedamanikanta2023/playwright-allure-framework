import fs from 'node:fs';
import path from 'node:path';

const TEST_DATA_DIR = path.resolve(__dirname, '../../test-data');

/**
 * Loads and parses a JSON file from the /test-data folder.
 * @example const users = loadTestData<UsersData>('users.json');
 */
export function loadTestData<T>(fileName: string): T {
  const filePath = path.join(TEST_DATA_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Test data file not found: ${filePath}`);
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  } catch (error) {
    throw new Error(`Invalid JSON in ${fileName}: ${(error as Error).message}`);
  }
}
