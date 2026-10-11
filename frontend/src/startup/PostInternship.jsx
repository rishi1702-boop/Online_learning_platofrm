import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiArrowLeft,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiAward,
  FiCheckCircle,
  FiShield,
  FiFileText,
  FiPlus,
  FiTrash2
} from "react-icons/fi";

export default function PostInternship() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    opportunityType: "INTERNSHIP",
    startupStage: "Early-Stage Startup",
    stipendText: "₹8,000 / month (Stipend)",
    duration: "3 Weeks",
    requiredSkills: "React, Tailwind CSS, JavaScript",
    description: "",
    hasBond: false,
    deliverables: [
      "Build modern, mobile-responsive UI components based on Figma design",
      "Ensure code readability and modular component architecture",
      "Deliver working demo and pull request on GitHub"
    ],
    perks: [
      "Direct founder mentorship and weekly sprint discussions",
      "Certificate of Micro-Internship and verified Letter of Recommendation",
      "Zero corporate bond: 100% flexible hours tailored to student schedules",
      "Monthly financial stipend to support educational & living expenses"
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleDeliverableChange = (idx, val) => {
    const list = [...formData.deliverables];
    list[idx] = val;
    setFormData(prev => ({ ...prev, deliverables: list }));
  };

  const addDeliverable = () => {
    setFormData(prev => ({ ...prev, deliverables: [...prev.deliverables, ""] }));
  };

  const removeDeliverable = (idx) => {
    setFormData(prev => ({ ...prev, deliverables: prev.deliverables.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please enter a title and description for the role.");
      return;
    }

    setSubmitting(true);
    try {
      const skillsArray = formData.requiredSkills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        requiredSkills: skillsArray,
        deliverables: formData.deliverables.filter(d => d.trim().length > 0)
      };

      const res = await axiosInstance.post("/startup-api/post-internship", payload);
      toast.success(res.data.message || "Micro-internship posted successfully!");
      navigate("/startup-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/startup-dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600 transition"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Startup Portal
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <FiShield /> Zero Corporate Red Tape • No Bonds
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Post a Startup Micro-Internship or Mini-Task
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Hire enthusiastic student learners to solve practical tasks. Provide direct mentorship & stipend without corporate MNC friction.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Role Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. React Frontend UI Micro-Intern"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Opportunity Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="opportunityType"
                  value={formData.opportunityType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition text-slate-700 font-bold"
                >
                  <option value="JOB">💼 Full-Time / Junior Startup Job Opening</option>
                  <option value="INTERNSHIP">🎓 Paid Micro-Internship (2 - 4 Weeks)</option>
                  <option value="MINI_TASK">⚡ Paid Mini-Task (Milestone Deliverable)</option>
                </select>
              </div>
            </div>

            {/* Startup Name, Stage & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Startup / Venture Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. NextWave Labs"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Startup Stage
                </label>
                <select
                  name="startupStage"
                  value={formData.startupStage}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition text-slate-700 font-medium"
                >
                  <option value="Early-Stage Startup">Early-Stage Venture</option>
                  <option value="Seed Stage Startup">Seed Stage Funded</option>
                  <option value="Bootstrapped">Bootstrapped Product Team</option>
                  <option value="Pre-Seed Venture">Pre-Seed / Incubated</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Location / Mode
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  placeholder="e.g. Remote / Bengaluru (Hybrid)"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            {/* Stipend / Salary & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {formData.opportunityType === "JOB" ? "Annual Salary / CTC Package" : "Monthly Stipend / Mini Income Amount"} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    name="stipendText"
                    value={formData.stipendText}
                    onChange={handleChange}
                    required
                    placeholder={formData.opportunityType === "JOB" ? "e.g. ₹8,00,000 - ₹12,00,000 PA" : "e.g. ₹8,000 / month or ₹5,000 / task"}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {formData.opportunityType === "JOB" ? "Direct compensation from startup without MNC overhead" : "Helps student finances while learning"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {formData.opportunityType === "JOB" ? "Experience Level" : "Duration / Timeline"}
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder={formData.opportunityType === "JOB" ? "e.g. 0 - 1 Years (Fresher / Junior)" : "e.g. 3 Weeks (Flexible Part-Time)"}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Instant Student Broadcast Alert */}
            <div className="p-4 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl flex items-start gap-3">
              <span className="text-xl">🔔</span>
              <div className="text-xs text-violet-950 leading-relaxed">
                <span className="font-bold text-violet-900 block mb-0.5">Instant Student Broadcast Notification:</span>
                When you publish this opening, CourseHub will <span className="font-bold text-violet-800">immediately broadcast a real-time notification to all active students</span> with a <span className="underline font-bold">"View Details & Apply"</span> action button so qualified learners can apply instantly.
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Required Skills (Comma separated) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="requiredSkills"
                value={formData.requiredSkills}
                onChange={handleChange}
                placeholder="React, Node.js, Tailwind CSS, REST APIs"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition"
              />
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                ✓ No 90% score gates — any student actively learning these skills can apply!
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Role Description & Startup Mission <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Explain what your startup is building and how the intern will contribute practical value..."
                className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition resize-none"
              ></textarea>
            </div>

            {/* Key Deliverables */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Key Deliverables & Milestones
                </label>
                <button
                  type="button"
                  onClick={addDeliverable}
                  className="text-xs text-violet-600 hover:text-violet-700 font-bold flex items-center gap-1"
                >
                  <FiPlus /> Add Deliverable
                </button>
              </div>

              <div className="space-y-2.5">
                {formData.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={del}
                      onChange={(e) => handleDeliverableChange(idx, e.target.value)}
                      placeholder="e.g. Build responsive user dashboard with Tailwind"
                      className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white focus:outline-none transition"
                    />
                    {formData.deliverables.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDeliverable(idx)}
                        className="text-slate-400 hover:text-red-500 p-2"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Zero Bond Confirmation */}
            <div className="p-4 bg-violet-50/60 border border-violet-200 rounded-2xl flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
              <div className="text-xs text-violet-900 leading-relaxed">
                <span className="font-bold">Startup Micro-Internship Guarantee:</span> This opportunity guarantees <span className="font-bold">zero employment bonds</span> and flexible milestone hours for students. It offers direct founder networking and a verified Certificate of Completion.
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/startup-dashboard")}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-violet-200 transition text-sm flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiCheckCircle /> Publish Startup Opportunity
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
