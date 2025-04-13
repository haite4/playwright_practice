import BasePage from "./base.page";

const userNameInput = 'input[name="user-name"]';
const passwordInput = 'input[name="password"]';
const submitBtn = 'input[name="login-button"]';
const errorMsg = 'form div[class*="error-message-container"]';

export class SignInPage extends BasePage {
    constructor(page: BasePage["page"]){
        super(page);
    }

    getErrorMsg(){
        return super.getElement(errorMsg);
    }

    async login(username: string, password: string){
        await super.fillElement(userNameInput, username);
        await super.fillElement(passwordInput, password);
        await super.clickElement(submitBtn);
    }
}