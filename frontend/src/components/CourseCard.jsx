import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiBook, FiStar, FiUsers, FiHeart } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../api/axiosInstance";

const levelColor = {
  Beginner:     "text-emerald-700 bg-emerald-50",
  Intermediate: "text-amber-700   bg-amber-50",
  Advanced:     "text-red-700     bg-red-50",
};

function CourseCard({ course }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isInstructor = user?.role === "INSTRUCTOR";
  const isAdmin = user?.role === "ADMIN";
  const isStudent = user?.role === "STUDENT";
  
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (isStudent && user?.wishlist?.includes(course._id)) {
      setIsWishlisted(true);
    }
  }, [isStudent, course._id, user]);
  
  // Check if instructor owns the course
  const instructorId = course.instructor?._id || course.instructor;
  const isOwner = isInstructor && instructorId && user?._id && instructorId.toString() === user._id.toString();

  let targetPath = `/course/${course._id}`;
  if (isInstructor) {
    targetPath = isOwner ? `/instructor/course/${course._id}` : "#";
  } else if (isAdmin) {
    targetPath = "/admin/courses";
  }

  const handleCardClick = (e) => {
    if (isInstructor && !isOwner) {
      e.preventDefault();
      toast.error("Instructors can only view and manage their own courses.");
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); // Prevent navigating to course details
    try {
      const res = await axiosInstance.post(`/user-api/wishlist/${course._id}`);
      setIsWishlisted(!isWishlisted);
      toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
      
      // Update local storage so it persists across renders
      const updatedUser = { ...user, wishlist: res.data.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <Link
      to={targetPath}
      onClick={handleCardClick}
      className={`relative flex flex-col rounded-2xl overflow-hidden border border-[#e9eaf2] transition-all duration-300 group bg-white ${
        isInstructor && !isOwner ? "opacity-75 cursor-not-allowed hover:border-red-200" : "hover:shadow-xl"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-violet-500 to-indigo-600 flex-shrink-0">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiBook size={32} className="text-white/50" />
          </div>
        )}
        {course.courseLevel && (
          <div className="absolute top-2 left-2 z-10">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm ${levelColor[course.courseLevel] || "text-slate-600"}`}>
              {course.courseLevel}
            </span>
          </div>
        )}
        {isStudent && (
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition text-rose-500"
          >
            <FiHeart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        )}
        {isInstructor && isOwner && (
          <div className="absolute top-2 right-2 z-10">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-violet-600 text-white shadow">
              Your Course
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-xs font-medium text-[#6b7280] mb-1 truncate">{course.category}</p>
        <h3 className="font-bold text-[#1c1d1f] text-sm line-clamp-2 leading-snug mb-2 group-hover:text-violet-700 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-[#6b7280] line-clamp-2 flex-1 mb-3">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-[#9ca3af] border-t border-[#f2f3f5] pt-3">
          <span className="flex items-center gap-1">
            <FiStar size={11} className="text-amber-400" />
            {course.rating > 0 ? course.rating.toFixed(1) : "New"}
          </span>
          <span className="flex items-center gap-1">
            <FiUsers size={11} />
            {course.studentsEnrolled || 0} students
          </span>
          <span className="flex items-center gap-1">
            <FiBook size={11} />
            {course.sections?.length || 0} sections
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;