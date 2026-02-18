// POManager.ts
// Centralized Page Object Manager for Playwright tests

import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckOutPage1 } from "../pages/CheckOutPage1";
import { CheckOutPage2 } from "../pages/CheckOutPage2";
import { CheckOutComplete } from "../pages/CheckOutComplete";

export class POManager {
    readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;
    readonly cartPage: CartPage;
    readonly checkoutPage1: CheckOutPage1;
    readonly checkoutPage2: CheckOutPage2;
    readonly checkoutCompletePage: CheckOutComplete;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage1 = new CheckOutPage1(page);
        this.checkoutPage2 = new CheckOutPage2(page);
        this.checkoutCompletePage = new CheckOutComplete(page);
    }
}
