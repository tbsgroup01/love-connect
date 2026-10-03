import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  HelpCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { createSupportMessage } from "../../../services/supportServices.js";

export default function HelpSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill user details if logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        setFormData((prev) => ({
          ...prev,
          name: u.name || prev.name,
          email: u.email || prev.email,
          phone: u.phone_number || u.phone || prev.phone,
        }));
      }
    } catch (_) {
      // ignore
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please write your message.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createSupportMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Support submission error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to submit support request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      message: "",
    }));
  };

  return (
    <DashboardLayout activeTab="help">
      <div className="w-full max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12 font-poppins">
        {/* PAGE HEADER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#FF2D72]/20">
            <HelpCircle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#17151A] tracking-tight">
              Help & Support
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Have questions or need assistance? Fill out the form below and our team will get back to you shortly.
            </p>
          </div>
        </div>

        {/* SUPPORT FORM CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          {submitted ? (
            /* SUCCESS STATE */
            <div className="text-center py-8 sm:py-10 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                Message Sent Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#17151A] font-bold">{formData.name}</strong>. We have received your query and our support team will reach out to you at <strong className="text-[#FF2D72] font-semibold">{formData.email}</strong> or <strong className="text-[#7C3AED] font-semibold">{formData.phone}</strong> shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            /* SUPPORT FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-700 text-xs font-medium animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* NAME FIELD */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-[#17151A] mb-1.5"
                >
                  Full Name <span className="text-[#FF2D72]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:border-[#FF2D72] focus:ring-2 focus:ring-[#FF2D72]/10 transition-all bg-[#FAFAFC]"
                  />
                </div>
              </div>

              {/* EMAIL FIELD */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-[#17151A] mb-1.5"
                >
                  Email Address <span className="text-[#FF2D72]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. yourname@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:border-[#FF2D72] focus:ring-2 focus:ring-[#FF2D72]/10 transition-all bg-[#FAFAFC]"
                  />
                </div>
              </div>

              {/* PHONE NUMBER FIELD */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold text-[#17151A] mb-1.5"
                >
                  Phone Number <span className="text-[#FF2D72]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:border-[#FF2D72] focus:ring-2 focus:ring-[#FF2D72]/10 transition-all bg-[#FAFAFC]"
                  />
                </div>
              </div>

              {/* MESSAGE FIELD */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-[#17151A] mb-1.5"
                >
                  Message <span className="text-[#FF2D72]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue or query here..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-[#17151A] placeholder-slate-400 focus:outline-none focus:border-[#FF2D72] focus:ring-2 focus:ring-[#FF2D72]/10 transition-all bg-[#FAFAFC] resize-none"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff4382] to-[#7C3AED] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#FF2D72]/25 hover:shadow-[#FF2D72]/40 hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-98"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
