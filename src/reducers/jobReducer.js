import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJobData as fetchJobDataAPI } from "../api/api.js";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const initialState = {
  jobs: [],
  limit: 9,
  offset: 0,
  loading: false,
  error: null,
};

// CreateAsyncThunk returns a promise
export const fetchJobData = createAsyncThunk(
  "jobs/fetchJobData",
  async (params) => {
    return fetchJobDataAPI(params);
  }
);

const jobReducer = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobData.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobReducer.reducer;
