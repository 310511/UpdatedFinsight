import React, { useState } from "react";
import { Upload, FileText, XCircle } from "lucide-react";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

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
  const removeFile = () => setFile(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      {/* ---------- PAGE TITLE ---------- */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Upload Your Financial Document
        </h1>
        <p className="text-gray-600">
          Supported formats: <span className="font-medium">PDF</span>,{" "}
          <span className="font-medium">Excel</span>,{" "}
          <span className="font-medium">CSV</span>, Bank Statements, Invoices
        </p>
      </div>

      {/* ---------- UPLOAD BOX ---------- */}
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
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
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
                <Upload className="w-4 h-4 mr-1" />
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

      {/* ---------- PROCESS BUTTON ---------- */}
      <div className="mt-10 w-full max-w-lg">
        <button
          disabled={!file}
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
            file
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Start AI Processing
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;