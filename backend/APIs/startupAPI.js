import express from "express";
import { verifyToken, authorizeRole } from "../middlewares/verifyToken.js";
import { Gig } from "../models/Gig.js";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";

export const startupRouter = express.Router();

// Apply auth to all startup routes
startupRouter.use(verifyToken);
startupRouter.use(authorizeRole("STARTUP", "EMPLOYER", "ADMIN"));

// 1. Get Startup Stats Overview
startupRouter.get("/stats", async (req, res) => {
    try {
        const startupId = req.user._id;

        const [myGigs, myJobs] = await Promise.all([
            Gig.find({ employer: startupId }),
            Job.find({ employer: startupId })
        ]);

        const gigIds = myGigs.map(o => o._id);
        const jobIds = myJobs.map(o => o._id);

        const totalApplications = await Application.countDocuments({
            $or: [{ gigId: { $in: gigIds } }, { jobId: { $in: jobIds } }]
        });
        const acceptedApplications = await Application.countDocuments({
            $or: [{ gigId: { $in: gigIds } }, { jobId: { $in: jobIds } }],
            status: "ACCEPTED"
        });
        const reviewingApplications = await Application.countDocuments({
            $or: [{ gigId: { $in: gigIds } }, { jobId: { $in: jobIds } }],
            status: "REVIEWING"
        });

        res.status(200).json({
            payload: {
                activePostings: myGigs.filter(o => o.isActive).length + myJobs.filter(o => o.isActive).length,
                totalPostings: myGigs.length + myJobs.length,
                totalApplications,
                acceptedApplications,
                reviewingApplications
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Post a New Startup Job Opening or Micro-Internship & Notify Students
startupRouter.post("/post-internship", async (req, res) => {
    try {
        const startupId = req.user._id;
        const {
            title,
            companyName,
            description,
            opportunityType, // "JOB", "INTERNSHIP", "MINI_TASK"
            startupStage,
            stipendText,
            duration,
            requiredSkills,
            deliverables,
            perks,
            hasBond,
            termsAndConditions,
            location
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const user = await User.findById(startupId);
        const resolvedCompany = companyName || user?.startupProfile?.startupName || `${user?.firstName} ${user?.lastName}`;
        const skillsArray = Array.isArray(requiredSkills)
            ? requiredSkills
            : (requiredSkills ? requiredSkills.split(",").map(s => s.trim()).filter(Boolean) : ["Full-Stack Development"]);

        let createdItem = null;
        const isJob = opportunityType === "JOB";

        if (isJob) {
            // Create a Full-Time / Junior Startup Job Opening
            createdItem = await Job.create({
                employer: startupId,
                companyName: resolvedCompany,
                title,
                description,
                ctc: stipendText || "₹6,00,000 - ₹12,00,000 PA",
                type: "Full-time",
                requiredSkills: skillsArray,
                location: location || "Remote / Hybrid (India)",
                experienceRequired: duration || "0 - 1 Years (Junior / Fresher)",
                responsibilities: deliverables || [
                    "Develop and maintain production web features with modern tech stack",
                    "Collaborate directly with the founding team and lead engineers",
                    "Deliver high quality code and participate in sprint cycles"
                ],
                requirements: [
                    "Hands-on skills in core web technologies",
                    "Strong problem-solving capability and enthusiasm for startup speed",
                    "Course completion or project portfolio on CourseHub"
                ],
                benefits: perks || [
                    "Competitive startup salary package & potential equity",
                    "Direct mentorship from startup founders",
                    "High ownership and rapid career growth without corporate red tape"
                ],
                termsAndConditions: termsAndConditions || [
                    "Zero corporate bonds: work on fair mutual terms",
                    "Open to CourseHub student learners ready for full-time startup roles",
                    "Direct founder review and fast-track hiring process"
                ],
                isActive: true
            });
        } else {
            // Create a Startup Micro-Internship or Paid Mini-Task
            createdItem = await Gig.create({
                employer: startupId,
                companyName: resolvedCompany,
                title,
                description,
                opportunityType: opportunityType || "INTERNSHIP",
                startupStage: startupStage || "Early-Stage Startup",
                hasBond: Boolean(hasBond) || false,
                stipendText: stipendText || "₹6,000 - ₹12,000 / month",
                duration: duration || "2 - 4 Weeks",
                requiredSkills: skillsArray,
                minimumScoreRequired: 0, // No 90% test gate - open to all learners for practical startup experience!
                deliverables: deliverables || [
                    "Implement specified feature or component with modern, clean code",
                    "Submit weekly progress updates directly to the startup founder",
                    "Deliver working GitHub repo and live deployment link"
                ],
                perks: perks || [
                    "Direct mentorship & networking with startup founders",
                    "Official Internship Certificate & Letter of Recommendation (LOR)",
                    "Hands-on production feature experience without corporate bonds",
                    "Monthly financial stipend to support student learning"
                ],
                termsAndConditions: termsAndConditions || [
                    "Zero corporate bond: students are free to manage academic schedules flexibly",
                    "Stipend is disbursed upon milestone reviews and deliverable sign-off",
                    "Work submitted must be original code created for the startup",
                    "Opportunity is open to all learners actively upgrading their skills on CourseHub"
                ],
                isActive: true
            });
        }

        // --- BROADCAST NOTIFICATION TO STUDENTS ---
        let notifiedCount = 0;
        try {
            const activeStudents = await User.find({ role: "STUDENT", isActive: true });
            if (activeStudents.length > 0) {
                const targetLink = isJob ? `/jobs/${createdItem._id}` : `/gigs/${createdItem._id}`;
                const compensationNote = stipendText || (isJob ? "Competitive Salary" : "Stipend Included");

                const notificationsToInsert = activeStudents.map(student => ({
                    user: student._id,
                    message: isJob
                        ? `Startup Job Opening! ${resolvedCompany} is hiring: '${title}' (${compensationNote}). Tap to view & apply!`
                        : `New Startup Opportunity! ${resolvedCompany} posted: '${title}' (${compensationNote}). Tap to view & apply!`,
                    type: "job",
                    link: targetLink
                }));

                await Notification.insertMany(notificationsToInsert);
                notifiedCount = notificationsToInsert.length;
            }
        } catch (notifErr) {
            console.error("Failed to broadcast notifications to students:", notifErr);
        }

        res.status(201).json({
            message: `Startup ${isJob ? "Job Opening" : "Micro-Internship"} posted successfully! ${notifiedCount} students have been notified.`,
            payload: createdItem,
            notifiedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Get All Opportunities Posted by Current Startup (Both Jobs & Gigs)
startupRouter.get("/my-postings", async (req, res) => {
    try {
        const startupId = req.user._id;
        const [gigs, jobs] = await Promise.all([
            Gig.find({ employer: startupId }).sort({ createdAt: -1 }),
            Job.find({ employer: startupId }).sort({ createdAt: -1 })
        ]);

        const enrichedGigs = await Promise.all(
            gigs.map(async (gig) => {
                const count = await Application.countDocuments({ gigId: gig._id });
                const accepted = await Application.countDocuments({ gigId: gig._id, status: "ACCEPTED" });
                return {
                    ...gig.toObject(),
                    isJobModel: false,
                    displayType: gig.opportunityType || "INTERNSHIP",
                    applicantCount: count,
                    acceptedCount: accepted
                };
            })
        );

        const enrichedJobs = await Promise.all(
            jobs.map(async (job) => {
                const count = await Application.countDocuments({ jobId: job._id });
                const accepted = await Application.countDocuments({ jobId: job._id, status: "ACCEPTED" });
                return {
                    ...job.toObject(),
                    isJobModel: true,
                    displayType: "JOB",
                    stipendText: job.ctc,
                    duration: job.experienceRequired,
                    applicantCount: count,
                    acceptedCount: accepted
                };
            })
        );

        const allPostings = [...enrichedJobs, ...enrichedGigs].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json({ payload: allPostings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Toggle Posting Active Status
startupRouter.patch("/posting/:id/toggle", async (req, res) => {
    try {
        let posting = await Gig.findOne({ _id: req.params.id, employer: req.user._id });
        if (!posting) {
            posting = await Job.findOne({ _id: req.params.id, employer: req.user._id });
        }
        if (!posting) return res.status(404).json({ message: "Posting not found" });

        posting.isActive = !posting.isActive;
        await posting.save();

        res.status(200).json({
            message: `Posting ${posting.isActive ? "activated" : "paused"} successfully`,
            payload: posting
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. Get All Received Applications for this Startup
startupRouter.get("/applications", async (req, res) => {
    try {
        const startupId = req.user._id;
        const [myGigs, myJobs] = await Promise.all([
            Gig.find({ employer: startupId }),
            Job.find({ employer: startupId })
        ]);

        const gigIds = myGigs.map(o => o._id);
        const jobIds = myJobs.map(o => o._id);

        const applications = await Application.find({
            $or: [{ gigId: { $in: gigIds } }, { jobId: { $in: jobIds } }]
        })
            .populate("student", "firstName lastName email profilePic skillPassport learningStreak")
            .populate("gigId")
            .populate("jobId")
            .sort({ createdAt: -1 });

        res.status(200).json({ payload: applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 6. Update Application Status & Provide Feedback to Student
startupRouter.patch("/application/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, employerFeedback } = req.body;

        const application = await Application.findById(id).populate("gigId").populate("jobId");
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        const opportunity = application.gigId || application.jobId;
        const employerId = opportunity?.employer?.toString();

        if (employerId !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this application" });
        }

        if (status) application.status = status;
        if (employerFeedback !== undefined) application.employerFeedback = employerFeedback;

        await application.save();

        // Send Real-time Notification to the Student
        try {
            const oppTitle = opportunity?.title || "Startup Opportunity";
            const company = opportunity?.companyName || "Startup";
            const targetLink = application.jobId ? `/jobs/${application.jobId._id}` : `/gigs/${application.gigId._id}`;

            await Notification.create({
                user: application.student,
                message: `Update from ${company}: Your application for '${oppTitle}' is now ${status}. ${employerFeedback ? `Note: "${employerFeedback}"` : ""}`,
                type: "job",
                link: targetLink
            });
        } catch (notifErr) {
            console.error("Failed to send student notification:", notifErr);
        }

        res.status(200).json({
            message: `Application updated to ${status} successfully! Student has been notified.`,
            payload: application
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
