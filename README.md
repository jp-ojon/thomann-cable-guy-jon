# Playwright Test Suite for UI Automation Tests exercise for Thomann.de Web Application by Jon Paulo Ojon
## Overview
This test suite includes UI automated tests for existing functionalities in the Thomann.de Web Application. The tests are written using Playwright and cover various functionality on the site, including navigation, category selection, and product add to basket.

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

2. Change project root directory folder
- cd thomann-cable-guy-jon

2. Install the dependencies and playwright browsers
- npm install
- npx playwright install

* Libraries used
* Playwright
* dotenv

## Test Data
- test-data-file.json under test-data folder to be used for future test scenarios that need specific test data input.

## Running Tests
Use the following commands in any terminal or cmd line to run tests in different browsers:
1. npm run test:chromium    : run all UI tests for chromium browser only.
2. npm run test:firefox     : run all UI tests for firefox browser only.
3. npm run test:webkit      : run all UI tests for webkit browser only.
4. npm run test:all         : run all tests across all browsers configured under playwright.config.ts -> projects (Not recommended).

## Configuration
Configuration can be changed under playwright.config.ts
- headless                  : Set to `false` to run the browser with UI or `true` to run in headless mode.
- fullyParallel             : Set to `true` for running tests in parallel.
- timeout                   : Global timeout for all tests. Adjust based on your expected test duration.
- expect: timeout           : Timeout for expect() assertions.
- projects: use: viewport   : Set the screen size accordingly for your tests (e.g., `{ width: 1280, height: 720 }`).
- screenshot                : Choose when to capture screenshots ('on', 'off', or 'only-on-failure').
- video                     : Define when to record test videos. ('on', 'off', 'retain-on-failure', or 'on-first-retry').
- environments/currentEnv   : Adjust environments accordingly.

## Environment .env file
- .env file contains the main/home page URLs of each environment. (Local, Testing or Production). Configuration is currently set to default "production". Update accordingly.

## Reporting
Playwright supports multiple reporters for test results. Configuration can be changed under playwright.config.ts
- HTML Reporter: Generates an interactive test report.
- JSON Reporter: Outputs test results in JSON format for external processing or integration with other tools.
- To generate and view the HTML report after running tests:
- npx playwright show-report

## Recommendations
- **Note:** It is not recommended to use npx run test:all and run all tests across all browsers in parallel. Please run test for chromium, firefox and webkit separately to avoid flakiness, problems with shared authentication cookies, inconsistent browser behaviours, insufficient resources to support the run, etc.
- **Resource Management:** Consider running tests in individual browsers to manage resources effectively and reduce flakiness.
- **Debugging:** If encountering issues, review logs and screenshots to diagnose problems. Adjust test cases if needed to handle browser-specific behaviors. You can enable `headless: false` in the configuration file or set `DEBUG=pw:api` to see Playwright's internal actions during test execution.
- Example: DEBUG=pw:api npm run test:chromium

## Potential improvements given more time
1. Performance and Security Testing - Measure page load times, API performance, rate limiting and identify bottlenecks. Implement tests for common security vulnerabilities.
2. CI/CD Integration and Automation - Automate test runs on every code change using CI/CD tools like GitHub Actions
3. Browser compatiblity - Expand tests to cover additional browsers and versions for better cross-browser compatibility. Use different versions of the same browser.
4. Testing on real mobile devices (As needed) - Run tests on real mobile devices to ensure mobile-specific functionality

## Links to Documentation
- Playwright: https://playwright.dev/docs/intro
- Node.js: https://nodejs.org/en/