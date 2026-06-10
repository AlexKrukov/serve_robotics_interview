// Test endpoints for TMDB API

export const Endpoints = {
  Account: {
    getAccount: '/3/account/1',
    addFavorite: (accountId: number | string) => `/3/account/${accountId}/favorite`,
    movies: (movieId: number | string) => `/3/movie/${movieId}`,
  }
} as const;