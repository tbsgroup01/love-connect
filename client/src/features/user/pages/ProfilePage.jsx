/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  Camera,
  Pencil,
  Briefcase,
  GraduationCap,
  MapPin,
  Heart,
  Star,
  User,
  Sparkles,
  SlidersHorizontal,
  Loader2,
  Check,
  X,
  Upload,
  Calendar,
  Plane,
  Music,
  Utensils,
  Dumbbell,
  BookOpen,
  Leaf,
  PawPrint,
} from "lucide-react";
import {
  getUserById,
  updateUserProfile,
  uploadProfileImage,
} from "../../../services/usersServices.js";

import rheaImg from "../../../assets/hero_woman_exact.png";

export default function ProfilePage() {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // User & Profile State from DB
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({ likesReceived: 0, matches: 0 });

  // Inline Edit States (no popup modals)
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingLifestyle, setIsEditingLifestyle] = useState(false);
  const [savingSection, setSavingSection] = useState(null);

  // Form State for Editing
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    state: "",
    country: "India",
    education: "",
    profession: "",
    height: "",
    about_me: "",
    tags: ["Positive", "Adventure Lover", "Foodie", "Travel Enthusiast"],
    smoking: "Sometimes",
    drinking: "Socially",
    diet: "Vegetarian",
    pets: "Dog Lover",
    selectedInterests: ["Travel", "Music", "Food", "Photography"],
  });

  // Calculate age from date of birth helper
  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const getParsedPreferences = (pref) => {
    if (!pref) return {};
    if (typeof pref === "object") return pref;
    if (typeof pref === "string") {
      try {
        return JSON.parse(pref);
      } catch (e) {
        return {};
      }
    }
    return {};
  };

  // Fetch logged-in user profile from MySQL DB
  const fetchUserProfile = async () => {
    try {
      const saved = localStorage.getItem("user");
      if (!saved) {
        navigate("/login");
        return;
      }
      const parsed = JSON.parse(saved);
      if (!parsed?.id) {
        navigate("/login");
        return;
      }

      setLoading(true);
      const res = await getUserById(parsed.id);

      if (res.data?.user) {
        const u = res.data.user;
        const p = u.profile || {};
        const prefs = getParsedPreferences(p.partner_preferences);

        setUserData(u);
        if (res.data.stats) {
          setStats(res.data.stats);
        }

        // Initialize form data
        setFormData({
          name: u.name || p.full_name || "",
          age: u.age || calculateAge(p.date_of_birth) || 24,
          city: p.city || "Noida",
          state: p.state || "Delhi",
          country: p.country || "India",
          education: prefs.education || "Delhi University",
          profession: prefs.profession || "Product Designer at Google",
          height: prefs.height || `5'5" (165 cm)`,
          about_me:
            p.about_me ||
            "I'm a cheerful person who loves exploring new places, good food, and meaningful conversations. Looking to meet genuine people and see where it goes.",
          smoking: prefs.lifestyle?.smoking || "Sometimes",
          drinking: prefs.lifestyle?.drinking || "Socially",
          diet: prefs.lifestyle?.diet || "Vegetarian",
          pets: prefs.lifestyle?.pets || "Dog Lover",
          selectedInterests: u.interest
            ? typeof u.interest === "string"
              ? u.interest.startsWith("[")
                ? JSON.parse(u.interest)
                : u.interest.split(",").map((s) => s.trim())
              : u.interest
            : ["Travel", "Music", "Food", "Photography"],
        });
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle Avatar Image Upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !userData?.id) return;

    try {
      setUploadingAvatar(true);
      const fd = new FormData();
      fd.append("profile", file);

      const uploadRes = await uploadProfileImage(fd);
      const imageUrl = uploadRes.data?.url || uploadRes.data?.path;

      if (imageUrl) {
        // Save to DB
        const updateRes = await updateUserProfile(userData.id, {
          profile_image: imageUrl,
        });

        // Update local storage so navbar reflects it
        const saved = JSON.parse(localStorage.getItem("user") || "{}");
        saved.profile_image = imageUrl;
        localStorage.setItem("user", JSON.stringify(saved));

        await fetchUserProfile();
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setUploadingAvatar(false);
    }
  };



  // Save About Me directly inline
  const handleSaveAbout = async () => {
    if (!userData?.id) return;
    try {
      setSavingSection("about");
      await updateUserProfile(userData.id, {
        about_me: formData.about_me,
      });
      await fetchUserProfile();
      setIsEditingAbout(false);
    } catch (err) {
      console.error("Failed to update about me:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setSavingSection(null);
    }
  };

  // Save Basic Information directly inline
  const handleSaveBasic = async () => {
    if (!userData?.id) return;
    try {
      setSavingSection("basic");
      const payload = {
        name: formData.name,
        age: Number(formData.age) || null,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        education: formData.education,
        profession: formData.profession,
        height: formData.height,
      };
      await updateUserProfile(userData.id, payload);

      const saved = JSON.parse(localStorage.getItem("user") || "{}");
      saved.name = formData.name;
      localStorage.setItem("user", JSON.stringify(saved));

      await fetchUserProfile();
      setIsEditingBasic(false);
    } catch (err) {
      console.error("Failed to update basic info:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setSavingSection(null);
    }
  };

  // Save Lifestyle directly inline
  const handleSaveLifestyle = async () => {
    if (!userData?.id) return;
    try {
      setSavingSection("lifestyle");
      await updateUserProfile(userData.id, {
        lifestyle: {
          smoking: formData.smoking,
          drinking: formData.drinking,
          diet: formData.diet,
          pets: formData.pets,
        },
      });
      await fetchUserProfile();
      setIsEditingLifestyle(false);
    } catch (err) {
      console.error("Failed to update lifestyle:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setSavingSection(null);
    }
  };

  // Derived display values
  const parsedPrefs = getParsedPreferences(userData?.profile?.partner_preferences);
  const displayName = userData?.name || userData?.profile?.full_name || "User";
  const displayAge = userData?.age || calculateAge(userData?.profile?.date_of_birth) || 24;
  const displayLocation =
    [userData?.profile?.city, userData?.profile?.country]
      .filter(Boolean)
      .join(", ") || "Noida, India";
  const displayEducation =
    parsedPrefs.education || "Delhi University";
  const displayProfession =
    parsedPrefs.profession || "Product Designer at Google";
  const displayHeight =
    parsedPrefs.height || `5'5" (165 cm)`;
  const displayAboutMe =
    userData?.profile?.about_me ||
    "I'm a cheerful person who loves exploring new places, good food, and meaningful conversations. Looking to meet genuine people and see where it goes.";
  const displayAvatar =
    userData?.profile_image || userData?.profile?.profile_picture || rheaImg;
  const displayCover =
    parsedPrefs.cover_photo ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

  const lifestyleData = parsedPrefs.lifestyle || {
    smoking: "Never",
    drinking: "Socially",
    diet: "Vegetarian",
    pets: "Dog Lover",
  };



  const availableInterests = [
    { name: "Travel", icon: Plane },
    { name: "Music", icon: Music },
    { name: "Food", icon: Utensils },
    { name: "Photography", icon: Camera },
    { name: "Fitness", icon: Dumbbell },
    { name: "Reading", icon: BookOpen },
    { name: "Nature", icon: Leaf },
    { name: "Pets", icon: PawPrint },
  ];

  const renderInterestIcon = (Icon) => {
    if (!Icon) return null;
    if (typeof Icon === "string") return <span>{Icon}</span>;
    return <Icon className="w-4 h-4 shrink-0" />;
  };

  if (loading) {
    return (
      <DashboardLayout activeTab="profile">
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-9 h-9 text-[#FF2D72] animate-spin" />
          <p className="text-xs font-bold text-slate-500">
            Loading profile from database...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="profile">
      <div className="w-full space-y-6 animate-fadeIn pb-12">
        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={avatarInputRef}
          onChange={handleAvatarChange}
          accept="image/*"
          className="hidden"
        />
        {/* 1. HERO PROFILE CARD WITH COVER PHOTO & AVATAR */}
        <div className="bg-[#FFFFFF] rounded-3xl overflow-hidden border border-slate-200/80 relative shadow-xs">
          {/* Cover Banner */}
          <div className="relative h-48 sm:h-56 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 overflow-hidden">
            <img
              src={displayCover}
              alt="Cover Header"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>

          {/* Header Profile Content */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
              {/* Avatar with Camera Button */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-[#FFFFFF] shrink-0 shadow-lg">
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-full h-full rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-[#FFFFFF] flex items-center justify-center shadow-md transition-colors cursor-pointer border-2 border-[#FFFFFF]"
                  title="Change Profile Photo"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Edit Profile Button */}
              <button
                type="button"
                onClick={() => {
                  setIsEditingBasic(true);
                  const el = document.getElementById("basic-info-card");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="self-start sm:self-end px-5 py-2.5 rounded-full border-2 border-[#FF2D72] text-[#FF2D72] hover:bg-[#FFE7F0] font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* User Info Details */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-black text-[#17151A]">
                  {displayName}, {displayAge}
                </h2>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 flex-wrap pt-0.5">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{displayEducation}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{displayLocation}</span>
                </span>
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-[#F3E8FF]/40 border border-[#F3E8FF] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-[#7C3AED]" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#17151A] block leading-tight">
                    {stats.likesReceived ?? 0}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-500">
                      Likes Received
                    </span>
                  
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FEF3C7]/40 border border-[#FEF3C7] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-[#F59E0B]" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#17151A] block leading-tight">
                    {stats.matches ?? 0}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-500">
                      Matches & Super Likes
                    </span>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN BODY SECTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT SUB-COLUMN (7 / 12) */}
          <div className="md:col-span-7 space-y-6">
            {/* CARD 1: ABOUT ME */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </span>
                  <span>About Me</span>
                </h3>
                {isEditingAbout ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          about_me: userData?.profile?.about_me || "",
                        }));
                        setIsEditingAbout(false);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={savingSection === "about"}
                      onClick={handleSaveAbout}
                      className="text-xs font-bold bg-[#FF2D72] hover:bg-[#e02062] text-white px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {savingSection === "about" ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      <span>Save</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingAbout(true)}
                    className="text-xs font-bold text-slate-500 hover:text-[#FF2D72] px-3 py-1 rounded-full border border-slate-200 hover:border-[#FFE7F0] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditingAbout ? (
                <div className="space-y-2 pt-1">
                  <textarea
                    rows={4}
                    value={formData.about_me}
                    onChange={(e) =>
                      setFormData({ ...formData, about_me: e.target.value })
                    }
                    placeholder="Tell matches about yourself..."
                    className="w-full p-3.5 rounded-2xl border border-slate-200 focus:border-[#FF2D72] focus:ring-2 focus:ring-[#FFE7F0] text-xs font-semibold text-slate-700 outline-none leading-relaxed resize-none shadow-2xs"
                  />
                </div>
              ) : (
                <p className="text-xs font-semibold text-slate-600 leading-relaxed whitespace-pre-line">
                  {displayAboutMe}
                </p>
              )}
            </div>

            {/* CARD 2: INTERESTS */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span>Interests</span>
                </h3>
                <span className="text-[11px] font-bold text-slate-400">
                  Tap chips to toggle
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {availableInterests.map((item, idx) => {
                  const isSelected = formData.selectedInterests?.includes(
                    item.name
                  );
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const current = formData.selectedInterests || [];
                        const updated = current.includes(item.name)
                          ? current.filter((i) => i !== item.name)
                          : [...current, item.name];
                        setFormData((prev) => ({
                          ...prev,
                          selectedInterests: updated,
                        }));
                        updateUserProfile(userData.id, { interest: updated });
                      }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border shadow-2xs ${
                        isSelected
                          ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] shadow-xs scale-[1.02]"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        {renderInterestIcon(item.icon)}
                      </span>
                      <span>{item.name}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#FF2D72] text-white flex items-center justify-center text-[10px] font-black">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Any additional interests selected by user not in predefined list */}
                {formData.selectedInterests
                  ?.filter(
                    (name) => !availableInterests.some((ai) => ai.name === name)
                  )
                  .map((name, idx) => (
                    <button
                      key={`custom-${idx}`}
                      type="button"
                      onClick={() => {
                        const updated = (
                          formData.selectedInterests || []
                        ).filter((i) => i !== name);
                        setFormData((prev) => ({
                          ...prev,
                          selectedInterests: updated,
                        }));
                        updateUserProfile(userData.id, { interest: updated });
                      }}
                      className="px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] shadow-xs"
                    >
                      <span className="text-base">✨</span>
                      <span>{name}</span>
                      <span className="w-4 h-4 rounded-full bg-[#FF2D72] text-white flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT SUB-COLUMN (5 / 12) */}
          <div className="md:col-span-5 space-y-6">
            {/* CARD 3: BASIC INFORMATION */}
            <div id="basic-info-card" className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4" />
                  </span>
                  <span>Basic Information</span>
                </h3>
                {isEditingBasic ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          name: userData?.name || userData?.profile?.full_name || "",
                          age: userData?.age || 25,
                          city: userData?.profile?.city || "Noida",
                          country: userData?.profile?.country || "India",
                          education: parsedPrefs.education || "Delhi University",
                          profession: parsedPrefs.profession || "Product Designer at Google",
                          height: parsedPrefs.height || `5'5" (165 cm)`,
                        }));
                        setIsEditingBasic(false);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={savingSection === "basic"}
                      onClick={handleSaveBasic}
                      className="text-xs font-bold bg-[#FF2D72] hover:bg-[#e02062] text-white px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {savingSection === "basic" ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      <span>Save</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingBasic(true)}
                    className="text-xs font-bold text-slate-500 hover:text-[#FF2D72] px-3 py-1 rounded-full border border-slate-200 hover:border-[#FFE7F0] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditingBasic ? (
                <div className="space-y-3 text-xs font-semibold text-slate-700 pt-1">
                  {/* Name */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2 shrink-0">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Name</span>
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-44 sm:w-52 text-right px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] focus:ring-1 focus:ring-[#FFE7F0] font-extrabold text-[#17151A] outline-none"
                    />
                  </div>

                  {/* Age */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2 shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                      <span>Age</span>
                    </span>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-24 text-right px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] focus:ring-1 focus:ring-[#FFE7F0] font-extrabold text-[#17151A] outline-none"
                    />
                  </div>

                  {/* Location (City & Country) */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2 shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Location</span>
                    </span>
                    <div className="flex items-center gap-1.5 w-44 sm:w-52">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-1/2 text-right px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] focus:ring-1 focus:ring-[#FFE7F0] font-extrabold text-[#17151A] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-1/2 text-right px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] focus:ring-1 focus:ring-[#FFE7F0] font-extrabold text-[#17151A] outline-none"
                      />
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2 shrink-0">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>Education</span>
                    </span>
                    <input
                      type="text"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-44 sm:w-52 text-right px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] focus:ring-1 focus:ring-[#FFE7F0] font-extrabold text-[#17151A] outline-none"
                    />
                  </div>

                  {/* Profession */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2 shrink-0">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profession</span>
                    </span>
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-44 sm:w-52 text-right px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] focus:ring-1 focus:ring-[#FFE7F0] font-extrabold text-[#17151A] outline-none"
                    />
                  </div>

                  {/* Height */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2 shrink-0">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      <span>Height</span>
                    </span>
                    <input
                      type="text"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-32 text-right px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] focus:ring-1 focus:ring-[#FFE7F0] font-extrabold text-[#17151A] outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs font-semibold text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Name</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {displayName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                      <span>Age</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {displayAge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Location</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {displayLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>Education</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {displayEducation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profession</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {displayProfession}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      <span>Height</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {displayHeight}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 4: LIFESTYLE */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </span>
                  <span>Lifestyle</span>
                </h3>
                {isEditingLifestyle ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          smoking: lifestyleData.smoking || "Never",
                          drinking: lifestyleData.drinking || "Socially",
                          diet: lifestyleData.diet || "Vegetarian",
                          pets: lifestyleData.pets || "Dog Lover",
                        }));
                        setIsEditingLifestyle(false);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={savingSection === "lifestyle"}
                      onClick={handleSaveLifestyle}
                      className="text-xs font-bold bg-[#FF2D72] hover:bg-[#e02062] text-white px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {savingSection === "lifestyle" ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      <span>Save</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingLifestyle(true)}
                    className="text-xs font-bold text-slate-500 hover:text-[#FF2D72] px-3 py-1 rounded-full border border-slate-200 hover:border-[#FFE7F0] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditingLifestyle ? (
                <div className="space-y-3 text-xs font-semibold text-slate-700 pt-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🚬</span>
                      <span>Smoking</span>
                    </span>
                    <select
                      value={formData.smoking}
                      onChange={(e) => setFormData({ ...formData, smoking: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] bg-white font-extrabold text-[#17151A] outline-none cursor-pointer"
                    >
                      <option value="Never">Never</option>
                      <option value="Sometimes">Sometimes</option>
                      <option value="Regularly">Regularly</option>
                      <option value="Trying to quit">Trying to quit</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🍷</span>
                      <span>Drinking</span>
                    </span>
                    <select
                      value={formData.drinking}
                      onChange={(e) => setFormData({ ...formData, drinking: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] bg-white font-extrabold text-[#17151A] outline-none cursor-pointer"
                    >
                      <option value="Never">Never</option>
                      <option value="Socially">Socially</option>
                      <option value="Frequently">Frequently</option>
                      <option value="Teetotaler">Teetotaler</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🥗</span>
                      <span>Diet</span>
                    </span>
                    <select
                      value={formData.diet}
                      onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] bg-white font-extrabold text-[#17151A] outline-none cursor-pointer"
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Eggetarian">Eggetarian</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🐾</span>
                      <span>Pets</span>
                    </span>
                    <select
                      value={formData.pets}
                      onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 focus:border-[#FF2D72] bg-white font-extrabold text-[#17151A] outline-none cursor-pointer"
                    >
                      <option value="Dog Lover">Dog Lover</option>
                      <option value="Cat Lover">Cat Lover</option>
                      <option value="Both Dogs & Cats">Both Dogs & Cats</option>
                      <option value="No Pets">No Pets</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs font-semibold text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🚬</span>
                      <span>Smoking</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {lifestyleData.smoking || "Never"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🍷</span>
                      <span>Drinking</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {lifestyleData.drinking || "Socially"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🥗</span>
                      <span>Diet</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {lifestyleData.diet || "Vegetarian"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span>🐾</span>
                      <span>Pets</span>
                    </span>
                    <span className="font-extrabold text-[#17151A]">
                      {lifestyleData.pets || "None"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
