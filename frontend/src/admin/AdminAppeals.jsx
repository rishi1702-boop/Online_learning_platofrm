import React, { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiRefreshCw, FiMail, FiCheckCircle, FiXCircle, FiClock,
  FiAlertCircle, FiBook, FiUser, FiCalendar, FiFileText
} from "react-icons/fi";
import AdminLayout from "./AdminLayout";

/* ── Status badge ─────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    pending: { cls: "bg-amber-50 text-amber-700 border-amber-200", icon: <FiClock size={12} />, label: "Pending" },
    approved: { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <FiCheckCircle size={12} />, label: "Approved" },
    rejected: { cls: "bg-red-50 text-red-700 border-red-200", icon: <FiXCircle size={12} />, label: "Rejected" },
  };
  const { cls, icon, label } = map[status] || {};
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${cls}`}>
      {icon} {label}
    </span>
  );
};

/* ── Confirm Modal ────────────────────────────────── */
const ConfirmModal = ({ isOpen, title, message, confirmLabel, confirmCls, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-amber-50">
            <FiAlertCircle size={22} className="text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        </div>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition disabled:opacity-50 flex items-center gap-2 ${confirmCls}`}
          >
            {loading && <FiRefreshCw size={13} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ───────────────────────────────── */
function AdminAppeals() {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [filter, setFilter] = useState("pending"); // "all" | "pending" | "approved" | "rejected"
  const [modal, setModal] = useState({ open: false, title: "", message: "", confirmLabel: "", confirmCls: "", action: null });

  const fetchAppeals = useCallback(async () => {
    try {
      setLoading(true);
      const query = filter !== "all" ? `?status=${filter}` : "";
      const res = await axiosInstance.get(`/admin-api/appeals${query}`);
      setAppeals(res.data.payload || []);
    } catch (err) {
      toast.error("Failed to fetch appeals");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchAppeals(); }, [fetchAppeals]);

  const openApprove = (appeal) => {
    setModal({
      open: true,
      title: "Approve Appeal",
      message: `Approving this appeal will immediately reactivate "${appeal.course?.title}". The instructor will be able to publish and students can enroll. Are you sure?`,
      confirmLabel: "Approve & Reactivate",
      confirmCls: "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200",
      action: async () => {
        setActionLoading(true);
        try {
          await axiosInstance.patch(`/admin-api/appeals/${appeal._id}/approve`);
          toast.success("Appeal approved! Course has been reactivated.");
          setAppeals((prev) => prev.map((a) => a._id === appeal._id ? { ...a, status: "approved" } : a));
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to approve appeal");
        } finally {
          setActionLoading(false);
          setModal((m) => ({ ...m, open: false }));
        }
      },
    });
  };

  const openReject = (appeal) => {
    setModal({
      open: true,
      title: "Reject Appeal",
      message: `Rejecting this appeal will permanently deny reinstatement for "${appeal.course?.title}". The instructor cannot submit another appeal for this course.`,
      confirmLabel: "Reject Appeal",
      confirmCls: "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200",
      action: async () => {
        setActionLoading(true);
        try {
          await axiosInstance.patch(`/admin-api/appeals/${appeal._id}/reject`);
          toast.success("Appeal rejected.");
          setAppeals((prev) => prev.map((a) => a._id === appeal._id ? { ...a, status: "rejected" } : a));
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to reject appeal");
        } finally {
          setActionLoading(false);
          setModal((m) => ({ ...m, open: false }));
        }
      },
    });
  };

  const pendingCount = appeals.filter((a) => a.status === "pending").length;

  const filtered = filter === "all" ? appeals : appeals.filter((a) => a.status === filter);

  return (
    <AdminLayout>
      <ConfirmModal
        isOpen={modal.open}
        title={modal.title}
        message={modal.message}
        confirmLabel={modal.confirmLabel}
        confirmCls={modal.confirmCls}
        onConfirm={modal.action}
        onCancel={() => setModal((m) => ({ ...m, open: false }))}
        loading={actionLoading}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              Course Appeals
              {pendingCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {pendingCount} pending
                </span>
              )}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">Review reinstatement requests from instructors</p>
          </div>
        </div>
        <button
          onClick={fetchAppeals}
          className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-xl text-sm font-semibold hover:bg-violet-100 transition"
        >
          <FiRefreshCw size={14} /> Refresh
        </button>
      </header>

      <main className="flex-1 p-8 overflow-auto space-y-6">

        {/* Filter tabs */}
        <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 w-fit shadow-sm">
          {["pending", "approved", "rejected", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition ${
                filter === f
                  ? "bg-violet-600 text-white shadow"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail size={28} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">No {filter !== "all" ? filter : ""} appeals found</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((appeal) => (
              <div key={appeal._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                {/* Appeal Card Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 p-6 pb-4">
                  <div className="flex items-start gap-4">
                    {/* Course thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0">
                      {appeal.course?.thumbnail ? (
                        <img src={appeal.course.thumbnail} alt={appeal.course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <FiBook size={22} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">{appeal.course?.title || "Unknown Course"}</h3>
                      <p className="text-xs text-slate-400 mt-1">{appeal.course?.category}</p>
                    </div>
                  </div>
                  <StatusBadge status={appeal.status} />
                </div>

                {/* Meta row */}
                <div className="px-6 pb-4 flex flex-wrap gap-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FiUser size={12} className="text-violet-400" />
                    <span className="font-semibold text-slate-700">
                      {appeal.instructor?.firstName} {appeal.instructor?.lastName}
                    </span>
                    <span>·</span>
                    {appeal.instructor?.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={12} className="text-slate-400" />
                    Submitted {new Date(appeal.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>

                {/* Appeal Letter */}
                <div className="px-6 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiFileText size={13} className="text-slate-400" />
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Request Letter</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {appeal.message}
                  </div>
                </div>

                {/* Action buttons — only for pending */}
                {appeal.status === "pending" && (
                  <div className="px-6 pb-6 flex gap-3">
                    <button
                      onClick={() => openApprove(appeal)}
                      disabled={actionLoading}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 disabled:opacity-50"
                    >
                      <FiCheckCircle size={15} /> Approve & Reactivate
                    </button>
                    <button
                      onClick={() => openReject(appeal)}
                      disabled={actionLoading}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 text-sm font-semibold rounded-xl hover:bg-red-100 transition disabled:opacity-50"
                    >
                      <FiXCircle size={15} /> Reject
                    </button>
                  </div>
                )}

                {/* Reviewed status note */}
                {appeal.status !== "pending" && (
                  <div className={`mx-6 mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                    appeal.status === "approved"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}>
                    {appeal.status === "approved" ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                    {appeal.status === "approved"
                      ? "You approved this appeal. The course has been reactivated."
                      : "You rejected this appeal. The course remains inactive."}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </AdminLayout>
  );
}

export default AdminAppeals;
