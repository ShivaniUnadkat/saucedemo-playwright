import {expect, Locator, Page} from '@playwright/test';
import { Header } from '../components/Header';

// Page Object for the SideMenu component
export class SideMenu {
    page: Page;
    header: Header; // Header component
    sideMenu: Locator; // Side menu button
    allItems: Locator; // "All Items" link in the side menu
    about: Locator  ; // "About" link in the side menu
    logOut: Locator; // "Log Out" link in the side menu
    resetAppState: Locator; // "Reset App State" link in the side menu
    closeMenu: Locator; // Close menu button


    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.sideMenu = page.locator('[data-test="open-menu"]'); // Side menu button
        this.allItems = page.locator('[data-test="inventory-sidebar-link"]'); // "All Items" link in the side menu
        this.about = page.locator('[data-test="about-sidebar-link"]');  // "About" link in the side menu
        this.logOut = page.locator('[data-test="logout-sidebar-link"]');  // "Log Out" link in the side menu 
        this.resetAppState = page.locator('[data-test="reset-sidebar-link"]');  // "Reset App State" link in the side menu
        this.closeMenu = page.locator('[data-test="close-menu"]'); // Close menu button
    }

    // Open the side menu
    async openMenu() {
        await this.sideMenu.click();
        await expect(this.allItems).toBeVisible();
        await expect(this.about).toBeVisible();
        await expect(this.logOut).toBeVisible();
        await expect(this.resetAppState).toBeVisible();

    }

    // Navigate to the "All Items" page via the side menu
    async navigateToAllItems() {
        await this.openMenu();
        await this.allItems.click();
        await expect(this.page).toHaveURL(/inventory\.html/);
    }

    // Navigate to the "About" page via the side menu
    async navigateToAbout() {
        await this.openMenu();
        await this.about.click();
        await expect(this.page).toHaveURL(/saucelabs\.com/);
        await expect(this.page).toHaveTitle(/Sauce Labs/i);
        await this.page.goBack(); // Navigate back to the previous page
    }

    // Log out via the side menu
    async logOutUser() {
        await this.openMenu();
        await this.logOut.click();
        await expect(this.page).toHaveURL(/index\.html/);
    }

    // Reset app state via the side menu and verify the state is reset (e.g., cart is empty)
    async resetAppStateFunc() {
        await this.openMenu();
        await this.resetAppState.click();
        await this.header.verifyCartBadge(0); // Verify cart badge shows 0 items after reset
    }

    // Close the side menu
    async closeMenuFunc() {
        await this.closeMenu.click();
        await expect(this.allItems).not.toBeVisible();
    }
}