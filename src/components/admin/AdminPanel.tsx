import React, { useState } from 'react';
import { EnergyProject, ProjectLead, QuarkerInvestor, CmsContent, ProjectType, ProjectStage } from '../../types';
import { StorageService } from '../../services/storage';
import { AdminLogin } from './AdminLogin';
import { 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  RotateCcw,
  Sparkles,
  Save,
  Award,
  Leaf,
  LogOut,
  User
} from 'lucide-react';

interface AdminPanelProps {
  projects: EnergyProject[];
  leads: ProjectLead[];
  quarkers: QuarkerInvestor[];
  cms: CmsContent;
  onBackToHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  projects,
  leads,
  quarkers,
  cms,
  onBackToHome
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return StorageService.getAdminAuth()?.isAuthenticated ?? false;
  });
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return StorageService.getAdminAuth()?.email || 'admin@quarkenergy.com.br';
  });

  React.useEffect(() => {
    const handleStorageUpdate = (e: any) => {
      if (e.detail?.key === 'auth_admin' || e.detail?.key === 'all') {
        const auth = StorageService.getAdminAuth();
        setIsAuthenticated(auth?.isAuthenticated ?? false);
        if (auth?.email) {
          setAdminEmail(auth.email);
        } else {
          setAdminEmail('');
        }
      }
    };
    window.addEventListener('quark_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('quark_storage_updated', handleStorageUpdate);
  }, []);

  const [activeTab, setActiveTab] = useState<'projetos' | 'leads' | 'quarkers' | 'cms'>('projetos');
  const [isEditingProject, setIsEditingProject] = useState<EnergyProject | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [cmsForm, setCmsForm] = useState<CmsContent>(cms);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLogout = () => {
    StorageService.clearAdminAuth();
    setIsAuthenticated(false);
    setAdminEmail('');
    onBackToHome();
  };

  // If not authenticated, render AdminLogin
  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onSuccess={(email) => {
          setAdminEmail(email);
          setIsAuthenticated(true);
        }}
        onBackToHome={onBackToHome}
      />
    );
  }

  // New/Edit Project Form State
  const [projectFormData, setProjectFormData] = useState<Partial<EnergyProject>>({
    name: '',
    code: '',
    type: 'Solar',
    capacity: '5.0 MW',
    location: '',
    state: 'SP',
    stage: 'Ready to Build (RTB)',
    estimatedGeneration: '9.500 MWh/ano',
    capex: 'R$ 22.000.000',
    implementationProgress: 35,
    quarkScore: 88,
    esgScore: 92,
    status: 'Em estruturação',
    description: '',
    highlights: ['Parecer de Acesso Concedido', 'Contrato PPA Estruturado'],
    offtakerContract: 'PPA Privado',
    codEstimate: '2º Sem / 2026',
    published: true,
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'
  });

  const handleStartCreate = () => {
    setProjectFormData({
      name: '',
      code: `QRK-${Math.floor(100 + Math.random() * 900)}`,
      type: 'Solar',
      capacity: '5.0 MW',
      location: '',
      state: 'SP',
      stage: 'Ready to Build (RTB)',
      estimatedGeneration: '9.500 MWh/ano',
      capex: 'R$ 20.000.000',
      implementationProgress: 30,
      quarkScore: 88,
      esgScore: 92,
      status: 'Em estruturação',
      description: '',
      highlights: ['Parecer de Acesso Aprovado', 'Due Diligence em Curso'],
      offtakerContract: 'PPA Comercial',
      codEstimate: '1º Sem / 2027',
      published: true,
      imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'
    });
    setIsCreatingProject(true);
    setIsEditingProject(null);
  };

  const handleStartEdit = (proj: EnergyProject) => {
    setIsEditingProject(proj);
    setProjectFormData(proj);
    setIsCreatingProject(false);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingProject) {
      const newProj: EnergyProject = {
        ...(projectFormData as EnergyProject),
        id: `proj-${Date.now()}`
      };
      StorageService.addProject(newProj);
      setIsCreatingProject(false);
    } else if (isEditingProject) {
      StorageService.updateProject(isEditingProject.id, projectFormData);
      setIsEditingProject(null);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Tem certeza que deseja remover este empreendimento?')) {
      StorageService.deleteProject(id);
    }
  };

  const handleUpdateLeadStatus = (leadId: string, status: ProjectLead['crmStatus']) => {
    StorageService.updateLeadStatus(leadId, status);
  };

  const handleSaveCms = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveCmsContent(cmsForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Deseja restaurar os dados de demonstração originais da QUARK ENERGY?')) {
      StorageService.resetToDefault();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col">
      
      {/* Admin Top Header */}
      <header className="border-b border-slate-800 bg-[#060a14] sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            ← Voltar ao Portal Público
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            ADMIN CMS & OPERAÇÕES
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium font-mono">{adminEmail}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Superadmin
            </span>
          </div>

          <button
            onClick={handleResetData}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            title="Restaurar dados iniciais de demonstração"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            title="Encerrar sessão de administrador"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Main Admin Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          {[
            { id: 'projetos', label: `Pipeline de Projetos (${projects.length})`, icon: Building2 },
            { id: 'leads', label: `Quarkerize Leads (${leads.length})`, icon: FileText },
            { id: 'quarkers', label: `Investidores QUARKERS (${quarkers.length})`, icon: Users },
            { id: 'cms', label: 'Gestão de Conteúdo (CMS)', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsCreatingProject(false);
                  setIsEditingProject(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PIPELINE DE PROJETOS */}
        {activeTab === 'projetos' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Gestão de Empreendimentos Energéticos</h3>
                <p className="text-xs text-slate-400">Controle de status, QUARK SCORE, ESG SCORE e dados técnicos</p>
              </div>

              {!isCreatingProject && !isEditingProject && (
                <button
                  onClick={handleStartCreate}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-colors shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Novo Ativo</span>
                </button>
              )}
            </div>

            {/* Create or Edit Form */}
            {(isCreatingProject || isEditingProject) && (
              <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-emerald-400">
                    {isCreatingProject ? 'Cadastrar Novo Empreendimento' : `Editando: ${isEditingProject?.name}`}
                  </h4>
                  <button
                    type="button"
                    onClick={() => { setIsCreatingProject(false); setIsEditingProject(null); }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nome do Projeto *</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.name}
                      onChange={(e) => setProjectFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Código Identificador *</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.code}
                      onChange={(e) => setProjectFormData(p => ({ ...p, code: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Tipo de Ativo</label>
                    <select
                      value={projectFormData.type}
                      onChange={(e) => setProjectFormData(p => ({ ...p, type: e.target.value as ProjectType }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    >
                      <option value="Solar">Solar Fotovoltaica</option>
                      <option value="CGH">Central Geradora Hidrelétrica (CGH)</option>
                      <option value="PCH">Pequena Central Hidrelétrica (PCH)</option>
                      <option value="BESS">Sistema de Baterias (BESS)</option>
                      <option value="Eólica">Eólica Onshore</option>
                      <option value="Biogás">Biogás & Biometano</option>
                      <option value="Biomassa">Biomassa</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Potência Nominal</label>
                    <input
                      type="text"
                      value={projectFormData.capacity}
                      onChange={(e) => setProjectFormData(p => ({ ...p, capacity: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Localização (Cidade)</label>
                    <input
                      type="text"
                      value={projectFormData.location}
                      onChange={(e) => setProjectFormData(p => ({ ...p, location: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Estado (UF)</label>
                    <input
                      type="text"
                      value={projectFormData.state}
                      onChange={(e) => setProjectFormData(p => ({ ...p, state: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Estágio Atual</label>
                    <select
                      value={projectFormData.stage}
                      onChange={(e) => setProjectFormData(p => ({ ...p, stage: e.target.value as ProjectStage }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    >
                      <option value="Greenfield">Greenfield</option>
                      <option value="Desenvolvimento">Desenvolvimento</option>
                      <option value="Ready to Build (RTB)">Ready to Build (RTB)</option>
                      <option value="Em Obras">Em Obras</option>
                      <option value="Operacional">Operacional</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">QUARK SCORE (0 a 100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={projectFormData.quarkScore}
                      onChange={(e) => setProjectFormData(p => ({ ...p, quarkScore: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">ESG SCORE (0 a 100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={projectFormData.esgScore}
                      onChange={(e) => setProjectFormData(p => ({ ...p, esgScore: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-cyan-400 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Progresso de Obras (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={projectFormData.implementationProgress}
                      onChange={(e) => setProjectFormData(p => ({ ...p, implementationProgress: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Status da Rodada</label>
                    <select
                      value={projectFormData.status}
                      onChange={(e) => setProjectFormData(p => ({ ...p, status: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    >
                      <option value="Em estruturação">Em estruturação</option>
                      <option value="Em diligência">Em diligência</option>
                      <option value="Captação aberta">Captação aberta</option>
                      <option value="Financiado">Financiado</option>
                      <option value="Operacional">Operacional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Descrição Técnica e Síntese</label>
                  <textarea
                    rows={2}
                    value={projectFormData.description}
                    onChange={(e) => setProjectFormData(p => ({ ...p, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setIsCreatingProject(false); setIsEditingProject(null); }}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar Empreendimento</span>
                  </button>
                </div>
              </form>
            )}

            {/* Table of Projects */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Código / Ativo</th>
                    <th className="p-3.5">Tipo & Potência</th>
                    <th className="p-3.5">Localização</th>
                    <th className="p-3.5">Estágio</th>
                    <th className="p-3.5">QUARK SCORE</th>
                    <th className="p-3.5">ESG SCORE</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-900/40">
                      <td className="p-3.5">
                        <span className="font-mono text-emerald-400 font-bold block">{proj.code}</span>
                        <span className="text-white font-semibold">{proj.name}</span>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {proj.type} • <span className="font-mono">{proj.capacity}</span>
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {proj.location} ({proj.state})
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">
                        {proj.stage}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-emerald-400">
                        {proj.quarkScore}/100
                      </td>
                      <td className="p-3.5 font-mono font-bold text-cyan-400">
                        {proj.esgScore}/100
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono border border-slate-700">
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleStartEdit(proj)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                          title="Editar"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: QUARKERIZE LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Leads Recebidos via "QUARKERIZE SEU PROJETO"</h3>
              <p className="text-xs text-slate-400">Submissões técnicas de empreendedores para análise e originação</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Data / Empreendimento</th>
                    <th className="p-3.5">Empresa / CNPJ</th>
                    <th className="p-3.5">Responsável / Contato</th>
                    <th className="p-3.5">Tipo & Potência</th>
                    <th className="p-3.5">CAPEX & Necessidade</th>
                    <th className="p-3.5">Status CRM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/40">
                      <td className="p-3.5">
                        <span className="text-[10px] text-slate-500 font-mono block">{lead.submittedAt}</span>
                        <strong className="text-white block">{lead.projectName}</strong>
                        <span className="text-slate-400 text-[11px]">{lead.location}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-slate-300 font-medium block">{lead.companyName}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{lead.cnpj}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-slate-200 block">{lead.contactName}</span>
                        <span className="text-[10px] text-cyan-400 block font-mono">{lead.email}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">{lead.phone}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-emerald-400 font-bold block">{lead.projectType}</span>
                        <span className="text-[11px] text-slate-300 font-mono">{lead.capacity}</span>
                        <span className="text-[10px] text-slate-500 block">{lead.stage}</span>
                      </td>
                      <td className="p-3.5 font-mono">
                        <span className="text-slate-400 text-[10px] block">CAPEX: {lead.estimatedCapex}</span>
                        <span className="text-emerald-400 text-[11px] font-bold block">Captação: {lead.requiredCapital}</span>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={lead.crmStatus}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        >
                          <option value="Novo">Novo</option>
                          <option value="Em Análise Preliminar">Em Análise Preliminar</option>
                          <option value="Diligência Técnica">Diligência Técnica</option>
                          <option value="Estruturação Aprovada">Estruturação Aprovada</option>
                          <option value="Arquivado">Arquivado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INVESTIDORES QUARKERS */}
        {activeTab === 'quarkers' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Base de Investidores Cadastrados (QUARKERS)</h3>
              <p className="text-xs text-slate-400">Leads qualificados interessados na alocação em ativos da transição energética</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">QUARKER / Data</th>
                    <th className="p-3.5">Contato</th>
                    <th className="p-3.5">Cidade / UF</th>
                    <th className="p-3.5">Perfil</th>
                    <th className="p-3.5">Faixa Pretendida</th>
                    <th className="p-3.5">Interesses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                  {quarkers.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-900/40">
                      <td className="p-3.5">
                        <strong className="text-white block">{q.name}</strong>
                        <span className="text-[10px] text-slate-500 font-mono">Cadastrado em {q.registeredAt}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-cyan-400 font-mono block">{q.email}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{q.phone}</span>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {q.city} - {q.state}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">
                          {q.investorProfile}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-emerald-400 font-semibold">
                        {q.investmentRange}
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {q.interests.map((it, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                              {it}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CMS CONTENT */}
        {activeTab === 'cms' && (
          <form onSubmit={handleSaveCms} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Edição de Textos e Mensagens Institucionais (CMS)</h3>
                <p className="text-xs text-slate-400">Modifique slogans, títulos e textos que aparecem no portal público</p>
              </div>

              {saveSuccess && (
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Salvo com sucesso!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Título Principal do Hero (Landing Page)
                </label>
                <input
                  type="text"
                  value={cmsForm.heroHeadline}
                  onChange={(e) => setCmsForm(p => ({ ...p, heroHeadline: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subtítulo do Hero
                </label>
                <textarea
                  rows={2}
                  value={cmsForm.heroSubheadline}
                  onChange={(e) => setCmsForm(p => ({ ...p, heroSubheadline: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Título da Seção "O que é a QUARK"
                  </label>
                  <input
                    type="text"
                    value={cmsForm.whatIsHeadline}
                    onChange={(e) => setCmsForm(p => ({ ...p, whatIsHeadline: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Título da Seção ESG
                  </label>
                  <input
                    type="text"
                    value={cmsForm.esgHeadline}
                    onChange={(e) => setCmsForm(p => ({ ...p, esgHeadline: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Texto da Seção ESG
                </label>
                <textarea
                  rows={2}
                  value={cmsForm.esgIntro}
                  onChange={(e) => setCmsForm(p => ({ ...p, esgIntro: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações no CMS</span>
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
