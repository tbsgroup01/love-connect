import { Navigate, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./features/user/pages/Home"
import SplashScreen from "./features/user/pages/SplashScreen"
import PrivacyPolicy from "./features/user/pages/PrivacyPolicy"
import TermsConditions from "./features/user/pages/TermsConditions"
import Login from "./features/user/pages/Login"
import ForgotPassword from "./features/user/pages/ForgotPassword"
import Onboarding from "./features/user/pages/Onboarding"
import ProfileCreation from "./features/user/pages/ProfileCreation"
import Discover from "./features/user/pages/Discover"
import LikesPage from "./features/user/pages/LikesPage"
import MatchesPage from "./features/user/pages/MatchesPage"
import MessagesPage from "./features/user/pages/MessagesPage"
import ProfilePage from "./features/user/pages/ProfilePage"
import PremiumPage from "./features/user/pages/PremiumPage"
import VideoCall from "./features/user/pages/VideoCall"

import {
  Call,
  DeleteAccount,
  EditProfile,
  Filters,
  ManagePhotos,
  Notifications,
  PrivacySafety,
  ProfileDetails,
  SettingsPage,
  Verification,
  Visibility,
} from "./features/user/pages/UserScreens"

import AdminDashboard from "./features/admin/pages/Dashboard/Dashboard"
import AdminUsers from "./features/admin/pages/UserManagement/Users"
import AdminProfiles from "./features/admin/pages/UserManagement/Profiles"
import AdminVerifications from "./features/admin/pages/UserManagement/Verifications"
import AdminReportsModeration from "./features/admin/pages/UserManagement/ReportsModeration"
import AdminMatches from "./features/admin/pages/MatchChats/Matches"
import AdminChatManagement from "./features/admin/pages/MatchChats/ChatManagement"
import AdminVideoCallLogs from "./features/admin/pages/MatchChats/VideoCallLogs"
import AdminSubscriptionPlans from "./features/admin/pages/SubscriptionPayment/SubscriptionPlans"
import AdminTransactions from "./features/admin/pages/SubscriptionPayment/Transactions"
import AdminRevenueReports from "./features/admin/pages/SubscriptionPayment/RevenueReports"

// Content Management
import AdminPushNotifications from "./features/admin/pages/ContentManagement/PushNotifications"
import AdminCMSPages from "./features/admin/pages/ContentManagement/CMSPages"
import AdminBannersAds from "./features/admin/pages/ContentManagement/BannersAds"
import AdminFAQManagement from "./features/admin/pages/ContentManagement/FAQManagement"

// Settings
import AdminAppSettings from "./features/admin/pages/Settings/AppSettings"
import AdminFeatureManagement from "./features/admin/pages/Settings/FeatureManagement"
import AdminLanguages from "./features/admin/pages/Settings/Languages"
import AdminUsersSettings from "./features/admin/pages/Settings/AdminUsers"
import AdminActivityLogs from "./features/admin/pages/Settings/ActivityLogs"

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "")
        const el = document.getElementById(id)
        if (el) {
          const yOffset = -80
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* LANDING & SPLASH */}
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        
        {/* AUTHENTICATION & ONBOARDING */}
        <Route path="/login" element={<Login initialMode="login" />} />
        <Route path="/register" element={<Login initialMode="signup" />} />
        <Route path="/signup" element={<Login initialMode="signup" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/create-profile" element={<ProfileCreation />} />
        <Route path="/profile-creation" element={<ProfileCreation />} />

        {/* CORE MOBILE DATING APP FLOW */}
        <Route path="/discover" element={<Discover />} />
        <Route path="/swipe" element={<Discover />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/likes-you" element={<LikesPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/chat" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/profile-details" element={<ProfileDetails />} />
        <Route path="/call" element={<VideoCall />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/pricing" element={<PremiumPage />} />
        <Route path="/subscription" element={<PremiumPage />} />
        <Route path="/plans" element={<PremiumPage />} />

        {/* USER PROFILE MANAGEMENT & SETTINGS */}
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/manage-photos" element={<ManagePhotos />} />
        <Route path="/photos" element={<ManagePhotos />} />
        <Route path="/visibility" element={<Visibility />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/privacy-safety" element={<PrivacySafety />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/delete-account" element={<DeleteAccount />} />

        {/* VIDEO & CALL ALIASES */}
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/video" element={<VideoCall />} />
        <Route path="/voice-call" element={<VideoCall />} />

        {/* ADMIN DASHBOARD FLOW */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminDashboard />} />

        {/* ADMIN USER MANAGEMENT */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/user" element={<AdminUsers />} />
        <Route path="/admin/profiles" element={<AdminProfiles />} />
        <Route path="/admin/profile" element={<AdminProfiles />} />
        <Route path="/admin/verifications" element={<AdminVerifications />} />
        <Route path="/admin/verification" element={<AdminVerifications />} />
        <Route path="/admin/reports" element={<AdminReportsModeration />} />
        <Route path="/admin/report" element={<AdminReportsModeration />} />
        <Route path="/admin/reports-moderation" element={<AdminReportsModeration />} />

        {/* ADMIN MATCH & CHAT */}
        <Route path="/admin/matches" element={<AdminMatches />} />
        <Route path="/admin/match" element={<AdminMatches />} />
        <Route path="/admin/chats" element={<AdminChatManagement />} />
        <Route path="/admin/chat" element={<AdminChatManagement />} />
        <Route path="/admin/chat-management" element={<AdminChatManagement />} />
        <Route path="/admin/video-calls" element={<AdminVideoCallLogs />} />
        <Route path="/admin/calls" element={<AdminVideoCallLogs />} />
        <Route path="/admin/call-logs" element={<AdminVideoCallLogs />} />
        <Route path="/admin/video-call-logs" element={<AdminVideoCallLogs />} />

        {/* ADMIN SUBSCRIPTION & PAYMENT */}
        <Route path="/admin/subscriptions" element={<AdminSubscriptionPlans />} />
        <Route path="/admin/subscription" element={<AdminSubscriptionPlans />} />
        <Route path="/admin/plans" element={<AdminSubscriptionPlans />} />
        <Route path="/admin/subscription-plans" element={<AdminSubscriptionPlans />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/transaction" element={<AdminTransactions />} />
        <Route path="/admin/payments" element={<AdminTransactions />} />
        <Route path="/admin/revenue" element={<AdminRevenueReports />} />
        <Route path="/admin/revenue-reports" element={<AdminRevenueReports />} />

        {/* ADMIN CONTENT MANAGEMENT */}
        <Route path="/admin/push-notifications" element={<AdminPushNotifications />} />
        <Route path="/admin/notifications" element={<AdminPushNotifications />} />
        <Route path="/admin/push" element={<AdminPushNotifications />} />
        <Route path="/admin/cms-pages" element={<AdminCMSPages />} />
        <Route path="/admin/cms" element={<AdminCMSPages />} />
        <Route path="/admin/banners" element={<AdminBannersAds />} />
        <Route path="/admin/banner" element={<AdminBannersAds />} />
        <Route path="/admin/ads" element={<AdminBannersAds />} />
        <Route path="/admin/faq" element={<AdminFAQManagement />} />
        <Route path="/admin/faqs" element={<AdminFAQManagement />} />

        {/* ADMIN SETTINGS */}
        <Route path="/admin/app-settings" element={<AdminAppSettings />} />
        <Route path="/admin/settings" element={<AdminAppSettings />} />
        <Route path="/admin/feature-management" element={<AdminFeatureManagement />} />
        <Route path="/admin/features" element={<AdminFeatureManagement />} />
        <Route path="/admin/languages" element={<AdminLanguages />} />
        <Route path="/admin/language" element={<AdminLanguages />} />
        <Route path="/admin/admin-users" element={<AdminUsersSettings />} />
        <Route path="/admin/roles" element={<AdminUsersSettings />} />
        <Route path="/admin/admins" element={<AdminUsersSettings />} />
        <Route path="/admin/activity-logs" element={<AdminActivityLogs />} />
        <Route path="/admin/logs" element={<AdminActivityLogs />} />
        <Route path="/admin/activity" element={<AdminActivityLogs />} />

        {/* CATCH ALL */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
