# Playwright Automation Framework (UI + API)

This repository contains a hybrid **Playwright automation framework** covering both **UI and API testing** using TypeScript.

It is designed with a scalable architecture including:
- Page Object Model (UI tests)
- API Client Layer (API tests)
- External test data management (JSON/TS files)
- Multi-project Playwright setup (UI + API separation)

---

# Test Coverage

## API Tests – Account Favorites

File:
```
tests/api-tests/account.spec.ts
```
### Covered scenarios:

✔ Add movie to favorites (success)  
✔ Add same movie again (update case)  
✔ Remove movie from favorites  
✔ Add TV show to favorites  
✔ Remove TV show from favorites  
✔ Missing `media_id` (400 error)  
✔ Missing `media_type` (400 error)  
✔ Missing `favorite` field (400 error)  
✔ Empty payload (400 error)  
✔ No auth token (401 error)  
✔ Invalid token (401 error)  
✔ Resource not found (404 error)

---

## UI Tests – Swag Labs Cart Flow

File:
```
tests/ui-tests/swag-labs.spec.ts
```
### Covered scenarios:

✔ Login with standard user  
✔ Sort products by price (low → high)  
✔ Add items to cart  
✔ Verify cart item count (products page)  
✔ Verify cart item count (cart page)  
✔ Remove item from cart  
✔ Validate cart updates dynamically  

---

# Test Results

<img width="987" height="248" alt="Screenshot 2026-06-09 at 3 25 50 PM" src="https://github.com/user-attachments/assets/4f9fedc5-dedf-4490-9fe2-bce8bfddc7a1" />

---

# Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Running Tests

## Run all tests

```bash
npx playwright test
```

---

## Run only UI tests

```bash
npx playwright test --project=ui-tests
```

---

## Run only API tests

```bash
npx playwright test --project=api-tests
```

---

## Run tests in headed mode

```bash
npx playwright test --headed
```

---

## Run specific file

```bash
npx playwright test tests/api-tests/account.spec.ts
```

---

## Run with debug mode

```bash
npx playwright test --debug
```

---

# Authentication Handling

API tests use Bearer token authentication

Tokens are stored in:

```
test-data/Tokens.ts
```
