import React, { useState } from 'react';
import {
  FileText,
  Edit3,
  Eye,
  CheckCircle2,
  Clock,
  Globe,
  Search,
  Plus,
  Save,
  Trash2,
  ExternalLink,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  PhoneCall
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

const INITIAL_PAGES = [
  {
    id: 'cms-1',
    title: 'About Us',
    slug: '/about-us',
    status: 'Published',
    lastModified: '24 Sep 2026, 02:40 PM',
    author: 'Super Admin',
    views: '84,120',
    content: `<h2>Welcome to LoveConnect</h2>
<p>LoveConnect is the premier modern dating platform designed to foster authentic human relationships, values-first discovery, and zero-compromise security.</p>
<p>Founded with the mission to replace superficial swiping with genuine chemistry, we verify every profile and protect our community with state-of-the-art moderation.</p>
<h3>Our Core Principles</h3>
<ul>
  <li><strong>Authenticity:</strong> 100% human-verified photo matching.</li>
  <li><strong>Privacy First:</strong> Your phone number and location precision are always protected.</li>
  <li><strong>Respect:</strong> Strict zero-tolerance harassment and scam moderation.</li>
</ul>`,
  },
  {
    id: 'cms-2',
    title: 'Privacy Policy',
    slug: '/privacy-policy',
    status: 'Published',
    lastModified: '22 Sep 2026, 11:15 AM',
    author: 'Legal Team',
    views: '45,300',
    content: `<h2>LoveConnect Privacy Policy</h2>
<p>We respect your privacy and are committed to protecting your personal data. This privacy statement explains how we look after your data when you visit our website or use the LoveConnect mobile application.</p>
<h3>Data We Collect</h3>
<ul>
  <li>Basic account credentials (name, email, age, gender)</li>
  <li>Profile photos and selfie verification scans</li>
  <li>Approximate geolocation for nearby discovery</li>
</ul>`,
  },
  {
    id: 'cms-3',
    title: 'Terms & Conditions',
    slug: '/terms-conditions',
    status: 'Published',
    lastModified: '18 Sep 2026, 04:00 PM',
    author: 'Legal Team',
    views: '32,190',
    content: `<h2>Terms of Service</h2>
<p>By creating an account or using the LoveConnect app, you agree to be bound by these Terms. You must be at least 18 years old to create an account on LoveConnect.</p>
<p>Users agree never to engage in harassment, commercial solicitation, automated scraping, or false identity impersonation.</p>`,
  },
  {
    id: 'cms-4',
    title: 'Community Guidelines',
    slug: '/community-guidelines',
    status: 'Published',
    lastModified: '20 Sep 2026, 09:30 AM',
    author: 'Moderation Lead',
    views: '28,450',
    content: `<h2>Community Guidelines</h2>
<p>LoveConnect is a community of real people seeking meaningful connections. We treat every individual with kindness, dignity, and respect.</p>
<p>Any hate speech, unconsented explicit imagery, scamming, or verbal abuse will result in an immediate and irreversible permanent device ban.</p>`,
  },
  {
    id: 'cms-5',
    title: 'FAQ',
    slug: '/faq',
    status: 'Published',
    lastModified: '26 Sep 2026, 01:20 PM',
    author: 'Support Team',
    views: '92,800',
    content: `<h2>Frequently Asked Questions</h2>
<p>Find quick answers to common questions about matching, subscription billing, photo verification, and account settings.</p>`,
  },
  {
    id: 'cms-6',
    title: 'Help Center',
    slug: '/help-center',
    status: 'Published',
    lastModified: '25 Sep 2026, 05:45 PM',
    author: 'Support Admin',
    views: '19,240',
    content: `<h2>LoveConnect Help & Safety Center</h2>
<p>Need assistance or have concerns about a profile? Our 24/7 dedicated support and safety team is here to assist you.</p>`,
  },
  {
    id: 'cms-7',
    title: 'Contact Us',
    slug: '/contact-us',
    status: 'Published',
    lastModified: '15 Sep 2026, 10:10 AM',
    author: 'Super Admin',
    views: '14,870',
    content: `<h2>Get in Touch</h2>
<p>For press inquiries, partnerships, or immediate member assistance, reach out directly to support@loveconnect.com.</p>`,
  },
];

export default function CMSPages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('CMS Pages');
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [selectedPage, setSelectedPage] = useState(INITIAL_PAGES[0]);
  const [editorContent, setEditorContent] = useState(INITIAL_PAGES[0].content);
  const [editorTitle, setEditorTitle] = useState(INITIAL_PAGES[0].title);
  const [editorSlug, setEditorSlug] = useState(INITIAL_PAGES[0].slug);
  const [editorStatus, setEditorStatus] = useState(INITIAL_PAGES[0].status);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
    setEditorTitle(page.title);
    setEditorSlug(page.slug);
    setEditorContent(page.content);
    setEditorStatus(page.status);
  };

  const handleSavePage = (e) => {
    e.preventDefault();
    const updated = pages.map((p) => {
      if (p.id === selectedPage.id) {
        return {
          ...p,
          title: editorTitle,
          slug: editorSlug,
          content: editorContent,
          status: editorStatus,
          lastModified: 'Just Now',
        };
      }
      return p;
    });
    setPages(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar activeTab="CMS Pages" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                CMS Pages Management
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Author, modify, and publish legal terms, guidelines, and company information pages with rich formatting
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-semibold text-xs text-gray-700 hover:bg-gray-50 shadow-2xs cursor-pointer transition-all"
              >
                <Eye className="w-4 h-4 text-[#7C3AED]" />
                <span>Web Preview</span>
              </button>

              <button
                onClick={handleSavePage}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: COLORS.pink }}
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* TOP 4 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4"
              style={{ borderLeftColor: COLORS.pink }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: COLORS.pink }}
              >
                <FileText className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Total CMS Pages</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">{pages.length}</span>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4"
              style={{ borderLeftColor: COLORS.success }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: COLORS.success }}
              >
                <CheckCircle2 className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Published Pages</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                  {pages.filter((p) => p.status === 'Published').length}
                </span>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4"
              style={{ borderLeftColor: COLORS.purple }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: COLORS.purple }}
              >
                <Globe className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Public URL Routes</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">{pages.length}</span>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4"
              style={{ borderLeftColor: '#3B82F6' }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: '#3B82F6' }}
              >
                <Eye className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Total Reader Views</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">241.6K</span>
              </div>
            </div>
          </div>

          {saveToast && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Page content saved and published successfully!</span>
            </div>
          )}

          {/* MAIN 2-COLUMN LAYOUT: PAGES LIST (4 cols) + RICH EDITOR (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT PAGES SELECTOR (4 COLS) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-gray-900">Content Pages</h3>
                <span className="text-[11px] font-bold text-gray-400">{filteredPages.length} Listed</span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-[#FF2D72]"
                />
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredPages.map((page) => {
                  const isSelected = selectedPage.id === page.id;
                  return (
                    <div
                      key={page.id}
                      onClick={() => handleSelectPage(page)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFE7F0]/60 border-[#FF2D72]/40 shadow-xs'
                          : 'bg-white border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#FF2D72]' : 'text-gray-900'}`}>
                          {page.title}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                            page.status === 'Published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {page.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 block font-mono mt-1">{page.slug}</span>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100/60">
                        <span>Updated: {page.lastModified}</span>
                        <span className="font-semibold text-gray-600">{page.views} reads</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT RICH TEXT EDITOR (8 COLS) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-5">
              {/* PAGE METADATA INPUTS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editorSlug}
                    onChange={(e) => setEditorSlug(e.target.value)}
                    className="w-full text-xs font-mono text-gray-600 px-3 py-2 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Publication Status</label>
                  <select
                    value={editorStatus}
                    onChange={(e) => setEditorStatus(e.target.value)}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 bg-white"
                  >
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Scheduled</option>
                  </select>
                </div>
              </div>

              {/* RICH TEXT FORMATTING TOOLBAR */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700">
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + ' <strong>Bold text</strong>')}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + ' <em>Italic text</em>')}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + ' <u>Underlined</u>')}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700"
                  title="Underline"
                >
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + '\n<h3>New Section</h3>')}
                  className="px-2 py-1 rounded-lg hover:bg-gray-200 text-xs font-black"
                  title="Heading 3"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + '\n<ul>\n  <li>Bullet point 1</li>\n</ul>')}
                  className="p-1.5 rounded-lg hover:bg-gray-200"
                  title="Unordered List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + '\n<ol>\n  <li>Numbered step</li>\n</ol>')}
                  className="p-1.5 rounded-lg hover:bg-gray-200"
                  title="Ordered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + ' <a href="https://loveconnect.com">link</a>')}
                  className="p-1.5 rounded-lg hover:bg-gray-200"
                  title="Insert Link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent(editorContent + '\n<blockquote>Inspiring quote</blockquote>')}
                  className="px-2 py-1 rounded-lg hover:bg-gray-200 text-xs font-serif italic"
                  title="Blockquote"
                >
                  ""
                </button>
                <div className="ml-auto text-[10px] font-bold text-gray-400">HTML / Rich Mode Active</div>
              </div>

              {/* EDITOR TEXTAREA */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Page HTML / Markdown Content</label>
                <textarea
                  rows={14}
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full font-mono text-xs text-gray-800 p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#FF2D72] focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* PREVIEW MODAL */}
          {isPreviewOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF2D72]">
                      Web View Preview
                    </span>
                    <h2 className="text-2xl font-black text-gray-900 mt-1">{editorTitle}</h2>
                    <span className="text-xs text-gray-400 font-mono">loveconnect.app{editorSlug}</span>
                  </div>
                  <button onClick={() => setIsPreviewOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                    ✕
                  </button>
                </div>

                <div
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: editorContent }}
                />

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
