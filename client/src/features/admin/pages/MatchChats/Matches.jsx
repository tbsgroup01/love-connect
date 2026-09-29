import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  CheckCircle2,
  HeartOff,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Copy,
  Check,
  X,
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

export default function AdminMatches() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Matches');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Top 4 KPI Metric Cards specified by user:
  // Total Matches, Daily Matches, Successful Matches, Unmatches
  const kpiCards = [
    {
      title: 'Total Matches',
      value: '24,580',
      bgColor: '#FF2D72',
      icon: Heart,
    },
    {
      title: 'Daily Matches',
      value: '1,280',
      bgColor: '#3B82F6',
      icon: Sparkles,
    },
    {
      title: 'Successful Matches',
      value: '18,420',
      bgColor: '#22C55E',
      icon: CheckCircle2,
    },
    {
      title: 'Unmatches',
      value: '3,140',
      bgColor: '#EF4444',
      icon: HeartOff,
    },
  ];

  // Mock Matches Table Data matching user requirements:
  // User A, User B, Match Date, Status, Actions
  const initialMatchesData = [
    {
      id: 1,
      matchId: 'MCH-009241',
      userA: {
        name: 'Rohan Mehta',
        age: 28,
        location: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        interests: ['Travel', 'Photography', 'Fitness'],
      },
      userB: {
        name: 'Aaradhya Sharma',
        age: 25,
        location: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        interests: ['Music', 'Coffee', 'Yoga'],
      },
      matchDate: '15 Sep 2026',
      matchTime: '10:24 AM',
      matchScore: '94% Compatibility',
      status: 'Successful',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      messagesCount: 142,
      lastInteraction: '10 mins ago',
    },
    {
      id: 2,
      matchId: 'MCH-009240',
      userA: {
        name: 'Karan Verma',
        age: 29,
        location: 'Bangalore, India',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        interests: ['Startups', 'Badminton', 'Movies'],
      },
      userB: {
        name: 'Priya Singh',
        age: 26,
        location: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        interests: ['Cooking', 'Art', 'Dogs'],
      },
      matchDate: '15 Sep 2026',
      matchTime: '09:18 AM',
      matchScore: '89% Compatibility',
      status: 'Daily Matches',
      statusBg: '#DBEAFE',
      statusColor: '#2563EB',
      messagesCount: 68,
      lastInteraction: '1 hour ago',
    },
    {
      id: 3,
      matchId: 'MCH-009239',
      userA: {
        name: 'Rahul Mehta',
        age: 32,
        location: 'Gurgaon, India',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
        interests: ['Reading', 'Cricket', 'Finance'],
      },
      userB: {
        name: 'Neha Patel',
        age: 28,
        location: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        interests: ['Travel', 'Writing', 'Pets'],
      },
      matchDate: '14 Sep 2026',
      matchTime: '08:55 PM',
      matchScore: '91% Compatibility',
      status: 'Successful',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      messagesCount: 215,
      lastInteraction: 'Yesterday',
    },
    {
      id: 4,
      matchId: 'MCH-009238',
      userA: {
        name: 'Amit Kumar',
        age: 29,
        location: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        interests: ['Gaming', 'Tech', 'Music'],
      },
      userB: {
        name: 'Sneha Reddy',
        age: 27,
        location: 'Hyderabad, India',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
        interests: ['Dancing', 'Design', 'Anime'],
      },
      matchDate: '14 Sep 2026',
      matchTime: '07:42 PM',
      matchScore: '86% Compatibility',
      status: 'Daily Matches',
      statusBg: '#DBEAFE',
      statusColor: '#2563EB',
      messagesCount: 42,
      lastInteraction: '2 hours ago',
    },
    {
      id: 5,
      matchId: 'MCH-009237',
      userA: {
        name: 'Vikram Singh',
        age: 31,
        location: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
        interests: ['Gym', 'Biking', 'Rock Music'],
      },
      userB: {
        name: 'Pooja Verma',
        age: 29,
        location: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        interests: ['Baking', 'Yoga', 'Podcasts'],
      },
      matchDate: '14 Sep 2026',
      matchTime: '05:21 PM',
      matchScore: '78% Compatibility',
      status: 'Unmatches',
      statusBg: '#FFE4E6',
      statusColor: '#E11D48',
      messagesCount: 14,
      lastInteraction: 'Unmatched 14 Sep',
    },
    {
      id: 6,
      matchId: 'MCH-009236',
      userA: {
        name: 'Alisha Verma',
        age: 25,
        location: 'Delhi, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        interests: ['Fashion', 'Singing', 'Travel'],
      },
      userB: {
        name: 'Riya Malhotra',
        age: 26,
        location: 'Noida, India',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        interests: ['Poetry', 'Coffee', 'Nature'],
      },
      matchDate: '14 Sep 2026',
      matchTime: '03:12 PM',
      matchScore: '96% Compatibility',
      status: 'Successful',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      messagesCount: 310,
      lastInteraction: 'Active now',
    },
    {
      id: 7,
      matchId: 'MCH-009235',
      userA: {
        name: 'Karan Sharma',
        age: 30,
        location: 'Bangalore, India',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        interests: ['Hiking', 'Guitar', 'Dogs'],
      },
      userB: {
        name: 'Simran Kaur',
        age: 28,
        location: 'Chandigarh, India',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        interests: ['Literature', 'Cafes', 'Bhangra'],
      },
      matchDate: '13 Sep 2026',
      matchTime: '11:24 AM',
      matchScore: '84% Compatibility',
      status: 'Daily Matches',
      statusBg: '#DBEAFE',
      statusColor: '#2563EB',
      messagesCount: 55,
      lastInteraction: 'Yesterday',
    },
    {
      id: 8,
      matchId: 'MCH-009234',
      userA: {
        name: 'Tanya Gupta',
        age: 24,
        location: 'Lucknow, India',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
        interests: ['Painting', 'Food', 'Cinema'],
      },
      userB: {
        name: 'Vikram Singh',
        age: 31,
        location: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
        interests: ['Fitness', 'Adventure', 'Music'],
      },
      matchDate: '13 Sep 2026',
      matchTime: '10:10 AM',
      matchScore: '92% Compatibility',
      status: 'Successful',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      messagesCount: 184,
      lastInteraction: '3 hours ago',
    },
    {
      id: 9,
      matchId: 'MCH-009233',
      userA: {
        name: 'Dev Malhotra',
        age: 32,
        location: 'Noida, India',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
        interests: ['Running', 'Podcasts', 'Cars'],
      },
      userB: {
        name: 'Nisha Kapoor',
        age: 28,
        location: 'Chennai, India',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        interests: ['Coding', 'Board Games', 'Cats'],
      },
      matchDate: '12 Sep 2026',
      matchTime: '08:36 PM',
      matchScore: '72% Compatibility',
      status: 'Unmatches',
      statusBg: '#FFE4E6',
      statusColor: '#E11D48',
      messagesCount: 8,
      lastInteraction: 'Unmatched 12 Sep',
    },
    {
      id: 10,
      matchId: 'MCH-009232',
      userA: {
        name: 'Rahul Das',
        age: 27,
        location: 'Kolkata, India',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        interests: ['Football', 'Street Food', 'Philosophy'],
      },
      userB: {
        name: 'Sneha Reddy',
        age: 27,
        location: 'Hyderabad, India',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        interests: ['Design', 'Reading', 'Travel'],
      },
      matchDate: '12 Sep 2026',
      matchTime: '06:14 PM',
      matchScore: '88% Compatibility',
      status: 'Daily Matches',
      statusBg: '#DBEAFE',
      statusColor: '#2563EB',
      messagesCount: 76,
      lastInteraction: '12 Sep 2026',
    },
  ];

  const [matchesData, setMatchesData] = useState(initialMatchesData);
  const [selectedMatchIds, setSelectedMatchIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatches = matchesData.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.userA.name.toLowerCase().includes(term) ||
      item.userB.name.toLowerCase().includes(term) ||
      item.matchId.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  const currentSelected =
    selectedMatch && matchesData.some((m) => m.id === selectedMatch.id)
      ? selectedMatch
      : matchesData[0] || null;

  const isAllSelected =
    filteredMatches.length > 0 &&
    filteredMatches.every((item) => selectedMatchIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedMatchIds([]);
    } else {
      setSelectedMatchIds(filteredMatches.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedMatchIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedMatchIds.length === 0) return;
    setMatchesData((prev) => prev.filter((item) => !selectedMatchIds.includes(item.id)));
    setSelectedMatchIds([]);
  };

  const handleDeleteMatch = (id) => {
    setMatchesData((prev) => prev.filter((item) => item.id !== id));
    setSelectedMatchIds((prev) => prev.filter((item) => item !== id));
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
                Match Management
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Monitor user matches, daily match rates, successful connections, and unmatches
              </p>
            </div>
          </div>

          {/* TOP 4 KPI CARDS (Total Matches, Daily Matches, Successful Matches, Unmatches) */}
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

          {/* TABLE AND RIGHT MATCH DETAILS PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* MATCHES TABLE (2 Cols wide on XL) */}
            <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
              {/* Table Header & Search Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">All Matches</span>
                  {selectedMatchIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedMatchIds.length})</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedMatchIds.length > 0 && (
                    <span className="text-xs font-semibold text-gray-500">
                      {selectedMatchIds.length} of {filteredMatches.length} selected
                    </span>
                  )}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search User A or B..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Table with columns: User A, User B, Match Date, Actions */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[650px]">
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
                      <th className="pb-3 font-semibold">User A</th>
                      <th className="pb-3 font-semibold">User B</th>
                      <th className="pb-3 font-semibold">Match Date</th>
                      <th className="pb-3 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredMatches.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-400">
                          No matches found
                        </td>
                      </tr>
                    ) : (
                      filteredMatches.map((item) => {
                        const isSelected = currentSelected && currentSelected.id === item.id;
                        const isChecked = selectedMatchIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedMatch(item)}
                            className={`cursor-pointer transition-colors ${
                              isChecked ? 'bg-pink-50/40' : isSelected ? 'bg-pink-50/20' : 'hover:bg-gray-50/50'
                            }`}
                          >
                            <td className="py-3">
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

                            {/* User A */}
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.userA.avatar}
                                  alt={item.userA.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <div className="font-bold text-gray-900">{item.userA.name}</div>
                                  <div className="text-gray-400 text-[10px]">
                                    {item.userA.age} yrs • {item.userA.location.split(',')[0]}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* User B */}
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.userB.avatar}
                                  alt={item.userB.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <div className="font-bold text-gray-900">{item.userB.name}</div>
                                  <div className="text-gray-400 text-[10px]">
                                    {item.userB.age} yrs • {item.userB.location.split(',')[0]}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Match Date */}
                            <td className="py-3">
                              <div className="font-semibold text-gray-800">{item.matchDate}</div>
                              <div className="text-gray-400 text-[10px]">{item.matchTime}</div>
                            </td>

                            {/* Actions */}
                            <td className="py-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMatch(item);
                                  }}
                                  title="View Match Details"
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteMatch(item.id);
                                  }}
                                  title="Delete Match"
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
                <span>Showing {filteredMatches.length > 0 ? 1 : 0} to {filteredMatches.length} of {matchesData.length} matches</span>
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

            {/* RIGHT MATCH DETAILS PREVIEW PANEL */}
            <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit transition-all">
              {currentSelected ? (
                <>
                  {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
                    style={{ backgroundColor: currentSelected.statusColor }}
                  />
                  <h3 className="font-extrabold text-sm text-gray-900">Match Details</h3>
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
                  {selectedMatch && (
                    <button
                      onClick={() => setSelectedMatch(null)}
                      title="Reset selection"
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Connected Couple Match Visual Card */}
              <div className="p-4 bg-gradient-to-r from-pink-50/80 via-rose-50/40 to-purple-50/60 rounded-2xl border border-pink-100/80 space-y-3">
                <div className="flex items-center justify-between">
                  {/* User A */}
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={currentSelected.userA.avatar}
                      alt={currentSelected.userA.name}
                      className="w-14 h-14 rounded-full object-cover ring-3 ring-white shadow-xs"
                    />
                    <span className="font-bold text-xs text-gray-900 mt-1.5">{currentSelected.userA.name}</span>
                    <span className="text-[10px] text-gray-400">{currentSelected.userA.age} yrs</span>
                  </div>

                  {/* Connected Heart Indicator */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center border border-pink-100">
                      <Heart className="w-4 h-4 text-[#FF2D72] fill-current animate-pulse" />
                    </div>
                    <span className="text-[9px] font-bold text-[#FF2D72] mt-1">Matched</span>
                  </div>

                  {/* User B */}
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={currentSelected.userB.avatar}
                      alt={currentSelected.userB.name}
                      className="w-14 h-14 rounded-full object-cover ring-3 ring-white shadow-xs"
                    />
                    <span className="font-bold text-xs text-gray-900 mt-1.5">{currentSelected.userB.name}</span>
                    <span className="text-[10px] text-gray-400">{currentSelected.userB.age} yrs</span>
                  </div>
                </div>
              </div>

              {/* Match Key Information Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">Match ID</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-gray-800 text-[11px]">{currentSelected.matchId}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(currentSelected.matchId);
                        setCopiedId(true);
                        setTimeout(() => setCopiedId(false), 2000);
                      }}
                      className="text-gray-400 hover:text-gray-700 p-0.5 rounded cursor-pointer transition-colors"
                      title="Copy Match ID"
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
                  <span className="text-gray-400 font-medium">Match Date & Time</span>
                  <span className="font-medium text-gray-700 text-[11px]">
                    {currentSelected.matchDate}, {currentSelected.matchTime}
                  </span>
                </div>

                <div className="py-1.5">
                  <span className="text-gray-400 font-medium block mb-1.5">Common Interests</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {currentSelected.userA.interests.map((interest, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-50 text-gray-600 border border-gray-100"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
                </>
              ) : (
                <div className="py-16 text-center text-gray-400 text-xs font-semibold">
                  No match selected
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
