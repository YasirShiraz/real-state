import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Search, X } from 'lucide-react';
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
    const [search, setSearch] = useState("");

    const filters = ["All", "Penthouse", "Villa", "Apartment", "Duplex"];

    const filteredProperties = properties.filter(p => {
        const matchesType = filter === "All" || p.type === filter;
        const matchesSearch = !search.trim() ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.location.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white">

            {/* ─── Cinematic Header ─── */}
            <div className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Estate"
                        className="w-full h-full object-cover opacity-70 scale-105"
                    />
                </div>

                {/* Vertical Lines */}
                <div className="absolute inset-0 pointer-events-none flex justify-between px-[8%] opacity-10">
                    <div className="w-[1px] h-full bg-white/30" />
                    <div className="w-[1px] h-full bg-white/30" />
                    <div className="w-[1px] h-full bg-white/30" />
                </div>

                <div className="relative z-10 text-center px-5 w-full max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-3 md:gap-5"
                    >
                        <span className="text-[var(--gold)] font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
                            {t('theCollection')}
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[1.05]">
                            {t('curatedEstates').split(' ').slice(0, -1).join(' ')}
                            <br />
                            <span className="italic font-serif font-light text-white/75">
                                {t('curatedEstates').split(' ').slice(-1)}
                            </span>
                        </h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="w-16 h-[1.5px] bg-[var(--gold)]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* ─── Sticky Filter + Search Bar ─── */}
            <div className="w-full relative z-20 bg-white border-b border-black/5 shadow-sm">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center"
                >
                    {/* ── Mobile Layout ── */}
                    <div className="flex flex-col md:hidden w-full">
                        {/* Filter Tabs Row */}
                        <div className="relative border-b border-black/5">
                            <div
                                className="flex items-center justify-center gap-2 px-5 py-4 overflow-x-auto no-scrollbar w-full"
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 relative ${filter === f
                                            ? 'text-black bg-[var(--gold)] shadow-md'
                                            : 'text-black/50 hover:text-black hover:bg-black/5'
                                            }`}
                                    >
                                        <span className="relative z-10">{f}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                        </div>

                        {/* Search + CTA Row */}
                        <div className="flex items-center gap-3 p-4">
                            <div className="flex-1 flex items-center gap-4 bg-black/[0.04] rounded-2xl px-5 py-3.5 border border-black/5 focus-within:border-[var(--gold)]/50 focus-within:bg-white transition-all duration-300">
                                <Search size={16} className="text-black/40 shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="flex-1 bg-transparent ml-1 text-xs font-bold tracking-widest outline-none placeholder:text-black/35 uppercase min-w-0"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="text-black/35 hover:text-black transition-colors">
                                        <X size={15} />
                                    </button>
                                )}
                            </div>
                            <a
                                href="https://wa.me/971585589001"
                                target="_blank"
                                rel="noreferrer"
                                className="flex-shrink-0 flex items-center justify-center w-[52px] h-[52px] gold-bg text-black rounded-2xl shadow-[0_10px_25px_rgba(212,175,55,0.4)] transition-all active:scale-95"
                                title="Consult Expert"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.553 4.187 1.605 5.952L0 24l6.12-1.605a11.802 11.802 0 0 0 5.923 1.577h.004c6.635 0 12.032-5.395 12.036-12.033A11.83 11.83 0 0 0 12.05 0h.004z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* ── Desktop Layout ── */}
                    <div className="hidden md:flex items-center justify-between w-full px-5 py-3.5">
                        {/* Tabs */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-400 relative group ${filter === f
                                        ? 'text-black bg-[var(--gold)] shadow-md'
                                        : 'text-black/55 hover:text-black bg-black/[0.04] hover:bg-black/[0.07]'
                                        }`}
                                >
                                    <span className="relative z-10">{f}</span>
                                </button>
                            ))}
                        </div>

                        {/* Search + CTA */}
                        <div className="flex flex-1 items-center justify-end gap-4 ml-4">
                            <div className="flex-1 max-w-sm flex items-center gap-3 bg-black/[0.03] rounded-full px-5 py-2.5 border border-transparent focus-within:border-[var(--gold)]/40 focus-within:bg-black/5 transition-colors">
                                <Search size={15} className="text-black/30 shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder={t('search')}
                                    className="flex-1 bg-transparent ml-1 text-xs font-bold tracking-[0.18em] outline-none placeholder:text-black/30 uppercase w-full"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="text-black/30 hover:text-black transition-colors shrink-0">
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            <a
                                href="https://wa.me/971585589001"
                                target="_blank"
                                rel="noreferrer"
                                className="shrink-0 inline-flex items-center gap-2.5 rounded-full gold-bg text-black text-[10px] font-black uppercase tracking-[0.22em] px-6 py-3 shadow-[0_10px_28px_rgba(212,175,55,0.4)] hover:shadow-[0_16px_40px_rgba(212,175,55,0.65)] hover:bg-[var(--gold-dark)] transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.553 4.187 1.605 5.952L0 24l6.12-1.605a11.802 11.802 0 005.923 1.577h.004c6.635 0 12.032-5.395 12.036-12.033A11.83 11.83 0 0012.05h.004z" />
                                </svg>
                                Expert
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ─── Properties Grid ─── */}
            <div className="section-container py-section">

                {/* Results count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between mb-8 md:mb-12"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
                        {filteredProperties.length} {filteredProperties.length === 1 ? 'Residence' : 'Residences'}
                    </span>
                    {(filter !== 'All' || search) && (
                        <button
                            onClick={() => { setFilter('All'); setSearch(''); }}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                        >
                            <X size={11} /> Clear
                        </button>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProperties.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col items-center justify-center py-24 gap-5 text-center"
                            >
                                <div className="text-5xl">🏙️</div>
                                <h3 className="text-xl font-bold uppercase tracking-tighter text-black">No residences found</h3>
                                <p className="text-black/40 text-sm">Try a different filter or search term.</p>
                                <button
                                    onClick={() => { setFilter('All'); setSearch(''); }}
                                    className="gold-bg text-black px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_8px_20px_rgba(212,175,55,0.3)]"
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        ) : (
                            filteredProperties.map((property, index) => (
                                <motion.div
                                    layout
                                    key={property.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.45, delay: index * 0.06 }}
                                    className="group cursor-pointer bg-white rounded-none overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_56px_rgba(212,175,55,0.18)] transition-all duration-500 hover:-translate-y-1.5 border border-black/[0.04] flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-[200px] sm:h-[220px] md:h-[250px] overflow-hidden">
                                        <img
                                            src={property.images?.[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'}
                                            alt={property.title}
                                            className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                        {/* Type Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-white/10">
                                                {property.type}
                                            </span>
                                        </div>

                                        {/* Price on image */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="text-xl md:text-2xl font-bold text-[var(--gold-light)] tracking-tight drop-shadow-lg">
                                                {property.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 md:p-6 flex flex-col flex-1 gap-3.5">
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-black uppercase tracking-tight leading-tight group-hover:text-[var(--gold-dark)] transition-colors duration-300 mb-2">
                                                {property.title}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-black/35">
                                                <MapPin size={11} className="text-[var(--gold)] shrink-0" />
                                                <span className="text-[10px] font-bold tracking-widest uppercase">{property.location}</span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-[1px] bg-black/5" />

                                        {/* CTA */}
                                        <button
                                            onClick={() => onViewProperty?.(property.id)}
                                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-none text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[var(--gold-dark)] hover:shadow-[0_10px_28px_rgba(212,175,55,0.35)] group/btn"
                                        >
                                            View Residence
                                            <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* ─── Footer CTA ─── */}
                {filteredProperties.length > 0 && (
                    <div className="flex flex-col items-center gap-5 pt-section">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/25">
                            Showing {filteredProperties.length} Curated Residences
                        </span>
                        <div className="w-[1px] h-10 bg-black/8" />
                        <button
                            onClick={onOpenCollection}
                            className="group flex items-center gap-3 px-10 py-4 bg-black text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[var(--gold-dark)] transition-all duration-400 shadow-[0_12px_36px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.35)] hover:scale-105"
                        >
                            Load Complete Collection
                            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Properties;
