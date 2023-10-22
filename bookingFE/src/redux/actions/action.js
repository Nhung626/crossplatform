export const setToken = (token, expirationTime) => ({
    type: 'SET_TOKEN',
    payload: { token, expirationTime },
  });