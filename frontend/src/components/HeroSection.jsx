import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedhQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  // Local state for search input
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler for searching jobs
  const searchJobHandler = () => {
    dispatch(setSearchedhQuery(query)); // Update redux store with query
    navigate("/browse"); // Navigate to browse page
  };

  return (
    <div className="text-center">
      {/* Hero section content */}
      <div className="flex flex-col gap-5 my-10">
        {/* Tagline */}
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          Where Employers Meet the Best Talent
        </span>

        {/* Main heading */}
        <h1 className="text-5xl font-bold">
          Discover Opportunities <br /> Apply with Ease{" "}
          <span className="text-[#6A38C2]">Get Hired</span>{" "}
        </h1>

        {/* Subheading */}
        <p>
          Connecting talent with the right opportunities. Find the job that fits
          you best.
        </p>

        {/* Search input with button */}
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)} // Update query state
            className="outline-none border-none w-full"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full">
            <Search className="h-5 w-5"></Search>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
