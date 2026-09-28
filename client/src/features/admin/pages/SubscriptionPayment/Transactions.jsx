import React, { useState } from 'react';
import {
  CreditCard,
  IndianRupee,
  Crown,
  Zap,
  RotateCcw,
  Download,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Send,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  X,
  Building2,
  Smartphone,
  Wallet
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

export default function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Transactions');
  const [selectedTabFilter, setSelectedTabFilter] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Top 4 KPI Metric Cards
  const kpiCards = [
    {
      title: 'Total Transactions',
      value: '8,432',
      bgColor: '#FF2D72',
      icon: CreditCard,
    },
    {
      title: 'Total Revenue',
      value: '₹4,26,890',
      bgColor: '#7C3AED',
      icon: IndianRupee,
    },
    {
      title: 'Subscription Revenue',
      value: '₹3,12,450',
      bgColor: '#3B82F6',
      icon: Crown,
    },
    {
      title: 'Boost Revenue',
      value: '₹86,220',
      bgColor: '#F59E0B',
      icon: Zap,
    },
  ];

  // Mock Transactions Table Data matching reference image table rows
  const transactionsData = [
    {
      id: 1,
      txnId: 'TXN0012345',
      user: {
        name: 'Aaradhya Sharma',
        email: 'aaradhya@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      item: 'Premium Monthly',
      planBg: '#FFE7F0',
      planColor: '#FF2D72',
      amount: '₹499',
      paymentMethod: 'UPI',
      methodIcon: '📱',
      methodColor: '#22C55E',
      date: '15 Sep 2026',
      time: '10:24 AM',
      status: 'Success',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      paymentId: 'pay_1234567890',
      duration: '1 Month',
      features: 'All Premium Features',
    },
    {
      id: 2,
      txnId: 'TXN0012344',
      user: {
        name: 'Rohit Mehta',
        email: 'rohitm@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      item: 'Premium Yearly',
      planBg: '#FEF3C7',
      planColor: '#D97706',
      amount: '₹3,999',
      paymentMethod: 'Card',
      methodIcon: '💳',
      methodColor: '#3B82F6',
      date: '15 Sep 2026',
      time: '09:18 AM',
      status: 'Success',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      paymentId: 'pay_1234567891',
      duration: '12 Months',
      features: 'All Premium Features + 5 Boosts',
    },
    {
      id: 3,
      txnId: 'TXN0012343',
      user: {
        name: 'Priya Singh',
        email: 'priya@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      item: 'Boost Plan',
      planBg: '#F3E8FF',
      planColor: '#7C3AED',
      amount: '₹199',
      paymentMethod: 'UPI',
      methodIcon: '📱',
      methodColor: '#22C55E',
      date: '14 Sep 2026',
      time: '05:42 PM',
      status: 'Success',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      paymentId: 'pay_1234567892',
      duration: '24 Hours',
      features: 'Top Profile Placement',
    },
    {
      id: 4,
      txnId: 'TXN0012342',
      user: {
        name: 'Karan Verma',
        email: 'karan@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        isVerified: false,
      },
      item: 'Premium Quarterly',
      planBg: '#F3E8FF',
      planColor: '#7C3AED',
      amount: '₹1,299',
      paymentMethod: 'Card',
      methodIcon: '💳',
      methodColor: '#3B82F6',
      date: '14 Sep 2026',
      time: '03:21 PM',
      status: 'Pending',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      paymentId: 'pay_1234567893',
      duration: '3 Months',
      features: 'All Premium Features',
    },
    {
      id: 5,
      txnId: 'TXN0012341',
      user: {
        name: 'Neha Patel',
        email: 'neha@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      item: 'Premium Monthly',
      planBg: '#FFE7F0',
      planColor: '#FF2D72',
      amount: '₹499',
      paymentMethod: 'Net Banking',
      methodIcon: '🏦',
      methodColor: '#6B7280',
      date: '14 Sep 2026',
      time: '11:12 AM',
      status: 'Failed',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
      paymentId: 'pay_1234567894',
      duration: '1 Month',
      features: 'All Premium Features',
    },
    {
      id: 6,
      txnId: 'TXN0012340',
      user: {
        name: 'Amit Kumar',
        email: 'amit@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      item: 'Boost Plan',
      planBg: '#F3E8FF',
      planColor: '#7C3AED',
      amount: '₹99',
      paymentMethod: 'Wallet',
      methodIcon: '👛',
      methodColor: '#F59E0B',
      date: '13 Sep 2026',
      time: '09:36 PM',
      status: 'Success',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      paymentId: 'pay_1234567895',
      duration: '12 Hours',
      features: 'Profile Boost',
    },
    {
      id: 7,
      txnId: 'TXN0012339',
      user: {
        name: 'Sneha Reddy',
        email: 'sneha@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      item: 'Premium Yearly',
      planBg: '#FEF3C7',
      planColor: '#D97706',
      amount: '₹3,999',
      paymentMethod: 'Card',
      methodIcon: '💳',
      methodColor: '#3B82F6',
      date: '13 Sep 2026',
      time: '12:24 PM',
      status: 'Refunded',
      statusBg: '#E0E7FF',
      statusColor: '#4338CA',
      paymentId: 'pay_1234567896',
      duration: '12 Months',
      features: 'All Premium Features',
    },
    {
      id: 8,
      txnId: 'TXN0012338',
      user: {
        name: 'Vikram Singh',
        email: 'vikram@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        isVerified: false,
      },
      item: 'Premium Monthly',
      planBg: '#FFE7F0',
      planColor: '#FF2D72',
      amount: '₹499',
      paymentMethod: 'UPI',
      methodIcon: '📱',
      methodColor: '#22C55E',
      date: '12 Sep 2026',
      time: '06:18 PM',
      status: 'Success',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      paymentId: 'pay_1234567897',
      duration: '1 Month',
      features: 'All Premium Features',
    },
    {
      id: 9,
      txnId: 'TXN0012337',
      user: {
        name: 'Pooja Verma',
        email: 'pooja@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      item: 'Boost Plan',
      planBg: '#F3E8FF',
      planColor: '#7C3AED',
      amount: '₹199',
      paymentMethod: 'Card',
      methodIcon: '💳',
      methodColor: '#3B82F6',
      date: '12 Sep 2026',
      time: '04:50 PM',
      status: 'Success',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      paymentId: 'pay_1234567898',
      duration: '24 Hours',
      features: 'Top Profile Placement',
    },
    {
      id: 10,
      txnId: 'TXN0012336',
      user: {
        name: 'Rahul Sharma',
        email: 'rahul@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        isVerified: false,
      },
      item: 'Premium Quarterly',
      planBg: '#F3E8FF',
      planColor: '#7C3AED',
      amount: '₹1,299',
      paymentMethod: 'Net Banking',
      methodIcon: '🏦',
      methodColor: '#6B7280',
      date: '11 Sep 2026',
      time: '02:14 PM',
      status: 'Success',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      paymentId: 'pay_1234567899',
      duration: '3 Months',
      features: 'All Premium Features',
    },
  ];

  const currentSelected = selectedTransaction || transactionsData[0];

  const filteredTransactions = transactionsData.filter((item) => {
    if (selectedTabFilter === 'All') return true;
    return item.status.toLowerCase().includes(selectedTabFilter.toLowerCase());
  });

  return (
    <div style={{ backgroundColor: COLORS.background, color: COLORS.dark }} className="h-screen font-sans flex flex-col overflow-hidden">
      {/* TOP NAVBAR HEADER */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR NAVIGATION */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & HEADER */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
              Transactions & Payments
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              View and manage all payment transactions
            </p>
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
                    <span className="text-[11px] font-semibold text-gray-500 block truncate">{kpi.title}</span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM SECTION: TRANSACTIONS TABLE & RIGHT TRANSACTION DETAILS SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* TRANSACTIONS TABLE (2 Cols wide on XL) */}
            <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
              {/* Header Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {[
                    { label: 'All Transactions (8,432)', key: 'All' },
                    { label: 'Successful (7,856)', key: 'Success' },
                    { label: 'Pending (324)', key: 'Pending' },
                    { label: 'Failed (186)', key: 'Failed' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedTabFilter(tab.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${selectedTabFilter === tab.key
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
                      placeholder="Search by user, transaction ID..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[750px]">
                  <thead>
                    <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                      <th className="pb-3 w-8">
                        <input type="checkbox" className="rounded text-[#FF2D72] focus:ring-0" />
                      </th>
                      <th className="pb-3 font-semibold">Transaction ID</th>
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Plan / Item</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Date & Time</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-center">Actions</th>
                      <th className="pb-3 w-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredTransactions.map((item) => {
                      const isSelected = currentSelected.id === item.id;
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedTransaction(item)}
                          className={`cursor-pointer transition-colors ${isSelected ? 'bg-pink-50/50' : 'hover:bg-gray-50/50'
                            }`}
                        >
                          <td className="py-3">
                            <input type="checkbox" className="rounded text-[#FF2D72] focus:ring-0" />
                          </td>
                          <td className="py-3 font-mono font-bold text-gray-700">{item.txnId}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.user.avatar}
                                alt={item.user.name}
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                              />
                              <div>
                                <div className="font-bold text-gray-900">{item.user.name}</div>
                                <div className="text-gray-400 text-[10px]">{item.user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                              style={{
                                backgroundColor: item.planBg,
                                color: item.planColor,
                              }}
                            >
                              {item.item}
                            </span>
                          </td>
                          <td className="py-3 font-extrabold text-gray-900">{item.amount}</td>
                          <td className="py-3">
                            <div className="font-semibold text-gray-700">{item.date}</div>
                            <div className="text-gray-400 text-[10px]">{item.time}</div>
                          </td>
                          <td className="py-3">
                            <span
                              className="px-3 py-1 rounded-full font-bold text-[10px] inline-block"
                              style={{
                                backgroundColor: item.statusBg,
                                color: item.statusColor,
                              }}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTransaction(item);
                              }}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="py-3 text-right">
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>Showing 1 to 10 of 8,432 transactions</span>
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

            {/* RIGHT TRANSACTION DETAILS PREVIEW PANEL matching reference image */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-sm text-gray-900">Transaction Details</h3>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* User Info Header */}
                <div className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-xl border border-gray-100 mb-4">
                  <img
                    src={currentSelected.user.avatar}
                    alt={currentSelected.user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{currentSelected.user.name}</h4>
                    <p className="text-xs text-gray-400">{currentSelected.user.email}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Transaction Information Breakdown */}
                <div className="space-y-2.5 text-xs pb-4 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 text-xs mb-1">Transaction Information</h4>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Transaction ID</span>
                    <span className="font-mono font-bold text-gray-800">{currentSelected.txnId}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Date & Time</span>
                    <span className="font-semibold text-gray-800">
                      {currentSelected.date}, {currentSelected.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-black text-gray-900 text-sm">{currentSelected.amount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <span
                      className="px-2.5 py-0.5 rounded-full font-bold text-[10px]"
                      style={{
                        backgroundColor: currentSelected.statusBg,
                        color: currentSelected.statusColor,
                      }}
                    >
                      {currentSelected.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Payment ID</span>
                    <span className="font-mono text-gray-600 text-[11px]">{currentSelected.paymentId}</span>
                  </div>
                </div>

                {/* Plan Details Breakdown */}
                <div className="pt-3 space-y-2 text-xs">
                  <h4 className="font-bold text-gray-900 text-xs mb-1">Plan Details</h4>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Plan Name</span>
                    <span className="font-semibold text-gray-800">{currentSelected.item}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-semibold text-gray-800">{currentSelected.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Features</span>
                    <span className="font-semibold text-gray-800">{currentSelected.features}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-gray-100 text-gray-700 flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <span>View User Profile</span>
                </button>
                <button
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-2xs transition-all hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: COLORS.pink }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
