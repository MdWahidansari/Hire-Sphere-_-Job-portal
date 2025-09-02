import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateComapny } from "../contorllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register a new company (authenticated users only)
router.route('/register').post(isAuthenticated, registerCompany);

// Get all companies (authenticated users only)
router.route('/get').get(isAuthenticated, getCompany);

// Get a specific company by ID (authenticated users only)
router.route('/get/:id').get(isAuthenticated, getCompanyById);

// Update company info (authenticated + file upload for logo)
router.route('/update/:id').put(isAuthenticated, singleUpload, updateComapny);

export default router;