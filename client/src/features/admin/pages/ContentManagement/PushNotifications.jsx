import React, { useState } from 'react';
import {
  BellRing,
  Send,
  Calendar,
  Clock,
  Users,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
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

export default function PushNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Push Notifications');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: 'New Spark Nearby! 🔥',
    message: 'Someone with 98% chemistry just liked your profile. Open LoveConnect to check them out!',
    targetAudience: 'All Users',
    gender: 'Everyone',
    location: 'All Locations',
    subscription: 'All Tiers',
    sendOption: 'now', // 'now' or 'scheduled'
    scheduledDate: '2026-10-01T18:00',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  });

  const kpis = [
    { title: 'Total Sent (30d)', value: '1,420,890', change: '+18.4%', icon: BellRing, color: COLORS.pink },
    { title: 'Avg. Open Rate', value: '28.6%', change: '+3.2%', icon: Eye, color: COLORS.purple },
    { title: 'Scheduled Active', value: '6 Campaigns', change: 'Next at 6 PM', icon: Clock, color: COLORS.blue },
    { title: 'Subscribed Devices', value: '412,300', change: '+94.2% opt-in', icon: Smartphone, color: COLORS.success },
  ];

  const [history, setHistory] = useState([
    {
      id: 'NOTIF-1092',
      title: 'Weekend Spark Alert! 💕',
      message: 'Saturday nights are the peak matching hours on LoveConnect. See who is active near you!',
      target: 'All Active Users',
      gender: 'Everyone',
      audienceCount: '320,400',
      sentAt: '28 Sep 2026, 04:30 PM',
      status: 'Sent',
      openRate: '31.4%',
      clicks: '100,600',
    },
    {
      id: 'NOTIF-1091',
      title: 'Someone Super Liked You! ⭐',
      message: 'You received a Super Like from a verified profile in your city. Tap to start chatting.',
      target: 'Free Tier Users',
      gender: 'Everyone',
      audienceCount: '185,200',
      sentAt: '27 Sep 2026, 08:15 PM',
      status: 'Sent',
      openRate: '36.8%',
      clicks: '68,150',
    },
    {
      id: 'NOTIF-1090',
      title: '50% Off 3-Month Premium ✨',
      message: 'Unlock who liked you, rewind swipes, and unlimited likes with our limited monsoon offer.',
      target: 'Non-Subscribed',
      gender: 'Everyone',
      audienceCount: '210,000',
      sentAt: '26 Sep 2026, 12:00 PM',
      status: 'Sent',
      openRate: '22.1%',
      clicks: '46,410',
    },
    {
      id: 'NOTIF-1089',
      title: 'Speed Dating Virtual Room 🚀',
      message: 'Join today’s 5-minute video speed dating event starting at 9:00 PM IST.',
      target: 'Delhi NCR & Mumbai',
      gender: 'Everyone',
      audienceCount: '94,500',
      sentAt: '01 Oct 2026, 06:00 PM',
      status: 'Scheduled',
      openRate: '-',
      clicks: '-',
    },
    {
      id: 'NOTIF-1088',
      title: 'Complete Your Bio for 3x Matches 🎯',
      message: 'Profiles with 4+ photos and completed interests get 300% more matches!',
      target: 'Incomplete Profiles',
      gender: 'Everyone',
      audienceCount: '42,100',
      sentAt: 'Draft',
      status: 'Draft',
      openRate: '-',
      clicks: '-',
    },
  ]);

  const handleSendNotification = (e) => {
    e.preventDefault();
    const newNotif = {
      id: `NOTIF-${Math.floor(1000 + Math.random() * 9000)}`,
      title: form.title,
      message: form.message,
      target: `${form.targetAudience} (${form.gender})`,
      gender: form.gender,
      audienceCount: '240,000',
      sentAt: form.sendOption === 'now' ? 'Just Now' : form.scheduledDate.replace('T', ' '),
      status: form.sendOption === 'now' ? 'Sent' : 'Scheduled',
      openRate: form.sendOption === 'now' ? '0.0%' : '-',
      clicks: form.sendOption === 'now' ? '0' : '-',
    };

    setHistory([newNotif, ...history]);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setIsComposeOpen(false);
    }, 1500);
  };

  const filteredHistory = history.filter((item) => {
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar activeTab="Push Notifications" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <BellRing className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: COLORS.dark }}>
                  Push Notifications
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  FCM & APNs Active
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Compose, schedule, and broadcast targeted push notifications to mobile users.
              </p>
            </div>

            <button
              onClick={() => setIsComposeOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Compose Campaign</span>
            </button>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 block">{kpi.title}</span>
                    <span className="text-2xl font-black mt-1 block" style={{ color: COLORS.dark }}>
                      {kpi.value}
                    </span>
                    <span className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      {kpi.change}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* MAIN COMPOSE + PREVIEW MODAL */}
          {isComposeOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 space-y-6 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF2D72]" />
                    <h2 className="text-lg font-black text-gray-900">Create Push Notification Campaign</h2>
                  </div>
                  <button onClick={() => setIsComposeOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* FORM (7 cols) */}
                  <form onSubmit={handleSendNotification} className="lg:col-span-7 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Notification Title *</label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="e.g. New Match Waiting! 💕"
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Message Body *</label>
                      <textarea
                        rows={3}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Write an enticing push notification message..."
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Target Audience</label>
                        <select
                          value={form.targetAudience}
                          onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                          className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 bg-white"
                        >
                          <option>All Users</option>
                          <option>Active in last 24h</option>
                          <option>Inactive (7+ days)</option>
                          <option>Free Tier Users</option>
                          <option>Premium Subscribers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Gender Target</label>
                        <select
                          value={form.gender}
                          onChange={(e) => setForm({ ...form, gender: e.target.value })}
                          className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 bg-white"
                        >
                          <option>Everyone</option>
                          <option>Women Only</option>
                          <option>Men Only</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Location Filter</label>
                        <select
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 bg-white"
                        >
                          <option>All Locations</option>
                          <option>Delhi NCR</option>
                          <option>Mumbai</option>
                          <option>Bangalore</option>
                          <option>Hyderabad</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Attached Image URL</label>
                        <input
                          type="text"
                          value={form.image}
                          onChange={(e) => setForm({ ...form, image: e.target.value })}
                          placeholder="Image URL for rich notification"
                          className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200"
                        />
                      </div>
                    </div>

                    {/* SEND SCHEDULE */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-gray-700 mb-2">Delivery Timing</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                          <input
                            type="radio"
                            name="sendOption"
                            checked={form.sendOption === 'now'}
                            onChange={() => setForm({ ...form, sendOption: 'now' })}
                            className="text-[#FF2D72] focus:ring-[#FF2D72]"
                          />
                          <span>Send Immediately</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                          <input
                            type="radio"
                            name="sendOption"
                            checked={form.sendOption === 'scheduled'}
                            onChange={() => setForm({ ...form, sendOption: 'scheduled' })}
                            className="text-[#FF2D72] focus:ring-[#FF2D72]"
                          />
                          <span>Schedule for Later</span>
                        </label>
                      </div>
                      {form.sendOption === 'scheduled' && (
                        <input
                          type="datetime-local"
                          value={form.scheduledDate}
                          onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                          className="mt-2 text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 bg-white"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setIsComposeOpen(false)}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md cursor-pointer transition-all"
                        style={{ backgroundColor: COLORS.pink }}
                      >
                        {sentSuccess ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Broadcast Sent!</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{form.sendOption === 'now' ? 'Send Broadcast Now' : 'Schedule Notification'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* LIVE DEVICE PREVIEW (5 cols) */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-gray-100 to-gray-200 p-5 rounded-3xl flex flex-col items-center justify-center border border-gray-300 shadow-inner">
                    <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-3">
                      Lock Screen Preview
                    </span>

                    {/* iPhone Shell */}
                    <div className="w-[260px] bg-black rounded-[36px] p-3 shadow-2xl border-4 border-gray-800 relative">
                      <div className="w-20 h-4 bg-black rounded-b-xl mx-auto mb-4"></div>

                      <div className="text-center text-white mb-6">
                        <span className="text-3xl font-light tracking-tight">09:41</span>
                        <span className="text-[10px] block opacity-80 font-medium">Monday, September 28</span>
                      </div>

                      {/* Push Notification Card */}
                      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/40 space-y-1.5 animate-fadeIn">
                        <div className="flex items-center justify-between text-[10px] text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-md bg-[#FF2D72] flex items-center justify-center text-white text-[8px] font-black">
                              LC
                            </div>
                            <span className="font-bold text-gray-800">LoveConnect</span>
                          </div>
                          <span className="text-[9px]">now</span>
                        </div>

                        <p className="text-[11px] font-bold text-gray-900 leading-snug">{form.title}</p>
                        <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-3">{form.message}</p>

                        {form.image && (
                          <div className="mt-2 rounded-xl overflow-hidden h-20 w-full">
                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="w-24 h-1 bg-white/60 rounded-full mx-auto mt-8 mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATION CAMPAIGNS TABLE */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Campaign History & Scheduled Broadcasts</h3>
                <p className="text-xs text-gray-400">Review past broadcasts, delivery rates, and user engagement.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 p-0.5 rounded-xl text-xs font-semibold">
                  {['All', 'Sent', 'Scheduled', 'Draft'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilterStatus(tab)}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        filterStatus === tab ? 'bg-white shadow-2xs text-[#FF2D72] font-bold' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-[#FF2D72]"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                    <th className="py-3 px-3">Campaign & Message</th>
                    <th className="py-3 px-3">Target Audience</th>
                    <th className="py-3 px-3">Scheduled / Sent At</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Open Rate</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-pink-50/20 transition-colors">
                      <td className="py-3.5 px-3 max-w-xs">
                        <div className="font-extrabold text-gray-900 text-xs flex items-center gap-1.5">
                          <span>{item.title}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{item.message}</p>
                        <span className="text-[9px] font-bold text-gray-400 mt-0.5 block">{item.id}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-gray-800 block">{item.target}</span>
                        <span className="text-[10px] text-gray-400 font-semibold">{item.audienceCount} devices</span>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-gray-600">{item.sentAt}</td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            item.status === 'Sent'
                              ? 'bg-green-100 text-green-700'
                              : item.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-extrabold text-gray-800">
                        {item.openRate !== '-' ? (
                          <div className="flex items-center gap-1 text-[#22C55E]">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{item.openRate}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => alert(`Viewing details for ${item.id}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#FF2D72] hover:bg-[#FFE7F0] transition-colors"
                            title="View Campaign"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setHistory(history.filter((h) => h.id !== item.id))}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
