// lib/dummyData.js
import { faker } from "@faker-js/faker";

export const mockContacts = Array(50)
  .fill()
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number("+9665########"),
    tags: faker.helpers.arrayElements(["vip", "lead"]),
  }));

export const mockCampaigns = Array(10)
  .fill()
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement(["sms", "call"]),
    scheduledAt: faker.date.future().toISOString(),
    message: faker.lorem.sentence(),
  }));
