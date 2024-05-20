
import { createSlice } from "@reduxjs/toolkit";

export const windowSlice = createSlice({
  name: "window",
  initialState: {
    openProductWindow: false,
    openCreateProductWindow: false,
  },
  reducers: {
    setOpenProductWindow: (state) => {
      console.log(state.openCreateProductWindow)
      state.openProductWindow = false;
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
  },
});

export const { setOpenProductWindow, setCloseProductWindow, setOpenCreateProductWindow, setCloseCreateProductWindow } = windowSlice.actions;

export default windowSlice.reducer;
