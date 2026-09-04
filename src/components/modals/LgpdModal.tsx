import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Cookie, 
  UserCheck, 
  CheckCircle2, 
  Send, 
  AlertCircle 
} from 'lucide-react';
import { StorageService } from '../../services/storage';

export type LgpdTab = 'privacy' | 'terms' | 'cookies' | 'rights';

interface LgpdModalProps {
  isOpen: boolean;
  activeTab: LgpdTab;
  onClose: () => void;
  onTabChange: (tab: LgpdTab) => void;
}

export const LgpdModal: React.FC<LgpdModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange
}) => {
  // Cookie preference states
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [cookieSaved, setCookieSaved] = useState(false);

  // Data Subject Request form state
  const [subjectForm, setSubjectForm] = useState({
    name: '',
    email: '',
    cpf: '',
    requestType: 'confirmacao_acesso',
    description: '',
    consent: false
  });
  const [subjectSuccess, setSubjectSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveCookiePreferences = () => {
    StorageService.setCookieConsent(true);
    setCookieSaved(true);
    setTimeout(() => {
      setCookieSaved(false);
      onClose();
    }, 1500);
  };

  const handleSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectForm.name || !subjectForm.email || !subjectForm.consent) return;
    setSubjectSuccess(true);
    setTimeout(() => {
      setSubjectSuccess(false);
      setSubjectForm({
        name: '',
        email: '',
        cpf: '',
        requestType: 'confirmacao_acesso',
        description: '',
        consent: false
      });
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#091122]/95 border border-slate-800 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-neon-emerald">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Central de Governança & LGPD
              </h2>
              <p className="text-xs text-slate-400">
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018) • QUARK ENERGY S.A.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => onTabChange('terms')}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'terms'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Termos de Uso
          </button>

          <button
            onClick={() => onTabChange('privacy')}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            Privacidade
          </button>

          <button
            onClick={() => onTabChange('cookies')}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'cookies'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Cookie className="w-4 h-4" />
            Cookies
          </button>

          <button
            onClick={() => onTabChange('rights')}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'rights'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-cyan-400" />
            Canal do Titular
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed flex-1">
          
          {/* TAB 1: TERMOS DE USO */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">1. Objeto e Natureza da Plataforma</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A plataforma digital da QUARK ENERGY TECNOLOGIA EM ENERGIA S.A. tem por objetivo a análise de engenharia, estruturação técnica, diligência e conexão de ativos de geração e armazenamento de energia renovável. As informações veiculadas não constituem oferta pública de valores mobiliários nem recomendação individualizada de investimento.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">2. Ausência de Garantia de Rentabilidade</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Projetos de infraestrutura energética estão sujeitos a variáveis hidrológicas, solares, regulatórias (ANEEL, ONS, CCEE) e de mercado. A QUARK ENERGY não oferece garantia de retorno financeiro, rentabilidade fixa ou liquidez imediata.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">3. Confidencialidade e Propriedade Intelectual</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Todos os algoritmos de score (QUARK SCORE, QUARK ESG SCORE, QUARK VALUATION) e marcas registradas pertencem exclusivamente à QUARK ENERGY S.A., sendo vedada sua reprodução não autorizada.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: POLÍTICA DE PRIVACIDADE */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">1. Coleta e Tratamento de Dados Pessoais</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Coletamos apenas os dados estritamente necessários para viabilizar o contato institucional, a qualificação preliminar de empreendedores e o cadastro de interessados como QUARKERS (nome, e-mail, telefone, localização e perfil preliminar).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">2. Finalidade e Base Legal (LGPD Art. 7º)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O tratamento de dados fundamenta-se no consentimento expresso do titular (Art. 7º, I), na execução de procedimentos preliminares a contrato (Art. 7º, V) e no legítimo interesse da organização (Art. 7º, IX) para a segurança e prevenção a fraudes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">3. Segurança da Informação</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Adotamos padrões criptográficos modernos de transporte (TLS 1.3), controle rigoroso de acesso e armazenamento protegido, assegurando a integridade e confidencialidade das informações tratadas.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: GESTÃO DE COOKIES */}
          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Gerencie suas preferências de consentimento de cookies a qualquer momento. Os cookies essenciais garantem a estabilidade da sessão e não podem ser desativados.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Cookies Estritamente Necessários</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Segurança, roteamento e integridade de sessão.</p>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  Sempre Ativos
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Cookies de Análise e Métricas</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Mapeamento de usabilidade e tráfego agregado sem identificação individual.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsCookies}
                    onChange={(e) => setAnalyticsCookies(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Cookies de Comunicação & Marketing</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Apresentação de oportunidades alinhadas ao seu perfil de investidor.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingCookies}
                    onChange={(e) => setMarketingCookies(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              {cookieSaved && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Preferências de cookies salvas com sucesso!</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSaveCookiePreferences}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_25px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CANAL DO TITULAR DE DADOS (LGPD ART. 18) */}
          {activeTab === 'rights' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                  <Lock className="w-4 h-4" />
                  Exercício de Direitos do Titular (Art. 18 da LGPD)
                </div>
                <p>
                  Você pode requerer confirmação de tratamento, acesso, correção, eliminação de dados tratados com consentimento ou revogação de autorização preenchendo o formulário abaixo:
                </p>
              </div>

              {subjectSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Solicitação Registrada</h4>
                  <p className="text-xs text-slate-300">
                    Sua requisição foi encaminhada ao nosso Encarregado de Proteção de Dados (DPO). Você receberá o protocolo em seu e-mail dentro do prazo legal de até 15 dias.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={subjectForm.name}
                        onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                        placeholder="Seu nome completo"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Cadastrado *</label>
                      <input
                        type="email"
                        required
                        value={subjectForm.email}
                        onChange={(e) => setSubjectForm({ ...subjectForm, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">CPF (Opcional p/ Localização)</label>
                      <input
                        type="text"
                        value={subjectForm.cpf}
                        onChange={(e) => setSubjectForm({ ...subjectForm, cpf: e.target.value })}
                        placeholder="000.000.000-00"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Solicitação *</label>
                      <select
                        value={subjectForm.requestType}
                        onChange={(e) => setSubjectForm({ ...subjectForm, requestType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="confirmacao_acesso">Confirmação de Tratamento ou Acesso aos Dados</option>
                        <option value="correcao">Correção de Dados Incompletos ou Inexatos</option>
                        <option value="anonimizacao_bloqueio">Anonimização, Bloqueio ou Eliminação</option>
                        <option value="portabilidade">Portabilidade dos Dados</option>
                        <option value="revogacao_consentimento">Revogação do Consentimento</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Detalhes Adicionais (Opcional)</label>
                    <textarea
                      rows={3}
                      value={subjectForm.description}
                      onChange={(e) => setSubjectForm({ ...subjectForm, description: e.target.value })}
                      placeholder="Descreva brevemente sua requisição..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="lgpd-consent-checkbox"
                      required
                      checked={subjectForm.consent}
                      onChange={(e) => setSubjectForm({ ...subjectForm, consent: e.target.checked })}
                      className="mt-1 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="lgpd-consent-checkbox" className="text-[11px] text-slate-400">
                      Declaro que sou o titular legítimo dos dados informados e autorizo a QUARK ENERGY a utilizar essas informações exclusivamente para processar e responder à presente solicitação.
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_25px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Requisição LGPD</span>
                    </button>
                  </div>
                </form>
              )}

              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Encarregado de Proteção de Dados (DPO): dpo@quarkenergy.com.br
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>QUARK ENERGY • Governança, Ética & Segurança</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-medium cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
