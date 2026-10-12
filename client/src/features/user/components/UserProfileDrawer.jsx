import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  MessageCircle,
  ShieldAlert,
  User,
  Dumbbell,
  Utensils,
  Wine,
  Cigarette,
  Sparkles,
  Check,
  Calendar,
  Lock,
} from "lucide-react";
import { getImageUrl } from "../../../services/uploadServices.js";

export default function UserProfileDrawer({
  isOpen,
  onClose,
  userData,
  isMatched = false,
  isReceived = false,
  isSent = false,
  onChatNow,
  onMatchBack,
  onLike,
  onReport,
  actionLoading = false,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !userData) return null;

  const user = userData.user || userData.raw || userData;
  const profile = user.profile || {};

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const name = profile.full_name || user.name || "Member";
  const age = user.age || calculateAge(profile.date_of_birth) || null;
  const image = getImageUrl(profile.profile_picture || user.profile_image || user.img || null);
  const gender = profile.gender || user.gender || "";

  let prefs = {};
  if (profile.partner_preferences) {
    if (typeof profile.partner_preferences === "object") {
      prefs = profile.partner_preferences;
    } else if (typeof profile.partner_preferences === "string") {
      try {
        prefs = JSON.parse(profile.partner_preferences);
      } catch (_) {
        prefs = {};
      }
    }
  }

  let interests = [];
  if (user.interest) {
    try {
      const parsed = typeof user.interest === "string" ? JSON.parse(user.interest) : user.interest;
      if (Array.isArray(parsed)) interests = parsed.filter(Boolean);
      else if (typeof parsed === "string")
        interests = parsed.split(",").map((s) => s.trim()).filter(Boolean);
    } catch (_) {
      if (typeof user.interest === "string") {
        interests = user.interest.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
  }
  if (interests.length === 0 && Array.isArray(user.interests)) {
    interests = user.interests.filter(Boolean);
  }
  if (interests.length === 0 && Array.isArray(prefs.interests)) {
    interests = prefs.interests.filter(Boolean);
  }

  const profession = prefs.profession || profile.profession || user.profession || "";
  const education = prefs.education || profile.education || user.education || "";
  const height = prefs.height || profile.height || user.height || "";
  const bio = profile.about_me || user.bio || "";
  const relationshipGoal = prefs.relationship_goal || prefs.relationship_preference || user.relationship_preference || "";
  const lifestyle = prefs.lifestyle || user.lifestyle || {};

  const locationParts = [profile.city || user.city, profile.state || user.state, profile.country || user.country].filter(Boolean);
  const locationString = user.location || locationParts.join(", ");

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-fadeIn cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col z-[10000] animate-drawer-in overflow-hidden border-l border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-label={`${name}'s Profile Details`}
      >
        <div className="px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-black text-slate-800 tracking-tight">
              Profile Overview
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onReport && (
              <button
                type="button"
                onClick={() => {
                  onReport({ id: user.id, name, img: image });
                }}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200/80"
                title="Report User"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>Report</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none overscroll-contain">
          <div className="relative h-72 sm:h-80 w-full bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center">
            {image ? (
              <>
                {/* Blurred backdrop so no awkward black empty spaces appear */}
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60 pointer-events-none"
                />
                {/* Uncropped full image */}
                <img
                  src={image}
                  alt={`${name}${age ? `, ${age}` : ""} profile details on LoveConnect`}
                  width="480"
                  height="320"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full h-full object-contain object-center drop-shadow-md"
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#17151A] via-[#2D1B36] to-[#17151A] text-white">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] flex items-center justify-center text-4xl font-black text-white shadow-xl">
                  {name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              {isMatched && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/95 backdrop-blur-md text-white text-xs font-black flex items-center gap-1.5 shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Mutual Match</span>
                </span>
              )}
              {isReceived && !isMatched && (
                <span className="px-3 py-1 rounded-full bg-[#FF2D72]/95 backdrop-blur-md text-white text-xs font-black flex items-center gap-1.5 shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Likes You</span>
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-5 right-5 z-20 text-white">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-2xl sm:text-3xl font-black drop-shadow-md">
                  {name}
                  {age ? `, ${age}` : ""}
                </h3>
                {user.status === "active" && (
                  <span
                    className="w-5 h-5 rounded-full bg-[#0095F6] text-white flex items-center justify-center text-[10px] font-black shadow-xs shrink-0"
                    title="Active User"
                  >
                    ✓
                  </span>
                )}
              </div>
              {locationString && (
                <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 mt-1 font-medium drop-shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                  <span className="truncate">{locationString}</span>
                </p>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {relationshipGoal && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Looking For
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#17151A]">
                    {relationshipGoal}
                  </p>
                </div>
              </div>
            )}

            {bio ? (
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  About Me
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  "{bio}"
                </p>
              </div>
            ) : null}

            {(profession || education) && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Work & Education
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {profession && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#FF2D72] flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Profession
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-[#17151A] truncate">
                          {profession}
                        </p>
                      </div>
                    </div>
                  )}

                  {education && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Education
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-[#17151A] truncate">
                          {education}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(gender || height) && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Basics
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {gender && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#FF2D72] flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Gender
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-[#17151A] capitalize truncate">
                          {gender}
                        </p>
                      </div>
                    </div>
                  )}

                  {height && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Height
                        </p>
                        <p className="text-xs sm:text-sm font-extrabold text-[#17151A] truncate">
                          {height}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(lifestyle.diet || lifestyle.drinking || lifestyle.smoking || lifestyle.workout) && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Lifestyle & Habits
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {lifestyle.diet && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2.5">
                      <Utensils className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Diet</p>
                        <p className="text-xs font-bold text-slate-700 truncate">{lifestyle.diet}</p>
                      </div>
                    </div>
                  )}
                  {lifestyle.drinking && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2.5">
                      <Wine className="w-4 h-4 text-purple-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Drinking</p>
                        <p className="text-xs font-bold text-slate-700 truncate">{lifestyle.drinking}</p>
                      </div>
                    </div>
                  )}
                  {lifestyle.smoking && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2.5">
                      <Cigarette className="w-4 h-4 text-amber-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Smoking</p>
                        <p className="text-xs font-bold text-slate-700 truncate">{lifestyle.smoking}</p>
                      </div>
                    </div>
                  )}
                  {lifestyle.workout && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2.5">
                      <Dumbbell className="w-4 h-4 text-rose-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Workout</p>
                        <p className="text-xs font-bold text-slate-700 truncate">{lifestyle.workout}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {interests.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Interests & Passions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-pink-50 text-[#FF2D72] border border-pink-100 font-bold text-xs shadow-2xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 shrink-0 flex items-center gap-3">
          {isMatched ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onChatNow) onChatNow(user, name);
              }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat With {name}</span>
            </button>
          ) : isReceived ? (
            <button
              type="button"
              onClick={() => {
                if (onMatchBack) onMatchBack(user);
              }}
              disabled={actionLoading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] hover:brightness-105 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Match Back with {name}</span>
            </button>
          ) : onLike ? (
            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                onClick={() => onLike(user)}
                disabled={actionLoading || isSent}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] hover:brightness-105 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isSent ? "Liked ❤️" : `Like ${name}`}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all cursor-pointer text-center"
            >
              Close Profile
            </button>
          )}
        </div>
      </aside>
    </div>,
    document.body
  );
}
