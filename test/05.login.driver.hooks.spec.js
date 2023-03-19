// 05.login.driver.hooks.spec.js
// ===============
// in this version, driver is moved to separate file
// driver creation/quiting happens in before/after hooks
// Individual Tests now contain only sequence of steps

const LoginPage = require("../pages/LoginPage");
const { data } = require("../resources/locators");
const { getDriver, quitDriver } = require("../resources/driver");

describe("Login page tests - POM, before() and after() hooks, external driver file", function () {
  let driver;
  let loginPage;

  // before hook
  before(async function () {
    driver = await getDriver();
    loginPage = new LoginPage(driver);
    await loginPage.goto();
  });

  //after hook
  after(async function () {
    await quitDriver();
  });

  describe("1. Correct username and password", function () {
    it("1.1. should show the secure area heading and success message", async function () {
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

