module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { md: "768px" },
      fontFamily: {
        sans: ["var(--font-cairo)", "Arial", "sans-serif"],
        cairo: ["var(--font-cairo)", "Arial", "sans-serif"],
      },
      colors: {
        "wave-primary": "#3B82F6",
        "wave-progress": "#2563EB",
        "media-control": "rgba(0, 0, 0, 0.7)",
        "license-premium": "#8B5CF6",
        "license-educational": "#10B981",
        purple: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        blue: { 500: "#3B82F6" },
      },
      boxShadow: {
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
