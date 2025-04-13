import { faker } from "@faker-js/faker";

export const mockLicenses = Array(20)
  .fill()
  .map(() => ({
    id: faker.string.uuid(),
    key:
      faker.string.alphanumeric(5).toUpperCase() +
      "-" +
      faker.string.alphanumeric(5).toUpperCase() +
      "-" +
      faker.string.alphanumeric(5).toUpperCase(),
    status: faker.helpers.arrayElement(["active", "expired"]),
    expirationDate: faker.date.future().toLocaleDateString(),
    plan: faker.helpers.arrayElement(["basic", "pro", "enterprise"]),
  }));
