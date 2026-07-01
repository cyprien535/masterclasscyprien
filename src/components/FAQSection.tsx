import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqItems } from "../data";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold font-display text-white tracking-tight">
            Questions <span className="text-blue-500">Fréquentes</span>
          </h2>
          <div className="flex justify-center items-center mt-3 space-x-1.5">
            <span className="w-8 sm:w-12 h-1 bg-red-500 rounded-full" />
            <span className="w-8 sm:w-12 h-1 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3 sm:space-y-4" id="faq-accordion-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-slate-900/90 border-blue-500/50 shadow-xl shadow-blue-950/20"
                    : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900"
                }`}
                id={`faq-item-${item.id}`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  id={`faq-btn-${item.id}`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 pr-3 sm:pr-4 min-w-0">
                    <HelpCircle className={`w-4 sm:w-5 h-4 sm:h-5 shrink-0 ${isOpen ? "text-blue-500" : "text-slate-500"}`} />
                    <span className="font-bold text-white text-xs sm:text-base break-words">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 sm:w-5 h-4 sm:h-5 shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-slate-800/60 text-slate-300 text-[11px] sm:text-sm leading-relaxed text-left">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
