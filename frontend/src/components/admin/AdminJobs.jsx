
// Page to display all jobs posted by the admin with search and post new job functionality

// Importing dependencies and components
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setsearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  // State to store search input
  const [input, setInput] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Custom hook to fetch all jobs created by the admin
  useGetAllAdminJobs();

  // Update Redux store whenever search input changes
  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main container for content */}
      <div className="max-w-6xl mx-auto my-10">
        
        {/* Search input and "Post New Jobs" button */}
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            value={input} // Controlled input value
            onChange={(e) => setInput(e.target.value)} // Update input state
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Post New Jobs
          </Button>
        </div>

        {/* Table displaying all admin jobs */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;












