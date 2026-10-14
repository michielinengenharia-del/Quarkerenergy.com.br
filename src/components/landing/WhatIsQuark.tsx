import React, { useState } from 'react';
import { 
  Layers, 
  SearchCheck, 
  Cpu, 
  Users, 
  ArrowRight
} from 'lucide-react';
import { CmsContent } from '../../types';

interface WhatIsQuarkProps {
  cms: CmsContent;
  onOpenQuarkerizeModal: () => void;
  onOpenInvestorModal: () => void;
}

export const WhatIsQuark: React.FC<WhatIsQuarkProps> = ({
  cms,
  onOpenQuarkerizeModal,
  onOpenInvestorModal
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const flowSteps = [
    {
      id: 0,
      stepNumber: '01',
      title: 'ATIVO REAL (PROJETO)',
      tag: '01 • Originação & Projeto',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
      desc: 'Mapeamento e identificação de ativos concretos de geração renovável (solar, CGH, PCH, biogás) e armazenamento em baterias (BESS) com outorgas, pareceres de acesso e documentação preliminar.'
    },
    {
      id: 1,
      stepNumber: '02',
      title: 'DILIGÊNCIA (ANÁLISE)',
      tag: '02 • Diligência Multidisciplinar',
      icon: SearchCheck,
      color: 'from-teal-500 to-cyan-600',
      desc: 'Auditoria técnica multidisciplinar de engenharia, checagem fundiária, análise de riscos regulatórios ANEEL, cálculo de curva de geração/despacho e viabilidade econômica detalhada.'
    },
    {
      id: 2,
      stepNumber: '03',
      title: 'DIGITALIZAÇÃO (ESTRUTURAÇÃO JURIDICA E COTAS)',
      tag: '03 • Estruturação Jurídica & Cotas',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600',
      desc: 'Estruturação societária customizada (SPEs, debêntures, frações de PPA) com segregação de risco patrimonial e digitalização dos direitos econômicos em cotas auditáveis e transparentes.'
    },
    {
      id: 3,
      stepNumber: '04',
      title: 'DEMOCRATIZAÇÃO (CAPTAÇÃO COTISTAS INVESTIDORES)',
      tag: '04 • Captação Cotistas Investidores',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      desc: 'Abertura da captação para cotistas investidores (Quarkers), democratizando o acesso a empreendimentos energéticos de alta rentabilidade com distribuição periódica de resultados e governança contínua.'
    }
  ];

  return (
    <section id="o-que-e" className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
            Conceito & Infraestrutura
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            {cms.whatIsHeadline || 'Energia real. Ativos reais. Tecnologia para o futuro.'}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            {cms.whatIsSubtext || 'A QUARK ENERGY cria uma infraestrutura digital para avaliar, estruturar, acompanhar e potencialmente tokenizar empreendimentos energéticos em todo o território nacional.'}
          </p>
        </div>

        {/* The Interactive Flow Banner */}
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-sm mb-12 shadow-2xl">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  Fluxo Proprietário de Conexão
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Do Projeto Bruto ao Ativo Estruturado
                </h3>
              </div>
              <p className="text-xs text-slate-400 max-w-md text-right hidden md:block">
                Clique nas 4 etapas abaixo para examinar os mecanismos de diligência, estruturação e governança de cada estágio.
              </p>
            </div>

            {/* Step Badges Row (Interactive 4 Steps) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {flowSteps.map((step, idx) => {
                const IconComponent = step.icon;
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between relative group cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500/70 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/40'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${step.color} text-white shadow-sm`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {step.stepNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold mb-1">
                        {step.tag}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-snug">
                        {step.title}
                      </h4>
                    </div>

                    {idx < flowSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Step Detail Box */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-in fade-in duration-300">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    ETAPA {flowSteps[activeStep].stepNumber} • {flowSteps[activeStep].title}
                  </span>
                </div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {flowSteps[activeStep].desc}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {activeStep <= 1 ? (
                  <button
                    onClick={onOpenQuarkerizeModal}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md cursor-pointer"
                  >
                    Submeter Empreendimento
                  </button>
                ) : (
                  <button
                    onClick={onOpenInvestorModal}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-md cursor-pointer"
                  >
                    Cadastrar como QUARKER
                  </button>
                )}
              </div>
            </div>

          </div>

        {/* 3 Value Foundations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Ativos Reais, Não Promessas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Diferente de estruturas puramente especulativas, cada oportunidade na QUARK está enraizada em terra, aço, módulos solares, turbinas ou baterias com outorgas e licenças legalmente registradas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Engenharia + Finanças
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Nossa equipe une especialistas em engenharia elétrica, hidrologia, direito regulatório de energia e estruturação de mercado de capitais para assegurar diligência irrestrita.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Transparência & Diligência
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Transformamos centenas de páginas de laudos e contratos em métricas compreensíveis, dados consolidados e informações auditáveis para os participantes.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
