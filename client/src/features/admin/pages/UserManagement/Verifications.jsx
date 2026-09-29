import React, { useState } from 'react';
import {
    FileText,
    Clock,
    ShieldCheck,
    XCircle,
    Download,
    Search,
    Filter,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Shield,
    Smartphone,
    Mail,
    Calendar,
    Check,
    X,
    FileCode,
    User,
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

export default function Verifications() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Verifications');
    const [selectedTabFilter, setSelectedTabFilter] = useState('All');
    const [selectedVerification, setSelectedVerification] = useState(null);

    // Top KPI Metric Cards matching reference UI
    const kpiCards = [
        {
            title: 'Total Requests',
            value: '1,256',
            bgColor: '#FF2D72',
            icon: FileText,
        },
        {
            title: 'Pending Review',
            value: '248',
            bgColor: '#3B82F6',
            icon: Clock,
        },
        {
            title: 'Verified',
            value: '892',
            bgColor: '#22C55E',
            icon: ShieldCheck,
        },
        {
            title: 'Rejected',
            value: '116',
            bgColor: '#EF4444',
            icon: XCircle,
        },
    ];

    // Mock Verifications Data with exact items and details matching the reference UI
    const verificationsData = [
        {
            id: 1,
            name: 'Aaradhya Sharma',
            email: 'aaradhya@gmail.com',
            verificationType: 'Identity Verification',
            verificationTypeIcon: Shield,
            verificationTypeColor: '#3B82F6',
            submittedDate: '15 Sep 2026',
            submittedTime: '10:24 AM',
            status: 'Pending',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
            idNumber: '1234 5678 9012',
            dob: '10/03/2000',
            gender: 'Female',
            documentCount: 4,
            documents: [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 2,
        },
        {
            id: 2,
            name: 'Rohit Mehta',
            email: 'rohitm@gmail.com',
            verificationType: 'Photo Verification',
            verificationTypeIcon: User,
            verificationTypeColor: '#22C55E',
            submittedDate: '15 Sep 2026',
            submittedTime: '09:18 AM',
            status: 'Pending',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
            idNumber: '9876 5432 1098',
            dob: '14/07/1997',
            gender: 'Male',
            documentCount: 2,
            documents: [
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 1,
        },
        {
            id: 3,
            name: 'Priya Singh',
            email: 'priya@gmail.com',
            verificationType: 'Phone Verification',
            verificationTypeIcon: Smartphone,
            verificationTypeColor: '#F59E0B',
            submittedDate: '14 Sep 2026',
            submittedTime: '05:42 PM',
            status: 'Verified',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            idNumber: '5544 3322 1100',
            dob: '22/11/2001',
            gender: 'Female',
            documentCount: 1,
            documents: [
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 0,
        },
        {
            id: 4,
            name: 'Karan Verma',
            email: 'karan@gmail.com',
            verificationType: 'Email Verification',
            verificationTypeIcon: Mail,
            verificationTypeColor: '#7C3AED',
            submittedDate: '14 Sep 2026',
            submittedTime: '03:21 PM',
            status: 'Verified',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
            idNumber: '4433 2211 0099',
            dob: '05/01/1995',
            gender: 'Male',
            documentCount: 1,
            documents: [
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 0,
        },
        {
            id: 5,
            name: 'Neha Patel',
            email: 'neha@gmail.com',
            verificationType: 'Identity Verification',
            verificationTypeIcon: Shield,
            verificationTypeColor: '#3B82F6',
            submittedDate: '14 Sep 2026',
            submittedTime: '11:12 AM',
            status: 'Pending',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
            idNumber: '8877 6655 4433',
            dob: '18/08/1999',
            gender: 'Female',
            documentCount: 3,
            documents: [
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 1,
        },
        {
            id: 6,
            name: 'Vikram Singh',
            email: 'vikram@gmail.com',
            verificationType: 'Photo Verification',
            verificationTypeIcon: User,
            verificationTypeColor: '#22C55E',
            submittedDate: '13 Sep 2026',
            submittedTime: '09:36 PM',
            status: 'Rejected',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
            idNumber: '3322 1100 9988',
            dob: '12/12/1996',
            gender: 'Male',
            documentCount: 2,
            documents: [
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 0,
        },
        {
            id: 7,
            name: 'Riya Malhotra',
            email: 'riya@gmail.com',
            verificationType: 'Identity Verification',
            verificationTypeIcon: Shield,
            verificationTypeColor: '#3B82F6',
            submittedDate: '13 Sep 2026',
            submittedTime: '12:24 PM',
            status: 'Verified',
            avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
            idNumber: '7766 5544 3322',
            dob: '30/04/2002',
            gender: 'Female',
            documentCount: 5,
            documents: [
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 3,
        },
        {
            id: 8,
            name: 'Amit Kumar',
            email: 'amit@gmail.com',
            verificationType: 'Phone Verification',
            verificationTypeIcon: Smartphone,
            verificationTypeColor: '#F59E0B',
            submittedDate: '12 Sep 2026',
            submittedTime: '06:18 PM',
            status: 'Pending',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
            idNumber: '6655 4433 2211',
            dob: '15/09/1994',
            gender: 'Male',
            documentCount: 1,
            documents: [
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 0,
        },
        {
            id: 9,
            name: 'Sneha Reddy',
            email: 'sneha@gmail.com',
            verificationType: 'Email Verification',
            verificationTypeIcon: Mail,
            verificationTypeColor: '#7C3AED',
            submittedDate: '12 Sep 2026',
            submittedTime: '04:50 PM',
            status: 'Verified',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
            idNumber: '2211 0099 8877',
            dob: '25/02/1998',
            gender: 'Female',
            documentCount: 1,
            documents: [
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 0,
        },
        {
            id: 10,
            name: 'Pooja Verma',
            email: 'pooja@gmail.com',
            verificationType: 'Photo Verification',
            verificationTypeIcon: User,
            verificationTypeColor: '#22C55E',
            submittedDate: '11 Sep 2026',
            submittedTime: '02:14 PM',
            status: 'Pending',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
            idNumber: '1100 9988 7766',
            dob: '08/06/2000',
            gender: 'Female',
            documentCount: 3,
            documents: [
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
            ],
            mediaPreviews: [
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
            ],
            extraMediaCount: 2,
        },
    ];

    const currentSelected = selectedVerification || verificationsData[0];
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);

    // Filter items based on active pill
    const filteredData = verificationsData.filter((item) => {
        if (selectedTabFilter === 'All') return true;
        return item.status.toLowerCase() === selectedTabFilter.toLowerCase();
    });

    return (
        <div style={{ backgroundColor: COLORS.background, color: COLORS.dark }} className="h-screen font-sans flex flex-col overflow-hidden">
            {/* TOP NAVBAR HEADER */}
            <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-1 overflow-hidden relative">
                {/* SIDEBAR NAVIGATION */}
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
                    {/* PAGE TITLE & EXPORT ACTION HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                                Verifications
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                Manage and review user verification requests
                            </p>
                        </div>
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto"
                            style={{ backgroundColor: COLORS.pink }}
                        >
                            <Download className="w-4 h-4" />
                            <span>Export CSV</span>
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
                                        <span className="text-[13px] font-semibold text-gray-500 block truncate">{kpi.title}</span>
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
                        {/* VERIFICATIONS TABLE & INTEGRATED FILTERS (2 Cols wide on XL) */}
                        <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
                            {/* Status Filter Pills */}
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
                                {[
                                    { label: 'All Requests', count: '1,256', key: 'All' },
                                    { label: 'Pending', count: '248', key: 'Pending' },
                                    { label: 'Verified', count: '892', key: 'Verified' },
                                    { label: 'Rejected', count: '116', key: 'Rejected' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setSelectedTabFilter(tab.key)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${selectedTabFilter === tab.key
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
                                <div className="relative w-full md:w-80">
                                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email or phone..."
                                        className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-700 placeholder-gray-400"
                                    />
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                                    <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                                        <span className="text-xs font-medium text-gray-400 hidden sm:inline">Verification Type</span>
                                        <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                                            <option>All Types</option>
                                            <option>Identity Verification</option>
                                            <option>Photo Verification</option>
                                            <option>Phone Verification</option>
                                            <option>Email Verification</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                                        <span className="text-xs font-medium text-gray-400 hidden sm:inline">Status</span>
                                        <select className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none w-full md:w-auto">
                                            <option>All Status</option>
                                            <option>Pending</option>
                                            <option>Verified</option>
                                            <option>Rejected</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                                        <span className="text-xs font-medium text-gray-400 hidden sm:inline">Date Range</span>
                                        <button className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-500 rounded-xl px-3 py-2.5 flex items-center gap-2 focus:outline-none w-full md:w-auto cursor-pointer">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            <span>Select Date</span>
                                        </button>
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

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs min-w-[700px]">
                                <thead>
                                    <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                                        <th className="pb-3 w-8">
                                            <input type="checkbox" className="rounded text-[#FF2D72] focus:ring-0" />
                                        </th>
                                        <th className="pb-3 font-semibold">User</th>
                                        <th className="pb-3 font-semibold">Verification Type</th>
                                        <th className="pb-3 font-semibold">Submitted Date</th>
                                        <th className="pb-3 font-semibold">Document / Media</th>
                                        <th className="pb-3 font-semibold">Status</th>
                                        <th className="pb-3 font-semibold text-center">Action</th>
                                        <th className="pb-3 w-6"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredData.map((item) => {
                                        const isSelected = currentSelected.id === item.id;
                                        const TypeIcon = item.verificationTypeIcon;
                                        return (
                                            <tr
                                                key={item.id}
                                                onClick={() => {
                                                    setSelectedVerification(item);
                                                    setActiveMediaIndex(0);
                                                }}
                                                className={`cursor-pointer transition-colors ${isSelected ? 'bg-pink-50/50' : 'hover:bg-gray-50/50'
                                                    }`}
                                            >
                                                <td className="py-3.5">
                                                    <input type="checkbox" className="rounded text-[#FF2D72] focus:ring-0" />
                                                </td>
                                                <td className="py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={item.avatar}
                                                            alt={item.name}
                                                            className="w-9 h-9 rounded-full object-cover border"
                                                            style={{ borderColor: isSelected ? COLORS.pink : '#E5E7EB' }}
                                                        />
                                                        <div>
                                                            <div className="font-bold text-gray-900">{item.name}</div>
                                                            <div className="text-gray-400 text-[11px]">{item.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-6 h-6 rounded-md flex items-center justify-center text-white shrink-0"
                                                            style={{ backgroundColor: item.verificationTypeColor }}
                                                        >
                                                            <TypeIcon className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="font-semibold text-gray-700 text-xs">
                                                            {item.verificationType}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3.5">
                                                    <div className="font-semibold text-gray-700">{item.submittedDate}</div>
                                                    <div className="text-gray-400 text-[10px]">{item.submittedTime}</div>
                                                </td>
                                                <td className="py-3.5">
                                                    <div className="flex items-center gap-1.5">
                                                        {item.mediaPreviews.map((imgUrl, mIdx) => (
                                                            <img
                                                                key={mIdx}
                                                                src={imgUrl}
                                                                alt="Media preview"
                                                                className="w-8 h-8 rounded-lg object-cover border border-gray-200"
                                                            />
                                                        ))}
                                                        {item.extraMediaCount > 0 && (
                                                            <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-500 font-bold text-[10px] flex items-center justify-center border border-gray-200">
                                                                +{item.extraMediaCount}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3.5">
                                                    <span
                                                        className="px-3 py-1 rounded-full font-bold text-[10px] inline-block"
                                                        style={{
                                                            backgroundColor:
                                                                item.status === 'Verified'
                                                                    ? '#DCFCE7'
                                                                    : item.status === 'Pending'
                                                                        ? '#FEF3C7'
                                                                        : '#FEE2E2',
                                                            color:
                                                                item.status === 'Verified'
                                                                    ? '#16A34A'
                                                                    : item.status === 'Pending'
                                                                        ? '#D97706'
                                                                        : '#EF4444',
                                                        }}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 text-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedVerification(item);
                                                            setActiveMediaIndex(0);
                                                        }}
                                                        className="px-4 py-1.5 rounded-lg font-bold text-[11px] transition-all shadow-2xs"
                                                        style={{
                                                            backgroundColor:
                                                                item.status === 'Pending'
                                                                    ? COLORS.pink
                                                                    : COLORS.lightPink,
                                                            color:
                                                                item.status === 'Pending'
                                                                    ? COLORS.white
                                                                    : COLORS.pink,
                                                        }}
                                                    >
                                                        {item.status === 'Pending' ? 'Review' : 'View'}
                                                    </button>
                                                </td>
                                                <td className="py-3.5 text-right">
                                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            </div>

                            {/* Pagination matching reference UI */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400 mt-2">
                                <span>Showing 1 to 10 of 1,256 requests</span>
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
                                        <button className="w-7 h-6 rounded-lg font-bold text-gray-600 text-xs flex items-center justify-center hover:bg-gray-100">
                                            126
                                        </button>
                                        <button className="p-1 rounded-lg hover:bg-gray-100">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT VERIFICATION PREVIEW PANEL */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-5 h-fit sticky top-6">
                            <div>
                                <h2 className="text-base font-bold mb-4" style={{ color: COLORS.dark }}>
                                    Verification Preview
                                </h2>

                                {/* ID Card / Document Graphic Mockup (Indian Government Aadhaar Card Style as in reference image) */}
                                <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-3.5 mb-3 text-gray-800">
                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-amber-600">
                                                🏛️
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-extrabold uppercase tracking-tight text-gray-700 leading-none">
                                                    भारत सरकार
                                                </div>
                                                <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-0.5">
                                                    GOVERNMENT OF INDIA
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <img
                                            src={currentSelected.avatar}
                                            alt="ID Photo"
                                            className="w-16 h-20 rounded-md object-cover border border-gray-300"
                                        />
                                        <div className="flex-1 text-[11px] space-y-1">
                                            <div className="font-extrabold text-gray-900 leading-tight">
                                                {currentSelected.name}
                                            </div>
                                            <div className="text-[10px] text-gray-600">
                                                <span className="font-semibold text-gray-400">DOB: </span>
                                                {currentSelected.dob}
                                            </div>
                                            <div className="text-[10px] text-gray-600">
                                                <span className="font-semibold text-gray-400">Gender: </span>
                                                {currentSelected.gender}
                                            </div>
                                        </div>
                                        {/* QR Code graphic representation */}
                                        <div className="w-12 h-12 bg-gray-900 rounded p-1 flex flex-wrap gap-0.5 shrink-0">
                                            <div className="w-2.5 h-2.5 bg-white"></div>
                                            <div className="w-2.5 h-2.5 bg-transparent"></div>
                                            <div className="w-2.5 h-2.5 bg-white"></div>
                                            <div className="w-2.5 h-2.5 bg-white"></div>
                                            <div className="w-2.5 h-2.5 bg-white"></div>
                                            <div className="w-2.5 h-2.5 bg-transparent"></div>
                                            <div className="w-2.5 h-2.5 bg-transparent"></div>
                                            <div className="w-2.5 h-2.5 bg-white"></div>
                                            <div className="w-2.5 h-2.5 bg-white"></div>
                                        </div>
                                    </div>

                                    {/* ID Number */}
                                    <div className="mt-3 pt-2 border-t border-dashed border-gray-200 text-center font-extrabold text-sm tracking-widest text-gray-900">
                                        {currentSelected.idNumber}
                                    </div>
                                </div>

                                {/* Document Thumbnails */}
                                <div className="grid grid-cols-4 gap-2 mb-5">
                                    {currentSelected.documents.map((docImg, dIdx) => (
                                        <div
                                            key={dIdx}
                                            onClick={() => setActiveMediaIndex(dIdx)}
                                            className={`relative rounded-xl overflow-hidden cursor-pointer border-2 h-14 ${activeMediaIndex === dIdx
                                                ? 'border-[#FF2D72]'
                                                : 'border-transparent'
                                                }`}
                                        >
                                            <img
                                                src={docImg}
                                                alt="Doc thumb"
                                                className="w-full h-full object-cover"
                                            />
                                            {dIdx === currentSelected.documents.length - 1 && currentSelected.extraMediaCount > 0 && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-extrabold text-xs">
                                                    +{currentSelected.extraMediaCount}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* User Information Details */}
                                <div className="space-y-3.5 text-xs">
                                    <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                                        User Information
                                    </h4>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={currentSelected.avatar}
                                                alt={currentSelected.name}
                                                className="w-10 h-10 rounded-full object-cover border"
                                            />
                                            <div>
                                                <div className="font-bold text-gray-900 text-sm">{currentSelected.name}</div>
                                                <div className="text-gray-400 text-xs">{currentSelected.email}</div>
                                            </div>
                                        </div>
                                        <span
                                            className="px-2.5 py-1 rounded-md font-bold text-[10px]"
                                            style={{
                                                backgroundColor:
                                                    currentSelected.status === 'Verified'
                                                        ? '#DCFCE7'
                                                        : currentSelected.status === 'Pending'
                                                            ? '#FEF3C7'
                                                            : '#FEE2E2',
                                                color:
                                                    currentSelected.status === 'Verified'
                                                        ? '#16A34A'
                                                        : currentSelected.status === 'Pending'
                                                            ? '#D97706'
                                                            : '#EF4444',
                                            }}
                                        >
                                            {currentSelected.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5 text-gray-700 font-medium pt-1">
                                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                            <Shield className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-[10px] block">Verification Type</span>
                                            <span className="font-semibold text-gray-800">{currentSelected.verificationType}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 text-gray-700 font-medium">
                                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-[10px] block">Submitted</span>
                                            <span className="font-semibold text-gray-800">
                                                {currentSelected.submittedDate}, {currentSelected.submittedTime}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 text-gray-700 font-medium">
                                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                            <FileCode className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-[10px] block">Documents</span>
                                            <span className="font-semibold text-gray-800">
                                                {currentSelected.documentCount} files uploaded
                                            </span>
                                        </div>
                                    </div>

                                    {/* Admin Notes Box */}
                                    <div className="pt-2">
                                        <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1.5">
                                            Admin Notes
                                        </h4>
                                        <textarea
                                            placeholder="Add notes about this verification..."
                                            rows={3}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:outline-none focus:border-[#FF2D72] resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons: Approve / Reject */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    className="flex-1 py-3 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                                    style={{ backgroundColor: COLORS.success }}
                                >
                                    <Check className="w-4 h-4 stroke-[3]" />
                                    <span>Approve</span>
                                </button>
                                <button
                                    className="flex-1 py-3 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-xs transition-all hover:opacity-90 cursor-pointer"
                                    style={{ backgroundColor: COLORS.danger }}
                                >
                                    <X className="w-4 h-4 stroke-[3]" />
                                    <span>Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
