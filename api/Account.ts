import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Endpoints } from '../constants/Endpoints';
import { Tokens } from '../test-data/Tokens';

export class Account {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * GET /account/1
   * Returns accountId from response body
   */
  async getAccountId(): Promise<number> {
    const response = await this.request.get(
      Endpoints.Account.getAccount,
      {
        headers: {
          Authorization: `Bearer ${Tokens.validToken}`,
          Accept: 'application/json',
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    return body.id;
  }

  /**
   * POST /account/{accountId}/favorite
   * Supports optional token override for negative testing
   */
  async addFavorite(
    accountId: number,
    payload: object,
    token?: string
  ): Promise<APIResponse> {
    const response = await this.request.post(
      Endpoints.Account.addFavorite(accountId),
      {
        headers: {
          Authorization: `Bearer ${token ?? Tokens.validToken}`,
          'Content-Type': 'application/json',
        },
        data: payload,
      }
    );
    return response;
  }

  /**
   * GET /movie/movieId
   * Get the top level details of a movie by ID
   */
  async getMovieById(movieId: number | string): Promise<APIResponse> {
    const response = await this.request.get(
      Endpoints.Account.movies(movieId),
      {
        headers: {
          Authorization: `Bearer ${Tokens.validToken}`,
          Accept: 'application/json',
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    return response;
  }
}