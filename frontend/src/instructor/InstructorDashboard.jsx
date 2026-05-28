import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import {
  FiPlus, FiUsers, FiDollarSign, FiBookOpen, FiStar,
  FiTrendingUp, FiEdit3, FiBarChart2, FiCheckCircle,
  FiAlertCircle, FiAward, FiArrowRight, FiMessageSquare
} from "react-icons/fi";

const InstructorDashboard = () => {
  const [data, setData] = useState({
    stats: { totalStudents: 0, totalRevenue: 0, activeCount: 0, averageRating: "0.0" },
    categoriesData: [],
    chartData: [],
    courses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, coursesRes] = await Promise.all([
          axiosInstance.get("/instructor-api/dashboard-stats"),
          axiosInstance.get("/instructor-api/my-courses")
        ]);
        setData({
          stats: statsRes.data.payload?.stats || { totalStudents: 0, totalRevenue: 0, activeCount: 0, averageRating: "0.0" },
          categoriesData: statsRes.data.payload?.categoriesData || [],
          chartData: statsRes.data.payload?.chartData || [],
          courses: coursesRes.data.payload || []
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const { stats, courses } = data;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans text-slate-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const formattedRevenue = stats.totalRevenue >= 1000
    ? (stats.totalRevenue / 1000).toFixed(1) + "K"
    : stats.totalRevenue;
  const formattedStudents = stats.totalStudents.toLocaleString();

  // Derived data from courses
  const sortedByEnrollment = [...courses].sort((a, b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0));
  const topCourse = sortedByEnrollment[0] || null;
  const recentCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const inactiveCourses = courses.filter(c => !c.isActive);
  const unratedCourses = courses.filter(c => !c.ratingCount || c.ratingCount === 0);
  const totalLectures = courses.reduce((sum, c) => {
    return sum + (c.sections || []).reduce((s2, sec) => s2 + (sec.lectures || []).length, 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">

      {/* Sub-header */}
      <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-sm text-slate-500 mt-0.5">Welcome back! Here's what's happening with your courses.</p>
        </div>
        <Link
          to="/create-course"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-sm"
        >
          <FiPlus size={16} /> Create Course
        </Link>
      </div>

      <main className="p-8">

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Students"  value={formattedStudents}      icon={<FiUsers />}     color="bg-blue-50   text-blue-600" />
          <StatCard title="Total Revenue"   value={`₹${formattedRevenue}`} icon={<FiDollarSign />} color="bg-green-50  text-green-600" />
          <StatCard title="Active Courses"  value={stats.activeCount}       sub={`${courses.length} total`} icon={<FiBookOpen />}  color="bg-purple-50 text-purple-600" />
          <StatCard title="Average Rating"  value={stats.averageRating}     sub="across all courses" icon={<FiStar />}      color="bg-orange-50 text-orange-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN — Recent Courses + Top Course */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* TOP PERFORMING COURSE */}
            {topCourse && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <FiAward size={16} className="opacity-80" />
                  <span className="text-sm font-semibold opacity-80 uppercase tracking-wider">Top Performing Course</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold leading-snug mb-1 truncate">{topCourse.title}</h3>
                    <p className="text-sm opacity-70 mb-5 line-clamp-2">{topCourse.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <Pill icon={<FiUsers size={13} />} label={`${topCourse.studentsEnrolled || 0} enrolled`} />
                      <Pill icon={<FiStar size={13} />}  label={`${topCourse.rating?.toFixed(1) || "0.0"} rating`} />
                      <Pill icon={<FiDollarSign size={13} />} label={`₹${((topCourse.studentsEnrolled || 0) * (topCourse.price || 0)).toLocaleString()} revenue`} />
                    </div>
                  </div>
                  {topCourse.thumbnail && (
                    <img src={topCourse.thumbnail} alt={topCourse.title} className="w-24 h-24 object-cover rounded-2xl opacity-90 flex-shrink-0" />
                  )}
                </div>
                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/instructor/course/${topCourse._id}`}
                    className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition text-white text-xs font-semibold px-4 py-2 rounded-xl"
                  >
                    View Details <FiArrowRight size={13} />
                  </Link>
                  <Link
                    to={`/instructor/course/${topCourse._id}/analytics`}
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition text-white text-xs font-semibold px-4 py-2 rounded-xl"
                  >
                    Analytics <FiBarChart2 size={13} />
                  </Link>
                </div>
              </div>
            )}

            {/* RECENT COURSES TABLE */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg">Recent Courses</h3>
                <Link to="/instructor-my-courses" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                  View all <FiArrowRight size={13} />
                </Link>
              </div>
              {recentCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <FiBookOpen size={36} className="mb-3 opacity-40" />
                  <p className="text-sm">No courses yet. Create your first course!</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentCourses.map((course) => {
                    const revenue = (course.studentsEnrolled || 0) * (course.price || 0);
                    const lectureCount = (course.sections || []).reduce((s, sec) => s + (sec.lectures || []).length, 0);
                    return (
                      <Link
                        key={course._id}
                        to={`/instructor/course/${course._id}`}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition group"
                      >
                        {course.thumbnail ? (
                          <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                            <FiBookOpen size={20} className="text-blue-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-800 truncate group-hover:text-blue-600 transition">{course.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{course.category} · {course.courseLevel} · {lectureCount} lectures</p>
                        </div>
                        <div className="flex items-center gap-6 text-sm flex-shrink-0">
                          <div className="text-center hidden sm:block">
                            <p className="font-bold text-slate-800">{course.studentsEnrolled || 0}</p>
                            <p className="text-xs text-slate-400">students</p>
                          </div>
                          <div className="text-center hidden md:block">
                            <p className="font-bold text-orange-500 flex items-center gap-1">
                              <FiStar size={12} /> {course.rating?.toFixed(1) || "—"}
                            </p>
                            <p className="text-xs text-slate-400">rating</p>
                          </div>
                          <div className="text-center hidden md:block">
                            <p className="font-bold text-green-600">₹{revenue >= 1000 ? (revenue / 1000).toFixed(1) + "K" : revenue}</p>
                            <p className="text-xs text-slate-400">revenue</p>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${course.isActive ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                            {course.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <QuickAction to="/create-course"          icon={<FiPlus />}         label="Create New Course"    color="text-blue-600   bg-blue-50" />
                <QuickAction to="/instructor-my-courses"  icon={<FiEdit3 />}        label="Manage My Courses"    color="text-purple-600 bg-purple-50" />
                <QuickAction to="/instructor-reviews"     icon={<FiMessageSquare />} label="View Reviews"         color="text-orange-600 bg-orange-50" />
                <QuickAction to="/instructor-profile"     icon={<FiUsers />}        label="Edit My Profile"      color="text-indigo-600 bg-indigo-50" />
              </div>
            </div>

            {/* CONTENT SUMMARY */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-lg mb-4">Content Summary</h3>
              <div className="space-y-4">
                <SummaryRow label="Total Courses"    value={courses.length}    icon={<FiBookOpen size={15} />}    color="text-blue-500" />
                <SummaryRow label="Active Courses"   value={stats.activeCount} icon={<FiCheckCircle size={15} />} color="text-green-500" />
                <SummaryRow label="Total Lectures"   value={totalLectures}     icon={<FiTrendingUp size={15} />}  color="text-purple-500" />
                <SummaryRow label="Total Reviews"    value={courses.reduce((s, c) => s + (c.ratingCount || 0), 0)} icon={<FiStar size={15} />} color="text-orange-500" />
              </div>
            </div>

            {/* COURSE HEALTH */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-lg mb-4">Course Health</h3>
              {courses.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">No courses to check.</p>
              ) : (
                <div className="space-y-3">
                  <HealthItem
                    ok={inactiveCourses.length === 0}
                    label={inactiveCourses.length === 0 ? "All courses are active" : `${inactiveCourses.length} course${inactiveCourses.length > 1 ? "s" : ""} inactive`}
                  />
                  <HealthItem
                    ok={unratedCourses.length === 0}
                    label={unratedCourses.length === 0 ? "All courses have ratings" : `${unratedCourses.length} course${unratedCourses.length > 1 ? "s" : ""} without ratings`}
                  />
                  <HealthItem
                    ok={parseFloat(stats.averageRating) >= 4.0}
                    label={parseFloat(stats.averageRating) >= 4.0 ? "Great average rating (≥ 4.0)" : `Average rating below 4.0 (${stats.averageRating})`}
                  />
                  <HealthItem
                    ok={stats.totalStudents > 0}
                    label={stats.totalStudents > 0 ? `${formattedStudents} students enrolled` : "No students enrolled yet"}
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

/* ── Sub-components ─────────────────────────────── */

const StatCard = ({ title, value, sub, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-start">
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      {sub && <p className="text-xs text-slate-400 mt-2">{sub}</p>}
    </div>
    <div className={`p-4 rounded-2xl ${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
  </div>
);

const Pill = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-xs font-semibold">
    {icon} {label}
  </div>
);

const QuickAction = ({ to, icon, label, color }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition group"
  >
    <div className={`p-2.5 rounded-xl ${color}`}>
      {React.cloneElement(icon, { size: 16 })}
    </div>
    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition">{label}</span>
    <FiArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-slate-500 transition" />
  </Link>
);

const SummaryRow = ({ label, value, icon, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className={color}>{icon}</span>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
    <span className="font-bold text-slate-800">{value}</span>
  </div>
);

const HealthItem = ({ ok, label }) => (
  <div className="flex items-center gap-3">
    {ok
      ? <FiCheckCircle size={16} className="text-green-500 flex-shrink-0" />
      : <FiAlertCircle size={16} className="text-amber-500 flex-shrink-0" />
    }
    <span className={`text-sm ${ok ? "text-slate-600" : "text-amber-700 font-medium"}`}>{label}</span>
  </div>
);

export default InstructorDashboard;