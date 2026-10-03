import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  IndianRupee,
  Crown,
  Zap,
  RotateCcw,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  X,
  Building2,
  Smartphone,
  Wallet,
  Copy,
  Check,
  Trash2,
  Loader2
} from 'lucide-react';
import AdminNavbar from '../../components/Navbar';
import AdminSidebar from '../../components/Sidebar';
import {
  getTransactions,
  deleteTransaction as apiDeleteTransaction,
} from '../../../../services/paymentServices.js';

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
  const [copiedId, setCopiedId] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock Transactions Table Data matching reference image table rows
  const initialTransactionsData = [
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

  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedTxnIds, setSelectedTxnIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch real transactions from MySQL Database
  const fetchTransactions = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      else setLoading(true);

      const res = await getTransactions();
      const list = res.data?.transactions || [];

      if (list && list.length > 0) {
        const normalized = list.map((t) => {
          const userName = t.user?.name || "Member";
          const userEmail = t.user?.email || "customer@example.com";
          const userAvatar =
            t.user?.profile_image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=FF2D72&color=fff`;

          const planName = t.plan?.name || t.description || "Premium Membership";
          const amountNum = Number(t.final_amount || t.amount || 0);

          const d = t.createdAt ? new Date(t.createdAt) : new Date();
          const dateStr = d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const timeStr = d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          const isSuccess = (t.status || "").toLowerCase() === "success";

          return {
            id: t.id,
            txnId: t.transaction_id || `TXN00${t.id}`,
            order_id: t.order_id || "N/A",
            user: {
              name: userName,
              email: userEmail,
              avatar: userAvatar,
              isVerified: true,
            },
            item: planName,
            planBg: planName.toLowerCase().includes("vip")
              ? "#FEF3C7"
              : planName.toLowerCase().includes("month")
              ? "#FFE7F0"
              : "#F3E8FF",
            planColor: planName.toLowerCase().includes("vip")
              ? "#D97706"
              : planName.toLowerCase().includes("month")
              ? "#FF2D72"
              : "#7C3AED",
            amount: `₹${amountNum.toLocaleString("en-IN")}`,
            amountNum,
            paymentMethod: t.payment_method || "Razorpay",
            methodIcon: "💳",
            methodColor: "#3B82F6",
            date: dateStr,
            time: timeStr,
            status: isSuccess ? "Success" : "Failed",
            statusBg: isSuccess ? "#DCFCE7" : "#FEE2E2",
            statusColor: isSuccess ? "#16A34A" : "#EF4444",
            paymentId: t.transaction_id || `pay_${t.id}`,
            duration: t.plan?.duration ? `${t.plan.duration} Days` : "Active Plan",
            features: t.description || "All Premium Features Active",
          };
        });
        setTransactionsData(normalized);
      } else {
        setTransactionsData([]);
      }
    } catch (err) {
      console.error("Failed to load transactions from DB:", err);
      setTransactionsData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const currentSelected =
    selectedTransaction && transactionsData.some((t) => t.id === selectedTransaction.id)
      ? selectedTransaction
      : null;

  const filteredTransactions = transactionsData.filter((item) => {
    const matchesTab =
      selectedTabFilter === 'All' ||
      item.status.toLowerCase().includes(selectedTabFilter.toLowerCase());
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      item.txnId.toLowerCase().includes(term) ||
      item.user.name.toLowerCase().includes(term) ||
      item.user.email.toLowerCase().includes(term) ||
      item.item.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  const isAllSelected =
    filteredTransactions.length > 0 &&
    filteredTransactions.every((item) => selectedTxnIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedTxnIds([]);
    } else {
      setSelectedTxnIds(filteredTransactions.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedTxnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedTxnIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedTxnIds.length} transactions?`)) return;
    try {
      await Promise.all(selectedTxnIds.map((id) => apiDeleteTransaction(id)));
    } catch (err) {
      console.error("Error bulk deleting transactions:", err);
    }
    setTransactionsData((prev) => prev.filter((item) => !selectedTxnIds.includes(item.id)));
    setSelectedTxnIds([]);
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction record?")) {
      return;
    }
    try {
      await apiDeleteTransaction(id);
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
    setTransactionsData((prev) => prev.filter((item) => item.id !== id));
    setSelectedTxnIds((prev) => prev.filter((item) => item !== id));
    if (selectedTransaction?.id === id) setSelectedTransaction(null);
  };

  // Dynamic KPI Card Calculations
  const totalCount = transactionsData.length;
  const totalRevenue = transactionsData
    .filter((t) => t.status === "Success")
    .reduce((sum, t) => sum + (t.amountNum || 0), 0);
  const subRevenue = transactionsData
    .filter((t) => t.status === "Success" && !t.item.toLowerCase().includes("boost"))
    .reduce((sum, t) => sum + (t.amountNum || 0), 0);
  const boostRevenue = transactionsData
    .filter((t) => t.status === "Success" && t.item.toLowerCase().includes("boost"))
    .reduce((sum, t) => sum + (t.amountNum || 0), 0);

  const kpiCards = [
    {
      title: 'Total Transactions',
      value: totalCount.toLocaleString('en-IN'),
      bgColor: '#FF2D72',
      icon: CreditCard,
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      bgColor: '#7C3AED',
      icon: IndianRupee,
    },
    {
      title: 'Subscription Revenue',
      value: `₹${subRevenue.toLocaleString('en-IN')}`,
      bgColor: '#3B82F6',
      icon: Crown,
    },
    {
      title: 'Boost Revenue',
      value: `₹${boostRevenue.toLocaleString('en-IN')}`,
      bgColor: '#F59E0B',
      icon: Zap,
    },
  ];

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                Transactions & Payments
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                View and manage live Razorpay payment transactions and subscriptions
              </p>
            </div>

            <button
              type="button"
              onClick={() => fetchTransactions(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all hover:opacity-95 cursor-pointer self-start sm:self-auto"
              style={{ backgroundColor: COLORS.pink }}
            >
              <RefreshCw className={`w-3.5 h-3.5 stroke-[2.5] ${refreshing ? "animate-spin" : ""}`} />
              <span>Sync Database</span>
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
                    <span className="text-[13px] font-semibold text-gray-500 block truncate">{kpi.title}</span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM SECTION: TRANSACTIONS TABLE & RIGHT TRANSACTION DETAILS SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* TRANSACTIONS TABLE */}
            <div className={`${currentSelected ? 'xl:col-span-2' : 'xl:col-span-3'} bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}>
              {/* Header Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {[
                    { label: `All Transactions (${transactionsData.length})`, key: 'All' },
                    { label: 'Successful', key: 'Success' },
                    { label: 'Pending', key: 'Pending' },
                    { label: 'Failed', key: 'Failed' },
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
                  {selectedTxnIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Selected ({selectedTxnIds.length})
                    </button>
                  )}
                  <div className="relative w-48">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by user, txn ID..."
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
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-[#FF2D72] focus:ring-[#FF2D72] cursor-pointer"
                        />
                      </th>
                      <th className="pb-3 font-semibold">Transaction ID</th>
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Plan / Item</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Date & Time</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-[#FF2D72]" />
                            <span className="text-xs font-medium">Loading transactions from database...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-400 text-xs">
                          No transactions found in database
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((item) => {
                        const isSelected = currentSelected && currentSelected.id === item.id;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedTransaction(item)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? 'bg-pink-50/50' : 'hover:bg-gray-50/50'
                            }`}
                          >
                            <td className="py-3" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={selectedTxnIds.includes(item.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleToggleSelect(item.id);
                                }}
                                className="rounded border-gray-300 text-[#FF2D72] focus:ring-[#FF2D72] cursor-pointer"
                              />
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
                            <td className="py-3 text-center" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTransaction(item);
                                  }}
                                  title="View Details"
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTransaction(item.id);
                                  }}
                                  title="Delete Transaction"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>
                  Showing {filteredTransactions.length > 0 ? 1 : 0} to {filteredTransactions.length} of{' '}
                  {transactionsData.length} transactions
                </span>
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

            {/* RIGHT TRANSACTION DETAILS PREVIEW PANEL */}
            {currentSelected && (
              <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit transition-all">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
                      style={{ backgroundColor: currentSelected.statusColor }}
                    />
                    <h3 className="font-extrabold text-sm text-gray-900">Transaction Details</h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="px-2.5 py-0.5 rounded-full font-bold text-[10px]"
                      style={{
                        backgroundColor: currentSelected.statusBg,
                        color: currentSelected.statusColor,
                      }}
                    >
                      {currentSelected.status}
                    </span>
                    <button
                      onClick={() => setSelectedTransaction(null)}
                      title="Close drawer"
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                  {/* Customer Profile Banner */}
                  <div className="p-3 bg-gradient-to-r from-pink-50/70 via-rose-50/30 to-purple-50/40 rounded-xl border border-pink-100/70 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={currentSelected.user.avatar}
                          alt={currentSelected.user.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-2xs"
                        />
                        {currentSelected.user.isVerified && (
                          <span
                            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white"
                            title="Verified Customer"
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{currentSelected.user.name}</h4>
                          {currentSelected.user.isVerified && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">{currentSelected.user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Hero Card */}
                  <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-semibold text-gray-400">Total Amount Paid</span>
                      <span className="text-2xl font-black text-gray-900 tracking-tight">{currentSelected.amount}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-[11px]">
                      <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                        <span>{currentSelected.methodIcon}</span>
                        <span>{currentSelected.paymentMethod}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400 font-mono text-[10px]">{currentSelected.paymentId}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-gray-400">{currentSelected.date}</span>
                    </div>
                  </div>

                  {/* Structured Key Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-400 font-medium">Transaction ID</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-gray-800 text-[11px]">{currentSelected.txnId}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(currentSelected.txnId);
                            setCopiedId(true);
                            setTimeout(() => setCopiedId(false), 2000);
                          }}
                          className="text-gray-400 hover:text-gray-700 p-0.5 rounded cursor-pointer transition-colors"
                          title="Copy Transaction ID"
                        >
                          {copiedId ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-400 font-medium">Purchased Plan</span>
                      <span
                        className="px-2.5 py-0.5 rounded-md font-bold text-[10px]"
                        style={{
                          backgroundColor: currentSelected.planBg,
                          color: currentSelected.planColor,
                        }}
                      >
                        {currentSelected.item}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-gray-400 font-medium">Date & Time</span>
                      <span className="font-medium text-gray-700 text-[11px]">
                        {currentSelected.date}, {currentSelected.time}
                      </span>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}
