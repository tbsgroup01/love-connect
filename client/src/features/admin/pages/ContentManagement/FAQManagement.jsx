import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  seedFaqs,
} from "../../../../services/faqsServices.js";

const COLORS = {
  pink: "#FF2D72",
  lightPink: "#FFE7F0",
  purple: "#7C3AED",
  dark: "#17151A",
  white: "#FFFFFF",
  background: "#FAFAFC",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  blue: "#3B82F6",
};

export default function FAQManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("FAQ Management");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  // Form State - Question and Answer only
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback((current) => (current?.message === message ? null : current));
    }, 4000);
  };

  const fetchFaqsList = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      else setLoading(true);
      const res = await getFaqs();
      const list = res.data?.faqs || [];
      setFaqs(list);
    } catch (err) {
      console.error("Failed to load FAQs:", err);
      showFeedback("error", "Failed to load FAQs from backend server");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFaqsList();
  }, []);

  const handleSeedFaqs = async () => {
    try {
      setSeeding(true);
      const res = await seedFaqs();
      if (res.data?.faqs) {
        setFaqs(res.data.faqs);
      } else {
        await fetchFaqsList(true);
      }
      showFeedback(
        "success",
        res.data?.message || "Default FAQs seeded successfully!"
      );
    } catch (err) {
      console.error("Failed to seed FAQs:", err);
      showFeedback("error", "Failed to seed default FAQs");
    } finally {
      setSeeding(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setForm({
      question: "",
      answer: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingFaq(faq);
    setForm({
      question: faq.question || "",
      answer: faq.answer || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (faq) => {
    const targetId = faq.id || faq.faq_id;
    if (!window.confirm(`Are you sure you want to delete this FAQ: "${faq.question}"?`)) {
      return;
    }
    try {
      await deleteFaq(targetId);
      setFaqs((prev) => prev.filter((f) => (f.id || f.faq_id) !== targetId));
      showFeedback("success", "FAQ deleted successfully");
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
      showFeedback("error", "Failed to delete FAQ question");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      showFeedback("error", "Question and Answer cannot be empty");
      return;
    }

    try {
      setSubmitting(true);
      if (editingFaq) {
        const targetId = editingFaq.id || editingFaq.faq_id;
        const payload = {
          ...form,
          category: editingFaq.category || "General",
          status: editingFaq.status || "active",
        };
        const res = await updateFaq(targetId, payload);
        const updatedItem = res.data?.faq;
        setFaqs((prev) =>
          prev.map((f) =>
            (f.id || f.faq_id) === targetId ? updatedItem || { ...f, ...payload } : f
          )
        );
        showFeedback("success", "FAQ updated successfully");
      } else {
        const payload = {
          ...form,
          category: "General",
          status: "active",
        };
        const res = await createFaq(payload);
        const createdItem = res.data?.faq;
        if (createdItem) {
          setFaqs((prev) => [...prev, createdItem]);
        } else {
          await fetchFaqsList(true);
        }
        showFeedback("success", "FAQ created successfully");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save FAQ:", err);
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to save FAQ question"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const query = searchTerm.toLowerCase();
    return (
      (f.question || "").toLowerCase().includes(query) ||
      (f.answer || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar
          activeTab="FAQ Management"
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TOAST / FEEDBACK ALERT */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold shadow-sm transition-all duration-300 animate-slideDown ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
              <button
                onClick={() => setFeedback(null)}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <HelpCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
                  FAQ Management
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  {faqs.length} Questions
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Maintain public customer help center questions, categorizations,
                answers, and display order.
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              {/* REFRESH BUTTON */}
              <button
                onClick={() => fetchFaqsList(true)}
                disabled={refreshing || loading}
                title="Refresh FAQs"
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin text-[#FF2D72]" : ""}`}
                />
              </button>

              {/* SEED INITIAL DATA BUTTON */}
              <button
                onClick={handleSeedFaqs}
                disabled={seeding || loading}
                title="Seed / Restore Default Initial FAQs"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 shadow-xs transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
              >
                {seeding ? (
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                ) : (
                  <Sparkles className="w-4 h-4 text-purple-600" />
                )}
                <span>Seed Initial FAQs</span>
              </button>

              {/* ADD FAQ BUTTON */}
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer bg-[#FF2D72]"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add FAQ Question</span>
              </button>
            </div>
          </div>

          {/* SEARCH BAR (Full Width Clean Bar) */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* FAQS ACCORDION / LIST */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
              <div className="flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF2D72]" />
                <p className="text-xs font-semibold text-gray-500">
                  Loading FAQ repository...
                </p>
              </div>
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#FF2D72] mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {searchTerm
                    ? "No matching questions found"
                    : "No FAQs in yet"}
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  {searchTerm
                    ? "Try adjusting your search query."
                    : "You can quickly seed default FAQs or add a new question to get started."}
                </p>
              </div>

              {!searchTerm && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleSeedFaqs}
                    disabled={seeding}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>Seed Default FAQs</span>
                  </button>
                  <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#FF2D72] hover:bg-[#e02663] transition-all cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add Question</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const faqUniqueKey = faq.id || faq.faq_id || index;
                const isExpanded = expandedId === faqUniqueKey;

                return (
                  <div
                    key={faqUniqueKey}
                    className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all hover:border-gray-200"
                  >
                    <div
                      onClick={() =>
                        setExpandedId(isExpanded ? null : faqUniqueKey)
                      }
                      className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/60"
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-4">
                        <span className="w-8 h-8 rounded-xl bg-pink-100 text-[#FF2D72] font-black text-xs flex items-center justify-center shrink-0">
                          #{faq.order || index + 1}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-2 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleOpenEdit(faq)}
                          className="p-2 rounded-xl text-gray-500 hover:text-[#7C3AED] hover:bg-purple-50 transition-colors cursor-pointer"
                          title="Edit Question"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq)}
                          className="p-2 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="p-1.5 text-gray-400">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-3 border-t border-gray-100 bg-gray-50/60 font-normal">
                        <p className="mt-1 text-sm text-gray-800 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ADD / EDIT MODAL (Clean: Question & Answer only) */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-black text-gray-900">
                    {editingFaq ? "Edit FAQ Item" : "Add FAQ Question"}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* QUESTION */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Question *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. How does photo verification work?"
                      value={form.question}
                      onChange={(e) =>
                        setForm({ ...form, question: e.target.value })
                      }
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                    />
                  </div>

                  {/* ANSWER BODY */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Answer Body *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write a clear and comprehensive answer..."
                      value={form.answer}
                      onChange={(e) =>
                        setForm({ ...form, answer: e.target.value })
                      }
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      disabled={submitting}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md cursor-pointer disabled:opacity-50"
                      style={{ backgroundColor: COLORS.pink }}
                    >
                      {submitting && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      )}
                      <span>
                        {editingFaq ? "Save Changes" : "Create FAQ Question"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
