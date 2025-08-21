import { test } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";
import { readFileSync } from "fs";
import path from "path";

test.describe("Verify login functionality", () => {

    test.beforeEach("Open page", async({ signinPage }) => {
        await signinPage.open("https://www.saucedemo.com/inventory.html");
    });

    test.only("#0 Verify login on page", async({ inventoryItemPage }) => {

        await test.step("Verify item is visible", async() => {
            
            await inventoryItemPage.page.waitForTimeout(3000);
            await inventoryItemPage.clickAddToCardBtn();
        });
    });

    test.only("#1 Verify login on page", async({ inventoryItemPage }) => {

        await test.step("Verify item is visible", async() => {
            await expect(inventoryItemPage.getItemName()).toBeVisible();
            await inventoryItemPage.page.waitForTimeout(2000);
            await inventoryItemPage.clickAddToCardBtn();
        });
    });

    test.only("#2 Verify login on page", async({ inventoryItemPage }) => {

        await test.step("Verify item is visible", async() => {
            await expect(inventoryItemPage.getItemName()).toBeVisible();
            await inventoryItemPage.page.waitForTimeout(2000);
            await inventoryItemPage.clickAddToCardBtn();
        });
    });

    // test.only("Verify login with incorrect data", async({ inventoryItemPage }) => {
        
    //     await test.step("Verify error message is displayed.", async() => {
    //         await expect(inventoryItemPage.getItemName()).toBeVisible();

    //     });
    // });

    test.skip("Verify login with parsed data", async({ signinPage }) => {

        const file = readFileSync(path.resolve("data", "JupyterHubServer 2.txt"), { encoding: "utf-8"});

        const machineNameValue = file.match(/Machine name:\s*(.+)/)
        const usernameValue = file.match(/Username:\s*(.*)/)
        const passwordValue = file.match(/Password:\s*(.*)/)

        console.log(machineNameValue[1]);
        console.log(usernameValue[1]);
        console.log(passwordValue[1]);

        await test.step("Login", async() => {
            await signinPage.login(process.env.USER_NAME, process.env.INCORRECT_PASSWORD);
        });
    });
});