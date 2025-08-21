import { test as base, chromium, request as playwrightRequest } from "@playwright/test";
import { SignInPage } from "../pageobjects/signIn.page";
import { InventoryItemPage } from "../pageobjects/inventory.page";
import { ApiHelper } from "./fixtures.helper";
import { faker } from "@faker-js/faker";
import cluster from "cluster";

type MyFixtures = {
    signinPage: SignInPage,
    inventoryItemPage: InventoryItemPage,
    addToCardAction: () => Promise<void>;
};

type WorkerFixture = {
    createCluster: any
    apiHelper: ApiHelper,
}

export const test = base.extend<MyFixtures, WorkerFixture>({

    signinPage: async({ page }, use) => {
        await use(new SignInPage(page));
    },

    inventoryItemPage: async({ page }, use) => {
        await use(new InventoryItemPage(page));
    },

    apiHelper: [async({}, use) => {
        await use(new ApiHelper())
    }, { scope: "worker"}],

    createCluster: [
        async ({ apiHelper }, use) => {

        use(apiHelper.clusterName())
        }, { scope: "worker"}
    ],
});