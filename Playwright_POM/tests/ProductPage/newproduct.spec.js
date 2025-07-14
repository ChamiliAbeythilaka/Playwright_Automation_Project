// import { test, expect } from '@playwright/test';
// const { baseURL } = require("../../utils/urls.js");
// const LoginPage = require("../../pages/loginpage.js");
// const ProductPage = require("../../pages/Product/productpage.js");

// const ERROR_MESSAGES = {
//     emptyProductName: 'Product Creation Failed',
//     emptyRetailPrice: 'Retail Sales Price cannot be blank.',
//     emptyUnitCost: 'Unit Cost cannot be blank.',
//     emtyBusinessUnit: 'Business Unit cannot be blank.'

// }

// test.describe('Product Tests', () => {
//     test.beforeEach(async ({ page }) => {
//         await page.goto(baseURL);
//         const loginPage = new LoginPage(page);
//         await loginPage.loginToPage('valid');
//     });

//     test('Add New Product', async ({ page }) => {
//         const productPage = new ProductPage(page);
//         await productPage.addProduct('product1');
//         await expect(productPage.page.locator(productPage.successMessage)).toBeVisible();
//     });


//     // test('Product Name Null', async ({ page }) => {
//     //     const productPage = new ProductPage(page);
//     //     await productPage.RequiredErrorMessage('productNameNull', 'emptyProductName', ERROR_MESSAGES.emptyProductName);
//     // });

//     test('Retail Price Null', async ({ page }) => {
//         const productPage = new ProductPage(page);
//         await productPage.RequiredErrorMessage('retailPriceNull', 'emptyRetailPrice', ERROR_MESSAGES.emptyRetailPrice);
//     });

//     test('Unit cost Null', async ({ page }) => {
//         const productPage = new ProductPage(page);
//         await productPage.RequiredErrorMessage('unitCostNull', 'emptyUnitCost', ERROR_MESSAGES.emptyUnitCost);
//     });

   
   
// });


import { test, expect } from '@playwright/test';
const { baseURL } = require("../../utils/urls.js");
const LoginPage = require("../../pages/loginpage.js");
const ProductPage = require("../../pages/Product/productpage.js");

const ERROR_MESSAGES = {
    emptyProductName: 'Product Name cannot be blank.',
    emptyRetailPrice: 'Retail Sales Price cannot be blank.',
    emptyUnitCost: 'Unit Cost cannot be blank.',
    emtyBusinessUnit: 'Business Unit cannot be blank.'
}

test.describe('Product Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
        const loginPage = new LoginPage(page);
        await loginPage.loginToPage('valid');
    });

    test('Add New Product', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addProduct('product1');
        await expect(productPage.page.locator(productPage.successMessage)).toBeVisible();
    });

    test('Product Name Null', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.RequiredErrorMessage('productNameNull', 'emptyProductName', ERROR_MESSAGES.emptyProductName);
    });

    test('Retail Price Null', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.RequiredErrorMessage('retailPriceNull', 'emptyRetailPrice', ERROR_MESSAGES.emptyRetailPrice);
    });

    test('Unit cost Null', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.RequiredErrorMessage('unitCostNull', 'emptyUnitCost', ERROR_MESSAGES.emptyUnitCost);
    });
});









