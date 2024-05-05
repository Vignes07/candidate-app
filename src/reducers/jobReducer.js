import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  async ({ limit, offset, filters }) => {
    console.log("Filters:", filters); // Print the filters
    const body = JSON.stringify({
      limit: limit ? limit : initialState.limit,
      offset: offset ? offset : initialState.offset,
      filters: filters, // Include filters in the request body
    });
    console.log("Request Body:", body); // Print the request body

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    console.log("Response Status:", response.status); // Print the response status
    const result = await response.json();
    console.log("Response Data:", result); // Print the response data
    return result.jdList;
  }
);

const jobReducer = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
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

export const { updateLimit } = jobReducer.actions;

export default jobReducer.reducer;
