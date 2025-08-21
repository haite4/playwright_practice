import BasePage from "./base.page";

const itemName = 'div[class="inventory_item_name "]';
const addToCardBtn = 'button[data-test="add-to-cart-sauce-labs-backpack"]';

export class InventoryItemPage extends BasePage {
    constructor(page: BasePage["page"]){
        super(page)
    }

    getItemName(){
        return super.getElement(itemName).first();
    }

    async clickAddToCardBtn(){
        await super.clickElement(addToCardBtn);
    }
}