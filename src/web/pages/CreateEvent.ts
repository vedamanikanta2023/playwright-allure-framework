import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { newEventLocators } from "../locators/create-event.locator";
import { NewEventFormData } from "@types-app/testData.types";

export class CreateEvent extends BasePage {
  readonly locators: ReturnType<typeof newEventLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = newEventLocators(page);
  }

  async openNewEventForm(): Promise<void> {
    await this.locators.newEventLink.click();
  }

  async createNewEvent(event: NewEventFormData): Promise<string> {
    await this.locators.slugInput.fill(event.slug);
    await this.locators.demoEventCategoryOption.click();
    await this.locators.selectCategory.click();
    await this.locators.venueNameInput.fill(event.venueName);
    await this.locators.venueAddressInput.fill(event.venueAddress);

    await this.locators.fileInput.first().setInputFiles(event.venueImage);

    await this.locators.priceInput.fill(String(event.price));
    await this.locators.bookingWhatsappNumberInput.fill(
      event.bookingWhatsappNumber,
    );

    await this.locators.fileInput.nth(1).setInputFiles(event.popupImage);

    // if (event.popupOrder !== null) {
      await this.locators.popupOrderInput.fill(String(event.popupOrder));
    // }

    // await this.locators.defaultOption.click();
    await this.locators.regestrationType.click()
    await this.locators.individualAndGroupOption.click();

    await this.locators.maxParticipantsInput.fill(
      String(event.maxParticipantsPerBooking),
    );

    await this.locators.cancellationCutoffHoursInput.fill(
      String(event.cancellationCutoffHours),
    );

    await this.locators.advanceBasisPointsInput.fill(
      String(event.advanceBasisPoints),
    );

    await this.locators.saveEvent.click();

    return event.slug;
  }
}
