import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  Lock,
  Crown,
  Sparkles,
  Heart,
  MessageCircle,
  MapPin,
  Flame,
  Loader2,
  Trash2,
  X,
  ArrowRight,
  RefreshCw,
  Check,
  ShieldAlert,
  Eye,
} from "lucide-react";
import ReportUserModal from "../components/ReportUserModal.jsx";
import UserProfileDrawer from "../components/UserProfileDrawer.jsx";
import { getLikes, likeUser, removeLike } from "../../../services/likesServices.js";
import { getUserById } from "../../../services/usersServices.js";
import { getUserConversations } from "../../../services/chatsServices.js";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function LikesPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState("received");
  const [likesList, setLikesList] = useState([]);
  const [counts, setCounts] = useState({ received: 0, sent: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [matchModal, setMatchModal] = useState(null);
  const [hasPaidSubscription, setHasPaidSubscription] = useState(false);
  const [userConversations, setUserConversations] = useState([]);
  const [chatLimitModalOpen, setChatLimitModalOpen] = useState(false);
  const [reportingUser, setReportingUser] = useState(null);
  const [selectedProfileDrawer, setSelectedProfileDrawer] = useState(null);

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  useEffect(() => {
    if (!currentUser?.id) return;
    getUserById(currentUser.id)
      .then((res) => {
        const subs = res.data?.user?.subscriptions || [];
        const activeSub = subs.find(
          (s) => s.status === "active" && (!s.end_date || new Date(s.end_date) > new Date())
        );
        const isPaid = Boolean(activeSub && Number(activeSub.plan?.price) > 0);
        setHasPaidSubscription(isPaid);
      })
      .catch(() => {});

    getUserConversations()
      .then((res) => {
        setUserConversations(res.data?.conversations || []);
      })
      .catch(() => {});
  }, [currentUser?.id]);

  const fetchLikes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLikes({ type: activeSubTab });
      if (res.data?.likes && Array.isArray(res.data.likes)) {
        setLikesList(res.data.likes);
      } else {
        setLikesList([]);
      }
      if (res.data?.counts) {
        setCounts(res.data.counts);
      }
    } catch (err) {
      console.error("Error fetching likes:", err);
      setLikesList([]);
    } finally {
      setLoading(false);
    }
  }, [activeSubTab]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLikeBack = async (targetUser) => {
    if (!targetUser?.id || actionLoadingId) return;
    setActionLoadingId(targetUser.id);
    try {
      const res = await likeUser(targetUser.id);
      if (res.data?.matched) {
        setMatchModal(targetUser);
      }
      setLikesList((prev) =>
        prev.map((item) => {
          const u = item.user;
          if (u?.id === targetUser.id) {
            return { ...item, isMatched: true, hasLikedBack: true };
          }
          return item;
        })
      );
    } catch (err) {
      console.error("Like user error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleUnlike = async (targetUserId) => {
    if (!targetUserId || actionLoadingId) return;
    setActionLoadingId(targetUserId);
    try {
      await removeLike(targetUserId);
      setLikesList((prev) => prev.filter((item) => item.receiver_id !== targetUserId && item.user?.id !== targetUserId));
      setCounts((prev) => ({
        ...prev,
        sent: Math.max(0, prev.sent - 1),
      }));
    } catch (err) {
      console.error("Unlike error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleChatNow = (targetUser, name) => {
    if (!hasPaidSubscription && userConversations.length >= 1) {
      const isExistingConv = userConversations.some(
        (c) =>
          Number(c.partnerId) === Number(targetUser.id) ||
          Number(c.user_one_id) === Number(targetUser.id) ||
          Number(c.user_two_id) === Number(targetUser.id)
      );

      if (!isExistingConv) {
        setChatLimitModalOpen(true);
        return;
      }
    }

    navigate("/messages", {
      state: {
        recipientId: targetUser.id,
        recipientName: name,
      },
    });
  };

  return (
    <DashboardLayout activeTab="likes">
      <section aria-labelledby="likes-heading" className="w-full space-y-5 animate-fadeIn pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-xs">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h1 id="likes-heading" className="text-xl sm:text-2xl font-black text-[#17151A] tracking-tight flex items-center gap-2">
                <span>Likes You</span>
                <span className="text-sm font-extrabold text-[#FF2D72] bg-[#FFE7F0] px-2.5 py-0.5 rounded-full">
                  {counts.received}
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                People who swiped right on your profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchLikes}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold shadow-2xs"
              title="Refresh Likes"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#FF2D72]" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {activeSubTab === "received" && !hasPaidSubscription && (
          <div className="bg-gradient-to-r from-[#FFF0F5] via-white to-[#F4F0FF] p-4 sm:p-5 rounded-2xl border border-[#FFD0E0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FF2D72] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Crown className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#17151A]">
                  Free Starter Plan: 10 Admirers Unlocked!
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {likesList.length > 10
                    ? `Showing 10 admirers. ${likesList.length - 10} more admirers are waiting! Upgrade to Premium to see everyone.`
                    : "You can view up to 10 admirers for free on your Free Starter plan."}
                </p>
              </div>
            </div>

            <Link
              to="/#pricing"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-[#FFFFFF] font-black text-xs shadow-xs hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Upgrade to Premium</span>
            </Link>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200/80 p-4 flex flex-col justify-end space-y-3"
              >
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-9 bg-slate-200 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : likesList.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto my-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-100 to-purple-100 text-[#FF2D72] flex items-center justify-center shadow-inner">
              <Heart className="w-10 h-10 fill-[#FF2D72] stroke-none animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-[#17151A]">
                {activeSubTab === "received" ? "No admirers yet!" : "You haven't liked anyone yet!"}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                {activeSubTab === "received"
                  ? "Don't worry! Keep exploring and swiping right on Discover to increase your profile visibility."
                  : "Browse profiles on Discover and swipe right on people you find interesting to connect."}
              </p>
            </div>
            <Link
              to="/discover"
              className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-extrabold text-xs shadow-md shadow-pink-500/20 hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Explore Discover</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {likesList.map((item, index) => {
              const user = item.user || {};
              const profile = user.profile || {};
              const image = profile.profile_picture || user.profile_image || null;
              const age = user.age || calculateAge(profile.date_of_birth) || null;
              const name = profile.full_name || user.name || "Admirer";
              const location = profile.city
                ? `${profile.city}${profile.country ? `, ${profile.country}` : ""}`
                : profile.country || "";
              const shouldBlur = activeSubTab === "received" && !hasPaidSubscription && index >= 10;
              const isMatched = item.isMatched;

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#FF2D72]/40 transition-all flex flex-col group"
                >
                  <div
                    onClick={() => {
                      if (!shouldBlur) setSelectedProfileDrawer(item);
                    }}
                    className={`relative h-60 w-full overflow-hidden bg-slate-100 ${
                      !shouldBlur ? "cursor-pointer" : ""
                    }`}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`${name}${age ? `, ${age}` : ""} profile on LoveConnect`}
                        width="300"
                        height="240"
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          shouldBlur ? "filter blur-md scale-110" : ""
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#17151A] via-[#2D1B36] to-[#17151A] text-white">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] flex items-center justify-center text-3xl font-black text-white shadow-lg">
                          {name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3.5">
                      <div className="flex items-center justify-between">
                        {shouldBlur ? (
                          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-black flex items-center gap-1 shadow-xs">
                            <Lock className="w-3 h-3 text-amber-300" />
                            <span>Gold</span>
                          </span>
                        ) : isMatched ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                            <Check className="w-3 h-3" />
                            <span>Matched</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-pink-500/80 backdrop-blur-md text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                            <Heart className="w-3 h-3 fill-white" />
                            <span>{activeSubTab === "received" ? "Liked You" : "You Liked"}</span>
                          </span>
                        )}

                        {!shouldBlur && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setReportingUser({
                                id: user.id,
                                name,
                                img: image,
                              });
                            }}
                            className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/80 hover:text-rose-400 transition-colors cursor-pointer border border-white/20"
                            title="Report User"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="text-white space-y-0.5">
                        <h3 className="font-black text-lg drop-shadow-md flex items-center gap-1.5">
                          <span>{shouldBlur ? name.slice(0, 2) + "***" : name}</span>
                          {age ? <span>, {age}</span> : null}
                        </h3>
                        {location ? (
                          <p className="text-xs text-slate-200/90 flex items-center gap-1 font-medium drop-shadow-sm">
                            <MapPin className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                            <span className="truncate">{location}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                    {isMatched ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleChatNow(user, name)}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>Chat Now</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedProfileDrawer(item)}
                          className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all cursor-pointer shrink-0 shadow-2xs group/btn"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                        </button>
                      </>
                    ) : activeSubTab === "received" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleLikeBack(user)}
                          disabled={actionLoadingId === user.id}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] hover:brightness-105 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                        >
                          {actionLoadingId === user.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Heart className="w-4 h-4 fill-white" />
                              <span>Match Back</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            shouldBlur
                              ? navigate("/#pricing")
                              : setSelectedProfileDrawer(item)
                          }
                          className="p-2.5 rounded-xl border border-slate-200 hover:border-pink-300 bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-[#FF2D72] transition-all cursor-pointer shrink-0 shadow-2xs group/btn"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full flex items-center gap-2">
                        <span className="flex-1 py-2 text-center text-xs font-bold text-slate-500 bg-slate-50 rounded-xl">
                          Sent 
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedProfileDrawer(item)}
                          className="p-2 rounded-xl text-slate-500 hover:text-[#7C3AED] hover:bg-purple-50 border border-slate-200 transition-colors cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUnlike(user.id)}
                          disabled={actionLoadingId === user.id}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Unlike user"
                        >
                          {actionLoadingId === user.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {matchModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-pink-100 relative">
              <button
                type="button"
                onClick={() => setMatchModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Sparkles className="w-10 h-10 fill-white" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-black text-[#17151A] tracking-tight">
                  It's a Match! 🎉
                </h2>
                <p className="text-xs text-slate-500">
                  You and{" "}
                  <span className="font-bold text-[#FF2D72]">
                    {matchModal?.profile?.full_name || matchModal?.name || "your match"}
                  </span>{" "}
                  both liked each other!
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const partner = matchModal;
                    setMatchModal(null);
                    if (partner) {
                      handleChatNow(
                        partner,
                        partner?.profile?.full_name || partner?.name || "Match"
                      );
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white font-black text-xs shadow-md shadow-pink-500/30 hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send a Message</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMatchModal(null)}
                  className="w-full py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  Keep Browsing
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {chatLimitModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-pink-100 relative">
              <button
                type="button"
                onClick={() => setChatLimitModalOpen(false)}
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
                  Free Starter plan mein aap sirf <strong>1 user</strong> se hi chat kar sakte hain. Multiple users se chat karne ke liye Premium plan upgrade karein!
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
                  onClick={() => setChatLimitModalOpen(false)}
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

      <UserProfileDrawer
        isOpen={Boolean(selectedProfileDrawer)}
        onClose={() => setSelectedProfileDrawer(null)}
        userData={selectedProfileDrawer?.user || selectedProfileDrawer}
        isMatched={selectedProfileDrawer?.isMatched}
        isReceived={activeSubTab === "received"}
        isSent={activeSubTab === "sent"}
        onChatNow={handleChatNow}
        onMatchBack={handleLikeBack}
        onReport={(u) => {
          setSelectedProfileDrawer(null);
          setReportingUser(u);
        }}
        actionLoading={actionLoadingId === selectedProfileDrawer?.user?.id}
      />
    </DashboardLayout>
  );
}
