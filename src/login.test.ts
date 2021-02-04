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
    }, 30000);

    test("Log In", async () => {
        // Go to urlls
        await driver.get("https://eartheasy.com/");

        // Finds account element
        const accountIcon = await driver.findElement(By.className("icon-account"));
        
        // Clicks and wait on account element since there is a dropdown
        await accountIcon.click();

        // Find and click the LOGIN button from the dropdown
        const loginButton = await driver.findElement(By.css("div[class='customer-links customer-util'] a:nth-child(1)"), 20000);
        await loginButton.click();

        // Enters valid email from registered user
        const emailField = await driver.findElement(By.id("input-login_email"));
        await emailField.sendKeys("tester@mailinator.com");

        // Enters valid password from registered user
        const passwordField = await driver.findElement(By.id("password-login_pass"));
        await passwordField.sendKeys("5tester5");

        // Clicks the LOGIN button
        const logMeIn = await driver.findElement(By.xpath("//input[@value='Log In']"));
        await logMeIn.click();

        // Pauses driver for 3 seconds
        await driver.sleep(3000);

        // User is logged in with a default Orders page
        // Tests if user is in the Orders page of account
        const accountHeading = await (await driver.findElement(By.className("account-heading"))).getText();
        expect(accountHeading).toEqual("Orders");
        }, 30000);
    });