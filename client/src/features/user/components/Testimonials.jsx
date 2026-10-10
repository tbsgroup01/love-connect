import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Priya & Arjun",
      location: "Mumbai, India",
      tag: "Married ",
      quote:
        "We matched 2 years ago and tied the knot last month in Udaipur! LoveConnect's interest-based matching connected us over indie music and weekend trekking.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      matchedDate: "Matched 2 yrs ago",
    },
    {
      id: 2,
      name: "Rahul & Sneha",
      location: "Delhi, India",
      tag: "Engaged  ",
      quote:
        "The verified profiles gave me complete peace of mind. On our very first coffee date in CP, we ended up talking for four hours straight. Getting married this winter!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      matchedDate: "Matched 1.5 yrs ago",
    },
    {
      id: 3,
      name: "Ananya & Kabir",
      location: "Bangalore, India",
      tag: "Together 2 Yrs ",
      quote:
        "Both being introverted techies in Bengaluru, loud social scenes weren't for us. LoveConnect paired us through shared passions, and we instantly connected.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      matchedDate: "Matched 2 yrs ago",
    },
    {
      id: 4,
      name: "Vikram & Pooja",
      location: "Pune, India",
      tag: "Soulmates ",
      quote:
        "I was skeptical of dating apps until I tried LoveConnect. The AI algorithm is remarkably accurate—we share the exact same core values and life ambitions.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      matchedDate: "Matched 1 yr ago",
    },
    {
      id: 5,
      name: "Rohan & Meera",
      location: "Hyderabad, India",
      tag: "In Love ",
      quote:
        "The smart prompts and video calling made getting to know each other so natural and respectful before our first date. Couldn't be happier!",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      matchedDate: "Matched 8 mos ago",
    },
    {
      id: 6,
      name: "Tanvi & Siddharth",
      location: "Jaipur, India",
      tag: "Engaged ",
      quote:
        "From endless late-night chats to planning our wedding together! LoveConnect made finding someone who truly understands and cherishes you effortless.",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      matchedDate: "Matched 1 yr ago",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  // Pick 3 testimonials starting from currentIndex, wrapping around seamlessly
  const visibleTestimonials = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] font-poppins"
    >
      {/* Background Soft Fluid Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[650px] h-[650px] bg-gradient-to-tr from-[#FFE7F0]/60 via-[#7C3AED]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-xs font-bold tracking-wider uppercase mb-3.5 border border-[#FF2D72]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SUCCESS STORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#17151A] tracking-tight leading-tight mb-3.5">
            What Our Members{" "}
            <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed font-normal">
            Real stories from verified couples who discovered love,
            companionship, and lifelong happiness on LoveConnect.
          </p>
        </div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative px-0 sm:px-8 lg:px-14">
          {/* Side Arrow: Previous */}
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonials"
            className="absolute left-0 lg:-left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#FFE7F0] bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#17151A] hover:text-[#FF2D72] hover:border-[#FF2D72]/40 hover:bg-[#FFE7F0]/40 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Side Arrow: Next */}
          <button
            onClick={handleNext}
            aria-label="Next Testimonials"
            className="absolute right-0 lg:-right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#FFE7F0] bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#17151A] hover:text-[#FF2D72] hover:border-[#FF2D72]/40 hover:bg-[#FFE7F0]/40 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 3 Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {visibleTestimonials.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className="relative bg-gradient-to-b from-white via-white to-[#FFE7F0]/25 rounded-3xl p-7 sm:p-8 border border-[#FFE7F0] shadow-[0_4px_24px_rgba(255,45,114,0.06)] hover:shadow-[0_16px_40px_rgba(255,45,114,0.12)] hover:border-[#FF2D72]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Decorative Subtle Quote Mark Background */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#FF2D72]/15 group-hover:text-[#FF2D72]/25 group-hover:scale-110 transition-all duration-300 pointer-events-none" />

                <div>
                  {/* User Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                      {/* Glowing Avatar */}
                      <div className="relative shrink-0">
                        <div className="w-13 h-13 rounded-full p-[2px] bg-gradient-to-tr from-[#FF2D72] via-[#ff4382] to-[#7C3AED] shadow-xs">
                          <img
                            src={item.avatar}
                            alt={`${item.name} from ${item.location} - LoveConnect Success Story`}
                            loading="lazy"
                            decoding="async"
                            width="52"
                            height="52"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-[#17151A] text-base sm:text-lg leading-tight group-hover:text-[#FF2D72] transition-colors duration-200">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-xs text-[#767393] font-medium mt-0.5">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quote Content */}
                  <blockquote className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal italic relative z-10 mb-6">
                    "{item.quote}"
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination Dots at Bottom Center */}
        <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-gradient-to-r from-[#FF2D72] to-[#7C3AED]"
                  : "w-2.5 bg-slate-200 hover:bg-[#FFE7F0]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
