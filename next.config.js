module.exports = {
  reactStrictMode: true,
  env: {
    FFMPEG_CORE_PATH: "/ffmpeg.js",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/api/uploads/**",
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
  // إزالة أي تكوينات غير ضرورية
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      stream: false,
      crypto: false,
    };
    return config;
  },
};