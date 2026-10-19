import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { createActivity } from "../services/activitiesServices.js";

const AuthContext = createContext(null);

const USER_KEY = "user";
const TOKEN_KEY = "token";
const ADMIN_TOKEN_KEY = "loveconnect_admin_token";

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (_) {
    return null;
  }
};

const getInitialToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY) || null;
  } catch (_) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  // Sync state if localStorage changes or custom event is dispatched (multi-tab / 403 interceptor)
  const syncFromStorage = useCallback(() => {
    setUser(getInitialUser());
    setToken(getInitialToken());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      syncFromStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loveconnect_auth_change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loveconnect_auth_change", handleStorageChange);
    };
  }, [syncFromStorage]);

  const login = useCallback((newToken, newUser) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      const userRole = (newUser?.role || "").toLowerCase().trim();
      const isAdminRole =
        userRole === "admin" ||
        newUser?.admin_id !== undefined ||
        newUser?.email?.toLowerCase().includes("admin");

      if (isAdminRole) {
        localStorage.setItem(ADMIN_TOKEN_KEY, newToken);
      }
      setToken(newToken);
    }
    if (newUser) {
      const userRole = (newUser?.role || "").toLowerCase().trim();
      const isAdminRole =
        userRole === "admin" ||
        newUser?.admin_id !== undefined ||
        newUser?.email?.toLowerCase().includes("admin");

      const normalizedUser = {
        ...newUser,
        role: isAdminRole ? "admin" : (userRole || "user"),
      };
      localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
      setUser(normalizedUser);
    }
    window.dispatchEvent(new Event("loveconnect_auth_change"));
  }, []);

  const logout = useCallback(async () => {
    const currentUser = user || getInitialUser();
    if (currentUser && (currentUser.id || currentUser.user_id)) {
      try {
        const isAdminUser = currentUser.role === "admin";
        const targetId = currentUser.id || currentUser.user_id;

        await createActivity({
          admin_id: isAdminUser ? targetId : null,
          user_id: !isAdminUser ? targetId : null,
          role: isAdminUser ? "admin" : "user",
          action: "LOGOUT",
        });
      } catch (err) {
        console.error("Failed to record logout activity:", err);
      }
    }

    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem("loveconnect_admin_session");
    } catch (_) {}

    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event("loveconnect_auth_change"));
  }, [user]);

  const updateUser = useCallback((updatedFieldsOrFn) => {
    setUser((prevUser) => {
      const nextUser =
        typeof updatedFieldsOrFn === "function"
          ? updatedFieldsOrFn(prevUser)
          : { ...prevUser, ...updatedFieldsOrFn };

      try {
        if (nextUser) {
          localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
        } else {
          localStorage.removeItem(USER_KEY);
        }
      } catch (_) {}

      window.dispatchEvent(new Event("loveconnect_auth_change"));
      return nextUser;
    });
  }, []);

  const isAuthenticated = Boolean(token && user);
  const userRole = (user?.role || "").toLowerCase().trim();
  const isAdmin = Boolean(
    token &&
      (userRole === "admin" ||
        user?.admin_id !== undefined ||
        user?.email?.toLowerCase().includes("admin") ||
        Boolean(localStorage.getItem(ADMIN_TOKEN_KEY)))
  );

  const value = {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    updateUser,
    syncFromStorage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
