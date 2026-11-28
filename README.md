# Playwright + TypeScript + Allure Framework

Data-driven UI test automation using the Page Object Model, custom fixtures,
JSON test data and Allure reporting. The demo app under test is
[saucedemo.com](https://www.saucedemo.com).

## Folder structure

```
.
├── .github/workflows/      CI pipeline (tests + Allure report artifact)
├── src/
│   ├── api/                API clients, endpoints, services, schemas and validators
│   ├── config/             Environment config (.env loading)
│   ├── fixtures/           Custom Playwright fixtures (API and web)
│   ├── web/pages/          Page Object Model classes
│   ├── types/              TypeScript interfaces for test data
│   └── utils/              JSON data loader, Allure helper
├── test-data/              JSON test data (users.json, products.json)
├── tests/                  Spec files grouped by feature
│   ├── auth/
│   └── checkout/
├── playwright.config.ts
└── tsconfig.json           Path aliases (@pages, @fixtures, @utils ...)
```

## Setup

```bash
npm install
npx playwright install --with-deps
cp .env.example .env
```

Java 8+ is required for the Allure CLI (`java -version`).

## Running tests

```bash
npm test                  # all tests, all browsers
npm run test:chromium     # one browser
npm run test:api          # API tests only
npm run test:smoke        # only @smoke
npm run test:regression   # only @regression
npm run test:headed       # watch the browser
```

The admin session is saved in `playwright/.auth/admin.json` and reused by the
test suite. Playwright checks the saved session before each run and logs in
again only if it has expired or is missing. Configure `ADMIN_PHONE` and
`ADMIN_PASSWORD` in `.env` to create or refresh the session. The saved
credentials/session file is ignored by Git.

## Allure report

```bash
npm run allure:serve      # generate + open temporary report from allure-results
# or
npm run report            # generate static report in allure-report/ and open it
```

## Adding a data-driven test

1. Add a case to a JSON file in `test-data/` (and update the interface in `src/types/`).
2. Loop over it in a spec with `loadTestData<T>('file.json')` and generate one test per entry.
3. Call `applyAllureMeta({...})` so the test is grouped correctly in Allure.
