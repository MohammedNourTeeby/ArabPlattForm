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
  experimental: {},
  webpack: (config, { isServer }) => {
    // إضافة تحميل ملفات CSS باستخدام require.resolve
    config.module.rules.push({
      test: /\.css$/i,
      use: !isServer
        ? [
            require.resolve("style-loader"),
            require.resolve("css-loader"),
            require.resolve("postcss-loader"),
          ]
        : [
            {
              loader: require.resolve("css-loader"),
              options: {
                url: false,
                importLoaders: 1,
                modules: false,
              },
            },
            require.resolve("postcss-loader"),
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
