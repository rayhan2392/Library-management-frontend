import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from './api/bookApi';
import { borrowBookApi } from './api/borrowBookApi';

// Create the store
export const store = configureStore({
  reducer: {
    // Add both API reducers
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowBookApi.reducerPath]: borrowBookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      borrowBookApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
