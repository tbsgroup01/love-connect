import React, { useState } from 'react';
import {
  Settings,
  Bell,
  CreditCard,
  Save,
  CheckCircle2,
  Globe,
  Smartphone,
  Mail,
  Server,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import AdminNavbar from '../../components/Navbar';
import AdminSidebar from '../../components/Sidebar';



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

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const sections = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications Setup', icon: Bell },
    { id: 'payments', label: 'Payment Gateways', icon: CreditCard },
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
              <h1 className="text-2xl font-bold tracking-tight">
                App Settings
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Configure brand identities, security thresholds, payment processors, and backend cloud API keys
              </p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-all hover:opacity-90 self-start sm:self-auto cursor-pointer bg-[#FF2D72]"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save System Settings</span>
            </button>
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${isActive
                      ? 'bg-[#FF2D72] text-white shadow-xs'
                      : 'text-gray-500 hover:bg-gray-50'
                      }`}
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
                      className={`w-11 h-6 rounded-full p-1 transition-colors ${payments.testMode ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'
                        }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${payments.testMode ? 'translate-x-5' : ''
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

          </div>
        </main>
      </div>
    </div>
  );
}
