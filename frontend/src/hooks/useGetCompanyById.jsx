import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_PONT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch(); // Initialize redux dispatch to update company state

  // Fetch single company whenever companyId changes
  useEffect(() => {
    if (!companyId) return; // Exit early if no companyId is provided

    const fetchSingleCompany = async () => {
      try {
        // Call API to get company details by ID
        const res = await axios.get(
          `${COMPANY_API_END_PONT}/get/${companyId}`,
          {
            withCredentials: true, // Include cookies if needed
          }
        );

        console.log("Fetched company:", res.data.company); // Debug fetched data

        // Update redux store if API call is successful
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error fetching company:", error); // Log any errors
      }
    };

    fetchSingleCompany(); // Execute the API call
  }, [companyId, dispatch]); // Re-run effect if companyId changes

};

export default useGetCompanyById; // Export custom hook
