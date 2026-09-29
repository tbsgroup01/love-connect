/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
} from "lucide-react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("annual"); // "monthly" | "annual"
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      badge: "Free Forever",
      subtitle: "Casual exploration and genuine connections",
      monthlyPrice: "₹0",
      annualPrice: "₹0",
      period: "forever",
      billedNote: "No credit card required",
      popular: false,
      isVip: false,
      icon: Send,
      iconColor: "text-blue-500 bg-blue-50 border-blue-100",
      features: [
        "Create verified profile",
        "Browse local members",
        "Up to 50 likes per day",
        "Standard filters (age, distance)",
        "Safe in-app chat with mutual matches",
      ],
      buttonText: "Get Started Free",
      buttonStyle:
        "border-2 border-slate-200 text-[#17151A] hover:border-[#FF2D72]/40 hover:text-[#FF2D72] hover:bg-[#FFE7F0]/40",
    },
    {
      id: "premium",
      name: "Premium",
      badge: "Most Popular",
      subtitle: "Multiply your matches and unlock see-who-liked-you",
      monthlyPrice: "₹799",
      annualPrice: "₹499",
      period: "/month",
      billedNote:
        billingCycle === "annual"
          ? "Billed annually (₹5,988/yr)"
          : "Billed monthly",
      popular: true,
      isVip: false,
      icon: Sparkles,
      iconColor:
        "text-white bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] shadow-md shadow-[#FF2D72]/25",
      features: [
        "All Basic features included",
        "Unlimited likes & accidental rewinds",
        "See who liked you before matching",
        "Advanced lifestyle & interest filters",
        "5 SuperLikes weekly to stand out",
        "Priority message delivery",
      ],
      buttonText: "Get Premium Now",
      buttonStyle:
        "bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] text-white shadow-lg shadow-[#FF2D72]/30 hover:shadow-[#FF2D72]/45 hover:brightness-105",
    },
    {
      id: "vip",
      name: "VIP Elite",
      badge: "Ultimate Experience",
      subtitle: "Maximum visibility, passport mode, and concierge",
      monthlyPrice: "₹1,599",
      annualPrice: "₹1,099",
      period: "/month",
      billedNote:
        billingCycle === "annual"
          ? "Billed annually (₹13,188/yr)"
          : "Billed monthly",
      popular: false,
      isVip: true,
      icon: Crown,
      iconColor: "text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30",
      features: [
        "All Premium features included",
        "2 Free Profile Boosts per week (10x visibility)",
        "Passport Mode: match in any city worldwide",
        "Incognito browsing & read receipts",
        "Exclusive Gold VIP profile badge",
        "24/7 dedicated dating concierge",
      ],
      buttonText: "Join VIP Elite",
      buttonStyle:
        "bg-gradient-to-r from-[#F59E0B] via-[#FF2D72] to-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/45 hover:brightness-105",
    },
  ];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC]"
    >
      {/* Background Soft Fluid Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[700px] h-[700px] bg-gradient-to-tr from-[#FFE7F0]/60 via-[#7C3AED]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
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
            Find the right pace for your love story. Upgrade anytime or cancel
            with one click.
          </p>

          {/* Interactive Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-slate-100/90 backdrop-blur-xs rounded-full border border-slate-200 mt-5 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-[#17151A] shadow-sm"
                  : "text-[#64748b] hover:text-[#17151A]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-white text-[#FF2D72] shadow-sm"
                  : "text-[#64748b] hover:text-[#17151A]"
              }`}
            >
              <span>Annual</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[10px] font-extrabold uppercase tracking-wide border border-[#FF2D72]/20">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid: Balanced Width and Equal Height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch pt-1">
          {plans.map((plan) => {
            const IconComp = plan.icon;
            const price =
              billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;

            if (plan.isVip) {
              return (
                /* VIP Luxury Amethyst Card */
                <div
                  key={plan.id}
                  className="relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 bg-gradient-to-b from-[#1b1528] via-[#161224] to-[#0f0c1a] text-white border border-purple-500/30 shadow-[0_12px_36px_rgba(124,58,237,0.18)] hover:shadow-[0_20px_45px_rgba(124,58,237,0.3)] hover:-translate-y-1 group overflow-hidden h-full"
                >
                  {/* Subtle Corner Ambient Glow */}
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
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-[10px] tracking-wide uppercase">
                            {plan.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5 text-white">
                            {plan.name}
                          </h3>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                        <Heart className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-normal mb-4 min-h-[32px] leading-snug">
                      {plan.subtitle}
                    </p>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-1 mb-0.5">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        {price}
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
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-slate-200 font-normal"
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
                    onClick={() => setCheckoutPlan(plan)}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer active:scale-98 relative z-10 ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );
            }

            return (
              /* Basic & Premium Cards */
              <div
                key={plan.id}
                className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden h-full ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#FFE7F0]/60 via-white to-[#FFE7F0]/20 border-2 border-[#FF2D72] shadow-[0_12px_36px_rgba(255,45,114,0.16)] hover:shadow-[0_20px_45px_rgba(255,45,114,0.25)] md:-translate-y-1.5 group"
                    : "bg-white border border-[#FFE7F0] shadow-xs hover:border-[#FF2D72]/40 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Most Popular Floating Pill */}
                {plan.popular && (
                  <div className="absolute -top-0.5 right-6 px-3 py-0.5 rounded-b-lg bg-[#FF2D72] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{plan.badge}</span>
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
                        {!plan.popular && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#64748b] font-bold text-[10px] tracking-wide uppercase">
                            {plan.badge}
                          </span>
                        )}
                        <h3 className="text-xl sm:text-2xl font-black text-[#17151A] tracking-tight mt-0.5">
                          {plan.name}
                        </h3>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-[#FFE7F0] flex items-center justify-center text-[#FF2D72]">
                      <Heart className="w-3.5 h-3.5 fill-[#FF2D72]" />
                    </div>
                  </div>

                  <p className="text-xs text-[#64748b] leading-snug mb-4 min-h-[32px]">
                    {plan.subtitle}
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#17151A] tracking-tight">
                      {price}
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
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-[#374151] font-medium"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              plan.popular
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
                  onClick={() => setCheckoutPlan(plan)}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer active:scale-98 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
