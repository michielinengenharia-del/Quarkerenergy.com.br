import React from 'react';
import { 
  Zap, 
  Eye, 
  Search, 
  Cpu, 
  Leaf, 
  Users, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

export const WhyQuark: React.FC = () => {
  const pillars = [
    {
      title: 'ENERGIA REAL',
      subtitle: 'Infraestrutura Física',
      desc: 'Projetos vinculados à infraestrutura energética concreta — parques solares, hidrelétricas a fio d’água, biomassa e sistemas BESS em operação ou prontos para construir.',
      icon: Zap,
      gradient: 'from-amber-500/20 to-emerald-500/20',
      iconColor: 'text-amber-400',
      borderHover: 'hover:border-amber-500/40'
    },
    {
      title: 'TRANSPARÊNCIA',
      subtitle: 'Rastreabilidade Total',
      desc: 'Informações organizadas, rastreáveis e acessíveis em tempo real. Cada documento técnico, licença ambiental e balanço contábil fica disponível para consulta do investidor.',
      icon: Eye,
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      borderHover: 'hover:border-cyan-500/40'
    },
    {
      title: 'ANÁLISE',
      subtitle: 'Diligência Multidisciplinar',
      desc: 'Avaliação técnica de engenharia, viabilidade econômica minuciosa, verificação fundiária em cartório e matriz de risco regulatório antes de qualquer projeto ser publicado.',
      icon: Search,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400',
      borderHover: 'hover:border-blue-500/40'
    },
    {
      title: 'TECNOLOGIA',
      subtitle: 'Digitalização & Acompanhamento',
      desc: 'Digitalização de contratos, acompanhamento de telemetria de geração, integração com dados setoriais e estruturação em registros distribuídos e inteligentes.',
      icon: Cpu,
      gradient: 'from-indigo-500/20 to-purple-500/20',
      iconColor: 'text-indigo-400',
      borderHover: 'hover:border-indigo-500/40'
    },
    {
      title: 'TRANSIÇÃO LIMPA',
      subtitle: 'Impacto Real e Renovável',
      desc: 'Foco exclusivo em fontes renováveis e armazenamento estratégico, contribuindo ativamente para a modernização e descarbonização da matriz energética nacional.',
      icon: Leaf,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
      borderHover: 'hover:border-emerald-500/40'
    },
    {
      title: 'DEMOCRATIZAÇÃO',
      subtitle: 'Acesso às Oportunidades',
      desc: 'Ampliação do acesso a oportunidades relacionadas à transição energética global, viabilizando a participação de investidores em consonância com a legislação aplicável.',
      icon: Users,
      gradient: 'from-teal-500/20 to-cyan-500/20',
      iconColor: 'text-teal-400',
      borderHover: 'hover:border-teal-500/40'
    }
  ];

  return (
    <section className="py-24 bg-[#070d1a] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Diferenciais de Mercado
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Por que a QUARK ENERGY?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Unimos o melhor da tecnologia digital com a solidez inegociável da engenharia de infraestrutura, eliminando a especulação e priorizando ativos geradores de valor real.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={i}
                className={`p-7 rounded-2xl bg-slate-900/60 border border-slate-800/90 ${pillar.borderHover} transition-all duration-300 group hover:-translate-y-1 shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${pillar.gradient} ${pillar.iconColor} border border-slate-700/50 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      0{i + 1}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                    {pillar.subtitle}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono">Pilar Estratégico</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
