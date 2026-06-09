// Expected messages for API test assertions

export const ExpectedMessages = {
  favorites: {
    success: 'Success.',
    updated: 'The item/record was updated successfully.',
    deleted: 'The item/record was deleted successfully.',
  },

  errors: {
    invalidParameters:
      'Invalid parameters: Your request parameters are incorrect.',
    invalidApiKey:
      'Invalid API key: You must be granted a valid key.',
    resourceNotFound:
      'The resource you requested could not be found.',
  },
} as const;