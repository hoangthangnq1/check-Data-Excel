

const Page = require('./page');
const dataExcel = require('../../data/CTKM-tháng-10.json');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    /**
     * define selectors using getter methods
     */
    get priceRoot () {
        return browser.$("(//div[contains(@class, 'justify-end product-count')]//following-sibling::div)[1]/div[1]");
    }
    get pricePromotion() { 
        return browser.$("(//div[contains(@class, 'justify-end product-count')]//following-sibling::div)[1]/div[2]");
    }
    
    //search thuốc màn home
    async verifyPriceInCartPage(pricePromotion, priceRoot) {
        await (await this.priceRoot).waitForDisplayed({timeout : 20000})
        await (await this.pricePromotion).waitForDisplayed({timeout : 20000})
        let root = await this.priceRoot.getText();
        let promotion = await this.pricePromotion.getText();
        console.log("root: " + root);
        console.log("root: " + promotion);
        expect(Number(root.replace(/[^\d]/g, ""))).toEqual(priceRoot, { message: 'Sai giá bán màn cart'});
        expect(Number(promotion.replace(/[^\d]/g, ""))).toEqual(pricePromotion,{ message: 'Sai giá bán sau giảm màn cart'})
    }
}

module.exports = new CartPage();
