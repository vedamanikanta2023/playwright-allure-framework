import { Page } from "@playwright/test";

export const newEventLocators = (page: Page) => ({
  newEventLink: page.getByRole('link', { name: 'New event' }),

  slugInput: page.getByRole('textbox', { name: 'Slug *' }),

  // defaultOption: page.getByRole('option', { name: '—' }),
  demoEventCategoryOption: page.getByRole('button', { name: '— Category' }),
  selectCategory:page.getByRole('option', { name: 'Adventure' }),
  // demoTripCategoryOption: page.getByRole('option', { name: 'Demo trip category' }),

  newEventsDialog: page.getByRole('dialog', { name: 'New Events' }),

  venueNameInput: page.getByRole('textbox', { name: 'Venue name' }),
  venueAddressInput: page.getByRole('textbox', { name: 'Venue address' }),

  uploadImageButton: page.getByRole('button', { name: 'Upload image Click or drop a' }),
  fileInput: page.locator('input[type="file"]'),

  priceInput: page.getByRole('spinbutton', { name: 'Price' }),
  bookingWhatsappNumberInput: page.getByRole('textbox', { name: 'Booking whatsapp number' }),

  popupOrderInput: page.getByRole('spinbutton', { name: 'Popup order' }),
  regestrationType: page.getByRole('button', { name: '— Registration type' }),
  
  individualAndGroupOption: page.getByRole('option', { name: 'Individual and group' }),

  maxParticipantsInput: page.getByRole('spinbutton', { name: 'Max participants per booking' }),

  cancellationCutoffHoursInput: page.getByRole('spinbutton', { name: 'Cancellation cutoff hours' }),

  advanceBasisPointsInput: page.getByRole('spinbutton', { name: 'Advance basis points' }),

  saveEvent: page.getByRole("button",{name:'Save'})
});