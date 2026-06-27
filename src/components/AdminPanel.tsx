import { useState, useEffect, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  X, Lock, ShieldAlert, Download, RefreshCw, Search, Users, 
  Calendar, Phone, Mail, FileText, Check, AlertCircle, Eye, EyeOff
} from "lucide-react";
import { Registration } from "../types";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Check if PIN was previously saved in session storage
  useEffect(() => {
    const savedPin = sessionStorage.getItem("admin_pin");
    if (savedPin === "5353533") {
      fetchRegistrations(savedPin);
    }
  }, []);

  const fetchRegistrations = async (enteredPin: string) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(`/api/registrations?pin=${enteredPin}`);
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_pin", enteredPin);
      } else {
        const err = await response.json();
        setErrorMsg(err.error || "PIN incorrect.");
        sessionStorage.removeItem("admin_pin");
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Erreur réseau lors de la communication avec le serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg("Veuillez entrer un code PIN.");
      return;
    }
    fetchRegistrations(pin.trim());
  };

  const handleRefresh = () => {
    const activePin = sessionStorage.getItem("admin_pin") || pin;
    if (activePin) {
      fetchRegistrations(activePin);
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = ["ID", "Prénom", "Nom", "Email", "WhatsApp", "Date d'Inscription"];
    const csvRows = [headers.join(",")];

    registrations.forEach((r) => {
      const row = [
        r.id,
        `"${r.firstName.replace(/"/g, '""')}"`,
        `"${r.lastName.replace(/"/g, '""')}"`,
        `"${r.email.replace(/"/g, '""')}"`,
        `"${r.whatsApp.replace(/"/g, '""')}"`,
        `"${new Date(r.createdAt).toLocaleString("fr-FR")}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "\uFEFF" + csvRows.join("\r\n"); // UTF-8 BOM for Excel support
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `participants_masterclass_mevi_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter registrations based on search query
  const filteredRegs = registrations.filter((r) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      r.firstName.toLowerCase().includes(query) ||
      r.lastName.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.whatsApp.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Container Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="border-b border-slate-800/60 p-6 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/10 border border-red-500/20 text-red-500 rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Espace Administration</h2>
              <p className="text-slate-400 text-xs">Accès réservé • Gestion des inscrits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAuthenticated ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Saisir le Code PIN</h3>
              <p className="text-slate-400 text-sm mb-6">
                Veuillez entrer le code PIN administrateur à 7 chiffres pour accéder à la liste des participants.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    required
                    maxLength={10}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Code PIN"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl px-4 py-3.5 pr-12 text-center text-lg font-mono tracking-widest text-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-500 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/15"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Valider et Accéder
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Admin Panel Dashboard */
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-semibold tracking-wider">Total Inscrits</span>
                    <span className="text-3xl font-black text-white leading-tight font-display">{registrations.length}</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-emerald-600/10 text-emerald-500 rounded-xl">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-semibold tracking-wider">Statut Places</span>
                    <span className="text-lg font-bold text-emerald-400 leading-tight">Illimitées</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-semibold tracking-wider">Dernière Inscription</span>
                    <span className="text-xs font-mono text-slate-300 truncate block max-w-[180px]">
                      {registrations.length > 0 
                        ? new Date(registrations[0].createdAt).toLocaleDateString("fr-FR")
                        : "Aucune"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par nom, email..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex w-full sm:w-auto gap-3">
                  <button
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                    Actualiser
                  </button>

                  <button
                    onClick={handleExportCSV}
                    disabled={registrations.length === 0}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-red-600/10 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger CSV
                  </button>
                </div>
              </div>

              {/* Inscriptions Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Participant</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Date d'Inscription</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300">
                      {filteredRegs.length > 0 ? (
                        filteredRegs.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-900/35 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white text-sm">
                                {r.firstName} {r.lastName}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">ID: {r.id}</div>
                            </td>
                            <td className="py-3.5 px-4 space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-3 h-3 text-slate-500" />
                                <span className="text-slate-300 select-all">{r.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-slate-500" />
                                <span className="text-emerald-400 font-mono select-all">{r.whatsApp}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">
                              {new Date(r.createdAt).toLocaleString("fr-FR", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-slate-500 text-sm">
                            {searchQuery ? "Aucun participant ne correspond à votre recherche." : "Aucun inscrit pour le moment."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
