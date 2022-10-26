const HomePage = require('../pageobjects/home.page');
const ProductInfoPage = require('../pageobjects/product.info.page')
const CartPage = require('../pageobjects/cart.page')
const { writeData } = require('../util/writeData');
const dataExcel = require('../../data/CTKM-tháng-10.json');
const fsPromises = require('fs/promises');
const path = require('path');
var fs = require('fs');
var dir = './allure-results'

describe('Web Ecom', () => {
    beforeAll(async () => {
        writeData();
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log('tạo folder chứa ảnh thành công')
        }
        await emptyFolder(dir);
    });
    afterEach(async () => {
        await browser.reloadSession();
    });
    var prodNotPromotion = ['00033674']; //truyền mã sản phẩm muốn check
    for (let i = 0; i < dataExcel['CTKM tháng 10'].length; i++) {
        if (prodNotPromotion.indexOf(dataExcel['CTKM tháng 10'][i]['Mã SP']) >= 0) {
            it('check sản phẩm ' + dataExcel['CTKM tháng 10'][i]['Mã SP'], async () => {
                await HomePage.open('https://nhathuoclongchau.com/');
                await HomePage.searchMedicine(
                    dataExcel['CTKM tháng 10'][i]['Mã SP'],
                    dataExcel['CTKM tháng 10'][i]['Giá bán sau giảm'],
                    dataExcel['CTKM tháng 10'][i]['Giá bán']
                );
                await HomePage.pauseBrowser(2000);
                await ProductInfoPage.verifyDetailFinalPrice((dataExcel['CTKM tháng 10'][i]['Giá bán sau giảm']));//check giá bán sau giảm
                await ProductInfoPage.verifyPriceDefault(dataExcel['CTKM tháng 10'][i]['Giá bán']); //check giá bán gốc
                await ProductInfoPage.addToCart();
                await CartPage.verifyPriceInCartPage(dataExcel['CTKM tháng 10'][i]['Giá bán sau giảm'], dataExcel['CTKM tháng 10'][i]['Giá bán']);
            });
        }
    }
});
//xóa ảnh TC fail lần run trước
const emptyFolder = async (folderPath) => {
    try {
        // Find all files in the folder
        const files = await fsPromises.readdir(folderPath);
        for (const file of files) {
            await fsPromises.unlink(path.resolve(folderPath, file));
            console.log(`${folderPath}/${file} has been removed successfully`);
        }
    } catch (err) {
        console.log(err);
    }
}


