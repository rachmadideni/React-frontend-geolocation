import { SET_AUTH_TOKEN_ACTION } from './constants';
export function setAuthTokenAction(token) {
  return {
    type: SET_AUTH_TOKEN_ACTION,
    payload: token,
  };
}
