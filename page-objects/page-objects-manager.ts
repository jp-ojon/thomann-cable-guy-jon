import {Page} from '@playwright/test'
import {MainPage} from './main-page'
import {CablesAndPlugsPage} from './cables-and-connectors/cables-and-plugs-page'
import {CableguyPage} from './cables-and-connectors/cableguy-page'
import {GeneralProductPage} from './products/general-product-page'
import {ShoppingBasketPage} from './shopping-basket/shopping-basket-page'

export class PageObjectsManager{
    page: Page;
    mainPage: MainPage;
    cablesAndPlugsPage: CablesAndPlugsPage;
    cableguyPage: CableguyPage;
    generalProductPage: GeneralProductPage;
    shoppingBasketPage: ShoppingBasketPage;

    constructor(page: Page){
        this.page = page;
        this.mainPage = new MainPage(page);
        this.cablesAndPlugsPage = new CablesAndPlugsPage(page);
        this.cableguyPage = new CableguyPage(page);
        this.generalProductPage = new GeneralProductPage(page);
        this.shoppingBasketPage = new ShoppingBasketPage(page);
    }
}