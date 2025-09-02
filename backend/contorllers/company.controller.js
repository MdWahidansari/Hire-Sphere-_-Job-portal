import { Company } from "../models/company.model.js";
import cloudinary from "../Utils/cloudinary.js";
import getDataUri from "../Utils/dataUri.js";

// Register a new company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "you can register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(200).json({
      message: "company register successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all companies for the authenticated user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get a company by its ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update company information (with logo upload)
export const updateComapny = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    console.log(name, description, website, location);
    const updateDate = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateDate, {
      new: true,
    });

    if (!company) {
      res.status(400).json({
        message: "company not fouond",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Comapny information updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};







