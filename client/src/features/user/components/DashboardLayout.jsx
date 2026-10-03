import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function DashboardLayout({
  activeTab,
  customRightSidebar,
  hideRightSidebar = false,
  children,
}) {
  const navigate = useNavigate();

  // Filter Controls state in Right Sidebar
  const [showGender, setShowGender] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(true);

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
          {/* Location Picker Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#FFE7F0]/80 hover:bg-[#FFE7F0] rounded-full px-3.5 py-1.5 text-xs font-bold text-[#FF2D72] cursor-pointer transition-all border border-[#FFE7F0] shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#FF2D72]" />
            <span>Noida, India</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FF2D72]" />
          </div>

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
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity bg-slate-50 p-1 pr-3 rounded-full border border-slate-200/60"
          >
            <img
              src={rheaImg}
              alt="Ananya Verma"
              className="w-8 h-8 rounded-full object-cover border-2 border-[#FF2D72] shadow-2xs"
            />
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-xs font-extrabold text-[#17151A]">
                Ananya Verma
              </span>
              <span className="text-[10px] font-bold text-[#7C3AED] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                <span>Pro Member</span>
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: Dynamic 2 or 3-Column SaaS Workspace Dashboard */}
      <div
        className={`flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 ${hideRightSidebar ? "lg:grid-cols-[280px_minmax(0,1fr)]" : "lg:grid-cols-[280px_minmax(0,1fr)_320px]"} gap-5 px-3 sm:px-5 lg:px-6 py-4 h-[calc(100vh-65px)] overflow-hidden items-stretch relative z-10`}
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
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === "likes"
                    ? "bg-[#FFFFFF]/25 text-[#FFFFFF]"
                    : "bg-[#FFE7F0] text-[#FF2D72]"
                }`}
              >
                24
              </span>
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
              onClick={() => {
                try {
                  localStorage.removeItem("loveconnect_admin_token");
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  sessionStorage.removeItem("loveconnect_admin_session");
                } catch (_) {}
                window.dispatchEvent(new Event("loveconnect_auth_change"));
                navigate("/");
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
        <main className="lg:col-start-2 flex flex-col w-full h-full overflow-y-auto scrollbar-none pr-1">
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
              <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 animate-fadeIn">
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
                      className="text-[#7C3AED]"
                      strokeDasharray="100, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-[#17151A]">
                    100%
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-black text-[#17151A]">
                    Profile Completion
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Your profile is complete!
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium pt-0.5">
                    <span className="w-4 h-4 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                      ✓
                    </span>
                    <span>
                      You're all set to discover and connect with amazing people
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 1: DISCOVERY FILTERS */}
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
                      setVerifiedOnly(true);
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

                {/* Verified Toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-[#17151A]">
                      Verified Profiles Only
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Show authenticated users
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={`w-10 h-5.5 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                      verifiedOnly
                        ? "bg-[#FF2D72] justify-end"
                        : "bg-slate-200 justify-start"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#FFFFFF] shadow-2xs" />
                  </button>
                </div>
              </div>

              {/* CARD 2: PEOPLE NEARBY */}
              <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#17151A] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF2D72]" />
                    <span>People Nearby</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => alert("Showing all nearby profiles")}
                    className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    See All
                  </button>
                </div>

                {/* Grid of 4 Nearby Avatars */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { name: "Neha", age: 22, img: meeraImg },
                    { name: "Priya", age: 25, img: priyaImg },
                    { name: "Kritika", age: 23, img: rheaImg },
                    { name: "Sneha", age: 24, img: ananyaImg },
                  ].map((user, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 cursor-pointer group"
                    >
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#FFFFFF] shadow-2xs group-hover:scale-105 transition-transform">
                        <img
                          src={user.img}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="w-3 h-3 rounded-full bg-[#7C3AED] border border-[#FFFFFF] absolute bottom-0 right-0 flex items-center justify-center text-[7px] text-[#FFFFFF] font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#17151A] truncate w-full">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold -mt-1">
                        {user.age}
                      </span>
                    </div>
                  ))}
                </div>
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
            badge: "24",
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
