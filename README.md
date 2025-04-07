# Playwright Test Suite for UI Automation Tests exercise for Thomann.de Web Application by Jon Paulo Ojon
## Overview
This test suite includes UI automated tests for existing functionalities in the Thomann.de Web Application.

## Objective
Project contains a test scenario using Playwright that navigates through the www.thomann.de website, selecting random categories, sub-categories, and products.

## Getting started
This is a NodeJS-based project. In order to run it, you'll need following tools installed:

- NodeJS (latest LTS version recommended)
- Git
- An IDE of your choice (Recommendation: VSCode)

## Author
Jon Paulo Ojon

## Prerequisites
* Node.js (v14 or later), find installer on https://nodejs.org/en/download/package-manager site
* Playwright

## Installation
1. Clone the repository and go to project directory
- git clone https://github.com/jp-ojon/thomann-cable-guy-jon.git
- change root directory folder

2. Install the dependencies:
- npm install
- npx playwright install

* Libraries used
* Playwright
* dotenv

## Test Data
- Please update the following files accordingly.
- .env file under root folder, provide a valid email address and password that is already existing.
- test-data-file.json under test-data folder, update this for the cart-and-checkout tests
- test-data-file2.json under test-data folder, update this for the product-searching-and-filtering tests

## Running Tests
Use the following commands in any terminal or cmd line to run tests in different browsers:
1. npm run test:chromium    : run all UI tests for chromium browser only, set to serial and will run 1 by 1 because of login cookies.
2. npm run test:firefox     : run all UI tests for firefox browser only, set to serial and will run 1 by 1 because of login cookies.
3. npm run test:webkit      : run all UI tests for webkit browser only, set to serial and will run 1 by 1 because of login cookies.
4. npm run test:all         : run all tests across all browsers configured under playwright.config.ts -> projects (Not recommended)

## Test Coverage
1. User Authentication & Account Management
- Login & Logout    - only login included
- Registration      - TBA
- Password Reset    - TBA

2. Product Page, Search & Filtering
- Search Functionality  - included
- Advanced Search       - TBA
- Filters & Sorting     - TBA
- Product Details       - TBA
- Stock Availability    - TBA

3. Shopping Cart & Checkout
- Add to, view and update cart  - only add and view cart test added
- Checkout Flow                 - TBA
- Guest Checkout                - TBA
- Coupon Codes & Discounts      - TBA
- Different Payment Methods     - TBA
- Stored Payment Methods        - TBA
- Email Notifications           - TBA

4. Order Management
- Order History         - TBA
- View Order            - TBA
- Reorder               - TBA
- Downloadable Products - TBA
- Wish List             - TBA
- Orders and Returns    - TBA

5. Miscellaneous
- Privacy and Cookie Policy
- Write Us
- What's New

6. Performance Testing
- Load, Stress, Recovery testing, etc   - TBA
- Mobile Device Responsiveness          - TBA
- API Performance                       - TBA
- Rate Limiting and Scalability         - TBA

7. Security Testing

8. Localization & Globalization Testing:

## Configuration
Configuration can be changed under playwright.config.ts
- headless                  : can either be true or false, false means browser would show up when tests are run
- fullyParallel             : can either be true or false
- timeout                   : Global timeout for all tests
- expect: timeout           : Timeout for expect() assertions
- projects: use: viewport   : Screen size, adjust accordingly
- screenshot                : Choose when to capture screenshots ('on', 'off', or 'only-on-failure')
- video                     : Define when to record test videos. ('on', 'off', 'retain-on-failure', or 'on-first-retry')

## Reporting
Playwright supports multiple reporters for test results. Configuration can be changed under playwright.config.ts
- HTML Reporter: Generates an interactive test report.
- JSON Reporter: Outputs test results in JSON format for external processing.
- To generate and view the HTML report after running tests:
- npx playwright show-report

## Environment .env file
- A .env.example file is provided as guide for what is needed for the tests to run, create a .env file and copy the contents from the .env.example file and then update accordingly.

## Recommendations
- **Note:** It is not recommended to use npx run test:all and run all tests across all browsers in parallel. Please run test for chromium, firefox and webkit separately to avoid flakiness, problems with shared authentication cookies, inconsistent browser behaviours, insufficient resources to support the run, etc.
- **Resource Management:** Consider running tests in individual browsers to manage resources effectively and reduce flakiness.
- **Debugging:** If encountering issues, review logs and screenshots to diagnose problems. Adjust test cases if needed to handle browser-specific behaviors.

## Potential improvements given more time
1. Performance and Security Testing
2. CI/CD Integration and Automation
3. More Browser compatiblity, use different versions of same browser
4. Testing on real mobile devices (As needed)

## Links to Documentation
- Playwright: https://playwright.dev/docs/intro