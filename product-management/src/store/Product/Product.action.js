import axiosInstance from "../../axiosInstance/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const allProduct = createAsyncThunk(
  "product",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const data = await axiosInstance("/api/product/getProducts", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async ({ name, description, price }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const data = await axiosInstance("/api/product/createProduct", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { name, description, price },
      });
      return data;
    } catch (error) {
      return rejectWithValue({message:"product name is already exits"});
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const data = await axiosInstance(`/api/product/deleteProduct/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }         
  }
);

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ id, editData}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const product = await axiosInstance(`/api/product/updateProduct/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: editData ,
      });

      return product;
    } catch (error) {
      return rejectWithValue({message:"product name is already exits"});
    }
  }
);

