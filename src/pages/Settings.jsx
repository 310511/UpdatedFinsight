import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  LayoutGrid,
  Upload,
  History,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Bell,
  Shield,
  Mail,
  Globe,
  Moon,
  Sun,
  Save,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const handleSave = () => {
    // Handle save settings
    alert("Settings saved successfully!");
  };

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
              active
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
            Settings
          </h1>

          <div className="flex items-center space-x-4">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="text-gray-600 w-5 h-5" />
            </div>
          </div>
        </header>

        {/* ---------- SETTINGS CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={currentUser?.displayName || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={currentUser?.email || ""}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                  <p className="text-xs text-gray-500">Receive email updates about your documents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                  <p className="text-xs text-gray-500">Get real-time notifications in your browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              {darkMode ? <Moon className="w-6 h-6 text-blue-600" /> : <Sun className="w-6 h-6 text-blue-600" />}
              <h2 className="text-lg font-semibold text-gray-800">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Dark Mode</label>
                <p className="text-xs text-gray-500">Switch to dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <div className="font-medium text-gray-800">Change Password</div>
                <div className="text-xs text-gray-500 mt-1">Update your account password</div>
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <div className="font-medium text-gray-800">Two-Factor Authentication</div>
                <div className="text-xs text-gray-500 mt-1">Add an extra layer of security</div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <Save className="w-5 h-5" />
              Save Changes
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

export default SettingsPage;


