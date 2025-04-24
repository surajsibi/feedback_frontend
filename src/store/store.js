import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice.js";
import feedbackSliceReducer from "./feedbackSlice.js";
import adminSliceReducer from "./adminSlice.js";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        feedback: feedbackSliceReducer,
        admin: adminSliceReducer
    },
});

export  {store}