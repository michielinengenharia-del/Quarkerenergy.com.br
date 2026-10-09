import React from 'react';
import { 
  Sparkles, 
  Target, 
  Compass, 
  ShieldCheck, 
  Leaf, 
  Cpu, 
  Zap, 
  Users, 
  TrendingUp,
  ArrowRight,
  BatteryCharging,
  Sliders,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { QuarkLogo } from '../common/Logo';

interface AboutUsViewProps {
  onBackToHome: () => void;
  onNavigateToView?: (view: 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess') => void;
  onOpenQuarkerizeModal?: () => void;
  onOpenInvestorModal?: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({
  onBackToHome,
  onNavigateToView,
  onOpenQuarkerizeModal,
  onOpenInvestorModal
}) => {
  const navigate = (view: 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess') => {
    if (typeof onNavigateToView === 'function') {
      onNavigateToView(view);
    } else if (view === 'landing') {
      onBackToHome();
    }
  };

  const scrollToFaq = () => {
    navigate('landing');
    setTimeout(() => {
      const el = document.getElementById('faq-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const values = [
    {
      title: 'Inovação Responsável',
      desc: 'Tecnologia como meio de trazer eficiência e transparência, jamais para criar opacidade ou promessas irreais.',
      icon: Cpu
    },
    {
      title: 'Transparência Inegociável',
      desc: 'Disponibilização clara de dados de engenharia, premissas de geração e fatores de risco a todos os participantes.',
      icon: ShieldCheck
    },
    {
      title: 'Sustentabilidade & ESG',
      desc: 'Compromisso prioritário com a descarbonização da matriz energética e a geração de valor local compartilhado.',
      icon: Leaf
    },
    {
      title: 'Rigor Técnico & Econômico',
      desc: 'Análise minuciosa de CAPEX, pareceres de acesso, licenças ambientais e contratos de energia (PPA).',
      icon: Target
    },
    {
      title: 'Democratização Consciente',
      desc: 'Ampliação do acesso aos resultados de ativos de infraestrutura respeitando o perfil e a maturidade de cada investidor.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-[#060b17] text-slate-100 pt-24 pb-20">
      
      {/* Hero Banner */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#0a152d] to-[#060b17] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors mb-2 cursor-pointer"
          >
            ← Voltar para Início
          </button>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Quarks formam a matéria. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Projetos energéticos formam a nova economia.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            A <strong>QUARK ENERGY</strong> nasceu para construir a ponte tecnológica e financeira entre desenvolvedores de infraestrutura sustentável e investidores conscientes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Origin / Concept Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
              A Origem do Conceito
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Da física quântica à infraestrutura energética real.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Na física quântica, o <em>quark</em> é a partícula elementar mais fundamental da natureza: combinados entre si, os quarks dão origem aos prótons, nêutrons e a toda matéria visível do universo.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              No setor produtivo moderno, usinas solares, centrais hidrelétricas, biodigestores e sistemas de armazenamento em baterias (BESS) são os blocos fundamentais de construção da nova matriz limpa. A <strong>QUARK ENERGY</strong> é o elemento integrador que catalisa esses ativos, unindo tecnologia, diligência e capital.
            </p>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />
            <QuarkLogo size="lg" className="mb-4" />
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest mt-2">
              QUARK ENERGY DOMAIN
            </span>
            <p className="text-sm font-semibold text-white mt-1">
              quarkenergy.com.br
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs">
              Plataforma tecnológica de digitalização e estruturação de ativos energéticos.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Nossa Missão</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Conectar o capital à infraestrutura da nova economia por meio de tecnologia, transparência e responsabilidade socioambiental, acelerando a transição energética do país com solidez e conformidade.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Nossa Visão</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tornar-se a plataforma tecnológica de referência na digitalização, modelagem e estruturação de ativos de geração e armazenamento de energia da América Latina.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
              Nossos Princípios
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Valores Fundamentais da QUARK
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 w-fit mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{val.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs Direcionando para os outros Menus */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
              Conecte-se aos nossos ecossistemas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Explore as soluções e oportunidades da Quark
            </h2>
            <p className="text-slate-300 text-sm">
              Escolha o caminho que melhor atende ao seu perfil e descubra o futuro da energia:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* CTA 1: Investidor BESS */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30 hover:border-cyan-400/80 transition-all flex flex-col justify-between group shadow-xl">
              <div>
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-4 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Investidor BESS</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Invista no futuro do armazenamento de energia. Conheça nossos planos comerciais com retornos estruturados.
                </p>
              </div>
              <button
                onClick={() => navigate('investor')}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>ACESSAR INVESTIDOR BESS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* CTA 2: Comprar BESS */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-blue-500/30 hover:border-blue-400/80 transition-all flex flex-col justify-between group shadow-xl">
              <div>
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-4 group-hover:scale-105 transition-transform">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Comprar BESS</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dimensione um sistema de armazenamento para sua empresa e reduza custos na ponta com a Black Energy.
                </p>
              </div>
              <button
                onClick={() => navigate('bess')}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>COMPRAR MEU BESS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* CTA 3: Recursos Para Seu Ativo */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/30 hover:border-emerald-400/80 transition-all flex flex-col justify-between group shadow-xl">
              <div>
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-emerald-400 mb-1.5">Recursos Para Seu Ativo</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Seu ativo pode ser maior com o capital certo. Conecte sua usina ou projeto ao capital inteligente.
                </p>
              </div>
              <button
                onClick={() => navigate('seuativo')}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>QUARKERIZAR ATIVO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* CTA 4: Dúvidas & FAQ */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-700/60 hover:border-slate-500 transition-all flex flex-col justify-between group shadow-xl">
              <div>
                <div className="p-3 rounded-xl bg-slate-800 text-slate-300 w-fit mb-4 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Dúvidas & FAQ</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consulte respostas técnicas sobre o modelo de negócio, governança, segurança jurídica e funcionamento.
                </p>
              </div>
              <button
                onClick={scrollToFaq}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <span>VER PERGUNTAS FREQUENTES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
