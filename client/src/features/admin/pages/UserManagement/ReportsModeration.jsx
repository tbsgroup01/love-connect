import React, { useState } from 'react';
import {
  Flag,
  Clock,
  CheckCircle2,
  Ban,
  Users,
  Download,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
  UserX,
  AlertTriangle,
  Trash2
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

export default function ReportsModeration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Reports & Moderation');
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Top 5 KPI Metric Cards matching reference UI exactly
  const kpiCards = [
    {
      title: 'Total Reports',
      value: '148',
      bgColor: '#FF2D72',
      icon: Flag,
    },
    {
      title: 'Pending Review',
      value: '36',
      bgColor: '#F59E0B',
      icon: Clock,
    },
    {
      title: 'Resolved',
      value: '98',
      bgColor: '#22C55E',
      icon: CheckCircle2,
    },
    {
      title: 'Action Taken',
      value: '52',
      bgColor: '#EF4444',
      icon: Ban,
    },
    {
      title: 'Repeat Offenders',
      value: '14',
      bgColor: '#7C3AED',
      icon: Users,
    },
  ];

  // Mock Reports Data matching reference image table rows
  const initialReportsData = [
    {
      id: 1,
      reportId: 'REP001234',
      reportedUser: {
        name: 'Rohan Mehta',
        age: 28,
        location: 'Mumbai',
        fullLocation: 'Mumbai, India',
        userId: 'USR12345',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Priya Singh',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Fake Profile',
      reasonBg: '#FFE7F0',
      reasonColor: '#FF2D72',
      date: '15 Sep 2026',
      time: '10:24 AM',
      status: 'Pending',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      description: 'This profile seems fake. Using someone else\'s photos and giving wrong information.',
      evidenceCount: 4,
      evidence: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 2,
      reportId: 'REP001235',
      reportedUser: {
        name: 'Alisha Verma',
        age: 25,
        location: 'Delhi',
        fullLocation: 'Delhi, India',
        userId: 'USR12346',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Neha Patel',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Inappropriate Content',
      reasonBg: '#FFE7F0',
      reasonColor: '#FF2D72',
      date: '15 Sep 2026',
      time: '09:18 AM',
      status: 'In Review',
      statusBg: '#F3E8FF',
      statusColor: '#7C3AED',
      description: 'Uploaded inappropriate photos that violate community safety rules.',
      evidenceCount: 2,
      evidence: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 3,
      reportId: 'REP001236',
      reportedUser: {
        name: 'Karan Sharma',
        age: 30,
        location: 'Bangalore',
        fullLocation: 'Bangalore, India',
        userId: 'USR12347',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Anonymous',
        avatar: null,
      },
      reason: 'Harassment',
      reasonBg: '#FEF3C7',
      reasonColor: '#D97706',
      date: '14 Sep 2026',
      time: '05:42 PM',
      status: 'Resolved',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      description: 'Sending offensive messages repeatedly after being asked to stop.',
      evidenceCount: 3,
      evidence: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 4,
      reportId: 'REP001237',
      reportedUser: {
        name: 'Sneha Reddy',
        age: 27,
        location: 'Hyderabad',
        fullLocation: 'Hyderabad, India',
        userId: 'USR12348',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Amit Kumar',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Spam',
      reasonBg: '#FEF3C7',
      reasonColor: '#D97706',
      date: '14 Sep 2026',
      time: '03:21 PM',
      status: 'Pending',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      description: 'Promoting external links and spamming chat messages.',
      evidenceCount: 1,
      evidence: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 5,
      reportId: 'REP001238',
      reportedUser: {
        name: 'Vikram Singh',
        age: 31,
        location: 'Pune',
        fullLocation: 'Pune, India',
        userId: 'USR12349',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Pooja Verma',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Scam',
      reasonBg: '#FEE2E2',
      reasonColor: '#EF4444',
      date: '14 Sep 2026',
      time: '11:12 AM',
      status: 'Action Taken',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
      description: 'Asking for money transfer under fake emergency pretenses.',
      evidenceCount: 2,
      evidence: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 6,
      reportId: 'REP001239',
      reportedUser: {
        name: 'Neha Kapoor',
        age: 26,
        location: 'Chennai',
        fullLocation: 'Chennai, India',
        userId: 'USR12350',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Riya Malhotra',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Fake Profile',
      reasonBg: '#FFE7F0',
      reasonColor: '#FF2D72',
      date: '13 Sep 2026',
      time: '09:36 PM',
      status: 'Resolved',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      description: 'Reported as celebrity impersonation account.',
      evidenceCount: 1,
      evidence: [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 7,
      reportId: 'REP001240',
      reportedUser: {
        name: 'Rahul Das',
        age: 29,
        location: 'Kolkata',
        fullLocation: 'Kolkata, India',
        userId: 'USR12351',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Simran Kaur',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Inappropriate Content',
      reasonBg: '#FFE7F0',
      reasonColor: '#FF2D72',
      date: '13 Sep 2026',
      time: '12:24 PM',
      status: 'Pending',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      description: 'Explicit language and suggestive messages in bio.',
      evidenceCount: 2,
      evidence: [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 8,
      reportId: 'REP001241',
      reportedUser: {
        name: 'Aarav Joshi',
        age: 27,
        location: 'Jaipur',
        fullLocation: 'Jaipur, India',
        userId: 'USR12352',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Karan Verma',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Harassment',
      reasonBg: '#FEF3C7',
      reasonColor: '#D97706',
      date: '12 Sep 2026',
      time: '06:18 PM',
      status: 'Dismissed',
      statusBg: '#F3F4F6',
      statusColor: '#6B7280',
      description: 'Accusation of unmatching without consent; no rule violation found.',
      evidenceCount: 1,
      evidence: [
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 9,
      reportId: 'REP001242',
      reportedUser: {
        name: 'Tanya Gupta',
        age: 24,
        location: 'Lucknow',
        fullLocation: 'Lucknow, India',
        userId: 'USR12353',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Anonymous',
        avatar: null,
      },
      reason: 'Underage',
      reasonBg: '#FEF3C7',
      reasonColor: '#D97706',
      date: '12 Sep 2026',
      time: '04:50 PM',
      status: 'In Review',
      statusBg: '#F3E8FF',
      statusColor: '#7C3AED',
      description: 'Suspected underage account based on photos provided.',
      evidenceCount: 2,
      evidence: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 10,
      reportId: 'REP001243',
      reportedUser: {
        name: 'Dev Malhotra',
        age: 32,
        location: 'Noida',
        fullLocation: 'Noida, India',
        userId: 'USR12354',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      },
      reportedBy: {
        name: 'Sneha Reddy',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
      reason: 'Other',
      reasonBg: '#F3E8FF',
      reasonColor: '#7C3AED',
      date: '11 Sep 2026',
      time: '02:14 PM',
      status: 'Action Taken',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
      description: 'Reported for multiple bot-like automated messaging patterns.',
      evidenceCount: 1,
      evidence: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
      ],
    },
  ];

  const [reportsData, setReportsData] = useState(initialReportsData);
  const [selectedReportIds, setSelectedReportIds] = useState([]);

  const filteredData = reportsData.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.reportedUser.name.toLowerCase().includes(term) ||
      item.reportedBy.name.toLowerCase().includes(term) ||
      item.reason.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term) ||
      item.reportId.toLowerCase().includes(term)
    );
  });

  const currentSelected =
    selectedReport && reportsData.some((r) => r.id === selectedReport.id)
      ? selectedReport
      : null;

  const isAllSelected =
    filteredData.length > 0 &&
    filteredData.every((item) => selectedReportIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedReportIds([]);
    } else {
      setSelectedReportIds(filteredData.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedReportIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedReportIds.length === 0) return;
    setReportsData((prev) => prev.filter((item) => !selectedReportIds.includes(item.id)));
    setSelectedReportIds([]);
  };

  const handleDeleteReport = (id) => {
    setReportsData((prev) => prev.filter((item) => item.id !== id));
    setSelectedReportIds((prev) => prev.filter((item) => item !== id));
  };

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
                Reports & Moderation
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Review and manage user reports, flagged content and safety issues
              </p>
            </div>

          </div>

          {/* TOP 5 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

          {/* TABLE AND RIGHT REPORT DETAILS PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* REPORTS TABLE */}
            <div className={`${currentSelected ? 'xl:col-span-2' : 'xl:col-span-3'} bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}>
              {/* Table Header & Search Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">All Reports</span>
                  {selectedReportIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedReportIds.length})</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedReportIds.length > 0 && (
                    <span className="text-xs font-semibold text-gray-500">
                      {selectedReportIds.length} of {filteredData.length} selected
                    </span>
                  )}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search User or Reason..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Table with horizontal scroll container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                    <th className="pb-3 w-8">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        className="rounded text-[#FF2D72] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="pb-3 font-semibold">Reported User</th>
                    <th className="pb-3 font-semibold">Reported By</th>
                    <th className="pb-3 font-semibold">Reason</th>
                    <th className="pb-3 font-semibold">Date & Time</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-400">
                        No reports found
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => {
                      const isSelected = currentSelected && currentSelected.id === item.id;
                      const isChecked = selectedReportIds.includes(item.id);
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedReport(item)}
                          className={`cursor-pointer transition-colors ${
                            isChecked ? 'bg-pink-50/40' : isSelected ? 'bg-pink-50/20' : 'hover:bg-gray-50/50'
                          }`}
                        >
                          <td className="py-3.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleToggleSelect(item.id);
                              }}
                              className="rounded text-[#FF2D72] focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.reportedUser.avatar}
                                alt={item.reportedUser.name}
                                className="w-9 h-9 rounded-full object-cover border"
                                style={{ borderColor: isSelected ? COLORS.pink : '#E5E7EB' }}
                              />
                              <div>
                                <div className="font-bold text-gray-900">{item.reportedUser.name}</div>
                                <div className="text-gray-400 text-[11px]">
                                  {item.reportedUser.age}, {item.reportedUser.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2">
                              {item.reportedBy.avatar ? (
                                <img
                                  src={item.reportedBy.avatar}
                                  alt={item.reportedBy.name}
                                  className="w-7 h-7 rounded-full object-cover border border-gray-200"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-[10px]">
                                  👤
                                </div>
                              )}
                              <span className="font-medium text-gray-700">{item.reportedBy.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5">
                            <span
                              className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-block"
                              style={{
                                backgroundColor: item.reasonBg,
                                color: item.reasonColor,
                              }}
                            >
                              {item.reason}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <div className="font-semibold text-gray-700">{item.date}</div>
                            <div className="text-gray-400 text-[10px]">{item.time}</div>
                          </td>
                          <td className="py-3.5">
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
                          <td className="py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedReport(item);
                                }}
                                title="View Report"
                                className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteReport(item.id);
                                }}
                                title="Delete Report"
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

              {/* Pagination matching reference image */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {reportsData.length} reports</span>
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
                    <button className="w-6 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      15
                    </button>
                    <button className="p-1 rounded-lg hover:bg-gray-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT REPORT DETAILS PREVIEW PANEL */}
            {currentSelected && (
              <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-5 xl:sticky xl:top-6 h-fit">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                      Report Details
                    </h2>
                    <button
                      onClick={() => setSelectedReport(null)}
                      title="Close drawer"
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center p-4 bg-gray-50/60 rounded-2xl border border-gray-100 mb-4">
                  <img
                    src={currentSelected.reportedUser.avatar}
                    alt={currentSelected.reportedUser.name}
                    className="w-20 h-20 rounded-full object-cover border-4 shadow-sm border-white"
                  />
                  <h3 className="font-extrabold text-base mt-2" style={{ color: COLORS.dark }}>
                    {currentSelected.reportedUser.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {currentSelected.reportedUser.age} Years • {currentSelected.reportedUser.fullLocation}
                  </p>
                  <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                    ID: {currentSelected.reportedUser.userId}
                  </p>

                  <button
                    className="mt-3 px-4 py-1.5 rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer"
                    style={{ backgroundColor: COLORS.lightPink, color: COLORS.pink }}
                  >
                    View Profile
                  </button>
                </div>

                {/* Report Information Breakdown */}
                <div className="space-y-3 text-xs mb-5">
                  <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                    Report Information
                  </h4>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reported By</span>
                    <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                      {currentSelected.reportedBy.avatar && (
                        <img
                          src={currentSelected.reportedBy.avatar}
                          alt="Reporter"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      )}
                      <span>{currentSelected.reportedBy.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Report ID</span>
                    <span className="font-semibold text-gray-800">{currentSelected.reportId}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reason</span>
                    <span className="font-bold" style={{ color: COLORS.pink }}>
                      {currentSelected.reason}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-gray-400 shrink-0">Description</span>
                    <span className="font-medium text-gray-700 text-right leading-relaxed">
                      {currentSelected.description}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reported On</span>
                    <span className="font-semibold text-gray-800">
                      {currentSelected.date}, {currentSelected.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <span
                      className="px-2.5 py-0.5 rounded-md font-bold text-[10px]"
                      style={{
                        backgroundColor: currentSelected.statusBg,
                        color: currentSelected.statusColor,
                      }}
                    >
                      {currentSelected.status}
                    </span>
                  </div>
                </div>

                {/* Evidence Media Grid */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                      Evidence
                    </h4>
                    <button className="text-xs font-bold" style={{ color: COLORS.pink }}>
                      View All ({currentSelected.evidenceCount})
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {currentSelected.evidence.map((imgUrl, eIdx) => (
                      <div key={eIdx} className="relative rounded-xl overflow-hidden h-16 border border-gray-100">
                        <img src={imgUrl} alt="Evidence media" className="w-full h-full object-cover" />
                        {eIdx === 3 && currentSelected.evidenceCount > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-extrabold text-xs">
                            +{currentSelected.evidenceCount - 3}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Resolve, Suspend User, Dismiss */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: COLORS.success }}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Resolve</span>
                </button>
                <button
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: COLORS.danger }}
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Suspend User</span>
                </button>
                <button
                  className="px-3 py-2.5 rounded-xl font-bold text-xs bg-gray-100 text-gray-600 flex items-center justify-center gap-1 transition-all hover:bg-gray-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Dismiss</span>
                </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
