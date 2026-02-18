# SauceDemo -- End-to-End (E2E) Test Cases

**Project:** SauceDemo Playwright Automation\
**Environment:** https://www.saucedemo.com/

------------------------------------------------------------------------

## E2E-01: Purchase Happy Path (Single Item)

**Priority:** High\
**Type:** Smoke / E2E

### Test Data

-   Username: standard_user
-   Password: secret_sauce
-   Item: Sauce Labs Backpack
-   First Name: Test
-   Last Name: User
-   Zip: 2000

### Steps

1.  Login with valid credentials.
2.  Verify inventory page loads.
3.  Add Backpack to cart.
4.  Open cart and verify item.
5.  Proceed to checkout.
6.  Enter customer information.
7.  Continue and verify overview.
8.  Click Finish.

### Expected Result

Order confirmation page is displayed with message: "Thank you for your
order!"

------------------------------------------------------------------------

## E2E-02: Purchase Two Items and Remove One

**Priority:** High\
**Type:** E2E

### Steps

1.  Login.
2.  Add Backpack and Bike Light to cart.
3.  Verify cart badge shows 2.
4.  Remove Bike Light.
5.  Verify cart badge updates to 1.
6.  Proceed to checkout.
7.  Complete purchase.

### Expected Result

Only remaining item is purchased successfully.

------------------------------------------------------------------------

## E2E-03: Checkout Validation (Mandatory Fields)

**Priority:** High\
**Type:** E2E (Negative + Positive)

### Steps

1.  Login.
2.  Add item to cart.
3.  Click Checkout.
4.  Leave fields empty and click Continue.

### Expected Result

Validation error displayed for missing required fields.

5.  Fill all required fields.
6.  Complete checkout.

Final Expected Result: Order confirmation displayed.

------------------------------------------------------------------------

## E2E-04: Sort Low-to-High and Purchase Cheapest Item

**Priority:** Medium\
**Type:** E2E

### Steps

1.  Login.
2.  Select "Price (Low to High)".
3.  Verify prices are sorted ascending.
4.  Add cheapest item to cart.
5.  Complete checkout.

### Expected Result

Correct sorting and successful purchase.

------------------------------------------------------------------------

## E2E-05: Logout and Access Control

**Priority:** High\
**Type:** E2E / Security

### Steps

1.  Login.
2.  Logout from menu.
3.  Verify redirect to login page.
4.  Attempt direct access to inventory page.

### Expected Result

Access denied without login.
