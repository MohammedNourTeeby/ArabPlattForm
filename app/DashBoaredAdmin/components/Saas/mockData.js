import { faker } from "@faker-js/faker";

// إنشاء عملاء وهميين
export const mockClients = Array(15)
  .fill()
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    registrationDate: faker.date.past(),
    status: faker.helpers.arrayElement(["active", "expired", "pending"]),
  }));

// إنشاء تراخيص وهمية
export const mockLicenses = Array(30)
  .fill()
  .map(() => ({
    id: faker.string.uuid(),
    key: `LIC-${faker.string.alphanumeric(10).toUpperCase()}`,
    clientId: faker.helpers.arrayElement(mockClients).id,
    plan: faker.helpers.arrayElement(["basic", "pro", "enterprise"]),
    status: faker.helpers.arrayElement(["active", "expired", "pending"]),
    purchaseDate: faker.date.past(),
    expiryDate: faker.date.future(),
  }));
