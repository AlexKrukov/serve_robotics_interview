import { test, expect } from '@playwright/test';
import { Account } from '../../api/Account';
import favorites from '../../test-data/favorites.json';
import { Tokens } from '../../test-data/Tokens';
import { ExpectedMessages } from '../../test-data/ExpectedMessages';

test.describe('Account - Favorites API', () => {
  let account: Account;
  let accountId: number;

  test.beforeEach(async ({ request }) => {
    account = new Account(request);
    accountId = await account.getAccountId();
  });

  // -----------------------------------
  // 1. Add movie to favorites - positive case
  // -----------------------------------
  test('Add movie to favorites - Success', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.validMovieFavorite
    );
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.status_message).toBe(ExpectedMessages.favorites.success);
  });

  // -----------------------------------
  // 2. Duplicate add (update case)
  // -----------------------------------
  test('Add same movie again - updated successfully', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.validMovieFavorite
    );
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.status_message).toBe(
      ExpectedMessages.favorites.updated
    );
  });

  // -----------------------------------
  // 3. Remove movie from favorites - positive case
  // -----------------------------------
  test('Remove movie from favorites - Success', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.validMovieFavoriteRemove
    );
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.status_message).toBe(
      ExpectedMessages.favorites.deleted
    );
  });

  // -----------------------------------
  // 4. Resource not found - negative case
  // -----------------------------------
  test('Resource not found - 404 error', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.noResourceMovieFavorite
    );
    const body = await response.json();
    expect(response.status()).toBe(404);
    expect(body.status_message).toBe(
      ExpectedMessages.errors.resourceNotFound
    );
  });

  // -----------------------------------
  // 5. Add tv show to favorites - positive case
  // -----------------------------------
  test('Add tv show to favorites - Success', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.validTVFavorite
    );
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.status_message).toBe(ExpectedMessages.favorites.success);
  });

  // -----------------------------------
  // 6. Remove tv show from favorites - positive case
  // -----------------------------------
  test('Remove tv show from favorites - Success', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.validTVFavoriteRemove
    );
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.status_message).toBe(
      ExpectedMessages.favorites.deleted
    );
  });

  // -----------------------------------
  // 7. Missing media_id
  // -----------------------------------
  test('Missing media_id - 400 error', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.invalidMissingMediaId
    );
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.status_message).toBe(
      ExpectedMessages.errors.invalidParameters
    );
  });

  // -----------------------------------
  // 8. Missing media_type
  // -----------------------------------
  test('Missing media_type - 400 error', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.invalidMissingMediaType
    );
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.status_message).toBe(
      ExpectedMessages.errors.invalidParameters
    );
  });

  // -----------------------------------
  // 9. Missing favorite
  // -----------------------------------
  test('Missing favorite - 400 error', async () => {
    const response = await account.addFavorite(
      accountId,
      favorites.invalidMissingFavorite
    );
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.status_message).toBe(
      ExpectedMessages.errors.invalidParameters
    );
  });

  // -----------------------------------
  // 10. Missing request payload
  // -----------------------------------
  test('Missing request payload - 400 error', async () => {
    const response = await account.addFavorite(accountId, {}); // empty payload
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.status_message).toBe(
      ExpectedMessages.errors.invalidParameters
    );
  });
  
  // -----------------------------------
  // 11. No auth token
  // -----------------------------------
  test('No auth token - 401 error', async ({ request }) => {
    const accountNoAuth = new Account(request);
    const response = await accountNoAuth.addFavorite(
      accountId,
      favorites.validMovieFavorite,
      '' // empty token
    );
    const body = await response.json();
    expect(response.status()).toBe(401);
    expect(body.status_message).toBe(
      ExpectedMessages.errors.invalidApiKey
    );
  });

  // -----------------------------------
  // 12. Invalid token
  // -----------------------------------
  test('Invalid auth token - 401 error', async ({ request }) => {
    const accountInvalid = new Account(request);
    const response = await accountInvalid.addFavorite(
      accountId,
      favorites.validMovieFavorite,
      Tokens.invalidToken
    );
    const body = await response.json();
    expect(response.status()).toBe(401);
    expect(body.status_message).toBe(
      ExpectedMessages.errors.invalidApiKey
    );
  });
});