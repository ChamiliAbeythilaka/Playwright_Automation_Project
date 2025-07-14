// import { test, expect } from '@playwright/test';
// const { baseURL } = require("../utils/urls.js");
// const LoginPage = require("../pages/loginpage.js");
// const HomePage = require("../pages/homepage.js");

// // Define constants for error messages
// const ERROR_MESSAGES = {
//     incorrectCredentials: 'Incorrect username or password.',
//     emptyUsername: 'Username cannot be blank.',
//     emptyPassword: 'Password cannot be blank.'
// };

// test.describe('Login Tests', () => {
    
//     test.beforeEach(async ({ page }) => {
//         await page.goto(baseURL);
//     });

//     test('Valid Login', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.loginToPage('valid');

//         const homePage = new HomePage(page);
//         const loginSuccessful = await homePage.verifyLogin();
//         expect(loginSuccessful).toBe(true);
//     });

//     test('Invalid Login - Password Incorrect', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.loginAndCheckErrorMessage('invalid1', 'general', ERROR_MESSAGES.incorrectCredentials);
//     });

//     test('Invalid Login - Username Incorrect', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.loginAndCheckErrorMessage('invalid2', 'general', ERROR_MESSAGES.incorrectCredentials);
//     });

//     test('Invalid Login - Username & Password Incorrect', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.loginAndCheckErrorMessage('invalid3', 'general', ERROR_MESSAGES.incorrectCredentials);
//     });

//     test('Empty Username', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.loginAndCheckErrorMessage('blankUsername', 'emptyUsername', ERROR_MESSAGES.emptyUsername);
//     });

//     test('Empty Password', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.loginAndCheckErrorMessage('blankPassword', 'emptyPassword', ERROR_MESSAGES.emptyPassword);
//     });

//     test('Empty Username and Password', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.loginAndCheckErrorMessage('blankUsernamePassword', 'emptyUsername', ERROR_MESSAGES.emptyUsername);
//     });
// });


import { test, expect } from '@playwright/test';
const { baseURL } = require("../utils/urls.js");
const LoginPage = require("../pages/loginpage.js");
const HomePage = require("../pages/homepage.js");

// Define constants for error messages 
const ERROR_MESSAGES = {
    incorrectCredentials: 'Incorrect username or password.',
    emptyUsername: 'Username cannot be blank.',
    emptyPassword: 'Password cannot be blank.'
}


test.describe('Login Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('Valid Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginToPage('valid');

        const homePage = new HomePage(page);
        const loginSuccessful = await homePage.verifyLogin();
        expect(loginSuccessful).toBe(true);
    });

    test('Invalid Login - Password Incorrect', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAndCheckErrorMessage('invalid1', 'general' ,ERROR_MESSAGES.incorrectCredentials);
    });

    test('Invalid Login - Username Incorrect', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAndCheckErrorMessage('invalid2', 'general',ERROR_MESSAGES.incorrectCredentials);
    });

    test('Invalid Login - Username & Password Incorrect', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAndCheckErrorMessage('invalid3', 'general', ERROR_MESSAGES.incorrectCredentials);
    });

    test('Empty Username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAndCheckErrorMessage('blankUsername', 'emptyUsername', ERROR_MESSAGES.emptyUsername);
    });

    test('Empty Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAndCheckErrorMessage('blankPassword', 'emptyPassword', ERROR_MESSAGES.emptyPassword);
    });

    test('Empty Username and Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAndCheckErrorMessage('blankUsernamePassword', 'emptyUsername', ERROR_MESSAGES.emptyUsername);
    });
});

