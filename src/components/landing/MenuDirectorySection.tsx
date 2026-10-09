import React from 'react';
import { 
  TrendingUp, 
  BatteryCharging, 
  Zap, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Users,
  Briefcase,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface MenuDirectorySectionProps {
  onNavigateToView: (view: 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess') => void;
  onOpenInvestorModal?: () => void;
  onOpenQuarkerizeModal?: () => void;
}

export const MenuDirectorySection: React.FC<MenuDirectorySectionProps> = ({
  onNavigateToView,
  onOpenInvestorModal,
  onOpenQuarkerizeModal
}) => {
  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    {
      id: 'oportunidades-investidores',
      badge: 'OPORTUNIDADES',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      title: 'Para Investidores',
      headline: 'Acesse cotas e projetos de infraestrutura energética.',
      description: 'Participe da transição energética através de ativos com diligência técnica, contratos sólidos e distribuição de resultados.',
      icon: TrendingUp,
      accentColor: 'from-cyan-500 to-blue-600',
      actionText: 'CONHECER OPORTUNIDADES',
      actionType: 'scroll',
      target: 'como-funciona-quarker',
      borderHover: 'hover:border-cyan-500/50'
    },
    {
      id: 'oportunidades-empreendedores',
      badge: 'OPORTUNIDADES',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      title: 'Para Empreendedores',
      headline: 'Estruture seu projeto e acelere o acesso a funding.',
      description: 'Cadastre sua usina solar, hidrelétrica ou sistema de bioenergia para avaliação técnica, estruturação e captação de capital.',
      icon: Briefcase,
      accentColor: 'from-emerald-500 to-teal-600',
      actionText: 'ESTRUTURAR MEU PROJETO',
      actionType: 'scroll',
      target: 'quarkerize-secao',
      borderHover: 'hover:border-emerald-500/50'
    },
    {
      id: 'investidor-bess',
      badge: 'PÁGINA EXCLUSIVA',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40',
      title: 'Investidor BESS',
      headline: 'Invista no futuro do armazenamento de energia.',
      description: 'Torne-se um Quarker. Planos estruturados em cotas BESS com retorno previsível, segurança contratual e envio direto via WhatsApp.',
      icon: TrendingUp,
      accentColor: 'from-cyan-400 to-emerald-500',
      actionText: 'VER PLANOS DE INVESTIMENTO',
      actionType: 'navigate',
      view: 'investor' as const,
      borderHover: 'hover:border-cyan-400'
    },
    {
      id: 'comprar-bess',
      badge: 'SOLUÇÃO CORPORATIVA',
      badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-400/40',
      title: 'Comprar BESS',
      headline: 'Quer comprar um BESS para sua empresa?',
      description: 'Descubra qual sistema de baterias faz sentido para sua operação, otimize custos de ponta e solicite dimensionamento pela Black Energy.',
      icon: BatteryCharging,
      accentColor: 'from-blue-500 to-indigo-600',
      actionText: 'DIMENSIONAR MEU BESS',
      actionType: 'navigate',
      view: 'bess' as const,
      borderHover: 'hover:border-blue-400'
    },
    {
      id: 'recursos-seu-ativo',
      badge: 'EM DESTAQUE',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
      title: 'Recursos Para Seu Ativo',
      headline: 'Seu ativo pode ser maior com o capital certo.',
      description: 'Conecte sua infraestrutura energética a fontes sólidas de financiamento. Processo direto de qualificação técnica e envio pelo WhatsApp.',
      icon: Zap,
      accentColor: 'from-emerald-400 to-green-500',
      actionText: 'QUARKERIZAR MEU ATIVO',
      actionType: 'navigate',
      view: 'seuativo' as const,
      borderHover: 'hover:border-emerald-400 shadow-emerald-500/10'
    },
    {
      id: 'sobre-nos',
      badge: 'INSTITUCIONAL',
      badgeColor: 'bg-slate-700/40 text-slate-300 border-slate-600/50',
      title: 'Sobre Nós',
      headline: 'Nossa tese: Quarks formam a matéria, projetos a economia.',
      description: 'Conheça o propósito, equipe de engenharia, governança e a visão tecnológica por trás da Quark Energy.',
      icon: Users,
      accentColor: 'from-slate-400 to-teal-400',
      actionText: 'CONHECER A QUARK',
      actionType: 'navigate',
      view: 'about' as const,
      borderHover: 'hover:border-slate-500'
    },
    {
      id: 'faq',
      badge: 'TRANSPARÊNCIA',
      badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-400/40',
      title: 'Perguntas Frequentes (FAQ)',
      headline: 'Tire todas as suas dúvidas com respostas técnicas e claras.',
      description: 'Acesse explicações completas sobre mitigação de riscos, regulamentação setorial, prazos e processo de retorno dos ativos.',
      icon: HelpCircle,
      accentColor: 'from-purple-500 to-pink-500',
      actionText: 'CONSULTAR O FAQ',
      actionType: 'scroll',
      target: 'faq-section',
      borderHover: 'hover:border-purple-400'
    }
  ];

  return (
    <section id="menu-hub-section" className="py-20 bg-[#030816] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GUIA DE ACESSO RÁPIDO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Nossos Menus & Oportunidades
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Escolha seu objetivo abaixo e acerte o direcionamento direto para a solução que você procura:
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isHighlight = item.id === 'recursos-seu-ativo' || item.id === 'investidor-bess';

            return (
              <div
                key={item.id}
                className={`p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group ${item.borderHover} ${
                  isHighlight ? 'ring-1 ring-emerald-500/30 bg-slate-900/80 shadow-2xl shadow-emerald-500/5' : 'hover:bg-slate-900/90'
                }`}
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <div className={`p-2.5 rounded-xl bg-slate-800/80 text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>

                  {/* Menu Name */}
                  <h3 className="text-xs uppercase tracking-widest font-mono font-semibold text-slate-400 mb-1">
                    {item.title}
                  </h3>

                  {/* Headline */}
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
                    {item.headline}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  {item.actionType === 'navigate' ? (
                    <button
                      onClick={() => onNavigateToView(item.view!)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                        item.id === 'recursos-seu-ativo'
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-emerald-500/20 hover:scale-[1.02]'
                          : item.id === 'investidor-bess'
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold shadow-cyan-500/20 hover:scale-[1.02]'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      onClick={() => scrollTo(item.target!)}
                      className="w-full py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{item.actionText}</span>
                      <ChevronRight className="w-4 h-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
