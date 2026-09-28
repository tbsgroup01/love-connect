import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  MapPin,
  Calendar,
  Heart,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Edit,
  Trash2,
  UserX,
  Star,
  Check,
  X
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

export default function ProfilesManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Profiles');
  const [selectedTabFilter, setSelectedTabFilter] = useState('All');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Top KPI Metric Cards matching Admin aesthetics
  const kpiCards = [
    {
      title: 'Total Profiles',
      value: '22,840',
      change: '+14% this month',
      changeColor: '#22C55E',
      bgColor: '#FF2D72',
      icon: UserCheck,
    },
    {
      title: 'Complete Profiles',
      value: '18,520',
      change: '+10% this month',
      changeColor: '#22C55E',
      bgColor: '#22C55E',
      icon: CheckCircle2,
    },
    {
      title: 'Incomplete',
      value: '3,890',
      change: '+4% this month',
      changeColor: '#F59E0B',
      bgColor: '#F59E0B',
      icon: Clock,
    },
    {
      title: 'Flagged / Moderation',
      value: '430',
      change: '-2% this month',
      changeColor: '#22C55E',
      bgColor: '#EF4444',
      icon: AlertCircle,
    },
  ];

  // Mock Profiles Data
  const profilesData = [
    {
      id: 1,
      profileId: 'PRF00981',
      name: 'Aaradhya Sharma',
      age: 24,
      gender: 'Female',
      location: 'Delhi, India',
      bio: 'Coffee lover, hopeless romantic & architect in Delhi. Looking for meaningful connections and fun conversation ✨',
      interests: ['Architecture', 'Coffee', 'Travel', 'Photography', 'Music'],
      completionScore: 95,
      isVerified: true,
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      createdDate: '15 Sep 2026',
      createdTime: '10:24 AM',
      matchesCount: 142,
      likesCount: 580,
      subscription: 'Premium',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      ],
      details: {
        height: "5'6\"",
        occupation: 'Senior Architect',
        education: 'B.Arch - IIT Delhi',
        relationshipGoal: 'Long-term relationship',
        smoking: 'No',
        drinking: 'Socially',
        languages: ['English', 'Hindi'],
      }
    },
    {
      id: 2,
      profileId: 'PRF00982',
      name: 'Rohit Mehta',
      age: 27,
      gender: 'Male',
      location: 'Mumbai, India',
      bio: 'Tech entrepreneur & fitness enthusiast. Passionate about startup building, weekend hiking and good books.',
      interests: ['Startups', 'Fitness', 'Hiking', 'Books', 'Coding'],
      completionScore: 88,
      isVerified: false,
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      createdDate: '15 Sep 2026',
      createdTime: '09:18 AM',
      matchesCount: 45,
      likesCount: 120,
      subscription: 'Free',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      ],
      details: {
        height: "5'11\"",
        occupation: 'Product Manager',
        education: 'B.Tech - VJTI Mumbai',
        relationshipGoal: 'Marriage',
        smoking: 'No',
        drinking: 'No',
        languages: ['English', 'Hindi', 'Marathi'],
      }
    },
    {
      id: 3,
      profileId: 'PRF00983',
      name: 'Priya Singh',
      age: 23,
      gender: 'Female',
      location: 'Bangalore, India',
      bio: 'UI/UX Designer who loves watercolors, indie music and pet cafes 🐶🎨 Let\'s grab coffee!',
      interests: ['UI/UX', 'Painting', 'Indie Music', 'Dogs', 'Cafes'],
      completionScore: 100,
      isVerified: true,
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      createdDate: '14 Sep 2026',
      createdTime: '05:42 PM',
      matchesCount: 210,
      likesCount: 890,
      subscription: 'VIP Gold',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      ],
      details: {
        height: "5'4\"",
        occupation: 'Lead Designer',
        education: 'NIFT Bangalore',
        relationshipGoal: 'Casual / Dating',
        smoking: 'No',
        drinking: 'Socially',
        languages: ['English', 'Hindi', 'Kannada'],
      }
    },
    {
      id: 4,
      profileId: 'PRF00984',
      name: 'Karan Verma',
      age: 29,
      gender: 'Male',
      location: 'Hyderabad, India',
      bio: 'Data Analyst & food explorer. Always hunting for the best biryani in town 🍲',
      interests: ['Foodie', 'Data Science', 'Gaming', 'Football'],
      completionScore: 65,
      isVerified: false,
      status: 'Incomplete',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      createdDate: '14 Sep 2026',
      createdTime: '03:21 PM',
      matchesCount: 12,
      likesCount: 35,
      subscription: 'Free',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      ],
      details: {
        height: "5'10\"",
        occupation: 'Data Analyst',
        education: 'B.E - Osmania University',
        relationshipGoal: 'Don\'t know yet',
        smoking: 'Occasionally',
        drinking: 'Socially',
        languages: ['English', 'Telugu'],
      }
    },
    {
      id: 5,
      profileId: 'PRF00985',
      name: 'Neha Patel',
      age: 25,
      gender: 'Female',
      location: 'Chennai, India',
      bio: 'Classical dancer & financial analyst. Living life one step at a time.',
      interests: ['Dance', 'Finance', 'Yoga', 'Cooking'],
      completionScore: 92,
      isVerified: true,
      status: 'Active',
      statusBg: '#DCFCE7',
      statusColor: '#16A34A',
      createdDate: '14 Sep 2026',
      createdTime: '11:12 AM',
      matchesCount: 98,
      likesCount: 430,
      subscription: 'Premium',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      photos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      ],
      details: {
        height: "5'5\"",
        occupation: 'Financial Analyst',
        education: 'M.Com - Loyola College',
        relationshipGoal: 'Long-term relationship',
        smoking: 'No',
        drinking: 'No',
        languages: ['English', 'Tamil', 'Hindi'],
      }
    },
    {
      id: 6,
      profileId: 'PRF00986',
      name: 'Vikram Singh',
      age: 28,
      gender: 'Male',
      location: 'Delhi, India',
      bio: 'Blogger and travel enthusiast.',
      interests: ['Blogging', 'Travel', 'Motorbikes'],
      completionScore: 40,
      isVerified: false,
      status: 'Under Review',
      statusBg: '#FEE2E2',
      statusColor: '#EF4444',
      createdDate: '13 Sep 2026',
      createdTime: '09:36 PM',
      matchesCount: 3,
      likesCount: 15,
      subscription: 'Free',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      photos: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
      ],
      details: {
        height: "6'0\"",
        occupation: 'Travel Blogger',
        education: 'DU',
        relationshipGoal: 'Casual',
        smoking: 'Yes',
        drinking: 'Yes',
        languages: ['English', 'Hindi'],
      }
    },
  ];

  const currentSelected = selectedProfile || profilesData[0];

  const filteredData = profilesData.filter((item) => {
    if (selectedTabFilter === 'All') return true;
    if (selectedTabFilter === 'Verified') return item.isVerified;
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
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                Profiles Management
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Inspect, moderate and review user dating profiles & bio content
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Download className="w-4 h-4" />
              <span>Export Profiles</span>
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
                    <span className="text-[11px] font-semibold text-gray-500 block truncate">{kpi.title}</span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FILTER TABS & SEARCH BAR */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
              {[
                { label: 'All Profiles', count: '22,840', key: 'All' },
                { label: 'Active', count: '18,520', key: 'Active' },
                { label: 'Verified Only', count: '14,210', key: 'Verified' },
                { label: 'Incomplete', count: '3,890', key: 'Incomplete' },
                { label: 'Under Review', count: '430', key: 'Under Review' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTabFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedTabFilter === tab.key
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

            {/* Filter Inputs & Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, location or bio keywords..."
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">Gender</span>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                    <option>All Genders</option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">Completeness</span>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                    <option>All</option>
                    <option>&gt; 80% Complete</option>
                    <option>&lt; 50% Incomplete</option>
                  </select>
                </div>

                <button
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-xs cursor-pointer"
                  style={{ backgroundColor: COLORS.pink }}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>

                <button className="text-xs font-bold text-gray-400 hover:text-gray-600 px-2 py-2.5 cursor-pointer">
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* TABLE AND RIGHT PREVIEW PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* PROFILES TABLE (2 Cols wide on XL) */}
            <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                    <th className="pb-3 w-8">
                      <input type="checkbox" className="rounded text-[#FF2D72] focus:ring-0" />
                    </th>
                    <th className="pb-3 font-semibold">User Profile</th>
                    <th className="pb-3 font-semibold">Location</th>
                    <th className="pb-3 font-semibold">Completion</th>
                    <th className="pb-3 font-semibold">Verification</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-center">Action</th>
                    <th className="pb-3 w-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.map((item) => {
                    const isSelected = currentSelected.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setSelectedProfile(item);
                          setActivePhotoIdx(0);
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-pink-50/50' : 'hover:bg-gray-50/50'
                        }`}
                      >
                        <td className="py-3.5">
                          <input type="checkbox" className="rounded text-[#FF2D72] focus:ring-0" />
                        </td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover border"
                              style={{ borderColor: isSelected ? COLORS.pink : '#E5E7EB' }}
                            />
                            <div>
                              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                                {item.name}
                                <span className="text-[11px] text-gray-400 font-normal">
                                  ({item.gender[0]}, {item.age})
                                </span>
                              </div>
                              <div className="text-gray-400 text-[11px] truncate max-w-[180px]">
                                {item.bio}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 text-gray-700 font-medium">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span>{item.location}</span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div className="w-24">
                            <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                              <span style={{ color: COLORS.pink }}>{item.completionScore}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${item.completionScore}%`,
                                  backgroundColor: item.completionScore > 80 ? COLORS.success : COLORS.warning,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5">
                          {item.isVerified ? (
                            <span className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-flex items-center gap-1 bg-green-50 text-green-600">
                              <ShieldCheck className="w-3 h-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-md font-bold text-[10px] inline-flex items-center gap-1 bg-gray-100 text-gray-500">
                              Unverified
                            </span>
                          )}
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProfile(item);
                              setActivePhotoIdx(0);
                            }}
                            className="px-4 py-1.5 rounded-lg font-bold text-[11px] transition-all shadow-2xs cursor-pointer"
                            style={{
                              backgroundColor: COLORS.lightPink,
                              color: COLORS.pink,
                            }}
                          >
                            Inspect
                          </button>
                        </td>
                        <td className="py-3.5 text-right">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400 mt-2">
                <span>Showing 1 to 6 of 22,840 profiles</span>
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
                    <button className="p-1 rounded-lg hover:bg-gray-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PROFILE PREVIEW CARD */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-5">
              <div>
                <h2 className="text-base font-bold mb-4" style={{ color: COLORS.dark }}>
                  Profile Card Preview
                </h2>

                {/* Profile Main Card */}
                <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg text-white relative mb-4">
                  <div className="relative h-64 w-full">
                    <img
                      src={currentSelected.photos[activePhotoIdx] || currentSelected.avatar}
                      alt={currentSelected.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-extrabold flex items-center gap-2">
                            {currentSelected.name}, {currentSelected.age}
                            {currentSelected.isVerified && (
                              <ShieldCheck className="w-5 h-5 text-sky-400 fill-sky-400" />
                            )}
                          </h3>
                          <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-pink-400" />
                            {currentSelected.location}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-pink-500/80 backdrop-blur-md rounded-full font-bold text-[10px]">
                          {currentSelected.subscription}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Photo Thumbnails */}
                  <div className="p-3 bg-gray-900/90 flex items-center gap-2 border-t border-gray-800">
                    {currentSelected.photos.map((photoUrl, pIdx) => (
                      <img
                        key={pIdx}
                        src={photoUrl}
                        alt="Thumb"
                        onClick={() => setActivePhotoIdx(pIdx)}
                        className={`w-11 h-11 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                          activePhotoIdx === pIdx ? 'border-[#FF2D72] scale-105' : 'border-transparent opacity-60'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bio & Details Breakdown */}
                <div className="space-y-3.5 text-xs">
                  <div>
                    <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1">
                      Bio
                    </h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 italic leading-relaxed">
                      "{currentSelected.bio}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1.5">
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSelected.interests.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-pink-50 text-[#FF2D72]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                      Personal Details
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <div><span className="text-gray-400">Occupation:</span> <span className="font-semibold">{currentSelected.details.occupation}</span></div>
                      <div><span className="text-gray-400">Goal:</span> <span className="font-semibold">{currentSelected.details.relationshipGoal}</span></div>
                      <div><span className="text-gray-400">Height:</span> <span className="font-semibold">{currentSelected.details.height}</span></div>
                      <div><span className="text-gray-400">Smoking:</span> <span className="font-semibold">{currentSelected.details.smoking}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: COLORS.success }}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Profile</span>
                </button>
                <button
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: COLORS.danger }}
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Hide / Ban</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
