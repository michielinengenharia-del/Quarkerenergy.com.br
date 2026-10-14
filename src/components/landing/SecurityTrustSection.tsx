import React from 'react';
import { 
  ShieldCheck, 
  Lock
} from 'lucide-react';

export const SecurityTrustSection: React.FC = () => {
  return (
    <section id="seguranca-governanca" className="py-20 bg-[#070c18] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono font-semibold text-blue-400 mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>PROTEÇÃO, DILIGÊNCIA & COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tecnologia com governança.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            A infraestrutura da QUARK ENERGY foi desenhada sob princípios de segurança da informação, auditoria contínua e governança corporativa, garantindo rastreabilidade integral para desenvolvedores e investidores.
          </p>
        </div>

        {/* Responsible Compliance Callout */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <p>
              Práticas operacionais alinhadas à Lei Geral de Proteção de Dados (LGPD) e às melhores rotinas de diligência prévia (due diligence) do setor de infraestrutura energética.
            </p>
          </div>
          <span className="font-mono text-cyan-400 shrink-0 font-semibold">
            quarkenergy.com.br
          </span>
        </div>

      </div>
    </section>
  );
};

