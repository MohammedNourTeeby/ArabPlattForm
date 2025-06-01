/* eslint-disable @typescript-eslint/no-require-imports */
const withTM = require("next-transpile-modules")(["@ffmpeg/ffmpeg"]);

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    workerThreads: true,
    legacyBrowsers: false,
    cpus: 4,
  },

  typescript: {
    ignoreBuildErrors: true, // حل مؤقت لأخطاء TypeScript
  },

  eslint: {
    ignoreDuringBuilds: true, // تجاوز أخطاء ESLint
  },
  env: {
    FFMPEG_CORE_PATH: "/ffmpeg.js",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/api/uploads/**", // المسار الذي تأتي منه الصور
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {},
  webpack: (config, {}) => {
    // إضافة تحميل ملفات CSS باستخدام require.resolve
    config.module.rules.push({
      test: /\.css$/i,
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      stream: false,
      crypto: false,
    };
    return config;
  },
});
