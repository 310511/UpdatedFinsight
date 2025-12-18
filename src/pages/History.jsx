import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  LayoutGrid,
  Upload,
  History,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  Eye,
  Download,
  Trash2,
  Calendar,
  Filter,
  Search,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const historyItems = [
    {
      id: 1,
      name: "BankStatement_Jan2025.pdf",
      type: "Bank Statement",
      uploadedAt: "2025-01-15 10:24 AM",
      processedAt: "2025-01-15 10:24 AM",
      status: "Completed",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "GSTR-3B_Report.xlsx",
      type: "GST Report",
      uploadedAt: "2025-01-15 09:10 AM",
      processedAt: "2025-01-15 09:11 AM",
      status: "Completed",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "VendorInvoice_1023.pdf",
      type: "Invoice",
      uploadedAt: "2025-01-14 03:45 PM",
      processedAt: "2025-01-14 03:46 PM",
      status: "Completed",
      size: "856 KB",
    },
    {
      id: 4,
      name: "Payroll_Q4_2024.xls",
      type: "Payroll",
      uploadedAt: "2025-01-13 11:20 AM",
      processedAt: "2025-01-13 11:21 AM",
      status: "Completed",
      size: "3.2 MB",
    },
    {
      id: 5,
      name: "TaxReturn_2024.pdf",
      type: "Tax Document",
      uploadedAt: "2025-01-12 02:15 PM",
      processedAt: "2025-01-12 02:16 PM",
      status: "Completed",
      size: "1.5 MB",
    },
    {
      id: 6,
      name: "ExpenseReport_Dec.xlsx",
      type: "Expense Report",
      uploadedAt: "2025-01-11 09:30 AM",
      processedAt: "2025-01-11 09:31 AM",
      status: "Completed",
      size: "2.1 MB",
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
              active
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
            Document History
          </h1>

          <div className="flex items-center space-x-4">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <FileText className="text-gray-600 w-5 h-5" />
            </div>
          </div>
        </header>

        {/* ---------- HISTORY CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Calendar className="w-5 h-5" />
                Date Range
              </button>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                All Documents ({historyItems.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="text-gray-600 bg-gray-100">
                    <th className="py-3 px-4 font-medium rounded-l-lg">Document Name</th>
                    <th className="py-3 px-4 font-medium">Type</th>
                    <th className="py-3 px-4 font-medium">Uploaded</th>
                    <th className="py-3 px-4 font-medium">Processed</th>
                    <th className="py-3 px-4 font-medium">Size</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium rounded-r-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.type}</td>
                      <td className="py-3 px-4 text-gray-600">{item.uploadedAt}</td>
                      <td className="py-3 px-4 text-gray-600">{item.processedAt}</td>
                      <td className="py-3 px-4 text-gray-600">{item.size}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex space-x-3 text-gray-600">
                        <button className="hover:text-blue-600" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="hover:text-green-600" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="hover:text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default HistoryPage;


