import React from 'react';
import { QuarkLogo } from './Logo';
import { 
  ShieldAlert, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  FileCheck, 
  CheckCircle2, 
  Lock,
  Globe
} from 'lucide-react';

interface FooterProps {
  onOpenLgpdModal?: (tab: 'privacy' | 'terms' | 'cookies' | 'rights') => void;
  onNavigateToView?: (view: 'landing' | 'about' | 'portal' | 'admin') => void;
  onOpenQuarkerizeModal?: () => void;
  onOpenInvestorModal?: () => void;
  // Backward compatibility props
  onNavigate?: (view: any) => void;
  onOpenQuarkerize?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLgpdModal,
  onNavigateToView,
  onOpenQuarkerizeModal,
  onOpenInvestorModal,
  onNavigate,
  onOpenQuarkerize
}) => {
  const navigate = (view: 'landing' | 'about' | 'portal' | 'admin') => {
    if (typeof onNavigateToView === 'function') {
      onNavigateToView(view);
    } else if (typeof onNavigate === 'function') {
      onNavigate(view === 'landing' ? 'home' : view);
    }
  };

  const handleOpenQuarkerize = () => {
    if (typeof onOpenQuarkerizeModal === 'function') {
      onOpenQuarkerizeModal();
    } else if (typeof onOpenQuarkerize === 'function') {
      onOpenQuarkerize();
    }
  };

  const handleOpenInvestor = () => {
    if (typeof onOpenInvestorModal === 'function') {
      onOpenInvestorModal();
    }
  };

  const handleOpenLgpd = (tab: 'privacy' | 'terms' | 'cookies' | 'rights') => {
    if (typeof onOpenLgpdModal === 'function') {
      onOpenLgpdModal(tab);
    }
  };

  const scrollTo = (id: string) => {
    navigate('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer id="main-footer" className="bg-[#050912] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand & Manifesto Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <QuarkLogo size="lg" showDomain={true} />
            <p className="text-slate-300 font-medium text-base">
              A nova infraestrutura digital da economia energética.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Conectamos empreendimentos energéticos de ativos reais a novas fontes de capital através de rigorosa análise de engenharia, governança, dados auditáveis e critérios ESG.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, São Paulo - SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>contato@quarkenergy.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-emerald-400/90 font-medium">www.quarkenergy.com.br</span>
              </div>
            </div>
          </div>

          {/* Links: Ecossistema */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider font-mono">
              Ecossistema
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => navigate('about')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Sobre a QUARK ENERGY
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('o-que-e')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Como Funciona o Modelo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('projetos-destaque')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Projetos em Destaque
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('secao-esg')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Critérios ESG & Impacto
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('quark-score-section')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  QUARK SCORE & Valuation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('faq-section')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Acesso & Ações */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider font-mono">
              Acesso & Portais
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={handleOpenQuarkerize} 
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  QUARKERIZE seu Projeto
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={handleOpenInvestor} 
                  className="text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Seja um QUARKER
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('portal')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Área do QUARKER (Dashboard)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('admin')} 
                  className="hover:text-white transition-colors cursor-pointer text-slate-500 hover:text-emerald-300"
                >
                  Painel CMS Admin
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('seguranca-governanca')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tecnologia & Governança
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Legal & LGPD */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider font-mono">
              Jurídico & LGPD
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => handleOpenLgpd('terms')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleOpenLgpd('privacy')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleOpenLgpd('cookies')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Política de Cookies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleOpenLgpd('rights')} 
                  className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-cyan-400" />
                  Canal do Titular de Dados
                </button>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <FileCheck className="w-3 h-3 text-emerald-400" />
                  LGPD Compliance
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Immersive UI Protocol & ESG Pillars Strip */}
        <div className="mt-10 py-6 px-6 rounded-2xl bg-slate-950/60 border border-slate-800/50 backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <span className="text-[10px] text-slate-400 font-mono ml-1">PLATAFORMA ATIVA</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-1">Energy Intelligence Protocol v2.0</span>
          </div>

          <div className="flex flex-wrap gap-8 justify-center items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-0.5">ESG PILAR E</span>
              <span className="text-xs text-slate-200 font-bold">Transição Energética</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-0.5">ESG PILAR S</span>
              <span className="text-xs text-slate-200 font-bold">Impacto Regional</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-0.5">ESG PILAR G</span>
              <span className="text-xs text-slate-200 font-bold">Diligência & Dados</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono text-right">
            <span>quarkenergy.com.br</span>
          </div>
        </div>

        {/* Regulatory Disclaimer Warning Box (Mandatory & Rigorous) */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs leading-relaxed text-slate-400">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-300 mb-1">
                Aviso Regulatório e Isenção de Responsabilidade Financeira:
              </p>
              <p>
                Investimentos em ativos reais e empreendimentos de infraestrutura energética envolvem riscos, incluindo risco de mercado, risco hidrológico/solar, de engenharia e regulatórios. Rentabilidade passada ou projetada <strong>não representa garantia de resultados futuros</strong>. As características, riscos, direitos econômicos e condições de cada oportunidade serão apresentados exclusivamente nos documentos específicos do respectivo projeto e estarão sempre sujeitos à estrutura jurídica e regulatória aplicável (incluindo diretrizes da CVM, ANEEL e legislação correlata). A QUARK ENERGY não atua como instituição financeira garantidora nem oferece qualquer modalidade de retorno assegurado ou investimento de risco zero.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} QUARK ENERGY TECNOLOGIA EM ENERGIA S.A. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Energia. Tecnologia. Capital. Impacto.</span>
            <span>•</span>
            <span className="font-mono text-cyan-400/90 font-medium">quarkenergy.com.br</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
