import { Token } from '../models/token';

export const isTokenValid = (token: Token) => {
  return token.expiresAt > Date.now() && token.token;
};
