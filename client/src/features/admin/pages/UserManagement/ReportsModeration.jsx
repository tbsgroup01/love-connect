import React, { useState, useEffect } from "react";
import {
  Flag,
  Clock,
  CheckCircle2,
  Ban,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
  UserX,
  Trash2,
  RefreshCw,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import {
  getReports,
  updateReport,
  deleteReport as apiDeleteReport,
  deleteBulkReports as apiDeleteBulkReports,
} from "../../../../services/reportsServices.js";
import { updateUserStatus } from "../../../../services/usersServices.js";

const COLORS = {
  pink: "#FF2D72",
  lightPink: "#FFE7F0",
  purple: "#7C3AED",
  dark: "#17151A",
  white: "#FFFFFF",
  background: "#FAFAFC",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  blue: "#3B82F6",
};

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80";

export default function ReportsModeration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Reports & Moderation");
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportsData, setReportsData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionLoading, setActionLoading] = useState(false);

  // Load reports from backend API
  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await getReports({ limit: 100 });
      if (res && res.success && Array.isArray(res.reports)) {
        const mapped = res.reports.map((r) => {
          const reporterP = r.reporter?.profile || {};
          const reportedP = r.reportedUser?.profile || {};

          const reportedAge = reportedP.date_of_birth
            ? Math.floor(
                (new Date() - new Date(reportedP.date_of_birth)) /
                  (365.25 * 24 * 60 * 60 * 1000)
              )
            : null;

          const rawStatus = (r.status || "pending").toLowerCase();
          const isPending = rawStatus === "pending";
          const isInReview = rawStatus === "in_review";
          const isResolved = rawStatus === "resolved";
          const isActionTaken = rawStatus === "action_taken" || rawStatus === "dismissed";

          let statusDisplay = "Pending";
          let statusBg = "#FEF3C7";
          let statusColor = "#D97706";

          if (isResolved) {
            statusDisplay = "Resolved";
            statusBg = "#DCFCE7";
            statusColor = "#16A34A";
          } else if (isInReview) {
            statusDisplay = "In Review";
            statusBg = "#F3E8FF";
            statusColor = "#7C3AED";
          } else if (rawStatus === "action_taken") {
            statusDisplay = "Action Taken";
            statusBg = "#FEE2E2";
            statusColor = "#EF4444";
          } else if (rawStatus === "dismissed") {
            statusDisplay = "Dismissed";
            statusBg = "#F1F5F9";
            statusColor = "#64748B";
          }

          return {
            id: r.id,
            reportId: `REP${String(r.id).padStart(6, "0")}`,
            reportedUser: {
              rawId: r.reported_user_id,
              userId: `USR${String(r.reported_user_id).padStart(5, "0")}`,
              name: reportedP.full_name || r.reportedUser?.name || "Reported User",
              age: reportedAge || 26,
              location: reportedP.city || "Unknown",
              fullLocation: reportedP.city ? `${reportedP.city}, India` : "India",
              avatar: reportedP.profile_picture || DEFAULT_AVATAR,
              status: r.reportedUser?.status || "active",
            },
            reportedBy: {
              rawId: r.reporter_id,
              name: reporterP.full_name || r.reporter?.name || "Anonymous",
              avatar: reporterP.profile_picture || null,
            },
            reason: r.reason || "General",
            reasonBg: "#FFE7F0",
            reasonColor: "#FF2D72",
            date: r.createdAt
              ? new Date(r.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A",
            time: r.createdAt
              ? new Date(r.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            status: statusDisplay,
            rawStatus,
            statusBg,
            statusColor,
            description:
              r.description ||
              "User reported for violating community guidelines and safety rules.",
            actionTaken: r.action_taken || null,
          };
        });

        setReportsData(mapped);
        if (res.stats) {
          setStats(res.stats);
        }
      } else {
        setReportsData([]);
      }
    } catch (err) {
      console.warn("Could not fetch reports:", err);
      setReportsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);
  const totalReportsCount = stats?.totalReports ?? reportsData.length;
  const pendingCount =
    stats?.pending ?? reportsData.filter((r) => r.rawStatus === "pending").length;
  const resolvedCount =
    stats?.resolved ?? reportsData.filter((r) => r.rawStatus === "resolved").length;
  const actionTakenCount =
    stats?.actionTaken ??
    reportsData.filter(
      (r) => r.rawStatus === "action_taken" || r.rawStatus === "dismissed"
    ).length;

  const kpiCards = [
    {
      title: "Total Reports",
      value: totalReportsCount.toLocaleString(),
      bgColor: "#FF2D72",
      icon: Flag,
    },
    {
      title: "Pending Review",
      value: pendingCount.toLocaleString(),
      bgColor: "#F59E0B",
      icon: Clock,
    },
    {
      title: "Resolved",
      value: resolvedCount.toLocaleString(),
      bgColor: "#22C55E",
      icon: CheckCircle2,
    },
    {
      title: "Action Taken",
      value: actionTakenCount.toLocaleString(),
      bgColor: "#EF4444",
      icon: Ban,
    },
  ];

  const filteredData = reportsData.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase().trim();
    return (
      item.reportedUser.name.toLowerCase().includes(term) ||
      item.reportedBy.name.toLowerCase().includes(term) ||
      item.reason.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term) ||
      item.reportId.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const currentSelected =
    selectedReport && reportsData.some((r) => r.id === selectedReport.id)
      ? reportsData.find((r) => r.id === selectedReport.id)
      : null;

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedReportIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedReportIds([]);
    } else {
      setSelectedReportIds(paginatedData.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedReportIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedReportIds.length === 0) return;
    try {
      await apiDeleteBulkReports(selectedReportIds);
    } catch (e) {
      console.warn("Delete bulk reports error:", e);
    }
    setReportsData((prev) =>
      prev.filter((item) => !selectedReportIds.includes(item.id))
    );
    if (selectedReport && selectedReportIds.includes(selectedReport.id)) {
      setSelectedReport(null);
    }
    setSelectedReportIds([]);
  };

  const handleDeleteReport = async (id) => {
    try {
      await apiDeleteReport(id);
    } catch (e) {
      console.warn("Delete report error:", e);
    }
    setReportsData((prev) => prev.filter((item) => item.id !== id));
    setSelectedReportIds((prev) => prev.filter((item) => item !== id));
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport(null);
    }
  };
  const handleResolveReport = async () => {
    if (!currentSelected) return;
    setActionLoading(true);
    try {
      await updateReport(currentSelected.id, {
        status: "resolved",
        action_taken: "Marked resolved by Admin",
      });
      setReportsData((prev) =>
        prev.map((r) =>
          r.id === currentSelected.id
            ? {
                ...r,
                status: "Resolved",
                rawStatus: "resolved",
                statusBg: "#DCFCE7",
                statusColor: "#16A34A",
              }
            : r
        )
      );
    } catch (err) {
      console.warn("Resolve report error:", err);
    } finally {
      setActionLoading(false);
    }
  };
  const handleSuspendUser = async () => {
    if (!currentSelected) return;
    setActionLoading(true);
    try {
      if (currentSelected.reportedUser?.rawId) {
        await updateUserStatus(currentSelected.reportedUser.rawId, "suspended");
      }
      await updateReport(currentSelected.id, {
        status: "action_taken",
        action_taken: "Reported user account suspended",
      });
      setReportsData((prev) =>
        prev.map((r) =>
          r.id === currentSelected.id
            ? {
                ...r,
                status: "Action Taken",
                rawStatus: "action_taken",
                statusBg: "#FEE2E2",
                statusColor: "#EF4444",
              }
            : r
        )
      );
    } catch (err) {
      console.warn("Suspend user error:", err);
    } finally {
      setActionLoading(false);
    }
  };
  const handleDismissReport = async () => {
    if (!currentSelected) return;
    setActionLoading(true);
    try {
      await updateReport(currentSelected.id, {
        status: "dismissed",
        action_taken: "Dismissed by Admin",
      });
      setReportsData((prev) =>
        prev.map((r) =>
          r.id === currentSelected.id
            ? {
                ...r,
                status: "Dismissed",
                rawStatus: "dismissed",
                statusBg: "#F1F5F9",
                statusColor: "#64748B",
              }
            : r
        )
      );
    } catch (err) {
      console.warn("Dismiss report error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: COLORS.background, color: COLORS.dark }}
      className="h-screen font-sans flex flex-col overflow-hidden"
    >
      {/* TOP NAVBAR HEADER */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR NAVIGATION */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: COLORS.dark }}
              >
                Reports & Moderation
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Review and manage user reports, flagged content and safety issues
              </p>
            </div>
            <button
              onClick={loadReports}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#FF2D72]" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>

          {/* TOP 4 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4"
                  style={{ borderLeftColor: kpi.bgColor }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: kpi.bgColor }}
                  >
                    <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-gray-500 block truncate">
                      {kpi.title}
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TABLE AND RIGHT DETAIL PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* REPORTS TABLE */}
            <div
              className={`${
                currentSelected ? "xl:col-span-2" : "xl:col-span-3"
              } bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}
            >
              {/* Table Header & Search Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">
                    All Reports ({filteredData.length})
                  </span>
                  {selectedReportIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedReportIds.length})</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedReportIds.length > 0 && (
                    <span className="text-xs font-semibold text-gray-500">
                      {selectedReportIds.length} of {filteredData.length} selected
                    </span>
                  )}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search User or Reason..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Table with horizontal scroll container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead>
                    <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                      <th className="pb-3 w-8">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          className="rounded text-[#FF2D72] focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="pb-3 font-semibold">Reported User</th>
                      <th className="pb-3 font-semibold">Reported By</th>
                      <th className="pb-3 font-semibold">Reason</th>
                      <th className="pb-3 font-semibold">Date & Time</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-gray-400">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin text-[#FF2D72]" />
                            <span>Loading reports...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-gray-400">
                          No reports found
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((item) => {
                        const isSelected =
                          currentSelected && currentSelected.id === item.id;
                        const isChecked = selectedReportIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedReport(item)}
                            className={`cursor-pointer transition-colors ${
                              isChecked
                                ? "bg-pink-50/40"
                                : isSelected
                                ? "bg-pink-50/20"
                                : "hover:bg-gray-50/50"
                            }`}
                          >
                            <td className="py-3.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleToggleSelect(item.id);
                                }}
                                className="rounded text-[#FF2D72] focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.reportedUser.avatar}
                                  alt={item.reportedUser.name}
                                  className="w-9 h-9 rounded-full object-cover border"
                                  style={{
                                    borderColor: isSelected
                                      ? COLORS.pink
                                      : "#E5E7EB",
                                  }}
                                />
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {item.reportedUser.name}
                                  </div>
                                  <div className="text-gray-400 text-[10px]">
                                    {item.reportedUser.location}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <div className="flex items-center gap-2">
                                {item.reportedBy.avatar ? (
                                  <img
                                    src={item.reportedBy.avatar}
                                    alt={item.reportedBy.name}
                                    className="w-7 h-7 rounded-full object-cover border border-gray-200"
                                  />
                                ) : (
                                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-[10px]">
                                    👤
                                  </div>
                                )}
                                <span className="font-medium text-gray-700">
                                  {item.reportedBy.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <span
                                className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                                style={{
                                  backgroundColor: item.reasonBg,
                                  color: item.reasonColor,
                                }}
                              >
                                {item.reason}
                              </span>
                            </td>
                            <td className="py-3.5">
                              <div className="font-semibold text-gray-700">
                                {item.date}
                              </div>
                              <div className="text-gray-400 text-[10px]">
                                {item.time}
                              </div>
                            </td>
                            <td className="py-3.5">
                              <span
                                className="px-3 py-1 rounded-full font-bold text-[10px] inline-block"
                                style={{
                                  backgroundColor: item.statusBg,
                                  color: item.statusColor,
                                }}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedReport(item);
                                  }}
                                  title="View Report"
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteReport(item.id);
                                  }}
                                  title="Delete Report"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>
                  Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{" "}
                  {endIndex} of {filteredData.length} reports
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-gray-50 border border-gray-200 text-xs text-gray-700 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={validCurrentPage <= 1}
                      className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition-colors ${
                            validCurrentPage === pageNum
                              ? "text-white shadow-xs"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          style={
                            validCurrentPage === pageNum
                              ? { backgroundColor: COLORS.pink }
                              : {}
                          }
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={validCurrentPage >= totalPages}
                      className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT REPORT DETAILS & ACTION PANEL */}
            {currentSelected && (
              <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2
                      className="text-base font-bold"
                      style={{ color: COLORS.dark }}
                    >
                      Report Details
                    </h2>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Reported User Profile Card */}
                  <div className="flex flex-col items-center p-4 bg-gray-50/70 rounded-2xl text-center mb-5 border border-gray-100">
                    <img
                      src={currentSelected.reportedUser.avatar}
                      alt={currentSelected.reportedUser.name}
                      className="w-20 h-20 rounded-full object-cover border-4 shadow-sm border-white"
                    />
                    <h3
                      className="font-extrabold text-base mt-2"
                      style={{ color: COLORS.dark }}
                    >
                      {currentSelected.reportedUser.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {currentSelected.reportedUser.age} Years •{" "}
                      {currentSelected.reportedUser.fullLocation}
                    </p>
                    <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                      ID: {currentSelected.reportedUser.userId}
                    </p>
                  </div>

                  {/* Report Information Breakdown */}
                  <div className="space-y-3 text-xs mb-5">
                    <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                      Report Information
                    </h4>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Reported By</span>
                      <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                        {currentSelected.reportedBy.avatar && (
                          <img
                            src={currentSelected.reportedBy.avatar}
                            alt="Reporter"
                            className="w-4 h-4 rounded-full object-cover"
                          />
                        )}
                        <span>{currentSelected.reportedBy.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Report ID</span>
                      <span className="font-semibold text-gray-800">
                        {currentSelected.reportId}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Reason</span>
                      <span className="font-bold" style={{ color: COLORS.pink }}>
                        {currentSelected.reason}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-gray-400 shrink-0">Description</span>
                      <span className="font-medium text-gray-700 text-right leading-relaxed">
                        {currentSelected.description}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Reported On</span>
                      <span className="font-semibold text-gray-800">
                        {currentSelected.date}
                        {currentSelected.time ? `, ${currentSelected.time}` : ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status</span>
                      <span
                        className="px-2.5 py-0.5 rounded-md font-bold text-[10px]"
                        style={{
                          backgroundColor: currentSelected.statusBg,
                          color: currentSelected.statusColor,
                        }}
                      >
                        {currentSelected.status}
                      </span>
                    </div>

                    {currentSelected.actionTaken && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Action Taken</span>
                        <span className="font-semibold text-emerald-600">
                          {currentSelected.actionTaken}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons: Resolve, Suspend User, Dismiss */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    disabled={actionLoading}
                    onClick={handleResolveReport}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    style={{ backgroundColor: COLORS.success }}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Resolve</span>
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={handleSuspendUser}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    style={{ backgroundColor: COLORS.danger }}
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>Suspend User</span>
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={handleDismissReport}
                    className="px-3 py-2.5 rounded-xl font-bold text-xs bg-gray-100 text-gray-600 flex items-center justify-center gap-1 transition-all hover:bg-gray-200 disabled:opacity-50 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Dismiss</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
