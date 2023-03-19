// 02.login.basic.hooks.spec.js
// =========================
// driver instance creation/quiting is moved to 'before' and 'after' hooks,
// which allows reusing the driver in multiple tests

const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Login page tests - Basic", function() {
  let driver;

    before(async function () {
      driver = await new Builder().forBrowser("chrome").build();
    });

    after(async function () {
      if (driver) {
        await driver.quit();
      }
    });

  it("should allow a user to login with correct credentials", async function() {

    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement(By.name("username")).sendKeys("tomsmith");
    await driver.findElement(By.name("password")).sendKeys("SuperSecretPassword!");
    await driver.findElement(By.css(".radius")).click();

    const successMsg = await driver.findElement(By.id("flash")).getText();
    expect(successMsg).to.contain("You logged into a secure area!");

  });

  it("should display an error message for incorrect login", async function() {
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement(By.name("username")).sendKeys("dummy");
    await driver.findElement(By.name("password")).sendKeys("dummy");
    await driver.findElement(By.css(".radius")).click();

    const errorMsg = await driver.findElement(By.id("flash")).getText();
    expect(errorMsg).to.contain("Your username is invalid!");
  });
});
