import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  Users,
  MessageSquare,
  Heart,
  Sparkles,
  MapPin,
  ShieldCheck,
  Send,
  Crown,
  Briefcase,
  Check,
  Loader2,
  RefreshCw,
  User,
  ArrowRight,
  X,
  ShieldAlert,
} from "lucide-react";
import ReportUserModal from "../components/ReportUserModal.jsx";

import { getUserMatches } from "../../../services/matchesServices.js";
import { getAllUsers, getUserById } from "../../../services/usersServices.js";
import { getUserConversations } from "../../../services/chatsServices.js";
import snehaImg from "../../../assets/hero_woman.jpg";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function MatchesPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nearbyPeople, setNearbyPeople] = useState([]);
  const [hasPaidPlan, setHasPaidPlan] = useState(false);
  const [userConversations, setUserConversations] = useState([]);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [reportingUser, setReportingUser] = useState(null);

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  // Check user subscription and load existing conversations
  useEffect(() => {
    if (!currentUser?.id) return;
    getUserById(currentUser.id)
      .then((res) => {
        const subs = res.data?.user?.subscriptions || [];
        const activeSub = subs.find(
          (s) => s.status === "active" && (!s.end_date || new Date(s.end_date) > new Date())
        );
        setHasPaidPlan(Boolean(activeSub && Number(activeSub.plan?.price) > 0));
      })
      .catch(() => {});

    getUserConversations()
      .then((res) => {
        setUserConversations(res.data?.conversations || []);
      })
      .catch(() => {});
  }, [currentUser?.id]);

  // Handle chat initiation with 1 user conversation limit
  const handleStartChat = (match) => {
    if (!hasPaidPlan && userConversations.length >= 1) {
      const isExistingConv = userConversations.some(
        (c) =>
          Number(c.matchId) === Number(match.matchId) ||
          Number(c.match_id) === Number(match.matchId) ||
          Number(c.partnerId) === Number(match.partnerId) ||
          Number(c.user_one_id) === Number(match.partnerId) ||
          Number(c.user_two_id) === Number(match.partnerId)
      );

      if (!isExistingConv) {
        setLimitModalOpen(true);
        return;
      }
    }

    navigate("/messages", {
      state: {
        recipientId: match.partnerId,
        recipientName: match.name,
        matchId: match.matchId,
      },
    });
  };

  // Fetch only THIS user's real matches from the database (User-side only)
  const fetchUserMatches = useCallback(async () => {
    setLoading(true);
    try {
      const [matchesRes, usersRes] = await Promise.all([
        getUserMatches(),
        getAllUsers().catch(() => ({ data: { users: [] } })),
      ]);

      const rawMatches = matchesRes.data?.matches || [];
      const currentUserId = currentUser?.id;

      const formatted = rawMatches
        .map((m) => {
          // Identify the match partner (the other user, not currentUser)
          const isUserOne = m.user_one_id === currentUserId;
          const partner = isUserOne ? m.userTwo : m.userOne;
          if (!partner) return null;

          const p = partner.profile || {};
          let partnerPrefs = {};
          if (p.partner_preferences) {
            try {
              partnerPrefs =
                typeof p.partner_preferences === "string"
                  ? JSON.parse(p.partner_preferences)
                  : p.partner_preferences;
            } catch (_) {}
          }

          // Parse interest tags
          let tags = [];
          if (partner.interest) {
            try {
              const parsed =
                typeof partner.interest === "string"
                  ? JSON.parse(partner.interest)
                  : partner.interest;
              if (Array.isArray(parsed)) tags = parsed.filter(Boolean);
              else if (typeof parsed === "string")
                tags = parsed.split(",").map((s) => s.trim()).filter(Boolean);
            } catch (_) {
              if (typeof partner.interest === "string") {
                tags = partner.interest.split(",").map((s) => s.trim()).filter(Boolean);
              }
            }
          }
          if (tags.length === 0 && partnerPrefs?.interests) {
            tags = Array.isArray(partnerPrefs.interests)
              ? partnerPrefs.interests
              : [];
          }

          const partnerAge =
            partner.age ||
            (p.date_of_birth ? calculateAge(p.date_of_birth) : null) ||
            24;
          const partnerImg = p.profile_picture || partner.profile_image || null;

          let location = "";
          if (p.city && p.country) location = `${p.city}, ${p.country}`;
          else if (p.city) location = p.city;
          else if (p.country) location = p.country;
          else location = "India";

          const profession =
            partnerPrefs.profession || p.about_me?.slice(0, 30) || "Member";

          return {
            matchId: m.id,
            partnerId: partner.id,
            name: p.full_name || partner.name || "Member",
            age: partnerAge,
            profession: profession,
            location: location,
            tags: tags.length > 0 ? tags : ["Connection", "Dating"],
            img: partnerImg,
            matchedAt: m.matched_at,
          };
        })
        .filter(Boolean);

      setMatches(formatted);

      // People Near You sidebar: Real database users excluding self and current matches
      const matchedIds = new Set(formatted.map((x) => x.partnerId));
      matchedIds.add(currentUserId);

      const dbUsers = usersRes.data?.users || [];
      const nearby = dbUsers
        .filter((u) => !matchedIds.has(u.id) && u.status !== "suspended")
        .slice(0, 3)
        .map((u) => {
          const up = u.profile || {};
          const uAge =
            u.age || (up.date_of_birth ? calculateAge(up.date_of_birth) : null) || 24;
          const uImg = up.profile_picture || u.profile_image || null;
          return {
            id: u.id,
            name: up.full_name || u.name || "User",
            age: uAge,
            img: uImg,
          };
        });

      setNearbyPeople(nearby);
    } catch (err) {
      console.error("Error fetching user matches:", err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    fetchUserMatches();
  }, [fetchUserMatches]);

  // Custom Right Sidebar matching design
  const customRightSidebar = (
    <div className="space-y-4 animate-fadeIn">
      {/* GET 10X MORE MATCHES PROMO BANNER CARD */}
      <div className="relative overflow-hidden rounded-2xl border border-[#FFD0E0] bg-gradient-to-br from-[#FFF0F5] via-white to-[#F4F0FF] p-4 sm:p-5 shadow-xs">
        <div className="relative z-10 max-w-[70%] space-y-2">
          <div className="flex items-center gap-1.5 text-[#F59E0B] font-extrabold text-xs sm:text-sm">
            <Crown className="w-4 h-4 fill-[#F59E0B] shrink-0" />
            <span>Get 10x More Matches</span>
          </div>

          <ul className="space-y-1 text-[11px] sm:text-xs font-semibold text-slate-600">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>See who likes you</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>Unlimited likes</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>Advanced filters</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#FF2D72] shrink-0" />
              <span>Highlight your profile</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => navigate("/#pricing")}
            className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] text-xs font-black shadow-xs hover:brightness-105 cursor-pointer transition-all"
          >
            <span>Upgrade to Premium</span>
            <span>→</span>
          </button>
        </div>

        {/* Artwork banner */}
        <img
          src={snehaImg}
          alt="Upgrade Premium"
          className="absolute -right-1 -bottom-1 w-32 h-44 object-cover rounded-xl shadow-xs border-2 border-white pointer-events-none"
        />
      </div>

      {/* PEOPLE NEAR YOU CARD (Real Database Users) */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#17151A] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#FF2D72]" />
            <span>People Near You</span>
          </h4>
          <button
            type="button"
            onClick={() => navigate("/discover")}
            className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
          >
            See All
          </button>
        </div>

        {nearbyPeople.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5 text-center">
            {nearbyPeople.map((person) => (
              <div
                key={person.id}
                onClick={() => navigate("/discover")}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="relative w-full h-20 rounded-xl overflow-hidden shadow-2xs group-hover:scale-105 transition-transform bg-slate-100">
                  {person.img ? (
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 text-[#7C3AED] font-black text-sm">
                      {person.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <span className="text-xs font-extrabold text-[#17151A] truncate w-full pt-1">
                  {person.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold -mt-1">
                  {person.age}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-2">
            Explore more profiles in Discover
          </p>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout activeTab="matches" customRightSidebar={customRightSidebar}>
      <div className="w-full space-y-5 animate-fadeIn">
        {/* 1. PAGE HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#17151A] tracking-tight">
                  Your Matches ({matches.length})
                </h1>
                <button
                  type="button"
                  onClick={fetchUserMatches}
                  disabled={loading}
                  title="Refresh matches"
                  className="p-1 rounded-lg text-slate-400 hover:text-[#FF2D72] hover:bg-slate-50 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Start a conversation with your mutual matches
              </p>
            </div>
          </div>

          {/* Right side banner graphic */}
          <div className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFF0F5] to-[#F4F0FF] border border-[#FFE7F0]">
            <div>
              <span className="block text-xs font-black text-[#FF2D72] italic font-serif">
                It's better together
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                Meaningful conversations start with a hello!
              </span>
            </div>
          </div>
        </div>

        {/* 2. LOADING STATE */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#FF2D72] animate-spin" />
            <p className="text-sm font-bold text-slate-700">Loading your matches...</p>
            <p className="text-xs text-slate-400">Connecting with your matches</p>
          </div>
        ) : matches.length === 0 ? (
          /* 3. EMPTY STATE - USER HAS NO MATCHES YET */
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-xs text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FFE7F0] text-[#FF2D72] mx-auto flex items-center justify-center shadow-inner">
              <Heart className="w-8 h-8 fill-[#FF2D72]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#17151A]">
                No Matches Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
                When you and another member both like each other, they'll show up here as a mutual match so you can start chatting!
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/discover")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-105 transition-all"
            >
              <span>Explore Discover Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* 4. NEW MATCHES (START CHAT) HORIZONTAL AVATARS ROW */}
            <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black text-[#17151A] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </span>
                  <span>New Matches (Start Chat)</span>
                </h3>
              </div>

              <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-1 scrollbar-none">
                {matches.map((match) => (
                  <div
                    key={match.matchId}
                    onClick={() =>
                      navigate("/messages", {
                        state: {
                          recipientId: match.partnerId,
                          recipientName: match.name,
                        },
                      })
                    }
                    className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-[#FF2D72] group-hover:scale-105 transition-transform shadow-2xs bg-slate-100 overflow-hidden">
                      {match.img ? (
                        <img
                          src={match.img}
                          alt={match.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 text-[#7C3AED] font-black text-base">
                          {match.name?.[0]?.toUpperCase() || "M"}
                        </div>
                      )}
                    </div>
                    <div className="text-center leading-tight">
                      <span className="block text-xs font-extrabold text-[#17151A] group-hover:text-[#FF2D72] transition-colors">
                        {match.name}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {match.age}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. MATCH CARDS LIST */}
            <div className="space-y-3.5">
              {matches.map((match) => (
                <div
                  key={match.matchId}
                  className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#FF2D72]/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Avatar Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-2xs bg-slate-100 border border-slate-100">
                      {match.img ? (
                        <img
                          src={match.img}
                          alt={match.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 text-[#7C3AED] font-black text-2xl">
                          {match.name?.[0]?.toUpperCase() || "M"}
                        </div>
                      )}
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-black text-[#17151A]">
                          {match.name}, {match.age}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          Matched
                        </span>
                      </div>

                      <div className="space-y-0.5 text-xs text-slate-500 font-semibold">
                        <p className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{match.profession}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{match.location}</span>
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {match.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                        {match.tags.length > 4 && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[11px] font-bold">
                            +{match.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() =>
                        setReportingUser({
                          id: match.partnerId,
                          name: match.name,
                          img: match.img,
                        })
                      }
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                      title="Report User"
                    >
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartChat(match)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] font-black text-xs shadow-2xs hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {limitModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-pink-100 relative">
              <button
                type="button"
                onClick={() => setLimitModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Crown className="w-10 h-10 fill-amber-300 text-amber-300" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-[#17151A] tracking-tight">
                  1 User Chat Limit Reached 🔒
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Free Starter plan mein aap sirf <strong>1 user</strong> se hi chat kar sakte hain. Multiple matches ke saath unlimited chats karne ke liye Premium plan upgrade karein!
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  to="/#pricing"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-black text-xs shadow-md shadow-pink-500/30 hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>View Premium Plans</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setLimitModalOpen(false)}
                  className="w-full py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      <ReportUserModal
        isOpen={Boolean(reportingUser)}
        onClose={() => setReportingUser(null)}
        reportedUser={reportingUser}
      />
    </DashboardLayout>
  );
}
