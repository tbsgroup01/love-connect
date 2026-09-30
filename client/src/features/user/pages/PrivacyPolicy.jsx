import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  Share2,
  FileText,
  ChevronRight,
  ArrowLeft,
  Mail,
  CheckCircle2,
  AlertTriangle,
  HelpCircle
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("collection")

  const sections = [
    { id: "collection", title: "1. Information We Collect", icon: Database },
    { id: "usage", title: "2. How We Use Information", icon: Eye },
    { id: "sharing", title: "3. Information Sharing", icon: Share2 },
    { id: "security", title: "4. Data Security & Storage", icon: Lock },
    { id: "rights", title: "5. Your Privacy Rights", icon: UserCheck },
    { id: "cookies", title: "6. Cookies & Tracking", icon: Bell },
    { id: "contact", title: "7. Contact Privacy Officer", icon: Mail },
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
    <div className="w-full min-h-screen bg-[#FAFAFC] text-[#17151A] flex flex-col font-poppins">
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
              <span className="text-[#FF2D72] font-semibold">Privacy Policy</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE7F0] border border-[#FF2D72]/20 shadow-xs mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#FF2D72]" />
                  <span className="text-xs font-bold text-[#FF2D72] uppercase tracking-wider">
                    LEGAL & PRIVACY PROTECTION
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17151A] tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-[#64748b] text-base sm:text-lg mt-3 max-w-2xl font-normal leading-relaxed">
                  Your privacy and emotional safety are our highest priorities. Learn how LoveConnect safeguards your personal data, matches, and chat conversations.
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
                  <span className="font-bold text-[#17151A] block">Reading Time</span>
                  <span>6 mins read</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-200" />
                <div>
                  <span className="font-bold text-[#17151A] block">Version</span>
                  <span className="text-[#FF2D72] font-bold">v3.4 (Global)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Callout Banner */}
        <section className="bg-gradient-to-r from-[#17151A] via-[#241738] to-[#120D1F] text-white py-6 px-4 sm:px-6 lg:px-8 shadow-md">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF2D72]/20 border border-[#FF2D72]/30 flex items-center justify-center text-[#FF2D72] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">We never sell your personal data</h3>
                <p className="text-xs text-pink-100/80">Your location, private chats, and biometric selfie checks remain encrypted and confidential.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                GDPR & DPDP Compliant
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

                {/* Need Help Card */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFE7F0]/60 to-purple-50/60 border border-[#FF2D72]/15">
                    <h4 className="font-bold text-xs text-[#17151A] mb-1 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#FF2D72]" /> Questions about privacy?
                    </h4>
                    <p className="text-[11px] text-[#64748b] leading-relaxed mb-3">
                      Our Data Protection Officer and compliance team are available 24/7 to answer your inquiries.
                    </p>
                    <a
                      href="mailto:privacy@loveconnect.com"
                      className="text-xs font-bold text-[#FF2D72] hover:underline inline-flex items-center gap-1"
                    >
                      privacy@loveconnect.com &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Detailed Privacy Clauses with Modern Typography */}
            <article className="lg:col-span-8 space-y-12">
              
              {/* Introduction */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal mt-4">
                  At LoveConnect, we believe transparency is the bedrock of genuine affection. This Privacy Policy details our practices regarding data acquisition, cryptographic protection, user autonomy, and compliance with statutory frameworks including the Indian Digital Personal Data Protection Act (DPDPA), EU General Data Protection Regulation (GDPR), and California Consumer Privacy Act (CCPA).
                </p>
              </div>

              {/* Section 1 */}
              <div id="collection" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center font-black">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D72]">Clause 01</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      1. Information We Collect
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-gray-100">
                    <h4 className="font-bold text-sm text-[#17151A] mb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Information You Provide
                    </h4>
                    <ul className="text-xs text-[#64748b] space-y-1.5 list-disc list-inside">
                      <li>Full name, date of birth, gender identity</li>
                      <li>Contact details (phone number, email address)</li>
                      <li>Photos, audio voice prompts, and bio narratives</li>
                      <li>Match preferences, hobbies, and interests</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-gray-100">
                    <h4 className="font-bold text-sm text-[#17151A] mb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500" /> Automatically Collected Data
                    </h4>
                    <ul className="text-xs text-[#64748b] space-y-1.5 list-disc list-inside">
                      <li>Device identifiers, operating system, IP address</li>
                      <li>Precise geolocation coordinates (with explicit consent)</li>
                      <li>Interaction logs, swipes, bookmarks, and match frequency</li>
                      <li>Crash logs and network diagnostic metrics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div id="usage" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center font-black">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">Clause 02</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      2. How We Use Your Information
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <ul className="space-y-3 pt-1">
                  {[
                    "To generate AI compatibility matches based on mutual values and lifestyle preferences.",
                    "To facilitate real-time encrypted messaging, voice notes, and date suggestions.",
                    "To combat harassment, fraud, underage accounts, and malicious impersonation.",
                    "To perform automated optical character analysis for selfie verification checks.",
                    "To optimize user interface performance, latency, and battery consumption."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569]">
                      <div className="w-5 h-5 rounded-full bg-[#FFE7F0] text-[#FF2D72] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3 */}
              <div id="sharing" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#FF2D72] flex items-center justify-center font-black">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D72]">Clause 03</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      3. Information Sharing & Third Parties
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </p>

                <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
                    <strong>Zero Commercial Ad Sharing:</strong> We do not monetise, rent, or trade member behavioral records to third-party ad networks, data brokers, or marketing syndicates.
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
                  Information is only shared under limited protocols: (1) Verified cloud hosting and database infrastructure providers bound by non-disclosure; (2) In-app payment processors for membership billing; and (3) Legally validated statutory requests issued by judicial authorities.
                </p>
              </div>

              {/* Section 4 */}
              <div id="security" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-black">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">Clause 04</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      4. Data Security, Cryptography & Retention
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-gray-100 text-center">
                    <span className="text-lg font-black text-[#17151A] block">AES-256</span>
                    <span className="text-xs text-[#64748b]">At-Rest Encryption</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-gray-100 text-center">
                    <span className="text-lg font-black text-[#17151A] block">TLS 1.3</span>
                    <span className="text-xs text-[#64748b]">In-Transit Encryption</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-gray-100 text-center">
                    <span className="text-lg font-black text-[#17151A] block">30 Days</span>
                    <span className="text-xs text-[#64748b]">Hard Purge on Delete</span>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div id="rights" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600">Clause 05</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      5. Your Privacy Rights & Controls
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.
                </p>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#FAFAFC] border border-gray-100 flex items-center justify-between">
                    <div>
                      <strong className="text-xs sm:text-sm text-[#17151A] block">Right of Access & Portability</strong>
                      <span className="text-[11px] text-[#64748b]">Download a complete digital archive of all photos and chats.</span>
                    </div>
                    <span className="text-xs font-bold text-[#FF2D72] bg-[#FFE7F0] px-2.5 py-1 rounded-full">Available</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAFAFC] border border-gray-100 flex items-center justify-between">
                    <div>
                      <strong className="text-xs sm:text-sm text-[#17151A] block">Right to Erasure (Forgotten)</strong>
                      <span className="text-[11px] text-[#64748b]">Permanently delete your profile and biometric hash in 1-click.</span>
                    </div>
                    <span className="text-xs font-bold text-[#FF2D72] bg-[#FFE7F0] px-2.5 py-1 rounded-full">Instant</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAFAFC] border border-gray-100 flex items-center justify-between">
                    <div>
                      <strong className="text-xs sm:text-sm text-[#17151A] block">Incognito & Discovery Pausing</strong>
                      <span className="text-[11px] text-[#64748b]">Hide profile from local search without deleting active matches.</span>
                    </div>
                    <span className="text-xs font-bold text-[#FF2D72] bg-[#FFE7F0] px-2.5 py-1 rounded-full">Configurable</span>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div id="cookies" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Clause 06</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      6. Cookies & Tracking Technologies
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              {/* Section 7 */}
              <div id="contact" className="bg-gradient-to-br from-white to-[#FFE7F0]/30 rounded-3xl p-6 sm:p-8 border border-[#FF2D72]/20 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF2D72] text-white flex items-center justify-center font-black shadow-md shadow-[#FF2D72]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2D72]">Clause 07</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17151A]">
                      7. Contact Our Data Protection Officer
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  For formal data access requests, statutory grievances, or privacy inquiries, contact our appointed Data Protection Officer (DPO):
                </p>

                <div className="p-4 rounded-2xl bg-white border border-[#FFE7F0] space-y-1 text-xs sm:text-sm text-[#17151A]">
                  <p><strong>Officer:</strong> Legal & Privacy Governance Desk</p>
                  <p><strong>Organization:</strong> LoveConnect Technologies Private Limited</p>
                  <p><strong>Physical Address:</strong> Level 7, Platina Tower, Bandra Kurla Complex (BKC), Mumbai 400051, India</p>
                  <p><strong>Direct Email:</strong> <a href="mailto:dpo@loveconnect.com" className="text-[#FF2D72] font-bold hover:underline">dpo@loveconnect.com</a></p>
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
