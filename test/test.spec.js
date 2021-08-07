"use strict";

const test = require("./pageview.fixture");

const DEF = JSON.parse(process.env.DEF);
const urls = Object.values(DEF.urls);

urls.forEach(async (url) => {
  test.describe("Pageview::", () => {
    test.use({ url: url });

    test(`${url}::some test`, async ({ page }) => {
      // just meaningless test, not important
      const url = await page.url();
      test.expect(url).not.toHaveLength(0);
    });
  });
});
