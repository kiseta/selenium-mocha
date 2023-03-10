#  Selenium Mocha Framework Demo 

 <mark>Page Object Model based Test Automation Framework with Selenium WebDriver, Mocha Testing Framework, Chai Assertion Library and Mochawesome Reports</mark> :coffee:


## Prerequisites
* [Node.js](https://nodejs.org/) (with npm)
* [Visual Studio Code](https://code.visualstudio.com/download)
* Basic Knowledge of JavaScript 
* Basic understanding of [Selenium WebDriver](https://selenium.dev)

## Browser Drivers
* Check the version of your Browser
* Download compatible browser driver i.e [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads)
* Extract the chromedriver.exe to the local directory, i.e. C:/Tools
* Add C:/Tools to the PATH variable (Environment Variable)
* Verify the chromedriver.exe binary works by running the following command in a command prompt or terminal window:

```shell
chromedriver --version
```

![Screenshot](img/chromedriver_info.png)


# Create Project Directory
i.e. C:/_git_repos/selenium-mocha/>


```shell
mkdir selenium-mocha
```
## Go to Project directory
```shell
cd selenium-mocha
```
## Create /test folder
```shell
mkdir test
```

# Install Dependencies
Run the following commands in Terminal window in project directory 


### 1. Initialize Node.js Project

```shell
npm init -y
```

### 2. Install Selenium
```shell
npm install selenium-webdriver
```

### 3. Install Testing Framework
```shell
npm install mocha
npm install mocha-selenium
```

### 4. Install Assertion Library
```shell
npm install chai
```

### 5. Install Reporting Framework
```bash
npm install --save-dev mochawesome
```

# Create Selenium script

### Create new test in /test directory
Note: Test name should end with either .**test**.js or .**spec**.js 
```
login.spec.js
```
### Add the following code
```js
// login.spec.js
// ===================

const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Login page tests - Basic", function() {
  let driver;

  it("should allow a user to login with correct credentials", async function() {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement(By.name("username")).sendKeys("tomsmith");
    await driver.findElement(By.name("password")).sendKeys("SuperSecretPassword!");
    await driver.findElement(By.css(".radius")).click();

    const successMsg = await driver.findElement(By.id("flash")).getText();
    expect(successMsg).to.contain("You logged into a secure area!");
    await driver.quit();
  });

  it("should display an error message for incorrect login", async function() {
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
```

# Run Test :heavy_check_mark:
```
npx mocha test\login.spec.js
```

![Screenshot](img/terminal_report.png)

## Configure Test Run Command in package.json

and specify default script timeout
```json
  "scripts": {
    "test": "mocha --timeout 10000"
  }
```

## Run Test (new run comman)
run all tests in the /test folder
```
npm test
```
run specific test
```
npm test test\login.spec.js
```
# Using Mochawesome Reporter
## Update test run command in package.json

```json
  "scripts": {
    "test": "mocha --timeout 10000 --reporter mochawesome"
  },
  ```
  then
  ```
  npm test
  ```
## View Mochawesome Report 
Get location from the terminal window and open it in the brower, for example: 
```shell
[mochawesome] Report HTML saved to C:\_git_repos\selenium-mocha\mochawesome-report\mochawesome.html
```
## ...et voila! :sunglasses:
![Screenshot](img/mochawesome.png)

# Page Object Model Design Pattern
Page Object Model (POM) is a common design pattern used in QA Automation.

* With POM Web pages are represented with corresponding Classes (i.e LoginPage Class, HomePage Class).
* GUI Elements Locators are stored in a separate Repository file (i.e locators.js).
* Interactions with the elements are done via the Class methods (functions).
* Tests contain function calls to perform required actions.

Using POM design pattern makes the code more maintainable, readable, reusable and optimized.

## Create additional files/folders

### Locators/Data file

```shell
/resources/locators.js
```
Add the following content
```js
// locators.js
// ===========

const locators = {
  username: "#username",
  password: "#password",
  submitButton: 'button[type="submit"]',
  errorMessage: "#flash.error",
  successMessage:"#flash.success",
  loginPageHeading: "h2",
  secureAreaPageHeading: "h2",
  logoutButton: ".button.secondary.radius",
};

const data = {
  baseUrl: "https://the-internet.herokuapp.com/login",
  pageTitle: "The Internet",
  username: "tomsmith",
  password: "SuperSecretPassword!",
  loginPageHeading: "Login Page",
  secureAreaPageHeading: "Secure Area",
  errorMessage: "Your username is invalid!",
  successMessage: "You logged into a secure area!",
};

module.exports = { locators, data };
```

### Login Page Class file

```shell
/pages/LoginPage.js
```
Add the following content
```js
// LoginPage.js
// ==========

const { By } = require("selenium-webdriver");
const { expect } = require("chai");
const { locators, data } = require("../resources/locators");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async goto() {
    await this.driver.get(data.baseUrl);
  }

  async loginAs(username, password) {
    await this.driver.findElement(By.css(locators.username)).sendKeys(username);
    await this.driver.findElement(By.css(locators.password)).sendKeys(password);
    await this.driver.findElement(By.css(locators.submitButton)).click();
  }

  async validatePageUrl(expectedUrl) {
    const actualUrl = await this.driver.getCurrentUrl();
    const res = expect(actualUrl).to.equal(expectedUrl);
    return res;
  }

  async validatePageTitle(expectedTitle) {
    const actualTitle = await this.driver.getTitle();
    const res = expect(actualTitle).to.equal(expectedTitle);
    return res;
  }

  async validateSuccessMessage() {
    await this.validatePageText("successMessage");
  }

  async validateErrorMessage() {
    await this.validatePageText("errorMessage");
  }

  async validateLoginPageHeading() {
    await this.validatePageText("loginPageHeading");
  }

  async validateSecureAreaPageHeading() {
    await this.validatePageText("secureAreaPageHeading");
  }

  async validatePageText(val) {
    const element = await this.driver.findElement(By.css(locators[val]));
    const txt = await element.getText();
    const res = expect(txt).to.contain(data[val]);
    return res;
  }

  async logout() {
    await this.driver.findElement(By.css(locators.logoutButton)).click();
  }
}

module.exports = LoginPage;

```

### New Test File

```shell
/test/login.pom.spec.js
```
Add the following code
```js
// login.pom.spec.js
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

```
### Run New Test
```shell
npm test test/login.pom.spec.js
```
### View Results in Mochawesome Report

![Screenshot](img/mochawesome_pom.png)

# Use this project
### clone to your machine
```shell
git clone https://github.com/kiseta/selenium-mocha.git
```
### Install Dependencies
open project in VSCode, run in Terminal
```shell
npm install
```
### Run tests
```shell
npm test
```
### Adding More Tests

* Add locators and data to locators.js file
* Add new page file i.e. FormPage.js and create FormPage Class in it
* Create corresponding methods in new FormPage Class
* Create new test file and build a sequence of steps and validations


