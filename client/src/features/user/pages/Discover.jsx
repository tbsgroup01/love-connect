import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import {
  MapPin,
  Sparkles,
  RotateCcw,
  X,
  Heart,
  Star,
  ShieldCheck,
  Briefcase,
  GraduationCap,
} from "lucide-react"

import ananyaImg from "../../../assets/hero_woman.jpg"
import priyaImg from "../../../assets/priya_profile.jpg"
import meeraImg from "../../../assets/signup_hero_woman.jpg"
import rheaImg from "../../../assets/hero_woman_exact.png"

export default function Discover() {
  const navigate = useNavigate()

  // Category filter in Discover header: "all" | "nearby" | "new" | "verified"
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Profile Deck Data for Discover tab
  const profiles = [
    {
      id: 1,
      name: "Ananya",
      age: 24,
      image: ananyaImg,
      distance: "2 km away",
      profession: "Product Designer at Google",
      education: "Delhi University",
      location: "Noida, India",
      photoIndex: "1/5",
      bio: "Love exploring new places, good food and meaningful conversations. Looking to meet genuine people with big dreams! ✨",
      interests: ["Travel", "Music", "Food", "Photography"],
      moreInterestsCount: 3,
      matchScore: "98% Match"
    },
    {
      id: 2,
      name: "Priya",
      age: 25,
      image: priyaImg,
      distance: "4 km away",
      profession: "Senior Software Engineer at Microsoft",
      education: "IIT Delhi",
      location: "Gurugram, India",
      photoIndex: "1/4",
      bio: "Coffee enthusiast, weekend trekker, and indie pop lover. Seeking genuine smiles and shared adventures. ☕🏕️",
      interests: ["Coffee", "Fitness", "Coding", "Trekking"],
      moreInterestsCount: 2,
      matchScore: "96% Match"
    },
    {
      id: 3,
      name: "Meera",
      age: 23,
      image: meeraImg,
      distance: "6 km away",
      profession: "Architect at Design Studio",
      education: "School of Planning & Architecture",
      location: "New Delhi, India",
      photoIndex: "1/6",
      bio: "Passionate about minimalist architecture, street photography and deep late-night conversations over tea. 🎨",
      interests: ["Art", "Reading", "Architecture", "Tea"],
      moreInterestsCount: 4,
      matchScore: "92% Match"
    },
    {
      id: 4,
      name: "Rhea",
      age: 24,
      image: rheaImg,
      distance: "3 km away",
      profession: "Content Strategist at Zomato",
      education: "St. Xavier's College",
      location: "South Delhi, India",
      photoIndex: "1/5",
      bio: "Sunset chaser, beach lover, and dog parent. Let's explore local eateries and make every moment memorable. 🐕🌊",
      interests: ["Pets", "Movies", "Foodie", "Gaming"],
      moreInterestsCount: 5,
      matchScore: "94% Match"
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [matchModal, setMatchModal] = useState(null)

  const currentProfile = profiles[currentIndex % profiles.length]

  const handleAction = (direction) => {
    setSwipeDirection(direction)

    setTimeout(() => {
      setSwipeDirection(null)
      if (direction === "right" || direction === "up") {
        setMatchModal(currentProfile)
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
    }, 300)
  }

  const handleRewind = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <DashboardLayout activeTab="discover">
      <div className="w-full flex flex-col items-center animate-fadeIn">

        {/* Header section with category pills */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight flex items-center gap-2">
              <span>Discover</span>
              <Sparkles className="w-5 h-5 text-[#FF2D72] animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Find amazing genuine people around you
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none]">
            <button
              type="button"
              onClick={() => setCategoryFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${categoryFilter === "all"
                ? "bg-[#FF2D72] text-[#FFFFFF] shadow-md shadow-pink-500/30"
                : "bg-[#FFFFFF] text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter("nearby")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${categoryFilter === "nearby"
                ? "bg-[#FF2D72] text-[#FFFFFF] shadow-md"
                : "bg-[#FFFFFF] text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Nearby</span>
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter("new")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${categoryFilter === "new"
                ? "bg-[#FF2D72] text-[#FFFFFF] shadow-md"
                : "bg-[#FFFFFF] text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
            >
              <Star className="w-3 h-3" />
              <span>New</span>
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter("verified")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${categoryFilter === "verified"
                ? "bg-[#FF2D72] text-[#FFFFFF] shadow-md"
                : "bg-[#FFFFFF] text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Verified</span>
            </button>
          </div>
        </div>

        {/* STACKED PROFILES CANVAS */}
        <div className="relative w-full max-w-[440px] h-[520px] flex items-center justify-center my-2">

          {/* Background Stacked Card 1 */}
          <div className="absolute w-[92%] h-[480px] bg-slate-200/70 rounded-[32px] transform -rotate-6 scale-95 opacity-50 shadow-md blur-[1px] pointer-events-none" />
          {/* Background Stacked Card 2 */}
          <div className="absolute w-[95%] h-[500px] bg-slate-300/60 rounded-[32px] transform rotate-3 scale-98 opacity-75 shadow-lg pointer-events-none" />

          {/* Foreground Profile Card */}
          <div
            className={`relative w-full h-[520px] rounded-[32px] overflow-hidden bg-[#17151A] shadow-2xl shadow-purple-950/20 border-2 border-[#FFFFFF]/90 transition-all duration-300 ${swipeDirection === "right"
              ? "translate-x-full rotate-12 opacity-0"
              : swipeDirection === "left"
                ? "-translate-x-full -rotate-12 opacity-0"
                : swipeDirection === "up"
                  ? "-translate-y-full scale-105 opacity-0"
                  : "translate-x-0 rotate-0 opacity-100"
              }`}
          >
            {/* Image */}
            <img
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-full h-full object-cover object-top"
            />


            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#17151A]/95 via-[#17151A]/40 to-transparent pointer-events-none" />

            {/* Floating Super Like Action Pill on Card */}
            <button
              type="button"
              onClick={() => handleAction("up")}
              className="absolute right-4 bottom-[225px] z-30 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] text-xs font-extrabold shadow-lg shadow-pink-500/40 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
            >
              <Star className="w-4 h-4 fill-[#FFFFFF]" />
              <span>Super Like</span>
            </button>

            {/* Bottom Card Profile Info */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-[#FFFFFF] z-20 space-y-2">

              {/* Name, Age, Verified & Distance */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <span className="w-5 h-5 rounded-full bg-[#0095F6] text-[#FFFFFF] flex items-center justify-center text-[10px] font-black shadow-xs">
                    ✓
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFFFFF]/20 backdrop-blur-md text-[#FFFFFF] text-xs font-bold border border-[#FFFFFF]/20 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-pink-300" />
                  <span>{currentProfile.distance}</span>
                </span>
              </div>

              {/* Profession & Education */}
              <div className="space-y-0.5 text-xs text-slate-200 font-medium">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span className="truncate">{currentProfile.profession}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span className="truncate">{currentProfile.education}</span>
                </div>
              </div>

              {/* Interest Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProfile.interests.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#FFFFFF]/15 backdrop-blur-md text-[#FFFFFF] text-[10px] font-bold border border-[#FFFFFF]/15"
                  >
                    {tag}
                  </span>
                ))}
                {currentProfile.moreInterestsCount > 0 && (
                  <span className="px-2.5 py-1 rounded-lg bg-[#FF2D72]/40 backdrop-blur-md text-[#FFFFFF] text-[10px] font-bold border border-[#FF2D72]/40">
                    +{currentProfile.moreInterestsCount}
                  </span>
                )}
              </div>

              {/* Short Bio */}
              <p className="text-xs text-slate-300 leading-snug line-clamp-2 pt-1 font-normal">
                {currentProfile.bio}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS BAR */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 z-30">

          {/* Rewind */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={handleRewind}
              className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-slate-200/80 text-amber-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              title="Rewind"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-bold text-slate-600">Rewind</span>
          </div>

          {/* Dislike / Pass */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => handleAction("left")}
              className="w-14 h-14 rounded-full bg-[#FFFFFF] border-2 border-slate-200 text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              title="Dislike"
            >
              <X className="w-7 h-7 stroke-[3]" />
            </button>
            <span className="text-[10px] font-bold text-slate-600">Dislike</span>
          </div>

          {/* Like */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => handleAction("right")}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shadow-xl shadow-pink-500/40 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              title="Like"
            >
              <Heart className="w-8 h-8 fill-[#FFFFFF]" />
            </button>
            <span className="text-[10px] font-bold text-[#FF2D72]">Like</span>
          </div>

          {/* Super Like */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => handleAction("up")}
              className="w-14 h-14 rounded-full bg-[#FFFFFF] border-2 border-slate-200 text-amber-500 hover:bg-amber-50 flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              title="Super Like"
            >
              <Star className="w-7 h-7 fill-amber-400 stroke-amber-400" />
            </button>
            <span className="text-[10px] font-bold text-slate-600">Super Like</span>
          </div>

        </div>

        {/* MATCH CELEBRATION MODAL */}
        {matchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border-2 border-[#FF2D72] shadow-2xl">
              <div className="text-4xl animate-bounce">💖</div>
              <div>
                <h3 className="text-2xl font-black text-[#17151A]">It's a Match!</h3>
                <p className="text-xs text-slate-500 mt-1">You and {matchModal.name} liked each other.</p>
              </div>

              <div className="flex items-center justify-center gap-3 py-2">
                <img src={rheaImg} alt="You" className="w-16 h-16 rounded-full object-cover border-4 border-[#FF2D72] shadow-md" />
                <span className="text-xl font-black text-[#FF2D72]">❤️</span>
                <img src={matchModal.image} alt={matchModal.name} className="w-16 h-16 rounded-full object-cover border-4 border-[#7C3AED] shadow-md" />
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMatchModal(null)
                    setCurrentIndex((prev) => prev + 1)
                    navigate("/messages")
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] font-extrabold text-xs shadow-md cursor-pointer hover:brightness-105"
                >
                  Send a Message Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMatchModal(null)
                    setCurrentIndex((prev) => prev + 1)
                  }}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Keep Swiping
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}
