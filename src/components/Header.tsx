import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Code2, Youtube } from "lucide-react";

interface HeaderProps {
  onRegisterClick: () => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Accueil", href: "#accueil" },
    { label: "À propos", href: "#about" },
    { label: "Projets", href: "#projets" },
    { label: "Programme", href: "#programme" },
    { label: "Live YouTube", href: "#live" },

  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#accueil");
            }}
            className="flex items-center space-x-3 group"
            id="header-logo-link"
          >
            <div className="bg-red-600 text-white p-2 rounded-xl group-hover:bg-red-500 transition-colors shadow-lg shadow-red-950/40 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-bold font-display text-white tracking-tight leading-none">
                MEVI Cyprien
              </span>
              <span className="block text-xs text-red-500 font-medium tracking-wide">
                Dev AI Full Stack
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(item.href);
                }}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleScrollTo("#live")}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs tracking-wider uppercase px-5 py-3 rounded-lg shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all transform hover:-translate-y-0.5 duration-150 flex items-center gap-2"
              id="header-cta-btn"
            >
              <Youtube className="w-4 h-4" />
              Accéder au Live
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 transition-colors duration-150"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-900/95 border-b border-slate-700/50 px-4 pt-4 pb-6 space-y-3 shadow-xl backdrop-blur-md"
            id="mobile-nav-panel"
          >
            <div className="flex flex-col space-y-2">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.href);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-slate-300 hover:text-white hover:bg-slate-800/60 px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-150"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  handleScrollTo("#live");
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                className="w-full mt-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-center py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all transform hover:-translate-y-0.5 duration-150 flex items-center justify-center gap-2"
                id="mobile-header-cta-btn"
              >
                <Youtube className="w-4 h-4" />
                Accéder au Live
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
