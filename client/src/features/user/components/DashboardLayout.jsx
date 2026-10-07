import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import meeraImg from "../../../assets/signup_hero_woman.jpg";
import priyaImg from "../../../assets/priya_profile.jpg";
import ananyaImg from "../../../assets/hero_woman.jpg";
import rheaImg from "../../../assets/hero_woman_exact.png";
import { getAllUsers, getUserById } from "../../../services/usersServices.js";
import { getLikes } from "../../../services/likesServices.js";
import { useAuth } from "../../../context/AuthContext.jsx";


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
  filterVerified,
  setFilterVerified,
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
  const [internalVerified, setInternalVerified] = useState(false);

  const showGender = filterGender !== undefined ? filterGender : internalGender;
  const setShowGender = setFilterGender || setInternalGender;
  const verifiedOnly = filterVerified !== undefined ? filterVerified : internalVerified;
  const setVerifiedOnly = setFilterVerified || setInternalVerified;

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Real Database Users for People Nearby widget
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

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
      {/* Brand Color Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#7C3AED]/15 via-[#FFE7F0]/40 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* LOGGED IN USER NAVBAR HEADER (PERMANENTLY FIXED ON TOP) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-[65px] bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#FFE7F0] px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        {/* Brand Logo */}
        <Link
          to="/"
          title="LoveConnect Home"
          className="flex items-center gap-2 group shrink-0"
        >
          <img
            src={loveConnectLogo}
            alt="LoveConnect"
            className="h-9 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Location Selector, Notification Bell & User Profile Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Notification Bell */}
          <button
            type="button"
            onClick={() =>
              alert("Notifications: You have 3 new match activities!")
            }
            className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-[#FFE7F0] hover:text-[#FF2D72] text-[#17151A] flex items-center justify-center relative transition-all cursor-pointer border border-slate-200/50"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-4 h-4 rounded-full bg-[#FF2D72] text-[#FFFFFF] text-[10px] font-bold absolute -top-0.5 -right-0.5 flex items-center justify-center ring-2 ring-[#FFFFFF] shadow-xs">
              3
            </span>
          </button>

          {/* User Profile Dropdown Pill */}
          <div ref={userMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setUserDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-100/90 transition-all bg-slate-50 p-1 pr-3 rounded-full border border-slate-200/60 focus:outline-none"
            >
              <img
                src={currentUser?.profile_image || rheaImg}
                alt={currentUser?.name || "User"}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#FF2D72] shadow-2xs"
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
                    alt={currentUser?.name || "User"}
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

      {/* MAIN CONTAINER: Dynamic 2 or 3-Column SaaS Workspace Dashboard */}
      <div
        className={`flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 ${hideRightSidebar ? "lg:grid-cols-[280px_minmax(0,1fr)]" : "lg:grid-cols-[280px_minmax(0,1fr)_320px]"} gap-5 px-3 sm:px-5 lg:px-6 pt-3 pb-[72px] sm:pt-4 sm:pb-[76px] lg:py-4 h-[calc(100dvh-65px)] lg:h-[calc(100vh-65px)] overflow-hidden items-stretch relative z-10`}
      >
        {/* ------------------------------------------------------- */}
        {/* COLUMN 1: LEFT NAVIGATION SIDEBAR (FIXED VIEWPORT)      */}
        {/* ------------------------------------------------------- */}
        <aside className="hidden lg:flex w-full h-full flex-col justify-between overflow-y-auto bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs [&_button]:text-sm scrollbar-none shrink-0">
          {/* Main Navigation List */}
          <div className="space-y-2">
            <div className="mb-3 flex items-center justify-between px-3 pt-1">
              <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                Workspace
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF2D72] shadow-[0_0_0_4px_#FFE7F0]" />
            </div>

            {/* Nav: Discover */}
            <button
              type="button"
              onClick={() => navigate("/discover")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "discover"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame
                  className={`w-4 h-4 ${activeTab === "discover" ? "fill-[#FFFFFF]" : ""}`}
                />
                <span>Discover</span>
              </div>
            </button>

            {/* Nav: Likes You */}
            <button
              type="button"
              onClick={() => navigate("/likes")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "likes"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart
                  className={`w-4 h-4 ${activeTab === "likes" ? "fill-[#FFFFFF]" : ""}`}
                />
                <span>Likes You</span>
              </div>
              {likesCount > 0 && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === "likes"
                      ? "bg-[#FFFFFF]/25 text-[#FFFFFF]"
                      : "bg-[#FFE7F0] text-[#FF2D72]"
                  }`}
                >
                  {likesCount}
                </span>
              )}
            </button>

            {/* Nav: Matches */}
            <button
              type="button"
              onClick={() => navigate("/matches")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "matches"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Matches</span>
              </div>
            </button>

            {/* Nav: Messages */}
            <button
              type="button"
              onClick={() => navigate("/messages")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "messages"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
              </div>
            </button>

            {/* Nav: My Profile */}
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>

            <div className="my-3 border-t border-slate-200/60" />

            {/* Nav: Premium */}
            <button
              type="button"
              onClick={() => navigate("/#pricing")}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                <span>Premium</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[10px] font-bold">
                Upgrade
              </span>
            </button>

            {/* Nav: Help & Support */}
            <button
              type="button"
              onClick={() => navigate("/help")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "help"
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[#17151A]"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </button>

            {/* Nav: Logout */}
            <button
              type="button"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Bottom Promo: Upgrade to Premium */}
          <div className="relative overflow-hidden rounded-2xl border border-[#FFD0E0] bg-gradient-to-br from-[#FFF0F5] via-white to-[#F4F0FF] p-4 text-left shadow-2xs">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FF2D72]/10 blur-2xl" />
            <div className="relative mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#FF2D72]">
              <Crown className="w-4 h-4 text-[#FFFFFF] fill-[#FFFFFF]" />
            </div>
            <h4 className="relative text-xs font-extrabold text-[#17151A]">
              Upgrade to Premium
            </h4>
            <p className="relative mt-1 text-[11px] leading-snug text-slate-500">
              Get unlimited likes, see secret admirers & boost profile 5x!
            </p>
            <Link
              to="/#pricing"
              className="relative mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] px-3 py-2 text-xs font-bold text-[#FFFFFF] shadow-2xs transition-all hover:brightness-105"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* ------------------------------------------------------- */}
        {/* COLUMN 2: CENTER WORKSPACE CANVAS (SCROLLABLE AREA)     */}
        {/* ------------------------------------------------------- */}
        <main className="lg:col-start-2 flex flex-col w-full h-full min-h-0 overflow-y-auto scrollbar-none pr-0 lg:pr-1">
          {children}
        </main>

        {/* ------------------------------------------------------- */}
        {/* COLUMN 3: RIGHT SIDEBAR (FIXED VIEWPORT)               */}
        {/* ------------------------------------------------------- */}
        <aside className="hidden lg:col-start-3 lg:flex flex-col gap-4 h-full overflow-y-auto scrollbar-none shrink-0">
          {customRightSidebar ? (
            customRightSidebar
          ) : (
            <>
              {/* CARD 0: PROFILE COMPLETION WIDGET */}
              <Link
                to="/profile"
                className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 animate-fadeIn hover:border-slate-300 hover:shadow-xs transition-all group cursor-pointer"
              >
                {/* Circular Progress Ring */}
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

              {/* CARD 1: DISCOVERY FILTERS (Only visible on Discover page) */}
              {isDiscover && (
                <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#17151A] flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#FF2D72]" />
                      <span>Discovery Filters</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setShowGender("all");
                        setVerifiedOnly(false);
                      }}
                      className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Show Gender Pills */}
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
                      <div
                        key={user.id || idx}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                      >
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#FFFFFF] shadow-2xs group-hover:scale-105 transition-transform bg-slate-100 flex items-center justify-center">
                          {user.img ? (
                            <img
                              src={user.img}
                              alt={user.name}
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
                        <span className="text-xs font-bold text-[#17151A] truncate w-full">
                          {user.name}
                        </span>
                        {user.age ? (
                          <span className="text-[10px] text-slate-500 font-semibold -mt-1">
                            {user.age}
                          </span>
                        ) : null}
                      </div>
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#FFE7F0] px-2 py-2 flex items-center justify-around shadow-lg">
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
          {
            id: "settings",
            label: "Settings",
            icon: Settings,
            path: "/settings",
          },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
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
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#FF2D72] text-white text-[9px] font-extrabold px-1 rounded-full leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
