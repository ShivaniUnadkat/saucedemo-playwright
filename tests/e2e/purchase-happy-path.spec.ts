import { test } from "@playwright/test";
import { getUser } from "../../utils/testData";
import { POManager } from "../../pages/POManager";

// E2E Test: Purchase Happy Path (Single Item)
// This test covers the full purchase flow for a single item from login to order completion.

test("E2E-01: Purchase Happy Path (Single Item)", async ({page}) => {
    // Test data setup
    const user = getUser("standard_user"); // Get standard user credentials
    const itemName = "Sauce Labs Backpack"; // Item to purchase
    const firstName = "John";
    const lastName = "Doe";
    const zipCode = "12345";

    // Page object instantiation using POManager
    const poManager = new POManager(page);
    const { loginPage, inventoryPage, cartPage, checkoutPage1, checkoutPage2, checkoutCompletePage } = poManager;

    // Step 1: Login
    await loginPage.goto(); // Navigate to login page
    await loginPage.login(user.username, user.password); // Perform login
    await loginPage.assertOnInventoryPage(); // Assert successful login

    // Step 2: Add item to cart
    await inventoryPage.verifyInventoryPage(); // Verify inventory page loaded
    await inventoryPage.addToCart(itemName); // Add item to cart
    await inventoryPage.header.verifyCartBadge(1); // Verify cart badge shows 1 item
    await inventoryPage.header.openCart(); // Go to cart

    // Step 3: Cart verification
    await cartPage.verifyCartPage(); // Verify cart page loaded
    await cartPage.verifyCartItem(itemName); // Verify correct item in cart
    await cartPage.openCheckOut(); // Proceed to checkout

    // Step 4: Checkout Step 1 - Enter user info
    await checkoutPage1.verifyCheckoutPageTitle(); // Verify checkout page title
    await checkoutPage1.enterCheckoutDetails(firstName, lastName, zipCode); // Enter user details
    await checkoutPage1.clickContinueButton(); // Continue to next step

    // Step 5: Checkout Step 2 - Review and finish
    await checkoutPage2.verifyCheckoutStepTwoPage(); // Verify step two page
    await checkoutPage2.verifyCartItems(); // Verify cart items
    await checkoutPage2.verifyPaymentInformation(); // Verify payment info
    await checkoutPage2.verifyShippingInformation(); // Verify shipping info
    await checkoutPage2.verifyPricing(); // Verify pricing details
    await checkoutPage2.clickFinishButton(); // Complete the purchase

    // Step 6: Order completion
    await checkoutCompletePage.verifyCheckoutCompletePage(); // Verify order complete page
    await checkoutCompletePage.verifyThankYouMessage(); // Verify thank you message
    await checkoutCompletePage.verifyOrderConfirmationText(); // Verify order confirmation
    await checkoutCompletePage.clickBackHomeButton(); // Return to home
});