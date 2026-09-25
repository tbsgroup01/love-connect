import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import {
  Users,
  MessageSquare,
  Heart,
  Sparkles,
  MapPin,
  ShieldCheck,
  MoreVertical,
  Send,
  Crown,
  Briefcase,
  Check
} from "lucide-react"

import priyaImg from "../../../assets/priya_profile.jpg"
import meeraImg from "../../../assets/signup_hero_woman.jpg"
import rheaImg from "../../../assets/hero_woman_exact.png"
import snehaImg from "../../../assets/hero_woman.jpg"

export default function MatchesPage() {
  const navigate = useNavigate()
  const [filterTab, setFilterTab] = useState("all")

  // Match profiles list (matching Image 1)
  const matchesList = [
    {
      id: 1,
      name: "Priya",
      age: 25,
      score: "96% Match",
      online: true,
      profession: "Senior Software Engineer",
      distance: "2 km away",
      location: "Noida, India",
      tags: ["Travel", "Music", "Food", "Photography"],
      moreCount: 3,
      img: priyaImg,
    },
    {
      id: 2,
      name: "Meera",
      age: 23,
      score: "95% Match",
      online: true,
      profession: "Architect",
      distance: "3 km away",
      location: "Noida, India",
      tags: ["Art", "Reading", "Travel", "Fitness"],
      moreCount: 2,
      img: meeraImg,
    },
    {
      id: 3,
      name: "Rhea",
      age: 24,
      score: "92% Match",
      online: false,
      profession: "Content Strategist",
      distance: "5 km away",
      location: "Noida, India",
      tags: ["Food", "Movies", "Nature", "Pets"],
      moreCount: 2,
      img: rheaImg,
    },
  ]

  // Avatar list for New Matches (Start Chat) section (6 avatars matching Image 1)
  const newMatchesAvatars = [
    { name: "Priya", age: 25, img: priyaImg },
    { name: "Meera", age: 23, img: meeraImg },
    { name: "Rhea", age: 24, img: rheaImg },
    { name: "Sneha", age: 24, img: snehaImg },
    { name: "Kritika", age: 23, img: rheaImg },
    { name: "Neha", age: 22, img: meeraImg },
  ]

  // Custom Right Sidebar matching Image 1 exactly!
  const customRightSidebar = (
    <div className="space-y-4 animate-fadeIn">
      {/* 1. MATCH STATISTICS CARD */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#17151A] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#FF2D72] fill-[#FF2D72]" />
            <span>Match Statistics</span>
          </h4>
          <span className="text-[10px] font-bold text-slate-400">Last 30 days</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-[#FFE7F0]/40 border border-[#FFE7F0] flex items-center justify-between">
            <div>
              <span className="text-lg font-black text-[#17151A] block leading-tight">12</span>
              <span className="text-[10px] font-bold text-slate-500">Total Matches</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#FF2D72]/10 text-[#FF2D72] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-lg font-black text-[#17151A] block leading-tight">8</span>
              <span className="text-[10px] font-bold text-slate-500">Active Chats</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FFE7F0]/40 border border-[#FFE7F0] flex items-center justify-between">
            <div>
              <span className="text-lg font-black text-[#17151A] block leading-tight">24</span>
              <span className="text-[10px] font-bold text-slate-500">Profile Likes</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#FF2D72]/10 text-[#FF2D72] flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-[#FF2D72]" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
            <div>
              <span className="text-lg font-black text-[#17151A] block leading-tight">6</span>
              <span className="text-[10px] font-bold text-slate-500">New Matches</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. GET 10X MORE MATCHES PROMO BANNER CARD */}
      <div className="relative overflow-hidden rounded-2xl border border-[#FFD0E0] bg-gradient-to-br from-[#FFF0F5] via-white to-[#F4F0FF] p-4 sm:p-5 shadow-xs">
        <div className="relative z-10 max-w-[70%] space-y-2">
          <div className="flex items-center gap-1.5 text-[#F59E0B] font-extrabold text-xs sm:text-sm">
            <Crown className="w-4 h-4 fill-[#F59E0B] shrink-0" />
            <span>Get 10x More Matches</span>
          </div>

          <ul className="space-y-1 text-[11px] sm:text-xs font-semibold text-slate-600">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>See who likes you</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>Unlimited likes</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>Advanced filters</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>Highlight your profile</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => navigate("/#pricing")}
            className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] text-xs font-black shadow-xs hover:brightness-105 cursor-pointer transition-all"
          >
            <span>Upgrade to Premium</span>
            <span>→</span>
          </button>
        </div>

        {/* Woman image artwork on bottom right */}
        <img
          src={snehaImg}
          alt="Upgrade Premium"
          className="absolute -right-1 -bottom-1 w-32 h-44 object-cover rounded-xl shadow-xs border-2 border-white pointer-events-none"
        />
      </div>

      {/* 3. PEOPLE NEAR YOU CARD */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#17151A] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#FF2D72]" />
            <span>People Near You</span>
          </h4>
          <button
            type="button"
            onClick={() => alert("Showing all nearby profiles")}
            className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-center">
          {[
            { name: "Kritika", age: 23, dist: "1 km away", img: rheaImg },
            { name: "Neha", age: 22, dist: "2 km away", img: meeraImg },
            { name: "Simran", age: 24, dist: "3 km away", img: priyaImg },
          ].map((user, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="relative w-full h-20 rounded-xl overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                <span className="w-5 h-5 rounded-full bg-white/90 text-[#FF2D72] absolute bottom-1 right-1 flex items-center justify-center text-[10px] shadow-2xs">
                  ❤️
                </span>
              </div>
              <span className="text-xs font-extrabold text-[#17151A] truncate w-full pt-1">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold -mt-1">
                {user.age}
              </span>
              <span className="text-[9px] text-slate-500 font-semibold -mt-1">
                {user.dist}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout activeTab="matches" customRightSidebar={customRightSidebar}>
      <div className="w-full space-y-5 animate-fadeIn">

        {/* 1. PAGE HEADER SECTION WITH ROMANTIC GRAPHIC */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#17151A] tracking-tight">
                Your Matches (12)
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Start a conversation with your mutual matches
              </p>
            </div>
          </div>

          {/* Right side banner graphic */}
          <div className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFF0F5] to-[#F4F0FF] border border-[#FFE7F0]">
            <div className="text-xl">💖</div>
            <div>
              <span className="block text-xs font-black text-[#FF2D72] italic font-serif">It's better together</span>
              <span className="text-[11px] font-semibold text-slate-500">Meaningful conversations start with a hello!</span>
            </div>
          </div>
        </div>

        {/* 2. CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {[
            { id: "all", label: "All Matches", icon: null },
            { id: "online", label: "Online Now", dot: "#22C55E" },
            { id: "new", label: "New Matches", icon: Sparkles },
            { id: "nearby", label: "Nearby", icon: MapPin },
            { id: "verified", label: "Verified", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === tab.id
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] shadow-xs scale-[1.01]"
                  : "bg-[#FFFFFF] text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {tab.dot && <span className="w-2 h-2 rounded-full bg-[#22C55E]" />}
              {tab.icon && <tab.icon className="w-3.5 h-3.5 text-current" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 3. NEW MATCHES (START CHAT) HORIZONTAL AVATARS ROW */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black text-[#17151A] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span>New Matches (Start Chat)</span>
            </h3>
            <button
              type="button"
              onClick={() => alert("Viewing all matches")}
              className="text-xs font-black text-[#FF2D72] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>See All</span>
              <span>→</span>
            </button>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-1 scrollbar-none">
            {newMatchesAvatars.map((person, idx) => (
              <div
                key={idx}
                onClick={() => navigate("/messages")}
                className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-[#FF2D72] group-hover:scale-105 transition-transform shadow-2xs">
                  <img src={person.img} alt={person.name} className="w-full h-full rounded-full object-cover" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white absolute bottom-0 right-0" />
                </div>
                <div className="text-center leading-tight">
                  <span className="block text-xs font-extrabold text-[#17151A] group-hover:text-[#FF2D72] transition-colors">
                    {person.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {person.age}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MATCH CARDS LIST */}
        <div className="space-y-3.5">
          {matchesList.map((match) => (
            <div
              key={match.id}
              className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#FF2D72]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Avatar Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-2xs">
                  <img src={match.img} alt={match.name} className="w-full h-full object-cover" />
                  {match.online && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-white" />
                  )}
                </div>

                {/* Profile Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-[#17151A]">
                      {match.name}, {match.age}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[10px] font-extrabold">
                      {match.score}
                    </span>
                    <span className={`text-xs font-bold flex items-center gap-1 ${match.online ? "text-[#22C55E]" : "text-slate-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${match.online ? "bg-[#22C55E] animate-pulse" : "bg-slate-300"}`} />
                      <span>{match.online ? "Online" : "Offline"}</span>
                    </span>
                  </div>

                  <div className="space-y-0.5 text-xs text-slate-500 font-semibold">
                    <p className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{match.profession}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{match.distance} • {match.location}</span>
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {match.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                    {match.moreCount > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[11px] font-bold">
                        +{match.moreCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => navigate("/messages")}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] font-black text-xs shadow-2xs hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Options for ${match.name}`)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/60"
                  title="More options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  )
}
