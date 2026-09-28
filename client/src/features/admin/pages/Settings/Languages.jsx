import React, { useState } from 'react';
import {
  Globe,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Edit,
  Download,
  Upload,
  ArrowRight,
  Sparkles,
  ToggleLeft,
  ToggleRight
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

const INITIAL_LANGUAGES = [
  {
    id: 'lang-en',
    name: 'English',
    nativeName: 'English (US & Global)',
    code: 'en',
    isDefault: true,
    rtl: false,
    completion: 100,
    activeUsers: '1,120,400',
    status: 'Active',
  },
  {
    id: 'lang-hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    code: 'hi',
    isDefault: false,
    rtl: false,
    completion: 100,
    activeUsers: '680,200',
    status: 'Active',
  },
  {
    id: 'lang-es',
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
    isDefault: false,
    rtl: false,
    completion: 88,
    activeUsers: '190,500',
    status: 'Active',
  },
  {
    id: 'lang-fr',
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    isDefault: false,
    rtl: false,
    completion: 82,
    activeUsers: '94,100',
    status: 'Active',
  },
  {
    id: 'lang-de',
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de',
    isDefault: false,
    rtl: false,
    completion: 78,
    activeUsers: '62,800',
    status: 'Beta',
  },
  {
    id: 'lang-ar',
    name: 'Arabic',
    nativeName: 'العربية',
    code: 'ar',
    isDefault: false,
    rtl: true,
    completion: 92,
    activeUsers: '145,000',
    status: 'Active',
  },
];

export default function Languages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Languages');
  const [languages, setLanguages] = useState(INITIAL_LANGUAGES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLang, setNewLang] = useState({
    name: '',
    nativeName: '',
    code: '',
    rtl: false,
  });

  const handleSetDefault = (code) => {
    setLanguages(
      languages.map((l) => ({
        ...l,
        isDefault: l.code === code,
      }))
    );
  };

  const handleToggleStatus = (code) => {
    setLanguages(
      languages.map((l) => {
        if (l.code === code && !l.isDefault) {
          return {
            ...l,
            status: l.status === 'Active' ? 'Disabled' : 'Active',
          };
        }
        return l;
      })
    );
  };

  const handleAddLanguage = (e) => {
    e.preventDefault();
    const created = {
      id: `lang-${newLang.code}`,
      ...newLang,
      isDefault: false,
      completion: 0,
      activeUsers: '0',
      status: 'Beta',
    };
    setLanguages([...languages, created]);
    setIsModalOpen(false);
    setNewLang({ name: '', nativeName: '', code: '', rtl: false });
  };

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A]">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar activeTab="Languages" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <Globe className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: COLORS.dark }}>
                  Language & Localization
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  {languages.length} Locales Supported
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Manage internationalization, default system language, Right-to-Left (RTL) rendering, and string translation sync.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Exporting i18n JSON translation catalog...')}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-xs text-gray-700 hover:bg-gray-50 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Strings</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                style={{ backgroundColor: COLORS.pink }}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Language</span>
              </button>
            </div>
          </div>

          {/* LANGUAGES TABLE CARD */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Supported Mobile & Web Locales</h3>
                <p className="text-xs text-gray-400">Default language is served when client device locale is unavailable.</p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search language..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-[#FF2D72]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                    <th className="py-3 px-3">Language</th>
                    <th className="py-3 px-3">Locale Code</th>
                    <th className="py-3 px-3">Direction</th>
                    <th className="py-3 px-3">Translation Progress</th>
                    <th className="py-3 px-3">Active Audience</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((lang) => (
                    <tr key={lang.id} className="hover:bg-pink-50/20 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-gray-900">{lang.name}</span>
                          <span className="text-xs text-gray-400">({lang.nativeName})</span>
                          {lang.isDefault && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#FFE7F0] text-[#FF2D72]">
                              DEFAULT
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-mono text-xs font-bold text-gray-600 uppercase">
                        {lang.code}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            lang.rtl ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {lang.rtl ? 'RTL (Right-to-Left)' : 'LTR'}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="w-36">
                          <div className="flex justify-between text-[10px] font-bold text-gray-600 mb-1">
                            <span>{lang.completion}% Translated</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${lang.completion}%`,
                                backgroundColor: lang.completion === 100 ? COLORS.success : COLORS.pink,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-bold text-gray-700">{lang.activeUsers}</td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            lang.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : lang.status === 'Beta'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {lang.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!lang.isDefault && (
                            <button
                              onClick={() => handleSetDefault(lang.code)}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#FF2D72] bg-[#FFE7F0] hover:bg-[#FFD4E3] transition-all cursor-pointer"
                            >
                              Make Default
                            </button>
                          )}
                          {!lang.isDefault && (
                            <button
                              onClick={() => handleToggleStatus(lang.code)}
                              className="text-xs font-semibold text-gray-400 hover:text-gray-700"
                            >
                              {lang.status === 'Active' ? 'Disable' : 'Enable'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ADD LANGUAGE MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-5 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-black text-gray-900">Add New Locale</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddLanguage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Language Name (English) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Japanese"
                      value={newLang.name}
                      onChange={(e) => setNewLang({ ...newLang, name: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Native Script Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 日本語"
                      value={newLang.nativeName}
                      onChange={(e) => setNewLang({ ...newLang, nativeName: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ISO 639-1 Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="e.g. ja or ja-JP"
                      value={newLang.code}
                      onChange={(e) => setNewLang({ ...newLang, code: e.target.value.toLowerCase() })}
                      className="w-full text-xs font-mono uppercase px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={newLang.rtl}
                      onChange={(e) => setNewLang({ ...newLang, rtl: e.target.checked })}
                      className="rounded text-[#FF2D72] focus:ring-[#FF2D72]"
                    />
                    <span className="text-xs font-semibold text-gray-700">Right-to-Left (RTL) script layout</span>
                  </label>

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
                      Add Locale
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
