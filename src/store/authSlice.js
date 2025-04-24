import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axisoInstance from "../helper/axiosInstance.js";
const initialState = {
    loading:false,
    status:false,
    userData:null
};

export const registerUser = createAsyncThunk("register",async(data)=>{
       try {
         const response  = await axisoInstance.post("user/register",data);
         return response.data.data
       } catch (error) {
        throw error
       }
})
export const loginUser = createAsyncThunk("login",async(data)=>{
  try {
    const response  = await axisoInstance.post("user/login",data);
    return response.data.data
  } catch (error) {
   throw error
  }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.status = true;
            state.userData = action.payload
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.status = true;
            state.userData = action.payload
        })
    }
})

export default authSlice.reducer