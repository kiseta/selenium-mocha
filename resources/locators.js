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

