import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Heart,
  Sparkles,
  ShieldAlert,
  MessageCircle,
  Check,
  CheckCheck,
  Trash2,
  X,
  Inbox,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../services/notificationsServices.js";
import { getSocket } from "../services/socket.js";

const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function NotificationBell({ isAdmin = false, iconClass = "w-4 h-4", buttonClass = "" }) {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const getActiveToken = useCallback(() => {
    return (
      token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("token") ||
          localStorage.getItem("loveconnect_admin_token")
        : null)
    );
  }, [token]);
  const fetchUnreadCount = useCallback(async () => {
    const activeToken = getActiveToken();
    if (!activeToken) return;
    try {
      const res = await getUnreadCount();
      if (res.data?.success) {
        setUnreadCount(Number(res.data.count) || 0);
      }
    } catch (err) {
      console.warn("Failed to fetch unread count:", err?.message);
    }
  }, [getActiveToken]);

  const fetchNotificationsList = useCallback(async () => {
    const activeToken = getActiveToken();
    if (!activeToken) return;

    setLoading(true);
    try {
      const res = await getNotifications({
        limit: 30,
        filter: filter === "unread" ? "unread" : "all",
      });
      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
        if (typeof res.data.unreadCount === "number") {
          setUnreadCount(Number(res.data.unreadCount));
        }
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [getActiveToken, filter]);
  useEffect(() => {
    fetchUnreadCount();
    const handleSync = () => fetchUnreadCount();
    window.addEventListener("loveconnect_auth_change", handleSync);
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    const interval = setInterval(fetchUnreadCount, 15000);
    return () => {
      window.removeEventListener("loveconnect_auth_change", handleSync);
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
      clearInterval(interval);
    };
  }, [fetchUnreadCount]);
  useEffect(() => {
    if (isOpen) {
      fetchNotificationsList();
    }
  }, [isOpen, fetchNotificationsList]);
  useEffect(() => {
    const activeToken = getActiveToken();
    if (!activeToken) return;
    const socket = getSocket(activeToken);
    if (!socket) return;
    const handleNewNotification = (newNotif) => {
      setUnreadCount((prev) => prev + 1);
      setNotifications((prev) => {
        const exists = prev.some((n) => n.id === newNotif.id);
        if (exists) return prev;
        return [newNotif, ...prev];
      });
    };
    socket.on("new_notification", handleNewNotification);
    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [getActiveToken]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = async (notif) => {
    try {
      if (notif.type === "message") {
        await deleteNotification(notif.id);
        setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
        if (!notif.is_read) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } else {
        if (!notif.is_read) {
          await markAsRead(notif.id);
          setNotifications((prev) =>
            prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n))
          );
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.error("Failed to update notification:", err);
    }

    setIsOpen(false);

    switch (notif.type) {
      case "like":
        navigate("/likes");
        break;
      case "match":
        navigate("/matches");
        break;
      case "message":
        navigate("/messages", {
          state: notif.reference_id ? { conversationId: notif.reference_id } : undefined,
        });
        break;
      case "report":
        if (isAdmin || user?.role === "admin") {
          navigate("/admin/reports");
        } else {
          navigate("/help");
        }
        break;
      default:
        if (isAdmin || user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/discover");
        }
        break;
    }
  };

  const handleMarkAsReadSingle = async (e, id) => {
    e.stopPropagation();
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleDeleteSingle = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      fetchUnreadCount();
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllNotifications();
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  const renderTypeIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <div className="w-8 h-8 rounded-full bg-pink-100 text-[#FF2D72] flex items-center justify-center shrink-0 shadow-2xs">
            <Heart className="w-4 h-4 fill-current" />
          </div>
        );
      case "match":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 text-[#8B5CF6] flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
        );
      case "report":
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldAlert className="w-4 h-4" />
          </div>
        );
      case "message":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
            <MessageCircle className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };

  const defaultBtnClass = isAdmin
    ? "relative cursor-pointer p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
    : "w-9 h-9 rounded-full bg-slate-100/90 hover:bg-[#FFE7F0] hover:text-[#FF2D72] text-[#17151A] flex items-center justify-center relative transition-all cursor-pointer border border-slate-200/50";

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={buttonClass || defaultBtnClass}
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell className={iconClass} />
        {unreadCount > 0 && (
          <span className="z-10 min-w-4.5 h-4.5 px-1 rounded-full bg-[#FF2D72] text-white text-[10px] font-extrabold absolute -top-1 -right-1 flex items-center justify-center ring-2 ring-white shadow-sm animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-x-3 top-16 max-h-[82vh] flex flex-col sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96 sm:max-h-none bg-white rounded-2xl shadow-2xl border border-slate-200/80 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-bold bg-[#FFE7F0] text-[#FF2D72] rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-xs text-[#FF2D72] hover:text-[#e01d5d] font-semibold flex items-center gap-1 px-2 py-1 rounded-md hover:bg-pink-50 transition-colors cursor-pointer"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center px-4 pt-2 border-b border-slate-100 gap-4 text-xs font-semibold shrink-0">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`pb-2 transition-all cursor-pointer relative ${
                  filter === "all"
                    ? "text-[#FF2D72] border-b-2 border-[#FF2D72]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`pb-2 transition-all cursor-pointer relative ${
                  filter === "unread"
                    ? "text-[#FF2D72] border-b-2 border-[#FF2D72]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </button>
            </div>

            <div className="flex-1 max-h-72 sm:max-h-96 overflow-y-auto divide-y divide-slate-100">
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#FF2D72]" />
                  <span className="text-xs">Loading notifications...</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-slate-600">No notifications found</p>
                  <p className="text-[11px] text-slate-400">
                    {filter === "unread"
                      ? "You are all caught up! No unread notifications."
                      : "Activity and alerts will appear here."}
                  </p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const avatar = notif.sender?.profile?.profile_picture;

                  return (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer group relative ${
                        !notif.is_read
                          ? "bg-pink-50/40 hover:bg-pink-50/70"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {!notif.is_read && (
                        <span className="w-2 h-2 rounded-full bg-[#FF2D72] absolute top-4 left-1.5 ring-2 ring-white"></span>
                      )}

                      {avatar ? (
                        <div className="relative shrink-0">
                          <img
                            src={avatar}
                            alt={notif.sender?.name || "User"}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <span className="absolute -bottom-1 -right-1">
                            {renderTypeIcon(notif.type)}
                          </span>
                        </div>
                      ) : (
                        renderTypeIcon(notif.type)
                      )}

                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center justify-between gap-1">
                          <h4
                            className={`text-xs truncate ${
                              !notif.is_read
                                ? "font-bold text-slate-900"
                                : "font-medium text-slate-700"
                            }`}
                          >
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {formatTimeAgo(notif.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>

                      <div className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs">
                        {!notif.is_read && (
                          <button
                            type="button"
                            onClick={(e) => handleMarkAsReadSingle(e, notif.id)}
                            className="p-1 text-slate-400 hover:text-green-600 rounded hover:bg-slate-100 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSingle(e, notif.id)}
                          className="p-1 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between px-4 text-xs shrink-0">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-slate-500 hover:text-red-600 transition-colors cursor-pointer text-[11px] font-medium"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-[11px] font-medium"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
