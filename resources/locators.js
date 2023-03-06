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

const xpath = {
  username: '//input[@id="username"]',
  password: '//input[@id="password"]',
  submitButton: '//button[@type="submit"]',
  errorMessage: '//div[@id="flash" and contains(@class, "error")]',
  successMessage: '//div[@id="flash" and contains(@class, "success")]',
  loginPageHeading: '//h2[contains(text(),"Login Page")]',
  secureAreaPageHeading: '//h2[contains(text(),"Secure Area")]',
  logoutButton: '//a[@class="button secondary radius"]',
};

const data = {
  baseUrl: "https://the-internet.herokuapp.com/login",
  username: "tomsmith",
  password: "SuperSecretPassword!",
  loginPageHeading: "Login Page",
  secureAreaPageHeading: "Secure Area",
  errorMessage: "Your username is invalid!",
  successMessage: "You logged into a secure area!",
};

module.exports = { locators, data, xpath };

