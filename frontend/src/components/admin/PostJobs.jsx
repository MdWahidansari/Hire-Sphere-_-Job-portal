import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_PONT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJobs = () => {
  const navigate = useNavigate();

  // Redux store: fetch list of companies for dropdown
  const { companies } = useSelector((store) => store.company);

  // Local state: form inputs
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    exprience: "",
    position: 0,
    companyId: "", // stores selected company ID
  });

  // Loading state while posting the job
  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle company selection from dropdown
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  // Handle form submission
  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Post job data to backend
      const res = await axios.post(`${JOB_API_END_PONT}/post`, input, {
        header: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // If success, show toast and navigate to jobs list
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.message || "Job posting failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Centered form container */}
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={sumbitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          {/* Grid layout for form fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="p-2">
              <label>Title</label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Job Description */}
            <div className="p-2">
              <label>Description</label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Requirements */}
            <div className="p-2">
              <label>Requirements</label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Salary */}
            <div className="p-2">
              <label>Salary</label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Location */}
            <div className="p-2">
              <label>Location</label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Job Type */}
            <div className="p-2">
              <label>Job Type</label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Experience Level */}
            <div className="p-2">
              <label>Experience Level</label>
              <Input
                type="text"
                name="exprience"
                value={input.exprience}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Number of Positions */}
            <div className="p-2">
              <label>No of Positions</label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {/* Company Dropdown */}
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Submit button */}
          {loading ? (
            <Button className="w-full my-5 py-2 text-lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-5 text-white rounded-xl py-2 text-lg hover:bg-black-200"
            >
              Post New Job
            </Button>
          )}

          {/* Warning if no companies are registered */}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              Please register a company first before posting jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
