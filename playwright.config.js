const { cpus } = require("os");

module.exports = {
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  globalSetup: "./test/globalSetup.js",
  globalTeardown: "./test/globalTeardown.js",
  testMatch: "**/test/test.spec.js",
  // workers: 1,
  workers: cpus().length / 2,
  reportSlowTests: null,
  //   retries: 1,
  reporter: [["list"]],
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
      },
    },
  ],
};
