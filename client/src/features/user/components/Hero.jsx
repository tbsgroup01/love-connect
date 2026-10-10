import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Rocket,
  Lock,
  Globe,
  ArrowRight,
  Heart,
} from "lucide-react";
import heroBannerImg from "../../../assets/bannerr.jpeg";
import heroBannerWebp from "../../../assets/bannerr.webp";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getPublishedBanners } from "../../../services/bannersServices.js";
import { getImageUrl } from "../../../services/uploadServices.js";

export default function Hero() {
  const { isAuthenticated: isLoggedIn } = useAuth();
  const [banner, setBanner] = useState(() => {
    try {
      const cached = localStorage.getItem("active_hero_banner");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const fetchPublishedBanner = async () => {
      try {
        const res = await getPublishedBanners();
        const banners = res.data?.banners || [];
        if (banners.length > 0) {
          setBanner(banners[0]);
          try {
            localStorage.setItem("active_hero_banner", JSON.stringify(banners[0]));
          } catch {}
        }
      } catch (err) {
        console.error("Failed to fetch published banner for Hero section:", err);
      }
    };
    fetchPublishedBanner();
    const handleBannerUpdate = (e) => {
      if (e?.detail) {
        setBanner(e.detail);
      } else {
        fetchPublishedBanner();
      }
    };
    window.addEventListener("banner_updated", handleBannerUpdate);
    window.addEventListener("storage", fetchPublishedBanner);
    return () => {
      window.removeEventListener("banner_updated", handleBannerUpdate);
      window.removeEventListener("storage", fetchPublishedBanner);
    };
  }, []);

  const defaultBanner = heroBannerWebp || heroBannerImg;

  const desktopImgSrc = banner?.desktopImage
    ? getImageUrl(banner.desktopImage)
    : defaultBanner;

  const mobileImgSrc = banner?.mobileImage
    ? getImageUrl(banner.mobileImage)
    : desktopImgSrc;

  const getWebpVariant = (url) => {
    if (!url || typeof url !== "string") return null;
    if (url.endsWith(".webp")) return url;
    if (/\.(jpe?g|png)$/i.test(url)) {
      return url.replace(/\.(jpe?g|png)$/i, ".webp");
    }
    return null;
  };

  const renderHeadline = (text) => {
    const words = text.trim().split(" ");
    if (words.length <= 2) {
      return (
        <span className="bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] bg-clip-text text-transparent">
          {text}
        </span>
      );
    }
    const splitIndex = Math.ceil(words.length / 2);
    const firstPart = words.slice(0, splitIndex).join(" ");
    const secondPart = words.slice(splitIndex).join(" ");
    return (
      <>
        {firstPart} <br />
        <span className="bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] bg-clip-text text-transparent">
          {secondPart}
        </span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FAF9FC] via-[#FFF5F8] to-[#FCEBF3] font-poppins">
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_75%_20%,rgba(254,215,170,0.45)_0%,rgba(255,143,163,0.30)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -z-10 w-[600px] h-[600px] bg-[radial-gradient(circle_at_40%_40%,rgba(255,45,114,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(192,132,252,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-12 left-1/3 text-[#FF2D72]/20 animate-float-slow pointer-events-none">
        <Heart className="w-5 h-5 fill-[#FF2D72]/15" />
      </div>
      <div className="absolute bottom-32 left-10 text-[#FF2D72]/20 animate-float-reverse pointer-events-none">
        <Heart className="w-4 h-4 fill-[#FF2D72]/15" />
      </div>
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] overflow-hidden flex flex-col justify-end lg:hidden">
        <picture className="absolute inset-0 w-full h-full block">
          {getWebpVariant(mobileImgSrc) && (
            <source
              srcSet={getWebpVariant(mobileImgSrc)}
              type="image/webp"
            />
          )}
          <img
            src={mobileImgSrc}
            alt={banner?.headline ? `${banner.headline} - LoveConnect Dating App` : "Couple in romantic embrace - Find your perfect match on LoveConnect"}
            onError={(e) => {
              e.currentTarget.src = heroBannerWebp || heroBannerImg;
            }}
            width="600"
            height="800"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/85 via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="relative z-20 px-6 pb-8 pt-4 space-y-3.5 text-white">
          {banner?.tagline && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-pink-200 border border-white/25 shadow-xs">
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
              <span>{banner.tagline}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight drop-shadow-md text-white">
            {banner?.headline || "Find Your Perfect Match"}
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 line-clamp-3 leading-relaxed opacity-95">
            Discover verified singles in your city with our intelligent match compatibility engine.
          </p>

          <div className="pt-2">
            <Link
              to={isLoggedIn ? "/discover" : "/register"}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] hover:from-[#e61b61] hover:to-[#7c3aed] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#FF2D72]/35 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] transition-all"
            >
              <span>{isLoggedIn ? "Explore Matches" : (banner?.ctaLabel || "Get Started Free")}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>


        </div>
      </div>

      {/* 2. DESKTOP HERO BANNER (Visible on desktop >= lg) */}
      <div className="hidden lg:flex relative w-full min-h-[660px] xl:min-h-[700px] 2xl:min-h-[740px] flex-col justify-center">
        {/* LEFT COLUMN CONTENT: Aligned with standard Navbar container */}
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 xl:py-20 z-10 relative">
          <div className="lg:w-[48%] xl:w-[46%] flex flex-col justify-center space-y-7">
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-1.5 rounded-full bg-white/95 border border-[#FFE4EE] shadow-[0_2px_12px_rgba(255,45,114,0.08)]">
              <div className="flex items-center gap-1.5 text-[#FF2D72]">
                <Heart className="w-3.5 h-3.5 fill-[#FF2D72] text-[#FF2D72]" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">
                  {banner?.tagline || "Connect with real people!"}
                </span>
              </div>
            </div>

            {/* 2. Main Headline: Find Your Perfect Match */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-black text-[#18181B] tracking-tight leading-[1.06]">
                {banner?.headline && banner.headline !== "Find Your Perfect Match" ? (
                  renderHeadline(banner.headline)
                ) : (
                  <>
                    Find Your <br />
                    <span className="bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] bg-clip-text text-transparent">
                      Perfect Match
                    </span>
                  </>
                )}
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
                <span>{isLoggedIn ? "Explore Matches" : (banner?.ctaLabel || "Get Started Free")}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>


          </div>
        </div>

        {/* RIGHT VISUAL AREA (Full Bleed on 3 sides: Top 0, Right 0, Bottom 0) */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[58%] xl:w-[56%] 2xl:w-[55%] h-full overflow-hidden flex items-center justify-end select-none">
          {/* Signature Organic Pink-Purple Gradient Arch behind the couple */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-6 lg:left-2 w-[420px] sm:w-[480px] lg:w-[520px] h-[520px] sm:h-[580px] lg:h-[620px] rounded-t-full rounded-b-[180px] bg-gradient-to-tr from-[#7C3AED] via-[#E11D48] to-[#FF2D72] opacity-95 shadow-2xl shadow-[#FF2D72]/25 pointer-events-none transform -rotate-3" />

          {/* Secondary Soft Purple Bubble at bottom-left */}
          <div className="absolute bottom-0 left-0 sm:left-4 w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full bg-gradient-to-tr from-[#7C3AED]/75 via-[#9333EA]/55 to-[#C084FC]/35 blur-xs pointer-events-none" />

          {/* Couple Image Layer: Connected dynamically with DB banner (Desktop) */}
          <div className="relative z-10 w-full h-full flex items-center justify-end overflow-hidden">
            <picture className="w-full h-full block">
              {getWebpVariant(desktopImgSrc) && (
                <source
                  srcSet={getWebpVariant(desktopImgSrc)}
                  type="image/webp"
                />
              )}
              <img
                src={desktopImgSrc}
                alt={banner?.headline ? `${banner.headline} - Romantic Couple on LoveConnect Dating App` : "Couple in romantic embrace - Find your perfect match on LoveConnect"}
                onError={(e) => {
                  e.currentTarget.src = heroBannerWebp || heroBannerImg;
                }}
                width="1200"
                height="675"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover object-[center_center] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_8%,rgba(0,0,0,0.85)_22%,black_32%)] pointer-events-none transition-opacity duration-300"
              />
            </picture>

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
            <article className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(255,45,114,0.12)] hover:border-[#FF2D72]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF9FB] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE4EE] border border-[#FFE4EE] flex items-center justify-center text-[#FF2D72] group-hover:scale-110 group-hover:border-[#FF2D72]/30 group-hover:shadow-[0_8px_20px_rgba(255,45,114,0.2)] group-hover:from-[#FFE8F0] group-hover:to-[#FFD8E6] transition-all duration-300 shrink-0 shadow-xs">
                <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h3 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#FF2D72] transition-colors duration-200">
                  Verified Profiles
                </h3>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  100% Real & authentic people
                </p>
              </div>
            </article>

            {/* Feature 2: Smart Matching */}
            <article className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(139,92,246,0.12)] hover:border-[#8B5CF6]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#FAF7FF] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5EEFF] to-[#EDE4FF] border border-[#EDE4FF] flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 group-hover:border-[#8B5CF6]/30 group-hover:shadow-[0_8px_20px_rgba(139,92,246,0.2)] group-hover:from-[#EFE5FF] group-hover:to-[#E5D4FF] transition-all duration-300 shrink-0 shadow-xs">
                <Rocket className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h3 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#8B5CF6] transition-colors duration-200">
                  Smart Matching
                </h3>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  Find people with similar values
                </p>
              </div>
            </article>

            {/* Feature 3: Safe & Secure */}
            <article className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(34,197,94,0.12)] hover:border-[#22C55E]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#F5FDF7] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border border-[#DCFCE7] flex items-center justify-center text-[#16A34A] group-hover:scale-110 group-hover:border-[#22C55E]/30 group-hover:shadow-[0_8px_20px_rgba(22,163,74,0.2)] group-hover:from-[#E6F9EE] group-hover:to-[#D1F6DF] transition-all duration-300 shrink-0 shadow-xs">
                <Lock className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h3 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#16A34A] transition-colors duration-200">
                  Safe & Secure
                </h3>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  Your privacy is our highest priority
                </p>
              </div>
            </article>

            {/* Feature 4: Global Community */}
            <article className="bg-white rounded-2xl p-4 sm:p-5 border border-[#FFE8F0] shadow-xs hover:shadow-[0_16px_32px_rgba(139,92,246,0.12)] hover:border-[#8B5CF6]/40 hover:bg-gradient-to-b hover:from-white hover:to-[#FAF7FF] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5EEFF] to-[#EDE4FF] border border-[#EDE4FF] flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 group-hover:border-[#8B5CF6]/30 group-hover:shadow-[0_8px_20px_rgba(139,92,246,0.2)] group-hover:from-[#EFE5FF] group-hover:to-[#E5D4FF] transition-all duration-300 shrink-0 shadow-xs">
                <Globe className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <h3 className="font-bold text-[#18181B] text-sm sm:text-base leading-snug group-hover:text-[#8B5CF6] transition-colors duration-200">
                  Global Community
                </h3>
                <p className="text-xs text-[#71717A] font-medium mt-0.5">
                  Meet genuine people everywhere
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
