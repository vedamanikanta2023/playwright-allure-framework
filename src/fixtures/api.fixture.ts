import { test as base, expect } from "@playwright/test";
import { ApiClient } from "@api/clients/ApiClient";
import { JsonPlaceholderService } from "@api/services/JsonPlaceholderService";
import { env } from "@config/env";

type ApiFixtures = {
  jsonPlaceholder: JsonPlaceholderService;
};

export const test = base.extend<ApiFixtures>({
  jsonPlaceholder: async ({ request }, use) => {
    const client = new ApiClient(request, env.apiBaseUrl);
    await use(new JsonPlaceholderService(client));
  },
});

export { expect };
