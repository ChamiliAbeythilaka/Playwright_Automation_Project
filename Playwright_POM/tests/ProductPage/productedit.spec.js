// const { test, expect } = require('@playwright/test');
// const fs = require('fs');
// const path = require('path');
// const LoginPage = require('../../pages/loginpage');
// const ProductEdit = require('../../pages/Product/productedit');
// const urls = require('../../utils/urls');

// // Load the search data from the JSON file can also call for the searchData file 
// const dataPath = path.resolve(__dirname, '../../test-data/productEditData.json');
// const productEditData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// test.describe('Product Edit Tests', () => {
//     test.beforeEach(async ({ page }) => {
//         await page.goto(urls.baseURL);
//         const loginPage = new LoginPage(page);
//         await loginPage.loginToPage('valid');
//     });

//     test('Edit Product by Product Code', async ({ page }) => {
//         const productEdit = new ProductEdit(page);
//         const { searchKey, searchValue } = productEditData.productCode;

//         await productEdit.navigateToProductPage();
//         await productEdit.searchProduct(searchKey, searchValue);
//         await productEdit.editProduct('00000000000000000019');
//         await productEdit.verifyProductUpdate();
//     });

//     test('Edit Product by Product Name', async ({ page }) => {
//         const productEdit = new ProductEdit(page);
//         const { searchKey, searchValue } = productEditData.productName;

//         await productEdit.navigateToProductPage();
//         await productEdit.searchProduct(searchKey, searchValue);
//         await productEdit.editProduct('0000000000000000001E');
//         await productEdit.verifyProductUpdate();
//     });
// });


const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../../pages/loginpage');
const ProductEdit = require('../../pages/Product/productedit');
const urls = require('../../utils/urls');

// Load the search data from the JSON file
const dataPath = path.resolve(__dirname, '../../test-data/productEditData.json');
const productEditData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('Product Edit Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(urls.baseURL);
        const loginPage = new LoginPage(page);
        await loginPage.loginToPage('valid');
    });

    test('Edit Product by Product Code', async ({ page }) => {
        const productEdit = new ProductEdit(page);
        const { searchKey, searchValue, newProductName } = productEditData.productCode;

        await productEdit.navigateToProductPage();
        await productEdit.searchProduct(searchKey, searchValue, newProductName);
    });

    test('Edit Product by Product Name', async ({ page }) => {
        const productEdit = new ProductEdit(page);
        const { searchKey, searchValue, newProductName } = productEditData.productName;

        await productEdit.navigateToProductPage();
        await productEdit.searchProduct(searchKey, searchValue, newProductName);
    });
});

