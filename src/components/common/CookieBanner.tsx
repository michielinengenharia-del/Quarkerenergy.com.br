import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/storage';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPreferences: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPreferences }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = StorageService.getCookieConsent();
    if (!consent) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    StorageService.setCookieConsent(true);
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    StorageService.setCookieConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-xl z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl text-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-2 text-xs">
            <p className="font-semibold text-white text-sm">
              Privacidade e Governança de Dados (LGPD)
            </p>
            <p className="text-slate-300 leading-relaxed">
              Utilizamos cookies estritamente necessários para o funcionamento e segurança da plataforma, além de cookies analíticos para aprimorar sua experiência em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={onOpenPreferences}
            className="text-xs text-slate-400 hover:text-cyan-300 underline flex items-center gap-1 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            Preferências de Cookies
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRejectNonEssential}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Apenas Essenciais
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
