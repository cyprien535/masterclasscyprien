import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, ShieldAlert, CheckCircle, Info } from "lucide-react";
import { Registration } from "../types";

interface RegistrationFormProps {
  onSuccess: (reg: Registration) => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName.trim() || !email.trim()) {
      setErrorMsg("Veuillez remplir votre prénom et votre email.");
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: "Contact", // Placeholder for backend compatibility
          email: email.trim().toLowerCase(),
          whatsApp: "N/A", // Placeholder
        }),
      });

      if (response.ok) {
        const newReg = await response.json();
        setIsSubmitted(true);
        onSuccess(newReg);
        setFirstName("");
        setEmail("");
      } else {
        const err = await response.json();
        setErrorMsg(err.error || "Une erreur est survenue.");
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900" id="inscrire">
      {/* Subtle Background pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Info className="w-4 h-4" />
            Restez informé
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight tracking-tight">
            Recevoir plus <span className="text-red-500">d'informations</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Vous souhaitez être alerté de mes prochaines sessions ou recevoir les ressources exclusives par email ? Laissez vos coordonnées ci-dessous.
          </p>
        </div>

        <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="registration-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {errorMsg && (
                  <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-sm flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstname" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      Prénom
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                      className="w-full bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white rounded-2xl px-5 py-4 text-sm transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white rounded-2xl px-5 py-4 text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-black text-white font-black py-5 rounded-2xl text-base tracking-wide shadow-xl transition-all disabled:opacity-50 group"
                >
                  {isPending ? "Envoi en cours..." : "M'envoyer les informations"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                  🔒 Vos données restent privées et sécurisées
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="inline-flex p-5 bg-emerald-100 text-emerald-600 rounded-3xl mb-2">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 font-display">C'est noté !</h3>
                  <p className="text-slate-500">
                    Merci {firstName}, vous recevrez bientôt nos prochaines actualités par email.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  S'inscrire avec un autre email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
