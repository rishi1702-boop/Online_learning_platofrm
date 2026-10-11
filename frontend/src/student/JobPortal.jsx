import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiArrowRight,
  FiSearch,
  FiFileText,
  FiExternalLink,
  FiTag,
  FiUser
} from "react-icons/fi";

export default function JobPortal() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("JOBS");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPortalData = async () => {
      setLoading(true);
      try {
        const [jobsRes, gigsRes, appsRes] = await Promise.all([
          axiosInstance.get("/user-api/jobs"),
          axiosInstance.get("/user-api/gigs"),
          axiosInstance.get("/user-api/my-applications").catch(() => ({ data: { payload: [] } }))
        ]);
        setJobs(jobsRes.data.payload || []);
        setGigs(gigsRes.data.payload || []);
        setMyApplications(appsRes.data.payload || []);
      } catch (error) {
        toast.error("Failed to load opportunities.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortalData();
  }, []);

  // Filter based on search query
  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.requiredSkills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGigs = gigs.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.requiredSkills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const isApplied = (oppId) => {
    return myApplications.some(
      app => app.jobId?._id === oppId || app.jobId === oppId || app.gigId?._id === oppId || app.gigId === oppId
    );
  };

  const getApplicationStatus = (oppId) => {
    const found = myApplications.find(
      app => app.jobId?._id === oppId || app.jobId === oppId || app.gigId?._id === oppId || app.gigId === oppId
    );
    return found ? found.status : null;
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium text-lg">Loading opportunities & applications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
            <FiCheckCircle /> Startup Skill-to-Income Engine • No Corporate Bonds
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Startup Internships & Career Portal
          </h1>
          <p className="text-violet-200 text-base leading-relaxed">
            Convert the skills you learn into real income with emerging startups! Gain hands-on experience, direct founder networking, and monthly stipends without cutthroat MNC filtering.
          </p>
        </div>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setTab("GIGS")}
            className={`px-5 py-2.5 font-bold text-sm rounded-xl transition ${
              tab === "GIGS"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Startup Internships & Mini-Tasks ({gigs.length})
          </button>

          <button
            onClick={() => setTab("JOBS")}
            className={`px-5 py-2.5 font-bold text-sm rounded-xl transition ${
              tab === "JOBS"
                ? "bg-white text-violet-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Full-Time Jobs ({jobs.length})
          </button>

          <button
            onClick={() => setTab("APPLICATIONS")}
            className={`px-5 py-2.5 font-bold text-sm rounded-xl transition ${
              tab === "APPLICATIONS"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            My Applications ({myApplications.length})
          </button>
        </div>

        {tab !== "APPLICATIONS" && (
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or skill..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
            />
          </div>
        )}
      </div>

      {/* TAB 1: FULL-TIME JOBS */}
      {tab === "JOBS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => {
            const company = job.companyName || (job.employer ? `${job.employer.firstName} ${job.employer.lastName}` : "TechCorp Global");
            const applied = isApplied(job._id);
            const status = getApplicationStatus(job._id);

            return (
              <div
                key={job._id}
                className="group border border-slate-200/90 p-6 rounded-3xl shadow-sm bg-white hover:shadow-xl hover:border-violet-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition">
                        {company.charAt(0)}
                      </div>
                      <div>
                        <h3
                          onClick={() => navigate(`/jobs/${job._id}`)}
                          className="text-xl font-bold text-slate-900 hover:text-violet-600 cursor-pointer transition"
                        >
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">
                          {company}
                        </p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                      {job.type || "Full-time"}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 mb-5">
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <FiMapPin className="text-violet-600" /> {job.location || "Bengaluru (Hybrid)"}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-bold text-slate-800">
                      <FiDollarSign className="text-emerald-600" /> {job.ctc || "₹8 - ₹14 LPA"}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <FiClock className="text-amber-600" /> {job.experienceRequired || "0 - 1 Yrs"}
                    </span>
                  </div>

                  {/* Required Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.requiredSkills?.map((s) => (
                      <span
                        key={s}
                        className="bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-violet-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="flex-1 bg-violet-600 text-white font-bold py-2.5 rounded-xl hover:bg-violet-700 transition flex items-center justify-center gap-2 text-sm shadow-md shadow-violet-200"
                  >
                    <FiBriefcase /> View Details & Apply
                  </button>

                  {applied ? (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0">
                      <FiCheckCircle /> Applied ({status || "Pending"})
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-200">
              <p className="text-slate-500 font-medium">No job opportunities matched your search criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: STIPEND-BASED GIGS */}
      {tab === "GIGS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGigs.map((gig) => {
            const company = gig.companyName || "DevStudio Micro-Gigs";
            const applied = isApplied(gig._id);
            const status = getApplicationStatus(gig._id);

            return (
              <div
                key={gig._id}
                className="group border border-slate-200/90 p-6 rounded-3xl shadow-sm bg-white hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition">
                        {company.charAt(0)}
                      </div>
                      <div>
                        <h3
                          onClick={() => navigate(`/gigs/${gig._id}`)}
                          className="text-xl font-bold text-slate-900 hover:text-emerald-600 cursor-pointer transition"
                        >
                          {gig.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" /> Open to All Learners
                          </span>
                          <span className="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                            Zero Bond
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <FiDollarSign /> {gig.stipendText || `₹${gig.stipend?.min || 5000} - ₹${gig.stipend?.max || 10000}`}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {gig.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 mb-5">
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <FiClock className="text-amber-600" /> {gig.duration || "2 - 3 Weeks"}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <FiBriefcase className="text-slate-500" /> {company}
                    </span>
                  </div>

                  {/* Required Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {gig.requiredSkills?.map((s) => (
                      <span
                        key={s}
                        className="bg-amber-50 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/gigs/${gig._id}`)}
                    className="flex-1 bg-amber-500 text-white font-bold py-2.5 rounded-xl hover:bg-amber-600 transition flex items-center justify-center gap-2 text-sm shadow-md shadow-amber-200"
                  >
                    <FiCheckCircle /> View Details & Apply
                  </button>

                  {applied ? (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0">
                      <FiCheckCircle /> Applied ({status || "Pending"})
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}

          {filteredGigs.length === 0 && (
            <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-200">
              <p className="text-slate-500 font-medium">No gigs available right now.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY APPLICATIONS */}
      {tab === "APPLICATIONS" && (
        <div className="space-y-4">
          {myApplications.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
              <FiFileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No applications submitted yet</h3>
              <p className="text-slate-500 text-sm mb-6">Explore the full-time jobs and micro-gigs above to submit your credentials.</p>
              <button
                onClick={() => setTab("JOBS")}
                className="bg-violet-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-violet-700 transition text-sm"
              >
                Browse Open Roles
              </button>
            </div>
          ) : (
            myApplications.map((app) => {
              const opportunity = app.jobId || app.gigId;
              const isJobType = app.type === "JOB";
              const detailPath = isJobType ? `/jobs/${opportunity?._id}` : `/gigs/${opportunity?._id}`;

              return (
                <div
                  key={app._id}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                      isJobType ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {opportunity?.title?.charAt(0) || "A"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-slate-900">{opportunity?.title || "Opportunity Opening"}</h4>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isJobType ? "bg-violet-50 text-violet-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          {app.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">
                        Applied on {new Date(app.createdAt).toLocaleDateString()} • Candidate: {app.fullName} ({app.email})
                      </p>
                      {app.coverLetter && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg max-w-xl">
                          "{app.coverLetter}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      app.status === "ACCEPTED"
                        ? "bg-emerald-100 text-emerald-800"
                        : app.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      Status: {app.status || "PENDING"}
                    </span>

                    {opportunity?._id && (
                      <button
                        onClick={() => navigate(detailPath)}
                        className="text-xs text-violet-600 hover:text-violet-800 font-bold flex items-center gap-1"
                      >
                        View Details <FiArrowRight />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

    </div>
  );
}
