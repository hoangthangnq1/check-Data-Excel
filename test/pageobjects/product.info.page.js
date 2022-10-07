

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductInfoPage extends Page {
    get priceDefault () { //giá gốc
        return $('#price_default');
    }
    get detailFinalPrice () { //giá sau khuyến mãi
        return $(`//span[contains(@class,'detailFinalPrice')]`);
    }

    async verifyPriceDefault(priceExcel){ //check giá gốc
        console.log("price: " + await this.priceDefault.getValue());
        await this.priceDefault.waitForExist({timeout : 20000});
        let priceWeb = await this.priceDefault.getValue();
        expect(Number(priceWeb)).toEqual((priceExcel), { message: 'Sai giá gốc', });
    }
    async verifyDetailFinalPrice(priceExcel){ //check giá sau khi giảm     
        await this.detailFinalPrice.waitForExist({timeout : 20000});
        let priceWeb = await this.detailFinalPrice.getText();
        console.log("price: " + priceWeb.replace(/[^\d]/g, ""));
        expect(Number(priceWeb.replace(/[^\d]/g, ""))).toEqual((priceExcel),{ message: 'Sai giá sau giảm', });
    }
}

module.exports = new ProductInfoPage();
