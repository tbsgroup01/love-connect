import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  User,
  Flame,
  ChevronDown,
  Sparkles,
  Heart,
  MessageSquare,
} from "lucide-react";
import Logo from "../../../assets/loveconnect.png";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/", targetId: "home" },
    { name: "How It Works", path: "/#how-it-works", targetId: "how-it-works" },
    { name: "Premium Plans", path: "/#pricing", targetId: "pricing" },
    {
      name: "Success Stories",
      path: "/#testimonials",
      targetId: "testimonials",
    },
  ];

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;

      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      const sections = ["testimonials", "pricing", "how-it-works"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, item) => {
    e.preventDefault();

    if (item.targetId === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        setActiveSection("home");
      } else {
        navigate("/");
      }
    } else {
      if (location.pathname === "/") {
        const el = document.getElementById(item.targetId);
        if (el) {
          const yOffset = -80;
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          window.history.pushState(null, "", `#${item.targetId}`);
          setActiveSection(item.targetId);
        }
      } else {
        navigate(`/#${item.targetId}`);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  const userName =
    currentUser?.name ||
    currentUser?.full_name ||
    (currentUser?.email ? currentUser.email.split("@")[0] : "") ||
    (currentUser?.role === "admin" ? "Admin" : "User");

  const userAvatar =
    currentUser?.avatar ||
    currentUser?.profile_picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName
    )}&background=FF2D72&color=fff&bold=true`;

  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#FFE7F0] font-poppins">
      <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center shrink-0">
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
                setActiveSection("home");
              }
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={Logo}
              className="h-10 sm:h-20 w-auto object-contain"
              alt="LoveConnect Logo"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-7 lg:gap-9">
          {navItems.map((item) => {
            const isActive =
              location.pathname === "/"
                ? activeSection === item.targetId
                : location.pathname + location.hash === item.path;

            return (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#FF2D72]"
                    : "text-[#17151A]/70 hover:text-[#FF2D72]"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {!currentUser ? (
            /* Logged Out State: Show Login & Signup */
            <>
              <Link
                to="/login"
                className="px-4 sm:px-5 py-2 rounded-full border border-[#FF2D72]/30 text-[#FF2D72] hover:bg-[#FFE7F0]/60 font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4.5 sm:px-5.5 py-2 rounded-full bg-[#FF2D72] hover:bg-[#e61b61] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#FF2D72]/20 cursor-pointer flex items-center justify-center"
              >
                Signup
              </Link>
              <Link
                to="/admin/dashboard"
                className="px-3.5 sm:px-4.5 py-2 rounded-full bg-[#17151A] hover:bg-[#2b2733] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-black/15 cursor-pointer flex items-center gap-1.5 shrink-0"
                title="Open Admin Portal"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#FF2D72]" />
                <span className="hidden sm:inline">Admin Dashboard</span>
                <span className="sm:hidden">Admin</span>
              </Link>
            </>
          ) : (
            /* Logged In State: Hide Login & Signup, Show Dashboard & User Menu */
            <>
              {currentUser.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="px-3.5 sm:px-4.5 py-2 rounded-full bg-[#17151A] hover:bg-[#2b2733] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-black/15 cursor-pointer flex items-center gap-1.5 shrink-0"
                  title="Open Admin Portal"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#FF2D72]" />
                  <span className="hidden sm:inline">Admin Dashboard</span>
                  <span className="sm:hidden">Admin</span>
                </Link>
              ) : (
                <Link
                  to="/discover"
                  className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] hover:from-[#e61b61] hover:to-[#6d28d9] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#FF2D72]/20 cursor-pointer flex items-center gap-1.5 shrink-0"
                  title="Go to Matches"
                >
                  <Flame className="w-3.5 h-3.5 fill-white text-white" />
                  <span className="hidden sm:inline">Explore Matches</span>
                  <span className="sm:hidden">Explore</span>
                </Link>
              )}

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 sm:pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
                >
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#FF2D72]"
                  />
                  <span className="hidden md:inline text-xs font-bold text-[#17151A] max-w-[110px] truncate">
                    {userName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Header */}
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-[#17151A] truncate">
                        {userName}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {currentUser.email ||
                          (currentUser.role === "admin"
                            ? "admin@loveconnect.com"
                            : "user@loveconnect.com")}
                      </p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE7F0] text-[#FF2D72]">
                        {currentUser.role === "admin"
                          ? "Administrator"
                          : "Member"}
                      </span>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      {currentUser.role === "admin" ? (
                        <>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#FF2D72] transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            Admin Dashboard
                          </Link>
                          <Link
                            to="/admin/app-settings?tab=profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#FF2D72] transition-colors"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            Admin Profile
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#FF2D72] transition-colors"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            My Profile
                          </Link>
                          <Link
                            to="/matches"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#FF2D72] transition-colors"
                          >
                            <Heart className="w-4 h-4 text-slate-400" />
                            Matches
                          </Link>
                          <Link
                            to="/messages"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#FF2D72] transition-colors"
                          >
                            <MessageSquare className="w-4 h-4 text-slate-400" />
                            Messages
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="border-t border-slate-100 my-1" />

                    {/* Logout Button */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

