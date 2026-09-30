import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Smartphone, Monitor } from 'lucide-react';
import loveConnectLogo from '../../../assets/loveconnect.png';
import heroCoupleRomantic from '../../../assets/hero_couple_romantic.jpg';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [deviceFrame, setDeviceFrame] = useState(false);

  return (
    <div className={`min-h-screen bg-[#17151A] flex flex-col items-center justify-center font-poppins ${deviceFrame ? 'p-4 sm:p-8' : ''} select-none transition-all`}>
      {/* FRAME TOGGLE FOR MOBILE APP 390x844 SIMULATION */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">
        <button
          onClick={() => setDeviceFrame(!deviceFrame)}
          className="flex items-center gap-1.5 hover:text-[#FF2D72] transition-colors cursor-pointer"
        >
          {deviceFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4 text-[#FF2D72]" />}
          <span>{deviceFrame ? 'Full Viewport' : '390×844 Mobile Frame'}</span>
        </button>
      </div>

      <div
        className={`relative overflow-hidden w-full ${
          deviceFrame
            ? 'max-w-[390px] h-[844px] rounded-[48px] shadow-[0_25px_70px_rgba(0,0,0,0.8)] border-[10px] border-neutral-900 ring-1 ring-white/10'
            : 'min-h-screen max-w-lg'
        } flex flex-col justify-between p-6 sm:p-8 text-white transition-all`}
      >
        {/* BACKGROUND PHOTOGRAPHY WITH PINK/PURPLE GRADIENT OVERLAY */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroCoupleRomantic}
            alt="Romantic Couple"
            className="w-full h-full object-cover scale-105 animate-pulse duration-[10000ms]"
          />
          {/* Beautiful Pink/Purple gradient overlay as requested */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17151A] via-[#7C3AED]/70 to-[#FF2D72]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#17151A] opacity-90" />
        </div>

        {/* TOP STATUS BAR SIMULATION IF FRAME */}
        {deviceFrame && (
          <div className="relative z-10 flex justify-between items-center text-xs font-semibold px-2 pt-1 text-white/90">
            <span>9:41</span>
            <div className="w-24 h-4 bg-black/80 rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5">
                <div className="w-3 h-full bg-white"></div>
              </div>
            </div>
          </div>
        )}

        {/* TOP LOGO AND BRANDING */}
        <div className="relative z-10 pt-8 sm:pt-12 flex flex-col items-center text-center">
          <div className="relative mb-3 group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-[#FF2D72] fill-[#FF2D72] animate-bounce" />
            </div>
          </div>

          <img
            src={loveConnectLogo}
            alt="LoveConnect"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-xl brightness-110"
          />

          <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#FCD34D]" />
            <span>100% Human-Verified Platform</span>
          </div>
        </div>

        {/* BOTTOM CONTENT AREA */}
        <div className="relative z-10 pb-6 space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight drop-shadow-md">
              Meet Real People.
              <br />
              <span className="bg-gradient-to-r from-[#FF9EBF] via-white to-[#D8B4FE] bg-clip-text text-transparent">
                Find Meaningful Connections.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-xs mx-auto leading-relaxed">
              Experience genuine chemistry based on real values, photo verification, and respectful dating.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF2D72] to-[#7C3AED] hover:from-[#ff1a66] hover:to-[#6d28d9] text-white font-black text-sm tracking-wide shadow-[0_10px_25px_rgba(255,45,114,0.4)] hover:shadow-[0_15px_30px_rgba(255,45,114,0.6)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <div className="flex items-center justify-center gap-1 text-xs text-white/80 pt-1">
              <span>Already have an account?</span>
              <Link
                to="/login"
                className="font-extrabold text-white hover:text-[#FF9EBF] underline decoration-[#FF2D72] decoration-2 underline-offset-4 ml-1 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* FOOTER BADGES */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-white/60 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> Encrypted & Private
            </span>
            <span>•</span>
            <span>Zero Fake Profiles</span>
          </div>
        </div>
      </div>
    </div>
  );
}
