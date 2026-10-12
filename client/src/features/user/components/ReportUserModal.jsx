import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  ShieldAlert,
  X,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ChevronRight,
  UserX,
  MessageSquareWarning,
  CameraOff,
  UserMinus,
  Megaphone,
  HelpCircle,
} from "lucide-react";
import { createReport } from "../../../services/reportsServices.js";

const REPORT_REASONS = [
  {
    id: "fake_profile",
    label: "Fake Profile / Scam",
    description: "Using stolen photos, imposter account, or financial scams",
    icon: UserX,
  },
  {
    id: "harassment",
    label: "Harassment or Abusive Behavior",
    description: "Offensive language, bullying, or persistent unwanted messages",
    icon: MessageSquareWarning,
  },
  {
    id: "explicit_content",
    label: "Inappropriate or Explicit Content",
    description: "Nudity, sexually explicit photos, or solicitation",
    icon: CameraOff,
  },
  {
    id: "underage",
    label: "Underage User (Under 18)",
    description: "The user is or claims to be under 18 years of age",
    icon: UserMinus,
  },
  {
    id: "spam_bot",
    label: "Spam, Bot, or Commercial Promotion",
    description: "Automated account, selling products/services, or phishing links",
    icon: Megaphone,
  },
  {
    id: "other",
    label: "Other Community Guideline Violation",
    description: "Behavior that violates safety rules not listed above",
    icon: HelpCircle,
  },
];

export default function ReportUserModal({
  isOpen,
  onClose,
  reportedUser,
  onSuccess,
}) {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !reportedUser) return null;

  const handleClose = () => {
    if (submitting) return;
    setSelectedReason("");
    setDescription("");
    setError(null);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReason) {
      setError("Please select a reason for reporting");
      return;
    }

    const targetReason =
      REPORT_REASONS.find((r) => r.id === selectedReason)?.label ||
      selectedReason;

    setSubmitting(true);
    setError(null);

    try {
      await createReport({
        reported_user_id: reportedUser.id,
        reason: targetReason,
        description: description.trim() || undefined,
      });

      setSubmitted(true);

      setTimeout(() => {
        handleClose();
        if (onSuccess) {
          onSuccess(reportedUser);
        }
      }, 1800);
    } catch (err) {
      console.error("Failed to submit report:", err);
      const msg =
        err.response?.data?.message ||
        "Could not submit report. Please check your connection and try again.";
      setError(msg);
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative px-5 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-rose-50/70 via-pink-50/40 to-purple-50/60">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer disabled:opacity-50"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="min-w-0 pr-6">
              <h3 className="text-base sm:text-lg font-black text-[#17151A] tracking-tight">
                Report {reportedUser.name || "User"}
              </h3>
              <p className="text-xs text-slate-500 font-medium truncate">
                Your report is anonymous & confidential
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-[#17151A]">
              Report Submitted
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Thank you for keeping LoveConnect safe. Our safety & moderation
              team will review this account promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                Why are you reporting this user?
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {REPORT_REASONS.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedReason === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSelectedReason(r.id);
                        setError(null);
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-rose-50/80 border-rose-300 shadow-xs"
                          : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-rose-500 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block text-xs font-bold leading-tight ${
                            isSelected ? "text-rose-900" : "text-[#17151A]"
                          }`}
                        >
                          {r.label}
                        </span>
                        <span className="block text-[11px] text-slate-500 leading-snug mt-0.5">
                          {r.description}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                          isSelected
                            ? "text-rose-500 translate-x-0.5"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                  Additional Details (Optional)
                </label>
                <span className="text-[10px] text-slate-400">
                  {description.length}/500
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                rows={3}
                placeholder="Provide any additional context to help our moderators..."
                disabled={submitting}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#17151A] bg-slate-50 focus:bg-white focus:border-[#FF2D72] outline-none transition-all resize-none font-medium"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedReason || submitting}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-[#FF2D72] hover:brightness-105 text-white font-black text-xs shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
