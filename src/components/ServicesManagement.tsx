import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Wrench, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServicesManagement: React.FC = () => {
    const { t, isRTL } = useLanguage();
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 h-full flex items-center section-container">
                    <div className="max-w-2xl text-white">
                        <span className={`text-[var(--gold)] font-bold tracking-[0.6em] uppercase text-xs block mb-6 ${isRTL ? 'text-right' : ''}`}>
                            {t('assetCare')}
                        </span>
                        <h1 className="text-6xl md:text-7xl font-bold uppercase mb-8 leading-tight">
                            {t('propertyManagementTitle').split(' ').slice(0, 1)} <br /> {t('propertyManagementTitle').split(' ').slice(1).join(' ')}
                        </h1>
                        <p className="text-xl font-light text-white/80 leading-relaxed max-w-lg">
                            Complete peace of mind. We protect your investment, maximize your returns, and ensure your property is maintained to the highest standard.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <section className="relative py-section bg-gray-50 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.02] pointer-events-none"
                    alt="Grid Texture"
                />
                <div className="section-container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Shield size={32} />, title: "Asset Protection", desc: "Regular inspections and proactive maintenance to preserve value." },
                            { icon: <CreditCard size={32} />, title: "Financials", desc: "Transparent accounting, rent collection, and expense management." },
                            { icon: <Wrench size={32} />, title: "Maintenance", desc: "24/7 access to our network of vetted contractors." },
                            { icon: <Clock size={32} />, title: "Concierge", desc: "Premium tenant support to ensure high retention rates." },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-black group-hover:bg-black group-hover:text-[var(--gold)] transition-colors duration-300">
                                    {s.icon}
                                </div>
                                <h3 className="text-lg font-bold uppercase mb-3 text-black">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-section bg-black text-white text-center">
                <div className="section-container">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase mb-8">{t('readyToOptimize')}</h2>
                    <p className="text-white/50 mb-10 max-w-2xl mx-auto">
                        Join hundreds of landlords who trust us with their portfolio.
                    </p>
                    <button className="px-10 py-4 bg-[var(--gold)] text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white transition-colors">
                        {t('speakWithManager')}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ServicesManagement;
