import React from "react";
import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  // Get all jobs from Redux store
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-20 my-20">
      {/* Section heading */}
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      {/* Job cards grid */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          // Message if no jobs are available
          <span>Not job Available</span>
        ) : (
          // Display first 6 jobs using LatestJobsCards component
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobsCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
