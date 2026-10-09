import React, { useState, useEffect, useRef } from 'react';
import { QuarkLogo } from './Logo';
import { 
  Menu, 
  X, 
  ChevronDown,
  TrendingUp,
  Briefcase
} from 'lucide-react';

interface NavbarProps {
  onOpenQuarkerizeModal?: () => void;
  onOpenInvestorModal?: () => void;
  onNavigateToView?: (view: 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess') => void;
  currentView?: 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess' | string;
  // Backward compatibility props
  onNavigate?: (view: any) => void;
  onOpenQuarkerize?: () => void;
  onOpenQuarkerInvestor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToView,
  currentView = 'landing',
  onNavigate
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [opportunitiesOpen, setOpportunitiesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = (view: 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess') => {
    setMobileMenuOpen(false);
    setOpportunitiesOpen(false);
    if (typeof onNavigateToView === 'function') {
      onNavigateToView(view);
    } else if (typeof onNavigate === 'function') {
      onNavigate(view === 'landing' ? 'home' : view);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpportunitiesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setOpportunitiesOpen(false);
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
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60 py-3.5 shadow-xl shadow-black/40' 
          : 'bg-slate-950/60 backdrop-blur-md border-b border-slate-800/30 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => navigate('landing')} 
            className="cursor-pointer group flex items-center shrink-0"
            id="brand-logo-button"
          >
            <QuarkLogo size="md" showDomain={true} />
          </div>

          {/* Desktop Navigation Links in Requested Order:
              1. Oportunidades (submenus: Para Investidores | Para Empreendedores)
              2. Investidor Bess
              3. Comprar Bess
              4. Recursos Para Seu Ativo
              5. Sobre Nós
              6. FAQ
          */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-widest text-slate-300">
            
            {/* 1. Oportunidades (Dropdown) */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setOpportunitiesOpen(true)}
              onMouseLeave={() => setOpportunitiesOpen(false)}
            >
              <button 
                onClick={() => setOpportunitiesOpen(!opportunitiesOpen)}
                className={`hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                  opportunitiesOpen ? 'text-emerald-400' : ''
                }`}
                aria-expanded={opportunitiesOpen}
              >
                <span>OPORTUNIDADES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${opportunitiesOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {opportunitiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-[#090f1e]/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 z-50">
                  <button
                    onClick={() => handleNavClick('como-funciona-quarker')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition-all group flex items-start gap-3 cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 normal-case tracking-normal">
                        Para Investidores
                      </div>
                      <div className="text-[11px] text-slate-400 normal-case tracking-normal mt-0.5 leading-snug">
                        Participe de ativos energéticos e cotas BESS
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('quarkerize-secao')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition-all group flex items-start gap-3 cursor-pointer mt-1"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300 normal-case tracking-normal">
                        Para Empreendedores
                      </div>
                      <div className="text-[11px] text-slate-400 normal-case tracking-normal mt-0.5 leading-snug">
                        Estruture seu ativo e conecte novas fontes de capital
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Investidor Bess */}
            <button 
              onClick={() => navigate('investor')}
              className={`hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'investor' ? 'text-cyan-400 font-bold' : ''
              }`}
            >
              <span>INVESTIDOR BESS</span>
            </button>

            {/* 4. Comprar Bess */}
            <button 
              onClick={() => navigate('bess')}
              className={`hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'bess' ? 'text-cyan-400 font-bold' : ''
              }`}
            >
              <span>COMPRAR BESS</span>
            </button>

            {/* 5. Recursos Para Seu Ativo (em verde) */}
            <button 
              onClick={() => navigate('seuativo')}
              className={`hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 text-emerald-400 font-bold ${
                currentView === 'seuativo' ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : ''
              }`}
            >
              <span>RECURSOS PARA SEU ATIVO</span>
            </button>

            {/* 6. Sobre Nós */}
            <button 
              onClick={() => navigate('about')}
              className={`hover:text-emerald-400 transition-colors cursor-pointer ${
                currentView === 'about' ? 'text-emerald-400 font-bold' : ''
              }`}
            >
              SOBRE NÓS
            </button>

            {/* 7. FAQ */}
            <button 
              onClick={() => handleNavClick('faq-section')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              FAQ
            </button>

          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/60 text-slate-200 hover:text-white border border-slate-700 cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu in Exact Requested Order */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1122] border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-2 shadow-2xl animate-in slide-in-from-top-3">
          <div className="flex flex-col space-y-1 text-sm font-medium">
            
            {/* 1. Oportunidades & Submenus */}
            <div className="py-2 px-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1.5 my-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Oportunidades
              </span>
              <button 
                onClick={() => handleNavClick('como-funciona-quarker')}
                className="w-full text-left py-2 px-2.5 rounded-md hover:bg-slate-800 text-cyan-300 font-medium flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Para Investidores</span>
              </button>
              <button 
                onClick={() => handleNavClick('quarkerize-secao')}
                className="w-full text-left py-2 px-2.5 rounded-md hover:bg-slate-800 text-emerald-300 font-medium flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Para Empreendedores</span>
              </button>
            </div>

            {/* 3. Investidor Bess */}
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('investor'); }}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-cyan-950/40 text-cyan-300 font-semibold flex items-center justify-between"
            >
              <span>Investidor Bess</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">/investidor</span>
            </button>

            {/* 4. Comprar Bess */}
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('bess'); }}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200 flex items-center justify-between"
            >
              <span>Comprar Bess</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">/bess</span>
            </button>

            {/* 5. Recursos Para Seu Ativo */}
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('seuativo'); }}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-emerald-950/40 text-emerald-400 font-bold flex items-center justify-between"
            >
              <span>Recursos Para Seu Ativo</span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">/seuativo</span>
            </button>

            {/* 6. Sobre Nós */}
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('about'); }}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              Sobre Nós
            </button>

            {/* 7. FAQ */}
            <button 
              onClick={() => handleNavClick('faq-section')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-800/60 text-slate-200"
            >
              FAQ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
