import React, { useState, useRef, useEffect } from "react";
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
  Leaf,
  PawPrint,
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
  Wine,
  Cigarette,
  Salad,
  Activity,
  Check,
  Loader2,
  Building2,
  User,
  Quote,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { updateUserProfile, getUserById, uploadProfileImage } from "../../../services/usersServices.js";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function ProfileCreation() {
  const navigate = useNavigate();
  const { user: currentUser, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  // 8 Steps multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Profile Photo (Single photo connected with DB - no extra photos)
  const [photo, setPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Step 2: Basic Info
  const [basicInfo, setBasicInfo] = useState({
    name: "Ananya",
    dob: "1999-08-15",
    gender: "Woman",
    location: "Mumbai, India",
  });

  // Step 3: About Me
  const [aboutMe, setAboutMe] = useState(
    "I'm a cheerful person who loves exploring new cafes, live music gigs, and meaningful conversations. Looking to connect with genuine and open-minded people!"
  );

  // Step 4: Profession
  const [profession, setProfession] = useState({
    title: "Product Designer",
    company: "Google",
    industry: "Technology",
  });

  // Step 5: Education
  const [education, setEducation] = useState({
    degree: "Bachelors",
    institution: "Delhi University",
    field: "Design & Media Arts",
  });

  // Step 6: Interests
  const [selectedInterests, setSelectedInterests] = useState([
    "Travel",
    "Music",
    "Food",
    "Photography",
  ]);

  // Step 7: Lifestyle
  const [lifestyle, setLifestyle] = useState({
    smoking: "Sometimes",
    drinking: "Socially",
    diet: "Vegetarian",
    workout: "Often",
    pets: "Dog Lover",
  });

  // Step 8: Relationship Preference
  const [relationshipPreference, setRelationshipPreference] =
    useState("Relationship");

  // Load existing user info from AuthContext/DB if available
  useEffect(() => {
    if (currentUser) {
      try {
        if (currentUser.name) {
          setBasicInfo((prev) => ({ ...prev, name: currentUser.name }));
        }
        if (currentUser.profile_image) {
          setPhoto(currentUser.profile_image);
        }
        if (currentUser.id) {
          getUserById(currentUser.id)
            .then((res) => {
              const u = res.data?.user || res.data;
              if (u) {
                if (u.profile_image) {
                  setPhoto(u.profile_image);
                } else if (u.profile?.profile_picture) {
                  setPhoto(u.profile.profile_picture);
                }
                if (u.name) setBasicInfo((prev) => ({ ...prev, name: u.name }));
                if (u.gender) {
                  const g = u.gender.toLowerCase();
                  setBasicInfo((prev) => ({
                    ...prev,
                    gender: g === "male" ? "Man" : g === "female" ? "Woman" : "Non-Binary",
                  }));
                }
                if (u.city) setBasicInfo((prev) => ({ ...prev, location: u.city }));
                if (u.date_of_birth) {
                  setBasicInfo((prev) => ({
                    ...prev,
                    dob: String(u.date_of_birth).split("T")[0],
                  }));
                }
                if (u.about_me) setAboutMe(u.about_me);
                if (u.profile?.partner_preferences?.profession) {
                  setProfession((prev) => ({
                    ...prev,
                    title: u.profile.partner_preferences.profession,
                  }));
                }
                if (u.profile?.partner_preferences?.education) {
                  setEducation((prev) => ({
                    ...prev,
                    institution: u.profile.partner_preferences.education,
                  }));
                }
                if (u.interest) {
                  try {
                    const parsed = typeof u.interest === "string" ? JSON.parse(u.interest) : u.interest;
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      setSelectedInterests(parsed);
                    }
                  } catch (e) {
                    // ignore
                  }
                }
                if (u.profile?.partner_preferences?.lifestyle) {
                  setLifestyle((prev) => ({
                    ...prev,
                    ...u.profile.partner_preferences.lifestyle,
                  }));
                }
              }
            })
            .catch(() => {});
        }
      } catch (e) {
        console.warn("Could not prefill user profile", e);
      }
    }
  }, [currentUser]);

  // Step 6: 12 Requested Interest Options
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
    { name: "Nature", icon: Leaf },
    { name: "Pets", icon: PawPrint },
  ];

  // Quick About Me Prompts
  const aboutMePrompts = [
    " Coffee or Chai? Always coffee with lots of good conversation.",
    " Wanderlust soul always planning the next spontaneous road trip.",
    " Film buff who can talk about cinema and good stories for hours.",
    " Foodie at heart: cooking experiments and exploring street food gems.",
  ];

  // Industry options for profession
  const industryList = [
    "Technology",
    "Healthcare",
    "Creative & Arts",
    "Finance & Business",
    "Education",
    "Hospitality",
    "Marketing & Media",
    "Student",
    "Other",
  ];

  // Degree options for education
  const degreeList = [
    "Bachelors",
    "Masters",
    "Doctorate / PhD",
    "Diploma",
    "High School",
    "Self-Taught / Other",
  ];

  // Step 8: Relationship Options
  const relationshipOptions = [
    {
      id: "Relationship",
      title: "Relationship",
      description: "Looking for a meaningful, long-term romantic connection and partner",
      icon: Heart,
      tag: "Commitment",
    },
    {
      id: "Dating",
      title: "Dating",
      description: "Open to exciting dates, getting to know someone, and seeing where it leads",
      icon: Sparkles,
      tag: "Explore",
    },
    {
      id: "Friendship",
      title: "Friendship",
      description: "Looking to connect, hang out, bond over hobbies, and build genuine friendships",
      icon: Users,
      tag: "Social",
    },
  ];

  // Handlers for Single Profile Photo connected directly with DB
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.name.match(/\.(jpe?g|png|webp|gif|jfif|svg|avif|heic)$/i)) {
      setUploadError("Please select a valid image file (JPG, PNG, WEBP, GIF, JFIF).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 25MB.");
      return;
    }

    setUploadError("");
    setUploadSuccess(false);
    setUploadingPhoto(true);

    try {
      const userId = currentUser?.id || 3;

      const fd = new FormData();
      fd.append("profile", file);
      if (userId) {
        fd.append("userId", String(userId));
      }

      // 1. Upload file to backend server
      const res = await uploadProfileImage(fd);
      const uploadedUrl = res.data?.url || res.data?.path;

      if (uploadedUrl) {
        // 2. Persist directly to DB in users & profiles table
        if (userId) {
          await updateUserProfile(userId, { profile_image: uploadedUrl }).catch((err) => {
            console.warn("DB update sync warning:", err);
          });
        }

        // 3. Update auth state so all app components immediately have the image
        if (currentUser) {
          updateUser({ profile_image: uploadedUrl });
        }

        // 4. Update local state
        setPhoto(uploadedUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      } else {
        throw new Error("Invalid image upload response from server");
      }
    } catch (err) {
      console.error("Photo upload failed:", err);
      const serverMsg = err.response?.data?.message || err.message;
      setUploadError(serverMsg || "Failed to upload photo to database. Please try again.");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = async (e) => {
    e?.stopPropagation();
    try {
      setPhoto(null);
      setUploadSuccess(false);
      if (currentUser) {
        updateUser({ profile_image: "" });
      }
    } catch (err) {
      console.warn("Could not remove photo from database", err);
    }
  };

  const toggleInterest = (interestName) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== interestName));
    } else {
      setSelectedInterests((prev) => [...prev, interestName]);
    }
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const calculateAge = (dobString) => {
    if (!dobString) return 24;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return 24;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  // Submit and Complete Flow
  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const userId = currentUser?.id || 3;

      let cityName = basicInfo.location || "Mumbai";
      let stateName = "Maharashtra";
      let countryName = "India";
      if (basicInfo.location?.includes(",")) {
        const parts = basicInfo.location.split(",").map((p) => p.trim());
        cityName = parts[0] || cityName;
        if (parts.length === 2) {
          countryName = parts[1] || countryName;
        } else if (parts.length >= 3) {
          stateName = parts[1] || stateName;
          countryName = parts[2] || countryName;
        }
      }

      const validProfileImage =
        photo && !photo.startsWith("data:") ? photo : (photo || undefined);

      const profilePayload = {
        name: basicInfo.name,
        age: calculateAge(basicInfo.dob),
        date_of_birth: basicInfo.dob,
        gender:
          basicInfo.gender.toLowerCase() === "woman"
            ? "female"
            : basicInfo.gender.toLowerCase() === "man"
            ? "male"
            : "other",
        city: cityName,
        state: stateName,
        country: countryName,
        about_me: aboutMe,
        profession: profession.title
          ? `${profession.title}${profession.company ? ` at ${profession.company}` : ""}`
          : profession.industry,
        education: education.degree
          ? `${education.degree}${education.institution ? ` - ${education.institution}` : ""}`
          : education.institution,
        interest: selectedInterests,
        profile_image: validProfileImage,
        lifestyle: {
          smoking: lifestyle.smoking,
          drinking: lifestyle.drinking,
          diet: lifestyle.diet,
          workout: lifestyle.workout,
          pets: lifestyle.pets,
        },
        partner_preferences: {
          relationship_preference: relationshipPreference,
          profession: profession.title
            ? `${profession.title}${profession.company ? ` at ${profession.company}` : ""}`
            : profession.industry,
          education: education.degree
            ? `${education.degree}${education.institution ? ` - ${education.institution}` : ""}`
            : education.institution,
          lifestyle: {
            smoking: lifestyle.smoking,
            drinking: lifestyle.drinking,
            diet: lifestyle.diet,
            workout: lifestyle.workout,
            pets: lifestyle.pets,
          },
          interests: selectedInterests,
          education_details: education,
          profession_details: profession,
        },
      };

      if (userId) {
        await updateUserProfile(userId, profilePayload).catch((err) => {
          console.warn("Server update warning (continuing):", err);
        });
      }

      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          name: basicInfo.name || currentUser.name,
          profile_image: validProfileImage || currentUser.profile_image,
          about_me: aboutMe,
          gender: profilePayload.gender,
          date_of_birth: basicInfo.dob,
          city: cityName,
          state: stateName,
          country: countryName,
          profession: profilePayload.profession,
          education: profilePayload.education,
          interest: selectedInterests,
          interests: selectedInterests,
          lifestyle: profilePayload.lifestyle,
          relationship_preference: relationshipPreference,
          profile: {
            full_name: basicInfo.name,
            gender: profilePayload.gender,
            date_of_birth: basicInfo.dob,
            city: cityName,
            state: stateName,
            country: countryName,
            about_me: aboutMe,
            profile_picture: validProfileImage,
            partner_preferences: profilePayload.partner_preferences,
          },
        };
        updateUser(updatedUser);
      }

      navigate("/discover");
    } catch (err) {
      console.error("Error creating profile:", err);
      navigate("/discover");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step Headings Metadata
  const stepMeta = {
    1: { title: "Add Your Photo", subtitle: "Upload a clear photo of yourself for your profile picture." },
    2: { title: "Basic Information", subtitle: "Tell us about yourself" },
    3: { title: "About Me", subtitle: "Write a bio that captures your personality, vibe, and passions" },
    4: { title: "What do you do for work?", subtitle: "Share your profession and workplace or industry" },
    5: { title: "What is your education?", subtitle: "Add your qualification and university or college" },
    6: { title: "What are your interests?", subtitle: "Select all that apply to help find great matches" },
    7: { title: "Your Lifestyle", subtitle: "Share your daily habits and preferences" },
    8: { title: "Relationship Preference", subtitle: "What kind of connection are you hoping to find?" },
  };

  const progressPercent = Math.round((currentStep / 8) * 100);

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex flex-col justify-between p-3 sm:p-6 lg:p-8 relative overflow-y-auto lg:overflow-hidden font-poppins select-none">
      {/* Background ambient glow decorations */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#FFE7F0] via-[#FF2D72]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-[#7C3AED]/15 via-[#FFE7F0]/60 to-transparent blur-3xl rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-5xl mx-auto my-auto flex-1 flex flex-col justify-center py-2 sm:py-4">
        <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl shadow-purple-950/10 border border-[#FFE7F0] overflow-hidden flex flex-col justify-between max-w-5xl mx-auto min-h-[560px] lg:min-h-[600px] lg:h-[78vh] max-h-[820px] transition-all duration-300">
          <div className="p-6 sm:p-9 lg:p-10 flex flex-col justify-between flex-1 h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div>
              {/* Top Progress Indicator */}
              <div className="mb-6">
                <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE7F0] text-[#FF2D72] text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D72] animate-pulse" />
                    <span>Step {currentStep} of 8</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {stepMeta[currentStep]?.title}
                  </span>
                </div>
              </div>

              {/* STEP 1: Profile Photo (Single Photo Connected to DB) */}
              {currentStep === 1 && (
                <div className="animate-fadeIn max-w-xl mx-auto w-full">
                  <div className="mb-5 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[1].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[1].subtitle}
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                  />

                  {uploadError && (
                    <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {!photo ? (
                    <div
                      onClick={() => !uploadingPhoto && fileInputRef.current?.click()}
                      className={`w-full bg-[#FAFAFC] hover:bg-[#FFE7F0]/20 border-2 border-dashed ${
                        uploadingPhoto
                          ? "border-purple-300 pointer-events-none"
                          : "border-purple-200 hover:border-[#FF2D72]"
                      } rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group shadow-2xs`}
                    >
                      {uploadingPhoto ? (
                        <div className="flex flex-col items-center justify-center py-6">
                          <Loader2 className="w-10 h-10 text-[#FF2D72] animate-spin mb-3" />
                          <p className="text-sm font-bold text-[#17151A]">
                            Connecting with database...
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Uploading and saving your profile photo
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-purple-100/90 text-[#7C3AED] group-hover:scale-110 flex items-center justify-center mb-3 shadow-xs transition-transform">
                            <Camera className="w-7 h-7 stroke-[2.2] text-[#7C3AED]" />
                          </div>
                          <p className="text-base font-bold text-[#17151A] group-hover:text-[#FF2D72]">
                            Tap to upload photo
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Supports JPG, PNG, WEBP, GIF (Max 25MB)
                          </p>
                          <span className="mt-4 text-[11px] font-semibold text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
                            1 Photo Only • Connected to Database
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-2 animate-fadeIn">
                      {/* Single Photo Showcase Card */}
                      <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-2 border-[#FF2D72] shadow-xl shadow-[#FF2D72]/15 ring-4 ring-[#FFE7F0] group">
                        <img
                          src={photo}
                          alt="Profile Preview"
                          className="w-full h-full object-cover object-center"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 bg-[#FF2D72] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Main Photo</span>
                        </div>

                        <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Connected to DB</span>
                        </div>

                        {/* Hover Overlay with Quick Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingPhoto}
                            className="bg-white text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5 text-[#FF2D72]" />
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            disabled={uploadingPhoto}
                            className="bg-red-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-red-600 flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Control buttons below photo */}
                      <div className="flex items-center gap-3 mt-5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingPhoto}
                          className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#FF2D72] bg-slate-100 hover:bg-purple-50 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                        >
                          {uploadingPhoto ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FF2D72]" />
                          ) : (
                            <RefreshCw className="w-3.5 h-3.5 text-[#7C3AED]" />
                          )}
                          <span>{uploadingPhoto ? "Updating DB..." : "Replace Photo"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          disabled={uploadingPhoto}
                          className="px-4 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center gap-1.5 border border-red-100 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      {uploadSuccess && (
                        <p className="text-xs text-emerald-600 font-semibold mt-2.5 flex items-center gap-1 animate-fadeIn">
                          <Check className="w-3.5 h-3.5" />
                          Connected and saved to database successfully!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Basic Information */}
              {currentStep === 2 && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[2].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[2].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={basicInfo.name}
                          onChange={(e) =>
                            setBasicInfo({ ...basicInfo, name: e.target.value })
                          }
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white hover:border-slate-300 focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0] outline-none shadow-2xs"
                        />
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Date of Birth *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={basicInfo.dob}
                          onChange={(e) =>
                            setBasicInfo({ ...basicInfo, dob: e.target.value })
                          }
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0]"
                        />                       
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
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs appearance-none cursor-pointer focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0]"
                        >
                          <option value="Woman">Woman</option>
                          <option value="Man">Man</option>
                          <option value="Other">Other</option>
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
                          placeholder="e.g. Mumbai, India"
                          value={basicInfo.location}
                          onChange={(e) =>
                            setBasicInfo({
                              ...basicInfo,
                              location: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0]"
                        />
                        <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: About Me */}
              {currentStep === 3 && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[3].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[3].subtitle}
                    </p>
                  </div>

                  <div className="relative pt-1">
                    <textarea
                      rows={5}
                      maxLength={500}
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                      placeholder="Tell matches what you love, your passions, sense of humor, or what you're looking for in life..."
                      className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white hover:border-slate-300 focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0] outline-none shadow-2xs resize-none"
                    />
                    <div className="flex justify-between items-center mt-1 px-1">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Express your genuine self
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold">
                        {aboutMe.length}/500
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-[#FF2D72]" />
                      <span>Need inspiration? Tap a quick starter:</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aboutMePrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setAboutMe((prev) =>
                              prev ? `${prev} ${prompt}` : prompt
                            )
                          }
                          className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-[#FFE7F0]/30 hover:border-[#FF2D72] text-slate-600 hover:text-[#FF2D72] text-left text-xs font-medium transition-all cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Profession */}
              {currentStep === 4 && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[4].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[4].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Job Title / Profession *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Product Designer, Doctor, Engineer"
                          value={profession.title}
                          onChange={(e) =>
                            setProfession({ ...profession, title: e.target.value })
                          }
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0]"
                        />
                        <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Company / Workplace
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Google, Freelance, Apollo Hospital"
                          value={profession.company}
                          onChange={(e) =>
                            setProfession({
                              ...profession,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0]"
                        />
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17151A] mb-2">
                      Industry / Field
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {industryList.map((ind) => {
                        const isSelected = profession.industry === ind;
                        return (
                          <button
                            key={ind}
                            type="button"
                            onClick={() =>
                              setProfession({ ...profession, industry: ind })
                            }
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {ind}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Education */}
              {currentStep === 5 && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[5].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[5].subtitle}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17151A] mb-2">
                      Highest Qualification / Degree *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {degreeList.map((deg) => {
                        const isSelected = education.degree === deg;
                        return (
                          <button
                            key={deg}
                            type="button"
                            onClick={() =>
                              setEducation({ ...education, degree: deg })
                            }
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {deg}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        College / University
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Delhi University, IIT Bombay"
                          value={education.institution}
                          onChange={(e) =>
                            setEducation({
                              ...education,
                              institution: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0]"
                        />
                        <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17151A] mb-1">
                        Field of Study / Major
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Computer Science, Business, Design"
                          value={education.field}
                          onChange={(e) =>
                            setEducation({
                              ...education,
                              field: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#17151A] bg-white outline-none shadow-2xs focus:border-[#FF2D72] focus:ring-3 focus:ring-[#FFE7F0]"
                        />
                        <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Interests */}
              {currentStep === 6 && (
                <div className="animate-fadeIn">
                  <div className="mb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[6].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[6].subtitle}
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
                          className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                            isSelected
                              ? "border-[#FF2D72] bg-[#FFE7F0] text-[#FF2D72] shadow-2xs scale-[1.02]"
                              : "border-slate-200 hover:border-slate-300 bg-white text-[#17151A] hover:bg-slate-50"
                          }`}
                        >
                          <IconComponent
                            className={`w-4 h-4 ${
                              isSelected ? "text-[#FF2D72]" : "text-slate-500"
                            }`}
                          />
                          <span>{item.name}</span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#FF2D72] text-white flex items-center justify-center text-[9px] font-black">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 7: Lifestyle */}
              {currentStep === 7 && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[7].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[7].subtitle}
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    {/* Smoking */}
                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17151A]">
                        <Cigarette className="w-4 h-4 text-[#FF2D72]" />
                        <span>Smoking</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Never", "Sometimes", "Regularly", "Trying to quit"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setLifestyle({ ...lifestyle, smoking: opt })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              lifestyle.smoking === opt
                                ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] font-bold shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Drinking */}
                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17151A]">
                        <Wine className="w-4 h-4 text-[#FF2D72]" />
                        <span>Drinking</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Never", "Socially", "Frequently", "Teetotaler"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setLifestyle({ ...lifestyle, drinking: opt })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              lifestyle.drinking === opt
                                ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] font-bold shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Diet */}
                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17151A]">
                        <Salad className="w-4 h-4 text-[#FF2D72]" />
                        <span>Diet</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Vegetarian", "Non-Vegetarian", "Vegan", "Eggetarian"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setLifestyle({ ...lifestyle, diet: opt })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              lifestyle.diet === opt
                                ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] font-bold shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Workout */}
                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17151A]">
                        <Activity className="w-4 h-4 text-[#FF2D72]" />
                        <span>Workout</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Everyday", "Often", "Sometimes", "Never"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setLifestyle({ ...lifestyle, workout: opt })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              lifestyle.workout === opt
                                ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] font-bold shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pets */}
                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#17151A]">
                        <PawPrint className="w-4 h-4 text-[#FF2D72]" />
                        <span>Pets</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Dog Lover", "Cat Lover", "Both Dogs & Cats", "No Pets"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setLifestyle({ ...lifestyle, pets: opt })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              lifestyle.pets === opt
                                ? "bg-[#FFE7F0] text-[#FF2D72] border-[#FF2D72] font-bold shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: Relationship Preference */}
              {currentStep === 8 && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#17151A] tracking-tight">
                      {stepMeta[8].title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748b] mt-1 font-normal">
                      {stepMeta[8].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                    {relationshipOptions.map((opt) => {
                      const isSelected = relationshipPreference === opt.id;
                      const IconComponent = opt.icon;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setRelationshipPreference(opt.id)}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                            isSelected
                              ? "border-[#FF2D72] bg-gradient-to-b from-[#FFE7F0]/60 to-white shadow-md shadow-[#FF2D72]/15 scale-[1.02]"
                              : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div
                                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? "bg-[#FF2D72] text-white shadow-sm shadow-[#FF2D72]/30"
                                    : "bg-slate-100 text-slate-600 group-hover:text-[#FF2D72]"
                                }`}
                              >
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isSelected
                                    ? "bg-[#FF2D72] text-white"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {opt.tag}
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-[#17151A] mb-1">
                              {opt.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-normal">
                              {opt.description}
                            </p>
                          </div>

                          <div className="pt-4 flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? "border-[#FF2D72] bg-[#FF2D72]"
                                  : "border-slate-300"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                            <span
                              className={`text-[11px] font-bold ${
                                isSelected ? "text-[#FF2D72]" : "text-slate-400"
                              }`}
                            >
                              {isSelected ? "Selected" : "Select this"}
                            </span>
                          </div>
                        </div>
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
                disabled={isSubmitting}
                className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#FF2D72] via-[#ff3b7c] to-[#7C3AED] hover:brightness-105 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#FF2D72]/25 hover:shadow-lg hover:shadow-[#FF2D72]/40 transition-all cursor-pointer flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 8 ? "Complete Profile" : "Next"}</span>
                    {currentStep === 8 && <Check className="w-4 h-4" />}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
