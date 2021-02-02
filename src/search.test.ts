const chromedriver = require("chromedriver");
import { Builder, Capabilities, By, until } from "selenium-webdriver";

describe("search", () => {
    let driver;

    beforeAll(async () => {
        driver = new Builder()
            .withCapabilities(Capabilities.chrome())
            .build();
    }, 20000);

    afterAll(async () => {
        driver.quit();
    }, 20000);

    test("search title", async () => {
        // Go to url
        await driver.get("https://eartheasy.com/");

        // Find search element
        const searchIcon = await driver.findElement(By.className("icon-search"));
        
        // Click and wait on search element
        await searchIcon.click();
        
        // Find search input element
        const searchInput = await driver.findElement(By.name("search_query"));
        
        // Send keys "garden hose"
        await searchInput.sendKeys("Garden Hose");
        
        // Find the element for search button and Click on search button element
        const searchButton = await driver.findElement(By.className("button-search-submit"))
        await searchButton.click();
        
        // Wait on Search results page
        await driver.wait(until.urlIs("https://eartheasy.com/search.php?search_query=Garden+Hose"), 5000);

        // Find title "Search results for garden hose"
        const searchTitle = await (await driver.findElement(By.className("search-query"))).getText();

        // Test
        expect(searchTitle).toEqual("Search Results for \"Garden Hose\"");
    }, 20000);
});

