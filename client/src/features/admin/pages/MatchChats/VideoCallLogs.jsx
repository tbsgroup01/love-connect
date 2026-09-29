import React, { useState } from 'react';
import {
  Video,
  Clock,
  Users,
  Star,
  Download,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
  X,
  PhoneMissed,
  PhoneOff,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Maximize2,
  Eye,
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

export default function VideoCallLogs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Video Call Logs');
  const [selectedTabFilter, setSelectedTabFilter] = useState('All');
  const [selectedCall, setSelectedCall] = useState(null);

  // Top 4 KPI Cards matching reference image
  const kpiCards = [
    {
      title: 'Total Video Calls',
      value: '8,432',
      bgColor: '#FF2D72',
      icon: Video,
    },
    {
      title: 'Total Call Duration',
      value: '1,248 hrs',
      bgColor: '#3B82F6',
      icon: Clock,
    },
    {
      title: 'Unique Users',
      value: '4,213',
      bgColor: '#7C3AED',
      icon: Users,
    },
    {
      title: 'Avg. Call Duration',
      value: '8.6 mins',
      bgColor: '#F59E0B',
      icon: Star,
    },
  ];

  // Mock Video Call Logs Data matching reference image table exactly
  const initialCallLogsData = [
    {
      id: 1,
      callId: 'CALL0823456',
      caller: {
        name: 'Rohan Mehta',
        age: 28,
        location: 'Mumbai',
        fullLocation: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Aaradhya Sharma',
        age: 25,
        location: 'Delhi',
        fullLocation: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '12:34',
      rawDuration: '12:34 (Completed)',
      date: '15 Sep 2026',
      time: '10:24 AM',
      status: 'Completed',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      deviceInfo: 'Android (Mobile)',
      network: 'WiFi',
      previewImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      callId: 'CALL0823457',
      caller: {
        name: 'Priya Singh',
        age: 28,
        location: 'Mumbai',
        fullLocation: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Karan Verma',
        age: 30,
        location: 'Bangalore',
        fullLocation: 'Bangalore, India',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '08:21',
      rawDuration: '08:21 (Completed)',
      date: '15 Sep 2026',
      time: '09:18 AM',
      status: 'Completed',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      deviceInfo: 'iOS (Mobile)',
      network: '5G Mobile',
      previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      callId: 'CALL0823458',
      caller: {
        name: 'Neha Patel',
        age: 26,
        location: 'Delhi',
        fullLocation: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Rahul Mehta',
        age: 32,
        location: 'Gurgaon',
        fullLocation: 'Gurgaon, India',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '00:00',
      rawDuration: '00:00 (Missed)',
      date: '15 Sep 2026',
      time: '08:55 AM',
      status: 'Missed',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
      deviceInfo: 'Android (Mobile)',
      network: 'WiFi',
      previewImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      callId: 'CALL0823459',
      caller: {
        name: 'Sneha Reddy',
        age: 27,
        location: 'Hyderabad',
        fullLocation: 'Hyderabad, India',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Amit Kumar',
        age: 29,
        location: 'Pune',
        fullLocation: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '15:42',
      rawDuration: '15:42 (Completed)',
      date: '14 Sep 2026',
      time: '07:42 PM',
      status: 'Completed',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      deviceInfo: 'iOS (Mobile)',
      network: 'WiFi',
      previewImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      callId: 'CALL0823460',
      caller: {
        name: 'Vikram Singh',
        age: 31,
        location: 'Pune',
        fullLocation: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Pooja Verma',
        age: 27,
        location: 'Chennai',
        fullLocation: 'Chennai, India',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '02:15',
      rawDuration: '02:15 (Declined)',
      date: '14 Sep 2026',
      time: '05:21 PM',
      status: 'Declined',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      deviceInfo: 'Android (Mobile)',
      network: '4G Mobile',
      previewImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      callId: 'CALL0823461',
      caller: {
        name: 'Alisha Verma',
        age: 25,
        location: 'Delhi',
        fullLocation: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Riya Malhotra',
        age: 26,
        location: 'Noida',
        fullLocation: 'Noida, India',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '09:33',
      rawDuration: '09:33 (Completed)',
      date: '14 Sep 2026',
      time: '03:12 PM',
      status: 'Completed',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      deviceInfo: 'iOS (Mobile)',
      network: 'WiFi',
      previewImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 7,
      callId: 'CALL0823462',
      caller: {
        name: 'Karan Sharma',
        age: 30,
        location: 'Bangalore',
        fullLocation: 'Bangalore, India',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Simran Kaur',
        age: 28,
        location: 'Chandigarh',
        fullLocation: 'Chandigarh, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '00:00',
      rawDuration: '00:00 (Missed)',
      date: '13 Sep 2026',
      time: '11:24 AM',
      status: 'Missed',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
      deviceInfo: 'Android (Mobile)',
      network: 'WiFi',
      previewImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 8,
      callId: 'CALL0823463',
      caller: {
        name: 'Tanya Gupta',
        age: 24,
        location: 'Lucknow',
        fullLocation: 'Lucknow, India',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Vikram Singh',
        age: 31,
        location: 'Pune',
        fullLocation: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '21:08',
      rawDuration: '21:08 (Completed)',
      date: '13 Sep 2026',
      time: '10:18 AM',
      status: 'Completed',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      deviceInfo: 'iOS (Mobile)',
      network: 'WiFi',
      previewImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 9,
      callId: 'CALL0823464',
      caller: {
        name: 'Dev Malhotra',
        age: 32,
        location: 'Noida',
        fullLocation: 'Noida, India',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Neha Kapoor',
        age: 26,
        location: 'Chennai',
        fullLocation: 'Chennai, India',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '04:27',
      rawDuration: '04:27 (Reported)',
      date: '12 Sep 2026',
      time: '08:36 PM',
      status: 'Reported',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
      deviceInfo: 'Android (Mobile)',
      network: '4G Mobile',
      previewImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 10,
      callId: 'CALL0823465',
      caller: {
        name: 'Rahul Das',
        age: 29,
        location: 'Kolkata',
        fullLocation: 'Kolkata, India',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      },
      receiver: {
        name: 'Sneha Reddy',
        age: 27,
        location: 'Hyderabad',
        fullLocation: 'Hyderabad, India',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
      callType: 'Video Call',
      duration: '11:19',
      rawDuration: '11:19 (Completed)',
      date: '12 Sep 2026',
      time: '06:14 PM',
      status: 'Completed',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      deviceInfo: 'Android (Mobile)',
      network: 'WiFi',
      previewImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
      pipImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    },
  ];

  const [callLogsData, setCallLogsData] = useState(initialCallLogsData);
  const [selectedLogIds, setSelectedLogIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const currentSelected =
    selectedCall && callLogsData.some((c) => c.id === selectedCall.id)
      ? selectedCall
      : callLogsData[0] || null;

  const filteredLogs = callLogsData.filter((log) => {
    const matchesTab =
      selectedTabFilter === 'All' ||
      log.status.toLowerCase().includes(selectedTabFilter.toLowerCase());
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      log.caller.name.toLowerCase().includes(term) ||
      log.receiver.name.toLowerCase().includes(term) ||
      log.callId.toLowerCase().includes(term) ||
      log.callType.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  const isAllSelected =
    filteredLogs.length > 0 &&
    filteredLogs.every((item) => selectedLogIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedLogIds([]);
    } else {
      setSelectedLogIds(filteredLogs.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedLogIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedLogIds.length === 0) return;
    setCallLogsData((prev) => prev.filter((item) => !selectedLogIds.includes(item.id)));
    setSelectedLogIds([]);
  };

  const handleDeleteCall = (id) => {
    setCallLogsData((prev) => prev.filter((item) => item.id !== id));
    setSelectedLogIds((prev) => prev.filter((item) => item !== id));
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
                Video Call Logs
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Monitor and manage video calls between users
              </p>
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

          {/* FILTER TABS & SEARCH BAR COLLAPSED ROW */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {[
                { label: 'All Calls', count: '8,432', key: 'All' },
                { label: 'Completed', count: '6,231', key: 'Completed' },
                { label: 'Missed', count: '892', key: 'Missed' },
                { label: 'Declined', count: '765', key: 'Declined' },
                { label: 'Reported', count: '122', key: 'Reported' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTabFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${selectedTabFilter === tab.key
                    ? 'text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  style={{
                    backgroundColor: selectedTabFilter === tab.key ? COLORS.pink : 'transparent',
                  }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Compact Search Bar on the Right */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* TABLE AND RIGHT CALL PREVIEW PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* VIDEO CALL LOGS TABLE (2 Cols wide on XL) */}
            <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-sm">
                  All Video Calls ({filteredLogs.length})
                </h3>
                {selectedLogIds.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Selected ({selectedLogIds.length})
                  </button>
                )}
              </div>

              <table className="w-full text-left text-xs min-w-[750px]">
                <thead>
                  <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                    <th className="pb-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#FF2D72] focus:ring-[#FF2D72] cursor-pointer"
                      />
                    </th>
                    <th className="pb-3 font-semibold">Caller</th>
                    <th className="pb-3 font-semibold">Receiver</th>
                    <th className="pb-3 font-semibold">Call Type</th>
                    <th className="pb-3 font-semibold">Duration</th>
                    <th className="pb-3 font-semibold">Date & Time</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-400 text-xs">
                        No video call logs found
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((item) => {
                      const isSelected = currentSelected && currentSelected.id === item.id;
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedCall(item)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-pink-50/50' : 'hover:bg-gray-50/50'
                          }`}
                        >
                          <td
                            className="py-3.5 text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={selectedLogIds.includes(item.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleToggleSelect(item.id);
                              }}
                              className="rounded border-gray-300 text-[#FF2D72] focus:ring-[#FF2D72] cursor-pointer"
                            />
                          </td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.caller.avatar}
                                alt={item.caller.name}
                                className="w-8 h-8 rounded-full object-cover border"
                                style={{ borderColor: isSelected ? COLORS.pink : '#E5E7EB' }}
                              />
                              <div>
                                <div className="font-bold text-gray-900">{item.caller.name}</div>
                                <div className="text-gray-400 text-[10px]">
                                  {item.caller.age}, {item.caller.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.receiver.avatar}
                                alt={item.receiver.name}
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                              />
                              <div>
                                <div className="font-bold text-gray-900">{item.receiver.name}</div>
                                <div className="text-gray-400 text-[10px]">
                                  {item.receiver.age}, {item.receiver.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                              <Video className="w-3.5 h-3.5 text-[#FF2D72]" />
                              <span>{item.callType}</span>
                            </div>
                          </td>
                          <td className="py-3.5 font-semibold text-gray-700">{item.duration}</td>
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
                          <td
                            className="py-3.5 text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCall(item);
                                }}
                                title="View Call Details"
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCall(item.id);
                                }}
                                title="Delete Log"
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

              {/* Pagination matching reference image */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400 mt-2">
                <span>Showing {filteredLogs.length > 0 ? 1 : 0} to {filteredLogs.length} of {callLogsData.length} call logs</span>
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

            {/* RIGHT CALL PREVIEW & DETAILS PANEL */}
            <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit">
              {currentSelected ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold" style={{ color: COLORS.dark }}>
                      Call Preview
                    </h2>
                    <button
                      onClick={() => setSelectedCall(null)}
                      className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Video Call Player Mockup with PiP Video overlay */}
                  <div className="relative bg-black rounded-2xl overflow-hidden h-52 mb-4 group shadow-md">
                    <img
                      src={currentSelected.previewImage}
                      alt="Receiver Preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Picture-in-Picture Floating Window */}
                    <div className="absolute top-3 right-3 w-16 h-20 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                      <img
                        src={currentSelected.pipImage}
                        alt="Caller PiP"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Call Details Breakdown */}
                  <div className="space-y-2.5 text-xs">
                    <h4 className="font-bold text-gray-900 text-xs mb-1">Call Details</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Caller</span>
                      <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                        <img
                          src={currentSelected.caller.avatar}
                          alt="Caller"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{currentSelected.caller.name}</span>
                        <span className="text-gray-400 font-normal text-[10px]">
                          {currentSelected.caller.age}, {currentSelected.caller.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Receiver</span>
                      <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                        <img
                          src={currentSelected.receiver.avatar}
                          alt="Receiver"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{currentSelected.receiver.name}</span>
                        <span className="text-gray-400 font-normal text-[10px]">
                          {currentSelected.receiver.age}, {currentSelected.receiver.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Call Type</span>
                      <div className="flex items-center gap-1 font-semibold text-gray-800">
                        <Video className="w-3.5 h-3.5 text-[#FF2D72]" />
                        <span>{currentSelected.callType}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date & Time</span>
                      <span className="font-semibold text-gray-800">
                        {currentSelected.date}, {currentSelected.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="font-semibold text-gray-800">{currentSelected.rawDuration}</span>
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
                </div>
              ) : (
                <div className="py-16 text-center text-gray-400 text-xs font-semibold">
                  No call selected
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
