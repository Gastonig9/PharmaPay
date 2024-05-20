import { createSlice } from "@reduxjs/toolkit";

export const windowSlice = createSlice({
  name: "window",
  initialState: {
    openProductWindow: false,
    openCreateProductWindow: false,
    openCloseSalesWindow: false,
  },
  reducers: {
    setOpenProductWindow: (state) => {
      state.openProductWindow = true;
    },
    setCloseProductWindow: (state) => {
      state.openProductWindow = false;
    },
    setOpenCreateProductWindow: (state) => {
      state.openCreateProductWindow = true;
    },
    setCloseCreateProductWindow: (state) => {
      state.openCreateProductWindow = false;
    },
    setOpenSalesWindow: (state) => {
      state.openCloseSalesWindow = true;
    },
    setCloseSalesWindow: (state) => {
      state.openCloseSalesWindow = false;
    },
  },
});

export const {
  setOpenProductWindow,
  setCloseProductWindow,
  setOpenCreateProductWindow,
  setCloseCreateProductWindow,
  setOpenSalesWindow,
  setCloseSalesWindow,
} = windowSlice.actions;

export default windowSlice.reducer;
