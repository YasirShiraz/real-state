import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LogoProps {
    className?: string;
    isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", isDark = true }) => {
    const { isRTL } = useLanguage();
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <svg
                width="48"
                height="48"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Modern Geometric Icon based on screenshot */}

                {/* Top Diamond */}
                <path
                    d="M50 15L68 35L50 55L32 35L50 15Z"
                    fill="url(#gold-gradient-light)"
                />

                {/* Left Facet */}
                <path
                    d="M32 35L15 85L50 85L32 35Z"
                    fill="url(#gold-gradient-dark)"
                />

                {/* Right Facet */}
                <path
                    d="M68 35L85 85L50 85L68 35Z"
                    fill="url(#gold-gradient-mid)"
                />

                <defs>
                    <linearGradient id="gold-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gold-light)" />
                        <stop offset="100%" stopColor="var(--gold)" />
                    </linearGradient>
                    <linearGradient id="gold-gradient-mid" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gold)" />
                        <stop offset="100%" stopColor="var(--gold-dark)" />
                    </linearGradient>
                    <linearGradient id="gold-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gold-dark)" />
                        <stop offset="100%" stopColor="#8a6d1d" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="flex items-center gap-2">
                <span className={`text-4xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
                    MA
                </span>
                <div className={`flex flex-col py-0.5 ml-1 ${isDark ? 'border-white/20' : 'border-black/20'} ${isRTL ? 'border-r pr-2 mr-1 ml-0' : 'border-l pl-2'}`}>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase gold-gradient">
                        REAL
                    </span>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase gold-gradient">
                        ESTATE
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Logo;
