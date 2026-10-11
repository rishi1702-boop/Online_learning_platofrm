import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
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
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
