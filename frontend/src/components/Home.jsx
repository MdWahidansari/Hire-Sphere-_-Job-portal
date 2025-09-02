import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarouse from "./CategoryCarouse";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Fetch all jobs on component mount
  useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Redirect recruiters to admin page
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      {/* Navbar at top */}
      <Navbar />

      {/* Hero section with search */}
      <HeroSection />

      {/* Job categories carousel */}
      <CategoryCarouse />

      {/* Latest job listings */}
      <LatestJobs />

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default Home;
