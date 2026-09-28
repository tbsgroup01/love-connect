import React, { useState } from 'react';
import {
  Heart,
  Users,
  Sparkles,
  MessageSquare,
  Download,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Eye,
  Star,
  UserPlus,
  MoreHorizontal,
  X,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
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
  const [selectedTabFilter, setSelectedTabFilter] = useState('All');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Top 4 KPI Cards matching exact reference image
  const kpiCards = [
    {
      title: 'Total Matches',
      value: '12,346',
      change: '+18% this month',
      changeColor: '#22C55E',
      bgColor: '#FF2D72',
      icon: Heart,
    },
    {
      title: 'Active Matches',
      value: '8,432',
      change: '+22% this month',
      changeColor: '#22C55E',
      bgColor: '#3B82F6',
      icon: Users,
    },
    {
      title: 'New Matches',
      value: '1,245',
      change: '+12% this month',
      changeColor: '#22C55E',
      bgColor: '#7C3AED',
      icon: Sparkles,
    },
    {
      title: 'Messages Exchanged',
      value: '56,789',
      change: '+28% this month',
      changeColor: '#22C55E',
      bgColor: '#F59E0B',
      icon: MessageSquare,
    },
  ];

  // Mock Matches Grid Data matching reference image cards
  const matchesData = [
    {
      id: 1,
      name: 'Aaradhya Sharma',
      age: 25,
      location: 'Delhi',
      fullLocation: 'Delhi, India',
      matchScore: '92% Match',
      matchScoreColor: '#FF2D72',
      isOnline: true,
      lastSeen: 'Online now',
      timeAgo: '12 Photos',
      matchedDate: '12 Sep 2026',
      lastMessage: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      isVerified: true,
      aboutMe: 'Looking for a kind, honest and fun-loving partner who enjoys travel and meaningful conversations.',
      height: "5'5\" (165 cm)",
      profession: 'Marketing Manager',
      education: 'Delhi University',
      religion: 'Hindu',
      lookingFor: 'Relationship',
      maritalStatus: 'Never Married',
      languages: 'Hindi, English',
      smoking: 'Non Smoker',
      drinking: 'Social Drinker',
      interests: ['Travel', 'Music', 'Photography', 'Fitness', 'Food', 'Reading'],
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 4,
    },
    {
      id: 2,
      name: 'Priya Singh',
      age: 28,
      location: 'Mumbai',
      fullLocation: 'Mumbai, India',
      matchScore: '88% Match',
      matchScoreColor: '#7C3AED',
      isOnline: false,
      lastSeen: '8 days ago',
      timeAgo: '36 Photos',
      matchedDate: '10 Sep 2026',
      lastMessage: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      isVerified: true,
      aboutMe: 'UI/UX Designer who loves watercolors, indie music and pet cafes 🐶🎨',
      height: "5'4\" (162 cm)",
      profession: 'UI/UX Designer',
      education: 'NIFT Bangalore',
      religion: 'Hindu',
      lookingFor: 'Dating',
      maritalStatus: 'Never Married',
      languages: 'English, Hindi',
      smoking: 'Non Smoker',
      drinking: 'Social Drinker',
      interests: ['Art', 'Design', 'Pets', 'Music', 'Cafes'],
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 0,
    },
    {
      id: 3,
      name: 'Neha Patel',
      age: 26,
      location: 'Bangalore',
      fullLocation: 'Bangalore, India',
      matchScore: '85% Match',
      matchScoreColor: '#3B82F6',
      isOnline: true,
      lastSeen: 'Online now',
      timeAgo: '42 Photos',
      matchedDate: '08 Sep 2026',
      lastMessage: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      isVerified: true,
      aboutMe: 'Classical dancer & financial analyst. Living life one step at a time.',
      height: "5'6\" (167 cm)",
      profession: 'Financial Analyst',
      education: 'Loyola College',
      religion: 'Hindu',
      lookingFor: 'Long-term',
      maritalStatus: 'Never Married',
      languages: 'English, Tamil, Hindi',
      smoking: 'Non Smoker',
      drinking: 'Non Drinker',
      interests: ['Dance', 'Yoga', 'Finance', 'Cooking'],
      photos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 0,
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      age: 27,
      location: 'Hyderabad',
      fullLocation: 'Hyderabad, India',
      matchScore: '82% Match',
      matchScoreColor: '#F59E0B',
      isOnline: false,
      lastSeen: 'Last seen 1 hour ago',
      timeAgo: '21 days ago',
      matchedDate: '05 Sep 2026',
      lastMessage: '5 hours ago',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
      isVerified: true,
      aboutMe: 'Software engineer passionate about AI, weekend roadtrips and good coffee.',
      height: "5'5\" (165 cm)",
      profession: 'Software Engineer',
      education: 'IIIT Hyderabad',
      religion: 'Hindu',
      lookingFor: 'Relationship',
      maritalStatus: 'Never Married',
      languages: 'English, Telugu, Hindi',
      smoking: 'Non Smoker',
      drinking: 'Social Drinker',
      interests: ['AI', 'Coding', 'Roadtrips', 'Coffee'],
      photos: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 0,
    },
    {
      id: 5,
      name: 'Karan Verma',
      age: 29,
      location: 'Pune',
      fullLocation: 'Pune, India',
      matchScore: '78% Match',
      matchScoreColor: '#7C3AED',
      isOnline: true,
      lastSeen: 'Online now',
      timeAgo: '15 days ago',
      matchedDate: '02 Sep 2026',
      lastMessage: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
      isVerified: false,
      aboutMe: 'Architect who loves photography, urban sketch & filter coffee.',
      height: "5'10\" (178 cm)",
      profession: 'Architect',
      education: 'COEP Pune',
      religion: 'Hindu',
      lookingFor: 'Casual / Dating',
      maritalStatus: 'Never Married',
      languages: 'English, Hindi, Marathi',
      smoking: 'Occasional',
      drinking: 'Social Drinker',
      interests: ['Architecture', 'Photography', 'Sketching'],
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 0,
    },
    {
      id: 6,
      name: 'Amit Kumar',
      age: 30,
      location: 'Noida',
      fullLocation: 'Noida, India',
      matchScore: '75% Match',
      matchScoreColor: '#3B82F6',
      isOnline: false,
      lastSeen: 'Last seen 2 hours ago',
      timeAgo: '24 Photos',
      matchedDate: '30 Aug 2026',
      lastMessage: 'Yesterday',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
      isVerified: true,
      aboutMe: 'Investment banker, fitness fanatic and avid reader.',
      height: "5'11\" (180 cm)",
      profession: 'Investment Banker',
      education: 'IIM Ahmedabad',
      religion: 'Hindu',
      lookingFor: 'Marriage',
      maritalStatus: 'Never Married',
      languages: 'English, Hindi',
      smoking: 'Non Smoker',
      drinking: 'Non Drinker',
      interests: ['Finance', 'Fitness', 'Reading'],
      photos: [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 0,
    },
    {
      id: 7,
      name: 'Rahul Mehta',
      age: 32,
      location: 'Gurgaon',
      fullLocation: 'Gurgaon, India',
      matchScore: '72% Match',
      matchScoreColor: '#22C55E',
      isOnline: true,
      lastSeen: 'Online now',
      timeAgo: '11 days ago',
      matchedDate: '28 Aug 2026',
      lastMessage: '3 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      isVerified: true,
      aboutMe: 'Startup founder & technology enthusiast.',
      height: "6'0\" (183 cm)",
      profession: 'Founder & CEO',
      education: 'IIT Delhi',
      religion: 'Hindu',
      lookingFor: 'Long-term',
      maritalStatus: 'Never Married',
      languages: 'English, Hindi',
      smoking: 'Non Smoker',
      drinking: 'Social Drinker',
      interests: ['Startups', 'Tech', 'Tennis'],
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 0,
    },
    {
      id: 8,
      name: 'Pooja Verma',
      age: 27,
      location: 'Chennai',
      fullLocation: 'Chennai, India',
      matchScore: '70% Match',
      matchScoreColor: '#FF2D72',
      isOnline: false,
      lastSeen: 'Last seen 5 hours ago',
      timeAgo: '7 days ago',
      matchedDate: '25 Aug 2026',
      lastMessage: '4 days ago',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
      isVerified: true,
      aboutMe: 'Fashion designer who loves music festivals and exploring new cities.',
      height: "5'5\" (165 cm)",
      profession: 'Fashion Designer',
      education: 'NIFT Chennai',
      religion: 'Hindu',
      lookingFor: 'Relationship',
      maritalStatus: 'Never Married',
      languages: 'English, Tamil, Hindi',
      smoking: 'Non Smoker',
      drinking: 'Social Drinker',
      interests: ['Fashion', 'Music', 'Travel'],
      photos: [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      ],
      extraPhotoCount: 0,
    },
  ];

  const currentSelected = selectedMatch || matchesData[0];

  // Filter items based on active pill
  const filteredMatches = matchesData.filter((item) => {
    if (selectedTabFilter === 'All') return true;
    if (selectedTabFilter === 'New') return item.matchedDate.includes('12 Sep');
    if (selectedTabFilter === 'Active') return item.isOnline;
    return true;
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
                Matches Management
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Manage and monitor user matches, compatibility and activity
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Download className="w-4 h-4" />
              <span>Export Matches</span>
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

          {/* FILTER TABS & SEARCH CONTROLS */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
              {[
                { label: 'All Matches', count: '12,346', key: 'All' },
                { label: 'New', count: '1,245', key: 'New' },
                { label: 'Active', count: '8,432', key: 'Active' },
                { label: 'Favorites', count: '892', key: 'Favorites' },
                { label: 'Blocked', count: '86', key: 'Blocked' },
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

            {/* Filter Inputs & Dropdowns */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email or location..."
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">Gender</span>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                    <option>All</option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">Age Range</span>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                    <option>18 - 60</option>
                    <option>18 - 25</option>
                    <option>26 - 35</option>
                    <option>36+</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">Location</span>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                    <option>All Locations</option>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">Match Type</span>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                    <option>All Types</option>
                    <option>Mutual Match</option>
                    <option>Super Like</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <span className="text-xs font-medium text-gray-400 hidden sm:inline">Sort By</span>
                  <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                    <option>Latest Match</option>
                    <option>Highest Match %</option>
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

          {/* MAIN MATCHES GRID AND RIGHT USER DETAIL PREVIEW SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* MATCH CARDS GRID (2 Cols wide on XL) */}
            <div className="xl:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMatches.map((item) => {
                  const isSelected = currentSelected.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedMatch(item);
                        setActivePhotoIdx(0);
                      }}
                      className={`bg-white rounded-2xl overflow-hidden border shadow-sm transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected ? 'ring-2 ring-[#FF2D72] border-transparent shadow-md' : 'border-gray-100 hover:border-pink-200'
                      }`}
                    >
                      {/* Card Image Header */}
                      <div className="relative h-44 w-full bg-gray-100">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Heart Icon Floating Badge */}
                        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#FF2D72] shadow-xs">
                          <Heart className="w-3.5 h-3.5 fill-[#FF2D72]" />
                        </div>
                      </div>

                      {/* Card Content Details */}
                      <div className="p-3.5 space-y-2">
                        <div>
                          <h3 className="font-extrabold text-sm text-gray-900 leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-gray-400 font-medium">
                            📍 {item.age}, {item.location}
                          </p>
                        </div>

                        {/* Match Percentage Badge */}
                        <div
                          className="font-extrabold text-xs"
                          style={{ color: item.matchScoreColor }}
                        >
                          {item.matchScore}
                        </div>

                        {/* Online status and photo count */}
                        <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium pt-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                              }`}
                            ></span>
                            <span className={item.isOnline ? 'text-green-600 font-bold' : ''}>
                              {item.lastSeen}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            📷 {item.timeAgo}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMatch(item);
                            }}
                            className="py-1.5 rounded-xl font-bold text-[11px] text-white transition-all shadow-2xs text-center cursor-pointer"
                            style={{ backgroundColor: COLORS.pink }}
                          >
                            View Profile
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="py-1.5 rounded-xl font-bold text-[11px] text-[#FF2D72] bg-pink-50 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                          >
                            💬 Message
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination matching reference UI */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between text-xs text-gray-400">
                <span>Showing 1 to 8 of 12,346 matches</span>
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
                    <button className="w-8 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                      1,544
                    </button>
                    <button className="p-1 rounded-lg hover:bg-gray-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT MATCH USER DETAIL PREVIEW PANEL matching reference image */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                {/* Image Header with Online badge & close button */}
                <div className="relative rounded-2xl overflow-hidden h-52 mb-3">
                  <img
                    src={currentSelected.photos[activePhotoIdx] || currentSelected.avatar}
                    alt={currentSelected.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {currentSelected.isOnline && (
                    <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2.5 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Online now
                    </div>
                  )}
                </div>

                {/* Profile Header Title */}
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-1.5">
                    {currentSelected.name}
                    {currentSelected.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-sky-500 fill-sky-500" />
                    )}
                  </h2>
                  <p className="text-xs text-gray-400 font-medium">
                    {currentSelected.age} Years • {currentSelected.fullLocation}
                  </p>
                </div>

                {/* Quick Action Pill Buttons */}
                <div className="grid grid-cols-4 gap-2 my-3">
                  <button
                    className="py-2 rounded-xl text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 shadow-2xs cursor-pointer"
                    style={{ backgroundColor: COLORS.pink }}
                  >
                    <span>💬</span>
                    <span>Message</span>
                  </button>
                  <button className="py-2 rounded-xl bg-pink-50 text-[#FF2D72] font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                    <span>❤️</span>
                    <span>Like</span>
                  </button>
                  <button className="py-2 rounded-xl bg-purple-50 text-purple-600 font-bold text-[10px] flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                    <span>⭐</span>
                    <span>Add to Favorites</span>
                  </button>
                  <button className="py-2 rounded-xl bg-gray-50 text-gray-600 font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                    <span>More</span>
                  </button>
                </div>

                {/* About Me Section */}
                <div className="space-y-3 text-xs border-t border-gray-100 pt-3">
                  <h4 className="font-bold text-gray-900 text-xs">About Me</h4>
                  <p className="text-gray-600 leading-relaxed text-[11px]">
                    {currentSelected.aboutMe}
                  </p>

                  {/* 2-Column Info Grid matching exact layout in image */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-gray-600 pt-1">
                    <div><span className="text-gray-400 font-medium">📏 Height:</span> <span className="font-semibold text-gray-800">{currentSelected.height}</span></div>
                    <div><span className="text-gray-400 font-medium">📍 Location:</span> <span className="font-semibold text-gray-800">{currentSelected.location}, India</span></div>
                    <div><span className="text-gray-400 font-medium">💼 Profession:</span> <span className="font-semibold text-gray-800">{currentSelected.profession}</span></div>
                    <div><span className="text-gray-400 font-medium">💍 Marital Status:</span> <span className="font-semibold text-gray-800">{currentSelected.maritalStatus}</span></div>
                    <div><span className="text-gray-400 font-medium">🎓 Education:</span> <span className="font-semibold text-gray-800">{currentSelected.education}</span></div>
                    <div><span className="text-gray-400 font-medium">🗣️ Languages:</span> <span className="font-semibold text-gray-800">{currentSelected.languages}</span></div>
                    <div><span className="text-gray-400 font-medium">🕉️ Religion:</span> <span className="font-semibold text-gray-800">{currentSelected.religion}</span></div>
                    <div><span className="text-gray-400 font-medium">🚭 Smoking:</span> <span className="font-semibold text-gray-800">{currentSelected.smoking}</span></div>
                    <div><span className="text-gray-400 font-medium">🔎 Looking For:</span> <span className="font-semibold text-gray-800">{currentSelected.lookingFor}</span></div>
                    <div><span className="text-gray-400 font-medium">🍷 Drinking:</span> <span className="font-semibold text-gray-800">{currentSelected.drinking}</span></div>
                  </div>
                </div>

                {/* Interests */}
                <div className="pt-3 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 text-xs mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSelected.interests.map((interest, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Photos Grid */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-xs">Photos ({currentSelected.photos.length + currentSelected.extraPhotoCount})</h4>
                    <button className="text-[11px] font-bold" style={{ color: COLORS.pink }}>
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {currentSelected.photos.map((pUrl, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => setActivePhotoIdx(pIdx)}
                        className={`relative rounded-lg overflow-hidden h-14 cursor-pointer border-2 ${
                          activePhotoIdx === pIdx ? 'border-[#FF2D72]' : 'border-transparent'
                        }`}
                      >
                        <img src={pUrl} alt="Photo" className="w-full h-full object-cover" />
                        {pIdx === currentSelected.photos.length - 1 && currentSelected.extraPhotoCount > 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-extrabold text-xs">
                            +{currentSelected.extraPhotoCount}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
                  <h4 className="font-bold text-gray-900 text-xs mb-1">Recent Activity</h4>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Online now</span>
                    </div>
                    <span className="text-gray-400">Just now</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      <span>Last message</span>
                    </div>
                    <span className="text-gray-400">{currentSelected.lastMessage}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <Heart className="w-3.5 h-3.5 text-[#FF2D72] fill-[#FF2D72]" />
                      <span>Matched on</span>
                    </div>
                    <span className="text-gray-400">{currentSelected.matchedDate}</span>
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
