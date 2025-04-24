import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/axiosInstance.js";

const initialState = {
    loading: false,
    status: false,
    users: [],
};

export const getUsers = createAsyncThunk("users", async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    return response.data.data;
  } catch (error) {
    throw error;    
  }
});

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.status = true;
            state.users = action.payload
        })
    }
})

export default adminSlice.reducer