import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Crown,
  Check,
  Sparkles,
  Heart,
  Eye,
  Sliders,
  Zap,
  RotateCcw,
  ShieldCheck,
  Ban,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Lock,
  CheckCircle2,
  X
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const FEATURES = [
  { icon: Heart, title: 'Unlimited Likes', desc: 'Send as many likes as you want without daily cooldown limits.' },
  { icon: Eye, title: 'See Who Likes You', desc: 'Instant grid access to every user who has already swiped right on you.' },
  { icon: Sliders, title: 'Advanced Filters', desc: 'Filter profiles by exact height, education, verified badges, and habits.' },
  { icon: Zap, title: '1 Free Profile Boost / Week', desc: 'Get up to 10x more profile views by spotlighting to top of local deck.' },
  { icon: RotateCcw, title: 'Unlimited Rewind Swipe', desc: 'Accidentally swiped left? Tap rewind anytime to bring them back.' },
  { icon: Sparkles, title: '5 Free Super Likes / Week', desc: 'Stand out from the crowd with highlighted notifications and glowing cards.' },
  { icon: ShieldCheck, title: 'Priority Verified Badge', desc: 'Fast-track identity verification and display the royal VIP checkmark.' },
  { icon: Ban, title: 'Ad-Free Experience', desc: 'Enjoy pure, uninterrupted matching with zero interstitial ads or banners.' },
];

const PLANS = [
  {
    id: 'plan-1',
    name: '1 Month',
    price: '₹499',
    period: 'per month',
    billedText: 'Billed monthly, cancel anytime',
    popular: false,
    discount: null,
  },
  {
    id: 'plan-3',
    name: '3 Months',
    price: '₹999',
    period: '₹333/mo',
    billedText: 'Total ₹999 billed every 3 months',
    popular: true,
    discount: 'SAVE 33%',
    badge: 'MOST POPULAR',
  },
  {
    id: 'plan-12',
    name: '12 Months',
    price: '₹2,499',
    period: '₹208/mo',
    billedText: 'Total ₹2,499 billed annually',
    popular: false,
    discount: 'SAVE 58%',
    badge: 'BEST VALUE',
  },
];

export default function PremiumPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Card Form
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8912',
    name: 'Ananya Verma',
    expiry: '08/29',
    cvv: '•••',
  });

  // UPI Form
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <DashboardLayout activeTab="profile">
      <div className="w-full max-w-5xl mx-auto space-y-8 animate-fadeIn pb-16">
        {/* HERO BANNER */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#17151A] via-[#2A173B] to-[#FF2D72]/40 p-8 sm:p-12 text-white border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF2D72]/20 via-[#7C3AED]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 to-pink-500/20 border border-amber-300/30 text-amber-300 text-xs font-black tracking-wider uppercase">
              <Crown className="w-4 h-4 fill-amber-300" />
              <span>LoveConnect Premium VIP</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Unlock More Connections.
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Find out who liked your profile, send unlimited likes, and put yourself in the spotlight with the ultimate dating toolkit.
            </p>
          </div>
        </div>

        {/* 8 PREMIUM FEATURES GRID */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">Everything You Get with Premium</h2>
            <p className="text-xs text-gray-500 mt-1">Supercharge your dating experience with exclusive VIP features.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:border-pink-200 transition-all space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="font-extrabold text-sm text-[#17151A]">{feat.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 SUBSCRIPTION PLANS */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">Choose Your Membership Plan</h2>
            <p className="text-xs text-gray-500 mt-1">Select the duration that best matches your dating journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const isSelected = selectedPlan.id === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative rounded-3xl p-6 sm:p-7 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FF2D72] bg-gradient-to-b from-[#FFF5F8] to-white shadow-xl scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-pink-200'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md bg-gradient-to-r from-[#FF2D72] to-[#7C3AED]">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-lg text-gray-900">{plan.name}</h3>
                      {plan.discount && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FFE7F0] text-[#FF2D72]">
                          {plan.discount}
                        </span>
                      )}
                    </div>

                    <div className="pt-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#17151A]">{plan.price}</span>
                      <span className="text-xs font-bold text-gray-400 ml-1">/ {plan.period}</span>
                    </div>

                    <p className="text-xs text-gray-500">{plan.billedText}</p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan);
                        setIsCheckoutOpen(true);
                      }}
                      className={`w-full py-3 rounded-2xl font-black text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF2D72] text-white shadow-md hover:bg-[#E02663]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? 'Proceed to Payment' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RAZORPAY / STRIPE PAYMENT MODAL DRAWER */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 space-y-6 animate-scaleUp">
              {!isSuccess ? (
                <>
                  {/* MODAL HEADER */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-[#FFE7F0] text-[#FF2D72]">
                        <CreditCard className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-gray-900">Secure Payment Checkout</h3>
                        <span className="text-[11px] text-gray-400">Powered by Razorpay & Stripe 256-bit SSL</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* SUMMARY PILL */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-500">Plan Selected</span>
                      <p className="font-extrabold text-sm text-gray-900">{selectedPlan.name} VIP Access</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-500">Total Due</span>
                      <p className="text-xl font-black text-[#FF2D72]">{selectedPlan.price}</p>
                    </div>
                  </div>

                  {/* PAYMENT METHOD TABS */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                    {[
                      { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                      { id: 'card', label: 'Card', icon: CreditCard },
                      { id: 'netbanking', label: 'NetBanking', icon: Building },
                      { id: 'wallet', label: 'Wallets', icon: Wallet },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = paymentMethod === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPaymentMethod(tab.id)}
                          className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'border-[#FF2D72] bg-[#FFE7F0] text-[#FF2D72] shadow-xs'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[11px]">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* PAYMENT METHOD DETAILS */}
                  <form onSubmit={handlePay} className="space-y-4">
                    {paymentMethod === 'upi' && (
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-gray-700">Enter Virtual Payment Address (UPI ID)</label>
                        <input
                          type="text"
                          required
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@upi, name@okaxis"
                          className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF2D72] focus:outline-none"
                        />
                        <div className="flex items-center gap-3 pt-1">
                          <span className="text-[11px] font-bold text-gray-400">Supported:</span>
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-700">Google Pay</span>
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-700">PhonePe</span>
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-700">Paytm</span>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            required
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                            className="w-full text-xs font-mono px-4 py-2.5 rounded-xl border border-gray-200"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              required
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                              className="w-full text-xs font-medium px-4 py-2.5 rounded-xl border border-gray-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              required
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              className="w-full text-xs font-mono px-4 py-2.5 rounded-xl border border-gray-200"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-gray-700">Select Your Bank</label>
                        <select className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-gray-200 bg-white">
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>State Bank of India (SBI)</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    {paymentMethod === 'wallet' && (
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-gray-700">Select Digital Wallet</label>
                        <select className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-gray-200 bg-white">
                          <option>Paytm Wallet</option>
                          <option>PhonePe Wallet</option>
                          <option>Amazon Pay Balance</option>
                          <option>Mobikwik</option>
                        </select>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Lock className="w-3.5 h-3.5 text-green-600" />
                        <span>256-bit Encrypted</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-6 py-3 rounded-xl font-black text-xs text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                        style={{ backgroundColor: COLORS.pink }}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Pay {selectedPlan.price} Securely</span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* PAYMENT CELEBRATION MODAL */
                <div className="py-8 text-center space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900">Payment Successful!</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    You have unlocked <strong className="text-[#FF2D72]">LoveConnect VIP Premium</strong>. Enjoy unlimited likes, see who likes you, and 5 free Super Likes!
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setIsSuccess(false);
                        navigate('/discover');
                      }}
                      className="px-8 py-3 rounded-xl bg-[#FF2D72] text-white font-black text-xs shadow-md cursor-pointer hover:bg-[#E02663]"
                    >
                      Start Exploring with VIP
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
