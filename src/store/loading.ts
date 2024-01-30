import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
