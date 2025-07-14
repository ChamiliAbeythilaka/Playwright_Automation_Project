// class ProductExport {
//     constructor(page) {
//         this.page = page;
//         // Navigate to product page using menubar
//         this.productMenu = "//i[@class='menu-icon tf-icons bx bx-barcode']";
//         this.newProduct = "//div[normalize-space()='Overview / New Product']"

//         // Elements for the export button and dropdown options
//         this.exportButton = '#exportTableBtn'; // Export button
//         this.exportDropdown = '.dropdown-menu'; // Dropdown menu
//         this.csvOption = 'button[data-output-type="CSV"]'; // CSV option
//         this.excelOption = 'button[data-output-type="EXCEL"]'; // Excel option
//     }

//     async navigateToProductExport() {
//         // Reuse the existing navigation method
//         await this.page.waitForSelector(this.productMenu, { state: 'visible' });
//         await this.page.click(this.productMenu);

//         await this.page.waitForSelector(this.newProduct, { state: 'visible' });
//         await this.page.click(this.newProduct);
//     }

//     async openExportDropdown() {
//         await this.page.waitForSelector(this.exportButton, { state: 'visible' });
//         await this.page.click(this.exportButton);
//     }

//     async exportAsCSV() {
//         await this.openExportDropdown();
//         await this.page.waitForSelector(this.csvOption, { state: 'visible' });
//         await this.page.click(this.csvOption);
//     }

//     async exportAsExcel() {
//         await this.openExportDropdown();
//         await this.page.waitForSelector(this.excelOption, { state: 'visible' });
//         await this.page.click(this.excelOption);
//     }
// }

// module.exports = ProductExport;
