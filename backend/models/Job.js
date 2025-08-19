import mongoose from "mongoose";

const JobSechema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    visibile: {
        type: Boolean,
        default:true,
    },
    companyId: {
        type: mongoose.Schema.ObjectId,
        ref: "Company",
        required: true,
    },
});
const Job = mongoose.model("Job", JobSechema);
export default Job;
