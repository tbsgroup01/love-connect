import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  Search,
  MapPin,
  Bell,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  Heart,
  Crown,
  Settings,
  HelpCircle,
  MessageSquare,
  Users,
  Flame,
  ArrowRight,
  User,
  LogOut,
} from "lucide-react";

import loveConnectLogo from "../../../assets/loveconnect.png";
import rheaImg from "../../../assets/hero_woman_exact.png";
import { getAllUsers, getUserById } from "../../../services/usersServices.js";
import { getLikes, likeUser } from "../../../services/likesServices.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import NotificationBell from "../../../components/NotificationBell.jsx";
import UserProfileDrawer from "./UserProfileDrawer.jsx";
import ReportUserModal from "./ReportUserModal.jsx";


const getProfileCompletionDetails = (percentage) => {
  if (percentage >= 100) {
    return {
      subtitle: "Your profile is complete!",
      badgeBg: "bg-[#22C55E]",
      badgeIcon: "✓",
      message: "You're all set to discover and connect with amazing people",
      strokeColor: "text-[#7C3AED]",
    };
  }
  if (percentage >= 75) {
    return {
      subtitle: "Almost complete!",
      badgeBg: "bg-[#7C3AED]",
      badgeIcon: "★",
      message: "Add remaining details to reach 100% & get more matches",
      strokeColor: "text-[#7C3AED]",
    };
  }
  if (percentage >= 50) {
    return {
      subtitle: "Profile in progress",
      badgeBg: "bg-[#F59E0B]",
      badgeIcon: "!",
      message: "Complete your profile to boost visibility by 3x",
      strokeColor: "text-[#7C3AED]",
    };
  }
  return {
    subtitle: "Complete your profile",
    badgeBg: "bg-[#FF2D72]",
    badgeIcon: "!",
    message: "Add photos & details to connect with people nearby",
    strokeColor: "text-[#FF2D72]",
  };
};

export default function DashboardLayout({
  activeTab,
  customRightSidebar,
  hideRightSidebar = false,
  filterGender,
  setFilterGender,
  children,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isDiscover =
    activeTab === "discover" ||
    location.pathname === "/discover" ||
    location.pathname.endsWith("/discover");

  const { user: currentUser, logout } = useAuth();
  const [profileUser, setProfileUser] = useState(currentUser);

  useEffect(() => {
    setProfileUser(currentUser);
    if (currentUser?.id) {
      getUserById(currentUser.id)
        .then((res) => {
          if (res.data?.user) setProfileUser(res.data.user);
        })
        .catch(() => {});
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.id) {
      getUserById(currentUser.id)
        .then((res) => {
          if (res.data?.user) {
            setProfileUser(res.data.user);
          }
        })
        .catch(() => {});
    }
  }, [currentUser?.id]);

  const completionPercentage =
    profileUser?.profile_completion ??
    currentUser?.profile_completion ??
    0;
  const completionDetails = getProfileCompletionDetails(completionPercentage);
  const [internalGender, setInternalGender] = useState("all");
  const showGender = filterGender !== undefined ? filterGender : internalGender;
  const setShowGender = setFilterGender || setInternalGender;
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef(null)
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [selectedNearbyUser, setSelectedNearbyUser] = useState(null);
  const [reportingNearbyUser, setReportingNearbyUser] = useState(null);
  const [drawerActionLoading, setDrawerActionLoading] = useState(false);
  const [likedUserIds, setLikedUserIds] = useState(new Set());
  const [nearbyMatchModal, setNearbyMatchModal] = useState(null);

  const handleOpenNearbyUserDrawer = async (userItem) => {
    const raw = userItem.raw || userItem;
    setSelectedNearbyUser(raw);

    if (userItem.id) {
      try {
        const res = await getUserById(userItem.id);
        if (res.data?.user) {
          setSelectedNearbyUser(res.data.user);
        }
      } catch (err) {
        console.error("Error fetching nearby user details:", err);
      }
    }
  };

  const handleLikeNearbyUser = async (targetUser) => {
    if (!targetUser?.id || drawerActionLoading) return;
    setDrawerActionLoading(true);
    try {
      const res = await likeUser(targetUser.id);
      setLikedUserIds((prev) => new Set([...prev, targetUser.id]));
      if (res.data?.matched) {
        setNearbyMatchModal(targetUser);
      }
    } catch (err) {
      console.error("Error liking nearby user:", err);
    } finally {
      setDrawerActionLoading(false);
    }
  };

  const handleChatNowNearbyUser = (targetUser, name) => {
    setSelectedNearbyUser(null);
    navigate("/messages", {
      state: {
        recipientId: targetUser.id,
        recipientName: name,
      },
    });
  };

  useEffect(() => {
    if (currentUser?.id) {
      getLikes({ type: "received" })
        .then((res) => {
          if (res.data?.count !== undefined) {
            setLikesCount(res.data.count);
          } else if (Array.isArray(res.data?.likes)) {
            setLikesCount(res.data.likes.length);
          }
        })
        .catch(() => {});
    }
  }, [currentUser?.id]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res.data?.users && Array.isArray(res.data.users)) {
          const list = res.data.users
            .filter((u) => u.id !== currentUser?.id && u.status !== "suspended")
            .slice(0, 4)
            .map((u) => {
              const p = u.profile || {};
              let calcAge = u.age;
              if (!calcAge && p.date_of_birth) {
                const dob = new Date(p.date_of_birth);
                if (!isNaN(dob.getTime())) {
                  const diffMs = Date.now() - dob.getTime();
                  calcAge = Math.abs(new Date(diffMs).getUTCFullYear() - 1970);
                }
              }
              return {
                id: u.id,
                name: p.full_name || u.name || "User",
                age: calcAge || "",
                img: p.profile_picture || u.profile_image || null,
                raw: u,
              };
            });
          setNearbyUsers(list);
        }
      })
      .catch(() => {});
  }, [currentUser?.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-full bg-[#FAFAFC] flex flex-col font-poppins select-none text-[#17151A] antialiased relative overflow-hidden pt-[65px]">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#7C3AED]/15 via-[#FFE7F0]/40 to-transparent blur-3xl pointer-events-none rounded-full" />
      <header className="fixed top-0 left-0 right-0 z-40 w-full h-[65px] bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#FFE7F0] px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <Link
          to="/"
          title="LoveConnect Home"
          aria-label="LoveConnect Homepage"
          className="flex items-center gap-2 group shrink-0"
        >
          <img
            src={loveConnectLogo}
            alt="LoveConnect Dating Platform - Discover and Match"
            width="160"
            height="48"
            loading="eager"
            decoding="async"
            className="h-9 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Location Selector, Notification Bell & User Profile Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Notification Bell */}
          <NotificationBell />

          {/* User Profile Dropdown Pill */}
          <div ref={userMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setUserDropdownOpen((prev) => !prev)}
              aria-label="Toggle profile menu"
              className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-100/90 transition-all bg-slate-50 p-1 pr-3 rounded-full border border-slate-200/60 focus:outline-none"
            >
              <img
                src={currentUser?.profile_image || rheaImg}
                alt={`${currentUser?.name || "User"}'s profile avatar`}
                width="32"
                height="32"
                loading="eager"
                decoding="async"
                className="w-8 h-8 rounded-full object-cover object-top border-2 border-[#FF2D72] shadow-2xs"
              />
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-extrabold text-[#17151A]">
                  {currentUser?.name || "My Profile"}
                </span>
                <span className="text-[10px] font-bold text-[#7C3AED] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                  <span>{currentUser?.subscription || "Member"}</span>
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200 ${
                  userDropdownOpen ? "rotate-180 text-[#FF2D72]" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu Popup */}
            {userDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-[#FFE7F0] z-50 animate-scaleUp text-left">
                {/* User Header */}
                <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2.5 mb-1">
                  <img
                    src={currentUser?.profile_image || rheaImg}
                    alt={`${currentUser?.name || "User"}'s profile avatar`}
                    width="32"
                    height="32"
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 rounded-full object-cover border border-[#FF2D72]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[#17151A] truncate">
                      {currentUser?.name || "Anand Shakya"}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 truncate">
                      {currentUser?.email || ""}
                    </p>
                  </div>
                </div>

                {/* 1. My Profile Button */}
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#FF2D72] hover:bg-[#FFE7F0]/60 transition-all cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-lg bg-pink-50 text-[#FF2D72] flex items-center justify-center group-hover:bg-[#FF2D72] group-hover:text-white transition-colors">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span>My Profile</span>
                </button>

                {/* 2. Log Out Button */}
                <button
                  type="button"
                  onClick={async () => {
                    setUserDropdownOpen(false);
                    await handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                  </div>
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className={`flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 ${hideRightSidebar ? "lg:grid-cols-[280px_minmax(0,1fr)]" : "lg:grid-cols-[280px_minmax(0,1fr)_320px]"} gap-5 px-3 sm:px-5 lg:px-6 pt-3 pb-[72px] sm:pt-4 sm:pb-[76px] lg:py-4 h-[calc(100dvh-65px)] lg:h-[calc(100vh-65px)] overflow-hidden items-stretch relative z-10`}
      >

        <aside className="hidden lg:flex w-full h-full flex-col justify-between overflow-y-auto bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs [&_button]:text-sm scrollbar-none shrink-0">

          <nav aria-label="Dashboard Navigation" className="space-y-1.5">
            <div className="mb-3 flex items-center justify-between px-3 pt-1">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Workspace
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF2D72] shadow-[0_0_0_4px_#FFE7F0]" />
            </div>
            <Link
              to="/discover"
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "discover"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Flame
                  className={`w-5 h-5 ${activeTab === "discover" ? "fill-[#FFFFFF]" : ""}`}
                />
                <span>Discover</span>
              </div>
            </Link>
            <Link
              to="/likes"
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "likes"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Heart
                  className={`w-5 h-5 ${activeTab === "likes" ? "fill-[#FFFFFF]" : ""}`}
                />
                <span>Likes You</span>
              </div>
            </Link>
            <Link
              to="/matches"
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "matches"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Users className="w-5 h-5" />
                <span>Matches</span>
              </div>
            </Link>
            <Link
              to="/messages"
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "messages"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
              </div>
            </Link>
            <Link
              to="/profile"
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Link>

            <div className="my-3 border-t border-slate-200/60" />
            <Link
              to="/#pricing"
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-[15px] font-bold text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <Crown className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                <span>Premium</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-xs font-bold">
                Upgrade
              </span>
            </Link>
            <Link
              to="/help"
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "help"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </Link>
            <button
              type="button"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-[15px] font-bold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-rose-500" />
              <span>Log Out</span>
            </button>
          </nav>
          <div className="relative overflow-hidden rounded-2xl border border-[#FFD0E0] bg-gradient-to-br from-[#FFF0F5] via-white to-[#F4F0FF] p-4.5 text-left shadow-2xs mt-3">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FF2D72]/10 blur-2xl" />
            <div className="relative mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FF2D72]">
              <Crown className="w-5 h-5 text-[#FFFFFF] fill-[#FFFFFF]" />
            </div>
            <h4 className="relative text-sm sm:text-[15px] font-black text-[#17151A]">
              Upgrade to Premium
            </h4>
            <p className="relative mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-500">
              Get unlimited likes, see secret admirers & boost profile 5x!
            </p>
            <Link
              to="/#pricing"
              className="relative mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#FFFFFF] shadow-xs transition-all hover:brightness-105"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </aside>
        <main className="lg:col-start-2 flex flex-col w-full h-full min-h-0 overflow-y-auto scrollbar-none pr-0 lg:pr-1">
          {children}
        </main>
        <aside className="hidden lg:col-start-3 lg:flex flex-col gap-4 h-full overflow-y-auto scrollbar-none shrink-0">
          {customRightSidebar ? (
            customRightSidebar
          ) : (
            <>
              <Link
                to="/profile"
                className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 animate-fadeIn hover:border-slate-300 hover:shadow-xs transition-all group cursor-pointer"
              >
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${completionDetails.strokeColor} transition-all duration-700 ease-out`}
                      strokeDasharray={`${completionPercentage}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-[#17151A]">
                    {completionPercentage}%
                  </span>
                </div>

                <div className="space-y-1 min-w-0">
                  <h4 className="text-xs font-black text-[#17151A] group-hover:text-[#7C3AED] transition-colors">
                    Profile Completion
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500">
                    {completionDetails.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium pt-0.5">
                    <span className={`w-4 h-4 rounded-full ${completionDetails.badgeBg} text-white flex items-center justify-center font-bold text-[9px] shrink-0`}>
                      {completionDetails.badgeIcon}
                    </span>
                    <span className="truncate">
                      {completionDetails.message}
                    </span>
                  </div>
                </div>
              </Link>
              {isDiscover && (
                <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#17151A] flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#FF2D72]" />
                      <span>Discovery Filters</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setShowGender("all");
                      }}
                      className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                  <div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {["all", "women", "men", "others"].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => setShowGender(gender)}
                          className={`py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                            showGender === gender
                              ? "bg-[#FF2D72] text-[#FFFFFF] shadow-2xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200/60"
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div> 
                </div>
              )}
              <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#17151A] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF2D72]" />
                    <span>People Nearby</span>
                  </h4>
                </div>
                {nearbyUsers.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {nearbyUsers.map((user, idx) => (
                      <button
                        key={user.id || idx}
                        type="button"
                        onClick={() => handleOpenNearbyUserDrawer(user)}
                        className="flex flex-col items-center gap-1 cursor-pointer group hover:scale-105 active:scale-95 transition-all text-center focus:outline-none"
                        title={`View ${user.name}'s profile details`}
                      >
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#FFFFFF] shadow-2xs group-hover:ring-2 group-hover:ring-[#FF2D72]/50 transition-all bg-slate-100 flex items-center justify-center">
                          {user.img ? (
                            <img
                              src={user.img}
                              alt={`${user.name}${user.age ? `, ${user.age}` : ""} profile avatar`}
                              width="44"
                              height="44"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-extrabold text-xs text-slate-500">
                              {(user.name || "U").charAt(0).toUpperCase()}
                            </span>
                          )}
                          <span className="w-3 h-3 rounded-full bg-[#7C3AED] border border-[#FFFFFF] absolute bottom-0 right-0 flex items-center justify-center text-[7px] text-[#FFFFFF] font-bold">
                            ✓
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#17151A] group-hover:text-[#FF2D72] transition-colors truncate w-full">
                          {user.name}
                        </span>
                        {user.age ? (
                          <span className="text-[10px] text-slate-500 font-semibold -mt-1">
                            {user.age}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-medium py-2 text-center">
                    No users found
                  </p>
                )}
              </div>
            </>
          )}
        </aside>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav aria-label="Mobile Navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#FFE7F0] px-2 py-2 flex items-center justify-around shadow-lg">
        {[
          { id: "discover", label: "Discover", icon: Flame, path: "/discover" },
          {
            id: "likes",
            label: "Likes",
            icon: Heart,
            path: "/likes",
            badge: likesCount > 0 ? String(likesCount) : undefined,
          },
          {
            id: "matches",
            label: "Matches",
            icon: Users,
            path: "/matches",
            badge: "12",
          },
          {
            id: "messages",
            label: "Messages",
            icon: MessageSquare,
            path: "/messages",
            badge: "5",
          },
          { id: "profile", label: "Profile", icon: User, path: "/profile" },
         
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 relative rounded-xl transition-all ${
                isActive
                  ? "text-[#FF2D72] font-black"
                  : "text-slate-400 font-semibold hover:text-slate-600"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`}
                />
               
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* USER PROFILE DRAWER FOR NEARBY PEOPLE */}
      <UserProfileDrawer
        isOpen={Boolean(selectedNearbyUser)}
        onClose={() => setSelectedNearbyUser(null)}
        userData={selectedNearbyUser}
        onChatNow={handleChatNowNearbyUser}
        onLike={handleLikeNearbyUser}
        isSent={selectedNearbyUser?.id ? likedUserIds.has(selectedNearbyUser.id) : false}
        actionLoading={drawerActionLoading}
        onReport={(u) => {
          setSelectedNearbyUser(null);
          setReportingNearbyUser(u);
        }}
      />

      {/* REPORT USER MODAL */}
      <ReportUserModal
        isOpen={Boolean(reportingNearbyUser)}
        onClose={() => setReportingNearbyUser(null)}
        reportedUser={reportingNearbyUser}
      />

      {/* NEARBY MATCH MODAL */}
      {nearbyMatchModal &&
        createPortal(
          <div
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-fadeIn"
            onClick={() => setNearbyMatchModal(null)}
          >
            <div
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border-2 border-[#FF2D72] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
             
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#17151A]">
                  It's a Match!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  You and {nearbyMatchModal.name || nearbyMatchModal.profile?.full_name || "this user"} liked each other.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const matchedUser = nearbyMatchModal;
                    setNearbyMatchModal(null);
                    setSelectedNearbyUser(null);
                    navigate("/messages", {
                      state: {
                        recipientId: matchedUser.id,
                        recipientName: matchedUser.name || matchedUser.profile?.full_name,
                      },
                    });
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-extrabold text-xs shadow-md cursor-pointer hover:brightness-105"
                >
                  Send a Message Now
                </button>
                <button
                  type="button"
                  onClick={() => setNearbyMatchModal(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Keep Browsing
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
