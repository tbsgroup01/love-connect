/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Sparkles,
  Crown,
  Check,
  Heart,
  Shield,
  Zap,
  Lock,
  RefreshCw,
  X,
  CreditCard,
  Smartphone,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Calendar,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { getPlans } from "../../../services/plansServices.js";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../../services/paymentServices.js";
import { checkActiveSubscription } from "../../../services/subscriptionsServices.js";

// Helper to dynamically load Razorpay script if needed
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Date formatter
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (_) {
    return String(dateStr);
  }
};

// Helper to format DB plans for Home Pricing Cards
const formatPlanFromDb = (plan) => {
  const duration = Number(plan.duration) || 0;
  const priceNum = Number(plan.price) || 0;

  // 1. FREE PLAN (₹0)
  if (duration === 0) {
    return {
      id: plan.id || "plan-free",
      plan_id: plan.plan_id || plan.id,
      duration: 0,
      name: plan.name || "Free Starter",
      badge: "Free Forever",
      subtitle: "10 likes aur 1 chat conversation se shuru karein",
      priceDisplay: "₹0",
      priceNum: 0,
      period: "forever",
      billedNote: "10 Daily Likes & 1 Active Chat",
      popular: false,
      isVip: false,
      icon: Send,
      iconColor: "text-blue-500 bg-blue-50 border-blue-100",
      features: [
        "Create verified profile",
        "Browse local members",
        "10 likes per day (limited)",
        "1 active chat conversation",
        "Standard discovery filters",
      ],
      buttonText: "Get Started Free",
      buttonStyle:
        "border-2 border-slate-200 text-[#17151A] hover:border-[#FF2D72]/40 hover:text-[#FF2D72] hover:bg-[#FFE7F0]/40",
    };
  }

  // 2. 1 MONTH PLAN (₹499 / 30 Days)
  if (duration <= 30) {
    return {
      id: plan.id || "plan-1m",
      plan_id: plan.plan_id || plan.id,
      duration: duration,
      name: plan.name || "1 Month Premium",
      badge: "Most Popular",
      subtitle: "Full unlimited access to multiply matches for 30 days",
      priceDisplay: `₹${priceNum}`,
      priceNum: priceNum,
      period: "/month",
      billedNote: "Billed monthly, cancel anytime",
      popular: true,
      isVip: false,
      icon: Sparkles,
      iconColor:
        "text-white bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] shadow-md shadow-[#FF2D72]/25",
      features: [
        "Full access while plan is active",
        "Unlimited likes & accidental rewinds",
        "See who liked you before matching",
        "Unlimited in-app chat messaging",
        "30 mins daily video calling",
        "Advanced lifestyle & verified filters",
      ],
      buttonText: "Get 1 Month Access",
      buttonStyle:
        "bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] text-white shadow-lg shadow-[#FF2D72]/30 hover:shadow-[#FF2D72]/45 hover:brightness-105",
    };
  }

  // 3. 3 MONTHS PLAN (₹1,199 / 90 Days)
  if (duration <= 90) {
    return {
      id: plan.id || "plan-3m",
      plan_id: plan.plan_id || plan.id,
      duration: duration,
      name: plan.name || "3 Months Premium",
      badge: "Save 20%",
      subtitle: "Full unlimited access for 90 days with quarterly savings",
      priceDisplay: `₹${priceNum}`,
      priceNum: priceNum,
      period: "/ 3 months",
      billedNote: `Total ₹${priceNum} billed every 3 months`,
      popular: false,
      isVip: false,
      icon: Heart,
      iconColor: "text-purple-600 bg-purple-50 border-purple-100",
      features: [
        "Full access while plan is active",
        "Unlimited in-app video calling",
        "1 Free Profile Boost / month",
        "5 SuperLikes weekly to stand out",
        "Priority message delivery",
        "Read receipts (blue ticks)",
      ],
      buttonText: "Get 3 Months Access",
      buttonStyle:
        "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:brightness-105",
    };
  }

  // 4. 1 YEAR VIP ELITE (₹3,899 / 365 Days)
  return {
    id: plan.id || "plan-1y",
    plan_id: plan.plan_id || plan.id,
    duration: duration,
    name: plan.name || "1 Year VIP Elite",
    badge: "Best Value (35% OFF)",
    subtitle: "Maximum visibility, worldwide passport, and VIP concierge",
    priceDisplay: `₹${priceNum}`,
    priceNum: priceNum,
    period: "/year",
    billedNote: `Total ₹${priceNum} billed annually`,
    popular: false,
    isVip: true,
    icon: Crown,
    iconColor: "text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30",
    features: [
      "Full VIP access for 365 days",
      "5 Free Profile Boosts per month",
      "Worldwide Passport Mode (match anywhere)",
      "Incognito browsing & read receipts",
      "Exclusive Gold VIP profile badge",
      "24/7 dedicated dating concierge",
    ],
    buttonText: "Join VIP Elite",
    buttonStyle:
      "bg-gradient-to-r from-[#F59E0B] via-[#FF2D72] to-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/45 hover:brightness-105",
  };
};

const INITIAL_DB_PLANS = [
  {
    plan_id: 100001,
    name: "Free Starter",
    price: "0.00",
    duration: 0,
    description:
      "10 Daily Likes aur 1 Chat conversation. Profile create karein, local members dekhein aur basic matching shuru karein.",
    status: "active",
  },
  {
    plan_id: 100002,
    name: "1 Month Premium",
    price: "499.00",
    duration: 30,
    description:
      "Full Unlimited Access (30 Din): Unlimited Likes, Unlimited Chat, Video Calling, See Who Likes You, Rewind Swipes & Super Likes.",
    status: "active",
  },
  {
    plan_id: 100003,
    name: "3 Months Premium",
    price: "1199.00",
    duration: 90,
    description:
      "Full Unlimited Access (90 Din) with 20% savings: Sabhi features unlocked - Unlimited Likes & Chat, Video Calling, Profile Boosts & Advanced Filters.",
    status: "active",
  },
  {
    plan_id: 100004,
    name: "1 Year VIP Elite",
    price: "3899.00",
    duration: 365,
    description:
      "Full Unlimited Access (365 Din) with 35% savings: Sabhi features unlocked, Worldwide Passport Mode, 5 Monthly Boosts, Incognito Mode aur VIP Support.",
    status: "active",
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [dbPlans, setDbPlans] = useState(INITIAL_DB_PLANS);
  const [loading, setLoading] = useState(false);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [successModalData, setSuccessModalData] = useState(null);

  // Active Subscription State
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [loadingSub, setLoadingSub] = useState(false);
  const [upgradeConfirmPlan, setUpgradeConfirmPlan] = useState(null);

  // Fetch active subscription for the logged-in user
  const fetchActiveSubscription = async () => {
    try {
      const saved = localStorage.getItem("user");
      if (!saved) return;
      const user = JSON.parse(saved);
      if (!user?.id) return;

      setLoadingSub(true);
      const res = await checkActiveSubscription(user.id);
      if (res.data?.hasActivePlan && res.data?.subscription) {
        setActiveSubscription(res.data.subscription);
      } else {
        setActiveSubscription(null);
      }
    } catch (err) {
      console.error("Failed to check active subscription:", err);
    } finally {
      setLoadingSub(false);
    }
  };

  // Load latest plans from MySQL Database API & check active sub
  useEffect(() => {
    getPlans()
      .then((res) => {
        const raw = res.data?.plans || [];
        if (raw.length > 0) {
          setDbPlans(raw);
        }
      })
      .catch((err) => {
        console.error("Failed to load plans from DB:", err);
      });

    fetchActiveSubscription();
  }, []);

  // Format plans for display
  const plans = dbPlans.map(formatPlanFromDb);

  // Helper to determine if a plan card represents the currently active subscription
  const isCurrentPlan = (plan) => {
    if (!activeSubscription) return false;
    const activePlanId = Number(activeSubscription.plan_id);
    const activePlanObj = activeSubscription.plan;
    const pId = Number(plan.id);
    const pPlanId = Number(plan.plan_id);

    if (activePlanId && (activePlanId === pId || activePlanId === pPlanId)) {
      return true;
    }
    if (activePlanObj) {
      if (Number(activePlanObj.id) === pId || Number(activePlanObj.id) === pPlanId) {
        return true;
      }
      if (Number(activePlanObj.plan_id) === pId || Number(activePlanObj.plan_id) === pPlanId) {
        return true;
      }
      if (
        activePlanObj.name &&
        plan.name &&
        activePlanObj.name.trim().toLowerCase() === plan.name.trim().toLowerCase()
      ) {
        return true;
      }
    }
    return false;
  };

  // Calculate projected new expiry date when upgrading or extending
  const calculateNewEndDate = (planDuration) => {
    const baseDate =
      activeSubscription && new Date(activeSubscription.end_date) > new Date()
        ? new Date(activeSubscription.end_date)
        : new Date();
    const newDate = new Date(baseDate);
    newDate.setDate(newDate.getDate() + Number(planDuration || 0));
    return formatDate(newDate);
  };

  // Primary Payment Execution via Razorpay
  const executePayment = async (plan) => {
    const token = localStorage.getItem("token");
    let currentUser = null;
    try {
      const saved = localStorage.getItem("user");
      if (saved) currentUser = JSON.parse(saved);
    } catch (_) {}

    if (!token || !currentUser) {
      navigate("/login", {
        state: {
          redirectAfterLogin: "/#pricing",
          message: `Please log in to proceed with the ${plan.name} plan.`,
          selectedPlan: plan,
        },
      });
      return;
    }

    try {
      setProcessingPlanId(plan.id);
      setUpgradeConfirmPlan(null); // Close confirmation modal if open

      // Ensure Razorpay SDK is ready
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded && !window.Razorpay) {
        alert("Failed to load Razorpay payment gateway. Please check your internet connection.");
        setProcessingPlanId(null);
        return;
      }

      // Step A: Create order in backend via Razorpay Orders API
      const res = await createPaymentOrder({
        amount: plan.priceNum,
        plan_id: plan.plan_id || plan.id,
      });

      const { order, key_id } = res.data;

      if (!order || !order.id) {
        throw new Error("Invalid order generated by payment server.");
      }

      const isUpgrading = Boolean(activeSubscription);

      // Step B: Configure Razorpay Checkout modal
      const options = {
        key: key_id || "rzp_test_T9N9rWQ7myNslf",
        amount: order.amount,
        currency: order.currency || "INR",
        name: "LoveConnect",
        description: isUpgrading
          ? `Upgrade/Extend ${plan.name} Membership`
          : `${plan.name} Membership`,
        image: "https://ui-avatars.com/api/?name=LoveConnect&background=FF2D72&color=fff",
        order_id: order.id,
        handler: async function (response) {
          try {
            setVerifyingPayment(true);

            // Step C: Verify payment signature and save transaction in DB
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: currentUser?.id,
              plan_id: plan.plan_id || plan.id,
              amount: plan.priceNum,
              payment_method: "Razorpay",
            });

            // Update user in local storage
            if (currentUser) {
              currentUser.subscription = plan.name;
              localStorage.setItem("user", JSON.stringify(currentUser));
            }

            // Refresh active subscription state immediately from server!
            await fetchActiveSubscription();

            // Step D: Show success modal
            setSuccessModalData({
              plan,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              isUpgrade: isUpgrading,
              newEndDate: verifyRes.data?.subscription?.end_date,
            });
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed. If money was deducted, our team will verify your transaction shortly.");
          } finally {
            setVerifyingPayment(false);
            setProcessingPlanId(null);
          }
        },
        prefill: {
          name: currentUser?.name || "Customer",
          email: currentUser?.email || "customer@loveconnect.com",
          contact: currentUser?.phone || "9999999999",
        },
        theme: {
          color: "#FF2D72",
        },
        modal: {
          ondismiss: function () {
            setProcessingPlanId(null);
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description || "Transaction was cancelled"}`);
        setProcessingPlanId(null);
      });

      rzpInstance.open();
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      alert("Failed to initiate Razorpay payment. Please try again.");
      setProcessingPlanId(null);
    }
  };

  // Button Click Handler for Plan Cards
  const handleSelectPlan = async (plan) => {
    // 1. FREE PLAN (₹0)
    if (!plan.priceNum || plan.priceNum === 0) {
      if (activeSubscription) {
        alert("You already have an active Premium membership!");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/register", { state: { selectedPlan: plan } });
      } else {
        navigate("/discover", { state: { selectedPlan: plan } });
      }
      return;
    }

    // 2. If user already has an active subscription, open the Upgrade / Extension confirmation modal
    if (activeSubscription) {
      setUpgradeConfirmPlan(plan);
      return;
    }

    // 3. New Plan purchase (no prior active subscription)
    await executePayment(plan);
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] font-poppins"
    >
      <div id="plans" className="absolute -top-20" />
      {/* Background Soft Fluid Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[700px] h-[700px] bg-gradient-to-tr from-[#FFE7F0]/60 via-[#7C3AED]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-xs font-bold tracking-wider uppercase mb-3 border border-[#FF2D72]/20">
            <Zap className="w-3.5 h-3.5" />
            <span>FLEXIBLE PLANS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17151A] tracking-tight leading-tight mb-2.5">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-[#64748b] text-sm sm:text-base leading-relaxed font-normal">
            Find the right pace for your love story. Upgrade anytime or extend your validity with one click.
          </p>
        </div>

        {/* ACTIVE MEMBERSHIP HIGHLIGHT BANNER */}
        {activeSubscription && (
          <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#FFE7F0] via-white to-[#F5F3FF] border-2 border-[#FF2D72]/30 shadow-md shadow-pink-500/5 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#FF2D72]/25">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF2D72] bg-[#FFE7F0] px-2 py-0.5 rounded-full border border-[#FF2D72]/30">
                    Active Membership
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Currently Active</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#17151A] mt-0.5">
                  {activeSubscription.plan?.name || "Premium Plan"}
                  <span className="text-xs font-normal text-slate-500 ml-2">
                    (Valid till:{" "}
                    <span className="font-bold text-[#17151A]">
                      {formatDate(activeSubscription.end_date)}
                    </span>
                    )
                  </span>
                </h3>
              </div>
            </div>
            <div className="text-xs text-slate-600 md:text-right bg-white/90 px-4 py-2 rounded-2xl border border-slate-200/70 shadow-2xs w-full md:w-auto">
              <p className="font-bold text-slate-800">Want to upgrade or extend?</p>
              <p className="text-[11px] text-slate-500">
                Remaining days will automatically carry forward to your new plan!
              </p>
            </div>
          </div>
        )}

        {/* LOADING SPINNER */}
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center space-y-3 bg-white/70 rounded-3xl border border-slate-200/80 shadow-xs">
            <Loader2 className="w-9 h-9 text-[#FF2D72] animate-spin" />
            <p className="text-xs font-bold text-slate-500">
              Loading Subscription Plans from Database...
            </p>
          </div>
        ) : (
          /* 4 Database Pricing Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch pt-1">
            {plans.map((plan) => {
              const IconComp = plan.icon;
              const isProcessing = processingPlanId === plan.id;
              const current = isCurrentPlan(plan);
              const hasActive = Boolean(activeSubscription);

              // Dynamic button labels based on subscription status
              let dynamicButtonText = plan.buttonText;
              if (plan.priceNum === 0) {
                dynamicButtonText = hasActive ? "Included in Plan" : "Get Started Free";
              } else if (current) {
                dynamicButtonText = `Extend Plan (+${plan.duration} Days)`;
              } else if (hasActive) {
                dynamicButtonText = `Upgrade to ${plan.name}`;
              }

              if (plan.isVip) {
                return (
                  /* VIP Luxury Amethyst Card (1 Year) */
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 bg-gradient-to-b from-[#1b1528] via-[#161224] to-[#0f0c1a] text-white border shadow-[0_12px_36px_rgba(124,58,237,0.18)] hover:shadow-[0_20px_45px_rgba(124,58,237,0.3)] hover:-translate-y-1 group overflow-hidden h-full ${
                      current
                        ? "border-emerald-400 ring-2 ring-emerald-400/40"
                        : "border-purple-500/30"
                    }`}
                  >
                    {/* Corner Ambient Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

                    {/* Top Content Area */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      {/* Top VIP Badge & Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${plan.iconColor}`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold text-[10px] tracking-wide uppercase border ${
                                current
                                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                                  : "bg-amber-400/15 border-amber-400/30 text-amber-300"
                              }`}
                            >
                              {current ? "Active Plan" : plan.badge}
                            </span>
                            <h3 className="text-lg sm:text-xl font-black tracking-tight mt-0.5 text-white">
                              {plan.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 font-normal mb-4 min-h-[32px] leading-snug">
                        {plan.subtitle}
                      </p>

                      {/* Price Block */}
                      <div className="flex items-baseline gap-1 mb-0.5">
                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                          {plan.priceDisplay}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-[10px] text-purple-300 font-medium mb-4">
                        {plan.billedNote}
                      </p>

                      {/* Features List */}
                      <div className="pt-3.5 border-t border-white/10 mb-5 flex-1">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-amber-300/90 mb-2.5">
                          Exclusive VIP Benefits:
                        </p>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-200 font-normal"
                            >
                              <div className="w-4 h-4 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan)}
                      disabled={isProcessing || verifyingPayment}
                      className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer active:scale-98 relative z-10 flex items-center justify-center gap-2 ${
                        current
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:brightness-105"
                          : plan.buttonStyle
                      } ${isProcessing ? "opacity-75 cursor-wait" : ""}`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Connecting Razorpay...</span>
                        </>
                      ) : (
                        <>
                          <span>{dynamicButtonText}</span>
                          {!current && hasActive && (
                            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                          )}
                        </>
                      )}
                    </button>
                  </div>
                );
              }

              return (
                /* Free, 1 Month, and 3 Months Cards */
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden h-full ${
                    current
                      ? "bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/20 border-2 border-emerald-500 shadow-[0_12px_36px_rgba(16,185,129,0.18)] ring-2 ring-emerald-400/30 -translate-y-1 group"
                      : plan.popular
                      ? "bg-gradient-to-b from-[#FFE7F0]/60 via-white to-[#FFE7F0]/20 border-2 border-[#FF2D72] shadow-[0_12px_36px_rgba(255,45,114,0.16)] hover:shadow-[0_20px_45px_rgba(255,45,114,0.25)] md:-translate-y-1.5 group"
                      : "bg-white border border-[#FFE7F0] shadow-xs hover:border-[#FF2D72]/40 hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  {/* Floating Pill Badge */}
                  {(current || plan.badge) && (
                    <div
                      className={`absolute -top-0.5 right-6 px-3 py-0.5 rounded-b-lg font-extrabold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                        current
                          ? "bg-emerald-600 text-white"
                          : plan.popular
                          ? "bg-[#FF2D72] text-white"
                          : "bg-slate-100 text-[#64748b]"
                      }`}
                    >
                      {current ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active Plan</span>
                        </>
                      ) : (
                        <>
                          {plan.popular && <Sparkles className="w-3 h-3" />}
                          <span>{plan.badge}</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Top Content Area */}
                  <div className="flex-1 flex flex-col">
                    {/* Top Header: Icon & Title */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${plan.iconColor}`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-black text-[#17151A] tracking-tight mt-0.5">
                            {plan.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#64748b] leading-snug mb-4 min-h-[32px]">
                      {plan.subtitle}
                    </p>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-1 mb-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                        {plan.priceDisplay}
                      </span>
                      <span className="text-xs font-semibold text-[#64748b]">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#FF2D72] font-semibold mb-4">
                      {plan.billedNote}
                    </p>

                    {/* Features List */}
                    <div className="pt-3.5 border-t border-slate-100 mb-5 flex-1">
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#64748b] mb-2.5">
                        What's Included:
                      </p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-[#374151] font-medium"
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                current
                                  ? "bg-emerald-100 text-emerald-600"
                                  : plan.popular
                                  ? "bg-[#FFE7F0] text-[#FF2D72]"
                                  : "bg-slate-100 text-[#64748b]"
                              }`}
                            >
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    disabled={
                      isProcessing ||
                      verifyingPayment ||
                      (plan.priceNum === 0 && hasActive)
                    }
                    className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-xs tracking-wide transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2 ${
                      current
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:brightness-105"
                        : plan.priceNum === 0 && hasActive
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        : plan.buttonStyle
                    } ${isProcessing ? "opacity-75 cursor-wait" : ""}`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting Razorpay...</span>
                      </>
                    ) : (
                      <>
                        <span>{dynamicButtonText}</span>
                        {!current && hasActive && plan.priceNum > 0 && (
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* UPGRADE / EXTEND CONFIRMATION MODAL */}
      {upgradeConfirmPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-pink-100 space-y-5 animate-scaleUp relative">
            <button
              onClick={() => setUpgradeConfirmPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center shrink-0">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFE7F0] text-[#FF2D72]">
                  {isCurrentPlan(upgradeConfirmPlan)
                    ? "Extend Validity"
                    : "Plan Upgrade"}
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">
                  {isCurrentPlan(upgradeConfirmPlan)
                    ? `Extend ${upgradeConfirmPlan.name}`
                    : `Upgrade to ${upgradeConfirmPlan.name}`}
                </h3>
              </div>
            </div>

            {/* Upgrade Details Card */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400">Current Plan:</span>
                <span className="font-bold text-slate-800">
                  {activeSubscription?.plan?.name || "Active Plan"}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400">Current Expiry:</span>
                <span className="font-semibold text-slate-700">
                  {formatDate(activeSubscription?.end_date)}
                </span>
              </div>
              <div className="h-px bg-slate-200/80 my-1" />
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400">Duration Added:</span>
                <span className="font-bold text-emerald-600">
                  +{upgradeConfirmPlan.duration} Days
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400">New Expiry Date:</span>
                <span className="font-black text-[#FF2D72]">
                  {calculateNewEndDate(upgradeConfirmPlan.duration)}
                </span>
              </div>
              <div className="h-px bg-slate-200/80 my-1" />
              <div className="flex justify-between items-center text-slate-900 text-sm font-black">
                <span>Amount to Pay:</span>
                <span className="text-lg text-emerald-600">
                  {upgradeConfirmPlan.priceDisplay}
                </span>
              </div>
            </div>

            {/* Informational Notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-800 text-[11px] leading-snug">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>No days lost!</strong> Your remaining days from the current plan are preserved. The new {upgradeConfirmPlan.duration} days will be added on top of your existing expiry date.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setUpgradeConfirmPlan(null)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executePayment(upgradeConfirmPlan)}
                className="flex-2 py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] text-white font-bold text-xs shadow-md shadow-[#FF2D72]/20 hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Proceed to Pay {upgradeConfirmPlan.priceDisplay}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERIFYING PAYMENT FULLSCREEN OVERLAY */}
      {verifyingPayment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl animate-scaleUp">
            <Loader2 className="w-12 h-12 text-[#FF2D72] animate-spin mx-auto" />
            <h3 className="text-lg font-black text-gray-900">Verifying Payment</h3>
            <p className="text-xs text-gray-500">
              Please wait while we confirm your Razorpay transaction and update your subscription...
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL POPUP (AFTER SUCCESSFUL RAZORPAY PAYMENT) */}
      {successModalData && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-pink-100 text-center space-y-5 animate-scaleUp relative">
            <button
              onClick={() => setSuccessModalData(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto border-4 border-green-100 shadow-md">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFE7F0] text-[#FF2D72]">
                Payment Verified
              </span>
              <h3 className="text-2xl font-black text-gray-900 mt-2">
                {successModalData.isUpgrade
                  ? "Plan Upgraded Successfully! 🎉"
                  : "Subscription Activated! 🎉"}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {successModalData.isUpgrade ? (
                  <>
                    Your plan has been upgraded to{" "}
                    <strong className="text-[#FF2D72]">
                      {successModalData.plan.name}
                    </strong>
                    . Your remaining validity has been extended!
                  </>
                ) : (
                  <>
                    You are now subscribed to{" "}
                    <strong className="text-[#FF2D72]">
                      {successModalData.plan.name}
                    </strong>
                    . Unlimited likes, messaging, and premium benefits are now unlocked!
                  </>
                )}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 text-left text-xs space-y-2 border border-gray-100 font-mono">
              <div className="flex justify-between text-gray-400 text-[10px] uppercase font-bold">
                <span>Plan</span>
                <span className="text-gray-800">{successModalData.plan.name}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-[10px] uppercase font-bold">
                <span>Amount Paid</span>
                <span className="text-green-600 font-bold">{successModalData.plan.priceDisplay}</span>
              </div>
              {successModalData.newEndDate && (
                <div className="flex justify-between text-gray-400 text-[10px] uppercase font-bold">
                  <span>New Expiry Date</span>
                  <span className="text-pink-600 font-bold">
                    {formatDate(successModalData.newEndDate)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-gray-400 text-[10px] uppercase font-bold truncate">
                <span>Transaction ID</span>
                <span className="text-gray-600 truncate max-w-[180px]">
                  {successModalData.paymentId}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSuccessModalData(null);
                  navigate("/discover");
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Start Exploring Matches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
