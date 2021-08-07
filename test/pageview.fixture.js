/**
 * Extended test object to be imported in specs testing `pageview` event.
 */

const test = require("./consentOnce.fixture");

module.exports = test.extend({
  url: undefined,
  storageState: "state.json",
  page: async ({ page, url }, use) => {
    /**
     * Here we would be waiting for specific request and push it to array for later use, but for
     * repro issue this is not needed, we will just wait for the request 
     */
    await Promise.all([
      page.waitForRequest(
        /^https:\/\/www\.google-analytics\.com(\/[a-z]{1})?\/collect.*t=pageview.*tid=UA-69252489-6.*$/gi,
        { timeout: 15000 }
      ),
      page.goto(url),
    ]);

    await use(page);
  },
});
