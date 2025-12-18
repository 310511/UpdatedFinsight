// import { BarChart3, ShieldCheck, PieChart, Sparkles } from "lucide-react";

// export default function Features() {
//   const features = [
//     {
//       title: "Smart Financial Insights",
//       desc: "Get AI-powered analytics to understand your spending, investments, and savings patterns.",
//       icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
//     },
//     {
//       title: "Secure & Encrypted",
//       desc: "Your data is fully protected with enterprise-grade encryption and secure authentication.",
//       icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
//     },
//     {
//       title: "Investment Tracking",
//       desc: "Track your mutual funds, stocks, SIPs, and returns — all in one dashboard.",
//       icon: <PieChart className="w-10 h-10 text-purple-600" />,
//     },
//     {
//       title: "AI Recommendations",
//       desc: "FinSight suggests personalised financial improvements based on your profile.",
//       icon: <Sparkles className="w-10 h-10 text-yellow-500" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 px-6 md:px-16 py-16">
      
//       {/* Hero Section */}
//       <div className="text-center max-w-3xl mx-auto mb-16">
//         <h1 className="text-4xl font-bold text-blue-700">
//           Powerful Features to Level Up Your Finances
//         </h1>
//         <p className="mt-4 text-gray-600 text-lg">
//           FinSight helps you make smarter financial decisions with clean dashboards,  
//           real-time insights, and AI-powered recommendations.
//         </p>
//       </div>

//       {/* Features Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {features.map((f, index) => (
//           <div key={index} className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition">
//             <div className="mb-4">{f.icon}</div>
//             <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
//             <p className="mt-2 text-gray-600">{f.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import {
  BarChart3,
  ShieldCheck,
  Wallet,
  Brain,
  TrendingUp,
  PieChart,
  Sparkles,
  LineChart,
  CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";


// ================ CORE FEATURES (3 BIG SECTIONS) ==================
const coreFeatures = [
  {
    id: "ai-insights",
    icon: <Brain className="text-blue-600" size={32} />,
    title: "AI-Powered Financial Insights",
    description:
      "Understand your spending, saving, and investment patterns instantly with AI-driven recommendations.",
    details: [
      "Detect overspending patterns with intelligent alerts",
      "Smart saving recommendations based on monthly habits",
      "AI-generated insights shown in clean visual dashboards",
    ],
  },
  {
    id: "investment-tracking",
    icon: <TrendingUp className="text-indigo-600" size={32} />,
    title: "Investment Performance Tracking",
    description:
      "View real-time performance of your stocks, mutual funds, SIPs, and digital assets in one unified dashboard.",
    details: [
      "Track returns across all asset classes",
      "Auto-categorized risk profiles",
      "Monthly & yearly performance graphs",
    ],
  },
  {
    id: "secure-finance",
    icon: <ShieldCheck className="text-green-600" size={32} />,
    title: "Bank-Level Security & Encryption",
    description:
      "Your data stays protected with enterprise-grade encryption & secure authentication protocols.",
    details: [
      "Two-factor & biometrics compatible",
      "Encrypted financial history",
      "Personal data never shared with third parties",
    ],
  },
];


// ================ SUPPORTING FEATURES GRID ==================
const supportingFeatures = [
  {
    icon: <PieChart size={22} />,
    title: "Automated Trial Balance Import",
    description:
      "Upload any Trial Balance file — Excel, CSV, or PDF — and FinSight automatically extracts, validates, and maps your financial data.",
  },
  {
    icon: <LineChart size={22} />,
    title: "Financial Statements Generation",
    description:
      "Instantly convert raw trial balance into full financial statements including Profit & Loss, Balance Sheet, Cash Flow.",
  },
  {
    icon: <Wallet size={22} />,
    title: "Ratio & KPI Analysis",
    description:
      "FinSight automatically calculates key ratios such as Liquidity,Profitability,Efficiency and Leverage so you immediately understand business performance.",
  },
  {
    icon: <CreditCard size={22} />,
    title: "AI-Driven Insights",
    description:
      "Get automated commentary and insights—FinSight explains your financial results in simple language without needing an accountant.",
  },
  {
    icon: <Sparkles size={22} />,
    title: " Variance & Trend Tracking",
    description:
      "Track month-over-month and year-over-year changes with automated trend lines, comparisons, and financial benchmarking.",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Automated Report Generation",
    description:
      "Download ready-to-share financial reports in PDF & Excel, customized for management and compliance presentations.",
  },
];


const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Powerful Features Designed for   <br />
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Smarter Financial Decisions</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            FinSight helps you analyze money flow, track investments, and grow 
            your finances using clean dashboards and intelligent automation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transform hover:scale-105 transition-all duration-300"
            >
              Explore Dashboard
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-3  bg-white text-gray-700 border rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              View Pricing
            </Link>
          </div>

        </div>
      </section>


      {/* CORE FEATURES SECTIONS (3 MAIN FEATURES) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          {coreFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 mb-20 items-center`}
            >
              <div className="md:w-1/2">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h2>

                <p className="text-lg text-gray-700 mb-6">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                      </div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mockup Placeholder */}
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed rounded-2xl w-full max-w-md h-64 flex items-center justify-center text-gray-500">
                    <img src="" alt="" />
                  Dashboard Preview
                </div>
              </div>
            </div>  
          ))}

        </div>
      </section>


      {/* SUPPORTING FEATURES GRID */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              More Tools to Grow Your Financial Confidence
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Every feature is crafted to give you clarity, control, 
              and confidence in your personal finance journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingFeatures.map((f, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      
    </div>
  );
};

export default FeaturesPage;
