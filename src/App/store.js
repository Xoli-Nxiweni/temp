import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../slices/listsSlice';
import authReducer from '../slices/authSlice';
import loadingReducer from '../slices/loadingSlice'

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    auth: authReducer,
    loading: loadingReducer, // Add the loading reducer here
  },
  // Default middleware includes thunk and serializableCheck
  // You don't need to add thunk manually, it's included by default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Adjust if needed
    }),
});
