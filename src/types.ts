export type ProjectType = 
  | 'Solar'
  | 'CGH'
  | 'PCH'
  | 'BESS'
  | 'Eólica'
  | 'Biomassa'
  | 'Biogás'
  | 'Autoprodução'
  | 'Híbrido'
  | 'Eficiência Energética'
  | 'Outros';

export type ProjectStage = 
  | 'Greenfield'
  | 'Desenvolvimento'
  | 'Ready to Build (RTB)'
  | 'Em Obras'
  | 'Operacional';

export type ProjectStatus = 
  | 'Em Análise Preliminar'
  | 'Diligência Técnica'
  | 'Em Estruturação'
  | 'Diligência Concluída'
  | 'Ativo Disponível'
  | 'Operacional'
  | 'Arquivado';

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'Técnico' | 'Jurídico' | 'Ambiental' | 'Financeiro' | 'ESG';
  size: string;
  uploadDate: string;
  verified: boolean;
}

export interface EnergyProject {
  id: string;
  name: string;
  code: string;
  type: ProjectType;
  location: string;
  state: string;
  capacity: string; // e.g. "5.0 MW" or "10.0 MWh"
  capacityValue: number; // in MW
  estimatedGeneration: string; // e.g. "9.800 MWh/ano"
  stage: ProjectStage;
  status: ProjectStatus;
  capex: string; // e.g. "R$ 22.500.000"
  capexValue: number;
  investedAmount: string;
  targetInvestment: string;
  implementationProgress: number; // 0 to 100
  quarkScore: number; // 0 to 100
  esgScore: number; // 0 to 100
  codEstimate: string; // Previsão COD
  gridConnectionStatus: string;
  environmentalStatus: string;
  landStatus: string;
  offtakerType: string; // e.g. "Mercado Livre (ACL)", "GD Compartilhada", "Autoprodução"
  imageUrl: string;
  description: string;
  highlightSpecs: { label: string; value: string }[];
  documents: ProjectDocument[];
  published: boolean;
  featured: boolean;
  createdAt: string;
}

export interface QuarkerInvestor {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  investorProfile: 'Conservador' | 'Moderado' | 'Arrojado' | 'Qualificado / Profissional';
  investmentRange: 
    | 'Até R$ 10 mil'
    | 'R$ 10 mil – R$ 50 mil'
    | 'R$ 50 mil – R$ 250 mil'
    | 'R$ 250 mil – R$ 1 milhão'
    | 'Acima de R$ 1 milhão';
  interests: ProjectType[];
  investmentHorizon: 'Curto prazo (até 1 ano)' | 'Médio prazo (1 a 3 anos)' | 'Longo prazo (3 a 7 anos)' | 'Estratégico (+7 anos)';
  experience: 'Iniciante' | 'Intermediário' | 'Experiente em Ativos Alternativos';
  registeredAt: string;
  status: 'Ativo' | 'Em Validação' | 'Contato Pendente';
  termsAccepted: boolean;
  marketingConsent: boolean;
  walletSimulatedBalance?: number;
  portfolioCount?: number;
}

export interface ProjectLead {
  id: string;
  projectName: string;
  companyName: string;
  cnpj: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  projectType: ProjectType;
  capacity: string;
  estimatedGeneration: string;
  stage: ProjectStage;
  estimatedCapex: string;
  investedCapex: string;
  requiredCapital: string;
  codForecast: string;
  gridStatus: string;
  environmentalStatus: string;
  landStatus: string;
  ppaContracts: string;
  availableDocs: string;
  description: string;
  submittedAt: string;
  crmStatus: 'Novo' | 'Contatado' | 'Qualificado' | 'Em Análise' | 'Convertido';
  priority: 'Alta' | 'Média' | 'Normal';
  notes?: string;
}

export interface CmsContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  whatIsHeadline: string;
  whatIsSubtext: string;
  whyQuarkIntro: string;
  esgHeadline: string;
  esgIntro: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  bannerNotice: string;
  showBannerNotice: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Geral' | 'Empreendedores' | 'Investidores (QUARKER)' | 'Segurança & Risco' | 'ESG & Tokenização';
}

export interface InvestorPortfolioAsset {
  projectId: string;
  projectName: string;
  type: ProjectType;
  tokensCount: number;
  quotaValue: number;
  totalAllocated: number;
  acquisitionDate: string;
  quarkScore: number;
  esgScore: number;
  projectStatus: string;
  distributionsReceived: number;
  nextEstimatedDistribution: string;
}
