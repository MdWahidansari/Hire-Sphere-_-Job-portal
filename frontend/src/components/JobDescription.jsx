import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

import axios from "axios";
import { APPLICATION_API_END_PONT, JOB_API_END_PONT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job); // Get current job from redux
  const { user } = useSelector((store) => store.auth); // Get logged-in user
  const isIntiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant == user?._id || false
  ); // Check if user has already applied

  const [isApplied, setIsApplied] = useState(isIntiallyApplied); // Local state to track application

  const params = useParams();
  const jobId = params.id; // Get job ID from URL

  const dispatch = useDispatch();

  // Handler to apply for a job
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_PONT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        setIsApplied(true); // Update local state
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob)); // Update redux store for real-time UI
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message); // Show error to user
    }
  };

  // Fetch single job details on component mount or when jobId changes
  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_PONT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job)); // Store job in redux
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          ); // Sync local state with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10">
      {/* Header section with job title, badges, and apply button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.position} Position
            </Badge>
            <Badge className={"text-pink-700 font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-green-700 font-bold"} variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>

        {/* Apply button */}
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-full ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#2c0745]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Header */}
      <h1 className="border-b-2 border-gray-300 font-medium py-4">
        Job Description
      </h1>

      {/* Job details section */}
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold my-1">
          Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
