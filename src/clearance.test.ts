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
    }, 30000);

    test("View Clearance Page", async () => {
        // Go site via url
        await driver.get("https://eartheasy.com/");
        
        // Finds the SHOP dropdown using mouse hover
        const actions = driver.actions({bridge: true}); 
        var elem=await driver.findElement(By.className("main-nav-item mega-nav")); 
        await actions.move({duration:5000,origin:elem,x:0,y:0}).perform();
         
        const saleButton = await driver.findElement(By.className("mega-first-tier-link Sale"), 8000);
        await saleButton.click();

        // Wait for the Sale Page
        await driver.wait(until.urlIs("https://eartheasy.com/sale/"), 8000);

        // Find the Clearnce Button
        const clearanceButton = await driver.findElement(By.xpath("////li[@class='facet-item']//a[normalize-space()='Clearance']"));
        await clearanceButton.click();

        // Find the section title of the page
        const clearancePage = await (await driver.findElement(By.className("section-title"))).getText();

        // Test
        expect(clearancePage).toEqual("Clearance");
    }, 20000);
    });