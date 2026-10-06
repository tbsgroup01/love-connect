import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  MessageCircle,
  ShieldAlert,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy,
  Check,
  X,
  Trash2,
  Users,
  Loader2,
  RefreshCw,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";

import { getAllMatches, deleteMatch } from "../../../../services/matchesServices.js";
import { getAllUsers } from "../../../../services/usersServices.js";
import { getReports } from "../../../../services/reportsServices.js";
import { getMessages } from "../../../../services/chatsServices.js";
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

export default function ChatManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat Management");
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(false);
  const [conversationsData, setConversationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedChatIds, setSelectedChatIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [kpiStats, setKpiStats] = useState({
    totalUsers: 0,
    totalConversations: 0,
    activeChats: 0,
    reportedChats: 0,
  });

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80";

  const calculateAge = (dobString) => {
    if (!dobString) return 25;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return 25;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970) || 25;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Recent";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "10:00 AM";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "10:00 AM";
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const fetchDbData = useCallback(async () => {
    setLoading(true);
    try {
      const [matchesRes, usersRes, reportsRes] = await Promise.allSettled([
        getAllMatches(),
        getAllUsers(),
        getReports(),
      ]);

      const rawMatches =
        matchesRes.status === "fulfilled"
          ? matchesRes.value.data?.matches || []
          : [];
      const rawUsers =
        usersRes.status === "fulfilled"
          ? usersRes.value.data?.users || []
          : [];
      const rawReports =
        reportsRes.status === "fulfilled"
          ? reportsRes.value.data?.reports || []
          : [];

      // Format matches into conversation rows
      const formattedConversations = rawMatches.map((m) => {
        const uA = m.userOne || {};
        const pA = uA.profile || {};
        const uB = m.userTwo || {};
        const pB = uB.profile || {};
        const conv = m.conversation || null;

        const convIdFormatted = conv
          ? `CNV-${String(conv.id).padStart(6, "0")}`
          : `MCH-${String(m.id).padStart(6, "0")}`;

        const rawActivityDate = conv?.lastMessageAt || conv?.updatedAt || m.matched_at;
        const rawCreatedDate = conv?.createdAt || m.matched_at || m.createdAt;

        return {
          id: m.id,
          matchId: m.id,
          conversationIdNum: conv?.id || null,
          conversationId: convIdFormatted,
          hasStartedChat: Boolean(conv?.id),
          userA: {
            id: uA.id,
            name: pA.full_name || uA.name || "User A",
            age: uA.age || calculateAge(pA.date_of_birth),
            location: pA.city
              ? `${pA.city}, ${pA.country || "India"}`
              : pA.country || "India",
            avatar: getImageUrl(pA.profile_picture || uA.profile_image) || defaultAvatar,
          },
          userB: {
            id: uB.id,
            name: pB.full_name || uB.name || "User B",
            age: uB.age || calculateAge(pB.date_of_birth),
            location: pB.city
              ? `${pB.city}, ${pB.country || "India"}`
              : pB.country || "India",
            avatar: getImageUrl(pB.profile_picture || uB.profile_image) || defaultAvatar,
          },
          lastActivityDate: formatDate(rawActivityDate),
          lastActivityTime: formatTime(rawActivityDate),
          createdDate: formatDate(rawCreatedDate),
          totalMessages: 0,
          messages: [],
          rawActivityDate,
        };
      });

      // Fetch message history for conversations that have conversationIdNum
      const enrichedConversations = await Promise.all(
        formattedConversations.map(async (item) => {
          if (!item.conversationIdNum) return item;
          try {
            const mRes = await getMessages(item.conversationIdNum);
            const rawMsgs = mRes.data?.messages || [];
            const formattedMsgs = rawMsgs.map((msg) => ({
              senderId: Number(msg.sender_id) === Number(item.userA.id) ? "userA" : "userB",
              text: msg.content,
              time: formatTime(msg.createdAt),
            }));
            return {
              ...item,
              totalMessages: formattedMsgs.length,
              messages: formattedMsgs,
            };
          } catch (err) {
            void err;
            return item;
          }
        })
      );

      setConversationsData(enrichedConversations);

      // If a chat was already selected, update it with enriched data
      setSelectedChat((prev) => {
        if (!prev) return enrichedConversations[0] || null;
        const updated = enrichedConversations.find((c) => c.id === prev.id);
        return updated || prev;
      });

      // Compute Active Chats (lastActivityDate within past 7 days)
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const activeCount = enrichedConversations.filter((c) => {
        const d = new Date(c.rawActivityDate);
        return !isNaN(d.getTime()) && d.getTime() >= sevenDaysAgo;
      }).length;

      setKpiStats({
        totalUsers: rawUsers.length,
        totalConversations: enrichedConversations.length,
        activeChats: activeCount || enrichedConversations.length,
        reportedChats: rawReports.length,
      });
    } catch (err) {
      console.error("Error fetching database chats data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDbData();
  }, [fetchDbData]);

  // Load chat messages when a conversation is selected in drawer
  const handleSelectChat = async (item) => {
    setSelectedChat(item);

    if (item.conversationIdNum) {
      setLoadingMessages(true);
      try {
        const res = await getMessages(item.conversationIdNum);
        const rawMsgs = res.data?.messages || [];
        const formattedMsgs = rawMsgs.map((msg) => ({
          senderId: Number(msg.sender_id) === Number(item.userA.id) ? "userA" : "userB",
          text: msg.content,
          time: formatTime(msg.createdAt),
        }));

        setSelectedChat((prev) =>
          prev && prev.id === item.id
            ? {
                ...prev,
                messages: formattedMsgs,
                totalMessages: formattedMsgs.length,
              }
            : prev
        );

        setConversationsData((prev) =>
          prev.map((c) =>
            c.id === item.id
              ? {
                  ...c,
                  messages: formattedMsgs,
                  totalMessages: formattedMsgs.length,
                }
              : c
          )
        );
      } catch (err) {
        console.warn("Could not fetch messages for conversation:", err);
      } finally {
        setLoadingMessages(false);
      }
    }
  };

  const currentSelected =
    selectedChat && conversationsData.some((c) => c.id === selectedChat.id)
      ? selectedChat
      : null;

  const filteredConversations = conversationsData.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      !searchTerm ||
      item.userA.name.toLowerCase().includes(term) ||
      item.userB.name.toLowerCase().includes(term) ||
      item.conversationId.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredConversations.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredConversations.length);
  const paginatedConversations = filteredConversations.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const isAllSelected =
    paginatedConversations.length > 0 &&
    paginatedConversations.every((item) => selectedChatIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedChatIds([]);
    } else {
      setSelectedChatIds(paginatedConversations.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedChatIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Delete single conversation from database
  const handleDeleteConversation = async (id, matchId) => {
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;
    try {
      if (matchId) {
        await deleteMatch(matchId);
      }
      setConversationsData((prev) => prev.filter((item) => item.id !== id));
      setSelectedChatIds((prev) => prev.filter((item) => item !== id));
      if (selectedChat?.id === id) setSelectedChat(null);
      setKpiStats((prev) => ({
        ...prev,
        totalConversations: Math.max(0, prev.totalConversations - 1),
      }));
    } catch (err) {
      console.error("Failed to delete conversation:", err);
      alert("Failed to delete conversation. Please try again.");
    }
  };

  // Delete selected conversations from database
  const handleDeleteSelected = async () => {
    if (selectedChatIds.length === 0) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedChatIds.length} conversations?`
      )
    )
      return;

    try {
      const toDelete = conversationsData.filter((c) =>
        selectedChatIds.includes(c.id)
      );

      await Promise.allSettled(
        toDelete.map((c) => (c.matchId ? deleteMatch(c.matchId) : Promise.resolve()))
      );

      setConversationsData((prev) =>
        prev.filter((item) => !selectedChatIds.includes(item.id))
      );
      if (selectedChat && selectedChatIds.includes(selectedChat.id)) {
        setSelectedChat(null);
      }
      setKpiStats((prev) => ({
        ...prev,
        totalConversations: Math.max(0, prev.totalConversations - selectedChatIds.length),
      }));
      setSelectedChatIds([]);
    } catch (err) {
      console.error("Failed to delete selected conversations:", err);
      alert("Error deleting some conversations.");
    }
  };

  const kpiCards = [
    {
      title: "Total Users",
      value: kpiStats.totalUsers.toLocaleString(),
      bgColor: "#FF2D72",
      icon: Users,
    },
    {
      title: "Total Conversations",
      value: kpiStats.totalConversations.toLocaleString(),
      bgColor: "#FF2D72",
      icon: MessageSquare,
    },
    {
      title: "Active Chats",
      value: kpiStats.activeChats.toLocaleString(),
      bgColor: "#22C55E",
      icon: MessageCircle,
    },
    {
      title: "Reported Chats",
      value: kpiStats.reportedChats.toLocaleString(),
      bgColor: "#EF4444",
      icon: ShieldAlert,
    },
  ];

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
                Chat Management
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Monitor live user conversations, track active chat sessions, and
                manage privacy-compliant reported chats
              </p>
            </div>
            <button
              onClick={fetchDbData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:border-[#FF2D72] hover:text-[#FF2D72] shadow-xs transition-all cursor-pointer self-start sm:self-auto disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Database</span>
            </button>
          </div>

          {/* TOP 4 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                      {loading ? (
                        <span className="text-gray-300 text-sm font-normal">Loading...</span>
                      ) : (
                        kpi.value
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TABLE AND RIGHT PREVIEW PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* CONVERSATIONS TABLE */}
            <div
              className={`${
                currentSelected ? "xl:col-span-2" : "xl:col-span-3"
              } bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}
            >
              {/* Table Header & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-gray-700">
                    All Conversations
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {filteredConversations.length}
                  </span>
                  {selectedChatIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedChatIds.length})</span>
                    </button>
                  )}
                  {selectedChatIds.length > 0 && (
                    <span className="text-xs font-semibold text-gray-500 ml-1">
                      ({selectedChatIds.length} selected)
                    </span>
                  )}
                </div>
                <div className="w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search User or Chat ID..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Table with columns: User, Conversation, Last Activity, Action */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[550px]">
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
                      <th className="pb-3 font-semibold">Conversation</th>
                      <th className="pb-3 font-semibold">Last Activity</th>
                      <th className="pb-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <Loader2 className="w-6 h-6 text-[#FF2D72] animate-spin" />
                            <span className="text-xs font-medium">
                              Loading database conversations...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredConversations.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-10 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center space-y-1">
                            <MessageSquare className="w-6 h-6 text-gray-300" />
                            <span className="text-xs font-bold text-gray-500">
                              {searchTerm ? "No matching conversations found" : "No conversations in database"}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {searchTerm
                                ? "Try a different search query"
                                : "When users match and chat, their threads will appear here"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedConversations.map((item) => {
                        const isSelected =
                          currentSelected && currentSelected.id === item.id;
                        const isChecked = selectedChatIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            onClick={() => handleSelectChat(item)}
                            className={`cursor-pointer transition-colors ${
                              isChecked
                                ? "bg-pink-50/40"
                                : isSelected
                                  ? "bg-pink-50/20"
                                  : "hover:bg-gray-50/50"
                            }`}
                          >
                            {/* Checkbox */}
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

                            {/* 1. User A */}
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.userA.avatar}
                                  alt={item.userA.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultAvatar;
                                  }}
                                />
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {item.userA.name}
                                  </div>
                                  <div className="text-[10px] text-gray-400">
                                    {item.userA.location}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 2. Conversation with User B */}
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.userB.avatar}
                                  alt={item.userB.name}
                                  className="w-7 h-7 rounded-full object-cover border border-gray-200"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultAvatar;
                                  }}
                                />
                                <div>
                                  <div className="font-medium text-gray-800 text-[11px]">
                                    with {item.userB.name}
                                  </div>
                                  <div className="text-[10px] text-gray-400">
                                    {item.conversationId}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 3. Last Activity */}
                            <td className="py-3">
                              <div className="font-semibold text-gray-800">
                                {item.lastActivityDate}
                              </div>
                              <div className="text-[10px] text-gray-400">
                                {item.lastActivityTime}
                              </div>
                            </td>

                            {/* 4. Action */}
                            <td className="py-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectChat(item);
                                  }}
                                  title="Open Chat in Drawer"
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteConversation(item.id, item.matchId);
                                  }}
                                  title="Delete Conversation"
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
                  Showing {filteredConversations.length > 0 ? startIndex + 1 : 0} to{" "}
                  {endIndex} of {filteredConversations.length}{" "}
                  conversations
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition-colors ${
                          validCurrentPage === pageNum
                            ? "text-white shadow-xs"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        style={validCurrentPage === pageNum ? { backgroundColor: COLORS.pink } : {}}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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

            {/* RIGHT CONVERSATION DETAILS & CHAT DRAWER */}
            {currentSelected && (
              <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit transition-all">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block bg-emerald-500 animate-pulse" />
                    <h3 className="font-extrabold text-sm text-gray-900">
                      Conversation Details
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedChat(null)}
                    title="Close drawer"
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Connected Chat Participants Visual Card */}
                <div className="p-3.5 bg-gradient-to-r from-pink-50/80 via-rose-50/40 to-purple-50/60 rounded-2xl border border-pink-100/80">
                  <div className="flex items-center justify-between">
                    {/* User A */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={currentSelected.userA.avatar}
                        alt={currentSelected.userA.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultAvatar;
                        }}
                      />
                      <span className="font-bold text-xs text-gray-900 mt-1 max-w-[80px] truncate">
                        {currentSelected.userA.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {currentSelected.userA.age} yrs
                      </span>
                    </div>

                    {/* Connected Chat Messages Indicator */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center border border-pink-100">
                        <MessageCircle className="w-4 h-4 text-[#FF2D72]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#FF2D72] mt-1">
                        {currentSelected.totalMessages} Chats
                      </span>
                    </div>

                    {/* User B */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={currentSelected.userB.avatar}
                        alt={currentSelected.userB.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultAvatar;
                        }}
                      />
                      <span className="font-bold text-xs text-gray-900 mt-1 max-w-[80px] truncate">
                        {currentSelected.userB.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {currentSelected.userB.age} yrs
                      </span>
                    </div>
                  </div>
                </div>

                {/* CHAT MESSAGES STREAM BETWEEN USER A & USER B */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs pb-0.5">
                    <span className="font-extrabold text-gray-800 flex items-center gap-1.5 text-xs">
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF2D72]" />
                      <span>Chat Messages</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {currentSelected.lastActivityDate}
                    </span>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto space-y-2.5 p-3 bg-gray-50/70 rounded-2xl border border-gray-100 text-xs">
                    {loadingMessages ? (
                      <div className="py-8 text-center text-gray-400 flex flex-col items-center justify-center space-y-1.5">
                        <Loader2 className="w-5 h-5 text-[#FF2D72] animate-spin" />
                        <span className="text-[11px]">Loading chat messages...</span>
                      </div>
                    ) : currentSelected.messages &&
                      currentSelected.messages.length > 0 ? (
                      currentSelected.messages.map((msg, mIdx) => {
                        const isUserA = msg.senderId === "userA";
                        return (
                          <div
                            key={mIdx}
                            className={`flex flex-col ${isUserA ? "items-end" : "items-start"}`}
                          >
                            <span className="text-[9px] font-semibold text-gray-400 mb-0.5 px-1">
                              {isUserA
                                ? currentSelected.userA.name
                                : currentSelected.userB.name}
                            </span>
                            <div
                              className={`max-w-[85%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed shadow-2xs ${
                                isUserA
                                  ? "text-white rounded-br-xs"
                                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-xs"
                              }`}
                              style={{
                                backgroundColor: isUserA ? COLORS.pink : "",
                              }}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[9px] text-gray-400 font-medium mt-0.5 px-1">
                              {msg.time}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-gray-400 text-xs space-y-1">
                        <p className="font-semibold text-gray-500">No chat messages yet</p>
                        <p className="text-[10px] text-gray-400">
                          Participants have matched. Conversation history will appear when they send messages.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Conversation Key Information Breakdown */}
                <div className="space-y-2 text-xs pt-1 border-t border-gray-50">
                  <div className="flex items-center justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">
                      Conversation ID
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-gray-800 text-[11px]">
                        {currentSelected.conversationId}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            currentSelected.conversationId,
                          );
                          setCopiedId(true);
                          setTimeout(() => setCopiedId(false), 2000);
                        }}
                        className="text-gray-400 hover:text-gray-700 p-0.5 rounded cursor-pointer transition-colors"
                        title="Copy Conversation ID"
                      >
                        {copiedId ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">
                      Started Date
                    </span>
                    <span className="font-medium text-gray-700 text-[11px]">
                      {currentSelected.createdDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-400 font-medium">
                      Last Activity
                    </span>
                    <span className="font-medium text-gray-700 text-[11px]">
                      {currentSelected.lastActivityDate},{" "}
                      {currentSelected.lastActivityTime}
                    </span>
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
