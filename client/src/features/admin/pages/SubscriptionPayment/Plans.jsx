import React, { useState, useEffect } from 'react';
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
  HelpCircle,
  RefreshCw,
  Loader2,
  Trash2,
} from 'lucide-react';
import AdminNavbar from '../../components/Navbar';
import AdminSidebar from '../../components/Sidebar';
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  seedPlans,
} from '../../../../services/plansServices.js';

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
  { id: 'likes', name: 'Likes (10 Daily vs Unlimited)' },
  { id: 'chat', name: 'Chat (1 Chat vs Unlimited)' },
  { id: 'video', name: 'Video Calling' },
  { id: 'likes_you', name: 'See Who Likes You' },
  { id: 'filters', name: 'Advanced Match Filters' },
  { id: 'boost', name: 'Profile Boosts' },
  { id: 'read_receipts', name: 'Read Receipts' },
  { id: 'priority_support', name: 'VIP Priority Support' },
];

// Helper to parse DB plan records into UI presentation models
const parsePlanData = (plan) => {
  let subtitle = plan.description || '';
  let badge = '';
  let discountPercent = 0;
  let basePrice = Number(plan.price) || 0;
  let features = null;

  try {
    if (plan.description && plan.description.trim().startsWith('{')) {
      const meta = JSON.parse(plan.description);
      subtitle = meta.subtitle || subtitle;
      badge = meta.badge || '';
      discountPercent = meta.discountPercent || 0;
      basePrice = meta.basePrice || basePrice;
      features = meta.features || null;
    }
  } catch (e) {
    // Plain text description
  }

  // Derive billingCycle & periodText from duration (0, 1 Month, 3 Months, 1 Year)
  const duration = Number(plan.duration) || 0;
  let billingCycle = '1 Month';
  let periodText = '/ month';

  if (duration === 0) {
    billingCycle = 'Forever';
    periodText = '/ forever';
    if (!badge) badge = '10 Likes & 1 Chat';
  } else if (duration <= 30) {
    billingCycle = '1 Month';
    periodText = '/ month';
    if (!badge) badge = 'Popular (Full Access)';
  } else if (duration <= 90) {
    billingCycle = '3 Months';
    periodText = '/ 3 months';
    if (!badge) badge = 'Save 20% (Full Access)';
  } else {
    billingCycle = '1 Year';
    periodText = '/ year';
    if (!badge) badge = 'Best Value (Full Access)';
  }

  // Fallback default features based on tier if not customized
  if (!features || !features.length) {
    features = DEFAULT_FEATURES_LIST.map((df) => {
      let included = false;
      let displayName = df.name;
      if (duration === 0) {
        // Free Plan: ONLY 10 Likes, 1 Chat, and Profile/Browse
        if (df.id === 'likes') {
          displayName = '10 Daily Likes';
          included = true;
        } else if (df.id === 'chat') {
          displayName = '1 Chat Conversation';
          included = true;
        } else if (df.id === 'profile' || df.id === 'browse') {
          included = true;
        } else {
          included = false;
        }
      } else {
        // Paid Plans (1 Month, 3 Months, 1 Year): ALL FEATURES UNLOCKED!
        if (df.id === 'likes') displayName = 'Unlimited Likes & Rewind';
        else if (df.id === 'chat') displayName = 'Unlimited Chat Messaging';
        included = true;
      }
      return { ...df, name: displayName, included };
    });
  }

  const finalPrice = Number(plan.price) || 0;
  if (!basePrice || basePrice < finalPrice) {
    basePrice = finalPrice;
  }

  // Card theme styling based on plan
  let cardBg = '#FFFFFF';
  let borderStyle = 'border-gray-200';
  let badgeBg = '#F3F4F6';
  let badgeColor = '#6B7280';

  if (duration === 0) {
    cardBg = '#FFFFFF';
    borderStyle = 'border-gray-200';
    badgeBg = '#F3F4F6';
    badgeColor = '#6B7280';
  } else if (duration <= 30) {
    cardBg = '#FFF5F8';
    borderStyle = 'border-pink-300';
    badgeBg = '#FF2D72';
    badgeColor = '#FFFFFF';
  } else if (duration <= 90) {
    cardBg = '#FAF5FF';
    borderStyle = 'border-purple-200';
    badgeBg = '#7C3AED';
    badgeColor = '#FFFFFF';
  } else {
    cardBg = '#FFFDF5';
    borderStyle = 'border-amber-300';
    badgeBg = '#D97706';
    badgeColor = '#FFFFFF';
  }

  return {
    id: plan.id,
    plan_id: plan.plan_id,
    name: plan.name,
    subtitle: subtitle || plan.description || 'Standard membership access',
    billingCycle,
    periodText,
    duration,
    basePrice,
    discountPercent,
    finalPrice,
    badge,
    badgeColor,
    badgeBg,
    isActive: plan.status === 'active',
    status: plan.status,
    cardBg,
    borderStyle,
    features,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  };
};

export default function Plans() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Subscription Plans');

  // DB-connected Plans State
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  // Delete Confirmation Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Fetch plans from backend database
  const fetchPlansList = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      else setLoading(true);

      const res = await getPlans();
      const rawPlans = res.data?.plans || [];
      const mapped = rawPlans.map(parsePlanData);
      setPlans(mapped);
    } catch (err) {
      console.error('Failed to load plans from DB:', err);
      showToast('Failed to load subscription plans.', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPlansList();
  }, []);

  // Seed Default Plans into Database
  const handleSeedPlans = async () => {
    try {
      setSeeding(true);
      const res = await seedPlans();
      showToast(res.data?.message || 'Default subscription plans seeded successfully!');
      await fetchPlansList(true);
    } catch (err) {
      console.error('Failed to seed plans:', err);
      showToast('Failed to seed default plans.', 'error');
    } finally {
      setSeeding(false);
    }
  };

  // KPI calculations based on DB plans
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

  // Action: Enable / Disable Plan in DB
  const handleTogglePlanStatus = async (plan) => {
    const newStatus = plan.isActive ? 'inactive' : 'active';
    const actionLabel = plan.isActive ? 'disabled' : 'enabled';

    // Optimistic UI update
    setPlans((prev) =>
      prev.map((p) =>
        p.id === plan.id ? { ...p, isActive: !p.isActive, status: newStatus } : p
      )
    );

    try {
      await updatePlan(plan.id, { status: newStatus });
      showToast(`Plan "${plan.name}" has been ${actionLabel}.`);
    } catch (err) {
      console.error('Failed to toggle plan status:', err);
      showToast(`Failed to update status for "${plan.name}"`, 'error');
      fetchPlansList();
    }
  };

  // Open Create Plan Modal
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setFormData({
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
    const existingFeaturesMap = new Map((plan.features || []).map((f) => [f.id, f]));
    const mergedFeatures = DEFAULT_FEATURES_LIST.map((df) => {
      if (existingFeaturesMap.has(df.id)) {
        return existingFeaturesMap.get(df.id);
      }
      return { ...df, included: false };
    });

    (plan.features || []).forEach((f) => {
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
      basePrice: plan.basePrice || plan.finalPrice || 0,
      discountPercent: plan.discountPercent || 0,
      finalPrice: plan.finalPrice || 0,
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

  // Add custom feature in modal
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

  // Save Plan (Create or Edit) to Backend DB
  const handleSavePlan = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a valid plan name.', 'error');
      return;
    }

    try {
      setSubmitting(true);

      // Map duration in days from billingCycle (0, 1 Month, 3 Months, 1 Year)
      let durationDays = 30;
      if (formData.billingCycle === 'Forever') durationDays = 0;
      else if (formData.billingCycle === '1 Month' || formData.billingCycle === 'Monthly') durationDays = 30;
      else if (formData.billingCycle === '3 Months' || formData.billingCycle === 'Quarterly') durationDays = 90;
      else if (formData.billingCycle === '1 Year' || formData.billingCycle === 'Yearly') durationDays = 365;

      // Pack metadata into description field
      const metaPayload = JSON.stringify({
        subtitle: formData.subtitle || `${formData.name} Plan`,
        badge: formData.badge,
        basePrice: formData.basePrice,
        discountPercent: formData.discountPercent,
        features: formData.features,
      });

      const payload = {
        name: formData.name.trim(),
        price: Number(formData.finalPrice) || 0,
        duration: durationDays,
        description: metaPayload,
        status: formData.isActive ? 'active' : 'inactive',
      };

      if (modalMode === 'create') {
        await createPlan(payload);
        showToast(`Plan "${formData.name}" created successfully.`);
      } else {
        await updatePlan(formData.id, payload);
        showToast(`Plan "${formData.name}" updated successfully.`);
      }

      setModalOpen(false);
      await fetchPlansList(true);
    } catch (err) {
      console.error('Error saving plan:', err);
      showToast(err.response?.data?.message || 'Failed to save plan.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Permanently Delete Plan from DB
  const handleConfirmDelete = async () => {
    if (!planToDelete) return;

    try {
      setDeleting(true);
      await deletePlan(planToDelete.id);
      showToast(`Plan "${planToDelete.name}" has been permanently deleted.`);
      setDeleteModalOpen(false);
      setPlanToDelete(null);
      await fetchPlansList(true);
    } catch (err) {
      console.error('Failed to delete plan:', err);
      showToast(err.response?.data?.message || 'Failed to delete plan', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: COLORS.background, color: COLORS.dark }}
      className="h-screen font-sans flex flex-col overflow-hidden select-none"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-top-4 ${
            toastType === 'error' ? 'bg-red-900 text-red-100' : 'bg-gray-900 text-white'
          }`}
        >
          {toastType === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          )}
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
              <div className="flex items-center gap-2.5">
               
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  Subscription Management
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  {plans.length} Plans
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Connected directly to MySQL database &mdash; configure pricing, feature tiers, discounts, and availability
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              {/* REFRESH FROM DB */}
              <button
                onClick={() => fetchPlansList(true)}
                disabled={refreshing || loading}
                title="Refresh Plans"
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#FF2D72]' : ''}`}
                />
              </button>

              {/* SEED DEFAULT PLANS */}
              <button
                onClick={handleSeedPlans}
                disabled={seeding || loading}
                title="Seed / Restore Default Plans into DB"
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
              >
                {seeding ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{seeding ? 'Seeding...' : 'Seed Default Plans'}</span>
              </button>

              {/* CREATE PLAN */}
              <button
                onClick={handleOpenCreateModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: COLORS.pink }}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Create Plan</span>
              </button>
            </div>
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

            {/* LOADING STATE */}
            {loading ? (
              <div className="bg-white rounded-2xl p-16 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-3">
                <Loader2 className="w-9 h-9 text-[#FF2D72] animate-spin" />
                <p className="text-sm font-bold text-gray-700">
                  Loading Subscription Plans...
                </p>
              </div>
            ) : plans.length === 0 ? (
              /* EMPTY STATE */
              <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-4 shadow-sm">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                  <Crown className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    No Subscription Plans Found
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                    There are currently no subscription plans configured. Seed the default plans or create a new plan to get started.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleSeedPlans}
                    disabled={seeding}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{seeding ? 'Seeding Plans...' : 'Seed Default Plans'}</span>
                  </button>
                  <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm cursor-pointer"
                    style={{ backgroundColor: COLORS.pink }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Plan</span>
                  </button>
                </div>
              </div>
            ) : (
              /* PLAN CARDS GRID - 4 COLUMN LAYOUT */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {plans.map((plan) => {
                  const isFree = plan.finalPrice === 0;
                  const hasDiscount = plan.discountPercent > 0;

                  return (
                    <div
                      key={plan.id}
                      className={`rounded-2xl p-5 border shadow-sm flex flex-col justify-between relative transition-all duration-200 hover:shadow-md ${
                        plan.borderStyle || 'border-gray-200'
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
                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-0.5 line-clamp-2">
                              {plan.subtitle}
                            </p>
                          </div>

                          {/* Enable / Disable Toggle Switch */}
                          <button
                            onClick={() => handleTogglePlanStatus(plan)}
                            title={plan.isActive ? 'Click to Disable Plan' : 'Click to Enable Plan'}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 focus:outline-none ${
                              plan.isActive ? 'bg-[#22C55E]' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                plan.isActive ? 'translate-x-6' : 'translate-x-1'
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
                          {plan.features.slice(0, 6).map((feat, fIdx) => (
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
                                className={`text-[11px] font-medium truncate ${
                                  feat.included ? 'text-gray-700' : 'text-gray-400 line-through'
                                }`}
                              >
                                {feat.name}
                              </span>
                            </div>
                          ))}
                          {plan.features.length > 6 && (
                            <div className="text-[10px] text-gray-400 font-semibold pl-6 pt-0.5">
                              + {plan.features.length - 6} more configured features
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons: Edit, Status, Delete */}
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
                          onClick={() => handleTogglePlanStatus(plan)}
                          className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${
                            plan.isActive
                              ? 'border-gray-200 text-gray-600 hover:bg-gray-100'
                              : 'border-green-200 text-green-600 bg-green-50 hover:bg-green-100'
                          }`}
                          title={plan.isActive ? 'Disable Plan' : 'Enable Plan'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            setPlanToDelete(plan);
                            setDeleteModalOpen(true);
                          }}
                          className="p-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
                  {modalMode === 'create'
                    ? 'Create New Subscription Plan'
                    : `Edit Plan: ${formData.name}`}
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
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Plan Subtitle / Description
                </label>
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
                      if (val === 'Forever') pText = '/ forever';
                      else if (val === '1 Month') pText = '/ month';
                      else if (val === '3 Months') pText = '/ 3 months';
                      else if (val === '1 Year') pText = '/ year';
                      setFormData({
                        ...formData,
                        billingCycle: val,
                        periodText: pText,
                      });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF2D72]"
                  >
                    <option value="Forever">Free Plan (0 days - 10 Likes & 1 Chat)</option>
                    <option value="1 Month">1 Month Plan (30 days - All Features Unlocked)</option>
                    <option value="3 Months">3 Months Plan (90 days - All Features Unlocked)</option>
                    <option value="1 Year">1 Year Plan (365 days - All Features Unlocked)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Plan Status</label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        formData.isActive ? 'bg-[#22C55E]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-xs font-bold text-gray-700">
                      {formData.isActive
                        ? 'Enabled (Active for Users)'
                        : 'Disabled (Hidden from Users)'}
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
                      onChange={(e) =>
                        handlePriceChange(e.target.value, formData.discountPercent)
                      }
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
                    ✓ Users save ₹{formData.basePrice - formData.finalPrice} (
                    {formData.discountPercent}% discount applied)
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
                        className={`text-xs font-medium truncate ${
                          feat.included ? 'text-gray-900 font-semibold' : 'text-gray-400'
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
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: COLORS.pink }}
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>
                    {submitting
                      ? 'Saving...'
                      : modalMode === 'create'
                      ? 'Create Plan'
                      : 'Save Changes'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && planToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Delete Subscription Plan</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="text-gray-900 font-bold">"{planToDelete.name}"</strong>? This will remove the plan from the database.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setPlanToDelete(null);
                }}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{deleting ? 'Deleting...' : 'Yes, Delete Plan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
