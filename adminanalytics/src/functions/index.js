export function authorizationTokenCreator(token) {
  return {
    'Authorization': `Bearer ${token}`,
  }
};