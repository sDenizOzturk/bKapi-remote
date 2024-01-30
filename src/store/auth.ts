import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../models/token';

interface Requestedtoken {
  token: string;
  expiresIn: string;
}
const emptyToken: Token = {
  token: '',
  expiresAt: Date.now(),
};

export interface AuthState {
  token: Token;
}

const initialState: AuthState = {
  token: JSON.parse(
    localStorage.getItem('token') || JSON.stringify(emptyToken)
  ),
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Requestedtoken>) {
      const tokenString = action.payload.token;
      let expiresIn = action.payload.expiresIn;
      expiresIn = expiresIn.slice(0, expiresIn.length - 1);
      const expiresAt = Date.now() + +expiresIn * 24 * 60 * 60 * 1000;

      const token: Token = {
        token: tokenString,
        expiresAt,
      };

      state.token = token;
      localStorage.setItem('token', JSON.stringify(token));
    },
    logout(state) {
      state.token = emptyToken;
      localStorage.removeItem('token');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
