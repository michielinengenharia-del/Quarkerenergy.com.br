import React from 'react';
import { 
  Sparkles, 
  ArrowRight,
  Zap
} from 'lucide-react';

interface QuarkerizeProjectProps {
  onOpenModal: () => void;
  onNavigateToSeuAtivo?: () => void;
}

export const QuarkerizeProject: React.FC<QuarkerizeProjectProps> = ({ 
  onOpenModal,
  onNavigateToSeuAtivo 
}) => {
  const eligibleAssets = [
    'Usinas Solares Fotovoltaicas',
    'Centrais Geradoras Hidrelétricas (CGH)',
    'Pequenas Centrais Hidrelétricas (PCH)',
    'Sistemas BESS (Baterias Utilitárias)',
    'Usinas Eólicas Onshore',
    'Biomassa Agroflorestal',
    'Biogás & Biometano',
    'Projetos de Autoprodução de Energia',
    'Projetos Híbridos (Solar + Bateria)',
    'Eficiência Energética & Cogeração'
  ];

  return (
    <section id="quarkerize-secao" className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-emerald-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
            Para Empreendedores & Desenvolvedores
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Seu projeto pode ser a próxima oportunidade energética.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            Projetos de geração e armazenamento de energia exigem capital, estruturação, transparência e confiança. A QUARK ENERGY utiliza tecnologia, análise técnica, econômica e critérios ESG para preparar empreendimentos para uma nova forma de acesso ao capital.
          </p>
        </div>

        {/* Eligible Assets & Interactive Action Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                Ativos Elegíveis para Quarkerização
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tem um projeto pronto para avançar?
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                Avaliamos desde ativos em fase preliminar com parecer de acesso até usinas operacionais em busca de otimização de capital ou tokenização de fluxos de receita futuros.
              </p>

              {/* Tags Grid */}
              <div className="flex flex-wrap gap-2 pt-2">
                {eligibleAssets.map((asset, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-medium hover:border-emerald-500/40 hover:text-white transition-colors"
                  >
                    • {asset}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
              <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 shadow-neon-emerald">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">
                  Apresente seu Empreendimento
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Sem custo de submissão. Análise técnica preliminar realizada por nosso comitê de engenharia.
                </p>
              </div>

              <button
                id="btn-quarkerize-cta-box"
                onClick={onNavigateToSeuAtivo || onOpenModal}
                className="w-full py-4 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>QUARKERIZE SEU ATIVO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-500 font-mono">
                Confidencialidade assegurada sob termos de sigilo (NDA).
              </p>
            </div>

          </div>
        </div>

        {/* Bloco Especial na Homepage: TEM UM ATIVO ENERGÉTICO? QUARKERIZE SEU PRODUTO */}
        <div className="mt-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#071329] to-cyan-950/60 border-2 border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
              TEM UM ATIVO ENERGÉTICO?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              QUARKERIZE SEU PRODUTO
            </h3>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              “Transforme seu ativo em uma oportunidade estruturada para captar recursos e conquistar novos clientes.”
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Você tem o ativo. Nós ajudamos a conectar capital, investidores e mercado.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              id="btn-home-quarkerize-produto"
              onClick={onNavigateToSeuAtivo || onOpenModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>QUERO QUARKERIZAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
