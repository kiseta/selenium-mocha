// login.basic.spec.js
// ===================

const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Login page tests - Basic", () => {
  let driver;

  it("should allow a user to login with correct credentials", async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://the-internet.herokuapp.com/login");
    const actualTitle = await driver.getTitle();
    expect(actualTitle).to.equal("The Internet");
    
    await driver.findElement(By.name("username")).sendKeys("tomsmith");
    await driver.findElement(By.name("password")).sendKeys("SuperSecretPassword!");
    await driver.findElement(By.css(".radius")).click();

    const success = await driver.findElement(By.id("flash")).getText();
    expect(success).to.contain("You logged into a secure area!");
    await driver.quit();
  });

  it("should display an error message for incorrect login", async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement(By.name("username")).sendKeys("dummy");
    await driver.findElement(By.name("password")).sendKeys("dummy");
    await driver.findElement(By.css(".radius")).click();

    const error = await driver.findElement(By.id("flash")).getText();
    expect(error).to.contain("Your username is invalid!");
    await driver.quit();
  });
});
