import { motion } from "motion/react";
import { Target, Layout, AlertTriangle, Wrench, MessageCircle, Rocket } from "lucide-react";
import { learnCards } from "../data";

export default function LearnSection() {
  const getIcon = (name: string) => {
    const iconClass = "w-6 sm:w-8 h-6 sm:h-8 text-blue-500";
    switch (name) {
      case "Target":
        return <Target className={iconClass} />;
      case "Layout":
        return <Layout className={iconClass} />;
      case "AlertTriangle":
        return <AlertTriangle className={iconClass} />;
      case "Wrench":
        return <Wrench className={iconClass} />;
      case "MessageCircle":
        return <MessageCircle className={iconClass} />;
      case "Rocket":
        return <Rocket className={iconClass} />;
      default:
        return <Target className={iconClass} />;
    }
  };

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900" id="learn-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold font-display text-white tracking-tight" id="learn-section-title">
            Ce que vous allez <span className="text-blue-500 relative inline-block">apprendre</span>
          </h2>
          <div className="flex justify-center items-center mt-3 space-x-1.5">
            <span className="w-8 sm:w-12 h-1 bg-red-500 rounded-full" />
            <span className="w-8 sm:w-12 h-1 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="learn-grid">
          {learnCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: idx * 0.05 
              }}
              className="flex flex-col items-center text-center p-5 sm:p-6 bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl shadow-xl hover:shadow-[0_15px_30px_rgba(59,130,246,0.1)] transition-all group"
              id={`learn-card-${card.id}`}
            >
              {/* Icon container */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 rounded-full bg-blue-500/10 border border-blue-500/15 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                {getIcon(card.iconName)}
              </div>

              {/* Card content */}
              <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 sm:mb-2.5">
                {card.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
