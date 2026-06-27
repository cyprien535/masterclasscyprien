import { motion } from "motion/react";
import { 
  AlertTriangle, 
  KeyRound, 
  Search, 
  MessageSquare, 
  Gift, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const programmeParts = [
  {
    part: "Partie 1",
    title: "Pourquoi la majorité des sites web ne génèrent aucun client",
    icon: AlertTriangle,
    bgColor: "from-red-500/10 to-transparent",
    borderColor: "border-red-500/20 hover:border-red-500/40",
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10",
    description: "Les erreurs fréquentes, pourquoi l'esthétique seule échoue, et ce qui convertit réellement un visiteur."
  },
  {
    part: "Partie 2",
    title: "Les 7 Secrets d'un Site Web qui Attire des Clients",
    icon: KeyRound,
    bgColor: "from-blue-500/10 to-transparent",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    description: "La méthode complète pas-à-pas pour concevoir, structurer, rassurer et transformer vos visiteurs en prospects qualifiés."
  },
  {
    part: "Partie 3",
    title: "Étude de Cas Réelle",
    icon: Search,
    bgColor: "from-emerald-500/10 to-transparent",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    description: "Analyse concrète avant/après d'un projet réel avec les optimisations clés et les résultats générés."
  },
  {
    part: "Partie 4",
    title: "Session Questions / Réponses",
    icon: MessageSquare,
    bgColor: "from-purple-500/10 to-transparent",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    description: "Échanges en direct pour répondre à vos questions spécifiques et vous apporter des conseils personnalisés."
  }
];

const bonusItems = [
  {
    title: "Checklist d'un site web professionnel",
    desc: "Un guide étape par étape pour vérifier que votre site possède tous les ingrédients indispensables avant sa mise en ligne."
  },
  {
    title: "Ressources et outils recommandés",
    desc: "La liste exacte des outils professionnels (gratuits et premium) que j'utilise chaque jour pour créer des sites ultra-rapides."
  },
  {
    title: "Accès à une offre spéciale de lancement",
    desc: "Une opportunité exclusive réservée uniquement aux participants présents en direct lors de la masterclass."
  }
];

export default function ProgrammeSection() {
  return (
    <section className="py-24 bg-slate-950 border-b border-slate-900 relative overflow-hidden" id="programme">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-4"
          >
            <Clock className="w-4 h-4 text-red-500" />
            <span>Durée : 1h30 à 2h00 de valeur pure</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            🚀 Le <span className="text-red-500">Programme</span> de la Session
          </h2>
          <div className="flex justify-center items-center mt-4 space-x-1.5">
            <span className="w-16 h-1 bg-red-500 rounded-full" />
            <span className="w-8 h-1 bg-blue-500 rounded-full" />
          </div>
          <p className="text-slate-400 text-sm sm:text-base mt-5 max-w-2xl mx-auto">
            Préparez de quoi noter. Un programme clair et direct pour propulser votre présence en ligne.
          </p>
        </div>

        {/* Main Programme Parts Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" id="programme-timeline">
          {programmeParts.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.part}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.01 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${item.bgColor} border border-slate-800/80 ${item.borderColor} transition-all duration-300 shadow-xl flex flex-col justify-between`}
              >
                <div>
                  {/* Part Badge & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-wider text-red-500">
                      {item.part}
                    </span>
                    <div className={`p-2 rounded-xl ${item.iconBg} ${item.iconColor} border border-slate-800/50`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-left">
                    <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 🎁 Bonus Section - Styled Stand-out Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-4xl mx-auto p-1 bg-gradient-to-r from-red-600 via-blue-600 to-red-500 rounded-[2rem] shadow-[0_0_50px_rgba(239,68,68,0.15)] overflow-hidden"
          id="programme-bonus-box"
        >
          <div className="bg-slate-950 px-6 py-10 sm:p-12 rounded-[1.9rem] text-center relative overflow-hidden">
            {/* Ambient Background Glow inside box */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

            {/* Gift Icon Header */}
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500 animate-bounce">
                <Gift className="w-10 h-10" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              🎁 Bonus Offert aux <span className="text-red-500">Participants</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
              Pour vous remercier de votre présence et vous aider à passer à l'action dès la fin de la masterclass.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
              {bonusItems.map((bonus, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-red-500/30 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                      <h4 className="text-sm font-bold text-white font-display leading-tight">{bonus.title}</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{bonus.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center text-[10px] text-red-500 font-mono font-bold tracking-widest uppercase">
                    <span>Inclus</span>
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Micro Call to Action */}
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
              <span className="text-xs text-slate-400 font-medium">Ne manquez pas ces opportunités uniques !</span>
              <a 
                href="#register" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-950/40"
              >
                Réserver ma place
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
