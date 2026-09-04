import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  ArrowLeft,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { StorageService, DEFAULT_CREDENTIALS } from '../../services/storage';

interface QuarkerLoginProps {
  onSuccess: (email: string) => void;
  onBackToHome: () => void;
  onOpenRegisterModal?: () => void;
}

export const QuarkerLogin: React.FC<QuarkerLoginProps> = ({
  onSuccess,
  onBackToHome,
  onOpenRegisterModal
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultCreds = DEFAULT_CREDENTIALS.quarker;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      // Check against default credentials or demo investors in storage
      const registeredQuarkers = StorageService.getQuarkers();
      const matchingQuarker = registeredQuarkers.find(
        q => q.email.toLowerCase() === trimmedEmail
      );

      const isValidDefault = 
        trimmedEmail === defaultCreds.email.toLowerCase() && 
        trimmedPassword === defaultCreds.password;

      const isValidRegistered = 
        matchingQuarker && 
        (trimmedPassword === defaultCreds.password || trimmedPassword === '123456');

      if (isValidDefault || isValidRegistered) {
        const userName = matchingQuarker ? matchingQuarker.name : defaultCreds.name;
        if (rememberMe) {
          StorageService.setQuarkerAuth(trimmedEmail, userName);
        }
        setIsLoading(false);
        onSuccess(trimmedEmail);
      } else {
        setIsLoading(false);
        setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha de acesso.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* Back Link */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={onBackToHome}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Portal Público</span>
          </button>

          <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
            Área Exclusiva
          </span>
        </div>

        {/* Logo and Heading */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Área do QUARKER
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            Acesse seu dashboard de ativos de energia, telemetria operacional de usinas e extrato de rendimentos.
          </p>
        </div>

        {/* Card Box */}
        <div className="mt-8 bg-[#091122]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail Cadastrado
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="quarker@quarkenergy.com.br"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-3.5 h-3.5"
                />
                <span className="text-xs text-slate-400">Lembrar neste navegador</span>
              </label>

              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                Ambiente Seguro
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="animate-pulse">Verificando credenciais...</span>
                ) : (
                  <>
                    <span>Entrar na Área do QUARKER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Registration Prompt */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Ainda não possui cadastro como QUARKER?
            </p>
            <button
              type="button"
              onClick={() => {
                if (onOpenRegisterModal) {
                  onOpenRegisterModal();
                } else {
                  onBackToHome();
                }
              }}
              className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Cadastre-se Gratuitamente na Plataforma</span>
            </button>
          </div>

        </div>

        {/* Security Footer Note */}
        <p className="mt-6 text-center text-[11px] text-slate-500">
          QUARK ENERGY S.A. • Plataforma de Inteligência e Diligência em Renováveis
        </p>

      </div>
    </div>
  );
};
