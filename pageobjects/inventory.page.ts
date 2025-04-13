import BasePage from "./base.page";

const itemName = 'div[class="inventory_item_name "]';

export class InventoryItemPage extends BasePage {
    constructor(page: BasePage["page"]){
        super(page)
    }

    getItemName(){
        return super.getElement(itemName).first();
    }
}