import express from "express";
const router = express.Router();
import {
  applyForJob,
  getUserData,
  getUserJobApplication,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

// Get user data
router.get("/user", getUserData);

// apply for job
router.post("/apply", applyForJob);

// get applied job data
router.get("/applications", getUserJobApplication);

// update user resume

router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
