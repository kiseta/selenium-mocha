// 01.login.basic.spec.js
// ===================

// Import the `Builder` class from the `selenium-webdriver` module.
// The `Builder` class is used to create new instances of a `WebDriver` object that can control a browser.
const { Builder } = require("selenium-webdriver");

// Import the `By` class from the `selenium-webdriver` module.
// The `By` class is used to locate elements on a webpage, such as finde elements by their `id`, `name`, `class`, or `css` selector.
const { By } = require("selenium-webdriver");

// Import the `expect` function from the Chai assertion library to compare the actual and expected values.
const { expect } = require("chai");

// Create test suite.
// In the Mocha Test Framework, the "describe" function is used to define a test suite,
// which is a collection of related test cases that test a specific feature or functionality of the code being tested.
// The first argument to the "describe" function is a string that describes the name of the test suite.
// The second argument is a function that contains Individual Tests, hence the name (it - individual test)

describe("Login page tests - Basic", function () {
  this.timeout(50000); // Set timeout
  let driver; // Declare a variable to hold the WebDriver object.

  it("01. Correct Login: should allow a user to login with correct credentials", async function () {
    // Create a new instance of a WebDriver object using Chrome browser and assigne it to the `driver` variable.
    driver = await new Builder().forBrowser("chrome").build();

    // Navigate to the login page of the website using the `get()` method of the WebDriver object.
    await driver.get("https://the-internet.herokuapp.com/login");

    // Locate the username input element using the `findElement()` method and enter the username value.
    await driver.findElement(By.name("username")).sendKeys("tomsmith");

    // Locate the password input element and enter the password value.
    await driver.findElement(By.name("password")).sendKeys("SuperSecretPassword!");

    // Locate the login button element and click it.
    await driver.findElement(By.css(".radius")).click();

    // Locate the success message element and get its text.
    const successMsg = await driver.findElement(By.id("flash")).getText();

    // Assert that the actual value (success message) contains the expected value.
    expect(successMsg).to.contain("You logged into a secure area!");

    // Quit the WebDriver object.
    await driver.quit();
  });

  it("02. Incorrect Login: should display an error message for incorrect login", async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement(By.name("username")).sendKeys("dummy");
    await driver.findElement(By.name("password")).sendKeys("dummy");
    await driver.findElement(By.css(".radius")).click();

    const errorMsg = await driver.findElement(By.id("flash")).getText();
    expect(errorMsg).to.contain("Your username is invalid!");
    await driver.quit();
  });
});
