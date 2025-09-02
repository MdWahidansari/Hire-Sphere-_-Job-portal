import { createSlice } from "@reduxjs/toolkit";

// Slice for authentication state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false, // Indicates if an auth request is in progress
    user: null,     // Stores logged-in user info
    error: null,    // Stores auth-related errors
  },
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set the authenticated user
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Set an authentication error
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Logout the user
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

// Export actions to dispatch
export const { setLoading, setUser, setError, logout } = authSlice.actions;

// Export reducer to include in the store
export default authSlice.reducer;


