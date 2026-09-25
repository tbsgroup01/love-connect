import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowLeft, CheckCircle2, Heart, Sparkles, Send } from "lucide-react"
import loveConnectLogo from "../../../assets/loveconnect.png"
import envelopeIllustration from "../../../assets/forgot_password_envelope.jpg"

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!identifier.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex items-center justify-center p-3 sm:p-5 lg:p-8 relative overflow-y-auto lg:overflow-hidden font-sans select-none py-8 lg:py-0">
      {/* Ambient Fluid Glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-[#7C3AED]/15 via-[#FFE7F0]/60 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-white/40 blur-3xl rounded-full pointer-events-none" />

      {/* Floating Animated Ambient Hearts */}
      <div className="absolute top-12 right-16 text-[#FF2D72]/20 pointer-events-none hidden sm:block animate-float-slow">
        <Heart className="w-8 h-8 fill-[#FF2D72]/15" />
      </div>
      <div className="absolute bottom-16 left-16 text-[#7C3AED]/20 pointer-events-none hidden sm:block animate-float-reverse">
        <Heart className="w-10 h-10 fill-[#7C3AED]/15" />
      </div>

      {/* Main SaaS Card (28px border radius, clean white, soft shadow) */}
      <div className="relative z-10 w-full max-w-[880px] h-auto bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 my-auto">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Form Section                                */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 order-1 lg:order-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          
          {/* Top Brand Logo */}
          <div className="mb-6 sm:mb-8">
            <Link
              to="/"
              title="Return to LoveConnect Home"
              className="inline-flex items-center group cursor-pointer"
            >
              <img
                src={loveConnectLogo}
                alt="LoveConnect"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Heading & Subtitle */}
          <div className="mb-6 sm:mb-7">
            <h1 className="text-2xl sm:text-[30px] font-black text-[#17151A] tracking-tight leading-tight">
              Forgot Password?
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1.5 font-normal max-w-sm">
              Enter your email or mobile number and we'll send you a reset link.
            </p>
          </div>

          {submitted ? (
            /* Success Feedback State */
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50/60 border border-green-200/80 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">
                    Reset link sent!
                  </h3>
                  <p className="text-xs text-emerald-700/90 mt-1 leading-relaxed">
                    We've dispatched password recovery instructions to{" "}
                    <span className="font-semibold text-emerald-900">{identifier}</span>.
                    Please check your messages or spam folder.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#7C3AED] hover:text-[#FF2D72] font-semibold hover:underline cursor-pointer"
              >
                Didn't receive it? Click to send again
              </button>

              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#FF2D72] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Reset Request Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#17151A] mb-1.5">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your email or mobile number"
                    value={identifier}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-[#17151A] placeholder-slate-400 bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs outline-none ${
                      isFocused
                        ? "border-[#FF2D72] ring-3 ring-[#FFE7F0]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="group w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#FF2D72] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF2D72]/25 hover:shadow-xl hover:shadow-[#FF2D72]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Reset Link</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>
              </div>

              {/* Back to Login Link */}
              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#FF2D72] transition-colors cursor-pointer"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          )}

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: 3D Isometric Envelope Illustration          */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 order-2 lg:order-2 bg-gradient-to-tr from-purple-50/50 via-pink-50/30 to-white flex items-center justify-center p-6 sm:p-8 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#FFE7F0]/60">
          
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE7F0]/30 via-transparent to-[#7C3AED]/5 pointer-events-none" />

          {/* 3D Envelope & Paper Airplane Illustration */}
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center group">
            <img
              src={envelopeIllustration}
              alt="Forgot Password Love Letter"
              className="w-full h-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105 drop-shadow-sm"
            />
          </div>

        </div>

      </div>
    </div>
  )
}
