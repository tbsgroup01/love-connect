import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Heart,
  ShieldCheck,
  Users,
  User,
  Sparkles,
  LockKeyhole,
} from "lucide-react";
import loginCoupleImg from "../../../assets/login_couple.jpg";
import loveConnectLogo from "../../../assets/loveconnect.png";

export default function Login({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" | "signup"

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Meet Real People",
      subtitle: "Find Meaningful Connections",
      badge: "98% Chemistry Rate",
    },
    {
      title: "Verified & Safe",
      subtitle: "100% Human-Checked Profiles",
      badge: "Zero Fake Guarantee",
    },
    {
      title: "Spark Chemistry",
      subtitle: "Fall in Love Naturally",
      badge: "45k+ Matches This Week",
    },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      navigate("/");
    } else {
      // Account created -> Proceed to Onboarding flow
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex items-center justify-center p-3 sm:p-4 lg:p-6 relative overflow-y-auto lg:overflow-hidden font-poppins select-none py-6 lg:py-0">
      {/* Ambient Fluid Glows */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-gradient-to-tl from-[#7C3AED]/15 via-[#FFE7F0]/60 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/40 blur-3xl rounded-full pointer-events-none" />

      {/* Floating Animated Ambient Hearts */}
      <div className="absolute top-8 right-14 text-[#FF2D72]/25 pointer-events-none hidden sm:block animate-float-slow">
        <Heart className="w-9 h-9 fill-[#FF2D72]/20" />
      </div>
      <div className="absolute bottom-12 right-28 text-[#FF2D72]/20 pointer-events-none hidden sm:block animate-float-reverse">
        <Heart className="w-12 h-12 fill-[#FF2D72]/15" />
      </div>
      <div className="absolute top-20 left-20 text-[#7C3AED]/25 pointer-events-none hidden sm:block animate-float-slow">
        <Heart className="w-7 h-7 fill-[#7C3AED]/20" />
      </div>
      <div className="absolute bottom-16 left-28 text-[#FF2D72]/20 pointer-events-none hidden sm:block animate-float-reverse">
        <Heart className="w-8 h-8 fill-[#FF2D72]/15" />
      </div>

      {/* Main SaaS Card (24px border radius, clean white, soft shadow) */}
      <div className="relative z-10 w-full max-w-6xl h-auto lg:max-h-[94vh] bg-white rounded-[28px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 my-auto">
        {/* ========================================================= */}
        {/* LEFT/BOTTOM COLUMN: Visual Hero Banner with Couple       */}
        {/* Order 2 on mobile (below form), Order 1 on desktop (left) */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 order-2 lg:order-1 relative min-h-[320px] sm:min-h-[380px] lg:min-h-0 flex flex-col justify-end p-5 sm:p-6 lg:p-7 overflow-hidden bg-[#17151A] group">
          {/* Couple Photo Background with subtle scale on hover */}
          <img
            src={loginCoupleImg}
            alt="Romantic Couple Embrace"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Deep Dark Gradient Vignette for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17151A] via-[#17151A]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

          {/* Floating Live Trust Badge on Photo */}
          <div className="absolute top-5 right-5 z-20 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse-soft">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
            <span>{slides[currentSlide].badge}</span>
          </div>

          {/* Glowing Pink Neon Vector Ribbon Line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
            viewBox="0 0 500 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-20,250 C120,200 80,380 260,350 C380,330 450,230 520,380"
              stroke="url(#neonPinkGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px rgba(255, 45, 114, 0.8))"
            />
            <defs>
              <linearGradient
                id="neonPinkGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF2D72" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#FF2D72" stopOpacity="1" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating 3D Hearts on the Image */}
          <div className="absolute top-9 left-6 sm:left-8 z-10 animate-float-slow">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF2D72] to-[#ff4a86] flex items-center justify-center shadow-lg shadow-[#FF2D72]/50 border border-white/20">
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
            </div>
          </div>

          <div className="absolute top-44 right-6 sm:right-8 z-10 animate-float-reverse">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF2D72] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#FF2D72]/50 border border-white/20">
              <Heart className="w-3 h-3 fill-white text-white" />
            </div>
          </div>

          <div className="absolute bottom-52 left-4 z-10 opacity-75 animate-pulse-soft">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF2D72]/70 to-[#7C3AED]/50 blur-xs flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white text-white" />
            </div>
          </div>

          {/* Content at Bottom of Left Panel */}
          <div className="relative z-20 flex flex-col items-center text-center">
            {/* Official LoveConnect Brand Logo Link */}
            <Link
              to="/"
              title="Return to LoveConnect Home"
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-black/30 border border-white/40 group/leftlogo cursor-pointer mb-1.5 hover:scale-105 transition-all duration-300"
            >
              <img
                src={loveConnectLogo}
                alt="LoveConnect Logo"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>

            {/* Slide Title & Subtitle with smooth fade animation */}
            <div className="min-h-[46px] flex flex-col items-center justify-center mt-1">
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
                {slides[currentSlide].title}
              </h3>
              <p className="text-[11px] sm:text-xs text-pink-100/90 font-normal mt-0.5 max-w-xs">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* 3 Pill Badges (Real People, Safe & Secure, Meaningful Connections) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs mt-3.5">
              <div className="flex flex-col items-center group/badge cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-1 shadow-xs group-hover/badge:bg-white/25 transition-all">
                  <Heart className="w-3.5 h-3.5 fill-[#FF2D72] text-[#FF2D72]" />
                </div>
                <span className="text-[10px] font-bold text-white leading-tight">
                  Real People
                </span>
              </div>

              <div className="flex flex-col items-center group/badge cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-1 shadow-xs group-hover/badge:bg-white/25 transition-all">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-bold text-white leading-tight">
                  Safe & Secure
                </span>
              </div>

              <div className="flex flex-col items-center group/badge cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-1 shadow-xs group-hover/badge:bg-white/25 transition-all">
                  <Users className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-bold text-white leading-tight">
                  Meaningful
                </span>
              </div>
            </div>

            {/* Carousel Indicators with smooth transitions */}
            <div className="flex items-center justify-center gap-1.5 mt-3.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? "w-7 bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] shadow-xs"
                      : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Modern SaaS Form (Clean, Attractive, Fast) */}
        {/* Order 1 on mobile (form first), Order 2 on desktop       */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 order-1 lg:order-2 p-5 sm:p-7 lg:p-8 flex flex-col justify-center bg-white relative overflow-y-visible lg:overflow-y-auto lg:max-h-[94vh] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Subtle Top Right Floating Ambient Heart */}
          <div className="absolute top-4 right-4 text-pink-200/50 pointer-events-none">
            <Heart className="w-8 h-8 fill-pink-100 text-pink-200/60" />
          </div>

          {/* Form Header with Official Clickable Logo to Home */}
          <div className="text-center mb-4">
            <Link
              to="/"
              title="Return to LoveConnect Home"
              className="inline-flex items-center justify-center group cursor-pointer py-1"
            >
              <img
                src={loveConnectLogo}
                alt="LoveConnect"
                className="h-10 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
              />
            </Link>
            <p className="text-[11px] sm:text-xs text-[#64748b] mt-1 font-normal">
              {mode === "login"
                ? "Sign in to continue your journey"
                : "Create an account to start your love story"}
            </p>
          </div>

          {/* Segmented Tab Switcher (16px border-radius) */}
          <div className="bg-[#FAFAFC] p-1 rounded-2xl border border-slate-200/90 flex items-center max-w-xs mx-auto w-full mb-3.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                mode === "login"
                  ? "bg-[#FFE7F0] text-[#FF2D72] shadow-xs"
                  : "text-[#64748b] hover:text-[#17151A]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                mode === "signup"
                  ? "bg-[#FFE7F0] text-[#FF2D72] shadow-xs"
                  : "text-[#64748b] hover:text-[#17151A]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Authentication Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-2.5 max-w-xs mx-auto w-full"
          >
            {/* If Sign Up: Name Field */}
            {mode === "signup" && (
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                    focusedField === "name"
                      ? "text-[#FF2D72]"
                      : "text-slate-400"
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAFAFC] focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-[#FF2D72] rounded-xl text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-[#FFE7F0] transition-all shadow-2xs"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                  focusedField === "email"
                    ? "text-[#FF2D72]"
                    : "text-slate-400"
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              <input
                type={mode === "signup" ? "email" : "text"}
                required
                placeholder={
                  mode === "signup" ? "Email Address" : "Email or Mobile Number"
                }
                value={formData.email}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAFAFC] focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-[#FF2D72] rounded-xl text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-[#FFE7F0] transition-all shadow-2xs"
              />
            </div>

            {/* If Sign Up: Phone Number Field */}
            {mode === "signup" && (
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                    focusedField === "phone"
                      ? "text-[#FF2D72]"
                      : "text-slate-400"
                  }`}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Mobile / Phone Number"
                  value={formData.phone}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAFAFC] focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-[#FF2D72] rounded-xl text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-[#FFE7F0] transition-all shadow-2xs"
                />
              </div>
            )}

            {/* Password Input */}
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                  focusedField === "password"
                    ? "text-[#FF2D72]"
                    : "text-slate-400"
                }`}
              >
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={formData.password}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAFC] focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-[#FF2D72] rounded-xl text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-[#FFE7F0] transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#FF2D72] transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            {mode === "login" && (
              <div className="flex justify-end pt-0.5">
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-bold text-[#7C3AED] hover:text-[#FF2D72] transition-colors cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Primary Action Button (Gradient, Elevated Shadow, Micro-Hover) */}
            <button
              type="submit"
              className="group w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#FF2D72]/25 hover:shadow-lg hover:shadow-[#FF2D72]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <span>{mode === "login" ? "Login" : "Sign Up"}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </form>

          {/* "OR" Divider */}
          <div className="flex items-center my-3 max-w-xs mx-auto w-full">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Social Sign-In Buttons */}
          <div className="space-y-2 max-w-xs mx-auto w-full">
            {/* Google Login */}
            <button
              type="button"
              onClick={() => alert("Google authentication triggered")}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#17151A] font-bold text-xs flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Apple Login */}
            <button
              type="button"
              onClick={() => alert("Apple authentication triggered")}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#17151A] font-bold text-xs flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <svg
                className="w-4 h-4 fill-current shrink-0"
                viewBox="0 0 170 170"
              >
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.43-6.2-9.47-11.22-20.08-15.07-31.83-3.84-11.75-5.77-22.75-5.77-33 0-14.7 3.6-26.68 10.79-35.94 7.2-9.26 16.27-13.98 27.22-14.16 4.8 0 10.15 1.25 16.06 3.76 5.91 2.5 9.77 3.82 11.59 3.96 1.45-.14 5.31-1.46 11.59-3.96 6.28-2.51 11.63-3.76 16.06-3.76 8.5 0 16.14 2.37 22.92 7.12 6.78 4.75 11.59 11.16 14.42 19.23-7.53 4.58-12.83 10.75-15.9 18.5-3.07 7.76-3.65 15.82-1.74 24.18 1.91 8.36 6.09 15.24 12.54 20.65 6.45 5.4 13.91 8.71 22.39 9.93-1.63 5.43-3.74 10.77-6.33 16.02zM119.22 31.86c0-7.72 2.76-15.11 8.29-22.18 5.53-7.07 12.39-11.39 20.58-12.96.44 1.5.66 3.01.66 4.54 0 7.82-2.83 15.22-8.5 22.18-5.66 6.96-12.67 11.23-21.03 12.8-.23-1.45-.35-2.91-.35-4.38z" />
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Bottom Switch Mode / Create Account Link */}
          <div className="text-center mt-3">
            <p className="text-xs text-[#64748b]">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-bold text-[#FF2D72] hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-bold text-[#FF2D72] hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Trust Security Note */}
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-slate-400">
            <LockKeyhole className="w-3 h-3 text-slate-400" />
            <span>256-bit Encrypted • Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
