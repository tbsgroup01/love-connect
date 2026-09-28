import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Download,
  Shield,
  UserX,
  ShieldCheck,
  CreditCard,
  Settings,
  FileText,
  Key,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar
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

const INITIAL_LOGS = [
  {
    id: 'LOG-8910',
    admin: { name: 'Aarav Malhotra', email: 'aarav@loveconnect.com', role: 'Super Admin', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
    action: 'Settings Change',
    actionBadge: 'Updated 2FA Policy',
    module: 'Settings',
    ip: '103.21.124.90 (Delhi, IN)',
    timestamp: '28 Sep 2026, 05:14 PM',
    details: 'Enforced Two-Factor Authentication for all Moderator & Finance accounts.',
    status: 'Success',
  },
  {
    id: 'LOG-8909',
    admin: { name: 'Riya Sen', email: 'riya@loveconnect.com', role: 'Moderator', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
    action: 'User Suspension',
    actionBadge: 'Banned USR-8921',
    module: 'User Management',
    ip: '49.36.18.204 (Mumbai, IN)',
    timestamp: '28 Sep 2026, 04:48 PM',
    details: 'Permanently banned user for impersonation and unsolicited commercial spam.',
    status: 'Warning',
  },
  {
    id: 'LOG-8908',
    admin: { name: 'Riya Sen', email: 'riya@loveconnect.com', role: 'Moderator', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
    action: 'Profile Verification',
    actionBadge: 'Approved USR-9044',
    module: 'Verification',
    ip: '49.36.18.204 (Mumbai, IN)',
    timestamp: '28 Sep 2026, 04:30 PM',
    details: 'Verified facial landmarks selfie matches passport identity document for Aaradhya S.',
    status: 'Success',
  },
  {
    id: 'LOG-8907',
    admin: { name: 'Vikram Mehta', email: 'vikram@loveconnect.com', role: 'Finance Admin', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80' },
    action: 'Payment Changes',
    actionBadge: 'Processed Refund',
    module: 'Subscription',
    ip: '122.161.45.12 (Bangalore, IN)',
    timestamp: '28 Sep 2026, 03:15 PM',
    details: 'Approved ₹999 refund for Transaction TXN-89012 (double billing request within 24h).',
    status: 'Success',
  },
  {
    id: 'LOG-8906',
    admin: { name: 'Aarav Malhotra', email: 'aarav@loveconnect.com', role: 'Super Admin', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
    action: 'Content Changes',
    actionBadge: 'Published Banner',
    module: 'Content',
    ip: '103.21.124.90 (Delhi, IN)',
    timestamp: '28 Sep 2026, 02:00 PM',
    details: 'Published "Virtual Blind Date Night" promotional banner for Friday swipe deck.',
    status: 'Success',
  },
  {
    id: 'LOG-8905',
    admin: { name: 'Kavita Rao', email: 'kavita@loveconnect.com', role: 'Support Admin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
    action: 'Admin Login',
    actionBadge: '2FA Authenticated',
    module: 'Security',
    ip: '182.73.12.98 (Hyderabad, IN)',
    timestamp: '28 Sep 2026, 01:22 PM',
    details: 'Successful administrator login via Chrome 128 on macOS.',
    status: 'Success',
  },
  {
    id: 'LOG-8904',
    admin: { name: 'Aarav Malhotra', email: 'aarav@loveconnect.com', role: 'Super Admin', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
    action: 'Subscription Changes',
    actionBadge: 'Created Plan',
    module: 'Subscription',
    ip: '103.21.124.90 (Delhi, IN)',
    timestamp: '27 Sep 2026, 06:10 PM',
    details: 'Modified quarterly plan pricing from ₹1,199 to ₹999 monsoon promotional tier.',
    status: 'Success',
  },
];

export default function ActivityLogs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Activity Logs');
  const [logs] = useState(INITIAL_LOGS);
  const [moduleFilter, setModuleFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const modules = ['All', 'Settings', 'User Management', 'Verification', 'Subscription', 'Content', 'Security'];

  const filteredLogs = logs.filter((log) => {
    const matchMod = moduleFilter === 'All' || log.module === moduleFilter;
    const matchSearch =
      log.admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchTerm.toLowerCase());
    return matchMod && matchSearch;
  });

  const getActionBadgeColor = (action) => {
    switch (action) {
      case 'User Suspension':
        return 'bg-red-100 text-red-700';
      case 'Profile Verification':
        return 'bg-green-100 text-green-700';
      case 'Payment Changes':
        return 'bg-emerald-100 text-emerald-700';
      case 'Settings Change':
        return 'bg-purple-100 text-purple-700';
      case 'Content Changes':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A]">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar activeTab="Activity Logs" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                  <History className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: COLORS.dark }}>
                  System Audit & Activity Logs
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE7F0] text-[#FF2D72]">
                  Immutable Ledger
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Real-time chronological audit trail of all staff logins, user suspensions, verifications, financial refunds, and configuration edits.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Exporting audit logs as CSV...')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-xs text-gray-700 hover:bg-gray-50 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* FILTER & SEARCH BAR */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {modules.map((mod) => (
                <button
                  key={mod}
                  onClick={() => setModuleFilter(mod)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    moduleFilter === mod
                      ? 'bg-[#FF2D72] text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-[#FF2D72]"
              />
            </div>
          </div>

          {/* LOGS TABLE */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                    <th className="py-3 px-3">Admin</th>
                    <th className="py-3 px-3">Action & Badge</th>
                    <th className="py-3 px-3">Module</th>
                    <th className="py-3 px-3">IP Address</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Event Summary</th>
                    <th className="py-3 px-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-pink-50/20 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={log.admin.avatar}
                            alt={log.admin.name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <span className="font-extrabold text-gray-900 block leading-tight">{log.admin.name}</span>
                            <span className="text-[10px] text-gray-400 font-semibold">{log.admin.role}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${getActionBadgeColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-gray-600">{log.module}</td>

                      <td className="py-3.5 px-3 font-mono text-[11px] text-gray-500">{log.ip}</td>

                      <td className="py-3.5 px-3 font-semibold text-gray-600 whitespace-nowrap">{log.timestamp}</td>

                      <td className="py-3.5 px-3 max-w-xs">
                        <p className="text-gray-700 text-xs line-clamp-1">{log.details}</p>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#FF2D72] hover:bg-[#FFE7F0] transition-colors"
                          title="Inspect Event"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400">
              <span>Showing 1 to {filteredLogs.length} of 1,420 logged events</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-lg hover:bg-gray-100">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-6 h-6 rounded-lg font-bold text-white text-xs bg-[#FF2D72] flex items-center justify-center">
                  1
                </button>
                <button className="p-1 rounded-lg hover:bg-gray-100">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* INSPECT LOG MODAL */}
          {selectedLog && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#FF2D72] uppercase tracking-wider">
                      Audit Log Details
                    </span>
                    <h3 className="text-base font-black text-gray-900 mt-0.5">{selectedLog.id}</h3>
                  </div>
                  <button onClick={() => setSelectedLog(null)} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100">
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                    <span className="text-gray-500 font-semibold">Initiator Admin:</span>
                    <span className="font-extrabold text-gray-900">
                      {selectedLog.admin.name} ({selectedLog.admin.email})
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                    <span className="text-gray-500 font-semibold">Action & Module:</span>
                    <span className="font-bold text-gray-900">
                      {selectedLog.action} in {selectedLog.module}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                    <span className="text-gray-500 font-semibold">Origin IP Address:</span>
                    <span className="font-mono text-gray-700">{selectedLog.ip}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                    <span className="text-gray-500 font-semibold">Server Timestamp:</span>
                    <span className="font-bold text-gray-900">{selectedLog.timestamp}</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl space-y-1">
                    <span className="text-gray-500 font-semibold block">Full Event Payload / Change:</span>
                    <p className="font-mono text-[11px] text-gray-800 bg-white p-2.5 rounded-xl border border-gray-200">
                      {selectedLog.details}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs"
                  >
                    Close
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
