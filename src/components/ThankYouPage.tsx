import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft, Mail, Calendar, Video, MessageCircle, Sparkles } from "lucide-react";
import { Registration } from "../types";

interface ThankYouPageProps {
  registration: Registration;
  onBackToHome: () => void;
}

export default function ThankYouPage({ registration, onBackToHome }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      {/* Header-like spacer */}
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-wider text-white">
            MEVI<span className="text-red-600">.</span>CYPRIEN
          </span>
        </div>
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-xl bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 flex-grow flex flex-col justify-center items-center text-center z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/10"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white mb-4"
        >
          Félicitations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">{registration.firstName}</span> !
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-lg sm:text-xl max-w-xl mb-12 leading-relaxed"
        >
          Votre place a été réservée avec succès pour cette Masterclass exclusive sur la création d'applications d'IA.
        </motion.p>

        {/* Steps Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-left mb-10 shadow-2xl"
        >
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500" />
            Que devez-vous faire maintenant ?
          </h3>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Contactez MEVI Cyprien sur WhatsApp</h4>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Pour recevoir le lien de connexion en direct et poser vos questions, contactez-moi directement au <span className="text-emerald-400 font-semibold">+229 44 52 20 51</span>.
                </p>
                <a
                  href="https://wa.me/22944522051" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl mt-3 shadow-lg shadow-emerald-600/15 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Me contacter sur WhatsApp
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-800/50 my-2" />

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Vérifiez votre boîte mail ({registration.email})</h4>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed text-balance">
                  Un email de confirmation contenant votre badge d'accès virtuel et le calendrier de l'événement vous a été envoyé. Pensez à vérifier vos dossiers <span className="text-slate-200">Spams</span> ou <span className="text-slate-200">Promotions</span>.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-800/50 my-2" />

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-600/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Ajoutez l'événement à votre agenda</h4>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Bloquez dès maintenant la date dans votre agenda pour être certain(e) de ne rien rater de cette session intensive de formation pratique.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-4"
        >
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 py-2 px-4 rounded-full text-xs text-slate-300">
            <Calendar className="w-4 h-4 text-red-500" />
            Accès Illimité
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 py-2 px-4 rounded-full text-xs text-slate-300">
            <Video className="w-4 h-4 text-red-500" />
            En direct & Replay
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 py-2 px-4 rounded-full text-xs text-slate-300">
            <Mail className="w-4 h-4 text-red-500" />
            Support d'accès envoyé
          </div>
        </motion.div>
      </main>

      {/* Footer copyright */}
      <footer className="py-6 border-t border-slate-900 text-center text-slate-600 text-xs z-10">
        © 2026 MEVI Cyprien. Tous droits réservés.
      </footer>
    </div>
  );
}
