/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    async open (url) {
        await browser.url(url);
        await browser.maximizeWindow();
    }
    async pauseBrowser(time){
        await browser.pause(time);
    }
    async click(element){
        await element.waitForDisplayed({timeout : 20000});
        await element.click();
    }
}
