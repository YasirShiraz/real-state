import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleMute = () => {
        if (videoRef.current && audioRef.current) {
            const newState = !isMuted;
            setIsMuted(newState);
            videoRef.current.muted = newState;
            audioRef.current.muted = newState;
            if (!newState) {
                audioRef.current.play().catch(() => { });
            }
        }
    };

    return (
        <section className="relative h-screen w-full flex items-center overflow-hidden bg-[var(--background)]" data-theme="dark">
            {/* Background Video */}
            <div className="hero-video-container optimized-animate">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1920"
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-dubai-city-aerial-view-during-the-day-27082-large.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Premium Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[var(--background)] pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Intelligence Scanning Line */}
            <motion.div
                animate={{ y: ['0%', '100%'], opacity: [0, 0.4, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[1px] bg-[var(--gold)]/30 z-[5] blur-[1.5px]"
            />

            <audio
                ref={audioRef}
                loop
                muted={isMuted}
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
            />

            <div className="section-container relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-7xl optimized-animate"
                    style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}
                >
                    <div className="inline-flex items-center gap-5 mb-12 px-8 py-3 rounded-full glass-dark border border-white/10 shadow-2xl">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-pulse shadow-[0_0_12px_var(--gold)]" />
                        <span className="text-[var(--gold-light)] tracking-[0.5em] uppercase text-[10px] font-black">
                            Market Intelligence 4.0 Active
                        </span>
                    </div>

                    <h1 className="text-[12vw] xl:text-[10rem] font-bold leading-[0.8] mb-14 tracking-[-0.06em] text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                        PLATINUM <br />
                        <span className="gold-gradient italic font-black">LIVING.</span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-white/90 font-light max-w-3xl mb-20 leading-relaxed drop-shadow-2xl">
                        Experience the new standard of transparency in luxury real estate.
                        <br />Powered by high-velocity data for <span className="text-[var(--gold-light)] font-bold">Downtown</span> and <span className="text-[var(--gold-light)] font-bold">JVC</span>.
                    </p>

                    <div className="flex items-center gap-12">
                        <button className="gold-bg text-black hover:scale-105 active:scale-95 transition-all duration-700 font-bold tracking-[0.4em] px-16 py-7 rounded-full flex items-center gap-6 shadow-2xl group">
                            <span className="text-sm">EXPLORE ESTATE</span>
                            <PlayCircle size={28} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </button>

                        <button
                            onClick={toggleMute}
                            className="flex items-center gap-6 group py-5 pr-12 pl-6 rounded-full glass-dark border border-white/10 hover:bg-white/10 transition-all duration-700 shadow-xl"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--gold)] group-hover:text-black transition-all duration-500 shadow-inner">
                                {isMuted ? <VolumeX size={24} className="text-white group-hover:text-black" /> : <Volume2 size={24} className="text-white group-hover:text-black animate-pulse" />}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-1">Sound Experience</span>
                                <span className="text-sm font-bold text-white tracking-[0.2em] uppercase">{isMuted ? 'Muted' : 'Playing'}</span>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Hero Stats - Floating Data Cards */}
            <div className="absolute bottom-24 right-container z-10 hidden lg:flex flex-col gap-6">
                {[
                    { label: 'TRANSACTION VOLUME', value: '$12.4B+' },
                    { label: 'ACTIVE LISTINGS', value: '450+' },
                    { label: 'PROJECTED GROWTH', value: '12%' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.5 + (i * 0.2), duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        key={i}
                        className="glass-dark border border-white/5 pl-10 pr-6 py-6 rounded-[2rem] min-w-[320px] flex justify-between items-center group cursor-default hover:bg-white/[0.08] transition-all duration-700 hover:-translate-x-6 hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-l-[1px] border-l-[var(--gold)]/30"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-[var(--gold-light)] uppercase tracking-[0.6em] font-black opacity-60 group-hover:opacity-100 transition-opacity">
                                {stat.label}
                            </span>
                            <span className="text-4xl font-bold text-white tracking-tighter transition-transform group-hover:scale-105 origin-left duration-700">
                                {stat.value}
                            </span>
                        </div>

                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-[var(--gold)]/10 group-hover:border-[var(--gold)]/40 transition-colors duration-700" />
                            <div className="w-2 h-2 rounded-full bg-[var(--gold)] shadow-[0_0_20px_var(--gold)] animate-pulse" />
                            {/* Orbiting ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-t border-[var(--gold)]/40 border-r border-transparent border-b border-transparent border-l border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Scroll Hint */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-container flex items-center gap-6 text-white/30 group cursor-pointer"
            >
                <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-full bg-[var(--gold)]"
                    />
                </div>


                <span className="text-[11px] uppercase tracking-[0.6em] font-black group-hover:text-white transition-all duration-500">Scroll to Explore</span>
            </motion.div>

            {/* Visual Bottom Cut */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
