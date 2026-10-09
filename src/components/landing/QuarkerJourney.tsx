import React from 'react';
import { 
  UserPlus, 
  Compass, 
  FileSearch, 
  Wallet, 
  LineChart, 
  Coins, 
  ArrowLeftRight, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface QuarkerJourneyProps {
  onOpenInvestorModal: () => void;
  onNavigateToPortal: () => void;
  onNavigateToBessInvestor?: () => void;
}

export const QuarkerJourney: React.FC<QuarkerJourneyProps> = ({
  onOpenInvestorModal,
  onNavigateToPortal,
  onNavigateToBessInvestor
}) => {
  const steps = [
    {
      num: 1,
      title: 'Cadastre-se',
      subtitle: 'Torne-se um QUARKER',
      desc: 'Faça seu cadastro simples indicando preferências de investimento, faixas de valor e interesses setoriais (solar, hidro, baterias, etc.).',
      icon: UserPlus,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      num: 2,
      title: 'Conheça',
      subtitle: 'Explore projetos disponíveis',
      desc: 'Acesse o catálogo de ativos reais em estruturação ou prontos para captação com relatórios detalhados de engenharia.',
      icon: Compass,
      color: 'border-teal-500/40 text-teal-400 bg-teal-500/10'
    },
    {
      num: 3,
      title: 'Analise',
      subtitle: 'Acesso a dados completos e riscos',
      desc: 'Consulte a modelagem técnica de geração P50/P90, licenciamento ambiental, contratos de fornecimento e matriz de riscos técnicos.',
      icon: FileSearch,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      num: 4,
      title: 'Invista',
      subtitle: 'Oportunidades compatíveis com seu perfil',
      desc: 'Escolha oportunidades aderentes à sua estratégia patrimonial dentro da estrutura jurídica e regulatória aplicável de cada rodada.',
      icon: Wallet,
      color: 'border-blue-500/40 text-blue-400 bg-blue-500/10'
    },
    {
      num: 5,
      title: 'Acompanhe',
      subtitle: 'Monitore a obra e a geração',
      desc: 'Acompanhe a curva S de implantação, telemetria SCADA de geração em tempo real e marcos de avanço físico-financeiro no painel.',
      icon: LineChart,
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
    },
    {
      num: 6,
      title: 'Receba',
      subtitle: 'Direitos econômicos previstos',
      desc: 'Receba na sua carteira digital as distribuições decorrentes da comercialização da energia gerada ou locação da infraestrutura.',
      icon: Coins,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      num: 7,
      title: 'Liquidez',
      subtitle: 'Mecanismos previstos em cada ativo',
      desc: 'Quando houver previsão no ativo (recompra programada ou mercado secundário homologado), utilize o mecanismo correspondente.',
      icon: ArrowLeftRight,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    }
  ];

  return (
    <section id="como-funciona-quarker" className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
            Área do Investidor • QUARKER
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Uma nova forma de acessar a economia da energia.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            O termo <strong className="text-white">QUARKER</strong> representa o investidor consciente que participa da transição energética através de ativos estruturados, diligenciados e transparentes.
          </p>
        </div>

        {/* 7-Step Timeline */}
        <div className="relative mb-16">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-blue-500/40 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.num}
                  className="p-4 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-sm transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Step badge & icon */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-full bg-slate-950 text-white font-mono font-bold text-xs flex items-center justify-center border border-slate-700">
                        {step.num}
                      </span>
                      <div className={`p-2 rounded-xl border ${step.color} group-hover:scale-110 transition-transform shadow-neon-blue`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-0.5">
                      {step.title}
                    </h3>

                    <p className="text-[11px] font-semibold text-cyan-300/80 mb-2 leading-tight">
                      {step.subtitle}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
                    Fase 0{step.num}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Responsible Liquidity and Risk Disclaimer */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm flex items-start gap-3.5 text-xs text-slate-400 mb-12">
          <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">Atenção quanto à liquidez e prazos:</strong> Investimentos em ativos de infraestrutura energética possuem caráter de médio a longo prazo. Mecanismos de negociação, mercado secundário ou recompra estão condicionados à estrutura de cada emissão e à regulamentação vigente, <strong>não havendo garantia de liquidez imediata ou resgate a qualquer momento</strong>.
          </p>
        </div>

        {/* CTA Card for Investor */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            Pronto para Diversificar com Ativos Reais?
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
            Junte-se à comunidade de QUARKERS
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
            Cadastre-se para receber notificações exclusivas de novos empreendimentos analisados, lâminas técnicas de diligência e relatórios de sustentabilidade.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {onNavigateToBessInvestor ? (
              <button
                id="btn-journey-bess-investor"
                onClick={onNavigateToBessInvestor}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>OPORTUNIDADE BESS (/investidor)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            ) : (
              <button
                id="btn-journey-quarker"
                onClick={onOpenInvestorModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>QUERO SER UM QUARKER</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}

            <button
              id="btn-journey-preview-portal"
              onClick={onNavigateToPortal}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explorar Demo da Área do QUARKER</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
