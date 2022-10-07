

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputMain () {
        return browser.$('#input-main');//00022587
    }
    get btnSubmit() { 
        return browser.$("//span[@id='close-icon']/..//following-sibling::div/button");
    }
    get productLink() { 
        return browser.$("//div[contains(@class,'col col-md-6 ')]");
    }
    get productSuggest() { 
        return browser.$("//div[contains(@class,'products-suggest')]");
    }
    get buyProductNow() { 
        return browser.$("//a[contains(text(), 'MUA THUỐC NGAY')]");
    }
    

    async searchMedicine (nameMedicine) {
        await this.inputMain.click();
        await this.inputMain.setValue("");
        await this.inputMain.setValue(nameMedicine);
        await this.productSuggest.waitForDisplayed({timeout: 20000})
        await this.productSuggest.waitForClickable({timeout: 20000})
        await this.productSuggest.click();
    }

    async searchMedicine2 (nameMedicine) {
        await this.buyProductNow.scrollIntoView();
        await this.pauseBrowser(1000);
        await this.buyProductNow.click();
        await this.inputMain.click();
        await this.inputMain.setValue("");
        await this.inputMain.setValue(nameMedicine);
        await this.productSuggest.waitForDisplayed({timeout: 20000})
        await this.productSuggest.waitForClickable({timeout: 20000})
        await this.productSuggest.click();
    }
}

module.exports = new HomePage();
