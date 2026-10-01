import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Sparkles
} from "lucide-react";
import logo from "../../../assets/loveconnect.png";

const COLORS = {
  pink: "#FF2D72",
  purple: "#7C3AED",
  dark: "#17151A",
};

const DEFAULT_ADMIN = {
  name: "Priya Singh",
  role: "Super Admin",
  email: "priya.singh@loveconnect.com",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  adminId: "ADM-100",
};

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem("loveconnect_admin_profile");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return DEFAULT_ADMIN;
  });

  // Listen for profile updates from AppSettings
  useEffect(() => {
    const handleProfileUpdate = () => {
      try {
        const saved = localStorage.getItem("loveconnect_admin_profile");
        if (saved) setAdminUser(JSON.parse(saved));
      } catch (_) {}
    };

    window.addEventListener("admin_profile_updated", handleProfileUpdate);
    window.addEventListener("storage", handleProfileUpdate);
    return () => {
      window.removeEventListener("admin_profile_updated", handleProfileUpdate);
      window.removeEventListener("storage", handleProfileUpdate);
    };
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setShowLogoutModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMyProfileClick = () => {
    setDropdownOpen(false);
    navigate("/admin/app-settings?tab=profile");
    window.dispatchEvent(
      new CustomEvent("switch_app_settings_tab", { detail: "profile" })
    );
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("loveconnect_admin_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("loveconnect_admin_session");
    } catch (_) {}
    setShowLogoutModal(false);
    showToast("Logged out successfully. Redirecting...");
    setTimeout(() => {
      navigate("/login");
    }, 600);
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#FF2D72]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          {setSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden cursor-pointer"
              title="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <img
              src={logo}
              alt="LoveConnect Logo"
              className="h-9 sm:h-11 w-auto object-contain"
            />
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#FFE7F0] text-[#FF2D72] text-[10px] font-extrabold uppercase tracking-wider">
              Admin Portal
            </span>
          </Link>
        </div>

        {/* Right Section: Notifications + Profile Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications */}
          <Link
            to="/admin/reports"
            className="relative cursor-pointer p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
            title="Moderation Alerts"
          >
            <Bell className="w-5 h-5" />
            <span
              className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-white shadow-2xs"
              style={{ backgroundColor: COLORS.pink }}
            >
              5
            </span>
          </Link>

          <div className="h-7 w-px bg-gray-200"></div>

          {/* Admin Profile Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl cursor-pointer transition-all ${
                dropdownOpen
                  ? "bg-pink-50/80 ring-2 ring-[#FF2D72]/20"
                  : "hover:bg-gray-50"
              }`}
              title="Profile & Session Options"
              aria-expanded={dropdownOpen}
            >
              <div className="relative">
                <img
                  src={adminUser.avatar}
                  alt="Admin Avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 shadow-2xs"
                  style={{ borderColor: COLORS.pink }}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] border-2 border-white rounded-full"></span>
              </div>

              <div className="hidden sm:block text-left">
                <div
                  className="font-bold text-xs leading-tight"
                  style={{ color: COLORS.dark }}
                >
                  {adminUser.name}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">
                  {adminUser.role}
                </div>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 hidden sm:block ${
                  dropdownOpen ? "rotate-180 text-[#FF2D72]" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu - only My Profile and Log Out */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Header Card */}
                <div className="p-4 bg-gradient-to-br from-[#FFE7F0] via-white to-[#F3E8FF] border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={adminUser.avatar}
                        alt={adminUser.name}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full"></span>
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-black text-gray-900 truncate">
                          {adminUser.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#F3E8FF] text-[#7C3AED] border border-[#DDD6FE]">
                          {adminUser.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate font-medium">
                        {adminUser.email}
                      </p>
                      <div className="text-[10px] font-bold text-green-600 flex items-center gap-1 pt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span>Active Session • {adminUser.adminId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  {/* My Profile Action -> Opens Profile Settings tab on App Settings page */}
                  <button
                    onClick={handleMyProfileClick}
                    className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-pink-50/70 text-gray-700 hover:text-[#FF2D72] text-xs font-bold transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-pink-50 group-hover:bg-[#FF2D72] text-[#FF2D72] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <User className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-extrabold">My Profile</div>
                      <div className="text-[10px] text-gray-400 group-hover:text-pink-400 font-medium">
                        View & edit account details
                      </div>
                    </div>
                  </button>
                </div>

                <div className="border-t border-gray-100 p-2">
                  {/* Logout Action */}
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-red-50 text-gray-700 hover:text-[#EF4444] text-xs font-bold transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-50 group-hover:bg-[#EF4444] text-[#EF4444] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <LogOut className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-extrabold text-[#EF4444]">Log Out</div>
                      <div className="text-[10px] text-gray-400 group-hover:text-red-400 font-medium">
                        End admin session safely
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#FF2D72] flex items-center justify-center mx-auto shadow-xs">
              <LogOut className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-black text-gray-900">
                Sign Out of Admin Portal?
              </h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to end your Super Admin session? You will
                need to sign in again to access LoveConnect controls.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="py-2.5 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 px-4 rounded-2xl bg-[#FF2D72] hover:bg-[#E11D48] text-white font-bold text-xs transition-all shadow-md shadow-pink-500/30 cursor-pointer"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
