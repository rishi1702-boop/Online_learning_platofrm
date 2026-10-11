import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiBriefcase,
  FiMail,
  FiLock,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiGlobe,
  FiShield,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiArrowRight
} from "react-icons/fi";

export default function RegisterStartup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      noOfEmployees: "1-10",
      establishedYear: new Date().getFullYear().toString(),
      location: "Bengaluru, India"
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        companyName: data.companyName,
        establishedYear: data.establishedYear,
        location: data.location,
        noOfEmployees: data.noOfEmployees,
        website: data.website || "",
        about: data.about || ""
      };

      const res = await axiosInstance.post("/common-api/register-startup", payload);
      toast.success(res.data.message || "Startup registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed. Please verify your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT PANEL: BRANDING & PERKS (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
              <FiBriefcase /> Startup Partner Program
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 leading-tight">
              Scale Your Venture with Student Talent
            </h2>
            <p className="text-violet-200 text-sm leading-relaxed mb-8">
              Hire enthusiastic learners for micro-internships and paid mini-tasks without corporate red tape, cutthroat filtration, or employee bonds.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-emerald-400 shrink-0">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Zero Corporate Bonds</h4>
                  <p className="text-xs text-slate-300">Flexible project milestones tailored to student academic schedules.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-emerald-400 shrink-0">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Affordable Production Cost</h4>
                  <p className="text-xs text-slate-300">Disburse friendly mini-stipends to support student finances while scaling fast.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-emerald-400 shrink-0">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant Broadcast Alerts</h4>
                  <p className="text-xs text-slate-300">Openings are instantly notified to thousands of active skill learners.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-xs text-slate-400">
            Looking to learn instead?{" "}
            <Link to="/register" className="text-emerald-400 font-bold hover:underline">
              Register as Student / Instructor &rarr;
            </Link>
          </div>
        </div>

        {/* RIGHT PANEL: REGISTRATION FORM (7 Cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Register Your Startup</h1>
            <p className="text-slate-500 text-xs mt-1">Enter your company credentials to start publishing opportunities.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* COMPANY NAME */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Company / Startup Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  {...register("companyName", { required: "Company name is required" })}
                  placeholder="e.g. TechSpark Labs, FinFlow"
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border ${errors.companyName ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition`}
                />
              </div>
              {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
            </div>

            {/* FOUNDER NAME: FIRST & LAST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Founder / Lead First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                    placeholder="Arun"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border ${errors.firstName ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition`}
                  />
                </div>
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Sharma"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* EMAIL ADDRESS */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Work / Founder Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format"
                    }
                  })}
                  placeholder="founder@mycompany.io"
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {/* ESTABLISHED YEAR & NO OF EMPLOYEES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Established Year <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="number"
                    min="1950"
                    max={new Date().getFullYear()}
                    {...register("establishedYear", { required: "Established year is required" })}
                    placeholder="2023"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border ${errors.establishedYear ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition`}
                  />
                </div>
                {errors.establishedYear && <p className="text-xs text-red-500 mt-1">{errors.establishedYear.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Employees <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3.5 top-3 text-slate-400" />
                  <select
                    {...register("noOfEmployees", { required: "Employee count is required" })}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition text-slate-700 font-medium"
                  >
                    <option value="1-10">1 - 10 (Early Stage)</option>
                    <option value="11-50">11 - 50 (Seed / Growth)</option>
                    <option value="51-200">51 - 200 (Expansion)</option>
                    <option value="200+">200+ (Scaleup / Enterprise)</option>
                  </select>
                </div>
                {errors.noOfEmployees && <p className="text-xs text-red-500 mt-1">{errors.noOfEmployees.message}</p>}
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Headquarters / Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  {...register("location", { required: "Location is required" })}
                  placeholder="e.g. Bengaluru, India or Remote"
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border ${errors.location ? 'border-red-500' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition`}
                />
              </div>
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
            </div>

            {/* WEBSITE */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Company Website (Optional)
              </label>
              <div className="relative">
                <FiGlobe className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="url"
                  {...register("website")}
                  placeholder="https://mycompany.io"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 transition text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Registering Startup...
                </>
              ) : (
                <>
                  Register Startup Account <FiArrowRight />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-slate-500">Already registered? </span>
              <Link to="/login" className="text-xs font-bold text-emerald-600 hover:underline">
                Sign In to Startup Portal
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
