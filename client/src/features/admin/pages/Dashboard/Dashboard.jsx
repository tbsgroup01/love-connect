import React, { useState } from 'react';
import {
  Users,
  Heart,
  MessageSquare,
  AlertTriangle,
  Zap,
  Download
} from 'lucide-react';
import AdminNavbar from '../../components/Navbar';
import AdminSidebar from '../../components/Sidebar';

// Strict Color Palette matching user prompt
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

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const kpiCards = [
    {
      title: 'Total Users',
      value: '24,568',
      change: '+12% this month',
      bgColor: '#FF2D72',
      icon: Users,
    },
    {
      title: 'Active Users',
      value: '8,432',
      change: '+8% this month',
      bgColor: '#3B82F6',
      icon: Users,
    },
    {
      title: 'Total Matches',
      value: '12,346',
      change: '+18% this month',
      bgColor: '#7C3AED',
      icon: Heart,
    },
    {
      title: 'Total Messages',
      value: '56,789',
      change: '+22% this month',
      bgColor: '#F59E0B',
      icon: MessageSquare,
    },
    {
      title: 'Total Revenue',
      value: '₹4,26,890',
      change: '+28% this month',
      bgColor: '#22C55E',
      iconText: '₹',
    },
    {
      title: 'Reports',
      value: '148',
      change: '+5% this month',
      changeColor: '#EF4444',
      bgColor: '#EF4444',
      icon: AlertTriangle,
    },
  ];

  const newUsers = [
    {
      name: 'Aaradhya Sharma',
      email: 'aaradhya@gmail.com',
      time: '2 min ago',
      status: 'Verified',
      statusBg: '#FFE7F0',
      statusColor: '#22C55E',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    {
      name: 'Rohit Mehta',
      email: 'rohitm@gmail.com',
      time: '5 min ago',
      status: 'Pending',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      name: 'Priya Singh',
      email: 'priya@gmail.com',
      time: '12 min ago',
      status: 'Verified',
      statusBg: '#FFE7F0',
      statusColor: '#22C55E',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      name: 'Karan Verma',
      email: 'karan@gmail.com',
      time: '18 min ago',
      status: 'Verified',
      statusBg: '#FFE7F0',
      statusColor: '#22C55E',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    {
      name: 'Neha Patel',
      email: 'neha@gmail.com',
      time: '25 min ago',
      status: 'Pending',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const recentMatches = [
    {
      p1: 'Aaradhya',
      p1Img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      p2: 'Rohit',
      p2Img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      time: '2 min ago',
    },
    {
      p1: 'Priya',
      p1Img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      p2: 'Karan',
      p2Img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      time: '14 min ago',
    },
    {
      p1: 'Neha',
      p1Img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      p2: 'Amit',
      p2Img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      time: '28 min ago',
    },
    {
      p1: 'Sneha',
      p1Img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
      p2: 'Vikram',
      p2Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      time: '1 hour ago',
    },
    {
      p1: 'Pooja',
      p1Img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      p2: 'Rahul',
      p2Img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      time: '2 hours ago',
    },
  ];

  const recentReports = [
    {
      user: 'Amit Kumar',
      email: 'amit123@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      reportedBy: 'Priya Sharma',
      reason: 'Inappropriate Content',
      date: '15 Sep 2026',
      status: 'Pending',
      statusStyle: { bg: '#FEF3C7', color: '#D97706' },
      action: 'Review',
      actionStyle: { bg: '#FF2D72', color: '#FFFFFF' },
    },
    {
      user: 'Rahul Mehta',
      email: 'rahulmehta@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      reportedBy: 'Neha Patel',
      reason: 'Fake Profile',
      date: '15 Sep 2026',
      status: 'Under Review',
      statusStyle: { bg: '#E0F2FE', color: '#0284C7' },
      action: 'View',
      actionStyle: { bg: '#FFE7F0', color: '#FF2D72' },
    },
    {
      user: 'Simran Kaur',
      email: 'simran@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      reportedBy: 'Anonymous',
      reason: 'Harassment',
      date: '14 Sep 2026',
      status: 'Resolved',
      statusStyle: { bg: '#DCFCE7', color: '#16A34A' },
      action: 'View',
      actionStyle: { bg: '#FFE7F0', color: '#FF2D72' },
    },
    {
      user: 'Vikram Singh',
      email: 'vikramsingh@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      reportedBy: 'Pooja Verma',
      reason: 'Spam',
      date: '14 Sep 2026',
      status: 'Pending',
      statusStyle: { bg: '#FEF3C7', color: '#D97706' },
      action: 'Review',
      actionStyle: { bg: '#FF2D72', color: '#FFFFFF' },
    },
    {
      user: 'Riya Malhotra',
      email: 'riya@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      reportedBy: 'Karan Verma',
      reason: 'Inappropriate Photos',
      date: '13 Sep 2026',
      status: 'Resolved',
      statusStyle: { bg: '#DCFCE7', color: '#16A34A' },
      action: 'View',
      actionStyle: { bg: '#FFE7F0', color: '#FF2D72' },
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
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                Dashboard
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Real-time operational metrics, member matching pulse and platform revenue analytics
              </p>
            </div>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Download className="w-4 h-4" />
              <span>Export Analytics</span>
            </button>
          </div>

          {/* TOP 6 KPI METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiCards.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-gray-100/80 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4"
                  style={{ borderLeftColor: kpi.bgColor }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: kpi.bgColor }}
                  >
                    {Icon ? <Icon className="w-5.5 h-5.5 stroke-[2.2]" /> : <span className="font-extrabold text-base">{kpi.iconText}</span>}
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

          {/* MIDDLE ROW 1: CHARTS (REGISTRATION AREA & DEMOGRAPHICS DONUT) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Registration & Activity Line Chart */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-xs flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                    User Registration & Activity
                  </h2>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.pink }}></span>
                    <span className="text-gray-600">New Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.purple }}></span>
                    <span className="text-gray-600">Active Users</span>
                  </div>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg px-2.5 py-1.5 focus:outline-none">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>

              {/* Area Chart SVG */}
              <div className="w-full h-64 relative flex-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 220" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF2D72" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FF2D72" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="40" y1="20" x2="680" y2="20" stroke="#F3F4F6" strokeDasharray="4 4" />
                  <line x1="40" y1="70" x2="680" y2="70" stroke="#F3F4F6" strokeDasharray="4 4" />
                  <line x1="40" y1="120" x2="680" y2="120" stroke="#F3F4F6" strokeDasharray="4 4" />
                  <line x1="40" y1="170" x2="680" y2="170" stroke="#F3F4F6" strokeDasharray="4 4" />

                  {/* Y Axis Labels */}
                  <text x="30" y="24" fill="#9CA3AF" fontSize="10" textAnchor="end">2,000</text>
                  <text x="30" y="74" fill="#9CA3AF" fontSize="10" textAnchor="end">1,500</text>
                  <text x="30" y="124" fill="#9CA3AF" fontSize="10" textAnchor="end">1,000</text>
                  <text x="30" y="174" fill="#9CA3AF" fontSize="10" textAnchor="end">500</text>
                  <text x="30" y="200" fill="#9CA3AF" fontSize="10" textAnchor="end">0</text>

                  {/* Purple Area/Line (Active Users) */}
                  <path
                    d="M 50 160 Q 110 145 170 148 T 290 140 T 410 135 T 530 130 T 670 110 L 670 195 L 50 195 Z"
                    fill="url(#purpleGrad)"
                  />
                  <path
                    d="M 50 160 Q 110 145 170 148 T 290 140 T 410 135 T 530 130 T 670 110"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="3"
                  />

                  {/* Pink Area/Line (New Users) */}
                  <path
                    d="M 50 140 Q 110 95 170 115 T 290 100 T 410 80 T 530 65 T 670 45 L 670 195 L 50 195 Z"
                    fill="url(#pinkGrad)"
                  />
                  <path
                    d="M 50 140 Q 110 95 170 115 T 290 100 T 410 80 T 530 65 T 670 45"
                    fill="none"
                    stroke="#FF2D72"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* X Axis Date Labels */}
              <div className="flex justify-between text-[11px] text-gray-400 px-8 mt-2">
                <span>Aug 16</span>
                <span>Aug 19</span>
                <span>Aug 22</span>
                <span>Aug 25</span>
                <span>Aug 28</span>
                <span>Aug 31</span>
                <span>Sep 03</span>
                <span>Sep 06</span>
                <span>Sep 09</span>
                <span>Sep 12</span>
                <span>Sep 15</span>
              </div>
            </div>

            {/* User Demographics Donut Chart */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                  User Demographics
                </h2>
                <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg px-2 py-1 focus:outline-none">
                  <option>By Gender</option>
                  <option>By Age</option>
                </select>
              </div>

              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F3F4F6"
                      strokeWidth="3.8"
                    />
                    {/* Male 52% (Blue) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="4"
                      strokeDasharray="52, 100"
                    />
                    {/* Female 46% (Pink) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#FF2D72"
                      strokeWidth="4"
                      strokeDasharray="46, 100"
                      strokeDashoffset="-52"
                    />
                    {/* Non-binary 1% (Purple) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="4"
                      strokeDasharray="1, 100"
                      strokeDashoffset="-98"
                    />
                    {/* Other 1% (Yellow) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="4"
                      strokeDasharray="1, 100"
                      strokeDashoffset="-99"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold" style={{ color: COLORS.dark }}>
                      24,568
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Users</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs font-semibold pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-gray-700">Male</span>
                  </div>
                  <span className="text-gray-500">52% (12,763)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.pink }}></span>
                    <span className="text-gray-700">Female</span>
                  </div>
                  <span className="text-gray-500">46% (11,295)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.purple }}></span>
                    <span className="text-gray-700">Non-binary</span>
                  </div>
                  <span className="text-gray-500">1% (245)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.warning }}></span>
                    <span className="text-gray-700">Other</span>
                  </div>
                  <span className="text-gray-500">1% (265)</span>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE ROW 2: NEW USERS & RECENT MATCHES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* New Users */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                  New Users
                </h2>
                <button className="px-3 py-1.5 rounded-2xl text-xs font-extrabold bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] border border-[#FF2D72]/20 hover:bg-[#FFE7F0] transition-colors cursor-pointer">
                  View All
                </button>
              </div>
              <div className="space-y-3.5">
                {newUsers.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-gray-400 text-[11px]">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-400">{user.time}</span>
                      <span
                        className="px-2.5 py-1 rounded-md font-semibold text-[10px]"
                        style={{ backgroundColor: user.statusBg, color: user.statusColor }}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                  Recent Matches
                </h2>
                <button className="px-3 py-1.5 rounded-2xl text-xs font-extrabold bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] border border-[#FF2D72]/20 hover:bg-[#FFE7F0] transition-colors cursor-pointer">
                  View All
                </button>
              </div>
              <div className="space-y-3.5">
                {recentMatches.map((match, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={match.p1Img}
                        alt={match.p1}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-bold text-gray-900">{match.p1}</span>
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center">
                        <Heart className="w-3 h-3 text-[#FF2D72] fill-[#FF2D72]" />
                      </div>
                      <img
                        src={match.p2Img}
                        alt={match.p2}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-bold text-gray-900">{match.p2}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{match.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW 3: RECENT REPORTS TABLE & SUBSCRIPTION SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reports Table */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-xs overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                  Recent Reports
                </h2>
                <button className="px-3 py-1.5 rounded-2xl text-xs font-extrabold bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] border border-[#FF2D72]/20 hover:bg-[#FFE7F0] transition-colors cursor-pointer">
                  View All
                </button>
              </div>

              <table className="w-full text-left text-xs min-w-[550px]">
                <thead>
                  <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                    <th className="pb-3 font-semibold">User</th>
                    <th className="pb-3 font-semibold">Reported By</th>
                    <th className="pb-3 font-semibold">Reason</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentReports.map((report, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={report.avatar}
                            alt={report.user}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{report.user}</div>
                            <div className="text-gray-400 text-[10px]">{report.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600 font-medium">{report.reportedBy}</td>
                      <td className="py-3 text-gray-600 font-medium">{report.reason}</td>
                      <td className="py-3 text-gray-400 text-[11px]">{report.date}</td>
                      <td className="py-3">
                        <span
                          className="px-2.5 py-1 rounded-md font-semibold text-[10px] inline-block"
                          style={{
                            backgroundColor: report.statusStyle.bg,
                            color: report.statusStyle.color,
                          }}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          className="px-3 py-1 rounded-lg font-bold text-[11px] shadow-sm transition-all"
                          style={{
                            backgroundColor: report.actionStyle.bg,
                            color: report.actionStyle.color,
                          }}
                        >
                          {report.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Subscription Summary Bar Chart & Plan Cards */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                  Subscription Summary
                </h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-2xl text-xs font-extrabold bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] border border-[#FF2D72]/20 hover:bg-[#FFE7F0] transition-colors cursor-pointer">
                    View All
                  </button>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg px-2 py-1 focus:outline-none">
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>

              {/* Bar Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.pink }}></span>
                  <span className="text-gray-600">Free Users</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.purple }}></span>
                  <span className="text-gray-600">Premium Users</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.blue }}></span>
                  <span className="text-gray-600">Boost Users</span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-40 w-full flex items-end justify-around border-b border-gray-100 pb-2 px-2 gap-2">
                {/* Week 1 */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1">
                    <div className="w-3.5 rounded-t-md" style={{ height: '90px', backgroundColor: COLORS.pink }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '60px', backgroundColor: COLORS.purple }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '30px', backgroundColor: COLORS.blue }}></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Week 1</span>
                </div>

                {/* Week 2 */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1">
                    <div className="w-3.5 rounded-t-md" style={{ height: '110px', backgroundColor: COLORS.pink }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '70px', backgroundColor: COLORS.purple }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '45px', backgroundColor: COLORS.blue }}></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Week 2</span>
                </div>

                {/* Week 3 */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1">
                    <div className="w-3.5 rounded-t-md" style={{ height: '100px', backgroundColor: COLORS.pink }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '55px', backgroundColor: COLORS.purple }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '35px', backgroundColor: COLORS.blue }}></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Week 3</span>
                </div>

                {/* Week 4 */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1">
                    <div className="w-3.5 rounded-t-md" style={{ height: '120px', backgroundColor: COLORS.pink }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '80px', backgroundColor: COLORS.purple }}></div>
                    <div className="w-3.5 rounded-t-md" style={{ height: '50px', backgroundColor: COLORS.blue }}></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Week 4</span>
                </div>
              </div>

              {/* 3 Mini Plan Cards */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-pink-50/60 p-2.5 rounded-xl border border-pink-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-pink-100 text-[#FF2D72]">
                      <Heart className="w-3 h-3 fill-[#FF2D72]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">Monthly Plan</span>
                  </div>
                  <div className="font-extrabold text-sm" style={{ color: COLORS.dark }}>1,243</div>
                  <div className="text-[9px] font-bold text-[#22C55E]">+15%</div>
                </div>

                <div className="bg-purple-50/60 p-2.5 rounded-xl border border-purple-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-purple-100 text-[#7C3AED]">
                      <Zap className="w-3 h-3 fill-[#7C3AED]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">Yearly Plan</span>
                  </div>
                  <div className="font-extrabold text-sm" style={{ color: COLORS.dark }}>536</div>
                  <div className="text-[9px] font-bold text-[#22C55E]">+22%</div>
                </div>

                <div className="bg-pink-50/40 p-2.5 rounded-xl border border-pink-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-pink-100 text-[#FF2D72]">
                      <Zap className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">Boost Plan</span>
                  </div>
                  <div className="font-extrabold text-sm" style={{ color: COLORS.dark }}>322</div>
                  <div className="text-[9px] font-bold text-[#22C55E]">+18%</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
