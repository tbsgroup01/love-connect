import { Navigate, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Home from "./features/user/pages/Home";
import SplashScreen from "./features/user/pages/SplashScreen";
import PrivacyPolicy from "./features/user/pages/PrivacyPolicy";
import TermsConditions from "./features/user/pages/TermsConditions";
import Login from "./features/user/pages/Login";
import ForgotPassword from "./features/user/pages/ForgotPassword";
import Onboarding from "./features/user/pages/Onboarding";
import ProfileCreation from "./features/user/pages/ProfileCreation";
import Discover from "./features/user/pages/Discover";
import LikesPage from "./features/user/pages/LikesPage";
import MatchesPage from "./features/user/pages/MatchesPage";
import MessagesPage from "./features/user/pages/MessagesPage";
import ProfilePage from "./features/user/pages/ProfilePage";
import PremiumPage from "./features/user/pages/PremiumPage";
import VideoCall from "./features/user/pages/VideoCall";

import AdminDashboard from "./features/admin/pages/Dashboard/Dashboard";
import AdminUsers from "./features/admin/pages/UserManagement/Users";
import AdminProfiles from "./features/admin/pages/UserManagement/Profiles";
import AdminReportsModeration from "./features/admin/pages/UserManagement/ReportsModeration";
import AdminMatches from "./features/admin/pages/MatchChats/Matches";
import AdminChatManagement from "./features/admin/pages/MatchChats/ChatManagement";
import AdminVideoCallLogs from "./features/admin/pages/MatchChats/VideoCallLogs";
import AdminSubscriptionPlans from "./features/admin/pages/SubscriptionPayment/SubscriptionPlans";
import AdminTransactions from "./features/admin/pages/SubscriptionPayment/Transactions";
import AdminRevenueReports from "./features/admin/pages/SubscriptionPayment/RevenueReports";
import AdminBannersAds from "./features/admin/pages/ContentManagement/BannersAds";
import AdminFAQManagement from "./features/admin/pages/ContentManagement/FAQManagement";
import AdminAppSettings from "./features/admin/pages/Settings/AppSettings";
import AdminFeatureManagement from "./features/admin/pages/Settings/FeatureManagement";
import AdminActivityLogs from "./features/admin/pages/Settings/ActivityLogs";

function AdminProtectedRoute() {
  const location = useLocation();
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("loveconnect_admin_token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (_) {
    user = null;
  }

  const isAdmin = Boolean(token && user?.role === "admin");

  if (!isAdmin) {
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
  return (
    <>
      <ScrollToTop />
      <Routes>
        {" "}
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/login" element={<Login initialMode="login" />} />
        <Route path="/register" element={<Login initialMode="signup" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/create-profile" element={<ProfileCreation />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/call" element={<VideoCall />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/settings" element={<Navigate to="/profile" replace />} />
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="profiles" element={<AdminProfiles />} />
          <Route path="reports" element={<AdminReportsModeration />} />
          <Route path="matches" element={<AdminMatches />} />
          <Route path="chats" element={<AdminChatManagement />} />
          <Route path="video-calls" element={<AdminVideoCallLogs />} />
          <Route path="subscriptions" element={<AdminSubscriptionPlans />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="revenue" element={<AdminRevenueReports />} />
          <Route path="banners" element={<AdminBannersAds />} />
          <Route path="faq" element={<AdminFAQManagement />} />
          <Route path="app-settings" element={<AdminAppSettings />} />
          <Route
            path="feature-management"
            element={<AdminFeatureManagement />}
          />
          <Route path="activity-logs" element={<AdminActivityLogs />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
