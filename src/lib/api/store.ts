import { configureStore } from '@reduxjs/toolkit';
import { pdfApi } from './api';
import uiReducer from '../features/uiSlice';

export const store = configureStore({
  reducer: {
    [pdfApi.reducerPath]: pdfApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pdfApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
