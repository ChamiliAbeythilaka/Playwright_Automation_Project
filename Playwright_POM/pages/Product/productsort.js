// pages/Product/productsort.js

class ProductSort {
    constructor(page) {
        this.page = page;
        this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
        this.newProduct = "//div[normalize-space()='Overview / New Product']";
        this.sortByDropdown = 'select[name="sort-by"]';
        this.sortOrderDropdown = 'select[name="sort-order"]';
        this.searchButton = '//button[normalize-space()="Search"]';
        this.sortResultSelector = "//div[@id='item-table_wrapper']";
    }

    async navigateToProductSort() {
        await this.page.waitForSelector(this.productMenu, { state: 'visible' });
        await this.page.click(this.productMenu);

        await this.page.waitForSelector(this.newProduct, { state: 'visible' });
        await this.page.click(this.newProduct);
    }

    async selectSortBy(sortBy) {
        await this.page.waitForSelector(this.sortByDropdown, { state: 'visible' });
        await this.page.selectOption(this.sortByDropdown, sortBy);
    }

    async selectSortOrder(sortOrder) {
        await this.page.waitForSelector(this.sortOrderDropdown, { state: 'visible' });
        await this.page.selectOption(this.sortOrderDropdown, sortOrder);
    }

    async clickSearchButton() {
        await this.page.waitForSelector(this.searchButton, { state: 'visible' });
        await this.page.click(this.searchButton);
    }

    async sortProducts(sortBy, sortOrder) {
        await this.navigateToProductSort();
        await this.selectSortBy(sortBy);
        await this.selectSortOrder(sortOrder);
        await this.clickSearchButton();
    }

    async verifySortResult(sortBy, sortOrder) {
        await this.page.waitForSelector(this.sortResultSelector, { state: 'visible' });
        // Implement the logic to verify the sort order in the results
        // This can include checking the first few items or specific sorting validation
    }
}

module.exports = ProductSort;
