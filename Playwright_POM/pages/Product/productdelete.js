

// const { expect } = require('@playwright/test');

// class ProductDelete {
//     constructor(page) {
//         this.page = page;
//         // Navigation
//         this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
//         this.productPage = "//div[normalize-space()='Overview / New Product']";

//         // Search Elements
//         this.searchKeyDropdown = 'select[name="search-key"]';
//         this.searchValueInput = '#search-value';
//         this.searchButton = '//button[normalize-space()="Search"]';

//         // Delete Elements
//         this.deleteButton = "//tbody/tr[1]/td[10]/div[1]/a[2]/i[1]";
//         this.confirmDeletePopup = "//div[@class='swal2-popup swal2-modal swal2-icon-warning swal2-show']";
//         this.confirmDeleteButton = "//button[normalize-space()='Yes']";
//     }

//     async navigateToProductPage() {
//         await this.page.waitForSelector(this.productMenu, { state: 'visible' });
//         await this.page.click(this.productMenu);

//         await this.page.waitForSelector(this.productPage, { state: 'visible' });
//         await this.page.click(this.productPage);
//     }

//     async searchProduct(searchKey, searchValue) {
//         await this.navigateToProductPage();
//         await this.page.waitForSelector(this.searchKeyDropdown, { state: 'visible' });
//         await this.page.selectOption(this.searchKeyDropdown, searchKey);

//         await this.page.waitForSelector(this.searchValueInput, { state: 'visible' });
//         await this.page.fill(this.searchValueInput, searchValue);

//         await this.page.waitForSelector(this.searchButton, { state: 'visible' });
//         await this.page.click(this.searchButton);
//     }

//     async deleteProduct() {
//         await this.page.waitForSelector(this.deleteButton, { state: 'visible' });
//         await this.page.click(this.deleteButton);

//         await this.page.waitForSelector(this.confirmDeletePopup, { state: 'visible' });
//         await this.page.click(this.confirmDeleteButton);
//     }

//     async verifyProductDeletion() {
//         await this.page.waitForSelector(this.confirmDeletePopup, { state: 'detached' });
//         await expect(this.page.locator(this.confirmDeletePopup)).not.toBeVisible();
//     }
// }

// module.exports = ProductDelete;

//002

// const { expect } = require('@playwright/test');

// class ProductDelete {
//     constructor(page) {
//         this.page = page;
//         // Navigation
//         this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
//         this.productPage = "//div[normalize-space()='Overview / New Product']";

//         // Search Elements
//         this.searchKeyDropdown = 'select[name="search-key"]';
//         this.searchValueInput = '#search-value';
//         this.searchButton = '//button[normalize-space()="Search"]';

//         // Delete Elements
//         this.noDataMessage = "//td[@class='dt-empty']";
//         this.deleteButton = "//tbody/tr[1]/td[10]/div[1]/a[2]/i[1]";
//         this.confirmDeleteButton = "//button[normalize-space()='Yes']";
//         this.successMessage = "//div[@class='swal2-popup swal2-modal swal2-icon-warning swal2-show']";
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

//         await this.page.waitForTimeout(1000);  // Add a short delay to wait for the search results
//     }

//     async deleteProduct() {
//         const noDataElement = await this.page.$(this.noDataMessage);
//         if (noDataElement) {
//             console.log('No data available in table');
//             return false; // Return false to indicate that the product was not found
//         }

//         await this.page.waitForSelector(this.deleteButton, { state: 'visible' });
//         await this.page.click(this.deleteButton);

//         await this.page.waitForSelector(this.confirmDeleteButton, { state: 'visible' });
//         await this.page.click(this.confirmDeleteButton);

//         await this.page.waitForSelector(this.successMessage, { state: 'visible' });
//         return true; // Return true to indicate that the product deletion was initiated
//     }

//     async verifyProductDeletion() {
//         await this.page.waitForTimeout(1000);  // Add a short delay to wait for the table to refresh
//         const noDataElement = await this.page.$(this.noDataMessage);
//         expect(noDataElement).not.toBeNull();
//         console.log('Product deletion verified: No data available in table');
//     }
// }

// module.exports = ProductDelete;


const { expect } = require('@playwright/test');

class ProductDelete {
    constructor(page) {
        this.page = page;
        // Navigation
        this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
        this.productPage = "//div[normalize-space()='Overview / New Product']";

        // Search Elements
        this.searchKeyDropdown = 'select[name="search-key"]';
        this.searchValueInput = '#search-value';
        this.searchButton = '//button[normalize-space()="Search"]';

        // Delete Elements
        this.noDataMessage = "//td[@class='dt-empty']";
        this.deleteButton = "//tbody/tr[1]/td[10]/div[1]/a[2]/i[1]";
        this.confirmDeleteButton = "//button[normalize-space()='Yes']";
        this.successMessage = "//div[@class='swal2-popup swal2-modal swal2-icon-success swal2-show']"; // Verify this selector
    }

    async navigateToProductPage() {
        await this.page.waitForSelector(this.productMenu, { state: 'visible' });
        await this.page.click(this.productMenu);

        await this.page.waitForSelector(this.productPage, { state: 'visible' });
        await this.page.click(this.productPage);
    }

    async searchProduct(searchKey, searchValue) {
        await this.page.waitForSelector(this.searchKeyDropdown, { state: 'visible' });
        await this.page.selectOption(this.searchKeyDropdown, searchKey);

        await this.page.waitForSelector(this.searchValueInput, { state: 'visible' });
        await this.page.fill(this.searchValueInput, searchValue);

        await this.page.waitForSelector(this.searchButton, { state: 'visible' });
        await this.page.click(this.searchButton);

        await this.page.waitForTimeout(1000);  // Add a short delay to wait for the search results
    }

    async deleteProduct() {
        const noDataElement = await this.page.$(this.noDataMessage);
        if (noDataElement) {
            console.log('No data available in table');
            return false; // Return false to indicate that the product was not found
        }

        await this.page.waitForSelector(this.deleteButton, { state: 'visible' });
        await this.page.click(this.deleteButton);

        await this.page.waitForSelector(this.confirmDeleteButton, { state: 'visible' });
        await this.page.click(this.confirmDeleteButton);

        console.log('Waiting for success message...');
        await this.page.screenshot({ path: 'before_wait_success_message.png' }); // Debugging screenshot

        await this.page.waitForSelector(this.successMessage, { state: 'visible', timeout: 10000 }); // Wait for success message

        console.log('Success message appeared.');
        await this.page.screenshot({ path: 'after_wait_success_message.png' }); // Debugging screenshot

        return true; // Return true to indicate that the product deletion was initiated
    }

    async verifyProductDeletion(searchKey, searchValue) {
        await this.searchProduct(searchKey, searchValue);
        await this.page.waitForTimeout(1000);  // Add a short delay to wait for the table to refresh
        const noDataElement = await this.page.$(this.noDataMessage);
        expect(noDataElement).not.toBeNull();
        console.log('Product deletion verified: No data available in table');
    }
}

module.exports = ProductDelete;

