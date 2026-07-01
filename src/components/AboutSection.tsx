import { motion } from "motion/react";
import { CheckCircle2, Award, Users, ShieldCheck } from "lucide-react";
import laptopImage from "../assets/images/laptop.jpg";

export default function AboutSection() {
  const laptopImageSrc = laptopImage;

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column (Images & Badges) */}
          <div className="lg:col-span-5 md:col-span-1 relative flex justify-center">
            {/* Background blur blob with intense deep glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-blue-500/20 rounded-full blur-[80px] opacity-75 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 bg-red-500/10 rounded-full blur-[60px] opacity-50" />

            {/* Main Legendary Image Frame with Neon Glow and Hover Effects */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-sm md:max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] border-2 border-slate-800/80 bg-slate-950 p-1.5 group"
            >
              {/* Inner gradient glowing border */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-slate-900/10 to-red-600/25 rounded-[22px] -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950">
                <img
                  src={laptopImageSrc}
                  alt="MEVI Cyprien travaillant sur son ordinateur portable"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Dark Vignette Overlay with Premium Lighting */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 opacity-60" />

                {/* Tech styling: futuristic frame corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-500/60 rounded-tl" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-500/60 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-blue-500/60 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-blue-500/60 rounded-br" />
              </div>
            </motion.div>
          </div>

          {/* Right Column (Text Content) */}
          <div className="lg:col-span-7 md:col-span-1 flex flex-col items-start text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-bold font-display text-white tracking-tight" id="about-section-title">
              À propos du <span className="text-blue-500">formateur</span>
            </h2>

            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p>
                Fort de <strong className="text-white font-semibold">quatre années d'expérience</strong> dédiées à l'excellence et à l'innovation, votre formateur a mené à bien <strong className="text-white font-semibold">plus de cent projets</strong> concrets. Cette expertise approfondie, acquise sur le terrain, garantit une approche pédagogique ancrée dans la réalité des défis actuels.
              </p>
              <p>
                Chaque projet a été une opportunité d'affiner des compétences, de maîtriser de nouvelles technologies et de développer des stratégies efficaces, transformant ainsi la théorie en résultats tangibles. C'est cette richesse d'expériences qui vous sera transmise, vous offrant des connaissances pratiques et directement applicables.
              </p>
              <p className="p-4 bg-slate-900/60 border border-slate-800/80 border-l-4 border-l-blue-500 rounded-r-xl text-slate-300 font-medium">
                « Ne laissez pas vos ambitions rester de simples idées. Le moment d'agir est maintenant. Chaque jour est une nouvelle opportunité de construire, d'apprendre et de vous dépasser. Rejoignez-nous et transformez votre potentiel en succès concrets. Votre parcours vers l'expertise commence ici. »
              </p>
            </div>

            {/* Achievements row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full pt-4" id="about-stats-grid">
              <div className="flex items-center space-x-2 sm:space-x-3.5 p-3 sm:p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:border-blue-500/50 hover:shadow-blue-950/20 transition-all shadow-xl">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                  <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-extrabold leading-none">100+</h4>
                  <p className="text-slate-400 text-xs mt-1">Projets réalisés</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3.5 p-3 sm:p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:border-blue-500/50 hover:shadow-blue-950/20 transition-all shadow-xl">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-extrabold leading-none">4+</h4>
                  <p className="text-slate-400 text-xs mt-1">Années d'expérience</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3.5 p-3 sm:p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:border-blue-500/50 hover:shadow-blue-950/20 transition-all shadow-xl">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                  <Award className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-extrabold leading-none">200+</h4>
                  <p className="text-slate-400 text-xs mt-1">Clients satisfaits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
