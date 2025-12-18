import React from "react";
import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  FileText,
  Brain,
  CheckCircle
} from "lucide-react";
import logo from "../assets/logo.png";

const AboutUs = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Our Mission",
      description: "To revolutionize financial document processing by making it faster, more accurate, and accessible to businesses of all sizes."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to automate tedious financial workflows and free up time for strategic decision-making."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Security First",
      description: "Your financial data is encrypted end-to-end and processed with enterprise-grade security standards."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Customer Focus",
      description: "We're committed to understanding your needs and continuously improving our platform based on your feedback."
    }
  ];

  const features = [
    "AI-powered document extraction with 95-99% accuracy",
    "Support for multiple formats: PDF, Excel, CSV, and images",
    "Real-time processing and analysis",
    "Secure cloud-based infrastructure",
    "Export to Excel, CSV, JSON, and ERP integrations",
    "Comprehensive financial insights and reporting"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="FinSight Logo" className="h-20 w-20" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About FinSight</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Transforming financial document processing with intelligent automation
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              FinSight was born from a simple observation: finance teams spend countless hours 
              manually processing documents, extracting data, and reconciling financial records. 
              This tedious work not only consumes valuable time but also introduces human error 
              that can have significant consequences.
            </p>
            <p>
              We set out to change that. By combining advanced artificial intelligence with 
              intuitive design, FinSight automates the entire financial document processing 
              workflow—from extraction to analysis to reporting. What used to take hours now 
              takes minutes, with accuracy rates of 95-99%.
            </p>
            <p>
              Today, FinSight serves businesses across industries, helping finance teams 
              focus on what matters most: strategic analysis and decision-making. We're 
              committed to making financial intelligence accessible, secure, and effortless.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <Brain className="w-10 h-10 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Cortex AI engine uses machine learning and natural language processing 
              to understand, extract, and analyze financial documents with unprecedented 
              accuracy and speed.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Financial Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using FinSight to streamline their 
            financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Free
            </a>
            <a
              href="/pricing"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


