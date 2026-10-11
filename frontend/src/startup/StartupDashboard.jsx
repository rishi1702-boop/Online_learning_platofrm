import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiBriefcase,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiDollarSign,
  FiMapPin,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiFileText,
  FiGithub,
  FiGlobe,
  FiShield,
  FiXCircle,
  FiMessageSquare,
  FiSearch
} from "react-icons/fi";

export default function StartupDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activePostings: 0,
    totalPostings: 0,
    totalApplications: 0,
    acceptedApplications: 0,
    reviewingApplications: 0
  });
  const [postings, setPostings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("APPLICATIONS"); // APPLICATIONS or POSTINGS
  const [searchQuery, setSearchQuery] = useState("");

  // Feedback modal state
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, postingsRes, appsRes] = await Promise.all([
        axiosInstance.get("/startup-api/stats").catch(() => ({ data: { payload: {} } })),
        axiosInstance.get("/startup-api/my-postings").catch(() => ({ data: { payload: [] } })),
        axiosInstance.get("/startup-api/applications").catch(() => ({ data: { payload: [] } }))
      ]);

      setStats(statsRes.data.payload || {});
      setPostings(postingsRes.data.payload || []);
      setApplications(appsRes.data.payload || []);
    } catch (error) {
      toast.error("Failed to load startup dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusUpdate = async (appId, newStatus, customFeedback) => {
    setUpdatingId(appId);
    try {
      const res = await axiosInstance.patch(`/startup-api/application/${appId}/status`, {
        status: newStatus,
        employerFeedback: customFeedback !== undefined ? customFeedback : feedbackNote
      });
      toast.success(res.data.message || `Status updated to ${newStatus}`);
      setSelectedApp(null);
      setFeedbackNote("");
      fetchDashboardData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActive = async (postingId) => {
    try {
      const res = await axiosInstance.patch(`/startup-api/posting/${postingId}/toggle`);
      toast.success(res.data.message);
      fetchDashboardData();
    } catch (error) {
      toast.error("Failed to update posting status");
    }
  };

  const filteredApplications = applications.filter(app => {
    const nameMatch = app.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
    const roleMatch = app.gigId?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = app.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || roleMatch || emailMatch;
  });

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium text-lg">Loading Startup Portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
                <FiShield /> Startup Talent & Micro-Internship Engine
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                Startup Founder Portal
              </h1>
              <p className="text-violet-200 text-sm sm:text-base leading-relaxed">
                Empower motivated student learners to convert real skills into production work. Hire without corporate MNC red tape, zero bonds, and affordable milestone stipends.
              </p>
            </div>

            <Link
              to="/startup/post-internship"
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-violet-900/50 transition flex items-center gap-2 text-sm shrink-0"
            >
              <FiPlus className="w-5 h-5" /> Post New Internship / Mini-Task
            </Link>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Roles</span>
              <span className="p-2 bg-violet-50 text-violet-700 rounded-xl"><FiBriefcase /></span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.activePostings || 0}</div>
            <p className="text-xs text-slate-400 mt-1">Open for applications</p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Applicants</span>
              <span className="p-2 bg-blue-50 text-blue-700 rounded-xl"><FiUsers /></span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalApplications || 0}</div>
            <p className="text-xs text-slate-400 mt-1">Student submissions</p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hired / Accepted</span>
              <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl"><FiCheckCircle /></span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.acceptedApplications || 0}</div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Gaining experience</p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">In Review</span>
              <span className="p-2 bg-amber-50 text-amber-700 rounded-xl"><FiClock /></span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.reviewingApplications || 0}</div>
            <p className="text-xs text-slate-400 mt-1">Under evaluation</p>
          </div>
        </div>

        {/* TABS & SEARCH */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("APPLICATIONS")}
              className={`px-5 py-2.5 font-bold text-sm rounded-xl transition ${
                activeTab === "APPLICATIONS"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Candidate Applications ({applications.length})
            </button>

            <button
              onClick={() => setActiveTab("POSTINGS")}
              className={`px-5 py-2.5 font-bold text-sm rounded-xl transition ${
                activeTab === "POSTINGS"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              My Posted Roles ({postings.length})
            </button>
          </div>

          {activeTab === "APPLICATIONS" && (
            <div className="relative w-full sm:w-72">
              <FiSearch className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate or role..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* TAB 1: APPLICATIONS LIST */}
        {activeTab === "APPLICATIONS" && (
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                <FiUsers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No candidate applications yet</h3>
                <p className="text-slate-500 text-sm mb-6">
                  When students learning skills on CourseHub apply to your micro-internships, their profiles will appear here for your review.
                </p>
                <Link
                  to="/startup/post-internship"
                  className="bg-violet-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-violet-700 transition text-sm inline-flex items-center gap-2"
                >
                  <FiPlus /> Post an Opportunity
                </Link>
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    {/* Candidate Identity */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                        {app.fullName?.charAt(0) || "S"}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-900">{app.fullName}</h3>
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            app.status === "ACCEPTED"
                              ? "bg-emerald-100 text-emerald-800"
                              : app.status === "REJECTED"
                              ? "bg-rose-100 text-rose-800"
                              : app.status === "REVIEWING"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {app.status || "PENDING"}
                          </span>
                          <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded">
                            {app.experienceLevel || "Fresher"}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-violet-700 mb-2">
                          Applied for: {app.gigId?.title || app.jobId?.title || "Startup Opportunity"}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5"><FiMail /> {app.email}</span>
                          <span className="flex items-center gap-1.5"><FiPhone /> {app.phone}</span>
                          <span className="flex items-center gap-1.5"><FiClock /> {new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 self-end lg:self-center shrink-0">
                      {app.resumeUrl && (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                        >
                          <FiFileText /> View Resume <FiExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {app.githubUrl && (
                        <a
                          href={app.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition"
                        >
                          <FiGithub /> GitHub
                        </a>
                      )}

                      {app.portfolioUrl && (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition"
                        >
                          <FiGlobe /> Portfolio
                        </a>
                      )}

                      <button
                        onClick={() => handleStatusUpdate(app._id, "ACCEPTED", "Congratulations! The startup has accepted your profile for this micro-internship.")}
                        disabled={updatingId === app._id || app.status === "ACCEPTED"}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
                      >
                        <FiCheckCircle /> Accept & Hire
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(app._id, "REVIEWING", "Your profile is shortlisted and currently under technical review.")}
                        disabled={updatingId === app._id || app.status === "REVIEWING"}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                      >
                        <FiClock /> Shortlist
                      </button>

                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setFeedbackNote(app.employerFeedback || "");
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition"
                        title="Send Feedback Note"
                      >
                        <FiMessageSquare /> Note
                      </button>
                    </div>
                  </div>

                  {/* Cover Letter / Pitch */}
                  {app.coverLetter && (
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-xs text-slate-600">
                      <span className="font-bold text-slate-700 block mb-1">Candidate Note / Why they are ready:</span>
                      <p className="italic leading-relaxed">"{app.coverLetter}"</p>
                    </div>
                  )}

                  {/* Employer Feedback Note if present */}
                  {app.employerFeedback && (
                    <div className="bg-violet-50/70 border border-violet-100 p-3 rounded-2xl text-xs text-violet-800">
                      <span className="font-bold">Your Note to Student:</span> "{app.employerFeedback}"
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: POSTINGS LIST */}
        {activeTab === "POSTINGS" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postings.map((posting) => (
              <div
                key={posting._id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full mb-1 inline-block">
                        {posting.opportunityType || "Micro-Internship"}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">{posting.title}</h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {posting.startupStage || "Early-Stage Startup"} • {posting.companyName}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleActive(posting._id)}
                      className={`text-xs font-bold px-3 py-1 rounded-full border transition ${
                        posting.isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {posting.isActive ? "Active" : "Paused"}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {posting.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 font-semibold mb-4">
                    <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg">
                      {posting.stipendText || "Stipend Included"}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      {posting.duration || "2-4 Weeks"}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                      No Corporate Bond
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {posting.requiredSkills?.map((s) => (
                      <span key={s} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-700">
                    {posting.applicantCount || 0} Total Applicants ({posting.acceptedCount || 0} Hired)
                  </span>

                  <Link
                    to={posting.isJobModel ? `/jobs/${posting._id}` : `/gigs/${posting._id}`}
                    className="text-violet-600 hover:text-violet-800 font-bold flex items-center gap-1"
                  >
                    View Public Page <FiExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FEEDBACK MODAL */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">Send Note to {selectedApp.fullName}</h3>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500">
                This note will be sent directly to the student's notifications and reflected on their application card.
              </p>

              <textarea
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                rows={4}
                placeholder="e.g. Loved your React portfolio! Let's schedule a quick 15-minute onboarding chat on Google Meet..."
                className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none resize-none"
              ></textarea>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedApp._id, selectedApp.status, feedbackNote)}
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save & Notify Student
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
