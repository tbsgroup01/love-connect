import { Navigate, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./features/user/pages/Home"
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
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/login" element={<Login initialMode="login" />} />
        <Route path="/register" element={<Login initialMode="signup" />} />
        <Route path="/signup" element={<Login initialMode="signup" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/create-profile" element={<ProfileCreation />} />
        <Route path="/profile-creation" element={<ProfileCreation />} />
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
        <Route path="/call" element={<Call />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/premium" element={<Navigate to="/#pricing" replace />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/manage-photos" element={<ManagePhotos />} />
        <Route path="/visibility" element={<Visibility />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/privacy-safety" element={<PrivacySafety />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App

