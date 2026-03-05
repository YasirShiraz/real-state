import React from 'react';
import { motion } from 'framer-motion';
import { Home, Key, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServicesRentals: React.FC = () => {
    const { t, isRTL } = useLanguage();
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Rentals"
                        className="w-full h-full object-cover opacity-70 animate-slow-zoom"
                    />
                </div>

                <div className="relative z-10 text-center space-y-6 max-w-4xl px-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={`text-[var(--gold)] font-bold tracking-[0.6em] uppercase text-xs block mb-6 ${isRTL ? 'text-right' : ''}`}>
                            {t('premiumLeasing')}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                            {t('curatedLiving').split(' ').slice(0, 1)} <br /> <span className="font-serif italic font-light text-white/80">{t('curatedLiving').split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl font-light mt-8 max-w-2xl mx-auto leading-relaxed">
                            Experience the finest short and long-term residences Dubai has to offer.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Body */}
            <section className="py-section">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Text Content */}
                        <div className="space-y-12">
                            <div>
                                <h3 className={`text-3xl font-bold uppercase mb-6 ${isRTL ? 'text-right' : ''}`}>{t('forTenants')}</h3>
                                <p className="text-black/60 leading-relaxed mb-6">
                                    Finding the perfect home should be effortless. Our leasing team provides a bespoke service to find you a residence that matches your lifestyle, from penthouses in Downtown to villas on the Palm.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--gold-dark)]" /> <span className="text-sm font-bold uppercase tracking-wider">Verified Listings</span></li>
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--gold-dark)]" /> <span className="text-sm font-bold uppercase tracking-wider">Seamless Move-in</span></li>
                                </ul>
                                <button className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-[var(--gold-dark)] transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    {t('findAHome')} <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            <div className="w-full h-[1px] bg-black/10" />

                            <div>
                                <h3 className={`text-3xl font-bold uppercase mb-6 ${isRTL ? 'text-right' : ''}`}>{t('forLandlords')}</h3>
                                <p className="text-black/60 leading-relaxed mb-6">
                                    Maximize your yield with high-caliber tenants. We handle everything from marketing to contract administration, ensuring your investment works for you.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--gold-dark)]" /> <span className="text-sm font-bold uppercase tracking-wider">Tenant Screening</span></li>
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--gold-dark)]" /> <span className="text-sm font-bold uppercase tracking-wider">Rent Collection</span></li>
                                </ul>
                                <button className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-[var(--gold-dark)] transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    {t('listWithUs')} <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group min-h-[200px]">
                                <Home size={32} className="text-black group-hover:text-[var(--gold)] transition-colors mb-4" />
                                <span className="text-sm font-bold uppercase tracking-widest">Long Term</span>
                            </div>
                            <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group min-h-[200px] mt-12">
                                <Key size={32} className="text-black group-hover:text-[var(--gold)] transition-colors mb-4" />
                                <span className="text-sm font-bold uppercase tracking-widest">Short Stay</span>
                            </div>
                            <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group min-h-[200px] -mt-12">
                                <ShieldCheck size={32} className="text-black group-hover:text-[var(--gold)] transition-colors mb-4" />
                                <span className="text-sm font-bold uppercase tracking-widest">Corporate</span>
                            </div>
                            <div className="relative rounded-[2rem] overflow-hidden min-h-[200px]">
                                <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="Interior" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesRentals;
