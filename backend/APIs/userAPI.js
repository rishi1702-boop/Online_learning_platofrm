import express from "express";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { Certificate } from "../models/Certificate.js";
import { Notification } from "../models/Notification.js";
import { QuizAttempt } from "../models/QuizAttempt.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { applyForOpportunity } from "../controllers/applicationController.js";
import { Job } from "../models/Job.js";

export const userRouter = express.Router();

// ── PUBLIC ROUTES (no auth required) ──

// Get all courses (public - needed for Home page & unauthenticated browsing)
userRouter.get('/courses', async (req, res) => {
    try {
        const allCourses = await Course.find();

        res.status(200).json({
            message: "all courses",
            payload: allCourses
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single course details (public)
userRouter.get('/course/:id', async(req, res)=>{
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId)
            .populate("reviews.user", "firstName lastName");
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }
        res.status(200).json({
            message: "course details",
            payload: course
        });
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// Verify Certificate (public)
userRouter.get('/verify-certificate/:certificateId', async (req, res) => {
    try {
        const { certificateId } = req.params;
        const certificate = await Certificate.findOne({ certificateId })
            .populate('user', 'firstName lastName')
            .populate('course', 'title');

        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found or invalid" });
        }

        res.status(200).json({
            message: "Certificate is valid",
            payload: certificate
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ── PROTECTED ROUTES (auth required) ──
userRouter.use(verifyToken);

// Get User Profile
userRouter.get('/profile', async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User profile fetched successfully", payload: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Profile (firstName, lastName)
userRouter.patch('/update-profile', async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName, lastName } = req.body;

        if (!firstName?.trim() || !lastName?.trim()) {
            return res.status(400).json({ message: "First name and last name are required" });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { firstName: firstName.trim(), lastName: lastName.trim() },
            { new: true }
        ).select('-password');

        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", payload: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Change Password
userRouter.patch('/change-password', async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current and new password are required" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters" });
        }

        // Fetch user WITH password for verification
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Enroll courses
userRouter.post('/enroll-course', async (req, res) => {
    try {
        const userId = req.user._id;
        const courseId = req.body.courseId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }

        if (user.coursesEnrolled.some(c => c.toString() === courseId)) {
            return res.status(400).json({ message: "already enrolled in this course" });
        }

        // Validate payment if it's a paid course
        if (course.price > 0) {
            const { paymentDetails } = req.body;
            if (!paymentDetails) {
                return res.status(400).json({ message: "payment details are required for paid courses" });
            }

            const { paymentMethod } = paymentDetails;

            if (paymentMethod === "upi") {
                const { upiTxnId } = paymentDetails;
                if (!upiTxnId) {
                    return res.status(400).json({ message: "UPI Transaction ID is required" });
                }
                if (!/^UPI\d{12}$/.test(upiTxnId.toString().trim())) {
                    return res.status(400).json({ message: "invalid UPI Transaction ID format (must be UPI followed by 12 digits)" });
                }
            } else {
                // Default card validation
                const { cardNumber, cardHolder, expiryDate, cvv } = paymentDetails;

                if (!cardHolder || typeof cardHolder !== 'string' || cardHolder.trim().length === 0) {
                    return res.status(400).json({ message: "valid card holder name is required" });
                }

                if (!cardNumber) {
                    return res.status(400).json({ message: "card number is required" });
                }
                const cleanedNum = cardNumber.toString().replace(/\s+/g, '');
                if (!/^\d{13,19}$/.test(cleanedNum)) {
                    return res.status(400).json({ message: "invalid card number (must be between 13 and 19 digits)" });
                }

                if (!expiryDate) {
                    return res.status(400).json({ message: "expiry date is required" });
                }
                if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) {
                    return res.status(400).json({ message: "invalid expiry date format (must be MM/YY)" });
                }

                if (!cvv) {
                    return res.status(400).json({ message: "cvv is required" });
                }
                if (!/^\d{3,4}$/.test(cvv.toString().trim())) {
                    return res.status(400).json({ message: "invalid CVV (must be 3 or 4 digits)" });
                }
            }
        }

        user.coursesEnrolled.push(courseId);
        course.studentsEnrolled += 1;

        await user.save();
        await course.save();

        res.status(200).json({
            message: "course enrolled successfully",
            payload: user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


userRouter.get('/my-courses', async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate("coursesEnrolled");

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({
            message: "user courses",
            payload: user.coursesEnrolled
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Student review and rating

userRouter.post('/review/:courseId', async(req, res)=>{
    try {
        const courseId = req.params.courseId;
        const userId = req.user._id;
        const {rating, review} = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }

        const existingReview = course.reviews.find(r => r.user.toString() === userId);
        if (existingReview) {
            return res.status(400).json({ message: "already reviewed this course" });
        }

        course.reviews.push({user: userId, rating, review});
        course.rating = course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length;

        await course.save();

        res.status(200).json({
            message: "review added successfully",
            payload: course
        });
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});


// --- STUDENT PROGRESS APIS ---

// Get Progress for a single course
userRouter.get('/progress/:courseId', async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;

        const progress = await CourseProgress.findOne({ user: userId, course: courseId });
        
        if (!progress) {
            return res.status(200).json({ 
                message: "No progress found", 
                payload: { completedLectures: [] } 
            });
        }

        res.status(200).json({
            message: "Progress fetched successfully",
            payload: progress
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mark lecture as complete/incomplete
userRouter.post('/progress/:courseId/:lectureId', async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId, lectureId } = req.params;

        // Find or create progress record
        let progress = await CourseProgress.findOne({ user: userId, course: courseId });
        
        if (!progress) {
            progress = new CourseProgress({
                user: userId,
                course: courseId,
                completedLectures: [lectureId]
            });
        } else {
            // Check if lecture is already completed
            const isCompleted = progress.completedLectures.includes(lectureId);
            
            if (isCompleted) {
                // Remove it (toggle off)
                progress.completedLectures = progress.completedLectures.filter(id => id.toString() !== lectureId.toString());
            } else {
                // Add it
                progress.completedLectures.push(lectureId);
            }
            progress.lastAccessed = new Date();
        }

        await progress.save();

        res.status(200).json({
            message: "Progress updated successfully",
            payload: progress
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- NEW FEATURES APIS ---

// Add/Remove from Wishlist
userRouter.post('/wishlist/:courseId', async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const courseIndex = user.wishlist.findIndex(id => id.toString() === courseId);
        
        if (courseIndex > -1) {
            // Remove from wishlist
            user.wishlist.splice(courseIndex, 1);
        } else {
            // Add to wishlist
            user.wishlist.push(courseId);
        }
        
        await user.save();
        res.status(200).json({ message: "Wishlist updated", payload: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Wishlist
userRouter.get('/wishlist', async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('wishlist');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Wishlist fetched", payload: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Recommendations (Logic-based: matching categories of enrolled courses)
userRouter.get('/recommendations', async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('coursesEnrolled');
        
        if (!user || user.coursesEnrolled.length === 0) {
            // Fallback: return highest rated courses if no enrollments
            const topCourses = await Course.find({ isActive: true }).sort({ rating: -1 }).limit(5);
            return res.status(200).json({ message: "Recommendations fetched", payload: topCourses });
        }

        const enrolledCategories = [...new Set(user.coursesEnrolled.map(c => c.category))];
        const enrolledIds = user.coursesEnrolled.map(c => c._id);

        const recommendations = await Course.find({
            category: { $in: enrolledCategories },
            _id: { $nin: enrolledIds },
            isActive: true
        }).limit(5);

        res.status(200).json({ message: "Recommendations fetched", payload: recommendations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Notifications
userRouter.get('/notifications', async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
        res.status(200).json({ message: "Notifications fetched", payload: notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mark Notifications as Read
userRouter.patch('/notifications/read', async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
        res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Generate Certificate
userRouter.post('/certificate/generate/:courseId', async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const progress = await CourseProgress.findOne({ user: userId, course: courseId });
        if (!progress) return res.status(400).json({ message: "No progress found" });

        // Calculate total lectures
        let totalLectures = 0;
        course.sections.forEach(sec => totalLectures += sec.lectures.length);

        if (progress.completedLectures.length < totalLectures) {
            return res.status(400).json({ message: "Course not 100% completed" });
        }

        // --- NEW RULE: MUST PASS A TEST ---
        const passedQuiz = await QuizAttempt.findOne({ 
            user: userId, 
            course: courseId, 
            passed: true 
        });

        if (!passedQuiz) {
            return res.status(403).json({ 
                message: "Eligibility Failed: You must attempt and pass at least one skill assessment test for this course before you can generate your certificate and unlock job opportunities." 
            });
        }

        let certificate = await Certificate.findOne({ user: userId, course: courseId });
        if (!certificate) {
            certificate = new Certificate({
                certificateId: crypto.randomUUID(),
                user: userId,
                course: courseId
            });
            await certificate.save();
            
            // Create certificate notification (no job apply link)
            await Notification.create({
                user: userId,
                message: `Congratulations! You've earned a certificate for ${course.title}.`,
                type: 'certificate'
            });

            // --- SMART JOB MATCHING (NEW FEATURE) ---
            // Because they finished a course, check for relevant jobs!
            const openJobs = await Job.find({ isActive: true });
            
            if (openJobs.length > 0) {
                // For demo purposes, we pick the first relevant job (e.g. Full-Stack Developer)
                const matchedJob = openJobs[0];
                
                // Automatically mark their role-based learning as complete for the demo
                // Need to fetch user first
                const user = await User.findById(userId);
                user.careerGoalProfile.isRoleBasedLearningCompleted = true;
                await user.save();

                await Notification.create({
                    user: userId,
                    message: `Smart Match! Based on your new skills from '${course.title}', you are now eligible to apply for: ${matchedJob.title}`,
                    type: 'job',
                    link: `/jobs/${matchedJob._id}`
                });
            }
        }

        res.status(200).json({ message: "Certificate generated", payload: certificate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Resume Progress Update
userRouter.patch('/progress/resume/:courseId', async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;
        const { lastWatchedLecture } = req.body;

        let progress = await CourseProgress.findOne({ user: userId, course: courseId });
        if (!progress) {
            progress = new CourseProgress({
                user: userId,
                course: courseId,
                completedLectures: []
            });
        }

        if (lastWatchedLecture) {
            progress.lastWatchedLecture = lastWatchedLecture;
            await progress.save();
        }
        
        res.status(200).json({ message: "Last watched lecture updated", payload: progress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit Quiz Attempt
userRouter.post('/attempt-quiz/:courseId/:quizId', async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId, quizId } = req.params;
        const { answers } = req.body; // Array of selected option indexes [0, 2, 1...]

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Find the quiz
        let targetQuiz = null;
        for (let section of course.sections) {
            const q = section.quizzes.id(quizId);
            if (q) {
                targetQuiz = q;
                break;
            }
        }

        if (!targetQuiz) return res.status(404).json({ message: "Quiz not found" });

        let score = 0;
        targetQuiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctOptionIndex) {
                score += 1;
            }
        });

        const passed = score >= Math.ceil(targetQuiz.questions.length / 2); // 50% to pass

        const attempt = await QuizAttempt.create({
            user: userId,
            course: courseId,
            quizId: quizId,
            score,
            totalQuestions: targetQuiz.questions.length,
            passed
        });

        res.status(200).json({ message: "Quiz submitted successfully", payload: attempt });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- OPPORTUNITIES (Jobs & Gigs) ---

// Get all Jobs
userRouter.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).populate('employer', 'firstName lastName');
        res.status(200).json({ payload: jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single Job
userRouter.get('/jobs/:id', async (req, res) => {
    try {
        let job = await Job.findById(req.params.id).populate('employer', 'firstName lastName email');
        if (job) {
            return res.status(200).json({ payload: job, opportunityType: 'JOB' });
        }
        // Fallback to check Gig if not found in Job collection
        const gig = await Gig.findById(req.params.id).populate('employer', 'firstName lastName email');
        if (gig) {
            return res.status(200).json({ payload: gig, opportunityType: 'GIG' });
        }
        return res.status(404).json({ message: "Job opportunity not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all Gigs
import { Gig } from '../models/Gig.js';
import { Application } from '../models/Application.js';

userRouter.get('/gigs', async (req, res) => {
    try {
        const gigs = await Gig.find({ isActive: true }).populate('employer', 'firstName lastName');
        res.status(200).json({ payload: gigs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single Gig
userRouter.get('/gigs/:id', async (req, res) => {
    try {
        let gig = await Gig.findById(req.params.id).populate('employer', 'firstName lastName email');
        if (gig) {
            return res.status(200).json({ payload: gig, opportunityType: 'GIG' });
        }
        const job = await Job.findById(req.params.id).populate('employer', 'firstName lastName email');
        if (job) {
            return res.status(200).json({ payload: job, opportunityType: 'JOB' });
        }
        return res.status(404).json({ message: "Gig opportunity not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Post an application
userRouter.post('/apply', applyForOpportunity);

// Get student applications
userRouter.get('/my-applications', async (req, res) => {
    try {
        const userId = req.user._id;
        const applications = await Application.find({ student: userId })
            .populate('jobId')
            .populate('gigId')
            .sort({ createdAt: -1 });
        res.status(200).json({ payload: applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});