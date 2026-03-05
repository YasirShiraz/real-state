import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Communities: React.FC = () => {
    const { t, isRTL } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');

    const communities = [
        {
            title: "JUMEIRAH, BEACH",
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800",
            description: "Beachfront Living Refine"
        },
        {
            title: "JUMEIRAH, VILLAGE CIRCLE",
            image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&q=80&w=800",
            description: "Community Central"
        },
        {
            title: "MARINA DUBAI",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
            description: "Waterfront Luxury"
        },
        {
            title: "JUMEIRAH, BEACH",
            image: "https://images.unsplash.com/photo-1629140727571-9b5c6f7e4bce?auto=format&fit=crop&q=80&w=800",
            description: "The Palm Life"
        },
        {
            title: "PALM, JUMEIRAH",
            image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800",
            description: "Iconic Island Living"
        },
        {
            title: "JLT, RESIDENCY",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
            description: "Urban Heights"
        },
        {
            title: "DUBAI ISLAND, UAE",
            image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800",
            description: "New Horizons"
        }
    ];

    const filteredCommunities = communities.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full bg-black overflow-hidden flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1920"
                    alt="Communities Office"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-container w-full max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 tracking-tight"
                    >
                        {t('communitiesTitle')}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-4xl font-light text-white tracking-widest mb-10"
                    >
                        MA ESTATE
                    </motion.h2>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full max-w-2xl bg-white rounded-md flex overflow-hidden shadow-2xl"
                    >
                        <input
                            type="text"
                            placeholder={t('searchCommunitiesPlaceholder')}
                            className="flex-1 px-6 py-4 outline-none text-gray-700 bg-transparent placeholder-gray-400 font-light"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-[#00A3E0] hover:bg-[#008fca] transition-colors w-16 flex items-center justify-center text-white">
                            <Search size={22} />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Featured Section */}
            <div className="relative section-container py-section bg-[#F9F9F9] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none"
                    alt="Section Texture"
                />
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-4">
                    <div className="relative">
                        <span className="text-[#DAA520] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{t('ourCommunities')}</span>
                        <h2 className="text-4xl md:text-6xl font-light text-black">
                            {t('searchFeatured').split(' ').slice(0, 1).map(word => <span key={word} className="font-bold block">{word}</span>)}
                            {t('searchFeatured').split(' ').slice(1, -1).join(' ')} <br />
                            <span className="font-bold">{t('searchFeatured').split(' ').slice(-1)}</span>
                        </h2>

                        {/* Decorative Line */}
                        <div className={`absolute ${isRTL ? '-right-6' : '-left-6'} top-0 h-full w-[2px] bg-[#DAA520]`} />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
                    {/* Row 1 */}
                    {filteredCommunities[0] && (
                        <div key="0" className="md:col-span-4 relative group h-[350px] overflow-hidden rounded-[3rem] bg-white shadow-2xl cursor-pointer">
                            <img src={filteredCommunities[0].image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <div className="glass-dark backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/10 space-y-4 shadow-2xl">
                                    <div className="flex flex-col items-center text-center gap-1">
                                        <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] mb-1">Dubai Collection</span>
                                        <div className="flex items-center justify-center w-full relative">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[var(--gold-light)] transition-colors">
                                                {filteredCommunities[0].title}
                                            </h3>
                                            <ArrowRight size={20} className="absolute right-0 text-white/20 group-hover:text-[var(--gold)] transition-all duration-500" />
                                        </div>
                                    </div>
                                    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <button className="gold-bg text-black px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)] w-full">
                                            Explore Community
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {filteredCommunities[1] && (
                        <div key="1" className="md:col-span-8 relative group h-[350px] overflow-hidden rounded-[3rem] bg-white shadow-2xl cursor-pointer">
                            <img src={filteredCommunities[1].image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <div className="glass-dark backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/10 space-y-4 shadow-2xl">
                                    <div className="flex flex-col items-center text-center gap-1">
                                        <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] mb-1">Elite District</span>
                                        <div className="flex items-center justify-center w-full relative">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[var(--gold-light)] transition-colors">
                                                {filteredCommunities[1].title}
                                            </h3>
                                            <ArrowRight size={20} className="absolute right-0 text-white/20 group-hover:text-[var(--gold)] transition-all duration-500" />
                                        </div>
                                    </div>
                                    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <button className="gold-bg text-black px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)] w-full">
                                            Explore Community
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Row 2 */}
                    {filteredCommunities[2] && (
                        <div key="2" className="md:col-span-12 relative group h-[450px] overflow-hidden rounded-[3rem] bg-white shadow-2xl cursor-pointer mt-4">
                            <img src={filteredCommunities[2].image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <div className="glass-dark backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 space-y-4 shadow-2xl">
                                    <div className="flex flex-col items-center text-center gap-1">
                                        <span className="text-[var(--gold)] text-[12px] font-black uppercase tracking-[0.4em] mb-2">Signature Legacy</span>
                                        <div className="flex items-center justify-center w-full relative">
                                            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[var(--gold-light)] transition-colors">
                                                {filteredCommunities[2].title}
                                            </h3>
                                            <ArrowRight size={32} className="absolute right-0 text-white/20 group-hover:text-[var(--gold)] transition-all duration-500" />
                                        </div>
                                    </div>
                                    <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <button className="gold-bg text-black px-12 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)]">
                                            Explore Signature Community
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/971585589001"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 left-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20b858] transition-transform hover:scale-110"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.693c.961.533 1.83.693 2.778.694h.013c3.178 0 5.769-2.587 5.77-5.768.001-1.541-.601-2.986-1.688-4.073-1.089-1.09-2.535-1.693-4.082-1.811zm8.58 6.096c-.428-.214-2.536-1.249-2.929-1.393-.393-.143-.679-.214-.964.214-.286.429-1.107 1.393-1.357 1.679-.25.286-.5.321-.928.107-2.618-1.305-4.341-2.316-6.063-5.286-.214-.37.021-.571.229-.778.193-.193.429-.5.643-.75.214-.25.286-.429.429-.714.143-.286.071-.536-.036-.75-.107-.214-.964-2.321-1.321-3.179-.357-.839-.714-.714-.964-.714h-.821c-.286 0-.75.107-1.143.536-.393.429-1.5 1.464-1.5 3.571s1.536 4.143 1.75 4.428c.214.286 3.036 4.643 7.375 6.518 4.339 1.875 4.339 1.25 5.125 1.161.786-.089 2.536-1.036 2.911-2.036.375-1 .375-1.857.268-2.036-.107-.179-.393-.268-.821-.482zM12 2C6.486 2 2 6.486 2 12c0 1.84.514 3.553 1.408 5.03L2.01 22l5.056-1.32C8.619 21.6 10.284 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z" />
                </svg>
            </a>
        </div>
    );
};

export default Communities;
