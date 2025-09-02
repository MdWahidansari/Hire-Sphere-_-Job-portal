import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_PONT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch(); // Initialize redux dispatch to update jobs state
  const { searchedQuery } = useSelector((store) => store.job); // Get searched keyword from redux

  // Fetch all jobs whenever component mounts
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Call API with optional search keyword
        const res = await axios.get(
          `${JOB_API_END_PONT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true, // required if API uses cookies
          }
        );
        console.log(res.data); // Debug API response

        // If successful, update redux store with jobs
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error); // Log any error
      }
    };
    fetchAllJobs(); // Execute the API call
  }, []); // Empty dependency array runs only once on mount
};

export default useGetAllJobs; // Export custom hook

