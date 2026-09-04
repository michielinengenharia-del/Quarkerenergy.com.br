import React, { useState } from 'react';
import { EnergyProject, ProjectType } from '../../types';
import { 
  Sun, 
  Droplets, 
  BatteryCharging, 
  Zap, 
  Wind,
  MapPin, 
  ArrowRight, 
  Eye, 
  Filter,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FeaturedProjectsProps {
  projects: EnergyProject[];
  onSelectProject: (project: EnergyProject) => void;
  onOpenInvestorModal: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [expandedBriefId, setExpandedBriefId] = useState<string | null>(null);

  const filterOptions = ['Todos', 'Solar', 'CGH', 'BESS', 'Biogás', 'Eólica'];

  const filteredProjects = projects.filter(p => {
    if (!p.published) return false;
    if (selectedFilter === 'Todos') return true;
    return p.type === selectedFilter;
  });

  const getTypeIcon = (type: ProjectType) => {
    switch (type) {
      case 'Solar': return Sun;
      case 'CGH':
      case 'PCH': return Droplets;
      case 'BESS': return BatteryCharging;
      case 'Biogás':
      case 'Biomassa': return Zap;
      case 'Eólica': return Wind;
      default: return Zap;
    }
  };

  const toggleBrief = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedBriefId(prev => prev === id ? null : id);
  };

  return (
    <section id="projetos-destaque" className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Ambient background illumination */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
              Pipeline de Empreendimentos
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projetos em Destaque
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Empreendimentos selecionados em fase de diligência técnica, estruturação financeira e modelagem ESG. Explore dados auditáveis de cada oportunidade.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-500" />
              Filtrar:
            </span>
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid (Immersive UI 3-Column Card Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const IconComponent = getTypeIcon(project.type);

            return (
              <div 
                key={project.id}
                className="rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between group backdrop-blur-sm relative"
              >
                <div>
                  {/* Card Image with Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img 
                      src={project.imageUrl} 
                      alt={project.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 text-xs font-semibold text-white backdrop-blur-md">
                      <IconComponent className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{project.type} • {project.capacity}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-400 text-[10px] font-bold uppercase backdrop-blur-md">
                      {project.status}
                    </div>

                    {/* Location Pin */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{project.location} ({project.state})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                          {project.code}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          {project.stage}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Inline Breve Descrição Toggle */}
                      <button
                        onClick={(e) => toggleBrief(project.id, e)}
                        className="mt-2 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>{expandedBriefId === project.id ? 'Recolher breve descrição' : 'Ler breve descrição completa'}</span>
                        {expandedBriefId === project.id ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {expandedBriefId === project.id && (
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
                          <div className="font-bold text-emerald-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
                            <span>Resumo Executivo do Empreendimento:</span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-200">
                            {project.description}
                          </p>
                          <div className="pt-1.5 border-t border-slate-800/80 text-[11px] font-mono space-y-1 text-slate-400">
                            <div><strong className="text-slate-300">Conexão:</strong> {project.gridConnectionStatus || 'Homologada'}</div>
                            <div><strong className="text-slate-300">Offtaker:</strong> {project.offtakerType || 'Mercado Livre (ACL)'}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dual Score Badges with Glowing Progress Bars (Immersive UI) */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">QUARK SCORE</span>
                          <span className="text-emerald-400 font-mono font-bold text-sm">{project.quarkScore}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" 
                            style={{ width: `${project.quarkScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">ESG SCORE</span>
                          <span className="text-blue-400 font-mono font-bold text-sm">{project.esgScore}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" 
                            style={{ width: `${project.esgScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80 text-xs">
                      <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400 text-xs">CAPEX Estimado</span>
                        <span className="text-slate-200 font-mono font-semibold">{project.capex}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400 text-xs">Geração Estimada</span>
                        <span className="text-slate-200 font-mono font-semibold">{project.estimatedGeneration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs">Previsão COD</span>
                        <span className="text-slate-300 font-mono font-medium">{project.codEstimate}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer with Immersive UI Button */}
                <div className="p-6 pt-0">
                  <button
                    id={`btn-details-${project.id}`}
                    onClick={() => onSelectProject(project)}
                    className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer group/btn shadow-md hover:shadow-emerald-500/10"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                    <span>VER DETALHES DO EMPREENDIMENTO</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
