import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronLeft, 
  BatteryCharging, 
  Sun, 
  Droplets, 
  Network, 
  MessageCircle, 
  Phone, 
  User, 
  MapPin, 
  FileText, 
  X,
  TrendingUp,
  ShieldCheck,
  Send,
  Building2,
  Workflow
} from 'lucide-react';
import { trackSeuAtivoEvent } from './analytics';
import { StorageService } from '../../services/storage';
import { ProjectLead, ProjectType, ProjectStage } from '../../types';

interface SeuAtivoPageProps {
  onBackToHome: () => void;
  onOpenPortal?: () => void;
  onOpenLgpdModal?: (tab: 'privacy' | 'terms' | 'cookies' | 'rights') => void;
}

export const SeuAtivoPage: React.FC<SeuAtivoPageProps> = ({
  onBackToHome
}) => {
  // Page view tracking on mount & title update
  useEffect(() => {
    document.title = 'Recursos Para Seu Ativo | Quark Energy';
    trackSeuAtivoEvent('seuativo_page_view', { title: 'Recursos Para Seu Ativo' });
  }, []);

  // WhatsApp Target Number
  const WHATSAPP_TARGET = '5549999771176';

  // Modal State for CTA Lead Capture
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCtaOrigin, setSelectedCtaOrigin] = useState<string>('Hero CTA');
  const [selectedAssetType, setSelectedAssetType] = useState<string>('BESS');

  // Form Fields required by user:
  // Nome Completo, descrição do ativo, numero do whatsapp, Cidade/UF
  const [fullName, setFullName] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [cityUf, setCityUf] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const openLeadModal = (origin: string, prefillAssetType?: string) => {
    setSelectedCtaOrigin(origin);
    if (prefillAssetType) {
      setSelectedAssetType(prefillAssetType);
    }
    setFormError('');
    setModalOpen(true);
    trackSeuAtivoEvent('quarkerize_cta_click', { origin });
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Por favor, informe seu Nome Completo.');
      return;
    }
    if (!assetDescription.trim()) {
      setFormError('Por favor, descreva brevemente seu ativo ou projeto.');
      return;
    }
    if (!whatsappNumber.trim() || whatsappNumber.replace(/\D/g, '').length < 8) {
      setFormError('Por favor, informe seu WhatsApp com DDD.');
      return;
    }
    if (!cityUf.trim()) {
      setFormError('Por favor, informe sua Cidade/UF.');
      return;
    }

    setFormLoading(true);

    // Save lead locally to CRM
    const leadId = `lead-ativo-${Date.now()}`;
    const newLead: ProjectLead = {
      id: leadId,
      projectName: `Ativo - ${fullName.trim()}`,
      companyName: fullName.trim(),
      cnpj: 'A consultar',
      contactName: fullName.trim(),
      email: 'contato.whatsapp@quark.com.br',
      phone: whatsappNumber.trim(),
      location: cityUf.trim(),
      projectType: (selectedAssetType === 'BESS' ? 'BESS' : selectedAssetType === 'Usinas' ? 'Solar' : 'Outros') as ProjectType,
      capacity: 'A especificar',
      estimatedGeneration: 'A especificar',
      stage: 'Desenvolvimento' as ProjectStage,
      estimatedCapex: 'Sob análise',
      investedCapex: '0',
      requiredCapital: 'Sob análise de capital',
      codForecast: 'A definir',
      gridStatus: 'Em análise',
      environmentalStatus: 'N/A',
      landStatus: 'N/A',
      ppaContracts: 'N/A',
      availableDocs: 'Será solicitado no WhatsApp',
      description: `Lead Recursos Para Seu Ativo: ${assetDescription.trim()}. Cidade/UF: ${cityUf.trim()}. Tipo: ${selectedAssetType}. Origem: ${selectedCtaOrigin}.`,
      submittedAt: new Date().toISOString().split('T')[0],
      crmStatus: 'Novo',
      priority: 'Alta',
      notes: `Origem: Landing Page /seuativo. Enviado para WhatsApp +55 49 99977-1176.`,
      origin: 'Landing Page /seuativo'
    };

    try {
      StorageService.addLead(newLead);
      trackSeuAtivoEvent('asset_form_submitted', { origin: selectedCtaOrigin });
    } catch (err) {
      console.warn('Erro ao salvar localmente o lead', err);
    }

    // Build WhatsApp message format:
    // Nome Completo, descrição do ativo, numero do whatsapp, Cidade/UF
    const messageLines = [
      '⚡ *QUARK ENERGY — RECURSOS PARA SEU ATIVO*',
      '',
      'Olá, equipe Quark! Tenho um ativo energético e gostaria de avaliar a viabilidade de estruturação e conexão com capital no ecossistema Quark.',
      '',
      `👤 *Nome Completo:* ${fullName.trim()}`,
      `📍 *Cidade/UF:* ${cityUf.trim()}`,
      `📱 *WhatsApp:* ${whatsappNumber.trim()}`,
      `🏷️ *Tipo de Ativo:* ${selectedAssetType}`,
      '',
      `📋 *Descrição do Ativo:*`,
      `${assetDescription.trim()}`,
      '',
      `📌 *Origem:* ${selectedCtaOrigin}`,
      '',
      'Aguardo o retorno do time de especialistas da Quark Energy!'
    ];

    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${WHATSAPP_TARGET}?text=${encodedMessage}`;

    setTimeout(() => {
      setFormLoading(false);
      setModalOpen(false);
      // Reset form
      setFullName('');
      setAssetDescription('');
      setWhatsappNumber('');
      setCityUf('');
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  const faqItems = [
    {
      q: 'Quais tipos de ativos energéticos podem ser apresentados?',
      a: 'Avaliamos sistemas BESS (armazenamento por baterias), usinas solares, centrais geradoras hidrelétricas (CGH/PCH), projetos de biogás/biomassa, subestações, infraestrutura elétrica e projetos em fase de desenvolvimento ou já em operação comercial.'
    },
    {
      q: 'A Quark garante a captação de recursos para o meu ativo?',
      a: 'Não. A Quark Energy realiza a estruturação técnica, jurídica e econômica da oportunidade, conectando o ativo à nossa base e parceiros de capital. Toda captação é potencial e depende da viabilidade comprovada, diligência (due diligence) e aprovação dos investidores.'
    },
    {
      q: 'Como é feita a estruturação econômica e de cotas?',
      a: 'A modelagem varia conforme a natureza jurídica do ativo (SPE, debêntures, contratos de cessão ou participações de rendimento). Quando aplicável e conforme as normas vigentes, a oportunidade é dividida em frações/cotas para viabilizar captações estruturadas.'
    },
    {
      q: 'Qual é o papel do proprietário do ativo após a conexão com capital?',
      a: 'O empreendedor continua sendo o titular ou gestor técnico/operacional do empreendimento, conforme a governança combinada. A Quark auxilia na viabilização financeira, governança de dados e canais de escala.'
    },
    {
      q: 'Quanto tempo leva o processo de avaliação inicial?',
      a: 'Após o contato pelo WhatsApp e envio dos dados básicos de engenharia e faturamento, nossa equipe técnica emite um parecer de elegibilidade inicial em até 5 a 10 dias úteis.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans pb-20 relative overflow-x-hidden">
      
      {/* Top Header / Breadcrumb Minimal */}
      <div className="bg-[#050b18]/90 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              <span className="font-mono">Voltar ao portal Quark</span>
            </button>
            <span className="text-slate-700">/</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono font-bold text-emerald-400 tracking-wider">
                quarkenergy.com.br/seuativo
              </span>
            </div>
          </div>

          <button
            onClick={() => openLeadModal('Header Topo')}
            className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>APRESENTAR MEU ATIVO</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          1) HERO: CHAMADA INICIAL (SEM A PARTE "TRANSFORMAÇÃO DIGITAL DE ATIVOS")
          ======================================================== */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Glow & Grid Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono font-medium text-emerald-300">
              Ativos de energia • Infraestrutura • BESS • Geração de valor
            </span>
          </div>

          {/* Headline Principal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Quarkerize seu ativo.
          </h1>

          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Você tem um ativo energético. Nós ajudamos a transformar esse ativo em uma oportunidade estruturada para captar recursos e conectar novos investidores.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-cta-quarkerize"
              onClick={() => openLeadModal('Hero CTA Principal')}
              className="w-full sm:w-auto px-9 py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-base sm:text-lg hover:brightness-110 active:scale-95 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>QUERO QUARKERIZAR MEU ATIVO</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('secao-elegibilidade');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Workflow className="w-4 h-4 text-emerald-400" />
              <span>VER ELEGIBILIDADE TÉCNICA</span>
            </button>
          </div>

          <div className="pt-3 text-xs font-mono text-slate-400">
            Acesso ao ecossistema Quark • Conexão com investidores • Sujeito à viabilidade técnica e jurídica
          </div>

        </div>
      </section>

      {/* ========================================================
          2) SEÇÃO: SEU ATIVO PODE SER MAIOR COM O CAPITAL CERTO
          ======================================================== */}
      <section className="py-20 bg-[#040816] border-y border-slate-800/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              SINERGIA DE VALOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Seu ativo pode ser maior com o capital certo.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Muitos projetos de infraestrutura energética possuem ativos, tecnologia, operação ou potencial de geração de receita, mas encontram dificuldades para acessar capital, investidores e novos canais de comercialização. <br className="hidden sm:inline" />
              <span className="text-emerald-400 font-semibold">É aqui que entra a Quark.</span>
            </p>
          </div>

          {/* Cards: Você vs Quark */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Lado VOCÊ */}
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                      SEU PAPEL
                    </span>
                    <h3 className="text-2xl font-black text-white">VOCÊ</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span><strong>Ativo</strong> e infraestrutura implantada ou projetada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span><strong>Projeto</strong> com viabilidade comprovada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span><strong>Tecnologia</strong> e equipamentos selecionados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span><strong>Operação</strong> e manutenção de campo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span><strong>Conhecimento técnico</strong> e experiência setorial</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span><strong>Potencial</strong> de geração de receita recorrente</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                Você foca no que faz de melhor: engenharia e operação.
              </div>
            </div>

            {/* Lado QUARK */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-900/90 border border-emerald-500/30 flex flex-col justify-between shadow-xl shadow-emerald-950/20">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-emerald-500/20 mb-6">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      ECOSSISTEMA & CAPITAL
                    </span>
                    <h3 className="text-2xl font-black text-emerald-300">QUARK</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-slate-200">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Estruturação</strong> técnica, financeira e jurídica</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Tecnologia</strong> de acompanhamento e governança</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Ecossistema</strong> com investidores qualificados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Conexão com investidores</strong> pessoa física e jurídica</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Marketing</strong> e posicionamento institucional</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Potencialização da captação</strong> e distribuição</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-500/20">
                <button
                  onClick={() => openLeadModal('Card Quark Conectar')}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>CONECTAR MEU ATIVO AO CAPITAL</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          3) ELEGIBILIDADE TÉCNICA: SEU ATIVO PODE SER A PRÓXIMA OPORTUNIDADE QUARK
          ======================================================== */}
      <section id="secao-elegibilidade" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              ELEGIBILIDADE TÉCNICA
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Seu ativo pode ser a próxima oportunidade Quark.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Conheça as principais tipologias de infraestrutura elegíveis para análise e estruturação.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: BESS */}
            <div 
              onClick={() => openLeadModal('Card Elegibilidade BESS', 'BESS')}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  BESS
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Sistemas de armazenamento de energia por baterias (peak shaving, arbitragem, backup industrial).
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                <span>Apresentar BESS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: GERAÇÃO DE ENERGIA */}
            <div 
              onClick={() => openLeadModal('Card Elegibilidade Geração', 'Geração de Energia')}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  GERAÇÃO DE ENERGIA
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Projetos de geração solar, biogás, biomassa e infraestrutura energética com contratos ou mercado livre.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold">
                <span>Apresentar Geração</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: USINAS */}
            <div 
              onClick={() => openLeadModal('Card Elegibilidade Usinas', 'Usinas Hidráulicas/PCH')}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                  USINAS
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Ativos de geração e projetos de infraestrutura elétrica (CGH, PCH e centrais em operação ou retrofit).
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-teal-400 font-bold">
                <span>Apresentar Usina</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: INFRAESTRUTURA ELÉTRICA */}
            <div 
              onClick={() => openLeadModal('Card Elegibilidade Infraestrutura', 'Infraestrutura Elétrica')}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  INFRAESTRUTURA ELÉTRICA
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Subestações, linhas de transmissão privadas, sistemas elétricos e outros ativos elegíveis de rede.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-blue-400 font-bold">
                <span>Apresentar Infraestrutura</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: PROJETOS ENERGÉTICOS */}
            <div 
              onClick={() => openLeadModal('Card Elegibilidade Projetos', 'Projetos Energéticos')}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  PROJETOS ENERGÉTICOS
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Projetos em desenvolvimento que apresentem viabilidade técnica, fundiária e de ponto de conexão.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
                <span>Apresentar Projeto</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 6: OUTROS ATIVOS */}
            <div 
              onClick={() => openLeadModal('Card Elegibilidade Outros', 'Outros Ativos')}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  OUTROS ATIVOS
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Estruturas inovadoras relacionadas à transição e nova economia da energia.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-violet-400 font-bold">
                <span>Falar com o time</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => openLeadModal('Outro Tipo de Ativo')}
              className="inline-flex items-center gap-2 text-sm font-mono text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
            >
              <span>Tem outro tipo de ativo? Fale com nosso time de engenharia e estruturação</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          4) PERGUNTAS FREQUENTES: TIRE SUAS DÚVIDAS SOBRE QUARKERIZAR SEU ATIVO
          ======================================================== */}
      <section className="py-20 bg-[#040816] border-y border-slate-800/80 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tire suas dúvidas sobre Quarkerizar seu ativo
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Entenda como funciona o processo de análise, elegibilidade e estruturação.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-bold text-white text-base sm:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          5) SEÇÃO FINAL: SEU ATIVO TEM ENERGIA. NÓS PODEMOS AJUDAR A CONECTÁ-LO AO CAPITAL.
          ======================================================== */}
      <section className="py-24 relative text-center overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Seu ativo tem energia. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Nós podemos ajudar a conectá-lo ao capital.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Envie as informações do seu ativo para análise preliminar de viabilidade e conexão com investidores no ecossistema Quark.
          </p>

          <div className="pt-4">
            <button
              id="cta-final-apresentar-ativo"
              onClick={() => openLeadModal('CTA Final')}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-base sm:text-lg hover:brightness-110 active:scale-95 shadow-2xl shadow-emerald-500/30 transition-all cursor-pointer group"
            >
              <MessageCircle className="w-5 h-5 text-slate-950" />
              <span>APRESENTAR MEU ATIVO AGORA</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <div className="pt-4 text-xs font-mono text-slate-400">
            Envio direto para WhatsApp comercial: <strong>+55 (49) 99977-1176</strong>
          </div>

        </div>
      </section>

      {/* ========================================================
          MODAL DE LEAD (Nome Completo, Descrição do Ativo, WhatsApp, Cidade/UF)
          ENVIA OS DADOS FORMATADOS VIA WHATSAPP PARA +5549999771176
          ======================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#090f1e] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                ANÁLISE DE ATIVO & CAPITAÇÃO
              </span>
              <h3 className="text-2xl font-black text-white">
                Apresentar Meu Ativo à Quark
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Preencha os dados abaixo. Ao clicar em enviar, você será direcionado ao nosso WhatsApp comercial com o resumo do ativo já estruturado.
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleSendToWhatsApp} className="space-y-4">
              
              {/* Nome Completo */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nome Completo *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Tipo de Ativo */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tipo de Ativo</span>
                </label>
                <select
                  value={selectedAssetType}
                  onChange={(e) => setSelectedAssetType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="BESS">BESS (Sistemas de Armazenamento por Baterias)</option>
                  <option value="Geração de Energia">Geração de Energia (Solar / Biogás / Biomassa)</option>
                  <option value="Usinas">Usinas (CGH / PCH / Centrais Elétricas)</option>
                  <option value="Infraestrutura Elétrica">Infraestrutura Elétrica (Subestações / Linhas)</option>
                  <option value="Projetos Energéticos">Projetos Energéticos em Desenvolvimento</option>
                  <option value="Outros">Outros Ativos Energéticos</option>
                </select>
              </div>

              {/* Descrição do Ativo */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Descrição do Ativo *</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Conte sobre capacidade (kW/MW), estágio (ideia, projeto ou operação), faturamento estimado ou necessidade de capital..."
                  value={assetDescription}
                  onChange={(e) => setAssetDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* WhatsApp e Cidade/UF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp com DDD *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(49) 99999-9999"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cidade / UF *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Chapecó / SC"
                    value={cityUf}
                    onChange={(e) => setCityUf(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Botão Enviar para WhatsApp */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {formLoading ? (
                    <span>PREPARANDO CONVERSA...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ENVIAR DADOS PARA O WHATSAPP</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] font-mono text-slate-500 text-center">
                Destino: +55 (49) 99977-1176 • Seus dados estão protegidos conforme a LGPD.
              </p>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
