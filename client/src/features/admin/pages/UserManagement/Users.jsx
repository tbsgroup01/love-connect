import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Download,
  Search,
  Filter,
  RotateCcw,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Lock,
  Unlock,
  X,
  Trash2,
  Loader2,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserStatus,
} from "../../../../services/usersServices";

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

const normalizeUser = (u) => {
  const planName =
    u.subscription ||
    (u.subscriptions && u.subscriptions.length > 0
      ? u.subscriptions[0]?.plan?.name || "Free"
      : "Free");

  const avatar =
    u.avatar ||
    u.profile_image ||
    u.profile?.profile_picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "User")}&background=FF2D72&color=fff`;

  const location =
    u.location ||
    [u.profile?.city, u.profile?.state, u.profile?.country]
      .filter(Boolean)
      .join(", ") ||
    "Not specified";

  let joinDate = u.joinDate;
  let joinTime = u.joinTime;
  if (!joinDate && u.createdAt) {
    const d = new Date(u.createdAt);
    if (!isNaN(d.getTime())) {
      joinDate = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      joinTime = d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  }

  const rawStatus = (u.status || "active").toLowerCase();
  const displayStatus =
    rawStatus === "active"
      ? "Active"
      : rawStatus === "suspended"
        ? "Suspended"
        : "Inactive";

  const photos =
    u.photos && u.photos.length > 0
      ? u.photos
      : u.profile?.profile_picture
        ? [u.profile.profile_picture]
        : [];

  return {
    ...u,
    id: u.id,
    name: u.name || "Unnamed User",
    email: u.email || "No email",
    phone: u.phone || "No phone",
    gender: u.gender || u.profile?.gender || "Not specified",
    location: location || "Not specified",
    subscription: planName,
    status: displayStatus,
    rawStatus,
    avatar,
    photos,
    joinDate: joinDate || "Recent",
    joinTime: joinTime || "",
  };
};

export default function AdminUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Users");
  const [selectedTabFilter, setSelectedTabFilter] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchUsersList = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      const rawUsers = response.data?.users || response.data || [];
      const normalized = Array.isArray(rawUsers)
        ? rawUsers.map(normalizeUser)
        : [];
      setUsersData(normalized);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTabFilter, selectedGender, selectedPlan]);

  const totalCount = usersData.length;
  const activeCount = usersData.filter(
    (u) => (u.rawStatus || u.status || "").toLowerCase() === "active"
  ).length;
  const suspendedCount = usersData.filter(
    (u) => (u.rawStatus || u.status || "").toLowerCase() === "suspended"
  ).length;
  const inactiveCount = usersData.filter(
    (u) => (u.rawStatus || u.status || "").toLowerCase() === "inactive"
  ).length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const newTodayCount = usersData.filter((u) => {
    if (!u.createdAt) return false;
    return new Date(u.createdAt).toISOString().slice(0, 10) === todayStr;
  }).length;

  const kpiCards = [
    {
      title: "Total Users",
      value: totalCount,
      bgColor: "#FF2D72",
      icon: Users,
    },
    {
      title: "Active Users",
      value: activeCount,
      bgColor: "#3B82F6",
      icon: UserCheck,
    },
    {
      title: "Suspended Users",
      value: suspendedCount,
      bgColor: "#EF4444",
      icon: UserX,
    },
    {
      title: "New Today",
      value: newTodayCount,
      bgColor: "#22C55E",
      icon: Clock,
    },
  ];

  const filteredUsers = usersData.filter((user) => {
    const userStatus = (user.status || "active").toLowerCase();
    const matchesTab =
      selectedTabFilter === "All" ||
      userStatus === selectedTabFilter.toLowerCase();

    const matchesGender =
      selectedGender === "All" ||
      (user.gender || "").toLowerCase() === selectedGender.toLowerCase();

    const matchesPlan =
      selectedPlan === "All" ||
      (user.subscription || "").toLowerCase() === selectedPlan.toLowerCase();

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term);

    return matchesTab && matchesGender && matchesPlan && matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Selected user preview
  const currentSelectedUser =
    selectedUser && usersData.some((u) => u.id === selectedUser.id)
      ? usersData.find((u) => u.id === selectedUser.id) || selectedUser
      : null;

  const isAllSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((u) => selectedUserIds.includes(u.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUserIds((prev) =>
        prev.filter((id) => !paginatedUsers.some((u) => u.id === id))
      );
    } else {
      const pageIds = paginatedUsers.map((u) => u.id);
      setSelectedUserIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedUserIds.length === 0) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedUserIds.length} users?`
      )
    )
      return;
    try {
      await Promise.all(selectedUserIds.map((id) => deleteUser(id)));
      setUsersData((prev) =>
        prev.filter((u) => !selectedUserIds.includes(u.id))
      );
      if (selectedUser && selectedUserIds.includes(selectedUser.id)) {
        setSelectedUser(null);
      }
      setSelectedUserIds([]);
    } catch (error) {
      console.error("Failed to delete selected users:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);

      setUsersData((prev) => prev.filter((u) => u.id !== id));
      setSelectedUserIds((prev) => prev.filter((item) => item !== id));

      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateUserStatus(id, status);

      const displayStatus =
        status === "active"
          ? "Active"
          : status === "suspended"
            ? "Suspended"
            : "Inactive";

      setUsersData((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...user, status: displayStatus, rawStatus: status }
            : user
        )
      );

      setSelectedUser((prev) =>
        prev && prev.id === id
          ? { ...prev, status: displayStatus, rawStatus: status }
          : prev
      );
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const getStatusBadgeStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "active") {
      return { bg: "#DCFCE7", text: "#16A34A" };
    }
    if (s === "suspended") {
      return { bg: "#FEE2E2", text: "#EF4444" };
    }
    return { bg: "#F3F4F6", text: "#6B7280" };
  };

  const getPlanBadgeStyle = (plan) => {
    const p = (plan || "").toLowerCase();
    if (p.includes("vip") || p.includes("gold")) {
      return { bg: "#FEF3C7", text: "#D97706" };
    }
    if (p.includes("premium")) {
      return { bg: COLORS.lightPink, text: COLORS.pink };
    }
    return { bg: "#F3F4F6", text: "#6B7280" };
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
                Users Management
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage, inspect and review registered application users
              </p>
            </div>
            <button
              onClick={fetchUsersList}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-xs cursor-pointer transition-all self-start sm:self-auto"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
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

          {/* TABLE AND RIGHT PREVIEW PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* USERS TABLE & INTEGRATED FILTERS */}
            <div
              className={`${
                currentSelectedUser ? "xl:col-span-2" : "xl:col-span-3"
              } bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}
            >
              {/* Status Filter Pills */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
                {[
                  { label: "All Users", count: totalCount, key: "All" },
                  { label: "Active", count: activeCount, key: "Active" },
                  { label: "Inactive", count: inactiveCount, key: "Inactive" },
                  { label: "Suspended", count: suspendedCount, key: "Suspended" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTabFilter(tab.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedTabFilter === tab.key
                        ? "text-white shadow-xs"
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

              {/* Filter Inputs & Controls */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email or phone..."
                    className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none flex-1 md:flex-none cursor-pointer"
                  >
                    <option value="All">Gender: All</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>

                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none flex-1 md:flex-none cursor-pointer"
                  >
                    <option value="All">Plan: All</option>
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP Gold">VIP Gold</option>
                  </select>

                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTabFilter("All");
                      setSelectedGender("All");
                      setSelectedPlan("All");
                    }}
                    className="text-xs font-bold text-gray-400 hover:text-gray-600 px-2 py-2.5 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Table Top Action Bar */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">
                    All Users
                  </span>
                  {selectedUserIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedUserIds.length})</span>
                    </button>
                  )}
                </div>
                {selectedUserIds.length > 0 && (
                  <span className="text-xs font-semibold text-gray-500">
                    {selectedUserIds.length} of {filteredUsers.length} selected
                  </span>
                )}
              </div>

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
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Plan</th>
                      <th className="pb-3 font-semibold">Joined Date</th>
                      <th className="pb-3 font-semibold">Location</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Action</th>
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
                            <span className="text-xs font-medium">
                              Loading users...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : paginatedUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-8 text-center text-gray-400"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((user) => {
                        const isSelected =
                          currentSelectedUser &&
                          currentSelectedUser.id === user.id;
                        const isChecked = selectedUserIds.includes(user.id);
                        const statusStyle = getStatusBadgeStyle(user.status);
                        const planStyle = getPlanBadgeStyle(user.subscription);

                        return (
                          <tr
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
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
                                  handleToggleSelect(user.id);
                                }}
                                className="rounded text-[#FF2D72] focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-9 h-9 rounded-full object-cover border"
                                  style={{
                                    borderColor: isSelected
                                      ? COLORS.pink
                                      : "#E5E7EB",
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      user.name || "User"
                                    )}&background=FF2D72&color=fff`;
                                  }}
                                />
                                <div>
                                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                                    {user.name}
                                  </div>
                                  <div className="text-[11px] text-gray-400">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <span
                                className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                                style={{
                                  backgroundColor: planStyle.bg,
                                  color: planStyle.text,
                                }}
                              >
                                {user.subscription}
                              </span>
                            </td>
                            <td className="py-3.5">
                              <div className="font-semibold text-gray-700">
                                {user.joinDate}
                              </div>
                            </td>
                            <td className="py-3.5 text-gray-600 font-medium">
                              {user.location}
                            </td>
                            <td className="py-3.5">
                              <span
                                className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                                style={{
                                  backgroundColor: statusStyle.bg,
                                  color: statusStyle.text,
                                }}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedUser(user);
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
                                  View
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteUser(user.id);
                                  }}
                                  title="Delete User"
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

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400 mt-2">
                <span>
                  Showing {filteredUsers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
                  {Math.min(currentPage * pageSize, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pg) => (
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
                      )
                    )}
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

            {/* RIGHT USER INFORMATION PREVIEW PANEL */}
            {currentSelectedUser && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-5 h-fit sticky top-6 xl:col-span-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2
                      className="text-base font-bold"
                      style={{ color: COLORS.dark }}
                    >
                      User Preview
                    </h2>
                    <button
                      onClick={() => setSelectedUser(null)}
                      title="Close drawer"
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Profile Card */}
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50/60 rounded-2xl border border-gray-100">
                    <img
                      src={currentSelectedUser.avatar}
                      alt={currentSelectedUser.name}
                      className="w-20 h-20 rounded-full object-cover border-4 shadow-sm"
                      style={{ borderColor: COLORS.pink }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          currentSelectedUser.name || "User"
                        )}&background=FF2D72&color=fff`;
                      }}
                    />
                    <h3
                      className="font-extrabold text-base mt-2"
                      style={{ color: COLORS.dark }}
                    >
                      {currentSelectedUser.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {currentSelectedUser.email}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full font-bold text-[10px]"
                        style={{
                          backgroundColor: getStatusBadgeStyle(
                            currentSelectedUser.status
                          ).bg,
                          color: getStatusBadgeStyle(
                            currentSelectedUser.status
                          ).text,
                        }}
                      >
                        {currentSelectedUser.status}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full font-bold text-[10px]"
                        style={{
                          backgroundColor: getPlanBadgeStyle(
                            currentSelectedUser.subscription
                          ).bg,
                          color: getPlanBadgeStyle(
                            currentSelectedUser.subscription
                          ).text,
                        }}
                      >
                        {currentSelectedUser.subscription}
                      </span>
                    </div>
                  </div>

                  {/* Details Breakdown */}
                  <div className="mt-4 space-y-3 text-xs">
                    <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                      User Details
                    </h4>

                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{currentSelectedUser.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{currentSelectedUser.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>
                        Joined: {currentSelectedUser.joinDate}
                        {currentSelectedUser.joinTime
                          ? `, ${currentSelectedUser.joinTime}`
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  {currentSelectedUser.status?.toLowerCase() !== "active" ? (
                    <button
                      onClick={() =>
                        handleStatusChange(currentSelectedUser.id, "active")
                      }
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: COLORS.success }}
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Activate User</span>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleStatusChange(currentSelectedUser.id, "inactive")
                      }
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: COLORS.warning }}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Deactivate</span>
                    </button>
                  )}

                  {currentSelectedUser.status?.toLowerCase() !==
                    "suspended" && (
                    <button
                      onClick={() =>
                        handleStatusChange(currentSelectedUser.id, "suspended")
                      }
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: COLORS.danger }}
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Suspend</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
