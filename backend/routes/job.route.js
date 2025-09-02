import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../contorllers/job.controler.js";

const router = express.Router();

// Post a new job (authenticated users only)
router.route("/post").post(isAuthenticated, postJob);

// Get all jobs (authenticated users only)
router.route("/get").get(isAuthenticated, getAllJobs);

// Get jobs for admin dashboard (authenticated users only)
router.route("/getAdminJobs").get(isAuthenticated, getAdminJobs);

// Get a specific job by ID (authenticated users only)
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;