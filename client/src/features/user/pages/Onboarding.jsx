import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Heart,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  MapPin,
  Users,
  Compass,
  CheckCircle2,
  Flame,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import loveConnectLogo from "../../../assets/loveconnect.png";
import step1CoupleImg from "../../../assets/hero_couple.jpg";
import step2WomanImg from "../../../assets/hero_woman.jpg";
import step3RomanticImg from "../../../assets/hero_couple_romantic.jpg";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      tag: "STEP 01 OF 03 • CONNECTION",
      pillTitle: "01 Connect",
      image: step1CoupleImg,
      titlePrefix: "Find Your",
      titleHighlight: "True Connection",
      subtitle:
        "Meet genuine, amazing people who share your values, lifestyle, and passions in an authentic environment.",
      badge: " 98% Chemistry Rate",
      quote: "Rahul & Pooja matched 2 days ago in Mumbai ",
      perks: [
        {
          icon: Heart,
          title: "AI-Powered Chemistry Matching",
          desc: "Algorithms tuned to deep values, not just superficial swipes.",
        },
        {
          icon: ShieldCheck,
          title: "100% Human-Verified Profiles",
          desc: "Zero fake accounts. Strict photo verification for real people.",
        },
        {
          icon: Users,
          title: "Shared Values & Interests",
          desc: "Connect over what truly matters to you from day one.",
        },
      ],
      buttonText: "Next Step",
    },
    {
      id: 2,
      tag: "STEP 02 OF 03 • DISCOVERY",
      pillTitle: "02 Discover",
      image: step2WomanImg,
      titlePrefix: "Discover People",
      titleHighlight: "Right Near You",
      subtitle:
        "Explore verified singles in your neighborhood and start natural, spontaneous conversations with ease.",
      badge: " 1,420+ Active Nearby",
      quote: "Find singles within walking distance right now ",
      perks: [
        {
          icon: MapPin,
          title: "Hyper-Local Proximity",
          desc: "Discover quality matches in your favorite city spots.",
        },
        {
          icon: Flame,
          title: "Instant Sparks & Match Previews",
          desc: "See who's active and interested in real-time.",
        },
        {
          icon: MessageCircle,
          title: "Effortless Icebreakers",
          desc: "Thoughtful conversation starters that bypass awkward small talk.",
        },
      ],
      buttonText: "Next Step",
    },
    {
      id: 3,
      tag: "STEP 03 OF 03 • MEANINGFUL LOVE",
      pillTitle: "03 Spark",
      image: step3RomanticImg,
      titlePrefix: "Start Something",
      titleHighlight: "Truly Meaningful",
      subtitle:
        "It's not just another casual match — it's the beautiful beginning of your unforgettable love story.",
      badge: " 45k+ Happy Couples",
      quote: "Over 500+ couples engaged this year on LoveConnect ",
      perks: [
        {
          icon: Sparkles,
          title: "Intentional Dating Mindset",
          desc: "Connect with people who are genuinely ready for commitment.",
        },
        {
          icon: ShieldCheck,
          title: "Complete Privacy & Safety",
          desc: "256-bit encrypted data and proactive respectful community guidelines.",
        },
        {
          icon: CheckCircle2,
          title: "Real Dates & Lasting Bonds",
          desc: "From thoughtful chats to lifelong memories together.",
        },
      ],
      buttonText: "Get Started — Create Profile",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/create-profile");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate("/create-profile");
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex flex-col justify-between p-3 sm:p-5 lg:p-6 relative overflow-y-auto lg:overflow-hidden font-poppins select-none">
      {/* Ambient Fluid Background Glows */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/15 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] bg-gradient-to-tl from-[#7C3AED]/20 via-[#FFE7F0]/70 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 blur-3xl rounded-full pointer-events-none" />

      {/* Floating Animated Ambient Hearts */}
      <div className="absolute top-12 right-20 text-[#FF2D72]/20 pointer-events-none hidden sm:block animate-float-slow">
        <Heart className="w-10 h-10 fill-[#FF2D72]/15" />
      </div>
      <div className="absolute bottom-12 left-20 text-[#7C3AED]/20 pointer-events-none hidden sm:block animate-float-reverse">
        <Heart className="w-12 h-12 fill-[#7C3AED]/15" />
      </div>

      {/* ========================================================= */}
      {/* TOP HEADER: Logo & Step Progression Pills                 */}
      {/* ========================================================= */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pb-3 sm:pb-4 border-b border-[#FFE7F0]/80">
        <Link
          to="/"
          title="Return to Home"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <img
            src={loveConnectLogo}
            alt="LoveConnect Dating and Matchmaking platform logo"
            width="160"
            height="44"
            loading="eager"
            decoding="async"
            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Center Progress Tracker Pills (01 Connect • 02 Discover • 03 Spark) */}
        <div className="hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentStep(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                currentStep === idx
                  ? "bg-gradient-to-r from-[#FF2D72] to-[#ff4a86] text-white shadow-xs shadow-[#FF2D72]/30 scale-102"
                  : currentStep > idx
                    ? "bg-[#FFE7F0] text-[#FF2D72]"
                    : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {currentStep > idx && (
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              <span>{s.pillTitle}</span>
            </button>
          ))}
        </div>

        {/* Skip All Action */}
        <button
          type="button"
          onClick={handleSkip}
          className="px-4 py-1.5 rounded-full border border-slate-200 hover:border-[#FF2D72] bg-white hover:bg-[#FFE7F0]/40 text-xs font-bold text-[#17151A] hover:text-[#FF2D72] shadow-2xs transition-all duration-200 cursor-pointer"
        >
          Skip All
        </button>
      </header>

      {/* ========================================================= */}
      <main className="relative z-10 w-full max-w-5xl mx-auto my-auto flex-1 flex flex-col justify-center py-1 sm:py-2">
        <div className="w-full bg-white/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto min-h-[520px] lg:min-h-[540px] lg:h-[74vh] max-h-[720px] transition-all duration-500">
          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: Storytelling, Features & Step Navigation   */}
          {/* ------------------------------------------------------- */}
          <section aria-labelledby="onboarding-step-heading" className="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between order-2 lg:order-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div>
              {/* Step Tag & Live Chemistry Pill */}
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                <span className="px-3 py-1 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                  {step.tag}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF2D72]" />
                  <span>Personalized for You</span>
                </span>
              </div>

              {/* Bold Expressive Title */}
              <h1 id="onboarding-step-heading" className="text-2xl sm:text-3xl lg:text-[30px] font-black text-[#17151A] tracking-tight leading-[1.2]">
                <span>{step.titlePrefix} </span>
                <span className="bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] bg-clip-text text-transparent">
                  {step.titleHighlight}
                </span>
              </h1>

              {/* Narrative Subtitle */}
              <p className="text-xs sm:text-sm text-[#64748b] mt-1.5 sm:mt-2 leading-relaxed font-normal max-w-xl">
                {step.subtitle}
              </p>

              {/* Feature Perks List */}
              <div className="space-y-2 sm:space-y-2.5 mt-3 sm:mt-4">
                {step.perks.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={i}
                      className="p-2.5 sm:p-3 rounded-2xl bg-[#FAFAFC] hover:bg-gradient-to-r hover:from-[#FFE7F0]/40 hover:to-purple-50/30 border border-slate-100 hover:border-[#FFE7F0] transition-all duration-200 flex items-start gap-3 group shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFE7F0] to-purple-50 border border-[#FFE7F0] flex items-center justify-center text-[#FF2D72] group-hover:scale-110 transition-transform duration-200 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-[#17151A]">
                          {perk.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5 leading-normal">
                          {perk.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3.5 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 shrink-0">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentStep === idx
                        ? "w-7 bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] shadow-xs"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Jump to step ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons: Back & Next */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-600 hover:text-[#17151A] transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#FF2D72]/25 hover:shadow-lg hover:shadow-[#FF2D72]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{step.buttonText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: Big Visual Showcase & Floating Badges     */}
          {/* ------------------------------------------------------- */}
          <section aria-label="Onboarding Visual Showcase" className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-0 order-1 lg:order-2 overflow-hidden bg-[#17151A] group">
            {/* Main Stage Image with smooth cross-fade */}
            <img
              key={currentStep}
              src={step.image}
              alt={`${step.title} ${step.titleHighlight} on LoveConnect matchmaking platform`}
              width="500"
              height="600"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 animate-fadeIn group-hover:scale-105"
            />

            {/* Gradient Overlays for Depth & Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#17151A]/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Floating Top Right Skip Pill */}
            <button
              type="button"
              onClick={handleSkip}
              className="absolute top-5 right-5 z-20 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-xs font-bold text-white shadow-lg transition-all cursor-pointer"
            >
              Skip
            </button>
          </section>
        </div>
      </main>

      {/* ========================================================= */}
      {/* BOTTOM FOOTER: Trust Guarantees                           */}
      {/* ========================================================= */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 pt-3 border-t border-[#FFE7F0]/60">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>256-bit Encrypted Security</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span>100% Human-Checked Profiles</span>
        </div>
        <p className="text-slate-400 text-center sm:text-right">
          Step {currentStep + 1} of {steps.length} — LoveConnect Onboarding
        </p>
      </footer>
    </div>
  );
}
