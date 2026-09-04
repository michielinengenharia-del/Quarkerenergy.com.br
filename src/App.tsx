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

// Landing Page Sections
import { HeroSection } from './components/landing/HeroSection';
import { WhatIsQuark } from './components/landing/WhatIsQuark';
import { QuarkerizeProject } from './components/landing/QuarkerizeProject';
import { QuarkerJourney } from './components/landing/QuarkerJourney';
import { WhyQuark } from './components/landing/WhyQuark';
import { EsgSection } from './components/landing/EsgSection';
import { QuarkScoreSection } from './components/landing/QuarkScoreSection';
import { QuarkValuationSection } from './components/landing/QuarkValuationSection';
import { FeaturedProjects } from './components/landing/FeaturedProjects';
import { SecurityTrustSection } from './components/landing/SecurityTrustSection';
import { FaqSection } from './components/landing/FaqSection';

// Page Views
import { AboutUsView } from './components/about/AboutUsView';
import { InvestorPortal } from './components/portal/InvestorPortal';
import { AdminPanel } from './components/admin/AdminPanel';

// Modals
import { QuarkerizeModal } from './components/modals/QuarkerizeModal';
import { InvestorRegistrationModal } from './components/modals/InvestorRegistrationModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { LgpdModal, LgpdTab } from './components/modals/LgpdModal';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'landing' | 'about' | 'portal' | 'admin'>('landing');

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

    window.addEventListener('quark_storage_updated', handleStorageUpdated);
    return () => {
      window.removeEventListener('quark_storage_updated', handleStorageUpdated);
    };
  }, []);

  // Navigation handler
  const handleNavigateToView = (view: 'landing' | 'about' | 'portal' | 'admin') => {
    setCurrentView(view);
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
      {currentView !== 'portal' && currentView !== 'admin' && (
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
              onExploreProjects={() => handleScrollTo('projetos-destaque')}
              onNavigateToView={handleNavigateToView}
              cms={cms}
            />

            {/* Section 5: O que é a QUARK ENERGY */}
            <WhatIsQuark 
              cms={cms}
              onOpenQuarkerizeModal={() => setIsQuarkerizeOpen(true)}
            />

            {/* Section 6: QUARKERIZE SEU PROJETO (5 Cards) */}
            <QuarkerizeProject 
              onOpenModal={() => setIsQuarkerizeOpen(true)}
            />

            {/* Section 7: COMO FUNCIONA PARA O QUARKER (7-Step Timeline) */}
            <QuarkerJourney 
              onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
              onNavigateToPortal={() => handleNavigateToView('portal')}
            />

            {/* Section 8: POR QUE QUARK? (6 Value Cards) */}
            <WhyQuark />

            {/* Section 9: SEÇÃO ESG & QUARK ESG SCORE */}
            <EsgSection cms={cms} />

            {/* Section 10: QUARK SCORE (0 a 100 & 10 Dimensões) */}
            <QuarkScoreSection />

            {/* Section 11: QUARK VALUATION & Simulador FCD */}
            <QuarkValuationSection />

            {/* Section 12: PROJETOS EM DESTAQUE */}
            <FeaturedProjects 
              projects={projects}
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
            />

            {/* Section 18: SEGURANÇA E CONFIANÇA */}
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
      </main>

      {/* Footer for Standard Views */}
      {currentView !== 'portal' && currentView !== 'admin' && (
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

    </div>
  );
}
