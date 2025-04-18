import { configureStore } from "@reduxjs/toolkit";
import  productReducer  from './slice/productSlice';
import  modalCloseReducer  from './slice/modalSlice';
import  filterReducer  from './slice/filterSlice';

export const store = configureStore({
  reducer: {
    productReducer,
    "dismissModal": modalCloseReducer,
    'filterSlice': filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;