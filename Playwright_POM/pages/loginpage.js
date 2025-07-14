const loginData = require("../test-data/logindata.json");
const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = "//input[@id='loginform-username']";
        this.password = "//input[@id='loginform-password']";
        this.loginButton = "//button[normalize-space()='Login']";
        this.generalErrorMessage = "//div[normalize-space()='Incorrect username or password.']"; // General error message for wrong password or username
        this.emptyUsernameError = "//div[normalize-space()='Username cannot be blank.']"; // Error message for empty username
        this.emptyPasswordError = "//div[contains(text(),'Password cannot be blank.')]"; // Error message for empty password
    }

    async loginToPage(usernameType) {
        const credentials = loginData[usernameType];
        await this.page.fill(this.username, credentials.username);
        await this.page.fill(this.password, credentials.password);
        await this.page.click(this.loginButton);
    }

    getErrorMessageSelector(errorType) {
        switch (errorType) {
            case 'emptyUsername':
                return this.emptyUsernameError;
            case 'emptyPassword':
                return this.emptyPasswordError;
            default:
                return this.generalErrorMessage;
        }
    }

    async getErrorMessage(errorType) {
        const errorMessageSelector = this.getErrorMessageSelector(errorType);
        await this.page.waitForSelector(errorMessageSelector, { state: 'visible' });
        return this.page.textContent(errorMessageSelector);
    }

    async loginAndCheckErrorMessage(usernameType, errorType, expectedErrorMessage) {
        await this.loginToPage(usernameType);
        const errorMessage = await this.getErrorMessage(errorType);
        expect(errorMessage).toBe(expectedErrorMessage);
    }


}

module.exports = LoginPage;






