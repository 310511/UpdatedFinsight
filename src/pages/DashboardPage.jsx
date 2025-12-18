import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  LayoutGrid,
  Upload,
  Clock,
  TrendingUp,
  FileText,
  Bell,
  User,
  LogOut,
  History,
  Settings,
  HelpCircle,
  Eye,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Document Processed",
      message: "BankStatement_Jan2025.pdf has been successfully processed",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Feature Available",
      message: "Check out our new PDF export feature",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Processing Delayed",
      message: "GSTR-3B_Report.xlsx is taking longer than expected",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "success",
      title: "Document Processed",
      message: "VendorInvoice_1023.pdf has been successfully processed",
      time: "Yesterday",
      read: true,
    },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const analytics = [
    {
      title: "Total Documents Processed",
      value: "1,248",
      icon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Today's Files",
      value: "26",
      icon: <Upload className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Avg Processing Time",
      value: "3.4s",
      icon: <Clock className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Success Rate",
      value: "98.7%",
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
    },
  ];

  const recentUploads = [
    {
      name: "BankStatement_Jan2025.pdf",
      time: "10:24 AM",
      status: "Completed",
    },
    {
      name: "GSTR-3B_Report.xlsx",
      time: "09:10 AM",
      status: "Processing",
    },
    {
      name: "VendorInvoice_1023.pdf",
      time: "Yesterday",
      status: "Completed",
    },
    {
      name: "Payroll_Q4_2024.xls",
      time: "2 days ago",
      status: "Completed",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* ------------------ SIDEBAR ------------------ */}
      <aside className="w-[230px] bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center px-6 py-5 border-b">
            <div className="w-16 h-16 rounded-md flex items-center justify-center">
              <img src={logo} alt="" />
            </div>
            <span className="text-xl font-bold text-gray-800 ml-2">FinSight</span>
          </div>

          <nav className="mt-6 space-y-1">
            <SidebarLink 
              icon={<LayoutGrid />} 
              label="Dashboard" 
              active 
              onClick={() => navigate("/dashboard")}
            />
            <SidebarLink 
              icon={<Upload />} 
              label="Upload Document" 
              onClick={() => navigate("/dashboard/upload")}
            />
            <SidebarLink 
              icon={<History />} 
              label="History" 
              onClick={() => navigate("/dashboard/history")}
            />
            <SidebarLink 
              icon={<HelpCircle />} 
              label="Support" 
              onClick={() => navigate("/dashboard/support")}
            />
            <SidebarLink 
              icon={<Settings />} 
              label="Settings" 
              onClick={() => navigate("/dashboard/settings")}
            />
          </nav>
        </div>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-500 transition w-full"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* ------------------ MAIN CONTENT ------------------ */}
      <main className="flex-1 flex flex-col">
        {/* ---------- TOP BAR ---------- */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            Hello {currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"} 👋
          </h1>

          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative text-gray-500 hover:text-gray-700 transition-colors"
              >
              <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="overflow-y-auto max-h-80">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                              !notification.read ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`mt-0.5 ${
                                  notification.type === 'success' ? 'text-green-500' :
                                  notification.type === 'warning' ? 'text-yellow-500' :
                                  'text-blue-500'
                                }`}>
                                  {notification.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : notification.type === 'warning' ? (
                                    <AlertCircle className="w-5 h-5" />
                                  ) : (
                                    <Bell className="w-5 h-5" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-900">
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    title="Mark as read"
                                  >
                                    <CheckCircle className="w-4 h-4 text-gray-400" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                  title="Delete"
                                >
                                  <X className="w-4 h-4 text-gray-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => navigate("/dashboard/settings")}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium w-full text-center"
                      >
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
                title="Profile"
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm">
                    {currentUser?.displayName?.charAt(0)?.toUpperCase() || 
                     currentUser?.email?.charAt(0)?.toUpperCase() || 
                     'U'}
                  </span>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {currentUser?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser?.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard/settings");
                        setProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
            </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ---------- DASHBOARD CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ---- A. ANALYTICS CARDS ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {analytics.map((card, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center justify-between w-[250px] h-[120px]"
              >
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    {card.value}
                  </h2>
                </div>
                <div className="bg-gray-50 p-3 rounded-full">{card.icon}</div>
              </div>
            ))}
          </div>

          {/* ---- B. RECENT UPLOADS TABLE ---- */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Uploads
              </h3>
            </div>

            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-gray-600 bg-gray-100">
                  <th className="py-3 px-4 font-medium rounded-l-lg">Document Name</th>
                  <th className="py-3 px-4 font-medium">Upload Time</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((file, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {file.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{file.time}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          file.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {file.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex space-x-3 text-gray-600">
                      <button className="hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="hover:text-green-600">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---- C. QUICK ACTIONS BAR ---- */}
          <div className="flex flex-wrap gap-4 justify-end">
            <button 
              onClick={() => navigate("/dashboard/upload")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Upload Document
            </button>
            <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              View All Documents
            </button>
            <button className="border border-blue-300 text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
              Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sidebar Link Component ---
const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-6 py-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition text-left ${
      active ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" : "text-gray-600"
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </button>
);

export default DashboardPage;

