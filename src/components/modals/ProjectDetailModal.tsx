import React, { useState } from 'react';
import { EnergyProject } from '../../types';
import { 
  X, 
  MapPin, 
  Award, 
  Leaf, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  ShieldAlert, 
  Building, 
  Zap, 
  TrendingUp,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: EnergyProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInvestorModal: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenInvestorModal
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'diligencia' | 'esg' | 'documentos'>('geral');
  const [docFeedback, setDocFeedback] = useState<string | null>(null);

  if (!isOpen || !project) return null;

  const handleDocClick = (docName: string) => {
    setDocFeedback(`Documento "${docName}" disponibilizado para consulta.`);
    setTimeout(() => setDocFeedback(null), 3500);
  };

  // Safe highlight items fallback
  const specs = project.highlightSpecs && project.highlightSpecs.length > 0 
    ? project.highlightSpecs 
    : [
        { label: 'Tecnologia', value: project.type },
        { label: 'Capacidade', value: project.capacity },
        { label: 'Geração Estimada', value: project.estimatedGeneration },
        { label: 'Estágio', value: project.stage }
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#091122]/95 border border-slate-800 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header with Hero Image */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-950">
          <img 
            src={project.imageUrl} 
            alt={project.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80';
            }}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091122] via-[#091122]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & tags overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-semibold">
                  {project.code} • {project.type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700 text-[11px] font-mono">
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.name}
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{project.location} ({project.state})</span>
              </p>
            </div>

            {/* Scores summary */}
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">QUARK SCORE</span>
                <span className="text-lg font-bold text-emerald-400 font-mono leading-tight">
                  {project.quarkScore}/100
                </span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">ESG SCORE</span>
                <span className="text-lg font-bold text-cyan-400 font-mono leading-tight">
                  {project.esgScore}/100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-[#070c18] px-6">
          {[
            { id: 'geral', label: 'Visão Geral & Métricas' },
            { id: 'diligencia', label: 'Diligência & Riscos' },
            { id: 'esg', label: 'Impacto ESG' },
            { id: 'documentos', label: 'Documentação Técnica' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-white bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto">
          
          {activeTab === 'geral' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Highlighted Breve Descrição do Empreendimento */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-900/80 to-cyan-950/20 border border-emerald-500/30 space-y-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                    Breve Descrição do Empreendimento
                  </h3>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Fonte: <strong className="text-white font-sans">{project.type}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Local: <strong className="text-white font-sans">{project.location} - {project.state}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Estágio: <strong className="text-emerald-400 font-sans">{project.stage}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    COD: <strong className="text-cyan-300 font-sans">{project.codEstimate}</strong>
                  </span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Potência Nominal</span>
                  <span className="text-sm font-bold text-white font-mono">{project.capacity}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Geração Média</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">{project.estimatedGeneration}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">CAPEX Estimado</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{project.capex}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Previsão COD</span>
                  <span className="text-sm font-bold text-slate-200 font-mono">{project.codEstimate}</span>
                </div>
              </div>

              {/* Progress Bar & Stage */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Estágio de Execução Físico-Financeiro:</span>
                  <span className="text-emerald-400 font-mono font-bold">{project.implementationProgress}% Concluído</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"
                    style={{ width: `${project.implementationProgress}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Classificação do Estágio: <strong className="text-white">{project.stage}</strong>
                </span>
              </div>

              {/* Highlights & Offtaker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Destaques Técnicos do Ativo</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {specs.map((spec, i) => (
                      <li key={i} className="flex items-center justify-between gap-2 py-1 border-b border-slate-800/40 last:border-0">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {spec.label}
                        </span>
                        <span className="text-white font-mono font-semibold">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Contratos & Estrutura</h4>
                  <div className="text-xs space-y-2 text-slate-300">
                    <p className="flex justify-between gap-2 border-b border-slate-800/40 pb-1">
                      <span className="text-slate-400">Comercialização:</span> 
                      <span className="text-white font-medium text-right">{project.offtakerType || 'GD Compartilhada / PPA'}</span>
                    </p>
                    <p className="flex justify-between gap-2 border-b border-slate-800/40 pb-1">
                      <span className="text-slate-400">Conexão à Rede:</span> 
                      <span className="text-cyan-400 font-mono text-right">{project.gridConnectionStatus || 'Parecer Homologado'}</span>
                    </p>
                    <p className="flex justify-between gap-2 border-b border-slate-800/40 pb-1">
                      <span className="text-slate-400">Licenciamento:</span> 
                      <span className="text-emerald-400 font-medium text-right">{project.environmentalStatus || 'LP / LI Vigentes'}</span>
                    </p>
                    <p className="flex justify-between gap-2">
                      <span className="text-slate-400">Estruturação:</span> 
                      <span className="text-slate-200 font-medium">SPE Constituída 100% Titular</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diligencia' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-white">
                Matriz de Diligência Preliminar (QUARK SCORE: {project.quarkScore}/100)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A equipe de engenharia e compliance da QUARK ENERGY realizou a verificação técnica preliminar dos itens essenciais de viabilidade:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { name: 'Parecer de Acesso à Rede', status: 'Homologado pela Distribuidora', ok: true },
                  { name: 'Licenciamento Ambiental', status: 'Licença de Instalação regular', ok: true },
                  { name: 'Due Diligence Fundiária', status: 'Certidão cartorial livre de ônus', ok: true },
                  { name: 'Estudo P50/P90 Solarimétrico/Hidrológico', status: 'Certificado por empresa independente', ok: true },
                  { name: 'Cronograma Físico-Financeiro (EPC)', status: 'Curva S e marcos contratuais definidos', ok: true },
                  { name: 'Estruturação Jurídica da SPE', status: 'Estatuto social e governança auditados', ok: true }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 mt-4 text-xs text-amber-200/90">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  A diligência da plataforma visa fornecer clareza informacional, não constituindo garantia contra flutuações de mercado, riscos regulatórios sistêmicos ou de implantação.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'esg' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Avaliação Socioambiental (ESG SCORE: {project.esgScore}/100)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Indicadores de impacto positivo e mitigação de carbono
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Classe AAA Sustentável
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Environmental</span>
                  <span className="text-lg font-bold text-white font-mono block">96 / 100</span>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Estimativa de redução de mais de 4.200 toneladas de CO₂ anuais substituindo fontes fósseis.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Social</span>
                  <span className="text-lg font-bold text-white font-mono block">92 / 100</span>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Mais de 80 postos de trabalho gerados durante a fase de implantação com mão de obra regional.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">Governance</span>
                  <span className="text-lg font-bold text-white font-mono block">94 / 100</span>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Relatórios trimestrais de telemetria SCADA e auditoria independente das demonstrações.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="space-y-3 animate-in fade-in">
              <h4 className="text-sm font-bold text-white">
                Repositório Documental do Ativo
              </h4>
              <p className="text-xs text-slate-400">
                Lâminas técnicas e peças jurídicas disponibilizadas para consulta de investidores qualificados:
              </p>

              <div className="space-y-2 pt-2">
                {[
                  { name: 'Teaser Técnico & Resumo Executivo', size: '2.4 MB', type: 'PDF' },
                  { name: 'Parecer de Acesso Concessionária Homologado', size: '4.8 MB', type: 'PDF' },
                  { name: 'Licença Ambiental e Condicionantes Atendidas', size: '1.9 MB', type: 'PDF' },
                  { name: 'Certidão Fundiária da Área de Implantação', size: '3.1 MB', type: 'PDF' },
                  { name: 'Modelagem Econômica e Curva P50/P90', size: '1.2 MB', type: 'XLSX' }
                ].map((doc, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">{doc.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{doc.type} • {doc.size}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDocClick(doc.name)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visualizar</span>
                    </button>
                  </div>
                ))}
              </div>

              {docFeedback && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{docFeedback}</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#070c18] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            <span className="font-semibold text-emerald-400">Versão Demonstrativa:</span> Captação aberta exclusivamente aos QUARKERS cadastrados.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Fechar
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInvestorModal();
              }}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>Tenho Interesse (Cadastrar como QUARKER)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
