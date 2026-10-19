import { Navigate, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { getSettings } from "./services/settingsServices.js";
import { updateBrowserFavicon } from "./services/uploadServices.js";
import api from "./services/api.js";
import Home from "./features/user/pages/Home";
import { useAuth } from "./context/AuthContext.jsx";

// Eagerly keep Home for instant LCP, lazy load all other routes
const PrivacyPolicy = lazy(() => import("./features/user/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./features/user/pages/TermsConditions"));
const Login = lazy(() => import("./features/user/pages/Login"));
const ForgotPassword = lazy(() => import("./features/user/pages/ForgotPassword"));
const Onboarding = lazy(() => import("./features/user/pages/Onboarding"));
const ProfileCreation = lazy(() => import("./features/user/pages/ProfileCreation"));
const Discover = lazy(() => import("./features/user/pages/Discover"));
const LikesPage = lazy(() => import("./features/user/pages/LikesPage"));
const MatchesPage = lazy(() => import("./features/user/pages/MatchesPage"));
const MessagesPage = lazy(() => import("./features/user/pages/MessagesPage"));
const ProfilePage = lazy(() => import("./features/user/pages/ProfilePage"));
const VideoCall = lazy(() => import("./features/user/pages/VideoCall"));
const HelpSupport = lazy(() => import("./features/user/pages/HelpSupport"));

// Lazy load admin portal routes
const AdminDashboard = lazy(() => import("./features/admin/pages/Dashboard/Dashboard"));
const AdminUsers = lazy(() => import("./features/admin/pages/UserManagement/Users"));
const AdminProfiles = lazy(() => import("./features/admin/pages/UserManagement/Profiles"));
const AdminReportsModeration = lazy(() => import("./features/admin/pages/UserManagement/ReportsModeration"));
const AdminMatches = lazy(() => import("./features/admin/pages/MatchChats/Matches"));
const AdminChatManagement = lazy(() => import("./features/admin/pages/MatchChats/ChatManagement"));
const AdminVideoCallLogs = lazy(() => import("./features/admin/pages/MatchChats/VideoCallLogs"));
const AdminPlans = lazy(() => import("./features/admin/pages/SubscriptionPayment/Plans"));
const AdminTransactions = lazy(() => import("./features/admin/pages/SubscriptionPayment/Transactions"));
const AdminRevenueReports = lazy(() => import("./features/admin/pages/SubscriptionPayment/RevenueReports"));
const AdminBannersAds = lazy(() => import("./features/admin/pages/ContentManagement/BannersAds"));
const AdminSupportManagement = lazy(() => import("./features/admin/pages/ContentManagement/SupportManagement"));
const AdminAppSettings = lazy(() => import("./features/admin/pages/Settings/AppSettings"));
const AdminFeatureManagement = lazy(() => import("./features/admin/pages/Settings/FeatureManagement"));
const AdminActivityLogs = lazy(() => import("./features/admin/pages/Settings/ActivityLogs"));

// Lightweight spinner for lazy route transitions
function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="w-9 h-9 border-3 border-pink-200 border-t-[#FF2D72] rounded-full animate-spin" />
    </div>
  );
}

function AdminProtectedRoute() {
  const location = useLocation();
  const { user, token, isAdmin } = useAuth();

  const localUser = (() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  })();
  const localToken =
    localStorage.getItem("token") ||
    localStorage.getItem("loveconnect_admin_token");

  const effectiveUser = user || localUser;
  const effectiveToken = token || localToken;
  const role = (effectiveUser?.role || "").toLowerCase().trim();

  const isUserAdmin = Boolean(
    effectiveToken &&
      (isAdmin ||
        role === "admin" ||
        effectiveUser?.admin_id !== undefined ||
        effectiveUser?.email?.toLowerCase().includes("admin") ||
        Boolean(localStorage.getItem("loveconnect_admin_token")))
  );

  if (!isUserAdmin) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message:
            "Please sign in with an admin account to access Admin Dashboard.",
        }}
      />
    );
  }

  return <Outlet />;
}

function UserProtectedRoute() {
  const location = useLocation();
  const { user, token, isAdmin } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const role = (user?.role || "").toLowerCase().trim();
  const isUserAdmin = Boolean(
    isAdmin ||
      role === "admin" ||
      user?.admin_id !== undefined ||
      user?.email?.toLowerCase().includes("admin") ||
      Boolean(localStorage.getItem("loveconnect_admin_token"))
  );

  // Prevent admin accounts from landing in user routes/dashboard
  if (isUserAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.status && user.status !== "active") {
    const statusText = user.status === "suspended" ? "suspended" : "deactivated";
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: `Your account has been ${statusText}. Please contact admin.`,
        }}
      />
    );
  }

  return <Outlet />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -80;
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const location = useLocation();
  const { user, token } = useAuth();

  useEffect(() => {
    const initBranding = async () => {
      try {
        const res = await getSettings();
        if (res.data?.success && res.data?.settings) {
          const s = res.data.settings;
          if (s.favicon) updateBrowserFavicon(s.favicon);
          if (s.brandName) document.title = s.brandName;
        }
      } catch (_) {}
    };
    initBranding();

    const handleSettingsUpdate = (e) => {
      if (e.detail?.favicon) updateBrowserFavicon(e.detail.favicon);
      if (e.detail?.brandName) document.title = e.detail.brandName;
    };
    window.addEventListener("app_settings_updated", handleSettingsUpdate);
    return () =>
      window.removeEventListener("app_settings_updated", handleSettingsUpdate);
  }, []);

  useEffect(() => {
    if (!token || !user || user.role === "admin") return;

    const verifyStatus = async () => {
      try {
        await api.get("/auth/check-status");
      } catch (_) {}
    };

    verifyStatus();
    window.addEventListener("focus", verifyStatus);

    return () => {
      window.removeEventListener("focus", verifyStatus);
    };
  }, [token, user]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/splash" element={<SplashScreen />} /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/login" element={<Login initialMode="login" />} />
          <Route path="/register" element={<Login initialMode="signup" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<UserProtectedRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/create-profile" element={<ProfileCreation />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/likes" element={<LikesPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/call" element={<VideoCall />} />
            <Route path="/help" element={<HelpSupport />} />
          </Route>
          <Route path="/premium" element={<Navigate to="/#pricing" replace />} />
          <Route path="/settings" element={<Navigate to="/profile" replace />} />
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="profiles" element={<AdminProfiles />} />
            <Route path="reports" element={<AdminReportsModeration />} />
            <Route path="matches" element={<AdminMatches />} />
            <Route path="chats" element={<AdminChatManagement />} />
            <Route path="calls" element={<AdminVideoCallLogs />} />
            <Route path="plans" element={<AdminPlans />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="revenue" element={<AdminRevenueReports />} />
            <Route path="banners" element={<AdminBannersAds />} />
            <Route path="support" element={<AdminSupportManagement />} />
            {/* <Route path="faq" element={<AdminFAQManagement />} /> */}
            <Route path="app-settings" element={<AdminAppSettings />} />
            <Route
              path="feature-management"
              element={<AdminFeatureManagement />}
            />
            <Route path="activity-logs" element={<AdminActivityLogs />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
