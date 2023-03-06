// driver.js
// =========

const { Builder } = require("selenium-webdriver");

let driver;

async function getDriver() {
  if (!driver) {
    driver = await new Builder().forBrowser("chrome").build();
  }
  return driver;
}

async function quitDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}

module.exports = {  getDriver,  quitDriver};
