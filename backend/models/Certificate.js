import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    certificateId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    certificateUrl: {
        type: String
    }
}, { timestamps: true });

// Ensure a user can only have one certificate per course
certificateSchema.index({ user: 1, course: 1 }, { unique: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);
