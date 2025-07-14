const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../../pages/loginpage');
const ProductSearch = require('../../pages/Product/productsearch');
const urls = require('../../utils/urls');

// Load the search data from the JSON file
const dataPath = path.resolve(__dirname, '../../test-data/searchData.json');
const searchData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('Product Search Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(urls.baseURL);
        const loginPage = new LoginPage(page);
        await loginPage.loginToPage('valid');
    });

    test('Search Product by Name', async ({ page }) => {
        const productSearch = new ProductSearch(page);
        const { searchKey, searchValue } = searchData.productName;

        // Perform the product search
        await productSearch.searchProduct(searchKey, searchValue);

        // Verify the search results
        await productSearch.verifySearchResult(searchValue);
        await page.waitForTimeout(2000);
    });

    test('Search Product by Code', async ({ page }) => {
        const productSearch = new ProductSearch(page);
        const { searchKey, searchValue } = searchData.productCode;
        await productSearch.searchProduct(searchKey, searchValue);
        await productSearch.verifySearchResult(searchValue);
        await page.waitForTimeout(2000);
    });

    test('Search Product by SKU Number', async ({ page }) => {
        const productSearch = new ProductSearch(page);
        const { searchKey, searchValue } = searchData.skuNumber;
        await productSearch.searchProduct(searchKey, searchValue);
       // await productSearch.verifySearchResult(searchValue);
       await page.waitForTimeout(2000);
    });

    test('Search Product by Supplier', async ({ page }) => {
        const productSearch = new ProductSearch(page);
        const { searchKey, searchValue } = searchData.supplierCode;
        await productSearch.searchProduct(searchKey, searchValue);
        //await productSearch.verifySearchResult(searchValue);
        await page.waitForTimeout(2000);
    });

    test('Search Product by Brand', async ({ page }) => {
        const productSearch = new ProductSearch(page);
        const { searchKey, searchValue } = searchData.brand;
        await productSearch.searchProduct(searchKey, searchValue);
        //await productSearch.verifySearchResult(searchValue);
        await page.waitForTimeout(2000);
    });



})