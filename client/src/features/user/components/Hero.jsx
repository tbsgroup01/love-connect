import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Users,
  ShieldCheck,
  Rocket,
  Lock,
  Globe,
  ArrowRight,
  Play,
  Heart,
} from "lucide-react";
import heroBannerImg from "../../../assets/bannerr.jpeg";
import priyaProfileImg from "../../../assets/priya_profile.jpg";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("loveconnect_admin_token");
      return Boolean(token);
    } catch (_) {
      return false;
    }
  });

  React.useEffect(() => {
    const handleAuthChange = () => {
      try {
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("loveconnect_admin_token");
        setIsLoggedIn(Boolean(token));
      } catch (_) {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("loveconnect_auth_change", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("loveconnect_auth_change", handleAuthChange);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FAF9FC] via-[#FFF5F8] to-[#FCEBF3] font-poppins">
      {/* Ambient Sunset Glows matching the reference design background color */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_75%_20%,rgba(254,215,170,0.45)_0%,rgba(255,143,163,0.30)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -z-10 w-[600px] h-[600px] bg-[radial-gradient(circle_at_40%_40%,rgba(255,45,114,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(192,132,252,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle Floating Hearts */}
      <div className="absolute top-12 left-1/3 text-[#FF2D72]/20 animate-float-slow pointer-events-none">
        <Heart className="w-5 h-5 fill-[#FF2D72]/15" />
      </div>
      <div className="absolute bottom-32 left-10 text-[#FF2D72]/20 animate-float-reverse pointer-events-none">
        <Heart className="w-4 h-4 fill-[#FF2D72]/15" />
      </div>

      {/* TOP HERO BANNER AREA (Full bleed on Top, Right, and Bottom) */}
      <div className="relative w-full min-h-[580px] lg:min-h-[660px] xl:min-h-[700px] 2xl:min-h-[740px] flex flex-col justify-center">
        {/* LEFT COLUMN CONTENT: Aligned with standard Navbar container */}
        <div className="max-w-[1600px] order-2 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 xl:py-20 z-10 relative">
          <div className="lg:w-[48%] xl:w-[46%] flex flex-col justify-center space-y-7">
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-1.5 rounded-full bg-white/95 border border-[#FFE4EE] shadow-[0_2px_12px_rgba(255,45,114,0.08)]">
              <div className="flex items-center gap-1.5 text-[#FF2D72]">
                <Heart className="w-3.5 h-3.5 fill-[#FF2D72] text-[#FF2D72]" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">
                  Connect with real people!
                </span>
              </div>
            </div>

            {/* 2. Main Headline: Find Your Perfect Match */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-black text-[#18181B] tracking-tight leading-[1.06]">
                Find Your <br />
                <span className="bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] bg-clip-text text-transparent">
                  Perfect Match
                </span>
              </h1>
              <p className="text-[#52525B] text-base sm:text-lg tracking-wide font-normal max-w-lg leading-relaxed pt-1">
                LoveConnect brings together like-minded people who believe in
                real connections. Meet, chat and build something meaningful –
                because you deserve it.
              </p>
            </div>

            {/* 3. CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <Link
                to={isLoggedIn ? "/discover" : "/register"}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] hover:from-[#e61b61] hover:to-[#7c3aed] text-white font-bold text-sm sm:text-base shadow-[0_12px_28px_rgba(255,45,114,0.3)] hover:shadow-[0_16px_36px_rgba(255,45,114,0.42)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>{isLoggedIn ? "Explore Matches" : "Get Started Free"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 4. Stats Strip with Icons */}
            <div className="pt-6 border-t border-[#FFE4EE]/80 flex flex-wrap items-center gap-6 sm:gap-10">
              {/* Stat 1: 1M+ Happy Members */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#FF2D72]">
                  <Users className="w-5 h-5 fill-[#FF2D72]/20 text-[#FF2D72]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#18181B] tracking-tight leading-tight">
                    1M+
                  </h3>
                  <p className="text-xs text-[#71717A] font-medium">
                    Happy Members
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-8 w-[1px] bg-[#FFE4EE]" />

              {/* Stat 2: 500K+ Real Matches */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5EEFF] flex items-center justify-center text-[#8B5CF6]">
                  <Heart className="w-4.5 h-4.5 fill-[#8B5CF6] text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#18181B] tracking-tight leading-tight">
                    500K+
                  </h3>
                  <p className="text-xs text-[#71717A] font-medium">
                    Real Matches
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-8 w-[1px] bg-[#FFE4EE]" />

              {/* Stat 3: 4.8 App Rating */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#FF2D72]">
                  <Star className="w-5 h-5 fill-[#FF2D72] text-[#FF2D72]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#18181B] tracking-tight leading-tight">
                    4.8
                  </h3>
                  <p className="text-xs text-[#71717A] font-medium">
                    App Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL AREA (Full Bleed on 3 sides: Top 0, Right 0, Bottom 0) */}
        <div className="relative order-1 lg:absolute lg:top-0 lg:right-0 lg:bottom-0 w-full lg:w-[58%] xl:w-[56%] 2xl:w-[55%] h-[480px] sm:h-[560px] lg:h-full overflow-hidden flex items-center justify-end select-none">
          {/* Signature Organic Pink-Purple Gradient Arch behind the couple */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-6 lg:left-2 w-[420px] sm:w-[480px] lg:w-[520px] h-[520px] sm:h-[580px] lg:h-[620px] rounded-t-full rounded-b-[180px] bg-gradient-to-tr from-[#7C3AED] via-[#E11D48] to-[#FF2D72] opacity-95 shadow-2xl shadow-[#FF2D72]/25 pointer-events-none transform -rotate-3" />

          {/* Secondary Soft Purple Bubble at bottom-left */}
          <div className="absolute bottom-0 left-0 sm:left-4 w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full bg-gradient-to-tr from-[#7C3AED]/75 via-[#9333EA]/55 to-[#C084FC]/35 blur-xs pointer-events-none" />

          {/* Couple Image Layer: 100% Solid & Genuine using bannerr.jpeg */}
          <div className="relative z-10 w-full h-full flex items-center justify-end overflow-hidden">
            <img
              src={heroBannerImg}
              alt="Find Your Perfect Match - Couple in romantic embrace"
              className="w-full h-full object-cover object-[center_center] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_8%,rgba(0,0,0,0.85)_22%,black_32%)] pointer-events-none"
            />

            {/* 1. Left Se Shadow: Gentle inner shadow & transition from hero background */}
            <div className="absolute inset-y-0 left-0 w-36 sm:w-56 lg:w-72 z-15 pointer-events-none bg-gradient-to-r from-[#FAF9FC] via-[#FAF9FC]/90 via-[#F5E6ED]/40 via-[rgba(24,20,32,0.05)] to-transparent" />

            {/* 2. Halka Sa Blur: Softens the leftmost mountain/sky transition edge */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-36 lg:w-48 z-14 pointer-events-none backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black_0%,transparent_100%)]" />

            {/* 3. Right Mein Thoda Light: Soft radiant sunlight overlay on the right */}
            <div className="absolute inset-y-0 right-0 w-1/2 z-15 pointer-events-none bg-gradient-to-l from-white/30 via-white/10 to-transparent" />
          </div>

          {/* FLOATING CARD 1: Top-Right "Match Found! 98% Compatibility" */}
          <div className="absolute top-6 sm:top-8 right-6 sm:right-10 lg:right-14 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_32px_rgba(255,77,133,0.14)] border border-white/90 flex items-center gap-3 min-w-[210px] sm:min-w-[230px] animate-float-slow hover:scale-105 hover:shadow-[0_18px_38px_rgba(255,77,133,0.22)] transition-all duration-300 cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#FF4382] flex items-center justify-center text-white shadow-md shadow-[#FF2D72]/25 shrink-0">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#18181B] text-xs sm:text-sm">
                  Match Found!
                </span>
                <span className="text-[#FF2D72] text-xs font-bold">✦</span>
              </div>
              <p className="text-[11px] text-[#71717A] font-medium mt-0.5">
                98% Compatibility
              </p>
              <div className="w-full h-1.5 bg-[#FFF0F5] rounded-full mt-1.5 overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] rounded-full" />
              </div>
            </div>
          </div>

          {/* SCRIPT TEXT: Middle-Right "Real People Real Stories Real Love ♡" */}
          <div className="absolute top-[50%] -translate-y-1/2 right-6 sm:right-10 lg:right-14 z-20 text-right select-none font-['Caveat',cursive] leading-[1.18] pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            <p className="text-white text-2xl sm:text-3xl font-bold tracking-wide -rotate-2 drop-shadow-md">
              Real People
            </p>
            <p className="text-white/95 text-2xl sm:text-3xl font-bold tracking-wide -rotate-1 mt-0.5 drop-shadow-md">
              Real Stories
            </p>
            <div className="inline-flex items-center gap-1.5 text-[#FF2D72] text-3xl sm:text-4xl font-black -rotate-3 mt-1 drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]">
              <span>Real Love</span>
              <span className="text-2xl">♡</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM 4 FEATURE CARDS STRIP (Flush with bottom of Hero banner) */}
      <div className="border-t border-[#FFE4EE] bg-white/85 backdrop-blur-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Feature 1: Verified Profiles */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(255,45,114,0.12)] hover:border-[#FF2D72]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF9FB] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE4EE] border border-[#FFE4EE] flex items-center justify-center text-[#FF2D72] group-hover:scale-110 group-hover:border-[#FF2D72]/30 group-hover:shadow-[0_8px_20px_rgba(255,45,114,0.2)] group-hover:from-[#FFE8F0] group-hover:to-[#FFD8E6] transition-all duration-300 shrink-0 shadow-xs">
                <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h4 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#FF2D72] transition-colors duration-200">
                  Verified Profiles
                </h4>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  100% Real & authentic people
                </p>
              </div>
            </div>

            {/* Feature 2: Smart Matching */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(139,92,246,0.12)] hover:border-[#8B5CF6]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#FAF7FF] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5EEFF] to-[#EDE4FF] border border-[#EDE4FF] flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 group-hover:border-[#8B5CF6]/30 group-hover:shadow-[0_8px_20px_rgba(139,92,246,0.2)] group-hover:from-[#EFE5FF] group-hover:to-[#E5D4FF] transition-all duration-300 shrink-0 shadow-xs">
                <Rocket className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h4 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#8B5CF6] transition-colors duration-200">
                  Smart Matching
                </h4>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  Find people with similar values
                </p>
              </div>
            </div>

            {/* Feature 3: Safe & Secure */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(34,197,94,0.12)] hover:border-[#22C55E]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#F5FDF7] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border border-[#DCFCE7] flex items-center justify-center text-[#16A34A] group-hover:scale-110 group-hover:border-[#22C55E]/30 group-hover:shadow-[0_8px_20px_rgba(22,163,74,0.2)] group-hover:from-[#E6F9EE] group-hover:to-[#D1F6DF] transition-all duration-300 shrink-0 shadow-xs">
                <Lock className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h4 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#16A34A] transition-colors duration-200">
                  Safe & Secure
                </h4>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  Your privacy is our highest priority
                </p>
              </div>
            </div>

            {/* Feature 4: Global Community */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(139,92,246,0.12)] hover:border-[#8B5CF6]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#FAF7FF] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5EEFF] to-[#EDE4FF] border border-[#EDE4FF] flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 group-hover:border-[#8B5CF6]/30 group-hover:shadow-[0_8px_20px_rgba(139,92,246,0.2)] group-hover:from-[#EFE5FF] group-hover:to-[#E5D4FF] transition-all duration-300 shrink-0 shadow-xs">
                <Globe className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h4 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#8B5CF6] transition-colors duration-200">
                  Global Community
                </h4>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  Meet genuine people everywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
