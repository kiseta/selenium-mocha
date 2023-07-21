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

describe("Checkbox tests", function() {
  this.timeout(50000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("should select checkbox 1 and assert it's selected", async function() {
    await driver.get("https://the-internet.herokuapp.com/checkboxes");
    const checkbox1 = await driver.findElement(By.css("input:nth-child(1)"));
    await checkbox1.click();
    const isChecked = await checkbox1.isSelected();
    expect(isChecked).to.be.true;
  });

  it("should unselect checkbox 2 and assert it's unselected", async function() {
    await driver.get("https://the-internet.herokuapp.com/checkboxes");
    const checkbox2 = await driver.findElement(By.css("input:nth-child(3)"));
    await checkbox2.click();
    const isChecked = await checkbox2.isSelected();
    expect(isChecked).to.be.false;
  });
});

describe("Dropdown list tests", function() {
  this.timeout(50000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("should select option 1 from the list and assert it's selected", async function() {
    await driver.get("https://the-internet.herokuapp.com/dropdown");
    const dropdown = await driver.findElement(By.id("dropdown"));
    await driver.findElement(By.css("option[value='1']")).click();
    const selectedOption = await dropdown.getAttribute("value");
    expect(selectedOption).to.equal("1");
  });
});

describe("JavaScript alerts tests", function() {
  this.timeout(50000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it("Js Alert test", async function() {
    await driver.get("https://the-internet.herokuapp.com/javascript_alerts");
    const alertButton = await driver.findElement(By.xpath("//button[contains(text(), 'Click for JS Alert')]"));
    await alertButton.click();

    const alert = await driver.switchTo().alert();
    await alert.accept();

    const resultMessage = await driver.findElement(By.id("result")).getText();
    expect(resultMessage).to.equal("You successfully clicked an alert");
  });
});
