import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  Lock, 
  ExternalLink,
  Building,
  Info
} from 'lucide-react';

interface BessDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeadModal: (plan?: string) => void;
}

interface OfferDoc {
  id: string;
  title: string;
  category: 'Jurídico' | 'Técnico' | 'Financeiro' | 'Governança';
  filename: string;
  size: string;
  date: string;
  version: string;
  summary: string;
}

export const BessDocumentsModal: React.FC<BessDocumentsModalProps> = ({
  isOpen,
  onClose,
  onOpenLeadModal
}) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const documents: OfferDoc[] = [
    {
      id: 'doc-memo',
      title: 'Memorando Informativo da Oportunidade (MIO)',
      category: 'Governança',
      filename: 'MIO_QUARK_BESS_STORAGE_2026_V1.pdf',
      size: '4.8 MB',
      date: 'Setembro/2026',
      version: 'v1.4',
      summary: 'Visão executiva completa do ativo BESS, modelo de negócios, tese de investimento, estrutura de cotas e cronograma de implementação.'
    },
    {
      id: 'doc-tech',
      title: 'Relatório Técnico Preliminar de Engenharia (BESS 10 MWh)',
      category: 'Técnico',
      filename: 'RELATORIO_TECNICO_BESS_SOROCABA.pdf',
      size: '8.2 MB',
      date: 'Agosto/2026',
      version: 'v2.1',
      summary: 'Dimensionamento das células LFP, inversores bidirecionais, subestação 13.8/138 kV, sistemas de arrefecimento e sistema de supressão de incêndio NFPA 855.'
    },
    {
      id: 'doc-risk',
      title: 'Matriz e Declaração de Fatores de Risco',
      category: 'Jurídico',
      filename: 'DECLARACAO_FATORES_DE_RISCO_BESS.pdf',
      size: '2.4 MB',
      date: 'Setembro/2026',
      version: 'v1.0',
      summary: 'Mapeamento detalhado dos riscos operacionais, regulatórios (ANEEL/ONS), mercadológicos (arbitragem de PLD) e medidas mitigadoras adotadas.'
    },
    {
      id: 'doc-legal',
      title: 'Minuta do Contrato de Participação Econômica & Termo de Adesão',
      category: 'Jurídico',
      filename: 'MINUTA_TERMO_ADESAO_COTAS_QUARKER.pdf',
      size: '3.1 MB',
      date: 'Setembro/2026',
      version: 'v1.2',
      summary: 'Instrumento contratual que formaliza os direitos econômicos do Quarker, governança das decisões, apuração de receitas e diretrizes de saída.'
    },
    {
      id: 'doc-tax',
      title: 'Sumário Tributário e Modelo de Repasse de Receitas',
      category: 'Financeiro',
      filename: 'SUMARIO_TRIBUTARIO_OPERACAO_BESS.pdf',
      size: '1.9 MB',
      date: 'Agosto/2026',
      version: 'v1.0',
      summary: 'Tratamento fiscal das distribuições de receitas líquidas, periodicidade semestral e regras de retenção na fonte.'
    }
  ];

  const handleDownload = (doc: OfferDoc) => {
    setDownloadNotice(`Download iniciado: ${doc.filename}`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#090f1e] border border-slate-700/80 rounded-2xl shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Governança & Compliance
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Documentos Oficiais da Oferta BESS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Repositório de Transparência e Documentação
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Consulte a documentação técnica, jurídica e executiva estruturada para a oportunidade em armazenamento de energia (BESS).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {downloadNotice && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2 font-mono animate-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Important regulatory notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300 mb-1">
                Aviso Legal aos Investidores (Quarkers)
              </p>
              <p className="text-slate-300 leading-relaxed">
                As informações aqui contidas têm caráter informativo e destinam-se a apresentar os aspectos técnicos e econômicos da oportunidade. Rentabilidade passada, projeções ou estimativas não representam garantia de rentabilidade futura. O investimento está sujeito a riscos de mercado e de operação. Consulte sempre os documentos oficiais antes de formalizar sua participação.
              </p>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Documentos Disponíveis para Consulta e Download
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {doc.title}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {doc.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {doc.version}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                        {doc.summary}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 mt-2">
                        <span>Arquivo: {doc.filename}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Atualizado: {doc.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <button
                      onClick={() => handleDownload(doc)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Custody Box */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Todos os contratos contam com assinatura digital qualificada (ICP-Brasil), registro em custódia e trilha auditável de auditoria.
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenLeadModal();
              }}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors whitespace-nowrap cursor-pointer text-xs"
            >
              Quero ser um Quarker
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            QUARK ENERGY S.A. • CNPJ: 48.912.843/0001-92 • Governança BESS
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
