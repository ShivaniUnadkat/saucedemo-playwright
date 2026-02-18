# SauceDemo -- UI Functional Test Cases

**Project:** SauceDemo Playwright Automation\
**Environment:** https://www.saucedemo.com/

------------------------------------------------------------------------

## UI-01: Login Negative Scenarios

### Scenarios

-   Wrong username/password
-   Locked out user
-   Empty username
-   Empty password
-   Empty credentials

### Expected Result

Appropriate error message displayed and login denied.

------------------------------------------------------------------------

## UI-02: Inventory Sorting

### Scenarios

-   Name (A → Z)
-   Name (Z → A)
-   Price (Low → High)
-   Price (High → Low)

### Expected Result

Items displayed in correct order.

------------------------------------------------------------------------

## UI-03: Cart Functionality

### Scenarios

-   Add item → cart badge updates
-   Remove item → badge decreases
-   Remove all items → cart empty
-   Continue shopping returns to inventory

------------------------------------------------------------------------

## UI-04: Menu Functionality

### Scenarios

-   Open and close menu
-   Reset app state
-   Visit About page
-   Visit All Items
-   Logout

------------------------------------------------------------------------

## UI-05: Inventory Item Page

### Scenarios

-   Add item from detail page
-   Remove item from detail page
-   Verify cart badge update
-   Navigate back to inventory
