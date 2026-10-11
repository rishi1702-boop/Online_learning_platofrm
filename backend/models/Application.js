import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["JOB", "GIG"], required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, // If applying for a Job
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig" }, // If applying for a micro-freelance Gig
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    portfolioUrl: { type: String },
    githubUrl: { type: String },
    experienceLevel: { type: String },
    coverLetter: { type: String },
    agreedToTerms: { type: Boolean, required: true, default: false },
    status: { type: String, enum: ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED", "COMPLETED"], default: "PENDING" },
    employerFeedback: { type: String }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);
