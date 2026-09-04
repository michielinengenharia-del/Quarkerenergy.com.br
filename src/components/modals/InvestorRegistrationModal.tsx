import React, { useState } from 'react';
import { ProjectType, QuarkerInvestor } from '../../types';
import { StorageService } from '../../services/storage';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Wallet, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from 'lucide-react';

interface InvestorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessOpenPortal?: () => void;
}

export const InvestorRegistrationModal: React.FC<InvestorRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccessOpenPortal
}) => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: 'SP',
    investorProfile: 'Moderado' as QuarkerInvestor['investorProfile'],
    investmentRange: 'R$ 50 mil – R$ 250 mil' as QuarkerInvestor['investmentRange'],
    interests: ['Solar', 'CGH'] as ProjectType[],
    investmentHorizon: 'Médio prazo (1 a 3 anos)' as QuarkerInvestor['investmentHorizon'],
    experience: 'Intermediário' as QuarkerInvestor['experience'],
    termsAccepted: false,
    marketingConsent: true
  });

  if (!isOpen) return null;

  const projectTypeOptions: ProjectType[] = [
    'Solar',
    'CGH',
    'PCH',
    'BESS',
    'Eólica',
    'Biogás',
    'Biomassa',
    'Autoprodução',
    'Eficiência Energética',
    'Outros'
  ];

  const handleInterestToggle = (type: ProjectType) => {
    if (formData.interests.includes(type)) {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== type)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, type]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) return;

    const newQuarker: QuarkerInvestor = {
      id: `qrk-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      investorProfile: formData.investorProfile,
      investmentRange: formData.investmentRange,
      interests: formData.interests.length > 0 ? formData.interests : ['Solar'],
      investmentHorizon: formData.investmentHorizon,
      experience: formData.experience,
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'Ativo',
      termsAccepted: formData.termsAccepted,
      marketingConsent: formData.marketingConsent,
      walletSimulatedBalance: 50000,
      portfolioCount: 1
    };

    StorageService.addQuarker(newQuarker);
    StorageService.setQuarkerAuth(newQuarker.email, newQuarker.name);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: 'SP',
      investorProfile: 'Moderado',
      investmentRange: 'R$ 50 mil – R$ 250 mil',
      interests: ['Solar', 'CGH'],
      investmentHorizon: 'Médio prazo (1 a 3 anos)',
      experience: 'Intermediário',
      termsAccepted: false,
      marketingConsent: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#091122]/95 border border-slate-800 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-neon-blue">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-none">
                Torne-se um QUARKER
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">
                Invista na nova economia da energia
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

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            /* Confirmation Screen (Section 16: "Bem-vindo ao universo QUARK.") */
            <div className="text-center py-10 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-xl">
                <Sparkles className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-2xl font-extrabold text-white">
                  Bem-vindo ao universo QUARK.
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Seu cadastro de QUARKER foi registrado com sucesso. Você receberá lâminas técnicas e comunicados de abertura de ativos prioritariamente.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {onSuccessOpenPortal && (
                  <button
                    onClick={() => {
                      handleResetAndClose();
                      onSuccessOpenPortal();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Acessar Área do QUARKER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold text-sm hover:bg-slate-700"
                >
                  Fechar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-xs text-slate-400 leading-relaxed">
                Cadastre-se para receber informações sobre novos empreendimentos e oportunidades disponíveis na plataforma. Não solicitamos dados sensíveis nesta primeira etapa.
              </p>

              {/* Personal Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Seu nome completo"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    E-mail Corporativo ou Pessoal *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="seu.email@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="(11) 98888-7777"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                    placeholder="Sua cidade"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estado (UF) *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData(p => ({ ...p, state: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Investment Range & Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Faixa de Investimento Pretendida *
                  </label>
                  <select
                    value={formData.investmentRange}
                    onChange={(e) => setFormData(p => ({ ...p, investmentRange: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Até R$ 10 mil">Até R$ 10 mil</option>
                    <option value="R$ 10 mil – R$ 50 mil">R$ 10 mil – R$ 50 mil</option>
                    <option value="R$ 50 mil – R$ 250 mil">R$ 50 mil – R$ 250 mil</option>
                    <option value="R$ 250 mil – R$ 1 milhão">R$ 250 mil – R$ 1 milhão</option>
                    <option value="Acima de R$ 1 milhão">Acima de R$ 1 milhão</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Perfil de Investidor *
                  </label>
                  <select
                    value={formData.investorProfile}
                    onChange={(e) => setFormData(p => ({ ...p, investorProfile: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Conservador">Conservador</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Arrojado">Arrojado</option>
                    <option value="Qualificado / Profissional">Investidor Qualificado / Profissional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Horizonte de Investimento
                  </label>
                  <select
                    value={formData.investmentHorizon}
                    onChange={(e) => setFormData(p => ({ ...p, investmentHorizon: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Curto prazo (até 1 ano)">Curto prazo (até 1 ano)</option>
                    <option value="Médio prazo (1 a 3 anos)">Médio prazo (1 a 3 anos)</option>
                    <option value="Longo prazo (3 a 7 anos)">Longo prazo (3 a 7 anos)</option>
                    <option value="Estratégico (+7 anos)">Estratégico (+7 anos)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Experiência com Investimentos
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData(p => ({ ...p, experience: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Experiente em Ativos Alternativos">Experiente em Ativos Alternativos / Infraestrutura</option>
                  </select>
                </div>
              </div>

              {/* Multi-select Interests */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Interesse em quais tipos de projetos?
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypeOptions.map((type) => {
                    const isSelected = formData.interests.includes(type);
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => handleInterestToggle(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 font-bold border border-cyan-400'
                            : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData(p => ({ ...p, termsAccepted: e.target.checked }))}
                    className="mt-0.5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300">
                    Li e aceito os <span className="text-cyan-400 underline">Termos de Uso</span> e a <span className="text-cyan-400 underline">Política de Privacidade</span> (LGPD). *
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData(p => ({ ...p, marketingConsent: e.target.checked }))}
                    className="mt-0.5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-400">
                    Autorizo o recebimento de informações, novidades e avisos de abertura de oportunidades da QUARK ENERGY.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={!formData.termsAccepted}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    formData.termsAccepted
                      ? 'bg-emerald-500 text-slate-950 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(16,185,129,0.4)]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>CADASTRAR COMO QUARKER</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#070c18] flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Privacidade assegurada sob a LGPD (Lei 13.709/2018).
          </span>
          <span className="font-mono text-cyan-400">QUARKER ECOSYSTEM</span>
        </div>

      </div>
    </div>
  );
};
