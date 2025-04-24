import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axisoInstance from "../helper/axiosInstance.js";

const initialState = {
  loading: false,
  status: false,
  feedbacks: [],
  editingFeedback: null,
};

export const getFeedbacks = createAsyncThunk("feedbacks", async () => {
  try {
    const response = await axisoInstance.get("/feedback");
    return response.data.data;
  } catch (error) {
    throw error;
  }
});
export const addFeedback = createAsyncThunk("addFeedback", async (data) => {
  try {
    const response = await axisoInstance.post("/feedback", data);
    console.log(response)
    return response.data.data;

  } catch (error) {
    throw error;
  }
});

export const updateFeedback = createAsyncThunk(
  "updateFeedback",
  async (data) => {
    try {
        console.log(data,"this is data");
      const response = await axisoInstance.put(`/feedback/${data.id}`, {updatedContent:data.updatedContent});
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setEditingFeedback: (state, action) => {
      state.editingFeedback = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedbacks.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.feedbacks = action.payload;
    });
    builder.addCase(addFeedback.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      // state.feedbacks.push(action.payload);
    });
    builder.addCase(updateFeedback.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.editingFeedback = null;
   
    
    });
  },
});
export const { setEditingFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
