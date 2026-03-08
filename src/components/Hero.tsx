import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
}

const Hero: React.FC<HeroProps> = () => {
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
            className="relative h-screen w-full flex items-center overflow-hidden bg-black pt-20 md:pt-36 lg:pt-40"
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

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

                        <h1 className="text-[clamp(2rem,10vw,8rem)] leading-[1.1] mt-6 md:mt-16 mb-6 md:mb-14 tracking-[-0.06em] font-bold text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
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

                        <p className="text-sm sm:text-base md:text-2xl text-white/80 font-light max-w-2xl mb-6 md:mb-10 leading-relaxed drop-shadow-xl mx-auto px-1 md:px-0">
                            Experience the new standard of transparency in luxury real estate.
                            <br className="hidden md:block" />Powered by high-velocity data for <span className="text-[var(--gold-light)] font-semibold">Downtown</span> and <span className="text-[var(--gold-light)] font-semibold">JVC</span>.
                        </p>


                        {/* Mobile Stats + CTA */}
                        <div className="lg:hidden w-full max-w-sm mx-auto space-y-4">
                            <div className="grid grid-cols-3 gap-2.5">
                                {[
                                    { label: t('transVolume'), value: '$12.4B+' },
                                    { label: t('activeListings'), value: '450+' },
                                    { label: t('growth'), value: '12%' },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-2xl bg-black/50 border border-white/10 py-3 px-2 flex flex-col items-center gap-1.5 backdrop-blur-xl"
                                    >
                                        <span className="text-[8px] uppercase tracking-[0.25em] text-white/40 text-center leading-tight">
                                            {stat.label}
                                        </span>
                                        <span className="text-sm font-bold text-[var(--gold-light)] tracking-tight text-center">
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile CTAs */}
                            <div className="flex items-center gap-2.5 pt-1">
                                <button
                                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                    className="flex-1 py-3 rounded-full gold-bg text-black text-[10px] font-black uppercase tracking-[0.25em] shadow-[0_8px_24px_rgba(212,175,55,0.45)]"
                                >
                                    Explore
                                </button>
                                <a
                                    href="https://wa.me/971585589001"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-3.5 rounded-full bg-black border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 shadow-2xl group/wa"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366] group-hover/wa:text-white transition-colors">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.553 4.187 1.605 5.952L0 24l6.12-1.605a11.802 11.802 0 005.923 1.577h.004c6.635 0 12.032-5.395 12.036-12.033A11.83 11.83 0 0012.05h.004z" />
                                    </svg>
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Hero Stats - Floating Data Cards */}
            <div className="absolute bottom-20 right-container z-10 hidden lg:flex flex-col gap-10 items-end">
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
                        className="relative group cursor-default w-fit"
                    >
                        {/* The Floating Stat - Background Removed */}
                        <div className="flex items-center justify-end gap-6 transition-all duration-500 group-hover:-translate-x-3 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">

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
                className="absolute bottom-24 left-container hidden sm:flex items-center gap-6 text-white/40 group cursor-pointer"
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


        </section>
    );
};

export default Hero;
