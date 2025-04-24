import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/axiosInstance.js";

const initialState = {
  loading: false,
  status: false,
  users: [],
  usersFeedback: [],
};

export const getUsers = createAsyncThunk("users", async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const getUserFeedback = createAsyncThunk("userFeedback", async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/users/${id}`);

    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const deleteFeedback = createAsyncThunk("deleteFeedback", async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const updateFeedback = createAsyncThunk("updateFeedback", async (data) => {
  try {
    const response = await axiosInstance.put(`/admin/${data.id}`, {updatedContent:data.updatedContent});
    return response.data.data;
  } catch (error) {
    throw error;
  }
}); 

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.users = action.payload;
    });
    builder.addCase(getUserFeedback.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.usersFeedback = action.payload;
    });
  },
});

export default adminSlice.reducer;
