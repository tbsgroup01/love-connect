import React from "react"
import { Heart, ShieldCheck, SlidersHorizontal, Crown, Lock, Users } from "lucide-react"

export default function Features() {
  const featuresList = [
    {
      id: 1,
      title: "Smart Matching",
      description: "AI powered suggestions based on your interests",
      icon: Heart,
      iconBg: "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72]/20",
    },
    {
      id: 2,
      title: "Verified Profiles",
      description: "Real people, real authentic connections",
      icon: ShieldCheck,
      iconBg: "bg-emerald-50 text-[#22C55E] border-emerald-100",
    },
    {
      id: 3,
      title: "Great Filters",
      description: "Find exactly who you're looking for",
      icon: SlidersHorizontal,
      iconBg: "bg-purple-50 text-[#7C3AED] border-purple-100",
    },
    {
      id: 4,
      title: "Premium Features",
      description: "Unlock advanced features for better matches",
      icon: Crown,
      iconBg: "bg-amber-50 text-[#F59E0B] border-amber-100",
    },
    {
      id: 5,
      title: "Privacy & Security",
      description: "Your data is always private and protected",
      icon: Lock,
      iconBg: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      id: 6,
      title: "Active Community",
      description: "Millions of verified members worldwide",
      icon: Users,
      iconBg: "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72]/20",
    },
  ]

  return (
    <section id="features" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC]">
      {/* Background Soft Fluid Glow */}
      <div className="absolute top-1/2 right-0 -z-10 w-96 h-96 bg-gradient-to-l from-[#FFE7F0]/60 via-[#7C3AED]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-block mb-3.5">
            <span className="px-3.5 py-1 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-xs font-bold tracking-wider uppercase border border-[#FF2D72]/20">
              WHY CHOOSE LOVECONNECT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#17151A] tracking-tight leading-tight mb-3.5">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] bg-clip-text text-transparent">
              Meaningful Connections
            </span>
          </h2>
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed font-normal">
            We provide a safe, modern and enjoyable platform to help you meet real people and build genuine relationships.
          </p>
        </div>

        {/* 6 Feature Cards Grid (3 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuresList.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-[#FFE7F0] hover:border-[#FF2D72]/30 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
              >
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs ${item.iconBg}`}
                >
                  <IconComponent className="w-5.5 h-5.5" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17151A] mb-1 group-hover:text-[#FF2D72] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-[#64748b] text-xs sm:text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
