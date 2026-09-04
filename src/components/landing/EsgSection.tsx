import React, { useState } from 'react';
import { 
  Leaf, 
  Users2, 
  ShieldCheck, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  TreePine, 
  Factory, 
  Activity 
} from 'lucide-react';
import { CmsContent } from '../../types';

export const EsgSection: React.FC<{ cms: CmsContent }> = ({ cms }) => {
  const [activeTab, setActiveTab] = useState<'E' | 'S' | 'G'>('E');

  const esgDimensions = {
    E: {
      title: 'E — ENVIRONMENTAL (Ambiental)',
      badge: 'Descarbonização & Recursos Naturais',
      score: 96,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      icon: Leaf,
      items: [
        { label: 'Energia 100% Renovável', desc: 'Geração livre de queima fóssil (solar, hidráulica a fio d’água, biomassa residual).' },
        { label: 'Redução Potencial de Emissões', desc: 'Mapeamento de toneladas de CO₂ evitadas por MWh gerado com metodologia internacional.' },
        { label: 'Transição Energética Ativa', desc: 'Substituição de fontes poluentes e descentralização da matriz energética brasileira.' },
        { label: 'Sistemas de Armazenamento (BESS)', desc: 'Mitigação da intermitência e otimização do aproveitamento da energia limpa na rede.' },
        { label: 'Uso Responsável da Terra e Água', desc: 'Preservação de Áreas de Preservação Permanente (APP) e vazões ecológicas outorgadas.' },
        { label: 'Economia Circular & Biometano', desc: 'Tratamento de efluentes agropecuários com aproveitamento energético dos resíduos.' }
      ]
    },
    S: {
      title: 'S — SOCIAL (Socioeconômico)',
      badge: 'Comunidades & Democratização',
      score: 91,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      icon: Users2,
      items: [
        { label: 'Desenvolvimento Regional', desc: 'Atração de investimento direto para municípios do interior e polos agroindustriais.' },
        { label: 'Geração de Empregos Qualificados', desc: 'Mão de obra local capacitada em montagem eletromecânica, operação e manutenção preventiva.' },
        { label: 'Desenvolvimento das Comunidades', desc: 'Compensação socioambiental, segurança hídrica e diálogo contínuo com proprietários vizinhos.' },
        { label: 'Democratização do Acesso ao Capital', desc: 'Permite que cidadãos participem dos resultados econômicos de usinas de grande porte.' },
        { label: 'Inclusão Econômica', desc: 'Estruturação de tickets acessíveis com igualdade de transparência entre pequenos e grandes investidores.' },
        { label: 'Segurança Ocupacional', desc: 'Rigor nas normas regulamentadoras (NR-10, NR-35) nas etapas de montagem e comissionamento.' }
      ]
    },
    G: {
      title: 'G — GOVERNANCE (Governança & Diligência)',
      badge: 'Transparência & Conformidade',
      score: 95,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      icon: ShieldCheck,
      items: [
        { label: 'Transparência Contínua', desc: 'Publicação trimestral de relatórios de geração, demonstrativos financeiros e atas da SPE.' },
        { label: 'Rastreabilidade Criptográfica', desc: 'Registro imutável de transações e frações contratuais com certificação de titularidade.' },
        { label: 'Gestão Ativa de Riscos', desc: 'Matriz com mitigação de risco regulatório ANEEL, atrasos de obra e inadimplência de PPA.' },
        { label: 'Diligência Preventiva (Due Diligence)', desc: 'Auditoria técnica, jurídica, contábil e fundiária prévia antes de qualquer disponibilização.' },
        { label: 'Controles Contábeis Segregados', desc: 'Patrimônio segregado com contas escrow dedicadas à construção e manutenção de cada ativo.' },
        { label: 'Conformidade Regulatória (CVM/ANEEL)', desc: 'Estruturação sob estrita observância das normas regulatórias brasileiras vigentes.' }
      ]
    }
  };

  const current = esgDimensions[activeTab];

  return (
    <section id="secao-esg" className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
            Responsabilidade Socioambiental
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {cms.esgHeadline || 'Energia que gera impacto positivo.'}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            {cms.esgIntro || 'A sustentabilidade não é apenas uma métrica complementar — é a espinha dorsal de todo empreendimento estruturado na QUARK ENERGY.'}
          </p>
        </div>

        {/* Visual Concept: QUARK ESG SCORE Showcase */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Score Gauge Concept */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center text-center">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                Métrica Proprietária
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                QUARK ESG SCORE
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Indicador ponderado que avalia o impacto de cada empreendimento
              </p>

              {/* Visual Radial Dial */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#esgGrad)"
                    strokeWidth="10"
                    strokeDasharray="314"
                    strokeDashoffset="22" // ~93%
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="esgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                    94
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                    Classe AAA+
                  </span>
                  <span className="text-[9px] text-slate-500">Média Portfólio</span>
                </div>
              </div>

              <div className="w-full mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-emerald-400 font-mono font-bold block">96/100</span>
                  <span className="text-[10px] text-slate-400">Ambiental</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono font-bold block">91/100</span>
                  <span className="text-[10px] text-slate-400">Social</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono font-bold block">95/100</span>
                  <span className="text-[10px] text-slate-400">Governança</span>
                </div>
              </div>
            </div>

            {/* Right Tabbed Content */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Tab Selector Buttons */}
              <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-950/70 border border-slate-800">
                {(['E', 'S', 'G'] as const).map((tab) => {
                  const isSelected = activeTab === tab;
                  const label = tab === 'E' ? 'Environmental (E)' : tab === 'S' ? 'Social (S)' : 'Governance (G)';
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        tab === 'E' ? 'bg-emerald-400' : tab === 'S' ? 'bg-cyan-400' : 'bg-blue-400'
                      }`} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Details */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${current.bgColor} ${current.color} border ${current.borderColor}`}>
                      <current.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{current.title}</h4>
                      <span className="text-xs text-slate-400">{current.badge}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-extrabold font-mono ${current.color}`}>
                      {current.score}
                    </span>
                    <span className="text-xs text-slate-500 font-mono"> / 100</span>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {current.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${current.color} shrink-0 mt-0.5`} />
                        <div>
                          <p className="text-xs font-semibold text-white">{item.label}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
