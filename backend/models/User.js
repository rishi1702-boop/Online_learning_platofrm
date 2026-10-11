import mongoose, { version } from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: [true, "password is required"]
    },
    role: {
        type: String,
        enum: ["STUDENT", "INSTRUCTOR", "ADMIN", "EMPLOYER", "STARTUP"],
        required: [true, "role is required"]
    },
    startupProfile: {
        companyName: { type: String },
        startupName: { type: String },
        establishedYear: { type: String },
        location: { type: String, default: "Bengaluru, India" },
        noOfEmployees: { type: String, default: "1-10" },
        tagline: { type: String },
        stage: { type: String, default: "Early Stage" },
        website: { type: String },
        about: { type: String }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePic: {
        type: String
    },
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    learningStreak: {
        currentStreak: { type: Number, default: 0 },
        lastActivityDate: { type: Date },
        badges: [{ type: String }]
    },
    skillPointsWallet: {
        balance: { type: Number, default: 0 },
        lifetimeEarned: { type: Number, default: 0 }
    },
    careerGoalProfile: {
        targetRole: String,
        targetSkillMatrix: [String],
        completedMilestonesCount: { type: Number, default: 0 },
        isRoleBasedLearningCompleted: { type: Boolean, default: false }
    },
    skillPassport: {
        verifiedSkills: [{
            skillName: String,
            assessmentScore: Number,
            dateVerified: Date
        }],
        certificates: [{
            title: String,
            url: String,
            issueDate: Date
        }],
        portfolioProjects: [{
            title: String,
            description: String,
            link: String
        }]
    }
}, {
    strict: true,
    versionKey: false,
    timestamps: true
});

export const User = mongoose.model('User', userSchema);