import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import faq from "../../assets/faq.png"; // your FAQ background image

const faqData = [
  {
    question: "What does FinSight do?",
    answer:
      "FinSight automates financial data extraction from documents such as bank statements, invoices, GST files, payroll reports, and audit papers—converting them into structured, analysis-ready outputs.",
  },
  {
    question: "Which document formats are supported?",
    answer:
      "FinSight supports PDF, Excel, CSV, and scanned images. You can upload individual files or bulk batches for processing.",
  },
  {
    question: "How accurate is the data extraction?",
    answer:
      "Our Cortex AI achieves 95–99% accuracy on most document types, highlighting low-confidence areas for quick human review.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes. All documents are encrypted end-to-end and processed securely. We adhere to enterprise-grade data privacy standards.",
  },
  {
    question: "Can FinSight export data into Tally or Excel?",
    answer:
      "Absolutely. You can export results to Excel, CSV, JSON, or integrate directly with ERP tools like Tally, Zoho, and SAP.",
  },
];

export default function FAQExact() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleQuestion = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background image */}
      <img
        src={faq}
        alt="FAQ background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle cool overlay (removes yellow tint) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/20 to-transparent"></div>

      {/* Content container (LEFT aligned now) */}
      <div className="relative z-10 pl-12 md:pl-24 max-w-2xl text-left py-16">
        {/* Title */}
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="mt-3 w-36 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>

        {/* FAQ List */}
        <div className="mt-12 space-y-6">
          {faqData.map((item, i) => (
            <div key={i} className="rounded-xl">
              <button
                onClick={() => toggleQuestion(i)}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-md hover:shadow-lg transition-all text-left"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-gray-800 font-medium text-lg">
                  {item.question}
                </span>
                {openIndex === i ? (
                  <ChevronUp size={22} className="text-gray-700" />
                ) : (
                  <ChevronDown size={22} className="text-gray-700" />
                )}
              </button>

              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i
                    ? "max-h-48 opacity-100 px-6 pb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 bg-white/60 rounded-xl px-4 py-2 mt-2 backdrop-blur-sm">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}