import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    UserCheck,
    Flag,
    Heart,
    MessageSquare,
    Video,
    CreditCard,
    Receipt,
    BarChart3,
    BellRing,
    FileText,
    Image,
    HelpCircle,
    Settings,
    Sliders,
    Globe,
    UserCog,
    History,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Shield,
    LogOut,
    ShieldCheck
} from 'lucide-react';

const COLORS = {
    pink: '#FF2D72',
    lightPink: '#FFE7F0',
    purple: '#7C3AED',
    dark: '#17151A',
    white: '#FFFFFF',
    success: '#22C55E',
};

// Module-level persistent scroll position to retain sidebar scroll position across route changes
let globalSidebarScrollTop = 0;

export default function AdminSidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const scrollContainerRef = useRef(null);
    const activeButtonRef = useRef(null);

    const [collapsed, setCollapsed] = useState(() => {
        try {
            return sessionStorage.getItem('loveconnect_admin_sidebar_collapsed') === 'true';
        } catch (_) {
            return false;
        }
    });

    // Determine current active page based on route location or props
    const currentPath = (location.pathname || '').replace(/\/$/, "");

    const isDashboardActive = currentPath === '/admin' || currentPath === '/admin/dashboard' || activeTab === 'Dashboard';

    // Synchronously restore scroll position before browser paint so sidebar never jumps to top
    useLayoutEffect(() => {
        const restoreScroll = () => {
            if (!scrollContainerRef.current) return;
            let targetScroll = globalSidebarScrollTop;
            if (!targetScroll && typeof window !== 'undefined') {
                try {
                    const saved = sessionStorage.getItem('loveconnect_admin_sidebar_scroll');
                    if (saved) targetScroll = parseFloat(saved) || 0;
                } catch (_) { }
            }
            if (targetScroll > 0 && scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = targetScroll;
            }
        };

        restoreScroll();
        const frameId = requestAnimationFrame(restoreScroll);
        return () => cancelAnimationFrame(frameId);
    }, []);

    // If active tab is out of the visible viewport (e.g. direct URL visit or deep link), scroll container without affecting window
    useEffect(() => {
        if (activeButtonRef.current && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const button = activeButtonRef.current;
            const cRect = container.getBoundingClientRect();
            const bRect = button.getBoundingClientRect();

            if (bRect.top < cRect.top + 8) {
                container.scrollTop -= (cRect.top + 8 - bRect.top);
            } else if (bRect.bottom > cRect.bottom - 8) {
                container.scrollTop += (bRect.bottom - (cRect.bottom - 8));
            }
        }
    }, [currentPath, activeTab]);

    const handleScroll = (e) => {
        const top = e.currentTarget.scrollTop;
        globalSidebarScrollTop = top;
        try {
            sessionStorage.setItem('loveconnect_admin_sidebar_scroll', String(top));
        } catch (_) { }
    };

    const handleItemClick = (name, path) => {
        // Record scroll position right before navigation
        if (scrollContainerRef.current) {
            globalSidebarScrollTop = scrollContainerRef.current.scrollTop;
            try {
                sessionStorage.setItem('loveconnect_admin_sidebar_scroll', String(globalSidebarScrollTop));
            } catch (_) { }
        }
        if (setActiveTab) setActiveTab(name);
        if (path) {
            if (location.pathname !== path && !location.pathname.endsWith(path)) {
                navigate(path);
            }
        }
    };

    const toggleCollapse = () => {
        setCollapsed((prev) => {
            const next = !prev;
            try {
                sessionStorage.setItem('loveconnect_admin_sidebar_collapsed', String(next));
            } catch (_) { }
            return next;
        });
        if (setSidebarOpen && sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    const navSections = [
        {
            title: 'USER MANAGEMENT',
            items: [
                { name: 'Users', icon: Users, path: '/admin/users' },
                // { name: 'Profiles', icon: UserCheck, path: '/admin/profiles' },
                // { name: 'Verifications', icon: ShieldCheck, path: '/admin/verifications' },
                { name: 'Reports & Moderation', icon: Flag, path: '/admin/reports' },
            ],
        },
        {
            title: 'MATCH & CHAT',
            items: [
                { name: 'Matches', icon: Heart, path: '/admin/matches' },
                { name: 'Chat Management', icon: MessageSquare, path: '/admin/chats' },
                { name: 'Video Call Logs', icon: Video, path: '/admin/video-calls' },
            ],
        },
        {
            title: 'SUBSCRIPTION & PAYMENT',
            items: [
                { name: 'Subscription Plans', icon: CreditCard, path: '/admin/subscriptions' },
                { name: 'Transactions', icon: Receipt, path: '/admin/transactions' },
                { name: 'Revenue Reports', icon: BarChart3, path: '/admin/revenue' },
            ],
        },
        {
            title: 'CONTENT MANAGEMENT',
            items: [
                { name: 'Push Notifications', icon: BellRing, path: '/admin/push-notifications' },
                // { name: 'CMS Pages', icon: FileText, path: '/admin/cms-pages' },
                { name: 'Banners & Ads', icon: Image, path: '/admin/banners' },
                { name: 'FAQ Management', icon: HelpCircle, path: '/admin/faq' },
            ],
        },
        {
            title: 'SETTINGS',
            items: [
                { name: 'App Settings', icon: Settings, path: '/admin/app-settings' },
                // { name: 'Feature Management', icon: Sliders, path: '/admin/feature-management' },
                // { name: 'Languages', icon: Globe, path: '/admin/languages' },
                { name: 'Admin Users', icon: UserCog, path: '/admin/admin-users' },
                { name: 'Activity Logs', icon: History, path: '/admin/activity-logs' },
            ],
        },
    ];

    return (
        <aside
            className={`fixed lg:static top-16 lg:top-0 bottom-0 left-0 z-30 shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-xs h-[calc(100vh-64px)] lg:h-full ${collapsed ? 'w-20' : 'w-64'
                } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
            {/* COLLAPSE / EXPAND FLOATING TOGGLE BUTTON */}
            <button
                onClick={toggleCollapse}
                title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                className="absolute -right-3.5 top-5 z-30 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 text-gray-600 transition-all hover:scale-110 cursor-pointer"
                style={{ color: COLORS.pink }}
            >
                {collapsed ? <ChevronRight className="w-4 h-4 stroke-[2.5]" /> : <ChevronLeft className="w-4 h-4 stroke-[2.5]" />}
            </button>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide overscroll-contain"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* MAIN DASHBOARD BUTTON */}
                <div>
                    <button
                        ref={isDashboardActive ? activeButtonRef : null}
                        onClick={() => handleItemClick('Dashboard', '/admin/dashboard')}
                        title={collapsed ? 'Dashboard' : ''}
                        className={`w-full flex items-center ${collapsed ? 'justify-center px-1' : 'justify-between px-3'
                            } py-2 rounded-2xl text-xs font-semibold transition-all duration-200 group ${isDashboardActive
                                ? 'bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] font-extrabold border border-[#FF2D72]/20 shadow-xs'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 ${isDashboardActive
                                    ? 'bg-[#FF2D72] text-white shadow-md shadow-pink-500/30'
                                    : 'bg-pink-50 text-[#FF2D72] border border-pink-100'
                                    }`}
                            >
                                <LayoutDashboard className="w-4.5 h-4.5 stroke-[2.2]" />
                            </div>
                            {!collapsed && <span className="tracking-tight text-[13.5px] font-bold">Dashboard</span>}
                        </div>
                        {!collapsed && (
                            <ChevronRight
                                className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isDashboardActive ? 'text-[#FF2D72]' : 'text-gray-300 opacity-60'
                                    }`}
                            />
                        )}
                    </button>
                </div>

                {/* NAV SECTIONS */}
                {navSections.map((section, idx) => (
                    <div key={idx} className="space-y-1 pt-1">
                        {!collapsed ? (
                            <div className="flex items-center justify-between px-3 mb-1">
                                <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                                    {section.title}
                                </h3>
                            </div>
                        ) : (
                            <div className="border-t border-gray-100 my-2"></div>
                        )}
                        {section.items.map((item, itemIdx) => {
                            const Icon = item.icon;
                            const isActive = (item.path && (currentPath === item.path || currentPath.endsWith(item.path))) || activeTab === item.name;
                            return (
                                <button
                                    key={itemIdx}
                                    ref={isActive ? activeButtonRef : null}
                                    onClick={() => handleItemClick(item.name, item.path)}
                                    title={collapsed ? item.name : ''}
                                    className={`w-full flex items-center ${collapsed ? 'justify-center px-1' : 'justify-between px-3'
                                        } py-2 rounded-2xl text-xs font-semibold transition-all duration-200 group ${isActive
                                            ? 'bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] font-extrabold border border-[#FF2D72]/20 shadow-xs'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 ${isActive
                                                ? 'bg-[#FF2D72] text-white shadow-md shadow-pink-500/30'
                                                : 'bg-gray-100/80 text-gray-500 group-hover:bg-pink-50 group-hover:text-[#FF2D72]'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 stroke-[2.2]" />
                                        </div>
                                        {!collapsed && <span className="text-[13.5px] font-bold tracking-tight">{item.name}</span>}
                                    </div>

                                    {!collapsed && (
                                        <div className="flex items-center gap-1.5">
                                            {item.badge && (
                                                <span
                                                    className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs"
                                                    style={{ backgroundColor: item.badgeColor || COLORS.pink }}
                                                >
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.count && !item.badge && (
                                                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                                                    {item.count}
                                                </span>
                                            )}
                                            <ChevronRight
                                                className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-[#FF2D72]' : 'text-gray-300 opacity-60'
                                                    }`}
                                            />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </aside>
    );
}
