import React, { useState, useEffect } from 'react';
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
  Zap,
  BatteryCharging,
  Layers
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { QuarkerInvestor } from '../../types';

interface BessLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanInitial?: string;
  simulatedAmountInitial?: number;
  onSuccessOpenPortal?: () => void;
}

export const BessLeadModal: React.FC<BessLeadModalProps> = ({
  isOpen,
  onClose,
  selectedPlanInitial = 'Growth (R$ 2.500)',
  simulatedAmountInitial = 2500,
  onSuccessOpenPortal
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [createdQuarker, setCreatedQuarker] = useState<QuarkerInvestor | null>(null);

  const [plan, setPlan] = useState<string>(selectedPlanInitial);
  const [amount, setAmount] = useState<number>(simulatedAmountInitial);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');
  const [investorProfile, setInvestorProfile] = useState<QuarkerInvestor['investorProfile']>('Moderado');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedPlanInitial) {
      setPlan(selectedPlanInitial);
    }
    if (simulatedAmountInitial) {
      setAmount(simulatedAmountInitial);
    }
  }, [selectedPlanInitial, simulatedAmountInitial, isOpen]);

  if (!isOpen) return null;

  const handlePlanChange = (newPlan: string) => {
    setPlan(newPlan);
    if (newPlan.includes('Start')) {
      setAmount(500);
    } else if (newPlan.includes('Growth')) {
      setAmount(2500);
    } else if (newPlan.includes('Scale')) {
      setAmount(5000);
    } else if (newPlan.includes('Custom')) {
      setAmount(25000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMessage('Por favor, informe seu telefone com DDD.');
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('É necessário aceitar os termos da oportunidade para prosseguir.');
      return;
    }

    let investmentRange: QuarkerInvestor['investmentRange'] = 'Até R$ 10 mil';
    if (amount >= 50000) {
      investmentRange = 'R$ 50 mil – R$ 250 mil';
    } else if (amount >= 10000) {
      investmentRange = 'R$ 10 mil – R$ 50 mil';
    }

    const newQuarker: QuarkerInvestor = {
      id: `qk-bess-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city.trim() || 'São Paulo',
      state,
      investorProfile,
      investmentRange,
      interests: ['BESS'],
      investmentHorizon: 'Médio prazo (1 a 3 anos)',
      experience: 'Intermediário',
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'Ativo',
      termsAccepted: true,
      marketingConsent,
      selectedPlan: plan,
      simulatedAmount: amount,
      walletSimulatedBalance: amount,
      portfolioCount: 1,
      origin: 'Landing Page BESS (/investidor)',
      notes: `Plano selecionado: ${plan}. Valor pretendido: R$ ${amount.toLocaleString('pt-BR')}. Cadastrado via Landing Page BESS Investidor.`
    };

    StorageService.addQuarker(newQuarker);
    setCreatedQuarker(newQuarker);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#090f1e] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                Quarker BESS
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Cadastro Exclusivo de Participação
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Quero ser um Quarker
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Garanta sua posição na nova infraestrutura de armazenamento de energia (BESS).
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitted ? (
            /* Success View */
            <div className="text-center py-6 px-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Bem-vindo à nova economia da energia!
                </h3>
                <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                  Seu cadastro para a oportunidade de ativos <strong className="text-emerald-400">BESS</strong> foi registrado com sucesso sob o plano <strong className="text-cyan-400">{createdQuarker?.selectedPlan}</strong>.
                </p>
              </div>

              {/* Lead Summary Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-left max-w-md mx-auto text-xs space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Identificador do Quarker:</span>
                  <span className="font-mono text-cyan-300 font-bold">{createdQuarker?.id}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Investidor:</span>
                  <span className="font-medium text-white">{createdQuarker?.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Plano Selecionado:</span>
                  <span className="text-emerald-400 font-semibold">{createdQuarker?.selectedPlan}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Valor Pretendido:</span>
                  <span className="text-white font-mono font-bold">
                    R$ {createdQuarker?.simulatedAmount?.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status de Habilitação:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    Habilitado para Análise de Alocação
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200/90 max-w-md mx-auto text-left leading-relaxed">
                <p className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <BatteryCharging className="w-4 h-4 text-cyan-400" />
                  Próximos Passos:
                </p>
                <p className="text-slate-300">
                  1. Nosso time de estruturação entrará em contato via WhatsApp/E-mail com a documentação do ativo.<br/>
                  2. Você receberá o termo formal de adesão às cotas com assinatura digital ICP-Brasil.<br/>
                  3. Você já pode explorar o simulador e o painel de investidor da Quark.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {onSuccessOpenPortal && (
                  <button
                    onClick={() => {
                      onClose();
                      onSuccessOpenPortal();
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-emerald-500/20 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Acessar Área do Quarker</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Concluir e Voltar
                </button>
              </div>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Plan Selection Buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  1. Selecione o Plano Desejado
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Start (R$ 500)', label: 'START', val: 'R$ 500' },
                    { id: 'Growth (R$ 2.500)', label: 'GROWTH', val: 'R$ 2.500', badge: 'Popular' },
                    { id: 'Scale (R$ 5.000)', label: 'SCALE', val: 'R$ 5.000' },
                    { id: 'Custom (Personalizado)', label: 'CUSTOM', val: 'Personalizado' },
                  ].map((p) => {
                    const isSelected = plan.includes(p.label);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => handlePlanChange(p.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {p.badge && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500 text-slate-950 uppercase">
                            {p.badge}
                          </span>
                        )}
                        <span className="block text-[11px] font-mono font-bold text-cyan-400">
                          {p.label}
                        </span>
                        <span className="block text-xs font-bold text-white mt-0.5">
                          {p.val}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Data */}
              <div className="space-y-3.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                  2. Dados de Contato e Identificação
                </label>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Silveira"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      E-mail Profissional / Pessoal *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="seu.email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      WhatsApp / Telefone com DDD *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 98765-4321"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-400 mb-1">
                      Cidade
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Ex: São Paulo"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Estado (UF)
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      {['SP', 'MG', 'RJ', 'PR', 'SC', 'RS', 'GO', 'BA', 'ES', 'MT', 'MS', 'DF', 'CE', 'PE', 'Outro'].map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Perfil do Investidor
                  </label>
                  <select
                    value={investorProfile}
                    onChange={(e) => setInvestorProfile(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="Conservador">Conservador (Prioridade em preservação e ativos reais)</option>
                    <option value="Moderado">Moderado (Busca valorização com lastro em infraestrutura)</option>
                    <option value="Arrojado">Arrojado (Foco em potencial de rentabilidade e longo prazo)</option>
                    <option value="Qualificado / Profissional">Investidor Qualificado / Profissional (CVM)</option>
                  </select>
                </div>
              </div>

              {/* Consents & LGPD */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                  />
                  <span className="leading-relaxed">
                    Declaro interesse em receber a documentação da oferta e estou ciente de que as estimativas de retorno dependem do desempenho dos ativos e não constituem garantia de rentabilidade.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-400">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                  />
                  <span className="leading-relaxed">
                    Autorizo a Quark Energy a entrar em contato via WhatsApp e e-mail com atualizações sobre as cotas BESS e relatórios operacionais.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CONCLUIR CADASTRO — QUERO SER UM QUARKER</span>
                </button>
                <p className="text-[11px] font-mono text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Privacidade protegida nos termos da LGPD (Lei 13.709/2018)
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
