# BUG-REPRO 

Quick repro repository for issue evaluation. Scraped together quite fast, please allow for some possible nonsensical things, like test names, etc...

## Summary:

### Expected behaviour

Browser will open the first url from the array, accepts consents via clicking on the accept button banner. Saves state in the `state.json` in the root of the project. Then continues thru the array of urls and waits for the specific request in the network on each visited url. Consent banner will NOT appear.

### Actual behaviour

Solution works in case of one browser, regardless which one it is. In case of all three browsers/projects in config files, or sometimes even two browsers, the cookie banner will appear again and tests will fail, because until the consents are not given, the request will not be sent.

### Structure:

- test folder

    - `consentOnce.fixture.js` - fixture overwriting `page` fixture to accept consents only once, at the beginning of the test run
    - `pageview.fixture.js` - fixture to be used for pageview event tests
    - `test.spec.js` - test file
    - `utils.js` - utility functions file
    - `globalSetup.js` - global setup for test runner
    - `globalTeardown.js` - global teardown for test runner.

### Run

`npm test`
