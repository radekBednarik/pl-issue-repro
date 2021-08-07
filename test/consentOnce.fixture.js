/**
 * This fixture opens given page via url and
 * accepts consents to allow for tracking.
 */

const { test } = require("@playwright/test");
const { isContextStateEmpty } = require("./utils");

module.exports = test.extend({
  url: undefined,
  page: async ({ page, url }, use) => {
    if (isContextStateEmpty()) {
      await page.goto(url);
      const acceptBttn = await page.waitForSelector(
        '//button[@id="onetrust-accept-btn-handler"]',
        { state: "visible", timeout: 15000 }
      );
      await acceptBttn.click();
      await page.waitForTimeout(5000);
      await page.context().storageState({ path: "state.json" });
      //   const entryPage = new BasePage(
      //     page,
      //     { cookieManager: CookieManager },
      //     { network: Network }
      //   );
      //   await entryPage.goto(url);
      //   await entryPage.cookieManager.clickBttnMainBannerAccept();
      //   await entryPage.wait();
      //   await entryPage.context.storageState({ path: "state.json" });
    }
    await use(page);
  },
});
