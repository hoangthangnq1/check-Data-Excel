

const Page = require('./page');
const dataExcel = require('../../data/CTKM-tháng-10.json');

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
    get priceRootSuggest() { 
        return browser.$("//div[contains(@class, 'lc__productSuggest-body products-suggest')]//strike");
    }
    get pricePromotionSuggest() { 
        return browser.$("//div[contains(@class, 'lc__productSuggest-body products-suggest')]//div[@class='product-price']/span");
    }
    
    //search thuốc màn home
    async searchMedicine (nameMedicine, pricePromotion, priceRoot) {
        await this.inputMain.click();
        await this.inputMain.setValue("");
        await this.inputMain.setValue(nameMedicine);
        await this.productSuggest.waitForDisplayed({timeout: 20000})
        await this.productSuggest.waitForClickable({timeout: 20000})
        await this.verifyPriceSuggest(pricePromotion, priceRoot);
        await this.productSuggest.click();
    }
    //search thuốc màn tìm thuốc nhanh
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

    async verifyPriceSuggest(dataPromotion, dataRoot){
        let priceRoot = await (await this.priceRootSuggest).getText();
        let pricePromotion = await (await this.pricePromotionSuggest).getText();
        expect(Number(priceRoot.replace(/[^\d]/g, ""))).toEqual(dataRoot, { message: 'Sai giá bán màn home'});
        expect(Number(pricePromotion.replace(/[^\d]/g, ""))).toEqual(dataPromotion, { message: 'Sai giá bán sau giảm màn home'});
    }
}

module.exports = new HomePage();
