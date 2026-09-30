import React, { useState, useRef } from "react";
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
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import favIcon from "../../../../assets/fav.png";

export default function AppSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("App Settings");
  const [currentSection, setCurrentSection] = useState("general");
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  const [notifications, setNotifications] = useState({
    emailProvider: "SendGrid",
    emailApiKey: "SG.893jfe902389fdsklfjk290fjds",
    senderEmail: "noreply@loveconnect.com",
    smsGateway: "Twilio",
    smsApiKey: "AC_902389fjdk209fj239fjds09",
    fcmServerKey: "AAAA9283jfkd:APA91bF9023fjdlks...",
    enablePushAlerts: true,
  });

  const [payments, setPayments] = useState({
    testMode: false,
    razorpayKeyId: "rzp_live_89023489jfksl23",
    razorpaySecret: "••••••••••••••••••••••••••••",
    stripePublishableKey: "pk_live_51M02389fjkd239fj",
    stripeSecretKey: "••••••••••••••••••••••••••••",
    defaultPaymentGateway: "Razorpay",
    currencyCode: "INR",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const sections = [
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
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
                      <span className="text-[10px] text-gray-400 font-medium">PNG, JPG, WEBP • Max 2MB</span>
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
                            {general.profilePic ? "App Profile Picture" : "Upload Profile Picture"}
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
                            <span>{general.profilePic ? "Change" : "Upload"}</span>
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
                      <span className="text-[10px] text-gray-400 font-medium">ICO, PNG, SVG • 32x32 recommended</span>
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
                            <span className="text-[9px] text-gray-400 mt-0.5">Icon</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-gray-800 truncate">
                            {general.favicon ? "Browser Tab Favicon" : "Upload Favicon Icon"}
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
                            <span>{general.favicon ? "Change" : "Upload"}</span>
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
                        setGeneral({ ...general, contactEmail: e.target.value })
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
                        setGeneral({ ...general, contactPhone: e.target.value })
                      }
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* NOTIFICATION SETTINGS */}
            {currentSection === "notifications" && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">
                    Notification Delivery Services
                  </h3>
                  <p className="text-xs text-gray-400">
                    Configure credentials for transactional emails, SMS OTP, and
                    push alerts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Provider Gateway
                    </label>
                    <select
                      value={notifications.emailProvider}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          emailProvider: e.target.value,
                        })
                      }
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option>SendGrid</option>
                      <option>Amazon SES</option>
                      <option>Mailgun</option>
                      <option>SMTP Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Sender Email Address
                    </label>
                    <input
                      type="email"
                      value={notifications.senderEmail}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          senderEmail: e.target.value,
                        })
                      }
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email API Secret Key
                    </label>
                    <input
                      type="password"
                      value={notifications.emailApiKey}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          emailApiKey: e.target.value,
                        })
                      }
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      SMS OTP Gateway
                    </label>
                    <select
                      value={notifications.smsGateway}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          smsGateway: e.target.value,
                        })
                      }
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option>Twilio</option>
                      <option>MSG91</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      SMS Auth Token / Account SID
                    </label>
                    <input
                      type="password"
                      value={notifications.smsApiKey}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          smsApiKey: e.target.value,
                        })
                      }
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Firebase Cloud Messaging (FCM) Key
                    </label>
                    <input
                      type="password"
                      value={notifications.fcmServerKey}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          fcmServerKey: e.target.value,
                        })
                      }
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
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
        </main>
      </div>
    </div>
  );
}
