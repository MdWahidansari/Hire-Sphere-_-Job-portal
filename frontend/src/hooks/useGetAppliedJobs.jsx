import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_PONT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch(); // Initialize redux dispatch to update applied jobs state

  // Fetch applied jobs once when component mounts
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // Call API to get all jobs the user has applied for
        const res = await axios.get(`${APPLICATION_API_END_PONT}/get`, {
          withCredentials: true, // Required if API uses cookies
        });

        console.log("Applied jobs response:", res.data); // Debug API response

        // If API response is successful, update redux store
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.jobs));
        } else {
          // If no jobs or API fails, set applied jobs to empty array
          dispatch(setAllAppliedJobs([]));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error); // Log errors
        dispatch(setAllAppliedJobs([])); // Reset state on error
      }
    };

    fetchAppliedJobs(); // Execute the API call
  }, [dispatch]); // Only runs on initial mount

};

export default useGetAppliedJobs; // Export custom hook

