import { motion } from "motion/react";
import { Youtube, ExternalLink, ArrowDown } from "lucide-react";

export default function LiveSection() {
  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden" id="live">
      {/* Background patterns */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Animated bouncing top arrow pointing down */}
        <div className="flex flex-col items-center mb-8 z-20 pointer-events-none select-none">
          <motion.div
            animate={{ 
              y: [-6, 6, -6],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-black uppercase tracking-widest bg-red-600 text-white border border-red-500 px-4 py-2 rounded-full shadow-lg shadow-red-600/30 whitespace-nowrap mb-2">
              Rejoindre la masterclass en direct 👇
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-6 tracking-tight">
            Accédez au <span className="text-red-500">Live YouTube</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            La masterclass est maintenant 100% ouverte sur YouTube. Cliquez sur le lecteur ci-dessous pour rejoindre le direct et poser vos questions.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Hand-drawn style curved arrow on the left (desktop) */}
          <div className="hidden xl:block absolute -left-32 top-1/2 -translate-y-1/2 text-red-500 z-20 pointer-events-none select-none">
            <motion.div
              animate={{ 
                x: [0, 8, 0],
                y: [0, -4, 0],
                rotate: [-12, -8, -12]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[11px] font-black uppercase tracking-wider bg-slate-900 border border-slate-800 text-red-400 px-3 py-2 rounded-xl shadow-2xl rotate-[5deg] mb-1 whitespace-nowrap">
                C'est ici ! 📺
              </span>
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-x-[-1] rotate-[110deg] drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                <path d="M15 15C35 25 75 45 75 75M75 75L55 78M75 75L78 55" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* Glowing bouncing arrows on the right side */}
          <div className="hidden xl:block absolute -right-28 top-1/2 -translate-y-1/2 text-blue-500 z-20 pointer-events-none select-none">
            <motion.div
              animate={{ 
                x: [0, -8, 0],
                y: [0, 4, 0],
                rotate: [15, 10, 15]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.2, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="flex flex-col items-center gap-2"
            >
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[-45deg] drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                <path d="M15 15C35 25 75 45 75 75M75 75L55 78M75 75L78 55" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 border border-slate-800 text-blue-400 px-3 py-2 rounded-xl shadow-2xl -rotate-[5deg] mt-1 whitespace-nowrap">
                Accès Libre 🎁
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-[0_0_60px_rgba(239,68,68,0.2)] border-2 border-slate-800 group"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/SeK2oj21pME?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <a
            href="https://youtube.com/live/SeK2oj21pME?feature=share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-extrabold px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-red-900/40 hover:-translate-y-1 hover:shadow-red-900/60 group"
          >
            <Youtube className="w-7 h-7 group-hover:scale-110 transition-transform" />
            Ouvrir dans YouTube
            <ExternalLink className="w-5 h-5 opacity-70" />
          </a>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
            Aucune inscription requise pour le Live
          </p>
        </motion.div>
      </div>
    </section>
  );
}
