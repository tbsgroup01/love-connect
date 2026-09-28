import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  PhoneOff,
  SwitchCamera,
  ShieldCheck,
  Heart,
  MessageCircle,
  Star,
  Sparkles,
  Maximize2
} from 'lucide-react';
import profileTwo from '../../../assets/priya_profile.jpg';
import profileFour from '../../../assets/hero_woman_exact.png';

export default function VideoCall() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(24);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [rating, setRating] = useState(5);

  // Call timer ticking
  useEffect(() => {
    if (isCallEnded) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCallEnded]);

  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCallEnded(true);
  };

  return (
    <div className="relative h-screen w-full bg-[#17151A] overflow-hidden select-none text-white font-sans">
      {/* REMOTE VIDEO FEED (FULL SCREEN BACKGROUND) */}
      <div className="absolute inset-0 z-0">
        <img
          src={profileTwo}
          alt="Priya Sharma"
          className="w-full h-full object-cover scale-105"
        />
        {/* Soft cinematic gradient overlays for controls contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70" />
      </div>

      {/* TOP HEADER OVERLAY */}
      <header className="relative z-20 px-6 pt-6 flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black drop-shadow-md">Priya Sharma</h2>
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
            <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
              {formatDuration(seconds)}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Encrypted HD
            </span>
          </div>
        </div>

        {/* TOP RIGHT PERKS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Sent a live heart reaction 💕')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-110"
            title="Send Heart"
          >
            <Heart className="w-5 h-5 text-[#FF2D72] fill-[#FF2D72]" />
          </button>
        </div>
      </header>

      {/* LOCAL CAMERA PREVIEW (PiP) */}
      <div className="absolute z-20 top-20 right-6 w-28 h-40 sm:w-36 sm:h-52 rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl bg-black">
        {isCameraOn ? (
          <img
            src={profileFour}
            alt="Your Preview"
            className={`w-full h-full object-cover transition-transform ${isFlipped ? 'scale-x-[-1]' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white/50 text-[10px]">
            <VideoOff className="w-6 h-6 mb-1" />
            <span>Camera Off</span>
          </div>
        )}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-[9px] font-bold">
          You
        </div>
      </div>

      {/* BOTTOM CALL CONTROLS */}
      <footer className="absolute z-20 bottom-8 inset-x-0 flex flex-col items-center gap-4 px-6">
        <div className="flex items-center gap-3 sm:gap-4 p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
          {/* MUTE MIC */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMuted ? 'bg-[#EF4444] text-white shadow-lg' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* TOGGLE CAMERA */}
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !isCameraOn ? 'bg-[#EF4444] text-white shadow-lg' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
            title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {isCameraOn ? <Video className="w-5 h-5 sm:w-6 sm:h-6" /> : <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* SWITCH CAMERA */}
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer text-white"
            title="Switch Camera"
          >
            <SwitchCamera className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* SPEAKER TOGGLE */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !isSpeakerOn ? 'bg-amber-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
            title={isSpeakerOn ? 'Speaker' : 'Muted Speaker'}
          >
            {isSpeakerOn ? <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* END CALL BUTTON */}
          <button
            onClick={handleEndCall}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EF4444] hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-105"
            title="End Video Call"
          >
            <PhoneOff className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </footer>

      {/* END CALL SUMMARY & FEEDBACK MODAL */}
      {isCallEnded && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center text-[#17151A] space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#FF2D72] shadow-md">
              <img src={profileTwo} alt="Priya" className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="text-xl font-black">Call Finished</h3>
              <p className="text-xs text-gray-400 mt-1">Duration: {formatDuration(seconds)} with Priya Sharma</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-gray-600">Rate Call Connection Quality</span>
              <div className="flex justify-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer hover:scale-125 transition-transform"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigate('/chat')}
                className="w-full py-3 rounded-2xl bg-[#FF2D72] hover:bg-[#E02663] text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Back to Conversation
              </button>
              <button
                onClick={() => navigate('/discover')}
                className="w-full py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-all cursor-pointer"
              >
                Discover More Singles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
