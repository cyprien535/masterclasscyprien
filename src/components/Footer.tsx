import { useState, FormEvent } from "react";
import { Code2, Facebook, Linkedin, Youtube, Instagram, Mail, Phone, MapPin, Send, Check } from "lucide-react";

interface FooterProps {
  onOpenLegal?: (type: "mentions" | "privacy") => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenLegal, onOpenAdmin }: FooterProps = {}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs sm:text-sm py-12 sm:py-16" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-8 sm:pb-12 border-b border-slate-900">
          {/* Col 1: Bio */}
          <div className="lg:col-span-4 md:col-span-1 flex flex-col items-start space-y-3 sm:space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white p-2 rounded-xl shadow-lg shadow-red-950/40 flex items-center justify-center shrink-0">
                <Code2 className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <span className="block text-base font-bold font-display text-white tracking-tight">
                  MEVI Cyprien
                </span>
                <span className="block text-[10px] text-red-500 font-semibold uppercase">
                  Dev Ai Full Stack
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              J'aide les entrepreneurs et entreprises à se démarquer en ligne grâce à des sites web professionnels et performants.
            </p>
            {/* Socials */}
            <div className="flex space-x-2 sm:space-x-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61588131732811"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mevi-cyprien-837194413/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Useful links */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-white font-bold font-display text-sm tracking-wide">
              Liens utiles
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#accueil"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#accueil");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#about");
                  }}
                  className="hover:text-white transition-colors"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="#projets"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#projets");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Projets
                </a>
              </li>
              <li>
                <a
                  href="#live"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#live");
                  }}
                  className="hover:text-white transition-colors font-bold text-red-500"
                >
                  Live YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Extras */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-white font-bold font-display text-sm tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#programme"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#programme");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Programme
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#faq");
                  }}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#inscrire"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#inscrire");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-white font-bold font-display text-sm tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>+229 44 52 20 51</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="break-all">sciencesmcv@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Porto-Novo, Bénin</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-white font-bold font-display text-sm tracking-wide">
              Newsletter
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Recevez des conseils gratuits pour la création de sites web.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2" id="newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 pr-11"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-8.5 h-8.5 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 MEVI Cyprien Dev AI Full Stack. Tous droits réservés.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => onOpenLegal?.("mentions")}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal?.("privacy")}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <span className="text-slate-800/40">•</span>
            <button
              onClick={onOpenAdmin}
              className="w-1.5 h-1.5 rounded-full bg-slate-800 hover:bg-red-600 transition-colors cursor-pointer self-center"
              title="Espace Admin"
              aria-label="Espace Admin"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
