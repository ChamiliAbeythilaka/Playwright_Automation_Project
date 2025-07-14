// const { test, expect } = require('@playwright/test');
// const ProductExport = require('../../pages/Product/productexport');
// const LoginPage = require('../../pages/loginpage');
// const urls = require('../../utils/urls');

// test.describe('Product Export Tests', () => {

//     test.beforeEach(async ({ page }) => {
//         await page.goto(urls.baseURL);
//         const loginPage = new LoginPage(page);
//         await loginPage.loginToPage('valid');
//     });

//     test('Export Products as CSV', async ({ page }) => {
//         const productExport = new ProductExport(page);
//         await productExport.navigateToProductExport();
//         await productExport.exportAsCSV();
//         // Add assertions or checks to verify the export functionality, such as checking download or response
//     });

//     test('Export Products as Excel', async ({ page }) => {
//         const productExport = new ProductExport(page);
//         await productExport.navigateToProductExport();
//         await productExport.exportAsExcel();
//         // Add assertions or checks to verify the export functionality, such as checking download or response
//     });
// });
