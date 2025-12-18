import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  LayoutGrid,
  Upload as UploadIcon,
  History,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";

const DOCUMENT_TYPES = [
  { value: "bank_statement", label: "Bank Statement" },
  { value: "gst_return", label: "GST Returns" },
  { value: "trial_balance", label: "Trial Balance" },
  { value: "audit", label: "Audit" },
];

const UploadPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [showDocumentTypeDropdown, setShowDocumentTypeDropdown] = useState(false);
  
  // Audit-specific state
  const [auditFiles, setAuditFiles] = useState({
    trialBalance: null,
    profitLossStatement: null,
    balanceSheet: null,
    generalLedger: null,
    cashBook: null,
    bankStatement: null,
    fixedAssetRegister: null,
    gstReturns: null,
    tdsSummary: null,
  });

  // GST-specific state
  const [gstFiles, setGstFiles] = useState({
    gstr2bSummary: null,
    purchaseRegister: null,
    vendorMaster: null,
  });

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Remove file
  const removeFile = () => {
    setFile(null);
    setDocumentType("");
    // Reset audit files when document type changes
    setAuditFiles({
      trialBalance: null,
      profitLossStatement: null,
      balanceSheet: null,
      generalLedger: null,
      cashBook: null,
      bankStatement: null,
      fixedAssetRegister: null,
      gstReturns: null,
      tdsSummary: null,
    });
  };

  // Handle audit file uploads
  const handleAuditFileChange = (field, file) => {
    setAuditFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // Remove audit file
  const removeAuditFile = (field) => {
    setAuditFiles(prev => ({
      ...prev,
      [field]: null
    }));
  };

  // Handle GST file uploads
  const handleGstFileChange = (field, file) => {
    setGstFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // Remove GST file
  const removeGstFile = (field) => {
    setGstFiles(prev => ({
      ...prev,
      [field]: null
    }));
  };

  // Start processing
  const handleStartProcessing = async () => {
    if (documentType === "audit") {
      // Validate audit inputs - check if at least one file is uploaded
      const uploadedFiles = Object.values(auditFiles).filter(file => file !== null);
      if (uploadedFiles.length === 0) {
        alert("Please upload at least one PDF or DOCX file to generate the audit report.");
        return;
      }
      
      try {
        navigate("/dashboard/processing", {
          state: {
            documentType: "audit",
            auditFiles: auditFiles,
            isMultipleFiles: true
          }
        });
      } catch (error) {
        console.error("Error starting processing:", error);
        alert("Failed to start processing. Please try again.");
      }
    } else if (documentType === "gst_return") {
      // Validate GST inputs - check if at least one Excel file is uploaded
      const uploadedFiles = Object.values(gstFiles).filter(file => file !== null);
      if (uploadedFiles.length === 0) {
        alert("Please upload at least one Excel file (GSTR-2B Summary, Purchase Register, or Vendor Master) to generate GST reports.");
        return;
      }
      
      try {
        navigate("/dashboard/processing", {
          state: {
            documentType: "gst_return",
            gstFiles: gstFiles,
            isMultipleFiles: true
          }
        });
      } catch (error) {
        console.error("Error starting processing:", error);
        alert("Failed to start processing. Please try again.");
      }
    } else {
      // Regular single file upload
      if (!file) return;
      if (!documentType) {
        alert("Please select a document type before processing.");
        return;
      }
      
      try {
        navigate("/dashboard/processing", { 
          state: { 
            fileName: file.name, 
            fileSize: file.size, 
            file: file,
            documentType: documentType
          } 
        });
      } catch (error) {
        console.error("Error starting processing:", error);
        alert("Failed to start processing. Please try again.");
      }
    }
  };

  // Check if audit form is valid - at least one file must be uploaded
  const isAuditFormValid = () => {
    return Object.values(auditFiles).some(file => file !== null);
  };

  const isGstFormValid = () => {
    return Object.values(gstFiles).some(file => file !== null);
  };

  // Check if regular form is valid
  const isRegularFormValid = () => {
    return file && documentType;
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
              icon={<UploadIcon />} 
              label="Upload Document" 
              active
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
            Upload Document
          </h1>
        </header>

        {/* ---------- UPLOAD CONTENT ---------- */}
        <div className={`flex-1 overflow-y-auto flex flex-col px-4 py-12 ${
          (documentType === "audit" || documentType === "gst_return") ? "items-start" : "items-center justify-center"
        }`}>
          {/* ---------- PAGE TITLE ---------- */}
          <div className={`text-center mb-8 ${(documentType === "audit" || documentType === "gst_return") ? "w-full max-w-6xl mx-auto" : "max-w-2xl"}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Upload Your Financial Document
            </h1>
            <p className="text-gray-600">
              Supported formats: <span className="font-medium">PDF</span>,{" "}
              <span className="font-medium">Excel</span>,{" "}
              <span className="font-medium">CSV</span>, Bank Statements, Invoices
            </p>
          </div>

          {/* ---------- DOCUMENT TYPE SELECTOR ---------- */}
          <div className={`w-full mb-6 ${(documentType === "audit" || documentType === "gst_return") ? "max-w-6xl mx-auto" : "max-w-lg"}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDocumentTypeDropdown(!showDocumentTypeDropdown)}
                className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-left flex items-center justify-between transition-colors ${
                  documentType
                    ? "border-blue-500 text-gray-900"
                    : "border-gray-300 text-gray-500"
                } hover:border-blue-400`}
              >
                <span>
                  {documentType
                    ? DOCUMENT_TYPES.find((dt) => dt.value === documentType)?.label
                    : "Select document type"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showDocumentTypeDropdown ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {showDocumentTypeDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDocumentTypeDropdown(false)}
                  ></div>
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {DOCUMENT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setDocumentType(type.value);
                          setShowDocumentTypeDropdown(false);
                          // Reset files when changing document type
                          if (type.value !== "audit") {
                            setFile(null);
                            setAuditFiles({
                              trialBalance: null,
                              profitLossStatement: null,
                              balanceSheet: null,
                              generalLedger: null,
                              cashBook: null,
                              bankStatement: null,
                              fixedAssetRegister: null,
                              gstReturns: null,
                              tdsSummary: null,
                            });
                          } else {
                            setFile(null);
                          }
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                          documentType === type.value
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ---------- UPLOAD SECTION (Conditional based on document type) ---------- */}
          {documentType === "audit" ? (
            <AuditUploadForm 
              auditFiles={auditFiles}
              onFileChange={handleAuditFileChange}
              onRemoveFile={removeAuditFile}
            />
          ) : documentType === "gst_return" ? (
            <GstUploadForm 
              gstFiles={gstFiles}
              onFileChange={handleGstFileChange}
              onRemoveFile={removeGstFile}
            />
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`w-full max-w-lg h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors ${
                dragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white hover:border-blue-400"
              }`}
            >
              {!file ? (
                <>
                  <UploadIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-700 font-medium">
                    Drag & Drop your document here
                  </p>
                  <span className="text-gray-500 text-sm my-2">OR</span>
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                    Browse Files
                    <input
                      type="file"
                      accept=".pdf,.xls,.xlsx,.csv,.doc,.docx,.jpg,.png"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <FileText className="w-10 h-10 text-blue-600" />
                  <div>
                    <p className="text-gray-800 font-semibold">{file.name}</p>
                    <p className="text-gray-500 text-sm">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={removeFile}
                      className="flex items-center px-4 py-1.5 rounded-md bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200 transition"
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Remove
                    </button>
                    <label className="flex items-center px-4 py-1.5 rounded-md bg-blue-100 text-blue-600 text-sm font-medium hover:bg-blue-200 transition cursor-pointer">
                      <UploadIcon className="w-4 h-4 mr-1" />
                      Re-upload
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------- PROCESS BUTTON ---------- */}
          <div className={`mt-10 w-full ${(documentType === "audit" || documentType === "gst_return") ? "max-w-6xl mx-auto" : "max-w-lg"}`}>
            <button
              onClick={handleStartProcessing}
              disabled={
                documentType === "audit" ? !isAuditFormValid() : 
                documentType === "gst_return" ? !isGstFormValid() : 
                !isRegularFormValid()
              }
              className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
                (documentType === "audit" ? isAuditFormValid() : 
                 documentType === "gst_return" ? isGstFormValid() : 
                 isRegularFormValid())
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Start AI Processing
            </button>
            {documentType && documentType !== "audit" && documentType !== "gst_return" && !file && (
              <p className="mt-2 text-sm text-red-500 text-center">
                Please upload a file to continue
              </p>
            )}
            {documentType === "audit" && !isAuditFormValid() && (
              <p className="mt-2 text-sm text-red-500 text-center">
                Please upload at least one PDF or DOCX file to generate the audit report
              </p>
            )}
            {documentType === "gst_return" && !isGstFormValid() && (
              <p className="mt-2 text-sm text-red-500 text-center">
                Please upload at least one Excel file to generate GST reports
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Audit Upload Form Component ---
const AuditUploadForm = ({ auditFiles, onFileChange, onRemoveFile }) => {
  const [dragOverField, setDragOverField] = useState(null);

  // Handle drag and drop
  const handleDragOver = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(fieldKey);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);
  };

  const handleDrop = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate it's a PDF or DOCX
      const isValidFile = file.type === "application/pdf" || 
                         file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                         file.type === "application/msword" ||
                         file.name.toLowerCase().endsWith(".pdf") ||
                         file.name.toLowerCase().endsWith(".docx") ||
                         file.name.toLowerCase().endsWith(".doc");
      if (isValidFile) {
        onFileChange(fieldKey, file);
      } else {
        alert("Please drop a PDF or DOCX file only.");
      }
    }
  };

  const auditInputs = [
    {
      key: "trialBalance",
      label: "Trial Balance",
      description: "PDF or DOCX file containing trial balance",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📊"
    },
    {
      key: "profitLossStatement",
      label: "Profit & Loss Statement",
      description: "PDF or DOCX file containing profit & loss statement",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📈"
    },
    {
      key: "balanceSheet",
      label: "Balance Sheet",
      description: "PDF or DOCX file containing balance sheet",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📋"
    },
    {
      key: "generalLedger",
      label: "General Ledger",
      description: "PDF or DOCX file containing general ledger sample",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📔"
    },
    {
      key: "cashBook",
      label: "Cash Book",
      description: "PDF or DOCX file containing cash book records",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "💰"
    },
    {
      key: "bankStatement",
      label: "Bank Statement",
      description: "PDF or DOCX file containing bank statement",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "🏦"
    },
    {
      key: "fixedAssetRegister",
      label: "Fixed Asset Register",
      description: "PDF or DOCX file containing fixed asset register",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "🏢"
    },
    {
      key: "gstReturns",
      label: "GST Returns",
      description: "PDF or DOCX file containing GST returns",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📑"
    },
    {
      key: "tdsSummary",
      label: "TDS Summary",
      description: "PDF or DOCX file containing TDS summary (e.g., FY 2023-24)",
      accept: ".pdf,.docx,.doc",
      required: false,
      icon: "📄"
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-blue-900 mb-1">INPUTS FOR AUDIT REPORT</h3>
        <p className="text-sm text-blue-700">Please upload the PDF or DOCX files you have. Upload as many as available - the audit report will be generated from all uploaded documents.</p>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auditInputs.map((input) => (
          <div 
            key={input.key} 
            className="bg-white border-2 rounded-lg p-4 transition-colors"
            style={{
              borderColor: dragOverField === input.key ? "#3b82f6" : auditFiles[input.key] ? "#10b981" : "#e5e7eb",
              backgroundColor: dragOverField === input.key ? "#eff6ff" : "white"
            }}
            onDragOver={(e) => handleDragOver(e, input.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, input.key)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  {input.icon} {input.label}
                  {input.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <p className="text-xs text-gray-500 mb-3">{input.description}</p>
              </div>
            </div>
            
            {auditFiles[input.key] ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                <div className="flex items-center flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">{auditFiles[input.key].name}</span>
                </div>
                <button
                  onClick={() => onRemoveFile(input.key)}
                  className="ml-2 text-red-600 hover:text-red-700 transition"
                  title="Remove file"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div 
                  className={`border-2 border-dashed rounded-md p-3 text-center transition-colors ${
                    dragOverField === input.key
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <UploadIcon className={`w-5 h-5 mx-auto mb-1 ${
                    dragOverField === input.key ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className={`text-xs ${
                    dragOverField === input.key ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}>
                    {dragOverField === input.key ? "Drop PDF here" : "Click to upload or drag & drop"}
                  </span>
                </div>
                <input
                  type="file"
                  accept={input.accept}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Validate it's a PDF or DOCX
                      const isValidFile = file.type === "application/pdf" || 
                                         file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                         file.type === "application/msword" ||
                                         file.name.toLowerCase().endsWith(".pdf") ||
                                         file.name.toLowerCase().endsWith(".docx") ||
                                         file.name.toLowerCase().endsWith(".doc");
                      if (isValidFile) {
                        onFileChange(input.key, file);
                      } else {
                        alert("Please select a PDF or DOCX file only.");
                      }
                    }
                  }}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GST Upload Form Component ---
const GstUploadForm = ({ gstFiles, onFileChange, onRemoveFile }) => {
  const [dragOverField, setDragOverField] = useState(null);

  // Handle drag and drop
  const handleDragOver = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(fieldKey);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);
  };

  const handleDrop = (e, fieldKey) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate it's an Excel file
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          file.type === "application/vnd.ms-excel" ||
          file.name.toLowerCase().endsWith(".xlsx") ||
          file.name.toLowerCase().endsWith(".xls")) {
        onFileChange(fieldKey, file);
      } else {
        alert("Please drop an Excel file (.xlsx or .xls) only.");
      }
    }
  };

  const gstInputs = [
    {
      key: "gstr2bSummary",
      label: "GSTR-2B Summary",
      description: "Excel file containing GSTR-2B summary data",
      accept: ".xlsx,.xls",
      required: false,
      icon: "📊"
    },
    {
      key: "purchaseRegister",
      label: "Purchase Register",
      description: "Excel file containing purchase register data",
      accept: ".xlsx,.xls",
      required: false,
      icon: "🛒"
    },
    {
      key: "vendorMaster",
      label: "Vendor Master",
      description: "Excel file containing vendor master data",
      accept: ".xlsx,.xls",
      required: false,
      icon: "👥"
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-green-900 mb-1">INPUTS FOR GST REPORTS</h3>
        <p className="text-sm text-green-700">Please upload the Excel files you have. Upload as many as available - GST reports will be generated from all uploaded documents.</p>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gstInputs.map((input) => (
          <div 
            key={input.key} 
            className="bg-white border-2 rounded-lg p-4 transition-colors"
            style={{
              borderColor: dragOverField === input.key ? "#3b82f6" : gstFiles[input.key] ? "#10b981" : "#e5e7eb",
              backgroundColor: dragOverField === input.key ? "#eff6ff" : "white"
            }}
            onDragOver={(e) => handleDragOver(e, input.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, input.key)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  {input.icon} {input.label}
                  {input.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <p className="text-xs text-gray-500 mb-3">{input.description}</p>
              </div>
            </div>
            
            {gstFiles[input.key] ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                <div className="flex items-center flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">{gstFiles[input.key].name}</span>
                </div>
                <button
                  onClick={() => onRemoveFile(input.key)}
                  className="ml-2 text-red-600 hover:text-red-700 transition"
                  title="Remove file"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div 
                  className={`border-2 border-dashed rounded-md p-3 text-center transition-colors ${
                    dragOverField === input.key
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                  }`}
                >
                  <UploadIcon className={`w-5 h-5 mx-auto mb-1 ${
                    dragOverField === input.key ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className={`text-xs ${
                    dragOverField === input.key ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}>
                    {dragOverField === input.key ? "Drop Excel here" : "Click to upload or drag & drop"}
                  </span>
                </div>
                <input
                  type="file"
                  accept={input.accept}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.name.toLowerCase().endsWith(".xlsx") || file.name.toLowerCase().endsWith(".xls")) {
                        onFileChange(input.key, file);
                      } else {
                        alert("Please select an Excel file (.xlsx or .xls)");
                      }
                    }
                  }}
                />
              </label>
            )}
          </div>
        ))}
      </div>
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

export default UploadPage;
