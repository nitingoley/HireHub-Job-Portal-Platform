import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

// Register new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  if (!name || !email || !password) {
    return res.json({ success: false, messsage: "Missing Field" });
  }

  try {
    const companyExist = await Company.findOne({ email });

    if (companyExist) {
      return res.json({
        success: false,
        messsage: "Company already exist...!",
      });
    }

    // enrypt the password

    const slat = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, slat);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email and password",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get comppny data

export const getComapnyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Post a new Job
export const postJOb = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;
  console.log(companyId);

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await Job.save();
    res.json({ success: true, newJob });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get company job applicant

export const getcompanyJobApplicant = async (req, res) => {};

// get company post job
export const getcompanyPostedJobs = async (req, res) => {};

// change job application status
export const changeJobApplicationStatus = async (req, res) => {};

// change job visiblity
export const changeVisibilty = async (req, res) => {};
