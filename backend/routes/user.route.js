import express from "express";
import { login, logout, register, updateProfile } from "../contorllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register a new user (with profile picture upload)
router.route('/register').post(singleUpload, register);

// Login user
router.route('/login').post(login);

// Logout user
router.route('/logout').get(logout);

// Update user profile (authenticated + optional profile picture upload)
router.route('/profile/update').post(isAuthenticated, singleUpload, updateProfile);

export default router;








