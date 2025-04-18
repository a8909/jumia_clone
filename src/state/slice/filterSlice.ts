import { createSlice } from "@reduxjs/toolkit";
import { allProduct } from "../../interfaces/allCategories";

interface querySearch {
  query: string;
  productToSearch: allProduct[];
  isFiltered: boolean
}

const initialState: querySearch = {
  query: "",
  productToSearch: [],
  isFiltered: false
};
export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    filterProduct: (
      state,
      action: { payload: querySearch }
    ) => {
      if (action.payload.query === "") {
        state.productToSearch = action.payload.productToSearch;
        state.isFiltered = false;
        state.query = '';
      } else {
        state.query = action.payload.query;
        state.isFiltered = true;
        state.productToSearch = action.payload.productToSearch.filter((product) =>
          (product.title.toLowerCase().includes(state.query.toLowerCase()))
        );
      }
    },
  },
});


export const {filterProduct} = filterSlice.actions;
export default filterSlice.reducer;
