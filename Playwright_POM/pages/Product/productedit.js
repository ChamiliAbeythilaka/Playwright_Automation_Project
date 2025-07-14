// const { expect } = require('@playwright/test');

// class ProductEdit {
//     constructor(page) {
//         this.page = page;
//         // Navigation
//         this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
//         this.productPage = "//div[normalize-space()='Overview / New Product']";

//         // Search Elements
//         this.searchKeyDropdown = 'select[name="search-key"]';
//         this.searchValueInput = '#search-value';
//         this.searchButton = '//button[normalize-space()="Search"]';

//         // Edit Elements
//         this.editButton = "//tbody/tr[1]/td[10]/div[1]/a[1]/i[1]";
//         this.productNameInput = "//input[@id='productform-productitemdesc']";
//         this.saveButton = "//button[normalize-space()='Save']";
//         this.successMessage = "//div[@id='w0-success-0']";
//     }

//     async navigateToProductPage() {
//         await this.page.waitForSelector(this.productMenu, { state: 'visible' });
//         await this.page.click(this.productMenu);

//         await this.page.waitForSelector(this.productPage, { state: 'visible' });
//         await this.page.click(this.productPage);
//     }

//     async searchProduct(searchKey, searchValue) {
//         await this.page.waitForSelector(this.searchKeyDropdown, { state: 'visible' });
//         await this.page.selectOption(this.searchKeyDropdown, searchKey);

//         await this.page.waitForSelector(this.searchValueInput, { state: 'visible' });
//         await this.page.fill(this.searchValueInput, searchValue);

//         await this.page.waitForSelector(this.searchButton, { state: 'visible' });
//         await this.page.click(this.searchButton);
//     }

//     async editProduct(newProductName) {
//         await this.page.waitForSelector(this.editButton, { state: 'visible' });
//         await this.page.click(this.editButton);

//         await this.page.waitForSelector(this.productNameInput, { state: 'visible' });
//         await this.page.fill(this.productNameInput, newProductName);

//         await this.page.waitForSelector(this.saveButton, { state: 'visible' });
//         await this.page.click(this.saveButton);
//     }

//     async verifyProductUpdate() {
//         await this.page.waitForSelector(this.successMessage, { state: 'visible' });
//         await expect(this.page.locator(this.successMessage)).toHaveText('Product Updated Succesfully');
//         //return errorMessage.trim();
//     }
// }

// module.exports = ProductEdit;



const { expect } = require('@playwright/test');

class ProductEdit {
    constructor(page) {
        this.page = page;
        // Navigation
        this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
        this.productPage = "//div[normalize-space()='Overview / New Product']";

        // Search Elements
        this.searchKeyDropdown = 'select[name="search-key"]';
        this.searchValueInput = '#search-value';
        this.searchButton = '//button[normalize-space()="Search"]';
        this.noDataMessage = "//td[@class='dt-empty']"; // XPath for "No data available" message

        // Edit Elements
        this.editButton = "//tbody/tr[1]/td[10]/div[1]/a[1]/i[1]";
        this.productNameInput = "//input[@id='productform-productitemdesc']";
        this.saveButton = "//button[normalize-space()='Save']";
        this.successMessage = "//div[@id='w0-success-0']";
    }

    async navigateToProductPage() {
        await this.page.waitForSelector(this.productMenu, { state: 'visible' });
        await this.page.click(this.productMenu);

        await this.page.waitForSelector(this.productPage, { state: 'visible' });
        await this.page.click(this.productPage);
    }

    async searchProduct(searchKey, searchValue, newProductName) {
        await this.page.waitForSelector(this.searchKeyDropdown, { state: 'visible' });
        await this.page.selectOption(this.searchKeyDropdown, searchKey);

        await this.page.waitForSelector(this.searchValueInput, { state: 'visible' });
        await this.page.fill(this.searchValueInput, searchValue);

        await this.page.waitForSelector(this.searchButton, { state: 'visible' });
        await this.page.click(this.searchButton);

        // Add a delay to allow the page to fully load search results
        await this.page.waitForTimeout(2000); // Adjust as needed

        // Check for no data message
        const noDataAvailable = await this.isNoDataAvailable();
        if (noDataAvailable) {
            console.log(`No data available for search value: ${searchValue}`);
            return; // Exit the method if no data is available
        }

        // If data is available, ensure newProductName is defined
        if (!newProductName) {
            throw new Error('No new product name provided');
        }

        // If data is available, proceed with editing
        await this.editProduct(newProductName);
        await this.verifyProductUpdate();
    }

    async isNoDataAvailable() {
        const noDataElement = await this.page.locator(this.noDataMessage);
        return await noDataElement.isVisible();
    }

    async editProduct(newProductName) {
        await this.page.waitForSelector(this.editButton, { state: 'visible' });
        await this.page.click(this.editButton);

        await this.page.waitForSelector(this.productNameInput, { state: 'visible' });
        await this.page.fill(this.productNameInput, newProductName);

        await this.page.waitForSelector(this.saveButton, { state: 'visible' });
        await this.page.click(this.saveButton);
    }

    async verifyProductUpdate() {
        await this.page.waitForSelector(this.successMessage, { state: 'visible' });
        await expect(this.page.locator(this.successMessage)).toHaveText('Product Updated Succesfully');
    }
}

module.exports = ProductEdit;



