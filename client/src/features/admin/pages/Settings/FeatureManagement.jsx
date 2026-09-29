import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Video,
  Mic,
  Heart,
  Zap,
  RotateCcw,
  EyeOff,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Save,
  Info,
  Layers,
  Radio
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

const INITIAL_FEATURES = [
  {
    id: 'feat-video',
    name: 'In-App HD Video Calling',
    description: 'Allows matched users to initiate peer-to-peer 1-on-1 video calls directly from the chat screen.',
    category: 'Communication',
    icon: Video,
    enabled: true,
    rolloutPercentage: 100,
    requiresPremium: false,
    statusNote: 'Stable • 99.9% WebRTC uptime',
  },
  {
    id: 'feat-voice',
    name: 'Voice Messages in Chat',
    description: 'Enables users to record and send audio voice notes inside chat conversations.',
    category: 'Communication',
    icon: Mic,
    enabled: true,
    rolloutPercentage: 100,
    requiresPremium: false,
    statusNote: 'Audio waveforms active',
  },
  {
    id: 'feat-superlike',
    name: 'Super Likes',
    description: 'Allows sending highlighted likes that trigger instant notifications and glowing profile cards.',
    category: 'Matching',
    icon: Heart,
    enabled: true,
    rolloutPercentage: 100,
    requiresPremium: true,
    statusNote: 'Monetized • Free 1/day, extra on store',
  },
  {
    id: 'feat-boost',
    name: 'Profile Spotlight Boost',
    description: 'Puts user profiles at the top of local swipe decks for 30 minutes to generate up to 10x matches.',
    category: 'Monetization',
    icon: Zap,
    enabled: true,
    rolloutPercentage: 100,
    requiresPremium: true,
    statusNote: 'High engagement revenue driver',
  },
  {
    id: 'feat-rewind',
    name: 'Swipe Rewind (Undo)',
    description: 'Permits users to undo an accidental left/right swipe and reconsider the previous profile.',
    category: 'Matching',
    icon: RotateCcw,
    enabled: true,
    rolloutPercentage: 100,
    requiresPremium: true,
    statusNote: 'Exclusive to Premium subscribers',
  },
  {
    id: 'feat-incognito',
    name: 'Incognito Browsing Mode',
    description: 'Hides member from public discovery and only reveals profile to profiles they explicitly liked.',
    category: 'Privacy',
    icon: EyeOff,
    enabled: true,
    rolloutPercentage: 100,
    requiresPremium: true,
    statusNote: 'High privacy preference',
  },
  {
    id: 'feat-verification',
    name: 'Mandatory Photo Verification for Chat',
    description: 'Requires all accounts to complete biometric selfie verification before sending messages.',
    category: 'Safety',
    icon: ShieldCheck,
    enabled: false,
    rolloutPercentage: 25,
    requiresPremium: false,
    statusNote: 'Currently in Beta in Delhi/Mumbai',
  },
  {
    id: 'feat-ai-match',
    name: 'AI Chemistry Recommendation Engine',
    description: 'Uses vector embeddings of bios and lifestyle choices to calculate deep compatibility percentages.',
    category: 'Matching',
    icon: Cpu,
    enabled: true,
    rolloutPercentage: 90,
    requiresPremium: false,
    statusNote: 'Generates 98% match scores',
  },
];

export default function FeatureManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Feature Management');
  const [features, setFeatures] = useState(INITIAL_FEATURES);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const toggleFeature = (id) => {
    setFeatures(
      features.map((f) => {
        if (f.id === id) {
          const updated = { ...f, enabled: !f.enabled };
          showToast(`Feature "${f.name}" is now ${updated.enabled ? 'Enabled' : 'Disabled'}`);
          return updated;
        }
        return f;
      })
    );
  };

  const updateRollout = (id, percentage) => {
    setFeatures(
      features.map((f) => (f.id === id ? { ...f, rolloutPercentage: percentage } : f))
    );
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredFeatures = features.filter(
    (f) => categoryFilter === 'All' || f.category === categoryFilter
  );

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar activeTab="Feature Management" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <Sliders className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: COLORS.dark }}>
                  Feature Flags & Rollout Control
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  {features.filter((f) => f.enabled).length} / {features.length} Features Active
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Remotely toggle mobile application capabilities, staged rollouts, and premium gating without app store re-releases.
              </p>
            </div>

            <button
              onClick={() => showToast('All feature flag state configurations saved.')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Apply Configuration</span>
            </button>
          </div>

          {toastMessage && (
            <div className="p-3 bg-pink-50 border border-pink-200 text-[#FF2D72] rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-fadeIn">
              <Sparkles className="w-4 h-4 text-[#FF2D72]" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* CATEGORY FILTER TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Matching', 'Communication', 'Monetization', 'Privacy', 'Safety'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#FF2D72] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  className={`bg-white rounded-3xl p-6 border transition-all shadow-xs flex flex-col justify-between ${
                    feat.enabled ? 'border-gray-200 hover:border-pink-300' : 'border-gray-200/60 opacity-75'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                            feat.enabled ? 'bg-[#FFE7F0] text-[#FF2D72]' : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Icon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <h3 className="font-black text-sm text-gray-900 leading-tight">{feat.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              {feat.category}
                            </span>
                            {feat.requiresPremium && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-purple-100 text-purple-700">
                                Premium Only
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* TOGGLE SWITCH */}
                      <button
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                          feat.enabled ? 'bg-[#22C55E]' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            feat.enabled ? 'translate-x-6' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">{feat.description}</p>
                  </div>

                  {/* ROLLOUT PERCENTAGE & METRICS */}
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-600">User Rollout</span>
                      <span className="font-extrabold text-[#FF2D72]">{feat.rolloutPercentage}% of Users</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={feat.rolloutPercentage}
                      onChange={(e) => updateRollout(feat.id, Number(e.target.value))}
                      className="w-full accent-[#FF2D72] cursor-pointer"
                    />

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                      <span>{feat.statusNote}</span>
                      <span className="font-mono text-[10px]">{feat.id}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
