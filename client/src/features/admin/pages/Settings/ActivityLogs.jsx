import React, { useState } from "react";
import {
  History,
  Search,
  Download,
  X,
  Clock,
  Globe,
  LogIn,
  UserX,
  ShieldCheck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";

export default function ActivityLogs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Activity Logs");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState("All");
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Initial Activity Logs Data covering all 7 Tracked Activities
  const logsData = [
    {
      id: "LOG-8801",
      admin: {
        name: "Alexander Wright",
        email: "alexander.w@loveconnect.com",
        role: "Super Admin",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      },
      action: "Successful login via 2FA authentication to admin dashboard",
      ip: "192.168.1.105",
      date: "29 Sep 2026",
      time: "10:42 AM",
      module: "Admin Login",
      status: "Success",
      details:
        "Authenticated from Chrome 128 / Windows 11 with hardware security token.",
    },
    {
      id: "LOG-8802",
      admin: {
        name: "Sophia Chen",
        email: "sophia.chen@loveconnect.com",
        role: "Moderator",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      },
      action:
        "Suspended user account @rohit_kumar for 30 days due to harassment policy violation",
      ip: "103.21.124.89",
      date: "29 Sep 2026",
      time: "10:15 AM",
      module: "Login",
      status: "Success",
      details:
        "User ID: #USR-9104. Triggered following 4 verified chat abuse reports from matched members.",
    },
    {
      id: "LOG-8803",
      admin: {
        name: "Sophia Chen",
        email: "sophia.chen@loveconnect.com",
        role: "Moderator",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      },
      action:
        "Approved biometric selfie and Govt ID profile verification for Aanya Sen",
      ip: "103.21.124.89",
      date: "29 Sep 2026",
      time: "09:50 AM",
      module: "Login",
      status: "Success",
      details:
        "User ID: #USR-8492. Aadhaar card & live selfie face-match passed with 99.4% confidence.",
    },
    {
      id: "LOG-8804",
      admin: {
        name: "Priya Sharma",
        email: "priya.s@loveconnect.com",
        role: "Finance Admin",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      },
      action:
        "Updated Razorpay webhook endpoints and enabled automated instant UPI refunds",
      ip: "49.36.120.14",
      date: "29 Sep 2026",
      time: "09:12 AM",
      module: "Logout",
      status: "Success",
      details:
        "Updated webhook URL to production gateway route. Auto-settlement threshold set to ₹50,000.",
    },
    {
      id: "LOG-8805",
      admin: {
        name: "Alexander Wright",
        email: "alexander.w@loveconnect.com",
        role: "Super Admin",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      },
      action:
        "Modified Platinum 3-Month VIP subscription package pricing from ₹1,299 to ₹1,199",
      ip: "192.168.1.105",
      date: "28 Sep 2026",
      time: "06:30 PM",
      module: "login",
      status: "Success",
      details:
        "Plan ID: PLAN-PLAT-03. Adjusted seasonal promotional discount to 20% for festive season.",
    },
    {
      id: "LOG-8806",
      admin: {
        name: "Alexander Wright",
        email: "alexander.w@loveconnect.com",
        role: "Super Admin",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      },
      action:
        "Updated application security settings: changed idle session timeout from 120m to 60m",
      ip: "192.168.1.105",
      date: "28 Sep 2026",
      time: "04:15 PM",
      module: "logout",
      status: "Success",
      details:
        "Enforced stricter admin session duration and auto-lock after 15 minutes of inactivity.",
    },
    {
      id: "LOG-8807",
      admin: {
        name: "Rahul Verma",
        email: "rahul.v@loveconnect.com",
        role: "Moderator",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      },
      action:
        'Published new promotional banner "Navratri Love Festival 2026" on Discovery feed',
      ip: "157.34.89.21",
      date: "28 Sep 2026",
      time: "02:40 PM",
      module: "Login",
      status: "Success",
      details:
        "Banner ID: BAN-2026-09. Linked directly to Premium subscription checkout discount.",
    },
    {
      id: "LOG-8808",
      admin: {
        name: "Vikram Malhotra",
        email: "vikram.m@loveconnect.com",
        role: "Support Admin",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      },
      action:
        "Permanently suspended fraudulent user account #USR-1094 following scam reports",
      ip: "182.73.19.45",
      date: "28 Sep 2026",
      time: "01:10 PM",
      module: "Login",
      status: "Success",
      details:
        "Account banned indefinitely and device identifier blacklisted to prevent re-registration.",
    },
    {
      id: "LOG-8809",
      admin: {
        name: "Sophia Chen",
        email: "sophia.chen@loveconnect.com",
        role: "Moderator",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      },
      action:
        "Approved blue verified badge for public figure profile @tanya_mehra",
      ip: "103.21.124.89",
      date: "28 Sep 2026",
      time: "11:25 AM",
      module: "Login",
      status: "Success",
      details:
        "Verified creator documentation and cross-referenced with official Instagram credentials.",
    },

  ];

  // Filter items based on active module tab and search term
  const filteredLogs = logsData.filter((item) => {
    if (
      selectedModuleFilter !== "All" &&
      item.module !== selectedModuleFilter
    ) {
      return false;
    }

    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      const matchAdmin =
        item.admin.name.toLowerCase().includes(q) ||
        item.admin.email.toLowerCase().includes(q);
      const matchAction = item.action.toLowerCase().includes(q);
      const matchIp = item.ip.toLowerCase().includes(q);
      const matchDate =
        item.date.toLowerCase().includes(q) ||
        item.time.toLowerCase().includes(q);
      const matchModule = item.module.toLowerCase().includes(q);
      return matchAdmin || matchAction || matchIp || matchDate || matchModule;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCopyPayload = () => {
    if (selectedLog) {
      navigator.clipboard.writeText(
        `[${selectedLog.id}] ${selectedLog.date} ${selectedLog.time}\nAdmin: ${selectedLog.admin.name} (${selectedLog.admin.email})\nModule: ${selectedLog.module}\nIP: ${selectedLog.ip}\nAction: ${selectedLog.action}\nDetails: ${selectedLog.details}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Log ID",
      "Admin Name",
      "Admin Email",
      "Action",
      "IP Address",
      "Date",
      "Time",
      "Module",
    ];
    const rows = filteredLogs.map((l) => [
      l.id,
      `"${l.admin.name}"`,
      `"${l.admin.email}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      l.ip,
      l.date,
      l.time,
      `"${l.module}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `LoveConnect_Activity_Logs_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Activity Logs
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Track admin logins, user suspensions, verifications, payments,
                subscriptions, settings, and content changes
              </p>
            </div>
          </div>
          {/* MAIN ACTIVITY LOGS TABLE CONTAINER */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* SEARCH & FILTER CONTROLS BAR */}
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Admin, Action, IP, Module..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-gray-50/80 border border-gray-200 text-xs rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF2D72] focus:bg-white transition-all text-gray-800 placeholder-gray-400 font-semibold"
                />
              </div>
            </div>
            {/* TABLE GRID */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-black">
                    <th className="py-4 px-6">Admin</th>
                    <th className="py-4 px-6">IP</th>
                    <th className="py-4 px-6">Date / Time</th>
                    <th className="py-4 px-6">Module</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {paginatedLogs.length > 0 ? (
                    paginatedLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-[#FFE7F0]/20 transition-colors group cursor-pointer"
                        onClick={() => setSelectedLog(log)}
                      >
                        {/* 1. Admin */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={log.admin.avatar}
                              alt={log.admin.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100 shadow-xs transition-transform group-hover:scale-105"
                            />
                            <div>
                              <span className="font-extrabold text-gray-900 text-xs block">
                                {log.admin.name}
                              </span>
                              <span className="text-[10px] font-semibold text-gray-400 block">
                                {log.admin.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        {/* 3. IP */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-gray-700 bg-gray-100/90 border border-gray-200 px-2.5 py-1 rounded-lg">
                            <Globe className="w-3.5 h-3.5 text-gray-400" />
                            {log.ip}
                          </span>
                        </td>

                        {/* 4. Date / Time */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 font-bold text-gray-700">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>
                              {log.date}, {log.time}
                            </span>
                          </div>
                        </td>

                        {/* 5. Module */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-[#FFE7F0] text-[#FF2D72] border border-pink-200/80 shadow-2xs">
                            {log.module}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-12 text-center text-gray-400 font-medium"
                      >
                        No activity logs found matching filter criteria.
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
          </div>{" "}
        </main>
      </div>
    </div>
  );
}
