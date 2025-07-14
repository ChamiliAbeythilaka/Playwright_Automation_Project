const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../../pages/loginpage');
const Bulkupdates = require('../../pages/Product/bulkupdates');
const urls = require('../../utils/urls');


const dataPath = path.resolve(__dirname, '../../test-data/bulkupdateData.json');
const bulkupdateData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));


    test.describe('Product Tests', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(baseURL);
            const loginPage = new LoginPage(page);
            await loginPage.loginToPage('valid');
        });

    test('Mark product as discontinued', async ({ page }) => {
        const bulkupdates = new Bulkupdates(page);
        await bulkupdates.searchProductByCode('PRODUCT_CODE_123'); // Replace with actual product code
        await bulkupdates.performBulkUpdate('1'); // '1' corresponds to "Mark as Discontinued"
    });

    test('Delete product', async ({ page }) => {
        const bulkupdates= new Bulkupdates(page);
        await bulkupdates.searchProductByCode('PRODUCT_CODE_456'); // Replace with actual product code
        await bulkupdates.performBulkUpdate('2'); // '2' corresponds to "Delete Products"
    });
});
