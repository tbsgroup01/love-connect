import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import heroCoupleRomanticImg from "../../../assets/hero_couple_romantic.jpg";
import priyaProfileImg from "../../../assets/priya_profile.jpg";

export default function CTA() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] relative overflow-hidden font-poppins">
      <div className="max-w-[1600px] mx-auto">
        {/* Main CTA Dark Card */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-[#17151A] via-[#241738] to-[#120D1F] px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14 shadow-2xl shadow-purple-950/30">
          {/* Ambient Decorative Fluid Glows */}
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-[#FF2D72]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-[350px] h-[350px] bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Subtle Ambient Hearts */}
          <div className="absolute bottom-5 left-1/3 text-[#FF2D72]/40 pointer-events-none">
            <Heart className="w-5 h-5 fill-[#FF2D72]/40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Column: Heading, Subtitle & Action Buttons */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xs">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#FFE7F0]">
                  JOIN OUR COMMUNITY
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.15]">
                Start Your Love Story Today
              </h2>

              {/* Sub-description Paragraph */}
              <p className="text-pink-100/80 text-sm sm:text-base font-normal leading-relaxed max-w-lg">
                Millions of people are already finding real connections. What
                are you waiting for?
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#ff4a86] hover:from-[#e61b61] hover:to-[#ff3377] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#FF2D72]/30 hover:shadow-[#FF2D72]/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer group">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Right Column: Romantic Couple Pill Visual with Floating "1M+ Happy Members" */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative mt-4 lg:mt-0">
              <div className="relative flex items-center justify-center">
                {/* Handwritten Floating Quote */}
                <div className="absolute -top-6 right-6 text-[#FFE7F0]/90 font-serif italic text-base sm:text-lg pointer-events-none drop-shadow-md">
                  Love Happens Here ♡
                </div>

                {/* Romantic Couple Photo in Soft Oval/Pill Frame */}
                <div className="relative z-10 w-[260px] sm:w-[320px] h-[200px] sm:h-[230px] rounded-[36px] overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/40">
                  <img
                    src={heroCoupleRomanticImg}
                    alt="Romantic Couple"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
