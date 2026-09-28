import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import AdminNavbar from '../../components/Navbar';
import AdminSidebar from '../../components/Sidebar';

const COLORS = {
  pink: '#FF2D72',
  lightPink: '#FFE7F0',
  purple: '#7C3AED',
  dark: '#17151A',
  white: '#FFFFFF',
  background: '#FAFAFC',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  blue: '#3B82F6',
};

const INITIAL_FAQS = [
  {
    id: 'FAQ-1',
    category: 'Matching & Discovery',
    question: 'How does LoveConnect match people?',
    answer: 'LoveConnect utilizes an advanced AI compatibility score combined with proximity radius, lifestyle interests, and relationship goals. Profiles with verified badges and mutual interest are prioritized in your daily swipe stack.',
    order: 1,
    status: 'Published',
    views: '48,200',
  },
  {
    id: 'FAQ-2',
    category: 'Safety & Verification',
    question: 'How does the blue checkmark photo verification work?',
    answer: 'Users perform a dynamic 5-second selfie gesture verification. Our secure biometric engine compares your real-time facial landmarks against your uploaded gallery photos. Once confirmed by our moderation team, your profile receives the verified badge.',
    order: 2,
    status: 'Published',
    views: '62,400',
  },
  {
    id: 'FAQ-3',
    category: 'Subscriptions & Billing',
    question: 'What is included in the LoveConnect Premium Plan?',
    answer: 'Premium unlocks Unlimited Likes, the ability to See Who Likes You, 5 free weekly Super Likes, Profile Boost to top of deck, Rewind Swipes, Advanced Filters (height, lifestyle, verified only), and an ad-free experience.',
    order: 3,
    status: 'Published',
    views: '39,150',
  },
  {
    id: 'FAQ-4',
    category: 'Account & Privacy',
    question: 'Can I hide my profile without deleting my account?',
    answer: 'Yes! In Settings > Profile Visibility, choose "Hidden" or enable "Incognito Mode". Existing matches can still message you, but your profile will not be shown to any new prospective members.',
    order: 4,
    status: 'Published',
    views: '24,800',
  },
  {
    id: 'FAQ-5',
    category: 'Subscriptions & Billing',
    question: 'How do I cancel or request a refund for a subscription?',
    answer: 'Subscriptions can be managed directly in the Account Settings > Subscription tab. For refund requests within 48 hours of purchase, please reach out to support@loveconnect.com with your transaction receipt ID.',
    order: 5,
    status: 'Published',
    views: '18,900',
  },
  {
    id: 'FAQ-6',
    category: 'Safety & Verification',
    question: 'What happens when I report a suspicious user or message?',
    answer: 'Our 24/7 trust & safety moderation team investigates flagged accounts within 15 minutes. If a profile violates our community guidelines (scam, fake photos, harassment), they are immediately banned across device hardware IDs.',
    order: 6,
    status: 'Published',
    views: '31,400',
  },
];

export default function FAQManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('FAQ Management');
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  // Form State
  const [form, setForm] = useState({
    category: 'Matching & Discovery',
    question: '',
    answer: '',
    order: 1,
    status: 'Published',
  });

  const categories = ['All', 'Matching & Discovery', 'Safety & Verification', 'Subscriptions & Billing', 'Account & Privacy'];

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setForm({
      category: 'Matching & Discovery',
      question: '',
      answer: '',
      order: faqs.length + 1,
      status: 'Published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingFaq(faq);
    setForm({ ...faq });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      setFaqs(
        faqs.map((f) => (f.id === editingFaq.id ? { ...f, ...form } : f))
      );
    } else {
      const newFaq = {
        id: `FAQ-${faqs.length + 1}`,
        ...form,
        views: '0',
      };
      setFaqs([...faqs, newFaq]);
    }
    setIsModalOpen(false);
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A]">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar activeTab="FAQ Management" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <HelpCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: COLORS.dark }}>
                  FAQ Management
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  {faqs.length} Questions
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Maintain public customer help center questions, categorizations, answers, and display order.
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add FAQ Question</span>
            </button>
          </div>

          {/* SEARCH & CATEGORY FILTER BAR */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#FF2D72] text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-[#FF2D72]"
              />
            </div>
          </div>

          {/* FAQS ACCORDION / LIST */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-pink-50 text-[#FF2D72] font-black text-xs flex items-center justify-center shrink-0">
                        #{faq.order}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-gray-900">{faq.question}</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#FFE7F0] text-[#FF2D72]">
                            {faq.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-0.5">
                          {faq.views} views • Status: <span className="text-green-600 font-bold">{faq.status}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenEdit(faq)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#7C3AED] hover:bg-purple-50"
                        title="Edit Question"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="p-1.5 text-gray-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/40">
                      <p className="mt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ADD / EDIT MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-black text-gray-900">
                    {editingFaq ? 'Edit FAQ Item' : 'Add FAQ Question'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Question Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 bg-white"
                    >
                      <option>Matching & Discovery</option>
                      <option>Safety & Verification</option>
                      <option>Subscriptions & Billing</option>
                      <option>Account & Privacy</option>
                      <option>General Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Question *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. How does photo verification work?"
                      value={form.question}
                      onChange={(e) => setForm({ ...form, question: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Answer Body *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write a clear and comprehensive answer..."
                      value={form.answer}
                      onChange={(e) => setForm({ ...form, answer: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={form.order}
                        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                        className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 bg-white"
                      >
                        <option>Published</option>
                        <option>Draft</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md cursor-pointer"
                      style={{ backgroundColor: COLORS.pink }}
                    >
                      Save FAQ Item
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
