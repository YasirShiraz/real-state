import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
    onExplore?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
    const { heroSlides } = useData();
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollY } = useScroll();
    const yVideo = useTransform(scrollY, [0, 1000], [0, 400]); // Parallax for video
    const yContent = useTransform(scrollY, [0, 1000], [0, 150]); // Slower parallax for text

    // Auto-advance slides
    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [heroSlides.length]);

    const activeSlide = heroSlides.length > 0
        ? heroSlides[currentSlide]
        : { type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400' };

    const handleScrollHintClick = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section
            className="relative h-screen w-full flex items-start md:items-center overflow-hidden bg-[var(--background)] pt-28 md:pt-36 lg:pt-40"
            data-theme="dark"
        >
            {/* Background Media with Parallax */}
            <motion.div style={{ y: yVideo }} className="hero-video-container optimized-animate absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSlide.url}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {activeSlide.type === 'video' ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                loop
                                muted={isMuted}
                                playsInline
                                key={activeSlide.url} // Force reload on change
                                className="w-full h-full object-cover scale-105"
                            >
                                <source src={activeSlide.url} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={activeSlide.url}
                                className="w-full h-full object-cover scale-105"
                                alt="Hero Background"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Premium Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[var(--background)] pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Intelligence Scanning Line */}
            {/* Light scanning line (animation kept subtle for performance) */}
            <motion.div
                animate={{ y: ['0%', '100%'], opacity: [0, 0.35, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[1px] bg-[var(--gold)]/30 z-[5] blur-[1.5px]"
            />

            <div className="section-container relative z-10 w-full">
                <motion.div style={{ y: yContent }}>
                    <motion.div
                        style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-7xl optimized-animate flex flex-col items-center text-center mx-auto"
                    >

                        <h1 className="text-[clamp(2.5rem,10vw,8rem)] leading-[1.1] mt-10 md:mt-16 mb-8 md:mb-14 tracking-[-0.06em] font-bold text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                            {t('platinumLiving').split(' ').length > 1 ? (
                                <>
                                    {t('platinumLiving').split(' ').slice(0, -1).join(' ')} <br />
                                    <span className="gold-gradient italic font-black">
                                        {t('platinumLiving').split(' ').slice(-1)}
                                    </span>
                                </>
                            ) : (
                                <span className="gold-gradient italic font-black">{t('platinumLiving')}</span>
                            )}
                        </h1>

                        <p className="text-lg md:text-3xl text-white/90 font-light max-w-3xl mb-8 md:mb-10 leading-relaxed drop-shadow-2xl mx-auto">
                            Experience the new standard of transparency in luxury real estate.
                            <br className="hidden md:block" />Powered by high-velocity data for <span className="text-[var(--gold-light)] font-bold">Downtown</span> and <span className="text-[var(--gold-light)] font-bold">JVC</span>.
                        </p>


                        {/* Mobile Stats Snapshot */}
                        <div className="mt-8 grid grid-cols-3 gap-4 lg:hidden text-white/80 text-xs w-full max-w-xl mx-auto">
                            {[
                                { label: t('transVolume'), value: '$12.4B+' },
                                { label: t('activeListings'), value: '450+' },
                                { label: t('growth'), value: '12%' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl bg-black/40 border border-white/10 py-3 px-3 flex flex-col items-center gap-1 backdrop-blur-md"
                                >
                                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 text-center">
                                        {stat.label}
                                    </span>
                                    <span className="text-base font-semibold text-white tracking-tight text-center">
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Hero Stats - Floating Data Cards */}
            <div className="absolute bottom-20 right-container z-10 hidden lg:flex flex-col gap-8">
                {[
                    { label: t('transVolume'), value: '$12.4B+' },
                    { label: t('activeListings'), value: '450+' },
                    { label: t('growth'), value: '12%' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ x: 80, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            y: [0, -10, 0], // Softer anti-gravity float to reduce overlap
                        }}
                        transition={{
                            x: { delay: 1.3 + (i * 0.15), duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                            opacity: { delay: 1.3 + (i * 0.15), duration: 1.1 },
                            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 } // Staggered float
                        }}
                        key={i}
                        className="relative group cursor-default"
                    >
                        {/* The Floating Stat - Background Removed */}
                        <div className="flex items-center justify-center gap-6 transition-all duration-500 group-hover:-translate-x-3 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">

                            <div className="flex flex-col items-end justify-center text-right">
                                <span className="text-[var(--gold-light)] text-[9px] font-black tracking-[0.35em] uppercase mb-3 drop-shadow-md">
                                    {stat.label}
                                </span>
                                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-lg mb-2">
                                    {stat.value}
                                </span>
                            </div>

                            {/* Right Indicator - Performance Refined with Halo */}
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                {/* Triple Rings for Depth */}
                                <div className="absolute inset-0 rounded-full border border-white/5 opacity-40" />
                                <div className="absolute inset-2 rounded-full border border-white/10 group-hover:border-[var(--gold)]/20 transition-all duration-700" />
                                <div className="absolute inset-4 rounded-full border border-white/5 opacity-30" />

                                <div className="relative">
                                    <div className="w-3 h-3 rounded-full bg-[var(--gold)] relative z-10" />
                                    {/* Signature Halo Glow */}
                                    <div className="absolute inset-0 rounded-full bg-[var(--gold)] blur-[8px] opacity-70 group-hover:opacity-100 group-hover:blur-[12px] transition-all duration-700" />
                                    <motion.div
                                        animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.5, 0.2] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-[-6px] rounded-full bg-[var(--gold)]/20 blur-sm"
                                    />
                                </div>

                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-t border-[var(--gold)]/30 border-r border-transparent border-b border-transparent border-l border-transparent"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Scroll Hint */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                onClick={handleScrollHintClick}
                role="button"
                tabIndex={0}
                className="absolute bottom-24 left-container flex items-center gap-6 text-white/40 group cursor-pointer"
            >
                <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-full bg-[var(--gold)]"
                    />
                </div>

                <span className="text-[11px] uppercase tracking-[0.6em] font-black group-hover:text-white transition-all duration-500">
                    {t('scrollExplore')}
                </span>
            </motion.div>

            {/* Visual Bottom Cut – clickable to explore */}
            <button
                type="button"
                onClick={onExplore}
                className="absolute bottom-0 left-0 w-full h-16 md:h-20 bg-black rounded-t-[999px] shadow-[0_-12px_40px_rgba(0,0,0,0.75)] flex items-center justify-center cursor-pointer border-t border-white/10 z-0"
                aria-label={t('exploreEstate')}
            >
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/40 font-black">
                    {t('theCollection')}
                </span>
            </button>
        </section>
    );
};

export default Hero;
