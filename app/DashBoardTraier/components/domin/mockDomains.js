// mockDomains.js
export const mockDomains = [
  { id: 1, name: "john-fitness.com", status: "active", linkedPage: 1 },
  { id: 2, name: "fit-zone.tech", status: "pending", linkedPage: null },
];

// mockTemplates.js
export const mockTemplates = [
  {
    id: 1,
    name: "قالب اللياقة البدنية",
    structure: [
      { type: "header", text: "مرحبًا بكم في John Fitness" },
      { type: "image", src: "/gym-banner.jpg" },
    ],
  },
];
