import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import {
  Camera,
  Pencil,
  Briefcase,
  GraduationCap,
  MapPin,
  Eye,
  Heart,
  Star,
  Users,
  User,
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
  Lock,
  Bell,
  HelpCircle,
  Share2,
  LogOut,
  Crown,
  ImagePlus,
  UserCheck,
  ChevronRight,
  Shield,
  Compass
} from "lucide-react"

import rheaImg from "../../../assets/hero_woman_exact.png"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profileSubTab, setProfileSubTab] = useState("about")

  return (
    <DashboardLayout activeTab="profile">
      <div className="w-full space-y-6 animate-fadeIn">

        {/* 1. HERO PROFILE CARD WITH COVER PHOTO & AVATAR */}
        <div className="bg-[#FFFFFF] rounded-3xl overflow-hidden border border-slate-200/80  relative">
          {/* Cover Banner */}
          <div className="relative h-48 sm:h-56 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
              alt="Cover Header"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            <button
              type="button"
              onClick={() => alert("Edit Cover Photo")}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-[#FFFFFF] text-xs font-bold px-3.5 py-2 rounded-xl border border-white/20 flex items-center gap-2 transition-all cursor-pointer "
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Edit Cover Photo</span>
            </button>
          </div>

          {/* Header Profile Content */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
              {/* Avatar with Badges */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-[#FFFFFF] shrink-0">
                <img
                  src={rheaImg}
                  alt="Ananya Verma"
                  className="w-full h-full rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => alert("Change Profile Photo")}
                  className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-[#FFFFFF] flex items-center justify-center shadow-md transition-colors cursor-pointer border-2 border-[#FFFFFF]"
                  title="Change Profile Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <span
                  className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#22C55E] border-2 border-[#FFFFFF]"
                  title="Online Now"
                />
              </div>

              {/* Edit Profile Button */}
              <button
                type="button"
                onClick={() => navigate("/create-profile")}
                className="self-start sm:self-end px-5 py-2.5 rounded-full border-2 border-[#FF2D72] text-[#FF2D72] hover:bg-[#FFE7F0] font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* User Info Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-black text-[#17151A]">
                  Ananya Verma, 24
                </h2>
                <span className="w-5 h-5 rounded-full bg-[#0095F6] text-[#FFFFFF] flex items-center justify-center text-[10px] font-black shadow-sm" title="Verified Profile">
                  ✓
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 flex-wrap pt-0.5">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Product Designer at Google</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>Delhi University</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Noida, India</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#22C55E] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span>Online</span>
                </span>
              </div>
            </div>

            {/* 2. STATS GRID (4 cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-[#FFE7F0]/40 border border-[#FFE7F0] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF2D72]/10 text-[#FF2D72] flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#17151A] block leading-tight">2.4k</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-500">Profile Views</span>
                    <span className="text-[10px] font-extrabold text-[#22C55E]">↑ 12%</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F3E8FF]/40 border border-[#F3E8FF] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-[#7C3AED]" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#17151A] block leading-tight">482</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-500">Likes Received</span>
                    <span className="text-[10px] font-extrabold text-[#22C55E]">↑ 8%</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FEF3C7]/40 border border-[#FEF3C7] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-[#F59E0B]" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#17151A] block leading-tight">34</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-500">Super Likes</span>
                    <span className="text-[10px] font-extrabold text-[#22C55E]">↑ 25%</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#E0F2FE]/40 border border-[#E0F2FE] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#17151A] block leading-tight">28</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-500">Matches</span>
                    <span className="text-[10px] font-extrabold text-[#22C55E]">↑ 15%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROFILE COMPLETION PERCENTAGE BAR (Requirement 17) */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF2D72]" />
                  <span className="font-extrabold text-sm text-[#17151A]">Profile 85% Complete</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE7F0] text-[#FF2D72]">+15% for ID Verification</span>
                </div>
                <p className="text-xs text-slate-500">Profiles with 100% completion receive up to 300% more match recommendations.</p>
              </div>
              <div className="w-full sm:w-56 space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-slate-600">
                  <span>Completion Score</span>
                  <span className="text-[#FF2D72]">85%</span>
                </div>
                <div className="w-full bg-white h-2.5 rounded-full border border-pink-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] rounded-full transition-all" style={{ width: '85%' }} />
                </div>
              </div>
            </div>

            {/* 3. SUB-NAVIGATION TABS */}
            <div className="flex items-center gap-6 mt-6 border-b border-slate-100 pb-0 overflow-x-auto scrollbar-none">
              {[
                { id: "about", label: "About" },
                { id: "photos", label: "Photos" },
                { id: "interests", label: "Interests" },
                { id: "lifestyle", label: "Lifestyle" },
                { id: "preferences", label: "Preferences" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setProfileSubTab(tab.id)}
                  className={`pb-3 text-xs font-black transition-all cursor-pointer relative shrink-0 ${profileSubTab === tab.id
                    ? "text-[#FF2D72]"
                    : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  <span>{tab.label}</span>
                  {profileSubTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. MAIN BODY SECTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT SUB-COLUMN (7 / 12) */}
          <div className="md:col-span-7 space-y-6">
            {/* CARD 1: ABOUT ME */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80   space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </span>
                  <span>About Me</span>
                </h3>
                <button
                  type="button"
                  onClick={() => alert("Edit About Me")}
                  className="text-xs font-bold text-slate-500 hover:text-[#FF2D72] px-3 py-1 rounded-full border border-slate-200 hover:border-[#FFE7F0] transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                I'm a cheerful person who loves exploring new places, good food, and meaningful conversations. Looking to meet genuine people and see where it goes.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: "Positive", icon: "😊" },
                  { label: "Adventure Lover", icon: "✈️" },
                  { label: "Foodie", icon: "🍴" },
                  { label: "Travel Enthusiast", icon: "📖" },
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-[#FFE7F0]/70 text-[#FF2D72] text-xs font-extrabold flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{tag.icon}</span>
                    <span>{tag.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CARD 2: INTERESTS */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80   space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span>Interests</span>
                </h3>
                <button
                  type="button"
                  onClick={() => alert("Edit Interests")}
                  className="text-xs font-bold text-slate-500 hover:text-[#FF2D72] px-3 py-1 rounded-full border border-slate-200 hover:border-[#FFE7F0] transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    name: "Travel",
                    icon: "✈️",
                    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    name: "Music",
                    icon: "🎵",
                    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    name: "Food",
                    icon: "🍔",
                    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    name: "Photography",
                    icon: "📷",
                    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    name: "Fitness",
                    icon: "🏋️",
                    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    name: "Reading",
                    icon: "📖",
                    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    name: "Nature",
                    icon: "🌿",
                    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    name: "Pets",
                    icon: "🐾",
                    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative h-24 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-2.5">
                      <div className="flex items-center gap-1.5 text-[#FFFFFF]">
                        <span className="text-xs">{item.icon}</span>
                        <span className="text-xs font-black drop-shadow-sm">{item.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SUB-COLUMN (5 / 12) */}
          <div className="md:col-span-5 space-y-6">
            {/* CARD 3: BASIC INFORMATION */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80   space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4" />
                  </span>
                  <span>Basic Information</span>
                </h3>
                <button
                  type="button"
                  onClick={() => alert("Edit Basic Info")}
                  className="text-xs font-bold text-slate-500 hover:text-[#FF2D72] px-3 py-1 rounded-full border border-slate-200 hover:border-[#FFE7F0] transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Name</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Ananya Verma</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                    <span>Age</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Location</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Noida, India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>Education</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Delhi University</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profession</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Product Designer at Google</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <span>Height</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">5'5" (165 cm)</span>
                </div>
              </div>
            </div>

            {/* CARD 4: LIFESTYLE */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80   space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </span>
                  <span>Lifestyle</span>
                </h3>
                <button
                  type="button"
                  onClick={() => alert("Edit Lifestyle")}
                  className="text-xs font-bold text-slate-500 hover:text-[#FF2D72] px-3 py-1 rounded-full border border-slate-200 hover:border-[#FFE7F0] transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span>🚬</span>
                    <span>Smoking</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Sometimes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span>🍷</span>
                    <span>Drinking</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Socially</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span>🥗</span>
                    <span>Diet</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Vegetarian</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span>🐾</span>
                    <span>Pets</span>
                  </span>
                  <span className="font-extrabold text-[#17151A]">Dog Lover</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 17: COMPLETE PROFILE DASHBOARD & SETTINGS MENU */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#FF2D72]" />
                <span>Profile Management & Account Menu</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Quick access to all profile controls, privacy options, and security settings.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-[#FF2D72]">
              14 Options
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Edit Profile", desc: "Update bio, profession, education, height", path: "/edit-profile", icon: Pencil },
              { title: "Manage Photos", desc: "Reorder photos, upload new angles, delete", path: "/manage-photos", icon: ImagePlus },
              { title: "Profile Preview", desc: "See how your profile appears to other singles", path: "/profile-details", icon: Eye },
              { title: "Personal Information", desc: "Name, DOB, gender, and contact details", path: "/edit-profile", icon: User },
              { title: "Lifestyle & Interests", desc: "Smoking, drinking, pets, fitness, diet", path: "/filters", icon: Heart },
              { title: "Relationship Preferences", desc: "Relationship, casual dating, or friendship", path: "/filters", icon: Compass },
              { title: "Verification Center", desc: "Selfie scan, phone, email & identity badge", path: "/verification", icon: ShieldCheck, badge: "Pending" },
              { title: "Profile Visibility", desc: "Public, Only Matches, or Hidden mode", path: "/visibility", icon: Eye },
              { title: "Account Settings", desc: "Password, linked accounts, devices", path: "/settings", icon: SlidersHorizontal },
              { title: "Privacy & Safety", desc: "Blocked users, muted conversations, safety tips", path: "/privacy-safety", icon: Shield },
              { title: "Premium Subscription", desc: "Upgrade to Gold VIP, rewind swipes, boosts", path: "/premium", icon: Crown, badge: "Save 33%" },
              { title: "Notifications", desc: "Manage push alerts, emails, and reminders", path: "/notifications", icon: Bell },
              { title: "Help & Support", desc: "24/7 dedicated assistance, FAQs, live chat", path: "/privacy-policy", icon: HelpCircle },
              { title: "Invite Friends", desc: "Share LoveConnect & earn 3 free Super Likes", path: "/discover", icon: Share2 },
              { title: "Log Out", desc: "Securely sign out of this device session", path: "/login", icon: LogOut, danger: true },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 group hover:shadow-sm ${
                    item.danger
                      ? 'border-red-100 hover:border-red-300 bg-red-50/20'
                      : 'border-slate-100 hover:border-pink-200 bg-slate-50/40 hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      item.danger
                        ? 'bg-red-100 text-red-600'
                        : 'bg-[#FFE7F0] text-[#FF2D72]'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-black truncate ${item.danger ? 'text-red-600' : 'text-[#17151A]'}`}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#FFE7F0] text-[#FF2D72]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF2D72] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}
