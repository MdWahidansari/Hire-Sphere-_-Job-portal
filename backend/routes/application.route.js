import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  updateStatus,
} from "../contorllers/application.controller.js";
import { getAllJobs } from "../contorllers/job.controler.js";

const router = express.Router();

// Apply to a job by ID (authenticated users only)
router.route("/apply/:id").get(isAuthenticated, applyJob);

// Get all jobs (authenticated users only)
router.route("/get").get(isAuthenticated, getAllJobs);

// Get all applicants for a specific job (authenticated users only)
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Update application status for a job (authenticated users only)
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
