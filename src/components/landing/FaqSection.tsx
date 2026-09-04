import React, { useState } from 'react';
import { FaqItem } from '../../types';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Sparkles, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  onOpenInvestorModal: () => void;
  onOpenQuarkerizeModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  onOpenInvestorModal,
  onOpenQuarkerizeModal
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Geral', 'Empreendedores', 'Investidores (QUARKER)', 'Segurança & Risco', 'ESG & Tokenização'];

  const toggleAccordion = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(i => i !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'Todas' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq-section" className="py-24 bg-[#080f20] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-semibold text-emerald-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARÊNCIA & CLAREZA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Respostas responsáveis, técnicas e transparentes sobre o funcionamento da infraestrutura QUARK ENERGY, riscos e modelo de negócio.
          </p>

          {/* Search bar & Category filter */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por palavras-chave (ex: risco, liquidez, score)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-semibold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div 
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg' 
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-emerald-400/90 font-semibold block">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
              Nenhuma pergunta encontrada com o termo pesquisado.
            </div>
          )}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white">
              Ainda tem dúvidas técnicas ou regulatórias?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Nossa equipe de engenharia e estruturação responde diretamente a desenvolvedores e investidores.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuarkerizeModal}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md"
            >
              Falar com Engenharia
            </button>
            <button
              onClick={onOpenInvestorModal}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 hover:text-white transition-colors"
            >
              Cadastrar como QUARKER
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
