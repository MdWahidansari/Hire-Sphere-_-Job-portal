import { createSlice } from "@reduxjs/toolkit";

// Slice for managing job applicants
const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [], // Stores all applicants
  },
  reducers: {
    // Sets the list of all applicants
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

// Export the action to dispatch updates
export const { setAllApplicants } = applicationSlice.actions;

// Export the reducer to include in the store
export default applicationSlice.reducer;
