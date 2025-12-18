import React from "react";
import { Link } from "react-router-dom";
import { Upload, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI-Powered Financial Intelligence
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Financial
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Documents Instantly
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
            Upload your documents and let our AI extract, analyze, and organize your financial data with 
            <span className="font-semibold text-gray-900"> unprecedented accuracy</span>
          </p>

          {/* CTA Button */}
          <Link
            to="/login"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transform hover:scale-105 transition-all duration-300"
          >
            <Upload className="w-6 h-6" />
            <span>Upload Your Documents</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Additional Info */}
          <p className="mt-6 text-sm text-gray-500">
            New to FinSight?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium underline">
              Create an account
            </Link>
            {" "}to get started
          </p>

          {/* Stats or Features Preview */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600 text-sm">Accuracy Rate</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">&lt;30s</div>
              <div className="text-gray-600 text-sm">Processing Time</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl font-bold text-pink-600 mb-2">1000+</div>
              <div className="text-gray-600 text-sm">Trusted Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
