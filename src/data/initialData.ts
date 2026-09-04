import { EnergyProject, QuarkerInvestor, ProjectLead, CmsContent, FaqItem, InvestorPortfolioAsset } from '../types';

export const initialProjects: EnergyProject[] = [
  {
    id: 'proj-001',
    name: 'QUARK SOLAR 001',
    code: 'Q-SOL-001',
    type: 'Solar',
    location: 'Uberaba',
    state: 'MG',
    capacity: '5.0 MWp',
    capacityValue: 5.0,
    estimatedGeneration: '9.850 MWh/ano',
    stage: 'Ready to Build (RTB)',
    status: 'Em Estruturação',
    capex: 'R$ 21.800.000',
    capexValue: 21800000,
    investedAmount: 'R$ 3.200.000',
    targetInvestment: 'R$ 18.600.000',
    implementationProgress: 28,
    quarkScore: 88,
    esgScore: 94,
    codEstimate: '1º Trimestre / 2027',
    gridConnectionStatus: 'Parecer de Acesso (Cemig) Aprovado',
    environmentalStatus: 'Licença de Instalação (LI) Emitida',
    landStatus: 'Arrendamento Registrado em Cartório (25 anos)',
    offtakerType: 'GD Compartilhada / PPA Corporativo',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    description: 'Complexo solar fotovoltaico de 5 MWp concebido para geração distribuída com trackers de eixo único e módulos bifaciais de alta eficiência na bacia de radiação do Triângulo Mineiro.',
    highlightSpecs: [
      { label: 'Irradiação Global', value: '5.62 kWh/m²/dia' },
      { label: 'Performance Ratio', value: '81.4%' },
      { label: 'Ponto de Conexão', value: 'Subestação 13.8 kV Cemig' },
      { label: 'Tecnologia Módulos', value: 'N-Type TOPCon 580W' }
    ],
    documents: [
      { id: 'doc-1', name: 'Parecer de Acesso Cemig D', type: 'Técnico', size: '3.4 MB', uploadDate: '12/04/2026', verified: true },
      { id: 'doc-2', name: 'Licença de Instalação LI FEAM', type: 'Ambiental', size: '2.1 MB', uploadDate: '28/05/2026', verified: true },
      { id: 'doc-3', name: 'Estudo Energético Solar P50/P90', type: 'Técnico', size: '8.7 MB', uploadDate: '03/06/2026', verified: true },
      { id: 'doc-4', name: 'Relatório Preliminar de Diligência Legal', type: 'Jurídico', size: '4.2 MB', uploadDate: '15/07/2026', verified: true }
    ],
    published: true,
    featured: true,
    createdAt: '2026-05-10'
  },
  {
    id: 'proj-002',
    name: 'QUARK HYDRO 002',
    code: 'Q-CGH-002',
    type: 'CGH',
    location: 'Campos Novos',
    state: 'SC',
    capacity: '2.8 MW',
    capacityValue: 2.8,
    estimatedGeneration: '15.400 MWh/ano',
    stage: 'Em Obras',
    status: 'Diligência Concluída',
    capex: 'R$ 29.400.000',
    capexValue: 29400000,
    investedAmount: 'R$ 14.500.000',
    targetInvestment: 'R$ 14.900.000',
    implementationProgress: 52,
    quarkScore: 92,
    esgScore: 91,
    codEstimate: '4º Trimestre / 2026',
    gridConnectionStatus: 'Conexão Celesc Interligada',
    environmentalStatus: 'Licença de Operação em fase de vistoria',
    landStatus: 'Terras Próprias / Desapropriação 100% Finalizada',
    offtakerType: 'Mercado Livre (ACL) - PPA 10 Anos',
    imageUrl: 'https://images.unsplash.com/photo-1574689231351-85ce0d15e292?auto=format&fit=crop&w=1200&q=80',
    description: 'Central Geradora Hidrelétrica a fio d’água de 2.8 MW no Rio Canoas, com baixo impacto de reservatório, fator de capacidade projetado superior a 62% e contrato de longo prazo firmado.',
    highlightSpecs: [
      { label: 'Queda Líquida', value: '34.2 m' },
      { label: 'Vazão Nominal', value: '9.8 m³/s' },
      { label: 'Fator de Capacidade', value: '62.8%' },
      { label: 'Turbinas', value: '2x Francis Horizontais' }
    ],
    documents: [
      { id: 'doc-5', name: 'Outorga ANEEL CGH Canoas', type: 'Jurídico', size: '1.9 MB', uploadDate: '10/01/2026', verified: true },
      { id: 'doc-6', name: 'Laudo Hidrológico Pluviométrico', type: 'Técnico', size: '12.0 MB', uploadDate: '22/02/2026', verified: true },
      { id: 'doc-7', name: 'Contrato PPA Bilateral ACL', type: 'Financeiro', size: '5.5 MB', uploadDate: '11/04/2026', verified: true }
    ],
    published: true,
    featured: true,
    createdAt: '2026-04-18'
  },
  {
    id: 'proj-003',
    name: 'QUARK BESS STORAGE 003',
    code: 'Q-BESS-003',
    type: 'BESS',
    location: 'Sorocaba',
    state: 'SP',
    capacity: '10.0 MWh / 5 MW',
    capacityValue: 5.0,
    estimatedGeneration: 'Arbitragem & Reserva de Potência',
    stage: 'Desenvolvimento',
    status: 'Em Análise Preliminar',
    capex: 'R$ 38.000.000',
    capexValue: 38000000,
    investedAmount: 'R$ 2.400.000',
    targetInvestment: 'R$ 35.600.000',
    implementationProgress: 15,
    quarkScore: 85,
    esgScore: 96,
    codEstimate: '3º Trimestre / 2027',
    gridConnectionStatus: 'Estudo de Integração em trâmite na CPFL',
    environmentalStatus: 'Dispensa de Licenciamento / Regularização Municipal',
    landStatus: 'Galpão Industrial com Contrato BTS 20 Anos',
    offtakerType: 'Arbitragem Horária + Peak Shaving Industrial',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-8b489c652756?auto=format&fit=crop&w=1200&q=80',
    description: 'Sistema de Armazenamento de Energia em Baterias (BESS) de 10 MWh em escala utilitária para estabilização de rede, arbitragem de tarifas de ponta e suporte a polo industrial eletrointensivo.',
    highlightSpecs: [
      { label: 'Química Baterias', value: 'LFP (Lítio Ferro Fosfato)' },
      { label: 'C-Rate', value: '0.5C (2 Horas de Descarga)' },
      { label: 'Ciclos de Vida', value: '> 7.000 ciclos a 80% DoD' },
      { label: 'Eficiência Round-Trip', value: '89.2%' }
    ],
    documents: [
      { id: 'doc-8', name: 'Modelagem de Arbitragem Tarifária', type: 'Financeiro', size: '4.8 MB', uploadDate: '01/06/2026', verified: true },
      { id: 'doc-9', name: 'Especificação Técnica BESS Conteinerizado', type: 'Técnico', size: '7.1 MB', uploadDate: '19/06/2026', verified: true }
    ],
    published: true,
    featured: true,
    createdAt: '2026-06-01'
  },
  {
    id: 'proj-004',
    name: 'QUARK BIOGÁS BIO 004',
    code: 'Q-BIO-004',
    type: 'Biogás',
    location: 'Toledo',
    state: 'PR',
    capacity: '3.2 MW',
    capacityValue: 3.2,
    estimatedGeneration: '21.000 MWh/ano',
    stage: 'Ready to Build (RTB)',
    status: 'Diligência Técnica',
    capex: 'R$ 26.500.000',
    capexValue: 26500000,
    investedAmount: 'R$ 5.800.000',
    targetInvestment: 'R$ 20.700.000',
    implementationProgress: 35,
    quarkScore: 89,
    esgScore: 98,
    codEstimate: '2º Trimestre / 2027',
    gridConnectionStatus: 'Ponto de Acesso Copel 34.5 kV',
    environmentalStatus: 'LP e LI emitidas pelo IAT-PR',
    landStatus: 'Área Consorciada com Cooperativa Agroindustrial',
    offtakerType: 'Biometano Injetável + Energia em GD Local',
    imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1200&q=80',
    description: 'Planta de cogeração energética alimentada por biomassa de efluentes agropecuários na região oeste do Paraná, gerando biometano purificado e eletricidade contínua com crédito de carbono.',
    highlightSpecs: [
      { label: 'Substrato Principal', value: 'Dejetos Suínos e Bovinos' },
      { label: 'Produção Biometano', value: '1.200 Nm³/hora' },
      { label: 'Crédito Descarbonização', value: 'Elegível a CBIOs / RenovaBio' },
      { label: 'Fator de Capacidade', value: '85.0%' }
    ],
    documents: [
      { id: 'doc-10', name: 'Contrato Fornecimento Matéria-Prima 15a', type: 'Jurídico', size: '3.1 MB', uploadDate: '02/05/2026', verified: true },
      { id: 'doc-11', name: 'Estudo de Emissões Evitadas (ESG)', type: 'ESG', size: '2.8 MB', uploadDate: '14/05/2026', verified: true }
    ],
    published: true,
    featured: true,
    createdAt: '2026-05-20'
  },
  {
    id: 'proj-005',
    name: 'QUARK EÓLICA VENTOS DO NORDESTE',
    code: 'Q-EOL-005',
    type: 'Eólica',
    location: 'Caetité',
    state: 'BA',
    capacity: '48.0 MW',
    capacityValue: 48.0,
    estimatedGeneration: '198.000 MWh/ano',
    stage: 'Desenvolvimento',
    status: 'Diligência Técnica',
    capex: 'R$ 215.000.000',
    capexValue: 215000000,
    investedAmount: 'R$ 22.000.000',
    targetInvestment: 'R$ 193.000.000',
    implementationProgress: 20,
    quarkScore: 91,
    esgScore: 97,
    codEstimate: '2º Trimestre / 2028',
    gridConnectionStatus: 'Estudo de Acesso ONS / Chesf em Validação',
    environmentalStatus: 'Licença Prévia (LP) Emitida pelo INEMA',
    landStatus: 'Contrato de Arrendamento Eólico Registrado (30 anos)',
    offtakerType: 'PPA de Longo Prazo (ACL) com Autoprodução',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Parque eólico em polo com regime de vento unidirecional e alto fator de capacidade no semiárido baiano, composto por 8 aerogeradores de 6 MW e subestação elevadora própria.',
    highlightSpecs: [
      { label: 'Velocidade Média Vento', value: '8.7 m/s a 120m' },
      { label: 'Fator de Capacidade', value: '54.5%' },
      { label: 'Aerogeradores', value: '8x 6.0 MW Rotor 164m' },
      { label: 'Ponto de Conexão', value: 'SE Igaporã III 230 kV' }
    ],
    documents: [
      { id: 'doc-12', name: 'Campanha Anemométrica Certificada 3 Anos', type: 'Técnico', size: '14.2 MB', uploadDate: '10/06/2026', verified: true },
      { id: 'doc-13', name: 'Licença Prévia INEMA Bahia', type: 'Ambiental', size: '3.6 MB', uploadDate: '24/06/2026', verified: true }
    ],
    published: true,
    featured: true,
    createdAt: '2026-06-15'
  }
];

export const initialQuarkers: QuarkerInvestor[] = [
  {
    id: 'qrk-01',
    name: 'Carlos Eduardo Silveira',
    email: 'carlos.silveira@agroinvest.com.br',
    phone: '(19) 99124-8833',
    city: 'Campinas',
    state: 'SP',
    investorProfile: 'Qualificado / Profissional',
    investmentRange: 'R$ 250 mil – R$ 1 milhão',
    interests: ['Solar', 'CGH', 'BESS'],
    investmentHorizon: 'Longo prazo (3 a 7 anos)',
    experience: 'Experiente em Ativos Alternativos',
    registeredAt: '2026-06-12',
    status: 'Ativo',
    termsAccepted: true,
    marketingConsent: true,
    walletSimulatedBalance: 250000,
    portfolioCount: 2
  },
  {
    id: 'qrk-02',
    name: 'Mariana Drummond Fontes',
    email: 'm.drummond@consultoriaeco.com.br',
    phone: '(31) 98765-4321',
    city: 'Belo Horizonte',
    state: 'MG',
    investorProfile: 'Moderado',
    investmentRange: 'R$ 50 mil – R$ 250 mil',
    interests: ['Solar', 'Biogás'],
    investmentHorizon: 'Médio prazo (1 a 3 anos)',
    experience: 'Intermediário',
    registeredAt: '2026-07-04',
    status: 'Ativo',
    termsAccepted: true,
    marketingConsent: true,
    walletSimulatedBalance: 75000,
    portfolioCount: 1
  },
  {
    id: 'qrk-03',
    name: 'Roberto Vianna Netto',
    email: 'rvianna@capitalverde.com.br',
    phone: '(41) 99881-2299',
    city: 'Curitiba',
    state: 'PR',
    investorProfile: 'Arrojado',
    investmentRange: 'Acima de R$ 1 milhão',
    interests: ['CGH', 'PCH', 'BESS', 'Híbrido'],
    investmentHorizon: 'Estratégico (+7 anos)',
    experience: 'Experiente em Ativos Alternativos',
    registeredAt: '2026-07-28',
    status: 'Ativo',
    termsAccepted: true,
    marketingConsent: true,
    walletSimulatedBalance: 1200000,
    portfolioCount: 3
  }
];

export const initialLeads: ProjectLead[] = [
  {
    id: 'lead-01',
    projectName: 'UFV Serra Dourada III',
    companyName: 'Solum Renováveis Ltda',
    cnpj: '34.891.022/0001-94',
    contactName: 'Eng. Rodrigo Alencar',
    email: 'rodrigo@solumrenovaveis.com.br',
    phone: '(77) 99182-7364',
    location: 'Bom Jesus da Lapa - BA',
    projectType: 'Solar',
    capacity: '7.5 MWp',
    estimatedGeneration: '14.200 MWh/ano',
    stage: 'Ready to Build (RTB)',
    estimatedCapex: 'R$ 31.000.000',
    investedCapex: 'R$ 4.500.000',
    requiredCapital: 'R$ 26.500.000',
    codForecast: '1º Semestre / 2027',
    gridStatus: 'Parecer Coelba Emitido',
    environmentalStatus: 'LI em vigor',
    landStatus: 'Escritura Pública Registrada',
    ppaContracts: 'Em negociação com Comercializadora',
    availableDocs: 'Memorial descritivo, P50 solarimetria, Parecer de Acesso e Licença Ambiental',
    description: 'Empreendimento solar fotovoltaico de 7.5 MWp em região com mais de 2.150 kWh/m²/ano de índice de radiação global.',
    submittedAt: '2026-08-01',
    crmStatus: 'Em Análise',
    priority: 'Alta'
  },
  {
    id: 'lead-02',
    projectName: 'PCH Salto do Cristal',
    companyName: 'Hidrelétrica Vale das Águas S/A',
    cnpj: '18.234.567/0001-12',
    contactName: 'Fernando Guimarães',
    email: 'fguimaraes@valedasaguas.com.br',
    phone: '(49) 98822-1100',
    location: 'Chapecó - SC',
    projectType: 'PCH',
    capacity: '8.0 MW',
    estimatedGeneration: '42.000 MWh/ano',
    stage: 'Em Obras',
    estimatedCapex: 'R$ 68.000.000',
    investedCapex: 'R$ 32.000.000',
    requiredCapital: 'R$ 36.000.000',
    codForecast: '2º Semestre / 2027',
    gridStatus: 'Subestação seccionadora 69 kV aprovada',
    environmentalStatus: 'LI regularizada no IMA-SC',
    landStatus: 'Desapropriações amigáveis 100% concluídas',
    ppaContracts: 'PPA de 15 anos assinado com indústria de papel',
    availableDocs: 'Projeto básico de engenharia civil, laudo hidrológico 30 anos e contrato de PPA',
    description: 'PCH em fase avançada de escavação e canal adutor, buscando estruturação de capital de giro e tokenização de recebíveis.',
    submittedAt: '2026-08-14',
    crmStatus: 'Qualificado',
    priority: 'Alta'
  },
  {
    id: 'lead-03',
    projectName: 'BESS Delta Grid 5MW',
    companyName: 'GridTech Armazenamento Energético',
    cnpj: '45.109.876/0001-33',
    contactName: 'Dra. Beatriz Toledo',
    email: 'beatriz@gridtech.energy',
    phone: '(11) 97654-3210',
    location: 'Paulínia - SP',
    projectType: 'BESS',
    capacity: '5 MW / 10 MWh',
    estimatedGeneration: 'Armazenamento de 7.300 MWh transferidos/ano',
    stage: 'Desenvolvimento',
    estimatedCapex: 'R$ 36.000.000',
    investedCapex: 'R$ 1.800.000',
    requiredCapital: 'R$ 34.200.000',
    codForecast: '4º Trimestre / 2027',
    gridStatus: 'Consulta de Acesso preliminar protocolada',
    environmentalStatus: 'Em elaboração de EAS',
    landStatus: 'Opção de compra de terreno ao lado da SE CPFL',
    ppaContracts: 'Term Sheet para Peak-Shaving com distribuidora local',
    availableDocs: 'Estudo de caso de arbitragem tarifária e diagrama unifilar conceitual',
    description: 'Bateria industrial de fosfato de ferro-lítio para aliviar congestionamento de alimentador e prestar serviços ancilares de frequência.',
    submittedAt: '2026-08-20',
    crmStatus: 'Novo',
    priority: 'Média'
  }
];

export const initialCmsContent: CmsContent = {
  heroHeadline: 'A nova economia da energia começa aqui.',
  heroSubheadline: 'Conectamos projetos de energia, tecnologia e capital para transformar ativos energéticos em oportunidades para o futuro.',
  heroBadge: 'Infraestrutura Tecnológica para Transição Energética',
  whatIsHeadline: 'Energia real. Ativos reais. Tecnologia para o futuro.',
  whatIsSubtext: 'A QUARK ENERGY cria uma infraestrutura digital de ponta para avaliar, estruturar, acompanhar e potencialmente tokenizar empreendimentos energéticos em todo o Brasil.',
  whyQuarkIntro: 'Um ecossistema fundamentado em engenharia de ponta, dados auditáveis e conformidade regulatória rigorosa.',
  esgHeadline: 'Energia que gera impacto positivo.',
  esgIntro: 'A sustentabilidade não é apenas uma métrica complementar — é a espinha dorsal de todo empreendimento estruturado na QUARK ENERGY.',
  contactEmail: 'contato@quarkenergy.com.br',
  contactPhone: '+55 (11) 3090-4820',
  address: 'Av. Brigadeiro Faria Lima, 3477 - 14º Andar, Itaim Bibi, São Paulo - SP',
  bannerNotice: 'Ambiente de Demonstração Tecnológica — Abertura de captação sujeita a estruturação jurídica e autorizações regulatórias cabíveis.',
  showBannerNotice: true
};

export const initialFaqItems: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Geral',
    question: 'O que é a QUARK ENERGY?',
    answer: 'A QUARK ENERGY é uma plataforma tecnológica especializada na digitalização, estruturação, acompanhamento e potencial tokenização de empreendimentos de geração e armazenamento de energia limpa. Conectamos desenvolvedores de ativos a novas fontes de capital, com total rigor técnico, econômico e ESG.'
  },
  {
    id: 'faq-2',
    category: 'Empreendedores',
    question: 'O que significa QUARKERIZAR um projeto?',
    answer: 'QUARKERIZAR é o processo proprietário da QUARK ENERGY pelo qual um empreendimento de geração ou armazenamento (como solar, CGH, BESS ou biogás) é submetido à nossa esteira de análise técnica, financeira, ambiental e regulatória. Uma vez aprovado, ele é estruturado economicamente e preparado para receber capital ou ter direitos econômicos elegíveis transformados em ativos digitais estruturados.'
  },
  {
    id: 'faq-3',
    category: 'ESG & Tokenização',
    question: 'O que é tokenização no contexto da energia?',
    answer: 'A tokenização é a representação digital em registros criptográficos imutáveis (como a tecnologia blockchain) de direitos econômicos ou frações contratuais lastreados em um ativo de infraestrutura real. Na QUARK, a tokenização só é aplicada quando houver arranjo jurídico, contratual e regulatório plenamente fundamentado na legislação brasileira.'
  },
  {
    id: 'faq-4',
    category: 'ESG & Tokenização',
    question: 'O que é um ativo energético tokenizado?',
    answer: 'É uma unidade digital que espelha direitos patrimoniais ou econômicos vinculados à operação de uma usina ou sistema de armazenamento (por exemplo: receitas de venda de energia em PPA, fluxos de aluguel de equipamentos ou créditos de descarbonização), permitindo rastreabilidade contínua, governança digital e transparência de fluxos.'
  },
  {
    id: 'faq-5',
    category: 'Segurança & Risco',
    question: 'Como funciona o QUARK SCORE?',
    answer: 'O QUARK SCORE é uma metodologia analítica multidimensional que avalia empreendimentos de 0 a 100 através de 10 pilares: maturidade técnica, risco regulatório, risco de implantação/CAPEX, situação ambiental, viabilidade de conexão à rede, qualidade dos contratos (PPA), consistência econômico-financeira, governança, saúde fundiária e aderência ESG. É uma ferramenta informativa e comparativa, nunca uma promessa de retorno.'
  },
  {
    id: 'faq-6',
    category: 'Empreendedores',
    question: 'Como os projetos são avaliados pela equipe técnica?',
    answer: 'Cada empreendimento passa por uma diligência multidisciplinar que inclui auditoria de pareceres de acesso às concessionárias (Cemig, Copel, CPFL, Enel, etc.), outorgas ANEEL, licenças ambientais, regularidade dos títulos de posse ou arrendamento da terra, estudos de irradiação solar ou hidrologia P50/P90 e consistência do modelo de fluxo de caixa descontado.'
  },
  {
    id: 'faq-7',
    category: 'Investidores (QUARKER)',
    question: 'Como posso me cadastrar e investir como QUARKER?',
    answer: 'O primeiro passo é preencher o formulário "QUERO SER UM QUARKER". Assim que novas oportunidades estruturadas e aprovadas pelo nosso comitê forem abertas para rodadas públicas ou privadas (em estrita consonância com a regulação aplicável, como normas CVM pertinentes), você terá acesso às lâminas de informação técnica e poderá participar.'
  },
  {
    id: 'faq-8',
    category: 'Segurança & Risco',
    question: 'Existe risco nos empreendimentos apresentados?',
    answer: 'Sim. Empreendimentos de infraestrutura e energia estão sujeitos a múltiplos riscos, tais como oscilações hidrológicas ou solares, variações de preço no mercado livre (PLD), atrasos de fornecedores de equipamentos, revisões regulatórias setoriais ou inadimplência de compradores de energia. A QUARK ENERGY não elimina riscos, mas os mapeia, mitiga contratualmente e expõe com transparência total.'
  },
  {
    id: 'faq-9',
    category: 'Segurança & Risco',
    question: 'Existe rentabilidade garantida ou lucro fixo?',
    answer: 'Não. Em conformidade com as diretrizes regulatórias e com os valores éticos da QUARK ENERGY, nunca utilizamos promessas de retorno garantido, risco zero ou rentabilidade assegurada. Rentabilidades projetadas são estimativas baseadas em premissas técnicas e cenários econômicos sujeitos a flutuações.'
  },
  {
    id: 'faq-10',
    category: 'Investidores (QUARKER)',
    question: 'Como posso sair de um investimento ou obter liquidez?',
    answer: 'Ativos de infraestrutura energética possuem natureza de médio a longo prazo. A liquidez dependerá da estrutura específica de cada oportunidade, que poderá prever janelas de recompra pelo empreendedor, amortizações programadas de capital ou negociação em ambientes de mercado secundário quando legalmente habilitados. Não há garantia de liquidez imediata.'
  },
  {
    id: 'faq-11',
    category: 'ESG & Tokenização',
    question: 'Como os projetos atendem aos critérios ESG?',
    answer: 'Todos os ativos passam pela auditoria do QUARK ESG SCORE: no pilar Ambiental (E), quantificamos emissões de CO2 evitadas e preservação de APP; no pilar Social (S), avaliamos a geração de emprego local e benefícios comunitários; no pilar Governança (G), exigimos controles contábeis auditados, segregação patrimonial e compliance anticorrupção.'
  },
  {
    id: 'faq-12',
    category: 'Investidores (QUARKER)',
    question: 'Quem pode se cadastrar como QUARKER?',
    answer: 'Qualquer pessoa física maior de idade ou pessoa jurídica interessada em participar da transição energética. Em fases de oferta pública regulada, cada rodada informará os requisitos de investidor (geral, qualificado ou profissional) conforme as regras vigentes do órgão regulador.'
  },
  {
    id: 'faq-13',
    category: 'Segurança & Risco',
    question: 'Como meus dados pessoais e cadastrais são protegidos?',
    answer: 'A QUARK ENERGY cumpre integralmente as diretrizes da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Seus dados são criptografados em trânsito e em repouso, utilizados exclusivamente para os propósitos autorizados por você e nunca comercializados com terceiros.'
  },
  {
    id: 'faq-14',
    category: 'Geral',
    question: 'Qual é o significado do nome e do símbolo da QUARK ENERGY?',
    answer: 'O quark é uma das partículas fundamentais e elementares que compõem toda a matéria no universo. Na nossa analogia: assim como quarks formam a matéria, projetos de energia formam os blocos fundamentais da nova economia descarbonizada. Nosso símbolo traz a letra Q entrelaçada com três partículas orbitais conectadas.'
  }
];

export const initialPortfolioAssets: InvestorPortfolioAsset[] = [
  {
    projectId: 'proj-001',
    projectName: 'QUARK SOLAR 001 - Uberaba (MG)',
    type: 'Solar',
    tokensCount: 500,
    quotaValue: 100,
    totalAllocated: 50000,
    acquisitionDate: '2026-05-18',
    quarkScore: 88,
    esgScore: 94,
    projectStatus: 'Em Obras / Estruturação',
    distributionsReceived: 2150.00,
    nextEstimatedDistribution: '15/10/2026'
  },
  {
    projectId: 'proj-002',
    projectName: 'QUARK HYDRO 002 - Campos Novos (SC)',
    type: 'CGH',
    tokensCount: 750,
    quotaValue: 100,
    totalAllocated: 75000,
    acquisitionDate: '2026-06-02',
    quarkScore: 92,
    esgScore: 91,
    projectStatus: 'Comissionamento Técnico',
    distributionsReceived: 4320.50,
    nextEstimatedDistribution: '05/11/2026'
  }
];
