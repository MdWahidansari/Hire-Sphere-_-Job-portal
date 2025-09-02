import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_PONT } from "@/utils/constant";

const useGetAllCompanies = () => {
  const dispatch = useDispatch(); // Initialize redux dispatch to update company state

  // Fetch all companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Try to get JWT token from cookies
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        // Make API request with token in Authorization header if available
        const res = await axios.get(`${COMPANY_API_END_PONT}/get`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true, // required if API uses cookies
        });

        // If successful, update redux store with companies
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error.response || error); // Log error for debugging
      }
    };

    fetchCompanies(); // Execute the function
  }, [dispatch]);
};

export default useGetAllCompanies; // Export custom hook
