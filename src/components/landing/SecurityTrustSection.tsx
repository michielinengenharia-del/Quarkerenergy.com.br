import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  FileText, 
  Database, 
  Server, 
  History, 
  GitCommit,
  CheckCircle,
  Eye
} from 'lucide-react';

export const SecurityTrustSection: React.FC = () => {
  const securityPilars = [
    {
      title: 'Segurança da Informação',
      desc: 'Políticas restritas de proteção e confidencialidade aplicadas a projetos industriais e dados cadastrais.',
      icon: ShieldCheck
    },
    {
      title: 'Controle de Acesso & RBAC',
      desc: 'Níveis de permissão rigorosos segregando empreendedores, investidores e comitês de auditoria técnica.',
      icon: KeyRound
    },
    {
      title: 'Autenticação Robusta',
      desc: 'Mecanismos de autenticação multifator e sessões protegidas por chaves criptográficas assimétricas.',
      icon: Lock
    },
    {
      title: 'Criptografia em Trânsito e Repouso',
      desc: 'Tráfego cifrado via TLS 1.3 de ponta a ponta e bases de dados criptografadas com padrão AES-256.',
      icon: Server
    },
    {
      title: 'Rastreabilidade Criptográfica',
      desc: 'Histórico auditável e imutável de emissões, transações e validações de engenharia com carimbo de tempo.',
      icon: GitCommit
    },
    {
      title: 'Registros de Alterações (Audit Logs)',
      desc: 'Trilha de auditoria permanente monitorando qualquer inserção, edição documental ou modificação de status.',
      icon: History
    },
    {
      title: 'Segregação de Dados & SPEs',
      desc: 'Isolamento contábil e jurídico de cada empreendimento sob Sociedades de Propósito Específico (SPE).',
      icon: Database
    },
    {
      title: 'Governança & Rotinas de Backup',
      desc: 'Políticas de contingência, redundância de armazenamento e comitês periódicos de gestão de riscos.',
      icon: FileText
    }
  ];

  return (
    <section id="seguranca-governanca" className="py-24 bg-[#070c18] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono font-semibold text-blue-400 mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>PROTEÇÃO, DILIGÊNCIA & COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tecnologia com governança.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            A infraestrutura da QUARK ENERGY foi desenhada sob princípios de segurança da informação, auditoria contínua e governança corporativa, garantindo rastreabilidade integral para desenvolvedores e investidores.
          </p>
        </div>

        {/* 8 Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {securityPilars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 w-fit mb-3 group-hover:bg-cyan-500/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle className="w-3 h-3" />
                  <span>Diretriz Ativa</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Compliance Callout */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <p>
              Práticas operacionais alinhadas à Lei Geral de Proteção de Dados (LGPD) e às melhores rotinas de diligência prévia (due diligence) do setor de infraestrutura energética.
            </p>
          </div>
          <span className="font-mono text-cyan-400 shrink-0 font-semibold">
            quarkenergy.com.br
          </span>
        </div>

      </div>
    </section>
  );
};
