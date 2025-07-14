class HomePage {
  constructor(page) {
      this.page = page;
      this.homePageIdentifier = "//nav[@id='layout-navbar']"
  }

  async verifyLogin() {
   
      await this.page.waitForSelector(this.homePageIdentifier, { state: 'visible' });
      const isVisible = await this.page.isVisible(this.homePageIdentifier);
      return isVisible;
  }


}

module.exports = HomePage;
