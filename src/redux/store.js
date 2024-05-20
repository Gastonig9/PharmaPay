import { configureStore } from "@reduxjs/toolkit";
import windowReducer from "../features/windowSlice";
import productReducer from "../features/productSlice";

export default configureStore({
  reducer: {
    window: windowReducer,
    product: productReducer,
  },
});
