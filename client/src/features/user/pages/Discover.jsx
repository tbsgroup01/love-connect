import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  MapPin,
  Sparkles,
  RotateCcw,
  X,
  Heart,
  Eye,
  ArrowLeft,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  RefreshCw,
  User,
  Wine,
  Cigarette,
  Utensils,
  PawPrint,
  Dumbbell,
  Loader2,
  Check,
  PlayingCardsFan,
} from "lucide-react";

import { getAllUsers, getUserById } from "../../../services/usersServices.js";
import { likeUser } from "../../../services/likesServices.js";

import ananyaImg from "../../../assets/hero_woman.jpg";
import rheaImg from "../../../assets/hero_woman_exact.png";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Discover() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [filterGender, setFilterGender] = useState("all");
  const [filterVerified, setFilterVerified] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [dbProfiles, setDbProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [matchModal, setMatchModal] = useState(null);
  const [profileModal, setProfileModal] = useState(null); 
  const [actionLoading, setActionLoading] = useState(false);

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
      } catch {
        return {};
      }
    }
    return {};
  };

  // Fetch real users from DB via usersServices (ONLY Database Users)
  const fetchDiscoverProfiles = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res.data?.users && Array.isArray(res.data.users)) {
        const currentUserId = currentUser?.id;

        // Strictly real users from database (excluding logged-in user and suspended accounts)
        const realUsers = res.data.users
          .filter((u) => u.id !== currentUserId && u.status !== "suspended")
          .map((u) => {
            const p = u.profile || {};
            const prefs = getParsedPreferences(p.partner_preferences);

            // 1. Interests (STRICT DB ONLY - NO MOCK FALLBACK)
            let parsedInterests = [];
            if (u.interest) {
              try {
                const parsed =
                  typeof u.interest === "string"
                    ? JSON.parse(u.interest)
                    : u.interest;
                if (Array.isArray(parsed)) {
                  parsedInterests = parsed.filter(Boolean);
                } else if (typeof parsed === "string") {
                  parsedInterests = parsed
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                }
              } catch {
                if (typeof u.interest === "string") {
                  parsedInterests = u.interest
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                }
              }
            }

            // 2. Profile Image (STRICT DB ONLY)
            const rawImg = p.profile_picture || u.profile_image || null;

            // 3. Age (STRICT DB ONLY)
            const calculatedAge =
              u.age || (p.date_of_birth ? calculateAge(p.date_of_birth) : null);

            // 4. Gender (STRICT DB ONLY)
            const userGender = (p.gender || u.gender || "").toLowerCase();

            // 5. Location (STRICT DB ONLY)
            let locString = "";
            if (p.city && p.country) locString = `${p.city}, ${p.country}`;
            else if (p.city) locString = p.city;
            else if (p.country) locString = p.country;

            return {
              id: u.id,
              name: p.full_name || u.name || "",
              age: calculatedAge,
              gender: userGender,
              image: rawImg,
              profession: prefs.profession || "",
              education: prefs.education || "",
              location: locString,
              city: p.city || "",
              state: p.state || "",
              country: p.country || "",
              bio: p.about_me || "",
              interests: parsedInterests,
              lifestyle: prefs.lifestyle || null,
              height: prefs.height || "",
              verified: Boolean(u.status === "active"),
              rawUser: u,
            };
          });

        // ONLY DB users are set into state
        setDbProfiles(realUsers);
      } else {
        setDbProfiles([]);
      }
    } catch (err) {
      console.error("Could not fetch real database users:", err);
      setDbProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscoverProfiles();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setProfileModal(null);
        setMatchModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProfiles = dbProfiles.filter((item) => {
    if (filterGender === "women") {
      if (item.gender !== "female" && item.gender !== "woman") return false;
    } else if (filterGender === "men") {
      if (item.gender !== "male" && item.gender !== "man") return false;
    } else if (filterGender === "others") {
      if (item.gender === "female" || item.gender === "male") return false;
    }

    if (filterVerified && !item.verified) {
      return false;
    }
    if (categoryFilter === "verified" && !item.verified) return false;
    if (categoryFilter === "nearby" && item.city && currentUser?.profile?.city) {
      if (
        item.city.toLowerCase() !== currentUser.profile.city.toLowerCase()
      ) {
        return false;
      }
    }

    return true;
  });

  const currentProfile =
    filteredProfiles.length > 0
      ? filteredProfiles[currentIndex % filteredProfiles.length]
      : null;

  const isDeckCompleted =
    filteredProfiles.length > 0 && currentIndex >= filteredProfiles.length;

  const handleAction = async (direction) => {
    if (!currentProfile || actionLoading) return;

    setSwipeDirection(direction);
    setActionLoading(true);

    try {
      if (direction === "right" || direction === "up") {
        if (currentProfile?.id) {
          try {
            const res = await likeUser(currentProfile.id);
            if (res.data?.matched) {
              setMatchModal(currentProfile);
            }
          } catch {
            // Silently handle if already liked or network error
          }
        }
      }
    } finally {
      setTimeout(() => {
        setSwipeDirection(null);
        setActionLoading(false);
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handleRewind = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetDeck = () => {
    setCurrentIndex(0);
    fetchDiscoverProfiles();
  };

  const handleViewProfile = async (profile) => {
    if (!profile) return;
    setProfileModal(profile);
    try {
      const res = await getUserById(profile.id);
      if (res.data?.success && res.data.user) {
        const u = res.data.user;
        const p = u.profile || {};
        const prefs = getParsedPreferences(p.partner_preferences);
        const stats = res.data.stats || {};

        let parsedInterests = [];
        if (u.interest) {
          try {
            const parsed =
              typeof u.interest === "string" ? JSON.parse(u.interest) : u.interest;
            if (Array.isArray(parsed)) parsedInterests = parsed.filter(Boolean);
            else if (typeof parsed === "string")
              parsedInterests = parsed
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
          } catch {
            if (typeof u.interest === "string")
              parsedInterests = u.interest
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
          }
        }

        const calculatedAge =
          u.age || (p.date_of_birth ? calculateAge(p.date_of_birth) : null);
        let locString = "";
        if (p.city && p.country) locString = `${p.city}, ${p.country}`;
        else if (p.city) locString = p.city;
        else if (p.country) locString = p.country;

        setProfileModal({
          ...profile,
          name: p.full_name || u.name || profile.name,
          age: calculatedAge ?? profile.age,
          gender: (p.gender || u.gender || profile.gender || "").toLowerCase(),
          image: p.profile_picture || u.profile_image || profile.image,
          profession: prefs.profession || profile.profession || "",
          education: prefs.education || profile.education || "",
          location: locString || profile.location,
          city: p.city || profile.city || "",
          state: p.state || profile.state || "",
          country: p.country || profile.country || "",
          bio: p.about_me || profile.bio || "",
          interests:
            parsedInterests.length > 0 ? parsedInterests : profile.interests,
          lifestyle: prefs.lifestyle || profile.lifestyle,
          height: prefs.height || profile.height || "",
          verified: Boolean(u.status === "active"),
          stats: stats,
          rawUser: u,
        });
      }
    } catch (err) {
      console.error("Could not fetch user details:", err);
    }
  };

  return (
    <DashboardLayout
      activeTab="discover"
      filterGender={filterGender}
      setFilterGender={setFilterGender}
      filterVerified={filterVerified}
      setFilterVerified={setFilterVerified}
    >
      <div className="w-full flex flex-col items-center animate-fadeIn select-none">
        {/* HEADER SECTION */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#17151A] tracking-tight flex items-center gap-2">
              <span>Discover</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF2D72] animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Find amazing genuine people around you
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
            {[
              { id: "all", label: "All" },
              { id: "nearby", label: "Nearby" },
              { id: "verified", label: "Verified" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategoryFilter(cat.id);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === cat.id
                    ? "bg-[#FF2D72] text-white shadow-2xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="w-full max-w-[440px] h-[370px] sm:h-[450px] md:h-[520px] rounded-2xl sm:rounded-[32px] bg-white border border-slate-200/80 shadow-md flex flex-col items-center justify-center space-y-3 my-1 sm:my-2">
            <Loader2 className="w-10 h-10 text-[#FF2D72] animate-spin" />
            <p className="text-xs font-bold text-slate-500">
              Loading profiles from database...
            </p>
          </div>
        ) : filteredProfiles.length === 0 || isDeckCompleted ? (
          /* ALL PROFILES SWIPED / EMPTY STATE */
          <div className="w-full max-w-[440px] h-[370px] sm:h-[450px] md:h-[520px] rounded-2xl sm:rounded-[32px] bg-white border border-slate-200/80 shadow-md flex flex-col items-center justify-center p-6 text-center space-y-4 my-1 sm:my-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FF2D72]/15 to-[#7C3AED]/15 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
              ✨
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#17151A]">
                No More Profiles Found
              </h3>
            </div>
            <button
              type="button"
              onClick={handleResetDeck}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-extrabold text-xs shadow-md shadow-pink-500/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Discover Again</span>
            </button>
          </div>
        ) : profileModal ? (
          /* DETAILED FULL PROFILE VIEW (CONTAINED RIGHT IN THAT CENTER AREA) */
          <div className="relative w-full max-w-[440px] h-[440px] sm:h-[540px] md:h-[660px] bg-white rounded-2xl sm:rounded-[32px] border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col my-1 sm:my-2 animate-fadeIn select-text">
            {/* Top Bar with Back & Close */}
            <div className="px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-20 shrink-0">
              <button
                type="button"
                onClick={() => setProfileModal(null)}
                className="flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-[#FF2D72] px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#FF2D72]" />
                <span>Back to Swiping</span>
              </button>
              <button
                type="button"
                onClick={() => setProfileModal(null)}
                aria-label="Close profile view"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Cover Photo & Avatar Header */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden shrink-0">
                {profileModal.image ? (
                  <img
                    src={profileModal.image}
                    alt={profileModal.name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#17151A] via-[#2D1B36] to-[#17151A] text-white">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] flex items-center justify-center text-3xl font-black text-white shadow-xl">
                      {(profileModal.name || "U").charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black drop-shadow-md">
                      {profileModal.name}
                      {profileModal.age ? `, ${profileModal.age}` : ""}
                    </h3>
                    {profileModal.verified && (
                      <span className="w-5 h-5 rounded-full bg-[#0095F6] text-white flex items-center justify-center text-[10px] font-black shadow-xs shrink-0">
                        ✓
                      </span>
                    )}
                  </div>
                  {profileModal.location ? (
                    <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span className="truncate">{profileModal.location}</span>
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Profile Details Content */}
              <div className="p-4 sm:p-5 space-y-4 text-left">
                {/* About Me */}
                {profileModal.bio ? (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                      About Me
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      {profileModal.bio}
                    </p>
                  </div>
                ) : null}

                {/* Work & Education */}
                {(profileModal.profession || profileModal.education) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {profileModal.profession && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#FF2D72] flex items-center justify-center shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Profession
                          </p>
                          <p className="text-xs sm:text-sm font-extrabold text-[#17151A] truncate">
                            {profileModal.profession}
                          </p>
                        </div>
                      </div>
                    )}

                    {profileModal.education && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Education
                          </p>
                          <p className="text-xs sm:text-sm font-extrabold text-[#17151A] truncate">
                            {profileModal.education}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Gender & Height */}
                {(profileModal.gender || profileModal.height) && (
                  <div className="grid grid-cols-2 gap-2.5">
                    {profileModal.gender && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#FF2D72] flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Gender
                          </p>
                          <p className="text-xs sm:text-sm font-extrabold text-[#17151A] capitalize truncate">
                            {profileModal.gender}
                          </p>
                        </div>
                      </div>
                    )}

                    {profileModal.height && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0">
                          <Dumbbell className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Height
                          </p>
                          <p className="text-xs sm:text-sm font-extrabold text-[#17151A] truncate">
                            {profileModal.height}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Lifestyle & Details */}
                {profileModal.lifestyle && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                      Lifestyle & Habits
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {profileModal.lifestyle.diet && (
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 min-w-0">
                          <Utensils className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="font-semibold text-slate-700 text-xs truncate">
                            {profileModal.lifestyle.diet}
                          </span>
                        </div>
                      )}
                      {profileModal.lifestyle.drinking && (
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 min-w-0">
                          <Wine className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                          <span className="font-semibold text-slate-700 text-xs truncate">
                            {profileModal.lifestyle.drinking}
                          </span>
                        </div>
                      )}
                      {profileModal.lifestyle.smoking && (
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 min-w-0">
                          <Cigarette className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="font-semibold text-slate-700 text-xs truncate">
                            {profileModal.lifestyle.smoking}
                          </span>
                        </div>
                      )}
                      {profileModal.lifestyle.pets && (
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 min-w-0">
                          <PawPrint className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="font-semibold text-slate-700 text-xs truncate" title={profileModal.lifestyle.pets}>
                            {profileModal.lifestyle.pets}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Passions & Interests */}
                {Array.isArray(profileModal.interests) &&
                  profileModal.interests.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                        Interests & Passions
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {profileModal.interests.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-full bg-pink-50 text-[#FF2D72] text-xs font-bold border border-pink-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-3 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center gap-2.5 shrink-0 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setProfileModal(null);
                  handleAction("left");
                }}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <X className="w-4 h-4" />
                <span>Pass</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileModal(null);
                  handleAction("right");
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-extrabold text-xs shadow-md shadow-pink-500/25 hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Connect & Like</span>
              </button>
            </div>
          </div>
        ) : (
          /* PROFILE SWIPING DECK */
          <div className="relative w-full max-w-[440px] h-[360px] sm:h-[440px] md:h-[520px] flex items-center justify-center my-1 sm:my-2">
            {/* Background Layer Stacks */}
            <div className="absolute w-[92%] h-[330px] sm:h-[410px] md:h-[480px] bg-slate-200/70 rounded-2xl sm:rounded-[32px] transform -rotate-6 scale-95 opacity-50 shadow-md blur-[1px] pointer-events-none" />
            <div className="absolute w-[95%] h-[345px] sm:h-[425px] md:h-[500px] bg-slate-300/60 rounded-2xl sm:rounded-[32px] transform rotate-3 scale-98 opacity-75 shadow-lg pointer-events-none" />

            {/* Top Active Profile Card */}
            <div
              className={`relative w-full h-[360px] sm:h-[440px] md:h-[520px] rounded-2xl sm:rounded-[32px] overflow-hidden bg-[#17151A] shadow-2xl shadow-purple-950/20 border-2 border-[#FFFFFF]/90 transition-all duration-300 ${
                swipeDirection === "right"
                  ? "translate-x-full rotate-12 opacity-0"
                  : swipeDirection === "left"
                    ? "-translate-x-full -rotate-12 opacity-0"
                    : swipeDirection === "up"
                      ? "-translate-y-full scale-105 opacity-0"
                      : "translate-x-0 rotate-0 opacity-100"
              }`}
            >
              {/* Profile Main Picture from Database or Initial Card */}
              {currentProfile.image ? (
                <img
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#17151A] via-[#2D1B36] to-[#17151A] text-white">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-xl shadow-pink-500/20">
                    {(currentProfile.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="mt-2 sm:mt-3 text-sm sm:text-base font-bold text-slate-200">
                    {currentProfile.name}
                  </span>
                </div>
              )}

              {/* Ambient Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17151A]/95 via-[#17151A]/40 to-transparent pointer-events-none" />

              {/* Profile Card Bottom Info (STRICT DB ONLY) */}
              <div
                className="absolute bottom-0 inset-x-0 p-3 sm:p-5 md:p-6 text-[#FFFFFF] z-20 space-y-1 sm:space-y-2 cursor-pointer"
                onClick={() => handleViewProfile(currentProfile)}
                title="Click to view full profile"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight drop-shadow-md">
                      {currentProfile.name}
                      {currentProfile.age ? `, ${currentProfile.age}` : ""}
                    </h2>
                    {currentProfile.verified && (
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0095F6] text-[#FFFFFF] flex items-center justify-center text-[9px] sm:text-[10px] font-black shadow-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  {currentProfile.location ? (
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FFFFFF]/20 backdrop-blur-md text-[#FFFFFF] text-[11px] sm:text-xs font-bold border border-[#FFFFFF]/20 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-300" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{currentProfile.location}</span>
                    </span>
                  ) : null}
                </div>

                {/* Profession & Education (Only show if present in DB) */}
                <div className="space-y-0.5 text-[11px] sm:text-xs text-slate-200 font-medium">
                  {currentProfile.profession ? (
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400 shrink-0" />
                      <span className="truncate">
                        {currentProfile.profession}
                      </span>
                    </div>
                  ) : null}
                  {currentProfile.education ? (
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400 shrink-0" />
                      <span className="truncate">
                        {currentProfile.education}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Interest Chips (Only show if present in DB) */}
                {Array.isArray(currentProfile.interests) &&
                  currentProfile.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
                      {currentProfile.interests.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#FFFFFF]/15 backdrop-blur-md text-[#FFFFFF] text-[9px] sm:text-[10px] font-bold border border-[#FFFFFF]/15"
                        >
                          {tag}
                        </span>
                      ))}
                      {currentProfile.interests.length > 3 && (
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#FF2D72]/40 backdrop-blur-md text-[#FFFFFF] text-[9px] sm:text-[10px] font-bold border border-[#FF2D72]/40">
                          +{currentProfile.interests.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                {/* Bio (Only show if present in DB) */}
                {currentProfile.bio ? (
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-snug line-clamp-1 sm:line-clamp-2 pt-0.5 sm:pt-1 font-normal">
                    {currentProfile.bio}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BUTTONS CONTROLS (Only visible in swipe deck mode) */}
        {!profileModal && !isDeckCompleted && filteredProfiles.length > 0 && (
          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-2 sm:mt-3 z-30">
            {/* Rewind */}
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={handleRewind}
                disabled={currentIndex === 0}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFFFFF] border border-slate-200/80 text-amber-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Rewind"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-600">Rewind</span>
            </div>

            {/* swip */}
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => handleAction("left")}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFFFFF] border-2 border-slate-200 text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                title="swip"
              >
                <PlayingCardsFan className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-600">
                Swip
              </span>
            </div>

            {/* Like */}
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => handleAction("right")}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shadow-xl shadow-pink-500/40 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                title="Like"
              >
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-[#FFFFFF]" />
              </button>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#FF2D72]">Like</span>
            </div>

            {/* View Profile */}
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => handleViewProfile(currentProfile)}
                disabled={!currentProfile}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFFFFF] border-2 border-slate-200 text-[#7C3AED] hover:bg-purple-50 flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title="View Profile"
              >
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#7C3AED]" />
              </button>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-600">
                View Profile
              </span>
            </div>
          </div>
        )}

        {/* MATCH POPUP MODAL */}
        {matchModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-fadeIn"
            onClick={() => setMatchModal(null)}
          >
            <div
              className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border-2 border-[#FF2D72] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl animate-bounce">💖</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#17151A]">
                  It's a Match!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  You and {matchModal.name} liked each other.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 py-2">
                <img
                  src={currentUser?.profile_image || rheaImg}
                  alt="You"
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#FF2D72] shadow-md"
                />

                <img
                  src={matchModal.image}
                  alt={matchModal.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = ananyaImg;
                  }}
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#7C3AED] shadow-md"
                />
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMatchModal(null);
                    navigate("/messages");
                  }}
                  className="w-full py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] font-extrabold text-xs sm:text-sm shadow-md cursor-pointer hover:brightness-105"
                >
                  Send a Message Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMatchModal(null);
                  }}
                  className="w-full py-2.5 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Keep Swiping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
