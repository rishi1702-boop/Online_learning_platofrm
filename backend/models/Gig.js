import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, default: "DevStudio Micro-Gigs" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    stipend: {
        min: { type: Number },
        max: { type: Number }
    },
    opportunityType: { type: String, enum: ["INTERNSHIP", "MINI_TASK", "GIG"], default: "INTERNSHIP" },
    startupStage: { type: String, default: "Early-Stage Startup" },
    hasBond: { type: Boolean, default: false },
    stipendText: { type: String, default: "₹6,000 - ₹12,000 / month" },
    requiredSkills: [{ type: String }], // e.g., ["React"]
    minimumScoreRequired: { type: Number, default: 0 }, // Removed 90% restriction to help student finances and practical experience
    deadline: { type: Date },
    duration: { type: String, default: "2 - 4 Weeks" },
    deliverables: [{ type: String }],
    perks: [{ type: String }],
    termsAndConditions: [{ type: String }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Gig = mongoose.model("Gig", gigSchema);
