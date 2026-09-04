import React, { useState } from 'react';
import { ProjectType, ProjectStage, ProjectLead } from '../../types';
import { StorageService } from '../../services/storage';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Layers, 
  FileText, 
  DollarSign, 
  Zap, 
  Send,
  UploadCloud,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface QuarkerizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuarkerizeModal: React.FC<QuarkerizeModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<number>(1); // 2 steps for good UX: 1. Dados Básicos & Contato, 2. Dados Técnicos & Financeiros

  const [formData, setFormData] = useState({
    projectName: '',
    companyName: '',
    cnpj: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    projectType: 'Solar' as ProjectType,
    capacity: '',
    estimatedGeneration: '',
    stage: 'Ready to Build (RTB)' as ProjectStage,
    estimatedCapex: '',
    investedCapex: '',
    requiredCapital: '',
    codForecast: '',
    gridStatus: '',
    environmentalStatus: '',
    landStatus: '',
    ppaContracts: '',
    availableDocs: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLead: ProjectLead = {
      id: `lead-${Date.now()}`,
      projectName: formData.projectName || 'Empreendimento Energético',
      companyName: formData.companyName || 'Empresa Desenvolvedora',
      cnpj: formData.cnpj || '00.000.000/0001-00',
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      projectType: formData.projectType,
      capacity: formData.capacity || 'N/A',
      estimatedGeneration: formData.estimatedGeneration || 'A calcular',
      stage: formData.stage,
      estimatedCapex: formData.estimatedCapex || 'A definir',
      investedCapex: formData.investedCapex || '0',
      requiredCapital: formData.requiredCapital || 'A definir',
      codForecast: formData.codForecast || 'A definir',
      gridStatus: formData.gridStatus || 'Em análise',
      environmentalStatus: formData.environmentalStatus || 'Em processo',
      landStatus: formData.landStatus || 'Regularizado',
      ppaContracts: formData.ppaContracts || 'Em estruturação',
      availableDocs: formData.availableDocs || 'Memorial preliminar',
      description: formData.description || 'Cadastro inicial para quarkerização.',
      submittedAt: new Date().toISOString().split('T')[0],
      crmStatus: 'Novo',
      priority: 'Alta'
    };

    StorageService.addLead(newLead);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({
      projectName: '',
      companyName: '',
      cnpj: '',
      contactName: '',
      email: '',
      phone: '',
      location: '',
      projectType: 'Solar',
      capacity: '',
      estimatedGeneration: '',
      stage: 'Ready to Build (RTB)',
      estimatedCapex: '',
      investedCapex: '',
      requiredCapital: '',
      codForecast: '',
      gridStatus: '',
      environmentalStatus: '',
      landStatus: '',
      ppaContracts: '',
      availableDocs: '',
      description: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#091122]/95 border border-slate-800 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-neon-emerald">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-none">
                QUARKERIZE SEU PROJETO
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">
                Cadastro e Submissão para Análise Preliminar
              </span>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {submitted ? (
            /* Success Feedback State (Section 2 explicit requirement) */
            <div className="text-center py-10 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <h4 className="text-2xl font-bold text-white">
                  Projeto Recebido com Sucesso!
                </h4>
                <p className="text-emerald-300 font-medium text-sm sm:text-base leading-relaxed bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30">
                  "Seu projeto foi recebido. Nossa equipe fará uma análise preliminar e entrará em contato."
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Os dados foram integrados ao nosso comitê de diligência técnica. Em caso de dúvidas imediatas, contate <span className="text-white font-mono">contato@quarkenergy.com.br</span>.
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors shadow-lg"
              >
                Concluir e Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      step === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    1. Empreendimento & Contato
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      step === 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    2. Dados Técnicos & Situação
                  </button>
                </div>
                <span className="text-slate-500 font-mono">Etapa {step} de 2</span>
              </div>

              {step === 1 ? (
                /* Step 1: Informações Gerais do Empreendimento e Empresa */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nome do Empreendimento *
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        required
                        value={formData.projectName}
                        onChange={handleChange}
                        placeholder="Ex: Complexo Solar Horizonte I"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Empresa Proprietária / SPE *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Ex: Horizonte Energia Renovável Ltda"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        CNPJ da Empresa *
                      </label>
                      <input
                        type="text"
                        name="cnpj"
                        required
                        value={formData.cnpj}
                        onChange={handleChange}
                        placeholder="00.000.000/0001-00"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Responsável pelo Projeto *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="Nome completo"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Localização (Cidade / UF) *
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Ex: Pirapora - MG"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="responsavel@empresa.com.br"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(11) 90000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tipo de Empreendimento *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Solar">Usina Solar Fotovoltaica</option>
                        <option value="CGH">Central Geradora Hidrelétrica (CGH)</option>
                        <option value="PCH">Pequena Central Hidrelétrica (PCH)</option>
                        <option value="BESS">Sistema de Armazenamento BESS</option>
                        <option value="Eólica">Usina Eólica</option>
                        <option value="Biogás">Biogás & Biometano</option>
                        <option value="Biomassa">Biomassa Termelétrica</option>
                        <option value="Autoprodução">Autoprodução de Energia</option>
                        <option value="Híbrido">Projeto Híbrido (Solar + BESS)</option>
                        <option value="Eficiência Energética">Eficiência Energética Industrial</option>
                        <option value="Outros">Outro Ativo de Infraestrutura</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Estágio Atual do Projeto *
                      </label>
                      <select
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Greenfield">Greenfield (Estudos Iniciais)</option>
                        <option value="Desenvolvimento">Desenvolvimento (Licenciamento em curso)</option>
                        <option value="Ready to Build (RTB)">Ready to Build (RTB - Parecer e Licença Prontos)</option>
                        <option value="Em Obras">Em Obras / Construção</option>
                        <option value="Operacional">Operacional (Já em Geração)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-2"
                    >
                      <span>Avançar para Dados Técnicos</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 2: Dados Técnicos, Regulatórios e Financeiros */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Potência Instalada (MW ou kW) *
                      </label>
                      <input
                        type="text"
                        name="capacity"
                        required
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="Ex: 5.0 MWp ou 2.8 MW"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Geração Estimada (MWh/ano)
                      </label>
                      <input
                        type="text"
                        name="estimatedGeneration"
                        value={formData.estimatedGeneration}
                        onChange={handleChange}
                        placeholder="Ex: 9.800 MWh/ano"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        CAPEX Estimado Total
                      </label>
                      <input
                        type="text"
                        name="estimatedCapex"
                        value={formData.estimatedCapex}
                        onChange={handleChange}
                        placeholder="Ex: R$ 22.000.000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Investimento Já Realizado
                      </label>
                      <input
                        type="text"
                        name="investedCapex"
                        value={formData.investedCapex}
                        onChange={handleChange}
                        placeholder="Ex: R$ 3.500.000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Investimento Necessário
                      </label>
                      <input
                        type="text"
                        name="requiredCapital"
                        value={formData.requiredCapital}
                        onChange={handleChange}
                        placeholder="Ex: R$ 18.500.000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Previsão de Entrada em Operação (COD)
                      </label>
                      <input
                        type="text"
                        name="codForecast"
                        value={formData.codForecast}
                        onChange={handleChange}
                        placeholder="Ex: 2º Semestre / 2027"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Situação da Conexão à Concessionária
                      </label>
                      <input
                        type="text"
                        name="gridStatus"
                        value={formData.gridStatus}
                        onChange={handleChange}
                        placeholder="Ex: Parecer de Acesso aprovado pela Cemig"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Situação Ambiental
                      </label>
                      <input
                        type="text"
                        name="environmentalStatus"
                        value={formData.environmentalStatus}
                        onChange={handleChange}
                        placeholder="Ex: LI emitida / LP solicitada"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Situação Fundiária
                      </label>
                      <input
                        type="text"
                        name="landStatus"
                        value={formData.landStatus}
                        onChange={handleChange}
                        placeholder="Ex: Arrendamento 25a / Terreno Próprio"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Contratos de Energia (PPA)
                      </label>
                      <input
                        type="text"
                        name="ppaContracts"
                        value={formData.ppaContracts}
                        onChange={handleChange}
                        placeholder="Ex: GD Compartilhada ou PPA ACL"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Documentos Já Disponíveis para Auditoria
                    </label>
                    <input
                      type="text"
                      name="availableDocs"
                      value={formData.availableDocs}
                      onChange={handleChange}
                      placeholder="Ex: Parecer de Acesso, Estudo Solarimétrico, Matrícula Cartorial, Projeto Básico"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Descrição Síntese do Empreendimento
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Descreva detalhes adicionais, especificações dos equipamentos, objetivos da captação ou histórico do ativo..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                    >
                      Voltar
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Submeter Projeto para Diligência</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

        {/* Footer Security Note */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#070c18] flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Dados sob estrita confidencialidade profissional e LGPD.
          </span>
          <span className="font-mono text-cyan-400/80">QUARK ENERGY ORIGINATION</span>
        </div>

      </div>
    </div>
  );
};
