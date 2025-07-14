const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../../pages/loginpage');
const ProductDelete = require('../../pages/Product/productdelete');
const urls = require('../../utils/urls');

// Load the search data from the JSON file
const dataPath = path.resolve(__dirname, '../../test-data/productdeleteData.json');
const productdeleteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('Product Delete Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(urls.baseURL);
        const loginPage = new LoginPage(page);
        await loginPage.loginToPage('valid');
    });

    test('Delete Product by Product Code', async ({ page }) => {
        const productDelete = new ProductDelete(page);
        const { searchKey, searchValue } = productdeleteData.productCode;

        await productDelete.navigateToProductPage();
        await productDelete.searchProduct(searchKey, searchValue);

        const isDeleted = await productDelete.deleteProduct();
        if (isDeleted) {
            await productDelete.verifyProductDeletion(searchKey, searchValue);
        } else {
            console.log('Product not found. No deletion performed.');
        }
    });

});

