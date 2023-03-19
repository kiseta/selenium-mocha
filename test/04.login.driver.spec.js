// 04.login.driver.spec.js
// login tests using external driver.js file without before/after hooks
// ===============

const LoginPage = require("../pages/LoginPage");
const { data } = require("../resources/locators");
const { getDriver, quitDriver } = require("../resources/driver");

describe("Login page tests - POM, no hooks, external driver file", function () {
  let driver;
  let loginPage;

  describe("1. Correct username and password", function () {
    it("1.1. should show the secure area heading and success message with correct username and password", async function () {
      driver = await getDriver();
      loginPage = new LoginPage(driver);
      await loginPage.goto();
      await loginPage.loginAs(data.username, data.password);
      await loginPage.validateSecureAreaPageHeading();
      await loginPage.validateSuccessMessage();
      await loginPage.logout();
      await loginPage.validateLoginPageHeading();
      await quitDriver();
    });
  });

  describe("2. Incorrect username and/or password", function () {
    it("2.1. should show an error message with incorrect username and/or password", async function () {
      driver = await getDriver();
      loginPage = new LoginPage(driver);
      await loginPage.goto();
      await loginPage.loginAs("dummy", "dummy");
      await loginPage.validateErrorMessage();
      await loginPage.validateLoginPageHeading();
      await quitDriver();
    });
  });
});
