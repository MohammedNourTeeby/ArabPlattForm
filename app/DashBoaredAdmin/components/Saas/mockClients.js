// mockClients.js
import { faker } from "@faker-js/faker";

export const mockClients = Array(15)
  .fill()
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    status: faker.helpers.arrayElement(["active", "expired", "pending"]),
    expiryDate: faker.date.future().toLocaleDateString(),
  }));

// mockLicenses.js
export const mockLicenses = Array(50)
  .fill()
  .map(() => ({
    id: faker.string.uuid(),
    key: `LIC-${faker.string.alphanumeric(10).toUpperCase()}`,
    clientId: faker.helpers.arrayElement(mockClients.map((c) => c.id)),
    purchaseDate: faker.date.past().toISOString(),
  }));
