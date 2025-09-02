import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_PONT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch(); // Initialize redux dispatch to update store

  // Fetch all admin jobs on component mount
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        // Make API call to get all admin jobs
        const res = await axios.get(`${JOB_API_END_PONT}/getAdminJobs`, {
          withCredentials: true, // send cookies if needed
        });

        // If response is successful, update redux store
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error); // log error for debugging
      }
    };

    fetchAllAdminJobs(); // Call the function
  }, []);
};

export default useGetAllAdminJobs; // Export custom hook
