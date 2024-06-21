const path = require('path');

module.exports = {
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
    ],
  },
};
