import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  MessageCircle,
  ShieldAlert,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy,
  Check,
  X,
  Trash2,
  Users,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";

const COLORS = {
  pink: "#FF2D72",
  lightPink: "#FFE7F0",
  purple: "#7C3AED",
  dark: "#17151A",
  white: "#FFFFFF",
  background: "#FAFAFC",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  blue: "#3B82F6",
};

export default function ChatManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat Management");
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  const kpiCards = [
    {
      title: "Total Users",
      value: "50,000",
      bgColor: "#FF2D72",
      icon: Users,
    },
    {
      title: "Total Conversations",
      value: "56,789",
      bgColor: "#FF2D72",
      icon: MessageSquare,
    },
    {
      title: "Active Chats",
      value: "8,432",
      bgColor: "#22C55E",
      icon: MessageCircle,
    },
    {
      title: "Reported Chats",
      value: "186",
      bgColor: "#EF4444",
      icon: ShieldAlert,
    },
  ];

  // Mock Conversations Data with full message history between both users
  const initialConversationsData = [
    {
      id: 1,
      conversationId: "CNV-849201",
      userA: {
        name: "Rohan Mehta",
        age: 28,
        location: "Mumbai, India",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Aaradhya Sharma",
        age: 25,
        location: "Delhi, India",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      },

      lastActivityDate: "15 Sep 2026",
      lastActivityTime: "10:24 AM",
      createdDate: "01 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hi Aaradhya! I came across your profile and really liked your Himachal travel photos 😊",
          time: "10:18 AM",
        },
        {
          senderId: "userB",
          text: "Hey Rohan! Thanks so much! Yes, Himachal was an incredible experience.",
          time: "10:20 AM",
        },
        {
          senderId: "userA",
          text: "Are you into trekking and mountain trails too?",
          time: "10:22 AM",
        },
        {
          senderId: "userB",
          text: "Yes, absolutely! I try to go whenever I get a long weekend off 🏔️",
          time: "10:23 AM",
        },
        {
          senderId: "userA",
          text: "Same here. Maybe we could catch up over coffee this weekend and share stories?",
          time: "10:24 AM",
        },
        {
          senderId: "userB",
          text: "That sounds wonderful! Let's plan it ☕",
          time: "10:24 AM",
        },
      ],
    },
    {
      id: 2,
      conversationId: "CNV-849200",
      userA: {
        name: "Karan Verma",
        age: 29,
        location: "Bangalore, India",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Priya Singh",
        age: 26,
        location: "Delhi, India",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      },

      lastActivityDate: "15 Sep 2026",
      lastActivityTime: "09:18 AM",
      createdDate: "10 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hey Priya, hope you're having a good week.",
          time: "09:10 AM",
        },
        {
          senderId: "userB",
          text: "Hi Karan, yes pretty busy with work though.",
          time: "09:12 AM",
        },
        {
          senderId: "userA",
          text: "Why are you taking so long to reply? Are you ignoring me?",
          time: "09:15 AM",
        },
        {
          senderId: "userB",
          text: "Please stop messaging repeatedly. I was in a meeting and I have told you I am not interested.",
          time: "09:16 AM",
        },
        {
          senderId: "userA",
          text: "You cannot just ignore me like that, check this out.",
          time: "09:17 AM",
        },
        {
          senderId: "userB",
          text: "I am reporting this conversation now.",
          time: "09:18 AM",
        },
      ],
    },
    {
      id: 3,
      conversationId: "CNV-849199",
      userA: {
        name: "Rahul Mehta",
        age: 32,
        location: "Gurgaon, India",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Neha Patel",
        age: 28,
        location: "Delhi, India",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
      },

      lastActivityDate: "14 Sep 2026",
      lastActivityTime: "08:55 PM",
      createdDate: "28 Aug 2026",
      messages: [
        {
          senderId: "userA",
          text: "Good evening Neha! How did your design workshop go today?",
          time: "08:45 PM",
        },
        {
          senderId: "userB",
          text: "Hey Rahul! It went so well! Lots of energetic participants 😊",
          time: "08:48 PM",
        },
        {
          senderId: "userA",
          text: "I'm so glad to hear that! You must be tired though.",
          time: "08:50 PM",
        },
        {
          senderId: "userB",
          text: "A bit, but very fulfilled. Heading home now!",
          time: "08:52 PM",
        },
        {
          senderId: "userA",
          text: "Have a safe commute! Let's talk tomorrow.",
          time: "08:55 PM",
        },
      ],
    },
    {
      id: 4,
      conversationId: "CNV-849198",
      userA: {
        name: "Amit Kumar",
        age: 30,
        location: "Pune, India",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Sneha Reddy",
        age: 27,
        location: "Hyderabad, India",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      },

      lastActivityDate: "14 Sep 2026",
      lastActivityTime: "07:42 PM",
      createdDate: "13 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hey Sneha, nice to connect with you on LoveConnect!",
          time: "07:35 PM",
        },
        {
          senderId: "userB",
          text: "Hi Amit, nice to meet you too.",
          time: "07:38 PM",
        },
        {
          senderId: "userA",
          text: "Hey join my exclusive crypto club click here: bit.ly/free-crypto-giveaway",
          time: "07:40 PM",
        },
        {
          senderId: "userB",
          text: "Is this a scam? Please do not send unauthorized promotional links.",
          time: "07:41 PM",
        },
        {
          senderId: "userB",
          text: "I am reporting this account to admins.",
          time: "07:42 PM",
        },
      ],
    },
    {
      id: 5,
      conversationId: "CNV-849197",
      userA: {
        name: "Vikram Singh",
        age: 31,
        location: "Pune, India",
        avatar:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Pooja Verma",
        age: 26,
        location: "Noida, India",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
      },
      lastActivityDate: "14 Sep 2026",
      lastActivityTime: "06:21 PM",
      createdDate: "05 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hey Pooja! Noticed you listen to a lot of indie rock music 🎸",
          time: "06:10 PM",
        },
        {
          senderId: "userB",
          text: "Hey Vikram! Yes, it's my go-to genre every day!",
          time: "06:14 PM",
        },
        {
          senderId: "userA",
          text: "Have you listened to the new acoustic release by The Local Train?",
          time: "06:18 PM",
        },
        {
          senderId: "userB",
          text: "Yes! The melodies are absolutely beautiful ✨",
          time: "06:21 PM",
        },
      ],
    },
    {
      id: 6,
      conversationId: "CNV-849196",
      userA: {
        name: "Alisha Verma",
        age: 25,
        location: "Delhi, India",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Riya Malhotra",
        age: 24,
        location: "Mumbai, India",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
      },
      lastActivityDate: "14 Sep 2026",
      lastActivityTime: "03:12 PM",
      createdDate: "02 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hi Riya! Your cafe recommendations in Bandra were on point!",
          time: "03:02 PM",
        },
        {
          senderId: "userB",
          text: "Haha I'm so glad you checked them out! Did you try the almond croissants?",
          time: "03:05 PM",
        },
        {
          senderId: "userA",
          text: "Yes, they were fresh and crisp! Best I've had in a while.",
          time: "03:08 PM",
        },
        {
          senderId: "userB",
          text: "Told you! Next time we should check out their cold brews together ☕",
          time: "03:12 PM",
        },
      ],
    },
    {
      id: 7,
      conversationId: "CNV-849195",
      userA: {
        name: "Karan Sharma",
        age: 30,
        location: "Bangalore, India",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Simran Kaur",
        age: 28,
        location: "Bangalore, India",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      },
      lastActivityDate: "13 Sep 2026",
      lastActivityTime: "11:24 AM",
      createdDate: "09 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hey Simran, do you frequent Cubbon Park for weekend runs?",
          time: "11:15 AM",
        },
        {
          senderId: "userB",
          text: "Yes, almost every Sunday morning around 7 AM!",
          time: "11:18 AM",
        },
        {
          senderId: "userA",
          text: "Awesome, I run there too! Maybe we can do a lap together sometime.",
          time: "11:20 AM",
        },
        {
          senderId: "userB",
          text: "Sure, that sounds fun! See you this Sunday.",
          time: "11:24 AM",
        },
      ],
    },
    {
      id: 8,
      conversationId: "CNV-849194",
      userA: {
        name: "Tanya Gupta",
        age: 24,
        location: "Lucknow, India",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Vikram Singh",
        age: 27,
        location: "Lucknow, India",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      },

      lastActivityDate: "13 Sep 2026",
      lastActivityTime: "10:10 AM",
      createdDate: "12 Sep 2026",
      messages: [
        {
          senderId: "userB",
          text: "Why did you not reply to my previous message? Respond now.",
          time: "10:05 AM",
        },
        {
          senderId: "userA",
          text: "Please do not be rude. I do not wish to continue chatting.",
          time: "10:08 AM",
        },
        {
          senderId: "userB",
          text: "You think you are too special to answer?",
          time: "10:09 AM",
        },
        {
          senderId: "userA",
          text: "I am blocking and reporting this chat.",
          time: "10:10 AM",
        },
      ],
    },
    {
      id: 9,
      conversationId: "CNV-849193",
      userA: {
        name: "Dev Malhotra",
        age: 33,
        location: "Noida, India",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Nisha Kapoor",
        age: 29,
        location: "Delhi, India",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      },

      lastActivityDate: "12 Sep 2026",
      lastActivityTime: "08:20 PM",
      createdDate: "04 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hi Nisha, great discussion about UI/UX design trends today!",
          time: "08:10 PM",
        },
        {
          senderId: "userB",
          text: "Thanks Dev! Minimalist interfaces really are the future.",
          time: "08:15 PM",
        },
        {
          senderId: "userA",
          text: "Totally agree. Looking forward to our next design meetup!",
          time: "08:20 PM",
        },
      ],
    },
    {
      id: 10,
      conversationId: "CNV-849192",
      userA: {
        name: "Rahul Das",
        age: 27,
        location: "Kolkata, India",
        avatar:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      },
      userB: {
        name: "Sneha Reddy",
        age: 26,
        location: "Kolkata, India",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      },

      lastActivityDate: "12 Sep 2026",
      lastActivityTime: "05:40 PM",
      createdDate: "06 Sep 2026",
      messages: [
        {
          senderId: "userA",
          text: "Hey Sneha! Have you explored the book cafes in College Street?",
          time: "05:30 PM",
        },
        {
          senderId: "userB",
          text: "Oh yes, Indian Coffee House is my all-time favorite!",
          time: "05:35 PM",
        },
        {
          senderId: "userA",
          text: "Classic choice! The nostalgia there is unmatched.",
          time: "05:40 PM",
        },
      ],
    },
  ];

  const [conversationsData, setConversationsData] = useState(
    initialConversationsData,
  );
  const [selectedChatIds, setSelectedChatIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const currentSelected =
    selectedChat && conversationsData.some((c) => c.id === selectedChat.id)
      ? selectedChat
      : null;

  const filteredConversations = conversationsData.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      !searchTerm ||
      item.userA.name.toLowerCase().includes(term) ||
      item.userB.name.toLowerCase().includes(term) ||
      item.conversationId.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredConversations.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredConversations.length);
  const paginatedConversations = filteredConversations.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const isAllSelected =
    paginatedConversations.length > 0 &&
    paginatedConversations.every((item) => selectedChatIds.includes(item.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedChatIds([]);
    } else {
      setSelectedChatIds(paginatedConversations.map((item) => item.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedChatIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedChatIds.length === 0) return;
    setConversationsData((prev) =>
      prev.filter((item) => !selectedChatIds.includes(item.id)),
    );
    setSelectedChatIds([]);
  };

  const handleDeleteConversation = (id) => {
    setConversationsData((prev) => prev.filter((item) => item.id !== id));
    setSelectedChatIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div
      style={{ backgroundColor: COLORS.background, color: COLORS.dark }}
      className="h-screen font-sans flex flex-col overflow-hidden"
    >
      {/* TOP NAVBAR HEADER */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR NAVIGATION */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: COLORS.dark }}
              >
                Chat Management
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Monitor user conversations, track active chat sessions, and
                manage privacy-compliant reported chats
              </p>
            </div>
          </div>

          {/* TOP 3 KPI CARDS (Total Conversations, Active Chats, Reported Chats) */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                    <span className="text-[13px] font-semibold text-gray-500 block truncate">
                      {kpi.title}
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TABLE AND RIGHT PREVIEW PANEL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* CONVERSATIONS TABLE */}
            <div
              className={`${currentSelected ? "xl:col-span-2" : "xl:col-span-3"} bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4`}
            >
              {/* Table Header & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-gray-700">
                    All Conversations
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {filteredConversations.length}
                  </span>
                  {selectedChatIds.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedChatIds.length})</span>
                    </button>
                  )}
                  {selectedChatIds.length > 0 && (
                    <span className="text-xs font-semibold text-gray-500 ml-1">
                      ({selectedChatIds.length} selected)
                    </span>
                  )}
                </div>
                <div className="w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search User or Chat ID..."
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Table with columns: User, Conversation, Last Activity, Action */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[550px]">
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
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Conversation</th>
                      <th className="pb-3 font-semibold">Last Activity</th>
                      <th className="pb-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredConversations.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-8 text-center text-gray-400"
                        >
                          No conversations found
                        </td>
                      </tr>
                    ) : (
                      paginatedConversations.map((item) => {
                        const isSelected =
                          currentSelected && currentSelected.id === item.id;
                        const isChecked = selectedChatIds.includes(item.id);
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedChat(item)}
                            className={`cursor-pointer transition-colors ${
                              isChecked
                                ? "bg-pink-50/40"
                                : isSelected
                                  ? "bg-pink-50/20"
                                  : "hover:bg-gray-50/50"
                            }`}
                          >
                            {/* Checkbox */}
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

                            {/* 1. User */}
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={item.userA.avatar}
                                  alt={item.userA.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {item.userA.name}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 2. Conversation */}
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.userB.avatar}
                                  alt={item.userB.name}
                                  className="w-7 h-7 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <div className="font-medium text-gray-800 text-[11px]">
                                    with {item.userB.name}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 3. Last Activity */}
                            <td className="py-3">
                              <div className="font-semibold text-gray-800">
                                {item.lastActivityDate}
                              </div>
                            </td>

                            {/* 4. Action */}
                            <td className="py-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedChat(item);
                                  }}
                                  title="Open Chat in Drawer"
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#FF2D72] hover:bg-pink-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteConversation(item.id);
                                  }}
                                  title="Delete Conversation"
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>
                  Showing {filteredConversations.length > 0 ? startIndex + 1 : 0} to{" "}
                  {endIndex} of {filteredConversations.length}{" "}
                  conversations
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-gray-50 border border-gray-200 text-xs text-gray-700 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={validCurrentPage <= 1}
                      className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition-colors ${
                          validCurrentPage === pageNum
                            ? "text-white shadow-xs"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        style={validCurrentPage === pageNum ? { backgroundColor: COLORS.pink } : {}}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={validCurrentPage >= totalPages}
                      className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONVERSATION DETAILS & CHAT DRAWER */}
            {currentSelected && (
              <div className="xl:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4 xl:sticky xl:top-6 h-fit transition-all">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block bg-emerald-500 animate-pulse" />
                    <h3 className="font-extrabold text-sm text-gray-900">
                      Conversation Details
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedChat(null)}
                    title="Close drawer"
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Connected Chat Participants Visual Card */}
                <div className="p-3.5 bg-gradient-to-r from-pink-50/80 via-rose-50/40 to-purple-50/60 rounded-2xl border border-pink-100/80">
                  <div className="flex items-center justify-between">
                    {/* User A */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={currentSelected.userA.avatar}
                        alt={currentSelected.userA.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                      />
                      <span className="font-bold text-xs text-gray-900 mt-1">
                        {currentSelected.userA.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {currentSelected.userA.age} yrs
                      </span>
                    </div>

                    {/* Connected Chat Messages Indicator */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center border border-pink-100">
                        <MessageCircle className="w-4 h-4 text-[#FF2D72]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#FF2D72] mt-1">
                        {currentSelected.totalMessages} Chats
                      </span>
                    </div>

                    {/* User B */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={currentSelected.userB.avatar}
                        alt={currentSelected.userB.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                      />
                      <span className="font-bold text-xs text-gray-900 mt-1">
                        {currentSelected.userB.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {currentSelected.userB.age} yrs
                      </span>
                    </div>
                  </div>
                </div>

                {/* CHAT MESSAGES STREAM BETWEEN USER A & USER B */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs pb-0.5">
                    <span className="font-extrabold text-gray-800 flex items-center gap-1.5 text-xs">
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF2D72]" />
                      <span>Chat Messages</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {currentSelected.lastActivityDate}
                    </span>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto space-y-2.5 p-3 bg-gray-50/70 rounded-2xl border border-gray-100 text-xs">
                    {currentSelected.messages &&
                    currentSelected.messages.length > 0 ? (
                      currentSelected.messages.map((msg, mIdx) => {
                        const isUserA = msg.senderId === "userA";
                        return (
                          <div
                            key={mIdx}
                            className={`flex flex-col ${isUserA ? "items-end" : "items-start"}`}
                          >
                            <span className="text-[9px] font-semibold text-gray-400 mb-0.5 px-1">
                              {isUserA
                                ? currentSelected.userA.name
                                : currentSelected.userB.name}
                            </span>
                            <div
                              className={`max-w-[85%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed shadow-2xs ${
                                isUserA
                                  ? "text-white rounded-br-xs"
                                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-xs"
                              }`}
                              style={{
                                backgroundColor: isUserA ? COLORS.pink : "",
                              }}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[9px] text-gray-400 font-medium mt-0.5 px-1">
                              {msg.time}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-gray-400 text-xs">
                        No chat messages to display.
                      </div>
                    )}
                  </div>
                </div>

                {/* Conversation Key Information Breakdown */}
                <div className="space-y-2 text-xs pt-1 border-t border-gray-50">
                  <div className="flex items-center justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">
                      Conversation ID
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-gray-800 text-[11px]">
                        {currentSelected.conversationId}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            currentSelected.conversationId,
                          );
                          setCopiedId(true);
                          setTimeout(() => setCopiedId(false), 2000);
                        }}
                        className="text-gray-400 hover:text-gray-700 p-0.5 rounded cursor-pointer transition-colors"
                        title="Copy Conversation ID"
                      >
                        {copiedId ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">
                      Started Date
                    </span>
                    <span className="font-medium text-gray-700 text-[11px]">
                      {currentSelected.createdDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-400 font-medium">
                      Last Activity
                    </span>
                    <span className="font-medium text-gray-700 text-[11px]">
                      {currentSelected.lastActivityDate},{" "}
                      {currentSelected.lastActivityTime}
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
