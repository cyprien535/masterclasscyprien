import { motion } from "motion/react";
import { Youtube, Mail, ArrowLeft, ExternalLink, Sparkles, Bell } from "lucide-react";
import { Registration } from "../types";

interface ThankYouPageProps {
  registration: Registration;
  onBackToHome: () => void;
}

export default function ThankYouPage({ registration, onBackToHome }: ThankYouPageProps) {
  const handleScrollToLive = () => {
    onBackToHome();
    setTimeout(() => {
      const target = document.querySelector("#live");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 animate-pulse" />
            <div className="relative p-6 bg-red-600 text-white rounded-3xl shadow-xl shadow-red-900/40">
              <Sparkles className="w-12 h-12" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            Merci, <span className="text-red-500">{registration.firstName}</span> !
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Votre intérêt a bien été pris en compte. Vous faites maintenant partie de notre liste privilégiée pour recevoir les prochaines ressources et alertes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-4">
          <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl text-left space-y-3">
            <div className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-xs">
              <Youtube className="w-5 h-5" />
              Prochaine étape
            </div>
            <h3 className="text-xl font-bold text-white">Rejoignez-nous sur YouTube</h3>
            <p className="text-slate-400 text-sm">
              La masterclass sera diffusée en direct. Assurez-vous d'activer la cloche de notification pour ne rien manquer.
            </p>
            <a
              href="https://youtube.com/live/SeK2oj21pME?feature=share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-500 font-bold text-sm hover:underline pt-2"
            >
              Voir le lien du direct
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl text-left space-y-3">
            <div className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-xs">
              <Mail className="w-5 h-5" />
              Confirmation
            </div>
            <h3 className="text-xl font-bold text-white">Vérifiez votre boîte mail</h3>
            <p className="text-slate-400 text-sm">
              Un message de bienvenue vous a été envoyé à <strong>{registration.email}</strong>. Pensez à vérifier vos spams si vous ne le voyez pas.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleScrollToLive}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-red-900/30 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            Aller au Live
          </button>
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au site
          </button>
        </div>
      </motion.div>

      <div className="mt-12 text-slate-600 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
        <Bell className="w-4 h-4" />
        Préparez-vous pour une session explosive
      </div>
    </div>
  );
}
