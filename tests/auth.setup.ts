import { test as setup } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ signinPage }) => {
    await signinPage.open();
    await signinPage.login(process.env.USER_NAME, process.env.PASSWORD);

    await expect(signinPage.page.locator('div[class="app_logo"]')).toHaveText("Swag Labs");
    
    await signinPage.page.context().storageState({ path: authFile });
});