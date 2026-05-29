import { Link } from "react-router-dom";

function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const linkClass =
    "text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block";

  return (
    <footer className="relative mt-20 overflow-hidden">

      {/* ── Gradient banner / CTA Section ── */}
      <div className="relative bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Start your learning journey today
            </h2>
            <p className="mt-2 text-violet-200 text-sm md:text-base max-w-lg">
              Join thousands of learners and instructors on CourseHub — your gateway to world-class education, anywhere, anytime.
            </p>
          </div>
          {!user ? (
            <div className="flex gap-3 shrink-0">
              <Link
                to="/register"
                className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-violet-50 transition-all duration-300 shadow-lg shadow-violet-900/30 hover:shadow-xl hover:shadow-violet-900/40 hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="border border-white/40 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to={
                role === "STUDENT"
                  ? "/student-dashboard"
                  : role === "INSTRUCTOR"
                  ? "/instructor-dashboard"
                  : "/admin-dashboard"
              }
              className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-violet-50 transition-all duration-300 shadow-lg shadow-violet-900/30 hover:shadow-xl hover:shadow-violet-900/40 hover:-translate-y-0.5 shrink-0"
            >
              Go to Dashboard →
            </Link>
          )}
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="bg-[#111113] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

          {/* Logo + Tagline + Link Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">

            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link to="/" className="inline-block group">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-indigo-300 transition-all duration-300">
                  CourseHub
                </span>
              </Link>
              <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xs">
                Empowering learners and educators with cutting-edge courses, interactive content, and a vibrant community.
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex gap-3">
                {[
                  { label: "Twitter", d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                  { label: "GitHub", d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
                  { label: "LinkedIn", d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/40 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={social.d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column — Quick Links (role-based) */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className={linkClass}>Home</Link></li>

                {!user && (
                  <>
                    <li><Link to="/login" className={linkClass}>Login</Link></li>
                    <li><Link to="/register" className={linkClass}>Register</Link></li>
                  </>
                )}

                {role === "STUDENT" && (
                  <>
                    <li><Link to="/student-dashboard" className={linkClass}>Dashboard</Link></li>
                    <li><Link to="/my-courses" className={linkClass}>My Courses</Link></li>
                    <li><Link to="/all-courses" className={linkClass}>All Courses</Link></li>
                    <li><Link to="/learning-paths" className={linkClass}>Learning Paths</Link></li>
                    <li><Link to="/profile" className={linkClass}>My Profile</Link></li>
                  </>
                )}

                {role === "INSTRUCTOR" && (
                  <>
                    <li><Link to="/instructor-dashboard" className={linkClass}>Instructor Panel</Link></li>
                    <li><Link to="/instructor-my-courses" className={linkClass}>My Courses</Link></li>
                    <li><Link to="/create-course" className={linkClass}>Create Course</Link></li>
                    <li><Link to="/instructor-reviews" className={linkClass}>Reviews</Link></li>
                    <li><Link to="/instructor-profile" className={linkClass}>My Profile</Link></li>
                  </>
                )}

                {role === "ADMIN" && (
                  <>
                    <li><Link to="/admin-dashboard" className={linkClass}>Dashboard</Link></li>
                    <li><Link to="/admin/users" className={linkClass}>Manage Users</Link></li>
                    <li><Link to="/admin/courses" className={linkClass}>Manage Courses</Link></li>
                    <li><Link to="/admin/analytics" className={linkClass}>Analytics</Link></li>
                    <li><Link to="/admin/settings" className={linkClass}>Settings</Link></li>
                  </>
                )}
              </ul>
            </div>

            {/* Column — Discover */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Discover</h3>
              <ul className="space-y-3">
                {!user && (
                  <li><Link to="/register" className={linkClass}>Teach on CourseHub</Link></li>
                )}
                {role === "STUDENT" && (
                  <>
                    <li><Link to="/all-courses" className={linkClass}>Browse Courses</Link></li>
                    <li><Link to="/learning-paths" className={linkClass}>Learning Paths</Link></li>
                  </>
                )}
                {role === "INSTRUCTOR" && (
                  <>
                    <li><Link to="/create-course" className={linkClass}>Create a Course</Link></li>
                    <li><Link to="/instructor-my-courses" className={linkClass}>Manage Courses</Link></li>
                  </>
                )}
                {role === "ADMIN" && (
                  <>
                    <li><Link to="/admin/appeals" className={linkClass}>Appeals</Link></li>
                    <li><Link to="/admin/settings" className={linkClass}>Platform Settings</Link></li>
                  </>
                )}
                <li><Link to="/about-us" className={linkClass}>About us</Link></li>
                <li><Link to="/contact" className={linkClass}>Contact</Link></li>
              </ul>
            </div>

            {/* Column — Legal */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
                <li><Link to="/terms-and-services" className={linkClass}>Terms of Service</Link></li>
                <li><Link to="/" className={linkClass}>Accessibility</Link></li>
                <li><Link to="/" className={linkClass}>Cookie Policy</Link></li>
              </ul>
            </div>

          </div>

          {/* ── Divider + Copyright ── */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} CourseHub Inc. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Made with <span className="text-red-400">real time analytics</span> for learners everywhere
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;