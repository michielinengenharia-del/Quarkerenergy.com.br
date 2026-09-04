import React, { useState } from 'react';
import { 
  Award, 
  ShieldAlert, 
  Sliders, 
  CheckCircle2, 
  HelpCircle, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export const QuarkScoreSection: React.FC = () => {
  // 10 Dimensions of Quark Score
  const dimensions = [
    { id: 'maturidade', name: 'Maturidade do Projeto', weight: '10%', defaultScore: 90, desc: 'Fase de engenharia executiva, status fundiário e licenças preliminares obtidas.' },
    { id: 'regulatorio', name: 'Risco Regulatório', weight: '10%', defaultScore: 88, desc: 'Outorgas ANEEL vigentes e conformidade com marcos legais setoriais.' },
    { id: 'implantacao', name: 'Risco de Implantação / CAPEX', weight: '10%', defaultScore: 84, desc: 'Robustez de cronograma físico-financeiro, contratos EPC e garantias de fornecedores.' },
    { id: 'ambiental', name: 'Situação Ambiental', weight: '10%', defaultScore: 92, desc: 'Licenças LP, LI e LO regulares junto aos órgãos estaduais e atendimento a condicionantes.' },
    { id: 'conexao', name: 'Conexão à Rede', weight: '10%', defaultScore: 94, desc: 'Parecer de Acesso formal emitido pela concessionária e viabilidade técnica de subestação.' },
    { id: 'contratos', name: 'Qualidade dos Contratos (PPA)', weight: '10%', defaultScore: 86, desc: 'Solidez e garantias contra inadimplência dos tomadores da energia no longo prazo.' },
    { id: 'economica', name: 'Viabilidade Econômica', weight: '10%', defaultScore: 89, desc: 'Projeção P50/P90 de geração, taxa interna de retorno e sensibilidade tarifária.' },
    { id: 'financeira', name: 'Estrutura Financeira', weight: '10%', defaultScore: 85, desc: 'Nível de alavancagem, existência de contas reserva (escrow) e garantias reais.' },
    { id: 'governanca', name: 'Governança & Diligência', weight: '10%', defaultScore: 93, desc: 'Segregação patrimonial em SPE dedicada e auditoria contábil independente.' },
    { id: 'esg', name: 'Critérios ESG', weight: '10%', defaultScore: 95, desc: 'Aderência aos pilares ambientais, impacto comunitário positivo e neutralidade de carbono.' }
  ];

  const [activeDimId, setActiveDimId] = useState<string>('maturidade');
  const activeDim = dimensions.find(d => d.id === activeDimId) || dimensions[0];

  // Average score for demo
  const overallScore = 88;

  return (
    <section id="quark-score-section" className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Radial lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-emerald-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
            Metodologia Multidimensional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Conheça o QUARK SCORE
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            Cada ativo submetido à plataforma recebe uma avaliação abrangente estruturada em 10 dimensões fundamentais, transformando complexidade técnica em inteligência clara e auditável.
          </p>
        </div>

        {/* Score Card Dashboard */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm shadow-2xl mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Score Gauge Visual */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center text-center">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                Classificação Ponderada
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Índice Global (0 a 100)
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Exemplo demonstrativo: Ativo Solar RTB
              </p>

              {/* Gauge Display */}
              <div className="relative w-48 h-48 flex items-center justify-center my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="url(#quarkScoreGrad)"
                    strokeWidth="8"
                    strokeDasharray="326"
                    strokeDashoffset="39" // ~88%
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="quarkScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                    {overallScore}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase mt-1">
                    Alto Grau Técnico
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Escala 0 a 100</span>
                </div>
              </div>

              <div className="w-full mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 text-left space-y-1.5">
                <div className="flex justify-between">
                  <span>Auditoria Multidisciplinar:</span>
                  <span className="text-emerald-400 font-semibold font-mono">Concluída</span>
                </div>
                <div className="flex justify-between">
                  <span>Conformidade ANEEL/CVM:</span>
                  <span className="text-emerald-400 font-semibold font-mono">Em Regra</span>
                </div>
                <div className="flex justify-between">
                  <span>Nível de Risco Mapeado:</span>
                  <span className="text-cyan-400 font-semibold font-mono">Controlado</span>
                </div>
              </div>
            </div>

            {/* Right: 10 Dimensions Matrix */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">
                    10 Dimensões de Avaliação da QUARK
                  </h4>
                  <p className="text-xs text-slate-400">
                    Selecione uma dimensão para consultar seu escopo de validação
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  10 Dimensões Auditadas
                </span>
              </div>

              {/* Grid of 10 Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                {dimensions.map((dim) => {
                  const isSelected = activeDimId === dim.id;
                  return (
                    <button
                      key={dim.id}
                      onClick={() => setActiveDimId(dim.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold block">{dim.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Peso {dim.weight}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-mono font-bold ${
                          dim.defaultScore >= 90 ? 'text-emerald-400' : 'text-cyan-400'
                        }`}>
                          {dim.defaultScore}
                        </span>
                        <span className="text-[10px] text-slate-500 block">/100</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Dimension Detail Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-white">
                    {activeDim.name} (Pontuação: {activeDim.defaultScore}/100)
                  </p>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    {activeDim.desc}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Regulatory Caution Notice (Strict Directive) */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">Importante sobre o QUARK SCORE:</strong> O QUARK SCORE <strong>não deve ser interpretado como garantia de rentabilidade, certeza de fluxo de caixa ou eliminação total de riscos</strong>. Ele é uma ferramenta informativa, analítica e comparativa que sintetiza dados técnicos e econômicos para subsidiar a tomada de decisão transparente por parte do investidor.
          </p>
        </div>

      </div>
    </section>
  );
};
