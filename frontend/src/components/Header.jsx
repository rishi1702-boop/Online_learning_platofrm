import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          CourseHub
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-6">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-violet-600"
                  : "text-gray-700 hover:text-violet-600"
              }`
            }
          >
            Home
          </NavLink>

          {user && user.role === "STUDENT" && (
            <NavLink
              to="/student-dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-violet-600"
                    : "text-gray-700 hover:text-violet-600"
                }`
              }
            >
              My Dashboard
            </NavLink>
          )}

          {user && user.role === "STUDENT" && (
            <NavLink
              to="/all-courses"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-violet-600"
                    : "text-gray-700 hover:text-violet-600"
                }`
              }
            >
              All Courses
            </NavLink>
          )}

          {user && user.role === "STUDENT" && (
            <NavLink
              to="/learning-paths"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-violet-600"
                    : "text-gray-700 hover:text-violet-600"
                }`
              }
            >
              Learning Paths
            </NavLink>
          )}

          {user && user.role === "STUDENT" && (
            <>
              <NavLink
                to="/my-courses"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-700 hover:text-violet-600"
                  }`
                }
              >
                My Courses
              </NavLink>

              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `text-sm font-bold transition flex items-center gap-1 ${
                    isActive
                      ? "text-violet-600"
                      : "text-violet-700 hover:text-violet-900 bg-violet-50 px-2.5 py-1 rounded-lg"
                  }`
                }
              >
                Internships & Jobs
              </NavLink>
            </>
          )}

          {user && (user.role === "STARTUP" || user.role === "EMPLOYER") && (
            <>
              <NavLink
                to="/startup-dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-700 hover:text-violet-600"
                  }`
                }
              >
                Startup Portal
              </NavLink>

              <NavLink
                to="/startup/post-internship"
                className={({ isActive }) =>
                  `text-sm font-bold transition bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700`
                }
              >
                + Post Internship
              </NavLink>
            </>
          )}

          {user && user.role === "INSTRUCTOR" && (
            <>
              <NavLink
                to="/instructor-dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-700 hover:text-violet-600"
                  }`
                }
              >
                Instructor Panel
              </NavLink>

              <NavLink
                to="/instructor-my-courses"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-700 hover:text-violet-600"
                  }`
                }
              >
                My Courses
              </NavLink>
              <NavLink
                to="/instructor-reviews"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-700 hover:text-violet-600"
                  }`
                }
              >
                Reviews
              </NavLink>
            </>
          )}

          {user && user.role === "ADMIN" && (
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-violet-600"
                    : "text-gray-700 hover:text-violet-600"
                }`
              }
            >
              Admin Panel
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink
                to="/register-startup"
                className={({ isActive }) =>
                  `hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                    isActive
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200/80"
                  }`
                }
              >
                🚀 For Startups
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-700 hover:text-violet-600"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-500 transition"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <NotificationDropdown />
              
              <NavLink
                to={user.role === "INSTRUCTOR" ? "/instructor-profile" : "/profile"}
                title={`${user.firstName} ${user.lastName}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "bg-violet-100 text-violet-700"
                      : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                  }`
                }
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </div>
                <span className="hidden sm:block">{user.firstName}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

// Notification Dropdown Component
import { useState, useEffect, useRef } from "react";
import { FiBell } from "react-icons/fi";
import { axiosInstance } from "../api/axiosInstance";

function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // we need to pass this down or just use import

  useEffect(() => {
    fetchNotifications();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/user-api/notifications");
      setNotifications(res.data.payload);
      setUnreadCount(res.data.payload.filter(n => !n.isRead).length);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      try {
        await axiosInstance.patch("/user-api/notifications/read");
        setUnreadCount(0);
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } catch (error) {
        console.error("Error marking notifications read", error);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleOpen} className="relative p-2 text-gray-600 hover:text-violet-600 transition">
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700">
            Notifications
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">No new notifications</div>
            ) : (
              notifications.map(notif => {
                const isJobNotification = Boolean(
                  (notif.link && (notif.link.includes('/jobs') || notif.link.includes('/gigs'))) ||
                  notif.type === 'job' ||
                  (notif.message && notif.message.toLowerCase().includes('eligible to apply'))
                );

                return (
                  <div key={notif._id} className={`p-3 border-b border-gray-50 text-sm ${notif.isRead ? 'bg-white text-gray-600' : 'bg-violet-50 text-gray-800'}`}>
                    <p>{notif.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400 block">{new Date(notif.createdAt).toLocaleDateString()}</span>
                      {isJobNotification && (
                        <button 
                          onClick={() => {
                            setIsOpen(false);
                            navigate(notif.link || '/jobs');
                          }}
                          className="text-[11px] bg-violet-600 text-white font-bold px-3 py-1.5 rounded hover:bg-violet-700 transition"
                        >
                          View Details & Apply
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;