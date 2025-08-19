import express from "express";
const router = express.Router();
import {
  changeJobApplicationStatus,
  changeVisibilty,
  getComapnyData,
  getcompanyJobApplicant,
  getcompanyPostedJobs,
  loginCompany,
  postJOb,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

// register a company
router.post("/register", upload.single("image"), registerCompany);

// login a company
router.post("/login", loginCompany);

// Get company data
router.get("/company", protectCompany, getComapnyData);

// Post a Job

router.post("/post-job", protectCompany, postJOb);

//  get applicant data
router.get("/applicant", protectCompany, getcompanyJobApplicant);

// get company job list
router.get("/list-jobs", protectCompany, getcompanyPostedJobs);

// change application status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

// change application visibilty
router.post("/change-visiblity", protectCompany, changeVisibilty);

export default router;
