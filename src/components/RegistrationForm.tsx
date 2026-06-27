import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Calendar, ArrowRight, ShieldAlert, CheckCircle, RefreshCw } from "lucide-react";
import { Registration } from "../types";

interface RegistrationFormProps {
  onSuccess: (reg: Registration) => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");

  const [regs, setRegs] = useState<Registration[]>([]);
  const [seatsLeft, setSeatsLeft] = useState(32);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Load existing registrations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("masterclass_registrations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Registration[];
        setRegs(parsed);
        const newSeats = Math.max(5, 32 - parsed.length);
        setSeatsLeft(newSeats);
      } catch (e) {
        console.error(e);
      }
    } else {
      const mockRegs: Registration[] = [
        {
          id: "m-reg-1",
          firstName: "Idriss",
          lastName: "Koffi",
          email: "idriss.koffi@gmail.com",
          whatsApp: "+229 95 45 67 89",
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: "m-reg-2",
          firstName: "Fatoumata",
          lastName: "Bamba",
          email: "fatou.bamba@outlook.com",
          whatsApp: "+229 97 08 23 45",
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
        {
          id: "m-reg-3",
          firstName: "Marc-Antoine",
          lastName: "Kouadio",
          email: "marc.kouadio@yahoo.fr",
          whatsApp: "+229 91 02 03 04",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
      ];
      localStorage.setItem("masterclass_registrations", JSON.stringify(mockRegs));
      setRegs(mockRegs);
      setSeatsLeft(29); // 32 - 3
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !whatsApp.trim()) {
      setErrorMsg("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    setIsPending(true);

    try {
      // Forcing relative path to ensure it hits the current host's API (Vercel)
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          whatsApp: whatsApp.trim(),
        }),
      });

      if (response.ok) {
        const newReg = await response.json();
        
        // Save locally to keep state updated
        const updated = [newReg, ...regs];
        localStorage.setItem("masterclass_registrations", JSON.stringify(updated));
        setRegs(updated);
        setSeatsLeft((prev) => Math.max(3, prev - 1));
        setIsSubmitted(true);
        onSuccess(newReg);

        // Reset fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setWhatsApp("");
      } else {
        const err = await response.json();
        setErrorMsg(err.error || "Une erreur est survenue lors de l'inscription.");
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Erreur réseau. Veuillez vérifier votre connexion et réessayer.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900" id="inscrire">
      {/* Background patterns */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Available Seats */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-600 text-white rounded-full shadow-lg shadow-red-900/30">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight tracking-tight">
                Réservez votre place <br />
                maintenant !
              </h2>
            </div>

            <p className="text-slate-300 text-base leading-relaxed max-w-xl">
              Cette masterclass exceptionnelle est ouverte à tous : profitez d'un accès complet et illimité pour vous former au développement d'applications d'IA.
            </p>

            {/* Ticket Counter */}
            <div className="bg-slate-900/90 border border-slate-800/80 p-5 rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-sm flex items-center space-x-5">
              <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Places disponibles :
                </h4>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-3xl font-black text-red-500 font-display tracking-tight">
                    Illimitées
                  </span>
                  <span className="text-slate-400 font-bold text-2xl ml-1">∞</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form or Success Screen */}
          <div className="lg:col-span-6 relative">
            {/* Animated bouncing top arrow pointing down */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none select-none">
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
                <span className="text-[10px] font-black uppercase tracking-widest bg-red-600 text-white border border-red-500 px-3 py-1.5 rounded-full shadow-lg shadow-red-600/30 whitespace-nowrap mb-1">
                  Rejoindre la masterclass 👇
                </span>
              </motion.div>
            </div>

            {/* Hand-drawn style curved arrow on the left of the card, pointing towards the card (desktop/large screens) */}
            <div className="hidden xl:block absolute -left-28 top-1/3 -translate-y-1/2 text-red-500 z-20 pointer-events-none select-none">
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
                className="flex flex-col items-center gap-1"
              >
                <span className="text-[11px] font-black uppercase tracking-wider bg-slate-900 border border-slate-800 text-red-400 px-3 py-1.5 rounded-xl shadow-2xl rotate-[5deg] mb-1 whitespace-nowrap">
                  Remplissez ici ! ✍️
                </span>
                <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-x-[-1] rotate-[110deg] drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                  <path d="M15 15C35 25 75 45 75 75M75 75L55 78M75 75L78 55" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            {/* Glowing bouncing arrows on the right side pointing to the form */}
            <div className="hidden xl:block absolute -right-24 top-2/3 -translate-y-1/2 text-blue-500 z-20 pointer-events-none select-none">
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
                className="flex flex-col items-center gap-1"
              >
                <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[-45deg] drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                  <path d="M15 15C35 25 75 45 75 75M75 75L55 78M75 75L78 55" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 border border-slate-800 text-blue-400 px-2.5 py-1.5 rounded-xl shadow-2xl -rotate-[5deg] mt-1 whitespace-nowrap">
                  C'est 100% Gratuit ! 🎁
                </span>
              </motion.div>
            </div>

            <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-100 relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="registration-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    id="masterclass-form"
                  >
                    <div className="text-center pb-2">
                      <h3 className="text-xl font-bold font-display text-slate-900">
                        Formulaire d'inscription
                      </h3>
                      <p className="text-slate-500 text-xs mt-1">
                        Inscrivez-vous en 30 secondes pour bloquer votre accès gratuit
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs flex items-center gap-2 text-left">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-left">
                        <label htmlFor="firstname" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Prénom
                        </label>
                        <input
                          id="firstname"
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Ex: Cyprien"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <div className="text-left">
                        <label htmlFor="lastname" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Nom
                        </label>
                        <input
                          id="lastname"
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Ex: MEVI"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Adresse Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: sciencesmcv@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="text-left">
                      <label htmlFor="whatsapp" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Numéro WhatsApp (avec code pays)
                      </label>
                      <input
                        id="whatsapp"
                        type="text"
                        required
                        value={whatsApp}
                        onChange={(e) => setWhatsApp(e.target.value)}
                        placeholder="Ex: +229 44 52 20 51"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Animated guiding arrows pointing specifically at the submit button */}
                    <div className="flex justify-center items-center gap-2 text-red-500 pt-2 pb-1">
                      <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-[135deg]">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </motion.div>
                      
                      <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        Cliquez ci-dessous pour valider
                      </span>

                      <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-[45deg]">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </motion.div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 duration-150 cursor-pointer"
                      id="submit-register-btn"
                    >
                      {isPending ? (
                        <>
                          INSCRIPTION EN COURS...
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          JE M'INSCRIS GRATUITEMENT
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-400 leading-relaxed text-center pt-2">
                      En vous inscrivant, vous acceptez de recevoir des emails concernant la masterclass et des contenus gratuits.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-slate-900">
                      Inscription Confirmée !
                    </h3>
                    <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
                      Merci pour votre inscription ! Votre place a été bloquée avec succès. Vous recevrez très bientôt les détails d'accès et de connexion par email et sur WhatsApp.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-xs uppercase tracking-wider pt-2"
                    >
                      Inscrire une autre personne
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>


      </div>

    </section>
  );
}
