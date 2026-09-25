/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Send, Sparkles, Crown, Check, Heart, Shield, Zap, Lock, RefreshCw, X, CreditCard, Smartphone } from "lucide-react"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("annual") // "monthly" | "annual"
  const [checkoutPlan, setCheckoutPlan] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentSubmitted, setPaymentSubmitted] = useState(false)

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
      billedNote: billingCycle === "annual" ? "Billed annually (₹5,988/yr)" : "Billed monthly",
      popular: true,
      isVip: false,
      icon: Sparkles,
      iconColor: "text-white bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] shadow-md shadow-[#FF2D72]/25",
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
      billedNote: billingCycle === "annual" ? "Billed annually (₹13,188/yr)" : "Billed monthly",
      popular: false,
      isVip: true,
      icon: Crown,
      iconColor: "text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30",
      features: [
        "All Premium features included",
        "2 Free Profile Boosts per week (10x views)",
        "Passport Mode: match in any city worldwide",
        "Incognito browsing & read receipts",
        "Exclusive Gold VIP profile badge",
        "24/7 dedicated dating concierge",
      ],
      buttonText: "Join VIP Elite",
      buttonStyle:
        "bg-gradient-to-r from-[#F59E0B] via-[#FF2D72] to-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/45 hover:brightness-105",
    },
  ]

  return (
    <section id="pricing" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC]">
      {/* Background Soft Fluid Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[700px] h-[700px] bg-gradient-to-tr from-[#FFE7F0]/60 via-[#7C3AED]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-xs font-bold tracking-wider uppercase mb-3.5 border border-[#FF2D72]/20">
            <Zap className="w-3.5 h-3.5" />
            <span>FLEXIBLE PLANS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#17151A] tracking-tight leading-tight mb-3.5">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed font-normal">
            Find the right pace for your love story. Upgrade anytime or cancel with one click.
          </p>

          {/* Interactive Billing Toggle */}
          <div className="inline-flex items-center p-1.5 bg-slate-100/90 backdrop-blur-xs rounded-full border border-slate-200 mt-6 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${billingCycle === "monthly"
                ? "bg-white text-[#17151A] shadow-sm"
                : "text-[#64748b] hover:text-[#17151A]"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${billingCycle === "annual"
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

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch pt-2">
          {plans.map((plan) => {
            const IconComp = plan.icon
            const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice

            if (plan.isVip) {
              return (
                /* VIP Luxury Amethyst Card */
                <div
                  key={plan.id}
                  className="relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-gradient-to-b from-[#1b1528] via-[#161224] to-[#0f0c1a] text-white border border-purple-500/30 shadow-[0_16px_45px_rgba(124,58,237,0.18)] hover:shadow-[0_24px_60px_rgba(124,58,237,0.3)] hover:-translate-y-2 group overflow-hidden"
                >
                  {/* Subtle Corner Ambient Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

                  {/* Top VIP Badge */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${plan.iconColor}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-[11px] tracking-wide uppercase">
                          {plan.badge}
                        </span>
                        <h3 className="text-2xl font-black tracking-tight mt-1 text-white">
                          {plan.name}
                        </h3>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                      <Heart className="w-4 h-4 fill-amber-400" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-xs sm:text-sm text-slate-300 font-normal mb-6">
                      {plan.subtitle}
                    </p>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl sm:text-[46px] font-black tracking-tight text-white">
                        {price}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-400">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-purple-300 font-medium mb-7">
                      {plan.billedNote}
                    </p>

                    {/* Features List */}
                    <div className="pt-5 border-t border-white/10 mb-8">
                      <p className="text-xs uppercase tracking-wider font-bold text-amber-300/90 mb-4">
                        Exclusive VIP Benefits:
                      </p>
                      <ul className="space-y-3.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-normal">
                            <div className="w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => setCheckoutPlan(plan)}
                    className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer active:scale-98 relative z-10 ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              )
            }

            return (
              /* Basic & Premium Cards */
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden ${plan.popular
                  ? "bg-gradient-to-b from-[#FFE7F0]/60 via-white to-[#FFE7F0]/20 border-2 border-[#FF2D72] shadow-[0_16px_45px_rgba(255,45,114,0.16)] hover:shadow-[0_24px_60px_rgba(255,45,114,0.25)] md:-translate-y-3 group"
                  : "bg-white border border-[#FFE7F0] shadow-xs hover:border-[#FF2D72]/40 hover:shadow-xl hover:-translate-y-1"
                  }`}
              >
                {/* Most Popular Floating Pill */}
                {plan.popular && (
                  <div className="absolute -top-0.5 right-7 px-4 py-1 rounded-b-xl bg-[#FF2D72] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md shadow-[#FF2D72]/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                {/* Top Header: Icon & Title */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${plan.iconColor}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        {!plan.popular && (
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#64748b] font-bold text-[11px] tracking-wide uppercase">
                            {plan.badge}
                          </span>
                        )}
                        <h3 className="text-2xl font-black text-[#17151A] tracking-tight mt-0.5">
                          {plan.name}
                        </h3>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#FFE7F0] flex items-center justify-center text-[#FF2D72]">
                      <Heart className="w-4 h-4 fill-[#FF2D72]" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed mb-6 font-normal">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl sm:text-[46px] font-black text-[#17151A] tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#64748b]">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#FF2D72] font-semibold mb-7">
                    {plan.billedNote}
                  </p>

                  {/* Features List */}
                  <div className="pt-5 border-t border-slate-100 mb-8">
                    <p className="text-xs uppercase tracking-wider font-bold text-[#64748b] mb-4">
                      What's Included:
                    </p>
                    <ul className="space-y-3.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#374151] font-medium">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular
                              ? "bg-[#FFE7F0] text-[#FF2D72]"
                              : "bg-slate-100 text-[#64748b]"
                              }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => setCheckoutPlan(plan)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer active:scale-98 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            )
          })}
        </div>

        {checkoutPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17151A]/45 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              <button
                type="button"
                onClick={() => {
                  setCheckoutPlan(null)
                  setPaymentSubmitted(false)
                }}
                className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-[#FFE7F0] hover:text-[#FF2D72]"
                aria-label="Close payment"
              >
                <X className="h-4 w-4" />
              </button>

              {paymentSubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#22C55E]">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-[#17151A]">Payment successful</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Your {checkoutPlan.name} plan is now active. Welcome to more meaningful connections.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutPlan(null)
                      setPaymentSubmitted(false)
                    }}
                    className="mt-6 rounded-2xl bg-[#FF2D72] px-6 py-3 text-sm font-bold text-white"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF2D72]">Secure checkout</p>
                  <h3 className="mt-2 text-2xl font-black text-[#17151A]">Complete your payment</h3>
                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#FFF5F8] p-4">
                    <div>
                      <p className="text-sm font-extrabold">{checkoutPlan.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{billingCycle === "annual" ? "Annual billing" : "Monthly billing"}</p>
                    </div>
                    <p className="text-xl font-black text-[#FF2D72]">{billingCycle === "annual" ? checkoutPlan.annualPrice : checkoutPlan.monthlyPrice}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[["card", "Card", CreditCard], ["upi", "UPI", Smartphone], ["netbanking", "Net banking", Lock], ["wallet", "Wallet", RefreshCw]].map(([id, label, Icon]) => (
                      <button
                        type="button"
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-[11px] font-bold ${paymentMethod === id ? "border-[#FF2D72] bg-[#FFF5F8] text-[#FF2D72]" : "border-slate-200 text-slate-500"}`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      setPaymentSubmitted(true)
                    }}
                    className="mt-5 space-y-3"
                  >
                    <input required placeholder={paymentMethod === "upi" ? "yourname@upi" : "Card / account number"} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF2D72]" />
                    <input required placeholder="Name on payment account" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#FF2D72]" />
                    <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] py-4 text-sm font-extrabold text-white shadow-lg shadow-[#FF2D72]/20">Pay securely</button>
                  </form>
                  <p className="mt-4 flex items-center justify-center gap-1 text-center text-[11px] text-slate-400"><Shield className="h-3.5 w-3.5" />Demo checkout UI ready for Razorpay or Stripe integration.</p>
                </>
              )}
            </div>
          </div>
        )}



      </div>
    </section>
  )
}
