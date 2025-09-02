// Handles creation of a new company with a simple form
// Includes validation, API call, Redux update, and navigation

import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_PONT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  Local state to hold company name input
  const [companyName, setCompanyName] = useState("");

  //  Function to register a new company
  const registerNewCompany = async () => {
    // Validate company name
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty");
      return;
    }

    try {
      // API request to register company
      const res = await axios.post(
        `${COMPANY_API_END_PONT}/register`,
        { companyName },
        { withCredentials: true }
      );

      // On success, update Redux store and navigate to company details
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to register company"
      );
    }
  };

  return (
    <div>
      <Navbar />

      {/* Main container */}
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        {/* Company name input */}
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="jobHunt, Microsoft, etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        {/* Action buttons */}
        <div className="flex items-center gap-2 my-10">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={registerNewCompany}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;

