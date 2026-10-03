import React, { useState, useEffect } from "react";
import {
  Headphones,
  Search,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  X,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import {
  getSupportMessages,
  deleteSupportMessage,
} from "../../../../services/supportServices.js";

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

export default function SupportManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Support Requests");
  const [supports, setSupports] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback((current) => (current?.message === message ? null : current));
    }, 3500);
  };

  const copyToClipboard = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fetchSupports = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      else setLoading(true);

      const params = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const res = await getSupportMessages(params);
      const list = res.data?.supports || [];
      setSupports(list);
      setTotalCount(res.data?.total || list.length);

      // Keep selection in sync if exists
      if (selectedSupport) {
        const found = list.find((item) => item.id === selectedSupport.id);
        setSelectedSupport(found || null);
      }

      if (isManual) {
        showFeedback("success", "Support inquiries refreshed from database");
      }
    } catch (err) {
      console.error("Failed to fetch support requests:", err);
      showFeedback("error", "Failed to load support requests from database");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    fetchSupports();
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to permanently delete this support message?")) {
      return;
    }
    try {
      await deleteSupportMessage(id);
      showFeedback("success", "Support message deleted successfully from database");
      if (selectedSupport?.id === id) {
        setSelectedSupport(null);
      }
      fetchSupports();
    } catch (err) {
      console.error("Error deleting support query:", err);
      showFeedback("error", "Failed to delete support query");
    }
  };

  // Filtered supports
  const filteredSupports = supports.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.phone?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredSupports.length / pageSize) || 1;
  const paginatedSupports = filteredSupports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      {/* ADMIN NAVBAR */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        {/* ADMIN SIDEBAR */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* ========================================================================= */}
          {/* PAGE TITLE & ACTION HEADER */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <Headphones className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#17151A]">
                  Support Requests Management
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  {totalCount} Messages
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                View, monitor and review customer inquiries submitted via the Help & Support form.
              </p>
            </div>

            <div className="flex items-center gap-3">
             

              <button
                type="button"
                onClick={() => fetchSupports(true)}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: COLORS.pink }}
              >
                <RefreshCw className={`w-4 h-4 stroke-[2.5] ${refreshing ? "animate-spin" : ""}`} />
                <span>Sync Live Database</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEEDBACK NOTIFICATION */}
          {/* ========================================================================= */}
          {feedback && (
            <div
              className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn ${
                feedback.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
              <button
                onClick={() => setFeedback(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TABLE AND RIGHT DRAWER PANEL SPLIT (Layout Shifts on View) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* SUPPORT MESSAGES TABLE CONTAINER */}
            <div
              className={`${
                selectedSupport ? "xl:col-span-2" : "xl:col-span-3"
              } bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 transition-all duration-300`}
            >
              {/* TOP CONTROLS & SEARCH */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by name, email, phone, or message..."
                    className="w-full pl-10 pr-20 py-2 rounded-xl border border-gray-200 text-xs font-medium text-[#17151A] placeholder-gray-400 focus:outline-none focus:border-[#FF2D72] transition-colors bg-[#FAFAFC]"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        setCurrentPage(1);
                        fetchSupports();
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold px-2 py-0.5"
                    >
                      Clear
                    </button>
                  )}
                </form>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">Total:</span>
                  <span className="text-xs font-extrabold text-[#FF2D72] bg-[#FFE7F0] px-2.5 py-1 rounded-full">
                    {filteredSupports.length}
                  </span>
                </div>
              </div>

              {/* TABLE AREA */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[620px]">
                  <thead>
                    <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Phone Number</th>
                      <th className="pb-3 font-semibold">Message Preview</th>
                      <th className="pb-3 font-semibold">Date & Time</th>
                      <th className="pb-3 font-semibold text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-[#FF2D72]" />
                            <span className="text-xs font-medium">
                              Loading support inquiries...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : paginatedSupports.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-10 text-center text-gray-400">
                          <div className="space-y-1">
                            <p className="font-bold text-gray-600 text-xs">
                              No support inquiries found
                            </p>
                            <p className="text-[11px] text-gray-400">
                              {searchTerm
                                ? "No messages match your search term."
                                : "Submissions from the Help & Support contact form will appear here."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedSupports.map((item) => {
                        const isSelected = selectedSupport?.id === item.id;
                        const initial = item.name ? item.name.charAt(0).toUpperCase() : "U";

                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedSupport(item)}
                            className={`cursor-pointer transition-colors duration-150 ${
                              isSelected
                                ? "bg-pink-50/40"
                                : "hover:bg-gray-50/70"
                            }`}
                          >
                            {/* USER NAME & AVATAR */}
                            <td className="py-3.5 pr-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF2D72]/15 to-[#7C3AED]/15 text-[#FF2D72] font-black text-xs flex items-center justify-center shrink-0 border border-[#FF2D72]/20 shadow-2xs">
                                  {initial}
                                </div>
                                <span className="font-extrabold text-gray-900 text-xs truncate max-w-[130px]">
                                  {item.name}
                                </span>
                              </div>
                            </td>

                            {/* EMAIL */}
                            <td className="py-3.5 pr-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 text-gray-700 font-medium text-xs">
                                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span>{item.email}</span>
                              </div>
                            </td>

                            {/* PHONE */}
                            <td className="py-3.5 pr-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 text-gray-700 font-medium text-xs">
                                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span>{item.phone}</span>
                              </div>
                            </td>

                            {/* MESSAGE PREVIEW */}
                            <td className="py-3.5 pr-3 max-w-[180px] sm:max-w-[220px]">
                              <p className="text-gray-500 line-clamp-1 truncate text-xs">
                                {item.message}
                              </p>
                            </td>

                            {/* DATE */}
                            <td className="py-3.5 pr-3 text-gray-400 whitespace-nowrap text-[11px] font-medium">
                              {item.createdAt
                                ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "N/A"}
                            </td>

                            {/* ACTIONS */}
                            <td className="py-3.5 text-right pr-2 whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSupport((prev) =>
                                      prev?.id === item.id ? null : item
                                    );
                                  }}
                                  className="px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer"
                                  style={{
                                    backgroundColor: isSelected
                                      ? COLORS.pink
                                      : COLORS.lightPink,
                                    color: isSelected
                                      ? COLORS.white
                                      : COLORS.pink,
                                  }}
                                >
                                  {isSelected ? "Hide" : "View"}
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => handleDelete(item.id, e)}
                                  title="Delete Inquiry"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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

              {/* PAGINATION */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 text-xs text-gray-400 mt-2">
                <span>
                  Showing{" "}
                  {filteredSupports.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}{" "}
                  to {Math.min(currentPage * pageSize, filteredSupports.length)} of{" "}
                  {filteredSupports.length} inquiries
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
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
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`p-1 rounded-lg ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100 text-gray-600 cursor-pointer"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setCurrentPage(pg)}
                        className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition-colors ${
                          currentPage === pg
                            ? "text-white shadow-xs"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        style={{
                          backgroundColor:
                            currentPage === pg ? COLORS.pink : "transparent",
                        }}
                      >
                        {pg}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`p-1 rounded-lg ${
                        currentPage === totalPages
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100 text-gray-600 cursor-pointer"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT DRAWER / PREVIEW PANEL (Appears when user clicks 'View') */}
            {/* ========================================================================= */}
            {selectedSupport && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-5 h-fit sticky top-6 xl:col-span-1 animate-fadeIn">
                {/* DRAWER HEADER */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#FFE7F0] text-[#FF2D72]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h2 className="text-sm font-bold text-[#17151A]">
                      Message Inquiry
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedSupport(null)}
                    title="Close drawer"
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* USER PROFILE CARD */}
                <div className="flex flex-col items-center text-center p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF2D72]/20 to-[#7C3AED]/20 text-[#FF2D72] font-black text-xl flex items-center justify-center border-2 border-white shadow-sm">
                    {selectedSupport.name ? selectedSupport.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <h3 className="font-extrabold text-sm text-[#17151A] pt-1">
                    {selectedSupport.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {selectedSupport.email}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {selectedSupport.phone}
                  </p>
                </div>

                {/* DETAILS BREAKDOWN */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                      Submitted Date
                    </span>
                    <span className="text-gray-700 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {selectedSupport.createdAt
                        ? new Date(selectedSupport.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </span>
                  </div>

                  {/* FULL MESSAGE BOX */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                        Inquiry Message
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedSupport.message, "message")}
                        className="text-[10px] text-[#FF2D72] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === "message" ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedField === "message" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl border border-gray-200 bg-[#FAFAFC] text-xs font-normal text-gray-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                      {selectedSupport.message}
                    </div>
                  </div>
                </div>

                {/* DRAWER ACTION BUTTONS */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => handleDelete(selectedSupport.id, e)}
                    className="w-full py-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-xs font-bold text-red-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    title="Delete this message"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Inquiry</span>
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
