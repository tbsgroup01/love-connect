import React, { useState } from 'react';
import {
  IndianRupee,
  TrendingUp,
  CreditCard,
  Crown,
  Zap,
  Download,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowUpRight,
  PieChart as PieIcon,
  BarChart3,
  CheckCircle2,
  RefreshCw
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

export default function RevenueReports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Revenue Reports');
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Month');

  // Top 4 Revenue KPI Cards
  const kpiCards = [
    {
      title: 'Total Gross Revenue',
      value: '₹4,26,890',
      changeColor: '#22C55E',
      bgColor: '#FF2D72',
      icon: IndianRupee,
    },
    {
      title: 'Recurring Subscription',
      value: '₹3,12,450',
      changeColor: '#22C55E',
      bgColor: '#7C3AED',
      icon: Crown,
    },
    {
      title: 'Boost & Micro-purchases',
      value: '₹86,220',
      changeColor: '#22C55E',
      bgColor: '#F59E0B',
      icon: Zap,
    },
    {
      title: 'ARPU (Avg Revenue/User)',
      value: '₹48.50',
      changeColor: '#22C55E',
      bgColor: '#3B82F6',
      icon: TrendingUp,
    },
  ];

  // Monthly Revenue Table Breakdown Mock Data
  const monthlyRevenueData = [
    { month: 'September 2026 (MTD)', totalTxns: '8,432', subscriptionRev: '₹3,12,450', boostRev: '₹86,220', grossRev: '₹4,26,890', refunds: '₹12,340', netRev: '₹4,14,550', growth: '+28%' },
    { month: 'August 2026', totalTxns: '7,210', subscriptionRev: '₹2,68,900', boostRev: '₹74,500', grossRev: '₹3,43,400', refunds: '₹9,800', netRev: '₹3,33,600', growth: '+22%' },
    { month: 'July 2026', totalTxns: '6,450', subscriptionRev: '₹2,24,100', boostRev: '₹62,300', grossRev: '₹2,86,400', refunds: '₹7,200', netRev: '₹2,79,200', growth: '+18%' },
    { month: 'June 2026', totalTxns: '5,890', subscriptionRev: '₹1,95,000', boostRev: '₹52,800', grossRev: '₹2,47,800', refunds: '₹6,500', netRev: '₹2,41,300', growth: '+15%' },
    { month: 'May 2026', totalTxns: '5,120', subscriptionRev: '₹1,72,000', boostRev: '₹44,000', grossRev: '₹2,16,000', refunds: '₹5,100', netRev: '₹2,10,900', growth: '+12%' },
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
          {/* PAGE TITLE & EXPORT ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                Revenue Reports
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Detailed financial analysis, subscription growth and revenue metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 focus:outline-none shadow-2xs"
              >
                <option>This Month</option>
                <option>Last Quarter</option>
                <option>This Year</option>
              </select>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: COLORS.pink }}
              >
                <Download className="w-4 h-4" />
                <span>Export Financial Report</span>
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
                    <span className="text-[13px] font-semibold text-gray-500 block truncate">{kpi.title}</span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Growth Bar/Area Chart (2 Cols) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">Revenue Growth & Comparison</h3>
                  <p className="text-xs text-gray-400">Monthly breakdown of subscription vs micro-boost sales</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.pink }}></span>
                    <span className="text-gray-600">Subscriptions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.purple }}></span>
                    <span className="text-gray-600">Boost & Addons</span>
                  </div>
                </div>
              </div>


              <div className="h-56 w-full flex items-end justify-around border-b border-gray-100 pb-3 px-4 gap-4">
                {[
                  { month: 'May', subH: '100px', boostH: '40px', subVal: '₹1.72L', boostVal: '₹44K' },
                  { month: 'Jun', subH: '120px', boostH: '50px', subVal: '₹1.95L', boostVal: '₹52K' },
                  { month: 'Jul', subH: '140px', boostH: '60px', subVal: '₹2.24L', boostVal: '₹62K' },
                  { month: 'Aug', subH: '165px', boostH: '75px', subVal: '₹2.68L', boostVal: '₹74K' },
                  { month: 'Sep (MTD)', subH: '190px', boostH: '85px', subVal: '₹3.12L', boostVal: '₹86K' },
                ].map((item, bIdx) => (
                  <div key={bIdx} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="flex items-end gap-2">
                      <div
                        className="w-8 rounded-t-lg transition-all group-hover:opacity-90 relative"
                        style={{ height: item.subH, backgroundColor: COLORS.pink }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap transition-opacity">
                          {item.subVal}
                        </span>
                      </div>
                      <div
                        className="w-8 rounded-t-lg transition-all group-hover:opacity-90 relative"
                        style={{ height: item.boostH, backgroundColor: COLORS.purple }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap transition-opacity">
                          {item.boostVal}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Sources Breakdown Donut Chart (1 Col) */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-base text-gray-900">Revenue Sources</h3>
                <span className="text-xs text-gray-400 font-medium">Sep 2026</span>
              </div>

              {/* Donut Graphic */}
              <div className="flex flex-col items-center justify-center my-2">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F3F4F6"
                      strokeWidth="4"
                    />
                    {/* Monthly Sub (48%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#FF2D72"
                      strokeWidth="4.2"
                      strokeDasharray="48, 100"
                    />
                    {/* Yearly Sub (25%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="4.2"
                      strokeDasharray="25, 100"
                      strokeDashoffset="-48"
                    />
                    {/* Boost (20%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="4.2"
                      strokeDasharray="20, 100"
                      strokeDashoffset="-73"
                    />
                    {/* Super Likes & Other (7%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="4.2"
                      strokeDasharray="7, 100"
                      strokeDashoffset="-93"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-lg font-black text-gray-900">₹4,26,890</span>
                    <span className="text-[10px] text-gray-400 font-semibold">Total Revenue</span>
                  </div>
                </div>
              </div>

              {/* Legend Details */}
              <div className="space-y-2 text-xs font-semibold pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.pink }}></span>
                    <span className="text-gray-700">Monthly Plan</span>
                  </div>
                  <span className="text-gray-500">48% (₹2,04,900)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.purple }}></span>
                    <span className="text-gray-700">Yearly / Quarterly</span>
                  </div>
                  <span className="text-gray-500">25% (₹1,07,550)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.warning }}></span>
                    <span className="text-gray-700">Profile Boosts</span>
                  </div>
                  <span className="text-gray-500">20% (₹85,370)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.blue }}></span>
                    <span className="text-gray-700">Super Likes & Addons</span>
                  </div>
                  <span className="text-gray-500">7% (₹29,070)</span>
                </div>
              </div>
            </div>
          </div>


        </main>
      </div>
    </div>
  );
}
