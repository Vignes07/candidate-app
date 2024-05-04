import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")

const body = JSON.stringify({
    "limit": 10,
    "offset": 0
})

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
}

export const fetchJobData = createAsyncThunk(
    'jobs/fetchJobData',
    async () => {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const result = await response.json();
        return result.jdList;
    }
);


const initialState = {
    jobs: [],
    loading: false,
    error: null
};

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
})
;

export default jobReducer.reducer;
