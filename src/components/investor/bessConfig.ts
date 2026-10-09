/**
 * Configuração dos parâmetros do BESS e do Simulador de Investimento.
 * Estrutura preparada para fácil personalização pela equipe da Quark Energy.
 */

export interface BessConfigType {
  // Parâmetros oficiais configuráveis pela equipe Quark
  rentabilidade_projetada: number | null; // ex: null (quando em pré-cadastro) ou 16.5 (% a.a.)
  prazo: string; // ex: "60 meses"
  valor_cota: number; // Valor base por cota (ex: R$ 500)
  quantidade_cotas_total: number; // Volume total de cotas emitidas do projeto
  taxas: string; // Estrutura de taxas
  valor_minimo: number; // Valor mínimo de entrada (R$ 500)
  periodicidade_pagamento: string; // Periodicidade das distribuições
  habilitar_projecao_estimada: boolean; // Se false, exibe "Simulação disponível após cadastro"
  
  // Dados do ativo BESS âncora
  assetName: string;
  assetLocation: string;
  nominalCapacity: string; // ex: "10 MWh / 5 MW"
  batteryTechnology: string; // ex: "LFP (Lítio Ferro Fosfato)"
  targetCOD: string; // ex: "2027"
}

export const DEFAULT_BESS_CONFIG: BessConfigType = {
  // Para transparência e conformidade regulatória, projeções numéricas específicas 
  // ficam protegidas até o cadastro ou quando os parâmetros definitivos da oferta forem abertos
  rentabilidade_projetada: null, 
  prazo: '60 a 84 meses (conforme ciclo operacional)',
  valor_cota: 500, // R$ 500 por cota
  quantidade_cotas_total: 20000,
  taxas: 'Taxa de gestão e operação inclusas na estrutura do ativo',
  valor_minimo: 500,
  periodicidade_pagamento: 'Semestral (conforme fluxo de caixa operacional)',
  habilitar_projecao_estimada: false, // Pode ser alterado para true pela equipe quando oficializado

  assetName: 'QUARK BESS STORAGE 003',
  assetLocation: 'Sorocaba, SP — Polo Industrial Eletrointensivo',
  nominalCapacity: '10.0 MWh / 5.0 MW',
  batteryTechnology: 'LFP (Lítio Ferro Fosfato — Tier 1)',
  targetCOD: 'Previsão COD: 3º Tri / 2027'
};
