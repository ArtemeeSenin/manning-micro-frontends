const TOKEN_KEY = 'bootstrap_auth_token'
let tokenValidationUrl = 'https://buildingmfe.maxgallo.io/api/validate';
export let isUserAuthenticated = false;

export function setToken(token: string): void {
  if (!token) { return; }
  window.localStorage.setItem(TOKEN_KEY, token);
  isUserAuthenticated = true;
}

export function disposeToken(): void {
  window.localStorage.removeItem(TOKEN_KEY)
  isUserAuthenticated = false;
}

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function validateToken(): Promise<boolean> {
  const token = getToken();
  if (!token) { return Promise.resolve(false); }

  return fetch(tokenValidationUrl, {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  }).then(() => {
    isUserAuthenticated = true;
    return isUserAuthenticated;
  }).catch(() => {
    isUserAuthenticated = false;
    return false;
  })
}
