import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Users, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServicesSales: React.FC = () => {
    const { t, isRTL } = useLanguage();
    return (
        <div className="min-h-screen bg-white">
            {/* Sales Hero */}
            <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Sales"
                        className="w-full h-full object-cover opacity-60 animate-slow-zoom"
                    />
                </div>

                <div className="relative z-10 text-center space-y-6 max-w-4xl px-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={`text-[var(--gold)] font-bold tracking-[0.6em] uppercase text-xs block mb-6 ${isRTL ? 'text-right' : ''}`}>
                            {t('eliteBrokerage')}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                            {t('sellingMasterpieces').split(' ').slice(0, 1)} <br />
                            <span className="font-serif italic font-light text-white/80">{t('sellingMasterpieces').split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl font-light mt-8 max-w-2xl mx-auto leading-relaxed">
                            We don't just list homes; we curate narratives that resonate with the world's most discerning buyers.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Approach Section */}
            <section className="py-section section-container">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className={`text-4xl md:text-5xl font-bold text-black uppercase mb-8 leading-none ${isRTL ? 'text-right outline-none' : ''}`}>
                            {t('theArtOfTheDeal').split(' ').slice(0, -1).join(' ')} <br />
                            <span className="text-[var(--gold-dark)]">{t('theArtOfTheDeal').split(' ').slice(-1)}</span>
                        </h2>
                        <p className="text-black/60 leading-relaxed mb-8 text-justify">
                            Our sales philosophy is built on a foundation of data-driven precision and emotional intelligence. We understand that selling a luxury property is not just a transaction; it's the transfer of a legacy. Our global network ensures your property reaches the right eyes, at the right time.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Global Marketing Exposure",
                                "Private Client Network Access",
                                "Cinematic Property Production",
                                "Strategic Valuation Modeling"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-black/80">
                                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="px-8 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--gold)] transition-colors">
                            {t('requestValuation')}
                        </button>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 border border-black/5 rounded-[2rem] z-0" />
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000"
                            alt="Meeting"
                            className="relative z-10 w-full rounded-[1.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-section bg-black text-white">
                <div className="section-container">
                    <div className="text-center mb-20">
                        <span className="text-[var(--gold)] font-bold tracking-[0.4em] uppercase text-xs">{t('ourProcess')}</span>
                        <h2 className="text-4xl md:text-6xl font-bold mt-4 uppercase">From Listing to Closing</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: <TrendingUp size={32} />, title: "Strategy", desc: "Market analysis and pricing strategy tailored to your asset." },
                            { icon: <Users size={32} />, title: "Marketing", desc: "Deployment of our global marketing engine and private network." },
                            { icon: <DollarSign size={32} />, title: "Negotiation", desc: "Expert negotiation to maximize value and secure terms." },
                            { icon: <Award size={32} />, title: "Closing", desc: "Seamless execution of legal and financial transfer." }
                        ].map((step, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                                <div className="mb-6 text-[var(--gold)] group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                                <h3 className="text-xl font-bold uppercase mb-4 tracking-wide">{step.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesSales;
