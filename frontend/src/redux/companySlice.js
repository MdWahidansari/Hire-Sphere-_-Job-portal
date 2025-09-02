import { createSlice } from "@reduxjs/toolkit";

// Slice to manage company-related state
const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,        // Stores details of a single company
    companies: [],              // Stores a list of all companies
    searchCompanyByText: "",    // Stores text used to search/filter companies
  },
  reducers: {
    // Set details of a single company
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    // Set the list of all companies
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    // Set the search text for filtering companies
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

// Export actions to dispatch
export const { setSingleCompany, setCompanies, setSearchCompanyByText } =
  companySlice.actions;

// Export reducer to include in the Redux store
export default companySlice.reducer;
