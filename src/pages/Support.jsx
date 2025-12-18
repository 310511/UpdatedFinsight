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
  MessageCircle,
  Mail,
  Book,
  Video,
  Send,
  Search,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";

const SupportPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      alert("Your message has been sent! We'll get back to you soon.");
      setMessage("");
    }
  };

  const faqItems = [
    {
      question: "How do I upload a document?",
      answer: "Go to the Upload Document page and drag & drop your file or click to browse. Supported formats include PDF, Excel, CSV, and images.",
    },
    {
      question: "What file formats are supported?",
      answer: "FinSight supports PDF, Excel (.xlsx, .xls), CSV files, and scanned images (JPG, PNG).",
    },
    {
      question: "How long does processing take?",
      answer: "Most documents are processed within 3-5 seconds. Larger files may take up to 30 seconds.",
    },
    {
      question: "Can I download processed documents?",
      answer: "Yes! You can download your processed documents from the History page. Click the download icon next to any completed document.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All documents are encrypted and stored securely. We follow industry-standard security practices to protect your data.",
    },
  ];

  const resources = [
    { icon: <Book className="w-5 h-5" />, title: "Documentation", description: "Comprehensive guides and tutorials" },
    { icon: <Video className="w-5 h-5" />, title: "Video Tutorials", description: "Step-by-step video guides" },
    { icon: <MessageCircle className="w-5 h-5" />, title: "Community Forum", description: "Connect with other users" },
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
              onClick={() => navigate("/dashboard/history")}
            />
            <SidebarLink 
              icon={<HelpCircle />} 
              label="Support" 
              active
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
            Support Center
          </h1>

          <div className="flex items-center space-x-4">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <HelpCircle className="text-gray-600 w-5 h-5" />
            </div>
          </div>
        </header>

        {/* ---------- SUPPORT CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Contact Support</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Have a question or need help? Send us a message and we'll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your issue or question..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 mb-2">{faq.question}</h3>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Helpful Resources</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-blue-600">{resource.icon}</div>
                    <h3 className="font-medium text-gray-800">{resource.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Still Need Help?</h2>
            </div>
            <p className="mb-4">
              Reach out to us directly via email at{" "}
              <a href="mailto:support@finsight.com" className="underline font-medium">
                support@finsight.com
              </a>
            </p>
            <p className="text-sm opacity-90">
              Our support team is available Monday-Friday, 9 AM - 6 PM EST
            </p>
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

export default SupportPage;


