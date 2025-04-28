import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axisoInstance from "../helper/axiosInstance.js";
import toast from "react-hot-toast";
const initialState = {
    loading:false,
    status:false,
    userData:null,
    error:null
};

export const registerUser = createAsyncThunk("register",async(data,{rejectWithValue})=>{
       try {
         const response  = await axisoInstance.post("user/register",data);
         return response.data.data
       } catch (err) {
         console.log(err.response?.data?.error ,"this is errorrr")
        return rejectWithValue(err.response?.data?.error || "Something went wrong");
       }
})
export const loginUser = createAsyncThunk("login",async(data,{ rejectWithValue })=>{
  try {
    const response  = await axisoInstance.post("user/login",data);
    // console.log(response.data);
    return response.data.data
    
  } catch (err) {
    console.log(err.response?.data?.error ,"this is errorrr")
    return rejectWithValue(err.response?.data?.error || "Something went wrong");
  }
})
export const logoutUser = createAsyncThunk("logout",async({ rejectWithValue })=>{
  try {
    const response  = await axisoInstance.get("user/logout");
    console.log(response.data,"this is response");
    return response.data.data
    
  } catch (err) {
    console.log(err.response?.data?.error ,"this is errorrr")
    return rejectWithValue(err.response?.data?.error || "Something went wrong");
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
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.status = false;
            state.userData = null
            state.error = action.payload
            toast.error(`Error :${action.payload} `|| "Something went wrong")
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.status = true;
            state.userData = action.payload
            toast.success("User logged in successfully")
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.status = false;
            state.userData = null
            state.error = action.payload
            toast.error(`Error :${action.payload} `|| "Something went wrong")
        })
        builder.addCase(logoutUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.status = true;
            state.userData = null
            toast.success("User logged out successfully")
        })
        builder.addCase(logoutUser.rejected,(state,action)=>{
            state.loading = false;
            state.status = false;
            state.userData = null
            state.error = action.payload
            // toast.error(`Error :${action.payload} `|| "Something went wrong")
        })
    }
})

export default authSlice.reducer