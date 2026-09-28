import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  Send,
  Flag,
  ShieldCheck,
  Search,
  Filter,
  MoreVertical,
  Video,
  Phone,
  Paperclip,
  Image as ImageIcon,
  Smile,
  ShieldAlert,
  UserX,
  Bell,
  VolumeX,
  User,
  X,
  CheckCheck,
  Check,
  MoreHorizontal
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

export default function ChatManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Chat Management');
  const [conversationFilter, setConversationFilter] = useState('All');
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Top 5 KPI Cards matching reference UI image
  const kpiCards = [
    {
      title: 'Total Chats',
      value: '56,789',
      change: '+28% this month',
      changeColor: '#22C55E',
      bgColor: '#FF2D72',
      icon: MessageSquare,
    },
    {
      title: 'Active Conversations',
      value: '8,432',
      change: '+22% this month',
      changeColor: '#22C55E',
      bgColor: '#22C55E',
      icon: Users,
    },
    {
      title: 'Messages Today',
      value: '12,450',
      change: '+18% this month',
      changeColor: '#22C55E',
      bgColor: '#7C3AED',
      icon: Send,
    },
    {
      title: 'Reported Messages',
      value: '186',
      change: '-12% this month',
      changeColor: '#22C55E',
      bgColor: '#F59E0B',
      icon: Flag,
    },
    {
      title: 'Auto Filtered',
      value: '324',
      change: '+32% this month',
      changeColor: '#22C55E',
      bgColor: '#3B82F6',
      icon: ShieldCheck,
    },
  ];

  // Conversations List Mock Data matching reference image
  const conversationsData = [
    {
      id: 1,
      name: 'Aaradhya Sharma',
      age: 25,
      location: 'Delhi, India',
      isOnline: true,
      lastSeen: 'Online now',
      time: '10:24 AM',
      unreadCount: 2,
      lastMessage: 'Hey! How are you doing? 😊',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '15 Sep 2026, 10:20 AM',
      totalMessages: 24,
      photosShared: 8,
      status: 'Active',
      userType: 'Premium User',
      reportCount: 0,
      sharedMedia: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
      ],
      extraMediaCount: 5,
      messages: [
        { id: 101, text: 'Hi there! 👋', time: '10:20 AM', isSender: false },
        { id: 102, text: 'I came across your profile and really liked it.', time: '10:21 AM', isSender: false },
        { id: 103, text: 'Hey! How are you doing? 😊', time: '10:22 AM', isSender: true },
        { id: 104, text: "I'm good, thanks! What about you?", time: '10:22 AM', isSender: false },
        { id: 105, text: "I'm doing great! Do you like travelling?", time: '10:23 AM', isSender: true },
        { id: 106, text: 'Yes! I love travelling and exploring new places.', time: '10:24 AM', isSender: false },
        {
          id: 107,
          text: '',
          time: '10:24 AM',
          isSender: false,
          images: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
          ]
        },
        { id: 108, text: 'Here are some of my recent photos from my trip! 😍', time: '10:24 AM', isSender: false },
        { id: 109, text: 'Wow! These photos are amazing! 😊', time: '10:25 AM', isSender: true },
      ]
    },
    {
      id: 2,
      name: 'Priya Singh',
      age: 23,
      location: 'Bangalore, India',
      isOnline: true,
      lastSeen: 'Online now',
      time: '09:18 AM',
      unreadCount: 1,
      lastMessage: 'That sounds great! 👍',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '15 Sep 2026, 09:00 AM',
      totalMessages: 18,
      photosShared: 4,
      status: 'Active',
      userType: 'VIP Gold User',
      reportCount: 0,
      sharedMedia: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      ],
      extraMediaCount: 3,
      messages: [
        { id: 201, text: 'Hello! Nice to meet you.', time: '09:00 AM', isSender: false },
        { id: 202, text: 'That sounds great! 👍', time: '09:18 AM', isSender: false },
      ]
    },
    {
      id: 3,
      name: 'Neha Patel',
      age: 25,
      location: 'Chennai, India',
      isOnline: false,
      lastSeen: 'Yesterday',
      time: 'Yesterday',
      unreadCount: 0,
      lastMessage: 'Nice to meet you!',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '14 Sep 2026, 04:12 PM',
      totalMessages: 12,
      photosShared: 2,
      status: 'Active',
      userType: 'Free User',
      reportCount: 0,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 301, text: 'Nice to meet you!', time: 'Yesterday', isSender: false },
      ]
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      age: 26,
      location: 'Hyderabad, India',
      isOnline: false,
      lastSeen: 'Yesterday',
      time: 'Yesterday',
      unreadCount: 0,
      lastMessage: 'Are you free this weekend?',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      isReported: true,
      firstMessageDate: '14 Sep 2026, 02:00 PM',
      totalMessages: 8,
      photosShared: 1,
      status: 'Reported',
      userType: 'Free User',
      reportCount: 1,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 401, text: 'Are you free this weekend?', time: 'Yesterday', isSender: false },
      ]
    },
    {
      id: 5,
      name: 'Karan Verma',
      age: 29,
      location: 'Pune, India',
      isOnline: true,
      lastSeen: 'Online now',
      time: '14 Sep',
      unreadCount: 0,
      lastMessage: "Sure, let's connect!",
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '14 Sep 2026',
      totalMessages: 15,
      photosShared: 3,
      status: 'Active',
      userType: 'Free User',
      reportCount: 0,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 501, text: "Sure, let's connect!", time: '14 Sep', isSender: false },
      ]
    },
    {
      id: 6,
      name: 'Amit Kumar',
      age: 30,
      location: 'Noida, India',
      isOnline: false,
      lastSeen: '13 Sep',
      time: '13 Sep',
      unreadCount: 0,
      lastMessage: 'Shared a photo',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '13 Sep 2026',
      totalMessages: 6,
      photosShared: 2,
      status: 'Active',
      userType: 'Premium User',
      reportCount: 0,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 601, text: 'Shared a photo', time: '13 Sep', isSender: false },
      ]
    },
    {
      id: 7,
      name: 'Rahul Mehta',
      age: 32,
      location: 'Gurgaon, India',
      isOnline: true,
      lastSeen: 'Online now',
      time: '12 Sep',
      unreadCount: 0,
      lastMessage: 'You: Thanks! 😊',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '12 Sep 2026',
      totalMessages: 30,
      photosShared: 5,
      status: 'Active',
      userType: 'VIP Gold User',
      reportCount: 0,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 701, text: 'Thanks! 😊', time: '12 Sep', isSender: true },
      ]
    },
    {
      id: 8,
      name: 'Pooja Verma',
      age: 27,
      location: 'Chennai, India',
      isOnline: false,
      lastSeen: '12 Sep',
      time: '12 Sep',
      unreadCount: 0,
      lastMessage: 'Let\'s plan for a coffee ☕',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '12 Sep 2026',
      totalMessages: 14,
      photosShared: 2,
      status: 'Active',
      userType: 'Free User',
      reportCount: 0,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 801, text: 'Let\'s plan for a coffee ☕', time: '12 Sep', isSender: false },
      ]
    },
    {
      id: 9,
      name: 'Vikram Singh',
      age: 28,
      location: 'Delhi, India',
      isOnline: false,
      lastSeen: '11 Sep',
      time: '11 Sep',
      unreadCount: 0,
      lastMessage: 'Sure, see you there!',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      isReported: true,
      firstMessageDate: '11 Sep 2026',
      totalMessages: 10,
      photosShared: 1,
      status: 'Reported',
      userType: 'Free User',
      reportCount: 2,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 901, text: 'Sure, see you there!', time: '11 Sep', isSender: false },
      ]
    },
    {
      id: 10,
      name: 'Tanya Gupta',
      age: 24,
      location: 'Lucknow, India',
      isOnline: false,
      lastSeen: '10 Sep',
      time: '10 Sep',
      unreadCount: 0,
      lastMessage: 'You: Great! 👍',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      isReported: false,
      firstMessageDate: '10 Sep 2026',
      totalMessages: 8,
      photosShared: 1,
      status: 'Active',
      userType: 'Free User',
      reportCount: 0,
      sharedMedia: [],
      extraMediaCount: 0,
      messages: [
        { id: 1001, text: 'Great! 👍', time: '10 Sep', isSender: true },
      ]
    },
  ];

  const currentSelected = selectedConversation || conversationsData[0];

  const filteredConversations = conversationsData.filter((conv) => {
    if (conversationFilter === 'All') return true;
    if (conversationFilter === 'Unread') return conv.unreadCount > 0;
    if (conversationFilter === 'Reported') return conv.isReported;
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 flex flex-col">
          {/* PAGE TITLE & HEADER */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
              Chat Management
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Monitor and manage user conversations, report messages and ensure a safe community
            </p>
          </div>

          {/* TOP 5 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {kpiCards.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
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

          {/* 3-COLUMN CHAT INTERFACE SPLIT */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[580px] overflow-hidden">
            {/* COLUMN 1: CONVERSATIONS LIST (3 Cols) */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
              {/* Conversations Header */}
              <div className="p-3.5 border-b border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-gray-900">
                    Conversations <span className="text-gray-400 text-xs font-normal">(8,432)</span>
                  </h3>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-7 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                  />
                  <Filter className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-600" />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 pt-1">
                  {[
                    { label: 'All (8,432)', key: 'All' },
                    { label: 'Unread (24)', key: 'Unread' },
                    { label: 'Reported (14)', key: 'Reported' },
                  ].map((pill) => (
                    <button
                      key={pill.key}
                      onClick={() => setConversationFilter(pill.key)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all flex-1 text-center cursor-pointer ${
                        conversationFilter === pill.key
                          ? 'text-white shadow-2xs'
                          : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: conversationFilter === pill.key ? COLORS.pink : '',
                      }}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversations Scroll List */}
              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {filteredConversations.map((conv) => {
                  const isSelected = currentSelected.id === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors relative ${
                        isSelected ? 'bg-pink-50/60' : 'hover:bg-gray-50/60'
                      }`}
                    >
                      {isSelected && (
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-md"
                          style={{ backgroundColor: COLORS.pink }}
                        ></div>
                      )}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="relative shrink-0">
                          <img
                            src={conv.avatar}
                            alt={conv.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                          {conv.isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-extrabold text-xs text-gray-900 truncate">
                              {conv.name}
                            </h4>
                            <span className="text-[10px] text-gray-400 font-medium shrink-0">
                              {conv.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-1 mt-0.5">
                            <p className="text-[11px] text-gray-500 truncate font-medium">
                              {conv.lastMessage}
                            </p>
                            {conv.unreadCount > 0 && (
                              <span
                                className="w-4 h-4 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center shrink-0"
                                style={{ backgroundColor: COLORS.pink }}
                              >
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLUMN 2: ACTIVE CHAT MESSAGES WINDOW (6 Cols) */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
              {/* Chat Header */}
              <div className="p-3.5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={currentSelected.avatar}
                      alt={currentSelected.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    {currentSelected.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900 leading-tight">
                      {currentSelected.name}
                    </h3>
                    <p className="text-[11px] text-green-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      {currentSelected.lastSeen}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
                    <Video className="w-4 h-4 text-blue-500" />
                  </button>
                  <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
                    <Phone className="w-4 h-4 text-pink-500" />
                  </button>
                  <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-white font-bold text-xs shadow-2xs cursor-pointer ml-1"
                    style={{ backgroundColor: COLORS.pink }}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/40">
                {/* Date Divider */}
                <div className="flex items-center justify-center my-2">
                  <span className="text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-2xs">
                    15 Sep 2026
                  </span>
                </div>

                {/* Messages Feed */}
                {currentSelected.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isSender ? 'items-end' : 'items-start'}`}
                  >
                    {/* Text Message */}
                    {msg.text && (
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-2xs ${
                          msg.isSender
                            ? 'text-white rounded-br-xs'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs'
                        }`}
                        style={{
                          backgroundColor: msg.isSender ? COLORS.pink : '',
                        }}
                      >
                        {msg.text}
                      </div>
                    )}

                    {/* Image Grid Message */}
                    {msg.images && msg.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-1.5 my-1 max-w-[75%]">
                        {msg.images.map((img, iIdx) => (
                          <img
                            key={iIdx}
                            src={img}
                            alt="Sent media"
                            className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                          />
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] text-gray-400 font-medium mt-1 px-1 flex items-center gap-1">
                      {msg.time}
                      {msg.isSender && <CheckCheck className="w-3 h-3 text-pink-500" />}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Input Field Bar */}
              <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50">
                  <Smile className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0 shadow-2xs transition-all hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: COLORS.pink }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* COLUMN 3: RIGHT USER PROFILE & CHAT INFO PANEL (3 Cols) */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between p-4 overflow-y-auto space-y-4">
              <div>
                {/* User Header Profile Card */}
                <div className="relative rounded-2xl overflow-hidden h-44 mb-3 border border-gray-100">
                  <img
                    src={currentSelected.avatar}
                    alt={currentSelected.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center pb-3 border-b border-gray-100">
                  <div className="relative -mt-10 mb-1">
                    <img
                      src={currentSelected.avatar}
                      alt={currentSelected.name}
                      className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  </div>
                  <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1">
                    {currentSelected.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
                  </h3>
                  <p className="text-[11px] text-green-600 font-bold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    {currentSelected.lastSeen}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {currentSelected.age} Years • {currentSelected.location}
                  </p>

                  <div className="flex items-center gap-2 mt-3 w-full">
                    <button
                      className="flex-1 py-1.5 rounded-xl font-bold text-[11px] text-white shadow-2xs cursor-pointer"
                      style={{ backgroundColor: COLORS.pink }}
                    >
                      View Full Profile
                    </button>
                    <button className="flex-1 py-1.5 rounded-xl font-bold text-[11px] text-pink-600 bg-pink-50 cursor-pointer">
                      🚫 Block User
                    </button>
                  </div>
                </div>

                {/* Chat Information Breakdown */}
                <div className="space-y-2 text-xs py-3 border-b border-gray-100">
                  <h4 className="font-extrabold text-gray-900 text-xs mb-2">Chat Information</h4>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">First Message</span>
                    <span className="font-semibold text-gray-800">{currentSelected.firstMessageDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Total Messages</span>
                    <span className="font-semibold text-gray-800">{currentSelected.totalMessages}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Photos Shared</span>
                    <span className="font-semibold text-gray-800">{currentSelected.photosShared}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Status</span>
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-green-100 text-green-700">
                      {currentSelected.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">User Type</span>
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-pink-50 text-[#FF2D72]">
                      👑 {currentSelected.userType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Report Count</span>
                    <span className="font-semibold text-gray-800">{currentSelected.reportCount}</span>
                  </div>
                </div>

                {/* Quick Actions Buttons */}
                <div className="py-3 border-b border-gray-100 space-y-2">
                  <h4 className="font-extrabold text-gray-900 text-xs">Quick Actions</h4>
                  <div className="grid grid-cols-4 gap-1.5">
                    <button className="p-2 rounded-xl bg-purple-500 text-white font-bold text-[9px] flex flex-col items-center justify-center gap-1 cursor-pointer">
                      <User className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>
                    <button className="p-2 rounded-xl bg-blue-500 text-white font-bold text-[9px] flex flex-col items-center justify-center gap-1 cursor-pointer">
                      <Bell className="w-3.5 h-3.5" />
                      <span>Send Warning</span>
                    </button>
                    <button className="p-2 rounded-xl bg-orange-500 text-white font-bold text-[9px] flex flex-col items-center justify-center gap-1 cursor-pointer">
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Mute Chat</span>
                    </button>
                    <button className="p-2 rounded-xl bg-rose-500 text-white font-bold text-[9px] flex flex-col items-center justify-center gap-1 cursor-pointer">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Report User</span>
                    </button>
                  </div>
                </div>

                {/* Shared Media Grid */}
                <div className="pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-extrabold text-gray-900 text-xs">
                      Shared Media ({currentSelected.photosShared})
                    </h4>
                    <button className="text-[11px] font-bold" style={{ color: COLORS.pink }}>
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {currentSelected.sharedMedia.map((mImg, mIdx) => (
                      <div key={mIdx} className="relative rounded-xl overflow-hidden h-14 border border-gray-100">
                        <img src={mImg} alt="Media" className="w-full h-full object-cover" />
                        {mIdx === currentSelected.sharedMedia.length - 1 && currentSelected.extraMediaCount > 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-extrabold text-xs">
                            +{currentSelected.extraMediaCount}
                          </div>
                        )}
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
