import React, { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  CheckCircle2,
  HeartOff,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Copy,
  Check,
  X,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import { getAllMatches, deleteMatch } from "../../../../services/matchesServices.js";

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

export default function AdminMatches() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Matches");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatchIds, setSelectedMatchIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80";

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const getInterests = (interestStr, partnerPrefs) => {
    let list = [];
    if (interestStr) {
      try {
        const parsed =
          typeof interestStr === "string" ? JSON.parse(interestStr) : interestStr;
        if (Array.isArray(parsed)) list = parsed.filter(Boolean);
      } catch (_) {
        if (typeof interestStr === "string") {
          list = interestStr.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }
    }
    if (list.length === 0 && partnerPrefs) {
      try {
        const prefs =
          typeof partnerPrefs === "string" ? JSON.parse(partnerPrefs) : partnerPrefs;
        if (Array.isArray(prefs?.interests)) list = prefs.interests;
      } catch (_) {}
    }
    return list.length > 0 ? list : ["Dating", "Lifestyle"];
  };

  const isWithinPast24Hours = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return false;
    return Date.now() - d.getTime() <= 24 * 60 * 60 * 1000;
  };

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await getAllMatches();
      const rawMatches = response.data?.matches || [];

      const formatted = rawMatches.map((m) => {
        const uA = m.userOne || {};
        const pA = uA.profile || {};
        const uB = m.userTwo || {};
        const pB = uB.profile || {};

        const interestsA = getInterests(uA.interest, pA.partner_preferences);
        const interestsB = getInterests(uB.interest, pB.partner_preferences);

        const rawDate = m.matched_at || m.createdAt;
        const matchDateObj = new Date(rawDate);
        const formattedDate = !isNaN(matchDateObj.getTime())
          ? matchDateObj.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Recent";
        const formattedTime = !isNaN(matchDateObj.getTime())
          ? matchDateObj.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";

        return {
          id: m.id,
          matchId: `MCH-${String(m.id).padStart(6, "0")}`,
          rawDate,
          userA: {
            id: uA.id,
            name: pA.full_name || uA.name || "User A",
            age: uA.age || calculateAge(pA.date_of_birth) || "N/A",
            phone: uA.phone || "N/A",
            location: pA.city
              ? `${pA.city}, ${pA.country || "India"}`
              : pA.country || "India",
            avatar: pA.profile_picture || uA.profile_image || defaultAvatar,
            interests: interestsA,
          },
          userB: {
            id: uB.id,
            name: pB.full_name || uB.name || "User B",
            age: uB.age || calculateAge(pB.date_of_birth) || "N/A",
            phone: uB.phone || "N/A",
            location: pB.city
              ? `${pB.city}, ${pB.country || "India"}`
              : pB.country || "India",
            avatar: pB.profile_picture || uB.profile_image || defaultAvatar,
            interests: interestsB,
          },
          matchDate: formattedDate,
          matchTime: formattedTime,
          status: "Successful",
          statusBg: "#DCFCE7",
          statusColor: "#16A34A",
          messagesCount: m.conversation?.id ? 1 : 0,
          lastInteraction: "Active now",
        };
      });

      setMatchesData(formatted);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  const kpiCards = [
    {
      title: "Total Matches",
      value: matchesData.length,
      bgColor: "#FF2D72",
      icon: Heart,
    },
    {
      title: "Daily Matches",
      value: matchesData.filter((match) => isWithinPast24Hours(match.rawDate)).length,
      bgColor: "#3B82F6",
      icon: Sparkles,
    },
    {
      title: "Successful Matches",
      value: matchesData.length,
      bgColor: "#22C55E",
      icon: CheckCircle2,
    },
    {
      title: "Unmatches",
      value: 0,
      bgColor: "#EF4444",
      icon: HeartOff,
    },
  ];

  const filteredMatches = matchesData.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.userA.name.toLowerCase().includes(term) ||
      item.userA.phone.toLowerCase().includes(term) ||
      item.userB.name.toLowerCase().includes(term) ||
      item.userB.phone.toLowerCase().includes(term) ||
      item.matchId.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredMatches.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);

  const paginatedMatches = filteredMatches.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (activePage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (activePage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", activePage, "...", totalPages];
  };

  const currentSelected =
    selectedMatch && matchesData.some((m) => m.id === selectedMatch.id)
      ? selectedMatch
      : null;

  const isAllSelected =
    paginatedMatches.length > 0 &&
    paginatedMatches.every((item) => selectedMatchIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedMatchIds((prev) =>
        prev.filter((id) => !paginatedMatches.some((item) => item.id === id))
      );
    } else {
      const pageIds = paginatedMatches.map((item) => item.id);
      setSelectedMatchIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedMatchIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedMatchIds.length === 0) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedMatchIds.length} selected match(es)?`,
      )
    )
      return;
    try {
      await Promise.all(selectedMatchIds.map((id) => deleteMatch(id)));
      setMatchesData((prev) =>
        prev.filter((item) => !selectedMatchIds.includes(item.id)),
      );
      if (selectedMatch && selectedMatchIds.includes(selectedMatch.id)) {
        setSelectedMatch(null);
      }
      setSelectedMatchIds([]);
    } catch (error) {
      console.error("Failed to delete selected matches:", error);
    }
  };

  const handleDeleteMatch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await deleteMatch(id);
      setMatchesData((prev) => prev.filter((item) => item.id !== id));
      setSelectedMatchIds((prev) => prev.filter((item) => item !== id));
      if (selectedMatch?.id === id) {
        setSelectedMatch(null);
      }
    } catch (error) {
      console.error("Failed to delete match:", error);
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
                Match Management
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Monitor user matches, daily match rates, successful connections,
                and unmatches
              </p>
            </div>
          </div>

          {/* TOP 4 KPI CARDS (Total Matches, Daily Matches, Successful Matches, Unmatches) */}
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

          {/* TABLE AND RIGHT MATCH DETAILS PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* MATCHES TABLE */}
            <div
              className={`${currentSelected ? "xl:col-span-2" : "xl:col-span-3"} bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}
            >
              {/* Table Header & Search Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">
                    All Matches ({filteredMatches.length})
                  </span>
                  <button
                    type="button"
                    onClick={fetchMatches}
                    disabled={loading}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors cursor-pointer"
                    title="Refresh Matches"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${
                        loading ? "animate-spin text-[#FF2D72]" : ""
                      }`}
                    />
                  </button>
                  {selectedMatchIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedMatchIds.length})</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedMatchIds.length > 0 && (
                    <span className="text-xs font-semibold text-gray-500">
                      {selectedMatchIds.length} of {filteredMatches.length}{" "}
                      selected
                    </span>
                  )}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search User A or B..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Table with columns: User A, User B, Match Date, Actions */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[650px]">
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
                      <th className="pb-3 font-semibold">User A</th>
                      <th className="pb-3 font-semibold">User A Phone</th>
                      <th className="pb-3 font-semibold">User B</th>
                      <th className="pb-3 font-semibold">User B Phone</th>
                      <th className="pb-3 font-semibold">Match Date</th>
                      <th className="pb-3 font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-12 text-center text-gray-400"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-[#FF2D72]" />
                            <span className="text-xs font-semibold">
                              Loading matches...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredMatches.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-12 text-center text-gray-400"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Heart className="w-8 h-8 text-gray-300 stroke-[1.5]" />
                            <span className="text-xs font-semibold">
                              No matches found
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedMatches.map((item) => {
                        const isSelected =
                          currentSelected && currentSelected.id === item.id;
                        const isChecked = selectedMatchIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedMatch(item)}
                            className={`cursor-pointer transition-colors ${
                              isChecked
                                ? "bg-pink-50/40"
                                : isSelected
                                  ? "bg-pink-50/20"
                                  : "hover:bg-gray-50/50"
                            }`}
                          >
                            <td className="py-3">
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

                            {/* User A */}
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.userA.avatar}
                                  alt={item.userA.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {item.userA.name}
                                  </div>
                                  <div className="text-gray-400 text-[10px]">
                                    {item.userA.age} yrs •{" "}
                                    {item.userA.location.split(",")[0]}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 font-semibold text-gray-800">
                              {item.userA.phone}
                            </td>
                            {/* User B */}
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.userB.avatar}
                                  alt={item.userB.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {item.userB.name}
                                  </div>
                                  <div className="text-gray-400 text-[10px]">
                                    {item.userB.age} yrs •{" "}
                                    {item.userB.location.split(",")[0]}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 font-semibold text-gray-800">
                              {item.userB.phone}
                            </td>
                            {/* Match Date */}
                            <td className="py-3">
                              <div className="font-semibold text-gray-800">
                                {item.matchDate}
                              </div>
                              <div className="text-gray-400 text-[10px]">
                                {item.matchTime}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMatch(item);
                                  }}
                                  title="View Match Details"
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteMatch(item.id);
                                  }}
                                  title="Delete Match"
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
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>
                  Showing {filteredMatches.length > 0 ? (activePage - 1) * pageSize + 1 : 0} to{" "}
                  {Math.min(activePage * pageSize, filteredMatches.length)} of {filteredMatches.length} matches
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
                      disabled={activePage <= 1}
                      className={`p-1 rounded-lg ${
                        activePage <= 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100 text-gray-600 cursor-pointer"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {getPageNumbers().map((pg, idx) =>
                      pg === "..." ? (
                        <span key={`ellipsis-${idx}`} className="px-1 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <button
                          key={pg}
                          onClick={() => setCurrentPage(pg)}
                          className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition-colors ${
                            activePage === pg
                              ? "text-white shadow-xs"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          style={{
                            backgroundColor:
                              activePage === pg ? COLORS.pink : "transparent",
                          }}
                        >
                          {pg}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={activePage >= totalPages}
                      className={`p-1 rounded-lg ${
                        activePage >= totalPages
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

            {/* RIGHT MATCH DETAILS PREVIEW PANEL */}
            {currentSelected && (
              <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit transition-all">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-gray-900">
                      Match Details
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedMatch(null)}
                      title="Close drawer"
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Connected Couple Match Visual Card */}
                <div className="p-4 bg-gradient-to-r from-pink-50/80 via-rose-50/40 to-purple-50/60 rounded-2xl border border-pink-100/80 space-y-3">
                  <div className="flex items-center justify-between">
                    {/* User A */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={currentSelected.userA.avatar}
                        alt={currentSelected.userA.name}
                        className="w-14 h-14 rounded-full object-cover ring-3 ring-white shadow-xs"
                      />
                      <span className="font-bold text-xs text-gray-900 mt-1.5">
                        {currentSelected.userA.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {currentSelected.userA.age} yrs
                      </span>
                    </div>

                    {/* Connected Heart Indicator */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center border border-pink-100">
                        <Heart className="w-4 h-4 text-[#FF2D72] fill-current animate-pulse" />
                      </div>
                      <span className="text-[9px] font-bold text-[#FF2D72] mt-1">
                        Matched
                      </span>
                    </div>

                    {/* User B */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={currentSelected.userB.avatar}
                        alt={currentSelected.userB.name}
                        className="w-14 h-14 rounded-full object-cover ring-3 ring-white shadow-xs"
                      />
                      <span className="font-bold text-xs text-gray-900 mt-1.5">
                        {currentSelected.userB.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {currentSelected.userB.age} yrs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Key Information Breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">Match ID</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-gray-800 text-[11px]">
                        {currentSelected.matchId}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            currentSelected.matchId,
                          );
                          setCopiedId(true);
                          setTimeout(() => setCopiedId(false), 2000);
                        }}
                        className="text-gray-400 hover:text-gray-700 p-0.5 rounded cursor-pointer transition-colors"
                        title="Copy Match ID"
                      >
                        {copiedId ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">
                      Match Date & Time
                    </span>
                    <span className="font-medium text-gray-700 text-[11px]">
                      {currentSelected.matchDate}, {currentSelected.matchTime}
                    </span>
                  </div>

                  <div className="py-1.5">
                    <span className="text-gray-400 font-medium block mb-1.5">
                      Common Interests
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(currentSelected.userA?.interests || []).map((interest, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-50 text-gray-600 border border-gray-100"
                        >
                          {interest}
                        </span>
                      ))}
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
