import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Eye,
  ExternalLink,
  Calendar,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  MousePointer,
  Trash2,
  Edit,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight
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

const INITIAL_BANNERS = [
  {
    id: 'BAN-01',
    title: 'Unlock LoveConnect Gold & See Who Likes You',
    subtitle: 'Limited monsoon special: Get 3 Months for just ₹999 with 5 free Super Likes weekly!',
    cta: 'Upgrade to Gold',
    url: '/premium',
    placement: 'Swipe Deck Interstitial',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-01',
    endDate: '2026-10-31',
    active: true,
    impressions: '1,240,500',
    clicks: '89,400',
    ctr: '7.2%',
  },
  {
    id: 'BAN-02',
    title: 'Virtual Blind Date Night Every Friday at 8 PM',
    subtitle: 'Connect with 5 curated matches for 3-minute video sparks without profile reveals.',
    cta: 'Reserve Spot',
    url: '/call',
    placement: 'Discover Top Banner',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-15',
    endDate: '2026-11-15',
    active: true,
    impressions: '760,200',
    clicks: '54,200',
    ctr: '7.1%',
  },
  {
    id: 'BAN-03',
    title: 'Get Verified for 300% Higher Matches & Trust Badge',
    subtitle: 'Take a quick 5-second selfie scan to get your blue verified checkmark today.',
    cta: 'Verify My Profile',
    url: '/verification',
    placement: 'Matches Page Header',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    active: true,
    impressions: '980,100',
    clicks: '112,800',
    ctr: '11.5%',
  },
  {
    id: 'BAN-04',
    title: 'Coffee Date Sponsored by Blue Tokai',
    subtitle: 'Matches who complete 50 messages get a free artisanal iced latte voucher.',
    cta: 'Claim Perk',
    url: '/discover',
    placement: 'Chat Screen Top Bar',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-20',
    endDate: '2026-10-20',
    active: false,
    impressions: '310,000',
    clicks: '14,200',
    ctr: '4.5%',
  },
];

export default function BannersAds() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Banners & Ads');
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placementFilter, setPlacementFilter] = useState('All');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    cta: 'Explore Now',
    url: '/premium',
    placement: 'Swipe Deck Interstitial',
    image: 'https://images.unsplash.com/photo-1522267884383-c38c70c49558?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
  });

  const toggleBannerStatus = (id) => {
    setBanners(
      banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  const handleCreateBanner = (e) => {
    e.preventDefault();
    const newBanner = {
      id: `BAN-0${banners.length + 1}`,
      ...formData,
      active: true,
      impressions: '0',
      clicks: '0',
      ctr: '0.0%',
    };
    setBanners([newBanner, ...banners]);
    setIsModalOpen(false);
  };

  const filteredBanners = banners.filter(
    (b) => placementFilter === 'All' || b.placement === placementFilter
  );

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar activeTab="Banners & Ads" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                Banners & Ads
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Configure promotional banners, partnerships, CTA buttons, and placement channels across mobile screens
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Banner</span>
            </button>
          </div>

          {/* STATUS CONTROLS */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-xs font-semibold text-gray-500">Filter By Status:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">
                  {banners.filter((b) => b.active).length} Active Campaigns
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FEF3C7] text-[#D97706]">
                  {banners.filter((b) => !b.active).length} Inactive
                </span>
              </div>
            </div>

          {/* BANNERS GRID CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBanners.map((banner) => (
              <div
                key={banner.id}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Visual Banner Preview Image */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-between p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md border border-white/30">
                        {banner.placement}
                      </span>
                      <button
                        onClick={() => toggleBannerStatus(banner.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 cursor-pointer transition-all ${banner.active ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'
                          }`}
                      >
                        {banner.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>

                    <div>
                      <h3 className="font-black text-sm text-white drop-shadow-md leading-tight">{banner.title}</h3>
                      <p className="text-[11px] text-white/80 line-clamp-1 mt-1">{banner.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Banner Metrics and Controls */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-700">CTA Button:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#FFE7F0] text-[#FF2D72] font-black text-[11px]">
                        {banner.cta} → {banner.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {banner.startDate} to {banner.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Performance stats row */}
                  <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-2xl text-center">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Impressions</span>
                      <p className="text-xs font-black text-gray-800 mt-0.5">{banner.impressions}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Clicks</span>
                      <p className="text-xs font-black text-[#FF2D72] mt-0.5">{banner.clicks}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">CTR</span>
                      <p className="text-xs font-black text-[#22C55E] mt-0.5">{banner.ctr}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-[10px] font-mono text-gray-400">{banner.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBannerStatus(banner.id)}
                        className="text-xs font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
                      >
                        {banner.active ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(banner.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50"
                        title="Delete Banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CREATE BANNER MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-black text-gray-900">Create New Promotion Banner</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateBanner} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Banner Headline Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 50% Off 3-Month Premium"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle / Body Description</label>
                    <textarea
                      rows={2}
                      placeholder="Describe the offer or feature..."
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Call-To-Action (CTA)</label>
                      <input
                        type="text"
                        value={formData.cta}
                        onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                        className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Target URL / Screen</label>
                      <input
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Placement Screen</label>
                      <select
                        value={formData.placement}
                        onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                        className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 bg-white"
                      >
                        <option>Swipe Deck Interstitial</option>
                        <option>Discover Top Banner</option>
                        <option>Matches Page Header</option>
                        <option>Chat Screen Top Bar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md cursor-pointer"
                      style={{ backgroundColor: COLORS.pink }}
                    >
                      Publish Banner
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
