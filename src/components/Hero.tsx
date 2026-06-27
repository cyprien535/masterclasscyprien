import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Video, Gift, ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "../assets/images/hero.png";

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const imageSrc = heroImage;

  // Dynamic calculation for next Thursday at 13h (Benin Time - GMT+1 -> 12:00:00 UTC)
  const getTargetDate = () => {
    const now = new Date();
    // Candidate date pointing to Thursday of this week at 12:00:00 UTC
    const target = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      12, 0, 0, 0
    ));
    
    const currentUTCDay = now.getUTCDay(); // 0 is Sunday, 4 is Thursday
    let daysToAdd = (4 - currentUTCDay + 7) % 7;
    
    // If it's Thursday today and we are already past 12:00 UTC (13:00 Benin time), we look at next Thursday
    if (daysToAdd === 0 && now.getTime() >= target.getTime()) {
      daysToAdd = 7;
    }
    
    target.setUTCDate(target.getUTCDate() + daysToAdd);
    return target;
  };

  const getNextThursdayString = () => {
    const target = getTargetDate();
    const day = target.getUTCDate().toString().padStart(2, "0");
    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const month = months[target.getUTCMonth()];
    const year = target.getUTCFullYear();
    
    return `Jeudi ${day} ${month} ${year}`;
  };

  const formattedDate = getNextThursdayString();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = getTargetDate();
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="accueil"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-radial from-slate-900 via-slate-950 to-black overflow-hidden border-b border-slate-900"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Masterclass Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-900/30"
              id="hero-masterclass-badge"
            >
              100% En Ligne & Gratuit
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight text-left"
              id="hero-title"
            >
              🚀 Masterclass Gratuite : <br />
              <span className="text-red-500 relative inline-block mt-2">
                Les 7 Secrets d'un Site Web
              </span> <br />
              qui Attire des Clients
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-slate-300 text-base sm:text-lg max-w-xl text-left font-normal leading-relaxed"
              id="hero-description"
            >
              Découvrez comment créer un site web professionnel qui inspire confiance, attire des prospects et génère des clients.
            </motion.p>

            {/* Countdown Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="w-full sm:max-w-xl bg-slate-950/40 backdrop-blur-md border border-red-500/10 rounded-2xl p-5 flex flex-col items-center sm:items-start space-y-4 shadow-xl"
              id="hero-countdown"
            >
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>La Masterclass commence dans :</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className="bg-slate-900 border border-slate-800/80 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-extrabold font-mono text-white shadow-lg shadow-black/50">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-widest font-semibold font-display">Jours</span>
                </div>

                <span className="text-xl sm:text-2xl font-bold text-slate-700 font-mono self-start mt-3">:</span>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="bg-slate-900 border border-slate-800/80 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-extrabold font-mono text-white shadow-lg shadow-black/50">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-widest font-semibold font-display">Heures</span>
                </div>

                <span className="text-xl sm:text-2xl font-bold text-slate-700 font-mono self-start mt-3">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="bg-slate-900 border border-slate-800/80 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-extrabold font-mono text-white shadow-lg shadow-black/50">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-widest font-semibold font-display">Minutes</span>
                </div>

                <span className="text-xl sm:text-2xl font-bold text-slate-700 font-mono self-start mt-3">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="bg-slate-900/80 border border-red-500/20 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-extrabold font-mono text-red-500 shadow-lg shadow-black/50">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                  <span className="text-[10px] text-red-400 mt-1.5 uppercase tracking-widest font-semibold font-display">Secondes</span>
                </div>
              </div>
            </motion.div>

            {/* Event Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 w-full sm:max-w-xl text-left pt-2"
              id="hero-details-grid"
            >
              <motion.div 
                whileHover={{ scale: 1.03, translateY: -2 }}
                className="flex items-start space-x-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 p-3 rounded-xl hover:border-slate-700/80 transition-all cursor-default"
              >
                <div className="p-2 bg-red-600/10 text-red-500 rounded-lg shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-xs font-medium">Date</h4>
                  <p className="text-white text-sm font-semibold">{formattedDate}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03, translateY: -2 }}
                className="flex items-start space-x-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 p-3 rounded-xl hover:border-slate-700/80 transition-all cursor-default"
              >
                <div className="p-2 bg-red-600/10 text-red-500 rounded-lg shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-xs font-medium">Heure</h4>
                  <p className="text-white text-sm font-semibold">13h00 (Bénin - GMT+1)</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03, translateY: -2 }}
                className="flex items-start space-x-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 p-3 rounded-xl hover:border-slate-700/80 transition-all cursor-default"
              >
                <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-xs font-medium">En ligne</h4>
                  <p className="text-white text-sm font-semibold">Google Meet</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03, translateY: -2 }}
                className="flex items-start space-x-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 p-3 rounded-xl hover:border-slate-700/80 transition-all cursor-default"
              >
                <div className="p-2 bg-emerald-600/10 text-emerald-500 rounded-lg shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-400 text-xs font-medium">Bonus offert</h4>
                  <p className="text-white text-xs font-semibold leading-tight mt-0.5">Structure Pro</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full sm:w-auto pt-4"
            >
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4.5 rounded-xl text-base tracking-wide shadow-xl shadow-red-900/30 hover:shadow-red-900/40 hover:-translate-y-0.5 transition-all duration-150"
                id="hero-reserve-btn"
              >
                Je réserve ma place gratuitement
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </button>
            </motion.div>
          </div>

          {/* Right Column (Cyprien Portrait) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 bg-gradient-to-tr from-blue-600/20 to-red-600/20 rounded-full blur-2xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-72 sm:w-80 lg:w-96 aspect-3/4 rounded-3xl overflow-hidden bg-transparent"
              id="hero-portrait-container"
            >
              <img
                src={imageSrc}
                alt="MEVI Cyprien - Dev Ai Full Stack"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center rounded-3xl transition-all duration-500 filter brightness-110 contrast-105"
              />
              {/* Legendary bottom transparent overlay fade to blend cutout with dark background */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
