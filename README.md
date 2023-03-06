# Selenium Framework Test Automation Demo Project
## Prerequisites
* [Node.js](https://nodejs.org/) (with npm)
* [Visual Studio Code]()
* Basic Knowledge of JavaScript 
* Basic understanding of [Selenium WebDriver](https://selenium.dev)

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


### Initialize Node.js Project (-y accepts all defaults silently)
```shell
npm init -y
```

### Install Selenium
```shell
npm install selenium-webdriver
```

### Install Browser drivers

#### Chrome
```shell
npm install chromedriver
```
#### Firefox (optional)
```shell
npm install geckodriver
```

### Install Testing Framework
```shell

npm install mocha
npm install mocha-selenium

```
### Install Validation Framework
```shell
npm install chai
```

### Install Reporting Framework
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

describe("Login page tests - Basic", () => {
  let driver;

  it("should allow a user to login with correct credentials", async () => {
    driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement(By.name("username")).sendKeys("tomsmith");
    await driver.findElement(By.name("password")).sendKeys("SuperSecretPassword!");
    await driver.findElement(By.css(".radius")).click();

    const success = await driver.findElement(By.id("flash")).getText();
    expect(success).to.contain("You logged into a secure area!");
    await driver.quit();
  });

});
```

# Run Test :heavy_check_mark:
```
npx mocha login.spec.js
```

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
Get location from the terminal i.e 
```shell
[mochawesome] Report HTML saved to C:\_git_repos\selenium-mocha\mochawesome-report\mochawesome.html
```
## ...et voila!
![Screenshot](img/mochawesome.png)
# Page Object Model Design Pattern

## Create additional files/folder
```shell
/pages/LoginPage.js
```
```shell
/resources/locators.js
```
```shell
/test/login.pom.spec.js
```
