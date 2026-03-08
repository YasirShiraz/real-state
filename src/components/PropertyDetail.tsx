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
                className="fixed bottom-8 left-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:bg-[#20b858] transition-all hover:scale-110 active:scale-95 group"
                title="Chat with us on WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.553 4.187 1.605 5.952L0 24l6.12-1.605a11.802 11.802 0 005.923 1.577h.004c6.635 0 12.032-5.395 12.036-12.033A11.83 11.83 0 0012.05h.004z" />
                </svg>
            </a>
        </div>
    );
};

export default PropertyDetail;
