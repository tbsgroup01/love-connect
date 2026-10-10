import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  Heart,
  Send,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Edit2,
} from "lucide-react";
import loveConnectLogo from "../../../assets/loveconnect.png";
import envelopeIllustration from "../../../assets/forgot_password_envelope.jpg";
import {
  forgetPassword,
  verifyResetOtp,
  resetPassword,
} from "../../../services/authServices.js";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(null);


  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your registered email address.");
      return;
    }
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await forgetPassword({ email: cleanEmail });
      if (res.data?.success !== false) {
        setStep("otp");
        setOtp("");
        setResendCountdown(60);
      } else {
        setError(res.data?.message || "Unable to send reset code. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Unable to send reset code. Please check your email and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCountdown > 0 || resendLoading) return;
    setError("");
    setResendLoading(true);

    try {
      const res = await forgetPassword({ email: email.trim().toLowerCase() });
      if (res.data?.success !== false) {
        setOtp("");
        setResendCountdown(60);
      } else {
        setError(res.data?.message || "Failed to resend code.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to resend reset code. Please try again."
      );
    } finally {
      setResendLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const cleanOtp = otp.trim();

    if (!cleanOtp) {
      setError("Please enter the 6-digit OTP code sent to your email.");
      return;
    }
    if (cleanOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await verifyResetOtp({
        email: email.trim().toLowerCase(),
        otp: cleanOtp,
      });

      if (res.data?.success !== false) {
        setStep("password");
      } else {
        setError(res.data?.message || "Invalid or expired OTP code.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid or expired OTP code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    if (e) e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match. Please re-enter.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await resetPassword({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        password: newPassword,
      });

      if (res.data?.success !== false) {
        setStep("success");
      } else {
        setError(res.data?.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to reset password. The OTP may have expired, please start over."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex items-center justify-center p-3 sm:p-5 lg:p-8 relative overflow-y-auto lg:overflow-hidden font-poppins select-none py-8 lg:py-0">
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

      {/* Main SaaS Card */}
      <div className="relative z-10 w-full max-w-[880px] h-auto bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 my-auto">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Form Section                                */}
        {/* ========================================================= */}
        <section aria-label="Password Reset Form" className="lg:col-span-7 order-1 lg:order-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* Top Brand Logo */}
          <div className="mb-4 sm:mb-6">
            <Link
              to="/"
              title="Return to LoveConnect Home"
              className="inline-flex items-center group cursor-pointer"
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
          </div>

          {/* Stepper Indicator */}
          {step !== "success" && (
            <div className="flex items-center gap-2 mb-5">
              {[
                { id: "email", label: "Email" },
                { id: "otp", label: "OTP Code" },
                { id: "password", label: "New Password" },
              ].map((s, idx) => {
                const stepOrder = { email: 1, otp: 2, password: 3 };
                const currentOrder = stepOrder[step];
                const itemOrder = stepOrder[s.id];
                const isPassed = itemOrder < currentOrder;
                const isCurrent = itemOrder === currentOrder;

                return (
                  <React.Fragment key={s.id}>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isCurrent
                            ? "bg-[#FF2D72] text-white shadow-xs shadow-[#FF2D72]/40"
                            : isPassed
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isPassed ? "✓" : idx + 1}
                      </div>
                      <span
                        className={`text-[11px] font-medium hidden sm:inline ${
                          isCurrent
                            ? "text-[#17151A] font-bold"
                            : isPassed
                            ? "text-emerald-700"
                            : "text-slate-400"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div
                        className={`flex-1 h-0.5 rounded-full transition-all ${
                          itemOrder < currentOrder
                            ? "bg-emerald-500"
                            : "bg-slate-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Error Alert Box */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200/80 flex items-start gap-2.5 text-xs text-red-600 font-medium animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* ======================================================= */}
          {/* STEP 1: Enter Email                                     */}
          {/* ======================================================= */}
          {step === "email" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-[28px] font-black text-[#17151A] tracking-tight leading-tight">
                  Forgot Password?
                </h1>
                <p className="text-xs sm:text-sm text-[#64748b] mt-1.5 font-normal">
                  Enter your registered email address and we'll send you a 6-digit OTP verification code.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#17151A] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                        isFocused === "email" ? "text-[#FF2D72]" : "text-slate-400"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onFocus={() => setIsFocused("email")}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm text-[#17151A] placeholder-slate-400 bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs outline-none ${
                        isFocused === "email"
                          ? "border-[#FF2D72] ring-3 ring-[#FFE7F0]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF2D72]/25 hover:shadow-xl hover:shadow-[#FF2D72]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? "Sending OTP..." : "Send Verification Code"}</span>
                    {!loading && (
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#FF2D72] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================= */}
          {/* STEP 2: Verify OTP Code                                 */}
          {/* ======================================================= */}
          {step === "otp" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-[28px] font-black text-[#17151A] tracking-tight leading-tight">
                  Enter 6-Digit OTP
                </h1>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <p className="text-xs sm:text-sm text-[#64748b] font-normal">
                    Code sent to <span className="font-semibold text-[#17151A]">{email}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setError("");
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Change</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#17151A] mb-1.5">
                    Verification Code (OTP)
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                        isFocused === "otp" ? "text-[#FF2D72]" : "text-slate-400"
                      }`}
                    >
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="123456"
                      value={otp}
                      onFocus={() => setIsFocused("otp")}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setOtp(val);
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-center tracking-[0.35em] text-lg font-bold text-[#17151A] placeholder-slate-300 bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs outline-none ${
                        isFocused === "otp"
                          ? "border-[#FF2D72] ring-3 ring-[#FFE7F0]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    />
                  </div>
                </div>

                {/* Resend Countdown Control */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#64748b]">Didn't receive code?</span>
                  {resendCountdown > 0 ? (
                    <span className="text-slate-400 font-semibold">
                      Resend in {resendCountdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={resendLoading}
                      onClick={handleResendOtp}
                      className="text-[#FF2D72] hover:text-[#7C3AED] font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className={`w-3 h-3 ${resendLoading ? "animate-spin" : ""}`} />
                      <span>{resendLoading ? "Sending..." : "Resend OTP"}</span>
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="group w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF2D72]/25 hover:shadow-xl hover:shadow-[#FF2D72]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? "Verifying OTP..." : "Verify Code"}</span>
                    {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setError("");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#FF2D72] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Email Step</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================= */}
          {/* STEP 3: Reset Password                                  */}
          {/* ======================================================= */}
          {step === "password" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-[28px] font-black text-[#17151A] tracking-tight leading-tight">
                  Set New Password
                </h1>
                <p className="text-xs sm:text-sm text-[#64748b] mt-1.5 font-normal">
                  OTP verified! Enter your new password below (min. 6 characters).
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-[#17151A] mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                        isFocused === "newPassword" ? "text-[#FF2D72]" : "text-slate-400"
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter new password"
                      value={newPassword}
                      onFocus={() => setIsFocused("newPassword")}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border text-xs sm:text-sm text-[#17151A] placeholder-slate-400 bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs outline-none ${
                        isFocused === "newPassword"
                          ? "border-[#FF2D72] ring-3 ring-[#FFE7F0]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#FF2D72] transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-[#17151A] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                        isFocused === "confirmPassword" ? "text-[#FF2D72]" : "text-slate-400"
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onFocus={() => setIsFocused("confirmPassword")}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border text-xs sm:text-sm text-[#17151A] placeholder-slate-400 bg-[#FAFAFC] focus:bg-white transition-all shadow-2xs outline-none ${
                        isFocused === "confirmPassword"
                          ? "border-[#FF2D72] ring-3 ring-[#FFE7F0]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#FF2D72] transition-colors cursor-pointer"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF2D72]/25 hover:shadow-xl hover:shadow-[#FF2D72]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? "Resetting Password..." : "Save New Password"}</span>
                    {!loading && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================= */}
          {/* STEP 4: Success Screen                                  */}
          {/* ======================================================= */}
          {step === "success" && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#17151A] tracking-tight">
                  Password Reset Successfully!
                </h2>
                <p className="text-xs sm:text-sm text-[#64748b] mt-2 max-w-sm mx-auto leading-relaxed">
                  Your LoveConnect password has been securely updated. You can now log into your account using your new password.
                </p>
              </div>

              <div className="pt-2 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => navigate("/login", { replace: true })}
                  className="w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] hover:brightness-105 text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF2D72]/25 hover:shadow-xl hover:shadow-[#FF2D72]/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: 3D Isometric Envelope Illustration          */}
        {/* ========================================================= */}
        <aside aria-label="Password Recovery Security Illustration" className="lg:col-span-5 order-2 lg:order-2 bg-gradient-to-tr from-purple-50/50 via-pink-50/30 to-white flex items-center justify-center p-6 sm:p-8 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#FFE7F0]/60">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE7F0]/30 via-transparent to-[#7C3AED]/5 pointer-events-none" />

          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center group">
            <img
              src={envelopeIllustration}
              alt="LoveConnect password recovery reset code security envelope illustration"
              width="320"
              height="320"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
