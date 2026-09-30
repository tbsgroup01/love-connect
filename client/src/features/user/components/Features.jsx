import React, { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import priyaProfileImg from "../../../assets/priya_profile.jpg";

export default function Features() {
  const [likedProfiles, setLikedProfiles] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);

  const profiles = [
    {
      id: 1,
      name: "Priya",
      age: 25,
      location: "Noida, India",
      image: priyaProfileImg,
      online: true,
    },
    {
      id: 2,
      name: "Karan",
      age: 27,
      location: "Bangalore, India",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      online: true,
    },
    {
      id: 3,
      name: "Sneha",
      age: 26,
      location: "Delhi, India",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      online: true,
    },
    {
      id: 4,
      name: "Rahul",
      age: 29,
      location: "Pune, India",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      online: true,
    },
    {
      id: 5,
      name: "Neha",
      age: 24,
      location: "Mumbai, India",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      online: true,
    },
  ];

  const toggleLike = (id) => {
    setLikedProfiles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] font-poppins"
    >
      {/* Background Soft Fluid Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 w-96 h-96 bg-[#FFE7F0]/60 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 -z-10 w-96 h-96 bg-purple-100/40 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-block mb-3">
            <span className="px-4 py-1.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[11px] font-black tracking-wider uppercase border border-[#FF2D72]/20 shadow-xs">
              MEET AMAZING PEOPLE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#17151A] tracking-tight leading-tight mb-3">
            Genuine Profiles,{" "}
            <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] bg-clip-text text-transparent">
              Real People
            </span>
          </h2>
          <p className="text-[#64748b] text-sm sm:text-base leading-relaxed font-normal">
            Discover verified profiles from people near you and around the
            world.
          </p>
        </div>

        {/* Profiles Row with Left and Right Navigation Buttons */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : 0))}
            aria-label="Previous profiles"
            className="hidden md:flex absolute -left-4 lg:-left-6 z-20 w-10 h-10 rounded-full bg-white border border-gray-200/90 shadow-md items-center justify-center text-gray-700 hover:text-[#FF2D72] hover:border-[#FF2D72]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Cards Grid / Carousel */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-4.5">
            {profiles.map((profile) => {
              const isLiked = likedProfiles[profile.id];

              return (
                <div
                  key={profile.id}
                  className="bg-white rounded-3xl p-3 border border-[#FFE7F0] hover:border-[#FF2D72]/40 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full bg-slate-100 mb-3">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for subtle contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Bottom: Name, Age, Location & Like Heart Button */}
                  <div className="flex items-center justify-between px-1 pb-1">
                    <div>
                      <h3 className="font-bold text-[#17151A] text-sm sm:text-base leading-tight">
                        {profile.name}, {profile.age}
                      </h3>
                      <p className="text-[11px] text-[#64748b] mt-0.5 font-medium">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => setActiveSlide((prev) => (prev < 3 ? prev + 1 : 0))}
            aria-label="Next profiles"
            className="hidden md:flex absolute -right-4 lg:-right-6 z-20 w-10 h-10 rounded-full bg-white border border-gray-200/90 shadow-md items-center justify-center text-gray-700 hover:text-[#FF2D72] hover:border-[#FF2D72]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8 sm:mt-10">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveSlide(dot)}
              aria-label={`Go to slide ${dot + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === dot
                  ? "w-6 h-1.5 bg-[#FF2D72]"
                  : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
