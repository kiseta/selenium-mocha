// login.basic.spec.js
// ===================

const { Builder } = require("selenium-webdriver"); // Import the `Builder` class from the `selenium-webdriver` module. 
// The `Builder` class is used to create new instances of a `WebDriver` object that can control a browser.

const { By } = require("selenium-webdriver"); // Import the `By` class from the `selenium-webdriver` module. 
// The `By` class is used to locate elements on a webpage, 
// such as finde elements by their `id`, `name`, `class`, or `css` selector.

const { expect } = require("chai"); // Import the `expect` function from the Chai assertion library to compare the actual and expected values.

describe("Login page tests - Basic", () => {
  let driver; // Declare a variable to hold the WebDriver object.

  it("should allow a user to login with correct credentials", async () => {
    driver = await new Builder().forBrowser("chrome").build();  // Create a new instance of a WebDriver object use Chrome browser and assigne it to the `driver` variable.

    await driver.get("https://the-internet.herokuapp.com/login"); // Navigate to the login page of the website use the `get()` method of the WebDriver object.

    await driver.findElement(By.name("username")).sendKeys("tomsmith");  // Locate the username input element on the webpage use the `findElement()` method of the WebDriver object and enter the username value.

    await driver.findElement(By.name("password")).sendKeys("SuperSecretPassword!"); // Locate the password input element on the webpage use the `findElement()` method of the WebDriver object and enter the password value.

    await driver.findElement(By.css(".radius")).click(); // Locate the login button on the webpage use the `findElement()` method of the WebDriver object and click it.

    const success = await driver.findElement(By.id("flash")).getText(); // Locate the success message element on the webpage use the `findElement()` method of the WebDriver object and get its text.

    expect(success).to.contain("You logged into a secure area!");  // Assert that the actual value (success message) contains the expected value.

    await driver.quit(); // Quit the WebDriver object.
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
