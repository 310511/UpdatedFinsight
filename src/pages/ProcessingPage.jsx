import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

const ProcessingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileName = location.state?.fileName || "document.pdf";
  const file = location.state?.file;
  const documentType = location.state?.documentType || null;
  const auditFiles = location.state?.auditFiles || null;
  const gstFiles = location.state?.gstFiles || null;
  const isMultipleFiles = location.state?.isMultipleFiles || false;

  // Processing steps
  const steps = [
    "Text extraction",
    "Table detection",
    "Transaction identification",
    "Categorization",
    "Document generation",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [stepInterval, setStepInterval] = useState(null);
  const [checkingBackend, setCheckingBackend] = useState(false);

  // Process the file when component mounts
  useEffect(() => {
    if (isMultipleFiles && auditFiles) {
      processAuditFiles();
    } else if (isMultipleFiles && gstFiles) {
      processGstFiles();
    } else if (file) {
      processFile();
    } else {
      // If no file, simulate steps (for demo)
      simulateSteps();
    }
    
    // Cleanup interval on unmount
    return () => {
      if (stepInterval) {
        clearInterval(stepInterval);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const processFile = async () => {
    setProcessing(true);
    setError(null);
    setCurrentStep(0);
    setCheckingBackend(true);
    
    // FastAPI endpoint
    const API_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';
    
    // First, check if backend is available
    try {
      const healthController = new AbortController();
      const healthTimeout = setTimeout(() => healthController.abort(), 5000); // 5 second timeout
      
      const healthCheck = await fetch(`${API_URL}/health`, {
        method: 'GET',
        signal: healthController.signal
      });
      
      clearTimeout(healthTimeout);
      
      if (!healthCheck.ok) {
        throw new Error(`Backend health check failed with status ${healthCheck.status}`);
      }
      
      setCheckingBackend(false);
    } catch (healthError) {
      setCheckingBackend(false);
      if (healthError.name === 'AbortError') {
        setError(`Backend server is not responding at ${API_URL}.\n\nPlease ensure:\n1. The FastAPI server is running (run: python backend/app.py or uvicorn backend.app:app --reload)\n2. The server is accessible at the URL above\n3. Check the terminal/console for any server errors`);
      } else {
        setError(`Backend server is not available at ${API_URL}.\n\nError: ${healthError.message}\n\nPlease ensure:\n1. The FastAPI server is running\n2. The server is accessible at the URL above\n3. Check the terminal/console for any server errors`);
      }
      setProcessing(false);
      return;
    }
    
    // Start animating steps while API call is in progress
    const progressInterval = setInterval(() => {
      setCurrentStep((prev) => {
        // Don't go beyond step 4 (Document generation) until API completes
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500); // Update every 2.5 seconds
    
    setStepInterval(progressInterval);
    
    // Set a maximum timeout for the entire process (5 minutes)
    const timeoutId = setTimeout(() => {
      clearInterval(progressInterval);
      setStepInterval(null);
      setError("Processing timeout: The request took too long. Please check if the backend server is running and try again.");
      setProcessing(false);
    }, 300000); // 5 minutes timeout
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add document type if provided
      if (documentType) {
        formData.append('document_type', documentType);
      }
      
      // Create an AbortController for timeout
      const controller = new AbortController();
      const requestTimeout = setTimeout(() => controller.abort(), 240000); // 4 minutes for request
      
      let response;
      try {
        response = await fetch(`${API_URL}/process`, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });
        clearTimeout(requestTimeout);
      } catch (fetchError) {
        clearTimeout(requestTimeout);
        clearTimeout(timeoutId);
        clearInterval(progressInterval);
        setStepInterval(null);
        
        if (fetchError.name === 'AbortError') {
          setError("Request timeout: The server took too long to respond. Please check if the backend is running at " + API_URL);
        } else if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
          setError(`Connection failed: Cannot reach the backend server at ${API_URL}. Please ensure:\n1. The FastAPI server is running (python backend/app.py or uvicorn)\n2. The server is accessible at ${API_URL}\n3. CORS is properly configured`);
        } else {
          setError(`Network error: ${fetchError.message}`);
        }
        setProcessing(false);
        return;
      }

      if (!response.ok) {
        let errorMessage = 'Processing failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (e2) {
            errorMessage = `Server returned status ${response.status}: ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Debug: Log the response data
      console.log("ProcessingPage - Backend response:", JSON.stringify(data, null, 2));
      console.log("ProcessingPage - Response keys:", Object.keys(data));
      console.log("ProcessingPage - Full data object:", data);
      
      // FastAPI JSONResponse might wrap the content, so check if data has the fields directly
      // or if they're nested
      const actualData = data.transactions ? data : (data.data || data.content || data);
      
      console.log("ProcessingPage - Actual data:", actualData);
      console.log("ProcessingPage - Actual data keys:", Object.keys(actualData || {}));
      
      setResult(actualData);
      
      // Clear timeouts and intervals
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setStepInterval(null);
      
      // Complete all steps
      setCurrentStep(steps.length);
      
      // Navigate to results with actual data after showing completion
      setTimeout(() => {
        navigate("/dashboard/results", { 
          state: { fileName, result: actualData, documentType: documentType } 
        });
      }, 1500);
      
    } catch (err) {
      console.error("Processing error:", err);
      // Clear timeouts and intervals on error
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setStepInterval(null);
      
      let errorMessage = err.message || "Failed to process document";
      
      // Provide helpful error messages
      if (errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
        errorMessage = "Processing timeout: The request took too long. This might be due to:\n1. Large file size\n2. Backend server not responding\n3. Network issues\n\nPlease try again or check if the backend server is running.";
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        errorMessage = `Cannot connect to backend server. Please ensure:\n1. The FastAPI server is running\n2. Server URL is correct: ${import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000'}\n3. Check browser console for CORS errors`;
      }
      
      setError(errorMessage);
      setProcessing(false);
    }
  };

  const processAuditFiles = async () => {
    setProcessing(true);
    setError(null);
    setCurrentStep(0);
    setCheckingBackend(true);
    
    // FastAPI endpoint
    const API_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';
    
    // First, check if backend is available
    try {
      const healthController = new AbortController();
      const healthTimeout = setTimeout(() => healthController.abort(), 5000);
      
      const healthCheck = await fetch(`${API_URL}/health`, {
        method: 'GET',
        signal: healthController.signal
      });
      
      clearTimeout(healthTimeout);
      
      if (!healthCheck.ok) {
        throw new Error(`Backend health check failed with status ${healthCheck.status}`);
      }
      
      setCheckingBackend(false);
    } catch (healthError) {
      setCheckingBackend(false);
      if (healthError.name === 'AbortError') {
        setError(`Backend server is not responding at ${API_URL}.\n\nPlease ensure:\n1. The FastAPI server is running\n2. The server is accessible at the URL above\n3. Check the terminal/console for any server errors`);
      } else {
        setError(`Backend server is not available at ${API_URL}.\n\nError: ${healthError.message}\n\nPlease ensure:\n1. The FastAPI server is running\n2. The server is accessible at the URL above\n3. Check the terminal/console for any server errors`);
      }
      setProcessing(false);
      return;
    }
    
    // Start animating steps
    const progressInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000); // Slightly longer for multiple files
    
    setStepInterval(progressInterval);
    
    // Set a maximum timeout (10 minutes for multiple files)
    const timeoutId = setTimeout(() => {
      clearInterval(progressInterval);
      setStepInterval(null);
      setError("Processing timeout: The request took too long. Please check if the backend server is running and try again.");
      setProcessing(false);
    }, 600000); // 10 minutes timeout
    
    try {
      const formData = new FormData();
      
      // Add all audit files
      const fileCount = Object.values(auditFiles).filter(f => f !== null).length;
      let addedCount = 0;
      
      for (const [key, file] of Object.entries(auditFiles)) {
        if (file !== null) {
          formData.append('files', file);
          addedCount++;
        }
      }
      
      if (addedCount === 0) {
        throw new Error("No files to process");
      }
      
      formData.append('document_type', 'audit');
      
      console.log(`Processing ${addedCount} audit files...`);
      
      // Create an AbortController for timeout
      const controller = new AbortController();
      const requestTimeout = setTimeout(() => controller.abort(), 540000); // 9 minutes for request
      
      let response;
      try {
        response = await fetch(`${API_URL}/process-audit`, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });
        clearTimeout(requestTimeout);
      } catch (fetchError) {
        clearTimeout(requestTimeout);
        clearTimeout(timeoutId);
        clearInterval(progressInterval);
        setStepInterval(null);
        
        if (fetchError.name === 'AbortError') {
          setError("Request timeout: The server took too long to respond. Please check if the backend is running at " + API_URL);
        } else if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
          setError(`Connection failed: Cannot reach the backend server at ${API_URL}. Please ensure:\n1. The FastAPI server is running\n2. The server is accessible at ${API_URL}\n3. CORS is properly configured`);
        } else {
          setError(`Network error: ${fetchError.message}`);
        }
        setProcessing(false);
        return;
      }

      if (!response.ok) {
        let errorMessage = 'Processing failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.error || errorMessage;
        } catch (e) {
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (e2) {
            errorMessage = `Server returned status ${response.status}: ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      console.log("ProcessingPage - Audit report response:", JSON.stringify(data, null, 2));
      console.log("ProcessingPage - Audit report keys:", Object.keys(data || {}));
      
      // For audit reports, use the data directly (it's already in the correct format)
      const auditReportData = data;
      
      setResult(auditReportData);
      
      // Clear timeouts and intervals
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setStepInterval(null);
      
      // Complete all steps
      setCurrentStep(steps.length);
      
      // Navigate to results with audit report data
      setTimeout(() => {
        navigate("/dashboard/results", { 
          state: { 
            fileName: `Audit Report - ${new Date().toLocaleDateString()}`, 
            result: auditReportData, 
            documentType: 'audit',
            isAuditReport: true
          } 
        });
      }, 1500);
      
    } catch (err) {
      console.error("Audit processing error:", err);
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setStepInterval(null);
      
      let errorMessage = err.message || "Failed to process audit documents";
      
      if (errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
        errorMessage = "Processing timeout: The request took too long. This might be due to:\n1. Large file sizes\n2. Multiple files being processed\n3. Backend server not responding\n\nPlease try again or check if the backend server is running.";
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        errorMessage = `Cannot connect to backend server. Please ensure:\n1. The FastAPI server is running\n2. Server URL is correct: ${import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000'}\n3. Check browser console for CORS errors`;
      }
      
      setError(errorMessage);
      setProcessing(false);
    }
  };

  const processGstFiles = async () => {
    setProcessing(true);
    setError(null);
    setCurrentStep(0);
    setCheckingBackend(true);
    
    // FastAPI endpoint
    const API_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';
    
    // First, check if backend is available
    try {
      const healthController = new AbortController();
      const healthTimeout = setTimeout(() => healthController.abort(), 5000);
      
      const healthCheck = await fetch(`${API_URL}/health`, {
        method: 'GET',
        signal: healthController.signal
      });
      
      clearTimeout(healthTimeout);
      
      if (!healthCheck.ok) {
        throw new Error(`Backend health check failed with status ${healthCheck.status}`);
      }
      
      setCheckingBackend(false);
    } catch (healthError) {
      setCheckingBackend(false);
      if (healthError.name === 'AbortError') {
        setError(`Backend server is not responding at ${API_URL}.\n\nPlease ensure:\n1. The FastAPI server is running\n2. The server is accessible at the URL above\n3. Check the terminal/console for any server errors`);
      } else {
        setError(`Backend server is not available at ${API_URL}.\n\nError: ${healthError.message}\n\nPlease ensure:\n1. The FastAPI server is running\n2. The server is accessible at the URL above\n3. Check the terminal/console for any server errors`);
      }
      setProcessing(false);
      return;
    }
    
    // Start animating steps
    const progressInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);
    
    setStepInterval(progressInterval);
    
    // Set a maximum timeout (10 minutes for multiple files)
    const timeoutId = setTimeout(() => {
      clearInterval(progressInterval);
      setStepInterval(null);
      setError("Processing timeout: The request took too long. Please check if the backend server is running and try again.");
      setProcessing(false);
    }, 600000); // 10 minutes timeout
    
    try {
      const formData = new FormData();
      
      // Add all GST Excel files
      let addedCount = 0;
      
      for (const [key, file] of Object.entries(gstFiles)) {
        if (file !== null) {
          formData.append('files', file);
          addedCount++;
        }
      }
      
      if (addedCount === 0) {
        throw new Error("No Excel files to process");
      }
      
      formData.append('document_type', 'gst_return');
      
      console.log(`Processing ${addedCount} GST Excel files...`);
      
      // Create an AbortController for timeout
      const controller = new AbortController();
      const requestTimeout = setTimeout(() => controller.abort(), 540000); // 9 minutes for request
      
      let response;
      try {
        response = await fetch(`${API_URL}/process-gst`, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });
        clearTimeout(requestTimeout);
      } catch (fetchError) {
        clearTimeout(requestTimeout);
        clearTimeout(timeoutId);
        clearInterval(progressInterval);
        setStepInterval(null);
        
        if (fetchError.name === 'AbortError') {
          setError("Request timeout: The server took too long to respond. Please check if the backend is running at " + API_URL);
        } else if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
          setError(`Connection failed: Cannot reach the backend server at ${API_URL}. Please ensure:\n1. The FastAPI server is running\n2. The server is accessible at ${API_URL}\n3. CORS is properly configured`);
        } else {
          setError(`Network error: ${fetchError.message}`);
        }
        setProcessing(false);
        return;
      }

      if (!response.ok) {
        let errorMessage = 'Processing failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.error || errorMessage;
        } catch (e) {
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (e2) {
            errorMessage = `Server returned status ${response.status}: ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      console.log("ProcessingPage - GST reports response:", JSON.stringify(data, null, 2));
      
      // For GST reports, use the data directly
      const gstReportData = data;
      
      setResult(gstReportData);
      
      // Clear timeouts and intervals
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setStepInterval(null);
      
      // Complete all steps
      setCurrentStep(steps.length);
      
      // Navigate to results with GST report data
      setTimeout(() => {
        navigate("/dashboard/results", { 
          state: { 
            fileName: `GST Reports - ${new Date().toLocaleDateString()}`, 
            result: gstReportData, 
            documentType: 'gst_return'
          } 
        });
      }, 1500);
      
    } catch (err) {
      console.error("GST processing error:", err);
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setStepInterval(null);
      
      let errorMessage = err.message || "Failed to process GST Excel files";
      
      if (errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
        errorMessage = "Processing timeout: The request took too long. This might be due to:\n1. Large file sizes\n2. Multiple files being processed\n3. Backend server not responding\n\nPlease try again or check if the backend server is running.";
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        errorMessage = `Cannot connect to backend server. Please ensure:\n1. The FastAPI server is running\n2. Server URL is correct: ${import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000'}\n3. Check browser console for CORS errors`;
      }
      
      setError(errorMessage);
      setProcessing(false);
    }
  };

  const simulateSteps = () => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/dashboard/results", { 
              state: { fileName } 
            });
          }, 1500);
          return prev;
        }
      });
    }, 2000);
    
    setStepInterval(interval);
    return () => clearInterval(interval);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* ---------- LOADER SECTION ---------- */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="relative flex items-center justify-center">
          {/* Outer Pulse Ring */}
          <div className="absolute w-24 h-24 rounded-full bg-blue-200 opacity-50 animate-ping"></div>
          {/* Loader Icon */}
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-6">
          {checkingBackend ? "Checking Backend Connection…" : "Processing Your Document…"}
        </h1>
        <p className="text-gray-600 mt-2 max-w-md">
          {checkingBackend 
            ? "Verifying backend server is available before processing…"
            : "Extracting data, detecting tables, cleaning entries, generating output…"
          }
        </p>
      </div>

      {/* ---------- PROGRESS STEPS ---------- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Processing Steps
        </h3>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Steps List */}
          <ul className="space-y-8 relative">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <li key={index} className="flex items-start relative">
                  <div className="flex flex-col items-center mr-4 mt-0.5">
                    {/* Step Circle */}
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isCurrent
                          ? "border-blue-600 text-blue-600 animate-pulse"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-bold">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        isCompleted
                          ? "text-green-600"
                          : isCurrent
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {step}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-gray-500 mt-1 animate-pulse">
                        Working on this step…
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Status Message */}
        {currentStep >= steps.length && !error && (
          <div className="mt-8 text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <p className="font-semibold text-green-600">
              Processing Completed Successfully!
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="font-semibold text-red-600 mb-3 text-center">Processing Failed</p>
            <div className="bg-white p-4 rounded border border-red-100 mb-4">
              <p className="text-sm text-red-700 whitespace-pre-line text-left">{error}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/dashboard/upload")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setProcessing(false);
                  setCurrentStep(0);
                  if (file) {
                    processFile();
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Retry Processing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingPage;

