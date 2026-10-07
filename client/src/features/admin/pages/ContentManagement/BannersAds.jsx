import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  UploadCloud,
  Monitor,
  Smartphone,
  Save,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Eye,
  Link as LinkIcon,
  ArrowRight,
  Heart,
  Camera,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";

// Default assets
import defaultWebBanner from "../../../../assets/bannerr.jpeg";
import defaultMobileBanner from "../../../../assets/hero_couple_romantic.jpg";

const COLORS = {
  pink: "#FF2D72",
  lightPink: "#FFE7F0",
  purple: "#7C3AED",
  dark: "#17151A",
  white: "#FFFFFF",
  background: "#FAFAFC",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  blue: "#3B82F6",
};

export default function BannersAds() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Banners & Ads");
  const [platformFilter, setPlatformFilter] = useState("web"); // 'web' | 'mobile'
  const [saveSuccess, setSaveSuccess] = useState(false);

  // File Input Refs
  const webFileInputRef = useRef(null);
  const mobileFileInputRef = useRef(null);

  // Drag states
  const [isDraggingWeb, setIsDraggingWeb] = useState(false);
  const [isDraggingMobile, setIsDraggingMobile] = useState(false);

  // Default state values
  const defaultWebData = {
    image: defaultWebBanner,
    fileName: "bannerr.jpeg",
    fileSize: "1.2 MB",
    title: "Find Your Perfect Match",
    tagline: "Connect with real people!",
    description:
      "LoveConnect brings together like-minded people who believe in real connections. Meet, chat and build something meaningful.",
    ctaText: "Get Started Free",
    ctaLink: "/register",
    isActive: true,
    lastUpdated: "Default Asset",
  };

  const defaultMobileData = {
    image: defaultMobileBanner,
    fileName: "hero_couple_romantic.jpg",
    fileSize: "854 KB",
    title: "Real People, Real Love",
    tagline: "Spark genuine connections nearby",
    description:
      "Discover verified singles in your city with our intelligent match compatibility engine.",
    ctaText: "Join Free Now",
    ctaLink: "/register",
    isActive: true,
    lastUpdated: "Default Asset",
  };

  // Website Hero Banner State
  const [webBanner, setWebBanner] = useState(() => {
    try {
      const saved = localStorage.getItem("loveconnect_hero_banner_web");
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.debug("Web banner load error:", err);
    }
    return defaultWebData;
  });

  // Mobile Hero Banner State
  const [mobileBanner, setMobileBanner] = useState(() => {
    try {
      const saved = localStorage.getItem("loveconnect_hero_banner_mobile");
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.debug("Mobile banner load error:", err);
    }
    return defaultMobileData;
  });

  // Format file size helper
  const formatBytes = (bytes, decimals = 1) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Upload handler for Website Hero Banner
  const handleWebFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setWebBanner((prev) => ({
        ...prev,
        image: e.target.result,
        fileName: file.name,
        fileSize: formatBytes(file.size),
        lastUpdated: "Just Now",
      }));
    };
    reader.readAsDataURL(file);
  };

  // Upload handler for Mobile Hero Banner
  const handleMobileFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setMobileBanner((prev) => ({
        ...prev,
        image: e.target.result,
        fileName: file.name,
        fileSize: formatBytes(file.size),
        lastUpdated: "Just Now",
      }));
    };
    reader.readAsDataURL(file);
  };

  // Save changes handler
  const handleSave = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem(
        "loveconnect_hero_banner_web",
        JSON.stringify(webBanner),
      );
      localStorage.setItem(
        "loveconnect_hero_banner_mobile",
        JSON.stringify(mobileBanner),
      );
    } catch (err) {
      console.warn("Storage quota or error saving banners:", err);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2800);
  };

  // Reset to default banners
  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Are you sure you want to reset both Website and Mobile hero banners to default assets?",
      )
    ) {
      setWebBanner(defaultWebData);
      setMobileBanner(defaultMobileData);
      try {
        localStorage.removeItem("loveconnect_hero_banner_web");
        localStorage.removeItem("loveconnect_hero_banner_mobile");
      } catch (err) {
        console.debug("Reset error:", err);
      }
      if (webFileInputRef.current) webFileInputRef.current.value = "";
      if (mobileFileInputRef.current) mobileFileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <ImageIcon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#17151A]">
                  Hero Banners Management
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  Website & Mobile
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload and configure hero banners for desktop website and mobile
                app views.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: COLORS.pink }}
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>Save & Publish Banners</span>
              </button>
            </div>
          </div>

          {/* SAVE SUCCESS NOTIFICATION */}
          {saveSuccess && (
            <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-600 shrink-0" />
                <span>
                  Hero banners have been saved and updated successfully across
                  Website & Mobile!
                </span>
              </div>
              <span className="text-[10px] text-green-600 uppercase font-extrabold tracking-wider bg-green-100/60 px-2 py-0.5 rounded-md">
                Active in Production
              </span>
            </div>
          )}

          {/* PLATFORM SWITCHER TABS */}
          <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-xs flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setPlatformFilter("web")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  platformFilter === "web"
                    ? "bg-[#FF2D72] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Website Banner (Desktop)</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatformFilter("mobile")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  platformFilter === "mobile"
                    ? "bg-[#FF2D72] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Banner (App)</span>
              </button>
            </div>

            <div className="text-[11px] font-semibold text-gray-400 flex items-center gap-1.5">
              <span>Preview adjusts dynamically on file selection</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1: WEBSITE HERO BANNER (DESKTOP) */}
          {/* ========================================================================= */}
          {platformFilter === "web" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center shrink-0">
                    <Monitor className="w-5 h-5 stroke-[2.3]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-extrabold text-gray-900">
                        Website Hero Banner (Desktop)
                      </h2>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600">
                        16:9 Landscape
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Displayed on Desktop & Tablet landing pages in the primary
                      hero fold.
                    </p>
                  </div>
                </div>

                {/* Status Toggle Switch */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-600">
                    {webBanner.isActive ? "Published" : "Draft (Hidden)"}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setWebBanner((prev) => ({
                        ...prev,
                        isActive: !prev.isActive,
                      }))
                    }
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      webBanner.isActive ? "bg-[#FF2D72]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        webBanner.isActive ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Main Content: Upload Zone & Form + Live Desktop Mockup */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Upload & Banner Info Controls (Left 6 Cols) */}
                <div className="xl:col-span-6 space-y-5">
                  {/* File Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#FF2D72]" />
                        <span>Desktop Hero Image Asset *</span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Recommended: 1920 × 1080 px (Max 5MB)
                      </span>
                    </label>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingWeb(true);
                      }}
                      onDragLeave={() => setIsDraggingWeb(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingWeb(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleWebFileUpload(file);
                      }}
                      onClick={() =>
                        webFileInputRef.current &&
                        webFileInputRef.current.click()
                      }
                      className={`relative border-2 border-dashed rounded-2xl p-5 transition-all duration-200 flex flex-col sm:flex-row items-center gap-4 cursor-pointer ${
                        isDraggingWeb
                          ? "border-[#FF2D72] bg-[#FFE7F0]/30 shadow-xs"
                          : "border-gray-200 hover:border-[#FF2D72]/40 bg-[#FAFAFC]/60 hover:bg-white"
                      }`}
                    >
                      <input
                        ref={webFileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleWebFileUpload(file);
                        }}
                      />

                      {/* Current Image Thumbnail */}
                      <div className="relative w-28 h-20 sm:w-32 sm:h-22 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shrink-0 shadow-2xs group">
                        {webBanner.image ? (
                          <img
                            src={webBanner.image}
                            alt="Website Banner Preview"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                          Change
                        </div>
                      </div>

                      {/* Upload Details & Actions */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <p className="text-xs font-bold text-gray-800 truncate">
                          {webBanner.fileName || "hero-desktop-banner.jpg"}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {webBanner.fileSize} • 16:9 Aspect Ratio
                        </p>

                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              webFileInputRef.current &&
                                webFileInputRef.current.click();
                            }}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-[#FF2D72] hover:bg-[#e61b61] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>Browse File</span>
                          </button>

                          {webBanner.image && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setWebBanner((prev) => ({
                                  ...prev,
                                  image: "",
                                  fileName: "No banner selected",
                                  fileSize: "0 KB",
                                }));
                                if (webFileInputRef.current)
                                  webFileInputRef.current.value = "";
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-1"
                              title="Remove Banner"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Metadata Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Hero Main Headline
                      </label>
                      <input
                        type="text"
                        value={webBanner.title}
                        onChange={(e) =>
                          setWebBanner({ ...webBanner, title: e.target.value })
                        }
                        placeholder="e.g. Find Your Perfect Match"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Pill Tagline / Badge
                      </label>
                      <input
                        type="text"
                        value={webBanner.tagline}
                        onChange={(e) =>
                          setWebBanner({
                            ...webBanner,
                            tagline: e.target.value,
                          })
                        }
                        placeholder="e.g. Connect with real people!"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={webBanner.ctaText}
                        onChange={(e) =>
                          setWebBanner({
                            ...webBanner,
                            ctaText: e.target.value,
                          })
                        }
                        placeholder="e.g. Get Started Free"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none transition-colors"
                      />
                    </div>

                   
                  </div>
                </div>

                {/* Live Desktop Frame Mockup Preview (Right 6 Cols) */}
                <div className="xl:col-span-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#FF2D72]" />
                      <span>Live Desktop Browser Preview</span>
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400">
                      Viewport: 1440 × 900
                    </span>
                  </div>

                  {/* Browser Window Frame */}
                  <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                    {/* Browser Address Header */}
                    <div className="bg-gray-100/90 px-3.5 py-2 border-b border-gray-200 flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 max-w-xs mx-auto bg-white rounded-md px-2.5 py-0.5 text-[10px] text-gray-500 font-mono text-center border border-gray-200/80 truncate">
                        https://loveconnect.com
                      </div>
                    </div>

                    {/* Desktop Hero Section Canvas */}
                    <div className="relative h-64 sm:h-72 w-full bg-gradient-to-r from-[#FAF9FC] via-[#FFF5F8] to-[#FCEBF3] overflow-hidden flex items-center p-5 select-none">
                      {/* Left Column Content */}
                      <div className="w-3/5 z-10 space-y-2.5">
                        {webBanner.tagline && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#FFE4EE] shadow-2xs">
                            <Heart className="w-2.5 h-2.5 fill-[#FF2D72] text-[#FF2D72]" />
                            <span className="text-[9px] font-bold text-[#FF2D72]">
                              {webBanner.tagline}
                            </span>
                          </div>
                        )}

                        <h3 className="text-xl sm:text-2xl font-black text-[#18181B] leading-tight tracking-tight">
                          {webBanner.title || "Find Your Perfect Match"}
                        </h3>

                        <p className="text-[10px] text-[#52525B] leading-relaxed line-clamp-2 max-w-xs">
                          {webBanner.description}
                        </p>

                        <div className="pt-1">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] text-white text-[10px] font-bold shadow-xs">
                            <span>
                              {webBanner.ctaText || "Get Started Free"}
                            </span>
                            <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                          </span>
                        </div>
                      </div>

                      {/* Right Visual Image Layer */}
                      <div className="absolute right-0 top-0 bottom-0 w-[55%] h-full overflow-hidden">
                        {/* Organic arch gradient backdrop */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-44 h-56 rounded-t-full rounded-b-[100px] bg-gradient-to-tr from-[#7C3AED] via-[#E11D48] to-[#FF2D72] opacity-80 -rotate-3" />

                        {webBanner.image ? (
                          <img
                            src={webBanner.image}
                            alt="Website Hero Banner"
                            className="relative z-10 w-full h-full object-cover object-center [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                            <span className="text-xs">No Image Uploaded</span>
                          </div>
                        )}

                        {/* Floating Micro Card */}
                        <div className="absolute top-3 right-3 z-20 bg-white/95 rounded-xl p-2 shadow-md border border-white/90 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#FF2D72] flex items-center justify-center text-white">
                            <Heart className="w-3 h-3 fill-white" />
                          </div>
                          <div>
                            <div className="text-[9px] font-extrabold text-gray-800">
                              Match Found!
                            </div>
                            <div className="text-[8px] text-gray-400">
                              98% Match
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2: MOBILE HERO BANNER (MOBILE APP) */}
          {/* ========================================================================= */}
          {platformFilter === "mobile" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 stroke-[2.3]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-extrabold text-gray-900">
                        Mobile Hero Banner (Mobile App)
                      </h2>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-600">
                        9:16 Portrait / Responsive
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Displayed on iOS, Android and mobile browser landing
                      screens.
                    </p>
                  </div>
                </div>

                {/* Status Toggle Switch */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-600">
                    {mobileBanner.isActive ? "Published" : "Draft (Hidden)"}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileBanner((prev) => ({
                        ...prev,
                        isActive: !prev.isActive,
                      }))
                    }
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      mobileBanner.isActive ? "bg-[#7C3AED]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        mobileBanner.isActive
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Main Content: Upload Zone & Form + Smartphone Device Mockup */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Upload & Mobile Banner Info Controls (Left 6 Cols) */}
                <div className="xl:col-span-6 space-y-5">
                  {/* File Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#7C3AED]" />
                        <span>Mobile Hero Image Asset *</span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Recommended: 1080 × 1920 px (Max 5MB)
                      </span>
                    </label>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingMobile(true);
                      }}
                      onDragLeave={() => setIsDraggingMobile(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingMobile(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleMobileFileUpload(file);
                      }}
                      onClick={() =>
                        mobileFileInputRef.current &&
                        mobileFileInputRef.current.click()
                      }
                      className={`relative border-2 border-dashed rounded-2xl p-5 transition-all duration-200 flex flex-col sm:flex-row items-center gap-4 cursor-pointer ${
                        isDraggingMobile
                          ? "border-[#7C3AED] bg-purple-50/40 shadow-xs"
                          : "border-gray-200 hover:border-[#7C3AED]/40 bg-[#FAFAFC]/60 hover:bg-white"
                      }`}
                    >
                      <input
                        ref={mobileFileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleMobileFileUpload(file);
                        }}
                      />

                      {/* Current Image Thumbnail */}
                      <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shrink-0 shadow-2xs group">
                        {mobileBanner.image ? (
                          <img
                            src={mobileBanner.image}
                            alt="Mobile Banner Preview"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                          Change
                        </div>
                      </div>

                      {/* Upload Details & Actions */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <p className="text-xs font-bold text-gray-800 truncate">
                          {mobileBanner.fileName || "hero-mobile-banner.jpg"}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {mobileBanner.fileSize} • 9:16 Portrait Ratio
                        </p>

                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              mobileFileInputRef.current &&
                                mobileFileInputRef.current.click();
                            }}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-[#7C3AED] hover:bg-[#6d28d9] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>Browse File</span>
                          </button>

                          {mobileBanner.image && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMobileBanner((prev) => ({
                                  ...prev,
                                  image: "",
                                  fileName: "No banner selected",
                                  fileSize: "0 KB",
                                }));
                                if (mobileFileInputRef.current)
                                  mobileFileInputRef.current.value = "";
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-1"
                              title="Remove Banner"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Metadata Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mobile Hero Headline
                      </label>
                      <input
                        type="text"
                        value={mobileBanner.title}
                        onChange={(e) =>
                          setMobileBanner({
                            ...mobileBanner,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g. Real People, Real Love"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mobile Tagline
                      </label>
                      <input
                        type="text"
                        value={mobileBanner.tagline}
                        onChange={(e) =>
                          setMobileBanner({
                            ...mobileBanner,
                            tagline: e.target.value,
                          })
                        }
                        placeholder="e.g. Spark genuine connections nearby"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={mobileBanner.ctaText}
                        onChange={(e) =>
                          setMobileBanner({
                            ...mobileBanner,
                            ctaText: e.target.value,
                          })
                        }
                        placeholder="e.g. Join Free Now"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C3AED] focus:outline-none transition-colors"
                      />
                    </div>

                  </div>
                </div>

                {/* Smartphone Device Frame Mockup Preview (Right 6 Cols) */}
                <div className="xl:col-span-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>Live Mobile App Screen Preview</span>
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400">
                      Viewport: 390 × 844 (iOS / Android)
                    </span>
                  </div>

                  {/* Centered Latest iPhone 16 Pro Smartphone Mockup */}
                  <div className="flex justify-center p-3">
                    {/* iPhone 16 Pro Chassis with Titanium Finish & Hardware Buttons */}
                    <div className="relative select-none">
                      {/* Left Hardware Buttons: Action Button, Volume Up, Volume Down */}
                      <div
                        className="absolute -left-[3px] top-24 w-[3px] h-7 bg-[#4d4b55] rounded-l-xs border-y border-l border-[#615e6c] z-10"
                        title="Action Button"
                      />
                      <div
                        className="absolute -left-[3px] top-35 w-[3px] h-12 bg-[#4d4b55] rounded-l-xs border-y border-l border-[#615e6c] z-10"
                        title="Volume Up"
                      />
                      <div
                        className="absolute -left-[3px] top-50 w-[3px] h-12 bg-[#4d4b55] rounded-l-xs border-y border-l border-[#615e6c] z-10"
                        title="Volume Down"
                      />

                      {/* Right Hardware Buttons: Power / Side Button, Camera Control */}
                      <div
                        className="absolute -right-[3px] top-34 w-[3px] h-16 bg-[#4d4b55] rounded-r-xs border-y border-r border-[#615e6c] z-10"
                        title="Side Button"
                      />
                      <div
                        className="absolute -right-[3px] top-55 w-[3px] h-10 bg-[#3d3b45] rounded-r-xs border-y border-r border-[#545260] z-10"
                        title="Camera Control"
                      />

                      {/* iPhone Outer Titanium Bezel */}
                      <div className="w-[285px] sm:w-[310px] h-[580px] sm:h-[610px] rounded-[52px] sm:rounded-[56px] p-[10px] bg-gradient-to-b from-[#3a3942] via-[#24232a] to-[#18171d] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.12),0_8px_20px_-6px_rgba(0,0,0,0.4)] border border-[#44434d] relative">
                        {/* Inner OLED Screen Container with Super-thin Bezel */}
                        <div className="w-full h-full rounded-[42px] sm:rounded-[46px] overflow-hidden relative bg-black flex flex-col justify-between border-[2.5px] border-[#0c0c0e]">
                          {/* Dynamic Island */}
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[94px] h-[25px] bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-lg pointer-events-none">
                            {/* Selfie Camera Lens with optical reflection */}
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d12] ring-1 ring-white/10 flex items-center justify-center">
                              <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
                            </div>
                            {/* FaceID Sensor */}
                            <div className="w-2 h-2 rounded-full bg-[#0a0a0f]" />
                          </div>

                          {/* Subtle Glass Glare Reflection */}
                          <div className="absolute -top-10 -right-10 w-44 h-44 bg-gradient-to-bl from-white/15 via-white/4 to-transparent rounded-full pointer-events-none z-30 transform -rotate-12" />

                          {/* Background Hero Banner Image Layer */}
                          {mobileBanner.image ? (
                            <img
                              src={mobileBanner.image}
                              alt="Mobile Hero Banner"
                              className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1e] to-black flex items-center justify-center text-gray-500 text-xs">
                              No Mobile Banner
                            </div>
                          )}

                          {/* Top Gradient Overlay for Status Bar Readability */}
                          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/85 via-black/45 to-transparent z-10 pointer-events-none" />

                          {/* Authentic iOS 18 Status Bar */}
                          <div className="relative z-30 px-6 pt-3 flex items-center justify-between text-white text-[11px] font-semibold select-none pointer-events-none">
                            {/* Time */}
                            <span className="tracking-tight font-medium">
                              9:41
                            </span>

                            {/* Status Icons: Cellular, 5G, Battery */}
                            <div className="flex items-center gap-1.5">
                              {/* Cellular Signal Bars */}
                              <div className="flex items-end gap-[1.5px] h-2.5">
                                <span className="w-[2.5px] h-1 bg-white rounded-2xs" />
                                <span className="w-[2.5px] h-1.5 bg-white rounded-2xs" />
                                <span className="w-[2.5px] h-2 bg-white rounded-2xs" />
                                <span className="w-[2.5px] h-2.5 bg-white rounded-2xs" />
                              </div>

                              {/* 5G Badge */}
                              <span className="text-[9.5px] font-bold tracking-tight">
                                5G
                              </span>

                              {/* iOS Battery Indicator with Terminal Tip */}
                              <div className="flex items-center">
                                <div className="w-[19px] h-[9.5px] rounded-[3.5px] border border-white/90 p-[1.5px] flex items-center">
                                  <div className="w-full h-full bg-white rounded-[1.5px]" />
                                </div>
                                <div className="w-[1.5px] h-[3.5px] bg-white/80 rounded-r-xs" />
                              </div>
                            </div>
                          </div>

                          {/* Bottom Gradient Overlay for Content Readability */}
                          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

                          {/* Bottom Content Area */}
                          <div className="relative z-20 p-5 space-y-2 mt-auto text-white">
                            {mobileBanner.tagline && (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-bold text-pink-200 border border-white/20 shadow-xs">
                                <Heart className="w-2.5 h-2.5 fill-pink-400 text-pink-400" />
                                <span>{mobileBanner.tagline}</span>
                              </div>
                            )}

                            <h4 className="text-xl font-black leading-tight tracking-tight drop-shadow-md">
                              {mobileBanner.title || "Real People, Real Love"}
                            </h4>

                            <p className="text-[10.5px] text-gray-200 line-clamp-2 leading-relaxed opacity-95">
                              {mobileBanner.description}
                            </p>

                            <div className="pt-2">
                              <button
                                type="button"
                                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF2D72] via-[#E11D48] to-[#8B5CF6] text-white text-xs font-black shadow-lg shadow-pink-500/35 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <span>
                                  {mobileBanner.ctaText || "Join Free Now"}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                            </div>

                            {/* iOS Home Indicator Bar */}
                            <div className="pt-2">
                              <div className="w-28 h-[4px] bg-white/70 rounded-full mx-auto shadow-xs" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
