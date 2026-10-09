/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import { EnergyProject, ProjectLead, QuarkerInvestor, CmsContent } from './types';
import { initialFaqItems } from './data/initialData';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CookieBanner } from './components/common/CookieBanner';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Landing Page Sections
import { HeroSection } from './components/landing/HeroSection';
import { WhatIsQuark } from './components/landing/WhatIsQuark';
import { QuarkerizeProject } from './components/landing/QuarkerizeProject';
import { QuarkerJourney } from './components/landing/QuarkerJourney';
import { WhyQuark } from './components/landing/WhyQuark';
import { SecurityTrustSection } from './components/landing/SecurityTrustSection';
import { FaqSection } from './components/landing/FaqSection';
import { MenuDirectorySection } from './components/landing/MenuDirectorySection';

// Page Views
import { AboutUsView } from './components/about/AboutUsView';
import { InvestorPortal } from './components/portal/InvestorPortal';
import { AdminPanel } from './components/admin/AdminPanel';
import { InvestorLandingPage } from './components/investor/InvestorLandingPage';
import { SeuAtivoPage } from './components/seuativo/SeuAtivoPage';
import { BessSalesPage } from './components/bess/BessSalesPage';

// Modals
import { QuarkerizeModal } from './components/modals/QuarkerizeModal';
import { InvestorRegistrationModal } from './components/modals/InvestorRegistrationModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { LgpdModal, LgpdTab } from './components/modals/LgpdModal';

export type ViewType = 'landing' | 'about' | 'portal' | 'admin' | 'investor' | 'seuativo' | 'bess';

export default function App() {
  // Navigation View State initialized by URL path
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/bess') || hash === '#bess') return 'bess';
      if (path.startsWith('/seuativo') || hash === '#seuativo') return 'seuativo';
      if (path.startsWith('/investidor') || hash === '#investidor') return 'investor';
      if (path.startsWith('/sobre') || hash === '#sobre') return 'about';
      if (path.startsWith('/portal') || hash === '#portal') return 'portal';
      if (path.startsWith('/admin') || hash === '#admin') return 'admin';
    }
    return 'landing';
  });

  // Modal States
  const [isQuarkerizeOpen, setIsQuarkerizeOpen] = useState(false);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<EnergyProject | null>(null);
  const [isLgpdOpen, setIsLgpdOpen] = useState(false);
  const [lgpdTab, setLgpdTab] = useState<LgpdTab>('terms');

  // App Data (Synchronized via StorageService)
  const [projects, setProjects] = useState<EnergyProject[]>([]);
  const [leads, setLeads] = useState<ProjectLead[]>([]);
  const [quarkers, setQuarkers] = useState<QuarkerInvestor[]>([]);
  const [cms, setCms] = useState<CmsContent>(StorageService.getCmsContent());

  // Load and subscribe to storage changes
  const reloadData = () => {
    setProjects(StorageService.getProjects());
    setLeads(StorageService.getLeads());
    setQuarkers(StorageService.getQuarkers());
    setCms(StorageService.getCmsContent());
  };

  useEffect(() => {
    reloadData();

    const handleStorageUpdated = () => {
      reloadData();
    };

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/bess') || hash === '#bess') {
        setCurrentView('bess');
        document.title = 'BESS | Armazenamento de Energia | Quark Energy';
      } else if (path.startsWith('/seuativo') || hash === '#seuativo') {
        setCurrentView('seuativo');
        document.title = 'Quark Energy | Quarkerize seu ativo energético';
      } else if (path.startsWith('/investidor') || hash === '#investidor') {
        setCurrentView('investor');
        document.title = 'Investidor BESS | Torne-se um Quarker | QUARK ENERGY';
      } else if (path.startsWith('/sobre')) {
        setCurrentView('about');
        document.title = 'Sobre Nós | QUARK ENERGY';
      } else if (path.startsWith('/portal')) {
        setCurrentView('portal');
        document.title = 'Área do Quarker | QUARK ENERGY';
      } else if (path.startsWith('/admin')) {
        setCurrentView('admin');
        document.title = 'Painel CMS | QUARK ENERGY';
      } else {
        setCurrentView('landing');
        document.title = 'QUARK ENERGY | A nova infraestrutura digital da economia energética';
      }
    };

    window.addEventListener('quark_storage_updated', handleStorageUpdated);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('quark_storage_updated', handleStorageUpdated);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Navigation handler with URL sync
  const handleNavigateToView = (view: ViewType) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      if (view === 'bess') {
        if (window.location.pathname !== '/bess') {
          window.history.pushState({ view: 'bess' }, '', '/bess');
        }
        document.title = 'BESS | Armazenamento de Energia | Quark Energy';
      } else if (view === 'seuativo') {
        if (window.location.pathname !== '/seuativo') {
          window.history.pushState({ view: 'seuativo' }, '', '/seuativo');
        }
        document.title = 'Quark Energy | Quarkerize seu ativo energético';
      } else if (view === 'investor') {
        if (window.location.pathname !== '/investidor') {
          window.history.pushState({ view: 'investor' }, '', '/investidor');
        }
        document.title = 'Investidor BESS | Torne-se um Quarker | QUARK ENERGY';
      } else if (view === 'about') {
        if (window.location.pathname !== '/sobre') {
          window.history.pushState({ view: 'about' }, '', '/sobre');
        }
        document.title = 'Sobre Nós | QUARK ENERGY';
      } else if (view === 'portal') {
        if (window.location.pathname !== '/portal') {
          window.history.pushState({ view: 'portal' }, '', '/portal');
        }
        document.title = 'Área do Quarker | QUARK ENERGY';
      } else if (view === 'admin') {
        if (window.location.pathname !== '/admin') {
          window.history.pushState({ view: 'admin' }, '', '/admin');
        }
        document.title = 'Painel CMS | QUARK ENERGY';
      } else {
        if (window.location.pathname !== '/') {
          window.history.pushState({ view: 'landing' }, '', '/');
        }
        document.title = 'QUARK ENERGY | A nova infraestrutura digital da economia energética';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Immersive UI Ambient Light Orbs */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600 rounded-full blur-[150px]" />
      </div>
      
      {/* Conditionally render Navbar for standard views */}
      {currentView !== 'portal' && currentView !== 'admin' && currentView !== 'bess' && (
        <Navbar 
          currentView={currentView}
          onNavigateToView={handleNavigateToView}
          onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
          onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            {/* Section 1 & 4: Hero with interactive particle background */}
            <HeroSection 
              onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
              onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
              onNavigateToView={handleNavigateToView}
              cms={cms}
            />

            {/* Section 5: O que é a QUARK ENERGY */}
            <WhatIsQuark 
              cms={cms}
              onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
              onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
            />

            {/* Section 6: QUARKERIZE SEU PROJETO (5 Cards) */}
            <QuarkerizeProject 
              onOpenModal={() => setIsQuarkerizeOpen(true)}
              onNavigateToSeuAtivo={() => handleNavigateToView('seuativo')}
            />

            {/* Section 7: COMO FUNCIONA PARA O QUARKER (7-Step Timeline) */}
            <QuarkerJourney 
              onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
              onNavigateToPortal={() => handleNavigateToView('portal')}
              onNavigateToBessInvestor={() => handleNavigateToView('investor')}
            />

            {/* Section 8: POR QUE QUARK? (6 Value Cards) */}
            <WhyQuark />

            {/* Guia de Menus: Chamadas Simples, Diretas e Persuasivas com Botões */}
            <MenuDirectorySection 
              onNavigateToView={handleNavigateToView}
              onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
              onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
            />

            {/* Section: SEGURANÇA E CONFIANÇA */}
            <SecurityTrustSection />

            {/* Section 17: FAQ (14 Perguntas Estruturadas) */}
            <FaqSection 
              faqs={initialFaqItems}
              onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
              onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
            />
          </>
        )}

        {/* Section 13: Sobre Nós */}
        {currentView === 'about' && (
          <AboutUsView 
            onBackToHome={() => handleNavigateToView('landing')}
            onNavigateToView={handleNavigateToView}
            onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
            onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
          />
        )}

        {/* Section 14: Área do Investidor (QUARKER) */}
        {currentView === 'portal' && (
          <InvestorPortal 
            projects={projects}
            onBackToHome={() => handleNavigateToView('landing')}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenRegisterModal={() => setIsInvestorModalOpen(true)}
          />
        )}

        {/* Section 15: Painel Administrativo / CMS Interno */}
        {currentView === 'admin' && (
          <AdminPanel 
            projects={projects}
            leads={leads}
            quarkers={quarkers}
            cms={cms}
            onBackToHome={() => handleNavigateToView('landing')}
          />
        )}

        {/* Section Nova: Landing Page de Alta Conversão BESS - /investidor */}
        {currentView === 'investor' && (
          <InvestorLandingPage
            onBackToHome={() => handleNavigateToView('landing')}
            onOpenQuarkerPortal={() => handleNavigateToView('portal')}
            onOpenLgpdModal={(tab) => {
              setLgpdTab(tab);
              setIsLgpdOpen(true);
            }}
          />
        )}

        {/* Section Nova: Quarkerize Seu Ativo - /seuativo */}
        {currentView === 'seuativo' && (
          <SeuAtivoPage
            onBackToHome={() => handleNavigateToView('landing')}
            onOpenPortal={() => handleNavigateToView('portal')}
            onOpenLgpdModal={(tab) => {
              setLgpdTab(tab);
              setIsLgpdOpen(true);
            }}
          />
        )}

        {/* Section Nova: Venda de Sistemas BESS - /bess */}
        {currentView === 'bess' && (
          <BessSalesPage
            onBackToHome={() => handleNavigateToView('landing')}
          />
        )}
      </main>

      {/* Footer for Standard Views */}
      {currentView !== 'portal' && currentView !== 'admin' && currentView !== 'bess' && (
        <Footer 
          onNavigateToView={handleNavigateToView}
          onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
          onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
          onOpenLgpdModal={(tab) => {
            setLgpdTab(tab);
            setIsLgpdOpen(true);
          }}
        />
      )}

      {/* Global Modals */}
      <QuarkerizeModal 
        isOpen={isQuarkerizeOpen}
        onClose={() => setIsQuarkerizeOpen(false)}
      />

      <InvestorRegistrationModal 
        isOpen={isInvestorModalOpen}
        onClose={() => setIsInvestorModalOpen(false)}
        onSuccessOpenPortal={() => handleNavigateToView('portal')}
      />

      <ProjectDetailModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenInvestorModal={() => {
          setSelectedProject(null);
          setIsInvestorModalOpen(true);
        }}
      />

      {/* LGPD Cookie Consent Banner */}
      <CookieBanner 
        onOpenPreferences={() => {
          setLgpdTab('cookies');
          setIsLgpdOpen(true);
        }}
      />

      {/* LGPD and Legal Governance Modal */}
      <LgpdModal 
        isOpen={isLgpdOpen}
        activeTab={lgpdTab}
        onClose={() => setIsLgpdOpen(false)}
        onTabChange={(tab) => setLgpdTab(tab)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

    </div>
  );
}
