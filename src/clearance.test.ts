const chromedriver = require("chromedriver");
import { Builder, Capabilities, By, until } from "selenium-webdriver";

describe("search", () => {
    let driver;

    beforeAll(async () => {
        driver = new Builder()
            .withCapabilities(Capabilities.chrome())
            .build();
    }, 30000);

    afterAll(async () => {
        driver.quit();
    }, 40000);

    test("View Clearance Page", async () => {
        // Go site via url
        await driver.get("https://eartheasy.com/");
        
        // Finds the SHOP dropdown using mouse hover action
        const actions = driver.actions({bridge: true}); 
        var elem=await driver.findElement(By.className("main-nav-item mega-nav"), 8000); 
        await actions.move({duration:8000,origin:elem,x:0,y:0}).perform();
         
        // Clicks the SALE option from the 1st tier dropdown
        const saleButton = await driver.findElement(By.className("mega-first-tier-link Sale"), 8000);
        await saleButton.click();

        // Pauses driver for 4 seconds
        await driver.sleep(4000);

        // Clicks the Clearance option from 2nd tier dropdown
        const clearanceButton = await driver.findElement(By.xpath("//ul[@class='mega-secondary-tier navigation-children visible']//a[@class='mega-secondary-tier-link'][normalize-space()='Clearance']"), 8000);
        await clearanceButton.click();

        // Retrieves the test from the section title which is "Clearance"
        const clearancePage = await (await driver.findElement(By.className("section-title"))).getText();

        // Tests to match the page is "Clearance"
        expect(clearancePage).toEqual("Clearance");
    }, 30000);
    });