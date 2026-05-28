import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiPlus, FiBook, FiTrash2, FiEdit3, FiUsers, FiStar,
  FiAlertTriangle, FiSend, FiX, FiClock, FiCheckCircle, FiXCircle
} from "react-icons/fi";

const levelColor = {
  Beginner: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Intermediate: "text-amber-700 bg-amber-50 border-amber-200",
  Advanced: "text-red-700 bg-red-50 border-red-200",
};

/* ── Appeal status badge ──────────────────────────── */
const AppealBadge = ({ status }) => {
  const map = {
    pending: { cls: "bg-amber-50 text-amber-700 border-amber-200", icon: <FiClock size={11} />, label: "Appeal Pending" },
    approved: { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <FiCheckCircle size={11} />, label: "Appeal Approved" },
    rejected: { cls: "bg-red-50 text-red-700 border-red-200", icon: <FiXCircle size={11} />, label: "Appeal Rejected" },
  };
  const { cls, icon, label } = map[status] || {};
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      {icon} {label}
    </span>
  );
};

/* ── Appeal Modal ─────────────────────────────────── */
const AppealModal = ({ course, onClose, onSubmit, submitting }) => {
  const [message, setMessage] = useState("");
  const minLen = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length < minLen) {
      toast.error(`Please write at least ${minLen} characters.`);
      return;
    }
    onSubmit(course._id, message.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50">
              <FiSend size={18} className="text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Submit Appeal</h3>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[260px]">{course.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition">
            <FiX size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <FiAlertTriangle size={16} className="mt-0.5 shrink-0" />
            <p>
              You only have <strong>one chance</strong> to appeal. Write a detailed explanation of why your course
              complies with platform guidelines and should be reinstated.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Request Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={7}
              placeholder="Explain in detail why your course should be reinstated. Describe the course content, confirm it meets platform policies, and address any potential concerns..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50"
            />
            <p className={`text-xs mt-1.5 text-right font-medium ${message.trim().length < minLen ? "text-red-400" : "text-emerald-500"}`}>
              {message.trim().length} / {minLen} characters minimum
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || message.trim().length < minLen}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSend size={14} />
              )}
              Submit Appeal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ── Main Component ───────────────────────────────── */
export default function InstructorMyCourses() {
  const [courses, setCourses] = useState([]);
  const [appeals, setAppeals] = useState({}); // courseId → appeal object
  const [loading, setLoading] = useState(true);
  const [appealModal, setAppealModal] = useState(null); // course object or null
  const [submitting, setSubmitting] = useState(false);

  const fetchAll = async () => {
    try {
      const [coursesRes, appealsRes] = await Promise.all([
        axiosInstance.get("/instructor-api/my-courses"),
        axiosInstance.get("/instructor-api/my-appeals"),
      ]);
      setCourses(coursesRes.data.payload || []);

      // Build lookup map: courseId → appeal
      const appealMap = {};
      (appealsRes.data.payload || []).forEach((a) => {
        if (a.course?._id) appealMap[a.course._id] = a;
      });
      setAppeals(appealMap);
    } catch (err) {
      toast.error("Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (courseId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    try {
      await axiosInstance.delete(`/instructor-api/delete-course/${courseId}`);
      toast.success("Course deleted successfully");
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete course");
    }
  };

  const handleSubmitAppeal = async (courseId, message) => {
    setSubmitting(true);
    try {
      const res = await axiosInstance.post(`/instructor-api/appeal/${courseId}`, { message });
      toast.success("Appeal submitted! The admin will review it shortly.");
      setAppeals((prev) => ({ ...prev, [courseId]: res.data.payload }));
      setAppealModal(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit appeal");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900">

      {/* Appeal Modal */}
      {appealModal && (
        <AppealModal
          course={appealModal}
          onClose={() => setAppealModal(null)}
          onSubmit={handleSubmitAppeal}
          submitting={submitting}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-slate-500 mt-1">Manage the courses you've created.</p>
        </div>
        <Link
          to="/create-course"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          <FiPlus size={18} /> Create New Course
        </Link>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBook size={32} />
          </div>
          <h2 className="text-xl font-bold mb-2">No courses yet</h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            You haven't created any courses yet. Start sharing your knowledge by creating your first course today!
          </p>
          <Link
            to="/create-course"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            <FiPlus size={18} /> Create Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => {
            const appeal = appeals[course._id];

            return (
              <div
                key={course._id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Thumbnail */}
                <div className="aspect-video relative bg-slate-100 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      <FiBook size={32} className="opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                      ₹{course.price}
                    </span>
                  </div>
                  {/* Active / Inactive badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${course.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                      {course.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${levelColor[course.courseLevel] || "bg-slate-100 text-slate-600"}`}>
                      {course.courseLevel}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2" title={course.title}>
                    {course.title}
                  </h3>

                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium"><FiUsers className="text-blue-500" /> {course.studentsEnrolled || 0}</span>
                    <span className="flex items-center gap-1.5 font-medium"><FiStar className="text-amber-400" /> {course.rating > 0 ? course.rating.toFixed(1) : "New"}</span>
                  </div>

                  {/* Appeal section — only for inactive courses */}
                  {!course.isActive && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      {!appeal ? (
                        /* No appeal yet → show button */
                        <button
                          onClick={() => setAppealModal(course)}
                          className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                        >
                          <FiSend size={14} /> Submit Appeal
                        </button>
                      ) : (
                        /* Appeal exists → show status */
                        <div className="flex flex-col gap-1">
                          <AppealBadge status={appeal.status} />
                          {appeal.status === "pending" && (
                            <p className="text-xs text-slate-400 mt-1">Awaiting admin review</p>
                          )}
                          {appeal.status === "rejected" && (
                            <p className="text-xs text-red-400 mt-1">Appeal was rejected. No further appeals allowed.</p>
                          )}
                          {appeal.status === "approved" && (
                            <p className="text-xs text-emerald-600 mt-1">Course will be reactivated shortly.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Link
                    to={`/instructor/course/${course._id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <FiEdit3 size={15} /> Manage
                  </Link>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <button
                    onClick={() => handleDelete(course._id, course.title)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FiTrash2 size={15} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
