import { createSlice } from "@reduxjs/toolkit";
import { allProduct } from "../../interfaces/allCategories";

interface productReducer {
  product: allProduct[];
}
const initialState: productReducer = {
  product: [],
};
const productSlice = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    productAdd: (state, action: { payload: allProduct }) => {
      state.product.push(action.payload);
      state.product = [...state.product];
    },
    productDelete: (state, action: { payload: number }) => {
      state.product = state.product.filter(
        (cart) => cart.id !== action.payload
      );
    },
    setProduct: (state, action: { payload: allProduct[] }) => {
      state.product = [...action.payload];
    },
  },
});

export const { productAdd, productDelete, setProduct } = productSlice.actions;
export default productSlice.reducer;
