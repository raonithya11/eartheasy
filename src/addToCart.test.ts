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
    }, 40000);

    test("Add Product to Cart", async () => {
        // Go to urlls
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
        await driver.sleep(2000);

        // Find the the product "Premium Drinking Water Safe Garden Hose"
        const firstProduct = await driver.findElement(By.xpath("//a[@alt='Premium Drinking Water Safe Garden Hose']"), 2000);
        await firstProduct.click()

        // Selecting size option
        const sizeType = await driver.findElement(By.id("attribute-7367"), 2000);
        await sizeType.click();

        // Selecting color option
        const colorType = await driver.findElement(By.name("attribute[3405]"));
        await colorType.click();

        // Adding to Cart
        const addToCart = await driver.findElement(By.className("button button-primary button-wide add-to-cart button-progress spinner"), 5000);
        await addToCart.click();

        // Driver sleeps for 3 seconds
        await driver.sleep(3000);

        //Finds the cart icon and clicks it
        const cartIcon = await driver.findElement(By.xpath("//button[@class='top-bar-button button-cart-toggle dropdown-toggle']"), 10000);
        await cartIcon.click();

        // Waits for 5 seconds until the dropdown mini-cart displays
        await driver.sleep(5000);
        await driver.wait(until.elementLocated(By.className("mini-cart-inner")), 5000);
        
        // Selects View Cart button in mini-cart
        const viewCart = await driver.findElement(By.xpath("//div[@class='mini-cart-actions']//a[@class='button']"));
        await viewCart.click();

        // Driver waits till url is shown
        await driver.wait(until.urlIs("https://eartheasy.com/cart.php"));

        // Finds the product name and gets the text for it: "Garden Hose"
        const productAdded = await (await driver.findElement(By.className("product-name"))).getText();
        
        // Verifies product is added to the page by matching product name
        await driver.sleep(2000);
        expect(productAdded).toContain("Garden Hose");
    }, 40000);
});
