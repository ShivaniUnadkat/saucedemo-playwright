import {expect, Locator, Page} from '@playwright/test';
import { Header } from '../components/Header';

// Page Object for the Inventory (Products) Page
export class InventoryPage {
    page: Page;
    header: Header; // Header component
    inventoryItems: Locator; // All inventory item containers
    cartBadge: Locator; // Cart badge showing item count
    cartLink: Locator; // Cart link/button
    pageTitle: Locator; // Page title

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.pageTitle = page.locator('.title');
    }

    // Verify the inventory page is loaded
    async verifyInventoryPage() {
        await expect(this.page).toHaveURL(/inventory\.html/);
        await expect(this.pageTitle).toHaveText("Products");
    }

    // Get a specific inventory item by name
    getItem(itemName: string): Locator {
        return this.inventoryItems.filter({ has: this.page.locator('.inventory_item_name', { hasText: itemName }) });
    }

    // Add a specific item to the cart
    async addToCart(itemName: string) {
        const item = this.getItem(itemName);
        const addBtn = item.getByRole("button", { name: "Add To Cart" });
        await addBtn.isVisible();
        await addBtn.click();
        await expect(item.getByRole("button")).toHaveText("Remove");
    }
}