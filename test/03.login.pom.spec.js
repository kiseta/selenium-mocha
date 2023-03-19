// 03.login.pom.spec.js
// page object model design pattern
// ===================

const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const { data } = require("../resources/locators");

describe("Login page tests - POM, before() and after() hooks", function () {
  let driver;
  let loginPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    await loginPage.goto();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  describe("1. Correct username and password", function () {
    it("1.1. should show the secure area heading and success message", async function () {
      await loginPage.validatePageTitle(data.pageTitle);
      await loginPage.validatePageUrl(data.baseUrl);
      await loginPage.loginAs(data.username, data.password);
      await loginPage.validateSecureAreaPageHeading();
      await loginPage.validateSuccessMessage();
      await loginPage.logout();
      await loginPage.validateLoginPageHeading();
    });
  });

  describe("2. Incorrect username and/or password", function () {
    it("2.1 should stay on Login page and show an error message", async function () {
      await loginPage.loginAs("dummy", "dummy");
      await loginPage.validateErrorMessage();
      await loginPage.validateLoginPageHeading();
    });
  });
});
