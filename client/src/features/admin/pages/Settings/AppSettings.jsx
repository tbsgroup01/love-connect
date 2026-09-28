import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  CreditCard,
  Key,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Server,
  Database,
  Cloud,
  Layers,
  Sparkles
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

export default function AppSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('App Settings');
  const [currentSection, setCurrentSection] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings State
  const [general, setGeneral] = useState({
    appName: 'LoveConnect',
    tagline: 'Meet Real People • Find Meaningful Connections',
    contactEmail: 'support@loveconnect.com',
    contactPhone: '+91 98765 43210',
    currency: 'INR (₹)',
    timezone: 'Asia/Kolkata (IST +5:30)',
    supportUrl: 'https://loveconnect.com/help',
  });

  const [security, setSecurity] = useState({
    minPasswordLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    enable2FA: true,
    sessionTimeoutMins: 60,
    maxLoginAttempts: 5,
    autoBanSuspiciousIps: true,
  });

  const [notifications, setNotifications] = useState({
    emailProvider: 'SendGrid',
    emailApiKey: 'SG.893jfe902389fdsklfjk290fjds',
    senderEmail: 'noreply@loveconnect.com',
    smsGateway: 'Twilio',
    smsApiKey: 'AC_902389fjdk209fj239fjds09',
    fcmServerKey: 'AAAA9283jfkd:APA91bF9023fjdlks...',
    enablePushAlerts: true,
  });

  const [payments, setPayments] = useState({
    testMode: false,
    razorpayKeyId: 'rzp_live_89023489jfksl23',
    razorpaySecret: '••••••••••••••••••••••••••••',
    stripePublishableKey: 'pk_live_51M02389fjkd239fj',
    stripeSecretKey: '••••••••••••••••••••••••••••',
    defaultPaymentGateway: 'Razorpay',
    currencyCode: 'INR',
  });

  const [apiKeys, setApiKeys] = useState({
    googleMapsKey: 'AIzaSyA89023_Fjdksl290fjds90-fjd',
    firebaseProjectId: 'loveconnect-prod-9812',
    cloudStorageBucket: 'r2-storage.loveconnect.app/profiles',
    socketServerUrl: 'https://socket.loveconnect.app',
    sentryDsn: 'https://902389fj@o9023.ingest.sentry.io/45023',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const sections = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications', label: 'Notifications Setup', icon: Bell },
    { id: 'payments', label: 'Payment Gateways', icon: CreditCard },
    { id: 'api', label: 'API Integrations', icon: Key },
  ];

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans select-none text-[#17151A] overflow-hidden">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar activeTab="App Settings" setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PAGE TITLE & ACTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.dark }}>
                App Settings
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Configure brand identities, security thresholds, payment processors, and backend cloud API keys
              </p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer"
              style={{ backgroundColor: COLORS.pink }}
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save System Settings</span>
            </button>
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
                <Server className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Active Environment</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">v2.4.0 Prod</span>
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
                <CreditCard className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Payment Processors</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">2 Live (UPI/Card)</span>
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
                <Cloud className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Cloud Sync Status</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">99.98% Uptime</span>
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
                <Shield className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-gray-500 block truncate">Security Shield</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">Active & Enforced</span>
              </div>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>All platform settings updated and synced to production clusters!</span>
            </div>
          )}

          {/* SECTION SWITCHER TABS */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = currentSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setCurrentSection(sec.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'text-white shadow-xs'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: isActive ? COLORS.pink : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN FORM CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
            {/* GENERAL SETTINGS */}
            {currentSection === 'general' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">General Brand & Application Info</h3>
                  <p className="text-xs text-gray-400">Core brand metadata exposed to mobile applications and websites.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Application Name</label>
                    <input
                      type="text"
                      value={general.appName}
                      onChange={(e) => setGeneral({ ...general, appName: e.target.value })}
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Brand Tagline</label>
                    <input
                      type="text"
                      value={general.tagline}
                      onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Support Contact Email</label>
                    <input
                      type="email"
                      value={general.contactEmail}
                      onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Support Phone Hotline</label>
                    <input
                      type="text"
                      value={general.contactPhone}
                      onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Default Base Currency</label>
                    <select
                      value={general.currency}
                      onChange={(e) => setGeneral({ ...general, currency: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>AED (د.إ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Application Timezone</label>
                    <select
                      value={general.timezone}
                      onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option>Asia/Kolkata (IST +5:30)</option>
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>America/New_York (EST -5:00)</option>
                      <option>Europe/London (GMT +0:00)</option>
                      <option>Asia/Dubai (GST +4:00)</option>
                    </select>
                  </div>
                </div>
              </form>
            )}

            {/* SECURITY SETTINGS */}
            {currentSection === 'security' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Security & Authentication Policies</h3>
                  <p className="text-xs text-gray-400">Rules governing account passwords, 2FA, and automated threat defense.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Minimum Password Length</label>
                    <input
                      type="number"
                      value={security.minPasswordLength}
                      onChange={(e) => setSecurity({ ...security, minPasswordLength: Number(e.target.value) })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Session Inactivity Timeout (Minutes)</label>
                    <input
                      type="number"
                      value={security.sessionTimeoutMins}
                      onChange={(e) => setSecurity({ ...security, sessionTimeoutMins: Number(e.target.value) })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Max Failed Login Attempts Before Lock</label>
                    <input
                      type="number"
                      value={security.maxLoginAttempts}
                      onChange={(e) => setSecurity({ ...security, maxLoginAttempts: Number(e.target.value) })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.enable2FA}
                      onChange={(e) => setSecurity({ ...security, enable2FA: e.target.checked })}
                      className="w-4 h-4 rounded text-[#FF2D72] focus:ring-[#FF2D72]"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">Enforce Two-Factor Authentication (2FA) for Admins</span>
                      <span className="text-[11px] text-gray-400">Requires OTP or Authenticator app for dashboard login.</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.autoBanSuspiciousIps}
                      onChange={(e) => setSecurity({ ...security, autoBanSuspiciousIps: e.target.checked })}
                      className="w-4 h-4 rounded text-[#FF2D72] focus:ring-[#FF2D72]"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">Automated IP Rate-Limiting & Bot Defense</span>
                      <span className="text-[11px] text-gray-400">Auto-ban IP addresses exceeding 60 requests per minute.</span>
                    </div>
                  </label>
                </div>
              </form>
            )}

            {/* NOTIFICATION SETTINGS */}
            {currentSection === 'notifications' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Notification Delivery Services</h3>
                  <p className="text-xs text-gray-400">Configure credentials for transactional emails, SMS OTP, and push alerts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Provider Gateway</label>
                    <select
                      value={notifications.emailProvider}
                      onChange={(e) => setNotifications({ ...notifications, emailProvider: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option>SendGrid</option>
                      <option>Amazon SES</option>
                      <option>Mailgun</option>
                      <option>SMTP Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Sender Email Address</label>
                    <input
                      type="email"
                      value={notifications.senderEmail}
                      onChange={(e) => setNotifications({ ...notifications, senderEmail: e.target.value })}
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email API Secret Key</label>
                    <input
                      type="password"
                      value={notifications.emailApiKey}
                      onChange={(e) => setNotifications({ ...notifications, emailApiKey: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">SMS OTP Gateway</label>
                    <select
                      value={notifications.smsGateway}
                      onChange={(e) => setNotifications({ ...notifications, smsGateway: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option>Twilio</option>
                      <option>MSG91</option>
                      <option>AWS SNS</option>
                      <option>Fast2SMS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">SMS Auth Token / Account SID</label>
                    <input
                      type="password"
                      value={notifications.smsApiKey}
                      onChange={(e) => setNotifications({ ...notifications, smsApiKey: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Firebase Cloud Messaging (FCM) Key</label>
                    <input
                      type="password"
                      value={notifications.fcmServerKey}
                      onChange={(e) => setNotifications({ ...notifications, fcmServerKey: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* PAYMENT SETTINGS */}
            {currentSection === 'payments' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">Payment Processors & Gateway Keys</h3>
                    <p className="text-xs text-gray-400">Configure Razorpay and Stripe API keys for subscriptions and boost payments.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-600">Sandbox Test Mode</span>
                    <button
                      type="button"
                      onClick={() => setPayments({ ...payments, testMode: !payments.testMode })}
                      className={`w-11 h-6 rounded-full p-1 transition-colors ${
                        payments.testMode ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          payments.testMode ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-extrabold ${payments.testMode ? 'text-amber-600' : 'text-green-600'}`}>
                      {payments.testMode ? 'Test Mode' : 'Live Production'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Razorpay Key ID</label>
                    <input
                      type="text"
                      value={payments.razorpayKeyId}
                      onChange={(e) => setPayments({ ...payments, razorpayKeyId: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Razorpay Key Secret</label>
                    <input
                      type="password"
                      value={payments.razorpaySecret}
                      onChange={(e) => setPayments({ ...payments, razorpaySecret: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Stripe Publishable Key</label>
                    <input
                      type="text"
                      value={payments.stripePublishableKey}
                      onChange={(e) => setPayments({ ...payments, stripePublishableKey: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Stripe Secret Key</label>
                    <input
                      type="password"
                      value={payments.stripeSecretKey}
                      onChange={(e) => setPayments({ ...payments, stripeSecretKey: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* API SETTINGS */}
            {currentSection === 'api' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Third-Party Cloud API Keys</h3>
                  <p className="text-xs text-gray-400">Maps, Cloudflare R2 / S3 storage, and real-time WebSocket connection strings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Google Maps Geocoding & Places API Key</label>
                    <input
                      type="text"
                      value={apiKeys.googleMapsKey}
                      onChange={(e) => setApiKeys({ ...apiKeys, googleMapsKey: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Firebase Project ID</label>
                    <input
                      type="text"
                      value={apiKeys.firebaseProjectId}
                      onChange={(e) => setApiKeys({ ...apiKeys, firebaseProjectId: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Cloudflare R2 / S3 Storage Endpoint</label>
                    <input
                      type="text"
                      value={apiKeys.cloudStorageBucket}
                      onChange={(e) => setApiKeys({ ...apiKeys, cloudStorageBucket: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Real-Time Socket.IO Cluster URL</label>
                    <input
                      type="text"
                      value={apiKeys.socketServerUrl}
                      onChange={(e) => setApiKeys({ ...apiKeys, socketServerUrl: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Sentry Error Tracking DSN</label>
                    <input
                      type="text"
                      value={apiKeys.sentryDsn}
                      onChange={(e) => setApiKeys({ ...apiKeys, sentryDsn: e.target.value })}
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
