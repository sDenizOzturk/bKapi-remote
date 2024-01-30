import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ErrorState {
  error?: string;
  errors: string[];
}

const initialState: ErrorState = {
  error: undefined,
  errors: [],
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setErrors(state, action: PayloadAction<string[]>) {
      state.errors = action.payload;
    },
    clearErrors(state) {
      state.error = undefined;
      state.errors = [];
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
