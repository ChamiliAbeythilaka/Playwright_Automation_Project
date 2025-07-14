const productData = require("../../test-data/productdata.json")
const { expect } = require('@playwright/test')

class ProductPage {
    constructor(page) {
        this.page = page;
        // Navigate to product page using menubar
        this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
        this.newProduct = "//div[normalize-space()='Overview / New Product']";
        this.addProductButton = "//a[@class='btn btn-primary w-100']";

        // New product 
        this.productName = "//input[@id='productform-productitemdesc']";
        this.retailPrice = "//input[@id='productform-retailsalesprice']";
        this.unitCost = "//input[@id='productform-currentcost']";
        this.businessUnitDropdown = "//span[@id='select2-productform-product_brand_l2_id-container']";
        
        
        this.saveButton = "//button[normalize-space()='Save']";
        this.successMessage = "//div[@id='w0-success-0']";

        // Required field messages
        this.productNameReqError = "//div[normalize-space()='Product Name cannot be blank.']";
        this.retailPriceReqError = "//div[normalize-space()='Retail Sales Price cannot be blank.']";
        this.unitCostReqError = "//div[normalize-space()='Unit Cost cannot be blank.']";
        this.businessunitReqError = "//div[@class='mb-3 field-productform-product_brand_l2_id required']//div[1]";
    }

    async addProduct(productKey) {
        const product = productData[productKey];
        const productNamePrefix = "Automate Product-"; // Define your prefix here

        await this.page.waitForSelector(this.productMenu, { state: 'visible' });
        await this.page.click(this.productMenu);
        await this.page.waitForSelector(this.newProduct, { state: 'visible' });
        await this.page.click(this.newProduct);
        await this.page.waitForSelector(this.addProductButton, { state: 'visible' });
        await this.page.click(this.addProductButton);

        // Fill form
        if (product.productname) {
            const fullProductName = `${productNamePrefix}${product.productname}`;
            await this.page.fill(this.productName, fullProductName);
        } else {
            await this.page.fill(this.productName, ""); // Set to empty if name is null or undefined
        }
        
        await this.page.fill(this.retailPrice, product.retailprice || "");
        await this.page.fill(this.unitCost, product.unitcost || "");

        // Select Business Unit
        await this.page.click(this.businessUnitDropdown);
        await this.page.waitForSelector('.select2-results__options');
        const option = product.businessunit;
        if (option) {
            await this.page.click(`//li[text()="${option}"]`);
        }
        
        // Save product
        await this.page.click(this.saveButton);
    }

    async verifyTextPresence(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    getErrorMessageSelector(errorType) {
        switch (errorType) {
            case 'emptyProductName':
                return this.productNameReqError;
            case 'emptyRetailPrice':
                return this.retailPriceReqError;
            case 'emptyUnitCost':
                return this.unitCostReqError;
            case 'emtyBusinessUnit':
                return this.businessunitReqError;
        }
    }

    async getErrorMessage(errorType) {
        const errorMessageSelector = this.getErrorMessageSelector(errorType);
        await this.page.waitForSelector(errorMessageSelector, { state: 'visible' });
        const errorMessage = await this.page.textContent(errorMessageSelector);
        return errorMessage.trim(); // Trim any extra whitespace or line breaks
    }

    async RequiredErrorMessage(productKey, errorType, expectedErrorMessage) {
        await this.addProduct(productKey);
        const errorMessage = await this.getErrorMessage(errorType);
        expect(errorMessage).toBe(expectedErrorMessage);
    }
}

module.exports = ProductPage;





























