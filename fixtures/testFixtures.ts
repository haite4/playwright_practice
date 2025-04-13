import { test as base } from "@playwright/test";
import { SignInPage } from "../pageobjects/signIn.page";
import { InventoryItemPage } from "../pageobjects/inventory.page";

type MyFixtures = {
    signinPage: SignInPage,
    inventoryItemPage: InventoryItemPage
};

export const test = base.extend<MyFixtures>({
    signinPage: async({ page }, use) => {
        await use(new SignInPage(page));
    },

    inventoryItemPage: async({ page }, use) => {
        await use(new InventoryItemPage(page));
    },
});