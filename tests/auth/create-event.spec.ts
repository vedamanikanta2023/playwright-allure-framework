import path from "node:path";
import { test, expect } from "@fixtures/web.fixture";
import createEventData from "../../src/test-data/web/create-event.json";
import type { NewEventFormData } from "@types-app/testData.types";
import { formatSlug } from "@utils/string-utils";

test.describe("Create event", () => {
  for (const data of createEventData.createEventCases) {
    test(`creates event from data: ${data.slug}`, async ({
      createEvent,
      loggedInAdmin,
      page,
    }) => {
      await loggedInAdmin;
      await expect(page).toHaveTitle("GoHyderabad Admin");

      await test.step("Open the new event form", () =>
        createEvent.openNewEventForm());

      const event: NewEventFormData = {
        ...data,
        slug: `${data.slug.toLowerCase()}`,
        venueImage: path.resolve(process.cwd(), data.venueImage),
        popupImage: path.resolve(process.cwd(), data.popupImage),
      };
      await test.step("Fill and save the event", () =>
        createEvent.createNewEvent(event));

      await test.step("Verify the event was created", async () => {
        await expect(
          page.getByRole("heading", {
            name: formatSlug(event.slug),
            exact: true,
          }),
        ).toBeVisible({ timeout: 30000 });
      });
    });
  }
});
