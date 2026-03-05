import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Search, ArrowRight, X, PhoneCall } from 'lucide-react';
import { useData } from '../context/DataContext';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'sqft-desc' | 'beds-desc';

interface FullCollectionProps {
  onViewProperty?: (id: number) => void;
}

const FullCollection: React.FC<FullCollectionProps> = ({ onViewProperty }) => {
  const { properties } = useData();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sort, setSort] = useState<SortOption>('default');

  const types = ['All', ...Array.from(new Set(properties.map(p => p.type)))];
  const statuses = ['All', ...Array.from(new Set(properties.map(p => p.status)))];

  const parsePrice = (price: string) =>
    parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;

  const filtered = useMemo(() => {
    let result = [...properties];
    if (typeFilter !== 'All') result = result.filter(p => p.type === typeFilter);
    if (statusFilter !== 'All') result = result.filter(p => p.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc': return result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case 'price-desc': return result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case 'sqft-desc': return result.sort((a, b) => b.sqft - a.sqft);
      case 'beds-desc': return result.sort((a, b) => b.beds - a.beds);
      default: return result;
    }
  }, [properties, typeFilter, statusFilter, search, sort]);

  const hasActiveFilters = typeFilter !== 'All' || statusFilter !== 'All' || search.trim() !== '';

  const clearAll = () => {
    setTypeFilter('All');
    setStatusFilter('All');
    setSearch('');
    setSort('default');
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Cinematic Hero Header */}
      <div className="h-[40vh] md:h-[50vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            alt="Colossal Dubai Skyline"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
        </div>

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-2 md:gap-4"
          >
            <span className="text-[var(--gold)] font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
              The Complete Portfolio
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter uppercase leading-[1.1]">
              Full <br />
              <span className="italic font-serif font-light text-white/80">Collection</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-24 h-[1px] bg-[var(--gold)]"
            />
            <p className="text-white/50 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
              {properties.length} Curated Residences · UAE Luxury Market
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="section-container relative z-20 -mt-10 md:-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-2xl p-4 rounded-[40px] shadow-2xl border border-black/5 flex flex-col lg:flex-row items-center gap-6"
        >
          {/* Search */}
          <div className="w-full lg:w-96 relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[var(--gold)] transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search properties, areas, or lifestyle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-4 bg-black/[0.03] border border-transparent focus:border-[var(--gold)]/30 rounded-full text-sm font-bold tracking-widest outline-none transition-all placeholder:text-black/20 uppercase"
            />
          </div>

          {/* Type & Status Filters Combined */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">Type</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {types.map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${typeFilter === t ? 'bg-black text-white' : 'bg-black/5 text-black/50 hover:bg-black/10'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-[1px] bg-black/8 self-stretch hidden sm:block" />
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">Status</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {statuses.map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${statusFilter === s ? 'gold-bg text-black shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'bg-black/5 text-black/50 hover:bg-black/10'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort & Clear All */}
          <div className="flex items-center gap-4 shrink-0">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="px-5 py-3 rounded-full border border-black/10 bg-white text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:border-black/30 transition-colors"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="sqft-desc">Largest First</option>
              <option value="beds-desc">Most Bedrooms</option>
            </select>

            {hasActiveFilters && (
              <button onClick={clearAll} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                <X size={11} /> Clear All
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Properties Grid */}
      <div className="section-container py-section">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-40 gap-6 text-center">
              <div className="text-6xl">🏙️</div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter text-black">No residences found</h3>
              <p className="text-black/40 text-sm max-w-xs">Try adjusting your filters or search query.</p>
              <button onClick={clearAll} className="gold-bg text-black px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_8px_20px_rgba(212,175,55,0.3)]">
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((property, index) => (
                <motion.div
                  layout
                  key={property.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group cursor-pointer bg-white rounded-[1.75rem] overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_56px_rgba(212,175,55,0.16)] transition-all duration-500 hover:-translate-y-2 border border-black/4 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-[200px] overflow-hidden shrink-0">
                    <img
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex-1 space-y-1.5">
                      <div className="mb-3">
                        <div className="text-2xl font-bold text-[var(--gold)] tracking-tighter group-hover:scale-105 transition-transform origin-left duration-500">
                          {property.price}
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-black uppercase tracking-tight leading-tight group-hover:text-[var(--gold-dark)] transition-colors duration-300">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-black/40">
                        <MapPin size={10} className="text-[var(--gold)] shrink-0" />
                        <span className="text-[9px] font-bold tracking-widest uppercase">{property.location}</span>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-black/5" />

                    <div className="flex items-center gap-2 flex-wrap">
                      {[
                        { icon: <Bed size={11} className="text-[var(--gold)]" />, val: `${property.beds} Beds` },
                        { icon: <Bath size={11} className="text-[var(--gold)]" />, val: `${property.baths} Baths` },
                        { icon: <Square size={11} className="text-[var(--gold)]" />, val: `${property.sqft.toLocaleString()} ft²` },
                      ].map((spec, i) => (
                        <div key={i} className="flex items-center gap-1 bg-black/4 rounded-full px-2.5 py-1">
                          {spec.icon}
                          <span className="text-[9px] font-black text-black/70 uppercase tracking-wide">{spec.val}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onViewProperty?.(property.id)}
                      className="w-full flex items-center justify-center gap-2 bg-black hover:gold-bg text-white hover:text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-300 hover:shadow-[0_10px_28px_rgba(212,175,55,0.3)] group/btn"
                    >
                      View Residence
                      <ArrowRight size={11} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA Strip */}
      <div className="border-t border-black/6 py-16 bg-[#fafafa]">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">{filtered.length} Residences Available</span>
            <p className="text-black/40 text-sm">Can't find what you're looking for? Our advisors have exclusive off-market listings.</p>
          </div>
          <a
            href="https://wa.me/971585589001"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 gold-bg text-black text-xs font-black uppercase tracking-[0.25em] px-8 py-4 rounded-full shadow-[0_12px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.6)] hover:scale-105 transition-all"
          >
            <PhoneCall size={14} /> Speak to an Advisor
          </a>
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
      </a >
    </div >
  );
};

export default FullCollection;
