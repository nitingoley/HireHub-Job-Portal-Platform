import express from "express";
const router = express.Router();
import { getJobById, getJobs } from "../controllers/jobController.js";

// route for get all job data
router.get("/", getJobs);

// route for get single job by ID
router.get("/:id", getJobById);

export default router;
