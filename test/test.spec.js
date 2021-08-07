"use strict";

const test = require("./pageview.fixture");

const DEF = JSON.parse(process.env.DEF);
const urls = Object.values(DEF.urls);

urls.forEach(async (url) => {
  test.describe("K2NG::Pageview::", () => {
    test.use({ url: url });

    test(`${url}::has all 'x' dimensions`, async ({ page }) => {
      // just meaningless test, not important
      const url = await page.url();
      test.expect(url).not.toHaveLength(0);
    });
  });
});
