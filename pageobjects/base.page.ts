import { Page as PlaywrightPage } from "@playwright/test";

export default class BasePage {
    public page: PlaywrightPage
    
    constructor(page: PlaywrightPage){
        this.page = page
    }

    async open(url?: string){
        await this.page.goto(url ? `${url}` : "/")
    }

    protected getElement(selector: string, options?: { subSelector?: string; index?: number }) {
        let element = this.page.locator(selector);

        if (options?.subSelector) {
          element = element.locator(options.subSelector);
        }
    
        if (options?.index !== undefined) {
          element = element.nth(options.index);
        }
        return element;
      }
    
    protected async getElementAttribute(selector: string, attr: string, options?: { index?: number }) {
        let element = this.getElement(selector);
        if (options?.index !== undefined) {
            element = element.nth(options.index);
        }
        return element.getAttribute(attr);
    }

    protected async clickElement(selector: string, options?: { clickCount?: number; index?: number; subSelector?: string, timeout? : number }) {
        let element = this.getElement(selector, {index: options?.index, subSelector: options?.subSelector});
        await element.click({ clickCount: options?.clickCount || 1, timeout: options?.timeout});
    }

    protected async hoverElement(selector: string, timeout?: number) {
        await this.getElement(selector).hover({ timeout });
    }

    protected async getElementTextContent(selector: string) {
        return this.getElement(selector).textContent();
    }

    protected async getElementInputValue(selector: string) {
        return this.getElement(selector).inputValue();
    }

    protected async getElementBoundingBox(selector: string, options?: { index?: number }) {
        let element = this.getElement(selector, { index: options?.index });
        return element.boundingBox();
    }

    protected async scrollIntoViewElement(selector: string) {
        let element = this.getElement(selector);
        await element.scrollIntoViewIfNeeded();
    }

    protected async fillElement(selector: string, text: string){
        let element = this.getElement(selector);
        await element.fill(text)
    }

    protected async clearElementValue(selector: string){
        let element = this.getElement(selector);
        await element.clear()
    }
}