import { EnergyProject, QuarkerInvestor, ProjectLead, CmsContent, FaqItem, InvestorPortfolioAsset } from '../types';
import { 
  initialProjects, 
  initialQuarkers, 
  initialLeads, 
  initialCmsContent, 
  initialFaqItems,
  initialPortfolioAssets 
} from '../data/initialData';

const STORAGE_KEYS = {
  PROJECTS: 'quark_energy_projects_v2',
  QUARKERS: 'quark_energy_quarkers_v1',
  LEADS: 'quark_energy_leads_v1',
  CMS: 'quark_energy_cms_v1',
  FAQS: 'quark_energy_faqs_v1',
  PORTFOLIO: 'quark_energy_portfolio_v1',
  COOKIE_CONSENT: 'quark_energy_cookie_consent_v1',
  AUTH_QUARKER: 'quark_energy_auth_quarker_v1',
  AUTH_ADMIN: 'quark_energy_auth_admin_v1'
};

export const DEFAULT_CREDENTIALS = {
  quarker: {
    email: 'quarker@quarkenergy.com.br',
    password: 'quarker2026',
    name: 'Roberto Silveira Mello'
  },
  admin: {
    email: 'admin@quarkenergy.com.br',
    password: 'admin2026',
    name: 'Administrador Quark Energy'
  }
};

// Dispatch custom event to notify components across the app
function dispatchUpdateEvent(key: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quark_storage_updated', { detail: { key } }));
  }
}

export const StorageService = {
  getProjects(): EnergyProject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
        return initialProjects;
      }
      const parsed: EnergyProject[] = JSON.parse(data);
      // Ensure all initial projects exist and have updated images
      const merged = [...parsed];
      initialProjects.forEach(initP => {
        const idx = merged.findIndex(p => p.id === initP.id);
        if (idx === -1) {
          merged.push(initP);
        } else {
          // Keep current status if modified by admin, but update image & specs if needed
          merged[idx] = {
            ...initP,
            ...merged[idx],
            imageUrl: initP.imageUrl,
            highlightSpecs: initP.highlightSpecs || merged[idx].highlightSpecs,
            description: initP.description || merged[idx].description
          };
        }
      });
      return merged;
    } catch {
      return initialProjects;
    }
  },

  saveProjects(projects: EnergyProject[]) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    dispatchUpdateEvent('projects');
  },

  addProject(project: EnergyProject) {
    const projects = this.getProjects();
    const updated = [project, ...projects];
    this.saveProjects(updated);
    return updated;
  },

  updateProject(id: string, updates: Partial<EnergyProject>) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      this.saveProjects(projects);
    }
    return projects;
  },

  deleteProject(id: string) {
    const projects = this.getProjects().filter(p => p.id !== id);
    this.saveProjects(projects);
    return projects;
  },

  getQuarkers(): QuarkerInvestor[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUARKERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.QUARKERS, JSON.stringify(initialQuarkers));
        return initialQuarkers;
      }
      return JSON.parse(data);
    } catch {
      return initialQuarkers;
    }
  },

  addQuarker(quarker: QuarkerInvestor) {
    const quarkers = this.getQuarkers();
    const updated = [quarker, ...quarkers];
    localStorage.setItem(STORAGE_KEYS.QUARKERS, JSON.stringify(updated));
    dispatchUpdateEvent('quarkers');
    return updated;
  },

  updateQuarkerStatus(id: string, status: QuarkerInvestor['status']) {
    const quarkers = this.getQuarkers();
    const index = quarkers.findIndex(q => q.id === id);
    if (index !== -1) {
      quarkers[index].status = status;
      localStorage.setItem(STORAGE_KEYS.QUARKERS, JSON.stringify(quarkers));
      dispatchUpdateEvent('quarkers');
    }
    return quarkers;
  },

  getLeads(): ProjectLead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(initialLeads));
        return initialLeads;
      }
      return JSON.parse(data);
    } catch {
      return initialLeads;
    }
  },

  addLead(lead: ProjectLead) {
    const leads = this.getLeads();
    const updated = [lead, ...leads];
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));
    dispatchUpdateEvent('leads');
    return updated;
  },

  updateLeadStatus(id: string, crmStatus: ProjectLead['crmStatus'], notes?: string) {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index].crmStatus = crmStatus;
      if (notes !== undefined) leads[index].notes = notes;
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      dispatchUpdateEvent('leads');
    }
    return leads;
  },

  getCmsContent(): CmsContent {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CMS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(initialCmsContent));
        return initialCmsContent;
      }
      return { ...initialCmsContent, ...JSON.parse(data) };
    } catch {
      return initialCmsContent;
    }
  },

  saveCmsContent(content: CmsContent) {
    localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(content));
    dispatchUpdateEvent('cms');
  },

  getFaqs(): FaqItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(initialFaqItems));
        return initialFaqItems;
      }
      return JSON.parse(data);
    } catch {
      return initialFaqItems;
    }
  },

  saveFaqs(faqs: FaqItem[]) {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    dispatchUpdateEvent('faqs');
  },

  getPortfolio(): InvestorPortfolioAsset[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(initialPortfolioAssets));
        return initialPortfolioAssets;
      }
      return JSON.parse(data);
    } catch {
      return initialPortfolioAssets;
    }
  },

  getCookieConsent(): { accepted: boolean; date: string } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCookieConsent(accepted: boolean) {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, JSON.stringify({
      accepted,
      date: new Date().toISOString()
    }));
  },

  getQuarkerAuth(): { isAuthenticated: boolean; email: string; name: string } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH_QUARKER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setQuarkerAuth(email: string, name: string) {
    localStorage.setItem(STORAGE_KEYS.AUTH_QUARKER, JSON.stringify({
      isAuthenticated: true,
      email,
      name,
      authenticatedAt: new Date().toISOString()
    }));
    dispatchUpdateEvent('auth_quarker');
  },

  clearQuarkerAuth() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_QUARKER);
    dispatchUpdateEvent('auth_quarker');
  },

  getAdminAuth(): { isAuthenticated: boolean; email: string } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH_ADMIN);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setAdminAuth(email: string) {
    localStorage.setItem(STORAGE_KEYS.AUTH_ADMIN, JSON.stringify({
      isAuthenticated: true,
      email,
      authenticatedAt: new Date().toISOString()
    }));
    dispatchUpdateEvent('auth_admin');
  },

  clearAdminAuth() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_ADMIN);
    dispatchUpdateEvent('auth_admin');
  },

  resetToDefault() {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    localStorage.setItem(STORAGE_KEYS.QUARKERS, JSON.stringify(initialQuarkers));
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(initialLeads));
    localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(initialCmsContent));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(initialFaqItems));
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(initialPortfolioAssets));
    dispatchUpdateEvent('all');
  }
};
