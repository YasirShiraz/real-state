import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Communities: React.FC = () => {
    const { t } = useLanguage();
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
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 border-b border-gray-200 pb-4">
                    <div className="relative pl-6">
                        <span className="text-[#DAA520] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{t('ourCommunities')}</span>
                        <h2 className="text-3xl md:text-6xl font-light text-black">
                            {t('searchFeatured').split(' ').slice(0, 1).map(word => <span key={word} className="font-bold block">{word}</span>)}
                            {t('searchFeatured').split(' ').slice(1, -1).join(' ')} <br />
                            <span className="font-bold">{t('searchFeatured').split(' ').slice(-1)}</span>
                        </h2>

                        {/* Decorative Line */}
                        <div className={`absolute left-0 top-0 h-full w-[2px] bg-[#DAA520]`} />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                    {filteredCommunities.map((community, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative group overflow-hidden rounded-[2.5rem] bg-white shadow-xl cursor-pointer ${index === 2 ? 'sm:col-span-2 lg:col-span-1 h-[400px]' : 'h-[350px] md:h-[400px]'
                                }`}
                        >
                            <img
                                src={community.image}
                                alt={community.title}
                                className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <div className="glass-dark backdrop-blur-2xl rounded-[2rem] p-5 md:p-6 border border-white/10 space-y-3 shadow-2xl">
                                    <div className="flex flex-col items-center text-center gap-1">
                                        <span className="text-[var(--gold)] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-0.5">
                                            {index % 2 === 0 ? 'Dubai Collection' : 'Elite District'}
                                        </span>
                                        <div className="flex items-center justify-center w-full relative">
                                            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[var(--gold-light)] transition-colors">
                                                {community.title}
                                            </h3>
                                            <ArrowRight size={18} className="hidden sm:block absolute right-[-10px] opacity-0 group-hover:opacity-100 group-hover:right-0 text-[var(--gold)] transition-all duration-500" />
                                        </div>
                                        <p className="text-white/60 text-[10px] md:text-xs font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            {community.description}
                                        </p>
                                    </div>
                                    <div className="pt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <button className="gold-bg text-black px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)] w-full">
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Communities;
