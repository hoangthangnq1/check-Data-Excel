

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductInfoPage extends Page {
    get priceDefault() { //giá gốc
        return $('#price_default');
    }
    get detailFinalPrice() { //giá sau khuyến mãi
        return $(`//span[contains(@class,'detailFinalPrice')]`);
    }
    get promotionName() { //giá sau khuyến mãi
        return $(`//li[@class ='promotion-item']//input`);
    }
    get btnChonMua() { //button Chọn mua
        return $(`//span[text()='CHỌN MUA ']`);
    }
    get iconCart() { //giỏ hàng
        return $(`//p[contains(text(),'Giỏ hàng')]`);
    }
    async verifyPriceDefault(priceExcel) { //check giá gốc
        console.log("price: " + await this.priceDefault.getValue());
        await this.priceDefault.waitForExist({ timeout: 20000 });
        let priceWeb = await this.priceDefault.getValue();
        let priceExcelRounding = await this.roundingNumber(priceExcel);
        expect(Number(priceWeb)).toEqual((priceExcelRounding), { message: 'Sai giá bán', });
    }
    async verifyDetailFinalPrice(priceExcel) { //check giá sau khi giảm     
        await this.detailFinalPrice.waitForExist({ timeout: 20000 });
        let priceWeb = await this.detailFinalPrice.getText();
        let priceExcelRounding = await this.roundingNumber(priceExcel);
        console.log("price: " + priceWeb.replace(/[^\d]/g, ""));
        expect(Number(priceWeb.replace(/[^\d]/g, ""))).toEqual((priceExcelRounding), { message: 'Sai giá sau giảm', });
    }

    async verifyCTKM(ctkmExcel) { //check chương trình khuyến mãi có PMH   
        await this.promotionName.waitForExist({ timeout: 20000 });
        let promotion = await this.promotionName.getAttribute('data-promotion-name');
        console.log("Promotion: " + typeof promotion);
        let isSame = promotion.includes(ctkmExcel);
        expect(isSame).toEqual((true), { message: 'web: ' + promotion});
    }

    async addToCart(){
        await this.btnChonMua.scrollIntoView();
        await this.btnChonMua.click();
        await browser.pause(4000);
        await super.click(await this.iconCart);
    }

    async roundingNumber(number) {
        let num = await number % 100;
        console.log(num)
        if (100 > number % 100 && number % 100 > 50) {
            return (number + (100 - number % 100));
        } else if (50 >= number % 100 && number % 100 > 0) {
            return (number - (number % 100));
        } else if (number % 100 === 0) {
            return (number);
        }
    }
}

module.exports = new ProductInfoPage();
