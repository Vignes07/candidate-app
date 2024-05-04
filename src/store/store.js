import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../reducers/jobReducer.js";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});

export default store;