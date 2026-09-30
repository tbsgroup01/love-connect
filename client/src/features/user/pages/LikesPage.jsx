import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Lock, Crown, Sparkles, Heart } from "lucide-react";

import priyaImg from "../../../assets/priya_profile.jpg";
import meeraImg from "../../../assets/signup_hero_woman.jpg";
import rheaImg from "../../../assets/hero_woman_exact.png";
import snehaImg from "../../../assets/hero_woman.jpg";

export default function LikesPage() {
  const admirers = [
    {
      name: "Priya",
      img: priyaImg,
    },
    {
      name: "Meera",
      img: meeraImg,
    },
    {
      name: "Rhea",
      img: rheaImg,
    },
    {
      name: "Sneha",
      img: snehaImg,
    },
    {
      name: "Kritika",
      img: rheaImg,
    },
    {
      name: "Neha",
      img: meeraImg,
    },
    {
      name: "Pooja",
      img: priyaImg,
    },
    {
      name: "Ananya",
      img: snehaImg,
    },
  ];

  return (
    <DashboardLayout activeTab="likes">
      <div className="w-full space-y-5 animate-fadeIn">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-xs">
              <span className="text-xl">❤️</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#17151A] tracking-tight">
                Likes You (24)
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                People who swiped right on your profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-[#F59E0B] text-xs font-bold border border-amber-200 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 fill-[#F59E0B]" />
              <span>Gold Feature</span>
            </span>
          </div>
        </div>

        {/* Unlock Banner Callout */}
        <div className="bg-gradient-to-r from-[#FFF0F5] via-white to-[#F4F0FF] p-4 sm:p-5 rounded-2xl border border-[#FFD0E0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FF2D72] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Crown className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#17151A]">
                See who likes you instantly!
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Upgrade to LoveConnect Gold to unblur all 24 profile photos and
                match instantly.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert("Redirecting to Premium Upgrade")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] font-black text-xs shadow-xs hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Unlock All 24 Admirers</span>
          </button>
        </div>

        {/* Full-width 4-Column Grid of Secret Admirers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {admirers.map((admirer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs group hover:border-[#FF2D72]/40 transition-all flex flex-col"
            >
              {/* Photo Canvas */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={admirer.img}
                  alt={admirer.name}
                  className="w-full h-full object-cover filter blur-sm hover:blur-none hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/25 flex flex-col justify-between p-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                      <Lock className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>

                  {/* Bottom Text */}
                  <div>
                    <h4 className="font-black text-base text-white drop-shadow-md">
                      {admirer.name}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Match Action */}
              <div className="p-3 bg-white border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    alert(`Unlocking profile of ${admirer.name}...`)
                  }
                  className="w-full py-2 rounded-xl bg-[#FFE7F0] hover:bg-[#FF2D72] text-[#FF2D72] hover:text-white font-extrabold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
