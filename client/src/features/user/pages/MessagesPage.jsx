import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  Phone,
  Video,
  Paperclip,
  Smile,
  Send,
  Search,
  CheckCheck,
  Loader2,
  MessageSquare,
  Heart,
  ArrowRight,
  ArrowLeft,
  X,
  Crown,
  PhoneOff,
  MoreVertical,
  ShieldAlert,
} from "lucide-react";
import ReportUserModal from "../components/ReportUserModal.jsx";
import { io } from "socket.io-client";
import { useAuth } from "../../../context/AuthContext.jsx";
import snehaImg from "../../../assets/hero_woman.jpg";
import {
  createCall,
  acceptCall,
  rejectCall,
} from "../../../services/callsServices.js";

import {
  getUserConversations,
  getOrCreateConversation,
  getMessages,
  markMessagesAsRead,
  sendMessage,
} from "../../../services/chatsServices.js";
import { getUserMatches } from "../../../services/matchesServices.js";
import { getUserById } from "../../../services/usersServices.js";
import { getImageUrl } from "../../../services/uploadServices.js";

export default function MessagesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Current logged in user from AuthContext
  const { user: currentUser, token } = useAuth();

  // State
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [callingState, setCallingState] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [hasPaidPlan, setHasPaidPlan] = useState(false);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [partnerMenuOpen, setPartnerMenuOpen] = useState(false);
  const [reportingUser, setReportingUser] = useState(null);

  // Refs
  const socketRef = useRef(null);
  const activeChatRef = useRef(activeChat);
  const messagesEndRef = useRef(null);

  // Sync activeChat ref for socket callbacks
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // Scroll to latest message
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Check if current user has an active paid subscription
  useEffect(() => {
    if (!currentUser?.id) return;
    getUserById(currentUser.id)
      .then((res) => {
        const subs = res.data?.user?.subscriptions || [];
        const activeSub = subs.find(
          (s) =>
            s.status === "active" &&
            (!s.end_date || new Date(s.end_date) > new Date()),
        );
        setHasPaidPlan(Boolean(activeSub && Number(activeSub.plan?.price) > 0));
      })
      .catch(() => {});
  }, [currentUser?.id]);

  // Helper: calculate age from date of birth
  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  // Helper: format relative / calendar time for sidebar
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  // Helper: format message timestamp
  const formatMessageTime = (isoString) => {
    if (!isoString) return "Just now";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Just now";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!currentUser?.id) return;

    const apiUrl = import.meta.env.VITE_API_URL;
    const socketUrl =
      apiUrl && apiUrl.startsWith("http")
        ? apiUrl.replace(/\/api\/?$/, "")
        : window.location.origin;

    try {
      const socket = io(socketUrl, {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        if (activeChatRef.current) {
          socket.emit("join_conversation", activeChatRef.current);
        }
      });

      // Handle incoming message broadcast
      socket.on("new_message", (msg) => {
        const currentActive = activeChatRef.current;
        const msgConvId = Number(msg.conversation_id);

        if (currentActive && Number(currentActive) === msgConvId) {
          setChatMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;

            const pendingIndex = prev.findIndex(
              (m) =>
                m.pending &&
                Number(m.sender_id) === Number(msg.sender_id) &&
                m.content === msg.content,
            );
            if (pendingIndex !== -1) {
              const updated = [...prev];
              updated[pendingIndex] = msg;
              return updated;
            }
            return [...prev, msg];
          });

          // If message is from partner, mark as read
          if (Number(msg.sender_id) !== Number(currentUser?.id)) {
            markMessagesAsRead(currentActive).catch(() => {});
          }
        }

        // Update conversation item preview in sidebar
        setConversations((prev) => {
          const idx = prev.findIndex((c) => Number(c.id) === msgConvId);
          if (idx === -1) return prev;

          const updated = {
            ...prev[idx],
            lastMsg: msg.content,
            time: "Just now",
            lastMessageAt: msg.createdAt,
            unread:
              (!currentActive || Number(currentActive) !== msgConvId) &&
              Number(msg.sender_id) !== Number(currentUser?.id)
                ? (prev[idx].unread || 0) + 1
                : 0,
          };

          const rest = prev.filter((_, i) => i !== idx);
          return [updated, ...rest];
        });
      });

      // Handle incoming call notification
      socket.on("incoming-call", (callData) => {
        setIncomingCall(callData);
      });

      // Handle call cancelled before answer
      socket.on("call-cancelled", () => {
        setIncomingCall(null);
      });

      return () => {
        socket.disconnect();
      };
    } catch (err) {
      console.warn("Socket initialization error:", err);
    }
  }, [currentUser?.id, token]);

  // Load user conversations and support navigation from MatchesPage
  const loadConversations = useCallback(async () => {
    if (!currentUser?.id) return;
    setLoadingConversations(true);

    try {
      const res = await getUserConversations();
      const rawList = res.data?.conversations || [];

      let formatted = rawList.map((conv) => {
        const isUserOne = Number(conv.user_one_id) === Number(currentUser.id);
        const partner = isUserOne ? conv.userTwo : conv.userOne;
        const p = partner?.profile || {};
        const partnerName = p.full_name || partner?.name || "Match";
        const partnerAge =
          partner?.age ||
          (p.date_of_birth ? calculateAge(p.date_of_birth) : null) ||
          24;
        const partnerImg =
          getImageUrl(p.profile_picture || partner?.profile_image) || null;
        const latestMsg = conv.messages?.[0];
        const lastMsgText = latestMsg?.content || "Say hello!";
        const lastTimeStr = formatTime(
          latestMsg?.createdAt || conv.lastMessageAt || conv.updatedAt,
        );
        const isUnread =
          latestMsg &&
          latestMsg.readAt === null &&
          Number(latestMsg.sender_id) !== Number(currentUser.id);

        return {
          id: conv.id,
          matchId: conv.match_id,
          partnerId: partner?.id,
          name: partnerName,
          age: partnerAge,
          lastMsg: lastMsgText,
          time: lastTimeStr,
          unread: isUnread ? 1 : 0,
          img: partnerImg,
          partner,
          lastMessageAt:
            latestMsg?.createdAt || conv.lastMessageAt || conv.updatedAt,
        };
      });

      // Handle navigation state from MatchesPage (e.g. recipientId, matchId)
      const stateRecipientId = location.state?.recipientId;
      const stateMatchId = location.state?.matchId;
      const stateConvId = location.state?.conversationId;

      let targetConvId = null;

      if (stateConvId) {
        const found = formatted.find(
          (c) => Number(c.id) === Number(stateConvId),
        );
        if (found) targetConvId = found.id;
      }

      if (!targetConvId && stateRecipientId) {
        const found = formatted.find(
          (c) => Number(c.partnerId) === Number(stateRecipientId),
        );
        if (found) {
          targetConvId = found.id;
        } else {
          // If conversation is not created yet, find match and get/create conversation
          try {
            const matchesRes = await getUserMatches();
            const userMatches = matchesRes.data?.matches || [];
            const targetMatch = userMatches.find(
              (m) =>
                Number(m.user_one_id) === Number(stateRecipientId) ||
                Number(m.user_two_id) === Number(stateRecipientId) ||
                (stateMatchId && Number(m.id) === Number(stateMatchId)),
            );

            if (targetMatch) {
              const createRes = await getOrCreateConversation(targetMatch.id);
              const newConv = createRes.data?.conversation;
              if (newConv) {
                const isUserOne =
                  Number(newConv.user_one_id) === Number(currentUser.id);
                const partner = isUserOne ? newConv.userTwo : newConv.userOne;
                const p = partner?.profile || {};
                const newConvItem = {
                  id: newConv.id,
                  matchId: newConv.match_id,
                  partnerId: partner?.id,
                  name:
                    p.full_name ||
                    partner?.name ||
                    location.state?.recipientName ||
                    "Match",
                  age:
                    partner?.age ||
                    (p.date_of_birth ? calculateAge(p.date_of_birth) : null) ||
                    24,
                  lastMsg: "Say hello!",
                  time: "Just now",
                  unread: 0,
                  img:
                    getImageUrl(p.profile_picture || partner?.profile_image) ||
                    null,
                  partner,
                  lastMessageAt: new Date().toISOString(),
                };
                formatted = [newConvItem, ...formatted];
                targetConvId = newConv.id;
              }
            }
          } catch (err) {
            console.error("Error creating conversation with match:", err);
            if (
              err.response?.status === 403 ||
              err.response?.data?.upgradeRequired
            ) {
              setLimitModalOpen(true);
            }
          }
        }
      }

      setConversations(formatted);

      if (targetConvId) {
        setActiveChat(targetConvId);
      } else if (formatted.length > 0) {
        setActiveChat((prev) =>
          prev && formatted.some((c) => c.id === prev) ? prev : formatted[0].id,
        );
      } else {
        setActiveChat(null);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
      setConversations([]);
      setActiveChat(null);
    } finally {
      setLoadingConversations(false);
    }
  }, [currentUser?.id, location.state]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Load messages whenever activeChat changes
  useEffect(() => {
    if (!activeChat) {
      setChatMessages([]);
      return;
    }

    let isMounted = true;
    setLoadingMessages(true);

    const fetchMessages = async () => {
      try {
        const res = await getMessages(activeChat);
        if (isMounted) {
          const msgs = res.data?.messages || [];
          setChatMessages(msgs);

          // Mark messages as read on the server
          markMessagesAsRead(activeChat).catch(() => {});

          // Reset unread count for active conversation in local state
          setConversations((prev) =>
            prev.map((c) =>
              Number(c.id) === Number(activeChat) ? { ...c, unread: 0 } : c,
            ),
          );
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        if (isMounted) setChatMessages([]);
      } finally {
        if (isMounted) setLoadingMessages(false);
      }
    };

    fetchMessages();

    // Join room on socket
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("join_conversation", activeChat);
    }

    return () => {
      isMounted = false;
    };
  }, [activeChat]);

  // Send message handler
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    const text = inputMessage.trim();
    if (!text || !activeChat || sending) return;

    const tempId = `temp_${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      conversation_id: activeChat,
      sender_id: currentUser?.id,
      content: text,
      messageType: "text",
      createdAt: new Date().toISOString(),
      sender: currentUser,
      pending: true,
    };

    // Optimistic message append
    setChatMessages((prev) => [...prev, optimisticMsg]);
    setInputMessage("");
    setSending(true);

    // Update conversation item preview in sidebar
    setConversations((prev) =>
      prev.map((c) =>
        Number(c.id) === Number(activeChat)
          ? {
              ...c,
              lastMsg: text,
              time: "Just now",
              lastMessageAt: new Date().toISOString(),
            }
          : c,
      ),
    );

    try {
      const res = await sendMessage(activeChat, text);
      const sentMsg = res.data?.data;
      if (sentMsg) {
        setChatMessages((prev) =>
          prev.map((m) => (m.id === tempId ? sentMsg : m)),
        );
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      // Remove optimistic message if sending fails
      setChatMessages((prev) => prev.filter((m) => m.id !== tempId));
      if (err.response?.status === 403 || err.response?.data?.upgradeRequired) {
        setLimitModalOpen(true);
      } else {
        alert(
          err.response?.data?.message ||
            "Failed to send message. Please check your connection and try again.",
        );
      }
    } finally {
      setSending(false);
    }
  };

  // Start outgoing call
  const handleStartCall = async (type = "video") => {
    if (!currentChatPartner || !currentChatPartner.partnerId) {
      alert("Please select a match to call");
      return;
    }
    try {
      setCallingState({ type, name: currentChatPartner.name });
      const res = await createCall({
        receiver_id: currentChatPartner.partnerId,
        call_type: type,
        conversation_id: activeChat,
      });

      const callRecord = res.call || res;
      setCallingState(null);

      const roomName = `LoveConnect_Call_${callRecord.id}`;

      navigate("/call", {
        state: {
          callId: callRecord.id,
          otherUserId: currentChatPartner.partnerId,
          otherUserName: currentChatPartner.name,
          otherUserAvatar: currentChatPartner.img,
          roomName,
          callType: type,
          isCaller: true,
        },
      });
    } catch (err) {
      console.error("Start call error:", err);
      setCallingState(null);
      alert(
        err.response?.data?.message ||
          "Could not start call. Please check your connection and try again.",
      );
    }
  };

  // Accept incoming call
  const handleAcceptIncomingCall = async () => {
    if (!incomingCall) return;
    try {
      await acceptCall({ call_id: incomingCall.call_id });
      const targetCall = { ...incomingCall };
      setIncomingCall(null);

      const roomName =
        targetCall.room_name || `LoveConnect_Call_${targetCall.call_id}`;

      navigate("/call", {
        state: {
          callId: targetCall.call_id,
          otherUserId: targetCall.caller_id,
          otherUserName: targetCall.caller_name || "Match",
          otherUserAvatar: targetCall.caller_avatar || null,
          roomName,
          callType: targetCall.call_type || "video",
          isCaller: false,
        },
      });
    } catch (err) {
      console.error("Accept call error:", err);
      setIncomingCall(null);
    }
  };

  // Reject incoming call
  const handleRejectIncomingCall = async () => {
    if (!incomingCall) return;
    try {
      await rejectCall({ call_id: incomingCall.call_id });
      if (socketRef.current) {
        socketRef.current.emit("reject-call", {
          call_id: incomingCall.call_id,
          caller_id: incomingCall.caller_id,
          receiver_id: currentUser?.id,
        });
      }
    } catch (err) {
      console.error("Reject call error:", err);
    } finally {
      setIncomingCall(null);
    }
  };

  // Current active chat partner
  const currentChatPartner =
    conversations.find((c) => Number(c.id) === Number(activeChat)) || null;

  // Filtered conversations based on search
  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) || c.lastMsg?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout activeTab="messages">
      <section aria-label="Messages and Conversations" className="w-full bg-[#FFFFFF] rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row h-full min-h-0 md:h-[700px] animate-fadeIn">
        {/* LEFT CONVERSATION LIST SIDEBAR */}
        <aside
          aria-label="Conversations List"
          className={`w-full md:w-80 border-r border-slate-200/80 flex flex-col shrink-0 bg-white ${
            activeChat ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Header & Search */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-black text-[#17151A]">Messages</h1>
                {!hasPaidPlan && (
                  <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100 inline-block mt-0.5">
                    Free Starter: 1 Chat
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {conversations.length}{" "}
                {conversations.length === 1 ? "Chat" : "Chats"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-100/80 px-3.5 py-2 rounded-full border border-slate-200/60 focus-within:border-[#FF2D72]/50 transition-all">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-[#17151A] w-full placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-none">
            {loadingConversations ? (
              <div className="flex flex-col items-center justify-center p-8 space-y-2">
                <Loader2 className="w-6 h-6 text-[#FF2D72] animate-spin" />
                <span className="text-xs text-slate-400 font-medium">
                  Loading conversations...
                </span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center space-y-3 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-full bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center shadow-inner">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {searchQuery
                      ? "No matching conversations"
                      : "No conversations yet"}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {searchQuery
                      ? "Try searching for a different name"
                      : "Matches you connect with will appear here"}
                  </p>
                </div>
                {!searchQuery && (
                  <Link
                    to="/matches"
                    className="mt-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white text-sm font-semibold shadow-xs hover:brightness-105 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>View Matches</span>
                  </Link>
                )}
              </div>
            ) : (
              filteredConversations.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
                    activeChat === chat.id
                      ? "bg-[#FFE7F0]/40 border-l-4 border-[#FF2D72]"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {/* Partner Avatar */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-2xs bg-slate-100 border border-slate-100 flex items-center justify-center">
                    {chat.img ? (
                      <img
                        src={chat.img}
                        alt={`${chat.name} conversation avatar`}
                        width="48"
                        height="48"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = snehaImg;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 text-[#7C3AED] font-black text-base">
                        {chat.name?.[0]?.toUpperCase() || "M"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-[#17151A] truncate">
                        {chat.name}, {chat.age}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate font-medium mt-0.5">
                      {chat.lastMsg}
                    </p>
                  </div>

                  {chat.unread > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#FF2D72] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* RIGHT CHAT WINDOW */}
        <main
          aria-label="Active Conversation"
          className={`flex-1 flex flex-col h-full bg-slate-50/50 ${
            !activeChat ? "hidden md:flex" : "flex"
          }`}
        >
          {currentChatPartner ? (
            <>
              {/* Chat Partner Header */}
              <div className="px-5 py-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0 shadow-2xs">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button
                    type="button"
                    onClick={() => setActiveChat(null)}
                    className="md:hidden p-1.5 -ml-1 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                    title="Back to conversations"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                    {currentChatPartner.img ? (
                      <img
                        src={currentChatPartner.img}
                        alt={`${currentChatPartner.name} chat partner avatar`}
                        width="40"
                        height="40"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = snehaImg;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 text-[#7C3AED] font-black text-sm">
                        {currentChatPartner.name?.[0]?.toUpperCase() || "M"}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-black text-sm text-[#17151A]">
                        {currentChatPartner.name}, {currentChatPartner.age}
                      </h3>
                      <span className="text-[10px] font-bold bg-[#FFE7F0] text-[#FF2D72] px-2 py-0.5 rounded-full">
                        Matched
                      </span>
                    </div>
                  </div>
                </div>

                {/* Call actions & More options */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartCall("voice")}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-[#FFE7F0] hover:text-[#FF2D72] text-slate-600 transition-colors cursor-pointer"
                    title="Voice Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartCall("video")}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-[#FFE7F0] hover:text-[#FF2D72] text-slate-600 transition-colors cursor-pointer"
                    title="Video Call"
                  >
                    <Video className="w-4 h-4" />
                  </button>

                  {/* 3-dots menu for Report User */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setPartnerMenuOpen((prev) => !prev)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                      title="More Options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {partnerMenuOpen && (
                      <div
                        className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fadeIn"
                        onClick={() => setPartnerMenuOpen(false)}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setReportingUser({
                              id: currentChatPartner.partnerId,
                              name: currentChatPartner.name,
                              img: currentChatPartner.img,
                            });
                          }}
                          className="w-full px-3.5 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>Report User</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Messages Body */}
              {loadingMessages ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-2">
                  <Loader2 className="w-6 h-6 text-[#FF2D72] animate-spin" />
                  <span className="text-xs text-slate-400 font-medium">
                    Loading chat history...
                  </span>
                </div>
              ) : (
                <div className="flex-1 min-h-0 p-3 sm:p-5 overflow-y-auto space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-pink-100/70 text-[#FF2D72] flex items-center justify-center shadow-inner">
                        <Smile className="w-6 h-6" />
                      </div>
                      <div className="max-w-xs">
                        <p className="text-xs font-black text-slate-700">
                          No messages yet
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Break the ice! Send a romantic hello or pick a quick
                          reaction below.
                        </p>
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((msg) => {
                      const isMe =
                        msg.sender === "me" ||
                        Number(msg.sender_id) === Number(currentUser?.id);
                      const text = msg.content || msg.text;
                      const timeStr =
                        msg.time || formatMessageTime(msg.createdAt);

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[75%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-2xs break-words ${
                              isMe
                                ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] rounded-br-none"
                                : "bg-[#FFFFFF] text-[#17151A] border border-slate-200/80 rounded-bl-none"
                            }`}
                          >
                            {text}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium mt-1 px-1 flex items-center gap-1">
                            <span>{timeStr}</span>
                            {isMe && (
                              <CheckCheck
                                className={`w-3 h-3 ${
                                  msg.readAt
                                    ? "text-emerald-500"
                                    : "text-[#FF2D72]"
                                }`}
                              />
                            )}
                          </span>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Chat Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-2 sm:p-3 bg-white border-t border-slate-200/80 flex items-center gap-1.5 sm:gap-2 shrink-0"
              >
          

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={sending}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-[#17151A] bg-slate-50 focus:bg-[#FFFFFF] focus:border-[#FF2D72] outline-none transition-all font-medium disabled:opacity-60"
                />

         
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || sending}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shrink-0 hover:brightness-105 shadow-xs cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  title="Send Message"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </>
          ) : (
            /* EMPTY RIGHT STATE - NO CONVERSATION SELECTED */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-100/70 text-[#FF2D72] flex items-center justify-center shadow-inner">
                <Heart className="w-8 h-8 fill-[#FF2D72]" />
              </div>
              <div className="max-w-sm space-y-1">
                <h3 className="text-base font-black text-[#17151A]">
                  Your Romantic Messages
                </h3>
                <p className="text-xs text-slate-500">
                  Select a match from the conversation list on the left to start
                  chatting, or explore new connections!
                </p>
              </div>
              <Link
                to="/matches"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white text-sm font-semibold shadow-xs hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Find New Matches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </main>
      </section>

      {/* INCOMING CALL MODAL POPUP */}
      {incomingCall && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border border-pink-100">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute -inset-2 rounded-full bg-pink-500/30 animate-ping" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#FF2D72] shadow-xl bg-slate-100 flex items-center justify-center">
                {incomingCall.caller_avatar ? (
                  <img
                    src={incomingCall.caller_avatar}
                    alt={`${incomingCall.caller_name || "Caller"} incoming call avatar`}
                    width="96"
                    height="96"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-white font-black text-2xl">
                    {incomingCall.caller_name?.[0]?.toUpperCase() || "M"}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-[#17151A]">
                {incomingCall.caller_name || "Match"}
              </h3>
              <p className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  Incoming{" "}
                  {incomingCall.call_type === "video" ? "Video" : "Voice"}{" "}
                  Call...
                </span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 pt-2">
              <button
                type="button"
                onClick={handleRejectIncomingCall}
                className="w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Decline"
              >
                <PhoneOff className="w-6 h-6 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={handleAcceptIncomingCall}
                className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer animate-bounce"
                style={{ animationDuration: "1.2s" }}
                title="Accept"
              >
                {incomingCall.call_type === "video" ? (
                  <Video className="w-6 h-6 stroke-[2.5]" />
                ) : (
                  <Phone className="w-6 h-6 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALLING OUTGOING MODAL POPUP */}
      {callingState && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl border border-pink-100">
            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] p-1 flex items-center justify-center animate-pulse">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                {callingState.type === "video" ? (
                  <Video className="w-8 h-8 text-[#FF2D72]" />
                ) : (
                  <Phone className="w-8 h-8 text-[#FF2D72]" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#17151A]">
                {callingState.type === "video" ? "Video Call" : "Voice Call"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Connecting with{" "}
                <span className="font-bold text-[#17151A]">
                  {callingState.name}
                </span>
                ...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 1 User Chat Limit Modal */}
      {limitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-pink-100 relative">
            <button
              type="button"
              onClick={() => setLimitModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Crown className="w-10 h-10 fill-amber-300 text-amber-300" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-black text-[#17151A] tracking-tight">
                1 User Chat Limit Reached 🔒
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                With the Free Starter plan, you can chat with only{" "}
                <strong>1 user</strong>. Upgrade to the Premium plan to enjoy
                unlimited chats with multiple users!
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                to="/#pricing"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-black text-xs shadow-md shadow-pink-500/30 hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crown className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>View Premium Plans</span>
              </Link>
              <button
                type="button"
                onClick={() => setLimitModalOpen(false)}
                className="w-full py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT USER MODAL */}
      <ReportUserModal
        isOpen={Boolean(reportingUser)}
        onClose={() => setReportingUser(null)}
        reportedUser={reportingUser}
      />
    </DashboardLayout>
  );
}
