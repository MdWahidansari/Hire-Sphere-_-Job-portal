import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { populate } from "dotenv";

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "jobId is required",
        success: false,
      });
    }

    // Check if the user has already applied
    const existingApplicatoin = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplicatoin) {
      return res.status(200).json({
        message: "you have allready applyed for this job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add the application ID to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all jobs the user has applied to
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        Option: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          Option: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "not application",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all applicants for a specific job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      Option: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update the status of an application (pending/accepted/rejected)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(404).json({
        message: "status is required",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
