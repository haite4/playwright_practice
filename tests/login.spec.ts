import { test } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";

test.describe("Verify login functionality", () => {

    test.beforeEach("Open page", async({ signinPage }) => {
        await signinPage.open();
    });

    test("Verify login on page", async({ signinPage, inventoryItemPage }) => {
        
        await test.step("Login", async() => {
            await signinPage.login(process.env.USER_NAME, process.env.PASSWORD);
        });

        await test.step("Verify item is visible", async() => {
            await expect(inventoryItemPage.getItemName()).toBeVisible();
        });
    });

    test("Verify login with incorrect data", async({ signinPage }) => {
        await test.step("Login", async() => {
            await signinPage.login(process.env.USER_NAME, process.env.INCORRECT_PASSWORD);
        });

        await test.step("Verify error message is displayed.", async() => {
            await expect(signinPage.getErrorMsg()).toHaveText("Epic sadface: Username and password do not match any user in this service");
        });
    });
});