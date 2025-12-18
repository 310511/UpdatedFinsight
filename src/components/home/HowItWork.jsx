import React from 'react';
import { 
  Upload, 
  Cpu, 
  Eye, 
  Download,
  ChevronRight
} from 'lucide-react';

const HowItWorks = () => {

  const steps = [
    {
      number: "01",
      icon: <Upload className="w-12 h-12 text-gray-700" />,
      title: "Upload Document",
      description: "Drag & drop or select your financial documents",
      light: "#E3F2FD" // Light Blue
    },
    {
      number: "02",
      icon: <Cpu className="w-12 h-12 text-gray-700" />,
      title: "AI Processes",
      description: "Smart AI extracts and analyzes your data",
      light: "#F3E5F5" // Light Purple
    },
    {
      number: "03",
      icon: <Eye className="w-12 h-12 text-gray-700" />,
      title: "Review Results",
      description: "Verify and edit the extracted information",
      light: "#E8F5E9" // Light Green
    },
    {
      number: "04",
      icon: <Download className="w-12 h-12 text-gray-700" />,
      title: "Export Output",
      description: "Download structured data in your preferred format",
      light: "#FFF3E0" // Light Orange
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your documents into actionable insights in just four simple steps
          </p>
        </div>

        {/* Desktop - Horizontal Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
            
            <div className="flex justify-between items-start">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative w-1/4">

                  {/* Light Circle */}
                  <div className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center mb-4 relative">
                    <div 
                      className="w-40 h-40 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: step.light }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center px-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 right-0 translate-x-1/2 text-gray-300">
                      <ChevronRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile - Vertical Layout */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 -z-10"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  
                  {/* Light Circle Mobile */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center relative">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: step.light }}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 top-full -translate-x-1/2 text-gray-300">
                        <ChevronRight className="w-8 h-8 transform rotate-90" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="ml-6 pt-2 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start">
                  
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: step.light }}
                  >
                    {step.icon}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">
                      Step {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
