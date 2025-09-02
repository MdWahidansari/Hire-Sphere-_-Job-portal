// Displays all companies in a table with a search filter and a button to create a new company

import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  // Fetch all companies on component mount using custom hook
  useGetAllCompanies();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10">
        {/* Filter input and New Company button */}
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => dispatch(setSearchCompanyByText(e.target.value))}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>

        {/* Table showing all companies */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;

