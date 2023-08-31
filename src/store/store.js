import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import countryReducer from './slices/countrySlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
