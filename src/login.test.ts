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

    test("Log In", async () => {
        // Go to urlls
        await driver.get("https://eartheasy.com/");

        // Find account element
        const profileIcon = await driver.findElement(By.className("customer-links customer-util-search"));
        
        // Click and wait on search element
        await profileIcon.click();

        const loginButton = await driver.findElement(By.xpath("div[class='customer-links customer-util'] a:nth-child(1)"));
        await loginButton.click();

        const emailField = await driver.findElement(By.id("input-login_email"));
        await emailField.sendKeys("tester@mailinator.com");

        const passwordField = await driver.findElement(By.id("password-login_pass"));
        await passwordField.sendKeys("5tester5");

        const logMeIn = await driver.findElement(By.xpath("//input[@value='Log In']"));
        await logMeIn.click();

        const accountHeading = await (await driver.findElement(By.className("account-heading"))).getText();
        expect(accountHeading).toEqual("Orders");
        }, 3000);
    });