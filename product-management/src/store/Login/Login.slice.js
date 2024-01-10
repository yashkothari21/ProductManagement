import { createSlice } from "@reduxjs/toolkit";
import { LoadingStateEnum } from "../../constants/redux";
import { loginUser, registerUser, logoutUser } from "./Login.action";

const initialState = {
  loading: false,
  userInfo: null,
  message: "",
  role: "",
  newUser:null,
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = LoadingStateEnum.PENDING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.data.data;
        state.role = action.payload.data.data.role;
        state.message ="";
        state.loading = LoadingStateEnum.SUCCEEDED;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = LoadingStateEnum.FAILED;
        state.message = action.payload.message;
        state.userInfo = undefined;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = LoadingStateEnum.PENDING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.newUser = action.payload.data.data;
        state.role = action.payload.data.data.role;
        state.loading = LoadingStateEnum.SUCCEEDED;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = LoadingStateEnum.FAILED;
        state.message = action.payload.message;
        state.newUser = undefined;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = LoadingStateEnum.PENDING;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userInfo = null;
        state.role = "";
        state.message = "";
        state.newUser=null;
        state.loading = LoadingStateEnum.SUCCEEDED;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = LoadingStateEnum.FAILED;
        state.message = action.payload.message;
        state.userInfo = undefined;
      });
  },
});

export default loginSlice.reducer;
