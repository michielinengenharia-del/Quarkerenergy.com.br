import React, { useState } from 'react';
import { 
  Zap, 
  BatteryCharging, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  ChevronDown, 
  ChevronLeft,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  HelpCircle,
  Clock,
  Coins,
  Send,
  ExternalLink
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { QuarkerInvestor } from '../../types';

interface InvestorLandingPageProps {
  onBackToHome: () => void;
  onOpenQuarkerPortal: () => void;
  onOpenLgpdModal?: (tab: 'privacy' | 'terms' | 'cookies' | 'rights') => void;
}

interface PlanItem {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  valueFormatted: string;
  valueNumeric: number;
  quotas: number;
  idealFor: string;
  benefits: string[];
  ctaLabel: string;
  accentColor: string;
}

const PLANS: PlanItem[] = [
  {
    id: 'start',
    name: 'PLANO START',
    badge: 'Primeiro Passo',
    isPopular: false,
    valueFormatted: 'R$ 500',
    valueNumeric: 500,
    quotas: 1,
    idealFor: 'Para quem quer experimentar e dar o primeiro passo no setor de energia.',
    benefits: [
      '1 Cota de infraestrutura BESS',
      'Participação na distribuição de resultados operacionais',
      'Acesso à Área do Quarker digital',
      'Relatórios periódicos de rentabilidade',
      'Sem taxas de adesão ou cobranças escondidas'
    ],
    ctaLabel: 'ESCOLHER PLANO START',
    accentColor: 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
  },
  {
    id: 'growth',
    name: 'PLANO GROWTH',
    badge: 'MAIS ESCOLHIDO ⭐',
    isPopular: true,
    valueFormatted: 'R$ 2.500',
    valueNumeric: 2500,
    quotas: 5,
    idealFor: 'O plano mais procurado por investidores que buscam excelente equilíbrio e retorno consistente.',
    benefits: [
      '5 Cotas de infraestrutura BESS',
      'Maior volume de distribuição de receita operacional',
      'Painel prioritário com métricas detalhadas',
      'Canal de suporte direto ao investidor',
      'Direito de preferência em futuras expansões de cotas'
    ],
    ctaLabel: 'ESCOLHER PLANO GROWTH',
    accentColor: 'border-emerald-500/60 hover:border-emerald-400 bg-gradient-to-b from-emerald-950/30 via-slate-900/80 to-slate-900/90 shadow-xl shadow-emerald-950/40'
  },
  {
    id: 'scale',
    name: 'PLANO SCALE',
    badge: 'Alta Participação',
    isPopular: false,
    valueFormatted: 'R$ 5.000',
    valueNumeric: 5000,
    quotas: 10,
    idealFor: 'Para quem deseja construir uma posição sólida e relevante em ativos energéticos reais.',
    benefits: [
      '10 Cotas de infraestrutura BESS',
      'Posição consolidada no ativo âncora de armazenamento',
      'Acompanhamento executivo de faturamento e despacho',
      'Atendimento prioritário via WhatsApp',
      'Condições especiais para janelas de liquidez e recompra'
    ],
    ctaLabel: 'ESCOLHER PLANO SCALE',
    accentColor: 'border-cyan-500/50 hover:border-cyan-400 bg-slate-900/70 shadow-lg shadow-cyan-950/30'
  },
  {
    id: 'custom',
    name: 'PLANO CUSTOM / PRIVATE',
    badge: 'Grandes Alocações',
    isPopular: false,
    valueFormatted: 'A partir de R$ 25.000',
    valueNumeric: 25000,
    quotas: 50,
    idealFor: 'Para investidores qualificados, empresas ou famílias com estratégias de maior volume.',
    benefits: [
      '50+ Cotas ou alocação personalizada em capacidade (MWh)',
      'Reunião direta com a diretoria técnica e de operações',
      'Contratos e diligência jurídica customizada para PF ou PJ',
      'Mesa de atendimento VIP exclusiva',
      'Acesso antecipado a novos ativos e usinas do ecossistema'
    ],
    ctaLabel: 'FALAR COM ESPECIALISTA PRIVADO',
    accentColor: 'border-amber-500/40 hover:border-amber-400 bg-slate-900/60'
  }
];

const FAQS = [
  {
    question: 'O que é um sistema BESS e como o investimento gera receita?',
    answer: 'BESS (Battery Energy Storage Systems) são sistemas de armazenamento de energia em baterias de grande porte. A geração de receita ocorre principalmente através do "arbitrage" elétrico: o sistema carrega suas baterias quando a energia está barata e abundante (como durante o dia com geração solar) e descarrega e vende essa energia nos horários de maior demanda e preço elevado (horários de ponta). Além disso, fatura prestando serviços de suporte, estabilização e confiabilidade para a rede elétrica e indústrias.'
  },
  {
    question: 'Qual é o valor mínimo para começar a investir?',
    answer: 'Você pode começar a investir com apenas R$ 500 no Plano Start, o que equivale a 1 cota de participação na infraestrutura BESS. Não há taxas ocultas e você pode adicionar mais cotas sempre que desejar.'
  },
  {
    question: 'Como e quando recebo os rendimentos das minhas cotas?',
    answer: 'Os rendimentos são apurados com base no faturamento real da operação das baterias e distribuídos periodicamente aos cotistas. Você acompanha todos os números com total transparência e recebe as distribuições diretamente na sua conta bancária.'
  },
  {
    question: 'Existe lastro físico e segurança real para o meu capital?',
    answer: 'Sim! Diferente de investimentos puramente virtuais ou voláteis, o seu capital está lastreado em infraestrutura física tangível: equipamentos e baterias de lítio de padrão global (Tier-1), instalados em locais estratégicos com contratos firmes de conexão e comercialização.'
  },
  {
    question: 'Como acompanho a evolução do meu investimento?',
    answer: 'Todos os investidores recebem acesso exclusivo à Área do Quarker, nossa plataforma digital intuitiva onde você pode visualizar sua quantidade de cotas, histórico de distribuições, relatórios operacionais e comunicados oficiais.'
  },
  {
    question: 'Qual é o prazo de duração do investimento?',
    answer: 'Projetos de infraestrutura de baterias operam em ciclos produtivos de médio e longo prazo (geralmente entre 60 e 84 meses de vida útil com alta performance). Existem janelas programadas de liquidez e recompra previstas para investidores que desejarem realizar seu capital antes do prazo final.'
  },
  {
    question: 'Como funciona o processo de entrada após o envio pelo WhatsApp?',
    answer: 'Assim que você escolhe seu plano e clica em enviar, seu WhatsApp abre automaticamente em conversa direta com a equipe da Quark Energy (+55 49 99977-1176). Nosso consultor apresentará os detalhes completos, tirará qualquer dúvida e orientará o procedimento simples de assinatura e formalização das suas cotas.'
  }
];

export const InvestorLandingPage: React.FC<InvestorLandingPageProps> = ({
  onBackToHome,
  onOpenQuarkerPortal
}) => {
  // Modal de captura e envio
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanItem>(PLANS[1]); // Default Growth
  const [customAmount, setCustomAmount] = useState<number>(PLANS[1].valueNumeric);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityState, setCityState] = useState('');
  const [preferenceNote, setPreferenceNote] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const WHATSAPP_TARGET_NUMBER = '5549999771176';

  const handleOpenPlanModal = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setCustomAmount(plan.valueNumeric);
    setFormError('');
    setIsSubmittedSuccess(false);
    setIsModalOpen(true);
  };

  const handlePlanSelectInsideModal = (planId: string) => {
    const found = PLANS.find(p => p.id === planId);
    if (found) {
      setSelectedPlan(found);
      setCustomAmount(found.valueNumeric);
    }
  };

  const handleScrollToPlans = () => {
    const el = document.getElementById('secao-planos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitAndSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 9) {
      setFormError('Por favor, informe seu WhatsApp completo com DDD.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    const calculatedQuotas = Math.max(1, Math.round(customAmount / 500));
    const preferenceText = preferenceNote.trim() 
      ? preferenceNote.trim() 
      : 'Gostaria de conhecer os detalhes de rentabilidade e próximos passos para alocação.';

    // Montar texto profissional e claro para WhatsApp
    const messageLines = [
      '⚡ *QUARK ENERGY — INTERESSE EM INVESTIMENTO BESS*',
      '',
      'Olá, equipe Quark Energy! Gostaria de investir no futuro da energia e me tornar um Quarker.',
      '',
      '👤 *DADOS DO INVESTIDOR:*',
      `• *Nome:* ${name.trim()}`,
      `• *WhatsApp:* ${phone.trim()}`,
      `• *E-mail:* ${email.trim()}`,
      `• *Cidade/UF:* ${cityState.trim() || 'Não informada'}`,
      '',
      '💼 *PLANO SELECIONADO:*',
      `• *Plano:* ${selectedPlan.name}`,
      `• *Valor Pretendido:* R$ ${customAmount.toLocaleString('pt-BR')}`,
      `• *Quantidade Estimada:* ${calculatedQuotas} cota(s)`,
      '',
      '💬 *PREFERÊNCIA / MENSAGEM:*',
      `"${preferenceText}"`,
      '',
      'Por favor, entrem em contato para me orientar sobre a formalização e detalhes do projeto!'
    ];

    const messageText = messageLines.join('\n');
    const waUrl = `https://wa.me/${WHATSAPP_TARGET_NUMBER}?text=${encodeURIComponent(messageText)}`;

    // Salvar no Storage local para histórico no CRM/Portal
    try {
      const newQuarker: QuarkerInvestor = {
        id: `qk-bess-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        city: cityState.split('/')[0]?.trim() || cityState.trim() || 'Brasil',
        state: cityState.split('/')[1]?.trim() || 'BR',
        investorProfile: customAmount >= 25000 ? 'Qualificado / Profissional' : customAmount >= 5000 ? 'Arrojado' : 'Moderado',
        investmentRange: customAmount >= 50000 ? 'R$ 50 mil – R$ 250 mil' : customAmount >= 10000 ? 'R$ 10 mil – R$ 50 mil' : 'Até R$ 10 mil',
        interests: ['BESS'],
        investmentHorizon: 'Médio prazo (1 a 3 anos)',
        experience: 'Intermediário',
        registeredAt: new Date().toISOString().split('T')[0],
        status: 'Contato Pendente',
        termsAccepted: true,
        marketingConsent: true,
        selectedPlan: selectedPlan.name,
        simulatedAmount: customAmount,
        walletSimulatedBalance: customAmount,
        portfolioCount: 1,
        origin: 'Página Investidor BESS (/investidor)',
        notes: `Plano: ${selectedPlan.name}. Valor pretendido: R$ ${customAmount.toLocaleString('pt-BR')}. Preferência: ${preferenceText}`
      };
      StorageService.addQuarker(newQuarker);
    } catch {
      // Ignorar falhas silenciosas de storage
    }

    setGeneratedWhatsAppUrl(waUrl);
    setIsSubmittedSuccess(true);

    // Tentar abrir o WhatsApp imediatamente
    try {
      window.open(waUrl, '_blank');
    } catch {
      // Fallback exibido no modal
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans pb-16 relative">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#050b18]/90 border-b border-slate-800/80 px-4 sm:px-8 py-3 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              <span className="font-mono">Voltar ao início</span>
            </button>
            <span className="text-slate-700">/</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono font-semibold text-emerald-400 tracking-wider">
                quarkenergy.com.br/investidor
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollToPlans}
              className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold hover:bg-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Ver Planos</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          1) CHAMADA: Invista no futuro da energia. Torne-se um Quarker.
          (Área simples, nada técnica, frases comerciais e atrativas)
          ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-800/60">
        {/* Glow ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-emerald-600/15 via-cyan-600/10 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          
          {/* Badge comercial de destaque */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 shadow-inner mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-300 tracking-wide">
              Oportunidade Aberta em Infraestrutura de Armazenamento BESS
            </span>
          </div>

          {/* Título Principal Conforme Instruções */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Invista no futuro da energia.{' '}
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Torne-se um Quarker.
            </span>
          </h1>

          {/* Frases Comerciais e Atraentes (Simples e Diretas) */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Participe dos lucros da maior revolução do setor elétrico. Com cotas a partir de 
            <strong className="text-emerald-400 font-semibold"> R$ 500</strong>, seu dinheiro é 
            lastreado em sistemas reais de baterias de alta performance, gerando receita previsível na nova economia energética do país.
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Uma classe de ativos antes exclusiva de fundos bilionários, agora estruturada com segurança e transparência digital para você.
          </p>

          {/* Botões de Ação Imediata do Hero */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleScrollToPlans}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-base hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>ESCOLHER MEU PLANO</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_TARGET_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de entender mais sobre como me tornar um Quarker e investir em BESS.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>FALAR COM ESPECIALISTA</span>
            </a>
          </div>

          {/* 4 Destaques Comerciais Rápidos */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5">
                <Coins className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Entrada Acessível</h4>
              <p className="text-xs text-slate-400 mt-1">Comece com apenas R$ 500 por cota, sem barreiras de entrada.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2.5">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Lastro em Ativos Reais</h4>
              <p className="text-xs text-slate-400 mt-1">Baterias físicas de grande porte instaladas e homologadas.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-2.5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Receita Operacional</h4>
              <p className="text-xs text-slate-400 mt-1">Geração de renda recorrente com arbitragem e despacho de energia.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Transparência Total</h4>
              <p className="text-xs text-slate-400 mt-1">Acompanhe relatórios e métricas direto pela Área do Quarker.</p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2) ESCOLHA COMO VOCÊ QUER ENTRAR NA NOVA ECONOMIA DA ENERGIA
          (Venda direta dos planos, clara, atraente e persuasiva)
          ========================================================================= */}
      <section id="secao-planos" className="py-16 sm:py-24 relative border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Planos & Cotas Disponíveis
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Escolha como você quer entrar na nova economia da energia.
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Selecione o plano ideal para seus objetivos patrimoniais. Ao clicar, seus dados são organizados e você é conectado diretamente com nossa equipe no WhatsApp para formalização.
            </p>
          </div>

          {/* Grid dos Planos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 relative ${
                  plan.accentColor
                } ${plan.isPopular ? 'ring-2 ring-emerald-400/50 md:-translate-y-2' : ''}`}
              >
                {/* Badge Superior */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md ${
                      plan.isPopular 
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-emerald-500/20' 
                        : 'bg-slate-800 border border-slate-700 text-slate-300'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Cabeçalho do Card */}
                  <div className="mt-2">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <div className="mt-3">
                      <span className="text-3xl font-extrabold text-white tracking-tight">
                        {plan.valueFormatted}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        {plan.quotas === 1 ? '1 cota de participação' : `${plan.quotas} cotas de participação`}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed min-h-[40px]">
                    {plan.idealFor}
                  </p>

                  <div className="h-px bg-slate-800 my-5"></div>

                  {/* Benefícios */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      O que está incluído:
                    </span>
                    {plan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botão de Escolha */}
                <div className="mt-8 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => handleOpenPlanModal(plan)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                      plan.isPopular
                        ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-emerald-950/40'
                        : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-2">
                    Envio imediato via WhatsApp
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Destaque de Ativo Âncora */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Ativo Âncora Ativo
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  QUARK BESS STORAGE 003 — Capacidade 10.0 MWh / 5.0 MW
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Polo Industrial Eletrointensivo • Tecnologia LFP Tier-1 • Previsão de Operação 2027
                </p>
              </div>
            </div>

            <button
              onClick={() => handleOpenPlanModal(PLANS[1])}
              className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Quero Participar Deste Ativo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3) PERGUNTAS FREQUENTES SOBRE O INVESTIMENTO BESS
          ========================================================================= */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dúvidas & Respostas Rápidas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Perguntas Frequentes sobre o Investimento BESS
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Tudo o que você precisa entender antes de escolher seu plano e se tornar um Quarker.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-colors hover:border-slate-700"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Chamada Final Direta */}
          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#030816] border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ainda tem dúvidas ou prefere atendimento personalizado?
            </h3>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Nossa equipe especializada está disponível para esclarecer os detalhes técnicos e operacionais diretamente pelo WhatsApp.
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_TARGET_NUMBER}?text=${encodeURIComponent('Olá! Tenho algumas dúvidas sobre o investimento BESS da Quark Energy e gostaria de conversar.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-950/50"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp (+55 49 99977-1176)</span>
              </a>

              <button
                onClick={handleScrollToPlans}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all cursor-pointer"
              >
                Ver Planos Novamente
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MODAL: ESCOLHA DO PLANO & ENVIO VIA WHATSAPP (+55 49 99977-1176)
          ========================================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#090f1e] border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-950/50 flex flex-col max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 border-b border-slate-800 bg-slate-900/90">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Quarkerize seu investimento
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Confirmar Dados para o Plano
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {!isSubmittedSuccess ? (
                <form onSubmit={handleSubmitAndSendWhatsApp} className="space-y-4">
                  
                  {/* Seletor rápido de plano */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Plano Selecionado
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PLANS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handlePlanSelectInsideModal(p.id)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                            selectedPlan.id === p.id
                              ? 'border-emerald-400 bg-emerald-500/15 text-white font-bold'
                              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate">{p.name.replace('PLANO ', '')}</span>
                            {selectedPlan.id === p.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          </div>
                          <span className="text-emerald-300 font-mono text-[11px] block mt-0.5">{p.valueFormatted}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Valor e Cotas Estimadas */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Valor de Entrada Base:</span>
                      <strong className="text-sm font-bold text-white">R$ {customAmount.toLocaleString('pt-BR')}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">Cotas de BESS:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {Math.max(1, Math.round(customAmount / 500))} cota(s)
                      </span>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo Silveira"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      WhatsApp com DDD *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (49) 99999-9999"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: carlos@empresa.com.br"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Cidade / Estado
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={cityState}
                        onChange={(e) => setCityState(e.target.value)}
                        placeholder="Ex: Florianópolis/SC ou São Paulo/SP"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Mensagem ou Preferência (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={preferenceNote}
                      onChange={(e) => setPreferenceNote(e.target.value)}
                      placeholder="Ex: Gostaria de saber prazos de retorno e se posso alocar via pessoa jurídica."
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                    />
                  </div>

                  {formError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                      {formError}
                    </div>
                  )}

                  {/* Botão de Envio */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>ENVIAR E FALAR NO WHATSAPP</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400 leading-tight">
                    Destino: WhatsApp Oficial Quark Energy (+55 49 99977-1176). Seus dados são protegidos conforme a LGPD.
                  </p>

                </form>
              ) : (
                /* Tela de Sucesso */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    Dados Registrados com Sucesso!
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                    A mensagem foi gerada e enviada para o WhatsApp da equipe Quark Energy com os dados do seu plano escolhido: <strong>{selectedPlan.name}</strong>.
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={generatedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Abrir WhatsApp Novamente</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Concluir e Fechar
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
