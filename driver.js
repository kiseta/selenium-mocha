// driver.js
// =========

const { Builder } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const chromeOptions = new Options();
chromeOptions.excludeSwitches("enable-logging");

let driver;

async function getDriver() {
  if (!driver) {
    driver = await new Builder().forBrowser("chrome").build();
    // driver = await new webdriver.Builder()
    // .forBrowser("chrome")
    // .setChromeService(serviceBuilder)
    // .setChromeOptions(chromeOptions).build();
  }
  return driver;
}

async function quitDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}

module.exports = {
  getDriver,
  quitDriver,
};


