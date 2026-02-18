import {expect, Locator, Page} from '@playwright/test'

// Page Object for the Login Page
export class LoginPage {
    page: Page;
    username: Locator; // Username input field
    password: Locator; // Password input field
    loginbtn: Locator; // Login button
    errorMessage: Locator; // Error message for incorrect login

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginbtn = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Navigate to the login page
    async goto() {
        await this.page.goto("/");
    }

    // Perform login with provided credentials
    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbtn.click();
    }

    // Assert that the user is on the inventory page after login
    async assertOnInventoryPage() {
        await expect(this.page).toHaveURL(/inventory\.html/);
    }

    // Assert that the error message is visible and contains expected text
    async assertLoginError(expectedText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedText);
    }
}