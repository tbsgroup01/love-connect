import React, { useState, useEffect } from "react";
import {
  Video,
  Clock,
  Users,
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import {
  getAllCalls,
  deleteCall as apiDeleteCall,
  deleteBulkCalls as apiDeleteBulkCalls,
} from "../../../../services/callsServices.js";
import { getImageUrl } from "../../../../services/uploadServices.js";

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

export default function VideoCallLogs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Video Call Logs");
  const [selectedTabFilter, setSelectedTabFilter] = useState("All");
  const [selectedCall, setSelectedCall] = useState(null);
  const [callLogsData, setCallLogsData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLogIds, setSelectedLogIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Load real calls from backend API
  const loadCalls = async () => {
    setLoading(true);
    try {
      const res = await getAllCalls({ limit: 100 });
      if (res && res.success && Array.isArray(res.calls)) {
        const mapped = res.calls.map((c) => {
          const callerP = c.caller?.profile || {};
          const receiverP = c.receiver?.profile || {};
          const rawSt = (c.status || "").toLowerCase();
          const isCompleted = rawSt === "completed";
          const isMissed = rawSt === "missed";
          const isRejected = rawSt === "rejected" || rawSt === "declined";

          const callerAge = callerP.date_of_birth
            ? Math.floor(
                (new Date() - new Date(callerP.date_of_birth)) /
                  (365.25 * 24 * 60 * 60 * 1000)
              )
            : null;
          const receiverAge = receiverP.date_of_birth
            ? Math.floor(
                (new Date() - new Date(receiverP.date_of_birth)) /
                  (365.25 * 24 * 60 * 60 * 1000)
              )
            : null;

          const mins = Math.floor((c.duration || 0) / 60);
          const secs = (c.duration || 0) % 60;
          const durationStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

          return {
            id: c.id,
            callId: `CALL${String(c.id).padStart(7, "0")}`,
            caller: {
              name: callerP.full_name || c.caller?.name || "Caller",
              age: callerAge ? `${callerAge}` : "",
              location: callerP.city || "Unknown",
              avatar: getImageUrl(callerP.profile_picture) || DEFAULT_AVATAR,
            },
            receiver: {
              name: receiverP.full_name || c.receiver?.name || "Receiver",
              age: receiverAge ? `${receiverAge}` : "",
              location: receiverP.city || "Unknown",
              avatar: getImageUrl(receiverP.profile_picture) || DEFAULT_AVATAR,
            },
            callType: c.call_type === "voice" ? "Voice Call" : "Video Call",
            duration: durationStr,
            rawDuration: `${c.duration || 0}s (${c.status || "completed"})`,
            date: c.createdAt
              ? new Date(c.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A",
            time: c.createdAt
              ? new Date(c.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            status: c.status
              ? c.status.charAt(0).toUpperCase() + c.status.slice(1)
              : "Unknown",
            rawStatus: rawSt,
            statusBg: isCompleted
              ? "#DCFCE7"
              : isMissed
              ? "#FEE2E2"
              : isRejected
              ? "#FEF3C7"
              : "#E0F2FE",
            statusColor: isCompleted
              ? "#16A34A"
              : isMissed
              ? "#EF4444"
              : isRejected
              ? "#D97706"
              : "#0284C7",
            previewImage: getImageUrl(receiverP.profile_picture) || DEFAULT_AVATAR,
            pipImage: getImageUrl(callerP.profile_picture) || DEFAULT_AVATAR,
          };
        });

        setCallLogsData(mapped);
        if (res.stats) {
          setStats(res.stats);
        }
      } else {
        setCallLogsData([]);
      }
    } catch (err) {
      console.warn("Could not fetch call logs:", err);
      setCallLogsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalls();
  }, []);

  // Compute dynamic KPI metrics from real API stats / callLogsData
  const totalCallsCount = stats?.totalCalls ?? callLogsData.length;
  const totalDurationSec =
    stats?.totalDurationSeconds ??
    callLogsData.reduce((acc, c) => {
      const parts = (c.duration || "0:0").split(":").map(Number);
      return acc + (parts[0] * 60 + (parts[1] || 0));
    }, 0);

  const totalDurationDisplay =
    totalDurationSec >= 3600
      ? `${(totalDurationSec / 3600).toFixed(1)} hrs`
      : `${Math.round(totalDurationSec / 60)} mins`;

  const uniqueUsersCount =
    stats?.uniqueUsers ??
    new Set([
      ...callLogsData.map((c) => c.caller?.name),
      ...callLogsData.map((c) => c.receiver?.name),
    ].filter(Boolean)).size;

  const avgCallDurationDisplay =
    stats?.avgDurationSeconds != null
      ? `${(stats.avgDurationSeconds / 60).toFixed(1)} mins`
      : totalCallsCount > 0
      ? `${(totalDurationSec / totalCallsCount / 60).toFixed(1)} mins`
      : "0 mins";

  const kpiCards = [
    {
      title: "Total Calls",
      value: totalCallsCount.toLocaleString(),
      bgColor: "#FF2D72",
      icon: Video,
    },
    {
      title: "Total Call Duration",
      value: totalDurationDisplay,
      bgColor: "#3B82F6",
      icon: Clock,
    },
    {
      title: "Unique Users",
      value: uniqueUsersCount.toLocaleString(),
      bgColor: "#7C3AED",
      icon: Users,
    },
    {
      title: "Avg. Call Duration",
      value: avgCallDurationDisplay,
      bgColor: "#F59E0B",
      icon: Star,
    },
  ];

  // Tab counts dynamically calculated
  const completedCount =
    stats?.completedCalls ??
    callLogsData.filter((c) => c.rawStatus === "completed").length;
  const missedCount =
    stats?.missedCalls ??
    callLogsData.filter((c) => c.rawStatus === "missed").length;
  const rejectedCount =
    stats?.rejectedCalls ??
    callLogsData.filter(
      (c) => c.rawStatus === "rejected" || c.rawStatus === "declined"
    ).length;

  const tabFilters = [
    { label: "All Calls", count: callLogsData.length, key: "All" },
    { label: "Completed", count: completedCount, key: "Completed" },
    { label: "Missed", count: missedCount, key: "Missed" },
    { label: "Rejected", count: rejectedCount, key: "Rejected" },
  ];

  const currentSelected =
    selectedCall && callLogsData.some((c) => c.id === selectedCall.id)
      ? selectedCall
      : null;

  const filteredLogs = callLogsData.filter((log) => {
    let matchesTab = true;
    if (selectedTabFilter === "Completed") {
      matchesTab = log.rawStatus === "completed";
    } else if (selectedTabFilter === "Missed") {
      matchesTab = log.rawStatus === "missed";
    } else if (selectedTabFilter === "Rejected") {
      matchesTab = log.rawStatus === "rejected" || log.rawStatus === "declined";
    }

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      log.caller.name.toLowerCase().includes(term) ||
      log.receiver.name.toLowerCase().includes(term) ||
      log.callId.toLowerCase().includes(term) ||
      log.callType.toLowerCase().includes(term);

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredLogs.length);
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTabFilter]);

  const isAllSelected =
    paginatedLogs.length > 0 &&
    paginatedLogs.every((item) => selectedLogIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedLogIds([]);
    } else {
      setSelectedLogIds(paginatedLogs.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedLogIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedLogIds.length === 0) return;
    try {
      await apiDeleteBulkCalls(selectedLogIds);
    } catch (err) {
      console.warn("Delete bulk calls error:", err);
    }
    setCallLogsData((prev) =>
      prev.filter((item) => !selectedLogIds.includes(item.id))
    );
    if (selectedCall && selectedLogIds.includes(selectedCall.id)) {
      setSelectedCall(null);
    }
    setSelectedLogIds([]);
  };

  const handleDeleteCall = async (id) => {
    try {
      await apiDeleteCall(id);
    } catch (err) {
      console.warn("Delete call error:", err);
    }
    setCallLogsData((prev) => prev.filter((item) => item.id !== id));
    setSelectedLogIds((prev) => prev.filter((item) => item !== id));
    if (selectedCall && selectedCall.id === id) {
      setSelectedCall(null);
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
                Video Call Logs
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Monitor and manage calls between users
              </p>
            </div>
            <button
              onClick={loadCalls}
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

          {/* TABLE AND RIGHT CALL PREVIEW PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* VIDEO CALL LOGS TABLE */}
            <div
              className={`${
                currentSelected ? "xl:col-span-2" : "xl:col-span-3"
              } bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}
            >
              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
                {tabFilters.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTabFilter(tab.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      selectedTabFilter === tab.key
                        ? "text-white shadow-2xs"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor:
                        selectedTabFilter === tab.key
                          ? COLORS.pink
                          : "transparent",
                    }}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Table Header & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-800 text-sm">
                    All Calls ({filteredLogs.length})
                  </h3>
                  {selectedLogIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedLogIds.length})</span>
                    </button>
                  )}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search caller, receiver, or ID..."
                    className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Table with horizontal scroll container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[750px]">
                  <thead>
                    <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                      <th className="pb-3 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-[#FF2D72] focus:ring-[#FF2D72] cursor-pointer"
                        />
                      </th>
                      <th className="pb-3 font-semibold">Caller</th>
                      <th className="pb-3 font-semibold">Receiver</th>
                      <th className="pb-3 font-semibold">Call Type</th>
                      <th className="pb-3 font-semibold">Duration</th>
                      <th className="pb-3 font-semibold">Date & Time</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="py-12 text-center text-gray-400 text-xs"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin text-[#FF2D72]" />
                            <span>Loading call logs...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredLogs.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="py-12 text-center text-gray-400 text-xs"
                        >
                          No call logs found
                        </td>
                      </tr>
                    ) : (
                      paginatedLogs.map((item) => {
                        const isSelected =
                          currentSelected && currentSelected.id === item.id;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedCall(item)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-pink-50/50"
                                : "hover:bg-gray-50/50"
                            }`}
                          >
                            <td
                              className="py-3.5 text-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="checkbox"
                                checked={selectedLogIds.includes(item.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleToggleSelect(item.id);
                                }}
                                className="rounded border-gray-300 text-[#FF2D72] focus:ring-[#FF2D72] cursor-pointer"
                              />
                            </td>
                            <td className="py-3.5">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.caller.avatar}
                                  alt={item.caller.name}
                                  className="w-8 h-8 rounded-full object-cover border"
                                  style={{
                                    borderColor: isSelected
                                      ? COLORS.pink
                                      : "#E5E7EB",
                                  }}
                                />
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {item.caller.name}
                                  </div>
                                  <div className="text-gray-400 text-[10px]">
                                    {item.caller.age ? `${item.caller.age}, ` : ""}
                                    {item.caller.location}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.receiver.avatar}
                                  alt={item.receiver.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {item.receiver.name}
                                  </div>
                                  <div className="text-gray-400 text-[10px]">
                                    {item.receiver.age ? `${item.receiver.age}, ` : ""}
                                    {item.receiver.location}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                                <Video className="w-3.5 h-3.5 text-[#FF2D72]" />
                                <span>{item.callType}</span>
                              </div>
                            </td>
                            <td className="py-3.5 font-semibold text-gray-700">
                              {item.duration}
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
                            <td
                              className="py-3.5 text-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCall(item);
                                  }}
                                  title="View Call Details"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCall(item.id);
                                  }}
                                  title="Delete Log"
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 text-xs text-gray-400 mt-2">
                <span>
                  Showing {filteredLogs.length > 0 ? startIndex + 1 : 0} to{" "}
                  {endIndex} of {filteredLogs.length} call logs
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

            {/* RIGHT CALL PREVIEW & DETAILS PANEL */}
            {currentSelected && (
              <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2
                      className="text-base font-bold"
                      style={{ color: COLORS.dark }}
                    >
                      Call Preview
                    </h2>
                    <button
                      onClick={() => setSelectedCall(null)}
                      className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Video Call Player Mockup with PiP Video overlay */}
                  <div className="relative bg-slate-950 rounded-2xl overflow-hidden h-60 mb-4 group shadow-md flex items-center justify-center border border-gray-100">
                    {/* Ambient blurred background to fill 16:9 widescreen naturally */}
                    <img
                      src={currentSelected.previewImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-125 pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-black/25" />

                    {/* Main Video Feed: Full face, hair, head and shoulders visible without any cropping */}
                    <img
                      src={currentSelected.previewImage}
                      alt="Receiver Preview"
                      className="relative z-10 h-full w-auto max-w-full object-contain rounded-lg shadow-lg"
                    />

                    {/* Picture-in-Picture Floating Window */}
                    <div className="absolute top-3 right-3 z-20 w-16 h-20 rounded-xl overflow-hidden border-2 border-white/90 shadow-xl bg-slate-900">
                      <img
                        src={currentSelected.pipImage}
                        alt="Caller PiP"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Call Overlay User Badge */}
                    <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{currentSelected.receiver.name}</span>
                    </div>
                  </div>

                  {/* Call Details Breakdown */}
                  <div className="space-y-2.5 text-xs">
                    <h4 className="font-bold text-gray-900 text-xs mb-1">
                      Call Details
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Caller</span>
                      <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                        <img
                          src={currentSelected.caller.avatar}
                          alt="Caller"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{currentSelected.caller.name}</span>
                        {currentSelected.caller.location && (
                          <span className="text-gray-400 font-normal text-[10px]">
                            {currentSelected.caller.age ? `${currentSelected.caller.age}, ` : ""}
                            {currentSelected.caller.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Receiver</span>
                      <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                        <img
                          src={currentSelected.receiver.avatar}
                          alt="Receiver"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{currentSelected.receiver.name}</span>
                        {currentSelected.receiver.location && (
                          <span className="text-gray-400 font-normal text-[10px]">
                            {currentSelected.receiver.age ? `${currentSelected.receiver.age}, ` : ""}
                            {currentSelected.receiver.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Call Type</span>
                      <div className="flex items-center gap-1 font-semibold text-gray-800">
                        <Video className="w-3.5 h-3.5 text-[#FF2D72]" />
                        <span>{currentSelected.callType}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date & Time</span>
                      <span className="font-semibold text-gray-800">
                        {currentSelected.date}{currentSelected.time ? `, ${currentSelected.time}` : ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="font-semibold text-gray-800">
                        {currentSelected.rawDuration}
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

