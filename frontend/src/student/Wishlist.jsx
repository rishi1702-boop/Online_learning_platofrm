import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import CourseCard from '../components/CourseCard';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [wishlistCourses, setWishlistCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axiosInstance.get('/user-api/wishlist');
        setWishlistCourses(res.data.payload);
      } catch (error) {
        console.error("Error fetching wishlist", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <FiHeart className="text-3xl text-rose-500 fill-rose-500" />
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
      </div>

      {wishlistCourses.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiHeart className="text-3xl text-rose-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Explore courses and save them for later.</p>
          <Link to="/all-courses" className="bg-violet-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-violet-700 transition">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistCourses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
