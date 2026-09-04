import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDomain?: boolean;
  light?: boolean;
}

export const QuarkLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showDomain = false 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Q with 3 Orbital Quarks Symbol */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
        >
          <defs>
            <linearGradient id="quarkGradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="ringGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Central 'Q' Outer Geometry */}
          <circle 
            cx="48" 
            cy="46" 
            r="32" 
            stroke="url(#quarkGradientPrimary)" 
            strokeWidth="5.5" 
            strokeDasharray="180 20"
            strokeLinecap="round"
          />

          {/* Orbital dynamic energy trajectories */}
          <ellipse 
            cx="48" 
            cy="46" 
            rx="38" 
            ry="19" 
            transform="rotate(-30 48 46)" 
            stroke="url(#ringGlow)" 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
            className="opacity-70 animate-spin"
            style={{ transformOrigin: '48px 46px', animationDuration: '28s' }}
          />
          
          <ellipse 
            cx="48" 
            cy="46" 
            rx="38" 
            ry="19" 
            transform="rotate(45 48 46)" 
            stroke="rgba(6,182,212,0.4)" 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
            className="opacity-60"
          />

          {/* Inner Energy Core */}
          <circle cx="48" cy="46" r="10" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="48" cy="46" r="4" fill="#34D399" />

          {/* Quark 1 (Up Quark - Top Green) */}
          <circle cx="28" cy="24" r="5" fill="#10B981" filter="drop-shadow(0 0 4px #10B981)" />
          <line x1="48" y1="46" x2="28" y2="24" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5" />

          {/* Quark 2 (Up Quark - Right Cyan) */}
          <circle cx="74" cy="38" r="5" fill="#06B6D4" filter="drop-shadow(0 0 4px #06B6D4)" />
          <line x1="48" y1="46" x2="74" y2="38" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />

          {/* Quark 3 (Down Quark - Bottom Left / Forming the tail of the Q) */}
          <circle cx="44" cy="74" r="5" fill="#3B82F6" filter="drop-shadow(0 0 4px #3B82F6)" />
          <line x1="48" y1="46" x2="44" y2="74" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.5" />

          {/* Q Tail Element (Energy Vector projecting outward) */}
          <path 
            d="M 62 60 L 86 84" 
            stroke="url(#quarkGradientPrimary)" 
            strokeWidth="6" 
            strokeLinecap="round" 
          />
          <circle cx="86" cy="84" r="3.5" fill="#10B981" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold tracking-tight text-white font-['Space_Grotesk',sans-serif] ${textSizes[size]}`}>
            QUARK
          </span>
          <span className={`font-semibold tracking-wider text-emerald-400 font-['Space_Grotesk',sans-serif] ${textSizes[size]}`}>
            ENERGY
          </span>
        </div>
        {showDomain && (
          <span className="text-[10px] tracking-widest uppercase font-mono text-cyan-400/80 font-medium">
            quarkenergy.com.br
          </span>
        )}
      </div>
    </div>
  );
};

export const Logo = QuarkLogo;

