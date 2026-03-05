import React from 'react';
import { Home, Key, HandCoins, Building2, TrendingUp, Compass, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FloatingMenuProps {
    onOpenOverlay: (type: string) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ onOpenOverlay }) => {
    const { t } = useLanguage();

    const menuItems = [
        { icon: Home, label: t('buy'), type: 'buy' },
        { icon: Key, label: t('rent'), type: 'rent' },
        { icon: HandCoins, label: t('sell'), type: 'sell' },
        { icon: Building2, label: t('newProjects'), type: 'new' },
        { icon: TrendingUp, label: t('trends'), type: 'trends' },
        { icon: Compass, label: t('explore'), type: 'explore' },
        { icon: Calculator, label: t('valuation'), type: 'valuation' },
    ];
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-5xl">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-1.5 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl bg-[#111111]/90 overflow-hidden group"
            >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] pointer-events-none" />

                <div className="relative flex items-center justify-between px-2 gap-1">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => onOpenOverlay(item.type)}
                            className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl hover:bg-white/5 transition-all duration-500 min-w-[90px] group/btn"
                        >
                            <div className="relative">
                                <item.icon size={20} className="text-white/40 group-hover/btn:text-[var(--gold)] group-hover/btn:scale-110 transition-all duration-500" />
                                <div className="absolute -inset-2 bg-[var(--gold)]/20 rounded-full blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 group-hover/btn:text-white transition-colors">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default FloatingMenu;
