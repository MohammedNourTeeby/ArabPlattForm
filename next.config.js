/* eslint-disable @typescript-eslint/no-require-imports */
const withTM = require("next-transpile-modules")(["@ffmpeg/ffmpeg"]);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    FFMPEG_CORE_PATH: "/ffmpeg.js",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  // تمت إزالة التكرار في experimental وإزالة turboMode لأنه غير معتمد
  experimental: {},
  webpack: (config, { isServer }) => {
    // إضافة تحميل ملفات CSS
    config.module.rules.push({
      test: /\.css$/i,
      use: !isServer
        ? ["style-loader", "css-loader", "postcss-loader"]
        : [
            {
              loader: "css-loader",
              options: {
                url: false,
                importLoaders: 1,
                modules: false,
              },
            },
            "postcss-loader",
          ],
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
