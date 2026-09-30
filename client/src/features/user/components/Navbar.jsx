import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import Logo from "../../../assets/loveconnect.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

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
        </div>
      </nav>
    </header>
  );
}
