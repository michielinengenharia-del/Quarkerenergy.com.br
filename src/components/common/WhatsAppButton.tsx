import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '554998171570';
  const message = 'Olá! Gostaria de saber mais sobre as soluções de energia e BESS da Quark Energy.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside 
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      {/* Tooltip badge on hover / active */}
      <div 
        className={`bg-slate-900/95 text-slate-100 text-xs py-2 px-3.5 rounded-full border border-emerald-500/30 shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none hidden sm:flex items-center gap-2 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-medium">Fale conosco no WhatsApp</span>
        <span className="text-slate-400 font-mono text-[11px]">+55 49 9817-1570</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Abrir conversa no WhatsApp (+55 49 9817-1570)"
        className="relative group p-4 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:bg-[#20ba59] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-0 pointer-events-none"></span>

        <MessageCircle className="w-6 h-6 fill-white text-white" />
        
        {/* Online Indicator Badge */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full"></span>
      </a>
    </aside>
  );
};
