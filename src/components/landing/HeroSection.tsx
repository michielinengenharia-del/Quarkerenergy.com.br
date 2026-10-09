import React from 'react';
import { QuarkParticleCanvas } from '../common/QuarkParticleCanvas';
import { 
  Sparkles, 
  Sun, 
  Droplets, 
  BatteryCharging, 
  Zap, 
  CheckCircle2, 
  Database
} from 'lucide-react';
import { CmsContent } from '../../types';

interface HeroSectionProps {
  cms: CmsContent;
  onOpenQuarkerizeModal: () => void;
  onOpenInvestorModal: () => void;
  onNavigateToView?: (view: 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  cms,
  onOpenQuarkerizeModal,
  onOpenInvestorModal,
  onNavigateToView
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#020617]">
      {/* Background Interactive Particle Canvas */}
      <QuarkParticleCanvas className="opacity-50" />

      {/* Radial Gradient Ambient Lighting (Immersive UI) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -left-10 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Brand Core Analogy Tag (Immersive UI Style) */}
        <div className="flex justify-center mb-6">
          <div className="inline-block px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            Energia. Tecnologia. Capital. Impacto.
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            A nova economia da energia{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              começa aqui.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            {cms.heroSubheadline || 'Conectamos projetos de energia, tecnologia e capital para transformar ativos energéticos em oportunidades reais para o futuro.'}
          </p>

          {/* Philosophical Analogy Box */}
          <div className="max-w-2xl mx-auto py-3 px-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-xs sm:text-sm text-slate-300 flex items-center justify-center gap-3">
            <span className="text-emerald-400 font-mono font-semibold">QUARK:</span>
            <span>
              Quarks formam a matéria. Projetos energéticos formam a nova economia. A QUARK conecta esses elementos.
            </span>
          </div>

          {/* Primary Action Buttons (Immersive UI Style) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            {/* CTA 1: Empreendedor */}
            <button
              id="hero-btn-quarkerize"
              onClick={() => {
                if (typeof onNavigateToView === 'function') {
                  onNavigateToView('seuativo');
                } else {
                  onOpenQuarkerizeModal();
                }
              }}
              className="group relative px-8 py-4 bg-emerald-500 text-slate-950 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2.5 cursor-pointer text-sm tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>QUARKERIZE SEU ATIVO</span>
              <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 pointer-events-none" />
            </button>

            {/* CTA 2: Investidor */}
            <button
              id="hero-btn-investor"
              onClick={() => {
                if (typeof onNavigateToView === 'function') {
                  onNavigateToView('investor');
                } else {
                  onOpenInvestorModal();
                }
              }}
              className="px-8 py-4 bg-slate-900 border border-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer shadow-lg text-sm tracking-wide"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>QUERO SER UM QUARKER</span>
            </button>
          </div>

          {/* Immersive UI 3-Metric Stats Row */}
          <div className="pt-6 grid grid-cols-3 gap-6 max-w-xl mx-auto border-t border-slate-800/60 mt-8">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">1.2 GW</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono mt-0.5">Potencial Analisado</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">R$ 450M</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono mt-0.5">Ativos Estruturados</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">100% Limpa</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono mt-0.5">Transição Energética</div>
            </div>
          </div>

          {/* Trust Highlights Checklist */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ativos Reais de Infraestrutura</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Diligência Técnica & Regulatória</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Armazenamento & Sistemas BESS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Sem promessas de retorno garantido</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase: The Convergence of Energy Assets & Digital Tech */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                  Infraestrutura Energética Elegível
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Ativos Reais em Fase de Estruturação e Operação
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-dot-emerald animate-ping"></span>
                <span>Pipeline Ativo em Análise Técnica</span>
              </div>
            </div>

            {/* 4 Asset Types Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all group">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3 group-hover:scale-110 transition-transform shadow-neon-emerald">
                  <Sun className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-sm">Solar Fotovoltaica</h4>
                <p className="text-xs text-slate-400 mt-1">Usinas UFV, GD e PPA no Mercado Livre</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-3 group-hover:scale-110 transition-transform shadow-neon-blue">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-sm">CGH & PCH Hídricas</h4>
                <p className="text-xs text-slate-400 mt-1">Geração contínua a fio d’água de baixo impacto</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all group">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-3 group-hover:scale-110 transition-transform shadow-neon-blue">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-sm">Sistemas BESS</h4>
                <p className="text-xs text-slate-400 mt-1">Armazenamento em baterias e arbitragem de rede</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all group">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-sm">Biomassa & Biogás</h4>
                <p className="text-xs text-slate-400 mt-1">Economia circular, biometano e geração distribuída</p>
              </div>

            </div>

            {/* Data & Diligence Banner inside card */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Modelagem Técnica P50/P90 • Auditoria de Pareceres de Acesso • Rastreabilidade Criptográfica</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
