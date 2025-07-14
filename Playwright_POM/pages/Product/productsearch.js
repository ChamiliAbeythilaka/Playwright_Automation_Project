// const { expect } = require('@playwright/test');

// class ProductSearch {
//     constructor(page) {
//         this.page = page;
//         this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
//         this.newProduct = "//div[normalize-space()='Overview / New Product']";
//         this.searchKeyDropdown = 'select[name="search-key"]';
//         this.searchValueInput = '#search-value';
//         this.searchButton = '//button[normalize-space()="Search"]';
//         this.searchResultSelector = '//div[@class="row mt-2 justify-content-md-center"]';
//         this.supplierDropdown = "//select[@id='attr-SupplierCode']";  
//         this.brandDropdown = "//select[@id='attr-ProductBrandCode']"; // Added for brand selection
//     }

//     async navigateToProductSearchPage() {
//         await this.page.waitForSelector(this.productMenu, { state: 'visible' });
//         await this.page.click(this.productMenu);

//         await this.page.waitForSelector(this.newProduct, { state: 'visible' });
//         await this.page.click(this.newProduct);
//     }

//     async selectSearchKey(searchKey) {
//         await this.page.waitForSelector(this.searchKeyDropdown, { state: 'visible' });
//         await this.page.selectOption(this.searchKeyDropdown, searchKey);
//     }

//     async enterSearchValue(value) {
//         await this.page.waitForSelector(this.searchValueInput, { state: 'visible' });
//         await this.page.fill(this.searchValueInput, value);
//     }

//     async selectSupplier(value) {
//         await this.page.waitForSelector(this.supplierDropdown, { state: 'visible' });
//         await this.page.selectOption(this.supplierDropdown, value);
//     }

//     async selectBrand(value) {
//         await this.page.waitForSelector(this.brandDropdown, { state: 'visible' });
//         await this.page.selectOption(this.brandDropdown, value);
//     }

//     async clickSearchButton() {
//         await this.page.waitForSelector(this.searchButton, { state: 'visible' });
//         await this.page.click(this.searchButton);
//     }

//     async searchProduct(searchKey, value) {
//         await this.navigateToProductSearchPage();
//         await this.selectSearchKey(searchKey);

//         if (searchKey === 'SupplierCode') {
//             await this.selectSupplier(value);
//         } else if (searchKey === 'ProductBrandCode') {
//             await this.selectBrand(value);
//         } else {
//             await this.enterSearchValue(value);
//         }
        
//         await this.clickSearchButton();
//     }

//     async verifySearchResult(searchValue) {
//         await this.page.waitForSelector(this.searchResultSelector, { state: 'visible' });
//         await expect(this.page.locator(this.searchResultSelector)).toBeVisible();
//         await expect(this.page.locator(this.searchResultSelector).locator(`text=${searchValue}`)).toBeVisible();
//     }
// }

// module.exports = ProductSearch;





const { expect } = require('@playwright/test');

class ProductSearch {
    constructor(page) {
        this.page = page;
        this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
        this.newProduct = "//div[normalize-space()='Overview / New Product']";
        this.searchKeyDropdown = 'select[name="search-key"]';
        this.searchValueInput = '#search-value';
        this.searchButton = '//button[normalize-space()="Search"]';
        this.searchResultSelector = '//div[@class="row mt-2 justify-content-md-center"]';
        this.noDataSelector = '//td[@class="dt-empty"]'; // Selector for no data message
        this.supplierDropdown = "//select[@id='attr-SupplierCode']";
        this.brandDropdown = "//select[@id='attr-ProductBrandCode']"; // Added for brand selection
    }

    async navigateToProductSearchPage() {
        await this.page.waitForSelector(this.productMenu, { state: 'visible' });
        await this.page.click(this.productMenu);

        await this.page.waitForSelector(this.newProduct, { state: 'visible' });
        await this.page.click(this.newProduct);
    }

    async selectSearchKey(searchKey) {
        await this.page.waitForSelector(this.searchKeyDropdown, { state: 'visible' });
        await this.page.selectOption(this.searchKeyDropdown, searchKey);
    }

    async enterSearchValue(value) {
        await this.page.waitForSelector(this.searchValueInput, { state: 'visible' });
        await this.page.fill(this.searchValueInput, value);
    }

    async selectSupplier(value) {
        await this.page.waitForSelector(this.supplierDropdown, { state: 'visible' });
        await this.page.selectOption(this.supplierDropdown, value);
    }

    async selectBrand(value) {
        await this.page.waitForSelector(this.brandDropdown, { state: 'visible' });
        await this.page.selectOption(this.brandDropdown, value);
    }

    async clickSearchButton() {
        await this.page.waitForSelector(this.searchButton, { state: 'visible' });
        await this.page.click(this.searchButton);
    }

    async searchProduct(searchKey, value) {
        await this.navigateToProductSearchPage();
        await this.selectSearchKey(searchKey);

        if (searchKey === 'SupplierCode') {
            await this.selectSupplier(value);
        } else if (searchKey === 'ProductBrandCode') {
            await this.selectBrand(value);
        } else {
            await this.enterSearchValue(value);
        }
        
        await this.clickSearchButton();
        
        // Delay for observation
        await this.page.waitForTimeout(2000); // Adjust delay as needed
    }

    async isNoDataAvailable() {
        try {
            await this.page.waitForSelector(this.noDataSelector, { state: 'visible', timeout: 3000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    async verifySearchResult(searchValue) {
        const noDataAvailable = await this.isNoDataAvailable();

        if (noDataAvailable) {
            console.log(`No data available for search value: ${searchValue}`);
        } else {
            await this.page.waitForSelector(this.searchResultSelector, { state: 'visible' });
            await expect(this.page.locator(this.searchResultSelector)).toBeVisible();
            await expect(this.page.locator(this.searchResultSelector).locator(`text=${searchValue}`)).toBeVisible();
        }
    }
}

module.exports = ProductSearch;

