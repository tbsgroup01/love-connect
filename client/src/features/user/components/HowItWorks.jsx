import React, { useState, useEffect } from "react"
import {
  UserCheck,
  Sparkles,
  MessageCircleHeart,
  CalendarHeart,
  ShieldCheck,
  Heart,
  ArrowRight,
  CheckCircle2,
  Send,
  Volume2,
  MapPin,
  Flame,
  Award,
  Clock,
  ThumbsUp,
  Smile
} from "lucide-react"

import priyaProfileImg from "../../../assets/priya_profile.jpg"
import heroCoupleRomanticImg from "../../../assets/hero_couple_romantic.jpg"

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const steps = [
    {
      id: "01",
      title: "Create Your Authentic Profile",
      tagline: "Be your true self in minutes",
      description:
        "Upload your genuine photos, record a fun voice intro, and answer curated personality prompts that showcase what makes you unique. Quick selfie verification keeps our community 100% authentic.",
      icon: UserCheck,
      color: "from-[#FF2D72] to-[#FF6B8B]",
      accentBg: "bg-[#FFE7F0]",
      accentText: "text-[#FF2D72]",
      badge: "Fast 2-Min Setup",
      tags: ["✨ AI Bio Assistant", "🔒 Selfie Verified", "🎙️ Voice Intro"],
    },
    {
      id: "02",
      title: "Discover Smart Chemistry Matches",
      tagline: "Beyond surface-level swiping",
      description:
        "Our intelligent compatibility engine analyzes core values, lifestyle habits, and mutual interests to present high-chemistry matches. No endless mindless swiping — only meaningful recommendations.",
      icon: Sparkles,
      color: "from-[#7C3AED] to-[#A855F7]",
      accentBg: "bg-purple-50",
      accentText: "text-[#7C3AED]",
      badge: "98% Compatibility",
      tags: ["🎯 Core Values", "⚡ Daily Curated Picks", "📍 Local Radius"],
    },
    {
      id: "03",
      title: "Spark Natural Conversations",
      tagline: "Say goodbye to awkward small talk",
      description:
        "Break the ice effortlessly with dynamic conversation starters, photo reactions, and playful interactive questions. When mutual chemistry clicks, chats flow easily without dry pauses.",
      icon: MessageCircleHeart,
      color: "from-[#FF2D72] to-[#7C3AED]",
      accentBg: "bg-pink-50",
      accentText: "text-[#FF2D72]",
      badge: "Instant Chemistry",
      tags: ["💬 Icebreaker Prompts", "📸 Photo Reactions", "🔒 Safe Chat"],
    },
    {
      id: "04",
      title: "Meet Safely & Fall in Love",
      tagline: "From screen to real-life sparks",
      description:
        "Turn delightful online conversations into memorable first dates. Discover partner-approved coffee spots, quiet romantic lounges, and enjoy our built-in Date Safe sharing features.",
      icon: CalendarHeart,
      color: "from-[#059669] to-[#10B981]",
      accentBg: "bg-emerald-50",
      accentText: "text-[#059669]",
      badge: "Date-Safe Certified",
      tags: ["☕ Curated Meetups", "🛡️ Date-Check In", "❤️ Real Stories"],
    },
  ]

  // Auto-cycle through steps if user isn't hovering
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, steps.length])

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white via-[#FCF9FB] to-white"
    >
      {/* Decorative Fluid Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 w-[700px] h-[450px] bg-gradient-to-br from-[#FFE7F0]/70 via-[#7C3AED]/8 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFE7F0]/50 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-20 -z-10 w-[450px] h-[450px] bg-gradient-to-l from-purple-100/50 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Subtle Floating Hearts */}
      <div className="absolute top-16 left-12 text-[#FF2D72]/30 pointer-events-none hidden md:block animate-pulse">
        <Heart className="w-5 h-5 fill-[#FF2D72]/20" />
      </div>
      <div className="absolute bottom-20 right-16 text-[#FF2D72]/25 pointer-events-none hidden md:block">
        <Heart className="w-6 h-6 fill-[#FF2D72]/15" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE7F0] border border-[#FF2D72]/20 shadow-xs mb-4">
            <Sparkles className="w-4 h-4 text-[#FF2D72]" />
            <span className="text-xs font-bold text-[#FF2D72] uppercase tracking-wider">
              HOW IT WORKS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17151A] tracking-tight leading-[1.15] mb-5">
            Your Journey to{" "}
            <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] bg-clip-text text-transparent">
              Real Love
            </span>{" "}
            in 4 Simple Steps
          </h2>

          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            We’ve redesigned dating from the ground up to eliminate ghosting, fake profiles, and awkward chats. Here is how genuine relationships unfold on LoveConnect.
          </p>

          {/* Quick Progress Indicator Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8">
            {steps.map((st, i) => (
              <button
                key={st.id}
                onClick={() => {
                  setActiveStep(i)
                  setIsAutoPlaying(false)
                }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeStep === i
                    ? "bg-[#17151A] text-white shadow-md shadow-black/10 scale-105"
                    : "bg-white text-[#64748b] hover:bg-pink-50/80 border border-gray-200/80"
                  }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${activeStep === i
                      ? "bg-[#FF2D72] text-white"
                      : "bg-gray-100 text-[#64748b] group-hover:bg-[#FFE7F0] group-hover:text-[#FF2D72]"
                    }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-bold hidden sm:inline">
                  {st.title.split(" ")[0]} {st.title.split(" ")[1]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Interactive Step Cards (Left) + Interactive Visual Phone Mockup (Right) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isActive = activeStep === index

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${isActive
                      ? "bg-white border-[#FF2D72]/30 shadow-xl shadow-[#FF2D72]/10 ring-2 ring-[#FF2D72]/15 translate-x-1"
                      : "bg-white/70 hover:bg-white border-gray-100/90 hover:border-pink-200 shadow-xs hover:shadow-md"
                    }`}
                >
                  {/* Left Active Glow Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-gradient-to-b from-[#FF2D72] to-[#7C3AED]" />
                  )}

                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Icon / Step Badge */}
                    <div
                      className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 ${isActive
                          ? `bg-gradient-to-br ${step.color} text-white shadow-lg shadow-[#FF2D72]/25 scale-105`
                          : `${step.accentBg} ${step.accentText} group-hover:scale-105`
                        }`}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-black tracking-wider uppercase px-2 py-0.5 rounded-full ${isActive
                                ? "bg-[#FFE7F0] text-[#FF2D72]"
                                : "bg-gray-100 text-[#64748b]"
                              }`}
                          >
                            STEP {step.id}
                          </span>
                          <span className="text-xs font-semibold text-[#8e8a9d]">
                            {step.tagline}
                          </span>
                        </div>

                        {isActive && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white shadow-xs animate-pulse">
                            {step.badge}
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${isActive ? "text-[#17151A]" : "text-[#17151A]/85 group-hover:text-[#FF2D72]"
                          }`}
                      >
                        {step.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-sm text-[#64748b] leading-relaxed mt-1.5 font-normal transition-all duration-300 ${isActive ? "block" : "line-clamp-2 sm:line-clamp-1"
                          }`}
                      >
                        {step.description}
                      </p>


                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Dynamic Interactive Mockup Device */}
          <div className="lg:col-span-6 flex justify-center items-center relative order-1 lg:order-2 py-4">
            {/* Ambient Background Aura */}
            <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-gradient-to-tr from-[#FFE7F0] via-[#FF2D72]/15 to-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Floating Top Trust Pill */}
            <div className="absolute -top-3 sm:-top-5 right-4 sm:right-10 z-30 bg-white/95 backdrop-blur-md border border-[#FFE7F0] px-4 py-2 rounded-full shadow-lg shadow-[#FF2D72]/10 flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-xs font-extrabold text-[#17151A]">
                45,000+ Matches This Week
              </span>
            </div>

            {/* Phone Hardware Mockup Frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[42px] sm:rounded-[46px] bg-[#17151A] p-3 sm:p-3.5 shadow-2xl shadow-purple-950/25 border-4 border-[#2b2735]">
              {/* Phone Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#17151A] rounded-full z-40 flex items-center justify-center">
                <div className="w-12 h-1 bg-[#373244] rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#373244] ml-2" />
              </div>

              {/* Phone Inner Screen Display */}
              <div className="w-full bg-[#FAFAFC] rounded-[34px] sm:rounded-[38px] overflow-hidden min-h-[500px] sm:min-h-[530px] flex flex-col relative border border-white/10 shadow-inner">
                {/* Mobile App Bar */}
                <div className="pt-7 px-5 pb-3 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FFE7F0] flex items-center justify-center text-[#FF2D72]">
                      <Heart className="w-4 h-4 fill-[#FF2D72]" />
                    </div>
                    <span className="font-black text-sm text-[#17151A] tracking-tight">
                      LoveConnect
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#FF2D72] bg-[#FFE7F0] px-2 py-0.5 rounded-full">
                    Step {steps[activeStep].id}/04
                  </span>
                </div>

                {/* Dynamic Screen Content Based on activeStep */}
                <div className="p-4 flex-1 flex flex-col justify-between relative">
                  {/* Step 1 Screen: Profile & Verification */}
                  {activeStep === 0 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                      {/* Photo Profile Card */}
                      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-pink-100 bg-white">
                        <div className="h-56 w-full relative">
                          <img
                            src={priyaProfileImg}
                            alt="Priya Profile Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Live Verification Badge */}
                          <div className="absolute top-3 left-3 bg-emerald-500/95 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verified Human ✓
                          </div>

                          {/* 96% Match Badge */}
                          <div className="absolute top-3 right-3 bg-white/95 text-[#FF2D72] text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 fill-[#FF2D72]" />
                            96% Match
                          </div>

                          {/* Profile Name & Details */}
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xl font-black">Priya Sharma, 25</h4>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                            </div>
                            <p className="text-xs text-pink-100/90 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" /> Designer & Photographer • 3 km away
                            </p>
                          </div>
                        </div>

                        {/* Personality Prompt Snippet */}
                        <div className="p-3 bg-white">
                          <p className="text-[10px] uppercase font-bold text-[#FF2D72] tracking-wider">
                            My simple pleasures...
                          </p>
                          <p className="text-xs text-[#17151A] font-medium mt-0.5 leading-snug">
                            "A hot cinnamon latte, film cameras, and spontaneous road trips into the hills ☕🌿"
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            <span className="text-[10px] bg-pink-50 text-[#FF2D72] font-semibold px-2 py-0.5 rounded-full">
                              #Photography
                            </span>
                            <span className="text-[10px] bg-purple-50 text-[#7C3AED] font-semibold px-2 py-0.5 rounded-full">
                              #ArtLover
                            </span>
                            <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
                              #CoffeeAddict
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Floating Verification Notification */}
                      <div className="mt-3 bg-white rounded-xl p-3 border border-emerald-100 shadow-md flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#17151A]">Selfie Verification Passed</p>
                          <p className="text-[11px] text-[#64748b]">Blue checkmark badge activated</p>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          100% Real
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step 2 Screen: Smart Discovery & Chemistry Match */}
                  {activeStep === 1 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                      {/* Compatibility Radar Card */}
                      <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-lg text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7C3AED] to-[#FF2D72]" />

                        <div className="relative mx-auto w-24 h-24 my-2 flex items-center justify-center">
                          {/* Pulsing Match Rings */}
                          <div className="absolute inset-0 rounded-full bg-purple-100/60 animate-ping duration-1000" />
                          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FF2D72] opacity-20" />
                          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FF2D72] flex flex-col items-center justify-center text-white shadow-xl shadow-purple-500/25">
                            <span className="text-xl font-black">98%</span>
                            <span className="text-[9px] font-bold uppercase tracking-wider">Chemistry</span>
                          </div>
                        </div>

                        <h4 className="font-extrabold text-[#17151A] text-sm mt-1">
                          Exceptional Mutual Compatibility
                        </h4>
                        <p className="text-[11px] text-[#64748b] mt-0.5">
                          High alignment on lifestyle, future goals & music
                        </p>

                        {/* Breakdown Bars */}
                        <div className="mt-3.5 space-y-2 text-left bg-[#FAFAFC] p-2.5 rounded-xl border border-gray-100">
                          <div>
                            <div className="flex justify-between text-[10px] font-bold text-[#17151A] mb-1">
                              <span>Core Values & Outlook</span>
                              <span className="text-[#7C3AED]">99%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#FF2D72] rounded-full w-[99%]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] font-bold text-[#17151A] mb-1">
                              <span>Lifestyle & Passions</span>
                              <span className="text-[#FF2D72]">97%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#FF2D72] to-amber-500 rounded-full w-[97%]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* "It's a Match!" Floating Celebration Card */}
                      <div className="mt-3 bg-gradient-to-r from-[#7C3AED] to-[#FF2D72] rounded-2xl p-3.5 text-white shadow-xl shadow-[#FF2D72]/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-3">
                            <img
                              src={priyaProfileImg}
                              alt="Match 1"
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            <div className="w-10 h-10 rounded-full bg-white text-[#FF2D72] flex items-center justify-center font-black text-sm border-2 border-white shadow-md">
                              You
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-black tracking-wide">It's a Match! 🎉</p>
                            <p className="text-[10px] text-pink-100">You both liked each other</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                          <Heart className="w-4 h-4 fill-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 Screen: Meaningful Conversations */}
                  {activeStep === 2 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                      {/* Active Chat Interface */}
                      <div className="bg-white rounded-2xl p-3 border border-pink-100 shadow-lg flex-1 flex flex-col justify-between">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <img
                                src={priyaProfileImg}
                                alt="Priya"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#17151A]">Priya Sharma</p>
                              <p className="text-[10px] text-emerald-600 font-semibold">Online now</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-pink-50 text-[#FF2D72] font-bold px-2 py-0.5 rounded-full">
                            Icebreaker
                          </span>
                        </div>

                        {/* Chat Messages Flow */}
                        <div className="space-y-2.5 my-3">
                          {/* Suggested Prompt Bubble */}
                          <div className="text-center">
                            <span className="text-[10px] bg-gray-100 text-[#64748b] px-3 py-1 rounded-full font-medium inline-block">
                              💡 Sparked by Priya's photo in Kyoto
                            </span>
                          </div>

                          {/* Message 1 (Incoming) */}
                          <div className="flex items-start gap-2 max-w-[85%]">
                            <div className="bg-gray-100 rounded-2xl rounded-tl-xs p-2.5 text-xs text-[#17151A] leading-relaxed">
                              I saw you love indie acoustic music too! 🎸 Have you heard the new Novo Amor track?
                            </div>
                          </div>

                          {/* Message 2 (Outgoing) */}
                          <div className="flex items-start justify-end gap-2 max-w-[85%] ml-auto">
                            <div className="bg-gradient-to-r from-[#FF2D72] to-[#ff4a86] rounded-2xl rounded-tr-xs p-2.5 text-xs text-white leading-relaxed shadow-sm">
                              YES! On repeat all morning! "Anchor" is perfection. We totally have the same playlist taste ✨
                            </div>
                          </div>

                          {/* Voice Note Snippet */}
                          <div className="flex items-start gap-2 max-w-[85%]">
                            <div className="bg-[#FFE7F0] border border-[#FF2D72]/20 rounded-2xl rounded-tl-xs p-2 flex items-center gap-2 w-48">
                              <button className="w-7 h-7 rounded-full bg-[#FF2D72] text-white flex items-center justify-center shrink-0">
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                              <div className="flex-1">
                                <div className="flex items-center gap-0.5 h-3">
                                  <span className="w-1 h-2 bg-[#FF2D72] rounded-full animate-pulse" />
                                  <span className="w-1 h-3 bg-[#FF2D72] rounded-full" />
                                  <span className="w-1 h-1.5 bg-[#FF2D72] rounded-full" />
                                  <span className="w-1 h-3.5 bg-[#FF2D72] rounded-full animate-pulse" />
                                  <span className="w-1 h-2 bg-[#FF2D72] rounded-full" />
                                  <span className="w-1 h-1 bg-[#FF2D72] rounded-full" />
                                </div>
                                <span className="text-[9px] text-[#FF2D72] font-bold">Voice Intro • 0:18</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Input Mockup */}
                        <div className="bg-[#FAFAFC] rounded-xl p-1.5 flex items-center gap-2 border border-gray-200">
                          <input
                            type="text"
                            disabled
                            placeholder="Type something genuine..."
                            className="text-xs bg-transparent px-2 flex-1 text-gray-500 outline-none"
                          />
                          <button className="w-7 h-7 rounded-lg bg-[#FF2D72] text-white flex items-center justify-center shadow-xs">
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Screen: Safe Real-Life Date */}
                  {activeStep === 3 && (
                    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                      {/* Date Confirmation Card */}
                      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-white">
                        <div className="h-44 w-full relative">
                          <img
                            src={heroCoupleRomanticImg}
                            alt="Happy Couple Date"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <CalendarHeart className="w-3.5 h-3.5" />
                            Date Confirmed!
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h4 className="text-lg font-black leading-tight">First Coffee Date ☕</h4>
                            <p className="text-xs text-emerald-200 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" /> Saturday • 6:30 PM
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 bg-white">
                          <div className="flex items-start gap-2.5 mb-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#17151A]">The Artisan Bakery & Cafe</p>
                              <p className="text-[11px] text-[#64748b]">14th Street Downtown • Verified Vetted Venue</p>
                            </div>
                          </div>

                          <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                            <p className="text-[11px] text-emerald-800 font-medium leading-tight">
                              <strong>LoveConnect Date Shield:</strong> Trusted emergency contact notified automatically.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Community Milestone Banner */}
                      <div className="mt-3 bg-white rounded-xl p-3 border border-pink-100 shadow-md flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-[#17151A]">94% Success Rate</p>
                          <p className="text-[11px] text-[#64748b]">Lead to memorable second dates</p>
                        </div>
                        <span className="text-xs font-bold text-[#FF2D72]">★★★★★</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Step Indicator Dots */}
                <div className="py-2.5 bg-white/95 border-t border-gray-100 flex items-center justify-center gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeStep === i
                          ? "w-6 bg-[#FF2D72]"
                          : "w-1.5 bg-gray-300 hover:bg-gray-400"
                        }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Bottom Left Badge */}
            <div className="absolute -bottom-4 left-2 sm:left-8 z-30 bg-white/95 backdrop-blur-md border border-[#FFE7F0] shadow-xl shadow-[#FF2D72]/15 rounded-2xl p-3 flex items-center gap-3 transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-white flex items-center justify-center shadow-md shadow-[#FF2D72]/20">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <p className="font-extrabold text-[#17151A] text-xs">
                  Zero Fake Profiles
                </p>
                <p className="text-[11px] text-[#64748b]">
                  AI & Human verified daily
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges / Highlights */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#17151A] text-sm">100% ID Verified</h4>
              <p className="text-xs text-[#64748b]">Authentic human guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#17151A] text-sm">Smart AI Compatibility</h4>
              <p className="text-xs text-[#64748b]">Personalized chemistry matching</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#17151A] text-sm">3.2x Faster Matches</h4>
              <p className="text-xs text-[#64748b]">Start talking within minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0">
              <CalendarHeart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#17151A] text-sm">Safe In-Person Dates</h4>
              <p className="text-xs text-[#64748b]">Curated romantic venues</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
