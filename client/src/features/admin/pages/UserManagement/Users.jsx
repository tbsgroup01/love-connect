import React, { useState } from "react";
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
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";

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

const INITIAL_USERS = [
  {
    id: 1,
    name: "Aaradhya Sharma",
    email: "aaradhya@gmail.com",
    phone: "+91 98765 43210",
    gender: "Female",
    age: 24,
    location: "Delhi, India",
    joinDate: "15 Sep 2026",
    joinTime: "10:24 AM",
    subscription: "Premium",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 142,
    likesCount: 580,
  },
  {
    id: 2,
    name: "Rohit Mehta",
    email: "rohitm@gmail.com",
    phone: "+91 98123 45678",
    gender: "Male",
    age: 27,
    location: "Mumbai, India",
    joinDate: "15 Sep 2026",
    joinTime: "09:18 AM",
    subscription: "Free",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 45,
    likesCount: 120,
  },
  {
    id: 3,
    name: "Priya Singh",
    email: "priya@gmail.com",
    phone: "+91 99887 66554",
    gender: "Female",
    age: 23,
    location: "Bangalore, India",
    joinDate: "14 Sep 2026",
    joinTime: "05:42 PM",
    subscription: "VIP Gold",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 210,
    likesCount: 890,
  },
  {
    id: 4,
    name: "Karan Verma",
    email: "karan@gmail.com",
    phone: "+91 97112 23344",
    gender: "Male",
    age: 29,
    location: "Hyderabad, India",
    joinDate: "14 Sep 2026",
    joinTime: "03:21 PM",
    subscription: "Free",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 12,
    likesCount: 35,
  },
  {
    id: 5,
    name: "Neha Patel",
    email: "neha@gmail.com",
    phone: "+91 96543 21098",
    gender: "Female",
    age: 25,
    location: "Chennai, India",
    joinDate: "14 Sep 2026",
    joinTime: "11:12 AM",
    subscription: "Premium",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 98,
    likesCount: 430,
  },
  {
    id: 6,
    name: "Vikram Singh",
    email: "vikramsingh@gmail.com",
    phone: "+91 95432 10987",
    gender: "Male",
    age: 28,
    location: "Delhi, India",
    joinDate: "13 Sep 2026",
    joinTime: "09:36 PM",
    subscription: "Free",
    status: "Suspended",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 3,
    likesCount: 15,
  },
  {
    id: 7,
    name: "Riya Malhotra",
    email: "riya@gmail.com",
    phone: "+91 94321 09876",
    gender: "Female",
    age: 22,
    location: "Pune, India",
    joinDate: "13 Sep 2026",
    joinTime: "12:24 PM",
    subscription: "Premium",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 175,
    likesCount: 640,
  },
  {
    id: 8,
    name: "Amit Kumar",
    email: "amit@gmail.com",
    phone: "+91 93210 98765",
    gender: "Male",
    age: 30,
    location: "Kolkata, India",
    joinDate: "12 Sep 2026",
    joinTime: "06:18 PM",
    subscription: "Free",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 32,
    likesCount: 95,
  },
  {
    id: 9,
    name: "Sneha Reddy",
    email: "sneha@gmail.com",
    phone: "+91 92109 87654",
    gender: "Female",
    age: 26,
    location: "Hyderabad, India",
    joinDate: "12 Sep 2026",
    joinTime: "04:50 PM",
    subscription: "VIP Gold",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 240,
    likesCount: 920,
  },
  {
    id: 10,
    name: "Pooja Verma",
    email: "pooja@gmail.com",
    phone: "+91 91098 76543",
    gender: "Female",
    age: 24,
    location: "Jaipur, India",
    joinDate: "11 Sep 2026",
    joinTime: "02:14 PM",
    subscription: "Free",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    ],
    matchesCount: 18,
    likesCount: 65,
  },
];

export default function AdminUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Users");
  const [selectedTabFilter, setSelectedTabFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersData, setUsersData] = useState(INITIAL_USERS);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const kpiCards = [
    {
      title: "Total Users",
      value: "24,568",
      bgColor: "#FF2D72",
      icon: Users,
    },
    {
      title: "Active Users",
      value: "18,432",
      bgColor: "#3B82F6",
      icon: UserCheck,
    },
    {
      title: "Suspended Users",
      value: "428",
      bgColor: "#EF4444",
      icon: UserX,
    },
    {
      title: "New Today",
      value: "116",
      bgColor: "#22C55E",
      icon: Clock,
    },
  ];

  const filteredUsers = usersData.filter((user) => {
    const matchesTab =
      selectedTabFilter === "All" ||
      user.status.toLowerCase() === selectedTabFilter.toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  // Selected user preview (null by default)
  const currentSelectedUser =
    selectedUser && usersData.some((u) => u.id === selectedUser.id)
      ? selectedUser
      : null;

  const isAllSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedUserIds.includes(u.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedUserIds.length === 0) return;
    setUsersData((prev) => prev.filter((u) => !selectedUserIds.includes(u.id)));
    setSelectedUserIds([]);
  };

  const handleDeleteUser = (id) => {
    setUsersData((prev) => prev.filter((u) => u.id !== id));
    setSelectedUserIds((prev) => prev.filter((item) => item !== id));
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
              className={`${currentSelectedUser ? "xl:col-span-2" : "xl:col-span-3"} bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}
            >
              {/* Status Filter Pills */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
                {[
                  { label: "All Users", count: "24,568", key: "All" },
                  { label: "Active", count: "18,432", key: "Active" },
                  { label: "Inactive", count: "5,708", key: "Inactive" },
                  { label: "Suspended", count: "428", key: "Suspended" },
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
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none flex-1 md:flex-none">
                    <option>Gender: All</option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>

                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none flex-1 md:flex-none">
                    <option>Plan: All</option>
                    <option>Free</option>
                    <option>Premium</option>
                    <option>VIP Gold</option>
                  </select>

                  <button
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-white font-bold text-xs shadow-xs cursor-pointer"
                    style={{ backgroundColor: COLORS.pink }}
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter</span>
                  </button>

                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTabFilter("All");
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
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-8 text-center text-gray-400"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => {
                        const isSelected =
                          currentSelectedUser &&
                          currentSelectedUser.id === user.id;
                        const isChecked = selectedUserIds.includes(user.id);
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
                                />
                                <div>
                                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                                    {user.name}
                                    <span className="text-[10px] text-gray-400 font-normal">
                                      ({user.gender[0]}, {user.age})
                                    </span>
                                  </div>
                                  <div className="text-gray-400 text-[11px]">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <span
                                className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                                style={{
                                  backgroundColor:
                                    user.subscription === "VIP Gold"
                                      ? "#FEF3C7"
                                      : user.subscription === "Premium"
                                        ? COLORS.lightPink
                                        : "#F3F4F6",
                                  color:
                                    user.subscription === "VIP Gold"
                                      ? "#D97706"
                                      : user.subscription === "Premium"
                                        ? COLORS.pink
                                        : "#6B7280",
                                }}
                              >
                                {user.subscription}
                              </span>
                            </td>
                            <td className="py-3.5">
                              <div className="font-semibold text-gray-700">
                                {user.joinDate}
                              </div>
                              <div className="text-gray-400 text-[10px]">
                                {user.joinTime}
                              </div>
                            </td>
                            <td className="py-3.5 text-gray-600 font-medium">
                              {user.location}
                            </td>
                            <td className="py-3.5">
                              <span
                                className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                                style={{
                                  backgroundColor:
                                    user.status === "Active"
                                      ? "#DCFCE7"
                                      : user.status === "Inactive"
                                        ? "#F3F4F6"
                                        : "#FEE2E2",
                                  color:
                                    user.status === "Active"
                                      ? "#16A34A"
                                      : user.status === "Inactive"
                                        ? "#6B7280"
                                        : "#EF4444",
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
                  Showing {filteredUsers.length > 0 ? 1 : 0} to{" "}
                  {filteredUsers.length} of {usersData.length} users
                </span>
                <div className="flex items-center gap-2">
                  <select className="bg-gray-50 border border-gray-200 text-xs text-gray-700 rounded-lg px-2 py-1 focus:outline-none">
                    <option>10 per page</option>
                    <option>25 per page</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded-lg hover:bg-gray-100">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="w-6 h-6 rounded-lg font-bold text-white text-xs flex items-center justify-center"
                      style={{ backgroundColor: COLORS.pink }}
                    >
                      1
                    </button>
                    <button className="w-6 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      2
                    </button>
                    <button className="w-6 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      3
                    </button>
                    <button className="p-1 rounded-lg hover:bg-gray-100">
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
                          backgroundColor:
                            currentSelectedUser.status === "Active"
                              ? "#DCFCE7"
                              : "#FEE2E2",
                          color:
                            currentSelectedUser.status === "Active"
                              ? "#16A34A"
                              : "#EF4444",
                        }}
                      >
                        {currentSelectedUser.status}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full font-bold text-[10px]"
                        style={{
                          backgroundColor: COLORS.lightPink,
                          color: COLORS.pink,
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
                        Joined: {currentSelectedUser.joinDate},{" "}
                        {currentSelectedUser.joinTime}
                      </span>
                    </div>

                    {/* Activity Stats */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100 text-center">
                        <span className="text-[10px] text-gray-400 font-semibold block">
                          Matches
                        </span>
                        <span
                          className="font-extrabold text-sm"
                          style={{ color: COLORS.pink }}
                        >
                          {currentSelectedUser.matchesCount}
                        </span>
                      </div>
                      <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100 text-center">
                        <span className="text-[10px] text-gray-400 font-semibold block">
                          Likes Sent
                        </span>
                        <span
                          className="font-extrabold text-sm"
                          style={{ color: COLORS.purple }}
                        >
                          {currentSelectedUser.likesCount}
                        </span>
                      </div>
                    </div>

                    {/* User Photos Grid */}
                    <div className="pt-2">
                      <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2">
                        Uploaded Photos (
                        {currentSelectedUser.photos?.length || 0})
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {currentSelectedUser.photos?.map((photo, pIdx) => (
                          <img
                            key={pIdx}
                            src={photo}
                            alt="User upload"
                            className="w-full h-16 rounded-xl object-cover border border-gray-100"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90"
                    style={{ backgroundColor: COLORS.success }}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Activate</span>
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90"
                    style={{ backgroundColor: COLORS.danger }}
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>Suspend</span>
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
