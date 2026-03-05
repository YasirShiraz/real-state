import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bed, Bath, Square, MapPin, ArrowLeft, PhoneCall,
    Mail, Share2, Heart, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react';
import type { Property } from '../context/DataContext';

interface PropertyDetailProps {
    property: Property;
    onBack: () => void;
}

const highlights = [
    "Floor-to-ceiling panoramic windows",
    "Private infinity pool & terrace",
    "Smart home automation system",
    "Bespoke Italian marble interiors",
    "24/7 concierge & valet service",
    "Direct beach or waterfront access",
    "Private gym & wellness suite",
    "Dedicated underground parking",
];

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack }) => {
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'location'>('overview');

    // Use all images from property, falling back to an empty array if somehow missing
    const images = (property && property.images && property.images.length > 0) ? property.images.slice(0, 10) : ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'];

    const prevImg = () => setGalleryIndex(i => (i - 1 + images.length) % images.length);
    const nextImg = () => setGalleryIndex(i => (i + 1) % images.length);

    return (
        <div className="bg-white min-h-screen">

            {/* Hero Gallery */}
            <div className="relative h-[75vh] min-h-[600px] bg-black overflow-hidden">
                {/* Main Image */}
                <motion.img
                    key={galleryIndex}
                    src={images[galleryIndex]}
                    alt={property.title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/50 pointer-events-none" />

                {/* Top Actions Overlay (avoids global navbar) */}
                <div className="absolute top-28 left-0 right-0 px-6 md:px-12 flex justify-between items-start z-30 pointer-events-none">
                    <button
                        onClick={onBack}
                        className="pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-md text-white px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all border border-white/20"
                    >
                        <ArrowLeft size={14} />
                        Back to Properties
                    </button>
                    <div className="pointer-events-auto flex items-center gap-3">
                        <button
                            onClick={() => setLiked(v => !v)}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border ${liked ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'bg-black/40 border-white/20 text-white hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)]'}`}
                        >
                            <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                        </button>
                        <button className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Gallery Nav */}
                <button
                    onClick={prevImg}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black hover:border-transparent transition-all z-20"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={nextImg}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black hover:border-transparent transition-all z-20"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Content Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-8 pl-16 md:pl-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-2xl">
                            {property.title}
                        </h1>

                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-[var(--gold)] shrink-0" />
                            <span className="text-white/80 text-sm md:text-base font-bold tracking-[0.2em] uppercase text-shadow">{property.location}</span>
                        </div>
                    </motion.div>

                    {/* Dot indicators */}
                    <div className="flex gap-2 shrink-0 pb-2 pr-8">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setGalleryIndex(i)}
                                className={`rounded-full transition-all duration-500 ${i === galleryIndex ? 'w-10 h-1.5 bg-[var(--gold)] shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'w-2 h-1.5 bg-white/30 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="bg-black border-t border-white/5">
                <div className="section-container">
                    <div className="flex gap-2 py-3 overflow-x-auto scrollbar-none">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setGalleryIndex(i)}
                                className={`relative shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === galleryIndex ? 'border-[var(--gold)]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="section-container py-section">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Left — Main Info */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Quick Specs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {[
                                { icon: <Bed size={20} className="text-[var(--gold)]" />, val: property.beds, label: 'Bedrooms' },
                                { icon: <Bath size={20} className="text-[var(--gold)]" />, val: property.baths, label: 'Bathrooms' },
                                { icon: <Square size={20} className="text-[var(--gold)]" />, val: `${property.sqft.toLocaleString()} ft²`, label: 'Living Area' },
                            ].map((spec, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 p-5 md:p-7 bg-black/[0.03] rounded-[1.5rem] border border-black/4 text-center">
                                    {spec.icon}
                                    <span className="text-2xl md:text-3xl font-bold text-black tracking-tighter">{spec.val}</span>
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30">{spec.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Tabs */}
                        <div>
                            <div className="flex gap-1 border-b border-black/6 mb-8">
                                {(['overview', 'features', 'location'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 relative ${activeTab === tab ? 'text-black' : 'text-black/30 hover:text-black/60'}`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="tabUnderline"
                                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)]"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'overview' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    {property.description ? (
                                        <div className="text-black/60 leading-relaxed text-base whitespace-pre-wrap">
                                            {property.description}
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-black/60 leading-relaxed text-base">
                                                A rare opportunity to own one of Dubai's most distinguished residences. <strong className="text-black">{property.title}</strong> is a masterpiece of architectural precision, offering unparalleled luxury living in the heart of <strong className="text-black">{property.location}</strong>.
                                            </p>
                                            <p className="text-black/60 leading-relaxed">
                                                This exceptional {property.type.toLowerCase()} spans {property.sqft.toLocaleString()} sq.ft of meticulously crafted space, featuring {property.beds} bedrooms and {property.baths} bathrooms, each finished to the highest standards with bespoke materials sourced from across the globe.
                                            </p>
                                            <p className="text-black/60 leading-relaxed">
                                                Residents enjoy privileged access to world-class amenities, 24/7 concierge, and seamless connectivity to Dubai's finest dining, retail, and leisure destinations.
                                            </p>
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'features' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-black/[0.025] border border-black/4">
                                                <CheckCircle2 size={16} className="text-[var(--gold)] shrink-0 mt-0.5" />
                                                <span className="text-sm font-medium text-black/70">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'location' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    {/* Map placeholder */}
                                    <div className="relative h-64 rounded-[2rem] overflow-hidden bg-black/5 border border-black/6 flex items-center justify-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200"
                                            alt="Dubai Location"
                                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                                        />
                                        <div className="relative z-10 text-center">
                                            <MapPin size={32} className="text-[var(--gold)] mx-auto mb-2" />
                                            <span className="text-sm font-bold text-white uppercase tracking-widest">{property.location}</span>
                                            <br />
                                            <span className="text-white/50 text-xs">Dubai, UAE</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            { label: 'Dubai Mall', dist: '8 min' },
                                            { label: 'Dubai Airport', dist: '22 min' },
                                            { label: 'Burj Khalifa', dist: '10 min' },
                                            { label: 'Marina Walk', dist: '5 min' },
                                            { label: 'Palm Jumeirah', dist: '15 min' },
                                            { label: 'Business Bay', dist: '12 min' },
                                        ].map((poi, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-black/[0.025] border border-black/4">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-black/30 block mb-1">{poi.dist}</span>
                                                <span className="text-sm font-bold text-black">{poi.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right — Sticky Inquiry Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="rounded-[2rem] border border-black/8 p-7 shadow-[0_12px_40px_rgba(0,0,0,0.07)] space-y-6">
                                {/* Price */}
                                <div className="mb-4">
                                    <div className="text-4xl font-bold text-[var(--gold)] tracking-tighter">{property.price}</div>
                                </div>

                                <div className="w-full h-[1px] bg-black/5" />

                                {/* Property ref */}
                                <div className="space-y-2 text-sm">
                                    {[
                                        { label: 'Type', val: property.type },
                                        { label: 'Status', val: property.status },
                                        { label: 'Location', val: property.location },
                                        { label: 'Ref. No', val: `MAE-${String(property.id).padStart(4, '0')}` },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-black/30">{row.label}</span>
                                            <span className="text-xs font-bold text-black uppercase">{row.val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full h-[1px] bg-black/5" />

                                {/* CTAs */}
                                <div className="flex flex-col gap-3">
                                    <a
                                        href="https://wa.me/971585589001"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full flex items-center justify-center gap-2 gold-bg text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(212,175,55,0.45)] transition-all shadow-[0_8px_24px_rgba(212,175,55,0.3)]"
                                    >
                                        <PhoneCall size={13} /> WhatsApp Expert
                                    </a>
                                    <a
                                        href="mailto:elite@maestate.com"
                                        className="w-full flex items-center justify-center gap-2 border border-black/10 text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                    >
                                        <Mail size={13} /> Email Inquiry
                                    </a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            {/* WhatsApp Float */}
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

export default PropertyDetail;
