import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  KeyRound,
  Shield,
  CreditCard,
  Headphones,
  FileCheck
} from 'lucide-react';
import AdminNavbar from '../../components/Navbar';
import AdminSidebar from '../../components/Sidebar';

// Premium Dating App Theme Palette
const PALETTE = {
  pink: '#FF2D72',
  lightPink: '#FFE7F0',
  purple: '#7C3AED',
  dark: '#17151A',
  white: '#FFFFFF',
  background: '#FAFAFC',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
};

// Role Configuration based on requirements
const ROLE_CONFIG = {
  'Super Admin': {
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    borderColor: '#DDD6FE',
    icon: ShieldCheck,
    access: 'Full access to all system features, settings, & user management.',
    permissions: ['Full Access', 'System Settings', 'Role Management', 'Financial Access', 'Data Export']
  },
  'Moderator': {
    color: '#FF2D72',
    bgColor: '#FFE7F0',
    borderColor: '#FCCEE0',
    icon: ShieldAlert,
    access: 'Users + reports + verification.',
    permissions: ['Manage Users', 'Review Reports', 'Verify Profiles', 'Ban/Unban Users']
  },
  'Support Admin': {
    color: '#0EA5E9',
    bgColor: '#E0F2FE',
    borderColor: '#BAE6FD',
    icon: Headphones,
    access: 'Users + support tickets.',
    permissions: ['Manage Users', 'View Support Tickets', 'Resolve Tickets', 'User Messaging']
  },
  'Finance Admin': {
    color: '#10B981',
    bgColor: '#D1FAE5',
    borderColor: '#A7F3D0',
    icon: CreditCard,
    access: 'Subscriptions + transactions + revenue.',
    permissions: ['Subscriptions', 'Transactions', 'Revenue Analytics', 'Refund Processing']
  }
};

export default function AdminUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Settings');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Moderator',
    status: 'Active'
  });

  // KPI Metrics
  const kpiCards = [
    {
      title: 'Total Admin Users',
      value: '14',
      bgColor: '#7C3AED',
      icon: Users,
    },
    {
      title: 'Super Admins',
      value: '3',
      bgColor: '#FF2D72',
      icon: ShieldCheck,
    },
    {
      title: 'Active Moderators',
      value: '6',
      bgColor: '#0EA5E9',
      icon: ShieldAlert,
    },
    {
      title: 'Support & Finance',
      value: '5',
      bgColor: '#10B981',
      icon: Headphones,
    },
  ];

  // Admin Users List Data
  const [adminUsersList, setAdminUsersList] = useState([
    {
      id: 'ADM-101',
      name: 'Alexander Wright',
      role: 'Super Admin',
      email: 'alexander.w@loveconnect.com',
      status: 'Active',
      lastLogin: 'Today, 02:45 PM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      createdDate: '10 Jan 2025'
    },
    {
      id: 'ADM-102',
      name: 'Sophia Chen',
      role: 'Moderator',
      email: 'sophia.chen@loveconnect.com',
      status: 'Active',
      lastLogin: 'Today, 11:20 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      createdDate: '15 Feb 2025'
    },
    {
      id: 'ADM-103',
      name: 'Marcus Vance',
      role: 'Finance Admin',
      email: 'marcus.vance@loveconnect.com',
      status: 'Active',
      lastLogin: 'Yesterday, 06:15 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      createdDate: '01 Mar 2025'
    },
    {
      id: 'ADM-104',
      name: 'Elena Rostova',
      role: 'Support Admin',
      email: 'elena.r@loveconnect.com',
      status: 'Inactive',
      lastLogin: '20 Sep 2026',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      createdDate: '12 Apr 2025'
    },
    {
      id: 'ADM-105',
      name: 'David Miller',
      role: 'Moderator',
      email: 'david.m@loveconnect.com',
      status: 'Active',
      lastLogin: '27 Sep 2026, 09:30 AM',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      createdDate: '05 Jun 2025'
    }
  ]);

  // Actions handlers
  const handleDeleteUser = (id) => {
    setAdminUsersList(adminUsersList.filter(u => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
  };

  const handleOpenAddModal = () => {
    setFormData({ name: '', email: '', role: 'Moderator', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    const newUser = {
      id: `ADM-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      role: formData.role,
      email: formData.email,
      status: formData.status,
      lastLogin: 'Never',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`,
      createdDate: 'Just now'
    };
    setAdminUsersList([newUser, ...adminUsersList]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setAdminUsersList(adminUsersList.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    setIsEditModalOpen(false);
    if (selectedUser?.id === editingUser.id) {
      setSelectedUser({ ...selectedUser, ...formData });
    }
  };

  // Search & Filtered Admins
  const filteredAdmins = adminUsersList.filter((user) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search) ||
      user.id.toLowerCase().includes(search);

    if (roleFilter === 'All') return matchesSearch;
    return matchesSearch && user.role === roleFilter;
  });

  return (
    <div style={{ backgroundColor: PALETTE.background, color: PALETTE.dark }} className="h-screen font-sans flex flex-col overflow-hidden select-none">
      {/* TOP NAVBAR HEADER */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR NAVIGATION */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE HERO HEADER CARD */}
          <div className="relative overflow-hidden bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-300">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-gradient-to-br from-[#7C3AED]/15 to-[#FF2D72]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#FF2D72] flex items-center justify-center shadow-lg shadow-purple-500/20 text-white">
                  <ShieldCheck className="w-5.5 h-5.5 stroke-[2.2] fill-white/20" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
                    ADMIN USERS & ROLES
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Manage role-based access permissions, admin accounts, activity status & security protocols.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Admin User</span>
              </button>
            </div>
          </div>

          {/* ROLE ACCESS SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(ROLE_CONFIG).map(([roleName, cfg]) => {
              const RoleIcon = cfg.icon;
              const count = adminUsersList.filter(u => u.role === roleName).length;
              return (
                <div
                  key={roleName}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between border-t-4"
                  style={{ borderTopColor: cfg.color }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-gray-900 block">{roleName}</span>
                      <span className="text-[11px] font-bold text-gray-400 mt-0.5 block">{count} {count === 1 ? 'User' : 'Users'}</span>
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: cfg.color }}
                    >
                      <RoleIcon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-gray-500 mt-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    {cfg.access}
                  </p>
                </div>
              );
            })}
          </div>

          {/* MAIN ADMIN USERS TABLE */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* SEARCH & FILTER CONTROLS BAR */}
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Admin Name, Email or Role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50/80 border border-gray-200 text-xs rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF2D72] focus:bg-white transition-all text-gray-800 placeholder-gray-400 font-semibold"
                />
              </div>

              {/* Role Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['All', 'Super Admin', 'Moderator', 'Support Admin', 'Finance Admin'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setRoleFilter(tab)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      roleFilter === tab
                        ? 'bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] text-white shadow-md shadow-pink-500/20'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* TABLE GRID */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-black">
                    <th className="py-4 px-6">Admin Name</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Last Login</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin) => {
                      const roleConfig = ROLE_CONFIG[admin.role] || ROLE_CONFIG['Moderator'];
                      const RoleBadgeIcon = roleConfig.icon;

                      return (
                        <tr key={admin.id} className="hover:bg-[#FFE7F0]/20 transition-colors group">
                          {/* Column 1: Admin Name */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={admin.avatar}
                                alt={admin.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100 shadow-xs transition-transform group-hover:scale-105"
                              />
                              <div>
                                <span className="font-extrabold text-gray-900 text-xs block">{admin.name}</span>
                                <span className="text-[10px] font-semibold text-gray-400 block">{admin.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Column 2: Role */}
                          <td className="py-4 px-6">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border"
                              style={{
                                backgroundColor: roleConfig.bgColor,
                                color: roleConfig.color,
                                borderColor: roleConfig.borderColor
                              }}
                            >
                              <RoleBadgeIcon className="w-3 h-3" />
                              {admin.role}
                            </span>
                          </td>

                          {/* Column 3: Email */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 font-bold text-gray-700">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <span>{admin.email}</span>
                            </div>
                          </td>

                          {/* Column 4: Status */}
                          <td className="py-4 px-6">
                            {admin.status === 'Active' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                Inactive
                              </span>
                            )}
                          </td>

                          {/* Column 5: Last Login */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 font-bold text-gray-700">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              <span>{admin.lastLogin}</span>
                            </div>
                          </td>

                          {/* Column 6: Actions */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedUser(admin)}
                                className="p-2 rounded-xl text-gray-500 hover:text-[#FF2D72] hover:bg-[#FFE7F0]/40 transition-all cursor-pointer border border-gray-200"
                                title="View Admin Permissions"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(admin)}
                                className="p-2 rounded-xl text-gray-500 hover:text-[#7C3AED] hover:bg-purple-50 transition-all cursor-pointer border border-gray-200"
                                title="Edit Role & Details"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(admin.id)}
                                className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer border border-gray-200"
                                title="Remove Admin Access"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-gray-400 font-medium">
                        No admin users found matching filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* VIEW ADMIN DETAILS & ROLE PERMISSIONS MODAL */}
          {selectedUser && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />
                    <h3 className="text-base font-extrabold text-gray-900">Admin Account Profile</h3>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50/60 to-purple-50/60 border border-pink-100">
                  <img src={selectedUser.avatar} className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-md" />
                  <div>
                    <h4 className="font-black text-sm text-gray-900">{selectedUser.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold">{selectedUser.email}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        {selectedUser.role}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">ID: {selectedUser.id}</span>
                    </div>
                  </div>
                </div>

                {/* Permissions Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Role Access & Capabilities</h4>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 font-medium">
                    {ROLE_CONFIG[selectedUser.role]?.access}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {ROLE_CONFIG[selectedUser.role]?.permissions.map((perm, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-gray-900 hover:bg-black transition-colors"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ADD / EDIT ADMIN USER MODAL */}
          {(isAddModalOpen || isEditModalOpen) && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#FF2D72]" />
                    <h3 className="text-base font-extrabold text-gray-900">
                      {isAddModalOpen ? 'Create New Admin User' : 'Edit Admin Role & Access'}
                    </h3>
                  </div>
                  <button
                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                    className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={isAddModalOpen ? handleSaveAdd : handleSaveEdit} className="space-y-4 text-xs font-semibold text-gray-700">
                  <div>
                    <label className="block mb-1 text-gray-600">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-600">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah.j@loveconnect.com"
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-600">Assign Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-900"
                    >
                      <option value="Super Admin">Super Admin (Full access)</option>
                      <option value="Moderator">Moderator (Users + reports + verification)</option>
                      <option value="Support Admin">Support Admin (Users + support tickets)</option>
                      <option value="Finance Admin">Finance Admin (Subscriptions + transactions + revenue)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-600">Account Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FF2D72] text-gray-900"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] shadow-md shadow-pink-500/20 hover:opacity-95 transition-all"
                    >
                      {isAddModalOpen ? 'Create Admin Account' : 'Save Access Changes'}
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
