import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Layers, 
  Database, 
  LineChart, 
  Coins, 
  Cpu, 
  CheckCircle2, 
  Sliders,
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const QuarkValuationSection: React.FC = () => {
  // Interactive Simulator State
  const [capacityMW, setCapacityMW] = useState<number>(5.0);
  const [ppaPrice, setPpaPrice] = useState<number>(280); // R$/MWh
  const [capacityFactor, setCapacityFactor] = useState<number>(24); // % solar avg
  const [capexPerMW, setCapexPerMW] = useState<number>(4.2); // R$ milhões / MW
  const [assetLifeYears, setAssetLifeYears] = useState<number>(25);

  // Model Calculations
  const totalCapex = capacityMW * capexPerMW; // in millions
  const annualGenerationMWh = capacityMW * 8760 * (capacityFactor / 100);
  const grossAnnualRevenue = (annualGenerationMWh * ppaPrice) / 1000000; // in millions
  const estimatedOpex = totalCapex * 0.02; // 2% per year
  const netAnnualCashFlow = grossAnnualRevenue - estimatedOpex;
  const simplePaybackYears = totalCapex / (netAnnualCashFlow > 0 ? netAnnualCashFlow : 1);
  const estimatedValuationNPV = netAnnualCashFlow * 8.2; // Discounted simplified factor

  const steps = [
    { label: 'PROJETO', icon: Layers, desc: 'Identificação dos ativos físicos e parâmetros de outorga' },
    { label: 'DADOS', icon: Database, desc: 'Coleta de dados solares/hídricos, contratos e CAPEX auditado' },
    { label: 'MODELO', icon: LineChart, desc: 'Fluxo de caixa descontado (FCD) e sensibilidade de PLD' },
    { label: 'VALUATION', icon: Calculator, desc: 'Avaliação técnica e cálculo do valor justo do empreendimento' },
    { label: 'ATIVO DIGITAL', icon: Cpu, desc: 'Fracionamento em cotas econômicas com lastro e liquidez' }
  ];

  return (
    <section className="py-24 bg-[#070e1e] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Inteligência Financeira de Engenharia
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Quanto vale um empreendimento energético?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            A plataforma QUARK ENERGY utiliza modelagem quantitativa avançada considerando CAPEX, OPEX, geração P50/P90, contratos de longo prazo, vida útil dos equipamentos e critérios ESG.
          </p>
        </div>

        {/* Visual Flow: PROJETO → DADOS → MODELO → VALUATION → ATIVO DIGITAL */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex-1 w-full p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center text-center">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mb-2 border border-cyan-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-white font-mono tracking-wider">
                      {step.label}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 max-w-[180px] leading-tight">
                      {step.desc}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex items-center text-slate-600">
                      <ArrowRight className="w-4 h-4 text-emerald-400/70" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Interactive Valuation Simulator */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Simulador de Modelagem Econômico-Energética
                </h3>
                <p className="text-xs text-slate-400">
                  Ajuste os parâmetros fundamentais para projetar o valor de referência do ativo
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Modelo FCD Demonstrativo
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Controls Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Potência */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Potência Instalada (MWp / MW):</span>
                  <span className="text-emerald-400 font-mono font-bold">{capacityMW.toFixed(1)} MW</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="30"
                  step="0.5"
                  value={capacityMW}
                  onChange={(e) => setCapacityMW(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0.5 MW (GD Mini)</span>
                  <span>15 MW</span>
                  <span>30 MW (Escala Utilitária)</span>
                </div>
              </div>

              {/* Slider 2: Preço Médio da Energia (PPA) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Preço Médio da Energia em PPA:</span>
                  <span className="text-cyan-400 font-mono font-bold">R$ {ppaPrice} / MWh</span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="420"
                  step="10"
                  value={ppaPrice}
                  onChange={(e) => setPpaPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>R$ 160 (Mercado Livre Spot)</span>
                  <span>R$ 280 (PPA Bilateral Médio)</span>
                  <span>R$ 420 (GD Varejo)</span>
                </div>
              </div>

              {/* Slider 3: Fator de Capacidade */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Fator de Capacidade Médio Anual:</span>
                  <span className="text-blue-400 font-mono font-bold">{capacityFactor}%</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="70"
                  step="1"
                  value={capacityFactor}
                  onChange={(e) => setCapacityFactor(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>22% (Solar Fixo)</span>
                  <span>26% (Solar Tracker)</span>
                  <span>60%+ (CGH Hidro Contínua)</span>
                </div>
              </div>

              {/* Slider 4: CAPEX Médio */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Custo de Implantação (CAPEX / MW):</span>
                  <span className="text-emerald-400 font-mono font-bold">R$ {capexPerMW.toFixed(1)} Milhões / MW</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="9.0"
                  step="0.2"
                  value={capexPerMW}
                  onChange={(e) => setCapexPerMW(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

            </div>

            {/* Results Panel (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#081224] border border-slate-800 space-y-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Resultados Estimados da Modelagem
              </span>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90">
                <span className="text-xs text-slate-400 block">CAPEX Total Estimado</span>
                <span className="text-2xl font-extrabold text-white font-mono">
                  R$ {totalCapex.toFixed(2).replace('.', ',')} Milhões
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Geração Estimada</span>
                  <span className="text-sm font-bold text-cyan-300 font-mono">
                    {Math.round(annualGenerationMWh).toLocaleString('pt-BR')} MWh/ano
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Receita Bruta Anual</span>
                  <span className="text-sm font-bold text-emerald-300 font-mono">
                    R$ {grossAnnualRevenue.toFixed(2).replace('.', ',')} M/ano
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-emerald-300 font-medium">Fluxo Líquido Projetado:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    R$ {netAnnualCashFlow.toFixed(2).replace('.', ',')} Milhões / ano
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-500/20 text-xs">
                  <span className="text-slate-300">Payback Simples Estimado:</span>
                  <span className="text-white font-bold font-mono">
                    ~ {simplePaybackYears.toFixed(1)} anos
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                * Simulação preliminar puramente ilustrativa. A modelagem final do comitê de investimentos utiliza curvas P50/P90 de geração, tributação real, seguros de performance e contratos juridicamente vinculantes.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
