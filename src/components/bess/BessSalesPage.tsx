import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  TrendingDown, 
  Sliders, 
  BatteryCharging, 
  ExternalLink,
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';

interface BessSalesPageProps {
  onBackToHome: () => void;
}

export const BessSalesPage: React.FC<BessSalesPageProps> = ({ onBackToHome }) => {
  // SEO title & meta update on mount
  useEffect(() => {
    document.title = 'BESS | Armazenamento de Energia | Quark Energy';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubra o sistema BESS ideal para sua empresa. Cadastre sua fatura, dimensione sua solução de armazenamento de energia e solicite uma proposta.'
      );
    }
  }, []);

  const BLACK_ENERGY_URL = 'https://www.blackenergy.com.br/';

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      
      {/* Top Minimal Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group text-xs sm:text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            <span className="font-mono">QUARK ENERGY</span>
          </button>

          <a
            href={BLACK_ENERGY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
          >
            <span>Dimensionar na Black Energy</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 overflow-hidden">
        {/* Subtle Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-blue-600/10 blur-[130px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-medium text-slate-300">
              Sistemas de Armazenamento de Energia por Baterias
            </span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Quer comprar um BESS para sua empresa?
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Descubra qual sistema de armazenamento de energia faz sentido para o seu consumo e receba uma proposta personalizada.
          </p>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="hero-cta-dimensionar-bess"
              href={BLACK_ENERGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-9 py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-base sm:text-lg hover:brightness-110 active:scale-95 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>QUERO DIMENSIONAR MEU BESS</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          BENEFÍCIOS (EXATAMENTE 4 CARDS)
          ======================================================== */}
      <section className="py-20 bg-[#040816] border-y border-slate-800/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              VANTAGENS COMPETITIVAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Descubra o potencial do armazenamento de energia
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Reduza custos</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Avalie oportunidades de otimização da sua conta de energia.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mais controle</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Tenha mais flexibilidade na gestão do consumo energético.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-teal-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Tecnologia BESS</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Sistemas modernos de armazenamento por baterias.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Projeto personalizado</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  O sistema é dimensionado de acordo com o perfil da sua operação.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          COMO FUNCIONA (3 ETAPAS SIMPLES)
          ======================================================== */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              FLUXO DIRETO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Como funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Step 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-3">
              <span className="text-3xl font-mono font-extrabold text-cyan-400 block">
                01
              </span>
              <h3 className="text-lg font-bold text-white">
                Cadastre sua fatura
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Envie sua conta de energia através da Black Energy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-3">
              <span className="text-3xl font-mono font-extrabold text-emerald-400 block">
                02
              </span>
              <h3 className="text-lg font-bold text-white">
                Dimensione seu BESS
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A equipe analisa seu consumo e identifica uma configuração adequada.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-3">
              <span className="text-3xl font-mono font-extrabold text-teal-400 block">
                03
              </span>
              <h3 className="text-lg font-bold text-white">
                Receba sua proposta
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Conheça a solução recomendada e as condições comerciais.
              </p>
            </div>

          </div>

          <div className="text-center">
            <a
              id="cta-cadastrar-minha-fatura"
              href={BLACK_ENERGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
            >
              <span>CADASTRAR MINHA FATURA</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          CTA FINAL
          ======================================================== */}
      <section className="py-24 relative text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Seu BESS começa com uma análise da sua energia.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Cadastre sua fatura e descubra a solução ideal para sua operação.
          </p>

          <div className="pt-4">
            <a
              id="cta-final-proposta-bess"
              href={BLACK_ENERGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-base sm:text-lg hover:brightness-110 active:scale-95 shadow-2xl shadow-emerald-500/30 transition-all cursor-pointer group"
            >
              <span>QUERO MINHA PROPOSTA BESS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-slate-500">
            Dimensionamento e proposta técnica desenvolvidos em parceria com a Black Energy.
          </div>

        </div>
      </section>

    </div>
  );
};
