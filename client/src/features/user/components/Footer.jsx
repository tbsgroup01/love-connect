import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Heart,
  MapPin,

  ShieldCheck,
  Sparkles,
  Smartphone,
  ArrowUpRight,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
} from "lucide-react"
import Logo from "../../../assets/loveconnect.png"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const activeCities = ["Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad", "Goa"]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setEmail("")
    }
  }

  return (
    <footer className="relative bg-[#17151A] text-white pt-16 sm:pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10 font-poppins">
      {/* Ambient Radial Gradient Glows */}
      <div className="absolute -top-32 left-1/4 -z-0 w-[550px] h-[550px] bg-[#FF2D72]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-0 w-[450px] h-[450px] bg-[#7C3AED]/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">


        {/* Main Footer 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">

          {/* Column 1: Brand, Tagline, Socials & App Badges (Col 4) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-5">
            {/* Logo in Frosted Badge for maximum visual pop */}
            <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-black/25">
              <img src={Logo} alt="LoveConnect Logo" className="h-9 sm:h-10 w-auto object-contain" />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-normal">
              A premier dating platform built for genuine people seeking authentic, lifelong relationships. Powered by AI compatibility and verified security.
            </p>

            {/* Social Icons with Gradient Glow on Hover */}
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#FF2D72] hover:to-[#7C3AED] hover:border-transparent hover:shadow-lg hover:shadow-[#FF2D72]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#FF2D72] hover:to-[#7C3AED] hover:border-transparent hover:shadow-lg hover:shadow-[#FF2D72]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#FF2D72] hover:to-[#7C3AED] hover:border-transparent hover:shadow-lg hover:shadow-[#FF2D72]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#FF2D72] hover:to-[#7C3AED] hover:border-transparent hover:shadow-lg hover:shadow-[#FF2D72]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Mobile App Download Badges */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-2.5">
                Download the App
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* App Store */}
                <a
                  href="#"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF2D72]/40 transition-all duration-200 group"
                >
                  <Smartphone className="w-5 h-5 text-[#FF2D72]" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                      Download on
                    </p>
                    <p className="text-xs font-bold text-white leading-tight mt-0.5 group-hover:text-[#FF2D72] transition-colors">
                      App Store
                    </p>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="#"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#7C3AED]/40 transition-all duration-200 group"
                >
                  <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                      Get it on
                    </p>
                    <p className="text-xs font-bold text-white leading-tight mt-0.5 group-hover:text-[#7C3AED] transition-colors">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Col 2) */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-sm font-bold text-white tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-to-b from-[#FF2D72] to-[#7C3AED]" />
              <span>Explore</span>
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">Home</span>
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">Features</span>

                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">Pricing</span>

                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">Success Stories</span>
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">How It Works</span>
                </a>
              </li>

            </ul>
          </div>

          {/* Column 3: Trust & Safety (Col 3) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-to-b from-[#22C55E] to-[#7C3AED]" />
              <span>Safety & Trust</span>
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  <span className="group-hover:text-white transition-colors">Verified Profile Guarantee</span>
                </a>
              </li>


              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">Community Guidelines</span>
                </a>
              </li>
              {/* Emergency Danger SOS Badge */}
              <li className="pt-1">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 hover:bg-[#EF4444]/25 text-[#EF4444] text-xs font-bold transition-all group"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>24/7 Safety SOS & Zero Fake Policy</span>
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                  <span className="group-hover:text-[#FF2D72] transition-colors">Terms of Service</span>
                </Link>
              </li>

            </ul>
          </div>

          {/* Column 4: Locations & Headquarters (Col 3) */}
          <div className="md:col-span-12 lg:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-to-b from-[#FF2D72] to-[#F59E0B]" />
              <span>Locations</span>
            </h4>

            <div className="space-y-4">
              {/* Headquarters Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF2D72]/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FF2D72]" />
                    <span className="font-bold text-white text-xs sm:text-sm">Headquarters</span>
                  </div>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    Global HQ
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  Noida, India
                </p>
              </div>


            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}
