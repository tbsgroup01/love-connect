import React from "react";
import { User, SlidersHorizontal, Search, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Create Profile",
      description: "Sign up and set up your profile in minutes.",
      theme: "pink",
      icon: <User className="w-8 h-8 text-[#FF2D72] fill-[#FF2D72]" />,
      cardBorder:
        "border-pink-200/90 shadow-[0_10px_25px_rgba(255,45,114,0.06)] hover:shadow-[0_15px_35px_rgba(255,45,114,0.12)]",
      circleBg: "bg-[#FFE7F0]",
      pillBg: "bg-[#FFF0F5] border-pink-200 text-[#FF2D72]",
    },
    {
      id: "02",
      title: "Set Preferences",
      description: "Choose what you're looking for.",
      theme: "purple",
      icon: (
        <SlidersHorizontal className="w-8 h-8 text-[#7C3AED] stroke-[2.2]" />
      ),
      cardBorder:
        "border-purple-200/90 shadow-[0_10px_25px_rgba(124,58,237,0.06)] hover:shadow-[0_15px_35px_rgba(124,58,237,0.12)]",
      circleBg: "bg-[#EDE9FE]",
      pillBg: "bg-[#FAF5FF] border-purple-200 text-[#7C3AED]",
    },
    {
      id: "03",
      title: "Explore & Connect",
      description: "Discover people and start conversations.",
      theme: "pink",
      icon: <Search className="w-8 h-8 text-[#FF2D72] stroke-[2.75]" />,
      cardBorder:
        "border-pink-200/90 shadow-[0_10px_25px_rgba(255,45,114,0.06)] hover:shadow-[0_15px_35px_rgba(255,45,114,0.12)]",
      circleBg: "bg-[#FFE7F0]",
      pillBg: "bg-[#FFF0F5] border-pink-200 text-[#FF2D72]",
    },
    {
      id: "04",
      title: "Build Relationships",
      description: "Make new friends or find your perfect match.",
      theme: "purple",
      icon: <Heart className="w-8 h-8 text-[#7C3AED] fill-[#7C3AED]" />,
      cardBorder:
        "border-purple-200/90 shadow-[0_10px_25px_rgba(124,58,237,0.06)] hover:shadow-[0_15px_35px_rgba(124,58,237,0.12)]",
      circleBg: "bg-[#EDE9FE]",
      pillBg: "bg-[#FAF5FF] border-purple-200 text-[#7C3AED]",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden font-poppins"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0F5] border border-pink-100 text-[#FF2D72] text-[11px] font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Heart className="w-3 h-3 fill-[#FF2D72] text-[#FF2D72]" />
            <span>HOW IT WORKS</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#17151A] tracking-tight leading-tight mb-3">
            Your Journey to{" "}
            <span className="block sm:inline bg-gradient-to-r from-[#FF2D72] via-[#E1146B] to-[#7C3AED] bg-clip-text text-transparent">
              Real Connections
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Getting started is quick and easy. Follow these simple steps and
            start meeting amazing people.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-5 xl:gap-6 relative items-stretch">
          {steps.map((step, index) => {
            return (
              <div key={step.id} className="relative flex flex-col">
                {/* Curved Arrow Connector (Desktop only, between cards) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 xl:-right-5 top-[38%] -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                    <svg
                      width="36"
                      height="20"
                      viewBox="0 0 36 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 xl:w-8 h-auto overflow-visible"
                    >
                      <path
                        d="M 2 15 C 10 3, 24 3, 33 11"
                        stroke="#C084FC"
                        strokeWidth="1.5"
                        strokeDasharray="3.5 3.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 27 7.5 L 34 11.5 L 28 15.5"
                        stroke="#C084FC"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}

                {/* Individual Card */}
                <div
                  className={`flex-1 bg-white rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center border transition-all duration-300 hover:-translate-y-1 relative z-10 ${step.cardBorder}`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105 ${step.circleBg}`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Number Badge */}
                  <div
                    className={`px-3 py-0.5 rounded-full border text-[11px] font-bold mb-4 tracking-wide shadow-xs ${step.pillBg}`}
                  >
                    {step.id}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-[#17151A] mb-2 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
