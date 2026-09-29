import React, { useState } from 'react';
import {
  Crown,
  Users,
  IndianRupee,
  Tag,
  Plus,
  Edit,
  Check,
  X,
  CheckCircle2,
  Percent,
  Power,
  Sparkles,
  Settings2,
  ShieldCheck,
  AlertCircle,
  HelpCircle
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

// Available features repository for plans
const DEFAULT_FEATURES_LIST = [
  { id: 'profile', name: 'Create & Edit Profile' },
  { id: 'browse', name: 'Browse & Discover Matches' },
  { id: 'likes', name: 'Likes (Daily or Unlimited)' },
  { id: 'chat', name: 'Chat Messaging' },
  { id: 'video', name: 'Video Calling' },
  { id: 'likes_you', name: 'See Who Likes You' },
  { id: 'filters', name: 'Advanced Match Filters' },
  { id: 'boost', name: 'Profile Boosts' },
  { id: 'read_receipts', name: 'Read Receipts' },
  { id: 'priority_support', name: 'VIP Priority Support' },
];

export default function SubscriptionPlans() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Subscription Plans');

  // Core 4 Subscription Plans required by user
  const [plans, setPlans] = useState([
    {
      id: 'free',
      name: 'Free',
      subtitle: 'Basic access for all new registered users',
      billingCycle: 'Forever',
      periodText: '/ forever',
      basePrice: 0,
      discountPercent: 0,
      finalPrice: 0,
      badge: 'Starter',
      badgeColor: '#6B7280',
      badgeBg: '#F3F4F6',
      isActive: true,
      cardBg: '#FFFFFF',
      borderStyle: 'border-gray-200',
      features: [
        { id: 'profile', name: 'Create & Edit Profile', included: true },
        { id: 'browse', name: 'Browse & Discover Matches', included: true },
        { id: 'likes', name: 'Limited Likes (10 per day)', included: true },
        { id: 'chat', name: 'Basic Chat Messaging', included: true },
        { id: 'video', name: 'Video Calling', included: false },
        { id: 'likes_you', name: 'See Who Likes You', included: false },
        { id: 'filters', name: 'Advanced Match Filters', included: false },
        { id: 'boost', name: 'Profile Boosts', included: false },
        { id: 'read_receipts', name: 'Read Receipts', included: false },
        { id: 'priority_support', name: 'VIP Priority Support', included: false },
      ],
    },
    {
      id: 'monthly',
      name: 'Monthly Premium',
      subtitle: 'Popular monthly flexibility for active daters',
      billingCycle: 'Monthly',
      periodText: '/ month',
      basePrice: 499,
      discountPercent: 0,
      finalPrice: 499,
      badge: 'Popular',
      badgeColor: '#FFFFFF',
      badgeBg: '#FF2D72',
      isActive: true,
      cardBg: '#FFF5F8',
      borderStyle: 'border-pink-300',
      features: [
        { id: 'profile', name: 'Create & Edit Profile', included: true },
        { id: 'browse', name: 'Browse & Discover Matches', included: true },
        { id: 'likes', name: 'Unlimited Likes', included: true },
        { id: 'chat', name: 'Unlimited Chat Messaging', included: true },
        { id: 'video', name: 'Video Calling (30 mins/day)', included: true },
        { id: 'likes_you', name: 'See Who Likes You', included: true },
        { id: 'filters', name: 'Advanced Match Filters', included: true },
        { id: 'boost', name: 'Profile Boosts', included: false },
        { id: 'read_receipts', name: 'Read Receipts', included: true },
        { id: 'priority_support', name: 'VIP Priority Support', included: false },
      ],
    },
    {
      id: 'quarterly',
      name: 'Quarterly Premium',
      subtitle: 'Quarterly savings with extended features',
      billingCycle: 'Quarterly',
      periodText: '/ 3 months',
      basePrice: 1499,
      discountPercent: 20,
      finalPrice: 1199,
      badge: 'Save 20%',
      badgeColor: '#7C3AED',
      badgeBg: '#F3E8FF',
      isActive: true,
      cardBg: '#FFFFFF',
      borderStyle: 'border-purple-200',
      features: [
        { id: 'profile', name: 'Create & Edit Profile', included: true },
        { id: 'browse', name: 'Browse & Discover Matches', included: true },
        { id: 'likes', name: 'Unlimited Likes', included: true },
        { id: 'chat', name: 'Unlimited Chat Messaging', included: true },
        { id: 'video', name: 'Unlimited Video Calling', included: true },
        { id: 'likes_you', name: 'See Who Likes You', included: true },
        { id: 'filters', name: 'Advanced Match Filters', included: true },
        { id: 'boost', name: '1 Free Profile Boost / month', included: true },
        { id: 'read_receipts', name: 'Read Receipts', included: true },
        { id: 'priority_support', name: 'VIP Priority Support', included: false },
      ],
    },
    {
      id: 'yearly',
      name: 'Yearly Premium',
      subtitle: 'Best value for long-term relationships',
      billingCycle: 'Yearly',
      periodText: '/ year',
      basePrice: 5999,
      discountPercent: 35,
      finalPrice: 3899,
      badge: 'Best Value',
      badgeColor: '#D97706',
      badgeBg: '#FEF3C7',
      isActive: true,
      cardBg: '#FFFFFF',
      borderStyle: 'border-amber-200',
      features: [
        { id: 'profile', name: 'Create & Edit Profile', included: true },
        { id: 'browse', name: 'Browse & Discover Matches', included: true },
        { id: 'likes', name: 'Unlimited Likes', included: true },
        { id: 'chat', name: 'Unlimited Chat Messaging', included: true },
        { id: 'video', name: 'Unlimited Video Calling', included: true },
        { id: 'likes_you', name: 'See Who Likes You', included: true },
        { id: 'filters', name: 'Advanced Match Filters', included: true },
        { id: 'boost', name: '5 Free Profile Boosts / month', included: true },
        { id: 'read_receipts', name: 'Read Receipts', included: true },
        { id: 'priority_support', name: 'VIP Priority Support', included: true },
      ],
    },
  ]);

  // Modal State for Create / Edit Plan
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    subtitle: '',
    billingCycle: 'Monthly',
    periodText: '/ month',
    basePrice: 499,
    discountPercent: 0,
    finalPrice: 499,
    badge: '',
    isActive: true,
    features: DEFAULT_FEATURES_LIST.map((f) => ({ ...f, included: true })),
  });
  const [customFeatureName, setCustomFeatureName] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // KPI calculations
  const totalPlans = plans.length;
  const activePlansCount = plans.filter((p) => p.isActive).length;
  const disabledPlansCount = plans.filter((p) => !p.isActive).length;
  const activeSubscribersCount = '8,432';

  const kpiCards = [
    {
      title: 'Total Plans',
      value: totalPlans.toString(),
      bgColor: '#FF2D72',
      icon: Crown,
    },
    {
      title: 'Active Plans',
      value: `${activePlansCount} Active`,
      bgColor: '#22C55E',
      icon: ShieldCheck,
    },
    {
      title: 'Disabled Plans',
      value: `${disabledPlansCount} Inactive`,
      bgColor: '#EF4444',
      icon: Power,
    },
    {
      title: 'Active Subscribers',
      value: activeSubscribersCount,
      bgColor: '#3B82F6',
      icon: Users,
    },
  ];

  // Action: Enable / Disable Plan
  const handleTogglePlanStatus = (planId) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const updatedStatus = !plan.isActive;
          showToast(
            `Plan "${plan.name}" has been ${updatedStatus ? 'enabled' : 'disabled'}`
          );
          return { ...plan, isActive: updatedStatus };
        }
        return plan;
      })
    );
  };

  // Open Create Plan Modal
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setFormData({
      id: `plan_${Date.now()}`,
      name: '',
      subtitle: '',
      billingCycle: 'Monthly',
      periodText: '/ month',
      basePrice: 499,
      discountPercent: 0,
      finalPrice: 499,
      badge: '',
      isActive: true,
      features: DEFAULT_FEATURES_LIST.map((f) => ({
        ...f,
        included: f.id === 'profile' || f.id === 'browse' || f.id === 'likes' || f.id === 'chat',
      })),
    });
    setCustomFeatureName('');
    setModalOpen(true);
  };

  // Open Edit Plan Modal
  const handleOpenEditModal = (plan) => {
    setModalMode('edit');
    // Ensure all features in DEFAULT_FEATURES_LIST exist in plan.features
    const existingFeaturesMap = new Map(plan.features.map((f) => [f.id, f]));
    const mergedFeatures = DEFAULT_FEATURES_LIST.map((df) => {
      if (existingFeaturesMap.has(df.id)) {
        return existingFeaturesMap.get(df.id);
      }
      return { ...df, included: false };
    });

    // Also include any extra custom features from plan
    plan.features.forEach((f) => {
      if (!DEFAULT_FEATURES_LIST.some((df) => df.id === f.id)) {
        mergedFeatures.push(f);
      }
    });

    setFormData({
      id: plan.id,
      name: plan.name,
      subtitle: plan.subtitle || '',
      billingCycle: plan.billingCycle || 'Monthly',
      periodText: plan.periodText || '/ month',
      basePrice: plan.basePrice,
      discountPercent: plan.discountPercent || 0,
      finalPrice: plan.finalPrice,
      badge: plan.badge || '',
      isActive: plan.isActive,
      features: mergedFeatures,
    });
    setCustomFeatureName('');
    setModalOpen(true);
  };

  // Handle Form Price / Discount Changes
  const handlePriceChange = (basePriceValue, discountPercentValue) => {
    const base = Math.max(0, Number(basePriceValue) || 0);
    const discount = Math.min(100, Math.max(0, Number(discountPercentValue) || 0));
    const calculatedFinal = Math.round(base * (1 - discount / 100));

    setFormData((prev) => ({
      ...prev,
      basePrice: base,
      discountPercent: discount,
      finalPrice: calculatedFinal,
    }));
  };

  // Toggle feature in form
  const handleToggleFormFeature = (featureId) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feat) =>
        feat.id === featureId ? { ...feat, included: !feat.included } : feat
      ),
    }));
  };

  // Add custom feature
  const handleAddCustomFeature = (e) => {
    e.preventDefault();
    if (!customFeatureName.trim()) return;
    const newId = `feat_${Date.now()}`;
    setFormData((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        { id: newId, name: customFeatureName.trim(), included: true },
      ],
    }));
    setCustomFeatureName('');
  };

  // Save Plan (Create or Edit)
  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a valid plan name.');
      return;
    }

    if (modalMode === 'create') {
      const newPlan = {
        ...formData,
        id: formData.id || `plan_${Date.now()}`,
        cardBg: '#FFFFFF',
        borderStyle: 'border-gray-200',
        badgeBg: formData.badge ? COLORS.pink : '',
        badgeColor: '#FFFFFF',
      };
      setPlans((prev) => [...prev, newPlan]);
      showToast(`Plan "${newPlan.name}" has been created successfully.`);
    } else {
      setPlans((prev) =>
        prev.map((p) => {
          if (p.id === formData.id) {
            return {
              ...p,
              ...formData,
              badgeBg: formData.badge ? p.badgeBg || COLORS.pink : '',
            };
          }
          return p;
        })
      );
      showToast(`Plan "${formData.name}" has been updated successfully.`);
    }

    setModalOpen(false);
  };

  // Direct Feature Matrix Toggle
  const handleToggleFeatureInMatrix = (planId, featureId) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const updatedFeatures = plan.features.map((f) =>
            f.id === featureId ? { ...f, included: !f.included } : f
          );
          return { ...plan, features: updatedFeatures };
        }
        return plan;
      })
    );
    showToast('Plan feature configuration updated.');
  };

  return (
    <div
      style={{ backgroundColor: COLORS.background, color: COLORS.dark }}
      className="h-screen font-sans flex flex-col overflow-hidden"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR HEADER */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR NAVIGATION */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                Subscription Management
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Create, edit, change pricing, configure discounts and features for subscription plans
              </p>
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create Plan</span>
            </button>
          </div>

          {/* TOP 4 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4"
                  style={{ borderLeftColor: kpi.bgColor }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: kpi.bgColor }}
                  >
                    <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-gray-500 block truncate">
                      {kpi.title}
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SUBSCRIPTION PLANS SECTION */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">Configured Subscription Plans</h2>
                <p className="text-xs text-gray-400">
                  Manage availability, edit prices, set discounts, and configure features
                </p>
              </div>
            </div>

            {/* 4 PLAN CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {plans.map((plan) => {
                const isFree = plan.basePrice === 0;
                const hasDiscount = plan.discountPercent > 0;

                return (
                  <div
                    key={plan.id}
                    className={`rounded-2xl p-5 border shadow-sm flex flex-col justify-between relative transition-all duration-200 hover:shadow-md ${plan.borderStyle || 'border-gray-200'
                      } ${!plan.isActive ? 'opacity-70 bg-gray-50/80 grayscale-30' : ''}`}
                    style={{ backgroundColor: plan.isActive ? plan.cardBg : '#F9FAFB' }}
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <span
                        className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-extrabold text-white shadow-2xs"
                        style={{
                          backgroundColor: plan.badgeBg || COLORS.pink,
                          color: plan.badgeColor || '#FFFFFF',
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      {/* Top Header: Title, Subtitle & Enable/Disable Toggle */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-1.5">
                            {plan.name}
                            {!plan.isActive && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold">
                                Disabled
                              </span>
                            )}
                          </h3>
                          <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-0.5">
                            {plan.subtitle}
                          </p>
                        </div>

                        {/* Enable / Disable Toggle Switch */}
                        <button
                          onClick={() => handleTogglePlanStatus(plan.id)}
                          title={plan.isActive ? 'Click to Disable Plan' : 'Click to Enable Plan'}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 focus:outline-none ${plan.isActive ? 'bg-[#22C55E]' : 'bg-gray-300'
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${plan.isActive ? 'translate-x-6' : 'translate-x-1'
                              }`}
                          />
                        </button>
                      </div>

                      {/* Pricing & Discount Display */}
                      <div className="my-4 p-3 bg-white/90 rounded-xl border border-gray-100/90 shadow-2xs">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-gray-900 tracking-tight">
                            ₹{plan.finalPrice}
                          </span>
                          <span className="text-xs text-gray-500 font-bold">{plan.periodText}</span>
                        </div>

                        {/* Discount Information */}
                        {hasDiscount && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400 line-through font-semibold">
                              ₹{plan.basePrice}
                            </span>
                            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-green-100 text-green-700 flex items-center gap-0.5">
                              <Percent className="w-2.5 h-2.5" />
                              {plan.discountPercent}% OFF
                            </span>
                          </div>
                        )}

                        {isFree && (
                          <div className="mt-1">
                            <span className="text-[10px] font-bold text-gray-400">
                              Free forever for all standard accounts
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Configured Features Header */}
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Included Features
                        </span>
                        <span className="text-[10px] font-semibold text-gray-500">
                          {plan.features.filter((f) => f.included).length} active
                        </span>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2 text-xs">
                        {plan.features.slice(0, 7).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            {feat.included ? (
                              <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[10px] shrink-0">
                                <X className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                            <span
                              className={`text-[11px] font-medium truncate ${feat.included ? 'text-gray-700' : 'text-gray-400 line-through'
                                }`}
                            >
                              {feat.name}
                            </span>
                          </div>
                        ))}
                        {plan.features.length > 7 && (
                          <div className="text-[10px] text-gray-400 font-semibold pl-6 pt-0.5">
                            + {plan.features.length - 7} more configured features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action: Edit Plan Button */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(plan)}
                        className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all hover:opacity-90 cursor-pointer text-white"
                        style={{ backgroundColor: COLORS.pink }}
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Plan</span>
                      </button>

                      <button
                        onClick={() => handleTogglePlanStatus(plan.id)}
                        className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${plan.isActive
                            ? 'border-gray-200 text-gray-600 hover:bg-gray-100'
                            : 'border-green-200 text-green-600 bg-green-50 hover:bg-green-100'
                          }`}
                        title={plan.isActive ? 'Disable Plan' : 'Enable Plan'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        </main>
      </div>

      {/* CREATE / EDIT PLAN MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900">
                  {modalMode === 'create' ? 'Create New Subscription Plan' : `Edit Plan: ${formData.name}`}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Configure plan details, pricing, discount percentages, and feature access
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSavePlan} className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Row 1: Plan Name & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Plan Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Monthly Premium"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF2D72]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Badge / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Popular, Save 20%, Best Value"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF2D72]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Plan Subtitle / Description</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Best for getting started with full unlimited features"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF2D72]"
                />
              </div>

              {/* Row 2: Billing Cycle & Enable/Disable Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Billing Cycle</label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => {
                      const val = e.target.value;
                      let pText = '/ month';
                      if (val === 'Quarterly') pText = '/ 3 months';
                      if (val === 'Yearly') pText = '/ year';
                      if (val === 'Forever') pText = '/ forever';
                      setFormData({
                        ...formData,
                        billingCycle: val,
                        periodText: pText,
                      });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF2D72]"
                  >
                    <option value="Forever">Free / Forever</option>
                    <option value="Monthly">Monthly (/ month)</option>
                    <option value="Quarterly">Quarterly (/ 3 months)</option>
                    <option value="Yearly">Yearly (/ year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Plan Status</label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.isActive ? 'bg-[#22C55E]' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                    <span className="text-xs font-bold text-gray-700">
                      {formData.isActive ? 'Enabled (Active for Users)' : 'Disabled (Hidden from Users)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Pricing & Discount Configuration */}
              <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/80 space-y-3">
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-[#FF2D72]" />
                  <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                    Price & Discount Configuration
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Regular Price */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Regular Base Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.basePrice}
                      onChange={(e) => handlePriceChange(e.target.value, formData.discountPercent)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#FF2D72]"
                    />
                  </div>

                  {/* Discount % */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discountPercent}
                      onChange={(e) => handlePriceChange(formData.basePrice, e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#FF2D72]"
                    />
                  </div>

                  {/* Calculated Final Price */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Final Price (₹)
                    </label>
                    <div className="w-full bg-pink-50/60 border border-pink-200 rounded-xl px-3 py-2 text-xs font-black text-[#FF2D72]">
                      ₹{formData.finalPrice} {formData.periodText}
                    </div>
                  </div>
                </div>

                {formData.discountPercent > 0 && (
                  <p className="text-[11px] text-green-600 font-semibold">
                    ✓ Users save ₹{formData.basePrice - formData.finalPrice} ({formData.discountPercent}% discount applied)
                  </p>
                )}
              </div>

              {/* Row 4: Feature Configuration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider block">
                    Configure Included Features
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Check the features that apply to this plan
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-100 rounded-xl bg-gray-50/40">
                  {formData.features.map((feat) => (
                    <label
                      key={feat.id}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-gray-100 hover:border-pink-200 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={feat.included}
                        onChange={() => handleToggleFormFeature(feat.id)}
                        className="rounded text-[#FF2D72] focus:ring-0 w-4 h-4 cursor-pointer"
                      />
                      <span
                        className={`text-xs font-medium truncate ${feat.included ? 'text-gray-900 font-semibold' : 'text-gray-400'
                          }`}
                      >
                        {feat.name}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Add Custom Feature */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={customFeatureName}
                    onChange={(e) => setCustomFeatureName(e.target.value)}
                    placeholder="Add custom feature (e.g. 10 Free Boosts)"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF2D72]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomFeature}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: COLORS.pink }}
                >
                  {modalMode === 'create' ? 'Create Plan' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
