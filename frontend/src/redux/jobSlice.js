import { createSlice } from "@reduxjs/toolkit";

// Slice to manage job-related state
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],           // Stores all available jobs
    allAdminJobs: [],      // Stores jobs accessible/administered by admin
    singleJob: null,       // Stores details of a single job
    searchJobByText: "",   // Stores search/filter text for jobs
    allAppliedJobs: [],    // Stores all jobs applied by the user
    searchedQuery: "",     // Stores the last searched query text
  },
  reducers: {
    // Set all jobs
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    // Set single job details
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    // Set all admin jobs
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    // Set the search/filter text for jobs
    setsearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    // Set all applied jobs
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    // Set the last searched query
    setSearchedhQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

// Export actions to dispatch in components
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setsearchJobByText,
  setAllAppliedJobs,
  setSearchedhQuery,
} = jobSlice.actions;

// Export reducer to include in Redux store
export default jobSlice.reducer;
