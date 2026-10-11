import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, default: "TechCorp Global" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ctc: { type: String, default: "₹8,00,000 - ₹14,00,000 PA" },
    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: "INR" },
        period: { type: String, default: "per annum" }
    },
    type: { type: String, enum: ["Full-time", "Part-time", "Internship"], required: true },
    requiredSkills: [{ type: String }], // Array of required skills
    location: { type: String, default: "Bengaluru, India (Hybrid)" },
    experienceRequired: { type: String, default: "0 - 1 Years (Fresher / Junior)" },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    benefits: [{ type: String }],
    termsAndConditions: [{ type: String }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);

