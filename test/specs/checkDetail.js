const HomePage = require('../pageobjects/home.page');
const ProductInfoPage = require('../pageobjects/product.info.page')
const { writeData } = require('../util/writeData');
const dataExcel = require('../../data/CTKM-tháng-10.json');

describe('Web Ecom', () => {
    beforeAll(async () => {
        writeData();
    });
    var prodNotPromotion = ['00022587']; //truyền mã sản phẩm muốn check
    for (let i = 0; i < 68; i++){
        if (prodNotPromotion.indexOf(dataExcel['CTKM tháng 10'][i]['Mã SP'])>= 0){
            it('check sản phẩm giảm giá', async () => {
                await HomePage.open('https://nhathuoclongchau.com/');
                await HomePage.searchMedicine(dataExcel['CTKM tháng 10'][i]['Mã SP']);
                await HomePage.pauseBrowser(2000);
                await ProductInfoPage.verifyDetailFinalPrice((dataExcel['CTKM tháng 10'][i]['Giá bán sau giảm']));//check giá bán sau giảm
                await ProductInfoPage.verifyPriceDefault(dataExcel['CTKM tháng 10'][i]['Giá bán']); //check giá bán gốc
            });
        }
    }
});


