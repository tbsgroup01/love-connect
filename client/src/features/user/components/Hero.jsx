import React from "react"
import { Star, ShieldCheck, Rocket, Lock, Globe, ArrowRight, Play, Heart } from "lucide-react"
import heroCoupleImg from "../../../assets/hero_couple.jpg"
import priyaProfileImg from "../../../assets/priya_profile.jpg"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFC] pt-8 pb-14 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative Soft Fluid Glows */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-gradient-to-br from-[#FFE7F0]/70 via-[#7C3AED]/10 to-transparent blur-3xl rounded-full pointer-events-none transform translate-x-1/4 -translate-y-10" />
      <div className="absolute top-1/3 left-0 -z-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFE7F0]/50 via-[#FF2D72]/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Floating Soft Hearts */}
      <div className="absolute top-8 right-[46%] text-[#FF2D72]/40 animate-pulse pointer-events-none">
        <Heart className="w-6 h-6 fill-[#FF2D72]/30" />
      </div>
      <div className="absolute top-24 right-8 text-[#FF2D72]/30 animate-bounce pointer-events-none duration-1000">
        <Heart className="w-5 h-5 fill-[#FF2D72]/20" />
      </div>
      <div className="absolute bottom-28 left-8 text-[#FF2D72]/30 pointer-events-none">
        <Heart className="w-4 h-4 fill-[#FF2D72]/20" />
      </div>

      <div className="max-w-[1600px] mx-auto">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[500px]">

          {/* Left Column: Heading, Subtitle, CTA buttons, Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-7 z-10">

            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#FFE7F0] border border-[#FF2D72]/20 shadow-xs">
              <span className="text-xs font-bold text-[#FF2D72] tracking-wide">
                1M+ People Already Connected!
              </span>
            </div>

            {/* Title Section */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#17151A] tracking-tight leading-[1.12]">
                Real People. <br />
                Real{" "}
                <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] bg-clip-text text-transparent">
                  Connections.
                </span>
              </h1>
              <p className="text-[#64748b] text-base sm:text-lg font-normal max-w-lg leading-relaxed pt-1">
                Join LoveConnect and find people who share your interests, values and dreams. Build meaningful relationships in a safe and trustworthy community.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              <button className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#ff4a86] hover:from-[#e61b61] hover:to-[#ff3377] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#FF2D72]/25 hover:shadow-[#FF2D72]/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer">
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

            </div>

            {/* Key Statistics */}
            <div className="pt-6 border-t border-[#FFE7F0] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                  1M+
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#767393] mt-0.5">
                  Happy Members
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                  500K+
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#767393] mt-0.5">
                  Real Matches
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                    4.8
                  </span>
                  <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#767393] mt-0.5">
                  App Rating
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Romantic Couple Aura Graphic */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            {/* Soft Organic Aura Backdrop Circle */}
            <div className="relative w-[340px] sm:w-[440px] lg:w-[480px] h-[340px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">

              {/* Vibrant Pink-Purple Gradient Egg / Circle Background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF2D72] via-[#ff528f] to-[#7C3AED] opacity-90 shadow-2xl shadow-[#FF2D72]/30 transform -rotate-3 overflow-hidden">
                <div className="absolute top-6 right-10 text-white/90 font-serif italic text-base sm:text-lg drop-shadow-md">
                  Find Your Person ♡
                </div>
              </div>

              {/* Couple Image with rounded circle mask */}
              <div className="relative z-10 w-[92%] h-[92%] rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={heroCoupleImg}
                  alt="Happy Couple - Find Your Person"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating "Real People Real Stories" Badge (Bottom-Right) */}
              <div className="absolute -bottom-2 right-2 sm:right-6 bg-white/95 backdrop-blur-md border border-[#FFE7F0] shadow-xl shadow-[#FF2D72]/15 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 z-20 animate-fade-in hover:-translate-y-1 transition-all duration-300">
                <div className="flex -space-x-2">
                  <img src={priyaProfileImg} alt="User" className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs" />
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="User" className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="User" className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#17151A] text-xs sm:text-sm leading-snug">
                    Real People
                  </h4>
                  <p className="text-[11px] text-[#767393] font-medium">
                    Real Stories
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#FFE7F0] flex items-center justify-center text-[#FF2D72] ml-1">
                  <Heart className="w-4 h-4 fill-[#FF2D72]" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom 4 Feature Cards Strip (Matching Image 1) */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-[#FFE7F0]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-[#FFE7F0] shadow-xs hover:shadow-md hover:border-[#FF2D72]/30 transition-all duration-300 flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-[#FFE7F0] border border-[#FF2D72]/20 flex items-center justify-center text-[#FF2D72] group-hover:scale-110 group-hover:bg-[#FF2D72] group-hover:text-white transition-all duration-300 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#17151A] text-sm sm:text-base leading-snug">
                  Verified Profiles
                </h4>
                <p className="text-xs text-[#767393] font-medium mt-0.5">
                  Real & authentic people
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-[#FFE7F0] shadow-xs hover:shadow-md hover:border-[#7C3AED]/30 transition-all duration-300 flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300 shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#17151A] text-sm sm:text-base leading-snug">
                  Smart Matching
                </h4>
                <p className="text-xs text-[#767393] font-medium mt-0.5">
                  Find people with similar interests
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-[#FFE7F0] shadow-xs hover:shadow-md hover:border-[#22C55E]/30 transition-all duration-300 flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#22C55E] group-hover:scale-110 group-hover:bg-[#22C55E] group-hover:text-white transition-all duration-300 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#17151A] text-sm sm:text-base leading-snug">
                  Safe & Secure
                </h4>
                <p className="text-xs text-[#767393] font-medium mt-0.5">
                  Your privacy is our priority
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-[#FFE7F0] shadow-xs hover:shadow-md hover:border-[#7C3AED]/30 transition-all duration-300 flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300 shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#17151A] text-sm sm:text-base leading-snug">
                  Global Community
                </h4>
                <p className="text-xs text-[#767393] font-medium mt-0.5">
                  Meet people around the world
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
