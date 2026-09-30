import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Plus,
  Trash2,
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
} from "lucide-react";
import profileImg1 from "../../../assets/hero_woman.jpg";
import profileImg2 from "../../../assets/priya_profile.jpg";
import profileImg3 from "../../../assets/signup_hero_woman.jpg";
import profileImg4 from "../../../assets/hero_woman_exact.png";

export default function ProfileCreation() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);

  const [photos, setPhotos] = useState([
    profileImg1,
    profileImg2,
    profileImg3,
    profileImg4,
  ]);

  const [basicInfo, setBasicInfo] = useState({
    name: "Ananya",
    dob: "1999-08-15",
    gender: "Woman",
    location: "Mumbai, India",
  });
  const [selectedInterests, setSelectedInterests] = useState([
    "Travel",
    "Photography",
    "Fitness",
    "Music",
  ]);

  const [isCompleted, setIsCompleted] = useState(false);

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
  ];

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotos((prev) => [...prev, uploadEvent.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index, e) => {
    e.stopPropagation();
    if (photos.length <= 1) return;
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimary = (index) => {
    if (index === 0) return;
    setPhotos((prev) => {
      const updated = [...prev];
      const [selected] = updated.splice(index, 1);
      updated.unshift(selected);
      return updated;
    });
  };

  const toggleInterest = (interestName) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests((prev) =>
        prev.filter((item) => item !== interestName),
      );
    } else {
      setSelectedInterests((prev) => [...prev, interestName]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/discover");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/discover");
    }
  };

  const stepTitles = {
    1: { stepNum: 1, label: "Step 1 of 3", progress: "33%" },
    2: { stepNum: 2, label: "Step 2 of 3", progress: "66%" },
    3: { stepNum: 3, label: "Step 3 of 3", progress: "100%" },
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex flex-col justify-between p-3 sm:p-6 lg:p-8 relative overflow-y-auto lg:overflow-hidden font-poppins select-none">
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-[#7C3AED]/15 via-[#FFE7F0]/60 to-transparent blur-3xl rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-5xl mx-auto my-auto flex-1 flex flex-col justify-center py-2 sm:py-4">
        <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden flex flex-col justify-between max-w-5xl mx-auto min-h-[540px] lg:min-h-[580px] lg:h-[76vh] max-h-[780px] transition-all duration-300">
          <div className="p-6 sm:p-9 lg:p-10 flex flex-col justify-between flex-1 h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div>
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
                    <span>Step {stepTitles[currentStep].stepNum} of 3</span>
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
                      Upload clear photos of yourself. First photo will be your
                      main profile picture.
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
                    <p className="text-xs text-slate-400 mt-0.5">
                      or drag and drop
                    </p>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={basicInfo.name}
                        onChange={(e) =>
                          setBasicInfo({ ...basicInfo, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white hover:border-slate-300 focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0] outline-none shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Date of Birth *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Select date"
                          value={basicInfo.dob}
                          onFocus={(e) => (e.target.type = "date")}
                          onChange={(e) =>
                            setBasicInfo({ ...basicInfo, dob: e.target.value })
                          }
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs"
                        />
                        <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Gender *
                      </label>
                      <div className="relative">
                        <select
                          value={basicInfo.gender}
                          onChange={(e) =>
                            setBasicInfo({
                              ...basicInfo,
                              gender: e.target.value,
                            })
                          }
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
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Location *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter your location"
                          value={basicInfo.location}
                          onChange={(e) =>
                            setBasicInfo({
                              ...basicInfo,
                              location: e.target.value,
                            })
                          }
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
                      const isSelected = selectedInterests.includes(item.name);
                      const IconComponent = item.icon;
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
                      );
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
                <span>{currentStep === 3 ? "Complete" : "Next"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
