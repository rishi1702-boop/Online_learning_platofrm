import React, { useState, useEffect, useCallback, useMemo } from "react";
import { axiosInstance } from "../api/axiosInstance";
import {
  FiRefreshCw, FiUsers, FiBookOpen, FiStar, FiTrendingUp,
  FiUserCheck, FiUserX, FiShield, FiBarChart2, FiAward, FiActivity
} from "react-icons/fi";
import {
  PieChart, Pie, Cell, Legend, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import AdminLayout from "./AdminLayout";

const PIE_COLORS = ["#7c3aed", "#3b82f6", "#ef4444"];

/* ── Sub-components ───────────────────────────── */

const TopCoursesPanel = ({ courses }) => {
  const sorted = [...courses]
    .sort((a, b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0))
    .slice(0, 6);
  const maxEnrolled = sorted[0]?.studentsEnrolled || 1;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-lg text-slate-800 mb-1 flex items-center gap-2">
        <FiAward className="text-amber-500" /> Top Enrolled Courses
      </h3>
      <p className="text-xs text-slate-400 mb-5">Ranked by total student enrollment</p>
      {sorted.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-slate-400 text-sm">No course data available</div>
      ) : (
        <div className="space-y-4">
          {sorted.map((course, idx) => {
            const pct = Math.round(((course.studentsEnrolled || 0) / maxEnrolled) * 100);
            const barColors = ["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-indigo-500"];
            return (
              <div key={course._id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-slate-400 flex-shrink-0 w-5">#{idx + 1}</span>
                    <p className="text-sm font-semibold text-slate-700 truncate">{course.title}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="text-xs text-orange-500 font-bold flex items-center gap-1">
                      <FiStar size={11} /> {course.rating?.toFixed(1) || "—"}
                    </span>
                    <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg">
                      {course.studentsEnrolled || 0}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColors[idx % barColors.length]} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const PlatformRatiosPanel = ({ stats }) => {
  const activeUserRatio   = stats?.totalUsers    ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)       : "0.0";
  const courseActivePct   = stats?.totalCourses  ? ((stats.activeCourses / stats.totalCourses) * 100).toFixed(1)   : "0.0";
  const enrollPerUser     = stats?.totalUsers    ? (stats.totalEnrollments / stats.totalUsers).toFixed(2)           : "0.00";
  const reviewsPerCourse  = stats?.totalCourses  ? (stats.totalReviews / stats.totalCourses).toFixed(1)            : "0.0";

  const ratios = [
    { label: "User Activation Rate",    val: activeUserRatio + "%",   bar: parseFloat(activeUserRatio),  color: "bg-emerald-500", desc: "Active / total users" },
    { label: "Course Activation Rate",  val: courseActivePct + "%",   bar: parseFloat(courseActivePct),  color: "bg-violet-500",  desc: "Active / total courses" },
    { label: "Enrollments per User",    val: enrollPerUser,            bar: Math.min(parseFloat(enrollPerUser) * 20, 100), color: "bg-blue-500",    desc: "Avg courses per user" },
    { label: "Reviews per Course",      val: reviewsPerCourse,         bar: Math.min(parseFloat(reviewsPerCourse) * 20, 100), color: "bg-amber-500",   desc: "Avg reviews per course" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-lg text-slate-800 mb-1 flex items-center gap-2">
        <FiActivity className="text-emerald-500" /> Platform Engagement Ratios
      </h3>
      <p className="text-xs text-slate-400 mb-5">Key platform health indicators at a glance</p>
      <div className="space-y-5">
        {ratios.map(({ label, val, bar, color, desc }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="text-sm font-semibold text-slate-700">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
              <span className="text-xl font-bold text-slate-800">{val}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(bar, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Component ────────────────────────────── */

function AdminAnalytics() {
  const [stats,   setStats]   = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, coursesRes] = await Promise.all([
        axiosInstance.get("/admin-api/stats"),
        axiosInstance.get("/admin-api/courses")
      ]);
      setStats(statsRes.data.payload);
      setCourses(coursesRes.data.payload || []);
    } catch (err) {
      console.error("Stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const roleDistribution = useMemo(() => {
    if (!stats) return [];
    return [
      { name: "Instructors", value: stats.instructors },
      { name: "Students",    value: stats.students    },
      { name: "Admins",      value: stats.admins      },
    ];
  }, [stats]);

  const userStatusData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: "Active",   value: stats.activeUsers   },
      { name: "Inactive", value: stats.inactiveUsers },
    ];
  }, [stats]);

  const courseStatusData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: "Active",   value: stats.activeCourses                        },
      { name: "Inactive", value: stats.totalCourses - stats.activeCourses   },
    ];
  }, [stats]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Platform Analytics</h2>
          <p className="text-sm text-slate-400 mt-0.5">Deep insights into platform performance</p>
        </div>
        <button onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-xl text-sm font-semibold hover:bg-violet-100 transition">
          <FiRefreshCw size={14} /> Refresh
        </button>
      </header>

      <main className="flex-1 p-8 overflow-auto space-y-8">

        {/* ── KPI CARDS ─────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: <FiUsers />,      label: "Total Users",        val: stats?.totalUsers,       accent: "from-violet-500 to-indigo-500", shadow: "shadow-violet-200" },
            { icon: <FiBookOpen />,   label: "Total Courses",      val: stats?.totalCourses,     accent: "from-blue-500 to-cyan-500",     shadow: "shadow-blue-200"   },
            { icon: <FiTrendingUp />, label: "Total Enrollments",  val: stats?.totalEnrollments, accent: "from-emerald-500 to-teal-500",  shadow: "shadow-emerald-200"},
            { icon: <FiStar />,       label: "Avg. Rating",        val: stats?.avgRating,        accent: "from-amber-500 to-orange-500",  shadow: "shadow-amber-200"  },
          ].map(({ icon, label, val, accent, shadow }) => (
            <div key={label} className={`bg-gradient-to-br ${accent} p-5 rounded-2xl text-white shadow-lg ${shadow} hover:-translate-y-0.5 transition-transform`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold opacity-80">{label}</span>
                {React.cloneElement(icon, { size: 18, className: "opacity-80" })}
              </div>
              <p className="text-3xl font-bold">{val ?? "—"}</p>
            </div>
          ))}
        </div>

        {/* ── TOP COURSES + PLATFORM RATIOS (replaces User Growth chart) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopCoursesPanel courses={courses} />
          <PlatformRatiosPanel stats={stats} />
        </div>

        {/* ── MIDDLE ROW: 3 charts ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Role Distribution Pie */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-base text-slate-800 mb-1">Role Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Users by role type</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {roleDistribution.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Status Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-base text-slate-800 mb-1">User Status</h3>
            <p className="text-xs text-slate-400 mb-4">Active vs inactive accounts</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userStatusData} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12)" }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {userStatusData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "#10b981" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Status Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-base text-slate-800 mb-1">Course Status</h3>
            <p className="text-xs text-slate-400 mb-4">Active vs inactive courses</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseStatusData} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12)" }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {courseStatusData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "#7c3aed" : "#94a3b8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── BREAKDOWN CARDS ──────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* User Breakdown */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
              <FiUsers size={16} className="text-violet-500" /> User Breakdown
            </h4>
            <p className="text-xs text-slate-400 mb-5">Proportion of each user role</p>
            <div className="space-y-4">
              {[
                { label: "Students",    val: stats?.students,    total: stats?.totalUsers, color: "bg-blue-500"   },
                { label: "Instructors", val: stats?.instructors, total: stats?.totalUsers, color: "bg-violet-500" },
                { label: "Admins",      val: stats?.admins,      total: stats?.totalUsers, color: "bg-red-500"    },
              ].map(({ label, val, total, color }) => {
                const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                return (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-600 font-medium">{label}</span>
                      <span className="font-bold text-slate-800">{val} <span className="text-xs text-slate-400 font-normal">({pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Breakdown */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
              <FiBookOpen size={16} className="text-blue-500" /> Course Breakdown
            </h4>
            <p className="text-xs text-slate-400 mb-5">Course visibility stats</p>
            <div className="space-y-4">
              {[
                { label: "Active Courses",   val: stats?.activeCourses,                        total: stats?.totalCourses, color: "bg-emerald-500" },
                { label: "Inactive Courses", val: (stats?.totalCourses - stats?.activeCourses), total: stats?.totalCourses, color: "bg-slate-400"   },
              ].map(({ label, val, total, color }) => {
                const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                return (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-600 font-medium">{label}</span>
                      <span className="font-bold text-slate-800">{val} <span className="text-xs text-slate-400 font-normal">({pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
              <FiBarChart2 size={16} className="text-emerald-500" /> Platform Health
            </h4>
            <p className="text-xs text-slate-400 mb-5">Key performance metrics</p>
            <div className="space-y-3">
              {[
                { label: "Avg. Rating",       val: stats?.avgRating,        bg: "bg-amber-50",   text: "text-amber-700",   icon: <FiStar size={14} />       },
                { label: "Total Enrollments", val: stats?.totalEnrollments, bg: "bg-blue-50",    text: "text-blue-700",    icon: <FiTrendingUp size={14} />  },
                { label: "Total Reviews",     val: stats?.totalReviews,     bg: "bg-violet-50",  text: "text-violet-700",  icon: <FiShield size={14} />      },
                { label: "Active Users",      val: stats?.activeUsers,      bg: "bg-emerald-50", text: "text-emerald-700", icon: <FiUserCheck size={14} />   },
                { label: "Inactive Users",    val: stats?.inactiveUsers,    bg: "bg-red-50",     text: "text-red-700",     icon: <FiUserX size={14} />       },
              ].map(({ label, val, bg, text, icon }) => (
                <div key={label} className={`flex justify-between items-center px-4 py-3 ${bg} rounded-xl`}>
                  <span className={`text-sm font-medium ${text} flex items-center gap-2`}>
                    {icon} {label}
                  </span>
                  <span className={`font-bold ${text}`}>{val ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </AdminLayout>
  );
}

export default AdminAnalytics;
