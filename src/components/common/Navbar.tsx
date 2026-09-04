import React, { useState, useEffect } from 'react';
import { QuarkLogo } from './Logo';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Lock, 
  UserCheck, 
  Sparkles, 
  Sliders, 
  FileText,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  onOpenQuarkerizeModal?: () => void;
  onOpenInvestorModal?: () => void;
  onNavigateToView?: (view: 'landing' | 'about' | 'portal' | 'admin') => void;
  currentView?: 'landing' | 'about' | 'portal' | 'admin' | string;
  // Backward compatibility props
  onNavigate?: (view: any) => void;
  onOpenQuarkerize?: () => void;
  onOpenQuarkerInvestor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuarkerizeModal,
  onOpenInvestorModal,
  onNavigateToView,
  currentView = 'landing',
  onNavigate,
  onOpenQuarkerize,
  onOpenQuarkerInvestor
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    } else if (typeof onOpenQuarkerInvestor === 'function') {
      onOpenQuarkerInvestor();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing' && currentView !== 'home') {
      navigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/70 backdrop-blur-md border-b border-slate-800/50 py-3 shadow-xl shadow-black/40' 
          : 'bg-slate-950/40 backdrop-blur-md border-b border-slate-800/30 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => navigate('landing')} 
            className="cursor-pointer group flex items-center"
            id="brand-logo-button"
          >
            <QuarkLogo size="md" showDomain={true} />
          </div>

          {/* Desktop Navigation Links with Immersive UI typography */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-widest text-slate-400">
            <button 
              onClick={() => handleNavClick('o-que-e')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              A QUARK
            </button>
            <button 
              onClick={() => handleNavClick('como-funciona-quarker')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Para Investidores
            </button>
            <button 
              onClick={() => handleNavClick('quarkerize-secao')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Para Empreendedores
            </button>
            <button 
              onClick={() => handleNavClick('projetos-destaque')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              Projetos
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-dot-emerald animate-pulse"></span>
            </button>
            <button 
              onClick={() => handleNavClick('secao-esg')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ESG
            </button>
            <button 
              onClick={() => handleNavClick('quark-score-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              QUARK SCORE
            </button>
            <button 
              onClick={() => navigate('about')}
              className={`hover:text-white transition-colors cursor-pointer ${
                currentView === 'about' ? 'text-emerald-400 font-semibold' : ''
              }`}
            >
              Sobre Nós
            </button>
            <button 
              onClick={() => handleNavClick('faq-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Direct Investor Portal Shortcut */}
            <button
              id="nav-investor-portal-btn"
              onClick={() => navigate('portal')}
              className={`px-5 py-2 border border-slate-700 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'portal'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-neon-blue'
                  : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>ÁREA DO QUARKER</span>
            </button>

            {/* Admin CMS Access */}
            <button
              id="nav-admin-cms-btn"
              onClick={() => navigate('admin')}
              className={`px-3.5 py-2 border border-slate-700 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Acessar Painel Administrativo CMS"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>CMS</span>
            </button>

            {/* Primary Action Button */}
            <button
              id="nav-cta-quarkerize"
              onClick={handleOpenQuarkerize}
              className="px-6 py-2 bg-emerald-500 text-slate-950 rounded-full text-xs font-bold hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>QUARKERIZE</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/60 text-slate-200 hover:text-white border border-slate-700"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1122] border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button 
              onClick={() => handleNavClick('o-que-e')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              O que é a QUARK
            </button>
            <button 
              onClick={() => handleNavClick('como-funciona-quarker')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              Para Investidores (QUARKER)
            </button>
            <button 
              onClick={() => handleNavClick('quarkerize-secao')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              Para Empreendedores
            </button>
            <button 
              onClick={() => handleNavClick('projetos-destaque')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              Projetos em Destaque
            </button>
            <button 
              onClick={() => handleNavClick('secao-esg')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              Critérios ESG & Score
            </button>
            <button 
              onClick={() => handleNavClick('quark-score-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              QUARK SCORE & Valuation
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('about'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              Sobre a QUARK ENERGY
            </button>
            <button 
              onClick={() => handleNavClick('faq-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              Perguntas Frequentes (FAQ)
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('portal'); }}
              className="w-full py-2.5 px-3 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              Área do QUARKER (Dashboard)
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('admin'); }}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              CMS Admin (Painel de Gestão)
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleOpenQuarkerize(); }}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm text-center shadow-lg shadow-emerald-500/20"
            >
              QUARKERIZE SEU PROJETO
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleOpenInvestor(); }}
              className="w-full py-2.5 px-4 rounded-lg border border-emerald-500/40 text-emerald-300 font-semibold text-sm text-center hover:bg-emerald-500/10"
            >
              QUERO SER UM QUARKER
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
