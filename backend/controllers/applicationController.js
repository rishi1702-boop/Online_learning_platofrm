import { User } from '../models/User.js';
import { Job } from '../models/Job.js';
import { Gig } from '../models/Gig.js';
import { Application } from '../models/Application.js';

export const applyForOpportunity = async (req, res) => {
    try {
        const { 
            opportunityId, 
            type, 
            fullName, 
            email, 
            phone, 
            resumeUrl, 
            portfolioUrl, 
            githubUrl, 
            experienceLevel, 
            coverLetter, 
            agreedToTerms 
        } = req.body;
        const userId = req.user._id;

        if (!agreedToTerms) {
            return res.status(400).json({ 
                message: "Acknowledgment required: You must review and agree to the Terms & Conditions before applying." 
            });
        }

        if (!fullName || !email || !phone || !resumeUrl) {
            return res.status(400).json({ 
                message: "Missing details: Please provide Full Name, Email, Phone Number, and Resume/Portfolio link." 
            });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if already applied
        const existingApp = await Application.findOne({
            student: userId,
            ...(type === "JOB" ? { jobId: opportunityId } : { gigId: opportunityId })
        });
        if (existingApp) {
            return res.status(400).json({ 
                message: "You have already applied for this opening. Your application is under review by the employer." 
            });
        }

        if (type === "GIG" || type === "INTERNSHIP" || type === "MINI_TASK") {
            const gig = await Gig.findById(opportunityId);
            if (!gig) return res.status(404).json({ message: "Startup internship or mini-task not found" });

            // 90% restriction removed: Open to all learners to upgrade skills, earn stipend, and support finances
            // Create Application
            const application = await Application.create({
                student: userId,
                type: "GIG",
                gigId: opportunityId,
                fullName,
                email,
                phone,
                resumeUrl,
                portfolioUrl: portfolioUrl || "",
                githubUrl: githubUrl || "",
                experienceLevel: experienceLevel || "Fresher",
                coverLetter: coverLetter || "",
                agreedToTerms: true
            });
            return res.status(201).json({ message: "Internship application submitted successfully to startup! The founder will review your profile.", application });
        } 
        
        if (type === "JOB") {
            const job = await Job.findById(opportunityId);
            if (!job) return res.status(404).json({ message: "Job not found" });

            // Role-Based Learning Completion Rule:
            // Startups welcome motivated learners directly without heavy corporate MNC filtering!
            const employer = await User.findById(job.employer);
            const isStartupEmployer = employer?.role === "STARTUP";

            if (!isStartupEmployer && !user.careerGoalProfile?.isRoleBasedLearningCompleted) {
                return res.status(403).json({ 
                    message: "Eligibility Failed: You must complete your designated Role-Based Learning Roadmap before applying to corporate MNC roles." 
                });
            }

            // Create Application
            const application = await Application.create({
                student: userId,
                type: "JOB",
                jobId: opportunityId,
                fullName,
                email,
                phone,
                resumeUrl,
                portfolioUrl: portfolioUrl || "",
                githubUrl: githubUrl || "",
                experienceLevel: experienceLevel || "Fresher",
                coverLetter: coverLetter || "",
                agreedToTerms: true
            });
            return res.status(201).json({ message: "Job application submitted successfully to employer!", application });
        }

        return res.status(400).json({ message: "Invalid opportunity type" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
