
// Fetches and displays all applicants for a specific job

import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_PONT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicantionSlice";

const Applicants = () => {
  const params = useParams(); // Get job ID from URL
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    // Fetch all applicants for the job
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_PONT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        // Store applicants in redux
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        {/* Heading with total applicants */}
        <h1 className="font-bold text-xlmy my-4">
          Applicants {applicants?.applications?.length}
        </h1>

        {/* Applicants table */}
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;

