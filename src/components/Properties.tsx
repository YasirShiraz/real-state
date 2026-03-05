import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, SlidersHorizontal, ArrowRight, PhoneCall } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

interface PropertiesProps {
    onOpenCollection?: () => void;
    onViewProperty?: (id: number) => void;
}

const Properties: React.FC<PropertiesProps> = ({ onOpenCollection, onViewProperty }) => {
    const { properties } = useData();
    const { t } = useLanguage();
    const [filter, setFilter] = useState("All");

    const filters = ["All", "Penthouse", "Villa", "Apartment", "Duplex"];

    const filteredProperties = filter === "All"
        ? properties
        : properties.filter(p => p.type === filter);

    return (
        <div className="min-h-screen bg-white">
            {/* Cinematic Header */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Estate"
                        className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
                    />
                </div>

                <div className="relative z-10 text-center space-y-4 md:space-y-6 max-w-4xl px-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-2 md:gap-4"
                    >
                        <span className="text-[var(--gold)] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-xs">
                            {t('theCollection')}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter uppercase leading-[1.1]">
                            {t('curatedEstates').split(' ').slice(0, -1).join(' ')} <br /> <span className="italic font-serif font-light text-white/80">{t('curatedEstates').split(' ').slice(-1)}</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Vertical Lines Decoration */}
                <div className="absolute inset-0 pointer-events-none flex justify-between px-[10%] opacity-10">
                    <div className="w-[1px] h-full bg-white/20" />
                    <div className="w-[1px] h-full bg-white/20" />
                    <div className="w-[1px] h-full bg-white/20" />
                </div>
            </div>

            <div className="section-container relative z-20 -mt-10 md:-mt-20">
                {/* Control Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-white via-[#f9f4e8] to-white backdrop-blur-xl p-3 md:p-4 rounded-[999px] shadow-[0_18px_40px_rgba(0,0,0,0.08)] border border-[rgba(212,175,55,0.25)] flex flex-col md:flex-row items-stretch gap-3 md:gap-6"
                >
                    <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all duration-500 relative overflow-hidden group flex-shrink-0 ${filter === f
                                        ? "text-white bg-black shadow-lg"
                                        : "text-black/60 hover:text-black bg-gray-50 hover:bg-gray-100"
                                        }`}
                                >
                                    <span className="relative z-10">{f}</span>
                                    {filter === f && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-black z-0"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search, layout & consultant CTA */}
                    <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 md:border-l md:border-black/5 md:pl-4">
                        <div className="relative w-full md:w-64 group">
                            <input
                                type="text"
                                placeholder={t('search')}
                                className="w-full px-6 pr-6 py-3 bg-white border border-black/5 focus:border-[rgba(212,175,55,0.7)] rounded-full text-xs font-bold tracking-[0.18em] outline-none transition-all duration-300 placeholder:text-black/40 shadow-[0_6px_20px_rgba(0,0,0,0.06)] focus:shadow-[0_10px_26px_rgba(212,175,55,0.25)] uppercase"
                            />
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                            <button
                                title="Filters"
                                className="shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-black/15 bg-white/80 hover:border-[rgba(212,175,55,0.8)] hover:bg-black hover:text-[var(--gold-light)] transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                            >
                                <SlidersHorizontal size={16} />
                            </button>
                            <a
                                href="https://wa.me/971585589001"
                                target="_blank"
                                rel="noreferrer"
                                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-transparent gold-bg text-black text-[10px] font-bold uppercase tracking-[0.25em] px-4 md:px-6 py-2.5 shadow-[0_12px_30px_rgba(212,175,55,0.45)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.7)] transition-shadow"
                            >
                                <PhoneCall size={14} />
                                Consult Expert
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Listings Grid — Modern Card Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-section">
                    <AnimatePresence mode='popLayout'>
                        {filteredProperties.map((property, index) => (
                            <motion.div
                                layout
                                key={property.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.5, delay: index * 0.07 }}
                                className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_64px_rgba(212,175,55,0.18)] transition-all duration-500 hover:-translate-y-2 border border-black/4 flex flex-col h-full"
                            >
                                {/* Image Section */}
                                <div className="relative h-[240px] md:h-[260px] overflow-hidden">
                                    <img
                                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col flex-1 gap-4">
                                    {/* Title + Location */}
                                    <div className="space-y-1.5 flex-1">
                                        <div className="mb-4">
                                            <div className="text-3xl font-bold text-[var(--gold)] tracking-tighter group-hover:scale-105 transition-transform origin-left duration-500">
                                                {property.price}
                                            </div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tighter leading-tight group-hover:text-[var(--gold-dark)] transition-colors duration-300">
                                            {property.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-black/40">
                                            <MapPin size={11} className="text-[var(--gold)] shrink-0" />
                                            <span className="text-[10px] font-bold tracking-widest uppercase">{property.location}</span>
                                        </div>
                                    </div>



                                    {/* CTA */}
                                    <button
                                        onClick={() => onViewProperty?.(property.id)}
                                        className="w-full flex items-center justify-center gap-2 bg-black hover:gold-bg text-white hover:text-black py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-400 hover:shadow-[0_12px_30px_rgba(212,175,55,0.35)] group/btn"
                                    >
                                        View Residence
                                        <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Footer Action */}
                <div className="flex justify-center pb-section">
                    <div className="flex flex-col items-center gap-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Showing {filteredProperties.length} Residences</span>
                        <div className="w-[1px] h-12 bg-black/10" />
                        <button
                            onClick={onOpenCollection}
                            className="px-12 py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--gold)] hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            Load Complete Collection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties;
