const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bldb-001.dx.commercecloud.salesforce.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "cdn.media.amplience.net"
      },
      {
        protocol: "https",
        hostname: "**.staging.bigcontent.io"
      },
      {
        protocol: "https",
        hostname: "amp.a.bigcontent.io"
      }
    ],
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
};


const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer(nextConfig);