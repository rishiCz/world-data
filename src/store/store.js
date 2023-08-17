import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import countryReducer from './slices/countrySlice';
import chartReducer from './slices/chartSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    chart: chartReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
