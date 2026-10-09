import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Heart,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  Activity,
  Shield,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar";

// Existing services already present in the codebase
import { getAllUsers } from "../../../../services/usersServices.js";
import { getAllMatches } from "../../../../services/matchesServices.js";
import { getReports } from "../../../../services/reportsServices.js";
import { getTransactions } from "../../../../services/paymentServices.js";
import { getActivities } from "../../../../services/activitiesServices.js";
import { getImageUrl } from "../../../../services/uploadServices.js";

const COLORS = {
  pink: "#FF2D72",
  lightPink: "#FFE7F0",
  purple: "#7C3AED",
  dark: "#17151A",
  white: "#FFFFFF",
  background: "#FAFAFC",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  blue: "#3B82F6",
};

// Relative time formatter helper
const getRelativeTime = (date) => {
  if (!date) return "Recently";
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return past.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Smooth cubic bezier spline for SVG curves
function generateSmoothSvgPath(points) {
  if (!points || points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : points.length - 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(
      1
    )} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Raw fetched DB records from existing routes
  const [usersList, setUsersList] = useState([]);
  const [matchesList, setMatchesList] = useState([]);
  const [reportsList, setReportsList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState("30d");
  const [demographicType, setDemographicType] = useState("gender");
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  // Fetch all data directly using the existing services
  const loadDashboardFromServices = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const [uRes, mRes, rRes, tRes, aRes] = await Promise.allSettled([
        getAllUsers(),
        getAllMatches(),
        getReports({ limit: 100 }),
        getTransactions(),
        getActivities(),
      ]);

      if (uRes.status === "fulfilled" && uRes.value?.data?.users) {
        setUsersList(uRes.value.data.users);
      }
      if (mRes.status === "fulfilled" && mRes.value?.data?.matches) {
        setMatchesList(mRes.value.data.matches);
      }
      if (rRes.status === "fulfilled" && rRes.value?.reports) {
        setReportsList(rRes.value.reports);
      } else if (rRes.status === "fulfilled" && rRes.value?.data?.reports) {
        setReportsList(rRes.value.data.reports);
      }
      if (tRes.status === "fulfilled" && tRes.value?.data?.transactions) {
        setTransactionsList(tRes.value.data.transactions);
      }
      if (aRes.status === "fulfilled") {
        const actData =
          aRes.value?.data?.activities || aRes.value?.data || [];
        setActivitiesList(Array.isArray(actData) ? actData : []);
      }
    } catch (err) {
      console.error("Error loading dashboard data from services:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardFromServices();
  }, [loadDashboardFromServices]);

  // 1. KPI Counts
  const totalUsersCount = usersList.length;
  const activeUsersCount = usersList.filter((u) => u.status === "active").length;
  const totalRevenue = useMemo(() => {
    return transactionsList
      .filter((t) => t.status === "success")
      .reduce(
        (sum, t) => sum + Number(t.final_amount ?? t.amount ?? 0),
        0
      );
  }, [transactionsList]);
  const totalReportsCount = reportsList.length;

  const kpiCards = [
    {
      title: "Total Users",
      value: totalUsersCount.toLocaleString(),
      bgColor: "#FF2D72",
      icon: Users,
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "Active Users",
      value: activeUsersCount.toLocaleString(),
      bgColor: "#3B82F6",
      icon: Activity,
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      bgColor: "#22C55E",
      iconText: "₹",
      onClick: () => navigate("/admin/transactions"),
    },
    {
      title: "Reports",
      value: totalReportsCount.toLocaleString(),
      bgColor: "#EF4444",
      icon: AlertTriangle,
      onClick: () => navigate("/admin/reports"),
    },
  ];

  // 2. Trend Graph calculated from usersList & activitiesList
  const activityTrend = useMemo(() => {
    const now = new Date();
    const intervals = [];

    if (timeframe === "7d") {
      for (let i = 6; i >= 0; i--) {
        const start = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - i,
          0,
          0,
          0,
          0
        );
        const end = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - i,
          23,
          59,
          59,
          999
        );
        const label = start.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const newU = usersList.filter((u) => {
          const d = new Date(u.createdAt);
          return d >= start && d <= end;
        }).length;
        const actU = activitiesList.filter((a) => {
          const d = new Date(a.createdAt || a.loginAt);
          return d >= start && d <= end;
        }).length;
        intervals.push({ label, newUsers: newU, activeUsers: actU });
      }
    } else if (timeframe === "year") {
      const year = now.getFullYear();
      for (let m = 0; m < 12; m++) {
        const start = new Date(year, m, 1, 0, 0, 0, 0);
        const end = new Date(year, m + 1, 0, 23, 59, 59, 999);
        const label = start.toLocaleDateString("en-US", { month: "short" });
        const newU = usersList.filter((u) => {
          const d = new Date(u.createdAt);
          return d >= start && d <= end;
        }).length;
        const actU = activitiesList.filter((a) => {
          const d = new Date(a.createdAt || a.loginAt);
          return d >= start && d <= end;
        }).length;
        intervals.push({ label, newUsers: newU, activeUsers: actU });
      }
    } else {
      // 30d (10 intervals across 30 days)
      const stepDays = 3;
      const count = 10;
      for (let i = count - 1; i >= 0; i--) {
        const end = new Date(now.getTime() - i * stepDays * 24 * 60 * 60 * 1000);
        const start = new Date(
          end.getTime() - stepDays * 24 * 60 * 60 * 1000
        );
        const label = end.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const newU = usersList.filter((u) => {
          const d = new Date(u.createdAt);
          return d >= start && d <= end;
        }).length;
        const actU = activitiesList.filter((a) => {
          const d = new Date(a.createdAt || a.loginAt);
          return d >= start && d <= end;
        }).length;
        intervals.push({ label, newUsers: newU, activeUsers: actU });
      }
    }

    return {
      labels: intervals.map((x) => x.label),
      newUsers: intervals.map((x) => x.newUsers),
      activeUsers: intervals.map((x) => x.activeUsers),
    };
  }, [timeframe, usersList, activitiesList]);

  // SVG Chart points
  const chartLabels = activityTrend.labels;
  const chartNewUsers = activityTrend.newUsers;
  const chartActiveUsers = activityTrend.activeUsers;
  const maxVal = Math.max(...chartNewUsers, ...chartActiveUsers, 5);

  const svgWidth = 700;
  const svgHeight = 220;
  const plotLeft = 50;
  const plotRight = 670;
  const plotTop = 25;
  const plotBottom = 195;
  const plotSpanX = plotRight - plotLeft;
  const plotSpanY = plotBottom - plotTop;
  const numPoints = Math.max(chartLabels.length, 1);

  const newUserPoints = chartNewUsers.map((val, idx) => {
    const x =
      numPoints === 1
        ? plotLeft + plotSpanX / 2
        : plotLeft + (idx / (numPoints - 1)) * plotSpanX;
    const y = plotBottom - (val / maxVal) * plotSpanY;
    return { x, y, val };
  });

  const activeUserPoints = chartActiveUsers.map((val, idx) => {
    const x =
      numPoints === 1
        ? plotLeft + plotSpanX / 2
        : plotLeft + (idx / (numPoints - 1)) * plotSpanX;
    const y = plotBottom - (val / maxVal) * plotSpanY;
    return { x, y, val };
  });

  const newUserCurve = generateSmoothSvgPath(newUserPoints);
  const activeUserCurve = generateSmoothSvgPath(activeUserPoints);

  const newUserArea =
    newUserPoints.length > 0
      ? `${newUserCurve} L ${
          newUserPoints[newUserPoints.length - 1].x
        } ${plotBottom} L ${newUserPoints[0].x} ${plotBottom} Z`
      : "";

  const activeUserArea =
    activeUserPoints.length > 0
      ? `${activeUserCurve} L ${
          activeUserPoints[activeUserPoints.length - 1].x
        } ${plotBottom} L ${activeUserPoints[0].x} ${plotBottom} Z`
      : "";

  // 3. Demographics calculated from usersList
  const demographicsData = useMemo(() => {
    const genderCounts = { Male: 0, Female: 0, "Non-binary": 0, Other: 0 };
    const ageCounts = { "18-24": 0, "25-34": 0, "35-44": 0, "45+": 0 };
    let ageProfileCount = 0;

    usersList.forEach((u) => {
      const p = u.profile || {};
      const g = (p.gender || u.gender || "").trim().toLowerCase();
      if (g === "male") genderCounts.Male++;
      else if (g === "female") genderCounts.Female++;
      else if (g.includes("non-binary") || g.includes("non binary"))
        genderCounts["Non-binary"]++;
      else genderCounts.Other++;

      const dobVal = p.date_of_birth || u.date_of_birth || u.dob;
      if (dobVal) {
        const dob = new Date(dobVal);
        if (!isNaN(dob.getTime())) {
          const diffMs = Date.now() - dob.getTime();
          const age = Math.abs(new Date(diffMs).getUTCFullYear() - 1970);
          if (age >= 18 && age <= 24) ageCounts["18-24"]++;
          else if (age >= 25 && age <= 34) ageCounts["25-34"]++;
          else if (age >= 35 && age <= 44) ageCounts["35-44"]++;
          else if (age >= 45) ageCounts["45+"]++;
          ageProfileCount++;
        }
      }
    });

    const demoTotal = Math.max(usersList.length, 1);
    const ageTotal = Math.max(ageProfileCount, 1);

    return {
      gender: [
        {
          label: "Male",
          color: "#3B82F6",
          count: genderCounts.Male,
          percentage: Math.round((genderCounts.Male / demoTotal) * 100),
        },
        {
          label: "Female",
          color: "#FF2D72",
          count: genderCounts.Female,
          percentage: Math.round((genderCounts.Female / demoTotal) * 100),
        },
        {
          label: "Non-binary",
          color: "#7C3AED",
          count: genderCounts["Non-binary"],
          percentage: Math.round((genderCounts["Non-binary"] / demoTotal) * 100),
        },
        {
          label: "Other",
          color: "#F59E0B",
          count: genderCounts.Other,
          percentage: Math.max(
            0,
            100 -
              Math.round((genderCounts.Male / demoTotal) * 100) -
              Math.round((genderCounts.Female / demoTotal) * 100) -
              Math.round((genderCounts["Non-binary"] / demoTotal) * 100)
          ),
        },
      ],
      age: [
        {
          label: "18-24",
          color: "#3B82F6",
          count: ageCounts["18-24"],
          percentage: Math.round((ageCounts["18-24"] / ageTotal) * 100),
        },
        {
          label: "25-34",
          color: "#FF2D72",
          count: ageCounts["25-34"],
          percentage: Math.round((ageCounts["25-34"] / ageTotal) * 100),
        },
        {
          label: "35-44",
          color: "#7C3AED",
          count: ageCounts["35-44"],
          percentage: Math.round((ageCounts["35-44"] / ageTotal) * 100),
        },
        {
          label: "45+",
          color: "#F59E0B",
          count: ageCounts["45+"],
          percentage: Math.max(
            0,
            100 -
              Math.round((ageCounts["18-24"] / ageTotal) * 100) -
              Math.round((ageCounts["25-34"] / ageTotal) * 100) -
              Math.round((ageCounts["35-44"] / ageTotal) * 100)
          ),
        },
      ],
      total: usersList.length,
    };
  }, [usersList]);

  const currentDemoItems =
    demographicType === "gender"
      ? demographicsData.gender
      : demographicsData.age;

  // Donut SVG circumference calculation
  let cumulativeDonutPct = 0;
  const donutSlices = currentDemoItems.map((item) => {
    const pct = item.percentage || 0;
    const slice = {
      ...item,
      dasharray: `${pct} 100`,
      dashoffset: -cumulativeDonutPct,
    };
    cumulativeDonutPct += pct;
    return slice;
  });

  // 4. Recent Users (sorted by createdAt desc, top 5)
  const recentUsers = useMemo(() => {
    return [...usersList]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((u) => {
        const p = u.profile || {};
        const name = p.full_name || u.name || "User";
        const avatar =
          p.profile_picture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=FF2D72&color=fff&size=100`;

        const statusCapitalized = u.status
          ? u.status.charAt(0).toUpperCase() + u.status.slice(1)
          : "Active";

        let statusBg = "#FFE7F0";
        let statusColor = "#22C55E";
        if (u.status === "inactive") {
          statusBg = "#FEF3C7";
          statusColor = "#D97706";
        } else if (u.status === "suspended") {
          statusBg = "#FEE2E2";
          statusColor = "#EF4444";
        }

        return {
          id: u.id,
          name,
          email: u.email,
          time: getRelativeTime(u.createdAt),
          status: statusCapitalized,
          statusBg,
          statusColor,
          avatar,
        };
      });
  }, [usersList]);

  // 5. Recent Matches (sorted by matched_at/createdAt desc, top 5)
  const recentMatches = useMemo(() => {
    return [...matchesList]
      .sort(
        (a, b) =>
          new Date(b.matched_at || b.createdAt) -
          new Date(a.matched_at || a.createdAt)
      )
      .slice(0, 5)
      .map((m) => {
        const u1 = m.userOne || {};
        const u2 = m.userTwo || {};
        const p1 = u1.profile || {};
        const p2 = u2.profile || {};

        const p1Name = p1.full_name || u1.name || "Member 1";
        const p2Name = p2.full_name || u2.name || "Member 2";

        const p1Img =
          p1.profile_picture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            p1Name
          )}&background=FF2D72&color=fff&size=100`;
        const p2Img =
          p2.profile_picture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            p2Name
          )}&background=7C3AED&color=fff&size=100`;

        return {
          id: m.id,
          p1: p1Name,
          p1Img,
          p2: p2Name,
          p2Img,
          time: getRelativeTime(m.matched_at || m.createdAt),
        };
      });
  }, [matchesList]);

  // 6. Recent Reports (sorted by createdAt desc, top 5)
  const recentReports = useMemo(() => {
    return [...reportsList]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((r) => {
        const rep = r.reporter || {};
        const reported = r.reportedUser || {};
        const repProfile = reported.profile || {};
        const reportedName =
          repProfile.full_name || reported.name || "Reported User";

        const avatar =
          repProfile.profile_picture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            reportedName
          )}&background=EF4444&color=fff&size=100`;

        const statusMap = {
          pending: {
            label: "Pending",
            bg: "#FEF3C7",
            color: "#D97706",
          },
          in_review: {
            label: "Under Review",
            bg: "#E0F2FE",
            color: "#0284C7",
          },
          resolved: {
            label: "Resolved",
            bg: "#DCFCE7",
            color: "#16A34A",
          },
          dismissed: {
            label: "Dismissed",
            bg: "#F3F4F6",
            color: "#6B7280",
          },
        };

        const meta = statusMap[r.status] || statusMap.pending;

        return {
          id: r.id,
          user: reportedName,
          email: reported.email || "No email",
          avatar,
          reportedBy: rep.name || "Anonymous",
          reason: r.reason,
          description: r.description,
          date: new Date(r.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          status: meta.label,
          statusStyle: { bg: meta.bg, color: meta.color },
        };
      });
  }, [reportsList]);

  return (
    <div
      style={{ backgroundColor: COLORS.background, color: COLORS.dark }}
      className="h-screen font-poppins flex flex-col overflow-hidden"
    >
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: COLORS.dark }}
                >
                  Dashboard
                </h1>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live Database</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Real-time operational metrics, member matching pulse and
                platform revenue analytics
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => loadDashboardFromServices(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                title="Refresh live data"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-gray-500 ${
                    refreshing ? "animate-spin text-[#FF2D72]" : ""
                  }`}
                />
                <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
          </div>

          {/* TOP ROW: KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {kpiCards.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  onClick={kpi.onClick}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-gray-100/80 shadow-2xs hover:shadow-md transition-all relative overflow-hidden flex items-center gap-3.5 border-l-4 cursor-pointer group"
                  style={{ borderLeftColor: kpi.bgColor }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: kpi.bgColor }}
                  >
                    {Icon ? (
                      <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                    ) : (
                      <span className="font-extrabold text-base">
                        {kpi.iconText}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-gray-500 block truncate">
                      {kpi.title}
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight mt-0.5">
                      {loading ? (
                        <span className="inline-block w-14 h-5 bg-gray-200 animate-pulse rounded"></span>
                      ) : (
                        kpi.value
                      )}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              );
            })}
          </div>

          {/* MIDDLE ROW 1: USER REGISTRATION CHART & DEMOGRAPHICS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Registration & Activity Trend */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-2xs flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2
                    className="text-base font-bold"
                    style={{ color: COLORS.dark }}
                  >
                    User Registration & Activity
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Account registrations vs member login activity
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS.pink }}
                    ></span>
                    <span className="text-gray-600">New Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS.purple }}
                    ></span>
                    <span className="text-gray-600">Active Logins</span>
                  </div>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                  >
                    <option value="30d">Last 30 Days</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>

              {/* Dynamic SVG Curves */}
              <div className="w-full h-64 relative flex-1">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 700 220"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF2D72" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FF2D72" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guide Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                    const y = plotBottom - pct * plotSpanY;
                    const val = Math.round(maxVal * pct);
                    return (
                      <g key={i}>
                        <line
                          x1={plotLeft - 10}
                          y1={y}
                          x2={plotRight}
                          y2={y}
                          stroke="#F3F4F6"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={plotLeft - 15}
                          y={y + 3}
                          fill="#9CA3AF"
                          fontSize="10"
                          textAnchor="end"
                          className="font-medium select-none"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradient Area Fills */}
                  {activeUserArea && (
                    <path d={activeUserArea} fill="url(#purpleGrad)" />
                  )}
                  {newUserArea && (
                    <path d={newUserArea} fill="url(#pinkGrad)" />
                  )}

                  {/* Bezier Lines */}
                  {activeUserCurve && (
                    <path
                      d={activeUserCurve}
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}
                  {newUserCurve && (
                    <path
                      d={newUserCurve}
                      fill="none"
                      stroke="#FF2D72"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Interactive Points */}
                  {activeUserPoints.map((pt, idx) => (
                    <circle
                      key={`act-${idx}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPointIndex === idx ? 5 : 3.5}
                      fill="#7C3AED"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-all cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                  ))}

                  {newUserPoints.map((pt, idx) => (
                    <circle
                      key={`new-${idx}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPointIndex === idx ? 5 : 3.5}
                      fill="#FF2D72"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-all cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                  ))}
                </svg>

                {/* Hover Tooltip Overlay */}
                {hoveredPointIndex !== null && chartLabels[hoveredPointIndex] && (
                  <div
                    className="absolute z-10 pointer-events-none bg-gray-900/90 text-white rounded-lg px-2.5 py-1.5 text-[11px] shadow-lg transform -translate-x-1/2 -translate-y-full"
                    style={{
                      left: `${
                        ((newUserPoints[hoveredPointIndex]?.x || plotLeft) /
                          svgWidth) *
                        100
                      }%`,
                      top: `${
                        ((Math.min(
                          newUserPoints[hoveredPointIndex]?.y || 100,
                          activeUserPoints[hoveredPointIndex]?.y || 100
                        ) -
                          10) /
                          svgHeight) *
                        100
                      }%`,
                    }}
                  >
                    <div className="font-bold text-gray-200 border-b border-gray-700/60 pb-1 mb-1">
                      {chartLabels[hoveredPointIndex]}
                    </div>
                    <div className="flex items-center gap-2 text-pink-400">
                      <span>New Users:</span>
                      <span className="font-extrabold text-white">
                        {chartNewUsers[hoveredPointIndex] || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <span>Logins:</span>
                      <span className="font-extrabold text-white">
                        {chartActiveUsers[hoveredPointIndex] || 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* X-axis Date Labels */}
              <div className="flex justify-between text-[11px] text-gray-400 px-6 sm:px-10 mt-3 select-none">
                {chartLabels.map((lbl, idx) => (
                  <span
                    key={idx}
                    className={`truncate text-center ${
                      hoveredPointIndex === idx ? "font-bold text-gray-900" : ""
                    }`}
                  >
                    {lbl}
                  </span>
                ))}
              </div>
            </div>

            {/* Demographics Donut Chart */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2
                    className="text-base font-bold"
                    style={{ color: COLORS.dark }}
                  >
                    User Demographics
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Member profile distribution
                  </p>
                </div>
                <select
                  value={demographicType}
                  onChange={(e) => setDemographicType(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                >
                  <option value="gender">By Gender</option>
                  <option value="age">By Age</option>
                </select>
              </div>

              {/* Donut Chart Visual */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F3F4F6"
                      strokeWidth="3.8"
                    />

                    {donutSlices.map((slice, i) => {
                      if (!slice.percentage || slice.percentage <= 0)
                        return null;
                      return (
                        <path
                          key={i}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={slice.color}
                          strokeWidth="4"
                          strokeDasharray={slice.dasharray}
                          strokeDashoffset={slice.dashoffset}
                          className="transition-all duration-500"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                    <span
                      className="text-2xl font-extrabold tracking-tight"
                      style={{ color: COLORS.dark }}
                    >
                      {demographicsData.total}
                    </span>
                    <span className="text-[11px] text-gray-400 font-semibold tracking-wide">
                      {demographicType === "gender" ? "Users" : "Profiles"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs font-semibold pt-2">
                {currentDemoItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-gray-500 font-medium">
                      {item.percentage}% ({item.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE ROW 2: NEW USERS & RECENT MATCHES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Users */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-2xs flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2
                    className="text-base font-bold"
                    style={{ color: COLORS.dark }}
                  >
                    New Users
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Latest registered accounts
                  </p>
                </div>
                <button
                  onClick={() => navigate("/admin/users")}
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] border border-[#FF2D72]/20 hover:bg-[#FFE7F0] active:scale-95 transition-all cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3.5 flex-1">
                {recentUsers.length === 0 ? (
                  <div className="h-44 flex flex-col items-center justify-center text-gray-400 text-xs">
                    <Users className="w-8 h-8 text-gray-300 mb-2 stroke-[1.5]" />
                    <span>No registered users found</span>
                  </div>
                ) : (
                  recentUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => navigate("/admin/users")}
                      className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-gray-50/80 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={getImageUrl(user.avatar)}
                          alt={user.name}
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name || "User"
                            )}&background=FF2D72&color=fff&size=100`;
                          }}
                          className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100 shadow-2xs"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate group-hover:text-[#FF2D72] transition-colors">
                            {user.name}
                          </div>
                          <div className="text-gray-400 text-[11px] truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[11px] text-gray-400">
                          {user.time}
                        </span>
                        <span
                          className="px-2.5 py-1 rounded-md font-semibold text-[10px]"
                          style={{
                            backgroundColor: user.statusBg,
                            color: user.statusColor,
                          }}
                        >
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-2xs flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2
                    className="text-base font-bold"
                    style={{ color: COLORS.dark }}
                  >
                    Recent Matches
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Member mutual matches
                  </p>
                </div>
                <button
                  onClick={() => navigate("/admin/matches")}
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] border border-[#FF2D72]/20 hover:bg-[#FFE7F0] active:scale-95 transition-all cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3.5 flex-1">
                {recentMatches.length === 0 ? (
                  <div className="h-44 flex flex-col items-center justify-center text-gray-400 text-xs">
                    <Heart className="w-8 h-8 text-pink-300 mb-2 stroke-[1.5]" />
                    <span>No matches recorded yet</span>
                  </div>
                ) : (
                  recentMatches.map((match) => (
                    <div
                      key={match.id}
                      onClick={() => navigate("/admin/matches")}
                      className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-gray-50/80 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={getImageUrl(match.p1Img)}
                          alt={match.p1}
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              match.p1
                            )}&background=FF2D72&color=fff&size=100`;
                          }}
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100 shadow-2xs"
                        />
                        <span className="font-bold text-gray-900 truncate max-w-[85px] sm:max-w-[110px]">
                          {match.p1}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                          <Heart className="w-3 h-3 text-[#FF2D72] fill-[#FF2D72]" />
                        </div>
                        <img
                          src={getImageUrl(match.p2Img)}
                          alt={match.p2}
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              match.p2
                            )}&background=7C3AED&color=fff&size=100`;
                          }}
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100 shadow-2xs"
                        />
                        <span className="font-bold text-gray-900 truncate max-w-[85px] sm:max-w-[110px]">
                          {match.p2}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 shrink-0">
                        {match.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW 3: RECENT REPORTS TABLE */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100/80 shadow-2xs overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2
                    className="text-base font-bold"
                    style={{ color: COLORS.dark }}
                  >
                    Recent Reports
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Flagged accounts and member moderation queue
                  </p>
                </div>
                <button
                  onClick={() => navigate("/admin/reports")}
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#FFE7F0]/80 backdrop-blur-md text-[#FF2D72] border border-[#FF2D72]/20 hover:bg-[#FFE7F0] active:scale-95 transition-all cursor-pointer"
                >
                  View All
                </button>
              </div>

              {recentReports.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-gray-400 text-xs">
                  <Shield className="w-8 h-8 text-gray-300 mb-2 stroke-[1.5]" />
                  <span>No reports currently submitted</span>
                </div>
              ) : (
                <table className="w-full text-left text-xs min-w-[550px]">
                  <thead>
                    <tr className="text-gray-400 font-semibold border-b border-gray-100 pb-2">
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Reported By</th>
                      <th className="pb-3 font-semibold">Reason</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50/50">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={getImageUrl(report.avatar)}
                              alt={report.user}
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  report.user || "User"
                                )}&background=EF4444&color=fff&size=100`;
                              }}
                              className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100 shadow-2xs"
                            />
                            <div>
                              <div className="font-bold text-gray-900">
                                {report.user}
                              </div>
                              <div className="text-gray-400 text-[10px]">
                                {report.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-gray-600 font-medium">
                          {report.reportedBy}
                        </td>
                        <td className="py-3 text-gray-600 font-medium">
                          {report.reason}
                        </td>
                        <td className="py-3 text-gray-400 text-[11px]">
                          {report.date}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className="px-2.5 py-1 rounded-md font-semibold text-[10px] inline-block"
                            style={{
                              backgroundColor: report.statusStyle.bg,
                              color: report.statusStyle.color,
                            }}
                          >
                            {report.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>


    </div>
  );
}
