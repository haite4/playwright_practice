import { test } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";
import { readFileSync } from "fs";
import path from "path";

test.describe("Verify login functionality", () => {

    test.beforeEach("Open page", async({ signinPage }) => {
        await signinPage.open();
    });

    test.only("Verify login on page", async({ signinPage, inventoryItemPage }) => {
        
        await test.step("Login", async() => {
            await signinPage.login(process.env.USER_NAME, process.env.PASSWORD);
        });

        await test.step("Verify item is visible", async() => {
            await expect(inventoryItemPage.getItemName()).toBeVisible();
        });
    });

    test.only("Verify login with incorrect data", async({ signinPage }) => {
        await test.step("Login", async() => {
            await signinPage.login(process.env.USER_NAME, process.env.INCORRECT_PASSWORD);
        });

        await test.step("Verify error message is displayed.", async() => {
            await expect(signinPage.getErrorMsg()).toHaveText("Epic sadface: Username and password do not match any user in this service");
        });
    });

    test("Verify login with parsed data", async({ signinPage }) => {

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