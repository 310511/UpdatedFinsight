import React from 'react';
import { 
  Upload, 
  Brain, 
  FileText, 
  Shield 
} from 'lucide-react'; // Using lucide-react for icons

const FeaturesGrid = () => {
  const features = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Import Any Document",
      description: "PDF, Excel, CSV, Bank Statements & more.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Extraction",
      description: "Smart detection of tables, transactions & values.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Accurate Finance Output",
      description: "Instantly structured summaries & categorized data.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Fully encrypted processing.",
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need for intelligent document processing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              {/* Icon Container */}
              <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;