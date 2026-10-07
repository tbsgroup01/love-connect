import React, { useState, useEffect } from "react";
import {
  History,
  Search,
  Clock,
  Globe,
  LogIn,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trash2,
  RefreshCw,
  User,
  Shield,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import {
  getActivities,
  deleteActivity,
} from "../../../../services/activitiesServices.js";

export default function ActivityLogs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Activity Logs");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const itemsPerPage = 8;

  const fetchLogs = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = await getActivities();
      const rawList = res.data?.activities || [];

      const formatted = rawList.map((item) => {
        const isUser = item.role === "user";
        const actor = isUser ? item.user : item.admin;
        const actorName = actor?.name || (isUser ? "App User" : "Admin");
        const actorEmail =
          actor?.email || (isUser ? "user@loveconnect.com" : "admin@loveconnect.com");
        const actorRole = isUser ? "User" : actor?.role || "Admin";
        const actorAvatar =
          actor?.profile_image ||
          actor?.profile?.profile_picture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(actorName)}&background=FFE7F0&color=FF2D72&bold=true`;

        const timestamp = item.loginAt || item.logoutAt || item.createdAt;
        const dateObj = timestamp ? new Date(timestamp) : new Date();
        const dateStr = !isNaN(dateObj)
          ? dateObj.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A";
        const timeStr = !isNaN(dateObj)
          ? dateObj.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";

        const isLogin = item.action?.toUpperCase() === "LOGIN";
        const rawIp = item.ipAddress || "127.0.0.1";
        const cleanIp =
          rawIp.startsWith("::ffff:")
            ? rawIp.replace("::ffff:", "")
            : rawIp === "::1"
            ? "127.0.0.1"
            : rawIp;

        return {
          id: `LOG-${String(item.id).padStart(4, "0")}`,
          rawId: item.id,
          role: item.role,
          actor: {
            name: actorName,
            email: actorEmail,
            role: actorRole,
            avatar: actorAvatar,
          },
          ip: cleanIp,
          date: dateStr,
          time: timeStr,
          rawDate: dateObj,
          module: isLogin ? "Login" : "Logout",
          status: "Success",
        };
      });

      setLogs(formatted);
    } catch (err) {
      console.error("Failed to fetch activities:", err);
      setError("Failed to load activity logs from server.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDelete = async (rawId, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this activity log?")) {
      return;
    }

    try {
      setDeletingId(rawId);
      await deleteActivity(rawId);
      setLogs((prev) => prev.filter((l) => l.rawId !== rawId));
    } catch (err) {
      console.error("Error deleting activity:", err);
      alert("Failed to delete activity log.");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter items based on active module tab and search term
  const filteredLogs = logs.filter((item) => {
    if (
      selectedModuleFilter !== "All" &&
      item.module.toLowerCase() !== selectedModuleFilter.toLowerCase()
    ) {
      return false;
    }

    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      const matchActor =
        item.actor.name.toLowerCase().includes(q) ||
        item.actor.email.toLowerCase().includes(q);
      const matchIp = item.ip.toLowerCase().includes(q);
      const matchDate =
        item.date.toLowerCase().includes(q) ||
        item.time.toLowerCase().includes(q);
      const matchModule = item.module.toLowerCase().includes(q);
      return matchActor || matchIp || matchDate || matchModule;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );


  return (
    <div className="h-screen bg-[#FAFAFC] text-[#17151A] font-sans flex flex-col overflow-hidden">
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
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2D72]/15 to-[#7C3AED]/15 flex items-center justify-center text-[#FF2D72] shadow-xs">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Activity Logs
                  </h1>
                  <p className="text-sm text-gray-400">
                    Real-time audit log of system logins, logouts, and IP addresses
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchLogs(true)}
                disabled={loading || refreshing}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#FF2D72]" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* MAIN ACTIVITY LOGS TABLE CONTAINER */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* SEARCH & FILTER CONTROLS BAR */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search User, Admin, IP..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-gray-50/80 border border-gray-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF2D72] focus:bg-white transition-all text-gray-800 placeholder-gray-400 font-semibold"
                />
              </div>

              {/* MODULE FILTER TABS */}
              <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl self-stretch sm:self-auto">
                {["All", "Login", "Logout"].map((mod) => (
                  <button
                    key={mod}
                    onClick={() => {
                      setSelectedModuleFilter(mod);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedModuleFilter === mod
                        ? "bg-white text-gray-900 shadow-xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>

            {/* ERROR ALERT */}
            {error && (
              <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between text-xs text-red-600 font-semibold">
                <span>{error}</span>
                <button
                  onClick={() => fetchLogs()}
                  className="underline hover:text-red-800 cursor-pointer"
                >
                  Retry
                </button>
              </div>
            )}

            {/* TABLE GRID */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-black">
                    <th className="py-4 px-6">User / Admin</th>
                    <th className="py-4 px-6">IP Address</th>
                    <th className="py-4 px-6">Date / Time</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-16 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-8 h-8 border-3 border-[#FF2D72]/20 border-t-[#FF2D72] rounded-full animate-spin" />
                          <span className="text-xs font-semibold">Loading activity logs...</span>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedLogs.length > 0 ? (
                    paginatedLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-[#FFE7F0]/20 transition-colors"
                      >
                        {/* 1. Actor */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={log.actor.avatar}
                              alt={log.actor.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100 shadow-xs"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-gray-900 text-xs block">
                                  {log.actor.name}
                                </span>
                                {log.role === "admin" ? (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-md">
                                    <Shield className="w-2.5 h-2.5" /> Admin
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md">
                                    <User className="w-2.5 h-2.5" /> User
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-semibold text-gray-400 block">
                                {log.actor.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. IP */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-gray-700 bg-gray-100/90 border border-gray-200 px-2.5 py-1 rounded-lg">
                            <Globe className="w-3.5 h-3.5 text-gray-400" />
                            {log.ip}
                          </span>
                        </td>

                        {/* 3. Date / Time */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 font-bold text-gray-700">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>
                              {log.date}, {log.time}
                            </span>
                          </div>
                        </td>

                        {/* 4. Module */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border ${
                              log.module === "Login"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            {log.module === "Login" ? (
                              <LogIn className="w-3 h-3" />
                            ) : (
                              <LogOut className="w-3 h-3" />
                            )}
                            {log.module}
                          </span>
                        </td>

                        {/* 5. Actions */}
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={(e) => handleDelete(log.rawId, e)}
                            disabled={deletingId === log.rawId}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                            title="Delete log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-16 text-center text-gray-400 font-medium">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <History className="w-8 h-8 text-gray-300 stroke-[1.5]" />
                          <span className="text-sm font-semibold text-gray-600">
                            No activity logs found
                          </span>
                          <span className="text-xs text-gray-400">
                            Activities will be automatically recorded here when users or admins log in/out.
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER / PAGINATION */}
            <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-500">
              <div>
                Showing{" "}
                <span className="text-gray-900 font-bold">
                  {filteredLogs.length > 0
                    ? (currentPage - 1) * itemsPerPage + 1
                    : 0}
                </span>{" "}
                to{" "}
                <span className="text-gray-900 font-bold">
                  {Math.min(currentPage * itemsPerPage, filteredLogs.length)}
                </span>{" "}
                of{" "}
                <span className="text-gray-900 font-bold">
                  {filteredLogs.length}
                </span>{" "}
                logs
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white shadow-md shadow-pink-500/20"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
