import { createElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Crown,
  Eye,
  Heart,
  ImagePlus,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  Video,
  X,
} from "lucide-react";
import profileOne from "../../../assets/hero_woman.jpg";
import profileTwo from "../../../assets/priya_profile.jpg";
import profileThree from "../../../assets/signup_hero_woman.jpg";
import profileFour from "../../../assets/hero_woman_exact.png";
import logo from "../../../assets/loveconnect.png";
import DashboardLayout from "../components/DashboardLayout";

const interests = [
  "Travel",
  "Music",
  "Movies",
  "Food",
  "Photography",
  "Fitness",
  "Reading",
  "Art",
  "Gaming",
  "Cooking",
  "Nature",
  "Pets",
];

function Shell({ title, children, back = false }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#17151A] font-poppins">
      <header className="sticky top-0 z-30 border-b border-[#FFE7F0] bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {back && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full p-2 text-slate-500 hover:bg-[#FFE7F0] hover:text-[#FF2D72]"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <Link to="/discover">
              <img
                src={logo}
                alt="LoveConnect"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <h1 className="hidden border-l border-slate-200 pl-4 text-lg font-extrabold sm:block">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/notifications"
              className="relative rounded-full bg-slate-100 p-2.5 text-slate-600"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF2D72] text-[9px] font-bold text-white">
                3
              </span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-3"
            >
              <img
                src={profileFour}
                alt="Ananya"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-xs font-bold sm:inline">Ananya</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-7 pb-24 sm:px-8">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-[#FFE7F0] bg-white/95 px-2 py-2 sm:hidden">
        {[
          ["/discover", "Discover", Sparkles],
          ["/likes", "Likes", Heart],
          ["/matches", "Matches", Users],
          ["/chat", "Chat", MessageCircle],
          ["/profile", "Profile", UserRound],
        ].map(([href, label, Icon]) => (
          <Link
            key={href}
            to={href}
            className="flex flex-col items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-500"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(23,21,26,0.05)] sm:p-7 ${className}`}
    >
      {children}
    </section>
  );
}

function Intro({ title, description }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF2D72]">
        Your LoveConnect
      </p>
      <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#17151A]">
        {title}
      </h2>
      <p className="mt-1.5 max-w-xl text-xs sm:text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
        active
          ? "border-[#FF2D72] bg-[#FF2D72] text-white"
          : "border-slate-200 text-slate-600 hover:border-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

function Menu({ href, icon: Icon, title, text }) {
  return (
    <Link
      to={href}
      className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#FFB7CF] transition-colors"
    >
      <span className="rounded-2xl bg-[#FFE7F0] p-3 text-[#FF2D72]">
        {createElement(Icon, { className: "h-5 w-5" })}
      </span>
      <span className="flex-1">
        <strong className="block text-sm font-extrabold text-[#17151A]">
          {title}
        </strong>
        <small className="mt-1 block text-xs text-slate-500">{text}</small>
      </span>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}

function Info({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      {createElement(Icon, { className: "h-4 w-4 text-[#FF2D72]" })}
      <p className="mt-2 text-[10px] font-bold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-xs font-bold text-slate-700">{value}</p>
    </div>
  );
}

function Toggle({ label, subtitle, value, onChange = () => {} }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between py-3.5 text-left transition-colors"
    >
      <div>
        <span className="block text-sm font-bold text-[#17151A]">{label}</span>
        {subtitle && (
          <span className="block text-xs text-slate-500 mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
          value ? "bg-[#FF2D72]" : "bg-slate-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function Range({ label, value, min, max, onChange }) {
  return (
    <label className="mt-6 block first:mt-0">
      <div className="flex justify-between text-sm font-extrabold text-[#17151A]">
        <span>{label}</span>
        <span className="text-[#FF2D72]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 w-full accent-[#FF2D72]"
      />
    </label>
  );
}

function Field({ label, value, wide = false }) {
  return (
    <label className={wide ? "sm:col-span-2" : ""}>
      <span className="mb-2 block text-xs font-bold text-slate-500">
        {label}
      </span>
      {wide ? (
        <textarea
          defaultValue={value}
          rows="4"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-[#17151A] outline-none focus:border-[#FF2D72]"
        />
      ) : (
        <input
          defaultValue={value}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-[#17151A] outline-none focus:border-[#FF2D72]"
        />
      )}
    </label>
  );
}

export function ProfileDetails() {
  const [liked, setLiked] = useState(false);
  return (
    <Shell title="Profile details" back>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden p-0">
          <div className="relative h-[480px]">
            <img
              src={profileOne}
              alt="Ananya"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-32 text-white">
              <h2 className="text-3xl font-black">
                Ananya, 24{" "}
                <CheckCircle2 className="inline h-5 w-5 fill-sky-400" />
              </h2>
              <p className="text-sm text-white/80">
                Product Designer at Google · Noida, India
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 p-5">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className="rounded-2xl bg-[#FFE7F0] py-3 text-sm font-bold text-[#FF2D72]"
            >
              {liked ? "Liked" : "Like"}
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#7C3AED] py-3 text-sm font-bold text-white"
            >
              Super like
            </button>
            <Link
              to="/chat"
              className="rounded-2xl bg-slate-100 py-3 text-center text-sm font-bold text-slate-700"
            >
              Message
            </Link>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <h3 className="font-extrabold text-[#17151A]">About Ananya</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Love exploring new places, good food and meaningful conversations.
              Looking to meet genuine people with big dreams.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Info label="Location" value="Noida, India" icon={MapPin} />
              <Info
                label="Education"
                value="Delhi University"
                icon={Sparkles}
              />
              <Info label="Height" value={"5'6\""} icon={UserRound} />
            </div>
          </Card>
          <Card>
            <h3 className="font-extrabold text-[#17151A]">Interests</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Travel",
                "Photography",
                "Music",
                "Food",
                "Fitness",
                "Nature",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#FFE7F0] px-3 py-2 text-xs font-bold text-[#FF2D72]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-xl border py-3 text-xs font-bold text-slate-600"
              >
                Report
              </button>
              <button
                type="button"
                className="flex-1 rounded-xl border border-red-100 py-3 text-xs font-bold text-red-500"
              >
                Block
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

export function Call() {
  const [camera, setCamera] = useState(true);
  return (
    <div className="min-h-screen bg-[#17151A] text-white">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-between overflow-hidden p-6">
        <img
          src={profileTwo}
          alt="Priya on call"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="relative">
          <b>Priya Sharma</b>
          <p className="text-xs text-white/70">00:14 · HD video</p>
        </div>
        <div className="relative self-end overflow-hidden rounded-2xl border-2 border-white/50">
          <img
            src={profileFour}
            alt="Your camera preview"
            className={`h-40 w-28 object-cover ${camera ? "" : "brightness-0"}`}
          />
        </div>
        <div className="relative flex justify-center gap-3">
          <button
            type="button"
            className="rounded-full bg-white/15 p-4"
            aria-label="Mute microphone"
          >
            <Phone />
          </button>
          <button
            type="button"
            onClick={() => setCamera(!camera)}
            className="rounded-full bg-white/15 p-4"
            aria-label="Toggle camera"
          >
            <Video />
          </button>
          <button
            type="button"
            className="rounded-full bg-[#EF4444] p-4"
            aria-label="End call"
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Filters() {
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState("Everyone");
  const [selected, setSelected] = useState(["Travel", "Music"]);

  const toggle = (item) =>
    setSelected(
      selected.includes(item)
        ? selected.filter((value) => value !== item)
        : [...selected, item],
    );

  return (
    <Shell title="Discovery filters" back>
      <Intro
        title="Find your kind of connection"
        description="Tune your preferences and make every recommendation feel more personal."
      />
      <Card className="mx-auto max-w-3xl">
        <Range
          label={`Age up to ${age}`}
          value={age}
          min="18"
          max="60"
          onChange={setAge}
        />
        <h3 className="mt-8 text-sm font-extrabold text-[#17151A]">Show me</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Men", "Women", "Everyone"].map((item) => (
            <Chip
              key={item}
              active={gender === item}
              onClick={() => setGender(item)}
            >
              {item}
            </Chip>
          ))}
        </div>
        <h3 className="mt-8 text-sm font-extrabold text-[#17151A]">
          Interests
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((item) => (
            <Chip
              key={item}
              active={selected.includes(item)}
              onClick={() => toggle(item)}
            >
              {item}
            </Chip>
          ))}
        </div>
        <Link
          to="/discover"
          className="mt-8 block rounded-2xl bg-[#FF2D72] py-3 text-center text-sm font-bold text-white shadow-xs hover:bg-[#E02663] transition-colors"
        >
          Apply filters
        </Link>
      </Card>
    </Shell>
  );
}

export function Notifications() {
  const [items, setItems] = useState([
    "Sarah liked your profile",
    "You have a new match",
    "Alex sent you a message",
    "Your Premium subscription expires soon",
  ]);
  return (
    <Shell title="Notifications" back>
      <Intro
        title="Your activity"
        description="Stay in the loop with matches, conversations, and account updates."
      />
      <Card className="mx-auto max-w-3xl p-2">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-4 rounded-2xl p-4 hover:bg-slate-50 transition-colors"
          >
            <span className="rounded-2xl bg-[#FFE7F0] p-3 text-[#FF2D72]">
              {index === 0 ? (
                <Heart className="h-5 w-5" />
              ) : index === 1 ? (
                <Sparkles className="h-5 w-5" />
              ) : index === 2 ? (
                <MessageCircle className="h-5 w-5" />
              ) : (
                <Crown className="h-5 w-5" />
              )}
            </span>
            <div className="flex-1">
              <b className="text-sm text-[#17151A]">{item}</b>
              <p className="text-xs text-slate-400">A few moments ago</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-[#FF2D72]" />
          </div>
        ))}
        {!items.length && (
          <div className="p-10 text-center text-sm text-slate-500">
            You are all caught up.
          </div>
        )}
        <button
          type="button"
          onClick={() => setItems([])}
          className="m-4 text-xs font-bold text-[#FF2D72] hover:underline"
        >
          Mark all read
        </button>
      </Card>
    </Shell>
  );
}

export function Premium() {
  const [plan, setPlan] = useState("3 months");
  const plans = [
    ["1 month", "₹499", "Flexible"],
    ["3 months", "₹999", "Save 33%"],
    ["12 months", "₹2,499", "Best value"],
  ];
  return (
    <Shell title="Premium" back>
      <div className="rounded-[2rem] bg-[#17151A] p-7 text-white sm:p-10">
        <span className="text-xs font-bold text-[#FCD34D]">
          <Crown className="mr-2 inline h-4 w-4" />
          LoveConnect Premium
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl font-black">
          Unlock more connections.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
          See who likes you, make unlimited connections, and put your profile in
          the spotlight.
        </p>
        <div className="mt-7 grid gap-3 text-sm font-semibold sm:grid-cols-2">
          <span>
            <Check className="mr-2 inline text-[#FCD34D]" />
            Unlimited likes
          </span>
          <span>
            <Check className="mr-2 inline text-[#FCD34D]" />
            Advanced filters
          </span>
          <span>
            <Check className="mr-2 inline text-[#FCD34D]" />
            See who likes you
          </span>
          <span>
            <Check className="mr-2 inline text-[#FCD34D]" />
            No ads
          </span>
        </div>
      </div>
      <div className="mx-auto mt-7 grid max-w-4xl gap-4 md:grid-cols-3">
        {plans.map(([name, price, note]) => (
          <button
            type="button"
            key={name}
            onClick={() => setPlan(name)}
            className={`rounded-3xl border p-5 text-left transition-all ${
              plan === name
                ? "border-[#FF2D72] bg-[#FFF5F8]"
                : "border-slate-200 bg-white"
            }`}
          >
            <span className="text-xs font-bold text-[#FF2D72]">{note}</span>
            <h3 className="mt-4 font-extrabold text-[#17151A]">{name}</h3>
            <p className="mt-2 text-2xl font-black text-[#17151A]">{price}</p>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => alert(`Payment selected for ${plan}`)}
        className="mx-auto mt-6 block w-full max-w-4xl rounded-2xl bg-[#FF2D72] py-4 text-sm font-extrabold text-white shadow-xs hover:bg-[#E02663] transition-colors"
      >
        Continue to payment
      </button>
    </Shell>
  );
}

export function EditProfile() {
  const [saved, setSaved] = useState(false);
  return (
    <Shell title="Edit profile" back>
      <Intro
        title="Make it feel like you"
        description="Keep your profile fresh so the right people can find you."
      />
      <Card className="mx-auto max-w-3xl">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Full name", "Ananya Verma"],
            ["Date of birth", "15 Aug 1999"],
            ["Gender", "Woman"],
            ["Location", "Noida, India"],
            ["Profession", "Product Designer"],
            ["Education", "Delhi University"],
            ["Height", `5'6"`],
          ].map(([label, value]) => (
            <Field key={label} label={label} value={value} />
          ))}
          <Field
            label="About me"
            value="Love exploring new places, good food and meaningful conversations."
            wide
          />
        </div>
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="mt-6 w-full rounded-2xl bg-[#FF2D72] py-3 text-sm font-bold text-white shadow-xs hover:bg-[#E02663] transition-colors"
        >
          {saved ? "Saved ✓" : "Save changes"}
        </button>
      </Card>
    </Shell>
  );
}

export function ManagePhotos() {
  const [photos, setPhotos] = useState([
    profileFour,
    profileOne,
    profileTwo,
    profileThree,
  ]);
  return (
    <Shell title="Manage photos" back>
      <Intro
        title="Your best angles"
        description="Your first photo is your main profile photo. Keep your gallery fresh and authentic."
      />
      <Card>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {photos.map((photo, index) => (
            <div
              key={`${photo}-${index}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img
                src={photo}
                alt={`Profile photo ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-[#FF2D72]">
                  Main photo
                </span>
              )}
              <button
                type="button"
                onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                aria-label="Delete photo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setPhotos([...photos, profileOne])}
            className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#FFB7CF] bg-[#FFF8FA] text-[#FF2D72] hover:bg-[#FFE7F0] transition-colors"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs font-bold">Add photo</span>
          </button>
        </div>
      </Card>
    </Shell>
  );
}

export function Visibility() {
  const [visibility, setVisibility] = useState("Public");
  const [lastSeen, setLastSeen] = useState(true);
  const [incognito, setIncognito] = useState(false);

  return (
    <Shell title="Profile visibility" back>
      <Intro
        title="Choose your visibility"
        description="You are in control of when and where people can discover you."
      />
      <Card className="mx-auto max-w-3xl">
        {[
          ["Public", "Everyone can discover your profile."],
          ["Only matches", "Only matched users can see your profile."],
          ["Hidden", "Your profile will not be shown to anyone."],
        ].map(([name, text]) => (
          <button
            type="button"
            key={name}
            onClick={() => setVisibility(name)}
            className={`mb-3 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
              visibility === name
                ? "border-[#FF2D72] bg-[#FFF5F8]"
                : "border-slate-200"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full border-4 ${visibility === name ? "border-[#FF2D72]" : "border-slate-300"}`}
            />
            <span>
              <b className="block text-sm text-[#17151A]">{name}</b>
              <small className="text-xs text-slate-500">{text}</small>
            </span>
          </button>
        ))}
        <div className="mt-4 pt-2 border-t border-slate-100 divide-y divide-slate-100">
          <Toggle
            label="Show last seen"
            value={lastSeen}
            onChange={() => setLastSeen(!lastSeen)}
          />
          <Toggle
            label="Incognito mode"
            value={incognito}
            onChange={() => setIncognito(!incognito)}
          />
        </div>
      </Card>
    </Shell>
  );
}

export function Verification() {
  const [status, setStatus] = useState({
    identity: "Pending",
    photo: "Verified",
    phone: "Verified",
    email: "Verified",
  });
  return (
    <Shell title="Verification" back>
      <Intro
        title="Build trust"
        description="Verified profiles help create a more respectful and authentic dating community."
      />
      <Card className="mx-auto max-w-3xl">
        {Object.entries(status).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0"
          >
            <span className="rounded-2xl bg-[#FFE7F0] p-3 text-[#FF2D72]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <b className="block text-sm capitalize text-[#17151A]">
                {key} verification
              </b>
              <small className="text-xs text-slate-500">
                {value === "Verified"
                  ? "Your verification is complete."
                  : "Complete this step to add trust."}
              </small>
            </div>
            {value === "Verified" ? (
              <span className="text-xs font-bold text-[#22C55E]">Verified</span>
            ) : (
              <button
                type="button"
                onClick={() => setStatus({ ...status, [key]: "Pending" })}
                className="rounded-xl bg-[#FF2D72] px-3 py-2 text-xs font-bold text-white hover:bg-[#E02663]"
              >
                Pending
              </button>
            )}
          </div>
        ))}
      </Card>
    </Shell>
  );
}

export function PrivacySafety() {
  return (
    <Shell title="Privacy & safety" back>
      <Intro
        title="Stay in control"
        description="Tools and guidance to help every LoveConnect conversation feel comfortable."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Menu
          href="/settings"
          icon={Lock}
          title="Blocked users"
          text="Manage people you have blocked"
        />
        <Menu
          href="/settings"
          icon={Eye}
          title="Muted users"
          text="Manage muted conversations"
        />
        <Menu
          href="/privacy-policy"
          icon={ShieldCheck}
          title="Privacy policy"
          text="How we handle your data"
        />
        <Menu
          href="/terms-conditions"
          icon={CheckCircle2}
          title="Terms & conditions"
          text="Community rules"
        />
        <Menu
          href="/contact"
          icon={MessageCircle}
          title="Contact support"
          text="Get help from our team"
        />
      </div>
    </Shell>
  );
}

export function SettingsPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  return (
    <DashboardLayout activeTab="settings">
      <div className="w-full pb-20 lg:pb-6 space-y-6 animate-fadeIn">
        <Intro
          title="Account settings"
          description="Manage your password and account access."
        />

        <div className="w-full space-y-5">
          {/* Change Password Card */}
          <Card className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-[#17151A]">
                  Change password
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Update your account login password.
                </p>
              </div>
              <Lock className="h-5 w-5 text-[#FF2D72] shrink-0" />
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setPasswordSaved(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-700">
                    Current password
                  </span>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-[#17151A] outline-none focus:border-[#FF2D72] transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-700">
                    New password
                  </span>
                  <input
                    required
                    minLength="8"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-[#17151A] outline-none focus:border-[#FF2D72] transition-colors"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#FF2D72] hover:underline"
                >
                  <Eye className="h-3.5 w-3.5" />
                  {showPassword ? "Hide password" : "Show password"}
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-[#FF2D72] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#E02663] transition-colors"
                >
                  {passwordSaved ? "Saved ✓" : "Update password"}
                </button>
              </div>
            </form>
          </Card>

          {/* Action Buttons */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 text-xs sm:text-sm font-bold text-slate-700 hover:border-[#FF2D72] hover:text-[#FF2D72] transition-colors shadow-xs cursor-pointer"
            >
              Log out
            </button>
            <button
              type="button"
              onClick={() => {
                setAccountModal(true);
                setConfirmAction(null);
              }}
              className="w-full rounded-2xl border border-red-100 bg-red-50/80 py-3 text-center text-xs sm:text-sm font-bold text-red-500 hover:bg-red-100/60 transition-colors cursor-pointer"
            >
              Deactivate or delete account
            </button>
          </div>
        </div>
      </div>

      {/* Deactivate or Delete Account Modal */}
      {accountModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => {
            setAccountModal(false);
            setConfirmAction(null);
          }}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#FFE7F0] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => {
                setAccountModal(false);
                setConfirmAction(null);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmAction ? (
              <>
                {/* Modal Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0 shadow-2xs">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#17151A]">
                      Manage Account Access
                    </h3>
                    <p className="text-xs text-slate-500">
                      Choose to pause your profile or delete your data permanently.
                    </p>
                  </div>
                </div>

                {/* Options List */}
                <div className="space-y-3 mt-5">
                  {/* Deactivate Option */}
                  <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div>
                      <h4 className="text-sm font-bold text-[#17151A]">
                        Deactivate account
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Temporarily hide your profile, photos, and activity. You can reactivate anytime simply by logging back in.
                      </p>
                    </div>
                    <div className="mt-3.5 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setConfirmAction("deactivate")}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Deactivate profile
                      </button>
                    </div>
                  </div>

                  {/* Delete Option */}
                  <div className="p-4 rounded-2xl border border-red-100 hover:border-red-300 bg-red-50/40 hover:bg-red-50/70 transition-all">
                    <div>
                      <h4 className="text-sm font-bold text-red-600">
                        Delete account permanently
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Permanently delete your profile, photos, conversations, and all account data. This action is irreversible.
                      </p>
                    </div>
                    <div className="mt-3.5 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setConfirmAction("delete")}
                        className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer shadow-2xs"
                      >
                        Delete permanently
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setAccountModal(false);
                      setConfirmAction(null);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              /* Confirmation Screen */
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                      confirmAction === "delete"
                        ? "bg-red-100 text-red-600"
                        : "bg-purple-100 text-[#7C3AED]"
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#17151A]">
                      {confirmAction === "delete"
                        ? "Delete Account Permanently?"
                        : "Deactivate Your Account?"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {confirmAction === "delete"
                        ? "This action cannot be undone."
                        : "You can come back anytime."}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 leading-relaxed">
                  {confirmAction === "delete"
                    ? "All your profile details, photos, messages, and settings will be permanently erased from LoveConnect. Are you sure you wish to continue?"
                    : "Your profile will be hidden from other singles immediately. Whenever you are ready to return, simply sign in to reactivate your account."}
                </p>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmAction(null)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountModal(false);
                      setConfirmAction(null);
                      navigate("/login");
                    }}
                    className={`rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-sm ${
                      confirmAction === "delete"
                        ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                        : "bg-slate-900 hover:bg-slate-800"
                    }`}
                  >
                    {confirmAction === "delete"
                      ? "Confirm Delete"
                      : "Confirm Deactivation"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export function DeleteAccount() {
  const [confirm, setConfirm] = useState(false);
  return (
    <Shell title="Account access" back>
      <div className="mx-auto max-w-2xl">
        <Intro
          title="Take a break or leave"
          description="Deactivation hides your profile temporarily. Deletion permanently removes your account and data."
        />
        <div className="space-y-4">
          <Card>
            <h3 className="font-extrabold text-[#17151A]">
              Deactivate account
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Temporarily hide your profile. You can come back whenever you are
              ready.
            </p>
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Deactivate
            </button>
          </Card>
          <Card>
            <h3 className="font-extrabold text-[#17151A]">Delete account</h3>
            <p className="mt-2 text-sm text-slate-500">
              Permanently delete your account and data. This cannot be undone.
            </p>
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="mt-4 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              Delete permanently
            </button>
          </Card>
        </div>
      </div>
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-black text-[#17151A]">Are you sure?</h3>
            <p className="mt-2 text-sm text-slate-500">
              This is a prototype action. Your account will not be changed yet.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="flex-1 rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
