import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import errorReducer from './error';
import loadingReducer from './loading';

const store = configureStore({
  reducer: { auth: authReducer, error: errorReducer, loading: loadingReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
