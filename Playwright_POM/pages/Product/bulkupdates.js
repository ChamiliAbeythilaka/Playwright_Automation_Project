class Bulkupdates {
    constructor(page) {
        this.page = page;
        this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
        this.newProduct = "//div[normalize-space()='Overview / New Product']";
        this.searchKeyDropdown = 'select[name="search-key"]';
        this.searchValueInput = '#search-value';
        this.searchButton = '//button[normalize-space()="Search"]';
        this.searchResultSelector = '//div[@class="row mt-2 justify-content-md-center"]';
        this.bulkupdatesDropdown = "//span[@id='select2-bulk-action-ee-container']";  
        this.applybutton="//button[normalize-space()='Apply']";
        this.checkboxSelector = '.dt-checkboxes.form-check-input.mass-item'; // Adjust this selector if necessary
        this.confirmButton = '.swal2-confirm.btn.btn-primary.me-1'; // Adjust this selector if necessary
        this.successMessage = '#template-customizer'; // Adjust this selector if necessary
    }

    // Method to search for a product by its code
    async searchProductByCode(productCode) {
        await this.page.selectOption(this.searchKeyDropdown, 'product-code'); // Adjust the option value if necessary
        await this.page.fill(this.searchValueInput, productCode);
        await this.page.click(this.searchButton);
        await this.page.waitForSelector(this.searchResultSelector);
    }

    async selectProductCheckbox() {
        await this.page.click(this.checkboxSelector);
    }

    async selectBulkUpdateAction(actionValue) {
        await this.page.selectOption('select[name="bulk-action"]', actionValue);
    }

    async clickApplyButton() {
        await this.page.click(this.applybutton);
    }

    async confirmBulkUpdate() {
        await this.page.click(this.confirmButton);
        await this.page.waitForSelector(this.successMessage);
    }

    async verifySuccessMessage() {
        return await this.page.isVisible(this.successMessage);
    }

    async performBulkUpdate(actionValue) {
        await this.selectProductCheckbox();
        await this.selectBulkUpdateAction(actionValue);
        await this.clickApplyButton();
        await this.confirmBulkUpdate();
        const success = await this.verifySuccessMessage();
        if (success) {
            console.log('Bulk update successful.');
        } else {
            console.log('Bulk update failed.');
        }
    }
}

module.exports = Bulkupdates;

