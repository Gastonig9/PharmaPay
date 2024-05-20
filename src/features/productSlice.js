import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productToSell: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductToSell: (state, action) => {
      state.productToSell = action.payload;
    },
    addProductToSell: (state, action) => {
      const product = action.payload;
      const verify = state.productToSell.some((pS) => pS.id_producto === product.id_producto);
      if (!verify) {
        state.productToSell.push(product);
      }
    },
  },
});

export const { setProducts, setProductToSell, addProductToSell } = productSlice.actions;

export default productSlice.reducer;
