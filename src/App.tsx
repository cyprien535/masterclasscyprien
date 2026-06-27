/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LearnSection from "./components/LearnSection";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ProjectsSection from "./components/ProjectsSection";
import ProgrammeSection from "./components/ProgrammeSection";
import FAQSection from "./components/FAQSection";
import RegistrationForm from "./components/RegistrationForm";
import Footer from "./components/Footer";
import LegalModals from "./components/LegalModals";
import ThankYouPage from "./components/ThankYouPage";
import AdminPanel from "./components/AdminPanel";
import { Registration } from "./types";

export default function App() {
  const [toast, setToast] = useState<{ show: boolean; title: string; desc: string } | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<"mentions" | "privacy" | null>(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<Registration | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 500px (past Hero section)
      const isPastHero = window.scrollY > 500;
      
      // Hide button when approaching the bottom of the page (where the form is located)
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const isNearBottom = (totalHeight - (window.scrollY + windowHeight)) < 300;
      
      setShowFloatingCta(isPastHero && !isNearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount in case they refresh the page scrolled down
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToRegister = () => {
    const target = document.querySelector("#inscrire");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRegistrationSuccess = (reg: Registration) => {
    setRegisteredUser(reg);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (registeredUser) {
    return (
      <ThankYouPage
        registration={registeredUser}
        onBackToHome={() => setRegisteredUser(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Header */}
      <Header onRegisterClick={handleScrollToRegister} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onRegisterClick={handleScrollToRegister} />

        {/* What You Will Learn */}
        <LearnSection />

        {/* About the Trainer */}
        <AboutSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Projects Showcase */}
        <ProjectsSection />

        {/* Program Module list */}
        <ProgrammeSection />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Registration form */}
        <RegistrationForm onSuccess={handleRegistrationSuccess} />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={setActiveLegalModal} onOpenAdmin={() => setShowAdmin(true)} />

      {/* Admin Panel Overlay */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>

      {/* Mobile Sticky Floating CTA */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 inset-x-4 z-40 sm:hidden"
            id="mobile-sticky-cta"
          >
            <button
              onClick={handleScrollToRegister}
              className="w-full flex items-center justify-center gap-3 bg-red-600 active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-sm tracking-wide shadow-2xl shadow-red-950/80 border border-red-500/20 transition-all duration-150"
            >
              Je réserve ma place gratuite
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legal Notice & Privacy Policy Overlays */}
      <AnimatePresence>
        {activeLegalModal && (
          <LegalModals type={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
        )}
      </AnimatePresence>

      {/* Success Notification Toast */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 max-w-sm bg-slate-900 border border-emerald-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-md text-left flex items-start gap-3.5"
            id="success-toast"
          >
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                {toast.title}
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h4>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                {toast.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
