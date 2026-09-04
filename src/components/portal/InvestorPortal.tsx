import React, { useState, useEffect } from 'react';
import { EnergyProject, QuarkerInvestor } from '../../types';
import { StorageService } from '../../services/storage';
import { QuarkerLogin } from './QuarkerLogin';
import { 
  Wallet, 
  TrendingUp, 
  Zap, 
  Activity, 
  FileText, 
  Bell, 
  User, 
  HelpCircle, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Download,
  LogOut,
  Sun,
  Droplets,
  BatteryCharging
} from 'lucide-react';

interface InvestorPortalProps {
  projects: EnergyProject[];
  onBackToHome: () => void;
  onSelectProject: (project: EnergyProject) => void;
  onOpenRegisterModal?: () => void;
}

export const InvestorPortal: React.FC<InvestorPortalProps> = ({
  projects,
  onBackToHome,
  onSelectProject,
  onOpenRegisterModal
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return StorageService.getQuarkerAuth()?.isAuthenticated ?? false;
  });
  const [currentUserEmail, setCurrentUserEmail] = useState<string>(() => {
    return StorageService.getQuarkerAuth()?.email || '';
  });
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageUpdate = (e: any) => {
      if (e.detail?.key === 'auth_quarker' || e.detail?.key === 'all') {
        const auth = StorageService.getQuarkerAuth();
        setIsAuthenticated(auth?.isAuthenticated ?? false);
        if (auth?.email) {
          setCurrentUserEmail(auth.email);
        } else {
          setCurrentUserEmail('');
        }
      }
    };
    window.addEventListener('quark_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('quark_storage_updated', handleStorageUpdate);
  }, []);

  const [activeTab, setActiveTab] = useState<'visao-geral' | 'projetos' | 'telemetria' | 'extrato' | 'documentos' | 'perfil'>('visao-geral');

  // Demonstration account state
  const mockInvestor: QuarkerInvestor = {
    id: 'qrk-demo-01',
    name: 'Roberto Silveira Mello',
    email: currentUserEmail || 'roberto.mello@investimentos.com.br',
    phone: '(11) 98765-4321',
    city: 'São Paulo',
    state: 'SP',
    investorProfile: 'Qualificado / Profissional',
    investmentRange: 'R$ 50 mil – R$ 250 mil',
    interests: ['Solar', 'CGH', 'BESS'],
    investmentHorizon: 'Médio prazo (1 a 3 anos)',
    experience: 'Experiente em Ativos Alternativos',
    registeredAt: '2025-11-14',
    status: 'Ativo',
    termsAccepted: true,
    marketingConsent: true,
    walletSimulatedBalance: 75000,
    portfolioCount: 2
  };

  const handleLogout = () => {
    StorageService.clearQuarkerAuth();
    setIsAuthenticated(false);
    setCurrentUserEmail('');
    onBackToHome();
  };

  // If not authenticated, show QuarkerLogin
  if (!isAuthenticated) {
    return (
      <QuarkerLogin
        onSuccess={(email) => {
          setCurrentUserEmail(email);
          setIsAuthenticated(true);
        }}
        onBackToHome={onBackToHome}
        onOpenRegisterModal={onOpenRegisterModal}
      />
    );
  }

  const simulatedTransactions = [
    { id: 'tx-101', date: '15/02/2026', type: 'Distribuição Rendimentos', project: 'QUARK SOLAR 001', amount: '+ R$ 940,20', status: 'Liquidado' },
    { id: 'tx-102', date: '28/01/2026', type: 'Distribuição Rendimentos', project: 'QUARK SOLAR 001', amount: '+ R$ 915,80', status: 'Liquidado' },
    { id: 'tx-103', date: '12/12/2025', type: 'Alocação em Ativo Demonstrativo', project: 'QUARK SOLAR 001', amount: 'R$ 50.000,00', status: 'Confirmado' },
    { id: 'tx-104', date: '01/12/2025', type: 'Alocação em Ativo Demonstrativo', project: 'QUARK HYDRO CGH 002', amount: 'R$ 25.000,00', status: 'Confirmado' }
  ];

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col">
      
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-[#060a14] sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            ← Voltar ao Portal Público
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ÁREA DO QUARKER
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 font-medium">{mockInvestor.name}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              {mockInvestor.investorProfile}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            title="Encerrar sessão de investidor"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Demonstration Banner (Required by Section 14) */}
      <div className="bg-cyan-950/40 border-b border-cyan-800/40 px-4 py-2.5 text-center text-xs text-cyan-300 flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Aviso:</strong> Área do investidor em versão demonstrativa. Nenhuma transação financeira real é processada nesta versão.
        </span>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 mb-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Patrimônio Demonstrativo</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-white font-mono">
                R$ 75.000,00
              </span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+ R$ 1.856,00 acumulados</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
              <span>Ativos em carteira:</span>
              <strong className="text-white font-mono">2 Usinas</strong>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'visao-geral', label: 'Visão Geral & Métricas', icon: Activity },
              { id: 'projetos', label: 'Ativos em Acompanhamento', icon: Layers },
              { id: 'telemetria', label: 'Telemetria em Tempo Real', icon: Zap },
              { id: 'extrato', label: 'Extrato Demonstrativo', icon: TrendingUp },
              { id: 'documentos', label: 'Documentos do Investidor', icon: FileText },
              { id: 'perfil', label: 'Perfil & Preferências', icon: User }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 space-y-6">
          
          {activeTab === 'visao-geral' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">Energia Gerada Atribuída</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">
                    18,4 MWh
                  </span>
                  <span className="text-[11px] text-cyan-400 mt-1 block">
                    Referência últimos 30 dias
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">Impacto Ambiental (CO₂ Evitado)</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
                    7,9 Toneladas
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Equivalente a 52 árvores
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block">Status Operacional</span>
                  <span className="text-2xl font-bold text-cyan-300 font-mono mt-1 block">
                    100% Regular
                  </span>
                  <span className="text-[11px] text-emerald-400 mt-1 block">
                    Telemetria SCADA Conectada
                  </span>
                </div>
              </div>

              {/* Monitored Assets */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Meus Ativos em Acompanhamento</h3>
                    <p className="text-xs text-slate-400">Empreendimentos energéticos com cotas demonstrativas alocadas</p>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">2 Ativos</span>
                </div>

                <div className="space-y-3">
                  {projects.slice(0, 2).map((proj) => (
                    <div 
                      key={proj.id}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800">
                          {proj.type === 'Solar' ? <Sun className="w-5 h-5" /> : <Droplets className="w-5 h-5" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">{proj.code}</span>
                          <h4 className="text-sm font-bold text-white">{proj.name}</h4>
                          <span className="text-xs text-slate-400">{proj.location} • {proj.capacity}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="text-right">
                          <span className="text-slate-500 block text-[10px]">QUARK SCORE</span>
                          <span className="text-emerald-400 font-bold">{proj.quarkScore}/100</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 block text-[10px]">Progresso</span>
                          <span className="text-white font-bold">{proj.implementationProgress}%</span>
                        </div>
                        <button
                          onClick={() => onSelectProject(proj)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                        >
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'projetos' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white">Todos os Projetos na Plataforma</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">{proj.code}</span>
                        <h4 className="text-sm font-bold text-white">{proj.name}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                        {proj.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-300">Cap: {proj.capacity}</span>
                      <button
                        onClick={() => onSelectProject(proj)}
                        className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                      >
                        Abrir Ficha Técnica →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'telemetria' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Telemetria de Geração Instantânea</h3>
                    <p className="text-xs text-slate-400">Leituras de inversores e estações meteorológicas em campo</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    SCADA Online
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Potência Instantânea</span>
                    <span className="text-lg font-bold text-white font-mono">4.180 kW</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Irradiância Solar</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">924 W/m²</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Performance Ratio (PR)</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">81,4%</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Temperatura Módulos</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono">46,2 °C</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-2 font-mono">Curva de Geração Diária (kW x Horas)</span>
                  <div className="h-32 flex items-end gap-1.5 pt-4">
                    {[10, 15, 25, 45, 70, 88, 98, 95, 90, 75, 55, 30, 15, 5].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <div 
                          className="w-full bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-t group-hover:brightness-125 transition-all"
                          style={{ height: `${val}%` }}
                        />
                        <span className="text-[9px] text-slate-500 font-mono">{i + 6}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'extrato' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white">Extrato Demonstrativo de Operações</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Data</th>
                      <th className="p-3.5">Tipo</th>
                      <th className="p-3.5">Ativo de Referência</th>
                      <th className="p-3.5">Valor Demonstrativo</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/40 font-mono">
                    {simulatedTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-900/40">
                        <td className="p-3.5 text-slate-400">{tx.date}</td>
                        <td className="p-3.5 text-white font-sans">{tx.type}</td>
                        <td className="p-3.5 text-slate-300 font-sans">{tx.project}</td>
                        <td className="p-3.5 text-emerald-400 font-bold">{tx.amount}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white">Documentos e Informes de Rendimentos</h3>
              <div className="space-y-2">
                {[
                  { name: 'Informe Trimestral de Geração e Receitas (4T25)', date: '15/01/2026', size: '2.8 MB' },
                  { name: 'Relatório de Impacto Socioambiental & ESG 2025', date: '10/01/2026', size: '4.1 MB' },
                  { name: 'Demonstrações Financeiras Auditadas da SPE', date: '20/12/2025', size: '3.5 MB' },
                  { name: 'Termo de Adesão e Titularidade de Cotas Digitais', date: '12/12/2025', size: '1.1 MB' }
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <div>
                        <p className="font-semibold text-white">{doc.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">Emitido em {doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setDownloadFeedback(`Download iniciado: ${doc.name}`);
                        setTimeout(() => setDownloadFeedback(null), 3000);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title="Baixar documento"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {downloadFeedback && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{downloadFeedback}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 animate-in fade-in text-xs">
              <h3 className="text-base font-bold text-white">Perfil do QUARKER</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Nome Cadastrado</span>
                  <span className="text-sm font-bold text-white">{mockInvestor.name}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">E-mail</span>
                  <span className="text-sm font-bold text-white">{mockInvestor.email}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Perfil de Investidor</span>
                  <span className="text-sm font-bold text-cyan-400">{mockInvestor.investorProfile}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Faixa Pretendida</span>
                  <span className="text-sm font-bold text-emerald-400">{mockInvestor.investmentRange}</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
