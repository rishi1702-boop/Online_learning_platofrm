import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiArrowLeft,
  FiAward,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiGlobe,
  FiGithub,
  FiAlertCircle,
  FiShield,
  FiCheck,
  FiExternalLink,
  FiSend
} from "react-icons/fi";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [oppType, setOppType] = useState("JOB");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [existingApplication, setExistingApplication] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Application Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    portfolioUrl: "",
    githubUrl: "",
    experienceLevel: "Fresher",
    coverLetter: "",
    agreedToTerms: false
  });

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        let currentUser = null;
        try {
          const profileRes = await axiosInstance.get("/user-api/profile");
          currentUser = profileRes.data.payload;
          setUser(currentUser);
        } catch {
          const cached = JSON.parse(localStorage.getItem("user") || "null");
          currentUser = cached;
          setUser(cached);
        }

        // Try fetching opportunity as Job first, fallback to Gig
        let oppData = null;
        let detectedType = "JOB";

        try {
          const jobRes = await axiosInstance.get(`/user-api/jobs/${id}`);
          oppData = jobRes.data.payload;
          detectedType = jobRes.data.opportunityType || "JOB";
        } catch (err) {
          // Fallback to gig endpoint
          const gigRes = await axiosInstance.get(`/user-api/gigs/${id}`);
          oppData = gigRes.data.payload;
          detectedType = gigRes.data.opportunityType || "GIG";
        }

        setOpportunity(oppData);
        setOppType(detectedType);

        // Prepopulate form with user details
        if (currentUser) {
          setFormData(prev => ({
            ...prev,
            fullName: `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim(),
            email: currentUser.email || ""
          }));
        }

        // Check if student has already applied
        try {
          const myAppsRes = await axiosInstance.get("/user-api/my-applications");
          const apps = myAppsRes.data.payload || [];
          const found = apps.find(
            app => (app.jobId?._id === id || app.jobId === id || app.gigId?._id === id || app.gigId === id)
          );
          if (found) {
            setExistingApplication(found);
          }
        } catch (appErr) {
          console.error("Failed to check existing application:", appErr);
        }
      } catch (error) {
        toast.error("Failed to load opportunity details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      toast.error("Acknowledgment required: You must review and agree to the Terms & Conditions before applying.");
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.resumeUrl.trim()) {
      toast.error("Please fill in all required fields (Name, Email, Phone, and Resume Link).");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        opportunityId: opportunity._id,
        type: oppType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        resumeUrl: formData.resumeUrl,
        portfolioUrl: formData.portfolioUrl,
        githubUrl: formData.githubUrl,
        experienceLevel: formData.experienceLevel,
        coverLetter: formData.coverLetter || "I am enthusiastic about this opportunity and ready to contribute.",
        agreedToTerms: true
      };

      const res = await axiosInstance.post("/user-api/apply", payload);
      toast.success(res.data.message || "Application submitted successfully!");
      setExistingApplication(res.data.application || {
        status: "PENDING",
        createdAt: new Date(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        resumeUrl: formData.resumeUrl,
        coverLetter: formData.coverLetter
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to submit application.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium text-lg">Loading opportunity details...</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <FiAlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Opportunity Not Found</h2>
        <p className="text-slate-500 mb-6">The position you are looking for may have expired or been removed.</p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-violet-700 transition"
        >
          <FiArrowLeft /> Back to Job Portal
        </Link>
      </div>
    );
  }

  const isJob = oppType === "JOB";
  const companyName = opportunity.companyName || (opportunity.employer ? `${opportunity.employer.firstName} ${opportunity.employer.lastName}` : "Verified Hiring Partner");
  const defaultResponsibilities = isJob ? [
    "Develop and maintain high quality, scalable web applications with clean architecture.",
    "Collaborate across design and engineering teams to transform specs into production features.",
    "Build reliable RESTful API services and integrate database models efficiently.",
    "Ensure responsiveness, cross-browser compatibility, and accessibility standards.",
    "Participate in agile sprints, peer code reviews, and continuous learning sessions."
  ] : [
    "Complete specific deliverable milestones outlined in the project brief.",
    "Write modular, tested code adhering to modern web performance standards.",
    "Provide clear documentation and demo links for project deliverables.",
    "Participate in milestone review check-ins."
  ];

  const defaultRequirements = isJob ? [
    "Solid foundation in JavaScript/TypeScript, React, Node.js, and modern databases.",
    "Understanding of state management, RESTful APIs, and frontend build tools.",
    "Familiarity with Git version control, collaborative workflows, and deployment.",
    "Proven project portfolio or verified skill roadmap completions on CourseHub.",
    "Strong communication, curiosity, and proactive problem-solving mindset."
  ] : [
    `Verified skill score of at least ${opportunity.minimumScoreRequired || 90}% in required skill assessments.`,
    "Ability to work independently and meet agreed turnaround deadlines.",
    "Strong attention to detail and polished visual design implementation."
  ];

  const defaultBenefits = [
    "Competitive compensation package with performance incentives",
    "Comprehensive healthcare and medical insurance coverage",
    "Flexible hybrid working options with flexible hours",
    "Continuous learning allowance for courses, books, and certifications",
    "Mentorship from experienced senior engineering staff"
  ];

  const defaultTerms = [
    "Applicant certifies that all submitted credentials, project URLs, and assessment scores are genuine.",
    "Selected candidates agree to verify qualifications through CourseHub Skill Passport & background check.",
    "By submitting an application, you consent to sharing your profile and contact information with the employer.",
    "CourseHub strictly enforces fair hiring practices with zero tolerance for fraudulent submissions."
  ];

  const responsibilities = (opportunity.responsibilities && opportunity.responsibilities.length > 0)
    ? opportunity.responsibilities
    : (isJob ? defaultResponsibilities : (opportunity.deliverables && opportunity.deliverables.length > 0 ? opportunity.deliverables : defaultResponsibilities));

  const requirements = (opportunity.requirements && opportunity.requirements.length > 0)
    ? opportunity.requirements
    : defaultRequirements;

  const benefits = (opportunity.benefits && opportunity.benefits.length > 0)
    ? opportunity.benefits
    : defaultBenefits;

  const terms = (opportunity.termsAndConditions && opportunity.termsAndConditions.length > 0)
    ? opportunity.termsAndConditions
    : defaultTerms;

  // Eligibility evaluation
  const isRoleBasedEligible = isJob ? Boolean(user?.careerGoalProfile?.isRoleBasedLearningCompleted) : true;
  const verifiedSkills = user?.skillPassport?.verifiedSkills || [];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600 transition"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Job & Gig Portal
          </button>
        </div>

        {/* HERO HEADER CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-violet-100/50 via-purple-50/20 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Company Logo Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md shrink-0">
                {companyName.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {opportunity.title}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isJob ? "bg-emerald-100 text-emerald-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {isJob ? (opportunity.type || "Full-Time") : (opportunity.opportunityType || "Startup Internship")}
                  </span>
                  <span className="bg-violet-100 text-violet-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <FiCheckCircle className="w-3.5 h-3.5" /> Verified Role
                  </span>
                </div>

                <p className="text-base font-semibold text-slate-600 mb-3 flex items-center gap-2">
                  <FiBriefcase className="text-slate-400" /> {companyName}
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-normal">
                    Posted by {opportunity.employer?.firstName || "Hiring Team"} {opportunity.employer?.lastName || ""}
                  </span>
                </p>

                {/* Key Metadata Chips */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <FiMapPin className="text-violet-600" />
                    <span>{opportunity.location || "Bengaluru, India (Hybrid)"}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg font-bold text-slate-800">
                    <FiDollarSign className="text-emerald-600" />
                    <span>
                      {isJob
                        ? (opportunity.ctc || "₹8,00,000 - ₹14,00,000 PA")
                        : (opportunity.stipendText || `₹${opportunity.stipend?.min || 1000} - ₹${opportunity.stipend?.max || 2000}`)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <FiClock className="text-amber-600" />
                    <span>
                      {isJob
                        ? (opportunity.experienceRequired || "0 - 1 Years (Fresher / Junior)")
                        : (opportunity.duration || "2 - 3 Weeks")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Apply CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              {existingApplication ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3 rounded-2xl flex items-center gap-2.5 font-bold">
                  <FiCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-sm">Application Submitted</div>
                    <div className="text-xs font-medium text-emerald-600">Status: {existingApplication.status || "Under Review"}</div>
                  </div>
                </div>
              ) : (
                <a
                  href="#apply-section"
                  className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-violet-200 transition text-center flex items-center justify-center gap-2"
                >
                  <FiSend className="w-4 h-4" /> Apply Now
                </a>
              )}
            </div>
          </div>
        </div>

        {/* TWO COLUMN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: DETAILED INFORMATION */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview / About the Role */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiFileText className="text-violet-600" /> About the Position
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
                {opportunity.description || "Join our fast-growing engineering team to build scalable software solutions that impact millions of active learners worldwide."}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiBriefcase className="text-violet-600" /> Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications & Requirements */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiAward className="text-violet-600" /> Candidate Qualifications & Requirements
              </h2>
              <ul className="space-y-3">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      •
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills & Passport Verification */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FiCheckCircle className="text-violet-600" /> Required Skills & Verification Status
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                These skills will be matched against your CourseHub Skill Passport and assessment scores.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-4">
                {opportunity.requiredSkills?.map((skill) => {
                  const verified = verifiedSkills.find(
                    s => s.skillName?.toLowerCase() === skill.toLowerCase()
                  );
                  return (
                    <div
                      key={skill}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-semibold ${
                        verified
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <span>{skill}</span>
                      {verified ? (
                        <span className="text-xs bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                          {verified.assessmentScore}% Verified
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-normal">Skill Required</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {!isJob && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-900 flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Startup Opportunity (Open to All Learners):</span> No 90% assessment hurdle and zero corporate bonds! Startups offer this role to give you hands-on production experience, direct mentorship, and a financial stipend while you learn.
                  </div>
                </div>
              )}
            </div>

            {/* Benefits & Perks */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiShield className="text-violet-600" /> {isJob ? "Compensation & Benefits" : "Internship Perks & Financial Stipend"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-slate-700 text-sm font-medium flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold">★</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Terms & Conditions */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FiShield className="text-violet-600" /> Opportunity Terms & Conditions
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Please review these stipulations thoroughly prior to submitting your formal application.
              </p>
              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
                {terms.map((t, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-slate-400">{idx + 1}.</span>
                    <span>{t}</span>
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: APPLICATION FORM */}
          <div className="lg:col-span-1" id="apply-section">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-lg">
              
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <FiSend className="text-violet-600" /> Apply for Position
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Complete the application form below to submit your profile directly to {companyName}.
                </p>
              </div>

              {/* ELIGIBILITY CHECKS */}
              {isJob && !isRoleBasedEligible && (
                <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <FiAlertCircle className="w-4 h-4 text-amber-600" />
                    Role-Based Roadmap Required
                  </div>
                  <p className="text-amber-800 mb-2">
                    Full-time opportunities require students to complete their designated Role-Based Learning Roadmap.
                  </p>
                  <Link
                    to="/learning-paths"
                    className="text-violet-700 font-bold underline inline-flex items-center gap-1 hover:text-violet-800"
                  >
                    View Learning Roadmaps <FiExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {existingApplication ? (
                /* ALREADY APPLIED VIEW */
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1 text-sm">
                      <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                      Application Under Review
                    </div>
                    <p className="text-xs text-emerald-700">
                      You have already applied for this opening. The hiring team at {companyName} will contact you via email or phone.
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 space-y-2 border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                    <div>
                      <span className="font-semibold text-slate-500">Applicant:</span> {existingApplication.fullName || user?.firstName}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Email:</span> {existingApplication.email || user?.email}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Current Status:</span>{" "}
                      <span className="font-bold text-violet-700">{existingApplication.status || "PENDING"}</span>
                    </div>
                    {existingApplication.createdAt && (
                      <div>
                        <span className="font-semibold text-slate-500">Submitted On:</span>{" "}
                        {new Date(existingApplication.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/jobs"
                    className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition text-sm"
                  >
                    Browse Other Opportunities
                  </Link>
                </div>
              ) : (
                /* FORM SUBMISSION VIEW */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 9876543210"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Resume / Portfolio Link */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Resume Link (Google Drive / LinkedIn / PDF) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiFileText className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="url"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                        required
                        placeholder="https://drive.google.com/your-resume"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* GitHub Profile (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      GitHub Profile URL (Optional)
                    </label>
                    <div className="relative">
                      <FiGithub className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Portfolio Website (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Portfolio Website URL (Optional)
                    </label>
                    <div className="relative">
                      <FiGlobe className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        placeholder="https://myportfolio.dev"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition text-slate-700 font-medium"
                    >
                      <option value="Fresher">Fresher / Student (0 Years)</option>
                      <option value="Junior">Junior (0 - 1 Years)</option>
                      <option value="Mid-Level">Mid-Level (1 - 3 Years)</option>
                      <option value="Freelancer">Experienced Freelancer</option>
                    </select>
                  </div>

                  {/* Cover Letter / Pitch */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cover Letter / Why are you a good fit?
                    </label>
                    <textarea
                      name="coverLetter"
                      rows={3}
                      value={formData.coverLetter}
                      onChange={handleChange}
                      placeholder="Highlight your relevant skills, projects, and motivations for applying..."
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition resize-none"
                    ></textarea>
                  </div>

                  {/* Terms & Conditions Acknowledgment Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-normal select-none">
                      <input
                        type="checkbox"
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleChange}
                        required
                        className="mt-0.5 w-4 h-4 text-violet-600 rounded border-slate-300 focus:ring-violet-500"
                      />
                      <span>
                        I acknowledge and agree to the <span className="font-bold text-slate-900">Terms & Conditions</span>. I verify that all submitted info is accurate.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-4 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-200 transition flex items-center justify-center gap-2 text-sm"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <FiSend /> Submit Formal Application
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
