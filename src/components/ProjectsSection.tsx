import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { projects } from "../data";

export default function ProjectsSection() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <section className="py-20 bg-slate-900 border-y border-slate-950" id="projets">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold font-display text-white tracking-tight">
            Quelques projets <span className="text-blue-500">réalisés</span>
          </h2>
          <div className="flex justify-center items-center mt-3 space-x-1.5">
            <span className="w-8 sm:w-12 h-1 bg-red-500 rounded-full" />
            <span className="w-8 sm:w-12 h-1 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Projects Grid - Large Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" id="projects-grid">
          <AnimatePresence>
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: idx * 0.05 
                }}
                className="relative rounded-2xl overflow-hidden group transition-all hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)]"
                id={`project-card-${project.id}`}
              >
                {/* Large Image */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white font-bold text-lg">{project.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-red-950/20 hover:shadow-red-950/40 transition-all transform hover:-translate-y-0.5"
            id="projects-action-btn"
          >
            {showAllProjects ? "Voir moins de réalisations" : "Voir plus de réalisations"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
