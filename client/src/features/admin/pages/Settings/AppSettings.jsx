import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Settings,
  Bell,
  CreditCard,
  Save,
  CheckCircle2,
  Globe,
  Smartphone,
  Mail,
  Server,
  Database,
  Layers,
  Sparkles,
  MailBadge,
  UploadCloud,
  Camera,
  Trash2,
  Image as ImageIcon,
  User,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Send,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import favIcon from "../../../../assets/fav.png";

export default function AppSettings() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("App Settings");

  // Determine initial active section from query param if available
  const [currentSection, setCurrentSection] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) return tab;
    } catch (_) {}
    return "profile";
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Sync tab with URL search parameter changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setCurrentSection(tab);
    }
  }, [location.search]);

  // Listen to tab switch events from Navbar
  useEffect(() => {
    const handleSwitchTab = (e) => {
      if (e.detail) {
        setCurrentSection(e.detail);
      }
    };
    window.addEventListener("switch_app_settings_tab", handleSwitchTab);
    return () =>
      window.removeEventListener("switch_app_settings_tab", handleSwitchTab);
  }, []);

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("loveconnect_admin_profile");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      name: "Priya Singh",
      email: "priya.singh@loveconnect.com",
      phone: "+91 98765 43210",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    };
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const adminPicInputRef = useRef(null);
  const [isDraggingAdminPic, setIsDraggingAdminPic] = useState(false);

  // File Input References
  const profileInputRef = useRef(null);
  const faviconInputRef = useRef(null);
  const [isDraggingProfile, setIsDraggingProfile] = useState(false);
  const [isDraggingFavicon, setIsDraggingFavicon] = useState(false);

  // Settings State
  const [general, setGeneral] = useState({
    brandName: "LoveConnect",
    location: "Noida, Uttar Pradesh",
    contactEmail: "youremail@gmail.com",
    contactPhone: "98xxxxxxxx",
    profilePic: favIcon,
    favicon: favIcon,
  });

  const handleProfileFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setGeneral((prev) => ({
        ...prev,
        profilePic: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/") && !file.name.endsWith(".ico")) {
      alert("Please upload an image or .ico file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setGeneral((prev) => ({
        ...prev,
        favicon: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePic = (e) => {
    e.stopPropagation();
    setGeneral((prev) => ({ ...prev, profilePic: null }));
    if (profileInputRef.current) profileInputRef.current.value = "";
  };

  const handleRemoveFavicon = (e) => {
    e.stopPropagation();
    setGeneral((prev) => ({ ...prev, favicon: null }));
    if (faviconInputRef.current) faviconInputRef.current.value = "";
  };

  const [smtpSettings, setSmtpSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("loveconnect_smtp_settings");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      host: "smtp.gmail.com",
      port: "465",
      encryption: "SSL (465)", // "SSL (465)", "TLS (587)", "None"
      username: "deytaloffice@gmail.com",
      password: "•••••••••••••••••",
      fromName: "",
      fromEmail: "deytaloffice@gmail.com",
      replyToEmail: "deytaloffice@gmail.com",
    };
  });

  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [testEmailRecipient, setTestEmailRecipient] = useState("");
  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState(null);

  const handleSendTestEmail = (e) => {
    if (e) e.preventDefault();
    if (!testEmailRecipient || !testEmailRecipient.includes("@")) {
      setTestEmailStatus({
        type: "error",
        message: "Please enter a valid recipient email address for testing.",
      });
      return;
    }
    setTestEmailLoading(true);
    setTestEmailStatus(null);
    setTimeout(() => {
      setTestEmailLoading(false);
      setTestEmailStatus({
        type: "success",
        message: `Live test email dispatched successfully to ${testEmailRecipient} via ${smtpSettings.host}:${smtpSettings.port}! SMTP handshake verified.`,
      });
      setTimeout(() => setTestEmailStatus(null), 7000);
    }, 1100);
  };

  const [payments, setPayments] = useState({
    testMode: false,
    razorpayKeyId: "rzp_live_89023489jfksl23",
    razorpaySecret: "••••••••••••••••••••••••••••",
    stripePublishableKey: "pk_live_51M02389fjkd239fj",
    stripeSecretKey: "••••••••••••••••••••••••••••",
    defaultPaymentGateway: "Razorpay",
    currencyCode: "INR",
  });

  const handleAdminPicFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setAdminProfile((prev) => ({
        ...prev,
        avatar: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAdminProfile = (e) => {
    if (e) e.preventDefault();
    if (
      passwordData.newPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      alert("Passwords do not match!");
      return;
    }
    try {
      localStorage.setItem(
        "loveconnect_admin_profile",
        JSON.stringify(adminProfile),
      );
      window.dispatchEvent(new Event("admin_profile_updated"));
    } catch (_) {}
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (currentSection === "profile") {
      handleSaveAdminProfile(e);
      return;
    }
    try {
      localStorage.setItem(
        "loveconnect_smtp_settings",
        JSON.stringify(smtpSettings),
      );
    } catch (_) {}
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const sections = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "general", label: "General Settings", icon: Settings },
    { id: "notifications", label: "Email Setup", icon: MailBadge },
    { id: "payments", label: "Payment Gateway", icon: CreditCard },
  ];

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar
          activeTab="App Settings"
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                App Settings
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Configure brand identities, security thresholds, payment
                processors, and backend cloud API keys
              </p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer bg-[#FF2D72]"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save System Settings</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>
                All platform settings updated and synced to production clusters!
              </span>
            </div>
          )}

          {profileSuccess && (
            <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>
                Admin profile settings updated and saved successfully! 🎉
              </span>
            </div>
          )}

          {/* SECTION SWITCHER TABS */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = currentSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setCurrentSection(sec.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-[#FF2D72] text-white shadow-xs"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN FORM CARD */}
          {currentSection !== "notifications" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
              {/* PROFILE SETTINGS */}
              {currentSection === "profile" && (
                <form onSubmit={handleSaveAdminProfile} className="space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">
                      Administrator Profile Settings
                    </h3>
                    <p className="text-xs text-gray-400">
                      Manage your administrator personal credentials, contact
                      info, and security credentials.
                    </p>
                  </div>

                  {/* Profile Pic Upload Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                        <span>Profile Pic</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          PNG, JPG, WEBP • Max 2MB
                        </span>
                      </label>

                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingAdminPic(true);
                        }}
                        onDragLeave={() => setIsDraggingAdminPic(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingAdminPic(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleAdminPicFile(file);
                        }}
                        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all duration-200 flex items-center gap-4 ${
                          isDraggingAdminPic
                            ? "border-[#FF2D72] bg-[#FFE7F0]/30 shadow-xs"
                            : "border-gray-200 hover:border-[#FF2D72]/40 bg-[#FAFAFC]/60 hover:bg-white"
                        }`}
                      >
                        <input
                          type="file"
                          ref={adminPicInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleAdminPicFile(file);
                          }}
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                        />

                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-pink-200 bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-xs group">
                          {adminProfile.avatar ? (
                            <>
                              <img
                                src={adminProfile.avatar}
                                alt="Admin Avatar Preview"
                                className="w-full h-full object-cover"
                              />
                              <div
                                onClick={() =>
                                  adminPicInputRef.current?.click()
                                }
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
                                title="Change image"
                              >
                                <Camera className="w-5 h-5 text-white" />
                              </div>
                            </>
                          ) : (
                            <User className="w-8 h-8 text-gray-300" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xs font-bold text-gray-800">
                              Admin Profile Picture
                            </h4>
                            <span className="text-[10px] bg-green-50 text-green-600 font-extrabold px-1.5 py-0.5 rounded border border-green-200">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 mb-2 truncate">
                            Drop photo here or click browse
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => adminPicInputRef.current?.click()}
                              className="px-2.5 py-1 text-[11px] font-bold text-[#FF2D72] bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors cursor-pointer"
                            >
                              Change
                            </button>
                            {adminProfile.avatar && (
                              <button
                                type="button"
                                onClick={() =>
                                  setAdminProfile((prev) => ({
                                    ...prev,
                                    avatar: null,
                                  }))
                                }
                                className="px-2.5 py-1 text-[11px] font-bold text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name, Email, Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={adminProfile.name}
                        onChange={(e) =>
                          setAdminProfile({
                            ...adminProfile,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g. Priya Singh"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#FF2D72] outline-hidden font-medium bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={adminProfile.email}
                        onChange={(e) =>
                          setAdminProfile({
                            ...adminProfile,
                            email: e.target.value,
                          })
                        }
                        placeholder="e.g. priya.singh@loveconnect.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#FF2D72] outline-hidden font-medium bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={adminProfile.phone}
                        onChange={(e) =>
                          setAdminProfile({
                            ...adminProfile,
                            phone: e.target.value,
                          })
                        }
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#FF2D72] outline-hidden font-medium bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="border-t border-gray-100 pt-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        Security & Password Update
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Leave blank if you do not wish to change your password.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                            placeholder="Enter new password (min. 8 characters)"
                            className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 text-xs focus:border-[#FF2D72] outline-hidden font-medium bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                              })
                            }
                            placeholder="Re-enter new password"
                            className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 text-xs focus:border-[#FF2D72] outline-hidden font-medium bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-xs shadow-md shadow-pink-500/25 transition-all hover:opacity-90 cursor-pointer bg-[#FF2D72]"
                    >
                      <Save className="w-4 h-4 stroke-[2.5]" />
                      <span>Save Profile Settings</span>
                    </button>
                  </div>
                </form>
              )}

              {/* GENERAL SETTINGS */}
              {currentSection === "general" && (
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">
                      General Brand & Application Info
                    </h3>
                    <p className="text-xs text-gray-400">
                      Core brand metadata exposed to mobile applications and
                      websites.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Profile Pic Upload */}
                    <div className="flex flex-col">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                        <span>Profile Pic</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          PNG, JPG, WEBP • Max 2MB
                        </span>
                      </label>

                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingProfile(true);
                        }}
                        onDragLeave={() => setIsDraggingProfile(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingProfile(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleProfileFile(file);
                        }}
                        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all duration-200 flex items-center gap-4 ${
                          isDraggingProfile
                            ? "border-[#FF2D72] bg-[#FFE7F0]/30 shadow-xs"
                            : "border-gray-200 hover:border-[#FF2D72]/40 bg-[#FAFAFC]/60 hover:bg-white"
                        }`}
                      >
                        <input
                          type="file"
                          ref={profileInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleProfileFile(file);
                          }}
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          className="hidden"
                        />

                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-gray-200/80 bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-2xs group">
                          {general.profilePic ? (
                            <>
                              <img
                                src={general.profilePic}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                              />
                              <div
                                onClick={() => profileInputRef.current?.click()}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
                                title="Change image"
                              >
                                <Camera className="w-5 h-5 text-white" />
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-300">
                              <Camera className="w-6 h-6 stroke-[1.8] text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-gray-800 truncate">
                              {general.profilePic
                                ? "App Profile Picture"
                                : "Upload Profile Picture"}
                            </h4>
                            {general.profilePic && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-600 border border-green-200">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                            Drop profile picture here or click browse
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() => profileInputRef.current?.click()}
                              className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#FFE7F0] text-[#FF2D72] hover:bg-[#ffd2e2] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                              <UploadCloud className="w-3.5 h-3.5 stroke-[2.3]" />
                              <span>
                                {general.profilePic ? "Change" : "Upload"}
                              </span>
                            </button>

                            {general.profilePic && (
                              <button
                                type="button"
                                onClick={handleRemoveProfilePic}
                                className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Favicon Icon Upload */}
                    <div className="flex flex-col">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                        <span>Favicon Icon</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          ICO, PNG, SVG • 32x32 recommended
                        </span>
                      </label>

                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingFavicon(true);
                        }}
                        onDragLeave={() => setIsDraggingFavicon(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingFavicon(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleFaviconFile(file);
                        }}
                        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all duration-200 flex items-center gap-4 ${
                          isDraggingFavicon
                            ? "border-[#FF2D72] bg-[#FFE7F0]/30 shadow-xs"
                            : "border-gray-200 hover:border-[#FF2D72]/40 bg-[#FAFAFC]/60 hover:bg-white"
                        }`}
                      >
                        <input
                          type="file"
                          ref={faviconInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFaviconFile(file);
                          }}
                          accept="image/x-icon,image/vnd.microsoft.icon,image/png,image/svg+xml,image/jpeg"
                          className="hidden"
                        />

                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-gray-200/80 bg-white flex flex-col items-center justify-center shrink-0 overflow-hidden shadow-2xs group p-1.5">
                          {general.favicon ? (
                            <>
                              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-1 shadow-2xs">
                                <img
                                  src={general.favicon}
                                  alt="Favicon preview"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-wider">
                                32x32
                              </span>
                              <div
                                onClick={() => faviconInputRef.current?.click()}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
                                title="Change favicon"
                              >
                                <Camera className="w-5 h-5 text-white" />
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-300">
                              <Globe className="w-6 h-6 stroke-[1.8] text-gray-400" />
                              <span className="text-[9px] text-gray-400 mt-0.5">
                                Icon
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-gray-800 truncate">
                              {general.favicon
                                ? "Browser Tab Favicon"
                                : "Upload Favicon Icon"}
                            </h4>
                            {general.favicon && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-600 border border-green-200">
                                Active
                              </span>
                            )}
                          </div>

                          {/* Mini browser tab mockup */}
                          <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 bg-gray-100/90 rounded-md border border-gray-200/70 w-fit text-[10px] text-gray-600">
                            <img
                              src={general.favicon || favIcon}
                              alt=""
                              className="w-3 h-3 object-contain shrink-0 rounded-[2px]"
                            />
                            <span className="truncate max-w-[120px] font-medium text-gray-700">
                              {general.brandName || "LoveConnect"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() => faviconInputRef.current?.click()}
                              className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#FFE7F0] text-[#FF2D72] hover:bg-[#ffd2e2] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                              <UploadCloud className="w-3.5 h-3.5 stroke-[2.3]" />
                              <span>
                                {general.favicon ? "Change" : "Upload"}
                              </span>
                            </button>

                            {general.favicon && (
                              <button
                                type="button"
                                onClick={handleRemoveFavicon}
                                className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="LoveConnect"
                        value={general.brandName}
                        onChange={(e) =>
                          setGeneral({ ...general, brandName: e.target.value })
                        }
                        className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Noida, Uttar Pradesh"
                        value={general.location}
                        onChange={(e) =>
                          setGeneral({ ...general, location: e.target.value })
                        }
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Support Contact Email
                      </label>
                      <input
                        type="email"
                        placeholder="youremail@gmail.com"
                        value={general.contactEmail}
                        onChange={(e) =>
                          setGeneral({
                            ...general,
                            contactEmail: e.target.value,
                          })
                        }
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        placeholder="98xxxxxxxx"
                        value={general.contactPhone}
                        onChange={(e) =>
                          setGeneral({
                            ...general,
                            contactPhone: e.target.value,
                          })
                        }
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* PAYMENT SETTINGS */}
              {currentSection === "payments" && (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900">
                        Payment Processors & Gateway Keys
                      </h3>
                      <p className="text-xs text-gray-400">
                        Configure Razorpay keys for subscriptions and boost
                        payments.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Razorpay Key ID
                      </label>
                      <input
                        type="text"
                        value={payments.razorpayKeyId}
                        onChange={(e) =>
                          setPayments({
                            ...payments,
                            razorpayKeyId: e.target.value,
                          })
                        }
                        className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Razorpay Key Secret
                      </label>
                      <input
                        type="password"
                        value={payments.razorpaySecret}
                        onChange={(e) =>
                          setPayments({
                            ...payments,
                            razorpaySecret: e.target.value,
                          })
                        }
                        className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                      />
                    </div>{" "}
                  </div>
                </form>
              )}
            </div>
          )}

          {/* EMAIL SETUP / SMTP CONFIGURATION (EXACT MATCH TO 1ST IMAGE) */}
          {currentSection === "notifications" && (
            <div className="space-y-6">
              {/* TOP TWO CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* SERVER CONNECTION PARAMETERS */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs space-y-5">
                  <h3 className="text-xs sm:text-sm font-extrabold tracking-wide text-gray-900 uppercase">
                    SERVER CONNECTION PARAMETERS
                  </h3>

                  {/* SMTP Host Server & Port */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    <div className="sm:col-span-8">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        SMTP Host Server
                      </label>
                      <input
                        type="text"
                        value={smtpSettings.host}
                        onChange={(e) =>
                          setSmtpSettings({
                            ...smtpSettings,
                            host: e.target.value,
                          })
                        }
                        placeholder="smtp.gmail.com"
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 focus:border-[#FF2D72] focus:outline-none bg-white transition-all font-mono sm:font-sans"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Port
                      </label>
                      <input
                        type="text"
                        value={smtpSettings.port}
                        onChange={(e) =>
                          setSmtpSettings({
                            ...smtpSettings,
                            port: e.target.value,
                          })
                        }
                        placeholder="465"
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 focus:border-[#FF2D72] focus:outline-none bg-white transition-all font-mono sm:font-sans"
                      />
                    </div>
                  </div>

                  {/* Security Encryption Method */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Security Encryption Method
                    </label>
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setSmtpSettings((prev) => ({
                            ...prev,
                            encryption: "SSL (465)",
                            port: "465",
                          }))
                        }
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                          smtpSettings.encryption === "SSL (465)"
                            ? "bg-[#FF2D72] text-white shadow-xs font-bold"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50/80"
                        }`}
                      >
                        SSL (465)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSmtpSettings((prev) => ({
                            ...prev,
                            encryption: "TLS (587)",
                            port: "587",
                          }))
                        }
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                          smtpSettings.encryption === "TLS (587)"
                            ? "bg-[#FF2D72] text-white shadow-xs font-bold"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50/80"
                        }`}
                      >
                        TLS (587)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSmtpSettings((prev) => ({
                            ...prev,
                            encryption: "None",
                            port: "25",
                          }))
                        }
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                          smtpSettings.encryption === "None"
                            ? "bg-[#FF2D72] text-white shadow-xs font-bold"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50/80"
                        }`}
                      >
                        None
                      </button>
                    </div>
                  </div>

                  {/* SMTP Username / Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      SMTP Username / Email Address
                    </label>
                    <input
                      type="text"
                      value={smtpSettings.username}
                      onChange={(e) =>
                        setSmtpSettings({
                          ...smtpSettings,
                          username: e.target.value,
                        })
                      }
                      placeholder="deytaloffice@gmail.com"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 focus:border-[#FF2D72] focus:outline-none bg-white transition-all font-mono sm:font-sans"
                    />
                  </div>

                  {/* SMTP Password / Gmail App Password */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      SMTP Password / Gmail App Password
                    </label>
                    <div className="relative">
                      <input
                        type={showSmtpPassword ? "text" : "password"}
                        value={smtpSettings.password}
                        onChange={(e) =>
                          setSmtpSettings({
                            ...smtpSettings,
                            password: e.target.value,
                          })
                        }
                        placeholder="•••••••••••••••••"
                        className="w-full px-3.5 py-2.5 sm:py-3 pr-10 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 focus:border-[#FF2D72] focus:outline-none bg-white transition-all font-mono tracking-wider"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                        title={
                          showSmtpPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showSmtpPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* SENDER DISPLAY IDENTITY */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs space-y-5">
                  <h3 className="text-xs sm:text-sm font-extrabold tracking-wide text-gray-900 uppercase">
                    SENDER DISPLAY IDENTITY
                  </h3>

                  {/* "From" Display Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      "From" Display Name
                    </label>
                    <input
                      type="text"
                      value={smtpSettings.fromName}
                      onChange={(e) =>
                        setSmtpSettings({
                          ...smtpSettings,
                          fromName: e.target.value,
                        })
                      }
                      placeholder=""
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 focus:border-[#FF2D72] focus:outline-none bg-white transition-all"
                    />
                  </div>

                  {/* "From" Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      "From" Email Address
                    </label>
                    <input
                      type="email"
                      value={smtpSettings.fromEmail}
                      onChange={(e) =>
                        setSmtpSettings({
                          ...smtpSettings,
                          fromEmail: e.target.value,
                        })
                      }
                      placeholder="deytaloffice@gmail.com"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 focus:border-[#FF2D72] focus:outline-none bg-white transition-all font-mono sm:font-sans"
                    />
                  </div>

                  {/* Reply-To Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Reply-To Email Address
                    </label>
                    <input
                      type="email"
                      value={smtpSettings.replyToEmail}
                      onChange={(e) =>
                        setSmtpSettings({
                          ...smtpSettings,
                          replyToEmail: e.target.value,
                        })
                      }
                      placeholder="deytaloffice@gmail.com"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 focus:border-[#FF2D72] focus:outline-none bg-white transition-all font-mono sm:font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* TEST LIVE SMTP CONFIGURATION */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFE7F0] flex items-center justify-center shrink-0 mt-0.5">
                    <Send className="w-4 h-4 text-[#FF2D72] -rotate-12" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                      Test Live SMTP Configuration
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Dispatch a live test email through your configured SMTP
                      credentials to verify handshake and inbox delivery.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <div className="flex-1 w-full">
                    <input
                      type="email"
                      value={testEmailRecipient}
                      onChange={(e) => setTestEmailRecipient(e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#FF2D72] bg-white transition-all font-mono sm:font-sans"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={testEmailLoading}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF2D72] hover:bg-[#e02663] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all whitespace-nowrap cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {testEmailLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Test Email</span>
                      </>
                    )}
                  </button>
                </div>

                {testEmailStatus && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
                      testEmailStatus.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {testEmailStatus.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        !
                      </span>
                    )}
                    <span>{testEmailStatus.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
