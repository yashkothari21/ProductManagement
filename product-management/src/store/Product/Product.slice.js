import { createSlice } from "@reduxjs/toolkit";
import { LoadingStateEnum } from "../../constants/redux";
import {
  allProduct,
  addProduct,
  deleteProduct,
  editProduct,
} from "./Product.action";

const initialState = {
  loading: false,
  productInfo: [],
  message: "",

  product: {},
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProduct.pending, (state) => {
        state.loading = LoadingStateEnum.PENDING;
      })
      .addCase(allProduct.fulfilled, (state, action) => {
        state.productInfo = action.payload.data.data;
        state.product = undefined;
        state.loading = LoadingStateEnum.SUCCEEDED;
      })
      .addCase(allProduct.rejected, (state, action) => {
        state.loading = LoadingStateEnum.FAILED;
        state.message = action.payload.message;
        state.productInfo = undefined;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = LoadingStateEnum.PENDING;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product = action.payload.data.data;
        state.message = "";
        state.loading = LoadingStateEnum.SUCCEEDED;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = LoadingStateEnum.FAILED;
        state.message = action.payload.message;
        state.product = undefined;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = LoadingStateEnum.PENDING;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = action.payload.data.data;
        state.loading = LoadingStateEnum.SUCCEEDED;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = LoadingStateEnum.FAILED;
        state.message = action.payload.message;
        state.product = undefined;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = LoadingStateEnum.PENDING;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.product = action.payload.data.data;
        state.message = "";
        state.loading = LoadingStateEnum.SUCCEEDED;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = LoadingStateEnum.FAILED;
        state.message = action.payload.message;
        state.product = undefined;
      });
  },
});

export default productSlice.reducer;
