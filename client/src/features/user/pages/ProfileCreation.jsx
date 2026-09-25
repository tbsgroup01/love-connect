import React, { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Camera,
  Plus,
  Trash2,
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  ChevronDown,
  Heart,
  Music,
  Film,
  Utensils,
  Dumbbell,
  BookOpen,
  Palette,
  Gamepad2,
  ChefHat,
  Trees,
  Cat,
  Users,
  CheckCircle2,
  Sparkles,
  Eye,
  ShieldCheck,
} from "lucide-react"
import loveConnectLogo from "../../../assets/loveconnect.png"
import profileImg1 from "../../../assets/hero_woman.jpg"
import profileImg2 from "../../../assets/priya_profile.jpg"
import profileImg3 from "../../../assets/signup_hero_woman.jpg"
import profileImg4 from "../../../assets/hero_woman_exact.png"

export default function ProfileCreation() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // Active step: 1 (Photo), 2 (Basic Info), 3 (Interests), 4 (Relationship)
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Photos
  const [photos, setPhotos] = useState([
    profileImg1,
    profileImg2,
    profileImg3,
    profileImg4,
  ])

  // Step 2: Basic Information
  const [basicInfo, setBasicInfo] = useState({
    name: "Ananya",
    dob: "1999-08-15",
    gender: "Woman",
    location: "Mumbai, India",
  })

  // Step 3: Interests
  const [selectedInterests, setSelectedInterests] = useState([
    "Travel",
    "Photography",
    "Fitness",
    "Music",
  ])

  // Step 4: Relationship Preference
  const [relationshipPreference, setRelationshipPreference] = useState("Relationship")

  // Completed State
  const [isCompleted, setIsCompleted] = useState(false)

  const interestOptions = [
    { name: "Travel", icon: Heart },
    { name: "Music", icon: Music },
    { name: "Movies", icon: Film },
    { name: "Food", icon: Utensils },
    { name: "Photography", icon: Camera },
    { name: "Fitness", icon: Dumbbell },
    { name: "Reading", icon: BookOpen },
    { name: "Art", icon: Palette },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Cooking", icon: ChefHat },
    { name: "Nature", icon: Trees },
    { name: "Pets", icon: Cat },
  ]

  const relationshipOptions = [
    {
      id: "Relationship",
      title: "Relationship",
      subtitle: "Long-term relationship",
      icon: Heart,
    },
    {
      id: "Dating",
      title: "Dating",
      subtitle: "Casual dating",
      icon: Heart,
    },
    {
      id: "Friendship",
      title: "Friendship",
      subtitle: "Make new friends",
      icon: Users,
    },
  ]

  // Photo handlers
  const handleFileUpload = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotos((prev) => [...prev, uploadEvent.target.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemovePhoto = (index, e) => {
    e.stopPropagation()
    if (photos.length <= 1) return
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSetPrimary = (index) => {
    if (index === 0) return
    setPhotos((prev) => {
      const updated = [...prev]
      const [selected] = updated.splice(index, 1)
      updated.unshift(selected)
      return updated
    })
  }

  const toggleInterest = (interestName) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== interestName))
    } else {
      setSelectedInterests((prev) => [...prev, interestName])
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    } else {
      navigate("/discover")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    } else {
      navigate("/discover")
    }
  }

  // Stepper Header data
  const stepTitles = {
    1: { stepNum: 1, label: "Step 1 of 8", progress: "12.5%" },
    2: { stepNum: 2, label: "Step 2 of 8", progress: "35%" },
    3: { stepNum: 6, label: "Step 6 of 8", progress: "75%" },
    4: { stepNum: 8, label: "Step 8 of 8", progress: "100%" },
  }

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex flex-col justify-between p-3 sm:p-6 lg:p-8 relative overflow-y-auto lg:overflow-hidden font-sans select-none">
      {/* Ambient Fluid Glows */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-[#7C3AED]/15 via-[#FFE7F0]/60 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Top Header Logo */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pb-3 sm:pb-4 border-b border-[#FFE7F0]/80 mb-2">
        <Link to="/" title="Return to LoveConnect Home" className="inline-flex items-center group">
          <img
            src={loveConnectLogo}
            alt="LoveConnect"
            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>Profile Verification Active</span>
        </div>
      </header>

      {/* Main SaaS Stage: Full-Width 2-Column Desktop Experience */}
      <main className="relative z-10 w-full max-w-7xl mx-auto my-auto flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:h-[76vh] max-h-[780px] transition-all duration-300">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: The Interactive 4-Step Form Wizard           */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-9 lg:p-10 flex flex-col justify-between overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            
            <div>
              {/* Stepper Progress Bar */}
              <div className="mb-6">
                <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#FF2D72] rounded-full transition-all duration-500 ease-out"
                    style={{ width: stepTitles[currentStep].progress }}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D72]" />
                    <span>Step {stepTitles[currentStep].stepNum} of 8</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {stepTitles[currentStep].label}
                  </span>
                </div>
              </div>

              {/* STEP 1: Add Your Photos */}
              {currentStep === 1 && (
                <div className="animate-fadeIn">
                  <div className="mb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      Add Your Photos
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      Upload clear photos of yourself. First photo will be your main profile picture.
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-[#FAFAFC] hover:bg-[#FFE7F0]/20 border border-dashed border-purple-200 hover:border-[#FF2D72] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group mb-5 shadow-2xs"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-100/90 text-[#7C3AED] group-hover:scale-110 flex items-center justify-center mb-2 shadow-xs transition-transform">
                      <Camera className="w-5 h-5 stroke-[2.2] text-[#7C3AED]" />
                    </div>
                    <p className="text-sm font-bold text-[#17151A] group-hover:text-[#FF2D72]">
                      Tap to upload
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">or drag and drop</p>
                  </div>

                  <div className="flex items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {photos.map((src, index) => (
                      <div
                        key={index}
                        onClick={() => handleSetPrimary(index)}
                        className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                          index === 0
                            ? "border-[#FF2D72] shadow-sm shadow-[#FF2D72]/20"
                            : "border-slate-200 hover:border-purple-300"
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                        {photos.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => handleRemovePhoto(index, e)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-slate-200 hover:border-[#FF2D72] bg-white flex items-center justify-center text-[#3B82F6] hover:text-[#FF2D72] transition-all cursor-pointer shadow-2xs group"
                    >
                      <Plus className="w-6 h-6 stroke-[2] group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Basic Information */}
              {currentStep === 2 && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      Basic Information
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      Tell us about yourself
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={basicInfo.name}
                        onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white hover:border-slate-300 focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0] outline-none shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">Date of Birth *</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Select date"
                          value={basicInfo.dob}
                          onFocus={(e) => (e.target.type = "date")}
                          onChange={(e) => setBasicInfo({ ...basicInfo, dob: e.target.value })}
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs"
                        />
                        <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">Gender *</label>
                      <div className="relative">
                        <select
                          value={basicInfo.gender}
                          onChange={(e) => setBasicInfo({ ...basicInfo, gender: e.target.value })}
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs appearance-none cursor-pointer"
                        >
                          <option value="Woman">Woman</option>
                          <option value="Man">Man</option>
                          <option value="Non-Binary">Non-Binary</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">Location *</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter your location"
                          value={basicInfo.location}
                          onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs"
                        />
                        <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Interests */}
              {currentStep === 3 && (
                <div className="animate-fadeIn">
                  <div className="mb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      What are your interests?
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      Select all that apply
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {interestOptions.map((item) => {
                      const isSelected = selectedInterests.includes(item.name)
                      const IconComponent = item.icon
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => toggleInterest(item.name)}
                          className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? "border border-[#FF2D72] bg-[#FFE7F0]/60 text-[#FF2D72] shadow-2xs"
                              : "border border-slate-200 hover:border-slate-300 bg-white text-[#17151A]"
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5 text-[#FF2D72]" />
                          <span>{item.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Relationship Preference */}
              {currentStep === 4 && (
                <div className="animate-fadeIn">
                  <div className="mb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      Relationship Preference
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      What are you looking for?
                    </p>
                  </div>

                  <div className="space-y-3">
                    {relationshipOptions.map((opt) => {
                      const isSelected = relationshipPreference === opt.id
                      const IconComponent = opt.icon
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setRelationshipPreference(opt.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "border-[#FF2D72] bg-[#FFE7F0]/25 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-full bg-[#FFE7F0] flex items-center justify-center text-[#FF2D72] shrink-0">
                              <IconComponent className="w-5 h-5 fill-[#FF2D72]" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[#17151A]">{opt.title}</h3>
                              <p className="text-xs text-[#64748b] mt-0.5">{opt.subtitle}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#FF2D72] text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-100">
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 hover:border-[#FF2D72] text-xs sm:text-sm font-bold text-slate-500 hover:text-[#FF2D72] bg-white transition-all cursor-pointer"
                >
                  Skip
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#17151A] bg-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#FF2D72] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#FF2D72]/25 hover:shadow-lg hover:shadow-[#FF2D72]/40 transition-all cursor-pointer"
              >
                <span>{currentStep === 4 ? "Complete" : "Next"}</span>
              </button>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Live Match Profile Card Preview             */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-purple-50/60 via-[#FFE7F0]/30 to-pink-50/40 p-6 flex-col items-center justify-center relative border-l border-[#FFE7F0]/60">
            
            <div className="mb-3 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[11px] font-bold text-[#FF2D72] border border-[#FFE7F0] shadow-2xs">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Match Preview</span>
              </span>
            </div>

            {/* The Live Card */}
            <div className="w-full max-w-[320px] bg-white rounded-[24px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden p-3.5 transition-all">
              <div className="relative w-full h-[260px] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                <img
                  src={photos[0]}
                  alt="Live Profile Preview"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 inset-x-3 text-white">
                  <h3 className="text-xl font-black flex items-center gap-1.5">
                    <span>{basicInfo.name || "Your Name"}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] fill-white" />
                  </h3>
                  <p className="text-xs text-white/90 flex items-center gap-1 mt-0.5 font-medium">
                    <MapPin className="w-3 h-3 text-[#FF2D72]" />
                    <span>{basicInfo.location || "Your Location"}</span>
                  </p>
                </div>
              </div>

              {/* Preferences Pill */}
              <div className="pt-3 pb-1 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[10px] font-bold">
                  {relationshipPreference}
                </span>
                {selectedInterests.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 text-center">
              This is how your card appears to nearby singles
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
