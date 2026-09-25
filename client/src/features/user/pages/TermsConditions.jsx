import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  FileCheck2,
  Scale,
  Users2,
  CreditCard,
  AlertOctagon,
  ShieldAlert,
  Gavel,
  FileText,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  HeartHandshake
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState("eligibility")

  const sections = [
    { id: "eligibility", title: "1. Eligibility & Age (18+)", icon: Users2 },
    { id: "account", title: "2. Account Registration", icon: FileCheck2 },
    { id: "conduct", title: "3. Community Code of Conduct", icon: HeartHandshake },
    { id: "billing", title: "4. Subscriptions & Billing", icon: CreditCard },
    { id: "content", title: "5. Member Content & License", icon: Sparkles },
    { id: "safety", title: "6. Zero Tolerance & Bans", icon: ShieldAlert },
    { id: "liability", title: "7. Limitation of Liability", icon: AlertOctagon },
    { id: "arbitration", title: "8. Dispute Resolution & Law", icon: Scale },
  ]

  const scrollTo = (id) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] text-[#17151A] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header Section */}
        <section className="relative overflow-hidden bg-white border-b border-[#FFE7F0] py-14 sm:py-18 px-4 sm:px-6 lg:px-8">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 -z-10 w-[500px] h-[350px] bg-gradient-to-br from-[#FFE7F0]/70 via-[#7C3AED]/8 to-transparent blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 -z-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#FFE7F0]/40 to-transparent blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-[1400px] mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#64748b] mb-6">
              <Link to="/" className="hover:text-[#FF2D72] flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className="font-semibold text-[#17151A]">Legal</span>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className="text-[#FF2D72] font-semibold">Terms & Conditions</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE7F0] border border-[#FF2D72]/20 shadow-xs mb-4">
                  <Scale className="w-4 h-4 text-[#FF2D72]" />
                  <span className="text-xs font-bold text-[#FF2D72] uppercase tracking-wider">
                    TERMS OF SERVICE
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17151A] tracking-tight">
                  Terms & Conditions
                </h1>
                <p className="text-[#64748b] text-base sm:text-lg mt-3 max-w-2xl font-normal leading-relaxed">
                  Welcome to LoveConnect. These terms govern your access to our mobile applications, matching services, and community events.
                </p>
              </div>

              {/* Meta Pill Box */}
              <div className="shrink-0 bg-[#FAFAFC] p-4 rounded-2xl border border-gray-200/70 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-[#64748b]">
                <div>
                  <span className="font-bold text-[#17151A] block">Effective Date</span>
                  <span>September 25, 2026</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-200" />
                <div>
                  <span className="font-bold text-[#17151A] block">Estimated Read</span>
                  <span>7 mins read</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-200" />
                <div>
                  <span className="font-bold text-[#17151A] block">Standard</span>
                  <span className="text-[#FF2D72] font-bold">Community Safe</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Bar */}
        <section className="bg-gradient-to-r from-[#17151A] via-[#241738] to-[#120D1F] text-white py-6 px-4 sm:px-6 lg:px-8 shadow-md">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Mutual Kindness & Dignity</h3>
                <p className="text-xs text-pink-100/80">Every member on LoveConnect agrees to communicate truthfully, respect consent, and uphold community standards.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF2D72]/20 text-pink-300 border border-[#FF2D72]/30 text-xs font-bold">
                Strict 18+ Platform
              </span>
            </div>
          </div>
        </section>

        {/* Main Content Layout with Sidebar */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Sticky Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-3xl p-6 border border-[#FFE7F0] shadow-sm">
                <h3 className="font-bold text-base text-[#17151A] mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF2D72]" />
                  <span>Table of Contents</span>
                </h3>

                <nav className="space-y-1.5">
                  {sections.map((sec) => {
                    const Icon = sec.icon
                    const isSelected = activeSection === sec.id
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollTo(sec.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#FFE7F0] text-[#FF2D72] font-bold shadow-xs"
                            : "text-[#64748b] hover:bg-gray-50 hover:text-[#17151A]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#FF2D72]" : "text-gray-400"}`} />
                        <span className="truncate">{sec.title}</span>
                      </button>
                    )
                  })}
                </nav>

                {/* Dispute / Legal Inquiry Box */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/70 to-pink-50/70 border border-purple-100">
                    <h4 className="font-bold text-xs text-[#17151A] mb-1 flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[#7C3AED]" /> Legal Inquiries
                    </h4>
                    <p className="text-[11px] text-[#64748b] leading-relaxed mb-3">
                      Have questions regarding contract terms, billing disputes, or IP rights?
                    </p>
                    <a
                      href="mailto:legal@loveconnect.com"
                      className="text-xs font-bold text-[#7C3AED] hover:underline inline-flex items-center gap-1"
                    >
                      legal@loveconnect.com &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Terms Sections */}
            <article className="lg:col-span-8 space-y-12">
              
              {/* Introduction */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal mt-4">
                  By downloading, registering, or browsing LoveConnect (referred to herein as "the Platform", "Service", "we", or "us"), you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any provision, please immediately cease using our services.
                </p>
              </div>

              {/* Section 1 */}
              <div id="eligibility" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center font-black">
                    <Users2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D72]">Section 01</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      1. Eligibility & Age Requirements (18+)
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Fusce aliquet cursus ante, a placerat ante vehicula eget. Donec feugiat, sem id pharetra ultrices, purus neque imperdiet sapien, sed aliquet lectus nisl nec risus.
                </p>

                <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#FF2D72] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#17151A] leading-relaxed">
                    <strong>Strict 18+ Age Condition:</strong> You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to create an account. Creating an account on behalf of a minor or falsifying age is an actionable violation resulting in permanent forfeiture and reporting.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="account" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center font-black">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">Section 02</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      2. Account Registration & Authenticity
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>You agree to provide true, accurate, and current profile information.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>You are solely responsible for maintaining login credential confidentiality.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Only one active account is permitted per real individual.</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="conduct" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#FF2D72] flex items-center justify-center font-black">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D72]">Section 03</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      3. Community Code of Conduct & Prohibited Acts
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis mi. Pellentesque eleifend hendrerit sem. Suspendisse potenti. Nam nonummy.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-gray-100 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600">Strictly Prohibited</h4>
                    <ul className="text-xs text-[#64748b] space-y-1.5 list-disc list-inside">
                      <li>Solicitation of money, cryptocurrency, or wire transfers</li>
                      <li>Harassment, stalking, intimidation, or hate speech</li>
                      <li>Non-consensual sharing of private media</li>
                      <li>Impersonation of celebrities or public figures</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-gray-100 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600">Expected Behavior</h4>
                    <ul className="text-xs text-[#64748b] space-y-1.5 list-disc list-inside">
                      <li>Treat potential matches with mutual kindness</li>
                      <li>Respect boundaries and prompt rejections gracefully</li>
                      <li>Promptly report suspicious or fraudulent accounts</li>
                      <li>Verify your account with live selfie match</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div id="billing" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-black">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">Section 04</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      4. In-App Purchases, VIP Subscriptions & Refunds
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2 text-xs sm:text-sm text-amber-950">
                  <p><strong>Auto-Renewal:</strong> Premium and VIP Elite recurring subscriptions automatically renew unless cancelled at least 24 hours prior to the close of the current billing cycle.</p>
                  <p><strong>Refund Policy:</strong> In-app purchases made via Apple App Store or Google Play Store are subject to the respective store refund policies. Direct portal payments are eligible for refund requests within 14 days of initial activation if unused.</p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="content" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center font-black">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">Section 05</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      5. Member Content & Limited License
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo.
                </p>
                <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
                  You retain ownership of your photos, voice intros, and bio submissions. By uploading content, you grant LoveConnect a worldwide, non-exclusive, royalty-free license to host, display, and process your content solely to operate and improve matching recommendations.
                </p>
              </div>

              {/* Section 6 */}
              <div id="safety" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Section 06</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      6. Zero Tolerance Policy & Permanent Bans
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* Section 7 */}
              <div id="liability" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 text-[#17151A] flex items-center justify-center font-black">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Section 07</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      7. Disclaimer of Warranties & Limitation of Liability
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. LoveConnect provides services on an "as is" and "as available" basis without warranties of guaranteed romantic outcomes.
                </p>
              </div>

              {/* Section 8 */}
              <div id="arbitration" className="bg-gradient-to-br from-white to-purple-50/30 rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center font-black shadow-md shadow-purple-500/20">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">Section 08</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      8. Governing Law & Dispute Resolution
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of India. Any unresolved dispute arising out of or in connection with these Terms shall be referred to binding arbitration seated in Mumbai, Maharashtra, conducted in English in accordance with the Arbitration and Conciliation Act, 1996.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-purple-100 text-xs sm:text-sm text-[#17151A]">
                  <p><strong>Grievance Officer:</strong> Legal Officer, LoveConnect Inc.</p>
                  <p><strong>Response Turnaround:</strong> Within 48 hours for safety reports</p>
                  <p><strong>Contact Email:</strong> <a href="mailto:grievance@loveconnect.com" className="text-[#7C3AED] font-bold hover:underline">grievance@loveconnect.com</a></p>
                </div>
              </div>

            </article>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
