const { test } = require('@playwright/test');
const ProductSort = require('../../pages/Product/productsort');
const urls = require('../../utils/urls');
const LoginPage = require('../../pages/loginpage');

// Define your sort criteria and orders
const sortOptions = {
    productCode: 'product_code',
    productName: 'product_name',
    retailPrice: 'retail_sales_price',
    unitCost: 'unit_cost',
    categoryCode: 'category_code',
    categoryName: 'category_name',
    brandCode: 'brand_code',
    brandName: 'brand_name',
    groupCode: 'group_code',
    groupName: 'group_name',
};

const sortOrders = {
    ascending: 'ASC',
    descending: 'DESC',
};

test.describe('Product Sort Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(urls.baseURL);
        const loginPage = new LoginPage(page);
        await loginPage.loginToPage('valid');
    });

    test('Sort Products by Name in Ascending Order', async ({ page }) => {
        const productSort = new ProductSort(page);
        await productSort.sortProducts(sortOptions.productName, sortOrders.ascending);
        await productSort.verifySortResult(sortOptions.productName, sortOrders.ascending);
    });

    test('Sort Products by Product code in Descending Order', async ({ page }) => {
        const productSort = new ProductSort(page);
        await productSort.sortProducts(sortOptions.productCode, sortOrders.descending);
        await productSort.verifySortResult(sortOptions.productCode, sortOrders.descending);
    });

     //Add a delay after each test case
         test.afterEach(async ({ page }) => {
            await page.waitForTimeout(3000); // Delay of 3 seconds
        });

    // Add more test cases for other sorting criteria and orders
});


