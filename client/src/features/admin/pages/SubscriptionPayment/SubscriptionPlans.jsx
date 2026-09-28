import React, { useState } from 'react';
import {
  CreditCard,
  Users,
  IndianRupee,
  Tag,
  Plus,
  Edit,
  Check,
  X,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Crown,
  Sparkles,
  Zap,
  Star
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

export default function SubscriptionPlans() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Subscription Plans');
  const [selectedTabFilter, setSelectedTabFilter] = useState('All');

  // Top 4 KPI Metric Cards matching reference image
  const kpiCards = [
    {
      title: 'Total Plans',
      value: '6',
      change: '+20% this month',
      changeColor: '#22C55E',
      bgColor: '#FF2D72',
      icon: Crown,
    },
    {
      title: 'Active Subscribers',
      value: '8,432',
      change: '+28% this month',
      changeColor: '#22C55E',
      bgColor: '#3B82F6',
      icon: Users,
    },
    {
      title: 'Monthly Revenue',
      value: '₹3,12,450',
      change: '+32% this month',
      changeColor: '#22C55E',
      bgColor: '#7C3AED',
      icon: IndianRupee,
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+12% this month',
      changeColor: '#22C55E',
      bgColor: '#F59E0B',
      icon: Tag,
    },
  ];

  // 4 Subscription Plan Cards Data matching reference image exactly
  const planCards = [
    {
      id: 1,
      title: 'Free Plan',
      subtitle: 'Basic Access',
      price: '₹0',
      period: '/ month',
      badge: null,
      cardBg: '#FFFFFF',
      borderStyle: 'border-gray-100',
      btnStyle: { bg: '#FFFFFF', color: '#17151A', border: 'border border-gray-200' },
      features: [
        { text: 'Create Profile', included: true },
        { text: 'Browse Matches', included: true },
        { text: 'Send Limited Likes (10/day)', included: true },
        { text: 'Basic Chat', included: true },
        { text: 'Video Calls', included: false },
        { text: 'See Who Likes You', included: false },
      ],
    },
    {
      id: 2,
      title: 'Premium Monthly',
      subtitle: 'Best for Getting Started',
      price: '₹499',
      period: '/ month',
      badge: 'Popular',
      badgeBg: '#FF2D72',
      cardBg: '#FFE7F0',
      borderStyle: 'border-pink-200',
      btnStyle: { bg: '#FF2D72', color: '#FFFFFF', border: 'border-transparent' },
      features: [
        { text: 'Unlimited Likes', included: true },
        { text: 'Chat with Matches', included: true },
        { text: 'See Who Likes You', included: true },
        { text: 'Advanced Filters', included: true },
        { text: 'Video Calls', included: true },
        { text: 'Priority Support', included: true },
      ],
    },
    {
      id: 3,
      title: 'Premium Quarterly',
      subtitle: 'Save 20%',
      price: '₹1,299',
      period: '/ 3 months',
      calculatedMonthly: '(₹433/month)',
      badge: null,
      cardBg: '#FFFFFF',
      borderStyle: 'border-purple-200',
      btnStyle: { bg: '#FFFFFF', color: '#7C3AED', border: 'border border-purple-300' },
      features: [
        { text: 'All Premium Features', included: true },
        { text: 'Priority in Search', included: true },
        { text: 'Advanced Filters', included: true },
        { text: 'Video Calls', included: true },
        { text: 'Read Receipts', included: true },
        { text: 'Priority Support', included: true },
      ],
    },
    {
      id: 4,
      title: 'Premium Yearly',
      subtitle: 'Best Value',
      price: '₹3,999',
      period: '/ year',
      calculatedMonthly: '(₹333/month)',
      badge: null,
      cardBg: '#FFFFFF',
      borderStyle: 'border-amber-200',
      btnStyle: { bg: '#FFFFFF', color: '#D97706', border: 'border border-amber-300' },
      features: [
        { text: 'All Premium Features', included: true },
        { text: 'Top Profile Placement', included: true },
        { text: '5 Profile Boosts/Month', included: true },
        { text: 'Advanced Filters', included: true },
        { text: 'Video Calls', included: true },
        { text: 'Priority Support', included: true },
      ],
    },
  ];

  // Plan Comparison Matrix Rows matching reference image right panel
  const comparisonMatrix = [
    { feature: 'Create Profile', free: true, monthly: true, quarterly: true, yearly: true },
    { feature: 'Browse Matches', free: true, monthly: true, quarterly: true, yearly: true },
    { feature: 'Send Likes', free: '10/day', monthly: 'Unlimited', quarterly: 'Unlimited', yearly: 'Unlimited' },
    { feature: 'Chat Messaging', free: 'Limited', monthly: true, quarterly: true, yearly: true },
    { feature: 'Video Calls', free: false, monthly: true, quarterly: true, yearly: true },
    { feature: 'See Who Likes You', free: false, monthly: true, quarterly: true, yearly: true },
    { feature: 'Advanced Filters', free: false, monthly: true, quarterly: true, yearly: true },
    { feature: 'Profile Boost', free: false, monthly: false, quarterly: false, yearly: '5/month' },
    { feature: 'Priority Support', free: false, monthly: false, quarterly: true, yearly: true },
    { feature: 'Top Placement', free: false, monthly: false, quarterly: false, yearly: true },
  ];

  // Subscribers Table Mock Data matching reference image
  const subscribersData = [
    {
      id: 1,
      user: {
        name: 'Aaradhya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      email: 'aaradhya@gmail.com',
      plan: 'Premium Monthly',
      planBg: '#FFE7F0',
      planColor: '#FF2D72',
      amount: '₹499',
      startDate: '15 Sep 2026',
      expiryDate: '15 Oct 2026',
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
    },
    {
      id: 2,
      user: {
        name: 'Rohit Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      email: 'rohit@gmail.com',
      plan: 'Premium Yearly',
      planBg: '#FEF3C7',
      planColor: '#D97706',
      amount: '₹3,999',
      startDate: '14 Sep 2026',
      expiryDate: '14 Sep 2027',
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
    },
    {
      id: 3,
      user: {
        name: 'Priya Singh',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      email: 'priya@gmail.com',
      plan: 'Premium Quarterly',
      planBg: '#F3E8FF',
      planColor: '#7C3AED',
      amount: '₹1,299',
      startDate: '12 Sep 2026',
      expiryDate: '12 Dec 2026',
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
    },
    {
      id: 4,
      user: {
        name: 'Karan Verma',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      email: 'karan@gmail.com',
      plan: 'Premium Monthly',
      planBg: '#FFE7F0',
      planColor: '#FF2D72',
      amount: '₹499',
      startDate: '10 Sep 2026',
      expiryDate: '10 Oct 2026',
      status: 'Expired',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
    },
    {
      id: 5,
      user: {
        name: 'Neha Patel',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      },
      email: 'neha@gmail.com',
      plan: 'Free Plan',
      planBg: '#F3F4F6',
      planColor: '#6B7280',
      amount: '₹0',
      startDate: '09 Sep 2026',
      expiryDate: '-',
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
    },
    {
      id: 6,
      user: {
        name: 'Amit Kumar',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      },
      email: 'amit@gmail.com',
      plan: 'Premium Yearly',
      planBg: '#FEF3C7',
      planColor: '#D97706',
      amount: '₹3,999',
      startDate: '08 Sep 2026',
      expiryDate: '08 Sep 2027',
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
    },
    {
      id: 7,
      user: {
        name: 'Sneha Reddy',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
      email: 'sneha@gmail.com',
      plan: 'Premium Quarterly',
      planBg: '#F3E8FF',
      planColor: '#7C3AED',
      amount: '₹1,299',
      startDate: '05 Sep 2026',
      expiryDate: '05 Dec 2026',
      status: 'Cancelled',
      statusBg: '#E0E7FF',
      statusColor: '#4338CA',
    },
    {
      id: 8,
      user: {
        name: 'Vikram Singh',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      },
      email: 'vikram@gmail.com',
      plan: 'Premium Monthly',
      planBg: '#FFE7F0',
      planColor: '#FF2D72',
      amount: '₹499',
      startDate: '02 Sep 2026',
      expiryDate: '02 Oct 2026',
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
    },
  ];

  // Filter subscribers based on pill tab
  const filteredSubscribers = subscribersData.filter((sub) => {
    if (selectedTabFilter === 'All') return true;
    return sub.status.toLowerCase() === selectedTabFilter.toLowerCase();
  });

  return (
    <div style={{ backgroundColor: COLORS.background, color: COLORS.dark }} className="h-screen font-sans flex flex-col overflow-hidden">
      {/* TOP NAVBAR HEADER */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR NAVIGATION */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                Subscription Plans
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Create and manage subscription plans, features and pricing
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Plan</span>
            </button>
          </div>

          {/* TOP 4 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: kpi.bgColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block">{kpi.title}</span>
                      <span className="text-xl font-extrabold tracking-tight" style={{ color: COLORS.dark }}>
                        {kpi.value}
                      </span>
                      <span
                        className="text-[11px] font-bold block mt-0.5 flex items-center gap-1"
                        style={{ color: kpi.changeColor }}
                      >
                        ↑ {kpi.change}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MIDDLE SECTION: 4 PLAN CARDS & PLAN COMPARISON TABLE SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* 4 PLAN CARDS (3 Cols wide on XL) */}
            <div className="xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {planCards.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-5 border shadow-sm flex flex-col justify-between relative transition-all hover:shadow-md ${plan.borderStyle}`}
                  style={{ backgroundColor: plan.cardBg }}
                >
                  {/* Popular Badge */}
                  {plan.badge && (
                    <span
                      className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-extrabold text-white shadow-2xs"
                      style={{ backgroundColor: plan.badgeBg }}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="font-extrabold text-base text-gray-900">{plan.title}</h3>
                    <p className="text-[11px] text-pink-600 font-medium mb-3">{plan.subtitle}</p>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">{plan.price}</span>
                        <span className="text-xs text-gray-400 font-semibold">{plan.period}</span>
                      </div>
                      {plan.calculatedMonthly && (
                        <span className="text-[10px] text-gray-400 font-medium block">
                          {plan.calculatedMonthly}
                        </span>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 text-xs">
                      {plan.features.map((feat, fIdx) => (
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
                            className={`text-[11px] font-medium ${
                              feat.included ? 'text-gray-700' : 'text-gray-400 line-through'
                            }`}
                          >
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Edit Plan Button */}
                  <button
                    className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all hover:opacity-90 cursor-pointer ${plan.btnStyle.border}`}
                    style={{ backgroundColor: plan.btnStyle.bg, color: plan.btnStyle.color }}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Plan</span>
                  </button>
                </div>
              ))}
            </div>

            {/* PLAN COMPARISON MATRIX (1 Col wide on XL) */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between overflow-x-auto">
              <h3 className="font-extrabold text-xs text-gray-900 mb-3">Plan Comparison</h3>
              <table className="w-full text-left text-[11px] min-w-[300px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold">
                    <th className="pb-2">Feature</th>
                    <th className="pb-2 text-center">Free</th>
                    <th className="pb-2 text-center">Monthly</th>
                    <th className="pb-2 text-center">Quarterly</th>
                    <th className="pb-2 text-center">Yearly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparisonMatrix.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-gray-50/50">
                      <td className="py-2 font-medium text-gray-700">{row.feature}</td>
                      <td className="py-2 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <Check className="w-3.5 h-3.5 text-green-500 mx-auto stroke-[3]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-gray-300 mx-auto stroke-[3]" />
                          )
                        ) : (
                          <span className="text-[10px] font-bold text-gray-600">{row.free}</span>
                        )}
                      </td>
                      <td className="py-2 text-center">
                        {typeof row.monthly === 'boolean' ? (
                          row.monthly ? (
                            <Check className="w-3.5 h-3.5 text-green-500 mx-auto stroke-[3]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-gray-300 mx-auto stroke-[3]" />
                          )
                        ) : (
                          <span className="text-[10px] font-bold text-gray-600">{row.monthly}</span>
                        )}
                      </td>
                      <td className="py-2 text-center">
                        {typeof row.quarterly === 'boolean' ? (
                          row.quarterly ? (
                            <Check className="w-3.5 h-3.5 text-green-500 mx-auto stroke-[3]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-gray-300 mx-auto stroke-[3]" />
                          )
                        ) : (
                          <span className="text-[10px] font-bold text-gray-600">{row.quarterly}</span>
                        )}
                      </td>
                      <td className="py-2 text-center">
                        {typeof row.yearly === 'boolean' ? (
                          row.yearly ? (
                            <Check className="w-3.5 h-3.5 text-green-500 mx-auto stroke-[3]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-gray-300 mx-auto stroke-[3]" />
                          )
                        ) : (
                          <span className="text-[10px] font-bold text-gray-600">{row.yearly}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM SECTION: SUBSCRIBERS TABLE & REVENUE DONUT CHART */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* SUBSCRIBERS TABLE (2 Cols wide on XL) */}
            <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
              {/* Header Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {[
                    { label: 'All Subscribers (8,432)', key: 'All' },
                    { label: 'Active (6,231)', key: 'Active' },
                    { label: 'Expired (1,204)', key: 'Expired' },
                    { label: 'Cancelled (997)', key: 'Cancelled' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedTabFilter(tab.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        selectedTabFilter === tab.key
                          ? 'text-white shadow-2xs'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: selectedTabFilter === tab.key ? COLORS.pink : 'transparent',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-48">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by name, email or plan..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-600 bg-gray-50 border border-gray-200 font-bold text-xs cursor-pointer">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter</span>
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white font-bold text-xs shadow-2xs cursor-pointer"
                    style={{ backgroundColor: COLORS.pink }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead>
                    <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                      <th className="pb-3 w-8">#</th>
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Plan</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Start Date</th>
                      <th className="pb-3 font-semibold">Expiry Date</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-center">Actions</th>
                      <th className="pb-3 w-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredSubscribers.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="py-3 font-bold text-gray-400">{idx + 1}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.user.avatar}
                              alt={item.user.name}
                              className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            />
                            <span className="font-bold text-gray-900">{item.user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-500 font-medium">{item.email}</td>
                        <td className="py-3">
                          <span
                            className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                            style={{
                              backgroundColor: item.planBg,
                              color: item.planColor,
                            }}
                          >
                            {item.plan}
                          </span>
                        </td>
                        <td className="py-3 font-extrabold text-gray-900">{item.amount}</td>
                        <td className="py-3 text-gray-600 font-medium">{item.startDate}</td>
                        <td className="py-3 text-gray-600 font-medium">{item.expiryDate}</td>
                        <td className="py-3">
                          <span
                            className="px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-block"
                            style={{
                              backgroundColor: item.statusBg,
                              color: item.statusColor,
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <button className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>Showing 1 to 8 of 8,432 subscribers</span>
                <div className="flex items-center gap-2">
                  <select className="bg-gray-50 border border-gray-200 text-xs text-gray-700 rounded-lg px-2 py-1 focus:outline-none">
                    <option>10 per page</option>
                    <option>25 per page</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded-lg hover:bg-gray-100">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="w-6 h-6 rounded-lg font-bold text-white text-xs flex items-center justify-center"
                      style={{ backgroundColor: COLORS.pink }}
                    >
                      1
                    </button>
                    <button className="w-6 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      2
                    </button>
                    <button className="w-6 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      3
                    </button>
                    <button className="w-6 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      4
                    </button>
                    <button className="w-6 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      5
                    </button>
                    <span className="text-gray-400">...</span>
                    <button className="w-7 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      844
                    </button>
                    <button className="p-1 rounded-lg hover:bg-gray-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* REVENUE BY PLAN DONUT & RECENT SUBSCRIPTIONS (1 Col wide on XL) */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-sm text-gray-900">Revenue by Plan</h3>
                  <select className="bg-gray-50 border border-gray-200 text-[11px] font-semibold text-gray-700 rounded-lg px-2 py-1 focus:outline-none">
                    <option>Last 30 Days</option>
                  </select>
                </div>

                {/* Revenue Donut Visualization matching reference image */}
                <div className="flex items-center justify-between my-2">
                  <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#F3F4F6"
                        strokeWidth="4"
                      />
                      {/* Monthly 42% (Pink) */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#FF2D72"
                        strokeWidth="4"
                        strokeDasharray="42, 100"
                      />
                      {/* Quarterly 28% (Purple) */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="4"
                        strokeDasharray="28, 100"
                        strokeDashoffset="-42"
                      />
                      {/* Yearly 20% (Blue) */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeDasharray="20, 100"
                        strokeDashoffset="-70"
                      />
                      {/* Free 8% (Green) */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="4"
                        strokeDasharray="8, 100"
                        strokeDashoffset="-90"
                      />
                      {/* Other 2% (Amber) */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="4"
                        strokeDasharray="2, 100"
                        strokeDashoffset="-98"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-sm font-black text-gray-900">₹4,26,890</span>
                      <span className="text-[9px] text-gray-400 font-semibold">Total Revenue</span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="space-y-1.5 text-[11px] font-semibold text-gray-600 flex-1 pl-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D72]"></span>
                        <span>Monthly</span>
                      </div>
                      <span className="text-gray-400">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"></span>
                        <span>Quarterly</span>
                      </div>
                      <span className="text-gray-400">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                        <span>Yearly</span>
                      </div>
                      <span className="text-gray-400">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                        <span>Free</span>
                      </div>
                      <span className="text-gray-400">8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                        <span>Other</span>
                      </div>
                      <span className="text-gray-400">2%</span>
                    </div>
                  </div>
                </div>

                {/* Recent Subscriptions Mini Feed */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-gray-900">Recent Subscriptions</h4>
                    <button className="text-[11px] font-bold" style={{ color: COLORS.pink }}>
                      View All
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        name: 'Aaradhya Sharma',
                        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
                        plan: 'Premium Monthly',
                        planBg: '#FFE7F0',
                        planColor: '#FF2D72',
                        amount: '₹499',
                        time: '2 mins ago',
                      },
                      {
                        name: 'Rohit Mehta',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                        plan: 'Premium Yearly',
                        planBg: '#FEF3C7',
                        planColor: '#D97706',
                        amount: '₹3,999',
                        time: '1 hour ago',
                      },
                      {
                        name: 'Priya Singh',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                        plan: 'Premium Quarterly',
                        planBg: '#F3E8FF',
                        planColor: '#7C3AED',
                        amount: '₹1,299',
                        time: '2 hours ago',
                      },
                      {
                        name: 'Karan Verma',
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
                        plan: 'Premium Monthly',
                        planBg: '#FFE7F0',
                        planColor: '#FF2D72',
                        amount: '₹499',
                        time: '5 hours ago',
                      },
                    ].map((item, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-7 h-7 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <div className="font-bold text-gray-900 text-[11px]">{item.name}</div>
                            <span
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold inline-block"
                              style={{ backgroundColor: item.planBg, color: item.planColor }}
                            >
                              {item.plan}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-gray-900 block text-[11px]">{item.amount}</span>
                          <span className="text-[9px] text-gray-400 font-medium">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
