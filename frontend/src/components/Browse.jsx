import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedhQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  // Fetch all jobs using custom hook
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Clear the search query when component unmounts
  useEffect(() => {
    return () => {
      dispatch(setSearchedhQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="font-bold my-10 text-center">
          Search Result ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.length > 0 ? (
            allJobs.map((job) => (
              <Job key={job._id} job={job} /> // Use 'key' (lowercase) instead of 'Key'
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No jobs found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;