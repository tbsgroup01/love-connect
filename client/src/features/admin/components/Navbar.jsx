import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Heart, Menu, ExternalLink } from 'lucide-react';
import logo from "../../../assets/loveconnect.png"

const COLORS = {
    pink: '#FF2D72',
    purple: '#7C3AED',
    dark: '#17151A',
};

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();

    return (
        <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
                {setSidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden cursor-pointer"
                        title="Toggle Navigation Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                )}

                <Link to="/admin/dashboard" className="flex items-center gap-2.5 cursor-pointer">
                    <img src={logo} alt="LoveConnect Logo" className="h-9 sm:h-11 w-auto object-contain" />
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#FFE7F0] text-[#FF2D72] text-[10px] font-extrabold uppercase tracking-wider">
                        Admin Portal
                    </span>
                </Link>
            </div>

            {/* Right Section: Notifications + Profile */}
            <div className="flex items-center gap-3 sm:gap-5">

                {/* Notifications */}
                <Link
                    to="/admin/reports"
                    className="relative cursor-pointer p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                    title="Moderation Alerts"
                >
                    <Bell className="w-5 h-5" />
                    <span
                        className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-white"
                        style={{ backgroundColor: COLORS.pink }}
                    >
                        5
                    </span>
                </Link>

                <div className="h-7 w-px bg-gray-200"></div>

                {/* Admin Profile Pill */}
                <Link
                    to="/admin/admin-users"
                    className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
                    title="Admin Account Settings"
                >
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Admin Avatar"
                        className="w-8 h-8 rounded-full object-cover border-2"
                        style={{ borderColor: COLORS.pink }}
                    />
                    <div className="hidden sm:block">
                        <div className="font-bold text-xs leading-tight" style={{ color: COLORS.dark }}>Priya Singh</div>
                        <div className="text-[10px] text-gray-400 font-medium">Super Admin</div>
                    </div>
                </Link>
            </div>
        </header>
    );
}
