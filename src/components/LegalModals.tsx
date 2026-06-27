import { motion } from "motion/react";
import { X, Shield, Scale } from "lucide-react";

interface LegalModalsProps {
  type: "mentions" | "privacy" | null;
  onClose: () => void;
}

export default function LegalModals({ type, onClose }: LegalModalsProps) {
  if (!type) return null;

  const isMentions = type === "mentions";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop with elegant blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/10 text-red-500 rounded-xl">
              {isMentions ? <Scale className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            </div>
            <h3 className="font-extrabold text-white text-base md:text-lg font-display tracking-tight">
              {isMentions ? "Mentions Légales" : "Politique de Confidentialité"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 md:p-8 overflow-y-auto text-left text-slate-300 text-xs md:text-sm leading-relaxed space-y-6">
          {isMentions ? (
            <>
              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">1. Éditeur du site</h4>
                <p>
                  Le présent site est édité par <strong>MEVI Cyprien</strong>, Développeur AI Full Stack, domicilié à Porto-Novo, Bénin.
                </p>
                <p className="mt-1">
                  <strong>E-mail :</strong> sciencesmcv@gmail.com <br />
                  <strong>Téléphone / WhatsApp :</strong> +229 44 52 20 51
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">2. Directeur de la publication</h4>
                <p>Le directeur de la publication du site est <strong>MEVI Cyprien</strong>.</p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">3. Hébergement</h4>
                <p>
                  Ce site est hébergé par Google Cloud Run (Google Cloud Platform), fourni par Google LLC.
                </p>
                <p className="mt-1 font-mono text-[11px] text-slate-500">
                  Google LLC <br />
                  1600 Amphitheatre Parkway <br />
                  Mountain View, CA 94043, USA
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">4. Propriété intellectuelle</h4>
                <p>
                  L’ensemble de ce site (textes, images, designs, logos, animations) relève de la législation en vigueur sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                </p>
                <p className="mt-1">
                  Toute reproduction ou représentation intégrale ou partielle de ce site, par quelque procédé que ce soit, sans l’autorisation expresse de l'éditeur est strictement interdite.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">5. Responsabilité</h4>
                <p>
                  L’éditeur s’efforce d’assurer au mieux de ses possibilités l’exactitude et la mise à jour des informations diffusées sur ce site. L'éditeur ne saurait être tenu pour responsable de tout dommage, direct ou indirect, résultant de l'accès au site ou d'une interruption de son service.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">1. Collecte des données personnelles</h4>
                <p>
                  Dans le cadre de l’utilisation de notre formulaire d’inscription à la Masterclass, nous collectons des données à caractère personnel vous concernant. Ces données comprennent :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Votre Prénom</li>
                  <li>Votre Nom</li>
                  <li>Votre Adresse email</li>
                  <li>Votre Numéro de téléphone (avec indicateur WhatsApp)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">2. Finalité du traitement des données</h4>
                <p>
                  Les données collectées sont utilisées exclusivement pour les finalités suivantes :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>La gestion et la validation de votre inscription à la Masterclass.</li>
                  <li>L’envoi des informations d’accès, des supports de formation et des rappels (emails, notifications WhatsApp).</li>
                  <li>La prise de contact personnalisée pour répondre à vos éventuelles questions.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">3. Durée de conservation des données</h4>
                <p>
                  Vos données personnelles sont conservées uniquement pendant la durée nécessaire à l’organisation, au déroulement et au suivi de la Masterclass, dans la limite maximale de 12 mois, sauf si vous demandez expressément leur suppression anticipée.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">4. Destinataires et confidentialité</h4>
                <p>
                  Vos données personnelles sont traitées de manière strictement confidentielle par <strong>MEVI Cyprien</strong>. Elles ne seront en aucun cas vendues, partagées, louées ou transmises à des tiers sans votre consentement préalable.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm md:text-base mb-2">5. Vos droits (Accès, Rectification, Suppression)</h4>
                <p>
                  Conformément aux réglementations relatives à la protection des données personnelles, vous disposez des droits suivants concernant vos données :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Droit d'accès et de rectification</strong> : Demander à consulter ou corriger vos données.</li>
                  <li><strong>Droit de suppression (Droit à l'oubli)</strong> : Demander le retrait et l'effacement de vos informations de nos fichiers.</li>
                </ul>
                <p className="mt-3">
                  Pour exercer l'un de ces droits, vous pouvez nous contacter directement à tout moment à l’adresse email suivante : <strong>sciencesmcv@gmail.com</strong>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm rounded-xl transition-colors border border-slate-800 shadow-md"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
