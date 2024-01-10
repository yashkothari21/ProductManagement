import axiosInstance from "../../axiosInstance/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await axiosInstance.post(`/api/user/login`, {
        email,
        password,
      });
      if (data) {
        localStorage.setItem("token", data.data.data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue({message:"invalid username and password"});
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const user = await axiosInstance(`/api/user/createUser`, {
        method: "post",
        data: data,
      });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
   async () =>{
    localStorage.clear();
    return;
   }
)
